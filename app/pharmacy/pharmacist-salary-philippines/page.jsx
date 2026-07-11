import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: "Pharmacist Salary Philippines 2026 - The Honest Numbers",
  description: "How much do pharmacists really earn in the Philippines in 2026? Honest breakdown from a real RPh - retail and hospital reality, industry and government pay, and the abroad multiplier.",
  path: "/pharmacy/pharmacist-salary-philippines",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much do government pharmacists earn in the Philippines in 2026?","acceptedAnswer":{"@type":"Answer","text":"Entry-level government pharmacist items commonly classified around Salary Grade 11 pay 31,705 pesos monthly basic at Step 1 under the 2026 Third Tranche, plus 2,000 pesos PERA and benefits. Exact grades vary per vacancy posting."}},{"@type":"Question","name":"Do pharmacists need the Civil Service Exam for government positions?","acceptedAnswer":{"@type":"Answer","text":"No. Passing the Pharmacy board examination confers civil service eligibility under RA 1080."}},{"@type":"Question","name":"What is the highest-paying pharmacist career path in the Philippines?","acceptedAnswer":{"@type":"Answer","text":"By ceiling, pharmacy ownership, followed by abroad positions and industry leadership tracks. Entry pay in community retail and hospital settings is comparatively modest."}}]}`;

const RELATED_ARTICLES = [
  { text: "Pharmacist First Job Guide Philippines", href: "/pharmacy/pharmacist-first-job-philippines" },
  { text: "Salary Grade Table Philippines 2026", href: "/civil-service/salary-grade-table-philippines" },
  { text: "Government Jobs with Civil Service Eligibility", href: "/civil-service/government-jobs-cse-eligibility" },
  { text: "What to Do After Passing the Board Exam", href: "/blog/after-passing-board-exam-philippines" },
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
I am a Registered Pharmacist, and I will give you the version of this article I wish existed when I passed the boards: the honest one. I worked hospital before licensure, retail pharmacy in Dubai after, then community pharmacy back home — and I eventually stepped away from the traditional paths because the compensation could not justify staying. That experience shapes every paragraph below.

**Quick answer:** Entry pay in **community/retail and hospital pharmacy is modest** relative to the license — this is the profession's open secret. The ceiling rises meaningfully in **industry** (med rep, regulatory, QA), **government items** (salary grade pay + benefits), and dramatically **abroad** and in **pharmacy ownership**. Choose your path with your bills in mind. Details below.

---

## Community and Retail Pharmacy Pay

The widest door and, honestly, the lowest floor. Entry-level pay at many drugstores — including major chains — sits at the modest end of professional salaries, varying by region and employer. The role's economics are structural: every branch legally needs an RPh, so demand is high, but so is the supply of new licenses each board cycle.

**What retail pay buys you** is speed (fastest hiring of any path) and licensed experience — the currency for everything higher on this list. Treat it as a launchpad; the mistake is treating it as the destination by default.

## Hospital Pharmacy Pay

Private hospital pharmacist pay commonly tracks near retail at entry, with clinical depth as the real compensation. **Government hospital items are the exception**: they follow the civilian salary grade table (Third Tranche, 2026), with entry pharmacist items commonly classified around **SG 11 — ₱31,705 monthly basic** — plus ₱2,000 PERA, bonuses, GSIS, and the 2027 fourth tranche coming. Higher pharmacist position levels climb the grade ladder; always check the exact SG in the specific posting.

And the recurring advantage: **your board passing is already your civil service eligibility (RA 1080)** — no CSE needed for government items. ([How government hiring works](https://lisensyaprep.com/civil-service/government-jobs-cse-eligibility))

## Industry Pay — Where the Curve Bends

Pharmaceutical companies pay on a different logic:

- **Professional Medical Representatives**: base + allowances + incentives that can outpace store-based pay quickly for performers
- **Regulatory Affairs, QA/QC, production roles**: salaried professional tracks with real progression
- The trade: competitive hiring, field or plant-based work, targets

If earnings trajectory is your priority, aim here early. You do not need retail years first.

## The Abroad Multiplier — The Path I Took

I worked retail pharmacy in Dubai for about a year, and the honest math: **substantially similar work, multiples of the local pay.** The Gulf remains the most common first stop for Filipino RPhs, with each destination running its own credentialing exams and document verification — research your specific target market's current process before spending on applications. Many RPhs run the abroad phase for a few years, bank the difference, and return to better local positions or their own ventures.

## The Owner's Ceiling

A licensed pharmacist can legally establish and run a drugstore — the path where the license stops earning a salary and starts earning a business. Capital and FDA licensing make it a later move for most, but it is the highest ceiling on this list.

---

## The Advice That Matters More Than Any Table

**Choose the path that realistically pays your bills — deliberately, early.** "Gain experience first" is real advice, but patience does not pay rent, and some paths' ceilings stay low no matter how patient you are. Money-first? Industry, abroad, or government from day one. Clinical passion? Hospital, eyes open. Long game? Every path can fund ownership — the higher-paying ones fund it faster. The full path-by-path breakdown: [Pharmacist First Job Guide](https://lisensyaprep.com/pharmacy/pharmacist-first-job-philippines).

---

## Frequently Asked Questions

**How much do retail pharmacists earn in the Philippines?**
Entry pay at many drugstores is modest relative to the license, varying by region and chain — the profession's widely acknowledged reality, and the reason many RPhs use retail as a launchpad rather than a destination.

**How much do government pharmacists earn in 2026?**
Entry items commonly classified around SG 11 pay ₱31,705 monthly basic at Step 1 under the 2026 Third Tranche, plus PERA and benefits, with exact grades per posting.

**Do pharmacists need the Civil Service Exam for government jobs?**
No — board passing confers eligibility under RA 1080.

**How much do pharmacists earn abroad?**
Multiples of local pay, with the Gulf as the most common first destination. Credentialing requirements vary by country and authority.

**What is the highest-paying pharmacist path?**
By ceiling: pharmacy ownership, then abroad and industry leadership tracks. By entry trajectory: industry and abroad.

---
`;

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: "/pharmacy", name: "Pharmacy" }, { url: "/pharmacy/pharmacist-salary-philippines", name: "Pharmacist Salary Philippines" }]} />
      <Script id="schema-pharmacist-salary-philippines-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/pharmacy" className="text-gray-500 hover:text-gray-300 transition-colors">Pharmacy</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Pharmacist Salary Philippines</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">Pharmacy (PLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Pharmacist Salary Philippines 2026: The Honest Numbers
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 26, 2026</span><span>•</span>
                <span>8 min read</span>
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

            <div className="mt-8 bg-gradient-to-br from-purple-900/20 to-purple-900/10 border border-purple-500/30 rounded-2xl p-6 text-center">
              <p className="text-purple-400 font-extrabold text-lg mb-2">Still Preparing for the PLE?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified pharmacy board reviewer covering all PLE subjects. No account required.</p>
              <Link href="/pharmacy" className="inline-block bg-purple-500 hover:bg-purple-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
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
