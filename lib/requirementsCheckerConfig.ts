// Config for the Board Exam Requirements Checker (/tools/requirements-checker).
//
// DESIGN NOTES
//  - Requirements are set by each cycle's OFFICIAL announcement. We never assert a
//    figure that changes (fees) or a spec that changes (photo size/background) as a
//    hard fact — those items are note-hedged and tell the user to confirm in LERIS/CSC.
//  - `verified: true` means the item comes from our published guides (the LERIS guide
//    and the Civil Service article). It does NOT mean "guaranteed current for your
//    cycle" — the footer note and per-item hedges carry that caveat.
//  - Per-profession extras are seeded EMPTY on purpose. We do not invent
//    profession-specific documents; add them only when sourced from an official list.

export const LAST_REVIEWED = 'July 2026';

export type TakerType = 'first-timer' | 'retaker';

export interface ChecklistItem {
  label: string;
  note: string;
  /** True when the item is drawn from our published guides (see note above). */
  verified: boolean;
}

export interface CheckerExam {
  id: string;
  /** Short code for the picker, e.g. "LET". */
  name: string;
  /** Full profession + exam name. */
  fullName: string;
  /** Which checklist track this exam uses. PRC exams share one base list; CSE is separate. */
  track: 'prc' | 'cse';
  /** Profession-specific extras. Seeded empty — do not invent documents. */
  professionExtras: ChecklistItem[];
}

// ---------------------------------------------------------------------------
// PRC base checklist — shared by every PRC exam (LET, PNLE, CLE, PhLE, MTLE, ALE).
// Sourced from our published LERIS online-application guide.
// ---------------------------------------------------------------------------
export const PRC_BASE_ITEMS: ChecklistItem[] = [
  {
    label: 'LERIS account at online.prc.gov.ph',
    note: 'Use a personal email you keep — every notice and appointment update goes there.',
    verified: true,
  },
  {
    label: 'PSA/NSO Birth Certificate',
    note: 'A PSA copy, not a local civil registrar copy.',
    verified: true,
  },
  {
    label:
      'Transcript of Records with scanned picture and Special Order / Board Resolution notation as applicable',
    note: 'Request this early — registrars are the usual bottleneck.',
    verified: true,
  },
  {
    label: 'Valid government ID',
    note: 'Make sure it is unexpired and the name matches your other documents.',
    verified: true,
  },
  {
    label: 'ID photos per current PRC spec',
    note: 'Verify the current size and background rules in LERIS at application time.',
    verified: true,
  },
  {
    label: 'Application fee',
    note: 'The amount varies by exam and is shown in LERIS at the payment step — do not rely on a figure you saw elsewhere.',
    verified: true,
  },
  {
    label: 'Appointment slot + printed Notice of Admission after approval',
    note: 'Book the slot in LERIS, then print the Notice of Admission once your application is approved.',
    verified: true,
  },
];

// PRC retaker add-ons — layered on top of the base list for retakers. General pattern,
// note-hedged because retake rules differ by profession.
export const PRC_RETAKER_ITEMS: ChecklistItem[] = [
  {
    label: 'Prior rating / verification of rating',
    note: 'Check your exam’s current retake rules — some professions require a refresher program after three failed attempts. See our retaker guide.',
    verified: true,
  },
];

// ---------------------------------------------------------------------------
// CSE variant — Civil Service Exam has its own list. Sourced from our CSE article.
// ---------------------------------------------------------------------------
export const CSE_ITEMS: ChecklistItem[] = [
  {
    label: 'CS Form 100 per the current announcement',
    note: 'Download the form referenced in the current CSC examination announcement.',
    verified: true,
  },
  {
    label:
      'Four 4.5×3.5 cm photos with name tag and signature (white background)',
    note: 'Identical recent photos — name tag and signature on each, plain white background.',
    verified: true,
  },
  {
    label: 'Valid government ID',
    note: 'Bring the original; confirm the accepted ID list in the current announcement.',
    verified: true,
  },
  {
    label: 'Exam fee',
    note: 'The amount is set in the current CSC announcement — confirm it before you pay.',
    verified: true,
  },
  {
    label:
      'Application at the CSC Regional / Field Office serving your residence',
    note: 'Confirm the current announcement at csc.gov.ph — slots cap fast.',
    verified: true,
  },
];

// ---------------------------------------------------------------------------
// Exams. PRC exams use the shared PRC track; CSE uses its own.
// professionExtras are intentionally EMPTY for every exam.
// ---------------------------------------------------------------------------
export const CHECKER_EXAMS: CheckerExam[] = [
  {
    id: 'let',
    name: 'LET',
    fullName: 'Licensure Examination for Teachers',
    track: 'prc',
    professionExtras: [],
  },
  {
    id: 'pnle',
    name: 'PNLE',
    fullName: 'Philippine Nurse Licensure Examination',
    track: 'prc',
    professionExtras: [],
  },
  {
    id: 'cle',
    name: 'CLE',
    fullName: 'Criminologist Licensure Examination',
    track: 'prc',
    professionExtras: [],
  },
  {
    id: 'phle',
    name: 'PhLE',
    fullName: 'Pharmacist Licensure Examination',
    track: 'prc',
    professionExtras: [],
  },
  {
    id: 'mtle',
    name: 'MTLE',
    fullName: 'Medical Technologist Licensure Examination',
    track: 'prc',
    professionExtras: [],
  },
  {
    id: 'ale',
    name: 'ALE',
    fullName: 'Agriculturist Licensure Examination',
    track: 'prc',
    professionExtras: [],
  },
  {
    id: 'cse',
    name: 'CSE',
    fullName: 'Civil Service Examination',
    track: 'cse',
    professionExtras: [],
  },
];

export const TAKER_TYPES: { id: TakerType; label: string }[] = [
  { id: 'first-timer', label: 'First-timer' },
  { id: 'retaker', label: 'Retaker' },
];

export function findExam(id: string): CheckerExam {
  return CHECKER_EXAMS.find((e) => e.id === id) ?? CHECKER_EXAMS[0];
}

// Build the full ordered checklist for an exam + taker type. Retaker add-ons only
// apply to the PRC track (CSE retake uses the same document list in its announcement).
export function buildChecklist(examId: string, taker: TakerType): ChecklistItem[] {
  const exam = findExam(examId);
  if (exam.track === 'cse') {
    return [...CSE_ITEMS, ...exam.professionExtras];
  }
  const items = [...PRC_BASE_ITEMS];
  if (taker === 'retaker') items.push(...PRC_RETAKER_ITEMS);
  return [...items, ...exam.professionExtras];
}
