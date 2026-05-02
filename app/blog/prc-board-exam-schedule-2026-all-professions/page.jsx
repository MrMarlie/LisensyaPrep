import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Complete PRC Board Exam Schedule 2026 All Professions Philippines',
  description:
    'What is the PRC board exam schedule for 2026? Complete schedule for all major PRC licensure examinations in the Philippines including nursing, criminology, LET, pharmacy, medical technology, and agriculture.',
  path: '/blog/prc-board-exam-schedule-2026-all-professions',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Complete PRC Board Exam Schedule 2026: All Professions Philippines',
  description:
    'Complete 2026 PRC board exam schedule for all major licensure examinations in the Philippines including PNLE, CLE, LET, PLE, MTLE, and ALE with application window guidance.',
  image: 'https://lisensyaprep.com/images/articles/hero-roundup-prc-schedule-2026.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-02',
  dateModified: '2026-05-02',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/blog/prc-board-exam-schedule-2026-all-professions' },
};

const ALL_ROUNDUP_ARTICLES = [
  { text: 'Best Free PRC Board Exam Reviewer Websites 2026', href: '/blog/best-free-prc-board-exam-reviewer-websites-2026' },
  { text: 'Review Center vs Self-Review: Which is Better?', href: '/blog/review-center-vs-self-review-which-is-better' },
  { text: 'Complete PRC Board Exam Schedule 2026', href: '/blog/prc-board-exam-schedule-2026-all-professions' },
  { text: 'Top Performing Schools in PRC Board Exams 2025', href: '/blog/top-performing-schools-prc-board-exams-2025' },
  { text: 'PRC Board Exam Tips That Actually Work', href: '/blog/prc-board-exam-tips-that-actually-work' },
  { text: 'How to Study While Working Full-Time', href: '/blog/how-to-study-prc-board-exam-while-working-full-time' },
  { text: 'PRC Board Exam Anxiety: How to Stay Calm', href: '/blog/prc-board-exam-anxiety-how-to-stay-calm' },
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
    } else if (line.match(/^\d+\. /)) {
      elements.push(
        <li key={key++} className="text-gray-300 text-sm ml-4 mb-1 flex items-start gap-2">
          <span className="text-yellow-400 mt-1 flex-shrink-0">{line.match(/^(\d+)\./)[1]}.</span>
          <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, '')) }} />
        </li>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(<p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />);
    }
  }
  return elements;
}

const BEFORE_SVG = `
---

Planning your PRC board exam review requires knowing exactly when your exam is scheduled. This page compiles the 2026 exam schedule for all major PRC licensure examinations in the Philippines.

**Important:** Always verify current schedules at the official PRC website at prc.gov.ph. PRC occasionally adjusts schedules and only the official website carries the authoritative information.

---

## How PRC Announces Board Exam Schedules

PRC releases board exam schedules through the PRC website (prc.gov.ph), the PRC Facebook page, and official press releases. Schedules are typically announced months in advance but exact dates can shift due to administrative or operational reasons.

The safest approach is to check prc.gov.ph directly and set up notifications through LERIS so you are immediately informed when application windows open.

---

## 2026 Board Exam Schedules by Profession
`;

const AFTER_SVG = `
---

## How Far in Advance Should You Start Reviewing?

**3 months minimum** for most board exams if you are a recent graduate reviewing full-time.

**4 to 5 months** if you are working full-time and can only study 2 to 3 hours daily.

**5 to 6 months** if you have been out of school for more than 2 years and need a full refresher.

Use the exam schedule to count backwards from your exam date and determine when to start reviewing.

---

## Application Windows

Application windows typically open 2 to 3 months before the exam date. They close weeks before the exam. Slots in major testing centers fill within the first week of opening.

**The most important rule:** Apply the first week the application window opens. Do not wait.

Check your LERIS account notifications and the official PRC social media pages so you know the moment the application window opens for your exam.

---

## Planning Your Review Around the Schedule

Once you confirm your exam date, do the following immediately:

1. Count the weeks available for review
2. Divide subjects by the available weeks (weakest subjects get the most time)
3. Schedule your diagnostic quiz for Week 1
4. Block your calendar for study time the way you would block work meetings

**[Start Your Review at LisensyaPrep](https://lisensyaprep.com)**

---

## Related Articles

- [Paano Mag-apply ng PRC Board Exam Online 2026](https://lisensyaprep.com/blog/paano-mag-apply-prc-board-exam-online)
- [Best Free PRC Board Exam Reviewer Websites 2026](https://lisensyaprep.com/blog/best-free-prc-board-exam-reviewer-websites-2026)
- [PRC Board Exam Tips That Actually Work](https://lisensyaprep.com/blog/prc-board-exam-tips-that-actually-work)
`;

export default function PrcBoardExamSchedule2026Page() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-prc-schedule-2026" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">PRC Board Exam Schedule 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">PRC Guides</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Complete PRC Board Exam Schedule 2026: All Professions Philippines
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 2, 2026</span><span>•</span>
                <span>7 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-roundup-prc-schedule-2026.jpg"
              alt="Young Filipino female student in mustard blouse holding open planner for PRC board exam schedule 2026 Philippines"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(BEFORE_SVG)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="380" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">PRC Board Exam Schedule 2026 Key Cycles</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="200" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">EXAMINATION</text>
                  <text x="460" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">TYPICAL 2026 CYCLES</text>
                  <text x="650" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">VERIFY AT</text>
                  <line x1="40" y1="64" x2="720" y2="64" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="70" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="200" y="90" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PNLE (Nursing)</text>
                  <text x="460" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">February and August</text>
                  <text x="650" y="90" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">prc.gov.ph</text>
                  <rect x="40" y="106" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="200" y="126" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">CLE (Criminology)</text>
                  <text x="460" y="126" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">February and August</text>
                  <text x="650" y="126" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">prc.gov.ph</text>
                  <rect x="40" y="142" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="200" y="162" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">LET (Teachers)</text>
                  <text x="460" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">March and September</text>
                  <text x="650" y="162" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">prc.gov.ph</text>
                  <rect x="40" y="178" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="200" y="198" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PLE (Pharmacy)</text>
                  <text x="460" y="198" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">June and November (verify)</text>
                  <text x="650" y="198" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">prc.gov.ph</text>
                  <rect x="40" y="214" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="200" y="234" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">MTLE (Medical Technology)</text>
                  <text x="460" y="234" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">February and August</text>
                  <text x="650" y="234" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">prc.gov.ph</text>
                  <rect x="40" y="250" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="200" y="270" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">ALE (Agriculture)</text>
                  <text x="460" y="270" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Check prc.gov.ph for 2026 dates</text>
                  <text x="650" y="270" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">prc.gov.ph</text>
                  <rect x="40" y="286" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="200" y="306" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Engineering (CE, ME, EE)</text>
                  <text x="460" y="306" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">May and November typically</text>
                  <text x="650" y="306" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">prc.gov.ph</text>
                  <rect x="40" y="322" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="200" y="342" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">CPA (Accountancy)</text>
                  <text x="460" y="342" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">May and October typically</text>
                  <text x="650" y="342" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">prc.gov.ph</text>
                  <text x="380" y="372" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">⚠ Always verify exact dates at prc.gov.ph before planning your review schedule</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>PRC board exam 2026 schedule by profession — always verify at prc.gov.ph</figcaption>
              </figure>

              {renderContent(AFTER_SVG)}
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">PRC Guides Series</h2>
              <ul className="space-y-3">
                {ALL_ROUNDUP_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Start Your Review Now</p>
              <p className="text-gray-400 text-sm mb-4">Free practice questions for all major PRC board exams. No account required.</p>
              <Link href="/" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-xl transition-colors">
                ⚔️ Start Practicing at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">PRC Guides Series</h3>
              <div className="space-y-3">
                {ALL_ROUNDUP_ARTICLES.map(({ text, href }) => (
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
