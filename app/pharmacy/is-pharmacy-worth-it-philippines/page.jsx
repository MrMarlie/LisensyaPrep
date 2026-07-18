import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Is Pharmacy Worth It? Honest Answers from an RPh (2026)",
  description: "Is pharmacy worth it in the Philippines? A Registered Pharmacist answers honestly - the real retail pay problem, the career forks that fix it, the Gulf chapter, the FPGEE catch, and who should choose BSPharm.",
  path: "/pharmacy/is-pharmacy-worth-it-philippines",
});

const SCHEMA_FAQ = "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Is pharmacy worth it in the Philippines?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes for students who plan beyond the drugstore default: the license carries statutory demand, a beatable board exam at 80.57 percent in November 2025, and strong hospital, industry, government, Gulf, and ownership forks — but community retail entry pay is modest, making early career planning essential.\"}},{\"@type\":\"Question\",\"name\":\"Can Filipino pharmacists work in the United States?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"With difficulty: NABP's FPGEE requires a five-year pharmacy curriculum for graduates on or after January 2003, which the standard four-year Philippine BS Pharmacy generally does not meet without additional recognized coursework, which is one reason many Filipino pharmacists take the Gulf route instead.\"}}]}";

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

const MAIN_CONTENT = "**The direct answer, from someone who holds the license: pharmacy is worth it — but only if you understand from day one that the default path (community drugstore employment) is the profession's weakest deal, and the license's real value lives in the forks most students never learn about until too late.** I registered in 2022, worked hospital, took the Gulf chapter in Dubai retail, and came home to community pharmacy — so this verdict is lived, not researched. Here is what I wish someone had told me in first year.\n\n## The Case FOR (What the Data Says — and What I Lived)\n\n**The exam is beatable with real preparation.** Recent PhLE rates: **80.57%** in the fresh-graduate November 2025 cycle, 57-60% in April cycles — [a mid-table 34.5 on our Difficulty Index](https://lisensyaprep.com/blog/board-exam-difficulty-index). [The top schools](https://lisensyaprep.com/pharmacy/best-pharmacy-schools-philippines) include a state university (MMSU-Batac) topping the country twice — quality education here doesn't require premium tuition.\n\n**The license is legally load-bearing.** Every drugstore, hospital pharmacy, and pharma manufacturer in the country is required to run on registered pharmacists. That statutory demand is a floor under the profession that most degrees simply don't have.\n\n**The forks are where the money lives.** [I've mapped this in full](https://lisensyaprep.com/pharmacy/pharmacist-first-job-philippines), but the short version: **hospital pharmacy** builds clinical depth; **pharmaceutical industry** (regulatory affairs, quality, medical sales) pays the best local salaries in the profession; **government items** carry salary-grade stability; **the Gulf** pays tax-free multiples (my Dubai years funded what a local salary never could); and **ownership** — your own botica — remains the classic endgame the license legally enables.\n\n**The abroad demand is real** — with one honest catch below.\n\n## The Case AGAINST (I Will Not Sugarcoat This)\n\n**Community retail entry pay is the profession's open wound.** Many chain drugstores pay new RPhs modestly — commonly in the high-teens band (industry-reported, region-dependent) — for license-bearing responsibility. This is exactly why I left traditional paths, and I've written about it candidly. If you take nothing else from this article: **the drugstore counter is a chapter, not the book.** Plan the fork before you graduate, not after five years behind the counter.\n\n**The US route has a gate most PH pharmacists can't pass as-is.** [NABP's FPGEE requires a five-year curriculum for post-2003 graduates](https://lisensyaprep.com/pharmacy/filipino-pharmacist-us-pathway) — the standard 4-year PH BSPharm generally doesn't qualify without additional coursework. The Gulf route exists partly because of this; know it before building a US dream on a 4-year degree.\n\n**April cycles and retakes are harsh** — 57-60% rates with [the retaker penalty every board shows](https://lisensyaprep.com/blog/board-exam-retake-limits). Take the November cycle prepared.\n\n## Worth It For / Think Twice If\n\n**Worth it if:** the science genuinely interests you; you'll plan a fork (hospital, industry, government, abroad, ownership) early; and you can treat modest early chapters as funded positioning — the way my hospital and Dubai years were.\n\n**Think twice if:** your model of the career is \"prestige plus easy drugstore job\" — that exact expectation produces the profession's bitterest members; or medicine is your real goal and pharmacy is only a placeholder ([it's a fine pre-med](https://lisensyaprep.com/blog/how-to-become-a-doctor-philippines) — but know which dream you're funding).\n\n## The Honest Bottom Line\n\nPharmacy gave me a license that worked in three countries' health systems and now powers a business of my own. It also showed me the counter-wage trap that catches graduates who drift into the default. The degree is worth it for planners and wasted on drifters — same license, entirely different careers. Plan the fork. ([Free PhLE reviewer here](https://lisensyaprep.com/pharmacy/).)\n\n## Frequently Asked Questions\n\n**Is pharmacy a good course in the Philippines?**\nYes, for students who plan beyond the drugstore default — statutory demand, beatable board (80.57% in Nov 2025), strong industry/hospital/abroad forks — but weak as a drift-through degree due to modest retail entry pay.\n\n**How much do pharmacists earn in the Philippines?**\nRetail entry commonly pays in the high-teens (industry-reported); hospital, industry, and government pay progressively better, and Gulf postings pay tax-free multiples. [Full breakdown here](https://lisensyaprep.com/pharmacy/pharmacist-salary-philippines).\n\n**Can Filipino pharmacists work in the US?**\nThe FPGEE's five-year-curriculum rule generally excludes standalone 4-year PH degrees for post-2003 graduates — verify your case against the FPGEC Bulletin, and know the Gulf route exists as the common alternative.";

export default function ArticlePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-is-pharmacy-worth-it-philippines-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"Is Pharmacy Worth It in the Philippines? Honest Answers from a Registered Pharmacist"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">{"Pharmacy (PLE)"}</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"Is Pharmacy Worth It in the Philippines? Honest Answers from a Registered Pharmacist"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>&bull;</span>
                <span>{"August 27, 2026"}</span><span>&bull;</span>
                <span>{"9 min read"}</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-8 bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 border border-yellow-500/30 rounded-2xl p-6 text-center">
              <p className="text-yellow-400 font-extrabold text-lg mb-2">Still Reviewing for Your Board Exam?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified reviewers for PNLE, LET, CLE, and more. No account required.</p>
              <Link href={"/pharmacy"} className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Start Reviewing</h3>
              <p className="text-gray-400 text-sm mb-4">Reading is good, but practice is better. Test your knowledge with our free gamified reviewers.</p>
              <Link href={"/pharmacy"} className="block w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl text-center text-sm transition-colors">
                Start Quiz
              </Link>
            </div>
            <AdPlaceholder slot="sidebar" />
          </aside>

        </div>
      </div>
    </div>
  );
}
