import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Courses Without Board Exams Philippines (Complete 2026 List)",
  description: "Complete list of college courses without board exams in the Philippines - IT, business, communications, tourism and more - plus the honest trade-offs and which \"no board\" courses still have optional certifications.",
  path: "/blog/courses-without-board-exam-philippines",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What courses have no board exam in the Philippines?","acceptedAnswer":{"@type":"Answer","text":"Major examples include BS Information Technology, Computer Science, Business Administration, Entrepreneurship, AB Communication, Multimedia Arts, Hospitality and Tourism Management, and most liberal arts programs. These fields hire on skills, portfolios, and optional certifications rather than licenses."}},{"@type":"Question","name":"Can I work in government without passing a board exam?","acceptedAnswer":{"@type":"Answer","text":"Yes, through the Civil Service Examination, which grants lifetime eligibility for government positions. Board exam passers receive equivalent eligibility automatically under RA 1080."}}]};

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
Not everyone wants their career gated by a licensure exam — and that is a legitimate choice, not a lesser one. Here is the honest map of degree programs with **no PRC board exam required to practice**, what the trade-offs are, and the courses people *think* have no board but actually do.

## The Main Courses Without Board Exams

**Technology:** BS Information Technology, BS Computer Science, BS Information Systems, and related programs (software engineering, data science, game development). The tech industry hires on skills, portfolios, and certifications — not licenses.

**Business:** BS Business Administration (all majors — marketing, financial management, operations, HR), BS Entrepreneurship, BS Office Administration, BS Legal Management, AB/BS Economics. Note the classic exception in the next section: accountancy.

**Communications & Arts:** AB Communication, Journalism, Broadcasting, Multimedia Arts, Digital Film, Fine Arts, Graphic Design, Animation. Portfolio careers.

**Hospitality & Tourism:** BS Hotel and Restaurant Management / Hospitality Management, BS Tourism Management. Industry certifications exist (TESDA and international), but no PRC board.

**Liberal Arts & Social Sciences:** AB English, AB Political Science, AB Philosophy, AB History, AB Sociology, AB Anthropology, Development Communication, International Studies. Many are pre-law or graduate-school springboards.

## The "Wait, That Has a Board Exam?" List

Courses people commonly assume are board-free but are not:

- **Accountancy** → CPA Licensure Exam
- **Social Work** → board exam required
- **Librarianship** → Librarian Licensure Exam
- **Guidance Counseling** → licensure required
- **Psychology** → practicing as a *psychologist/psychometrician* requires the board (though many psych grads work board-free in HR and industry)
- **Nutrition and Dietetics, Fisheries, Forestry, Geology, Real Estate Management** → all have licensure exams
- **Criminology, Education, Nursing, Pharmacy, MedTech, Agriculture** → obviously, the six we live and breathe

## The Honest Trade-Off Talk

**What you skip:** the review-season grind, exam fees, the retake risk, and the license-renewal/CPD cycle for life.

**What you give up:** the license's *filtering power*. A board-passer enters a legally protected profession with a smaller competitive pool — and under **RA 1080, a board pass is automatic civil service eligibility** for government jobs. No-board graduates compete in open fields where the differentiators are skills, portfolio, and hustle — and for government items, they need the [Civil Service Exam](https://lisensyaprep.com/civil-service/government-jobs-cse-eligibility) instead.

**The middle path many miss:** no-board fields still have credentials that function like licenses in hiring — IT certifications, digital marketing certs, CPA-adjacent bookkeeping credentials, TESDA qualifications. "No board exam" does not mean "no exams ever"; it means the exams are optional, modular, and chosen by you.

## Frequently Asked Questions

**What is the best course without a board exam?**
"Best" depends on your goal: IT/CS for earning trajectory, business for breadth, communications for creative careers. All are legitimate — the honest metric is demand for the skills, not the absence of the board.

**Can I work in government without a board exam?**
Yes — via the Civil Service Examination (Professional or SubProfessional), which grants lifetime eligibility for government positions. [Full guide here](https://lisensyaprep.com/civil-service/government-jobs-cse-eligibility).

**Is psychology a board exam course?**
Practicing as a licensed psychologist or psychometrician requires the board; many psychology graduates work in HR, recruitment, and industry without it.

**Are board exam courses better than non-board courses?**
Neither is better; they are different bargains. Boards trade a hard gate for legal protection and a smaller field; non-board courses trade open competition for flexibility.
`;

export default function CoursesWithoutBoardExamPhilippinesPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-courses-without-board-exam-philippines-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"Courses Without Board Exams in the Philippines (Complete 2026 List)"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">PRC Guide</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"Courses Without Board Exams in the Philippines (Complete 2026 List)"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 21, 2026</span><span>•</span>
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
