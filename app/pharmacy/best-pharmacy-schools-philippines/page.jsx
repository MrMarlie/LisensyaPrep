import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Top Pharmacy Schools Philippines 2026 (PhLE Passing Rates)",
  description: "The best pharmacy schools in the Philippines ranked by actual PhLE board exam performance - official PRC data on MMSU, UST, UP Manila, Adamson and more, from a Registered Pharmacist.",
  path: "/pharmacy/best-pharmacy-schools-philippines",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the best pharmacy school in the Philippines based on board exam results?","acceptedAnswer":{"@type":"Answer","text":"By recent official PRC data, Mariano Marcos State University-Batac is the most consistent top performer, topping two of the last several cycles, with UST, UP Manila, and Adamson University leading among large and Manila-based programs."}},{"@type":"Question","name":"How hard is the Pharmacist Licensure Exam?","acceptedAnswer":{"@type":"Answer","text":"Recent national passing rates range from about 57 to 81 percent depending on the cycle, with November cycles dominated by fresh graduates running much higher than April cycles."}}]};

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
As a Registered Pharmacist, I will tell you what I wish every incoming BS Pharmacy student knew: the school-performance gap in the PhLE is real, and the recent data holds a genuine surprise — **the most consistent top performer is not a Manila private school, but a state university in Ilocos Norte.**

**Methodology:** official PRC top-performing school announcements across recent cycles (per the Commission's criteria by examinee-count category), weighting repeat appearances above single results.

## The Recent Cycles at a Glance

| PhLE Cycle | National Passing Rate | Leading School(s) |
|------------|----------------------|-------------------|
| April 2026 | 57.26% (1,085/1,895) | Per PRC's April 22, 2026 release — page updated each cycle |
| November 2025 | 80.57% (3,670/4,555) | **University of Santo Tomas** led the 100+ examinees category; the topnotcher came from Lyceum of the Philippines–Batangas (95.47%) |
| April 2025 | 60.30% (1,150/1,907) | **Mariano Marcos State University–Batac** — 91.38% (53/58); Southwestern University 2nd at 86.67% |
| October 2024 | — | **UP Manila and Adamson University tied at a perfect 100%** (58 and 53 passers); University of San Carlos 2nd at 96.77% |
| April 2024 | — | **MMSU–Batac again** — 96.88% (62/64); Southwestern University 2nd at 88.00% |

## The Consistency Leaders

1. **Mariano Marcos State University – Batac** — top school in BOTH April 2024 and April 2025. The quiet dynasty of Philippine pharmacy education, at state-university tuition
2. **University of Santo Tomas** — the November 2025 large-category leader and a perennial force (its Legazpi campus produced the November 2024 topnotcher at 95.47%)
3. **UP Manila** — perfect 100% in October 2024; the country's premier health-sciences institution doing what it does
4. **Adamson University** — the other perfect-100% school of October 2024, and historically one of Manila's strongest pharmacy programs
5. **University of San Carlos (Cebu)** and **Southwestern University (Cebu)** — the Visayas' consistent presences, with SWU placing second in two recent cycles

## How to Read This Honestly

Pharmacy cohorts are small compared to nursing or criminology — a top program here means 50-350 examinees, so single-cycle swings are noisier; that is exactly why we weight repeat appearances (MMSU twice, SWU twice, UST across formats). And the honest career note from someone who lived it: the school gets you to the license, but **what you do with the license — community, industry, government, abroad, or your own pharmacy — determines your financial trajectory far more than your alma mater.** Read that decision guide before your first job, not after: [Pharmacist First Job Guide](https://lisensyaprep.com/pharmacy/pharmacist-first-job-philippines).

## Frequently Asked Questions

**What is the best pharmacy school in the Philippines?**
By recent official PhLE data: MMSU–Batac is the most consistent top performer, with UST, UP Manila, and Adamson leading among large and Manila-based programs, and USC/SWU strongest in the Visayas.

**Is a state university good for pharmacy?**
The data says emphatically yes — MMSU–Batac has out-performed nearly every private program in recent cycles at a fraction of the tuition.

**How hard is the Pharmacist Licensure Exam?**
Recent national passing rates range from 57% to 81% depending on the cycle — November cycles (dominated by fresh graduates) run much higher than April cycles.

**What comes after passing the PhLE?**
[Registration, then the career choice that actually determines your income](https://lisensyaprep.com/pharmacy/pharmacist-first-job-philippines).

## Related

- [Pharmacist Salary Philippines 2026](https://lisensyaprep.com/pharmacy/pharmacist-salary-philippines)
- [Filipino Pharmacist to the US: FPGEE Pathway](https://lisensyaprep.com/pharmacy/filipino-pharmacist-us-pathway)
- [Free Gamified Pharmacy Reviewer](https://lisensyaprep.com/pharmacy/)
`;

export default function BestPharmacySchoolsPhilippinesPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-best-pharmacy-schools-philippines-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/pharmacy" className="text-gray-500 hover:text-gray-300 transition-colors">Pharmacy</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"Top Pharmacy Schools in the Philippines 2026 (Ranked by PhLE Passing Rates)"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400">Pharmacy</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"Top Pharmacy Schools in the Philippines 2026 (Ranked by PhLE Passing Rates)"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 16, 2026</span><span>•</span>
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
