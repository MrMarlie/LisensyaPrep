import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "MedTech Burnout? Where Else RMTs Can Go",
  description: "Lab burnout is real - the honest map of where RMTs go next: diagnostics industry, QA and regulatory, medical sales, public health, academe, the ASCPi abroad route, and how bench years convert to leverage.",
  path: "/medical-technology/medtech-beyond-the-lab",
});

const SCHEMA_FAQ = "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"What careers can medical technologists pursue outside the hospital laboratory?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Diagnostics industry roles including application specialist, medical sales, and technical service, quality assurance and regulatory positions, public health laboratories with RA 1080 eligibility, academe and review teaching, and international routes powered by the ASCPi credential.\"}},{\"@type\":\"Question\",\"name\":\"Are RMTs good candidates for medical sales?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes. Diagnostics companies preferentially hire registered medical technologists to sell and support analyzers and reagents, because bench fluency is the core qualification and commission-based pay commonly outruns laboratory salaries quickly.\"}}]}";

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

const MAIN_CONTENT = "**The direct answer: your bench years are convertible currency, not a trap — RMTs move into the diagnostics industry (sales, applications, service), QA and regulatory roles, public health, research, academe, and the ASCPi-powered abroad route — and the burnout you're feeling at 3am in the blood bank is the most common exit trigger in the profession, not a personal failing. Here's where the license goes when the bench stops fitting.**\n\n## First, separate the two burnouts\n\n**Schedule burnout** (nights, rotations, stat pressure) has in-profession fixes: freestanding diagnostic centers and clinic labs run daytime hours; specialty sections (histopath, molecular) often escape the 24/7 rotation; chief-tech and QA-officer roles inside hospitals shift you from bench to systems. **Work burnout** (the bench itself no longer fits) needs the exits below. Diagnose honestly — changing employers cures the first; only changing roles cures the second.\n\n## Exit 1: The Diagnostics Industry (the classic RMT ladder-jump)\n\nThe companies that make and sell the analyzers you've been running hire RMTs preferentially:\n\n- **Product/application specialists** — training labs on instruments you already know cold; your bench fluency IS the qualification\n- **Medical/diagnostic sales** — analyzers, reagents, rapid kits: commission economics that outrun bench pay quickly, selling to people who speak your language\n- **Technical service and support** — the troubleshooting instinct, monetized\n\nThis lane values exactly the experience burning you out — the more sections you've rotated, the stronger your industry CV.\n\n## Exit 2: Quality, Regulatory, and Systems Roles\n\nLaboratory accreditation, ISO 15189 compliance, QA officer tracks, and regulatory roles in diagnostics/pharma companies — the meticulousness the bench trained into you, deployed on documents and systems instead of specimens. This is the lane where MedTech careers quietly grow ceilings.\n\n## Exit 3: Public Health and Government\n\nDOH programs, disease surveillance and reference laboratories, provincial health office roles — [your RA 1080 eligibility applies](https://lisensyaprep.com/civil-service/government-jobs-cse-eligibility), and outbreak-era investments keep expanding the public-health lab system. Mission-heavy, schedule-sane, salary-grade stable.\n\n## Exit 4: Academe and the Review Economy\n\nNursing and medtech schools perpetually need clinical instructors and lab supervisors; the review-center economy needs [MTLE teachers](https://lisensyaprep.com/medical-technology/); a master's extends the ladder. Teaching what you practiced is the profession's renewable second career.\n\n## Exit 5: The Abroad Reset (sometimes the fix is the same bench, repriced)\n\nHonest option: some \"burnout\" is underpayment wearing a costume. [The ASCPi](https://lisensyaprep.com/medical-technology/ascpi-filipino-medtech-guide) — which your bench years qualify you for and your MTLE knowledge overlaps heavily — repositions the exact same skills into Gulf and US-pathway labs at multiples of local pay. The 3am blood bank feels different at Gulf rates with housing covered. ([The deployment rules](https://lisensyaprep.com/blog/ofw-guide-licensed-professionals).)\n\n## The Conversion Rule\n\nEvery exit above prices your bench years — which reframes today: you're not stuck, you're *vesting*. The strategic move isn't rage-quitting at month eight; it's choosing your exit, stacking what it needs (an ASCPi application, a sales conversation with your friendly product rep, one QA certification), and leaving on schedule with the leverage your sections built. ([Your first-job map, if you're earlier in this arc](https://lisensyaprep.com/medical-technology/medtech-first-job-guide).)\n\n## Frequently Asked Questions\n\n**What can medtechs do besides hospital lab work?**\nDiagnostics-industry roles (application specialist, sales, technical service), QA and regulatory work, public health laboratories, academe and review teaching, and the ASCPi-powered abroad route.\n\n**Do RMTs do well in medical sales?**\nYes — diagnostics companies preferentially hire RMTs for analyzer and reagent sales, where bench fluency is the qualification and commission economics outrun bench pay.\n\n**Is lab burnout normal?**\nThe 24/7 rotation and stat pressure make it the profession's most common exit trigger — schedule fixes exist within the field (day-shift centers, specialty sections), and role exits exist beyond it.";

export default function ArticlePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-medtech-beyond-the-lab-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"I'm a MedTech but the Lab Is Burning Me Out - Where Else Can RMTs Go?"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">{"Medical Technology (MTLE)"}</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"I'm a MedTech but the Lab Is Burning Me Out - Where Else Can RMTs Go?"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>&bull;</span>
                <span>{"September 6, 2026"}</span><span>&bull;</span>
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
