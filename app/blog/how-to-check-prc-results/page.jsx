import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "How to Check PRC Board Exam Results Online (All Methods 2026)",
  description: "Every way to check your PRC board exam results in 2026 - official PRC website, LERIS verification of rating, results portals, and what to do when the sites crash on results day.",
  path: "/blog/how-to-check-prc-results",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I check my PRC board exam results online?","acceptedAnswer":{"@type":"Answer","text":"Through the official announcement on prc.gov.ph, established results portals as a backup on release day, and the Verification of Rating service on LERIS at online.prc.gov.ph for official per-subject scores."}},{"@type":"Question","name":"Can failed examinees see their board exam scores?","acceptedAnswer":{"@type":"Answer","text":"Yes. The Verification of Rating service on LERIS shows official per-subject ratings to all examinees whether they passed or failed, which serves as the diagnostic map for retake preparation."}}]};

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
Results day is equal parts hope and server errors. Here is every legitimate way to check your board exam results, in the order you should try them — plus the verification step that gives you your actual per-subject scores.

## Method 1: The Official PRC Website (prc.gov.ph)

The PRC posts each exam's results announcement — passing statistics, topnotchers, and links to the roll of successful examinees — on its official website and Facebook page. This is the authoritative source. Its known weakness: **results-day traffic slows or crashes it.** If it will not load, do not panic-refresh for an hour; use the methods below and come back late evening or early morning.

## Method 2: Established Results Portals

Independent portals and news sites republish the official lists within minutes of release, alphabetically segmented — often more crash-resistant than the PRC site on release day. Cross-check anything you find here against the official release once it loads; the official roll is the final word on spelling and inclusion.

## Method 3: Verification of Rating on LERIS (The Underrated One)

A few working days after results, **every examinee — passed or failed — can pull their official per-subject ratings** through the Verification of Rating service at **online.prc.gov.ph**, using your exam name, exam date, application number, name, and birthdate.

Why this matters beyond confirmation:

- **If you passed:** employers commonly request your rating; teachers convert it to [DepEd ranking points](https://lisensyaprep.com/education/deped-teacher-1-ranking-guide)
- **If you did not:** your per-subject scores are your diagnostic map — the difference between [a strategic retake and a repeated failure](https://lisensyaprep.com/blog/board-exam-retake-limits)

## Results-Day Survival Notes

- **Release timing varies wildly by exam** — MedTech and pharmacy results land in 2-5 working days; nursing 5-15; criminology 20-26; the LET 39-63 ([full timelines](https://lisensyaprep.com/blog/prc-board-exam-schedule))
- **Beware fake "leaked results"** circulating in group chats before official release — the PRC does not leak, and phishing pages harvest exactly the panic-clicks results week creates. Type prc.gov.ph yourself; never "verify your result" through a message link
- **Name not on the list?** Check spelling variants and withheld-results notes in the official announcement before concluding anything — every release includes a handful of withheld cases pending documents

**Passed?** Congratulations — your next steps start immediately: [What to Do After Passing the Board Exam](https://lisensyaprep.com/blog/after-passing-board-exam-philippines). **Not this time?** The per-subject diagnostic and [a changed strategy](https://lisensyaprep.com/blog/board-exam-study-tips) are how retakers become passers — [free reviewers here](https://lisensyaprep.com/) when you are ready.

## Frequently Asked Questions

**How do I check my board exam result?**
Official announcement on prc.gov.ph, established results portals as backup, then Verification of Rating on LERIS for your official per-subject scores.

**Can failed examinees see their scores?**
Yes — the Verification of Rating service on LERIS shows per-subject ratings to all examinees, passed or failed.

**Why can't I find my name even though my seatmate passed?**
Check spelling variants and the withheld-results notes in the official announcement — and verify directly through LERIS before concluding.
`;

export default function HowToCheckPrcResultsPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-how-to-check-prc-results-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"How to Check Your PRC Board Exam Results Online (All Methods, 2026)"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">PRC Guide</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"How to Check Your PRC Board Exam Results Online (All Methods, 2026)"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 31, 2026</span><span>•</span>
                <span>6 min read</span>
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
