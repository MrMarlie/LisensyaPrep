// Config for the public PRC Grade Calculator hub (/tools/prc-grade-calculator).
//
// The UI reads ALL weights and passing rules from here — it invents nothing. Update
// this file when official subject weightings are confirmed; the calculator will pick
// them up automatically.
//
// VERIFIED vs NOT VERIFIED:
//  - Passing rules (passingGWA + subjectFloor) are exact/verified for every exam.
//  - LET subject weightings are VERIFIED (per PRC LET structure).
//  - PNLE / CLE / PhLE / MTLE / ALE subject weightings are SEEDED AS EQUAL with
//    `verified: false`. When any subject in an exam is unverified, the UI shows a
//    notice that the computed GWA is an estimate while the passing rules stay exact.

export interface Subject {
  label: string;
  /** Relative weight. The UI normalizes by the sum of weights, so equal weights
   *  (all 1) mean a straight average. Verified exams use exact percentages. */
  weight: number;
  /** Whether THIS subject's weight reflects the official weighting. */
  verified: boolean;
}

export interface ExamVariant {
  id: string;
  label: string;
  subjects: Subject[];
}

export interface ExamConfig {
  id: string;
  /** Short code shown on the selector, e.g. "LET". */
  name: string;
  /** Full profession + exam name. */
  fullName: string;
  /** Minimum general weighted average (or flat score for CSE) to pass. */
  passingGWA: number;
  /** Minimum any single subject may score. `null` = no per-subject floor. */
  subjectFloor: number | null;
  /** CSE is a single overall rating, not a weighted GWA. */
  singleScore?: boolean;
  /** LET has three structures; pick via a sub-selector. */
  variants?: ExamVariant[];
  /** Non-variant exams list their subjects here. */
  subjects?: Subject[];
  /** Internal link to this profession's reviewer hub. */
  reviewerHref: string;
  notes: string;
}

// Reusable equal-weight subject builder (weight 1, unverified).
const equal = (label: string): Subject => ({ label, weight: 1, verified: false });

export const EXAMS: ExamConfig[] = [
  {
    id: 'let',
    name: 'LET',
    fullName: 'Licensure Examination for Teachers',
    passingGWA: 75,
    subjectFloor: 50,
    reviewerHref: '/education',
    notes:
      'The LET uses different weightings depending on the level and whether you have a specialization. Weightings below are the official LET structure.',
    variants: [
      {
        id: 'elementary',
        label: 'Elementary',
        subjects: [
          { label: 'General Education', weight: 40, verified: true },
          { label: 'Professional Education', weight: 60, verified: true },
        ],
      },
      {
        id: 'elementary-specialization',
        label: 'Elementary (with Specialization)',
        subjects: [
          { label: 'General Education', weight: 20, verified: true },
          { label: 'Professional Education', weight: 40, verified: true },
          { label: 'Specialization', weight: 40, verified: true },
        ],
      },
      {
        id: 'secondary',
        label: 'Secondary',
        subjects: [
          { label: 'General Education', weight: 20, verified: true },
          { label: 'Professional Education', weight: 40, verified: true },
          { label: 'Specialization', weight: 40, verified: true },
        ],
      },
    ],
  },
  {
    id: 'pnle',
    name: 'PNLE',
    fullName: 'Philippine Nurse Licensure Examination',
    passingGWA: 75,
    subjectFloor: 60,
    reviewerHref: '/nursing',
    notes:
      'The PNLE has five Nursing Practice areas. A GWA of at least 75 is required, and no single Nursing Practice may fall below 60 — a higher floor than most other boards.',
    subjects: [
      equal('Nursing Practice I'),
      equal('Nursing Practice II'),
      equal('Nursing Practice III'),
      equal('Nursing Practice IV'),
      equal('Nursing Practice V'),
    ],
  },
  {
    id: 'cle',
    name: 'CLE',
    fullName: 'Criminologist Licensure Examination',
    passingGWA: 75,
    subjectFloor: 50,
    reviewerHref: '/criminology',
    notes:
      'The CLE covers six subject areas. A GWA of at least 75 is required, with no subject below 50.',
    subjects: [
      equal('Criminal Jurisprudence and Procedure'),
      equal('Law Enforcement Administration'),
      equal('Criminalistics'),
      equal('Crime Detection and Investigation'),
      equal('Correctional Administration'),
      equal('Criminal Sociology and Ethics'),
    ],
  },
  {
    id: 'phle',
    name: 'PhLE',
    fullName: 'Pharmacist Licensure Examination',
    passingGWA: 75,
    subjectFloor: 50,
    reviewerHref: '/pharmacy',
    notes:
      'The Pharmacist Licensure Examination requires a GWA of at least 75, with no subject below 50.',
    subjects: [
      equal('Pharmaceutical Chemistry'),
      equal('Pharmacology'),
      equal('Pharmaceutics'),
      equal('Pharmacognosy and Botany'),
      equal('Quality Assurance and Drug Testing'),
      equal('Pharmacy Practice and Legislation'),
    ],
  },
  {
    id: 'mtle',
    name: 'MTLE',
    fullName: 'Medical Technologist Licensure Examination',
    passingGWA: 75,
    subjectFloor: 50,
    reviewerHref: '/medical-technology',
    notes:
      'The MTLE covers six subject areas. A GWA of at least 75 is required, with no subject below 50.',
    subjects: [
      equal('Clinical Chemistry'),
      equal('Microbiology and Parasitology'),
      equal('Hematology'),
      equal('Blood Banking and Serology'),
      equal('Clinical Microscopy'),
      equal('Histopathologic and Cytologic Techniques'),
    ],
  },
  {
    id: 'ale',
    name: 'ALE',
    fullName: 'Agriculturist Licensure Examination',
    passingGWA: 75,
    subjectFloor: 50,
    reviewerHref: '/agriculture',
    notes:
      'The Agriculturist Licensure Examination requires a GWA of at least 75, with no subject below 50.',
    subjects: [
      equal('Crop Science'),
      equal('Animal Science'),
      equal('Soil Science'),
      equal('Crop Protection'),
      equal('Agricultural Economics and Marketing'),
      equal('Agricultural Extension and Communication'),
    ],
  },
  {
    id: 'cse',
    name: 'CSE',
    fullName: 'Civil Service Examination',
    passingGWA: 80,
    subjectFloor: null,
    singleScore: true,
    reviewerHref: '/civil-service',
    notes:
      'The Civil Service Exam is rated as a single overall score. You pass with a flat 80.00 — there are no per-subject floors.',
    subjects: [{ label: 'Overall Rating', weight: 1, verified: true }],
  },
];

/** True when every subject weight in the given list is officially verified. */
export function weightsAreVerified(subjects: Subject[]): boolean {
  return subjects.every((s) => s.verified);
}

export const NOT_VERIFIED_NOTICE =
  'Subject weightings shown as equal; official weightings vary — your computed GWA is an estimate. Passing rules (75 average / subject floor) are exact.';
