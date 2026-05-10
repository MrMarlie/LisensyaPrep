// Shopee affiliate product database and URL-based mapping

export const PRODUCTS = {
  nursing_saunders: {
    id: 'nursing_saunders',
    name: "Saunders Comprehensive Review for the NCLEX-RN",
    desc: 'The gold standard nursing board exam reviewer — trusted by thousands of Filipino nurses.',
    url: 'https://s.shopee.ph/9zuRvPsBy0',
    category: 'nursing',
    image: null,
  },
  criminology_book: {
    id: 'criminology_book',
    name: 'Criminology Reviewer Book',
    desc: 'Complete CLE reviewer covering all board exam subjects for Filipino criminologists.',
    url: 'https://s.shopee.ph/70GqM93jyE',
    category: 'criminology',
    image: null,
  },
  let_gened: {
    id: 'let_gened',
    name: 'Lorimar General Education LET Reviewer',
    desc: 'Comprehensive GenEd reviewer for the Licensure Examination for Teachers.',
    url: 'https://s.shopee.ph/9UyBKwOVMx',
    category: 'education',
    image: null,
  },
  let_proed: {
    id: 'let_proed',
    name: 'Lorimar Professional Education LET Reviewer',
    desc: 'In-depth ProfEd reviewer aligned with the latest LET board exam coverage.',
    url: 'https://s.shopee.ph/9pb1jcG7Wa',
    category: 'education',
    image: null,
  },
  mtle_henry: {
    id: 'mtle_henry',
    name: "Henry's Clinical Diagnosis and Management",
    desc: 'The essential MTLE reference for medical technologists — clinical lab methods and theory.',
    url: 'https://s.shopee.ph/60OJAg77nU',
    category: 'medical-technology',
    image: null,
  },
  pharmacy_pacop: {
    id: 'pharmacy_pacop',
    name: 'PACOP Pharmacy Reviewer',
    desc: 'Comprehensive pharmacy board exam reviewer written by Philippine pharmacy educators.',
    url: 'https://s.shopee.ph/7fWX9veKkS',
    category: 'pharmacy',
    image: null,
  },
  cse_full: {
    id: 'cse_full',
    name: 'Civil Service Exam Reviewer (Complete)',
    desc: 'Full CSE reviewer covering all subtests — verbal, numerical, analytical, and more.',
    url: 'https://s.shopee.ph/LjwQXJlfU',
    category: 'civil-service',
    image: null,
  },
  cse_pocket: {
    id: 'cse_pocket',
    name: 'Civil Service Exam Pocket Reviewer',
    desc: 'Compact CSE pocket reviewer — perfect for last-minute review and on-the-go study.',
    url: 'https://s.shopee.ph/6L19ZgG65q',
    category: 'civil-service',
    image: null,
  },
  pen_pilot_g2: {
    id: 'pen_pilot_g2',
    name: 'Pilot G2 Black Ballpen 3-Pack',
    desc: 'Smooth-writing gel pens — the go-to choice for PRC board exam takers.',
    url: 'https://s.shopee.ph/1qYkDe2hCT',
    category: 'supplies',
    image: null,
  },
  pen_stabilo: {
    id: 'pen_stabilo',
    name: 'Stabilo Boss Highlighters',
    desc: 'Bright, smear-proof highlighters to make your reviewer notes pop.',
    url: 'https://s.shopee.ph/5VS2aRmmGm',
    category: 'supplies',
    image: null,
  },
  pen_pentel: {
    id: 'pen_pentel',
    name: 'Pentel Energel Pens',
    desc: 'Fast-drying gel pens — another top pick for exam day writing.',
    url: 'https://s.shopee.ph/7AaGZahIg4',
    category: 'supplies',
    image: null,
  },
  study_index_cards: {
    id: 'study_index_cards',
    name: 'Index Cards for Flashcards',
    desc: 'Make your own flashcards — a proven active recall study technique.',
    url: 'https://s.shopee.ph/8piUYqfBNB',
    category: 'supplies',
    image: null,
  },
  study_sticky_notes: {
    id: 'study_sticky_notes',
    name: 'Sticky Notes / Post-its',
    desc: 'Mark key pages in your reviewer and jot down important formulas.',
    url: 'https://s.shopee.ph/1VvtpSQs9g',
    category: 'supplies',
    image: null,
  },
  calc_casio: {
    id: 'calc_casio',
    name: 'Casio FX-991 Plus Scientific Calculator',
    desc: 'The trusted calculator for pharmaceutical calculations and board exam math.',
    url: 'https://s.shopee.ph/2g7rDjP2if',
    category: 'supplies',
    image: null,
  },
  lamp_desk: {
    id: 'lamp_desk',
    name: 'LED Desk Lamp',
    desc: 'Reduce eye strain during long study sessions with adjustable LED lighting.',
    url: 'https://s.shopee.ph/30khccdJlg',
    category: 'supplies',
    image: null,
  },
  lamp_clip: {
    id: 'lamp_clip',
    name: 'Clip LED Lamp',
    desc: 'Portable clip-on LED lamp — great for late-night reviewing anywhere.',
    url: 'https://s.shopee.ph/5ApCCkTuPQ',
    category: 'supplies',
    image: null,
  },
};

// Ordered — first matching pattern wins.
// Each entry maps a URL pattern to products for banner (full) and sidebar (compact) slots.
const PATH_MAPPINGS = [
  {
    pattern: /^\/nursing/,
    banner: ['nursing_saunders'],
    sidebar: 'nursing_saunders',
  },
  {
    pattern: /^\/civil-service/,
    banner: ['cse_full', 'cse_pocket'],
    sidebar: 'cse_full',
  },
  {
    pattern: /^\/criminology/,
    banner: ['criminology_book'],
    sidebar: 'criminology_book',
  },
  {
    // Pharmacy: include calc but NOT in CSE (calculators banned in CSE)
    pattern: /^\/pharmacy/,
    banner: ['pharmacy_pacop', 'calc_casio'],
    sidebar: 'pharmacy_pacop',
  },
  {
    pattern: /^\/medical-technology/,
    banner: ['mtle_henry'],
    sidebar: 'mtle_henry',
  },
  {
    pattern: /^\/education/,
    banner: ['let_gened', 'let_proed'],
    sidebar: 'let_gened',
  },
  {
    // "Mga Dapat Dalhin" / exam-day articles → pens
    pattern: /mga-dapat-dalhin|exam-day/,
    banner: ['pen_pilot_g2', 'pen_pentel'],
    sidebar: null,
  },
  {
    // Blog CSE articles
    pattern: /\/blog\/.*(civil-service|cse|paano-pumasa|libreng-reviewer|dalhin)/,
    banner: ['cse_full', 'cse_pocket'],
    sidebar: 'cse_full',
  },
  {
    // Study tips / workspace articles
    pattern: /how-to-study|review-center|tips-that-work|self-review|study-plan/,
    banner: ['pen_stabilo', 'study_sticky_notes', 'lamp_desk'],
    sidebar: null,
  },
  {
    // General PRC tips articles → writing supplies
    pattern: /prc-board-exam-tips|board-exam-anxiety/,
    banner: ['pen_stabilo', 'study_sticky_notes'],
    sidebar: null,
  },
  // Agriculture, ALE, and general PRC guide articles have no matching product.
  // AdPlaceholder falls back to gray placeholder for those.
];

// Products shown inside the quiz engine, keyed by examId.
const QUIZ_PRODUCT_MAP = {
  nursing: ['nursing_saunders'],
  'civil-service': ['cse_full', 'cse_pocket'],
  criminology: ['criminology_book'],
  pharmacy: ['pharmacy_pacop'],
  'medical-technology': ['mtle_henry'],
  education: ['let_gened', 'let_proed'],
  agriculture: [], // no matching affiliate product
};

/**
 * Returns affiliate products for a given page path and slot type.
 * @param {string} pathname - The current URL pathname (e.g. '/nursing/what-is-the-pnle')
 * @param {'banner'|'sidebar'} slot - Which ad slot is requesting products
 * @returns {import('./affiliateLinks').Product[]}
 */
export function getProductsForPath(pathname, slot = 'banner') {
  for (const mapping of PATH_MAPPINGS) {
    if (mapping.pattern.test(pathname)) {
      if (slot === 'sidebar') {
        if (!mapping.sidebar) return [];
        return [PRODUCTS[mapping.sidebar]].filter(Boolean);
      }
      return (mapping.banner || []).map((id) => PRODUCTS[id]).filter(Boolean);
    }
  }
  return [];
}

/**
 * Returns affiliate products for a quiz page by examId.
 * @param {string} examId - The exam identifier (e.g. 'nursing', 'civil-service')
 * @returns {import('./affiliateLinks').Product[]}
 */
export function getQuizProducts(examId) {
  const ids = QUIZ_PRODUCT_MAP[examId] || [];
  return ids.map((id) => PRODUCTS[id]).filter(Boolean);
}

/**
 * Returns score-contextual message for end-of-quiz affiliate banners.
 * @param {number} percentage - Quiz score percentage (0-100)
 * @returns {string}
 */
export function getScoreMessage(percentage) {
  if (percentage < 60) return 'Boost your score with the right reviewer:';
  if (percentage < 80) return 'Take your prep to the next level:';
  return 'Strengthen your weak areas with a complete reviewer:';
}

/**
 * Logs an affiliate banner click to localStorage for analytics.
 * @param {string} productId
 * @param {string} pathname
 * @param {string} slot
 */
export function trackClick(productId, pathname, slot) {
  try {
    const raw = localStorage.getItem('affiliate_clicks');
    const clicks = raw ? JSON.parse(raw) : [];
    clicks.push({ productId, pathname, slot, timestamp: Date.now() });
    // Keep last 200 entries to avoid unbounded growth
    localStorage.setItem('affiliate_clicks', JSON.stringify(clicks.slice(-200)));
  } catch {
    // localStorage unavailable — silently ignore
  }
}
