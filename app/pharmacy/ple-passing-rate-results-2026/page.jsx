import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'PLE Passing Rate and Results 2026 Philippines PRC Official Data',
  description:
    'What is the pharmacy board exam passing rate in 2026? This page tracks official PRC PLE results including total examinees, passers, passing rates, and what to do after results are released.',
  path: '/pharmacy/ple-passing-rate-results-2026',
  image: '/images/articles/hero-pharmacy-application-results.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'PLE Passing Rate and Results 2026 Philippines PRC Official Data',
  description:
    'Official PRC Pharmacy Licensure Examination passing rate and results data for 2026, updated after every exam cycle with guidance on what to do after results are released.',
  image: 'https://lisensyaprep.com/images/articles/hero-pharmacy-application-results.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-02',
  dateModified: '2026-05-02',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/pharmacy/ple-passing-rate-results-2026' },
};

const RELATED_ARTICLES = [
  { text: 'PLE Coverage 2026 Complete Subject Breakdown', href: '/pharmacy/ple-coverage-2026' },
  { text: 'How to Apply for PLE via PRC LERIS 2026', href: '/pharmacy/ple-application-guide-2026' },
  { text: 'How to Pass the Pharmacy Board Exam Philippines', href: '/pharmacy/how-to-pass-pharmacy-board-exam' },
  { text: 'Pharmacology Reviewer PLE Philippines 2026', href: '/pharmacy/pharmacology-reviewer' },
  { text: 'Clinical Pharmacy Reviewer PLE Philippines 2026', href: '/pharmacy/clinical-pharmacy-reviewer' },
];

function formatInline(text) {
  return text
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]*)\)/g,
      (_, t, url) =>
        `<a href="${url}"${url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''} class="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">${t}</a>`
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em class="text-gray-400 italic">$1</em>');
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
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="text-gray-300 text-sm ml-4 mb-1 flex items-start gap-2">
          <span className="text-yellow-400 mt-1 flex-shrink-0">•</span>
          <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
        </li>
      );
    } else if (line.startsWith('| ') && line.endsWith(' |')) {
      const cells = line.split('|').filter((c) => c.trim() && !c.match(/^[-\s]+$/));
      const isHeader = i > 0 && lines[i + 1]?.includes('---');
      if (isHeader) {
        elements.push(<tr key={key++} className="border-b border-white/10">{cells.map((cell, ci) => <th key={ci} className="px-4 py-2 text-left text-yellow-400 font-semibold text-sm">{cell.trim()}</th>)}</tr>);
      } else if (!line.match(/^\|[-\s|]+\|$/)) {
        elements.push(<tr key={key++} className="border-b border-white/5">{cells.map((cell, ci) => <td key={ci} className="px-4 py-2 text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: formatInline(cell.trim()) }} />)}</tr>);
      }
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(
        <p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    }
  }
  const wrapped = [];
  let tableBuffer = [];
  let inTable = false;
  for (const el of elements) {
    if (el.type === 'tr') {
      inTable = true;
      tableBuffer.push(el);
    } else {
      if (inTable) {
        wrapped.push(
          <div key={`tbl-${key++}`} className="overflow-x-auto my-4">
            <table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden">
              <tbody>{tableBuffer}</tbody>
            </table>
          </div>
        );
        tableBuffer = [];
        inTable = false;
      }
      wrapped.push(el);
    }
  }
  if (inTable && tableBuffer.length) {
    wrapped.push(
      <div key="tbl-final" className="overflow-x-auto my-4">
        <table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden">
          <tbody>{tableBuffer}</tbody>
        </table>
      </div>
    );
  }
  return wrapped;
}

const SECTION_1 = `
*By LisensyaPrep Team | Last Updated: May 2026 | 6-minute read*

---

The Pharmacy Licensure Examination has one of the more variable passing rates among PRC board exams, ranging from below 40 percent to above 70 percent in different cycles. This page tracks official PRC results and is updated after every exam cycle.

---

## PLE Passing Rate: Understanding the Numbers

The PLE passing rate varies for two main reasons. First, the examinee pool composition changes between cycles. Cycles with many fresh graduates who reviewed immediately after graduation tend to have higher passing rates. Second, shifts in question emphasis between subjects can affect aggregate performance.

The practical lesson is the same as for all PRC boards: review broadly across all five subjects rather than concentrating on two or three.

---

## How to Check Your PLE Results

PRC releases PLE results within 5 working days after the last exam day.
`;

const SECTION_2 = `
**Step 1:** Go to prc.gov.ph and navigate to Board Results.

**Step 2:** Find the Pharmacy Licensure Examination results for your cycle.

**Step 3:** Open the passers list PDF and search for your surname using Ctrl F or Command F.

**Step 4:** Log in to online.prc.gov.ph and use Verification of Rating to see your individual subject scores.

---

## After Passing: Becoming a Registered Pharmacist (RPh)

**Oath Taking Ceremony:** Register for a slot through your LERIS account. This is where you formally become a Registered Pharmacist.

**Initial Registration:** Apply for your PRC Certificate of Registration and Professional Identification Card through LERIS. Your RPh license is required to practice pharmacy in any Philippine hospital, drugstore, or pharmacy.

**Continuing Professional Development (CPD):** PRC requires licensed pharmacists to earn CPD units for license renewal every 3 years.

---

## If You Did Not Pass

Check your individual subject scores immediately through LERIS Verification of Rating. The most common failure patterns in the PLE are falling below 60 percent in Pharmacy Law (often underestimated) or in Clinical Pharmacy (frequently under-reviewed).

Use your subject scores to build a targeted retake plan. For the complete retake guide visit [https://lisensyaprep.com/guides/prc-board-exam-retake-rules](https://lisensyaprep.com/guides/prc-board-exam-retake-rules).

---

## Ready to Start or Continue Your PLE Review?

LisensyaPrep has free practice questions for all five PLE subjects. No account needed.

**[Practice PLE Questions at LisensyaPrep](https://lisensyaprep.com/pharmacy)**
`;

export default function PlePassingRateResults2026Page() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-ple-results" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/pharmacy","name":"Pharmacy"},{"url":"/pharmacy/ple-passing-rate-results-2026","name":"PLE Passing Rate and Results 2026"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/pharmacy" className="text-gray-500 hover:text-gray-300 transition-colors">Pharmacy</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">PLE Passing Rate and Results 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">
                Pharmacy (PLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                PLE Passing Rate and Results 2026 Philippines (PRC Official Data)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>May 2, 2026</span>
                <span>•</span>
                <span>6 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-pharmacy-application-results.jpg"
                alt="Filipino pharmacist graduate at laptop for PLE passing rate and results 2026 Philippines"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 150" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="150" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="700" fontFamily="Georgia,serif">PLE Post-Exam Timeline: From Results to RPh License</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="46" y="52" width="140" height="72" fill="#1e3a5f" rx="8"/>
                  <text x="116" y="80" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">RESULTS</text>
                  <text x="116" y="96" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Within 5</text>
                  <text x="116" y="112" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">working days</text>
                  <line x1="190" y1="88" x2="210" y2="88" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="206,82 218,88 206,94" fill="#f59e0b"/>
                  <rect x="218" y="52" width="140" height="72" fill="#172033" rx="8"/>
                  <text x="288" y="80" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">VERIFY</text>
                  <text x="288" y="96" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Check scores</text>
                  <text x="288" y="112" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">via LERIS</text>
                  <line x1="362" y1="88" x2="382" y2="88" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="378,82 390,88 378,94" fill="#f59e0b"/>
                  <rect x="390" y="52" width="140" height="72" fill="#14532d" rx="8"/>
                  <text x="460" y="80" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">OATH TAKING</text>
                  <text x="460" y="96" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Register on</text>
                  <text x="460" y="112" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">LERIS</text>
                  <line x1="534" y1="88" x2="554" y2="88" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="550,82 562,88 550,94" fill="#f59e0b"/>
                  <rect x="562" y="52" width="152" height="72" fill="#78350f" rx="8"/>
                  <text x="638" y="78" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">RPh LICENSE</text>
                  <text x="638" y="96" textAnchor="middle" fill="#fef3c7" fontSize="11" fontFamily="Arial,sans-serif">Apply for RPh ID</text>
                  <text x="638" y="112" textAnchor="middle" fill="#fef3c7" fontSize="11" fontFamily="Arial,sans-serif">via LERIS</text>
                  <text x="380" y="140" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">RPh = Registered Pharmacist | LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>PLE post-exam timeline from results to RPh license</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_2)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-purple-900/20 to-purple-900/10 border border-purple-500/30 rounded-2xl p-6 text-center">
              <p className="text-purple-400 font-extrabold text-lg mb-2">Ready to Practice for the PLE?</p>
              <p className="text-gray-400 text-sm mb-4">
                Free practice questions for all five PLE subjects. No registration required.
              </p>
              <Link
                href="/pharmacy"
                className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Start Pharmacy Practice at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">Related Pharmacy Articles</h2>
              <ul className="space-y-3">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Pharmacy Study Guides</h3>
              <div className="space-y-4">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <Link key={href} href={href} className="group block">
                    <p className="text-gray-300 text-sm group-hover:text-yellow-400 transition-colors leading-snug">
                      {text}
                    </p>
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
