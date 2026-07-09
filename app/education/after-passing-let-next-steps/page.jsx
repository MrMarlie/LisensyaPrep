import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'What to Do After Passing the LET - New LPT Next Steps 2026',
  description:
    'Just passed the LET? Complete guide for new LPTs - oath taking, PRC ID, DepEd ranking and RQA, private school applications, and career paths for licensed professional teachers in 2026.',
  path: '/education/after-passing-let-next-steps',
});

const SCHEMA_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'What to Do After Passing the LET',
  description:
    'Complete roadmap for new Licensed Professional Teachers from rating verification to oath, PRC ID, and choosing between DepEd, private school, and alternative teaching careers.',
  step: [
    { '@type': 'HowToStep', name: 'Verify Your Rating', text: 'Confirm your result on prc.gov.ph and use the Verification of Rating service on LERIS.' },
    { '@type': 'HowToStep', name: 'Take Your Professional Oath', text: 'Register for an oath slot through LERIS and attend the ceremony with your printed Oath Form.' },
    { '@type': 'HowToStep', name: 'Complete Initial Registration', text: 'Book a LERIS appointment, pay 1,050 pesos, and claim your PRC ID.' },
    { '@type': 'HowToStep', name: 'Choose Your Career Path', text: 'Apply for DepEd Teacher 1 ranking through your Schools Division Office, apply to private schools, or pursue alternative teaching careers.' },
    { '@type': 'HowToStep', name: 'Maintain Your License', text: 'Renew every 3 years during your birth month and keep CPD certificates.' },
  ],
  author: { '@type': 'Organization', name: 'LisensyaPrep Team' },
  publisher: { '@type': 'Organization', name: 'LisensyaPrep' },
  datePublished: '2026-07-11',
};

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I apply to DepEd right after passing the LET?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "You need your PRC license or Certificate of Rating among the requirements. Complete your oath and initial registration first, then watch for your target Schools Division Office's Call for Applications.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the RQA in DepEd hiring?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The Registry of Qualified Applicants is the official list of Teacher 1 applicants who scored 70 points or above in the division's evaluation. Schools fill vacancies from this list.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is private school experience counted in DepEd ranking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Teaching experience earns points in the evaluation, which is why many LPTs teach in private schools while waiting for a DepEd item.',
      },
    },
  ],
};

const RELATED_ARTICLES = [
  { text: 'What to Do After Passing the Board Exam Philippines', href: '/blog/after-passing-board-exam-philippines' },
  { text: 'PRC Oath Taking Guide 2026', href: '/blog/prc-oath-taking-guide' },
  { text: 'PRC Initial Registration 2026: How to Get Your PRC ID', href: '/blog/prc-initial-registration-guide' },
  { text: 'What is the LET? Complete Guide 2026', href: '/education/what-is-the-let' },
  { text: 'LERIS PRC Online Guide 2026', href: '/blog/leris-prc-online-guide' },
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

// Markdown-like renderer: headings, rules, bullet/numbered lists, tables, and paragraphs.
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

  // Wrap consecutive <li> into <ul> and consecutive <tr> into <table>.
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
Congratulations, teacher! Seeing your name on that list of LET passers is the payoff for months of review — and you have officially earned the right to add three letters after your name: **LPT, Licensed Professional Teacher**.

But between "I passed!" and standing in front of your own classroom, there is a sequence of steps: verification, oath, registration, and the big career question — DepEd, private school, or somewhere else entirely. Here is your complete roadmap.

**Quick answer:** Verify your rating on LERIS → register for oath-taking → complete initial registration (₱1,050) to get your PRC ID → then choose your path: apply for DepEd ranking (RQA), private schools, or alternative teaching careers.

---

## Step 1: Verify Your Rating

Confirm your result through official channels:

- Official results on **prc.gov.ph** and major news outlets
- **Verification of Rating** on **LERIS (online.prc.gov.ph)** for your official per-subject rating

Save your verified rating. You will need it (or your Certificate of Rating) for job applications — including DepEd ranking, where your LET rating contributes to your points.

---

## Step 2: Take Your Professional Oath

The oath is a legal prerequisite before registration. After results are released, the PRC and the Board for Professional Teachers announce oath schedules — often within weeks.

- Register via **LERIS → Select Transaction → Oath**
- Print your **Oath Form with QR code** (scanned at the ceremony)
- Face-to-face mass oaths are the norm in 2026; online and special oath options exist

Full walkthrough: [PRC Oath Taking Guide 2026](/blog/prc-oath-taking-guide)

---

## Step 3: Get Your PRC ID (Initial Registration)

One thing every new passer should know: **you cannot just walk into a PRC office.** Everything requires an online appointment through LERIS.

The short version: LERIS → Initial Registration → book your branch and date → pay **₱1,050** (₱600 registration + ₱450 for the 3-year ID) → appear personally, sign the Roster of Registered Professionals → claim your PRC ID.

We wrote the complete step-by-step from real experience here: [PRC Initial Registration 2026: How to Get Your PRC ID](/blog/prc-initial-registration-guide)

Your PRC ID is your ticket to every teaching job application that follows — get this done as early as slots allow.

---

## Step 4: Decide Your Path — DepEd, Private, or Beyond

This is the biggest decision of your first year as an LPT, and it shapes your career trajectory more than most new teachers realize. Your main options:

### Path A: DepEd Public School (Teacher 1)

The most common goal — a permanent government item with Salary Grade benefits, security of tenure, and GSIS/step increments.

**How it works in 2026:** DepEd hiring follows **DepEd Order No. 19, s. 2022 (Merit Selection Plan), DO 7, s. 2023, and DO 21, s. 2024**. The process is decentralized — you apply directly to the **Schools Division Office (SDO)** where you want to teach, not through a central portal.

The essential flow:

1. **Watch for your target SDO's "Call for Applications"** — divisions typically announce Teacher 1 hiring for the next school year around January, through division memoranda and their official Facebook pages
2. **Submit your application** with the required documents: application letter, Personal Data Sheet (CSC Form 212, revised 2017), PRC license copy, Certificate of Rating, TOR and diploma, training certificates, and employment certificates if any
3. **Undergo evaluation** — points are awarded for education, LET rating, experience, training, and a demonstration/interview process
4. **Make the RQA** — applicants who score **70 points or above** enter the **Registry of Qualified Applicants (RQA)**, the official list from which schools fill vacancies
5. **Wait for an item** — being in the RQA means you are qualified; appointment happens when a position (item) opens

**Good news under DO 21, s. 2024:** if you applied in a previous cycle and made the RQA but were not appointed, you can carry over your scores or update your credentials without redoing the entire process.

We are preparing a complete, dedicated DepEd Ranking guide with the full points breakdown — watch for it at [DepEd Teacher 1 Ranking Guide](/education/deped-teacher-1-ranking-guide).

### Path B: Private Schools

Private schools hire year-round and often faster than DepEd. Salaries vary widely — some pay below DepEd, elite institutions pay above. Advantages: quicker entry, teaching experience that earns you points for future DepEd ranking, and exposure to different curricula. Many LPTs teach private first while waiting for an RQA item.

### Path C: Beyond the Classroom

Your LPT opens doors outside traditional schools:

- **International schools** in the Philippines (higher pay, competitive entry)
- **Teaching abroad** — with experience, opportunities open in various countries
- **Online teaching and tutoring** — flexible, growing market
- **Corporate training and instructional design**
- **Graduate school** toward higher ed teaching or school leadership

There is no single right answer. The honest advice: pick the first role that builds toward where you want to be at 30, not just the first offer that arrives.

---

## Step 5: Know Your License Obligations

- **Renew your PRC ID every 3 years** during your birth month via LERIS
- **CPD units** may be required for renewal — many teaching seminars and trainings count, so keep your certificates
- Details: [PRC ID Renewal and CPD Guide](/blog/prc-id-renewal-cpd-guide)

---

## Frequently Asked Questions

**Can I apply to DepEd right after passing the LET?**
You need your PRC license (or at least your Certificate of Rating and proof of registration in process) among the application requirements. Complete your oath and initial registration first, then watch for your target division's Call for Applications.

**What is the RQA?**
The Registry of Qualified Applicants — the official list of Teacher 1 applicants who scored 70 points or above in the division's evaluation. Schools fill vacancies from this list.

**When does DepEd hiring open?**
Divisions typically issue Calls for Applications around January for the following school year, but timing varies by Schools Division Office. Follow your target SDO's website and official Facebook page.

**Is private school experience counted in DepEd ranking?**
Yes — teaching experience earns points in the evaluation, which is one reason many LPTs teach in private schools while waiting for a DepEd item.

**Do I need to retake the ranking every year if I don't get an item?**
Under DO 21, s. 2024, previous RQA applicants can carry over their scores or update credentials without repeating the entire process. Confirm the mechanics with your division's current memorandum.

**How much is the starting salary of a DepEd Teacher 1?**
Teacher 1 follows the government Salary Grade system with step increments and benefits. We cover current figures in our upcoming [Teacher Salary Philippines guide](/education/teacher-salary-philippines).

---

## For Those Still on the Journey

If you are reading this before your exam — or you know someone retaking — LisensyaPrep has [free gamified LET reviewers](/education/) covering General Education and Professional Education. From all of us: kaya mo yan, future teacher.
`;

export default function AfterPassingLetPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-after-let-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_HOWTO) }} />
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: '/education', name: 'Education' }, { url: '/education/after-passing-let-next-steps', name: 'What to Do After Passing the LET' }]} />
      <Script id="schema-after-let-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">After Passing the LET</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">Education (LET)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                What to Do After Passing the LET: New LPT Next Steps 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 11, 2026</span><span>•</span>
                <span>9 min read</span>
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

            <div className="mt-8 bg-gradient-to-br from-violet-900/20 to-violet-900/10 border border-violet-500/30 rounded-2xl p-6 text-center">
              <p className="text-violet-400 font-extrabold text-lg mb-2">Know Someone Still Reviewing for the LET?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified General Education and Professional Education reviewers. No account required.</p>
              <Link href="/education" className="inline-block bg-violet-500 hover:bg-violet-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Post-Exam Guides</h3>
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
