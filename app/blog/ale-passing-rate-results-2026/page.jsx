import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'ALE Passing Rate and Results 2026 Philippines PRC Official Data',
  description:
    'What is the agriculture board exam passing rate in 2026? This page tracks official PRC ALE results including total examinees, passers, and what to do after results are released.',
  path: '/blog/ale-passing-rate-results-2026',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'ALE Passing Rate and Results 2026 Philippines PRC Official Data',
  description:
    'Official PRC Agriculture Licensure Examination passing rate and results data for 2026, updated after every exam cycle with guidance on what to do after results are released.',
  image: 'https://lisensyaprep.com/images/articles/hero-ale-application-results.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/blog/ale-passing-rate-results-2026' },
};

const ALL_ALE_ARTICLES = [
  { text: 'How to Pass the Agriculture Board Exam on Your First Take', href: '/blog/how-to-pass-agriculture-board-exam' },
  { text: 'ALE Coverage 2026: Complete Subject Breakdown', href: '/blog/ale-coverage-2026' },
  { text: 'Animal Science Reviewer for ALE Philippines 2026', href: '/blog/animal-science-reviewer-ale' },
  { text: 'Plant Pathology and Crop Protection Reviewer for ALE 2026', href: '/blog/ale-crop-protection-reviewer' },
  { text: 'How to Apply for ALE via PRC LERIS 2026', href: '/blog/ale-application-guide-2026' },
  { text: 'ALE Passing Rate and Results 2026', href: '/blog/ale-passing-rate-results-2026' },
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
The Agriculture Licensure Examination is known for having one of the most variable passing rates among all PRC board exams. In some cycles it has surpassed 70 percent. In others it has fallen below 30 percent. Understanding what drives that variance helps you set realistic expectations and build the right study strategy.

This page tracks official PRC results for the ALE and is updated after every exam cycle.

---

## Why the ALE Passing Rate Varies So Much

Unlike board exams with fixed item distributions published in advance, the ALE coverage can shift in emphasis between cycles. One cycle may heavily test Crop Science and Soil Science. Another may emphasize Crop Protection and Agricultural Economics more. Examinees who reviewed broadly across all five subject areas consistently outperform those who focused narrowly on a few subjects.

The second factor is the examinee pool. When a cycle attracts many fresh graduates reviewing immediately after college, passing rates tend to be higher. When a cycle has more repeat takers or long-gap examinees, the pool composition changes.

---

## ALE Passing Rate Historical Data

| Cycle | Passing Rate |
|-------|-------------|
| Latest cycle 2026 | Check prc.gov.ph |
| Previous cycles | Check prc.gov.ph |

*This table is updated after every official PRC announcement. ALE results are released within 5 working days after the last exam day. Check prc.gov.ph and the official PRC social media pages for the latest announcement.*

---

## How to Check Your ALE Results
`;

const SECTION2 = `
**Step 1:** Go to prc.gov.ph and navigate to Board Results.

**Step 2:** Find the Agriculture Licensure Examination results for your cycle.

**Step 3:** Open the passers list PDF and use Ctrl F or Command F to search for your surname.

**Step 4:** To see your individual subject scores, log in to online.prc.gov.ph and use the Verification of Rating feature.

For the complete guide visit [https://lisensyaprep.com/guides/how-to-check-prc-board-exam-results](https://lisensyaprep.com/guides/how-to-check-prc-board-exam-results).

---

## After Passing: Becoming a Registered Agriculturist (RAg)

Passing the ALE gives you the right to use the title Registered Agriculturist (RAg) after your name. Here is what comes next.

**Oath Taking Ceremony:** Register for an oath taking slot through your LERIS account. The ceremony formally recognizes your professional status.

**Initial Registration:** Apply for your PRC Certificate of Registration and Professional Identification Card through LERIS. Your RAg license is required to practice agriculture professionally in the Philippines and is needed for most positions in government agricultural agencies like the DA and its attached bureaus.

**Professional Development:** The PRC requires licensed professionals to earn Continuing Professional Development (CPD) units to renew their license every 3 years.

---

## If You Did Not Pass: What to Do Next

**Check your individual subject scores through LERIS.** The Verification of Rating feature shows exactly which subjects pulled your result down. The most common failure pattern in the ALE is a weak performance in Crop Science which is the heaviest subject, or falling below 60 percent in one subject while averaging above 75 overall.

**Target your weak subjects specifically.** You do not need to review everything from scratch. Use your subject scores to build a targeted retake plan focused on the areas that cost you the most points.

For the complete retake guide visit [https://lisensyaprep.com/guides/prc-board-exam-retake-rules](https://lisensyaprep.com/guides/prc-board-exam-retake-rules).

---

## Ready to Start or Continue Your ALE Review?

LisensyaPrep has 300 free practice questions across 6 modules covering all ALE subject areas. No registration required.

**[Practice ALE Questions at LisensyaPrep](https://lisensyaprep.com/agriculture)**

---

## Related ALE Articles

- [ALE Coverage 2026 Complete Subject Breakdown](https://lisensyaprep.com/blog/ale-coverage-2026)
- [How to Apply for ALE via PRC LERIS 2026](https://lisensyaprep.com/blog/ale-application-guide-2026)
- [How to Pass the Agriculture Board Exam on Your First Take](https://lisensyaprep.com/blog/how-to-pass-agriculture-board-exam)
`;

export default function AlePassingRateResults2026Page() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-ale-passing-rate" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">ALE Passing Rate and Results 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-lime-500/10 text-lime-400">Agriculture (ALE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                ALE Passing Rate and Results 2026 Philippines (PRC Official Data)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>April 27, 2026</span><span>•</span>
                <span>6 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-ale-application-results.jpg"
              alt="Filipino female agriculture graduate at laptop for ALE passing rate and results 2026 Philippines"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="160" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="700" fontFamily="Georgia,serif">What Happens After You Take the ALE</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="46" y="52" width="140" height="80" fill="#1e3a5f" rx="8"/>
                  <text x="116" y="82" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">RESULTS</text>
                  <text x="116" y="100" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Within 5</text>
                  <text x="116" y="116" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">working days</text>
                  <line x1="190" y1="92" x2="210" y2="92" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="206,86 218,92 206,98" fill="#f59e0b"/>
                  <rect x="218" y="52" width="140" height="80" fill="#172033" rx="8"/>
                  <text x="288" y="82" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">VERIFY</text>
                  <text x="288" y="100" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Check scores</text>
                  <text x="288" y="116" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">via LERIS</text>
                  <line x1="362" y1="92" x2="382" y2="92" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="378,86 390,92 378,98" fill="#f59e0b"/>
                  <rect x="390" y="52" width="140" height="80" fill="#14532d" rx="8"/>
                  <text x="460" y="82" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">OATH TAKING</text>
                  <text x="460" y="100" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Register on</text>
                  <text x="460" y="116" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">LERIS for slot</text>
                  <line x1="534" y1="92" x2="554" y2="92" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="550,86 562,92 550,98" fill="#f59e0b"/>
                  <rect x="562" y="52" width="152" height="80" fill="#78350f" rx="8"/>
                  <text x="638" y="82" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PRC LICENSE</text>
                  <text x="638" y="100" textAnchor="middle" fill="#fef3c7" fontSize="11" fontFamily="Arial,sans-serif">Apply for RAg</text>
                  <text x="638" y="116" textAnchor="middle" fill="#fef3c7" fontSize="11" fontFamily="Arial,sans-serif">ID via LERIS</text>
                  <text x="380" y="150" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">RAg = Registered Agriculturist | LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>What happens after you take the ALE through to your RAg license</figcaption>
              </figure>

              {renderContent(SECTION2)}
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">All ALE Articles on LisensyaPrep</h2>
              <ul className="space-y-3">
                {ALL_ALE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-green-900/20 to-green-900/10 border border-green-500/30 rounded-2xl p-6 text-center">
              <p className="text-green-400 font-extrabold text-lg mb-2">Start Your ALE Review</p>
              <p className="text-gray-400 text-sm mb-4">Free practice questions for all ALE subject areas. No account required.</p>
              <Link href="/agriculture" className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                ⚔️ Start Practicing at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">ALE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_ALE_ARTICLES.map(({ text, href }) => (
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
