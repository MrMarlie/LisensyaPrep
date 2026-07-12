import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Civil Service Exam Schedule 2026-2027 (Dates & How to Apply)",
  description: "Civil Service Exam schedule for 2026-2027 - CSE-PPT exam dates, application periods, requirements, fees, and how to apply for the Professional and SubProfessional levels.",
  path: "/civil-service/civil-service-exam-schedule",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the passing score for the Civil Service Exam?","acceptedAnswer":{"@type":"Answer","text":"80 percent for both the Professional and SubProfessional levels, with no per-subject minimums."}},{"@type":"Question","name":"Who is exempt from taking the Civil Service Exam?","acceptedAnswer":{"@type":"Answer","text":"PRC board exam passers under RA 1080, qualifying honor graduates under PD 907, and holders of other special-law eligibilities already have equivalent civil service eligibility."}}]};

function formatInline(text) {
  return text
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]*)\)/g,
      (_, t, url) =>
        `<a href="${url}"${url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''} class="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">${t}</a>`
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em class="text-gray-400 italic">$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-white/10 px-1 rounded text-yellow-300 text-xs">$1</code>');
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
    } else if (line.startsWith('| ') && line.endsWith(' |')) {
      if (line.match(/^\|[-\s|]+\|$/)) continue;
      const cells = line.split('|').slice(1, -1).map((c) => c.trim());
      const isHeader = lines[i + 1]?.includes('---') && lines[i + 1]?.match(/^\|[-\s|]+\|$/);
      if (isHeader) {
        elements.push(
          <tr key={key++} className="border-b border-white/10">
            {cells.map((cell, ci) => (
              <th key={ci} className="px-4 py-2 text-left text-yellow-400 font-semibold text-sm">{cell}</th>
            ))}
          </tr>
        );
      } else {
        elements.push(
          <tr key={key++} className="border-b border-white/5">
            {cells.map((cell, ci) => (
              <td key={ci} className="px-4 py-2 text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: formatInline(cell) }} />
            ))}
          </tr>
        );
      }
    } else if (line.startsWith('- ')) {
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />);
    } else if (line.match(/^\d+\. /)) {
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, '')) }} />);
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(<p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />);
    }
  }

  const wrapped = [];
  let listBuffer = [];
  let tableBuffer = [];
  const flushList = () => {
    if (listBuffer.length) {
      wrapped.push(<ul key={`ul-${key++}`} className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>);
      listBuffer = [];
    }
  };
  const flushTable = () => {
    if (tableBuffer.length) {
      wrapped.push(
        <div key={`table-${key++}`} className="overflow-x-auto my-4">
          <table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden">
            <tbody>{tableBuffer}</tbody>
          </table>
        </div>
      );
      tableBuffer = [];
    }
  };
  for (const el of elements) {
    if (el.type === 'li') {
      flushTable();
      listBuffer.push(el);
    } else if (el.type === 'tr') {
      flushList();
      tableBuffer.push(el);
    } else {
      flushList();
      flushTable();
      wrapped.push(el);
    }
  }
  flushList();
  flushTable();
  return wrapped;
}

const MAIN_CONTENT = `
The Career Service Examination is among the most-taken exams in the country — hundreds of thousands sit the pen-and-paper test (CSE-PPT) each year chasing the eligibility that unlocks permanent government employment for life. Here is the schedule picture and the application process end to end.

## The 2026-2027 Schedule

The CSC typically administers the **CSE-PPT twice a year** — a first-semester administration around March and a second around August — with application periods closing roughly **two months before** each exam date.

For 2026, the CSC administered the first CSE-PPT on **March 8, 2026** and scheduled the second for **August 9, 2026**. The 2027 dates are announced through the CSC's own examination announcements (each with its own announcement number) on **csc.gov.ph** in the second half of 2026 — always confirm the exact date and application window against the current CSC announcement before you plan around it.

The permanent truths regardless of cycle:

- **Application is through the CSC Regional/Field Office** serving your residence (the CSC has also run online scheduling systems — follow the current announcement's process)
- **Slots are capped per testing center** and fill fast — apply the week the window opens, not the week it closes
- **The fee** is modest (historically in the few-hundred-peso range per level — confirm the current amount in the announcement)

## Requirements Checklist

- Fully accomplished application form (CS Form No. 100, per current announcement)
- Four identical 4.5cm x 3.5cm ID photos with full name tag and signature, white background
- Valid government-issued ID
- Examination fee
- For Professional level: any additional requirements per the announcement

**Eligibility to take it:** Filipino citizen, at least 18 years old, of good moral character, no criminal conviction or dishonorable discharge disqualifications. **No education requirement to sit either level** — though second-level government *positions* require a bachelor's degree at appointment.

## Professional vs SubProfessional: Take Professional

If you have (or will have) a bachelor's degree, take **Professional** — it covers everything SubProfessional does plus all second-level positions, for essentially the same effort. [What each eligibility actually unlocks](https://lisensyaprep.com/civil-service/government-jobs-cse-eligibility).

**And if you already passed a PRC board exam: you do not need this exam at all** — RA 1080 makes your board pass a civil service eligibility automatically.

## The Exam Itself

- **Passing score: 80%** — no subject floors, one number
- Coverage: vocabulary, grammar and correct usage, paragraph organization, reading comprehension, numerical reasoning, and general information (Philippine Constitution, RA 6713 Code of Conduct, environment/peace and human rights basics) — with analytical items heavier at Professional level
- **Eligibility never expires** once earned

Most failures are time-management failures, not knowledge failures — 170 items at Professional level rewards pacing practice above everything. Practice under time pressure: [free gamified CSE reviewers, Professional and SubProfessional](https://lisensyaprep.com/civil-service/).

## Frequently Asked Questions

**When is the next Civil Service Exam?**
The CSC runs the CSE-PPT twice yearly (typically around March and August), announced per administration on csc.gov.ph — application windows close about two months before exam day.

**What is the passing score?**
80% for both levels.

**Who is exempt from the Civil Service Exam?**
Board exam passers (RA 1080), qualifying honor graduates (PD 907), and other special-law eligibles already hold equivalent eligibility.

**How many times can I take it?**
No lifetime limit — you can retake in a later administration (subject to the CSC's retake interval rules per current policy).
`;

export default function CivilServiceExamSchedulePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-civil-service-exam-schedule-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/civil-service" className="text-gray-500 hover:text-gray-300 transition-colors">Civil Service</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"Civil Service Exam Schedule 2026-2027 - Dates, How to Apply, Requirements"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"Civil Service Exam Schedule 2026-2027 - Dates, How to Apply, Requirements"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 26, 2026</span><span>•</span>
                <span>7 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-8 bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 border border-yellow-500/30 rounded-2xl p-6 text-center">
              <p className="text-yellow-400 font-extrabold text-lg mb-2">Still Reviewing for Your Board Exam?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified reviewers for PNLE, LET, CLE, and more. No account required.</p>
              <Link href="/" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Start Reviewing</h3>
              <p className="text-gray-400 text-sm mb-4">Reading is good, but practice is better. Test your knowledge with our free gamified reviewers.</p>
              <Link href="/" className="block w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl text-center text-sm transition-colors">
                ⚔️ Start Quiz
              </Link>
            </div>
            <AdPlaceholder slot="sidebar" />
          </aside>

        </div>
      </div>
    </div>
  );
}
