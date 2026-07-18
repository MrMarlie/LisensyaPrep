import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Pharmacist Beyond the Drugstore - Your Real Options",
  description: "RPh stuck at the counter? From a pharmacist who left it - the honest exit map: hospital, pharma industry, regulatory, government, the Gulf chapter, and ownership. The counter is a chapter, not the book.",
  path: "/pharmacy/pharmacist-beyond-drugstore-options",
});

const SCHEMA_FAQ = "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"What can a pharmacist do besides working in a drugstore?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Five established exits: hospital pharmacy, the pharmaceutical industry including sales, regulatory affairs and quality roles, government pharmacist items with RA 1080 eligibility, Gulf deployment via DataFlow and Prometric, and eventual pharmacy ownership.\"}},{\"@type\":\"Question\",\"name\":\"Which pharmacist career pays the best?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Locally the pharmaceutical industry, especially regulatory affairs and progressing sales roles, substantially out-earns retail; internationally, Gulf postings pay tax-free multiples of local rates and commonly include housing.\"}}]}";

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

const MAIN_CONTENT = "**The direct answer, from an RPh who stood at that exact counter: you're right to plan an exit, and you have five real ones — hospital, pharmaceutical industry, government, abroad, and ownership — each reachable from where you're standing now. I left traditional retail myself (hospital first, then Dubai, then building this platform), so this isn't theory. The counter is a chapter, not the book — here's how each next chapter actually starts.** \n\n## First, the honest validation\n\nIf the counter pay and ceiling frustrate you, you're not entitled — you're observant. [I've written candidly](https://lisensyaprep.com/pharmacy/pharmacist-first-job-philippines) about why retail entry pay pushed me off the default path. The license you hold is legally required by every drugstore, hospital, manufacturer, and distributor in the country; the counter is simply its *lowest-leverage deployment*. Moving isn't betrayal of the profession. It's using it.\n\n## Exit 1: Hospital Pharmacy\n\nThe clinical deepening move — dispensing gives way to clinical rounds involvement, IV admixture, and drug-information work. Pay improves over retail (more in government hospitals, where items carry [salary-grade pay and your RA 1080 eligibility applies](https://lisensyaprep.com/civil-service/government-jobs-cse-eligibility)), and hospital experience is the strongest general-purpose credential for everything after — it was my own first move, and it's what the Gulf CVs get screened for.\n\n## Exit 2: The Pharmaceutical Industry (the local ceiling-raiser)\n\nThe best-paying local lane, with multiple doors: **medical sales representative** (the classic entry — commission economics beat counter pay quickly), **regulatory affairs** (FDA submissions and compliance — the specialty that compounds hardest with experience), **quality assurance/control** in manufacturing, and **medical affairs/clinical research** upstream. Industry recruits RPhs constantly; the license plus even a year of any pharmacy experience is the ticket in.\n\n## Exit 3: Government\n\nFDA, DOH programs, provincial and city health office pharmacist items, PhilHealth — [salary-grade stability](https://lisensyaprep.com/civil-service/salary-grade-table-philippines), civil-service protection, and no Civil Service Exam needed (RA 1080). The underrated middle path for stability-first planners.\n\n## Exit 4: The Abroad Chapter (my chapter)\n\nThe Gulf hires Filipino RPhs steadily — retail and hospital — through [DataFlow verification and the destination's Prometric exam](https://lisensyaprep.com/blog/ofw-guide-licensed-professionals), typically asking 1-2 years local experience. Tax-free multiples of local pay, commonly with housing: my Dubai years funded what the local counter never could. Honest constraint: [the US route's five-year-curriculum rule](https://lisensyaprep.com/pharmacy/filipino-pharmacist-us-pathway) blocks most 4-year BSPharm grads — the Gulf is the realistic multiplier for most of us.\n\n## Exit 5: Ownership\n\nThe endgame the license legally enables: your own botica. Real requirements (capital, location strategy, FDA licensing, inventory discipline) — but the pharmacist-owner captures the margin the employee-pharmacist only dispenses. Many fund it with Exit 4 first. That sequencing — experience, abroad capital, then equity — is the classic RPh wealth arc.\n\n## The Move to Make This Month\n\nPick the exit that matches your constraint: need money soonest → industry sales or the Gulf prep track; want depth → hospital; want stability → government postings; want equity → start the ownership math. Then act small but immediately: one application, one DataFlow document request, one item posting bookmarked. Counters keep people through inertia, not contracts.\n\n## Frequently Asked Questions\n\n**What can pharmacists do besides retail?**\nHospital pharmacy, pharmaceutical industry (sales, regulatory affairs, QA, medical affairs), government items, Gulf deployment, and pharmacy ownership — all legally built on the same license.\n\n**Which pharmacist career pays best locally?**\nThe pharmaceutical industry — regulatory affairs and progressing sales/marketing roles out-earn retail substantially; abroad, Gulf postings pay tax-free multiples.\n\n**How much experience do I need for the Gulf?**\nTypically 1-2 years (hospital experience strongest), then DataFlow verification and the destination authority's Prometric exam.";

export default function ArticlePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-pharmacist-beyond-drugstore-options-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"I'm a Pharmacist but I Don't Want to Work in a Drugstore Forever"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">{"Pharmacy (PLE)"}</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"I'm a Pharmacist but I Don't Want to Work in a Drugstore Forever"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>&bull;</span>
                <span>{"September 3, 2026"}</span><span>&bull;</span>
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
