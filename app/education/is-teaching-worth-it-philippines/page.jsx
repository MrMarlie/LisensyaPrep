import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Is Teaching Worth It in the Philippines? (Honest 2026)",
  description: "Is teaching worth it in 2026? The honest verdict - record LET passing rates, Teacher I pay of ₱31,705+, the Master Teacher ladder to ₱53,818, the workload reality, and who should think twice.",
  path: "/education/is-teaching-worth-it-philippines",
});

const SCHEMA_FAQ = "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Is teaching worth it in the Philippines in 2026?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"For people the classroom energizes, yes: record LET passing rates, Teacher I pay starting at 31,705 pesos with a ladder to 53,818 at Master Teacher, tenure, and pension — priced in a heavy workload culture and one to three modestly paid private-school years before a DepEd item.\"}},{\"@type\":\"Question\",\"name\":\"How much do public school teachers earn in the Philippines in 2026?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Under the 2026 salary tranche, Teacher I starts at 31,705 to 33,611 pesos monthly, Teacher II at 33,947, and Master Teacher I at 53,818, plus PERA and government benefits.\"}}]}";

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

const MAIN_CONTENT = "**The direct answer: teaching in 2026 is the most *secure* professional deal in the country — near-guaranteed structural demand, tenure, and a pay ladder that now starts at ₱31,705 and climbs past ₱53,000 — but it is bought with the heaviest unpaid-workload culture of any profession on this site. Worth it comes down to one honest question: does the classroom itself give you energy, or only the payday?** Here is the full accounting.\n\n## The Case FOR (What the Data Says)\n\n**The exam has never been more passable.** March 2026's LET posted a record **67.17%** overall (Secondary 73.10%) — [the climb is real and documented](https://lisensyaprep.com/education/let-passing-rate-history). Secondary's structure (40% in your own specialization) makes it [one of the friendlier major boards on our Difficulty Index (33.1)](https://lisensyaprep.com/blog/board-exam-difficulty-index); Elementary (43.5) demands broader discipline.\n\n**The pay is now genuinely livable — and the ladder is real.** Under the 2026 tranche: **Teacher I at SG-11 starts ₱31,705-₱33,611**, Teacher II at ₱33,947, and **Master Teacher I at SG-18 reaches ₱53,818** — plus PERA, bonuses, GSIS, and the tenure no private-sector job matches. A career-long teacher retires on a government pension. That sentence alone is why parents push this course.\n\n**Demand never sleeps.** Tens of thousands of Teacher I items post yearly across every municipality; [the DepEd ranking system](https://lisensyaprep.com/education/deped-teacher-1-ranking-guide) is competitive but transparent — your LET rating alone is worth up to 10 points, which is why aiming above 75 pays twice.\n\n**The training is free at the best schools.** [The LET's top performers are state universities](https://lisensyaprep.com/education/best-education-schools-philippines) — Cebu Normal, PNU, WVSU — at free tuition. The cheapest path to a profession on this entire site.\n\n**The abroad option exists** — [J-1 US exchanges, international schools, Japan](https://lisensyaprep.com/education/filipino-teacher-work-abroad) — as a mid-career expansion rather than a required escape.\n\n## The Case AGAINST (Also True)\n\n**The workload culture is the honest scandal.** Lesson plans, DepEd forms, ancillary assignments, weekend activities, out-of-pocket classroom expenses — the salary pays for 8 hours; the culture routinely extracts more. This is the burnout mechanism, and no ranking point compensates for hating Sunday nights.\n\n**The entry gauntlet is slow.** Between the LET, ranking season, and waiting for items, many LPTs spend 1-3 years in private schools at pay far below the DepEd scale (commonly ₱12,000-₱20,000, industry-reported) — the profession's toll years.\n\n**The ceiling is structural.** ₱53,818 at Master Teacher is honest money, but the steps between are slow and points-based; ambitious earners eventually look at [school leadership, abroad, or side practices](https://lisensyaprep.com/education/lpt-not-deped-options) to bend the curve.\n\n## Worth It For / Think Twice If\n\n**Worth it if:** classrooms energize you (the only sustainable fuel); security and pension weigh heavily in your family math; and you'll play the ranking game strategically from day one.\n\n**Think twice if:** you're choosing it as the \"safe fallback\" with no pull toward teaching — the workload culture destroys the indifferent fastest; or your honest goal is maximum income velocity, where [other boards](https://lisensyaprep.com/blog/prc-passing-rates-compared) fit better.\n\n## The Honest Bottom Line\n\nTeaching's 2026 deal: the most reachable major board, free elite training, ₱31k-₱53k structured pay, and unmatched security — priced in toll years, workload culture, and a deliberate ladder. The teachers who thrive love the room. Everything else is negotiable; that isn't. ([Free LET reviewer — Gen Ed and Prof Ed](https://lisensyaprep.com/education/).)\n\n## Frequently Asked Questions\n\n**Is teaching a good career in the Philippines in 2026?**\nFor classroom-driven people, yes — record LET passing rates, Teacher I pay of ₱31,705+, a ladder to ₱53,818 at Master Teacher, tenure, and pension — priced in heavy workload culture and modest private-school toll years.\n\n**How much do teachers earn in 2026?**\nDepEd Teacher I starts at ₱31,705-₱33,611 (SG-11) under the 2026 tranche, Teacher II at ₱33,947, Master Teacher I at ₱53,818, plus PERA and benefits.\n\n**Is the LET hard to pass now?**\nRates are at record highs (67.17% overall in March 2026), with Secondary friendlier than Elementary — preparation quality remains the deciding variable.";

export default function ArticlePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-is-teaching-worth-it-philippines-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"Is Teaching Worth It in the Philippines? An Honest Look at the LPT Life"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">{"Education (LET)"}</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"Is Teaching Worth It in the Philippines? An Honest Look at the LPT Life"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>&bull;</span>
                <span>{"August 26, 2026"}</span><span>&bull;</span>
                <span>{"8 min read"}</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-8 bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 border border-yellow-500/30 rounded-2xl p-6 text-center">
              <p className="text-yellow-400 font-extrabold text-lg mb-2">Still Reviewing for Your Board Exam?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified reviewers for PNLE, LET, CLE, and more. No account required.</p>
              <Link href={"/education"} className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Start Reviewing</h3>
              <p className="text-gray-400 text-sm mb-4">Reading is good, but practice is better. Test your knowledge with our free gamified reviewers.</p>
              <Link href={"/education"} className="block w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl text-center text-sm transition-colors">
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
