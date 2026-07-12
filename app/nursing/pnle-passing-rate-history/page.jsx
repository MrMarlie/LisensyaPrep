import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "PNLE Passing Rate History - From 45% to a 90% Record",
  description: "The complete PNLE passing rate history and the story behind it - how Philippine nursing board results climbed from below 50% in 2018-2019 to the record 90.04% of November 2025, and what it means for takers.",
  path: "/nursing/pnle-passing-rate-history",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the highest PNLE passing rate in history?","acceptedAnswer":{"@type":"Answer","text":"The November 2025 PNLE posted 90.04 percent, with 40,692 passers out of 45,192 examinees, the highest rate in the modern era."}},{"@type":"Question","name":"Why did PNLE passing rates rise from below 50 percent to 90 percent?","acceptedAnswer":{"@type":"Answer","text":"A combination of stronger post-crisis cohorts, outcomes-based curriculum reforms, a more mature review industry, and the closure of weaker programs during the enrollment trough."}}]};

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
If you told a 2018 nursing graduate that the PNLE would one day post a **90% national passing rate**, they would have laughed — back then, fewer than half of examinees passed. The climb from that trough to November 2025's record is one of the most dramatic stories in Philippine licensure, and it holds real lessons for anyone taking the exam next.

## The Verified Timeline

| Cycle | Passing Rate | Note |
|-------|--------------|------|
| 2018-2019 era | **below 50%** | The modern trough |
| November 2024 | 84.99% (29,349/34,534) | The surge arrives |
| May 2025 | 64.40% (6,935/10,769) | Off-cycle dip; first-timers 87.12%, retakers 35.87% |
| **November 2025** | **90.04%** (40,692/45,192) | **All-time modern record** |
| February 2026 | 44.24% (3,611/8,162) | Small retaker-heavy cohort |

## What Drove the Climb

The honest answer is *several things at once*, and anyone selling a single-cause story is oversimplifying:

**Cohort recovery.** Nursing enrollment cratered after the mid-2010s oversupply crisis, then rebounded with stronger, more motivated cohorts as global demand (and salaries abroad) made nursing prestigious again. Smaller, better-filtered graduating classes pass at higher rates.

**Curriculum and review maturity.** Outcomes-based education reforms, tighter CHED oversight of nursing programs, and a far more sophisticated review industry (structured programs, question banks, online practice) raised the preparation floor.

**School-quality concentration.** Weak programs closed during the enrollment trough; the surviving schools were disproportionately the strong ones — 21 schools posted perfect 100% rates in the record November 2025 cycle alone.

## What the History Means for You

**The February warning:** the record headlines hide the off-cycle reality — February 2026 posted just 44.24%. If you are a retaker or taking an off-cycle exam, your reference point is that number, not the record. Retakers passed at just 35.87% in May 2025; a failed first attempt demands a changed strategy, not a repeated one ([study science here](https://lisensyaprep.com/blog/board-exam-study-tips)).

**The opportunity read:** for well-prepared fresh graduates in main cycles, the odds have never been better — and the license has never been more valuable, feeding both the local system and the [abroad pathways](https://lisensyaprep.com/nursing/filipino-nurse-work-abroad-guide) that now define many Filipino nursing careers.

Preparing for the next cycle? [Free gamified PNLE reviewer, all five subjects](https://lisensyaprep.com/nursing/).

## Frequently Asked Questions

**What is the highest PNLE passing rate ever?**
November 2025's 90.04% — 40,692 passers out of 45,192 — is the modern record.

**Why was the PNLE passing rate so low before?**
The below-50% era around 2018-2019 reflected the post-oversupply enrollment crisis and weaker cohort preparation; recovery came through stronger cohorts, curriculum reform, and school-quality concentration.

**Do retakers really pass at lower rates?**
Dramatically — 35.87% vs 87.12% for first-timers in May 2025. Retaking without changing strategy is the most common failure pattern.
`;

export default function PnlePassingRateHistoryPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-pnle-passing-rate-history-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"PNLE Passing Rate History - How Nursing Went from 45% to 90% in a Decade"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"PNLE Passing Rate History - How Nursing Went from 45% to 90% in a Decade"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 23, 2026</span><span>•</span>
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
