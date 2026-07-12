import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Top MedTech Schools Philippines 2026 (MTLE Passing Rates)",
  description: "The best medical technology schools in the Philippines ranked by actual MTLE board exam performance - official PRC data on the SLU dynasty, DLSMHSI, Notre Dame of Marbel, Velez, UST and more.",
  path: "/medical-technology/best-medtech-schools-philippines",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the best medtech school in the Philippines based on board exam results?","acceptedAnswer":{"@type":"Answer","text":"By recent official PRC data, Saint Louis University is the clear leader, topping three of four recent MTLE cycles including a perfect 100 percent rate with 362 examinees in March 2026, with DLSMHSI, Notre Dame of Marbel University, and Cagayan State University-Andrews as the strongest challengers."}},{"@type":"Question","name":"Is the MTLE hard?","acceptedAnswer":{"@type":"Answer","text":"National passing rates have run 71 to 84 percent recently, higher than most board exams, reflecting the profession's rigorous internship system filtering readiness before exam day."}}]};

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
Medical technology has something no other board exam in this series has: a genuine, ongoing **dynasty**. The recent MTLE data is a story about one Baguio institution — and about which schools are close behind it.

**Methodology:** official PRC top-performing school announcements (for the MTLE: 50 or more examinees passed with at least an 80% rate, per the Commission's criteria) across recent cycles, weighting repeat appearances.

## The Recent Cycles at a Glance

| MTLE Cycle | National Passing Rate | Top-Performing School |
|------------|----------------------|----------------------|
| **March 2026** | **84.13%** (7,838/9,317) | **Saint Louis University — 100%**, with the highest examinee count among perfect-rate schools: **362 new medical technologists** |
| August 2025 | 71.19% (3,360/4,720) | **Saint Louis University** — 98.28% (57/58); De La Salle Medical and Health Sciences Institute 2nd at 97.98% (97/99) |
| March 2025 | 80.26% (6,147/7,659) | **Notre Dame of Marbel University** — perfect 100% (all 57) |
| August 2023 | — | **Saint Louis University** — perfect 100% (all 152); Cagayan State–Andrews 2nd at 97.50% |

## The Consistency Leaders

1. **Saint Louis University (Baguio)** — the dynasty. Top school in three of the four cycles above, including the extraordinary March 2026 result: a perfect 100% with **362 examinees**, by far the largest perfect-rate cohort in the country. Excellence at that scale is a system, not luck
2. **De La Salle Medical and Health Sciences Institute (Cavite)** — 97.98% at meaningful scale in August 2025; the Luzon private-school benchmark
3. **Notre Dame of Marbel University (South Cotabato)** — the March 2025 perfect-rate leader and Mindanao's medtech standard-bearer
4. **Cagayan State University – Andrews** — the state-university standout at 97.50%
5. **Velez College, UST, and University of the Immaculate Conception–Davao** — the topnotcher factories: national #1 examinees in recent cycles came from Velez (March 2025), UST (August 2024), and UIC-Davao (August 2025)

## How to Read This Honestly

MedTech's national passing rates run high (71-84% recently) compared to criminology or the LET — but don't mistake that for an easy board: the exam covers six laboratory sciences plus law and ethics, and the high rates reflect a rigorous internship system filtering readiness before exam day. School choice here also carries an international dimension most rankings ignore: a strong multi-section internship (the SLU/DLSMHSI hallmark) is precisely what the **ASCPi and abroad employers** later look for. ([The ASCPi pathway explained](https://lisensyaprep.com/medical-technology/ascpi-filipino-medtech-guide))

One honest note from us: LisensyaPrep sells an MTLE Mastery System, so we have skin in this profession — which is exactly why this ranking uses only PRC's official numbers, fully cited, nothing editorialized.

## Frequently Asked Questions

**What is the best medtech school in the Philippines?**
By recent official MTLE data, Saint Louis University is the clear leader — top school in three of four recent cycles including a 100% rate with 362 examinees in March 2026 — with DLSMHSI, Notre Dame of Marbel, and Cagayan State–Andrews as the strongest challengers.

**Which schools produce MTLE topnotchers?**
Recent national #1 examinees came from Velez College, UST, and University of the Immaculate Conception–Davao.

**Is the MTLE hard?**
National rates of 71-84% recently — higher than most boards, reflecting the profession's strong internship filter rather than an easy exam.

**What comes after passing the MTLE?**
[MedTech First Job Guide](https://lisensyaprep.com/medical-technology/medtech-first-job-guide) — hospital labs, chains, government items, and the abroad arc.

## Related

- [MedTech Salary Philippines 2026](https://lisensyaprep.com/medical-technology/medtech-salary-philippines)
- [ASCPi for Filipino MedTechs](https://lisensyaprep.com/medical-technology/ascpi-filipino-medtech-guide)
- [Free MTLE Starter Pack](https://lisensyaprep.com/medical-technology/)
`;

export default function BestMedtechSchoolsPhilippinesPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-best-medtech-schools-philippines-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/medical-technology" className="text-gray-500 hover:text-gray-300 transition-colors">Medical Technology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"Top MedTech Schools in the Philippines 2026 (Ranked by MTLE Passing Rates)"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400">Medical Technology</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"Top MedTech Schools in the Philippines 2026 (Ranked by MTLE Passing Rates)"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 17, 2026</span><span>•</span>
                <span>8 min read</span>
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
