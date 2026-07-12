import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "PRC Board Exam Schedule 2026-2027 (Complete Calendar)",
  description: "Complete PRC board exam schedule for 2026-2027 - CLE, PNLE, LET, PhLE, MTLE, ALE dates, application deadlines, and results timelines, updated from the official PRC calendar.",
  path: "/blog/prc-board-exam-schedule",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Where can I find the official PRC board exam schedule?","acceptedAnswer":{"@type":"Answer","text":"The official calendar is set by annual PRC resolution — Resolution No. 2113 series of 2025 for the 2026 exams — published at prc.gov.ph."}},{"@type":"Question","name":"How early should I apply for a PRC board exam?","acceptedAnswer":{"@type":"Answer","text":"As soon as your application window opens. LERIS appointment slots for popular exams fill early and requirements like transcripts and PSA documents take months to gather."}}]};

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
The PRC publishes its full-year examination calendar through an annual resolution (the 2026 schedule lives in **Resolution No. 2113, s. 2025**) — but reading a government PDF is nobody's idea of clarity. Here is the calendar for the professions we cover, with what each date means for your application timeline.

## 2026 Schedule — Our Professions

| Exam | 2026 Schedule | Status |
|------|---------------|--------|
| **CLE** (Criminology) | February 4-6 ✓ held · **August 1-3** | Aug results expected ~4-5 weeks after |
| **PNLE** (Nursing) | February 26-27 ✓ held · **August 29-30** | Results ~5-15 working days after |
| **LET** (Teachers) | March 15 ✓ held · **September** (confirm exact date on prc.gov.ph) | Results ~40-60 working days after |
| **MTLE** (MedTech) | March 5-6 ✓ held · **August** (confirm exact date on prc.gov.ph) | Results ~3-5 working days after |
| **PhLE** (Pharmacy) | April 18-19 ✓ held · **November** (confirm exact date on prc.gov.ph) | Results ~3-5 working days after |
| **ALE** (Agriculture) | **November** (confirm exact date on prc.gov.ph) | Results ~6 working days after |

✓ = already conducted this year. Always confirm your exam's final dates on the official PRC calendar — the Commission occasionally reschedules for typhoons and holidays (the November 2025 ALE was moved for Super Typhoon Uwan; February 2026 CLE day 3 moved in two cities for Tropical Storm Basyang).

## The Application Timeline That Actually Matters

The exam date is the *last* date in your calendar, not the first:

1. **Application window** — LERIS applications typically close **weeks to months before** the exam; popular exams fill appointment slots early
2. **Requirements prep** — TOR, PSA documents, and school certifications take time to secure; start 3+ months out
3. **NOA and room assignment** — released in the final weeks; watch our per-exam guides
4. **Review runway** — the real deadline: [count backward from exam day](https://lisensyaprep.com/blog/board-exam-study-tips)

Apply through **LERIS (online.prc.gov.ph)** — new to the portal? [Complete LERIS guide](https://lisensyaprep.com/blog/leris-prc-online-guide).

## Results Timelines by Exam (Verified From Recent Cycles)

Fast releases: MTLE and PhLE (2-5 working days). Medium: PNLE (5-15 days), ALE (~6 days). Slow: CLE (20-26 days) and the LET (39-63 days — the pencil-based volume). Bookmark our results-season guides: [after passing, here is everything that comes next](https://lisensyaprep.com/blog/after-passing-board-exam-philippines).

## Frequently Asked Questions

**Where is the official PRC exam schedule?**
PRC Resolution No. 2113, s. 2025 on prc.gov.ph sets the 2026 calendar; the 2027 resolution is typically issued in the second half of 2026.

**How early should I apply for a board exam?**
As soon as your window opens — LERIS appointment slots for popular exams fill early, and document gathering takes longer than most first-timers expect.

**Can exam dates change?**
Yes — typhoons and national events have moved recent exams. Follow the PRC's official pages the week of your exam.
`;

export default function PrcBoardExamSchedulePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-prc-board-exam-schedule-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"PRC Board Exam Schedule 2026-2027 - All Professions Complete Calendar"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">PRC Guide</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"PRC Board Exam Schedule 2026-2027 - All Professions Complete Calendar"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 25, 2026</span><span>•</span>
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
