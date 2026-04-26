import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'How to Apply for LET via PRC LERIS 2026 Step by Step Guide Philippines',
  description:
    'Planning to take the teaching board exam? This step by step guide walks you through how to apply for the LET via PRC LERIS in 2026 including requirements, deadlines, and what to do after submitting.',
  path: '/education/let-application-guide-2026',
  image: '/images/articles/hero-let-application-results.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Apply for LET via PRC LERIS 2026',
  description: 'Step by step guide to applying for the Licensure Examination for Teachers via the PRC LERIS portal in 2026.',
  step: [
    { '@type': 'HowToStep', name: 'Go to PRC LERIS Portal', text: 'Visit online.prc.gov.ph on your browser.' },
    { '@type': 'HowToStep', name: 'Create or Log In to Account', text: 'Register with exact name from PSA Birth Certificate or log in to existing account.' },
    { '@type': 'HowToStep', name: 'Select LET Application', text: 'Go to Examination Application, select LET, and specify Elementary or Secondary level.' },
    { '@type': 'HowToStep', name: 'Upload Photo and Documents', text: 'Upload 2x2 ID photo and required supporting documents.' },
    { '@type': 'HowToStep', name: 'Choose Schedule and Testing Center', text: 'Select preferred exam date and testing center. Apply early as slots fill fast.' },
    { '@type': 'HowToStep', name: 'Pay Examination Fee', text: 'Complete payment and save receipt.' },
    { '@type': 'HowToStep', name: 'Book Document Verification', text: 'Schedule appointment at nearest PRC office.' },
    { '@type': 'HowToStep', name: 'Download Notice of Admission', text: 'Download and print NOA from LERIS before exam day.' },
  ],
  author: { '@type': 'Organization', name: 'LisensyaPrep Team' },
  publisher: { '@type': 'Organization', name: 'LisensyaPrep' },
  datePublished: '2026-04-27',
};

const RELATED_ARTICLES = [
  { text: 'LET Coverage 2026 Complete Subject Breakdown', href: '/education/let-coverage-2026' },
  { text: 'How to Pass the LET on Your First Take', href: '/education/how-to-pass-let-first-take' },
  { text: 'LET Passing Rate and Results 2026', href: '/education/let-passing-rate-results-2026' },
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
*By LisensyaPrep Team | Last Updated: April 2026 | 7-minute read*

---

Applying for the Licensure Examination for Teachers is the first official step in your journey to becoming a licensed professional teacher in the Philippines. The process is mostly online through the PRC LERIS portal, but first-time applicants often run into problems with document requirements and missed deadlines.

This guide walks you through every step clearly.

---

## LET Application Requirements

Have all of these ready before starting your online application.
`;

const SECTION_2 = `
---

## Step by Step: Applying via PRC LERIS

**Step 1: Go to online.prc.gov.ph**
This is the only official portal. Do not apply through any other website or Facebook page.

**Step 2: Create or log in to your account**
Use the exact name from your PSA Birth Certificate. Any name mismatch causes problems at document verification.

**Step 3: Select LET Application**
Navigate to Examination Application and select Licensure Examination for Teachers. Specify whether you are taking Elementary or Secondary level.

**Step 4: Upload your photo and documents**
Upload your 2x2 ID photo using the built-in cropping tool. Upload required supporting documents. Compress large files using TinyPNG before uploading.

**Step 5: Choose your exam schedule and testing center**
Select your preferred exam date and testing center. Apply as early as the window opens. Slots fill quickly especially in Metro Manila, NCR, and Cebu.

**Step 6: Pay the examination fee**
Complete payment through accepted channels. Save your receipt. The fee is non-refundable.

**Step 7: Book your document verification appointment**
Schedule your physical verification at the nearest PRC regional office. Bring all original documents plus photocopies. Originals are returned after verification.

**Step 8: Download your Notice of Admission**
Log in to LERIS a few days before the exam and download your NOA. Print it on white bond paper. Phone screenshots are not accepted on exam day.

---

## LET Exam Schedule 2026

| Cycle | Exam Period | Application Window |
|-------|------------|-------------------|
| March 2026 | March 2026 | December 2025 to January 2026 |
| September 2026 | September 2026 | June to July 2026 |

*Always verify exact dates at prc.gov.ph. Verify early and apply immediately when the window opens.*

---

## Common LET Application Mistakes

**Name mismatch with PSA documents:** Use your legal name exactly as on your birth certificate.

**Waiting until the final week:** Slots fill fast. Apply the first week the window opens.

**Not specifying your level correctly:** Elementary and Secondary are different exams. Make sure you select the right one.

**Non-education degree applicants:** If your degree is not in education but you have taken professional education units, check specific documentary requirements with PRC as these differ from regular applicants.

---

## Start Reviewing While Your Application Is Pending

LisensyaPrep has free practice questions for all three LET components. No account needed.

**[Start Your LET Review at LisensyaPrep](/education)**

---

## Related LET Guides

- [LET Coverage 2026 Complete Subject Breakdown](/education/let-coverage-2026)
- [How to Pass the LET on Your First Take](/education/how-to-pass-let-first-take)
- [LET Passing Rate and Results 2026](/education/let-passing-rate-results-2026)
- [Professional Education Reviewer LET 2026](/education/professional-education-reviewer)
`;

export default function LETApplicationGuidePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-let-app" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">LET Application Guide 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400">
                Education (LET)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                How to Apply for LET via PRC LERIS 2026 (Step by Step Guide)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 27, 2026</span>
                <span>•</span>
                <span>7 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-let-application-results.jpg"
                alt="Young Filipino female teacher in blazer using laptop to apply for LET via PRC LERIS Philippines 2026"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="260" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">LET Application Requirements Checklist</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="32" fill="#1e3a5f" rx="5"/>
                  <text x="60" y="62" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="62" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PSA Birth Certificate</text>
                  <text x="90" y="75" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">PSA-authenticated copy. Order at serbilis.psa.gov.ph. Allow 3 to 4 weeks for delivery.</text>
                  <rect x="40" y="88" width="680" height="32" fill="#172033" rx="5"/>
                  <text x="60" y="100" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="100" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Official Transcript of Records (OTR) for Bachelor of Education or equivalent</text>
                  <text x="90" y="113" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">With school dry seal and registrar signature. Request at least 3 to 4 weeks before deadline.</text>
                  <rect x="40" y="126" width="680" height="32" fill="#1e3a5f" rx="5"/>
                  <text x="60" y="138" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="138" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Certificate of Graduation or Diploma</text>
                  <text x="90" y="151" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Check if PRC requires original or certified true copy for your specific cycle.</text>
                  <rect x="40" y="164" width="680" height="32" fill="#172033" rx="5"/>
                  <text x="60" y="176" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="176" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Certificate of Good Moral Character</text>
                  <text x="90" y="189" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Issued by your school registrar or guidance office. Some cycles accept barangay certificate.</text>
                  <rect x="40" y="202" width="680" height="32" fill="#1e3a5f" rx="5"/>
                  <text x="60" y="214" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="214" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">2x2 ID Photos (white background, formal attire, taken within 3 months)</text>
                  <text x="90" y="227" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Have taken at a photo studio. Tell them it is for a PRC application.</text>
                  <rect x="40" y="240" width="680" height="14" fill="#172033" rx="5"/>
                  <text x="90" y="251" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">✓  Valid Government-Issued ID (original plus photocopy front and back)</text>
                  <text x="380" y="258" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">Always verify current requirements at prc.gov.ph. Requirements may change per cycle. | LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>LET application requirements checklist</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_2)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Start Reviewing While You Wait</p>
              <p className="text-gray-400 text-sm mb-4">
                Free LET practice questions for all three components. No registration required.
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
