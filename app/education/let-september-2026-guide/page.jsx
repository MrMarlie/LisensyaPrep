import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "LET September 2026 - Schedule, Room Assignment & Complete Guide",
  description: "Complete LET September 2026 guide - exam date, room assignment release, what to bring, coverage per level, weighting, and last-stretch review strategy for the teachers' board exam.",
  path: "/education/let-september-2026-guide",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the passing score for the LET?","acceptedAnswer":{"@type":"Answer","text":"A general average of 75 percent with no subtest rating below 50 percent."}},{"@type":"Question","name":"How is the LET weighted?","acceptedAnswer":{"@type":"Answer","text":"Elementary without specialization: General Education 40 percent and Professional Education 60 percent. Secondary and Elementary with Specialization: 20 percent Gen Ed, 40 percent Prof Ed, and 40 percent Specialization."}}]};

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

const MAIN_CONTENT = `
The September LET is the year's second and biggest teachers' board window — and if the March 2026 record (67.17% overall) tells us anything, it's that well-prepared takers have never had better odds. Here is everything for exam season, in one page.

## The Key Dates

- **Exam date: September 2026** — confirm the exact Sunday on the official PRC calendar (Resolution No. 2113 s. 2025) at prc.gov.ph
- **Applications:** through LERIS (online.prc.gov.ph); windows close well before exam day — if you have not applied, check slot availability now
- **Room assignments:** the PRC posts the **Notice of School Assignment (NOSA)** in the final weeks before the exam, through the PRC website, regional office postings, and results portals. Your **Notice of Admission (NOA)** from LERIS states your application details — keep it safe; you bring it on exam day

## Room Assignment: How It Actually Works

1. Watch the PRC website and official Facebook page starting several weeks out
2. Find your name/school assignment in the posted lists for your region (organized by testing center)
3. **Visit your assigned school before exam day** — the classic advice that saves careers: know the route, travel time, and your exact room, because September Sundays mean traffic and rain
4. Exam-day kit: NOA, valid ID, black ballpens (several), non-programmable calculator if permitted per current instructions, transparent envelope/bag per PRC rules, food and water for the full-day exam

## Coverage and Weighting (Verified)

- **Elementary:** General Education 40% / Professional Education 60%
- **Elementary with Specialization & Secondary:** Gen Ed 20% / Prof Ed 40% / Specialization 40%
- **Passing:** 75% GWA, no subtest below 50%

The Secondary structural advantage — 40% of your score in your major — is why [Secondary rates run 15-25 points above Elementary every cycle](https://lisensyaprep.com/education/let-passing-rate-history). Elementary takers: broad, blueprint-weighted review is your whole game.

## The Last-Stretch Strategy

With weeks left, the highest-yield moves in order: **(1)** daily retrieval practice over re-reading — answer questions, study rationales; **(2)** attack your weakest Gen Ed/Prof Ed areas, not your comfortable ones; **(3)** simulate full timed sets for pacing stamina; **(4)** protect sleep the final week — [the full study science here](https://lisensyaprep.com/blog/board-exam-study-tips). Practice free: [gamified LET reviewer](https://lisensyaprep.com/education/).

Then bookmark for after: [What to Do After Passing the LET](https://lisensyaprep.com/education/after-passing-let-next-steps) — because your rating is worth up to 10 points in [DepEd ranking](https://lisensyaprep.com/education/deped-teacher-1-ranking-guide), and the steps after passing start immediately.

## Frequently Asked Questions

**When will the September 2026 LET room assignments be released?**
The PRC posts school assignments in the final weeks before the exam on its website and official channels — start checking several weeks out.

**What do I bring on LET exam day?**
Your Notice of Admission, valid ID, black ballpens, and permitted materials per the current PRC examinee instructions. Visit your assigned school beforehand.

**What is the LET passing score?**
75% general average with no subtest below 50%.

**How is the LET weighted?**
Elementary: 40% Gen Ed, 60% Prof Ed. Secondary and Elementary-with-Specialization: 20/40/40 with specialization.
`;

export default function LetSeptember2026GuidePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-let-september-2026-guide-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"LET September 2026 - Schedule, Room Assignment, and Complete Guide"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">Education</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"LET September 2026 - Schedule, Room Assignment, and Complete Guide"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 27, 2026</span><span>•</span>
                <span>7 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-8 bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 border border-yellow-500/30 rounded-2xl p-6 text-center">
              <p className="text-yellow-400 font-extrabold text-lg mb-2">Still Reviewing for Your Board Exam?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified reviewers for PNLE, LET, CLE, and more. No account required.</p>
              <Link href="/" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Start Reviewing</h3>
              <p className="text-gray-400 text-sm mb-4">Reading is good, but practice is better. Test your knowledge with our free gamified reviewers.</p>
              <Link href="/" className="block w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl text-center text-sm transition-colors">
                ⚔️ Start Quiz
              </Link>
            </div>
            <AdPlaceholder slot="sidebar" />
          </aside>

        </div>
      </div>
    </div>
  );
}
