import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'How to Apply for PLE via PRC LERIS 2026 Step by Step Guide Philippines',
  description:
    'Planning to take the pharmacy board exam? This step by step guide walks you through how to apply for the PLE via PRC LERIS in 2026 including requirements, deadlines, and what to expect.',
  path: '/pharmacy/ple-application-guide-2026',
  image: '/images/articles/hero-pharmacy-application-results.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Apply for PLE via PRC LERIS 2026',
  description: 'Step by step guide to applying for the PRC Pharmacy Licensure Examination via the LERIS portal in 2026.',
  step: [
    { '@type': 'HowToStep', name: 'Go to PRC LERIS Portal', text: 'Visit online.prc.gov.ph.' },
    { '@type': 'HowToStep', name: 'Log In or Create Account', text: 'Use exact name from PSA Birth Certificate.' },
    { '@type': 'HowToStep', name: 'Select PLE Application', text: 'Navigate to Examination Application and select Pharmacy Licensure Examination.' },
    { '@type': 'HowToStep', name: 'Fill In Information', text: 'Complete all fields and verify educational details.' },
    { '@type': 'HowToStep', name: 'Upload Photo and Documents', text: 'Upload 2x2 photo and required supporting documents.' },
    { '@type': 'HowToStep', name: 'Choose Schedule', text: 'Select exam date and testing center. Apply early.' },
    { '@type': 'HowToStep', name: 'Pay Fee', text: 'Complete payment and save receipt.' },
    { '@type': 'HowToStep', name: 'Book Verification', text: 'Schedule appointment at nearest PRC office.' },
    { '@type': 'HowToStep', name: 'Download NOA', text: 'Print Notice of Admission before exam day.' },
  ],
  author: { '@type': 'Organization', name: 'LisensyaPrep Team' },
  publisher: { '@type': 'Organization', name: 'LisensyaPrep' },
  datePublished: '2026-05-02',
};

const RELATED_ARTICLES = [
  { text: 'PLE Coverage 2026 Complete Subject Breakdown', href: '/pharmacy/ple-coverage-2026' },
  { text: 'How to Pass the Pharmacy Board Exam Philippines', href: '/pharmacy/how-to-pass-pharmacy-board-exam' },
  { text: 'PLE Passing Rate and Results 2026', href: '/pharmacy/ple-passing-rate-results-2026' },
  { text: 'Pharmacology Reviewer PLE Philippines 2026', href: '/pharmacy/pharmacology-reviewer' },
  { text: 'Pharmaceutical Chemistry Reviewer PLE 2026', href: '/pharmacy/pharmaceutical-chemistry-reviewer' },
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
*By LisensyaPrep Team | Last Updated: May 2026 | 7-minute read*

---

The Pharmacy Licensure Examination application process runs entirely through the PRC LERIS portal. This guide walks you through every step so your application goes through on the first attempt without delays.

---

## PLE Application Requirements

Have all of these ready before opening the LERIS portal.
`;

const SECTION_2 = `
---

## Step by Step: Applying via PRC LERIS

**Step 1:** Go to online.prc.gov.ph. Log in or create your account using your exact PSA Birth Certificate name.

**Step 2:** Navigate to Examination Application and select Pharmacy Licensure Examination.

**Step 3:** Fill in your personal and educational information. Verify university name, degree, and graduation year.

**Step 4:** Upload your 2x2 photo and required documents. Compress large files before uploading.

**Step 5:** Choose your exam schedule and testing center. Apply the first week the window opens. Slots fill quickly in Metro Manila.

**Step 6:** Pay the examination fee through accepted channels. Save your receipt.

**Step 7:** Book your document verification appointment at your nearest PRC regional office. Bring originals and photocopies.

**Step 8:** Download and print your Notice of Admission from LERIS before exam day. Phone screenshots are not accepted.

---

## PLE Exam Schedule 2026

| | Details |
|-|---------|
| Exam cycles | Check prc.gov.ph for 2026 schedule |
| Application portal | online.prc.gov.ph |
| Requirements verification | Nearest PRC regional office |

*Always verify exact dates at prc.gov.ph and apply immediately when the window opens.*

---

## Common PLE Application Mistakes

**Name mismatch.** Use your legal name exactly as on your PSA Birth Certificate including your full middle name.

**Requesting OTR too late.** University registrars take 2 to 4 weeks. Request yours the moment you decide to take the exam.

**Not compressing upload files.** Large files cause upload errors. Use TinyPNG or similar tools before uploading.

---

## Start Reviewing While Your Application Is Pending

LisensyaPrep has free practice questions for all five PLE subjects. No account needed.

**[Start Your PLE Review at LisensyaPrep](https://lisensyaprep.com/pharmacy)**
`;

export default function PleApplicationGuide2026Page() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-ple-application" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/pharmacy","name":"Pharmacy"},{"url":"/pharmacy/ple-application-guide-2026","name":"PLE Application Guide 2026"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/pharmacy" className="text-gray-500 hover:text-gray-300 transition-colors">Pharmacy</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">PLE Application Guide 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">
                Pharmacy (PLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                How to Apply for PLE via PRC LERIS 2026 (Step by Step Guide)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>May 2, 2026</span>
                <span>•</span>
                <span>7 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-pharmacy-application-results.jpg"
                alt="Young Filipino male pharmacist in blazer at laptop for PLE application guide Philippines 2026"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="250" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">PLE Application Requirements Checklist</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="32" fill="#1e3a5f" rx="5"/>
                  <text x="60" y="62" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="62" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PSA Birth Certificate</text>
                  <text x="90" y="75" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">PSA-authenticated copy. Order at serbilis.psa.gov.ph. Allow 3 to 4 weeks for delivery.</text>
                  <rect x="40" y="88" width="680" height="32" fill="#172033" rx="5"/>
                  <text x="60" y="100" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="100" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Official Transcript of Records for BS Pharmacy</text>
                  <text x="90" y="113" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">With university dry seal and registrar signature. Request at least 3 to 4 weeks before deadline.</text>
                  <rect x="40" y="126" width="680" height="32" fill="#1e3a5f" rx="5"/>
                  <text x="60" y="138" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="138" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Certificate of Graduation or Diploma</text>
                  <text x="90" y="151" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Verify if PRC requires original or certified true copy for your specific exam cycle.</text>
                  <rect x="40" y="164" width="680" height="32" fill="#172033" rx="5"/>
                  <text x="60" y="176" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="176" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Certificate of Good Moral Character</text>
                  <text x="90" y="189" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">From your university registrar or guidance office.</text>
                  <rect x="40" y="202" width="680" height="32" fill="#1e3a5f" rx="5"/>
                  <text x="60" y="214" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="214" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">2x2 ID Photos and Valid Government-Issued ID</text>
                  <text x="90" y="227" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">White background, formal attire, no eyeglasses, taken within 3 months at a photo studio.</text>
                  <text x="380" y="244" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">Always verify current requirements at prc.gov.ph before submitting. | LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>PLE application requirements checklist</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_2)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-purple-900/20 to-purple-900/10 border border-purple-500/30 rounded-2xl p-6 text-center">
              <p className="text-purple-400 font-extrabold text-lg mb-2">Start Reviewing While You Wait</p>
              <p className="text-gray-400 text-sm mb-4">
                Free PLE practice questions for all five subjects. No registration required.
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
