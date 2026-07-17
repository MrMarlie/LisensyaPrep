import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: "LET or Civil Service Exam First? (And Who Needs Both)",
  description: "LET vs Civil Service Exam decided by your actual goal - the RA 1080 rule that makes the CSE unnecessary for LPTs, when the CSE is the smarter bridge, and the honest decision tree for education graduates.",
  path: "/civil-service/let-vs-civil-service-exam",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do I need the Civil Service Exam if I passed the LET?","acceptedAnswer":{"@type":"Answer","text":"Generally no. Under RA 1080, passing a board examination such as the LET confers civil service eligibility, so licensed teachers applying for teaching positions do not need separate CSE eligibility."}},{"@type":"Question","name":"Can I teach in DepEd with only Civil Service eligibility?","acceptedAnswer":{"@type":"Answer","text":"No. DepEd Teacher 1 positions require the LET license, which no Civil Service Exam score can substitute for. CSE eligibility opens non-teaching government positions instead."}},{"@type":"Question","name":"Which is harder, the LET or the Civil Service Exam?","acceptedAnswer":{"@type":"Answer","text":"They are difficult in different ways: the LET is content-heavy with recent passing rates of roughly 46 to 73 percent depending on level, while the CSE requires a flat 80 percent score and is primarily a time-management challenge across about 170 items."}}]}`;

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
              <th key={ci} className="px-4 py-2 text-left text-yellow-400 font-semibold text-sm" dangerouslySetInnerHTML={{ __html: formatInline(cell) }} />
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
Every education graduate hears the same tanong sa group chat: *"Dapat ba akong kumuha ng Civil Service Exam habang hinihintay ang LET?"* The answer depends on one law most people have never read — and once you understand it, the decision takes thirty seconds.

**The short answer:** if your goal is teaching, **the LET comes first and, once you pass it, you likely never need the CSE at all** — under **RA 1080, a board exam pass is itself a civil service eligibility.** The CSE earns its place only in specific situations we'll map below.

## The Rule That Decides Everything: RA 1080

RA 1080 grants bar and board examination passers **civil service eligibility** for government positions appropriate to their profession — no separate CSC exam needed. So an LPT applying for a DepEd item isn't asked for Civil Service Professional eligibility; the PRC license *is* the eligibility. Taking the CSE after passing the LET, for a teaching career, duplicates something you already own.

The reverse is **not** true, and this is where people get hurt: **CSE eligibility does not license you to teach.** DepEd Teacher 1 items require the LET — the license is a ranking-points component (your rating is worth up to 10 points) and a legal requirement, and no CSE score substitutes for it. The CSE opens *non-teaching* government doors: administrative aide and officer items, LGU positions, agency clerical-to-professional tracks ([the full map](https://lisensyaprep.com/civil-service/government-jobs-cse-eligibility)).

## The Head-to-Head

| | **LET** | **CSE (Professional)** |
|---|---|---|
| What it grants | Professional teaching license + RA 1080 eligibility | Government eligibility only (1st & 2nd level positions) |
| Passing | 75% GWA, no subtest below 50% | Flat 80%, no subject floors |
| Recent passing rates | Elem ~46-56%, Sec ~57-73% | Varies by cycle; the 80% bar makes it a time-management exam |
| Schedule | Twice yearly (recently March & September) | Twice yearly (typically around March & August) |
| Who can take it | Education graduates (and second-coursers meeting the education-units rules — verify current requirements) | Any Filipino 18+, no degree required to sit it |
| Validity | Lifetime license (with renewal/CPD) | Lifetime eligibility |
| Difficulty profile | Content-heavy across Gen Ed/Prof Ed/Specialization ([LBDI: Elem 43.5, Sec 33.1](https://lisensyaprep.com/blog/board-exam-difficulty-index)) | Breadth + speed: ~170 items where pacing fails more people than knowledge |

## The Decision Tree

**You're an education student or fresh graduate whose goal is teaching →** LET first, full focus. Splitting review energy across two exams to hedge is the classic mistake — the LET is the harder exam, the one your career legally requires, and passing it makes the CSE redundant via RA 1080. One target, one properly built review.

**You're waiting out the months before your LET cycle (or between attempts) and need income now →** this is the CSE's legitimate lane. CSE Professional eligibility opens non-teaching government items you can hold *while* preparing for the LET — a paycheck and government service record that don't derail the teaching plan. If your LET and CSE dates don't collide, the CSE is a low-regret addition here.

**You failed the LET and are regrouping →** taking the CSE can be strategic (income bridge, confidence rebuild) — but be honest that it's a bridge, not the destination, and that your LET retake needs a changed strategy, not a delayed one.

**You're not an education graduate but want government work →** the CSE is your exam, full stop. And if you later want teaching, the second-courser route into the LET (education units per the current rules) exists — verify the current requirements before planning around it.

**You already passed the LET →** congratulations, you hold RA 1080 eligibility. Spend the review energy on [DepEd ranking preparation](https://lisensyaprep.com/education/deped-teacher-1-ranking-guide) instead — the demo teaching and interview points will do more for your hiring than a redundant eligibility ever could.

## The Honest Bottom Line

The LET and CSE aren't rivals; they're different keys. The LET is a **profession** — harder to earn, legally protected, and carrying its own eligibility inside it. The CSE is **access** — broader, faster, and the right first move only when teaching isn't the immediate goal. Choose by destination, not by which exam feels less scary this month. And whichever you choose: [free gamified reviewers for both](https://lisensyaprep.com/) — LET (Gen Ed and Prof Ed) and [CSE Professional and SubProfessional](https://lisensyaprep.com/civil-service/).

## Frequently Asked Questions

**Do I need the Civil Service Exam if I passed the LET?**
Generally no — under RA 1080, a board exam pass is itself a civil service eligibility, so LPTs applying for teaching items don't need separate CSE eligibility.

**Can I teach in DepEd with Civil Service eligibility only?**
No — Teacher 1 items require the LET license. The CSE opens non-teaching government positions instead.

**Should I take the CSE while waiting for the LET?**
It's a reasonable bridge if you need income from a non-teaching government job during the wait — just don't let CSE review cannibalize LET preparation, which is the harder and career-defining exam.

**Which is harder, the LET or the Civil Service Exam?**
Different difficulty types: the LET is content-heavy with 46-73% recent passing rates depending on level; the CSE's flat 80% bar makes it primarily a time-management and pacing challenge.
`;

export default function LetVsCivilServiceExamPage() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: '/civil-service', name: 'Civil Service' }, { url: '/civil-service/let-vs-civil-service-exam', name: 'LET or Civil Service Exam First?' }]} />
      <Script id="schema-let-vs-cse-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/civil-service" className="text-gray-500 hover:text-gray-300 transition-colors">Civil Service</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">LET or Civil Service Exam First?</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service (CSE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                LET or Civil Service Exam: Which Should You Take First? (And Who Needs Both)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>August 19, 2026</span><span>•</span>
                <span>8 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Preparing for the LET or the CSE?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified reviewers for both — LET Gen Ed and Prof Ed, plus CSE Professional and SubProfessional. No account required.</p>
              <Link href="/civil-service" className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Start Reviewing</h3>
              <p className="text-gray-400 text-sm mb-4">Reading is good, but practice is better. Test your knowledge with our free gamified reviewers.</p>
              <Link href="/civil-service" className="block w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl text-center text-sm transition-colors">
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
