import { QuestionRepository } from '../../../src/server/repositories/QuestionRepository';
import { QuestionDataRow } from '../../../src/server/factories/QuestionFactory';
import { describe, expect, test, vi } from 'vitest';

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

  test('findAll should return the questions as Question objects', () => {
    const questionRepo = new QuestionRepository();

    vi.spyOn(questionRepo, 'getRawDataArray').mockReturnValue(questions);

    const findAll = questionRepo.findAll();
    expect(findAll).toHaveLength(questions.length);
    expect(findAll[0]).toHaveProperty('title');
    expect(findAll[0]).toHaveProperty('value');
    expect(findAll[0]).toHaveProperty('connotation');
  });

  test('Questions are shuffled', () => {
    const questionRepo = new QuestionRepository();

    vi.spyOn(questionRepo, 'getRawDataArray').mockReturnValue(questions);

    const findAll = questionRepo.findAll();
    const shuffled = QuestionRepository.shuffle(findAll);

    expect(shuffled).toHaveLength(questions.length);
    expect(findAll[0]).toHaveProperty('title');
    expect(shuffled[0].title).not.toEqual('first');
  });
});
