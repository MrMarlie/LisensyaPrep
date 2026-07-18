import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Is MedTech Worth It in the Philippines? (Honest 2026)",
  description: "Is MedTech worth it in 2026? The honest verdict - the friendliest major board exam (84% record), steady lab demand, the ASCPi abroad multiplier, the modest entry pay reality, and who should choose BSMT.",
  path: "/medical-technology/is-medtech-worth-it",
});

const SCHEMA_FAQ = "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Is MedTech worth it in the Philippines in 2026?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes — medical technology offers the statistically friendliest major board exam with an 84.13 percent record and the lowest volatility tracked, permanent diagnostic laboratory demand, and a clean international ladder through the ASCPi credential — priced in modest allied-health entry pay and behind-the-scenes work.\"}},{\"@type\":\"Question\",\"name\":\"Is the MedTech board exam easy?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"It is the most statistically favorable major Philippine board, with recent passing rates between 69.5 and 84.13 percent and the smallest cycle-to-cycle swings — reflecting rigorous internship preparation rather than an easy exam.\"}}]}";

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

const MAIN_CONTENT = "**The direct answer: yes — MedTech is the quiet value pick of the health professions: the statistically friendliest major board exam in the country, permanent laboratory demand, and a clean international ladder through the ASCPi — priced in modest entry pay and a behind-the-scenes role that suits some temperaments perfectly and suffocates others.** Here is the full accounting.\n\n## The Case FOR (What the Data Says)\n\n**The board exam is the friendliest we track — officially.** [Our Difficulty Index scores the MTLE 23.9](https://lisensyaprep.com/blog/board-exam-difficulty-index), the lowest (easiest) of every exam indexed: **84.13% in March 2026**, never below 69.5% in recent verified cycles, and the smallest volatility of any major board. No other health license offers this probability profile — and [the top schools' internship systems](https://lisensyaprep.com/medical-technology/best-medtech-schools-philippines) (the SLU dynasty: 100% with 362 examinees) are why.\n\n**Demand is diagnostic-infrastructure demand.** Every hospital admission, prenatal visit, employment physical, and outbreak response runs through the laboratory — plus the freestanding diagnostic-chain boom that hires RMTs at scale. Lab work is recession-adjacent, not recession-proof, but close.\n\n**The abroad ladder is unusually clean.** [The ASCPi](https://lisensyaprep.com/medical-technology/ascpi-filipino-medtech-guide) — takeable at Pearson VUE centers locally — is the recognized US-standard credential, the Gulf recognizes it as a differentiator, and the MTLE-to-ASCPi content overlap means your board review compounds into your international one. Few professions have this straight a line from local license to global credential.\n\n**The government and specialization tracks are real** — hospital items with [RA 1080 eligibility](https://lisensyaprep.com/civil-service/government-jobs-cse-eligibility), and section-specialist/chief-medtech ladders locally.\n\n## The Case AGAINST (Also True)\n\n**Entry pay is allied-health modest.** New RMTs in private hospitals and chains commonly start in the high-teens-to-low-₱20,000s (industry-reported) — the same toll-years pattern as nursing, with government items and abroad as the curve-benders. The friendliest board does not mean the fastest money.\n\n**The work is invisible by design.** Patients thank nurses and doctors; nobody meets the person whose crossmatch kept the transfusion safe. If recognition and patient interaction fuel you, the bench may starve that need — honestly assess this before six years of investment (4-year degree + internship + toll years).\n\n**Night rotations and stat-pressure are structural** — laboratories never close, and the blood bank at 3am is a responsibility-dense place to be junior.\n\n## Worth It For / Think Twice If\n\n**Worth it if:** precision, instruments, and quiet mastery appeal to you more than bedside interaction; you'll plan the ASCPi after 1-3 bench years; and you want the health-professions license with the best pass-probability-to-demand ratio.\n\n**Think twice if:** patient-facing care is what draws you to health work (nursing fits that pull better); or you're choosing it as \"easier nursing\" — the content is a different science, not a lighter one.\n\n## The Honest Bottom Line\n\nMedTech's 2026 deal: the country's most passable major board, structural lab demand, and the cleanest local-to-global credential ladder in allied health — priced in modest entry pay and work that trades recognition for precision. For the temperament it fits, it's arguably the smartest risk-adjusted choice on this site. ([Free MTLE reviewer and Starter Pack here](https://lisensyaprep.com/medical-technology/).)\n\n## Frequently Asked Questions\n\n**Is MedTech a good course in 2026?**\nYes — the friendliest major board exam (84.13% record, lowest Difficulty Index score we track), permanent laboratory demand, and the ASCPi international ladder — priced in modest entry pay and behind-the-scenes work.\n\n**Is the MTLE easy?**\nIt's the most statistically favorable major board (69-84% recent rates, low volatility), reflecting strong internship filtering — favorable odds for prepared candidates, not an easy exam.\n\n**MedTech or Nursing — which is better?**\nDifferent temperaments: MedTech for precision-and-instruments people with steadier exam odds; nursing for patient-facing care with wider abroad pathways. [The full comparison is coming; both verdicts are linked here.]";

export default function ArticlePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-is-medtech-worth-it-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"Is MedTech Worth It in the Philippines? An Honest 2026 Answer"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">{"Medical Technology (MTLE)"}</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"Is MedTech Worth It in the Philippines? An Honest 2026 Answer"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>&bull;</span>
                <span>{"August 28, 2026"}</span><span>&bull;</span>
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
              <Link href={"/medical-technology"} className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Start Reviewing</h3>
              <p className="text-gray-400 text-sm mb-4">Reading is good, but practice is better. Test your knowledge with our free gamified reviewers.</p>
              <Link href={"/medical-technology"} className="block w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl text-center text-sm transition-colors">
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
