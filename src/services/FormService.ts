import { QuestionRepository } from '../repositories/QuestionRepository';
import { Answer } from '../../types/Answer';
import { Constants } from '../../namespaces/Constants';

export class FormService {
  static VERSION = '1.1';

  constructor(private questionRepository = new QuestionRepository()) {}

  private createMultipleChoiceGrid(form, question, helpText) {
    form
      .addGridItem()
      .setTitle(question)
      .setHelpText(helpText)
      .setRows(['You...'])
      .setColumns([Answer.YES, Answer.NO])
      .setRequired(true);
  }

  private createFormHead(form, title) {
    form.setTitle(title);
    form.setDescription('Version: ' + FormService.VERSION);
    return form;
  }

  private addFeedbackTail(form) {
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

  private addReflectionTail(form) {
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

  private createEngineerForm(title: string, isPersonal: boolean) {
    const form = FormApp.create(title).setProgressBar(true);
    this.createFormHead(form, title);
    form.addPageBreakItem().setTitle('Their Role');
    const questions = this.questionRepository.getEngineerQuestions();
    questions.forEach(([k, v]) => this.createMultipleChoiceGrid(form, k, v));
    //this.createFormTail(form, isPersonal);
    return form;
  }

  private createProductForm(title: string, isPersonal: boolean) {
    const questions = this.questionRepository.getProductQuestions();
    const form = FormApp.create(title).setProgressBar(true);
    this.createFormHead(form, title);
    form.addPageBreakItem().setTitle('Their Role');
    questions.forEach(([k, v]) => this.createMultipleChoiceGrid(form, k, v));
    // this.createFormTail(form, isPersonal);
    return form;
  }

  private createDeliveryForm(title: string, isPersonal: boolean) {
    const questions = this.questionRepository.getDeliveryQuestions();
    const form = FormApp.create(title).setProgressBar(true);
    this.createFormHead(form, title);
    form.addPageBreakItem().setTitle('Their Role');
    questions.forEach(([k, v]) => this.createMultipleChoiceGrid(form, k, v));
    // this.createFormTail(form, isPersonal);
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
  ) {
    const questions = this.questionRepository.findAll();

    let form;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (Constants.FORM_TEMPLATE && Constants.FORM_TEMPLATE !== '') {
      const copy = DriveApp.getFileById(Constants.FORM_TEMPLATE).makeCopy();
      form = FormApp.openById(copy.getId());
      form.setName(title);
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

    form.addPageBreakItem();
    const gridItem = form.addGridItem();

    gridItem
      .setTitle(`Statements`)
      .setRows(questions.map((question) => question.title))
      .setColumns([Answer.YES, Answer.NO]);

    // const pages = this.splitQuestionsIntoPages(10);
    // pages.forEach((page, pageIndex) => {
    //   // Create a new page in the form
    //   form.addPageBreakItem().setTitle(`Statements`);
    //
    //   const gridItem = form.addGridItem();
    //
    //   gridItem
    //     .setTitle(`Statements`)
    //     .setRows(page.questions)
    //     .setColumns([Answer.YES, Answer.NO]);
    // });

    form = isPersonal
      ? this.addReflectionTail(form)
      : this.addFeedbackTail(form);

    return form;
  }

  // public createFeedbackForm(title: string, isPersonal: boolean, role: string) {
  // if (role === Constants.PRODUCT_MANAGER) {
  //   return this.createProductForm(title, isPersonal);
  // } else if (role === Constants.SCRUM_MASTER) {
  //   return this.createDeliveryForm(title, isPersonal);
  // } else {
  //   return this.createEngineerForm(title, isPersonal);
  // }
  // }
}
