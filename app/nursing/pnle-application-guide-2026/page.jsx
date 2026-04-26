import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'How to Apply for PNLE via PRC LERIS 2026 Step by Step Guide Philippines',
  description:
    'Planning to take the nursing board exam? This step by step guide walks you through how to apply for the PNLE via PRC LERIS in 2026 including requirements and deadlines.',
  path: '/nursing/pnle-application-guide-2026',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Apply for PNLE via PRC LERIS 2026',
  description: 'Step by step guide to applying for the Philippine Nurse Licensure Examination via the PRC LERIS portal in 2026.',
  step: [
    { '@type': 'HowToStep', name: 'Go to PRC LERIS Portal', text: 'Visit online.prc.gov.ph on your browser.' },
    { '@type': 'HowToStep', name: 'Create or Log In to Account', text: 'Register with exact name from PSA Birth Certificate or log in to existing account.' },
    { '@type': 'HowToStep', name: 'Select PNLE Application', text: 'Go to Examination Application and select Philippine Nurse Licensure Examination.' },
    { '@type': 'HowToStep', name: 'Upload Photo and Documents', text: 'Upload 2x2 ID photo and required supporting documents.' },
    { '@type': 'HowToStep', name: 'Choose Schedule and Testing Center', text: 'Select preferred exam date and testing center. Apply early as slots fill fast.' },
    { '@type': 'HowToStep', name: 'Pay Examination Fee', text: 'Complete payment through accepted channels and save receipt.' },
    { '@type': 'HowToStep', name: 'Book Document Verification', text: 'Schedule appointment at nearest PRC office with original documents.' },
    { '@type': 'HowToStep', name: 'Download Notice of Admission', text: 'Download and print NOA from LERIS before exam day.' },
  ],
  author: { '@type': 'Organization', name: 'LisensyaPrep Team' },
  publisher: { '@type': 'Organization', name: 'LisensyaPrep' },
  datePublished: '2026-04-26',
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
Submitting your PNLE application correctly and on time is the first step toward sitting for the nursing board exam. The process is mostly online through the PRC LERIS portal, but it has specific requirements and deadlines that can trip up first-time applicants.

This guide walks you through every step so your application goes smoothly.

---

## PNLE Application Requirements

Prepare all of these before opening the LERIS portal. Starting the application without complete documents wastes time and risks errors.
`;

const MAIN_CONTENT = `
---

## Step by Step: Applying via PRC LERIS

### Step 1: Go to the PRC LERIS Portal

Open your browser and go to **online.prc.gov.ph**. This is the only official portal for PNLE applications. Do not apply through any other website or Facebook page.

### Step 2: Create or Log In to Your Account

If this is your first PRC application, create a new account using your email address. Use the exact name as it appears on your PSA Birth Certificate. Any mismatch between your application and your documents causes problems during verification.

If you already have a LERIS account from a previous application, simply log in.

### Step 3: Select PNLE Application

Navigate to Examination Application and select Philippine Nurse Licensure Examination from the list. Fill in all required fields carefully. Double check your personal information, school details, and contact information before proceeding.

### Step 4: Upload Your Photo and Documents

Upload your 2x2 ID photo using the built-in cropping tool. Make sure your face is properly centered. Upload any supporting documents requested by the system.

If your files are too large, compress them using TinyPNG or a similar free tool before uploading.

### Step 5: Choose Your Exam Schedule and Testing Center

Select your preferred exam date and testing center from the available slots. Testing center slots fill up quickly, especially in Metro Manila. Apply as early as the application window opens to secure your preferred location.

If your preferred center is already full, check other testing centers in nearby cities.

### Step 6: Pay the Examination Fee

Complete payment through one of the accepted channels listed in the portal. Save your payment receipt. You need it during document verification. The examination fee is non-refundable.

Check the current examination fee at prc.gov.ph as rates are updated periodically.

### Step 7: Book Your Document Verification Appointment

After payment, book a slot for physical document verification at your nearest PRC regional office. Bring all original documents plus photocopies. Originals are returned to you after verification.

### Step 8: Download Your Notice of Admission

A few days before your exam, log back into LERIS and download your Notice of Admission. Print it on white bond paper. Bring the physical printout to the exam. Screenshots on your phone are not accepted.

---

## PNLE Exam Schedule 2026

| Cycle | Exam Period | Application Window |
|-------|------------|-------------------|
| February 2026 | February 26 to 27, 2026 | November to December 2025 |
| August 2026 | August 2026 | May to June 2026 |

*Always verify exact dates at prc.gov.ph. PRC occasionally adjusts schedules.*

---

## Common PNLE Application Mistakes to Avoid

**Using a nickname instead of your legal name.** Your application must match your PSA Birth Certificate exactly. Even a single missing middle initial causes problems at document verification.

**Waiting until the final week to apply.** Testing center slots in NCR fill within days of the application window opening. Apply the first week the window opens.

**Submitting a photo that does not meet PRC specs.** Have your photo taken at a studio and specifically say it is for a PRC application. They know the exact requirements.

**Not following up on your application status.** After submitting, log in to LERIS regularly to check if your application has been approved, flagged, or if additional documents are required.

**Forgetting to download your NOA.** PRC does not mail the Notice of Admission. You must download and print it yourself from your LERIS account before exam day.

---

## While You Wait for Your Exam: Use This Time to Review

The window between submitting your application and exam day is your most important review period. Use every day of it.

LisensyaPrep has free reviewers and practice questions for all PNLE subjects organized by topic. Start with your weakest subject first.

**[Start Your PNLE Review at LisensyaPrep](https://lisensyaprep.com/nursing)**
`;

export default function PnleApplicationGuidePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-pnle-appguide" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">PNLE Application Guide 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (NLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                How to Apply for PNLE via PRC LERIS 2026 (Step by Step Guide)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>April 26, 2026</span><span>•</span>
                <span>7 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-nle-application-guide.jpg"
              alt="Young Filipino nurse in white uniform using laptop to apply for PNLE via PRC LERIS portal Philippines 2026"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="280" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">PNLE Application Requirements Checklist</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="34" fill="#1e3a5f" rx="5"/>
                  <text x="60" y="62" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">&#10003;</text>
                  <text x="90" y="62" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PSA Birth Certificate</text>
                  <text x="90" y="76" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Must be PSA-authenticated. Order at serbilis.psa.gov.ph. Allow 3 to 4 weeks for delivery.</text>
                  <rect x="40" y="90" width="680" height="34" fill="#172033" rx="5"/>
                  <text x="60" y="102" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">&#10003;</text>
                  <text x="90" y="102" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Official Transcript of Records (OTR) for BSN</text>
                  <text x="90" y="116" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">With school dry seal and registrar signature. Request at least 3 to 4 weeks before deadline.</text>
                  <rect x="40" y="130" width="680" height="34" fill="#1e3a5f" rx="5"/>
                  <text x="60" y="142" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">&#10003;</text>
                  <text x="90" y="142" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Certificate of Graduation or Diploma</text>
                  <text x="90" y="156" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Issued by your school. Check if PRC requires original or certified true copy for your cycle.</text>
                  <rect x="40" y="170" width="680" height="34" fill="#172033" rx="5"/>
                  <text x="60" y="182" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">&#10003;</text>
                  <text x="90" y="182" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Certificate of Good Moral Character</text>
                  <text x="90" y="196" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">From your school guidance office or registrar. Some cycles accept barangay-issued certificate.</text>
                  <rect x="40" y="210" width="680" height="34" fill="#1e3a5f" rx="5"/>
                  <text x="60" y="222" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">&#10003;</text>
                  <text x="90" y="222" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">2x2 ID Photos (white background, within last 3 months)</text>
                  <text x="90" y="236" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Formal attire, no eyeglasses. Have taken at a photo studio. Tell them it is for PRC.</text>
                  <rect x="40" y="250" width="680" height="24" fill="#172033" rx="5"/>
                  <text x="60" y="262" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">&#10003;</text>
                  <text x="90" y="262" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Valid Government-Issued ID (original plus photocopy)</text>
                  <text x="380" y="276" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">Always verify current requirements at prc.gov.ph before submitting. Requirements may change per cycle. LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>PNLE application requirements checklist</figcaption>
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
              <p className="text-pink-400 font-extrabold text-lg mb-2">Start Your PNLE Review While You Wait</p>
              <p className="text-gray-400 text-sm mb-4">Free practice questions for all NLE subjects. No account required.</p>
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
