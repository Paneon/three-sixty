import { Questions } from '../../questions';
import { Question } from '../../types/Question';
import { Connotation } from '../../types/Connotation';
import { TeamValue } from '../../types/TeamValue';

export class QuestionRepository {
  constructor() {}

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
