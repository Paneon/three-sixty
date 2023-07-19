import { QuestionRepository } from './QuestionRepository';
import { QuestionDataRow } from '../factories/QuestionFactory';

describe('QuestionRepository', () => {
  const questions = [
    ['first', 'Seek to improve', 1],
    ['is open to feedback', 'Seek to improve', 1],
    ['knows their own weaknesses', 'Seek to improve', 1],
    ['is open to feedback', 'Seek to improve', 1],
    ['knows their own weaknesses', 'Seek to improve', 1],
    ['is open to feedback', 'Seek to improve', 1],
    ['knows their own weaknesses', 'Seek to improve', 1],
    ['is open to feedback', 'Seek to improve', 1],
    ['knows their own weaknesses', 'Seek to improve', 1],
  ] as QuestionDataRow[];

  it('findAll should return the questions as Question objects', () => {
    const questionRepo = new QuestionRepository();

    jest.spyOn(questionRepo, 'getRawDataArray').mockReturnValue(questions);

    const findAll = questionRepo.findAll();
    expect(findAll).toHaveLength(questions.length);
    expect(findAll[0]).toHaveProperty('title');
    expect(findAll[0]).toHaveProperty('value');
    expect(findAll[0]).toHaveProperty('connotation');
  });

  it('shuffle should shuffle questions', () => {
    const questionRepo = new QuestionRepository();

    jest.spyOn(questionRepo, 'getRawDataArray').mockReturnValue(questions);

    const findAll = questionRepo.findAll();
    const shuffled = QuestionRepository.shuffle(findAll);

    expect(shuffled).toHaveLength(questions.length);
    expect(findAll[0]).toHaveProperty('title');
    expect(shuffled[0].title).not.toEqual('first');
  });
});
