import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: "Teacher Salary Philippines 2026 - Salary Grades Explained",
  description: "How much do teachers earn in the Philippines in 2026? Teacher I starts at ₱31,705 (SG 11) under the latest tranche. Complete DepEd salary breakdown, allowances, career progression, and private school comparison.",
  path: "/education/teacher-salary-philippines",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much is a Teacher I salary in the Philippines in 2026?","acceptedAnswer":{"@type":"Answer","text":"31,705 pesos monthly basic pay at Step 1 under Salary Grade 11, per the 2026 Third Tranche of EO 64, plus 2,000 pesos PERA and teaching allowances."}},{"@type":"Question","name":"How much does a Master Teacher earn in 2026?","acceptedAnswer":{"@type":"Answer","text":"The Master Teacher track starts around Salary Grade 18, which pays 53,818 pesos monthly basic at Step 1 in 2026, rising with rank and steps."}},{"@type":"Question","name":"Will teacher salaries increase again after 2026?","acceptedAnswer":{"@type":"Answer","text":"Yes. The fourth and final tranche under Executive Order No. 64 is scheduled for 2027."}}]}`;

const RELATED_ARTICLES = [
  { text: "DepEd Teacher 1 Ranking Guide 2026", href: "/education/deped-teacher-1-ranking-guide" },
  { text: "DepEd Teacher 1 Requirements Checklist", href: "/education/deped-teacher-1-requirements" },
  { text: "What to Do After Passing the LET", href: "/education/after-passing-let-next-steps" },
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
Every LET reviewee eventually googles the same question: *magkano ba talaga ang sweldo ng teacher?* Here are the verified 2026 numbers, the allowances that do not show up in the headline figure, and the honest private-school comparison.

**Quick answer:** In 2026, a **DepEd Teacher I (Salary Grade 11) earns ₱31,705 monthly basic pay** at Step 1 under the Third Tranche of EO 64, plus ₱2,000 PERA, teaching allowances, and government benefits — with another tranche increase coming in 2027. Details below.

---

## DepEd Teacher Salary 2026 (The Verified Numbers)

Under the **Third Tranche of Executive Order No. 64** (effective January 1, 2026):

| Position | Salary Grade | Monthly Basic (Step 1) |
|----------|--------------|------------------------|
| **Teacher I** | SG 11 | **₱31,705** |
| Teacher II | SG 12 | ₱33,947 |
| Teacher III | SG 13 | higher bracket |
| Master Teacher track | SG 18+ | ₱53,818 and up |

Within Teacher I alone, the 8-step ladder runs from **₱31,705 (Step 1) to ₱33,611 (Step 8)** — one step earned per 3 years of satisfactory service. Add the **₱2,000 monthly PERA** and a starting Teacher I's recurring gross is roughly **₱33,705** before deductions.

### What the Basic Pay Doesn't Show

DepEd compensation includes items private-sector comparisons often miss:

- **13th month pay and cash gift; mid-year bonus**
- **Teaching allowances** (chalk/cash allowance and similar supplements released per DepEd guidelines)
- **Proportional vacation pay** structure unique to teaching
- **GSIS, PhilHealth, Pag-IBIG**, leave credits
- **Annual medical allowance** under EO 64
- **The 2027 fourth tranche** — one more scheduled increase under the current law

### The Career Ladder Is the Real Salary Story

Teacher I is the entry point, not the destination. Reclassification to Teacher II and III, and especially the **Master Teacher track (SG 18 and beyond, starting at ₱53,818)**, is where DepEd pay becomes genuinely competitive. Positions requiring graduate units reward the master's degree you can chip away at while teaching.

---

## Private School Teacher Salary 2026

The honest range is enormous:

- **Many small private schools pay below Teacher I's ₱31,705** — sometimes far below, particularly in the provinces
- **Established private schools and universities** pay competitively with government, with different workload profiles
- **International schools** pay the top of the local market but hire selectively (experience + credentials)

The classic strategy remains: private school first for experience (which earns DepEd ranking points), government item when you win one. Full ranking mechanics: [DepEd Teacher 1 Ranking Guide](https://lisensyaprep.com/education/deped-teacher-1-ranking-guide).

---

## Frequently Asked Questions

**How much is a Teacher I salary in 2026?**
₱31,705 monthly basic at Step 1 (SG 11) under the 2026 Third Tranche, plus ₱2,000 PERA and teaching allowances.

**Will teacher salaries increase again?**
Yes — the fourth tranche under EO 64 takes effect in 2027.

**How much does a Master Teacher earn?**
The Master Teacher track starts around SG 18 — ₱53,818 monthly basic at Step 1 in 2026 — and climbs with rank.

**How do I move from Teacher I to Teacher II?**
Through reclassification based on education, experience, training, and performance per DepEd guidelines — graduate units are the accelerator.

**Do private school teachers earn less?**
Often at entry, yes, though established institutions compete with government pay. Private experience earns points toward DepEd ranking either way.

---
`;

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: "/education", name: "Education" }, { url: "/education/teacher-salary-philippines", name: "Teacher Salary Philippines" }]} />
      <Script id="schema-teacher-salary-philippines-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Teacher Salary Philippines</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">Education (LET)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Teacher Salary Philippines 2026: Salary Grades Explained
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 23, 2026</span><span>•</span>
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

            <div className="mt-8 bg-gradient-to-br from-violet-900/20 to-violet-900/10 border border-violet-500/30 rounded-2xl p-6 text-center">
              <p className="text-violet-400 font-extrabold text-lg mb-2">Still Reviewing for the LET?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified LET reviewer covering Gen Ed and Prof Ed. No account required.</p>
              <Link href="/education" className="inline-block bg-violet-500 hover:bg-violet-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
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
