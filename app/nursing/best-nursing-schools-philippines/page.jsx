import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Top Nursing Schools Philippines 2026 (Actual PNLE Passing Rates)",
  description: "The best nursing schools in the Philippines ranked by actual PNLE board exam performance - official PRC top-performing school data from the last four exam cycles, not reputation or hearsay.",
  path: "/nursing/best-nursing-schools-philippines",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the best nursing school in the Philippines based on board exam results?","acceptedAnswer":{"@type":"Answer","text":"By recent official PRC data, the most consistent perfect-passing-rate large programs include Xavier University-Ateneo de Cagayan, Cebu Doctors' University, Saint Louis University, and UST, with state universities like West Visayas State University-La Paz matching them at lower tuition."}},{"@type":"Question","name":"Does attending a top nursing school guarantee passing the PNLE?","acceptedAnswer":{"@type":"Answer","text":"No. Top schools improve your odds and environment, but individual preparation decides outcomes. First-time takers pass at dramatically higher rates than retakers in every cycle."}}]};

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
Most "best nursing schools" lists are based on reputation, tuition brochures, or articles written years ago. This one is different: it is built entirely on **official PRC board exam performance data** — the top-performing school lists the Commission is legally required to publish after every Philippine Nurse Licensure Examination (PNLE).

**Our methodology, transparently:** After each PNLE, the PRC names top-performing schools using official criteria (for nursing, institutions with 100 or more examinees and at least an 85% passing rate, per the Commission's top-performing school resolutions). We aggregate the most recent exam cycles and highlight the schools that appear **repeatedly** — because one great batch can be luck, but cycle after cycle is a system.

## The Recent Cycles at a Glance

| PNLE Cycle | National Passing Rate | Leading School(s), 100+ examinees category |
|------------|----------------------|--------------------------------------------|
| **November 2025** (record) | **90.04%** (40,692/45,192) | **21 schools at a perfect 100%**, including Xavier University–Ateneo de Cagayan, Saint Louis University, and Cebu Doctors' University; Trinity University of Asia next at 99.73% |
| May 2025 | 64.40% (6,935/10,769) | **University of Pangasinan** — 99.16%; in the 50-99 category, SLSU-Lucban, ESSU-Borongan, and Universidad de Zamboanga–Pagadian all hit 100% |
| November 2024 | 84.99% (29,349/34,534) | **11 schools at 100%**, including UST, Xavier University, Cebu Doctors' University, Velez College, Angeles University Foundation, Bicol University–Legazpi, UERMMMC, Saint Paul University–Iloilo, West Visayas State University–La Paz, and Central Mindanao University |
| February 2026 | 44.24% (3,611/8,162) | Smaller February cohort; top-school lists per PRC release |

## The Consistency Leaders

Schools that have led or hit perfect rates across multiple recent cycles — the strongest signal in the data:

1. **Xavier University – Ateneo de Cagayan** — 100% in both November 2024 and November 2025
2. **Cebu Doctors' University** — 100% in both November 2024 and November 2025
3. **Saint Louis University (Baguio)** — 100% in November 2025, a repeat presence in top lists
4. **University of Santo Tomas** — 100% in November 2024, perennial top-list presence
5. **West Visayas State University – La Paz** — 100% in November 2024 (and a dominant force in other health-profession boards)
6. **Velez College (Cebu)** — 100% in November 2024, a school whose graduates also regularly top the MedTech boards
7. **University of Pangasinan** — the May 2025 leader at 99.16%
8. **Angeles University Foundation, Bicol University–Legazpi, UERMMMC, Saint Paul University–Iloilo, Central Mindanao University** — all members of the November 2024 perfect-rate club

State universities deserve a special note: WVSU, Bicol University, and CMU deliver top-tier passing rates at state-university tuition — arguably the best value-for-money nursing educations in the country.

## How to Read These Rankings Honestly

Three caveats we insist on, because a ranking without them misleads:

**Passing rate is not the whole story.** Schools with strict retention policies filter students before they ever reach the boards — a 100% rate can reflect selectivity as much as teaching. Consider also clinical affiliations (base hospitals), tuition, location, and NCLEX preparation if abroad is your plan.

**The examinee-count category matters.** A 100% rate with 300+ examinees (like the big programs above) is a different achievement from 100% with 50. PRC's own categories reflect this.

**The individual still takes the exam.** The school gives you the environment; the license is earned by you. First-timers pass at dramatically higher rates than retakers in every cycle — preparation habits, not just school name, decide outcomes.

## Frequently Asked Questions

**What is the best nursing school in the Philippines?**
By recent official PNLE data, the most consistent perfect-rate large programs include Xavier University–Ateneo de Cagayan, Cebu Doctors' University, Saint Louis University, and UST — with state universities like WVSU–La Paz matching them at far lower tuition.

**Where does this data come from?**
Official PRC top-performing school lists published after each PNLE, as mandated by RA 8981. We update this page each results release.

**Does a top school guarantee I'll pass the PNLE?**
No — it improves your odds and environment. Your preparation decides the rest. ([Free PNLE reviewer here](https://lisensyaprep.com/nursing/))

**Why did the passing rate swing from 90% to 44%?**
November cycles draw the large fresh-graduate cohorts; February cycles skew smaller with more retakers, whose passing rates are historically much lower.

## Related

- [PNLE Passing Rate History](https://lisensyaprep.com/nursing/pnle-passing-rate-history) *(coming in this series)*
- [What to Do After Passing the PNLE](https://lisensyaprep.com/nursing/after-passing-pnle-next-steps)
- [Free Gamified PNLE Reviewer](https://lisensyaprep.com/nursing/)
`;

export default function BestNursingSchoolsPhilippinesPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-best-nursing-schools-philippines-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"Top Nursing Schools in the Philippines 2026 (Ranked by Actual PNLE Passing Rates)"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"Top Nursing Schools in the Philippines 2026 (Ranked by Actual PNLE Passing Rates)"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 13, 2026</span><span>•</span>
                <span>9 min read</span>
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
