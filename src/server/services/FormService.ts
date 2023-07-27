import { QuestionRepository } from '../repositories/QuestionRepository';
import { Answer } from '../../types/Answer';
import Form = GoogleAppsScript.Forms.Form;
import { FORM_TEMPLATE, QUESTIONS_PER_PAGE } from '../../shared/config';
import { IQuestion } from '../../types/IQuestion';

interface IPage {
  questionTitles: string[];
}

export class FormService {
  static VERSION = '1.1';

  constructor(private questionRepository = new QuestionRepository()) {}

  private createFormHead(form: Form, title: string) {
    form.setTitle(title);
    form.setDescription('Version: ' + FormService.VERSION);
    return form;
  }

  private addFeedbackTail(form: Form) {
    form.addPageBreakItem().setTitle('General Feedback');
    form
      .addTextItem()
      .setTitle(`Generally, what things should your colleague keep on doing?`)
      .setRequired(true);
    form
      .addTextItem()
      .setTitle(`What things could your colleague focus on improving?`)
      .setRequired(true);
    return form;
  }

  private addReflectionTail(form: Form) {
    form.addPageBreakItem().setTitle('General Feedback');
    form
      .addTextItem()
      .setTitle(`Generally, what things should you keep on doing?`)
      .setRequired(true);
    form
      .addTextItem()
      .setTitle(`What do you see as areas of improvement for yourself?`)
      .setRequired(true);
    return form;
  }

  public createSelfReflectionForm() {
    return this.createPolarForm(
      `Self-Reflection`,
      `Please give a couple of questions about how you see yourself.`,
      true,
    );
  }

  public createFeedbackForm(name: string) {
    return this.createPolarForm(
      `${name}'s Team Feedback`,
      `Please answer a couple of questions about ${name}.`,
      false,
    );
  }

  public createPolarForm(
    title: string,
    description: string,
    isPersonal: boolean,
  ): Form {
    const questions = this.questionRepository.findAll();

    let form: Form;

    if (FORM_TEMPLATE && FORM_TEMPLATE !== '') {
      const copy = DriveApp.getFileById(FORM_TEMPLATE).makeCopy();
      copy.setName(title);
      form = FormApp.openById(copy.getId());
    } else {
      form = FormApp.create(title).setProgressBar(true);
    }

    form.setTitle(title);
    form.setProgressBar(true);
    form.setDescription(description);
    form.setCollectEmail(true);
    form.setLimitOneResponsePerUser(true);
    form.setShowLinkToRespondAgain(false);
    this.createFormHead(form, title);

    if (QUESTIONS_PER_PAGE > 0) {
      const pages = this.splitQuestionsIntoPages(questions, 10);
      pages.forEach((page, pageIndex) => {
        // Create a new page in the form
        form.addPageBreakItem();

        const gridItem = form.addGridItem();

        gridItem
          .setTitle(`Statements`)
          .setRows(page.questionTitles)
          .setColumns([Answer.YES, Answer.NO]);

        this.addCAT(form);
      });
    } else {
      form.addPageBreakItem();
      const gridItem = form.addGridItem();
      gridItem
        .setTitle(`Statements`)
        .setRows(questions.map((question) => question.title))
        .setColumns([Answer.YES, Answer.NO]);

      this.addCAT(form);
    }

    form = isPersonal
      ? this.addReflectionTail(form)
      : this.addFeedbackTail(form);

    return form;
  }

  private addCAT(form: GoogleAppsScript.Forms.Form) {
    const item = form.addImageItem();
    // Gets the Google icon to use as the image.
    const img = UrlFetchApp.fetch('https://loremflickr.com/400/400/cute,pet');

    // Sets the image, title, and description for the item.
    item
      .setTitle('Well done! Here is an image of a cute pet to freshen up.')
      .setImage(img);
  }

  public splitQuestionsIntoPages(
    questions: IQuestion[],
    pageSize: number,
  ): IPage[] {
    let index = 0;
    const arrayLength = questions.length;
    const pages: IPage[] = [];

    for (index = 0; index < arrayLength; index += pageSize) {
      const chunk = questions
        .slice(index, index + pageSize)
        .map((q) => q.title);

      pages.push({
        questionTitles: chunk,
      });
    }

    return pages;
  }
}
