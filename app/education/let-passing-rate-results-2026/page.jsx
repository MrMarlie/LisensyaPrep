import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'LET Passing Rate and Results 2026 Philippines PRC Official Data',
  description:
    'What is the LET board exam passing rate in 2026? This page tracks official PRC LET results including total examinees, passers, passing rates, and what to do after results are released.',
  path: '/education/let-passing-rate-results-2026',
  image: '/images/articles/hero-let-application-results.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LET Passing Rate and Results 2026 Philippines PRC Official Data',
  description:
    'Official PRC Licensure Examination for Teachers passing rate and results data for 2026, updated after every exam cycle with guidance on what to do after results are released.',
  image: 'https://lisensyaprep.com/images/articles/hero-let-application-results.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://lisensyaprep.com/education/let-passing-rate-results-2026',
  },
};

const RELATED_ARTICLES = [
  { text: 'LET Coverage 2026 Complete Subject Breakdown', href: '/education/let-coverage-2026' },
  { text: 'How to Apply for LET via PRC LERIS 2026', href: '/education/let-application-guide-2026' },
  { text: 'How to Pass the LET on Your First Take', href: '/education/how-to-pass-let-first-take' },
  { text: 'Professional Education Reviewer LET 2026', href: '/education/professional-education-reviewer' },
  { text: 'General Education Reviewer LET 2026', href: '/education/general-education-reviewer' },
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
        elements.push(
          <tr key={key++} className="border-b border-white/10">
            {cells.map((cell, ci) => (
              <th key={ci} className="px-4 py-2 text-left text-yellow-400 font-semibold text-sm">{cell.trim()}</th>
            ))}
          </tr>
        );
      } else if (!line.match(/^\|[-\s|]+\|$/)) {
        elements.push(
          <tr key={key++} className="border-b border-white/5">
            {cells.map((cell, ci) => (
              <td key={ci} className="px-4 py-2 text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: formatInline(cell.trim()) }} />
            ))}
          </tr>
        );
      }
    } else if (line.trim().startsWith('**') && line.includes('**')) {
      elements.push(
        <p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
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
*By LisensyaPrep Team | Last Updated: April 2026 | 6-minute read*

---

The LET consistently has one of the most variable passing rates among all PRC board exams. It ranges from roughly 30 to 50 percent depending on the cycle, the level (elementary vs secondary), and the specific subject majors represented in that cycle's examinee pool.

This page tracks official PRC results for the Licensure Examination for Teachers and is updated after every exam cycle.

---

## LET Passing Rate: What the Numbers Mean

The LET passing rate varies significantly between elementary and secondary levels and between different major subjects within the secondary level. An overall national passing rate of 35 percent does not mean every secondary major had a 35 percent passing rate. Some majors consistently perform above 50 percent while others fall below 30 percent in the same cycle.

This is important for your review strategy. If your major historically has a lower passing rate, it means you need to be especially thorough in both your subject knowledge and your Professional Education review.

---

## How to Check Your LET Results

PRC releases LET results up to 60 working days after the last exam day. The LET takes significantly longer than other boards because of the sheer volume of examinees and the complexity of scoring multiple levels and major subjects simultaneously.

**Step 1:** Go to prc.gov.ph and navigate to Board Results.

**Step 2:** Find the Licensure Examination for Teachers results for your cycle.

**Step 3:** Open the passers list PDF and use Ctrl F or Command F to search for your surname.

**Step 4:** To see your individual component scores, log in to online.prc.gov.ph and use Verification of Rating.

---

## LET Results Timeline 2026
`;

const SECTION_2 = `
---

## Why LET Results Take So Long

The LET is the largest PRC board exam in terms of examinees per cycle. Unlike other boards that test one profession, the LET simultaneously assesses multiple levels (elementary and secondary) and multiple major subjects within the secondary level. Each combination requires separate scoring parameters.

The 60 working day window allows PRC to process and verify results for what can be hundreds of thousands of examinees in a single cycle. Do not be alarmed if the wait feels long. It is normal for the LET.

---

## If You Passed: What Comes Next

**Take your Oath of Professional Teachers.** Register for an oath-taking ceremony through your LERIS account. This is a formal and meaningful ceremony where you take your oath as a Licensed Professional Teacher.

**Apply for Initial Registration.** After oath-taking, apply for your PRC Certificate of Registration and Professional Identification Card. Your LPT license is what allows you to practice teaching professionally in the Philippines.

**Update your credentials.** Add your LPT license number to your resume and professional documents. Many schools and DepEd hiring require this.

---

## If You Did Not Pass: Your Next Steps

Check your individual component scores through LERIS. The Verification of Rating feature shows exactly which component pulled your result down.

**If Professional Education was below 50%:** This is actually the most common reason LET examinees do not pass. Review our [Professional Education Reviewer](/education/professional-education-reviewer) and significantly increase the time you give this component in your retake review.

**If your major subject was below 50%:** Use the subject-specific major reviewers on LisensyaPrep and supplement with your college textbooks for the specific topics where you scored weakest.

**If your General Education was below 50%:** Identify which specific subject areas within GenEd caused the most problems and target them specifically.

---

## Ready to Start or Continue Your LET Review?

LisensyaPrep has free practice questions for all three LET components and all major subject specializations. No account needed.

**[Practice LET Questions at LisensyaPrep](/education)**

---

## Related LET Guides

- [LET Coverage 2026 Complete Subject Breakdown](/education/let-coverage-2026)
- [How to Apply for LET via PRC LERIS 2026](/education/let-application-guide-2026)
- [How to Pass the LET on Your First Take](/education/how-to-pass-let-first-take)
- [Professional Education Reviewer LET 2026](/education/professional-education-reviewer)
- [General Education Reviewer LET 2026](/education/general-education-reviewer)
`;

export default function LETPassingRatePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-let-results" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">LET Passing Rate and Results 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400">
                Education (LET)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                LET Passing Rate and Results 2026 Philippines (PRC Official Data)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 27, 2026</span>
                <span>•</span>
                <span>6 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-let-application-results.jpg"
                alt="Filipino female teacher using laptop for LET passing rate and results 2026 Philippines"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 160" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="160" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="700" fontFamily="Georgia,serif">LET Results and Post-Exam Timeline</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="46" y="52" width="150" height="80" fill="#1e3a5f" rx="8"/>
                  <text x="121" y="82" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">RESULTS</text>
                  <text x="121" y="98" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Up to 60</text>
                  <text x="121" y="114" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">working days</text>
                  <line x1="200" y1="92" x2="220" y2="92" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="216,86 228,92 216,98" fill="#f59e0b"/>
                  <rect x="228" y="52" width="150" height="80" fill="#172033" rx="8"/>
                  <text x="303" y="82" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">VERIFY</text>
                  <text x="303" y="98" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Check scores</text>
                  <text x="303" y="114" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">on LERIS</text>
                  <line x1="382" y1="92" x2="402" y2="92" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="398,86 410,92 398,98" fill="#f59e0b"/>
                  <rect x="410" y="52" width="150" height="80" fill="#14532d" rx="8"/>
                  <text x="485" y="82" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">OATH TAKING</text>
                  <text x="485" y="98" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Register on</text>
                  <text x="485" y="114" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">LERIS for slot</text>
                  <line x1="564" y1="92" x2="584" y2="92" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="580,86 592,92 580,98" fill="#f59e0b"/>
                  <rect x="592" y="52" width="128" height="80" fill="#78350f" rx="8"/>
                  <text x="656" y="82" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PRC LICENSE</text>
                  <text x="656" y="98" textAnchor="middle" fill="#fef3c7" fontSize="11" fontFamily="Arial,sans-serif">Apply for LPT</text>
                  <text x="656" y="114" textAnchor="middle" fill="#fef3c7" fontSize="11" fontFamily="Arial,sans-serif">ID via LERIS</text>
                  <text x="380" y="150" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | Note: LET results take up to 60 working days, significantly longer than other PRC boards</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>LET post-exam timeline from results to license</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_2)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Start or Continue Your LET Review</p>
              <p className="text-gray-400 text-sm mb-4">
                Free practice questions for all three LET components. No registration required.
              </p>
              <Link
                href="/education"
                className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Start LET Practice at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">Related LET Guides</h2>
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
              <h3 className="text-white font-bold mb-4">LET Study Guides</h3>
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
