import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "LPT but Don't Want DepEd? Your Real Options",
  description: "Licensed teacher but DepEd isn't for you? The honest map - private and international schools, corporate training, publishing, review centers, online teaching, government non-teaching roles, and abroad.",
  path: "/education/lpt-not-deped-options",
});

const SCHEMA_FAQ = "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Can a licensed teacher work outside DepEd?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes. Private and international schools, review centers, corporate learning and development, educational publishing, edtech, non-teaching government roles through RA 1080 eligibility, and abroad teaching programs all hire licensed professional teachers.\"}},{\"@type\":\"Question\",\"name\":\"What is the highest-paying alternative to DepEd for teachers?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Locally, corporate learning and development leadership and international schools pay at the top of the market; abroad, international school posts pay best and weigh experience with curricula like IB and Cambridge.\"}}]}";

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

const MAIN_CONTENT = "**The direct answer: the LPT license works far beyond DepEd — private and international schools, corporate learning and development, review centers, publishing, online teaching, non-teaching government roles via RA 1080, and abroad pathways all hire licensed teachers — and several out-earn a Teacher I item. The license is a teaching credential; DepEd is just its largest single customer.** Here's the map.\n\n## First, name what you're actually avoiding\n\n\"Ayaw ko sa DepEd\" usually means one of three things, and they route differently: **the workload culture** (forms, ancillaries — [the honest scandal from our verdict](https://lisensyaprep.com/education/is-teaching-worth-it-philippines)) → private/international schools and corporate routes fix this; **the pay ceiling** → international schools, corporate L&D, and abroad fix this; **teaching itself** → the non-classroom lanes below fix this. Diagnose first; the cure depends on the disease.\n\n## Where else can a licensed teacher teach?\n\n- **Progressive private and international schools** — smaller classes, curriculum variety (IB/Cambridge), and at the international tier, [the top of the local teaching pay market](https://lisensyaprep.com/education/filipino-teacher-work-abroad). The classic ladder: strong private school → international school locally → international school abroad\n- **Review centers and tutorial services** — LET/CSE/entrance-exam teaching pays per session at rates that stack well, and star reviewers build followings (and businesses)\n- **Online teaching** — English platforms and tutoring marketplaces: flexible, portable, best as a stack or bridge\n- **Higher education** — with a master's, the college-instructor track opens; education units + your specialization is the combination\n\n## What if I don't want a classroom at all?\n\n- **Corporate Learning & Development** — companies run training departments, and LPTs are naturals: instructional design, trainer roles, e-learning development. This is the highest-ceiling non-classroom lane (L&D managers at large firms earn well into five figures monthly, industry-reported)\n- **Educational publishing and edtech** — textbook development, content writing, curriculum design for apps and platforms\n- **Government non-teaching roles** — your LET pass is [RA 1080 civil service eligibility](https://lisensyaprep.com/civil-service/let-vs-civil-service-exam): CHED, TESDA, LGU education offices, and administrative items across agencies\n- **NGO and development work** — education programs at foundations and iNGOs prize licensed educators\n\n## The abroad card stays on the table\n\nJ-1 US exchange, Japan ALT programs, international schools, Gulf schools — all remain open to LPTs who skipped DepEd, though international schools weigh *experience*, so the private-school years count as your runway.\n\n## The Honest Bottom Line\n\nDepEd offers what nothing else on this list does — the pension, the tenure, [the ₱31,705-to-₱53,818 ladder](https://lisensyaprep.com/education/teacher-salary-philippines) — so decline it knowingly, not reactively. But the LPT who chooses corporate L&D, the international track, or the review-center hustle isn't wasting a license; they're using its full width. The only wasted LPT is the unlicensed one — so whatever the path, [the LET comes first](https://lisensyaprep.com/education/).\n\n## Frequently Asked Questions\n\n**Can an LPT work outside DepEd?**\nYes — private and international schools, review centers, corporate training, publishing, edtech, government non-teaching roles via RA 1080, and abroad programs all hire licensed teachers.\n\n**What's the highest-paying non-DepEd path for teachers?**\nLocally: corporate L&D leadership and international schools; abroad: international-school posts, which weigh experience with IB/Cambridge curricula.\n\n**Do I lose my RA 1080 eligibility if I never join DepEd?**\nNo — the eligibility comes from passing the board, not from DepEd service, and applies to appropriate government positions indefinitely.";

export default function ArticlePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-lpt-not-deped-options-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"I'm an LPT but I Don't Want to Teach in DepEd - What Are My Options?"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">{"Education (LET)"}</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"I'm an LPT but I Don't Want to Teach in DepEd - What Are My Options?"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>&bull;</span>
                <span>{"September 2, 2026"}</span><span>&bull;</span>
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
