/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IQuestion } from '../../types/IQuestion';
import { QuestionDataRow, QuestionFactory } from '../factories/QuestionFactory';
import { TeamValue } from '../../types/TeamValue';
import { Connotation } from '../../types/Connotation';

const RawQuestionArray: QuestionDataRow[] = [
  ['incorporates constructive feedback', TeamValue.SEEK_TO_IMPROVE, Connotation.POSITIVE],
  ['is open to feedback', TeamValue.SEEK_TO_IMPROVE, Connotation.POSITIVE],
  ['knows their own weaknesses', TeamValue.SEEK_TO_IMPROVE, Connotation.POSITIVE],
  ["openly admits they don't know something", TeamValue.SEEK_TO_IMPROVE, Connotation.POSITIVE],
  ['self-drives their development', TeamValue.SEEK_TO_IMPROVE, Connotation.POSITIVE],
  ['gives useful feedback to me', TeamValue.SEEK_TO_IMPROVE, Connotation.POSITIVE],
  ['regularly shares knowledge', TeamValue.SEEK_TO_IMPROVE, Connotation.POSITIVE],

  ['appears to meetings on time', TeamValue.TEAMWORK, Connotation.POSITIVE],
  ['is empathetic', TeamValue.TEAMWORK, Connotation.POSITIVE],
  ["values other people's opinions", TeamValue.TEAMWORK, Connotation.POSITIVE],
  ['offers help to others', TeamValue.TEAMWORK, Connotation.POSITIVE],
  ['spends time to answer questions', TeamValue.TEAMWORK, Connotation.POSITIVE],
  ['is a good mentor', TeamValue.TEAMWORK, Connotation.POSITIVE],
  ['treats others with respect', TeamValue.TEAMWORK, Connotation.POSITIVE],
  ['actively participates in group meetings', TeamValue.TEAMWORK, Connotation.POSITIVE],
  ['apologizes for failures', TeamValue.TEAMWORK, Connotation.POSITIVE],
  ['is friendly', TeamValue.TEAMWORK, Connotation.POSITIVE],
  ["respects other people's opinions", TeamValue.TEAMWORK, Connotation.POSITIVE],
  ['is fair', TeamValue.TEAMWORK, Connotation.POSITIVE],
  ['is judgemental', TeamValue.TEAMWORK, Connotation.NEGATIVE],
  ['is open-minded', TeamValue.TEAMWORK, Connotation.POSITIVE],
  ['is good at negotiations', TeamValue.TEAMWORK, Connotation.POSITIVE],
  ['is good at coaching others', TeamValue.TEAMWORK, Connotation.POSITIVE],
  ['expects others to take the lead', TeamValue.TEAMWORK, Connotation.NEGATIVE],
  ['can lead a discussion', TeamValue.TEAMWORK, Connotation.POSITIVE],
  ['is a good listener', TeamValue.TEAMWORK, Connotation.POSITIVE],
  ['is passive', TeamValue.TEAMWORK, Connotation.NEGATIVE],
  ['regularly supports me in my work', TeamValue.TEAMWORK, Connotation.POSITIVE],
  ['is enjoyable to work with', TeamValue.TEAMWORK, Connotation.POSITIVE],

  ['rushes decisions', TeamValue.DELIVERY, Connotation.NEGATIVE],
  ['avoids decisions', TeamValue.DELIVERY, Connotation.NEGATIVE],
  ['takes responsibility for their actions', TeamValue.DELIVERY, Connotation.POSITIVE],
  ['does reviews on time', TeamValue.DELIVERY, Connotation.POSITIVE],
  ['is passionate about their work', TeamValue.DELIVERY, Connotation.POSITIVE],
  ['can manage stress', TeamValue.DELIVERY, Connotation.POSITIVE],
  ['keeps commitments', TeamValue.DELIVERY, Connotation.POSITIVE],
  ['proactively uses feature flags', TeamValue.DELIVERY, Connotation.POSITIVE],
  ['supports finishing team commitment of our sprints', TeamValue.DELIVERY, Connotation.POSITIVE],
  ['delivered a feature that had a lot of uncertainty', TeamValue.DELIVERY, Connotation.POSITIVE],

  ['shares their opinion actively', TeamValue.COMMUNICATION, Connotation.POSITIVE],
  ['is the voice of reason', TeamValue.COMMUNICATION, Connotation.POSITIVE],
  ['communicates well', TeamValue.COMMUNICATION, Connotation.POSITIVE],
  ['communicates their actions well', TeamValue.COMMUNICATION, Connotation.POSITIVE],
  ['speaks in understandable terms', TeamValue.COMMUNICATION, Connotation.POSITIVE],
  ['gives clear status updates in the daily', TeamValue.COMMUNICATION, Connotation.POSITIVE],
  ['clarifies questions early on', TeamValue.COMMUNICATION, Connotation.POSITIVE],
  ['communicates complex ideas skillfully', TeamValue.COMMUNICATION, Connotation.POSITIVE],
  ['takes ownership of their products', TeamValue.OWNERSHIP, Connotation.POSITIVE],
  ['finishes their tasks before the end of the sprint', TeamValue.OWNERSHIP, Connotation.POSITIVE],
  ['Helps improving our monitoring', TeamValue.OWNERSHIP, Connotation.POSITIVE],
  ['is a great firefighter', TeamValue.OWNERSHIP, Connotation.POSITIVE],
  ['has team domain knowledge so that they can have effective discussions and make informed decisions', TeamValue.OWNERSHIP, Connotation.POSITIVE],
  ['makes informed decisions in our domain', TeamValue.OWNERSHIP, Connotation.POSITIVE],
  ['understands why they are doing what they are doing', TeamValue.OWNERSHIP, Connotation.POSITIVE],

  ['acts responsibly', TeamValue.STRATEGIC, Connotation.POSITIVE],
  ['executes requirements accurately', TeamValue.STRATEGIC, Connotation.POSITIVE],
  ["brings the customer's perspective into discussions", TeamValue.STRATEGIC, 1],
  ['Asks for details to understand the impact during refinement', TeamValue.STRATEGIC, 1],
  ['involved in the definition of the team strategy', TeamValue.STRATEGIC, Connotation.POSITIVE],
  ['advocates for the technical strategy', TeamValue.STRATEGIC, Connotation.POSITIVE],
  ['understands our team goals', TeamValue.STRATEGIC, Connotation.POSITIVE],
  ['acts according to our companies priorities', TeamValue.STRATEGIC, Connotation.POSITIVE],

  ['exhibits leadership qualities in their position', TeamValue.MASTERY, Connotation.POSITIVE],
  ['gives a professional impression', TeamValue.MASTERY, Connotation.POSITIVE],
  ['delivers high quality work', TeamValue.MASTERY, Connotation.POSITIVE],
  ['is pragmatic', TeamValue.MASTERY, Connotation.POSITIVE],
  ['does careful reviews', TeamValue.MASTERY, Connotation.POSITIVE],
  ['has a professional attitude', TeamValue.MASTERY, Connotation.POSITIVE],
  ['is a role model', TeamValue.MASTERY, Connotation.POSITIVE],
  ['can execute their tasks independently', TeamValue.MASTERY, Connotation.POSITIVE],
  ['cares about quality', TeamValue.MASTERY, Connotation.POSITIVE],
  ['is someone I can learn from', TeamValue.MASTERY, Connotation.POSITIVE],
  ['is knowledgable', TeamValue.MASTERY, Connotation.POSITIVE],
  ['works effectively', TeamValue.MASTERY, Connotation.POSITIVE],
  ['actively seeks solutions', TeamValue.MASTERY, Connotation.POSITIVE],
  ['takes unnecessary risks', TeamValue.MASTERY, Connotation.NEGATIVE],
  ['assesses risks before taking actions', TeamValue.MASTERY, Connotation.POSITIVE],
  ['has endurance for the long haul', TeamValue.MASTERY, Connotation.POSITIVE],
  ['can communicate a clear vision', TeamValue.MASTERY, Connotation.POSITIVE],
  ['thinks in long term solutions instead of quick fixes', TeamValue.MASTERY, Connotation.POSITIVE],
  ['pays attention to detail', TeamValue.MASTERY, Connotation.POSITIVE],
  ['finds innovative solutions to problems', TeamValue.MASTERY, Connotation.POSITIVE],
  ['is good at researching problems', TeamValue.MASTERY, Connotation.POSITIVE],
  ['is good at troubleshooting', TeamValue.MASTERY, Connotation.POSITIVE],
  ['is focused', TeamValue.MASTERY, Connotation.POSITIVE],
];

export class QuestionRepository {
  findAll(): IQuestion[] {
    const dataArray = this.getRawDataArray();
    const questions = QuestionFactory.createFromQuestionDataRows(dataArray);

    return QuestionRepository.shuffle(questions);
  }

  getRawDataArray(): QuestionDataRow[] {
    return RawQuestionArray;
  }

  static shuffle(array: IQuestion[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
}
