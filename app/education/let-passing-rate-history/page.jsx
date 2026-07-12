import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "LET Passing Rate History - Elementary vs Secondary Trends",
  description: "Complete LET passing rate history - why elementary rates lag secondary by 15-25 points every cycle, the climb to the record 67.17% of March 2026, and what the trends mean for future LPTs.",
  path: "/education/let-passing-rate-history",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the highest LET passing rate in history?","acceptedAnswer":{"@type":"Answer","text":"The March 2026 LET posted a record 67.17 percent overall, with 56.03 percent for Elementary and 73.10 percent for Secondary, the highest documented in modern times."}},{"@type":"Question","name":"Why do Elementary LET takers pass at lower rates than Secondary?","acceptedAnswer":{"@type":"Answer","text":"Secondary examinees earn 40 percent of their score from a specialization exam in their major subject, while Elementary generalists face broad coverage, making uneven review more costly."}}]};

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
The LET is the largest licensure exam in the Philippines — nearly 100,000 examinees in a single cycle — and for years its reputation was grim: *most takers fail*. The recent data tells a more nuanced and more hopeful story, with one persistent puzzle: the stubborn gap between Elementary and Secondary.

## The Verified Timeline

| Cycle | Elementary | Secondary | Overall Note |
|-------|-----------|-----------|--------------|
| September 2024 | 45.51% (20,025/44,002) | 56.88% (48,875/85,926) | The grim baseline |
| March 2025 | 46.77% (16,282/34,810) | 62.27% (38,747/62,225) | Secondary pulls ahead |
| Sept-Nov 2025 | 51.04% (21,967/43,035) | 72.62% (57,729/79,493) | The climb begins |
| **March 2026** | **56.03%** (18,376/32,796) | **73.10%** (45,001/61,561) | **Record 67.17% overall** |

## The Two Stories in One Table

**Story one: the climb.** Every level, every cycle, the rates have risen — Secondary from 56.88% to 73.10% in eighteen months, Elementary from 45.51% to 56.03%. The March 2026 overall record of 67.17% was called the highest documented in modern times. Contributing factors mirror nursing's: curriculum reform momentum, a maturing review culture, and the sheer competitiveness of teacher education's top (state-university) programs.

**Story two: the stubborn gap.** Elementary trails Secondary by 15-25 points in *every* cycle. The structural reason: Secondary examinees sit a specialization exam in their major — their deepest subject — worth 40% of their score, while Elementary generalists face broad coverage with the [Gen Ed 40/Prof Ed 60 weighting](https://lisensyaprep.com/education/deped-teacher-1-ranking-guide). If you are an Elementary taker, the data's message is blunt: your exam statistically punishes shallow, uneven review more than Secondary does. Blueprint-weighted preparation matters more for you than for anyone.

## What the History Means for You

Even in the record cycle, **one in three examinees failed overall — and more than four in ten Elementary takers.** The rising tide is real but it does not lift the unprepared. And remember what your rating buys beyond the license: up to 10 points in [DepEd Teacher 1 ranking](https://lisensyaprep.com/education/deped-teacher-1-ranking-guide) — aim above the passing line, not at it.

Preparing for the next LET? [Free gamified LET reviewer — Gen Ed and Prof Ed](https://lisensyaprep.com/education/).

## Frequently Asked Questions

**What is the highest LET passing rate ever?**
March 2026's 67.17% overall (56.03% Elementary, 73.10% Secondary) — described as the highest documented in modern times.

**Why is the Elementary LET passing rate lower than Secondary?**
Structure: Secondary takers earn 40% of their score in their specialization — their strongest subject — while Elementary generalists face broad coverage across all areas.

**Is the LET getting easier?**
Rates are rising across levels, but even the record cycle failed one in three takers. The trend reflects better preparation pipelines more than an easier exam.
`;

export default function LetPassingRateHistoryPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-let-passing-rate-history-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"LET Passing Rate History - The Numbers Behind the Teachers' Board Exam"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">Education</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"LET Passing Rate History - The Numbers Behind the Teachers' Board Exam"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 24, 2026</span><span>•</span>
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
