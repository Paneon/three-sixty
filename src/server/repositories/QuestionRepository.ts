/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IQuestion } from '../../types/IQuestion';
import { QuestionDataRow, QuestionFactory } from '../factories/QuestionFactory';

const RawQuestionArray = [
  ['incorporates constructive feedback', 'Seek to improve', 1],
  ['is open to feedback', 'Seek to improve', 1],
  ['knows their own weaknesses', 'Seek to improve', 1],
  ["openly admits they don't know something", 'Seek to improve', 1],
  ['self-drives their development', 'Seek to improve', 1],
  ['gives useful feedback to me', 'Seek to improve', 1],
  ['regularly shares knowledge', 'Seek to improve', 1],
  ['appears to meetings on time', 'Teamwork', 1],
  ['is empathetic', 'Teamwork', 1],
  ["values other people's opinions", 'Teamwork', 1],
  ['offers help to others', 'Teamwork', 1],
  ['spends time to answer questions', 'Teamwork', 1],
  ['is a good mentor', 'Teamwork', 1],
  ['treats others with respect', 'Teamwork', 1],
  ['actively participates in group meetings', 'Teamwork', 1],
  ['apologizes for failures', 'Teamwork', 1],
  ['is friendly', 'Teamwork', 1],
  ["respects other people's opinions", 'Teamwork', 1],
  ['is fair', 'Teamwork', 1],
  ['is judgemental', 'Teamwork', 0],
  ['is open-minded', 'Teamwork', 1],
  ['is good at negotiations', 'Teamwork', 1],
  ['is good at coaching others', 'Teamwork', 1],
  ['expects others to take the lead', 'Teamwork', 0],
  ['can lead a discussion', 'Teamwork', 1],
  ['is a good listener', 'Teamwork', 1],
  ['is passive', 'Teamwork', 0],
  ['regularly supports me in my work', 'Teamwork', 1],
  ['rushes decisions', 'Delivery', 0],
  ['avoids decisions', 'Delivery', 0],
  ['takes responsibility for their actions', 'Delivery', 1],
  ['does reviews on time', 'Delivery', 1],
  ['is passionate about their work', 'Delivery', 1],
  ['can manage stress', 'Delivery', 1],
  ['keeps commitments', 'Delivery', 1],
  ['proactively uses feature flags', 'Delivery', 1],
  ['supports finishing team commitment of our sprints', 'Delivery', 1],
  ['delivered a feature that had a lot of uncertainty', 'Delivery', 1],
  ['shares their opinion actively', 'Communication', 1],
  ['is the voice of reason', 'Communication', 1],
  ['communicates well', 'Communication', 1],
  ['communicates their actions well', 'Communication', 1],
  ['speaks in understandable terms', 'Communication', 1],
  ['gives clear status updates in the daily', 'Communication', 1],
  ['clarifies questions early on', 'Communication', 1],
  ['communicates complex ideas skillfully', 'Communication', 1],
  ['takes ownership of their products', 'Ownership', 1],
  ['finishes their tasks before the end of the sprint', 'Ownership', 1],
  ['Helps improving our monitoring', 'Ownership', 1],
  ['is a great firefighter', 'Ownership', 1],
  ['acts responsibly', 'Strategic Thinking', 1],
  ['executes requirements accurately', 'Strategic Thinking', 1],
  [
    "brings the customer's perspective into discussions",
    'Strategic Thinking',
    1,
  ],
  [
    'Asks for details to understand the impact during refinement',
    'Strategic Thinking',
    1,
  ],
  ['involved in the definition of the team strategy', 'Strategic Thinking', 1],
  ['advocates for the technical strategy', 'Strategic Thinking', 1],
  ['understands our team goals', 'Strategic Thinking', 1],
  ['acts according to our companies priorities', 'Strategic Thinking', 1],
  ['exhibits leadership qualities in their position', 'Mastery', 1],
  ['gives a professional impression', 'Mastery', 1],
  ['delivers high quality work', 'Mastery', 1],
  ['is pragmatic', 'Mastery', 1],
  ['does careful reviews', 'Mastery', 1],
  ['has a professional attitude', 'Mastery', 1],
  ['is a role model', 'Mastery', 1],
  ['can execute their tasks independently', 'Mastery', 1],
  ['cares about quality', 'Mastery', 1],
  ['is someone I can learn from', 'Mastery', 1],
  ['is knowledgable', 'Mastery', 1],
  ['works effectively', 'Mastery', 1],
  ['is enjoyable to work with', 'Mastery', 1],
  ['actively seeks solutions', 'Mastery', 1],
  ['takes unnecessary risks', 'Mastery', 0],
  ['assesses risks before taking actions', 'Mastery', 1],
  ['has endurance for the long haul', 'Mastery', 1],
  ['can communicate a clear vision', 'Mastery', 1],
  ['thinks in long term solutions instead of quick fixes', 'Mastery', 1],
  ['pays attention to detail', 'Mastery', 1],
  ['finds innovative solutions to problems', 'Mastery', 1],
  ['is good at researching problems', 'Mastery', 1],
  ['is good at troubleshooting', 'Mastery', 1],
  ['is focused', 'Mastery', 1],
];

export class QuestionRepository {
  getEngineerQuestions() {
    return [
      [
        'Execution',
        'Delivers against commitments with a high degree of accuracy and quality',
      ],
      [
        'Consistency',
        'Continually generates impactful results over extended periods of time',
      ],
      [
        'Quality',
        'Consistently writes production-ready code that is easily testable, understood by others and accounts for edge cases and errors',
      ],
      [
        'Design & Architecture',
        'Architects using accepted patterns, allowing for iterative, autonomous development and future scaling. Anticipates future use, making design decisions that minimise the cost of future changes.',
      ],
      [
        'Problem Solving',
        'Solve tough problems with insightful, practical solutions, making wise deicisions despite ambiguity and thinks strategically',
      ],
      [
        'Curiosity',
        'Demonstrates an active, open mind by uncovering and exploring big ideas that accelerate genuine progress for Funding Circle',
      ],
      [
        'Accountability',
        'Promotes a culture of openness, accountability and trust. Generates a progressive attitude through team norms and behaviours.',
      ],
      [
        'Communication',
        'Listens well and is concise and articulate. I treat people with respect and consideration',
      ],
      [
        'Delivery',
        'Shows a bias to actions, delivering excellent results over just following a process',
      ],
      [
        'Grit',
        'Steadfast in the pursuit of the goals of the organistaion, their teams, their colleagues and themselves.',
      ],
      [
        'People Orientation',
        'Provides support to colleagues, expresses gratitude, spreads knowledge and develops people outside formal reporting or team structures',
      ],
      [
        'Emotional Intelligence',
        'Takes time to understand what motivates other, shows empathy and deepens gneuine relationships with others',
      ],
      [
        'Craft',
        'Inspires others by passionately promoting practices to create excellent quality products and services',
      ],
      [
        'Purpose',
        'shows conviction over time, developing a sense of purpose for what they do',
      ],
    ];
  }

  getProductQuestions() {
    return [
      [
        'Problem solving',
        'They explain and simplify the problem space. They collaborate with you to find solutions and how it can be broken down.',
      ],
      [
        'Domain knowledge',
        'They understand the business and tech space to a deep level so that they can have effective discussions and make informed decisions with you. They can see things from your perspective and they can also challenge concepts and assumptions.',
      ],
      [
        'Vision and Goals',
        "They have a clear view of where we're, what we need to achieve as a team and why. You buy into this vision and the goals set by the Product Manager",
      ],
      [
        'Communication',
        "They are concise and articulate in their communication to you. You come away from interactions with a better understanding and clear actions, NOT confused. Thay use a variety of tools/techniques to make their communication effective. You feel they give you space to feedback and they take on what you say. They help you by re-clarifying thing if you don't understand.",
      ],
      [
        'Accountability',
        'They own the domain with you. They succeed and fail with you and help you through challenges.',
      ],
      [
        'Roadmap',
        "They layout a roadmap so that you clearly know the high level path to achieving the vision and goals they set out. You know what the current priorities are, what's happening now and what's coming next and byeond.",
      ],
      [
        'Delivery',
        'They support and motivate you through delivery. Clearing the way when blockers arise and/or supporting you when things are delivered.',
      ],
      [
        'People Orientation',
        "They support you as a team member by taking the time to help you understand issues, working with you on solving problems and delivering together. They protect and support you and the team when things aren't going well and/or they support your team through deliveries and issues.",
      ],
      [
        'Adaptability',
        'They are able to adapt to changing situations and uncertainty, covering where there are gaps and ensuring the team and the stakeholders keep moving as a whole.',
      ],
    ];
  }

  getDeliveryQuestions() {
    return [
      [
        'Environment',
        'Helps to create an environment in which team members feel more confident to personally commit to achieving the goals of the team.',
      ],
      [
        'Empowerment',
        'Empower the team members to have the courage to do the right thing and lean into tough problems.',
      ],
      [
        'Focus',
        'Supports the team members to focus on the teams immediate goals',
      ],
      [
        'Transparency',
        'Leads the way in fostering a culture of openness about the work and challenges faced in doing the work',
      ],
      [
        'Culture',
        'Promotes and enhances the levels of respect the team members have for each other and the belief that we are all capable independent people.',
      ],
      [
        'Delivery',
        'They support and motivate you through delivery. Clearing the way when blockers arise and/or supporting you when things are delivered.',
      ],
      [
        'Adaptability',
        'They are able to adapt to changing situations and uncertainty, covering where there are gaps and ensuring the team keeps moving as a whole.',
      ],
    ];
  }

  findAll(): IQuestion[] {
    const dataArray = this.getRawDataArray();
    const questions = QuestionFactory.createFromRawDataRows(dataArray);

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
