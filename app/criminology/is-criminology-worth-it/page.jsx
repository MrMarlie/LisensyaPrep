import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Is Criminology Worth It in the Philippines? (Honest 2026)",
  description: "Is criminology worth it in 2026? The honest verdict with verified data - the record 66% board passing rate, Patrolman pay of ₱31,151, the RA 11131 advantage, the non-PNP career map, and who should think twice.",
  path: "/criminology/is-criminology-worth-it",
});

const SCHEMA_FAQ = "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Is criminology worth it in the Philippines in 2026?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes for those genuinely drawn to the work: the board exam posted a record 66 percent passing rate, Patrolman entry pay is 31,151 pesos with a structured ladder, licensed criminologists skip the NAPOLCOM exam under RA 11131, and non-police careers exist in corrections, investigation, and corporate security.\"}},{\"@type\":\"Question\",\"name\":\"Is a criminology degree useless without the PNP?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"No. Jail management, corrections, fire protection, corporate security management, investigation, and academe all hire Registered Criminologists, with several paths paying comparably to or better than police entry rates.\"}}]}";

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

const MAIN_CONTENT = "**The direct answer: yes — criminology in 2026 is a better deal than its reputation, with a board exam at record-friendly odds, a guaranteed-demand employer in the PNP at ₱31,151 entry pay, and a wider non-police career map than most families realize. But it is only worth it if your child of the plan is YOU — because the screening gauntlets and the work itself filter out everyone who chose it for someone else.** Here is the full accounting.\n\n## The Case FOR (What the Data Says)\n\n**The board exam has never been friendlier.** The February 2026 CLE posted a record **66.00%** — after years of coin-flip rates around 49-51%. [Our Difficulty Index scores the CLE 40.1](https://lisensyaprep.com/blog/board-exam-difficulty-index) — a middle-of-the-pack exam that prepared takers beat consistently, especially from [the strong schools](https://lisensyaprep.com/criminology/best-criminology-schools-philippines) (University of Iloilo at 96.44%, Araullo, UM-Davao).\n\n**The RA 11131 advantage is real money and real time.** A Registered Criminologist **skips the NAPOLCOM entrance exam entirely** — [the license IS the PNP eligibility](https://lisensyaprep.com/criminology/napolcom-exam-schedule-guide) — plus lateral-entry rank logic and a legally protected professional title. No other degree walks into police application with that head start.\n\n**The pay is honest middle-class with structure.** A Patrolman starts at **₱31,151 monthly** under current MUP pay — with allowances, benefits, and the most legible promotion ladder in government service. And criminologists who want none of that have a genuine non-PNP map: BJMP, BuCor, BFP, corporate security management (where senior roles clear five figures monthly), investigation, academe.\n\n**Demand is structural.** Police, jail, fire, and security staffing are permanent public needs — criminology unemployment is a preparation problem, not a demand problem.\n\n## The Case AGAINST (Also True)\n\n**The license is the easy gate; the screening is the real one.** [PNP entry](https://lisensyaprep.com/criminology/how-to-join-pnp-criminologist) runs physical, medical, neuro-psychiatric, and background gauntlets that fail applicants the CLE never would — height, health, and record issues end plans late and expensively. Know the standards before year one, not after graduation.\n\n**Without the board, the degree underperforms.** The unlicensed criminology graduate competes for guard posts; the licensed one manages the department. [The CLE is the whole difference](https://lisensyaprep.com/criminology/), and roughly one in three still failed even in the record cycle.\n\n**The work is the work.** Shifts, danger, discipline culture, and postings you don't choose. The salary compensates a lifestyle; it doesn't erase it.\n\n## Worth It For / Think Twice If\n\n**Worth it if:** the uniformed or security life genuinely draws you; you'll treat the CLE as non-negotiable; and you'd still want the field via the non-PNP doors if the police path closed.\n\n**Think twice if:** you're enrolling because \"madaling makahanap ng trabaho daw\" with no pull toward the work; a known medical/physical issue conflicts with uniformed standards you haven't checked; or law enforcement is really a stepping stone to law school — [in which case compare the routes honestly first](https://lisensyaprep.com/blog/how-to-become-a-lawyer-philippines).\n\n## The Honest Bottom Line\n\nCriminology's deal in 2026: an achievable board, a guaranteed major employer, ₱31k+ structured entry, and backup careers most degrees lack — priced in physical standards, discipline, and work that must actually fit you. Choose it for the work and it repays you; choose it for the rumor of easy employment and the screening rooms will collect the difference. (Free CLE reviewer, all six subjects.)\n\n## Frequently Asked Questions\n\n**Is criminology a good course in 2026?**\nYes for those drawn to the work — record 66% board passing rate, ₱31,151 PNP entry pay, NAPOLCOM exemption for licensed graduates, and non-police careers in corrections and corporate security.\n\n**Is criminology useless without joining the PNP?**\nNo — BJMP, BuCor, BFP, investigation, corporate security management, and academe all hire Registered Criminologists, several at comparable or better pay.\n\n**What's the hardest part of the criminology path?**\nUsually not the board exam — it's the PNP-type screening gauntlet (physical, medical, neuro-psych, background) and the discipline lifestyle the salary compensates.";

export default function ArticlePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-is-criminology-worth-it-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"Is Criminology Worth It in the Philippines? An Honest 2026 Answer"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">{"Criminology (CLE)"}</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"Is Criminology Worth It in the Philippines? An Honest 2026 Answer"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>&bull;</span>
                <span>{"August 25, 2026"}</span><span>&bull;</span>
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
              <Link href={"/criminology"} className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Start Reviewing</h3>
              <p className="text-gray-400 text-sm mb-4">Reading is good, but practice is better. Test your knowledge with our free gamified reviewers.</p>
              <Link href={"/criminology"} className="block w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl text-center text-sm transition-colors">
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
