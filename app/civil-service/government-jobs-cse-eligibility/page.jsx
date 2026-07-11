import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'Government Jobs with Civil Service Eligibility 2026 (Complete Guide)',
  description:
    'What jobs can you get with Civil Service eligibility? Professional vs SubProfessional positions, where government vacancies are posted, salary grades, and how board passers skip the CSE entirely.',
  path: '/civil-service/government-jobs-cse-eligibility',
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the difference between Professional and SubProfessional civil service eligibility?","acceptedAnswer":{"@type":"Answer","text":"SubProfessional eligibility qualifies you for first-level government positions such as clerical and administrative support roles. Professional eligibility qualifies you for both first-level and second-level positions, including professional and technical roles requiring a bachelor's degree."}},{"@type":"Question","name":"Does Civil Service eligibility expire?","acceptedAnswer":{"@type":"Answer","text":"No. Career service eligibility is valid for life once earned."}},{"@type":"Question","name":"Do board exam passers need to take the Civil Service Exam?","acceptedAnswer":{"@type":"Answer","text":"No. Under RA 1080, passing a bar or board examination confers civil service eligibility for positions appropriate to the profession."}},{"@type":"Question","name":"What is the passing score for the Civil Service Exam?","acceptedAnswer":{"@type":"Answer","text":"80 percent, for both the Professional and SubProfessional levels."}}]}`;

const RELATED_ARTICLES = [
  { text: 'How to Join the PNP as a Criminology Graduate', href: '/criminology/how-to-join-pnp-criminologist' },
  { text: 'What to Do After Passing the Board Exam Philippines', href: '/blog/after-passing-board-exam-philippines' },
  { text: 'Civil Service Exam Coverage 2026', href: '/civil-service/cse-coverage-2026' },
  { text: 'How to Pass the Civil Service Exam', href: '/civil-service/how-to-pass-civil-service-exam' },
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
You passed the Civil Service Exam — or you are deciding whether to take it. Either way, the real question is the same: **what does that eligibility actually get you?**

The honest answer: eligibility is a **key, not a job offer**. It unlocks the door to permanent government positions — security of tenure, Salary Grade pay, GSIS, leave credits, 13th month and beyond — but you still have to find the posted vacancy and win the merit selection. This guide maps what each eligibility level qualifies you for, where the jobs actually get posted, and the shortcut thousands of professionals do not realize they already have.

**Quick answer:** **SubProfessional eligibility** qualifies you for first-level positions (clerical, administrative support, trades). **Professional eligibility** qualifies you for both first-level AND second-level positions (technical, professional roles requiring a bachelor's degree) — and is one accepted eligibility for uniformed services like the PNP. Jobs are posted on the **CSC job portal and agency channels**, and your eligibility is **valid for life**. Details below.

---

## The Two Eligibility Levels, In Plain Terms

### SubProfessional Eligibility

Qualifies you for **first-level positions** — the operational backbone of every government office:

- Administrative Aide and Administrative Assistant roles
- Clerks, encoders, records staff
- Cashiering and collection support
- Trades, crafts, and custodial positions

These are real permanent items with real Salary Grade pay and full government benefits — and for many, the entry point of a decades-long government career built through promotions.

### Professional Eligibility

Qualifies you for **everything SubProfessional covers, plus second-level positions** — professional and technical roles requiring a bachelor's degree, up to (but not including) executive/managerial ranks:

- Administrative Officer tracks
- Technical and regulatory staff at national agencies (BIR, SSS, GSIS, PhilHealth, Pag-IBIG, DTI, DOLE, and more)
- LGU professional positions (planning, budgeting, licensing, treasury)
- Legislative staff, court personnel tracks
- **One of the accepted eligibilities for PNP entry** — alongside board licenses and the NAPOLCOM exam ([full PNP guide here](/criminology/how-to-join-pnp-criminologist))

If you have a bachelor's degree and are choosing which exam to take: take **Professional**. It covers both levels and keeps every door open.

---

## The Shortcut Many Professionals Already Have: RA 1080

Here is the fact that surprises board passers constantly: **if you passed a PRC board examination — the LET, PNLE, CLE, Pharmacy boards, any of them — you already hold civil service eligibility under RA 1080.** Bar and board passers do not need the Civil Service Exam to qualify for government positions appropriate to their profession.

So before you enroll in a CSE review:

- **Board passer?** You are already eligibility-complete — go straight to hunting vacancies
- **Graduate without a board profession?** The CSE is your path — and it is one of the most valuable exams in the country for the price
- **Honor graduate?** Check PD 907, which grants eligibility to qualifying honor graduates

---

## Where Government Jobs Are Actually Posted

Government hiring is required to be published. Your hunting grounds:

1. **The CSC job portal** — the Civil Service Commission's official online bulletin of vacant positions across agencies nationwide (csc.gov.ph)
2. **Agency websites and official Facebook pages** — national agencies and GOCCs post their own vacancies, often with detailed requirements
3. **LGU bulletin boards and pages** — city and municipal halls post local items
4. **Hospital, school, and field office HR boards** — for facility-level items

**Set a weekly hunting habit.** Postings have application windows; the eligible applicant who never checks the bulletin loses to the one who does.

---

## How Government Hiring Actually Works

1. **Find a posted vacancy** matching your eligibility level and qualifications (education, training, experience per the posting's Qualification Standards)
2. **Submit the folder**: application letter, **Personal Data Sheet (CS Form No. 212, Revised 2017)**, eligibility proof (CSE rating or PRC license), TOR/diploma, training certificates, employment certificates
3. **Merit selection**: document screening, possible written exams or skills tests, interviews by the agency's selection board, comparative ranking
4. **Appointment** to the plantilla item, processed under CSC rules

Same principle as every merit system we have covered: **the folder competes, so the folder must be complete.** And the same warning applies — legitimate government hiring charges no fees and honors no backers.

---

## What About the Pay?

Government positions follow the **Salary Grade system** — a standardized table from SG 1 upward, with annual step increments and mandated adjustments. First-level items commonly sit in the lower grades; second-level professional items start higher and climb with promotion.

What the table does not show: security of tenure, GSIS retirement, leave monetization, loyalty pay, and the stability that makes government items so competitive in the first place.

---

## Planning to Take the Civil Service Exam?

The CSC administers the Career Service Examination in **Professional and SubProfessional levels**, typically offered multiple times a year through pen-and-paper testing, with **80% as the passing rate**. Coverage includes vocabulary, grammar, paragraph organization, reading comprehension, math, and general information (Constitution, RA 6713 Code of Conduct) — with analytical items heavier at the Professional level.

Two things to know before exam day:

1. **Your eligibility never expires.** Pass once, eligible for life
2. **80% is beatable with structured practice** — most failures come from time pressure, not difficulty

LisensyaPrep has **free gamified Civil Service reviewers** for both levels — practice in the same boss-battle format as our board exam reviewers: **[Start the free CSE Professional and SubProfessional reviewers](/civil-service/)**

---

## Frequently Asked Questions

**What is the difference between Professional and SubProfessional eligibility?**
SubProfessional qualifies you for first-level positions (clerical, administrative support, trades). Professional qualifies you for first-level AND second-level positions (professional/technical roles requiring a bachelor's degree).

**Does Civil Service eligibility expire?**
No. Career service eligibility is valid for life.

**Do board exam passers need the Civil Service Exam?**
No. Under RA 1080, passing a bar or board examination confers civil service eligibility for positions appropriate to the profession.

**Does eligibility guarantee a government job?**
No — it qualifies you to apply for permanent positions. You still compete through posted vacancies and merit selection.

**Can I use Professional eligibility to join the PNP?**
Yes, the Civil Service Professional examination is among the accepted eligibilities for PNP entry, alongside board licenses and the NAPOLCOM exam.

**What is the passing score for the Civil Service Exam?**
80%.

**Where do I find government job vacancies?**
The CSC's online job portal, agency websites and official Facebook pages, and LGU/facility bulletin boards.
`;

export default function GovernmentJobsCsePage() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: '/civil-service', name: 'Civil Service' }, { url: '/civil-service/government-jobs-cse-eligibility', name: 'Government Jobs with Civil Service Eligibility' }]} />
      <Script id="schema-gov-jobs-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/civil-service" className="text-gray-500 hover:text-gray-300 transition-colors">Civil Service</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Government Jobs with CSE Eligibility</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service (CSE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Government Jobs You Can Get with Civil Service Eligibility 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 19, 2026</span><span>•</span>
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

            <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Planning to Take the Civil Service Exam?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified CSE Professional and SubProfessional reviewers. No account required.</p>
              <Link href="/civil-service" className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
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
