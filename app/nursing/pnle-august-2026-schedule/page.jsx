import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';

export const metadata = buildMetadata({
  title: 'PNLE August 2026 - Schedule, Coverage & Results Date (Complete Guide)',
  description:
    'PNLE August 2026 complete guide. Exam is August 29-30, 2026. Know the schedule, coverage, results release date, requirements, and how many days left to review for the Nurse Licensure Exam.',
  path: '/nursing/pnle-august-2026-schedule',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'PNLE August 2026 Schedule Coverage Results Date and Complete Guide',
  description:
    'Complete guide to the August 2026 PNLE including the August 29-30 exam date, coverage, results release timeline, requirements, and preparation strategy.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-07-01',
  dateModified: '2026-07-01',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/pnle-august-2026-schedule' },
};

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When is the PNLE in August 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The August 2026 PNLE is scheduled for August 29 and 30, 2026 (Saturday and Sunday), a two-day written examination.',
      },
    },
    {
      '@type': 'Question',
      name: 'When will the August 2026 PNLE results come out?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The target release of results is around September 18, 2026, approximately three weeks after the exam. Confirm through your LERIS account and official PRC announcements.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much is the PNLE exam fee?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The PNLE examination fee is approximately 900 pesos.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the passing score for the PNLE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You need a General Weighted Average of at least 75 percent, with no single subject rating below 60 percent.',
      },
    },
  ],
};

const ALL_NLE_ARTICLES = [
  { text: 'PNLE August 2026 Schedule and Guide', href: '/nursing/pnle-august-2026-schedule' },
  { text: 'What is the PNLE? Complete Guide 2026', href: '/nursing/what-is-the-pnle' },
  { text: 'PNLE Coverage 2026 Complete Topic Breakdown', href: '/nursing/pnle-coverage-2026' },
  { text: 'PNLE Application Guide 2026', href: '/nursing/pnle-application-guide-2026' },
  { text: 'PNLE 3-Month Study Plan 2026', href: '/nursing/pnle-3-month-study-plan' },
  { text: 'PNLE Passing Rate and Results 2026', href: '/nursing/pnle-passing-rate-results-2026' },
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
If you are taking the **August 2026 Philippine Nurse Licensure Examination (PNLE)**, this guide gives you every confirmed detail: the exam date, coverage, results release timeline, and exactly how many weeks you have left to prepare.

---

## When is the August 2026 PNLE?

The **August 2026 PNLE is scheduled for August 29 and 30, 2026** (Saturday and Sunday).

This is the second of two PNLE sittings in 2026. Under **PRC Resolution No. 2113 (series of 2025)**, the PRC moved the PNLE away from the traditional May and November windows to **February and August**. The 2026 dates are:

- **First sitting:** February 26-27, 2026 (completed)
- **Second sitting:** **August 29-30, 2026**

This is a two-day written examination.

---

## How Many Days Left Until the PNLE?

The exam is on **August 29-30, 2026**. Counting from early July, you have roughly **8 weeks** to prepare. This is the critical final-review window.

Plan your study timeline backward from August 29:

- **Weeks 1-3 (July):** Diagnose weak subjects, review foundational content
- **Weeks 4-6 (early-mid August):** Deep review by subject weighted to the exam blueprint
- **Weeks 7-8 (late August):** Full timed mock exams and final high-yield review

Start a free diagnostic quiz to see your weak areas: **[LisensyaPrep PNLE Reviewer](/nursing/)**

---

## Filing and Application

The filing period for the August 2026 PNLE ran from **May 15 to July 15, 2026**. If you have already filed, monitor your LERIS account for your **Notice of Admission (NOA)**, which shows your testing center and room assignment.

The examination fee is approximately **₱900**.

If you need help with your PRC online account, see our [LERIS PRC Online Guide](/blog/leris-prc-online-guide).

---

## PNLE Coverage: What Is Tested

The PNLE consists of **500 multiple-choice questions** divided across **five nursing practice subjects**, with 100 items per subject, spread over two days.

### The Five Subjects

**1. Nursing Practice I — Foundations of Nursing**
Anatomy, physiology, microbiology, pharmacology, health assessment, and nursing fundamentals.

**2. Nursing Practice II — Care of Mother, Child, and Family (Well Clients)**
Maternal and child health, community health nursing, family-centered care.

**3. Nursing Practice III — Care of Clients with Physiologic and Psychosocial Alterations**
Medical-surgical nursing and psychosocial care.

**4. Nursing Practice IV — Care of Clients with Life-Threatening Conditions**
Critical care, emergency nursing, complex conditions.

**5. Nursing Practice V — Care of Clients Across the Lifespan**
Care spanning different life stages and settings.

Since the November 2025 exam, the PRC Board of Nursing has implemented an **Enhanced Table of Specifications (TOS)** under PRC Resolution No. 10 (series of 2025). Study the Enhanced TOS blueprint and allocate your review time proportionally to how each topic is weighted.

For the full subject-by-subject breakdown, see our [PNLE Coverage 2026 guide](/nursing/pnle-coverage-2026).

---

## How the PNLE Is Scored

- You need a **General Weighted Average (GWA) of at least 75%**
- You must **not score below 60% in any of the five subjects**

Falling below 60% in even one subject means you fail the entire exam regardless of your overall average. This is why balanced preparation across all five subjects is essential.

---

## When Will August 2026 PNLE Results Be Released?

The target release of results is around **September 18, 2026**, approximately three weeks after the exam. Actual release timing varies, so monitor your LERIS account and official PRC announcements.

The historical PNLE passing rate hovers around **55%**, meaning roughly 45% of takers do not pass on their first attempt. Preparation strategy makes the difference.

---

## How to Prepare in the Final Weeks

**1. Study the Enhanced TOS blueprint first.** Know exactly how each subject is weighted before you open a book.

**2. Diagnose your weaknesses early.** Take a practice test across all five subjects to find where you stand.

**3. Allocate time by item weight.** Spend more time on heavily weighted topics.

**4. Practice at the right cognitive level.** The Enhanced TOS demands application and analysis, not just recall. Practice with board-style questions.

**5. Take timed mock exams.** 500 questions over two days is mentally exhausting. Build stamina with full timed practice.

**6. Do not fall below 60% anywhere.** Shore up your weakest subject; one failing subject fails the whole exam.

Start practicing free with the LisensyaPrep gamified PNLE reviewer:

**[Start Your Free PNLE Review](/nursing/)**

---

## Frequently Asked Questions

**When is the PNLE in August 2026?**
The August 2026 PNLE is on August 29 and 30, 2026 (Saturday and Sunday).

**How many days before the August 2026 PNLE?**
Counting from early July, roughly 8 weeks (about 55-60 days) remain until the August 29 exam.

**When will the August 2026 PNLE results come out?**
The target release is around September 18, 2026, roughly three weeks after the exam. Confirm through LERIS and PRC announcements.

**How much is the PNLE exam fee?**
Approximately ₱900.

**What is the passing score for the PNLE?**
A General Weighted Average of at least 75%, with no single subject rating below 60%.

**How many questions are on the PNLE?**
500 questions total, 100 per subject across five subjects, over two days.

**Why did the PNLE move to February and August?**
Under PRC Resolution No. 2113 (s. 2025), the PRC shifted the PNLE from the traditional May/November windows to February/August to better align with academic calendars and allow graduates to become licensed sooner.

---

## Related Articles

- [What is the PNLE? Complete Guide](/nursing/what-is-the-pnle)
- [PNLE Coverage 2026 Complete Breakdown](/nursing/pnle-coverage-2026)
- [PNLE Application Guide 2026](/nursing/pnle-application-guide-2026)
- [LERIS PRC Online Guide](/blog/leris-prc-online-guide)
- [How to Download Your PRC Notice of Admission](/blog/how-to-download-prc-notice-of-admission)
`;

export default function PnleAugust2026SchedulePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-pnle-aug-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/nursing","name":"Nursing"},{"url":"/nursing/pnle-august-2026-schedule","name":"PNLE August 2026 Schedule"}]} />
      <Script id="schema-pnle-aug-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">PNLE August 2026 Schedule</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (PNLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                PNLE August 2026: Schedule, Coverage, Results Date, and Complete Guide
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
              <h2 className="text-xl font-extrabold text-white mb-4">Related NLE Articles</h2>
              <ul className="space-y-3">
                {ALL_NLE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-pink-900/20 to-pink-900/10 border border-pink-500/30 rounded-2xl p-6 text-center">
              <p className="text-pink-400 font-extrabold text-lg mb-2">Start Your PNLE Practice</p>
              <p className="text-gray-400 text-sm mb-4">Free NLE practice questions. No account required.</p>
              <Link href="/nursing" className="inline-block bg-pink-500 hover:bg-pink-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
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
      <ArticlePopupTriggers type="pnle" />
    </div>
  );
}
