import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "PRC Board Exam Passing Score Explained (GWA Rules Per Profession)",
  description: "What score do you need to pass the board exam? The 75% GWA rule, the per-subject floors that fail examinees with passing averages, and the exact rules for PNLE, LET, CLE, PhLE, MTLE, ALE and CSE.",
  path: "/blog/prc-passing-score-explained",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the passing score in PRC board exams?","acceptedAnswer":{"@type":"Answer","text":"A general weighted average of at least 75 percent, combined with a per-subject floor: no subject below 50 percent for most exams, or 60 percent for the nursing board. The Civil Service Exam requires a flat 80 percent."}},{"@type":"Question","name":"Can you fail the board exam with a passing average?","acceptedAnswer":{"@type":"Answer","text":"Yes. If any single subject falls below the per-subject floor, the examinee fails regardless of the general average — which is why no subject should ever be abandoned in review."}}]};

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
"Just get 75" is the folk wisdom — and it is dangerously incomplete. Nearly every PRC exam pairs its **75% general weighted average (GWA)** requirement with a second rule that fails examinees *whose averages passed*: the **per-subject floor**. Here are the exact rules, profession by profession.

## The Two-Rule System

**Rule 1 — the GWA:** your subject scores, weighted per the exam's structure, must average at least 75%.

**Rule 2 — the floor:** no single subject may fall below a minimum (50% or 60% depending on the profession). Score 90 everywhere but 45 in one subject, and you fail with a "passing" average. The floor exists precisely to prevent cramming three subjects and sacrificing one.

## The Rules Per Exam (Verified)

| Exam | GWA Required | Per-Subject Floor |
|------|-------------|-------------------|
| **PNLE** (Nursing) | 75% | **No subject below 60%** — the strictest floor |
| **LET** (Teachers) | 75% | No subtest below 50% |
| **CLE** (Criminology) | 75% | No subject below 50% |
| **MTLE** (MedTech) | 75% | No subject below 50% |
| **PhLE** (Pharmacy) | 75% | No subject below 50% |
| **ALE** (Agriculture) | 75% | No subject below 50% |
| **CSE** (Civil Service) | **80%** flat | No subject floors — one number |

Weightings differ per exam — nursing's five parts, [the LET's 40/60 and 20/40/40 structures](https://lisensyaprep.com/education/let-september-2026-guide), criminology's six subjects with the heaviest three around 20% each — and the weighting is strategic information: a point in a heavy subject moves your GWA more than a point in a light one.

## What the Rules Mean for Your Review

**Never abandon a subject.** The floor makes "bahala na" subjects the #1 cause of heartbreak failures — examinees with 80+ averages failing on one sub-50 subject. Your weakest subject needs *enough* review to clear the floor safely, even if your strongest subjects carry the GWA.

**Aim above 75, not at it.** Beyond safety margin, your rating has afterlife: it appears on your Certificate of Rating that employers request, and for teachers it converts to [up to 10 DepEd ranking points](https://lisensyaprep.com/education/deped-teacher-1-ranking-guide).

**Know your exam's weights before you build your study calendar** — hours should follow percentages. Free per-subject practice: [gamified reviewers](https://lisensyaprep.com/).

## Frequently Asked Questions

**What is the passing score for PRC board exams?**
A 75% general weighted average for the professions we cover — plus a per-subject floor (50%, or 60% for nursing) that fails examinees even with passing averages. The Civil Service Exam is a flat 80%.

**Can you pass the board exam with a failing grade in one subject?**
No — if any subject falls below the floor (50-60% depending on the exam), you fail regardless of your average.

**Is 75 out of 100 items the passing score?**
No — 75% refers to the weighted average of scaled subject ratings, not a raw item count.
`;

export default function PrcPassingScoreExplainedPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-prc-passing-score-explained-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"What Is the Passing Score in PRC Board Exams? GWA Rules Per Profession Explained"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">PRC Guide</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"What Is the Passing Score in PRC Board Exams? GWA Rules Per Profession Explained"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 30, 2026</span><span>•</span>
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
