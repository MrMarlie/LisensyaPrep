import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Top Education Schools Philippines 2026 (LET Passing Rates)",
  description: "The best teacher education schools in the Philippines ranked by actual LET board exam performance - official PRC data on Cebu Normal, PNU, WVSU, Bicol University and more, Elementary and Secondary levels.",
  path: "/education/best-education-schools-philippines",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the best education school in the Philippines based on LET results?","acceptedAnswer":{"@type":"Answer","text":"By recent official PRC data, Cebu Normal University and Philippine Normal University-Manila lead at scale, with West Visayas State University-La Paz, Bicol University-Daraga, and Benguet State University dominating the Elementary level lists."}},{"@type":"Question","name":"Why are state universities dominant in the LET?","acceptedAnswer":{"@type":"Answer","text":"Teacher education is the historic mission of the normal-school system, combining selective admission and deep specialization at state-university tuition. CNU and PNU both began as normal schools."}}]};

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
The LET is the largest licensure exam in the Philippines — the March 2026 cycle alone had **94,357 examinees** — and its school-performance data tells a story most rankings miss: **the top teacher-education schools in the country are overwhelmingly state universities.**

**Methodology:** official PRC top-performing school lists only (100+ examinees passed, with minimum passing-rate thresholds per level under the Commission's criteria), across recent cycles, for both Elementary and Secondary levels, weighting repeat appearances.

## The Recent Cycles at a Glance

| LET Cycle | Passing Rates (Elem / Sec) | Leading Schools (100+ category) |
|-----------|---------------------------|--------------------------------|
| **March 2026** (record overall: 67.17%) | 56.03% / 73.10% | Per PRC's May 2026 release — both topnotchers (Elementary and Secondary #1) came from **Cebu Normal University** |
| Sept-Nov 2025 | 51.04% / 72.62% | Elementary: **WVSU–La Paz** — 99.26% (134/135); Benguet State 2nd at 96.40% |
| March 2025 | 46.77% / 62.27% | Elementary: **Bicol University–Daraga** — 97.12%; Secondary: **PNU–Manila** — 98.98% (390/394) |
| September 2024 | 45.51% / 56.88% | Elementary: **WVSU–La Paz** — 96.40%; Secondary: **Cebu Normal University** — 94.32% (797/845) |

## The Consistency Leaders

1. **Cebu Normal University** — Secondary top school September 2024 at scale (797 passers!), and produced BOTH national topnotchers in March 2026. The single most dominant teacher-education brand in recent data
2. **Philippine Normal University – Manila** — the "National Center for Teacher Education" living up to the title: 98.98% Secondary in March 2025 with a large cohort
3. **West Visayas State University – La Paz** — Elementary top school in two of the last three cycles (99.26% and 96.40%)
4. **Bicol University – Daraga** — Elementary leader March 2025 at 97.12%
5. **Benguet State University** — strong repeat presence in the Elementary top lists

Notice the pattern: **CNU, PNU, WVSU, Bicol U, Benguet State — all state universities.** In teacher education, the country's best programs are also its most affordable. For a future teacher weighing tuition against quality, this data is the strongest value argument in any profession we track.

## How to Read This Honestly

Elementary and Secondary are **different exams with different passing dynamics** — Secondary rates run 15-25 points higher than Elementary in every recent cycle, partly reflecting the specialization structure. Compare schools within the same level. And remember the ranking-points connection: your LET rating is worth up to 10 points in DepEd Teacher 1 ranking — a school that prepares you to score high, not just pass, pays dividends into your hiring. ([How DepEd ranking works](https://lisensyaprep.com/education/deped-teacher-1-ranking-guide))

## Frequently Asked Questions

**What is the best education school in the Philippines?**
By recent official LET data: Cebu Normal University and PNU–Manila lead at scale, with WVSU–La Paz, Bicol University–Daraga, and Benguet State University dominating the Elementary lists.

**Why are state universities so dominant in the LET?**
Teacher education is the historic mission of the normal-school system (CNU and PNU literally began as normal schools), combining selective admission with deep specialization — at state-university tuition.

**Is the Elementary LET harder than Secondary?**
Passing rates are consistently lower for Elementary (45-56% recently vs 57-73% for Secondary), though the exams differ in structure rather than simple difficulty.

**What comes after passing the LET?**
[After Passing the LET: New LPT Next Steps](https://lisensyaprep.com/education/after-passing-let-next-steps) — oath, PRC ID, and the DepEd-vs-private decision.

## Related

- [DepEd Teacher 1 Ranking Guide](https://lisensyaprep.com/education/deped-teacher-1-ranking-guide)
- [Teacher Salary Philippines 2026](https://lisensyaprep.com/education/teacher-salary-philippines)
- [Free Gamified LET Reviewer](https://lisensyaprep.com/education/)
`;

export default function BestEducationSchoolsPhilippinesPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-best-education-schools-philippines-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"Top Education Schools in the Philippines 2026 (Ranked by LET Performance)"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">Education</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"Top Education Schools in the Philippines 2026 (Ranked by LET Performance)"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 15, 2026</span><span>•</span>
                <span>8 min read</span>
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
