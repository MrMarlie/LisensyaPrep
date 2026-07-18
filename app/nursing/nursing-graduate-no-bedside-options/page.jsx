import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Nursing Graduate but Don't Want Bedside? Your Real Options",
  description: "Don't want hospital bedside duty? The honest map for RNs - school and company nursing, HMOs, telehealth, pharma, research, teaching - plus the one hard truth about which doors need bedside years first.",
  path: "/nursing/nursing-graduate-no-bedside-options",
});

const SCHEMA_FAQ = "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Can nursing graduates work without doing bedside duty?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes. School nursing, company and BPO clinic roles, HMO and insurance work, telehealth, pharma, and research all hire licensed nurses without hospital bedside years, though entry pay is similar to modest private hospital rates.\"}},{\"@type\":\"Question\",\"name\":\"Do nurses need bedside experience to work abroad?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Almost always yes. Gulf employers typically require at least two years of hospital experience and UK, Canada, and US pathways favor bedside experience, which is why a short deliberate bedside tour of one to two years keeps international doors open.\"}}]}";

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

const MAIN_CONTENT = "**The direct answer: real non-bedside careers exist for RNs — school nursing, company/occupational health, HMO and insurance work, telehealth, pharma, research, and teaching — but here's the honest sentence most articles omit: several of the best ones, and nearly all abroad pathways, still ask for 1-2 bedside years first. So the real decision isn't \"bedside or not\"; it's \"zero bedside ever, or a short deliberate tour that buys every door open.\"** Here's the map for both choices.\n\n## Step Zero: Pass the PNLE Regardless\n\nEvery option below is for *licensed* nurses. An unlicensed BSN graduate competes as a generic degree-holder; an RN competes as a professional with [RA 1080 government eligibility](https://lisensyaprep.com/civil-service/government-jobs-cse-eligibility) built in. With [record-friendly recent rates](https://lisensyaprep.com/nursing/pnle-passing-rate-history), the license is the non-negotiable first move — [free reviewer here](https://lisensyaprep.com/nursing/).\n\n## What non-bedside jobs can I get with zero hospital experience?\n\n- **School nursing** — private schools and universities hire RNs for clinic duty: daytime hours, no night shifts, academic-calendar breaks. The classic bedside-free entry\n- **Company/occupational health nursing** — factories, BPOs, and offices are commonly required to maintain clinic staff; corporate hours and corporate benefits. BPO clinic roles frequently take fresh RNs\n- **HMO and insurance work** — claims processing, utilization review, member services: desk-based nursing judgment, growing steadily with the HMO industry\n- **Telehealth and health-tech** — triage lines, remote patient monitoring, health-app content: the newest lane and expanding\n- **Medical transcription/coding, clinical research assistant roles, pharma entry roles** — nursing knowledge monetized at a desk\n\nHonest pay note: these commonly start in the same modest band as private bedside pay (high-teens to ₱20,000s, industry-reported) — you're trading shift stress for lifestyle, not for money, at entry.\n\n## Which doors quietly close without bedside years?\n\nAlso honest: **most abroad pathways** ([Gulf requires 2+ hospital years; UK/Canada/US employers want bedside experience](https://lisensyaprep.com/nursing/filipino-nurse-work-abroad-guide)), **government Nurse I items** (competition favors clinical experience), and clinical specializations. If any of those live in your 10-year plan, consider the deliberate tour: 12-24 bedside months, chosen unit, defined exit — the toll-gate logic from our worth-it verdict. Two years of tolerable difficulty for a lifetime of open doors is a trade many no-bedside nurses later wish they'd made.\n\n## The long-game non-bedside ladders\n\n**Occupational health** has a real ceiling (OH nurse → OH supervisor → corporate health manager, with certifications). **Academe** — clinical instructors are perpetually in demand given nursing's enrollment (a master's extends this ladder). **Pharma** — from med rep to clinical research associate to regulatory roles, where the RN + industry combination compounds. **Entrepreneurship-adjacent** — reviewer/tutorial work, home-care coordination, wellness businesses that legally lean on a license.\n\n## The Honest Bottom Line\n\nNot wanting bedside is a legitimate preference, not a nursing failure — the license was always bigger than the ward. Just choose with the doors visible: zero-bedside works and pays modestly with lifestyle upside; the short deliberate tour costs 1-2 hard years and keeps abroad, government, and clinical ceilings alive. Either way: license first, drift never. ([What to do right after passing](https://lisensyaprep.com/nursing/after-passing-pnle-next-steps).)\n\n## Frequently Asked Questions\n\n**Can I work as a nurse without hospital experience?**\nYes — school nursing, company/BPO clinics, HMO work, and telehealth commonly hire RNs without bedside years, at entry pay similar to private hospital rates.\n\n**Do I need bedside experience to work abroad?**\nAlmost always yes — the Gulf typically requires 2+ hospital years and Western employers want bedside experience, which is the strongest argument for a short deliberate bedside tour.\n\n**Is school or company nursing a dead end?**\nNo — occupational health in particular has a real corporate ladder (supervisor, corporate health manager), and academe and pharma extend from any of these bases.";

export default function ArticlePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-nursing-graduate-no-bedside-options-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"I'm a Nursing Graduate but I Don't Want Bedside Duty - What Are My Options?"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">{"Nursing (PNLE)"}</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"I'm a Nursing Graduate but I Don't Want Bedside Duty - What Are My Options?"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>&bull;</span>
                <span>{"September 1, 2026"}</span><span>&bull;</span>
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
