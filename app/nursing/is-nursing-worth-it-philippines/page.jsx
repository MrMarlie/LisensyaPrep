import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Is Nursing Still Worth It in the Philippines? (Honest 2026)",
  description: "Is nursing worth it in 2026? The honest verdict using verified data - the record 90% passing rate, real government pay of ₱42,178+, the abroad multiplier, the burnout costs, and who should (and shouldn't) choose it.",
  path: "/nursing/is-nursing-worth-it-philippines",
});

const SCHEMA_FAQ = "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Is nursing still worth it in the Philippines in 2026?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"For most people asking, yes — record board passing rates, livable government pay starting at 42,178 pesos for Nurse I, and five mature international pathways — provided the graduate accepts one to three modestly paid local bedside years as the entry toll that every pathway requires.\"}},{\"@type\":\"Question\",\"name\":\"How much do nurses earn in the Philippines in 2026?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Government Nurse I positions pay 42,178 to 45,202 pesos monthly under the 2026 salary tranche plus allowances, while private hospital entry pay commonly runs far lower at industry-reported 15,000 to 25,000 pesos, making government items and abroad pathways the anchors of the financial case.\"}}]}";

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

const MAIN_CONTENT = "**The direct answer: yes for most people asking — nursing in 2026 offers the strongest license-to-global-opportunity ratio of any Philippine degree — but it is only worth it if you accept the honest trade: 2-4 underpaid local bedside years as the toll gate to everything the license unlocks.** People who quit bitter usually priced in the destination but not the toll. Here is the full accounting, with verified numbers, so you can decide with open eyes.\n\n## The Case FOR (What the Data Says)\n\n**The exam odds have never been friendlier.** The November 2025 PNLE posted a record **90.04%** — the climax of [a decade-long climb from below-50% rates](https://lisensyaprep.com/nursing/pnle-passing-rate-history). For a well-prepared fresh graduate in a main cycle, the license is more reachable than at any point in modern history.\n\n**Government pay is genuinely livable now.** Under the 2026 salary tranche, a **Nurse I item starts at SG-15: ₱42,178-₱45,202 monthly** plus allowances — a real middle-class wage with security of tenure, and [several steps above](https://lisensyaprep.com/civil-service/salary-grade-table-philippines) what most degree-holder first jobs pay. The catch is honest too: items are competitive and many nurses wait for one.\n\n**The abroad multiplier is the profession's superpower.** No other Filipino license has [five mature international pathways](https://lisensyaprep.com/nursing/filipino-nurse-work-abroad-guide) — the Gulf in months, the UK with employers commonly paying your way, Canada with a PR track, the US with the highest ceiling. Global nurse shortages are structural, not cyclical. A nursing license is a passport with extra steps.\n\n**The floor is uniquely wide.** Beyond the bedside: school nursing, company clinics, HMOs, telehealth, pharma, research, teaching. Few licenses fail this gracefully.\n\n## The Case AGAINST (Also True)\n\n**Private-sector entry pay is the scandal everyone whispers about.** Many private hospitals pay well below the government scale — frequently in the ₱15,000-₱25,000 band (industry-reported; varies widely) — for work of identical difficulty. If you never intend to leave a low-paying private bedside job, the financial case genuinely weakens.\n\n**The toll years are real.** The abroad pathways and the good local items both demand **1-3 years of bedside experience** — night shifts, patient loads, and emotional labor at wages that don't honor them. This is the part brochures omit and burnout stories are made of.\n\n**Volatility punishes the unprepared.** [Our Difficulty Index ranks the PNLE 4th-hardest](https://lisensyaprep.com/blog/board-exam-difficulty-index) *despite* the record — because February cycles hit 44.24% and retakers pass at 35.87%. The friendly odds belong to prepared first-timers in main cycles, not to everyone by default.\n\n**The cost of entry varies wildly** — [from free at top state universities to ₱150k+/year privately](https://lisensyaprep.com/nursing/nursing-school-tuition-fees), for statistically similar board outcomes at the top of each tier. Choosing the wrong-priced school is the most avoidable financial mistake in the profession.\n\n## So Who Is It Worth It For?\n\n**Worth it if:** you can genuinely see yourself caring for patients (the work is the work — no salary fixes hating it); you're playing a 5-10 year game where the toll years purchase the abroad or government destination; and you'll [choose your school on performance-per-peso](https://lisensyaprep.com/nursing/best-nursing-schools-philippines), not brochure aesthetics.\n\n**Think twice if:** your plan is \"basta makaalis agad\" with no tolerance for the bedside years (the pathways all require them); you're choosing it purely on parental pressure (see the burnout note above); or the honest alternative — [MedTech's steadier exam and lab-based work](https://lisensyaprep.com/medical-technology/best-medtech-schools-philippines), or midwifery's faster ownership path — actually fits your temperament better. \"Health career\" has more than one door.\n\n## The Honest Bottom Line\n\nNursing in 2026 is a strong deal with a clearly-priced toll. The graduates who thrive are the ones who knew the toll going in, planned the years around it, and treated the license as the compounding asset it is. The ones who struggle expected the destination without the road. Decide accordingly — and if the answer is yes, [the preparation starts free, right here](https://lisensyaprep.com/nursing/).\n\n## Frequently Asked Questions\n\n**Is nursing a good course in the Philippines in 2026?**\nFor most people asking, yes — record passing rates (90.04% in November 2025), livable government pay (Nurse I at ₱42,178+), and unmatched international pathways — provided you accept 1-3 underpaid local bedside years as the entry toll.\n\n**How much do nurses earn in the Philippines?**\nGovernment Nurse I items pay ₱42,178-₱45,202 monthly under the 2026 tranche; private entry pay is commonly far lower (₱15,000-₱25,000 industry-reported), which is why government items and abroad pathways anchor the financial case.\n\n**Is it easy to pass the nursing board now?**\nFor prepared first-timers in main cycles, odds are historically favorable — but February cycles hit 44.24% and retakers pass at 35.87%, so \"easy\" is earned, not automatic.";

export default function ArticlePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-is-nursing-worth-it-philippines-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"Is Nursing Still Worth It in the Philippines? An Honest 2026 Answer"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">{"Nursing (PNLE)"}</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"Is Nursing Still Worth It in the Philippines? An Honest 2026 Answer"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>&bull;</span>
                <span>{"August 23, 2026"}</span><span>&bull;</span>
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
