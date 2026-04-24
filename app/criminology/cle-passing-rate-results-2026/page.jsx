import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'CLE Passing Rate and Results 2026 Philippines PRC Official Data',
  description:
    'What is the criminology board exam passing rate in 2026? Official PRC CLE results for February 2026 including total examinees, passers, and passing rate breakdown.',
  path: '/criminology/cle-passing-rate-results-2026',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'CLE Passing Rate and Results 2026 Philippines PRC Official Data',
  description:
    'Official PRC Criminologist Licensure Examination passing rate and results data for 2026 updated after every exam cycle.',
  image: 'https://lisensyaprep.com/images/articles/hero-cle-application-results.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-23',
  dateModified: '2026-04-23',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://lisensyaprep.com/criminology/cle-passing-rate-results-2026',
  },
};

const RELATED_ARTICLES = [
  { text: 'CLE Coverage 2026: Complete Subject Breakdown', href: '/criminology/cle-coverage-2026' },
  { text: 'How to Apply for CLE via PRC LERIS 2026', href: '/criminology/cle-application-guide-2026' },
  { text: 'How to Pass the Criminology Board Exam (CLE 2026)', href: '/blog/how-to-pass-criminology-board-exam' },
  { text: 'PRC Board Exam Retake Rules and Policies', href: '/blog/prc-board-exam-retake-rules' },
  { text: 'PRC Board Exam Passing Rate by Profession 2026', href: '/blog/prc-board-exam-passing-rate-by-profession' },
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
      elements.push(<p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />);
    }
  }
  const wrapped = [];
  let tableBuffer = [];
  let inTable = false;
  for (const el of elements) {
    if (el.type === 'tr') { inTable = true; tableBuffer.push(el); }
    else {
      if (inTable) { wrapped.push(<div key={`tbl-${key++}`} className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>); tableBuffer = []; inTable = false; }
      wrapped.push(el);
    }
  }
  if (inTable && tableBuffer.length) wrapped.push(<div key="tbl-final" className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>);
  return wrapped;
}

const INTRO = `
Knowing the passing rate before you sit for the CLE tells you what you are up against and helps you set a realistic goal for your review. This page tracks official PRC results for the Criminologist Licensure Examination and is updated after every exam cycle.
`;

const AFTER_STATS = `
---

## What the Passing Rate Means

A 65.99 percent passing rate means roughly 2 out of every 3 examinees who sat for the February 2026 CLE passed. Over 45,000 people took the exam in a single cycle and nearly 30,000 of them passed. That is an achievable exam for a well-prepared examinee.

The examinees who did not pass fall primarily into two groups. The first had a weak subject pulling below the 60 percent minimum threshold, dragging their result even if other subjects were strong. The second group did not complete a full structured review across all six subjects. Both of those are avoidable with the right preparation.

---

## Historical CLE Passing Rate Trend

CLE passing rates have historically hovered in the 60 to 70 percent range across most cycles. The rate tends to be slightly higher in February cycles than August cycles.

| Cycle | Passing Rate |
|-------|-------------|
| February 2026 | 65.99% |
| August 2025 | Check prc.gov.ph |
| February 2025 | Check prc.gov.ph |

*This table is updated after every official PRC results announcement.*

---

## How to Check If You Passed the CLE

PRC releases the official CLE passers list within 5 to 10 working days after the last exam day.

1. Go to prc.gov.ph and navigate to Board Results
2. Find the Criminologist Licensure Examination results for your cycle
3. Open the passers list PDF
4. Use Ctrl F or Command F to search for your surname

To check individual subject scores, log in to online.prc.gov.ph and use the Verification of Rating feature.

---

## If You Did Not Pass

Check your individual subject scores through LERIS first. Knowing which subjects you fell short in is the information you need to plan your retake. A targeted review of weak subjects is far more effective than reviewing everything from the beginning.

For the complete retake guide read [PRC Board Exam Retake Rules and Policies](/blog/prc-board-exam-retake-rules).

---

## After Passing: What Comes Next

**Oath Taking Ceremony.** Register for a slot through your LERIS account. This is where you formally take your oath as a licensed Criminologist.

**Initial Registration.** Apply for your PRC Certificate of Registration and Professional Identification Card through LERIS after oath taking.
`;

export default function ClePassingRatePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cle-results" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/criminology" className="text-gray-500 hover:text-gray-300 transition-colors">Criminology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">CLE Passing Rate 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400">Criminology (CLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                CLE Passing Rate and Results 2026 (February and August PRC Data)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>April 23, 2026</span><span>•</span>
                <span>6 min read</span>
              </div>
            </header>

            <img
              src="/images/articles/hero-cle-application-results.jpg"
              alt="PRC criminology board exam CLE passing rate and results data 2026 Philippines"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              loading="eager"
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <h2 className="text-2xl font-extrabold text-white mt-8 mb-4">CLE February 2026 Official Results</h2>
              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="160" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">CLE February 2026 Official PRC Results</text>
                  <line x1="60" y1="38" x2="700" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="70" y="50" width="180" height="74" fill="#1e3a5f" rx="8"/>
                  <text x="160" y="82" textAnchor="middle" fill="#f59e0b" fontSize="28" fontWeight="700" fontFamily="Arial,sans-serif">45,936</text>
                  <text x="160" y="102" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">Total Examinees</text>
                  <rect x="290" y="50" width="180" height="74" fill="#14532d" rx="8"/>
                  <text x="380" y="82" textAnchor="middle" fill="#86efac" fontSize="28" fontWeight="700" fontFamily="Arial,sans-serif">30,320</text>
                  <text x="380" y="102" textAnchor="middle" fill="#d1fae5" fontSize="12" fontFamily="Arial,sans-serif">Total Passers</text>
                  <rect x="510" y="50" width="180" height="74" fill="#78350f" rx="8"/>
                  <text x="600" y="82" textAnchor="middle" fill="#fcd34d" fontSize="28" fontWeight="700" fontFamily="Arial,sans-serif">65.99%</text>
                  <text x="600" y="102" textAnchor="middle" fill="#fef3c7" fontSize="12" fontFamily="Arial,sans-serif">Passing Rate</text>
                  <text x="380" y="148" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">Source: Professional Regulation Commission (prc.gov.ph) | LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Official CLE February 2026 results from PRC</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(AFTER_STATS)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-red-400 font-extrabold text-lg mb-2">Ready for the Next CLE Cycle?</p>
              <p className="text-gray-400 text-sm mb-4">LisensyaPrep has free practice questions for all six CLE subjects. No account required.</p>
              <Link href="/criminology" className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                ⚔️ Start Practicing at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">Related CLE Guides</h2>
              <ul className="space-y-3">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <li key={href}><Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link></li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">CLE Reviewer Series</h3>
              <div className="space-y-4">
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
