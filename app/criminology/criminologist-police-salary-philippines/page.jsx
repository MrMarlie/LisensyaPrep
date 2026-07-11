import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: "Criminologist & Police Salary Philippines 2026 (Updated Pay)",
  description: "How much do police officers and criminologists earn in 2026? Patrolman base pay is now ₱31,151 after the latest uniformed personnel increase. Complete PNP rank pay context, BJMP/BFP, and RCrim career salaries.",
  path: "/criminology/criminologist-police-salary-philippines",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much is a Patrolman salary in the Philippines in 2026?","acceptedAnswer":{"@type":"Answer","text":"31,151 pesos monthly base pay effective January 1, 2026 under Executive Order No. 107, before allowances which raise actual take-home substantially."}},{"@type":"Question","name":"Did police salaries increase in 2026?","acceptedAnswer":{"@type":"Answer","text":"Yes. Uniformed personnel base pay increased 5 percent on January 1, 2026, with further increases of 4.75 percent in 2027 and 4.55 percent in 2028 scheduled."}},{"@type":"Question","name":"Do police officers follow the government salary grade table?","acceptedAnswer":{"@type":"Answer","text":"No. The PNP and other uniformed services follow a separate Military and Uniformed Personnel base pay schedule, not the civilian salary grade table."}}]}`;

const RELATED_ARTICLES = [
  { text: "How to Join the PNP as a Criminology Graduate", href: "/criminology/how-to-join-pnp-criminologist" },
  { text: "What to Do After Passing the CLE", href: "/criminology/after-passing-cle-next-steps" },
  { text: "Government Jobs with Civil Service Eligibility", href: "/civil-service/government-jobs-cse-eligibility" },
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
For most criminology graduates, the salary question means one thing: *magkano ang sweldo ng pulis?* Here are the verified 2026 figures — including the increase most articles haven't caught up with — plus the pay picture across the other RCrim career paths.

**Quick answer:** Uniformed personnel received a **5% base pay increase on January 1, 2026** under Executive Order No. 107. An entry-level **Patrolman/Patrolwoman now earns ₱31,151 monthly base pay** — up from ₱29,668 — before allowances, which push actual take-home substantially higher. More increases are scheduled for 2027 and 2028. Details below.

---

## PNP Salary 2026: The Verified Numbers

Here is something many salary articles get wrong: **police pay does not follow the civilian Salary Grade table.** The PNP, AFP, BJMP, BFP, and other uniformed services follow a **separate Military and Uniformed Personnel (MUP) base pay schedule** — most recently updated by **Executive Order No. 107, s. 2025**:

| What changed | Figure |
|--------------|--------|
| Patrolman base pay before 2026 | ₱29,668/month |
| **Patrolman base pay from Jan 1, 2026** | **₱31,151/month** |
| Scheduled increase 2027 | +4.75% |
| Scheduled increase 2028 | +4.55% |

### Base Pay Is Only the Beginning

The uniformed compensation package layers allowances on top of base pay — subsistence and quarters allowances, hazard-related pay, longevity pay, clothing allowances, and more depending on assignment. **Actual take-home for a new Patrolman runs meaningfully above the ₱31,151 base** — which is why uniformed careers remain financially competitive with, and often ahead of, entry civilian professional pay.

Add the non-cash economics: security of tenure, retirement benefits under the MUP system, and a rank ladder where every promotion is a base-pay jump.

### BJMP and BFP

Jail officers and fire officers sit on the same MUP schedule logic — entry-level Jail Officer 1 and Fire Officer 1 compensation tracks closely with Patrolman pay, making all three uniformed doors financially similar at entry. Choose by mission fit, not by peso difference.

---

## The Registered Criminologist Advantage, Restated

Whichever uniformed door you choose, your RCrim license is your eligibility — **no NAPOLCOM entrance exam needed** under RA 6506 as amended by RA 11131. Full application walkthrough: [How to Join the PNP as a Criminology Graduate](https://lisensyaprep.com/criminology/how-to-join-pnp-criminologist).

---

## Beyond the Uniform: Other RCrim Career Pay

**Private security industry** — RCrims qualify for supervisory and management tracks (security officers, managers, consultants) rather than entry guard posts. Compensation varies widely by employer and scale; the trajectory rewards experience and certifications rather than a fixed table.

**Government civilian items** — investigation, regulatory, and public safety positions in agencies follow the **civilian Salary Grade table** ([2026 table decoded here](https://lisensyaprep.com/civil-service/salary-grade-table-philippines)), and your board passing is civil service eligibility under RA 1080.

**Academe** — criminology instructors are in steady demand given the profession's enrollment; pay follows the institution's faculty scales, with graduate degrees as the multiplier.

---

## Frequently Asked Questions

**How much is a Patrolman's salary in 2026?**
₱31,151 monthly base pay effective January 1, 2026 under EO 107 — before allowances, which raise actual take-home substantially.

**Did police salaries increase in 2026?**
Yes — a 5% base pay increase took effect January 1, 2026, with further increases of 4.75% in 2027 and 4.55% in 2028 already scheduled.

**Do police follow the salary grade table?**
No. Uniformed personnel follow a separate MUP base pay schedule, not the civilian EO 64 salary grade table.

**How much do BJMP and BFP officers earn?**
Entry-level Jail Officer 1 and Fire Officer 1 pay tracks closely with Patrolman compensation on the uniformed schedule.

**Is a criminologist's salary different from a police officer's?**
The license is one credential with many doors: uniformed service (MUP pay), government civilian items (salary grade), private security management, and academe — each with its own pay structure.

---
`;

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: "/criminology", name: "Criminology" }, { url: "/criminology/criminologist-police-salary-philippines", name: "Criminologist & Police Salary" }]} />
      <Script id="schema-criminologist-police-salary-philippines-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/criminology" className="text-gray-500 hover:text-gray-300 transition-colors">Criminology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Criminologist & Police Salary</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400">Criminology (CLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Criminologist and Police Salary Philippines 2026: Patrolman Pay and RCrim Careers
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 24, 2026</span><span>•</span>
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

            <div className="mt-8 bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-red-400 font-extrabold text-lg mb-2">Still Preparing for the CLE?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified criminology board reviewer covering all six subjects. No account required.</p>
              <Link href="/criminology" className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
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
