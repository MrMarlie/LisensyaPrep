import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';

export const metadata = buildMetadata({
  title: 'Civil Service Exam Schedule 2026 Complete Timeline (CSC Official Dates)',
  description:
    'When is the Civil Service Exam in 2026? Complete CSE schedule including March 8 and August 9 exam dates, application periods, deadlines, and what to expect for both Professional and Subprofessional levels.',
  path: '/civil-service/cse-schedule-2026',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Civil Service Exam Schedule 2026 Complete Timeline Philippines',
  description:
    'Complete 2026 schedule for the Civil Service Exam including March 8 and August 9 dates, application periods, requirements, and post-exam timeline.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-09',
  dateModified: '2026-05-09',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/civil-service/cse-schedule-2026' },
};

const ALL_CSE_ARTICLES = [
  { text: 'What is the Civil Service Exam? Complete Guide 2026', href: '/blog/what-is-the-civil-service-exam' },
  { text: 'Civil Service Exam Coverage 2026 Complete Subject Breakdown', href: '/civil-service/cse-coverage-2026' },
  { text: 'Civil Service Exam Schedule 2026 Complete Timeline', href: '/civil-service/cse-schedule-2026' },
  { text: 'How to Apply for the Civil Service Exam 2026', href: '/civil-service/cse-application-guide-2026' },
  { text: 'Professional vs Subprofessional CSE Complete Comparison', href: '/civil-service/professional-vs-subprofessional-cse' },
  { text: 'How to Pass the Civil Service Exam on Your First Take', href: '/civil-service/how-to-pass-civil-service-exam' },
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
The Civil Service Commission (CSC) administers the Career Service Examination - Pen and Paper Test (CSE-PPT) **twice a year** in 2026. Knowing the exact schedule is essential because applications open and close on strict deadlines, and slots fill on a first-come, first-served basis.

This page tracks all official 2026 CSE dates and is updated as the CSC releases new announcements.

---

## 2026 CSE-PPT Schedule Overview

| Exam | Exam Date | Application Period |
|------|-----------|-------------------|
| **First Cycle** | **March 8, 2026** | November 3 to 28, 2025 (closed) |
| **Second Cycle** | **August 9, 2026** | **May 14 to June 10, 2026** |

**Key change for 2026:** Starting this year, the first CSE-PPT moves from the first Sunday of March to the **second Sunday of March**. The August CSE-PPT remains on the second Sunday of August.

---

## March 8, 2026 CSE-PPT (Already Held)

The first cycle was administered on **March 8, 2026**. Application period was November 3 to 28, 2025.

**Results:** Released on **May 5, 2026** through the OCSERGS (Online Civil Service Exam Result Generation System) and the CSC website. Examinees can verify their ratings at exam.csc.gov.ph.

If you took the March 2026 CSE and did not pass, you can apply for the August 9, 2026 cycle. Note that you cannot take the same level (Professional or Subprofessional) within 3 months of your previous attempt at that level.

---

## August 9, 2026 CSE-PPT (Application Open)

The second cycle of 2026 will be administered on **August 9, 2026 (Sunday)**.

### Application Period

**Start:** May 14, 2026
**End:** June 10, 2026

Applications are **walk-in only** at CSC Regional Offices and CSC Field Offices nationwide. Some offices may require an online appointment, so check with your specific office before going.

**First-come, first-served basis.** Slots per testing center are limited. CSC may close applications for a specific location even before the official deadline if slots fill up.

### Recommended Action

**Apply during the first week (May 14 to 21).** This protects you from slot shortages especially in Metro Manila, Cebu, and Davao testing centers.

---

## Other CSC Examinations in 2026

Beyond the CSE-PPT, CSC also administers specialized examinations.

**January 25, 2026:** Career Service Exam for Foreign Service Officer (CSE-FSO) — already held

**June 7, 2026:** Fire Officer Exam (FOE) and Penology Officer Exam (POE) — for those pursuing BFP and BJMP careers

The Basic Competency on Local Treasury Examination (BCLTE) is **not being administered in 2026** due to ongoing evaluation by the Department of Finance under RA 12001.

---

## Application Requirements for August 2026 CSE

To apply for the August 9, 2026 CSE-PPT, prepare these documents:

1. **Completely filled out CS Form No. 100** (Application Form, available on csc.gov.ph)
2. **Four (4) pieces of identical 1.8 in x 1.4 in colored ID photos** with white background, taken within the last 3 months, with full name and signature at the back
3. **Original and photocopy of one valid government-issued ID**
4. **Examination fee:** PHP 500
5. **Other documents** as may be required by your CSC Regional or Field Office

**Acceptable Valid IDs include:** Passport, Driver's License, PRC License, SSS ID, GSIS ID (UMID), Voter's ID, BIR/TIN ID with picture, PhilHealth ID with picture, Postal ID, NBI Clearance, School ID, Company ID, Police Clearance, Barangay ID.

For the complete step-by-step application process visit [our CSE Application Guide 2026](/civil-service/cse-application-guide-2026).

---

## What Happens Between Application and Exam Day

### After You Apply

You receive a confirmation slip indicating your application has been processed.

### About 2 Weeks Before Exam

CSC releases the **Online Notice of School Assignment (ONSA)** through csc.gov.ph. This contains your assigned testing venue and room number.

### 1 Day Before Exam

Conduct an **ocular inspection** of your assigned testing venue so you know exactly where it is and how to get there.

### Exam Day (August 9, 2026)

The exam is held on **Sunday from 8:00 AM to 12:00 PM** for Subprofessional and 8:00 AM to 11:10 AM for Professional, depending on your level. Arrive at least **30 minutes early**. Latecomers are typically not allowed to enter once the exam begins.

---

## When Are Results Released?

CSE-PPT results are typically released **60 days (about 2 months) after the exam date**.

For the August 9, 2026 exam, results are expected around **October 2026**. The exact release date will be announced through CSC Examination Advisories.

After results are released, eligible passers can request their **Certificate of Eligibility (COE)** on official CSC letterhead from the CSC Regional or Field Office where they took the exam. The COE is **issued free of charge**.

---

## How to Plan Your Review Around the Schedule

If you are taking the **August 9, 2026 CSE**, here is a recommended timeline:

**May 2026 (now):**
- Submit your application during the May 14 to June 10 window
- Take a diagnostic quiz to identify weak areas

**June 2026:**
- Begin focused subject review
- Start practice questions daily

**July 2026:**
- Intensify review with full-length practice tests
- Identify and repair remaining weak spots

**Early August 2026:**
- Final mock exams under timed conditions
- Light review only in the final week
- Rest and arrive early on August 9

For a complete study plan visit [How to Pass the Civil Service Exam on Your First Take](/civil-service/how-to-pass-civil-service-exam).

---

## Verifying Schedule Updates

The CSC occasionally adjusts schedules. **Always verify the latest information at csc.gov.ph** before making travel or work arrangements.

The CSC also publishes Examination Announcements approximately **3 weeks before each application period**. These announcements contain detailed information including testing centers, qualifications, and document requirements.

**Official CSC channels:**
- Website: csc.gov.ph
- Examination Portal: exam.csc.gov.ph
- Facebook: facebook.com/civilservicegovph

Do not rely on unofficial sources for important schedule information.

---

## Start Your CSE Review Now

LisensyaPrep has free practice questions for the Civil Service Exam. No account needed. With application closing June 10, you have approximately 3 months to prepare for the August 9 exam.

**[Start Your CSE Practice Quiz at LisensyaPrep](/civil-service)**

---

## Related CSE Articles

- [What is the Civil Service Exam Complete Guide 2026](/blog/what-is-the-civil-service-exam)
- [CSE Application Guide 2026 Step by Step](/civil-service/cse-application-guide-2026)
- [Civil Service Exam Coverage 2026 Complete Subject Breakdown](/civil-service/cse-coverage-2026)
- [How to Pass the Civil Service Exam on Your First Take](/civil-service/how-to-pass-civil-service-exam)
- [Professional vs Subprofessional CSE Complete Comparison](/civil-service/professional-vs-subprofessional-cse)
`;

export default function CseSchedule2026Page() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cse-schedule-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/civil-service","name":"Civil Service"},{"url":"/civil-service/cse-schedule-2026","name":"CSE Schedule 2026"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/civil-service" className="text-gray-500 hover:text-gray-300 transition-colors">Civil Service</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">CSE Schedule 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service (CSE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Civil Service Exam Schedule 2026: Complete Timeline Philippines
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 9, 2026</span><span>•</span>
                <span>7 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">Related CSE Articles</h2>
              <ul className="space-y-3">
                {ALL_CSE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Start Your CSE Practice</p>
              <p className="text-gray-400 text-sm mb-4">Free CSE practice questions. No account required.</p>
              <Link href="/civil-service" className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">CSE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_CSE_ARTICLES.map(({ text, href }) => (
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
      <ArticlePopupTriggers type="cse" />
    </div>
  );
}
