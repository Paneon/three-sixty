import { Constants } from '../../namespaces/Constants';
import { Question } from '../../types/Question';
import { QuestionRepository } from '../repositories/QuestionRepository';

export class FormService {
  private form: GoogleAppsScript.Forms.Form;
  private questions: Question[];

  constructor(title: string) {
    const questions = QuestionRepository.findAll();

    this.form = FormApp.create(title).setProgressBar(true);
    this.form.setDescription('Please answer a couple of questions about');
    this.addFirstPage();
    this.form.addPageBreakItem().setTitle('The What');
    this.form.addTextItem().setHelpText();
    theWhatQuestions.forEach(([k, v]) =>
      this.createMultipleChoiceGrid(form, k, v),
    );

    form.addPageBreakItem().setTitle('The How (Our Values)');
    theHowQuestions.forEach(([k, v]) =>
      this.createMultipleChoiceGrid(form, k, v),
    );
    this.addLastPage();
    return form;
  }

  private addFirstPage() {
    this.form.addSectionHeaderItem().setTitle('First a little bit about you');
    this.form.addTextItem().setTitle("What's your name?").setRequired(false);
  }

  public addLastPage() {
    this.form.addPageBreakItem().setTitle('General Feedback');
    this.form
      .addTextItem()
      .setTitle(`Generally, what things should they keep doing`)
      .setRequired(true);
    this.form
      .addTextItem()
      .setTitle(`What things could they focus on improving`)
      .setRequired(true);
  }

  createFeedbackForm(title: string, isPersonal: boolean, role: string) {
    if (role === Constants.PRODUCT_MANAGER) {
      return createProductForm(title, isPersonal);
    } else if (role === Constants.SCRUM_MASTER) {
      return createDeliveryForm(title, isPersonal);
    } else {
      return createEngineerForm(title, isPersonal);
    }
  }
}
