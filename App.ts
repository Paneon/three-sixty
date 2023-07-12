import {Constants} from "./namespaces/Constants";
import {Form} from "./namespaces/Form";
import {Email} from "./namespaces/Email";
import {Results} from "./namespaces/Results";
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Folder = GoogleAppsScript.Drive.Folder;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import GoogleForm = GoogleAppsScript.Forms.Form;
import HtmlOutput = GoogleAppsScript.HTML.HtmlOutput;

console.log('VERSION: 1.1');

export function doGet(): HtmlOutput {
    return HtmlService.createTemplateFromFile('index').evaluate()
}

export function include(filename: string): string {
    return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

function getOrCreateWorkingFolder(): Folder {
    const folders = DriveApp.getFoldersByName(Constants.FOLDER)
    return folders.hasNext() ? folders.next() : DriveApp.createFolder(Constants.FOLDER)
}

function addFileToWorkingFolder<T extends Spreadsheet | GoogleForm>(folder, file: T): T {
    const temp = DriveApp.getFileById(file.getId())
    folder.addFile(temp)
    DriveApp.getRootFolder().removeFile(temp)

    return file;
}

function getOrCreateTeamSpreadsheet(folder: Folder): Spreadsheet {
    const files = folder.getFilesByName(Constants.TEAM_SHEET)
    if (files.hasNext()) {
        return SpreadsheetApp.open(files.next())
    }
    const ss = SpreadsheetApp.create(Constants.TEAM_SHEET)
    return addFileToWorkingFolder(folder, ss)
}

function matrixToViewModel(sheet): ViewModel {
    return {
        teamName: sheet.getName(),
        members: sheet.getDataRange().getValues().map((row: string[]) => ({
            firstName: row[0],
            lastName: row[1],
            role: row[7],
            email: row[2]
        }))
    }
}

function getPersonsIndex(sheet: Sheet, firstName: string, lastName: string) {
    return sheet.getDataRange()
        .getValues()
        .map(row => row.slice(0, 2).join('').toLowerCase())
        .indexOf(`${firstName}${lastName}`.toLowerCase()) + 1
}

export function getTeams(): ViewModel[] {
    return getOrCreateTeamSpreadsheet(getOrCreateWorkingFolder())
        .getSheets()
        .filter(sheet => sheet.getName() !== Constants.DEFAULT_SHEET)
        .map(sheet => matrixToViewModel(sheet))
}

export function addTeam(teamName: string): ViewModel[] {
    const sanitisedName = teamName.replace(' ', '-')
    const teamSpreadSheet = getOrCreateTeamSpreadsheet(getOrCreateWorkingFolder())
    teamSpreadSheet.insertSheet(sanitisedName)
    return getTeams()
}

export function removeTeam(teamName: string): ViewModel[] {
    const teamSpreadSheet = getOrCreateTeamSpreadsheet(getOrCreateWorkingFolder())
    teamSpreadSheet.deleteSheet(teamSpreadSheet.getSheetByName(teamName))
    return getTeams()
}

export function addPerson({firstName, lastName, email, role, team}): ViewModel[] {
    const lock = LockService.getScriptLock()
    lock.tryLock(15000)
    const folder = getOrCreateWorkingFolder()
    const name = [firstName, lastName].filter(Boolean).join(' ');

    const forms = [
        Form.createFeedbackForm(`${name}'s Self-Reflection`, true, role),
        Form.createFeedbackForm(`${name}'s Team Feedback`, false, role),
    ]
    const spreadsheets = [
        SpreadsheetApp.create(`${name}'s Self-Reflection Results`),
        SpreadsheetApp.create(`${name}'s Team Feedback Results`)
    ]
    const {0: personalForm, 1: teamForm} = forms
    const [pfid, tfid, psid, tsid] = [...forms, ...spreadsheets].map(f => f.getId())
    personalForm.setDestination(FormApp.DestinationType.SPREADSHEET, psid)
    teamForm.setDestination(FormApp.DestinationType.SPREADSHEET, tsid)
    forms.forEach(file => addFileToWorkingFolder(folder, file))
    spreadsheets.forEach(file => addFileToWorkingFolder(folder, file))
    getOrCreateTeamSpreadsheet(folder)
        .getSheetByName(team)
        .appendRow([firstName, lastName, email, pfid, tfid, psid, tsid, role])
    Utilities.sleep(15000)
    lock.releaseLock()

    return getTeams();
}

function multiplyArray(arr, times) {
    return times ? arr.concat(multiplyArray(arr, times - 1)) : []
}

export function runFeedbackRound(teamName: string): string {
    const folder = getOrCreateWorkingFolder()
    const teamSheet = getOrCreateTeamSpreadsheet(folder).getSheetByName(teamName)
    const team = teamSheet.getDataRange().getValues()

    // if there are more than chunkSize number of people limit the number of forms
    // each person receives
    const chunkSize = team.length > 4 ? 4 : team.length - 1
    const allFeedbackRequests = multiplyArray(team, chunkSize)
    const rotatedPeers = [
        allFeedbackRequests[allFeedbackRequests.length - 1],
        ...allFeedbackRequests.slice(1, allFeedbackRequests.length - 1),
        allFeedbackRequests[0]
    ]
    const teamWithPeers = team.map((person, index) => {
        const startIndex = index * chunkSize
        const endIndex = startIndex + chunkSize
        return [...person, rotatedPeers.slice(startIndex, endIndex)]
    })

    teamWithPeers.forEach(([firstName, lastName, email, pfid, tfid, psid, tsid, role, peers], i, original) => {
        const personalSpreadsheet = SpreadsheetApp.openById(psid)
        const personalResultsSheet = personalSpreadsheet.getSheetByName(Constants.DEFAULT_RESULTS_SHEET)
        const newSheetRequired = personalResultsSheet.getLastRow() > 1
        const numberOfRounds = personalSpreadsheet.getSheets().filter(sheet => sheet.getName() !== Constants.DEFAULT_SHEET).length
        if (newSheetRequired) {
            personalSpreadsheet.insertSheet(`Form Responses ${numberOfRounds + 1}`, {template: personalResultsSheet})
        }
        const teamSpreadSheet = SpreadsheetApp.openById(tsid)
        const teamResultsSheet = teamSpreadSheet.getSheetByName(Constants.DEFAULT_RESULTS_SHEET)
        if (newSheetRequired) {
            teamSpreadSheet.insertSheet(`Form Responses ${numberOfRounds + 1}`, {template: teamResultsSheet})
        }
        const personalFormUrl = FormApp.openById(pfid).getPublishedUrl()
        Email.sendEmail(email, 'New 360 Feedback Round', {firstName, personalFormUrl, peers})
    })
    return teamName
}

export function removePerson({firstName, lastName, teamName}): ViewModel[] {
    const folder = getOrCreateWorkingFolder()
    const teamSheet = getOrCreateTeamSpreadsheet(folder).getSheetByName(teamName)
    const rowIndex = getPersonsIndex(teamSheet, firstName, lastName)
    const {0: docIds} = teamSheet.getRange(rowIndex, 4, 1, 4).getValues()
    docIds.forEach(id => folder.removeFile(DriveApp.getFileById(id)))
    teamSheet.deleteRow(rowIndex)
    return getTeams()
}

const errorPayload = (errorMessage: string): ErrorMessage => ({
    error: errorMessage
})

export function getFeedbackData(name: string) {
    try {
        const {0: firstName, 1: lastName} = name.split(' ')
        const folder = getOrCreateWorkingFolder()
        const {0: teamSheet} = getOrCreateTeamSpreadsheet(folder)
            .getSheets()
            .filter(sheet => getPersonsIndex(sheet, firstName, lastName) > 0)
        const {5: psid, 6: tsid} = teamSheet
            .getDataRange()
            .getValues()[getPersonsIndex(teamSheet, firstName, lastName) - 1]
        return Results.createPayload(psid, tsid, name)
    } catch (error) {
        return errorPayload(`Could not find any data for ${name}. Ensure you have entered the name in the format: Firstname Lastname`)
    }
}
