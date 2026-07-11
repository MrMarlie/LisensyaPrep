import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: "Nurse Salary Philippines 2026 - Government vs Private (Updated)",
  description: "How much do nurses earn in the Philippines in 2026? Nurse I starts at ₱42,178 (SG 15) in government under the latest salary tranche. Complete government vs private breakdown, benefits, and career progression.",
  path: "/nursing/nurse-salary-philippines",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much is a Nurse I salary in the Philippines in 2026?","acceptedAnswer":{"@type":"Answer","text":"42,178 pesos monthly basic pay at Step 1 under Salary Grade 15, per the 2026 Third Tranche of EO 64, plus 2,000 pesos monthly PERA."}},{"@type":"Question","name":"Why is Nurse I at Salary Grade 15?","acceptedAnswer":{"@type":"Answer","text":"A Supreme Court ruling on the Philippine Nursing Act, implemented in 2020, raised entry-level government nurses from SG 11 to SG 15."}},{"@type":"Question","name":"Do government nurses need the Civil Service Exam?","acceptedAnswer":{"@type":"Answer","text":"No. Passing the PNLE confers civil service eligibility under RA 1080."}}]}`;

const RELATED_ARTICLES = [
  { text: "How to Apply as a Staff Nurse in Philippine Hospitals", href: "/nursing/staff-nurse-application-guide-philippines" },
  { text: "What to Do After Passing the PNLE", href: "/nursing/after-passing-pnle-next-steps" },
  { text: "What is the NCLEX? Complete Guide", href: "/nursing/what-is-the-nclex" },
  { text: "Salary Grade Table Philippines 2026", href: "/civil-service/salary-grade-table-philippines" },
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
How much do nurses actually earn in the Philippines? The honest answer depends almost entirely on one choice: **government or private** — and the gap is wider than most nursing students realize.

**Quick answer:** In 2026, an entry-level government **Nurse I (Salary Grade 15) earns ₱42,178 monthly basic pay** at Step 1 under the latest salary tranche, plus ₱2,000 PERA and government benefits. Private hospital entry pay varies widely and commonly starts below the government rate. Full breakdown below.

---

## Government Nurse Salary 2026 (The Verified Numbers)

Under the **Third Tranche of Executive Order No. 64** (effective January 1, 2026):

| Position | Salary Grade | Monthly Basic (Step 1) |
|----------|--------------|------------------------|
| **Nurse I** | SG 15 | **₱42,178** |
| Nurse II | SG 16 | higher bracket |
| Nurse III and up | SG 17+ | progressive |

At the top of the Nurse I step ladder (Step 8, reached through years of service), basic pay rises to **₱45,202**. Every government nurse also receives **₱2,000 monthly PERA** on top of basic pay — so a starting Nurse I's recurring monthly gross is about **₱44,178** before deductions.

### Why Nurse I Is SG 15 (A Short History Worth Knowing)

Entry-level government nurses used to sit at SG 11. A Supreme Court ruling on the Philippine Nursing Act, implemented through DBM Budget Circular No. 2020-4, **raised Nurse I from SG 11 to SG 15 in 2020** — one of the biggest single pay corrections any profession has won. A follow-up circular then moved Nurse II to SG 16 to fix the compressed ladder. If a relative remembers nursing entry pay at SG 11 levels, that memory is years out of date.

### Government Benefits Beyond Basic Pay

- 13th month pay and cash gift; mid-year bonus
- GSIS retirement and insurance
- PhilHealth, Pag-IBIG
- Leave credits (vacation + sick, monetizable)
- Annual medical allowance under EO 64
- Step increments (one step per 3 years of satisfactory service) and a **fourth tranche increase coming in 2027**

---

## Private Hospital Nurse Salary 2026

Private compensation has no standardized table, and the honest picture is a wide range:

- **Entry-level staff nurses** at many private hospitals start **below the government SG 15 rate** — this is the sector's open secret and the reason government items are fiercely contested
- **Large private medical centers** in Metro Manila pay more competitively, especially with experience and specialty units (ICU, ER, OR, cath lab)
- **Provincial private hospitals** commonly pay less than Metro counterparts, partially offset by cost of living

The private sector's compensations: faster hiring, earlier specialty exposure, and the experience that qualifies you for government items, specialty differentials, and abroad applications later.

---

## The Salary Trajectory Most Nurses Actually Follow

1. **Private hospital first** (faster entry, experience building) at modest pay
2. **Government item** when one opens (SG 15 jump + benefits), or
3. **Abroad** — where Filipino nurse pay multiplies severalfold; the US route starts with the NCLEX ([complete guide](https://lisensyaprep.com/nursing/what-is-the-nclex))

Specialty certifications (ER, ICU, renal) and charge/supervisory roles raise pay on every path.

---

## Frequently Asked Questions

**How much is a Nurse I salary in 2026?**
₱42,178 monthly basic at Step 1 (SG 15) under the 2026 Third Tranche, plus ₱2,000 PERA — about ₱44,178 recurring gross before deductions.

**Is nurse salary increasing again?**
Yes — a fourth tranche under EO 64 is scheduled for 2027 for civilian government personnel.

**Why do private hospitals pay less than government?**
Private pay is market-set with no standardized table; government pay follows the national salary schedule, which the 2020 reclassification pushed to SG 15 for entry nurses.

**Do government nurses need the Civil Service Exam?**
No — PNLE passing is itself civil service eligibility under RA 1080. ([How to apply](https://lisensyaprep.com/nursing/staff-nurse-application-guide-philippines))

**How do steps work?**
Each grade has 8 steps; you advance one step per 3 years of continuous satisfactory service, Step 1 (₱42,178) to Step 8 (₱45,202) for Nurse I.

---
`;

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: "/nursing", name: "Nursing" }, { url: "/nursing/nurse-salary-philippines", name: "Nurse Salary Philippines" }]} />
      <Script id="schema-nurse-salary-philippines-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Nurse Salary Philippines</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (PNLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Nurse Salary Philippines 2026: Government vs Private Breakdown
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 22, 2026</span><span>•</span>
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

            <div className="mt-8 bg-gradient-to-br from-pink-900/20 to-pink-900/10 border border-pink-500/30 rounded-2xl p-6 text-center">
              <p className="text-pink-400 font-extrabold text-lg mb-2">Still Reviewing for the PNLE?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified nursing board reviewer covering all NLE areas. No account required.</p>
              <Link href="/nursing" className="inline-block bg-pink-500 hover:bg-pink-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
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
