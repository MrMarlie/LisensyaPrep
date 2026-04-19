// Quiz engine logic and scoring utilities

export const QUIZ_CONFIG = {
  PLAYER_MAX_HP: 100,
  BOSS_MAX_HP: 100,
  WRONG_ANSWER_PENALTY: 15, // 7 wrong answers = 0 HP = defeated (matches 75% passing standard)
  CORRECT_ANSWER_DAMAGE: 5,
  QUESTIONS_PER_STAGE: 30,
};

/**
 * Initialize a new quiz session state
 */
export function initQuizState(moduleData, stageId) {
  return {
    stageId,
    module: moduleData.module,
    questions: shuffleArray([...moduleData.questions]).map((q) => ({
      ...q,
      choices: shuffleArray([...q.choices]),
    })),
    currentQuestionIndex: 0,
    playerHP: QUIZ_CONFIG.PLAYER_MAX_HP,
    bossHP: QUIZ_CONFIG.BOSS_MAX_HP,
    answers: [], // { questionId, selectedAnswer, isCorrect, timeMs }
    status: 'active', // 'active' | 'won' | 'lost'
    startedAt: Date.now(),
  };
}

/**
 * Process an answer submission and return the updated state
 */
export function processAnswer(state, selectedAnswer) {
  const question = state.questions[state.currentQuestionIndex];
  const isCorrect = selectedAnswer === question.answer;

  const newPlayerHP = isCorrect
    ? state.playerHP
    : Math.max(0, state.playerHP - QUIZ_CONFIG.WRONG_ANSWER_PENALTY);

  // Boss damage scales: more correct answers = more damage
  const damage = calculateDamage(state.answers.filter(a => a.isCorrect).length + 1);
  const newBossHP = isCorrect
    ? Math.max(0, state.bossHP - damage)
    : state.bossHP;

  const newAnswers = [
    ...state.answers,
    {
      questionId: question.id,
      question: question.question,
      selectedAnswer,
      correctAnswer: question.answer,
      explanation: question.explanation,
      isCorrect,
    },
  ];

  const isLastQuestion = state.currentQuestionIndex >= state.questions.length - 1;
  let newStatus = 'active';

  if (newPlayerHP <= 0) {
    newStatus = 'lost';
  } else if (newBossHP <= 0) {
    newStatus = 'won';
  } else if (isLastQuestion) {
    // All questions answered — determine result by remaining HP
    newStatus = newPlayerHP > 0 ? 'won' : 'lost';
  }

  return {
    ...state,
    playerHP: newPlayerHP,
    bossHP: newBossHP,
    answers: newAnswers,
    currentQuestionIndex: state.currentQuestionIndex,
    status: newStatus,
    lastAnswerCorrect: isCorrect,
    lastDamage: isCorrect ? damage : 0,
    lastPenalty: !isCorrect ? QUIZ_CONFIG.WRONG_ANSWER_PENALTY : 0,
  };
}

/**
 * Dynamic damage scaling — streak bonus
 */
function calculateDamage(correctCount) {
  const base = QUIZ_CONFIG.CORRECT_ANSWER_DAMAGE;
  if (correctCount >= 10) return base + 5; // 10 damage
  if (correctCount >= 5) return base + 3;  // 8 damage
  return base;                              // 5 damage
}

/**
 * Calculate quiz score summary
 */
export function calculateScore(state) {
  const total = state.answers.length;
  const correct = state.answers.filter(a => a.isCorrect).length;
  const wrong = total - correct;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const passed = state.status === 'won';

  return {
    total,
    correct,
    wrong,
    percentage,
    passed,
    grade: getGrade(percentage),
    playerHP: state.playerHP,
    bossHP: state.bossHP,
    status: state.status,
  };
}

function getGrade(percentage) {
  if (percentage >= 90) return { label: 'Outstanding', color: 'text-yellow-400' };
  if (percentage >= 80) return { label: 'Very Good', color: 'text-green-400' };
  if (percentage >= 70) return { label: 'Good', color: 'text-blue-400' };
  if (percentage >= 60) return { label: 'Passing', color: 'text-orange-400' };
  return { label: 'Needs Improvement', color: 'text-red-400' };
}

/**
 * Fisher-Yates shuffle
 */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// RULE: Every module MUST have an examId matching its exam (e.g. 'agriculture', 'education').
// Exam pages (app/agriculture/page.jsx, app/education/page.jsx, etc.) MUST filter by examId:
//   Object.values(MODULE_INFO).filter((m) => m.examId === '<examId>')
// Never use Object.values(MODULE_INFO) unfiltered on an exam page — it will show all exams' modules.
export const MODULE_INFO = {
  // ── Agriculture ──────────────────────────────────────────────────────────
  'module-1': {
    id: 'module-1',
    examId: 'agriculture',
    examPath: 'agriculture',
    questionCount: 50,
    title: 'Crop Science and Production',
    description: 'Master plant physiology, crop management, and production systems used in Philippine agriculture.',
    icon: '🌾',
    color: 'from-green-600 to-green-800',
    difficulty: 'Easy',
    topics: ['Plant Physiology', 'Crop Management', 'Variety Selection', 'Pest and Disease', 'Harvest Practices'],
    dataFolder: 'agriculture',
    dataFile: 'module1',
    stageNumber: 1,
  },
  'module-2': {
    id: 'module-2',
    examId: 'agriculture',
    examPath: 'agriculture',
    questionCount: 50,
    title: 'Soil Science and Fertilization',
    description: 'Understand soil properties, nutrient cycles, and fertilization strategies for optimum crop production.',
    icon: '🌱',
    color: 'from-amber-600 to-amber-800',
    difficulty: 'Medium',
    topics: ['Soil Properties', 'Nutrient Management', 'Fertilizer Types', 'Soil Conservation', 'pH Management'],
    dataFolder: 'agriculture',
    dataFile: 'module2',
    stageNumber: 2,
  },
  'module-3': {
    id: 'module-3',
    examId: 'agriculture',
    examPath: 'agriculture',
    questionCount: 50,
    title: 'Agricultural Economics and Marketing',
    description: 'Apply economic principles, farm management, and marketing strategies to agricultural practice.',
    icon: '📊',
    color: 'from-blue-600 to-blue-800',
    difficulty: 'Hard',
    topics: ['Farm Economics', 'Marketing', 'Farm Management', 'Agribusiness', 'Policy'],
    dataFolder: 'agriculture',
    dataFile: 'module3',
    stageNumber: 3,
  },
  'module-4': {
    id: 'module-4',
    examId: 'agriculture',
    examPath: 'agriculture',
    questionCount: 50,
    title: 'Crop Protection',
    description: 'Master pest identification, plant diseases, weed management, and Integrated Pest Management (IPM).',
    icon: '🛡️',
    color: 'from-red-600 to-red-800',
    difficulty: 'Medium',
    topics: ['Entomology', 'Plant Pathology', 'Weed Science', 'IPM', 'Pesticide Management'],
    dataFolder: 'agriculture',
    dataFile: 'module4',
    stageNumber: 4,
  },
  'module-5': {
    id: 'module-5',
    examId: 'agriculture',
    examPath: 'agriculture',
    questionCount: 50,
    title: 'Animal Science',
    description: 'Understand livestock production, animal nutrition, health management, and animal breeding.',
    icon: '🐄',
    color: 'from-yellow-600 to-yellow-800',
    difficulty: 'Medium',
    topics: ['Animal Production', 'Animal Nutrition', 'Animal Health', 'Breeding', 'Livestock Management'],
    dataFolder: 'agriculture',
    dataFile: 'module5',
    stageNumber: 5,
  },
  'module-6': {
    id: 'module-6',
    examId: 'agriculture',
    examPath: 'agriculture',
    questionCount: 50,
    title: 'Agricultural Extension and Communication',
    description: 'Learn extension theories, communication strategies, and rural development approaches.',
    icon: '📡',
    color: 'from-purple-600 to-purple-800',
    difficulty: 'Hard',
    topics: ['Extension Methods', 'Diffusion of Innovations', 'Communication Models', 'Rural Development', 'Program Planning'],
    dataFolder: 'agriculture',
    dataFile: 'module6',
    stageNumber: 6,
  },

  // ── Education — General Education (shared: Elementary & Secondary) ────────
  'edu-gened-1': {
    id: 'edu-gened-1',
    examId: 'education',
    examPath: 'education',
    questionCount: 50,
    subject: 'general_education',
    track: 'shared',
    title: 'General Education',
    description: 'Covers English, Filipino, Mathematics, Science, and Social Studies aligned to PRC LET standards.',
    icon: '📚',
    color: 'from-sky-600 to-sky-800',
    difficulty: 'Hard',
    topics: ['English Grammar & Usage', 'Filipino Panitikan', 'Mathematics', 'Science', 'Philippine History & Government'],
    dataFolder: 'education/general-education',
    dataFile: 'gened-module1',
    stageNumber: 1,
  },

  // ── Education — Professional Education (shared: Elementary & Secondary) ──
  'edu-profedu-1': {
    id: 'edu-profedu-1',
    examId: 'education',
    examPath: 'education',
    questionCount: 50,
    subject: 'professional_education',
    track: 'shared',
    title: 'Professional Education',
    description: 'Covers teaching principles, child development, curriculum, assessment, and educational laws.',
    icon: '🎓',
    color: 'from-violet-600 to-violet-800',
    difficulty: 'Hard',
    topics: ['Bloom\'s Taxonomy', 'Child Development', 'Curriculum Theory', 'Assessment', 'Educational Laws'],
    dataFolder: 'education/professional-education',
    dataFile: 'profedu-module1',
    stageNumber: 2,
  },

  // ── Education — Specialization (Secondary track only) ─────────────────────
  'edu-english-1': {
    id: 'edu-english-1',
    examId: 'education',
    examPath: 'education',
    questionCount: 50,
    subject: 'english',
    track: 'secondary',
    title: 'English Specialization',
    description: 'Literary analysis, linguistics, language teaching methodology, and communication theory.',
    icon: '✍️',
    color: 'from-rose-600 to-rose-800',
    difficulty: 'Hard',
    topics: ['Literary Theory', 'Morphology & Syntax', 'Philippine Literature', 'CLT Methodology', 'Research Methods'],
    dataFolder: 'education/specialization',
    dataFile: 'english-module1',
    stageNumber: 3,
  },

  'edu-filipino-1': {
    id: 'edu-filipino-1',
    examId: 'education',
    examPath: 'education',
    questionCount: 50,
    subject: 'filipino',
    track: 'secondary',
    title: 'Filipino Specialization',
    description: 'Panitikang Filipino, gramatika, linggwistika, at metodolohiya sa pagtuturo.',
    icon: '🇵🇭',
    color: 'from-amber-600 to-amber-800',
    difficulty: 'Hard',
    topics: ['Ponolohiya at Morpolohiya', 'Panitikang Filipino', 'Tayutay at Retorika', 'Sosyolinggwistika', 'Pagtuturo ng Filipino'],
    dataFolder: 'education/specialization',
    dataFile: 'filipino-module1',
    stageNumber: 4,
  },

  'edu-math-1': {
    id: 'edu-math-1',
    examId: 'education',
    examPath: 'education',
    questionCount: 50,
    subject: 'mathematics',
    track: 'secondary',
    title: 'Mathematics Specialization',
    description: 'Advanced algebra, calculus, number theory, statistics, and problem-solving strategies.',
    icon: '🔢',
    color: 'from-emerald-600 to-emerald-800',
    difficulty: 'Hard',
    topics: ['Number Theory', 'Functions & Algebra', 'Trigonometry', 'Calculus', 'Probability & Statistics'],
    dataFolder: 'education/specialization',
    dataFile: 'math-module1',
    stageNumber: 5,
  },

  'edu-biology-1': {
    id: 'edu-biology-1',
    examId: 'education',
    examPath: 'education',
    questionCount: 50,
    subject: 'biological_science',
    track: 'secondary',
    title: 'Biological Science Specialization',
    description: 'Cell biology, genetics, ecology, physiology, microbiology, and taxonomy.',
    icon: '🧬',
    color: 'from-teal-600 to-teal-800',
    difficulty: 'Hard',
    topics: ['Cell Biology & DNA', 'Genetics & Heredity', 'Ecology & Energy Flow', 'Physiology', 'Taxonomy & Classification'],
    dataFolder: 'education/specialization',
    dataFile: 'biology-module1',
    stageNumber: 6,
  },

  // ── Criminology ──────────────────────────────────────────────────────────
  'crimi-module-1': {
    id: 'crimi-module-1',
    examId: 'criminology',
    examPath: 'criminology',
    questionCount: 50,
    title: 'Criminal Jurisprudence and Procedure',
    description: 'Master the Revised Penal Code, criminal liability, stages of crime, penalties, and criminal procedure aligned to PRC CLE standards.',
    icon: '⚖️',
    color: 'from-red-600 to-red-800',
    difficulty: 'Hard',
    topics: ['Revised Penal Code (RPC)', 'Elements of Crime', 'Stages of Felony', 'Justifying & Exempting Circumstances', 'Criminal Procedure'],
    dataFolder: 'criminology',
    dataFile: 'module1',
    stageNumber: 1,
  },
  'crimi-module-2': {
    id: 'crimi-module-2',
    examId: 'criminology',
    examPath: 'criminology',
    questionCount: 50,
    title: 'Criminalistics',
    description: 'Apply scientific disciplines to crime investigations — dactyloscopy, questioned documents, forensic ballistics, and crime scene analysis.',
    icon: '🔬',
    color: 'from-orange-600 to-orange-800',
    difficulty: 'Medium',
    topics: ['Dactyloscopy (Fingerprinting)', 'Questioned Documents', 'Forensic Ballistics', 'Crime Scene Processing', 'Locard Exchange Principle'],
    dataFolder: 'criminology',
    dataFile: 'module2',
    stageNumber: 2,
  },
  'crimi-module-3': {
    id: 'crimi-module-3',
    examId: 'criminology',
    examPath: 'criminology',
    questionCount: 50,
    title: 'Law Enforcement Administration',
    description: 'Understand PNP organization, police management principles, community policing, and laws governing Philippine law enforcement.',
    icon: '👮',
    color: 'from-blue-600 to-blue-800',
    difficulty: 'Medium',
    topics: ['PNP Organization (RA 6975 & 8551)', 'Police Management Principles', 'Community Policing', 'Patrol Operations', 'Police Ethics & Conduct'],
    dataFolder: 'criminology',
    dataFile: 'module3',
    stageNumber: 3,
  },
  'crimi-module-4': {
    id: 'crimi-module-4',
    examId: 'criminology',
    examPath: 'criminology',
    questionCount: 50,
    title: 'Crime Detection and Investigation',
    description: 'Learn criminal investigation techniques, interview and interrogation methods, surveillance, intelligence operations, and evidence handling.',
    icon: '🔍',
    color: 'from-yellow-600 to-yellow-800',
    difficulty: 'Hard',
    topics: ['Criminal Investigation Process', 'Interview & Interrogation', 'Surveillance Techniques', 'Intelligence Operations', 'Evidence Collection & Handling'],
    dataFolder: 'criminology',
    dataFile: 'module4',
    stageNumber: 4,
  },
  'crimi-module-5': {
    id: 'crimi-module-5',
    examId: 'criminology',
    examPath: 'criminology',
    questionCount: 50,
    title: 'Correctional Administration',
    description: 'Study the Philippine correctional system including BuCor, BJMP, penology theories, probation, parole, and rehabilitation programs.',
    icon: '🏛️',
    color: 'from-slate-600 to-slate-800',
    difficulty: 'Medium',
    topics: ['Bureau of Corrections (BuCor)', 'Bureau of Jail Management & Penology (BJMP)', 'Probation (PD 968)', 'Parole & Executive Clemency', 'Rehabilitation & Reformation'],
    dataFolder: 'criminology',
    dataFile: 'module5',
    stageNumber: 5,
  },
  'crimi-module-6': {
    id: 'crimi-module-6',
    examId: 'criminology',
    examPath: 'criminology',
    questionCount: 50,
    title: 'Sociology of Crimes and Ethics',
    description: 'Explore criminological theories, criminal behavior, victimology, professional ethics, and the sociology of crime and deviance.',
    icon: '📖',
    color: 'from-purple-600 to-purple-800',
    difficulty: 'Medium',
    topics: ['Criminological Theories', 'Crime Causation', 'Victimology', 'Professional Ethics', 'Criminal Justice System'],
    dataFolder: 'criminology',
    dataFile: 'module6',
    stageNumber: 6,
  },
};
