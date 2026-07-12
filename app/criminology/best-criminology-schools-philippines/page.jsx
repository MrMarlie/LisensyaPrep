import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Top Criminology Schools Philippines 2026 (CLE Passing Rates)",
  description: "The best criminology schools in the Philippines ranked by actual CLE board exam performance - official PRC top-performing school data across recent cycles, including Araullo, University of Iloilo, and UM-Davao.",
  path: "/criminology/best-criminology-schools-philippines",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the best criminology school in the Philippines based on board exam results?","acceptedAnswer":{"@type":"Answer","text":"By recent official CLE data, University of Iloilo, University of Mindanao-Davao City, and Araullo University are the standout performers in the 200-or-more-examinees category, with Holy Angel University and University of the Cordilleras close behind."}},{"@type":"Question","name":"Which school produces the most CLE topnotchers?","acceptedAnswer":{"@type":"Answer","text":"Araullo University is the recent standout, with its students taking the national number one spot in two of the last four exam cycles."}}]};

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
Criminology is one of the biggest board exams in the country — the February 2026 CLE alone drew **45,936 examinees** — which makes the school-performance data unusually meaningful: the top schools here are outperforming against enormous, nationwide competition.

**Methodology:** we use only the PRC's official top-performing school announcements (for the CLE, the toughest category: **200 or more examinees passed with at least an 80% passing rate**) across recent cycles, and we weight consistency across cycles above any single result.

## The Recent Cycles at a Glance

| CLE Cycle | National Passing Rate | Top-Performing School (200+ category) |
|-----------|----------------------|----------------------------------------|
| **February 2026** (record) | **66.00%** (30,320/45,936) | Per PRC's March 2026 release — page updated each cycle |
| August 2025 | 51.45% (13,074/25,410) | **Araullo University** — 92.80% (348 of 375); UM–Davao 2nd at 88.94% |
| February 2025 | 60.50% (22,245/36,768) | **University of Iloilo** — 96.44% (271 of 281); University of the Cordilleras 2nd at 91.50% |
| July 2024 | 49.34% (11,121/22,539) | **University of Mindanao – Davao City** — 90.87% (189 of 208); University of Iloilo 2nd at 90.76% |

## The Consistency Leaders

1. **University of Iloilo** — top school February 2025 (a remarkable 96.44%) and second place July 2024. The most consistent double-digit outperformer in the data
2. **University of Mindanao – Davao City** — top school July 2024, second August 2025; Mindanao's criminology powerhouse
3. **Araullo University (Nueva Ecija)** — top school August 2025, and an astonishing topnotcher factory: Araullo students took the #1 national spot in both August 2025 (Sajor, 92.40%) and July 2024 (Bautista, 92.10%)
4. **Holy Angel University** and **University of the Cordilleras** — repeat top-list and topnotcher presences (Amio of HAU was the February 2025 #1)

What stands out: criminology excellence is **regionally distributed** — Iloilo, Davao, Nueva Ecija, Pampanga, Baguio — so a strong program is likely within reach of wherever you live, without relocating to Manila.

## How to Read This Honestly

The 200-examinee category rewards **big programs that stay excellent at scale** — passing 348 of 375 examinees (Araullo, August 2025) is a systemic achievement. But remember: national passing rates in criminology historically hover near 50%, meaning school choice matters *more* in this profession than in most — the gap between a top school's 92% and the national average is enormous. And whichever school you attend, the six board subjects are the same; the license is won in your review habits. ([Free CLE reviewer covering all six subjects](https://lisensyaprep.com/criminology/))

## Frequently Asked Questions

**What is the best criminology school in the Philippines?**
By recent official CLE data: University of Iloilo, University of Mindanao–Davao, and Araullo University are the standout performers at scale, with Holy Angel and University of the Cordilleras close behind.

**Which school produces the most CLE topnotchers?**
Araullo University is the recent standout — its students took the national #1 spot in two of the last four cycles.

**Is the CLE hard?**
National passing rates have ranged from 49% to the record 66% (February 2026) — roughly one in two examinees fails, which is exactly why school quality and review discipline both matter.

**What comes after passing the CLE?**
Registration, then careers from the PNP (no NAPOLCOM exam needed under RA 11131) to corrections and private security: [After Passing the CLE guide](https://lisensyaprep.com/criminology/after-passing-cle-next-steps).

## Related

- [How to Join the PNP as a Criminology Graduate](https://lisensyaprep.com/criminology/how-to-join-pnp-criminologist)
- [CLE Coverage Complete Breakdown](https://lisensyaprep.com/criminology/cle-coverage-2026)
- [Free Gamified CLE Reviewer](https://lisensyaprep.com/criminology/)
`;

export default function BestCriminologySchoolsPhilippinesPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-best-criminology-schools-philippines-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/criminology" className="text-gray-500 hover:text-gray-300 transition-colors">Criminology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"Top Criminology Schools in the Philippines 2026 (Ranked by CLE Performance)"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400">Criminology</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"Top Criminology Schools in the Philippines 2026 (Ranked by CLE Performance)"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 14, 2026</span><span>•</span>
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
