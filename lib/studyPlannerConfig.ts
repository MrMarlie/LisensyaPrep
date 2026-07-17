// Config + plan engine for the free Board Exam Study Planner (/tools/study-planner).
//
// DESIGN NOTES
//  - Subject prefills are STARTING POINTS only. Every subject is editable in the UI
//    (add / remove / rename), so we never assert an official subject structure the
//    user can't correct. Exams whose subject breakdown we don't want to hardcode use
//    generic "Subject N" placeholders (placeholder: true) and the UI nudges the user
//    to rename them.
//  - The plan is intentionally low-precision: phases are % of the days remaining, and
//    weekly hours are weighted by self-rated confidence. No fake exactness.

export type Confidence = 'Weak' | 'OK' | 'Strong';

export const CONFIDENCE_LEVELS: Confidence[] = ['Weak', 'OK', 'Strong'];

// Relative weekly-hour weighting by confidence. Weak gets ~2x the time of Strong,
// matching the "roughly 2x hours vs Strong" emphasis called for in the Drilling phase.
export const CONFIDENCE_WEIGHT: Record<Confidence, number> = {
  Weak: 2,
  OK: 1.5,
  Strong: 1,
};

export interface PlannerExam {
  id: string;
  /** Short code for the dropdown, e.g. "LET". */
  name: string;
  /** Full profession + exam name. */
  fullName: string;
  /** Starting subject list (all editable in the UI). */
  subjects: string[];
  /** True when subjects are generic placeholders the user should rename. */
  placeholder?: boolean;
  /** Internal link to this profession's reviewer hub. */
  reviewerHref: string;
}

// Generic editable placeholders for exams whose subject breakdown we don't hardcode.
const generic = (n: number): string[] =>
  Array.from({ length: n }, (_, i) => `Subject ${i + 1}`);

export const PLANNER_EXAMS: PlannerExam[] = [
  {
    id: 'let',
    name: 'LET',
    fullName: 'Licensure Examination for Teachers',
    subjects: ['General Education', 'Professional Education', 'Specialization'],
    reviewerHref: '/education',
  },
  {
    id: 'pnle',
    name: 'PNLE',
    fullName: 'Philippine Nurse Licensure Examination',
    subjects: [
      'Nursing Practice I',
      'Nursing Practice II',
      'Nursing Practice III',
      'Nursing Practice IV',
      'Nursing Practice V',
    ],
    reviewerHref: '/nursing',
  },
  {
    id: 'cle',
    name: 'CLE',
    fullName: 'Criminologist Licensure Examination',
    subjects: [
      'Criminal Jurisprudence',
      'Law Enforcement Administration',
      'Crime Detection & Investigation',
      'Criminalistics',
      'Sociology of Crimes',
      'Correctional Administration',
    ],
    reviewerHref: '/criminology',
  },
  {
    id: 'phle',
    name: 'PhLE',
    fullName: 'Pharmacist Licensure Examination',
    subjects: generic(6),
    placeholder: true,
    reviewerHref: '/pharmacy',
  },
  {
    id: 'mtle',
    name: 'MTLE',
    fullName: 'Medical Technologist Licensure Examination',
    subjects: generic(6),
    placeholder: true,
    reviewerHref: '/medical-technology',
  },
  {
    id: 'ale',
    name: 'ALE',
    fullName: 'Agriculturist Licensure Examination',
    subjects: generic(6),
    placeholder: true,
    reviewerHref: '/agriculture',
  },
  {
    id: 'cse',
    name: 'CSE',
    fullName: 'Civil Service Examination',
    subjects: generic(4),
    placeholder: true,
    reviewerHref: '/civil-service',
  },
];

export function findExam(id: string): PlannerExam {
  return PLANNER_EXAMS.find((e) => e.id === id) || PLANNER_EXAMS[0];
}

// Below this many days remaining, the four-phase plan compresses to three and we
// say so honestly — there simply isn't room for a long foundation build.
export const COMPRESS_THRESHOLD_DAYS = 30;

export interface PhaseDef {
  key: 'foundation' | 'drilling' | 'simulation' | 'taper';
  name: string;
  /** Share of remaining days in a full (>= 30-day) plan. */
  pct: number;
  /** Share of remaining days when the plan is compressed. 0 = phase dropped. */
  pctCompressed: number;
  focus: string;
  /** One plain-language line on the learning-science reason for the phase. */
  why: string;
}

export const PHASE_DEFS: PhaseDef[] = [
  {
    key: 'foundation',
    name: 'Foundation',
    pct: 0.4,
    pctCompressed: 0, // dropped when compressed
    focus:
      'Content review across every subject, paired with a short daily retrieval-practice quiz on what you covered.',
    why: 'Read a topic once, then test yourself on it — retrieval practice locks in far more than re-reading the same page twice.',
  },
  {
    key: 'drilling',
    name: 'Drilling',
    pct: 0.3,
    pctCompressed: 0.5,
    focus:
      'Heavy practice questions, weighted toward your Weak subjects (roughly twice the hours of your Strong ones). Review every miss.',
    why: 'Spacing weak subjects across the week instead of cramming one per day, and interleaving subjects, forces your brain to choose the right method — exactly what the real exam demands.',
  },
  {
    key: 'simulation',
    name: 'Simulation',
    pct: 0.2,
    pctCompressed: 0.3,
    focus:
      'Full-length, timed mock sets under exam conditions. Score them, then spend the rest of the week on your weakest areas from each mock.',
    why: 'Timed mocks build stamina and pacing so exam day feels familiar, not novel — and your mock mistakes are the highest-yield thing left to fix.',
  },
  {
    key: 'taper',
    name: 'Taper',
    pct: 0.1,
    pctCompressed: 0.2,
    focus:
      'Light review of summaries and flagged mistakes only. Protect your sleep, and handle logistics: confirm your NOA, visit or map your room/school assignment, prep your kit.',
    why: 'Sleep is when the brain consolidates everything you drilled — protecting it in the final stretch beats one more anxious all-nighter.',
  },
];

export interface PlannerInputs {
  examId: string;
  examDate: string; // YYYY-MM-DD
  weekdayHours: number;
  weekendHours: number;
  subjects: { name: string; confidence: Confidence }[];
}

export interface PhasePlan {
  key: PhaseDef['key'];
  name: string;
  pct: number;
  days: number;
  startLabel: string;
  endLabel: string;
  focus: string;
  why: string;
}

export interface SubjectAllocation {
  name: string;
  confidence: Confidence;
  hoursPerWeek: number;
  sharePct: number;
}

export interface StudyPlan {
  valid: boolean;
  reason?: string;
  daysRemaining: number;
  weeksRemaining: number;
  weeklyHours: number;
  totalHours: number;
  compressed: boolean;
  phases: PhasePlan[];
  allocation: SubjectAllocation[];
  rhythm: string;
}

const roundHalf = (n: number) => Math.round(n * 2) / 2;

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Whole days between two dates, using local midnight so partial days don't drift.
function daysBetween(from: Date, to: Date): number {
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const b = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

/**
 * Build the phased study plan from the user's inputs. Pure and deterministic given
 * `today`, so it is easy to reason about and test. Returns { valid: false } with a
 * reason for bad dates rather than throwing.
 */
export function buildPlan(inputs: PlannerInputs, today: Date = new Date()): StudyPlan {
  const empty: StudyPlan = {
    valid: false,
    daysRemaining: 0,
    weeksRemaining: 0,
    weeklyHours: 0,
    totalHours: 0,
    compressed: false,
    phases: [],
    allocation: [],
    rhythm: '',
  };

  if (!inputs.examDate) {
    return { ...empty, reason: 'Pick your exam date to build a plan.' };
  }
  const exam = new Date(`${inputs.examDate}T00:00:00`);
  if (Number.isNaN(exam.getTime())) {
    return { ...empty, reason: 'That exam date does not look valid.' };
  }

  const daysRemaining = daysBetween(today, exam);
  if (daysRemaining <= 0) {
    return {
      ...empty,
      reason:
        'Your exam date is today or in the past. Pick a future date to build a review schedule.',
    };
  }

  const weeklyHours = roundHalf(inputs.weekdayHours * 5 + inputs.weekendHours * 2);
  const weeksRemaining = daysRemaining / 7;
  const totalHours = roundHalf(weeklyHours * weeksRemaining);
  const compressed = daysRemaining < COMPRESS_THRESHOLD_DAYS;

  // Phases: drop Foundation when compressed, then lay days out end to end so the
  // ranges never overlap and always sum to exactly daysRemaining.
  const active = PHASE_DEFS.filter((p) =>
    compressed ? p.pctCompressed > 0 : true
  );

  const phases: PhasePlan[] = [];
  let cursor = 0; // day offset from today
  active.forEach((def, i) => {
    const pct = compressed ? def.pctCompressed : def.pct;
    const isLast = i === active.length - 1;
    let days = isLast
      ? daysRemaining - cursor
      : Math.max(1, Math.round(pct * daysRemaining));
    // Guard against rounding overrun on tiny windows.
    if (!isLast && cursor + days > daysRemaining - (active.length - 1 - i)) {
      days = Math.max(1, daysRemaining - cursor - (active.length - 1 - i));
    }
    const start = new Date(today);
    start.setDate(start.getDate() + cursor);
    const end = new Date(today);
    end.setDate(end.getDate() + cursor + days - 1);
    if (days > 0) {
      phases.push({
        key: def.key,
        name: def.name,
        pct,
        days,
        startLabel: formatDate(start),
        endLabel: formatDate(end),
        focus: def.focus,
        why: def.why,
      });
    }
    cursor += days;
  });

  // Weekly hour allocation, weighted by confidence.
  const named = inputs.subjects.filter((s) => s.name.trim().length > 0);
  const sumW = named.reduce((sum, s) => sum + CONFIDENCE_WEIGHT[s.confidence], 0);
  const allocation: SubjectAllocation[] = named.map((s) => {
    const w = CONFIDENCE_WEIGHT[s.confidence];
    const share = sumW > 0 ? w / sumW : 0;
    return {
      name: s.name.trim(),
      confidence: s.confidence,
      hoursPerWeek: roundHalf(share * weeklyHours),
      sharePct: Math.round(share * 100),
    };
  });

  const rhythm =
    `Aim for about ${weeklyHours} focused hours a week (${inputs.weekdayHours}h per weekday, ` +
    `${inputs.weekendHours}h per weekend day). On weekdays, take one or two subjects and end each ` +
    `session with a short self-quiz instead of re-reading. Keep weekends for longer blocks — ` +
    `mixed practice sets and reviewing everything you got wrong that week. Rest at least one ` +
    `half-day so the schedule is survivable to exam day.`;

  return {
    valid: true,
    daysRemaining,
    weeksRemaining: Math.round(weeksRemaining * 10) / 10,
    weeklyHours,
    totalHours,
    compressed,
    phases,
    allocation,
    rhythm,
  };
}
