import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: "Salary Grade Table Philippines 2026 Explained (SG 1-33 Guide)",
  description: "The 2026 salary grade table explained - what SG and Step mean, verified Third Tranche figures for Teacher I, Nurse I, and key grades, PERA, who is covered, and the 2027 increase.",
  path: "/civil-service/salary-grade-table-philippines",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much is Salary Grade 11 in 2026?","acceptedAnswer":{"@type":"Answer","text":"31,705 pesos monthly basic at Step 1, rising to 33,611 pesos at Step 8, under the Third Tranche of EO 64 effective January 1, 2026. Teacher I is the most common SG 11 position."}},{"@type":"Question","name":"How much is Salary Grade 15 in 2026?","acceptedAnswer":{"@type":"Answer","text":"42,178 pesos monthly basic at Step 1 to 45,202 pesos at Step 8. Nurse I is the most common SG 15 position."}},{"@type":"Question","name":"Will government salaries increase after 2026?","acceptedAnswer":{"@type":"Answer","text":"Yes. The fourth and final tranche under Executive Order No. 64 takes effect in 2027."}},{"@type":"Question","name":"Are police officers on the salary grade table?","acceptedAnswer":{"@type":"Answer","text":"No. Uniformed personnel including the PNP follow a separate base pay schedule, most recently raised under EO 107 effective January 1, 2026."}}]}`;

const RELATED_ARTICLES = [
  { text: "Government Jobs with Civil Service Eligibility", href: "/civil-service/government-jobs-cse-eligibility" },
  { text: "Nurse Salary Philippines 2026", href: "/nursing/nurse-salary-philippines" },
  { text: "Teacher Salary Philippines 2026", href: "/education/teacher-salary-philippines" },
  { text: "Free Civil Service Exam Reviewer", href: "/civil-service/" },
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
Every government job posting says the same cryptic thing: *"Salary Grade 11."* Every appointment paper adds a *"Step."* And almost nobody hands new applicants the table that turns those codes into pesos. This is that explainer — with the verified 2026 figures.

**Quick answer:** The 2026 salary schedule (Third Tranche of **Executive Order No. 64**, per DBM NBC No. 601, effective January 1, 2026) runs from **SG 1 at ₱14,634** to **SG 33 at ₱449,157** monthly basic at Step 1. Each grade has 8 steps earned through service years, everyone gets **₱2,000 monthly PERA** on top, and a **fourth tranche increase arrives in 2027**. Details below.

---

## What "Salary Grade" and "Step" Actually Mean

**Salary Grade (SG)** is the position's rank on the national pay scale — set by the position, not the person. A Teacher I is SG 11 whether the teacher is 22 or 52 years old.

**Step (1-8)** is seniority within the grade: you are hired at **Step 1** and advance **one step per 3 years of continuous satisfactory service**. Steps are why two employees with the same position title can have different basic pay.

**Basic salary** is what the table shows — the number GSIS contributions, tax, and loan amortizations are computed against. Allowances stack on top.

## The 2026 Figures That Matter (Verified)

Key grades under the Third Tranche, monthly basic at Step 1 (with Step 8 maximum):

| Grade | Step 1 | Step 8 | Common positions |
|-------|--------|--------|------------------|
| SG 1 | ₱14,634 | — | entry utility/aide items |
| **SG 11** | **₱31,705** | ₱33,611 | **Teacher I**, Administrative Officer II |
| SG 12 | ₱33,947 | ₱35,850 | Teacher II, professional items |
| **SG 15** | **₱42,178** | ₱45,202 | **Nurse I**, professional/technical items |
| SG 18 | ₱53,818 | ₱57,842 | Master Teacher track, senior professionals |
| SG 25 | ~₱116,643 | — | division chief / attorney levels |
| SG 33 | ₱449,157 | — | President of the Philippines |

Two footnotes worth knowing:

1. **The nurse row has history**: Nurse I was SG 11 until a Supreme Court ruling on the Nursing Act pushed it to SG 15 in 2020 — a six-year-old change that still surprises people
2. Step values between 1 and 8 are **not evenly spaced** — the official DBM circular is the only accurate source for Steps 2-7

## What Everyone Gets on Top of Basic

- **PERA: ₱2,000/month** for all grades
- 13th month pay and cash gift; mid-year bonus
- **Medical allowance** under EO 64 (annual)
- GSIS, PhilHealth, Pag-IBIG; leave credits (monetizable)

So a starting Teacher I's recurring monthly gross is about **₱33,705**; a starting Nurse I's about **₱44,178** — before deductions.

## Who Is Covered — and Who Is Not

The EO 64 table covers **civilian government personnel**: national agencies, LGUs, SUCs, the courts, constitutional bodies, and GOCCs without their own compensation laws.

**Not covered: the uniformed services.** PNP, AFP, BJMP, and BFP follow a **separate Military and Uniformed Personnel base pay schedule**, most recently raised 5% on January 1, 2026 under **EO 107** (a Patrolman now earns ₱31,151 base). Comparing a police base pay against this table is comparing two different systems — a mistake half the salary articles online make. ([Uniformed pay explained](https://lisensyaprep.com/criminology/criminologist-police-salary-philippines))

## The Tranche Timeline

EO 64 is a four-year staircase:

- **2024** — first tranche (retroactive)
- **2025** — second tranche
- **2026** — **third tranche (current figures above)**
- **2027** — fourth and final tranche: one more increase already scheduled

If you are comparing a government offer against private today, remember the 2027 raise is already law.

## How to Read a Job Posting With This Table

A posting says: *"Administrative Officer II (SG 11), Step 1."* Now you can decode it: ₱31,705 basic + ₱2,000 PERA ≈ ₱33,705 recurring gross, bonuses on top, step raises every 3 years, tranche raise in 2027. Check the posting's Qualification Standards (education, eligibility, training, experience) — and remember board passers already hold eligibility under RA 1080, while CSE Professional/SubProfessional passers qualify per level. ([What each eligibility unlocks](https://lisensyaprep.com/civil-service/government-jobs-cse-eligibility))

---

## Frequently Asked Questions

**How much is SG 11 in 2026?**
₱31,705 monthly basic at Step 1, rising to ₱33,611 at Step 8 — the Teacher I grade.

**How much is SG 15 in 2026?**
₱42,178 at Step 1 to ₱45,202 at Step 8 — the Nurse I grade.

**How do I move up a step?**
One step per 3 years of continuous satisfactory service within the same grade.

**Is there another increase after 2026?**
Yes — the fourth tranche under EO 64 takes effect in 2027.

**Are police and soldiers on this table?**
No. Uniformed personnel follow a separate base pay schedule under EO 107.

**What is PERA?**
The Personnel Economic Relief Allowance — ₱2,000 monthly paid to all covered government employees on top of basic salary.

---
`;

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: "/civil-service", name: "Civil Service" }, { url: "/civil-service/salary-grade-table-philippines", name: "Salary Grade Table 2026" }]} />
      <Script id="schema-salary-grade-table-philippines-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/civil-service" className="text-gray-500 hover:text-gray-300 transition-colors">Civil Service</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Salary Grade Table 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service (CSE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Salary Grade Table Philippines 2026 Explained: SG 1-33, Steps, and Tranches
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 27, 2026</span><span>•</span>
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
              <p className="text-gray-400 text-sm mb-4">Free gamified Civil Service Exam reviewer for Professional and SubProfessional levels. No account required.</p>
              <Link href="/civil-service" className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
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
