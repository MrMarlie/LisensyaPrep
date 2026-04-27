import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'How to Apply for ALE via PRC LERIS 2026 Step by Step Guide Philippines',
  description:
    'Planning to take the agriculture board exam? This step by step guide walks you through how to apply for the ALE via PRC LERIS in 2026 including requirements, deadlines, and common mistakes to avoid.',
  path: '/blog/ale-application-guide-2026',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Apply for ALE via PRC LERIS 2026',
  description: 'Step by step guide to applying for the PRC Agriculture Licensure Examination via the LERIS portal in 2026.',
  step: [
    { '@type': 'HowToStep', name: 'Go to PRC LERIS Portal', text: 'Visit online.prc.gov.ph on your browser.' },
    { '@type': 'HowToStep', name: 'Create or Log In to Account', text: 'Register with exact name from PSA Birth Certificate or log in to existing account.' },
    { '@type': 'HowToStep', name: 'Select ALE Application', text: 'Go to Examination Application and select Agriculture Licensure Examination.' },
    { '@type': 'HowToStep', name: 'Fill in Personal and Educational Information', text: 'Complete all fields carefully and verify university and course details.' },
    { '@type': 'HowToStep', name: 'Upload Photo and Documents', text: 'Upload 2x2 ID photo and required supporting documents.' },
    { '@type': 'HowToStep', name: 'Choose Schedule and Testing Center', text: 'Select preferred exam date and testing center. Apply early as slots fill fast.' },
    { '@type': 'HowToStep', name: 'Pay Examination Fee', text: 'Complete payment and save receipt.' },
    { '@type': 'HowToStep', name: 'Book Document Verification', text: 'Schedule appointment at nearest PRC office with original documents.' },
    { '@type': 'HowToStep', name: 'Download Notice of Admission', text: 'Download and print NOA from LERIS before exam day.' },
  ],
  author: { '@type': 'Organization', name: 'LisensyaPrep Team' },
  publisher: { '@type': 'Organization', name: 'LisensyaPrep' },
  datePublished: '2026-04-27',
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
The Agriculture Licensure Examination application process is straightforward once you know what documents to prepare and how the LERIS portal works. First-time applicants often lose time because they start the online application before gathering their documents, only to find out mid-process that something is missing.

This guide walks you through the complete process so your application goes through without delays.

---

## ALE Application Requirements

Prepare all of these before opening the LERIS portal.
`;

const SECTION2 = `
---

## Step by Step: Applying via PRC LERIS

**Step 1: Go to online.prc.gov.ph**
Use only the official PRC portal. Do not apply through any other website.

**Step 2: Create or log in to your account**
Register using the exact name on your PSA Birth Certificate. Any mismatch causes problems at document verification.

**Step 3: Select ALE Application**
Navigate to Examination Application and select Agriculture Licensure Examination from the list.

**Step 4: Fill in your personal and educational information**
Complete all fields carefully. Double check your university name, course, and graduation year before proceeding.

**Step 5: Upload your photo and documents**
Upload your 2x2 ID photo using the built-in cropping tool. Upload supporting documents as required. Compress large files before uploading using TinyPNG or similar.

**Step 6: Choose your exam schedule and testing center**
Select your preferred exam date and testing center. Slots in Metro Manila and major cities fill fastest. Apply the first week the window opens.

**Step 7: Pay the examination fee**
Complete payment through accepted payment channels. Save your receipt. The fee is non-refundable.

**Step 8: Book your document verification appointment**
Schedule physical document verification at your nearest PRC regional office. Bring originals and photocopies. Originals are returned after verification.

**Step 9: Download and print your Notice of Admission**
Log into LERIS a few days before the exam and download your NOA. Print on white bond paper. Phone screenshots are not accepted on exam day.

---

## ALE Exam Schedule 2026

| Cycle | Typical Exam Period | Application Window |
|-------|--------------------|--------------------|
| First cycle 2026 | Check prc.gov.ph | Opens months before |
| Second cycle 2026 | Check prc.gov.ph | Opens months before |

*ALE is typically administered twice a year. Always verify exact dates at prc.gov.ph as PRC announces schedules in advance. Apply immediately when the window opens.*

---

## Common ALE Application Mistakes

**Using a nickname or informal name.** Your application name must exactly match your PSA Birth Certificate, including your full middle name.

**Submitting a non-PSA birth certificate.** Local civil registry copies are not accepted. It must be the PSA-issued copy.

**Waiting too long to request your OTR.** University registrars can take 2 to 4 weeks to process OTRs. Request yours as soon as you decide to take the exam.

**Choosing a testing center that fills up.** NCR and Davao centers typically fill first. Check all available centers in your region and apply early.

---

## Start Reviewing While Your Application Is Pending

The window between submitting your application and exam day is your most valuable review time. LisensyaPrep has 300 free practice questions for the ALE covering all five subject areas. No account needed.

**[Start Your ALE Review at LisensyaPrep](https://lisensyaprep.com/agriculture)**

---

## Related ALE Articles

- [ALE Coverage 2026 Complete Subject Breakdown](https://lisensyaprep.com/blog/ale-coverage-2026)
- [How to Pass the Agriculture Board Exam on Your First Take](https://lisensyaprep.com/blog/how-to-pass-agriculture-board-exam)
- [ALE Passing Rate and Results 2026](https://lisensyaprep.com/blog/ale-passing-rate-results-2026)
`;

export default function AleApplicationGuide2026Page() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-ale-application" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">ALE Application Guide 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-lime-500/10 text-lime-400">Agriculture (ALE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                How to Apply for ALE via PRC LERIS 2026 (Step by Step Guide)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>April 27, 2026</span><span>•</span>
                <span>7 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-ale-application-results.jpg"
              alt="Young Filipino female agriculture graduate in navy blazer at laptop for ALE application guide Philippines 2026"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="280" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">ALE Application Requirements Checklist</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="36" fill="#14532d" rx="5"/>
                  <text x="60" y="64" fill="#86efac" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="64" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PSA Birth Certificate</text>
                  <text x="90" y="78" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">PSA-authenticated copy only. Order at serbilis.psa.gov.ph. Allow 3 to 4 weeks for delivery.</text>
                  <rect x="40" y="92" width="680" height="36" fill="#1e3a5f" rx="5"/>
                  <text x="60" y="106" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="106" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Official Transcript of Records (OTR) for Bachelor of Science in Agriculture</text>
                  <text x="90" y="120" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">With university dry seal and registrar signature. Request at least 3 to 4 weeks before the application deadline.</text>
                  <rect x="40" y="134" width="680" height="36" fill="#172033" rx="5"/>
                  <text x="60" y="148" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="148" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Certificate of Graduation or Diploma</text>
                  <text x="90" y="162" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Issued by your university. Check if PRC requires original or certified true copy for your specific cycle.</text>
                  <rect x="40" y="176" width="680" height="36" fill="#1e3a5f" rx="5"/>
                  <text x="60" y="190" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="190" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Certificate of Good Moral Character</text>
                  <text x="90" y="204" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">From your university registrar or guidance office. Some cycles accept a barangay-issued certificate.</text>
                  <rect x="40" y="218" width="680" height="36" fill="#172033" rx="5"/>
                  <text x="60" y="232" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="232" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">2x2 ID Photos (white background, formal attire, taken within 3 months)</text>
                  <text x="90" y="246" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Have taken at a photo studio and mention it is for a PRC application. No eyeglasses.</text>
                  <rect x="40" y="260" width="680" height="14" fill="#1e3a5f" rx="5"/>
                  <text x="90" y="271" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">✓  Valid Government-Issued ID (original plus photocopy front and back)</text>
                  <text x="380" y="278" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">Always verify current requirements at prc.gov.ph before submitting. | LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>ALE application requirements checklist</figcaption>
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
