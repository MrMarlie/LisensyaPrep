import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';

export const metadata = buildMetadata({
  title: 'CLE August 2026 - Schedule & Complete Subjects Breakdown (Guide)',
  description:
    'CLE August 2026 complete guide. Criminology board exam is August 1-3, 2026. Know the schedule, all 6 subjects breakdown, passing rate, requirements, and how many subjects are tested.',
  path: '/criminology/cle-august-2026-guide',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'CLE August 2026 Schedule Subjects Breakdown and Complete Guide',
  description:
    'Complete guide to the August 2026 Criminology Licensure Examination including the August 1-3 schedule, all six subjects breakdown, passing rate, and requirements.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-07-01',
  dateModified: '2026-07-01',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/criminology/cle-august-2026-guide' },
};

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When is the CLE in August 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The August 2026 Criminology Licensure Examination is scheduled for August 1, 2, and 3, 2026, a three-day examination.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many subjects are in the criminology board exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Six official subjects: Criminal Jurisprudence and Procedure, Law Enforcement Administration, Criminalistics, Crime Detection and Investigation, Correctional Administration, and Criminal Sociology. Searches for 37 subjects refer to the sub-topics within these six areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the passing score for the CLE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A General Weighted Average of at least 75 percent, with no individual subject rating below 50 percent.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which CLE subjects are weighted the most?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Criminal Jurisprudence and Procedure, Law Enforcement Administration, and Criminalistics each carry approximately 20 percent of the exam.',
      },
    },
  ],
};

const ALL_CLE_ARTICLES = [
  { text: 'CLE August 2026 Schedule and Guide', href: '/criminology/cle-august-2026-guide' },
  { text: 'CLE Coverage 2026 Complete Subject Breakdown', href: '/criminology/cle-coverage-2026' },
  { text: 'How to Apply for CLE via PRC LERIS 2026', href: '/criminology/cle-application-guide-2026' },
  { text: 'CLE Passing Rate and Results 2026', href: '/criminology/cle-passing-rate-results-2026' },
  { text: 'Criminal Jurisprudence and Procedure Reviewer', href: '/criminology/criminal-jurisprudence-procedure-reviewer' },
  { text: 'Law Enforcement Administration Reviewer', href: '/criminology/law-enforcement-administration-reviewer' },
  { text: 'Criminalistics and Dactyloscopy Reviewer', href: '/criminology/criminalistics-dactyloscopy-reviewer' },
  { text: 'Correctional Administration Reviewer CLE 2026', href: '/criminology/correctional-administration-reviewer' },
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
    } else if (line.match(/^\d+\. /)) {
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, '')) }} />);
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

const MAIN_CONTENT = `
If you are taking the **August 2026 Criminologist Licensure Examination (CLE)**, this guide gives you the confirmed schedule, a complete breakdown of every subject tested, the passing requirements, and how to prepare in the weeks remaining.

---

## When is the August 2026 CLE?

The **August 2026 Criminology Licensure Examination is scheduled for August 1, 2, and 3, 2026**.

Under **PRC Resolution No. 2113 (series of 2025)**, the 2026 CLE has two sittings:

- **First sitting:** February 4-6, 2026 (completed)
- **Second sitting:** **August 1-3, 2026**

Unlike many board exams held only twice a year, the CLE consistently draws one of the largest pools of examinees in the country, which is why it is administered as a three-day examination.

---

## How Many Subjects Are in the Criminology Board Exam?

The Criminology Licensure Examination covers **6 official subject areas**. If you have seen searches mentioning "37 subjects," that refers to the many specific sub-topics contained *within* these 6 core areas, not 37 separate exams. The exam is officially organized into these **six subjects**:

### 1. Criminal Jurisprudence and Procedure (around 20%)
Covers the Revised Penal Code, special penal laws, criminal procedure, and evidence. Many questions come straight from the Revised Penal Code, so memorize key definitions, elements of crimes, and penalty rules.

### 2. Law Enforcement Administration (around 20%)
Police organization and administration, history of policing, RA 6975, RA 8551, police operational procedures, and industrial security management.

### 3. Criminalistics (around 20%)
The technical, forensic subject. Covers forensic ballistics, personal identification (fingerprinting, dactyloscopy), questioned documents, forensic photography, forensic chemistry and toxicology, lie detection, and legal medicine.

### 4. Crime Detection and Investigation
Criminal investigation, special crime investigation, traffic management, drug education, organized crime, and fire technology.

### 5. Correctional Administration
The Philippine correctional system, penology, institutional corrections, non-institutional corrections (probation, parole), and treatment of offenders.

### 6. Criminal Sociology (Criminology)
The most theory-heavy subject. Covers schools of criminological thought, theories of crime causation, human behavior, dispute resolution, and professional ethics under RA 6506 and RA 11131.

The three highest-weighted subjects (Criminal Jurisprudence, Law Enforcement Administration, and Criminalistics) each carry roughly 20%, so allocate proportionally more time to these without neglecting the others.

For the full subject-by-subject reviewer with major topics and theorists, see our [CLE Coverage 2026 Complete Breakdown](/criminology/cle-coverage-2026).

---

## How the CLE Is Scored

- You need a **General Weighted Average (GWA) of at least 75%**
- You must have **no individual subject rating below 50%**

A single subject rating below 50% results in a failing mark regardless of your overall average.

---

## The August 2026 Exam Schedule by Day

Based on the standard three-day CLE structure, the subjects are distributed across the three exam days (Day 1 through Day 3). Your exact per-day arrangement appears on your Notice of Admission. The February 2026 CLE, for reference, grouped criminal law/jurisprudence and law enforcement on Day 1, crime detection and forensic science on Day 2, and correctional administration and criminology on Day 3.

---

## CLE Passing Rate

The Criminology board exam passing rate has varied widely across administrations. Recent results:

- **February 2026:** 66.00% (30,320 of 45,936) — the highest national passing rate on record
- **August 2025:** 51.45% (13,074 of 25,410)
- **February 2025:** 60.50% (22,245 of 36,768)

First-time takers from strong programs tend to pass at higher rates than the national average.

---

## Requirements and Application

Applications are filed online through the PRC **LERIS portal**. You need:

- Transcript of Records with Special Order number (BS Criminology, CHED-recognized)
- PSA documents (birth certificate, marriage certificate if applicable)
- Compliant 2x2 photo
- Valid ID

For the complete online application process, see our [LERIS PRC Online Guide](/blog/leris-prc-online-guide) and [CLE Application Guide 2026](/criminology/cle-application-guide-2026).

---

## How to Prepare (Final Weeks Before August 1)

The CLE is a recall-heavy, time-pressured exam. With the exam in early August, your review window is short, so focus:

**1. Diagnose first.** Take a practice quiz per subject to see your weakest areas.

**2. Prioritize the high-weight subjects.** Criminal Jurisprudence, Law Enforcement Administration, and Criminalistics each carry ~20%.

**3. Memorize the Revised Penal Code essentials.** Definitions, elements of crimes, and penalties are reliable points.

**4. Use flashcards for Criminalistics.** Forensic ballistics, fingerprinting, questioned documents, and forensic chemistry are heavy on terminology.

**5. Do not fall below 50% in any subject.** Shore up your weakest area.

**6. Take timed mock exams** to build stamina for the three-day format.

Start practicing free with the LisensyaPrep gamified CLE reviewer covering all six subjects:

**[Start Your Free CLE Review](/criminology/)**

---

## Frequently Asked Questions

**When is the CLE in August 2026?**
The August 2026 Criminology Licensure Examination is on August 1, 2, and 3, 2026.

**How many subjects are in the criminology board exam?**
Six official subjects: Criminal Jurisprudence and Procedure, Law Enforcement Administration, Criminalistics, Crime Detection and Investigation, Correctional Administration, and Criminal Sociology. Searches for "37 subjects" refer to the sub-topics within these six areas.

**What is the passing rate for the CLE?**
It varies by administration. February 2026 hit a record 66%, while August 2025 was 51.45%.

**What is the passing score for the CLE?**
A General Weighted Average of at least 75%, with no individual subject rating below 50%.

**Which CLE subjects are weighted the most?**
Criminal Jurisprudence and Procedure, Law Enforcement Administration, and Criminalistics each carry approximately 20%.

**How is the criminology board exam scheduled?**
It is a three-day examination (August 1-3, 2026), with subjects distributed across the three days as shown on your Notice of Admission.

---

## Related Articles

- [CLE Coverage 2026 Complete Subject Breakdown](/criminology/cle-coverage-2026)
- [CLE Application Guide 2026](/criminology/cle-application-guide-2026)
- [How to Pass the Criminology Board Exam](/blog/how-to-pass-criminology-board-exam)
- [LERIS PRC Online Guide](/blog/leris-prc-online-guide)
- [How to Download Your PRC Notice of Admission](/blog/how-to-download-prc-notice-of-admission)
`;

export default function CleAugust2026GuidePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cle-aug-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/criminology","name":"Criminology"},{"url":"/criminology/cle-august-2026-guide","name":"CLE August 2026 Guide"}]} />
      <Script id="schema-cle-aug-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/criminology" className="text-gray-500 hover:text-gray-300 transition-colors">Criminology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">CLE August 2026 Guide</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400">Criminology (CLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                CLE August 2026: Schedule, Subjects Breakdown, and Complete Guide
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 1, 2026</span><span>•</span>
                <span>9 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">All CLE Articles on LisensyaPrep</h2>
              <ul className="space-y-3">
                {ALL_CLE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-red-400 font-extrabold text-lg mb-2">Start Your CLE Review</p>
              <p className="text-gray-400 text-sm mb-4">Free practice questions for all six CLE subjects. No account required.</p>
              <Link href="/criminology" className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                ⚔️ Start Practicing at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">CLE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_CLE_ARTICLES.slice(0, 6).map(({ text, href }) => (
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
      <ArticlePopupTriggers type="cle" />
    </div>
  );
}
