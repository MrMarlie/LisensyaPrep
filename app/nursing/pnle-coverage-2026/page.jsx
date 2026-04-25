import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'PNLE Coverage 2026 Complete Topic Breakdown for the Nursing Board Exam Philippines',
  description:
    'What does the PRC nursing board exam cover in 2026? Complete PNLE subject breakdown covering all tested areas with study guides and reviewer links for each topic.',
  path: '/nursing/pnle-coverage-2026',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'PNLE Coverage 2026: Complete Topic Breakdown for the Nursing Board Exam',
  description:
    'Complete breakdown of all PNLE subject areas for the 2026 Philippine Nurse Licensure Examination with exam structure, item distribution, and deep-dive reviewer links for each topic.',
  image: 'https://lisensyaprep.com/images/articles/hero-nle-coverage-2026.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-25',
  dateModified: '2026-04-25',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/pnle-coverage-2026' },
};

const ALL_NLE_ARTICLES = [
  { text: 'PNLE Coverage 2026 Complete Topic Breakdown', href: '/nursing/pnle-coverage-2026' },
  { text: 'Community Health Nursing Reviewer NLE 2026', href: '/nursing/community-health-nursing-reviewer' },
  { text: 'Medical-Surgical Nursing Reviewer NLE 2026', href: '/nursing/medical-surgical-nursing-reviewer' },
];

function formatInline(text) {
  return text
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]*)\)/g,
      (_, t, url) =>
        `<a href="${url}"${url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''} class="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">${t}</a>`
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em class="text-gray-400 italic">$1</em>');
}

function renderContent(content) {
  const lines = content.trim().split('\n');
  const elements = [];
  let key = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-2xl font-extrabold text-white mt-8 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="text-lg font-bold text-yellow-400 mt-6 mb-3">{line.slice(4)}</h3>);
    } else if (line.trim() === '---') {
      elements.push(<hr key={key++} className="border-white/10 my-6" />);
    } else if (line.startsWith('- ')) {
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />);
    } else if (line.startsWith('| ') && line.endsWith(' |')) {
      const cells = line.split('|').filter((c) => c.trim() && !c.match(/^[-\s]+$/));
      const isHeader = i > 0 && lines[i + 1]?.includes('---');
      if (isHeader) {
        elements.push(<tr key={key++} className="border-b border-white/10">{cells.map((cell, ci) => <th key={ci} className="px-4 py-2 text-left text-yellow-400 font-semibold text-sm">{cell.trim()}</th>)}</tr>);
      } else if (!line.match(/^\|[-\s|]+\|$/)) {
        elements.push(<tr key={key++} className="border-b border-white/5">{cells.map((cell, ci) => <td key={ci} className="px-4 py-2 text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: formatInline(cell.trim()) }} />)}</tr>);
      }
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(<p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />);
    }
  }
  const wrapped = [];
  let tableBuffer = [];
  let listBuffer = [];
  let inTable = false;
  let inList = false;
  for (const el of elements) {
    if (el.type === 'tr') {
      if (inList) { wrapped.push(<ul key={`ul-${key++}`} className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>); listBuffer = []; inList = false; }
      inTable = true; tableBuffer.push(el);
    } else if (el.type === 'li') {
      if (inTable) { wrapped.push(<div key={`tbl-${key++}`} className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>); tableBuffer = []; inTable = false; }
      inList = true; listBuffer.push(el);
    } else {
      if (inTable) { wrapped.push(<div key={`tbl-${key++}`} className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>); tableBuffer = []; inTable = false; }
      if (inList) { wrapped.push(<ul key={`ul-${key++}`} className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>); listBuffer = []; inList = false; }
      wrapped.push(el);
    }
  }
  if (inTable && tableBuffer.length) wrapped.push(<div key="tbl-final" className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>);
  if (inList && listBuffer.length) wrapped.push(<ul key="ul-final" className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>);
  return wrapped;
}

const INTRO = `
Before you open a single reviewer, you need to know exactly what the Philippine Nurse Licensure Examination tests. Most NLE examinees start reviewing without a clear map of the coverage and end up spending too much time on subjects they already know while neglecting the ones that cost them points.

This page is your complete PNLE study map. It breaks down what each part of the exam covers and links you to the deep-dive reviewers for each subject on LisensyaPrep.

---

## PNLE Overview: The Basics

The Philippine Nurse Licensure Examination is administered by the PRC Board of Nursing twice a year, typically in February and August.
`;

const AFTER_RESULTS = `
**To pass the PNLE you need:** A general weighted average of at least 75 percent with no individual subject falling below 60 percent.

The 44.24 percent passing rate looks low but it includes everyone who sat for the exam, including those who barely reviewed. Well-prepared self-reviewers consistently perform above the national average.

---

## PNLE Exam Structure

The PNLE is divided into two major parts with a total of 500 items.
`;

const MAIN_CONTENT = `
---

## Subject Area Breakdown

### Part 1: Community Health Nursing (100 items)

Community Health Nursing is the subject most underestimated by NLE examinees. It tests your ability to apply nursing care at the family and community level rather than the individual patient level.

**Major topics covered:**
- Philippine health care delivery system and DOH programs
- Epidemiology and vital statistics including mortality and morbidity rates
- Expanded Program on Immunization (EPI) and vaccine schedules
- Family planning and maternal and child health programs
- Communicable disease control and surveillance
- Environmental health and sanitation
- Nutritional programs and malnutrition management
- Occupational health nursing
- School health nursing
- Disaster nursing and emergency preparedness
- Nursing bag technique and home visits

**Full reviewer:** [Community Health Nursing Reviewer for NLE 2026](https://lisensyaprep.com/nursing/community-health-nursing-reviewer)

**Practice now:** [LisensyaPrep Nursing Quiz](https://lisensyaprep.com/nursing)

---

### Part 2A: Maternal and Child Nursing and Fundamentals of Nursing

**Maternal and Child Nursing topics:**
- Antepartum care: prenatal assessment, danger signs, prenatal visits
- Intrapartum care: stages of labor, fetal monitoring, nursing interventions
- Postpartum care: normal and abnormal findings, breastfeeding support
- Newborn care: APGAR scoring, immediate newborn care, common newborn conditions
- Care of children: growth and development milestones, common childhood illnesses

**Fundamentals of Nursing topics:**
- Nursing process: assessment, diagnosis, planning, implementation, evaluation
- Safety and infection control: standard precautions, aseptic technique
- Vital signs: normal values and interpretation
- Wound care and dressing techniques
- Medication administration: routes, calculations, rights of medication administration
- Documentation and reporting

**Practice now:** [LisensyaPrep Nursing Quiz](https://lisensyaprep.com/nursing)

---

### Part 2B: Medical-Surgical Nursing and Pharmacology

Medical-Surgical Nursing is the largest and most content-heavy subject in the PNLE. It covers nursing care of adult patients across all major body systems.

**Major body systems covered:**
- Cardiovascular: heart failure, MI, hypertension, dysrhythmias
- Respiratory: pneumonia, COPD, asthma, tuberculosis
- Neurological: stroke, seizures, increased intracranial pressure, meningitis
- Gastrointestinal: peptic ulcer, liver cirrhosis, inflammatory bowel disease
- Musculoskeletal: fractures, arthritis, osteoporosis
- Endocrine: diabetes mellitus, thyroid disorders, adrenal disorders
- Renal: acute and chronic kidney disease, urinary tract infections
- Oncology: cancer nursing, chemotherapy, radiation therapy side effects

**Pharmacology topics:**
- Drug classifications and mechanisms of action
- Common drug calculations
- Nursing responsibilities for high-alert medications

**Full reviewer:** [Medical-Surgical Nursing Reviewer for NLE 2026](https://lisensyaprep.com/nursing/medical-surgical-nursing-reviewer)

**Practice now:** [LisensyaPrep Nursing Quiz](https://lisensyaprep.com/nursing)

---

### Part 2C: Psychiatric and Mental Health Nursing

**Major topics covered:**
- Therapeutic communication techniques
- Mental status examination
- Major psychiatric disorders: schizophrenia, mood disorders, anxiety disorders, personality disorders
- Crisis intervention
- Psychopharmacology: antipsychotics, antidepressants, anxiolytics, mood stabilizers
- Legal and ethical issues in psychiatric nursing
- Therapeutic milieu and group therapy

**Practice now:** [LisensyaPrep Nursing Quiz](https://lisensyaprep.com/nursing)

---

## How to Use This Study Map

**Week 1:** Take a diagnostic practice quiz at LisensyaPrep for each PNLE subject. Identify your weakest areas immediately before building your study plan.

**Weeks 2 to 6:** Read the full reviewer for each subject starting with your weakest. After reading each reviewer, practice questions for that subject at LisensyaPrep to test comprehension.

**Weeks 7 to 10:** Take full mixed-subject practice sessions covering all PNLE topics to simulate actual exam conditions.

**Final 2 weeks:** Focus only on weak spots. Protect your sleep and stop introducing new material.

Do not review subjects in equal amounts of time. Community Health Nursing gets significantly underestimated. Medical-Surgical is the largest. Give each subject time proportional to how much it tests and how weak you currently are in it.

---

## PNLE Quick Facts 2026

| Detail | Information |
|--------|-------------|
| Exam Name | Philippine Nurse Licensure Examination (PNLE) |
| Administered By | PRC Board of Nursing |
| Total Items | 500 (Part 1: 100 + Part 2: 400) |
| Passing Score | 75% GWA, no subject below 60% |
| 2026 Schedules | February and August |
| February 2026 Passing Rate | 44.24% |
| Application Portal | online.prc.gov.ph |
`;

export default function PnleCoverage2026Page() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-pnle-coverage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">PNLE Coverage 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (NLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                PNLE Coverage 2026: Complete Topic Breakdown for the Nursing Board Exam
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>April 25, 2026</span><span>•</span>
                <span>8 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-nle-coverage-2026.jpg"
              alt="Filipino nurse in white uniform with stethoscope for PNLE coverage 2026 nursing board exam Philippines"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 180" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="180" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">PNLE February 2026 Official Results</text>
                  <line x1="60" y1="38" x2="700" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="80" y="52" width="175" height="80" fill="#1e3a5f" rx="8"/>
                  <text x="167" y="84" textAnchor="middle" fill="#f59e0b" fontSize="26" fontWeight="700" fontFamily="Arial,sans-serif">8,162</text>
                  <text x="167" y="106" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">Total Examinees</text>
                  <text x="167" y="122" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Feb 2026</text>
                  <rect x="290" y="52" width="175" height="80" fill="#14532d" rx="8"/>
                  <text x="377" y="84" textAnchor="middle" fill="#86efac" fontSize="26" fontWeight="700" fontFamily="Arial,sans-serif">3,611</text>
                  <text x="377" y="106" textAnchor="middle" fill="#d1fae5" fontSize="12" fontFamily="Arial,sans-serif">Total Passers</text>
                  <text x="377" y="122" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">Feb 2026</text>
                  <rect x="500" y="52" width="175" height="80" fill="#78350f" rx="8"/>
                  <text x="587" y="84" textAnchor="middle" fill="#fcd34d" fontSize="26" fontWeight="700" fontFamily="Arial,sans-serif">44.24%</text>
                  <text x="587" y="106" textAnchor="middle" fill="#fef3c7" fontSize="12" fontFamily="Arial,sans-serif">Passing Rate</text>
                  <text x="587" y="122" textAnchor="middle" fill="#fcd34d" fontSize="10" fontFamily="Arial,sans-serif">Feb 2026</text>
                  <text x="380" y="165" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">Source: Professional Regulation Commission | LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>PNLE February 2026 official PRC results</figcaption>
              </figure>

              {renderContent(AFTER_RESULTS)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="300" fill="#0f172a" rx="10"/>
                  <text x="380" y="28" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">PNLE 2026 Exam Structure: 500 Items Total</text>
                  <line x1="40" y1="40" x2="720" y2="40" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="52" width="680" height="58" fill="#1e3a5f" rx="8"/>
                  <text x="160" y="76" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">PART 1</text>
                  <text x="160" y="96" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">Community Health Nursing</text>
                  <text x="490" y="76" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">100 Items (20% of total exam)</text>
                  <text x="490" y="96" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Care of individuals, families, population groups, and communities</text>
                  <rect x="40" y="118" width="680" height="148" fill="#172033" rx="8"/>
                  <text x="160" y="142" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">PART 2</text>
                  <text x="160" y="162" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">Clinical Nursing</text>
                  <text x="490" y="142" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">400 Items (80% of total exam)</text>
                  <text x="490" y="162" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Divided into three parts:</text>
                  <line x1="340" y1="172" x2="700" y2="172" stroke="#334155" strokeWidth="1"/>
                  <text x="490" y="192" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Part A: Maternal and Child Nursing, Fundamentals of Nursing</text>
                  <text x="490" y="212" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Part B: Medical-Surgical Nursing, Pharmacology</text>
                  <text x="490" y="232" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Part C: Psychiatric and Mental Health Nursing</text>
                  <rect x="40" y="274" width="680" height="16" fill="#1e3a5f" rx="4"/>
                  <text x="380" y="286" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Passing: 75% GWA with no subject below 60% | Min passing score per subject: 60%</text>
                  <text x="380" y="295" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>PNLE 2026 exam structure with item distribution</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(MAIN_CONTENT)}
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">All NLE Articles on LisensyaPrep</h2>
              <ul className="space-y-3">
                {ALL_NLE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-pink-900/20 to-pink-900/10 border border-pink-500/30 rounded-2xl p-6 text-center">
              <p className="text-pink-400 font-extrabold text-lg mb-2">Start Your NLE Review</p>
              <p className="text-gray-400 text-sm mb-4">Free practice questions for all NLE subjects. No account required.</p>
              <Link href="/nursing" className="inline-block bg-pink-500 hover:bg-pink-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                🏥 Start Practicing at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">NLE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_NLE_ARTICLES.map(({ text, href }) => (
                  <Link key={href} href={href} className="group block">
                    <p className="text-gray-300 text-sm group-hover:text-yellow-400 transition-colors leading-snug">{text}</p>
                  </Link>
                ))}
              </div>
            </div>
            <AdPlaceholder slot="sidebar" />
          </aside>

        </div>
      </div>
    </div>
  );
}
