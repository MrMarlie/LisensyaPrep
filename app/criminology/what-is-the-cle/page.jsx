import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'What is the CLE? Complete Guide to the Criminologist Licensure Examination 2026',
  description:
    'What is the CLE? The Criminologist Licensure Examination is the official PRC board exam for criminology graduates Philippines. This guide covers the meaning, subjects, requirements, schedule, and passing rate.',
  path: '/criminology/what-is-the-cle',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What is the CLE? Complete Guide to the Criminologist Licensure Examination 2026',
  description:
    'Complete guide answering what is the CLE including its meaning, six subjects, requirements, schedule, passing score, and passing rate.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-06',
  dateModified: '2026-05-06',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/criminology/what-is-the-cle' },
};

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does CLE stand for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CLE stands for Criminologist Licensure Examination. It is the official board examination administered by the PRC Board of Criminology in the Philippines.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the CLE passing score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To pass the CLE you need a general weighted average of at least 75 percent and no individual subject score below 60 percent.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many subjects does the CLE have?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The CLE has 6 major subjects: Criminal Jurisprudence and Procedure, Law Enforcement Administration, Criminalistics and Dactyloscopy, Correctional Administration, Juvenile Delinquency and Crime Prevention, and Criminal Sociology and Ethics.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often is the CLE held?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The CLE is administered twice a year, typically in April and October although exact dates can shift between cycles.',
      },
    },
  ],
};

const ALL_CLE_ARTICLES = [
  { text: 'What is the CLE? Complete Guide 2026', href: '/criminology/what-is-the-cle' },
  { text: 'CLE Coverage 2026 Complete Subject Breakdown', href: '/criminology/cle-coverage-2026' },
  { text: 'How to Pass the CLE on Your First Take', href: '/blog/how-to-pass-criminology-board-exam' },
  { text: 'CLE Application Guide via PRC LERIS 2026', href: '/criminology/cle-application-guide-2026' },
  { text: 'CLE Passing Rate and Results 2026', href: '/criminology/cle-passing-rate-results-2026' },
  { text: 'Criminal Jurisprudence and Procedure Reviewer', href: '/criminology/criminal-jurisprudence-procedure-reviewer' },
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
If you are a criminology graduate or current student in the Philippines, you have probably encountered the term CLE many times. But what does it stand for, what does it test, and how do you take it?

This guide answers every question about the CLE in one place.

---

## What Does CLE Stand For?

**CLE stands for Criminologist Licensure Examination.**

It is the official board examination administered by the Philippine Professional Regulation Commission (PRC) Board of Criminology. Passing the CLE is the legal requirement to practice as a Registered Criminologist (RCrim) in the Philippines.

The CLE is sometimes referred to as the **Criminology Board Exam** in everyday conversation. Both terms refer to the same exam.

---

## Who Takes the CLE?

The CLE is taken by graduates of a Bachelor of Science in Criminology (BSCrim) degree from a CHED-recognized university or college in the Philippines.

You must have completed your BSCrim degree before applying for the CLE. Graduates of related fields like criminal justice, forensic science, or police administration may not be eligible unless their degree specifically meets PRC requirements.

---

## When is the CLE Held?

The CLE is administered **twice a year**, typically in **April and October** (sometimes adjusted between February and August depending on the cycle).

For the latest schedule visit [our Complete PRC Board Exam Schedule 2026 guide](/blog/prc-board-exam-schedule-2026-all-professions).

Always verify exact dates at prc.gov.ph as schedules can shift.

---

## What Subjects Does the CLE Cover?

The CLE has **six major subject areas** that all examinees must answer.

### 1. Criminal Jurisprudence and Procedure (Heaviest Subject)

This is the largest subject in the CLE. It covers:

- The Revised Penal Code (Books 1 and 2)
- Criminal procedure under the Revised Rules of Court
- Special penal laws including RA 9165 (Comprehensive Dangerous Drugs Act), RA 9262 (Anti-Violence Against Women and Children), RA 10591 (Comprehensive Firearms and Ammunition Regulation Act), and others
- Constitutional rights of the accused
- Rules on evidence

### 2. Law Enforcement Administration

Covers police administration in the Philippines including:

- RA 6975 (Department of the Interior and Local Government Act)
- RA 8551 (PNP Reform and Reorganization Act)
- PNP organizational structure
- NAPOLCOM powers and functions
- Police operations and patrol

### 3. Criminalistics and Dactyloscopy

Covers forensic science and identification including:

- Fingerprint patterns (loops, whorls, arches) and minutiae
- Dactyloscopy (the science of fingerprint identification)
- Forensic ballistics
- Document examination
- Polygraphy

### 4. Correctional Administration

Covers the Philippine correctional system including:

- Bureau of Corrections (BuCor) under RA 10575
- Bureau of Jail Management and Penology (BJMP)
- Provincial jails
- Probation and parole
- Rehabilitation programs

### 5. Juvenile Delinquency and Crime Prevention

Covers RA 9344 (Juvenile Justice and Welfare Act) including:

- Diversion programs and intervention levels
- Discernment determination
- Children in Conflict with the Law (CICL)
- Crime prevention strategies and theories

### 6. Criminal Sociology and Ethics

Covers:

- Major criminological theories (Classical, Positivist, Sociological, Psychological)
- Theory proponents (Beccaria, Lombroso, Sutherland, Merton, etc.)
- Code of Ethics for Criminologists
- Professional conduct and accountability

For deeper coverage of each subject visit [our CLE Coverage 2026 guide](/criminology/cle-coverage-2026).

---

## What is the CLE Passing Score?

To pass the CLE you need to meet **two requirements simultaneously:**

**Requirement 1:** A general weighted average of **at least 75 percent** across all six subjects.

**Requirement 2:** **No subject score below 60 percent**.

This means a strong overall average is not enough. If even one subject falls below 60, you do not pass the entire exam.

For more on results visit [our CLE Passing Rate and Results 2026 guide](/criminology/cle-passing-rate-results-2026).

---

## What Are the Requirements to Take the CLE?

To apply for the CLE you need:

1. PSA Birth Certificate (PSA-authenticated copy)
2. Official Transcript of Records (OTR) from your criminology school
3. Certificate of Graduation or Diploma
4. Certificate of Good Moral Character
5. 2x2 ID Photos (white background, formal attire, taken within 3 months)
6. Valid Government-Issued ID

For the complete application process visit [our CLE Application Guide 2026](/criminology/cle-application-guide-2026).

---

## What is the CLE Passing Rate?

The CLE passing rate has historically ranged from approximately **30 to 50 percent**, varying significantly between cycles. Fresh graduates from top-performing schools often achieve passing rates well above the national average, while overall examinee pools (including repeat takers) typically fall in the 35 to 45 percent range.

This means roughly half of all examinees do not pass on their first attempt, but with proper preparation and consistent practice, your individual chances are much higher than the national average.

---

## What Comes After Passing the CLE?

**1. Oath Taking Ceremony.** Register through your LERIS account and attend the formal oath-taking event where you officially become a Registered Criminologist (RCrim).

**2. Initial Registration.** Apply for your PRC Certificate of Registration and Professional Identification Card through LERIS.

**3. Begin Practice.** With your RCrim license you can pursue careers in:

- Philippine National Police (after passing additional NAPOLCOM and PNP requirements)
- Bureau of Jail Management and Penology
- Bureau of Corrections
- National Bureau of Investigation
- Bureau of Fire Protection
- Customs, immigration, and other law enforcement agencies
- Private security and investigation firms
- Criminology teaching positions

---

## How Should You Prepare for the CLE?

The most effective CLE preparation combines deep reading of the laws themselves with consistent practice questions. Memorizing summaries is not enough because the CLE often tests specific provisions of laws that summaries miss.

**LisensyaPrep** offers free practice questions for all six CLE subjects with no registration required.

**[Start Your CLE Practice Quiz at LisensyaPrep](/criminology)**

---

## Frequently Asked Questions

**Is the CLE the same as the criminology board exam?**
Yes. CLE and criminology board exam refer to the same examination. CLE is the official name; criminology board exam is the more common term.

**Can I retake the CLE if I do not pass?**
Yes. There is no limit on the number of times you can retake the CLE. You can take it again in the next available cycle.

**How long should I review for the CLE?**
For full-time reviewers, 3 months (12 weeks) is the typical recommendation. For working examinees, 4 to 5 months. For graduates with a long gap since graduation, allow 5 to 6 months.

**What is the most heavily weighted subject in the CLE?**
Criminal Jurisprudence and Procedure is the largest and most heavily weighted subject. Most successful examinees give this subject the most review time.

**Do I need a review center to pass the CLE?**
No. Many examinees pass through self-review using free online resources, the actual texts of relevant laws, and practice question banks. Self-review works especially well for disciplined criminology graduates because the subject matter rewards systematic study.

---

## Related CLE Articles

- [CLE Coverage 2026 Complete Subject Breakdown](/criminology/cle-coverage-2026)
- [How to Pass the CLE on Your First Take](/blog/how-to-pass-criminology-board-exam)
- [CLE Application Guide via PRC LERIS 2026](/criminology/cle-application-guide-2026)
- [CLE Passing Rate and Results 2026](/criminology/cle-passing-rate-results-2026)
- [Criminal Jurisprudence and Procedure Reviewer](/criminology/criminal-jurisprudence-procedure-reviewer)
`;

export default function WhatIsTheClePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cle-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/criminology","name":"Criminology"},{"url":"/criminology/what-is-the-cle","name":"What is the CLE"}]} />
      <Script id="schema-cle-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/criminology" className="text-gray-500 hover:text-gray-300 transition-colors">Criminology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">What is the CLE</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400">Criminology (CLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                What is the CLE? Complete Guide to the Criminologist Licensure Examination 2026
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
              <h2 className="text-xl font-extrabold text-white mb-4">Related CLE Articles</h2>
              <ul className="space-y-3">
                {ALL_CLE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-red-400 font-extrabold text-lg mb-2">Start Your CLE Practice</p>
              <p className="text-gray-400 text-sm mb-4">Free CLE practice questions. No account required.</p>
              <Link href="/criminology" className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">CLE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_CLE_ARTICLES.map(({ text, href }) => (
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
