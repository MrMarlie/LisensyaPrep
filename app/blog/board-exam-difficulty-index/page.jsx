import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Board Exam Difficulty Index 2026 - Ranked by 3 Years of Data",
  description: "The LisensyaPrep Board Exam Difficulty Index (LBDI) ranks Philippine licensure exams using 3 years of verified passing-rate data - average rates, worst-cycle floors, and volatility. The results will surprise you.",
  path: "/blog/board-exam-difficulty-index",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the hardest board exam in the Philippines according to the data?","acceptedAnswer":{"@type":"Answer","text":"By the LisensyaPrep Board Exam Difficulty Index, computed from three years of verified passing-rate data, the Agriculturist Licensure Exam ranks hardest at 51.0, narrowly edging the Bar Examination at 50.0, with LET Elementary third at 43.5."}},{"@type":"Question","name":"Why does the nursing board exam rank among the hardest despite record passing rates?","acceptedAnswer":{"@type":"Answer","text":"The index scores worst-cycle performance and volatility alongside averages. The PNLE's 44.24 percent February 2026 cycle and 45.8-point swing between cycles — the largest of any Philippine board exam — reveal statistical risk that the 90 percent record headline hides."}},{"@type":"Question","name":"How is the LisensyaPrep Board Exam Difficulty Index calculated?","acceptedAnswer":{"@type":"Answer","text":"LBDI equals 50 percent of the average fail rate across verified recent cycles, plus 30 percent of the worst verified cycle's fail rate, plus 20 percent of the volatility between best and worst cycles, using only official PRC and Supreme Court data."}}]}`;

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
Which board exam is *really* the hardest? Every answer you've heard is either vibes or a single cycle's headline. So we built something better: **the LisensyaPrep Board Exam Difficulty Index (LBDI)** — a transparent, reproducible score computed from three years of verified official passing-rate data. Anyone can check our math, and we update it every results cycle.

## The Methodology (Fully Transparent)

The LBDI scores each exam 0-100 (higher = statistically harder) from three components:

**LBDI = 50% × average fail rate + 30% × worst-cycle fail rate + 20% × volatility**

- **Average fail rate (50%):** 100 minus the mean passing rate across all verified recent cycles — the core odds
- **Worst-cycle floor (30%):** 100 minus the lowest verified cycle — because if you land in a bad cycle, the average won't save you
- **Volatility (20%):** the spread between the best and worst cycle — an exam that swings 45 points is a different risk than one that swings 10, and volatility is precisely what punishes retakers and off-cycle takers

Every input comes from official PRC releases (and the Supreme Court, for the Bar), all published in [our passing-rates hub](https://lisensyaprep.com/blog/prc-passing-rates-compared).

## The 2026 LBDI Ranking

| Rank | Exam | Verified Cycles Used | Avg Rate | Worst Cycle | Swing | **LBDI Score** |
|------|------|---------------------|----------|-------------|-------|----------------|
| 🥇 1 | **Agriculture (ALE)** | 34.18 · 50.78 · 68.55 | 51.2% | 34.2% | 34.4 pts | **51.0** |
| 🥈 2 | **Bar Exam*** | 36.77 · 48.98 | 42.9% | 36.8% | 12.2 pts | **50.0** |
| 🥉 3 | **LET Elementary** | 45.51 · 46.77 · 51.04 · 56.03 | 49.8% | 45.5% | 10.5 pts | **43.5** |
| 4 | **Nursing (PNLE)** | 84.99 · 64.40 · 90.04 · 44.24 | 70.9% | 44.2% | 45.8 pts | **40.4** |
| 5 | **Criminology (CLE)** | 49.34 · 60.50 · 51.45 · 66.00 | 56.8% | 49.3% | 16.7 pts | **40.1** |
| 6 | **Pharmacy (PhLE)** | 60.30 · 80.57 · 57.26 | 66.0% | 57.3% | 23.3 pts | **34.5** |
| 7 | **LET Secondary** | 56.88 · 62.27 · 72.62 · 73.10 | 66.2% | 56.9% | 16.2 pts | **33.1** |
| 8 | **MedTech (MTLE)** | 69.50 · 80.26 · 71.19 · 84.13 | 76.3% | 69.5% | 14.6 pts | **23.9** |

**The Bar's score rests on two verified cycles rather than three-plus; its longer-term average (near 29%, with a 16.59% historic low) would score it even harder — we index only what we've verified per cycle, so treat its rank as conservative.* Exams we haven't fully verified across multiple cycles (CPALE, engineering boards) join the index as we verify them — their historical reputations suggest CPALE would contend for the top spot.

## What the Index Reveals (That Headlines Hide)

**1. Agriculture is statistically the cruelest exam we track.** The ALE beats even the Bar on the index — a 34% floor and a 34-point swing mean an agriculture examinee's fate depends terrifyingly on which cycle they land in. (And yet UPLB posts 99-100% in the same cycles — the widest school gap in the country.)

**2. Nursing's 90% record is hiding a top-four difficulty score.** This is the LBDI's most counterintuitive finding: the PNLE's *average* looks friendly, but its 44.24% worst cycle and country-leading 45.8-point volatility rank it fourth-hardest. Translation: the November fresh-graduate cycles are historically favorable; the February retaker-heavy cycles are brutal. **When you take the PNLE matters almost as much as how you prepare** — the verified first-timer vs retaker split (87.12% vs 35.87% in May 2025) is the mechanism.

**3. Volatility is retaker risk, quantified.** High-swing exams (PNLE, ALE, PhLE) are exactly the ones where [failing once and repeating the same strategy](https://lisensyaprep.com/blog/board-exam-retake-limits) costs the most — off-cycles are stacked with retakers, and retakers fail at multiples of first-timer rates.

**4. "Easiest" still fails tens of thousands.** MedTech's 23.9 — the friendliest score — still represents roughly one in four examinees failing in a typical cycle. The index measures *relative statistical risk*, not effort required: every exam on this table [demands the same evidence-based preparation](https://lisensyaprep.com/blog/board-exam-study-tips).

## What the LBDI Is Not

Honest limits, stated plainly: the index measures **statistical outcomes, not intellectual difficulty** — it can't separate exam rigor from cohort quality, school-system strength, or curriculum reform effects. It weights recent verified cycles only, so long-past eras (the Bar's 16% lows, [nursing's sub-50% 2018-2019](https://lisensyaprep.com/nursing/pnle-passing-rate-history)) inform context but not scores. And it says nothing about which *career* is worth pursuing — pay, demand, and personal fit are separate questions from statistical difficulty.

**Citing this index:** the LBDI is our original framework — you're welcome to reference it as the *LisensyaPrep Board Exam Difficulty Index* with a link to this page, which is updated every results cycle.

## Frequently Asked Questions

**What is the hardest board exam in the Philippines in 2026?**
By the LisensyaPrep Board Exam Difficulty Index — computed from three years of verified passing-rate data — the Agriculturist Licensure Exam ranks hardest (LBDI 51.0), edging the Bar Exam (50.0), with LET Elementary third.

**Why does nursing rank fourth-hardest despite a 90% record?**
Because the index scores the worst cycle and volatility, not just the average: the PNLE's 44.24% February 2026 cycle and 45.8-point swing — the largest of any exam — reveal risk the record headline hides.

**How is the LBDI computed?**
50% average fail rate across verified cycles, plus 30% worst-cycle fail rate, plus 20% volatility (best-minus-worst spread), all from official PRC and Supreme Court releases.
`;

export default function BoardExamDifficultyIndexPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-board-exam-difficulty-index-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">The LisensyaPrep Board Exam Difficulty Index 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">PRC Guide</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                The LisensyaPrep Board Exam Difficulty Index 2026: Every Exam Ranked by 3 Years of Data
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>August 18, 2026</span><span>•</span>
                <span>9 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-8 bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 border border-yellow-500/30 rounded-2xl p-6 text-center">
              <p className="text-yellow-400 font-extrabold text-lg mb-2">Facing One of These Exams?</p>
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
