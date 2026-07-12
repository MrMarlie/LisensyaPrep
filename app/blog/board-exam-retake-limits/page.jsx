import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "How Many Times Can You Take the Board Exam? (Retake Rules)",
  description: "Board exam retake rules explained per profession - the three-fail refresher requirements in nursing, criminology, pharmacy and medtech, the LET's rules, CSE retakes, and how retakers can actually pass.",
  path: "/blog/board-exam-retake-limits",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many times can you take a PRC board exam?","acceptedAnswer":{"@type":"Answer","text":"There is no lifetime ban in the professions covered, but several professional laws including nursing, criminology, medical technology, and pharmacy require completing a refresher course after three failures before admission to another attempt."}},{"@type":"Question","name":"Do passed subjects carry over when retaking a board exam?","acceptedAnswer":{"@type":"Answer","text":"Generally no. A retake means taking the full examination again, so retakers should plan a complete review with strategy changes."}}]};

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
Failing a board exam feels like the end. Legally, it almost never is — **no PRC exam we cover imposes a lifetime ban** — but several professions attach a condition after repeated failures that every retaker must know about: the **refresher course requirement**.

## The General Pattern

Most Philippine professional regulatory laws follow the same logic: you may retake the exam, but **after three failures, you must complete a refresher course** (typically covering the board subjects, through an accredited provider) before being admitted to a fourth attempt. The condition exists in the professional laws of, among others:

- **Nursing (RA 9173):** three consecutive failures → refresher course before the next attempt
- **Criminology (RA 11131):** refresher required after the third failure
- **Medical Technology (RA 5527):** refresher after three failures
- **Pharmacy (RA 10918):** refresher condition after repeated failures per the law's IRR

**The LET (RA 7836):** no numeric retake limit in the same fashion — takers may retake in subsequent administrations, and refresher/review is the practical (rather than uniformly mandated) path. **The Civil Service Exam:** no lifetime limit; retakes are allowed in later administrations subject to CSC's interval rules.

**Our standing honesty rule applies:** before you plan around any specific count, verify the current rule for *your* profession with the PRC or your professional law's IRR — regulatory boards issue clarifications, and this page summarizes the pattern, not your case file.

## What Failing Actually Costs (and Doesn't)

- Your **passed subjects do not carry over** — a retake means the full exam again (conditional/partial passing existed historically in some exams but do not plan on it; check your profession's current rules)
- Your **application fees** are per attempt
- Your **degree never expires** — there is no deadline by which you must pass
- And the thing failing does *not* cost: your future. Every cycle's topnotcher lists sit next to thousands of passers on their second or third attempt

## The Retaker's Real Problem — and Fix

Here is the number that should change your strategy: in cycles where PRC publishes the split, **retakers pass at a fraction of first-timer rates** — 35.87% vs 87.12% in the May 2025 PNLE. The pattern behind it: retakers repeat the same review that already failed them, squeezed into less time, with more anxiety.

The fix is a changed system, not repeated effort: **(1)** diagnose per-subject weaknesses from your rating (request [verification of rating](https://lisensyaprep.com/blog/leris-prc-online-guide) — it shows per-subject scores); **(2)** rebuild around retrieval practice, not re-reading ([the science](https://lisensyaprep.com/blog/board-exam-study-tips)); **(3)** simulate full timed exams before the real one. Start with a free diagnostic: [gamified reviewers, all six professions](https://lisensyaprep.com/).

## Frequently Asked Questions

**Is there a limit to board exam retakes?**
No lifetime bans in the professions we cover — but several (nursing, criminology, medtech, pharmacy) require a refresher course after three failures before the next attempt.

**Do passed subjects carry over to a retake?**
Generally no — plan for the full exam. Verify your profession's current rules on any conditional-passing provisions.

**Why do retakers fail at higher rates?**
Repeating an unchanged review system. The verified splits (36% vs 87% in one recent cycle) reflect strategy, not ability.
`;

export default function BoardExamRetakeLimitsPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-board-exam-retake-limits-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"How Many Times Can You Take the Board Exam? Retake Rules Per PRC Profession"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">PRC Guide</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"How Many Times Can You Take the Board Exam? Retake Rules Per PRC Profession"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 29, 2026</span><span>•</span>
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
