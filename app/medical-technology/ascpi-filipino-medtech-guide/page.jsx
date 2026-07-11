import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: "ASCPi for Filipino MedTechs 2026 - Certification Guide",
  description: "Complete ASCPi guide for Filipino medical technologists - what the ASCPi MLS certification is, eligibility for RMTs, exam format, how it unlocks the US pathway, and its value in the Gulf.",
  path: "/medical-technology/ascpi-filipino-medtech-guide",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the ASCPi certification for medical technologists?","acceptedAnswer":{"@type":"Answer","text":"The international certification program of the American Society for Clinical Pathology Board of Certification. MLS(ASCPi) is the US-standard competency credential for internationally educated medical laboratory scientists."}},{"@type":"Question","name":"Can Filipino RMTs take the ASCPi exam in the Philippines?","acceptedAnswer":{"@type":"Answer","text":"Yes. The computer-adaptive exam is delivered at Pearson VUE test centers including in the Philippines."}}]}`;

const RELATED_ARTICLES = [
  { text: "MedTech First Job Guide Philippines", href: "/medical-technology/medtech-first-job-guide" },
  { text: "MedTech Salary Philippines 2026", href: "/medical-technology/medtech-salary-philippines" },
  { text: "New OFW Guide for Licensed Professionals", href: "/blog/ofw-guide-licensed-professionals" },
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
If Filipino nursing has the NCLEX, Filipino medical technology has the **ASCPi** — the single credential that most changes an RMT's international trajectory. Here is what it is, who qualifies, and what it actually unlocks.

**Quick answer:** The **ASCPi (ASCP international)** is the international certification of the **American Society for Clinical Pathology Board of Certification** — for medtechs, the key credential is **MLS(ASCPi)**, Medical Laboratory Scientist. Filipino BS MedTech graduates with PRC licensure commonly qualify under ASCP's international eligibility routes, take the **computer-adaptive exam at Pearson VUE centers (available in the Philippines)**, and use the credential as the standard evidence of US-level competency for American employers — and as a strong differentiator in the Gulf.

## What the ASCPi Is (and Is Not)

The ASCP Board of Certification is the recognized certifying body for US laboratory professionals; the **"i" designation is its international examination program**, allowing internationally educated laboratorians to earn the same competency credential. Two honest clarifications up front:

- **ASCPi is a certification, not a license or a visa.** US employment still requires state licensure where applicable, employer sponsorship, and immigration processing
- Its power is **standardization**: a US lab director cannot easily evaluate a Philippine transcript, but MLS(ASCPi) tells them exactly what you know

## Eligibility for Filipino RMTs

ASCP publishes eligibility **routes** for international candidates — combinations of degree, laboratory education, and experience. For the typical Filipino candidate, the **BS in Medical Technology/Medical Laboratory Science plus PRC licensure** aligns with the international MLS routes; some routes credit clinical experience for candidates with different profiles. Two practical rules:

1. **Read the current ASCP BOC international eligibility routes** on ascp.org before applying — routes and documentation rules are updated periodically
2. **Documents go through source verification** — transcripts and license verified with your school and the PRC, so keep names and dates consistent across everything (the same lesson as DataFlow and CGFNS)

## The Exam Itself

- **Computer-adaptive** format (difficulty adjusts to your performance — the same testing logic as the NCLEX)
- **100 questions, 2.5 hours**, delivered at **Pearson VUE centers including in the Philippines**
- Content spans the full generalist bench: blood banking, chemistry, hematology, immunology, microbiology, urinalysis/body fluids, plus laboratory operations
- Your MTLE preparation is the right foundation; supplement with US-context materials (US units, US regulatory framing, and heavy practice questions — retrieval practice wins here as everywhere)

## What ASCPi Actually Unlocks

**The United States:** MLS(ASCPi) is the standard competency evidence US employers and many state licensure systems look for from internationally educated laboratorians. The realistic sequence for Filipino RMTs: solid local bench years → ASCPi → US employer sponsorship → state licensure where required → visa processing. Each step is real; none is instant — treat multi-year timelines as normal and be wary of anyone selling shortcuts.

**The Gulf and beyond:** even outside the US, ASCPi functions as a salary-and-shortlist differentiator — Gulf laboratories recognize it, and it strengthens DataFlow-verified applications.

**At home:** ASCPi-certified medtechs stand out for senior bench, QA, and reference laboratory roles locally too.

## When to Take It

The credential rewards **bench-ready generalists** — most Filipino RMTs take it after 1-3 years of multi-section hospital laboratory experience, when the full generalist blueprint is fresh from daily practice rather than from memory of internship. ([Building those years: MedTech First Job Guide](https://lisensyaprep.com/medical-technology/medtech-first-job-guide))

## Frequently Asked Questions

**What does MLS(ASCPi) mean?**
Medical Laboratory Scientist certification under the ASCP Board of Certification's international program — the US-standard competency credential for internationally educated medtechs.

**Can I take the ASCPi in the Philippines?**
Yes — the exam is delivered at Pearson VUE centers locally.

**Is ASCPi required to work in the US?**
It is the standard credential US employers expect from internationally educated laboratorians, alongside state licensure where applicable and immigration processing.

**Does my MTLE review help for the ASCPi?**
Substantially — the content blueprint overlaps heavily. Supplement with US-context materials and adaptive-format practice.

**Does ASCPi expire?**
ASCP certifications are maintained through its credential maintenance program — factor ongoing maintenance into your plan per current ASCP rules.
`;

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: "/medical-technology", name: "Medical Technology" }, { url: "/medical-technology/ascpi-filipino-medtech-guide", name: "ASCPi for Filipino MedTechs" }]} />
      <Script id="schema-ascpi-filipino-medtech-guide-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/medical-technology" className="text-gray-500 hover:text-gray-300 transition-colors">Medical Technology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">ASCPi for Filipino MedTechs</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400">Medical Technology (MTLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                ASCPi for Filipino MedTechs 2026: The International Certification Guide
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>August 4, 2026</span><span>•</span>
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

            <div className="mt-8 bg-gradient-to-br from-sky-900/20 to-sky-900/10 border border-sky-500/30 rounded-2xl p-6 text-center">
              <p className="text-sky-400 font-extrabold text-lg mb-2">Still Preparing for the MTLE?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified MedTech board reviewer covering the full generalist bench. No account required.</p>
              <Link href="/medical-technology" className="inline-block bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
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
