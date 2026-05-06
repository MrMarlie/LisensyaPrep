import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'What is the MTLE? Complete Guide to the Medical Technologist Licensure Examination 2026',
  description:
    'What is the MTLE? The Medical Technologist Licensure Examination is the official PRC board exam for med tech graduates Philippines. This guide covers meaning, subjects, requirements, and schedule.',
  path: '/medical-technology/what-is-the-mtle',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What is the MTLE? Complete Guide to the Medical Technologist Licensure Examination 2026',
  description:
    'Complete guide answering what is the MTLE including its meaning, six subjects, requirements, schedule, passing score, and career opportunities for Registered Medical Technologists.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-06',
  dateModified: '2026-05-06',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/medical-technology/what-is-the-mtle' },
};

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does MTLE stand for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MTLE stands for Medical Technologist Licensure Examination. It is the official board examination administered by the PRC Board of Medical Technology in the Philippines under RA 5527.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the MTLE passing score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To pass the MTLE you need a general weighted average of at least 75 percent and no individual subject score below 60 percent.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many subjects does the MTLE have?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The MTLE has 6 major subjects: Clinical Chemistry, Hematology, Microbiology and Parasitology, Blood Banking and Serology, Urinalysis and Body Fluids, and Histopathology and Cytology.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an internship to take the MTLE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Completion of a 12-month internship in an accredited hospital laboratory is a strict requirement before taking the MTLE.',
      },
    },
  ],
};

const ALL_MTLE_ARTICLES = [
  { text: 'What is the MTLE? Complete Guide 2026', href: '/medical-technology/what-is-the-mtle' },
  { text: 'MTLE Coverage 2026 Complete Subject Breakdown', href: '/medical-technology/mtle-coverage-2026' },
  { text: 'How to Pass the MTLE Board Exam on Your First Take', href: '/medical-technology/how-to-pass-mtle-board-exam' },
  { text: 'MTLE Application Guide and Passing Rate 2026', href: '/medical-technology/mtle-application-results-2026' },
  { text: 'Hematology Reviewer for MTLE Philippines 2026', href: '/medical-technology/hematology-reviewer' },
  { text: 'Clinical Chemistry Reviewer MTLE Philippines 2026', href: '/medical-technology/clinical-chemistry-reviewer' },
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
If you are a Medical Technology graduate in the Philippines or planning to become one, you have probably heard the term MTLE. But what does it stand for, what does it cover, and what do you need to know to take it?

This guide answers every question about the MTLE in one place.

---

## What Does MTLE Stand For?

**MTLE stands for Medical Technologist Licensure Examination.**

It is the official board examination administered by the Philippine Professional Regulation Commission (PRC) Board of Medical Technology. Passing the MTLE is the legal requirement to practice as a Registered Medical Technologist (RMT) in the Philippines.

The MTLE is governed by **Republic Act 5527** (the Medical Technology Act of 1969) and its subsequent amendments.

---

## Who Takes the MTLE?

The MTLE is taken by graduates of a **Bachelor of Science in Medical Technology (BSMT)** or **Bachelor of Science in Medical Laboratory Science (BSMLS)** from a CHED-recognized university or college in the Philippines.

In addition to the four-year academic degree, examinees must have completed their **internship** (typically a 12-month clinical rotation in an accredited hospital laboratory).

---

## When is the MTLE Held?

The MTLE is administered **twice a year**, typically in **February and August**.

**For 2026:** The August 2026 MTLE is the next scheduled cycle. Application windows typically open 2 to 3 months before the exam date.

For the complete schedule visit [our PRC Board Exam Schedule 2026 guide](/blog/prc-board-exam-schedule-2026-all-professions).

---

## What Subjects Does the MTLE Cover?

The MTLE has **six major subject areas** that comprehensively test all aspects of clinical laboratory practice.

### 1. Clinical Chemistry

Covers the chemical analysis of blood and body fluids including:

- Glucose metabolism and diabetes diagnosis
- Lipid panel and cardiovascular risk markers
- Liver function tests (ALT, AST, ALP, bilirubin, albumin)
- Renal function tests (BUN, creatinine, GFR)
- Electrolytes and acid-base balance
- Cardiac enzymes
- Quality control procedures (Levey-Jennings, Westgard rules)

### 2. Hematology

Covers the study of blood cells and disorders including:

- Complete Blood Count (CBC) interpretation
- Red blood cell morphology
- White blood cell differential
- Coagulation cascade (PT, aPTT)
- Anemia classification by MCV
- Hemoglobin disorders

### 3. Microbiology and Parasitology

Covers identification of disease-causing organisms including:

- Gram stain procedure and interpretation
- Common bacterial pathogens
- Culture media (Blood agar, MacConkey, Chocolate, Thayer-Martin)
- Special stains (acid-fast, India ink, KOH)
- Malaria species and other parasites

### 4. Blood Banking and Serology

Covers transfusion medicine including:

- ABO blood group system
- Rh system and weak D
- Crossmatching procedures
- Blood components and storage
- Transfusion reactions
- Direct vs Indirect Antiglobulin Test

### 5. Urinalysis and Body Fluids

Covers physical, chemical, and microscopic examination of urine and other body fluids including CSF, pleural fluid, and synovial fluid.

### 6. Histopathology and Cytology

Covers tissue and cell preparation for diagnostic microscopy including tissue processing, H and E staining, special stains, the Pap stain, and the Bethesda System for cervical cytology.

For deeper coverage of each subject visit [our MTLE Coverage 2026 guide](/medical-technology/mtle-coverage-2026).

---

## What is the MTLE Passing Score?

To pass the MTLE you need to meet **two requirements simultaneously:**

**Requirement 1:** A general weighted average of **at least 75 percent**.

**Requirement 2:** **No subject score below 60 percent**.

This means a balanced performance across all six subjects is essential. Failing in any single subject area below 60 percent disqualifies you from passing the entire exam regardless of your overall average.

---

## What Are the Requirements to Take the MTLE?

To apply for the MTLE you need:

1. PSA Birth Certificate (PSA-authenticated copy)
2. Official Transcript of Records (OTR) for BS Medical Technology
3. Certificate of Graduation or Diploma
4. Certificate of Internship Completion (12-month clinical training)
5. Certificate of Good Moral Character
6. 2x2 ID Photos (white background, formal attire, taken within 3 months)
7. Valid Government-Issued ID

For the complete application process visit [our MTLE Application Guide 2026](/medical-technology/mtle-application-results-2026).

---

## What is the MTLE Passing Rate?

The MTLE passing rate has historically ranged from approximately **45 to 70 percent**, with significant variation between cycles. Fresh graduates from strong medical technology schools often achieve passing rates well above 80 percent, while the overall examinee pool (including repeat takers) typically falls in the 50 to 65 percent range.

This is one of the higher passing rates among PRC board exams, reflecting the rigorous internship requirement that filters candidates before they even apply.

---

## What Comes After Passing the MTLE?

**1. Oath Taking Ceremony.** Register through your LERIS account for the oath-taking event where you officially become a Registered Medical Technologist (RMT).

**2. Initial Registration.** Apply for your PRC Certificate of Registration and Professional Identification Card.

**3. Begin Practice.** With your RMT license you can pursue careers in:

- Hospital clinical laboratories
- Private diagnostic laboratories
- Blood banks and transfusion services
- Public health laboratories (DOH, BOC, RITM)
- Research institutions
- Pharmaceutical companies
- Medical sales and technical support
- Academia (teaching medical technology)

Many Filipino medical technologists also pursue international careers, particularly in the United States (after passing the ASCP BOC exam), the Middle East, and Australia.

---

## How Should You Prepare for the MTLE?

The MTLE is a content-dense exam covering six technical disciplines. The most effective preparation combines comprehensive subject review with daily practice questions.

**LisensyaPrep** offers free practice questions for all MTLE subjects with no registration required.

**[Start Your MTLE Practice Quiz at LisensyaPrep](/medical-technology)**

For a complete study plan visit [How to Pass the MTLE Board Exam](/medical-technology/how-to-pass-mtle-board-exam).

---

## Frequently Asked Questions

**Is the MTLE the same as the medical laboratory science board exam?**
Yes. The MTLE is the official board exam for both Medical Technology (BSMT) and Medical Laboratory Science (BSMLS) graduates. The terms refer to the same exam.

**Can I take the MTLE without completing my internship?**
No. Internship completion is a strict requirement. You cannot apply for the MTLE without proof of completed clinical training.

**How long should I review for the MTLE?**
For full-time reviewers, 8 to 10 weeks is typical. For working examinees, allow 12 to 14 weeks. For graduates with a long gap, plan for 16 weeks or more.

**What is the most heavily weighted subject in the MTLE?**
Clinical Chemistry typically carries the highest weight, followed closely by Hematology and Microbiology. However, all six subjects matter because falling below 60 percent in any single subject means failing the entire exam.

**Can foreign-trained med tech graduates take the MTLE?**
Foreign graduates may take the MTLE if their degree meets PRC and CHED equivalency requirements. The evaluation process is more involved than for local graduates. Check prc.gov.ph for current foreign credential requirements.

---

## Related MTLE Articles

- [MTLE Coverage 2026 Complete Subject Breakdown](/medical-technology/mtle-coverage-2026)
- [How to Pass the MTLE Board Exam on Your First Take](/medical-technology/how-to-pass-mtle-board-exam)
- [MTLE Application Guide and Passing Rate 2026](/medical-technology/mtle-application-results-2026)
- [Hematology Reviewer for MTLE Philippines 2026](/medical-technology/hematology-reviewer)
- [Clinical Chemistry Reviewer MTLE Philippines 2026](/medical-technology/clinical-chemistry-reviewer)
`;

export default function WhatIsTheMtlePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-mtle-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <Script id="schema-mtle-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/medical-technology" className="text-gray-500 hover:text-gray-300 transition-colors">Medical Technology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">What is the MTLE</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400">Medical Technology (MTLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                What is the MTLE? Complete Guide to the Medical Technologist Licensure Examination 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 6, 2026</span><span>•</span>
                <span>9 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">Related MTLE Articles</h2>
              <ul className="space-y-3">
                {ALL_MTLE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-cyan-900/20 to-cyan-900/10 border border-cyan-500/30 rounded-2xl p-6 text-center">
              <p className="text-cyan-400 font-extrabold text-lg mb-2">Start Your MTLE Practice</p>
              <p className="text-gray-400 text-sm mb-4">Free MTLE practice questions. No account required.</p>
              <Link href="/medical-technology" className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">MTLE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_MTLE_ARTICLES.map(({ text, href }) => (
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
