import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: "Board Exam Study Tips - Foods, Sleep & Habits That Work",
  description: "Evidence-based board exam review tips from a real board passer - what to eat while studying, why sleep beats cramming, break schedules, and the single most effective review technique.",
  path: "/blog/board-exam-study-tips",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the most effective board exam review technique?","acceptedAnswer":{"@type":"Answer","text":"Retrieval practice — actively answering board-style questions and reviewing the rationales of wrong answers — strengthens memory far more than re-reading notes."}},{"@type":"Question","name":"Is it okay to cram the night before the board exam?","acceptedAnswer":{"@type":"Answer","text":"No. Memory consolidation happens during sleep, so an all-nighter trades away retention of everything studied. Do light review only and protect 7-8 hours of sleep."}},{"@type":"Question","name":"What should I eat while reviewing for the board exam?","acceptedAnswer":{"@type":"Answer","text":"Balanced regular meals and consistent hydration, with sweets as occasional morale boosters rather than primary fuel, since steady glucose beats sugar spikes for sustained focus."}}]}`;

const RELATED_ARTICLES = [
  { text: "What to Do After Passing the Board Exam", href: "/blog/after-passing-board-exam-philippines" },
  { text: "PNLE August 2026 Guide", href: "/nursing/pnle-august-2026-schedule" },
  { text: "CLE August 2026 Guide", href: "/criminology/cle-august-2026-guide" },
];

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
      if (line.match(/^\|[-\s|]+\|$/)) continue; // separator row
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
During my own board exam review — I am a Registered Pharmacist — my honest formula was simple: focus, sweets for the brain, and breaks. You need to rest and enjoy too. Years later, running a review platform, I can add what the learning science says on top of what worked for me. Here is the combination.

## 1. The Single Most Effective Technique: Test Yourself

Decades of learning research point the same direction: **retrieval practice** — actively answering questions — beats re-reading notes by a wide margin. Every time you force your brain to *retrieve* an answer, the memory strengthens; every time you merely re-read, it mostly feels productive without being so.

Practical version: for every hour of reading, spend at least an equal hour answering board-style questions and reviewing the rationales of your wrong answers. (Yes, this is precisely why we built LisensyaPrep as a quiz platform rather than a notes dump — [free gamified reviewers here](https://lisensyaprep.com/).)

## 2. Sleep Is Study Time, Not Its Opposite

Memory consolidation — moving today's review into long-term storage — happens largely **during sleep**. The all-nighter is self-sabotage: you trade the consolidation of everything you studied for a few groggy extra hours. Protect 7-8 hours nightly, especially the final week, and absolutely the night before the exam.

## 3. Food: Steady Beats Spiky

My sweets-while-studying habit? A quick glucose boost genuinely can help short-term focus — but the honest fuller picture is that **steady fuel beats sugar spikes**: balanced meals, regular timing, and water. The crash after a heavy sugar hit costs more focus than the hit provided. Keep the candy as a treat and mood-lifter (it worked for me), not the meal plan. And hydrate — mild dehydration reads as fatigue and headache mid-study.

Caffeine: useful, but front-load it. Late-afternoon coffee steals from the very sleep your review depends on.

## 4. Breaks Are Part of the System

I said it as a reviewee and I will say it as a passer: **take breaks. Rest and enjoy too.** Sustained attention degrades; scheduled breaks reset it. The popular pattern — focused blocks of 25-50 minutes with 5-10 minute breaks, and one real rest day per week — outperforms guilt-driven marathon sessions that end in burnout. Burnout fails more board exams than difficult questions do.

## 5. Study the Blueprint, Not Just the Books

Every PRC exam has a table of specifications or subject weighting. Allocate hours proportionally to weights, and never let any subject fall below the per-subject floor (most PRC exams fail you for one subject under 50-60% regardless of your average). Diagnostic first, then attack the weakest areas — not the most comfortable ones.

## 6. Simulate the Exam Before the Exam

Timed, full-length mock exams train the skill nobody's notes cover: pacing and stamina. Sitting 100-500 questions is physically tiring; the first time you experience that fatigue should not be exam day.

## 7. The Final Week Protocol

- No new material in the last 3 days — light review of weak areas only
- Sleep on schedule; prepare documents and route to the venue in advance
- Eat a normal, familiar breakfast on exam day (not an experiment)
- Trust your preparation — anxiety after honest review is noise, not signal

---

## Frequently Asked Questions

**What should I eat while reviewing for the board exam?**
Balanced regular meals and water, with quick treats as morale boosters rather than fuel. Steady glucose beats sugar spikes for sustained focus.

**Is it okay to cram the night before?**
No — sleep consolidates memory, and an all-nighter trades away the retention of everything you studied. Light review only, then rest.

**What is the most effective review technique?**
Retrieval practice: answering questions and studying the rationales of wrong answers, which strengthens memory far more than re-reading notes.

**How long should study breaks be?**
Short breaks (5-10 minutes) every 25-50 minutes of focused work, plus one genuine rest day weekly.

---

For the subject-by-subject review itself: [free gamified board exam reviewers at LisensyaPrep](https://lisensyaprep.com/) — nursing, teaching, criminology, pharmacy, medtech, agriculture, and civil service. From one board passer to the next: focus, fuel up, rest — kaya mo yan.
`;

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: "/blog", name: "Blog" }, { url: "/blog/board-exam-study-tips", name: "Board Exam Study Tips" }]} />
      <Script id="schema-board-exam-study-tips-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Board Exam Study Tips</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">PRC Guide</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Board Exam Review Study Tips: Foods, Sleep, and Habits That Actually Work
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 28, 2026</span><span>•</span>
                <span>7 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">Related Guides</h2>
              <ul className="space-y-3">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 border border-yellow-500/30 rounded-2xl p-6 text-center">
              <p className="text-yellow-400 font-extrabold text-lg mb-2">Still Reviewing for Your Board Exam?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified reviewers for PNLE, LET, CLE, PLE, MTLE, and more. No account required.</p>
              <Link href="/" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Related Guides</h3>
              <div className="space-y-3">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <Link key={href} href={href} className="group block">
                    <p className="text-gray-300 text-sm group-hover:text-yellow-400 transition-colors leading-snug">{text}</p>
                  </Link>
                ))}
              </div>
            </div>
            <AdPlaceholder slot="sidebar" />
          </aside>

        </div>
      </div>
    </div>
  );
}
