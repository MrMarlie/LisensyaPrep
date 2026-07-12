import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Hardest Board Exams in the Philippines (Actual Passing Rates 2026)",
  description: "Which board exam is really the hardest? Ranked by actual recent PRC passing rates with multi-cycle data - agriculture's 34% low, criminology's coin-flip odds, the LET elementary grind, and more.",
  path: "/blog/hardest-board-exams-philippines",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the hardest board exam in the Philippines by passing rate?","acceptedAnswer":{"@type":"Answer","text":"Among professions with verified recent data, the Agriculturist Licensure Exam has posted the lowest recent national passing rates, including 34.18 percent in November 2023. The Bar, CPA, and Architecture exams are also perennially cited among the country's hardest."}},{"@type":"Question","name":"Why do board exam passing rates change so much between cycles?","acceptedAnswer":{"@type":"Answer","text":"Cohort composition. Cycles dominated by fresh graduates pass at far higher rates than smaller retaker-heavy cycles, as first-time takers consistently outperform repeaters."}}]};

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
Every barkada has this debate: *which board exam is really the hardest?* Most answers are vibes. This one is data — actual national passing rates from recent official PRC releases, with multi-cycle ranges so a single unusual batch doesn't distort the picture.

**One honest rule first:** "hard" here means *statistically fewest passers*, which mixes exam difficulty with cohort factors (fresh grads vs retakers, school quality spread). A low passing rate means the odds are against the average examinee — it does not mean *you* are average.

## The Ranking (Professions We Track, by Recent Low-End Passing Rates)

**1. Agriculturist Licensure Exam (ALE) — as low as 34.18%**
November 2023's 34.18% (3,423 of 10,014) is the harshest verified rate in our data set. November 2024 managed just 50.78%. The 2025 cycle improved to 68.55% — but across recent years, agriculture has been statistically the cruelest exam we track, with the widest school-quality gap: UPLB posted 99% in the same cycle the nation posted 34%.

**2. LET — Elementary Level — 45-56% recently**
The elementary teachers' exam has hovered in the mid-40s (45.51% in Sept 2024, 46.77% in March 2025) before climbing to 56.03% in the record March 2026 cycle. Roughly half of aspiring elementary teachers walk away without the license each cycle.

**3. Criminologist Licensure Exam (CLE) — 49-66%**
July 2024: 49.34%. August 2025: 51.45%. A literal coin flip for years — until February 2026's record 66.00%. With 45,000+ examinees per big cycle, the CLE fails more *people* than almost any exam in the country even in good years.

**4. Pharmacist Licensure Exam (PhLE) — 57-81%, cycle-dependent**
April cycles (heavier with retakers) run around 57-60%; November cycles with fresh graduates hit 80%+. Averaged out, a meaningful minority fails — and as pharmacists ourselves, we can confirm the exam earns its reputation.

**5. LET — Secondary Level — 57-73%**
Consistently 15-25 points above Elementary, but still leaving one in four behind even in the best recent cycle.

**6. PNLE (Nursing) — wildly cycle-dependent: 44-90%**
The November 2025 PNLE hit a record 90.04% — while February 2026 posted just 44.24%. The difference is cohort: big fresh-graduate November batches versus small retaker-heavy February batches. First-timer vs retaker splits (87% vs 36% in May 2025) tell the real story.

**7. MTLE (Medical Technology) — 71-84%**
The gentlest recent rates among our professions — reflecting medtech's rigorous internship filter, not an easy exam.

## The Famously Brutal Ones Beyond Our Niche

For completeness: the **Bar Exam**, **CPA Licensure Exam**, and **Architecture Licensure Exam** are perennially cited among the country's hardest, with historically low passing rates of their own. We keep this article's ranked claims to the professions whose cycles we verify directly — that's the deal we make with our readers.

## What Actually Separates Passers from the Rate

Across every exam above, three factors repeat in the data: **first-timers massively outperform retakers**, **school quality gaps are enormous** ([see our school rankings](https://lisensyaprep.com/nursing/best-nursing-schools-philippines)), and **retrieval practice beats re-reading** ([study science here](https://lisensyaprep.com/blog/board-exam-study-tips)). The rate is the average. Preparation is how you refuse to be average — [free gamified reviewers for all six professions](https://lisensyaprep.com/).

## Frequently Asked Questions

**What is the hardest board exam in the Philippines?**
Among professions with verified recent data, the Agriculturist Licensure Exam has posted the lowest rates (34.18% in November 2023). Beyond our niche, the Bar, CPA, and Architecture exams are perennially cited.

**Why do passing rates swing so much between cycles?**
Cohort composition — big fresh-graduate cycles pass at far higher rates than small retaker-heavy ones. The exam is the same; the takers differ.

**Does a hard exam mean a better profession?**
No — passing rates measure gatekeeping, not career value. Salary, demand, and mobility are separate questions we cover per profession.
`;

export default function HardestBoardExamsPhilippinesPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-hardest-board-exams-philippines-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"Hardest Board Exams in the Philippines, Ranked by Actual Passing Rates (2026)"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">PRC Guide</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"Hardest Board Exams in the Philippines, Ranked by Actual Passing Rates (2026)"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 19, 2026</span><span>•</span>
                <span>8 min read</span>
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
