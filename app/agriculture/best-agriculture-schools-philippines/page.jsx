import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Top Agriculture Schools Philippines 2026 (ALE Passing Rates)",
  description: "The best agriculture schools in the Philippines ranked by actual ALE board exam performance - official PRC data on the UPLB dynasty, CLSU, DMMMSU and more agriculturist licensure exam leaders.",
  path: "/agriculture/best-agriculture-schools-philippines",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the best agriculture school in the Philippines based on board exam results?","acceptedAnswer":{"@type":"Answer","text":"UP Los Baños, by the widest margin of any profession — the official top-performing school in every recent Agriculturist Licensure Examination cycle, including a perfect 100 percent passing rate in November 2024. Central Luzon State University is the strongest challenger."}},{"@type":"Question","name":"Is the agriculturist board exam hard?","acceptedAnswer":{"@type":"Answer","text":"Historically yes. National passing rates have been as low as 34 percent in 2023, though November 2025 recorded a much stronger 68.55 percent."}}]};

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
Every profession in this ranking series has its leaders. Agriculture has something stronger: the most one-sided dynasty in Philippine licensure. The official ALE data reads like a coronation — and then a genuinely interesting battle for second.

**Methodology:** official PRC top-performing school announcements across recent Agriculturist Licensure Examination cycles, by the Commission's examinee-count categories, weighting repeat performance.

## The Recent Cycles at a Glance

| ALE Cycle | National Passing Rate | Top-Performing School(s) |
|-----------|----------------------|--------------------------|
| **November 2025** | **68.55%** (6,678/9,742) | **UP Los Baños** — 99.37% (100+ category); **DMMMSU–Bacnotan** — perfect 100% (40-99 category); **CLSU** 2nd at 91.63% with 208 passers |
| November 2024 | 50.78% (3,628/7,144) | **UP Los Baños** — perfect 100% (all 127); MSU–General Santos 2nd at 84.76% |
| November 2023 | 34.18% (3,423/10,014) | **UP Los Baños** — 99.02% |

## The Consistency Leaders

1. **University of the Philippines Los Baños** — the dynasty of dynasties: top school in **every recent cycle**, including a perfect 100% in 2024 and 99%+ in 2023 and 2025. The country's agricultural flagship performing exactly like one. UPLB students also regularly take the national topnotcher spots (Mangulabnan, #1 in 2024; Franco, #2 in 2023)
2. **Central Luzon State University (Nueva Ecija)** — the strongest challenger: 2nd overall in November 2025 at 91.63% with a large 208-passer cohort, and producer of the November 2023 national topnotcher (Pontoy, 88.00%)
3. **Don Mariano Marcos Memorial State University – Bacnotan** — perfect 100% in its category in November 2025, plus the 2024 #2 topnotcher
4. **Mindanao State University – General Santos** — the Mindanao standard-bearer, 2nd place November 2024

The headline pattern is unmissable: **agriculture's top schools are entirely state universities** — fitting for a profession central to national food security, and excellent news for students' tuition budgets.

## How to Read This Honestly

The ALE's national passing rates swing hard — from a brutal 34% in 2023 to 68.55% in 2025 — which makes the school gap here arguably the widest of any profession we track: in the 2023 cycle, UPLB's 99% stood against a national rate of 34%. That is a 65-point difference between the best environment and the average one. If you are choosing an agriculture program, this data deserves real weight — and if you are already enrolled elsewhere, it means your review discipline has to close a gap your school may not. ([Free ALE reviewer here](https://lisensyaprep.com/agriculture/))

## Frequently Asked Questions

**What is the best agriculture school in the Philippines?**
UP Los Baños, by the widest margin of any profession — official top-performing school in every recent ALE cycle, including a perfect 100% in November 2024. CLSU is the strongest challenger.

**Is the agriculturist board exam hard?**
Historically yes — national rates have been as low as 34% (2023), though November 2025's 68.55% marks a strong improvement.

**Are the top agriculture schools expensive?**
No — the entire top tier (UPLB, CLSU, DMMMSU, MSU) is state universities, with free-tuition law coverage for qualified students.

**What careers follow the ALE?**
Registered Agriculturists work in the Department of Agriculture and LGUs (RA 1080 eligibility applies — no Civil Service Exam needed), agribusiness, research, academe, and rural banking's agri-loan sector.

## Related

- [What to Do After Passing the Board Exam](https://lisensyaprep.com/blog/after-passing-board-exam-philippines)
- [Government Jobs with Civil Service Eligibility](https://lisensyaprep.com/civil-service/government-jobs-cse-eligibility)
- [Free Gamified ALE Reviewer](https://lisensyaprep.com/agriculture/)
`;

export default function BestAgricultureSchoolsPhilippinesPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-best-agriculture-schools-philippines-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/agriculture" className="text-gray-500 hover:text-gray-300 transition-colors">Agriculture</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"Top Agriculture Schools in the Philippines 2026 (Ranked by ALE Passing Rates)"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-lime-500/10 text-lime-400">Agriculture</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"Top Agriculture Schools in the Philippines 2026 (Ranked by ALE Passing Rates)"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 18, 2026</span><span>•</span>
                <span>7 min read</span>
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
