import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Nursing School Tuition Philippines 2026 - Cost vs Performance",
  description: "How much does nursing school cost in the Philippines in 2026? Tuition ranges from free (state universities under RA 10931) to ₱150,000+ per year - crossed with actual PNLE performance data to find real value.",
  path: "/nursing/nursing-school-tuition-fees",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does nursing school cost in the Philippines?","acceptedAnswer":{"@type":"Answer","text":"From free tuition at state universities under RA 10931 to roughly 100,000 to 150,000 pesos or more per year at premium private institutions, plus related learning experience fees and living costs at every tier."}},{"@type":"Question","name":"Do expensive nursing schools have better board exam passing rates?","acceptedAnswer":{"@type":"Answer","text":"Not reliably. Official PRC data shows top state universities like WVSU-La Paz, Bicol University-Legazpi, and Central Mindanao University posting the same perfect passing rates as premium private institutions."}}]};

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
Here is the question tuition brochures never answer: **does paying more buy a better chance at the RN license?** We crossed the two datasets — tuition ranges and official PNLE performance — and the answer is one of the best-kept open secrets in Philippine education.

## The Tuition Landscape (2026 Ranges)

| Tier | Typical Cost | Examples of what's in the tier |
|------|-------------|-------------------------------|
| **State universities (SUCs)** | **FREE tuition** for qualified students under **RA 10931** (Universal Access to Quality Tertiary Education Act) — budget mainly for fees not covered, living costs, uniforms, RLE expenses | WVSU, Bicol University, Central Mindanao University, other SUC nursing programs |
| **Local universities & colleges** | Low — LUC subsidy structures vary by city | City-run colleges with nursing programs |
| **Mid-range private** | Roughly **₱40,000-₱90,000 per year**, school- and region-dependent | Many provincial and city private colleges |
| **Premium private** | Roughly **₱100,000-₱150,000+ per year** | Big-name Manila and regional private universities and health-sciences institutes |

**Honest hedge:** private tuition changes yearly and varies by campus — treat these as planning ranges and verify current fees with each school. Nursing also carries costs beyond tuition everywhere: RLE (related learning experience) fees, uniforms, transportation to base hospitals, and review expenses in fourth year.

## Now Cross It With Performance

Recall [our performance ranking, built on official PRC data](https://lisensyaprep.com/nursing/best-nursing-schools-philippines): the November 2024 perfect-100% club included **West Visayas State University–La Paz, Bicol University–Legazpi, and Central Mindanao University** — state universities — standing shoulder to shoulder with UST, Cebu Doctors', and the premium privates.

Read that again with your wallet open: **free-tuition institutions are posting the same 100% passing rates as ₱120,000-per-year institutions.** Over a four-year BSN, that is roughly half a million pesos of difference for statistically equivalent board outcomes at the top of each tier.

## The Honest Full Picture

Premium private tuition is not *irrational* — it can buy smaller cohorts, powerful base-hospital affiliations, name-brand recognition with some employers, and (for the abroad-bound) alumni networks in US and UK health systems. And SUC nursing slots are **ferociously competitive** precisely because of the value equation above — free tuition + top passing rates means entrance exams filter hard, which (honestly) is part of *why* their passing rates are high.

So the real decision tree: **(1)** if you can win a slot at a top-performing SUC, the value is unbeatable; **(2)** if choosing among privates, weight *verified PNLE performance* and base-hospital quality over campus aesthetics — [our data ranking](https://lisensyaprep.com/nursing/best-nursing-schools-philippines) is the shortlist; **(3)** wherever you enroll, the license is won by preparation — [and that part is free](https://lisensyaprep.com/nursing/).

## Frequently Asked Questions

**How much is nursing school in the Philippines?**
From free tuition at state universities under RA 10931 to roughly ₱100,000-₱150,000+ per year at premium private institutions, plus RLE and living costs everywhere.

**Is nursing free at state universities?**
Tuition is free for qualified students at SUCs under RA 10931, though miscellaneous, RLE, and living expenses remain.

**Do expensive nursing schools have better passing rates?**
Not reliably — top state universities post the same perfect passing rates as premium privates in official PRC data. Selectivity and program quality, not price, drive outcomes.

**Which cheap nursing schools have the best board performance?**
By recent official data: WVSU–La Paz, Bicol University–Legazpi, and Central Mindanao University — all in the November 2024 perfect-rate club at SUC cost.
`;

export default function NursingSchoolTuitionFeesPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-nursing-school-tuition-fees-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"Nursing School Tuition Fees Philippines 2026 - Cost vs Board Exam Performance"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"Nursing School Tuition Fees Philippines 2026 - Cost vs Board Exam Performance"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>August 1, 2026</span><span>•</span>
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
