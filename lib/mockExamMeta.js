// Client-safe Mock Board metadata (NO server imports). Safe to import from
// client components. Server logic lives in lib/mockExam.js.

export const DURATION_SECS = 180 * 60; // 180 minutes
export const DURATION_LABEL = '3 hours';
export const PASS_MARK = 0.75;
export const PRICE = 99;
export const ACCESS_ENDS = 'October 1, 2026';

export const EXAMS = {
  gened: {
    exam: 'gened',
    product: 'mock-gened',
    slug: 'let-gened',
    title: 'LET Gen Ed Mock Board Exam',
    short: 'Gen Ed Mock Board',
    accent: 'green',
    price: PRICE,
    total: 150,
    blurb: 'Full 150-item General Education simulation — English, Filipino, Math, Sciences, and Social Sciences.',
    subjects: [
      'English', 'Filipino', 'Mathematics', 'Sciences', 'Philippine History',
      'Government & Constitution', 'Economics & Taxation', 'World History & Geography',
      'Humanities & Arts', 'Study & Thinking Skills',
    ],
  },
  profed: {
    exam: 'profed',
    product: 'mock-profed',
    slug: 'let-profed',
    title: 'LET Prof Ed Mock Board Exam',
    short: 'Prof Ed Mock Board',
    accent: 'yellow',
    price: PRICE,
    total: 150,
    blurb: 'Full 150-item Professional Education simulation — required for ALL LET takers (BEEd and BSEd).',
    subjects: [
      'The Teaching Profession & Ethics', 'Child & Adolescent Development',
      'Facilitating Learning & Theories', 'Principles & Strategies of Teaching',
      'Curriculum Development', 'Assessment of Student Learning',
      'Educational Technology & Research',
    ],
  },
};

export function examByKey(key) {
  return EXAMS[key] || null;
}
export function examByProduct(product) {
  return Object.values(EXAMS).find((e) => e.product === product) || null;
}
export function examBySlug(slug) {
  return Object.values(EXAMS).find((e) => e.slug === slug) || null;
}
