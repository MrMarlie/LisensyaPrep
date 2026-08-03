// Client-safe Mock Board metadata (NO server imports). Safe to import from
// client components. Server logic lives in lib/mockExam.js.

export const DURATION_SECS = 180 * 60; // 180 minutes
export const DURATION_LABEL = '3 hours';
export const PASS_MARK = 0.75;
// Per-exam pricing lives on each EXAMS entry below. PRICE stays as a generic
// "from" price for shared copy (e.g. the hub page) — the lower of the two.
export const PRICE = 49;
export const ACCESS_ENDS = 'October 1, 2026';

export const EXAMS = {
  gened: {
    exam: 'gened',
    product: 'mock-gened',
    slug: 'let-gened',
    title: 'LET Gen Ed Mock Board Exam',
    short: 'Gen Ed Mock Board',
    accent: 'green',
    price: 49,
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
    price: 59,
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

// ── PNLE Mock Board ─────────────────────────────────────────────────────────
// One ₱99 purchase (entitlement product `mock-pnle`) unlocks all 5 Nursing
// Practice modules. Each module is its own timed exam (its OWN question bank
// product `mock-pnle-npN` + attempts), sat separately at PRC's ~2 hours per
// 100-item test. PASS RULE (PRC): 75% general average AND no subject below 60%.
export const PNLE = {
  group: 'pnle',
  product: 'mock-pnle', // entitlement product (what the buyer is granted)
  slug: 'pnle',
  price: 99,
  title: 'PNLE Mock Board Exam',
  short: 'PNLE Mock Board',
  accessEnds: 'September 30, 2026',
  moduleDurationLabel: '2 hours per module',
  moduleDurationSecs: 120 * 60, // PRC: ~2 hours per 100-item Nursing Practice test
  generalAverage: 0.75, // passing general average across the 5 modules
  subjectFloor: 0.6, // no single subject/module rating may fall below this
  moduleKeys: ['pnle-np1', 'pnle-np2', 'pnle-np3', 'pnle-np4', 'pnle-np5'],
};

// Each PNLE module. `accessProduct` (umbrella) is what gates entry; `product`
// is the per-module question bank + attempts key. `landingSlug` sends "back"
// links to the shared PNLE hub rather than a per-module page.
export const PNLE_MODULES = {
  'pnle-np1': {
    exam: 'pnle-np1', product: 'mock-pnle-np1', accessProduct: 'mock-pnle',
    slug: 'pnle-np1', landingSlug: 'pnle', group: 'pnle', moduleNo: 1, roman: 'I',
    title: 'PNLE Nursing Practice I Mock Board', short: 'Nursing Practice I',
    subject: 'Nursing Practice I', accent: 'pink', price: 99, total: 100,
    durationSecs: PNLE.moduleDurationSecs, passMark: PNLE.subjectFloor,
    topics: 'Community Health Nursing, Communicable Diseases, Fundamentals of Nursing & Professional Adjustment',
    blurb: 'Nursing Practice I — Community Health, Communicable Diseases, Fundamentals of Nursing, and Professional Adjustment. 100 items, timed at 2 hours like the real PNLE.',
  },
  'pnle-np2': {
    exam: 'pnle-np2', product: 'mock-pnle-np2', accessProduct: 'mock-pnle',
    slug: 'pnle-np2', landingSlug: 'pnle', group: 'pnle', moduleNo: 2, roman: 'II',
    title: 'PNLE Nursing Practice II Mock Board', short: 'Nursing Practice II',
    subject: 'Nursing Practice II', accent: 'pink', price: 99, total: 100,
    durationSecs: PNLE.moduleDurationSecs, passMark: PNLE.subjectFloor,
    topics: 'Maternal and Child Health Nursing (Obstetrics & Pediatrics)',
    blurb: 'Nursing Practice II — Maternal and Child Health Nursing (Obstetrics & Pediatrics). 100 items, timed at 2 hours like the real PNLE.',
  },
  'pnle-np3': {
    exam: 'pnle-np3', product: 'mock-pnle-np3', accessProduct: 'mock-pnle',
    slug: 'pnle-np3', landingSlug: 'pnle', group: 'pnle', moduleNo: 3, roman: 'III',
    title: 'PNLE Nursing Practice III Mock Board', short: 'Nursing Practice III',
    subject: 'Nursing Practice III', accent: 'pink', price: 99, total: 100,
    durationSecs: PNLE.moduleDurationSecs, passMark: PNLE.subjectFloor,
    topics: 'Medical-Surgical Nursing I — Cardiovascular, Respiratory, GI, Renal, Endocrine',
    blurb: 'Nursing Practice III — Medical-Surgical Nursing I (Cardiovascular, Respiratory, GI, Renal, Endocrine). 100 items, timed at 2 hours like the real PNLE.',
  },
  'pnle-np4': {
    exam: 'pnle-np4', product: 'mock-pnle-np4', accessProduct: 'mock-pnle',
    slug: 'pnle-np4', landingSlug: 'pnle', group: 'pnle', moduleNo: 4, roman: 'IV',
    title: 'PNLE Nursing Practice IV Mock Board', short: 'Nursing Practice IV',
    subject: 'Nursing Practice IV', accent: 'pink', price: 99, total: 100,
    durationSecs: PNLE.moduleDurationSecs, passMark: PNLE.subjectFloor,
    topics: 'Psychiatric and Mental Health Nursing',
    blurb: 'Nursing Practice IV — Psychiatric and Mental Health Nursing. 100 items, timed at 2 hours like the real PNLE.',
  },
  'pnle-np5': {
    exam: 'pnle-np5', product: 'mock-pnle-np5', accessProduct: 'mock-pnle',
    slug: 'pnle-np5', landingSlug: 'pnle', group: 'pnle', moduleNo: 5, roman: 'V',
    title: 'PNLE Nursing Practice V Mock Board', short: 'Nursing Practice V',
    subject: 'Nursing Practice V', accent: 'pink', price: 99, total: 100,
    durationSecs: PNLE.moduleDurationSecs, passMark: PNLE.subjectFloor,
    topics: 'Care of Populations, Leadership & Management, Emergency/Disaster, Research & Emerging Topics',
    blurb: 'Nursing Practice V — Care of Populations, Leadership & Management, Emergency/Disaster Nursing, Research & Emerging Topics. 100 items, timed at 2 hours like the real PNLE.',
  },
};

// Combined lookup across LET (EXAMS) + PNLE modules. EXAMS stays LET-only so
// the LET hub's Object.values(EXAMS) is unaffected.
const ALL_EXAMS = { ...EXAMS, ...PNLE_MODULES };

/** @returns {any[]} */
export function pnleModules() {
  return PNLE.moduleKeys.map((k) => PNLE_MODULES[k]);
}

// LET and PNLE-module entries have different shapes; callers treat the result
// as a loose bag of fields, so these lookups return `any`.
/** @returns {any} */
export function examByKey(key) {
  return ALL_EXAMS[key] || null;
}
/** @returns {any} */
export function examByProduct(product) {
  return Object.values(ALL_EXAMS).find((e) => e.product === product) || null;
}
/** @returns {any} */
export function examBySlug(slug) {
  return Object.values(ALL_EXAMS).find((e) => e.slug === slug) || null;
}
