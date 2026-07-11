import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: "Filipino Nurse to Canada 2026 - NNAS, NCLEX & PR Pathway",
  description: "Complete Canada pathway for Filipino nurses - NNAS credential report, provincial regulator application, NCLEX-RN, language requirements, and the permanent residency routes health workers use.",
  path: "/nursing/filipino-nurse-canada-pathway",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Does Canada use the NCLEX for nurse licensing?","acceptedAnswer":{"@type":"Answer","text":"Yes. The NCLEX-RN is the registered nurse licensing examination across Canadian provinces, and Filipino nurses can take it at Pearson VUE centers in the Philippines."}},{"@type":"Question","name":"What is NNAS in the Canada nursing pathway?","acceptedAnswer":{"@type":"Answer","text":"The National Nursing Assessment Service evaluates internationally educated nurses' credentials and issues the Advisory Report that Canadian provincial nursing regulators require."}}]}`;

const RELATED_ARTICLES = [
  { text: "Filipino Nurse Work Abroad: All Destinations Compared", href: "/nursing/filipino-nurse-work-abroad-guide" },
  { text: "What is the NCLEX? Complete Guide", href: "/nursing/what-is-the-nclex" },
  { text: "NCLEX 2026 Coverage and Test Plan", href: "/nursing/nclex-2026-coverage" },
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
Canada's pitch to Filipino nurses is unique among destinations: not just a job, but a **realistic road to permanent residency** — often with family included from early on. The price of that prize is the most document-heavy process of any major destination. Here is the map.

**Quick answer:** Open an **NNAS (National Nursing Assessment Service)** file and have your credentials evaluated → apply to the **nursing regulator of your target province** (each province has its own body) → complete any required assessments and pass the **NCLEX-RN** → meet the language requirement (IELTS or CELBAN) → register as an RN → pursue permanent residency through federal or provincial programs that prioritize health workers.

## Step 1: NNAS — The National Front Door

Nearly all internationally educated nurses start at **nnas.ca**: create an account, submit identity documents, and have your **nursing school and the PRC send your records directly** (the CGFNS-style sealed-documents rule applies). NNAS produces an **Advisory Report** comparing your education to Canadian standards, which you direct to your chosen province's regulator. Budget several months for this stage — document gathering is the classic bottleneck, so start your school and PRC requests early.

## Step 2: Choose Your Province (It Matters)

Canada regulates nursing **provincially** — Ontario, British Columbia, Alberta, Saskatchewan, Manitoba, and the rest each have their own regulator, fees, and assessment steps. Provinces have competed in recent years to **streamline internationally educated nurse (IEN) registration** amid nurse shortages, with some offering faster pathways, bridging supports, or supervised practice routes. Research current IEN processing in 2-3 candidate provinces before committing your NNAS report — the differences in speed are real.

## Step 3: Assessments and the NCLEX-RN

Your provincial regulator reviews the NNAS report and may require competency assessments or bridging education depending on the evaluation. The licensing exam for RNs across Canada is the **NCLEX-RN** — the same exam as the US route, and **you can take it at Pearson VUE centers in the Philippines**. If Canada is your plan, our entire NCLEX ecosystem works for you: [What is the NCLEX](https://lisensyaprep.com/nursing/what-is-the-nclex), the [2026 coverage guide](https://lisensyaprep.com/nursing/nclex-2026-coverage), and [400 free practice questions](https://lisensyaprep.com/nclex).

**Language:** IELTS or **CELBAN** (the Canadian healthcare-English test) at the scores your regulator currently requires — confirm on the regulator's site.

## Step 4: The PR Question — Canada's Real Differentiator

Health occupations have featured prominently in Canada's immigration programs — **Express Entry has run category-based draws for healthcare workers**, and **Provincial Nominee Programs (PNPs)** regularly target nurses. Many Filipino nurses land as workers and transition to PR, or even secure PR pathways in parallel. Immigration streams and draw criteria change frequently — treat IRCC's official site as the only source of truth, and be wary of consultants promising guaranteed outcomes.

## The Honest Trade-offs

- **Longest paperwork of the major routes** — NNAS alone tests your patience
- **Costs accumulate** across NNAS, regulator fees, NCLEX, and language tests
- The payoff: **PR-track immigration, family inclusion, and Canadian nurse compensation** — which is why the queue exists

## Frequently Asked Questions

**What is NNAS?**
The National Nursing Assessment Service — the centralized body that evaluates internationally educated nurses' credentials and issues the Advisory Report Canadian provincial regulators require.

**Does Canada use the NCLEX?**
Yes — the NCLEX-RN is the registered nurse licensing exam across Canadian provinces, takeable at Pearson VUE centers in the Philippines.

**Which province is fastest for Filipino nurses?**
It changes as provinces adjust IEN streams — compare current processing in 2-3 provinces before directing your NNAS report. Speed differences between provinces are significant and real.

**Can my family come with me?**
Canadian work and PR pathways commonly include spouses and children — one of the route's biggest draws. Confirm specifics per program on IRCC's site.
`;

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: "/nursing", name: "Nursing" }, { url: "/nursing/filipino-nurse-canada-pathway", name: "Nurse to Canada Pathway" }]} />
      <Script id="schema-filipino-nurse-canada-pathway-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Nurse to Canada Pathway</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (PNLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Filipino Nurse to Canada 2026: NNAS, NCLEX, and PR Pathway
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 31, 2026</span><span>•</span>
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
