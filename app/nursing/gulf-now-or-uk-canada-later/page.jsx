import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Gulf Now or UK/Canada Later? The Nurse's Dilemma Solved",
  description: "Gulf now or wait for the UK/Canada? The honest answer: they're sequential, not rivals - the Gulf funds Western applications. The decision framework by goal, timeline, and family plans, with the real trade-offs.",
  path: "/nursing/gulf-now-or-uk-canada-later",
});

const SCHEMA_FAQ = "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Should Filipino nurses go to the Gulf first or wait for the UK or Canada?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"For most nurses the routes are sequential rather than rivals: the Gulf deploys within months, pays tax-free multiples that fund the expensive Western applications, and builds experience that strengthens them — with direct-to-UK making sense mainly when employer-funded NHS recruitment is already within reach.\"}},{\"@type\":\"Question\",\"name\":\"Can nurses process Canada applications while working in the Gulf?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes. NNAS credential evaluation, the NCLEX, language tests, and immigration steps can all run from abroad, and funding them from Gulf savings while accumulating experience is the classic winning arc.\"}}]}";

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

const MAIN_CONTENT = "**The direct answer: this is usually a false dilemma — the routes are sequential, not rivals. The classic winning arc is Gulf-first-as-funding-phase (fast deployment, tax-free savings, experience that strengthens every later application) flowing into a UK or Canada move built on Gulf capital. Choose \"wait for the West directly\" only when a specific condition holds: an employer-funded UK offer already in hand, or family circumstances that make a Gulf detour genuinely costly. Here's the framework.**\n\n## What each door actually offers (verified recap)\n\n**[The Gulf](https://lisensyaprep.com/nursing/filipino-nurse-middle-east-guide):** deployment in months once you have the 2+ hospital years; tax-free multiples with housing; **no PR track ever** — a chapter by design. **[The UK](https://lisensyaprep.com/nursing/filipino-nurse-uk-pathway):** commonly under a year with an NHS sponsor who *pays the costs* (CBT, flights, housing start); a settled-status future exists; the catch is landing the sponsor and clearing IELTS 7.0/OET B. **[Canada](https://lisensyaprep.com/nursing/filipino-nurse-canada-pathway):** the PR-and-family prize; the price is the longest, most document-heavy, most self-funded runway (NNAS, NCLEX, language, immigration steps stacking 1-2+ years).\n\n## Why Gulf-first wins for most nurses\n\nThree honest mechanics: **(1) the funding problem is real** — Canada's route especially costs serious money across NNAS, exams, and applications, and a PH staff-nurse salary funds it slowly; a Gulf package funds it fast. **(2) Experience compounds across borders** — Gulf ICU/ER years strengthen UK and Canadian applications; the detour isn't lost time, it's CV construction at 3-5x savings rates. **(3) The Gulf's requirements arrive first anyway** — you need 2 PH hospital years for the Gulf; Western employers want experience too. The timeline stacks naturally: PH years → Gulf chapter → Western application *from* the Gulf (yes, you can run NNAS/NMC processes while working in Riyadh — many do exactly that).\n\n## When waiting for the West directly is right\n\n- **A UK sponsor is already reachable:** if NHS recruitment is active in your area and your IELTS/OET is done, the UK's employer-funded model removes the funding problem the Gulf exists to solve — go direct\n- **Family timing:** if bringing spouse/kids soon is non-negotiable, the Gulf's limited sponsorship rules chafe; the UK/Canada family provisions may justify the slower direct road\n- **You know yourself:** if [the drift trap](https://lisensyaprep.com/blog/is-working-abroad-worth-it) worries you — Gulf comfort postponing the Western move contract after contract — a direct route with its forced deadlines might protect you from your own inertia. The Gulf funds plans; it also dissolves vague ones\n\n## The framework in one line each\n\n**Goal = maximum lifetime earnings + eventual PR:** Gulf 2-4 years → Canada/UK, application running in parallel from year two. **Goal = fastest Western landing:** UK direct, English test first, agency-verified NHS recruitment. **Goal = PR above all, funding exists:** Canada direct, NNAS opened this month. **Goal = fastest money, period:** Gulf, with a written exit condition — because the only losing version of this game is the one played without one.\n\n## Frequently Asked Questions\n\n**Should I go to the Gulf or wait for the UK?**\nFor most nurses, Gulf-first — it deploys fastest, funds the Western application, and builds CV years — unless an employer-funded UK offer is already within reach, in which case go direct.\n\n**Can I apply to Canada while working in the Gulf?**\nYes — NNAS, NCLEX, and immigration processes can run from abroad, and funding them from Gulf savings is the classic arc.\n\n**Does Gulf experience count for Western applications?**\nYes — Gulf hospital years strengthen UK and Canadian applications; the detour builds the CV rather than pausing it.";

export default function ArticlePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-gulf-now-or-uk-canada-later-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"Gulf Now or Wait for the UK and Canada? The Nurse's Deployment Dilemma"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">{"Nursing (PNLE)"}</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"Gulf Now or Wait for the UK and Canada? The Nurse's Deployment Dilemma"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>&bull;</span>
                <span>{"September 14, 2026"}</span><span>&bull;</span>
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
              <Link href={"/nursing"} className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Start Reviewing</h3>
              <p className="text-gray-400 text-sm mb-4">Reading is good, but practice is better. Test your knowledge with our free gamified reviewers.</p>
              <Link href={"/nursing"} className="block w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl text-center text-sm transition-colors">
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
