import { Constants } from '../../namespaces/Constants';
import { QuestionRepository } from '../repositories/QuestionRepository';

export class FormService {
  static VERSION = '1.1';

  constructor(private questionRepository = new QuestionRepository()) {}
  private createMultipleChoiceGrid(form, question, helpText) {
    form
      .addGridItem()
      .setTitle(question)
      .setHelpText(helpText)
      .setRows(['You...'])
      .setColumns(['Have room to do more', 'Are spot on', 'Are smashing it'])
      .setRequired(true);
  }

  private createFormHead(form, title) {
    form.setTitle(title);
    form.setDescription('Version: ' + FormService.VERSION);
    return form;
  }

  private createFormTail(form, isPersonal) {
    const youThey = isPersonal ? 'you' : 'they';
    form.addPageBreakItem().setTitle('General Feedback');
    form
      .addTextItem()
      .setTitle(`Generally, what things should ${youThey} keep doing`)
      .setRequired(true);
    form
      .addTextItem()
      .setTitle(`What things could ${youThey} focus on improving`)
      .setRequired(true);
    return form;
  }

  private createEngineerForm(title: string, isPersonal: boolean) {
    const form = FormApp.create(title).setProgressBar(true);
    this.createFormHead(form, title);
    form.addPageBreakItem().setTitle('Their Role');
    const questions = this.questionRepository.getEngineerQuestions();
    questions.forEach(([k, v]) => this.createMultipleChoiceGrid(form, k, v));
    this.createFormTail(form, isPersonal);
    return form;
  }

  private createProductForm(title: string, isPersonal: boolean) {
    const questions = this.questionRepository.getProductQuestions();
    const form = FormApp.create(title).setProgressBar(true);
    this.createFormHead(form, title);
    form.addPageBreakItem().setTitle('Their Role');
    questions.forEach(([k, v]) => this.createMultipleChoiceGrid(form, k, v));
    this.createFormTail(form, isPersonal);
    return form;
  }

  private createDeliveryForm(title: string, isPersonal: boolean) {
    const questions = this.questionRepository.getDeliveryQuestions();
    const form = FormApp.create(title).setProgressBar(true);
    this.createFormHead(form, title);
    form.addPageBreakItem().setTitle('Their Role');
    questions.forEach(([k, v]) => this.createMultipleChoiceGrid(form, k, v));
    this.createFormTail(form, isPersonal);
    return form;
  }

  public createFeedbackForm(title: string, isPersonal: boolean, role: string) {
    if (role === Constants.PRODUCT_MANAGER) {
      return this.createProductForm(title, isPersonal);
    } else if (role === Constants.SCRUM_MASTER) {
      return this.createDeliveryForm(title, isPersonal);
    } else {
      return this.createEngineerForm(title, isPersonal);
    }
  }
}
