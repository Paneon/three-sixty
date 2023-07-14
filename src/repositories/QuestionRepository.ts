import { Questions } from '../../questions';
import { Question } from '../../types/Question';
import { Connotation } from '../../types/Connotation';
import { TeamValue } from '../../types/TeamValue';

export class QuestionRepository {
  static findAll() {
    const questions = [
      ...Questions.map((item) => ({
        title: item[0].toString(),
        value: TeamValue[item[1]],
        connotation: Connotation[item[2]],
      })),
    ];

    return QuestionRepository.shuffle(questions);
  }

  static shuffle(array: Question[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
}
