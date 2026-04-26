import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'PNLE Passing Rate and Results 2026 Philippines PRC Official Data',
  description:
    'What is the nursing board exam passing rate in 2026? Official PRC PNLE results for February 2026 including total examinees, passers, passing rate, and what to do after results are released.',
  path: '/nursing/pnle-passing-rate-results-2026',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'PNLE Passing Rate and Results 2026 Philippines PRC Official Data',
  description:
    'Official PRC Philippine Nurse Licensure Examination passing rate and results data for 2026, updated after every exam cycle with total examinees, passers, and what to do after results are released.',
  image: 'https://lisensyaprep.com/images/articles/hero-nle-passing-rate-results.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-26',
  dateModified: '2026-04-26',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/pnle-passing-rate-results-2026' },
};

const ALL_NLE_ARTICLES = [
  { text: 'PNLE Coverage 2026 Complete Topic Breakdown', href: '/nursing/pnle-coverage-2026' },
  { text: 'Community Health Nursing Reviewer NLE 2026', href: '/nursing/community-health-nursing-reviewer' },
  { text: 'Medical-Surgical Nursing Reviewer NLE 2026', href: '/nursing/medical-surgical-nursing-reviewer' },
  { text: 'Psychiatric Nursing Reviewer NLE 2026', href: '/nursing/psychiatric-nursing-reviewer' },
  { text: 'Maternal and Child Nursing Reviewer NLE 2026', href: '/nursing/maternal-child-nursing-reviewer' },
  { text: 'PNLE 3-Month Study Plan 2026', href: '/nursing/pnle-3-month-study-plan' },
  { text: 'PNLE Application Guide 2026', href: '/nursing/pnle-application-guide-2026' },
  { text: 'PNLE Passing Rate and Results 2026', href: '/nursing/pnle-passing-rate-results-2026' },
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
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />);
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
  let listBuffer = [];
  let inTable = false;
  let inList = false;
  for (const el of elements) {
    if (el.type === 'tr') {
      if (inList) { wrapped.push(<ul key={`ul-${key++}`} className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>); listBuffer = []; inList = false; }
      inTable = true; tableBuffer.push(el);
    } else if (el.type === 'li') {
      if (inTable) { wrapped.push(<div key={`tbl-${key++}`} className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>); tableBuffer = []; inTable = false; }
      inList = true; listBuffer.push(el);
    } else {
      if (inTable) { wrapped.push(<div key={`tbl-${key++}`} className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>); tableBuffer = []; inTable = false; }
      if (inList) { wrapped.push(<ul key={`ul-${key++}`} className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>); listBuffer = []; inList = false; }
      wrapped.push(el);
    }
  }
  if (inTable && tableBuffer.length) wrapped.push(<div key="tbl-final" className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>);
  if (inList && listBuffer.length) wrapped.push(<ul key="ul-final" className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>);
  return wrapped;
}

const INTRO = `
Knowing the PNLE passing rate before you sit for the exam puts the challenge in perspective. The numbers tell a story about what kind of preparation actually works and how achievable the exam is for a well-prepared examinee.

This page tracks the official PRC results for the Philippine Nurse Licensure Examination and is updated after every exam cycle.

---

## PNLE February 2026 Official Results
`;

const AFTER_SVG1 = `
---

## Understanding the 44.24 Percent Passing Rate

The first thing most nursing graduates think when they see 44.24 percent is that the NLE is extremely difficult. That reading is not quite right.

The 44.24 percent rate includes every single person who sat for the February 2026 PNLE, including those who barely reviewed, those who reviewed informally for only a few weeks, those who took it on their third or fourth attempt, and those who had significant gaps between graduation and the exam.

Among examinees who followed a structured 3-month review plan, practiced consistently, and covered all subject areas, the passing rate is considerably higher than the national average. The national figure brings everyone into one pool.

What the 44.24 percent rate tells you is this: do not go into the NLE underprepared. But if you are prepared, you are not competing against an impossibly high bar.

---

## PNLE Passing Rate Historical Trend

PNLE passing rates have historically varied between 40 and 55 percent depending on the cycle. February cycles tend to attract more first-time takers who are fresh graduates, while August cycles attract more repeat takers.

| Cycle | Passing Rate |
|-------|-------------|
| February 2026 | 44.24% |
| August 2025 | Check prc.gov.ph |
| February 2025 | Check prc.gov.ph |

*This table is updated after every official PRC announcement. Check back after each cycle for the latest figures.*

---

## How to Check Your PNLE Results

PRC releases the official PNLE passers list within 5 working days after the last day of the exam. Here is how to check:

**Step 1:** Go to prc.gov.ph and navigate to the Board Results section.

**Step 2:** Find the Philippine Nurse Licensure Examination results for your cycle.

**Step 3:** Open the passers list PDF and use Ctrl F or Command F to search for your surname.

**Step 4:** To see your individual subject scores, log in to online.prc.gov.ph and use the Verification of Rating feature.

---

## Results Release Timeline
`;

const MAIN_CONTENT = `
---

## If You Passed: What Comes Next

Finding your name on the PNLE passers list is one of the best moments of your professional life. Here is what to do immediately after.

**Register for the Oath Taking Ceremony.** PRC schedules oath taking ceremonies for new passers shortly after results are released. Log in to your LERIS account and register for a slot. This is where you formally take your oath as a Registered Nurse.

**Apply for Initial Registration.** After oath taking, apply for your PRC Certificate of Registration and Professional Identification Card through LERIS. Your PRC ID is what makes you officially licensed to practice nursing in the Philippines.

**Update your resume and start applying.** Philippine hospitals and health facilities, as well as international recruitment agencies, require your PRC license number. Your career as a registered nurse starts the moment that license is in your hands.

---

## If You Did Not Pass: What to Do Next

Not seeing your name on the passers list is difficult. Take a day to process it. Then do this:

**Check your individual subject scores on LERIS.** The Verification of Rating feature shows you exactly how you performed in each subject. Knowing which subjects pulled you down is the most important information you need to plan your retake.

**Identify your pattern.** Did one subject fall below 60 percent and pull your result down despite a good overall average? Or was your general average below 75 across the board? The answer determines your retake strategy completely.

**Plan your retake.** The next PNLE cycle is typically 6 months away. That is enough time for a focused, targeted review that addresses specifically what went wrong. You do not have to review everything again from scratch.

---

## Ready to Start or Continue Your Review?

Whether you are preparing for your first attempt or planning a retake, LisensyaPrep has free practice questions for every PNLE subject. No account needed.

**[Practice PNLE Questions at LisensyaPrep](https://lisensyaprep.com/nursing)**
`;

export default function PnlePassingRateResultsPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-pnle-results" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">PNLE Passing Rate and Results 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (NLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                PNLE Passing Rate and Results 2026 Philippines (PRC Official Data)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>April 26, 2026</span><span>•</span>
                <span>6 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-nle-passing-rate-results.jpg"
              alt="Filipino nurse in white uniform with stethoscope holding documents and smiling for PNLE passing rate results 2026 Philippines"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="200" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">PNLE February 2026 Official PRC Results</text>
                  <line x1="60" y1="38" x2="700" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="70" y="52" width="180" height="100" fill="#1e3a5f" rx="8"/>
                  <text x="160" y="90" textAnchor="middle" fill="#f59e0b" fontSize="30" fontWeight="700" fontFamily="Arial,sans-serif">8,162</text>
                  <text x="160" y="114" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">Total Examinees</text>
                  <text x="160" y="132" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">February 2026</text>
                  <rect x="290" y="52" width="180" height="100" fill="#14532d" rx="8"/>
                  <text x="380" y="90" textAnchor="middle" fill="#86efac" fontSize="30" fontWeight="700" fontFamily="Arial,sans-serif">3,611</text>
                  <text x="380" y="114" textAnchor="middle" fill="#d1fae5" fontSize="12" fontFamily="Arial,sans-serif">Total Passers</text>
                  <text x="380" y="132" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">February 2026</text>
                  <rect x="510" y="52" width="180" height="100" fill="#78350f" rx="8"/>
                  <text x="600" y="90" textAnchor="middle" fill="#fcd34d" fontSize="30" fontWeight="700" fontFamily="Arial,sans-serif">44.24%</text>
                  <text x="600" y="114" textAnchor="middle" fill="#fef3c7" fontSize="12" fontFamily="Arial,sans-serif">Passing Rate</text>
                  <text x="600" y="132" textAnchor="middle" fill="#fcd34d" fontSize="10" fontFamily="Arial,sans-serif">February 2026</text>
                  <text x="380" y="172" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="Arial,sans-serif">Results released within 5 working days after last exam day</text>
                  <text x="380" y="190" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">Source: Professional Regulation Commission (prc.gov.ph) | LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Official PNLE February 2026 results from PRC</figcaption>
              </figure>

              {renderContent(AFTER_SVG1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 180" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="180" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="700" fontFamily="Georgia,serif">What Happens After You Take the PNLE</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <circle cx="100" cy="90" r="24" fill="#1e3a5f"/>
                  <text x="100" y="86" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">DAY</text>
                  <text x="100" y="100" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">1 to 5</text>
                  <text x="100" y="132" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Results</text>
                  <text x="100" y="146" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">released</text>
                  <line x1="128" y1="90" x2="192" y2="90" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="188,84 200,90 188,96" fill="#f59e0b"/>
                  <circle cx="220" cy="90" r="24" fill="#172033"/>
                  <text x="220" y="86" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">VERIFY</text>
                  <text x="220" y="100" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">RATING</text>
                  <text x="220" y="132" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Check scores</text>
                  <text x="220" y="146" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">on LERIS</text>
                  <line x1="248" y1="90" x2="312" y2="90" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="308,84 320,90 308,96" fill="#f59e0b"/>
                  <circle cx="340" cy="90" r="24" fill="#14532d"/>
                  <text x="340" y="86" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">OATH</text>
                  <text x="340" y="100" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">TAKING</text>
                  <text x="340" y="132" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">Register on</text>
                  <text x="340" y="146" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">LERIS for slot</text>
                  <line x1="368" y1="90" x2="432" y2="90" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="428,84 440,90 428,96" fill="#f59e0b"/>
                  <circle cx="460" cy="90" r="24" fill="#1e3a5f"/>
                  <text x="460" y="86" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">INITIAL</text>
                  <text x="460" y="100" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">REG.</text>
                  <text x="460" y="132" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Apply for PRC</text>
                  <text x="460" y="146" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">ID via LERIS</text>
                  <line x1="488" y1="90" x2="552" y2="90" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="548,84 560,90 548,96" fill="#f59e0b"/>
                  <circle cx="580" cy="90" r="24" fill="#78350f"/>
                  <text x="580" y="86" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">PRC</text>
                  <text x="580" y="100" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">LICENSE</text>
                  <text x="580" y="132" textAnchor="middle" fill="#fef3c7" fontSize="10" fontFamily="Arial,sans-serif">Receive your</text>
                  <text x="580" y="146" textAnchor="middle" fill="#fef3c7" fontSize="10" fontFamily="Arial,sans-serif">RN license</text>
                  <text x="380" y="170" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>What happens after you take the PNLE</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(MAIN_CONTENT)}
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">Related NLE Articles</h2>
              <ul className="space-y-3">
                {ALL_NLE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-pink-900/20 to-pink-900/10 border border-pink-500/30 rounded-2xl p-6 text-center">
              <p className="text-pink-400 font-extrabold text-lg mb-2">Practice for the PNLE Now</p>
              <p className="text-gray-400 text-sm mb-4">Free NLE practice questions for all subjects. No account required.</p>
              <Link href="/nursing" className="inline-block bg-pink-500 hover:bg-pink-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">NLE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_NLE_ARTICLES.map(({ text, href }) => (
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
