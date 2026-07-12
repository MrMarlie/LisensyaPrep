import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "PRC Board Exam Passing Rates Compared (2026 Data Hub)",
  description: "The definitive comparison of PRC board exam passing rates in 2026 - nursing, LET, criminology, pharmacy, medtech, and agriculture side by side, with multi-cycle trends and first-timer vs retaker splits.",
  path: "/blog/prc-passing-rates-compared",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Which PRC board exam has the highest passing rate in 2026?","acceptedAnswer":{"@type":"Answer","text":"The November 2025 nursing board exam posted the highest recent verified rate at 90.04 percent, while the MedTech licensure exam is the most consistently high across cycles."}},{"@type":"Question","name":"Why are 2026 passing rates setting records?","acceptedAnswer":{"@type":"Answer","text":"The CLE, LET, and PNLE have all posted modern-high rates in the 2025-2026 cycles, reflecting some combination of curriculum reforms, improved review culture, and cohort composition effects."}}]};

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
This page is the single reference we wished existed: recent national passing rates for the professions we track, side by side, from official PRC releases — updated every time a new cycle's results drop.

## The Master Table (Most Recent Verified Cycles)

| Exam | Latest Verified Cycle | Passing Rate | Previous Cycles |
|------|----------------------|--------------|-----------------|
| **PNLE** (Nursing) | Nov 2025 | **90.04%** — record | Feb 2026: 44.24% · May 2025: 64.40% · Nov 2024: 84.99% |
| **MTLE** (MedTech) | Mar 2026 | **84.13%** | Aug 2025: 71.19% · Mar 2025: 80.26% |
| **LET** (Overall) | Mar 2026 | **67.17%** — record | Elem 56.03% / Sec 73.10%; prior: 51.04%/72.62% (2025), 46.77%/62.27% (Mar 2025) |
| **CLE** (Criminology) | Feb 2026 | **66.00%** — record | Aug 2025: 51.45% · Feb 2025: 60.50% · Jul 2024: 49.34% |
| **ALE** (Agriculture) | Nov 2025 | **68.55%** | Nov 2024: 50.78% · Nov 2023: 34.18% |
| **PhLE** (Pharmacy) | Apr 2026 | **57.26%** | Nov 2025: 80.57% · Apr 2025: 60.30% |
| **CSE** (Civil Service) | — | Passing score: **80%** | Rates vary by cycle; not a PRC exam (CSC-administered) |

## Five Patterns the Table Hides

**1. 2026 is a record year across the board.** The CLE (66%), LET (67.17%), and the Nov 2025 PNLE (90.04%) all set modern highs — whether from curriculum reforms, better review culture, or cohort effects, the trend is real and worth watching.

**2. Cycle timing is destiny.** November/main cycles (fresh graduates) crush February/off cycles (retaker-heavy) in every profession. The same exam can swing 45 points between cycles.

**3. First-timers vs retakers is the hidden split.** Where PRC publishes it, the gap is stark — 87.12% vs 35.87% in the May 2025 PNLE. If you fail once, your strategy must change, not just repeat.

**4. School gaps dwarf national averages.** Top schools post 99-100% against national rates as low as 34% — [our school rankings](https://lisensyaprep.com/nursing/best-nursing-schools-philippines) quantify this per profession.

**5. Hard ≠ bad career, easy ≠ good career.** Passing rates measure the gate, not what's behind it — pair this table with our [salary guides](https://lisensyaprep.com/civil-service/salary-grade-table-philippines).

## Deep Dives Per Profession

- [Hardest Board Exams Ranked](https://lisensyaprep.com/blog/hardest-board-exams-philippines) · [Highest Passing Rates](https://lisensyaprep.com/blog/easiest-board-exams-philippines)
- [PNLE Rate History](https://lisensyaprep.com/nursing/pnle-passing-rate-history) · [LET Rate History](https://lisensyaprep.com/education/let-passing-rate-history)
- School rankings: [Nursing](https://lisensyaprep.com/nursing/best-nursing-schools-philippines) · [Criminology](https://lisensyaprep.com/criminology/best-criminology-schools-philippines) · [Education](https://lisensyaprep.com/education/best-education-schools-philippines) · [Pharmacy](https://lisensyaprep.com/pharmacy/best-pharmacy-schools-philippines) · [MedTech](https://lisensyaprep.com/medical-technology/best-medtech-schools-philippines) · [Agriculture](https://lisensyaprep.com/agriculture/best-agriculture-schools-philippines)

And whichever exam is yours: [free gamified reviewers](https://lisensyaprep.com/) — because in every row of that table, preparation is the variable you control.
`;

export default function PrcPassingRatesComparedPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-prc-passing-rates-compared-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"PRC Board Exam Passing Rates Compared - Every Profession We Track (2026 Data Hub)"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">PRC Guide</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"PRC Board Exam Passing Rates Compared - Every Profession We Track (2026 Data Hub)"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 22, 2026</span><span>•</span>
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
