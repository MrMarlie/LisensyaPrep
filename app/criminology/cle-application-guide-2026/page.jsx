import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

const _cleAppMeta = buildMetadata({
  title: 'CLE Requirements 2026: How to Apply for the Criminology Board Exam',
  description:
    'Complete CLE requirements and step-by-step application guide for 2026. Covers documents needed, PRC LERIS walkthrough, exam schedule, and deadlines for the August 2026 criminology board exam.',
  path: '/criminology/cle-application-guide-2026',
});
const _cleAppTitle = 'CLE Requirements 2026: How to Apply for the Criminology Board Exam | LisensyaPrep';
export const metadata = {
  ..._cleAppMeta,
  title: { absolute: _cleAppTitle },
  openGraph: { ..._cleAppMeta.openGraph, title: _cleAppTitle },
  twitter: { ..._cleAppMeta.twitter, title: _cleAppTitle },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Apply for CLE via PRC LERIS 2026',
  description: 'Step by step guide to applying for the PRC Criminologist Licensure Examination via the LERIS portal in 2026.',
  step: [
    { '@type': 'HowToStep', name: 'Create or Log In to LERIS', text: 'Go to online.prc.gov.ph and log in or create your account.' },
    { '@type': 'HowToStep', name: 'Select CLE Application', text: 'Go to Examination Application and select the Criminologist Licensure Examination.' },
    { '@type': 'HowToStep', name: 'Upload Documents and Photo', text: 'Upload your 2x2 photo and required supporting documents.' },
    { '@type': 'HowToStep', name: 'Choose Schedule and Testing Center', text: 'Select your preferred exam date and testing center slot.' },
    { '@type': 'HowToStep', name: 'Pay Fee and Book Verification', text: 'Complete payment, save receipt, and book your document verification appointment.' },
  ],
  author: { '@type': 'Organization', name: 'LisensyaPrep Team' },
  publisher: { '@type': 'Organization', name: 'LisensyaPrep' },
  datePublished: '2026-04-23',
};

const RELATED_ARTICLES = [
  { text: 'CLE Coverage 2026: Complete Subject Breakdown', href: '/criminology/cle-coverage-2026' },
  { text: 'How to Pass the Criminology Board Exam (CLE 2026)', href: '/blog/how-to-pass-criminology-board-exam' },
  { text: 'CLE Passing Rate and Results 2026', href: '/criminology/cle-passing-rate-results-2026' },
  { text: 'What to Bring on PRC Board Exam Day', href: '/blog/what-to-bring-prc-board-exam-day' },
  { text: 'PRC Board Exam Schedule 2026 for All Professions', href: '/blog/prc-board-exam-schedule-2026' },
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

const REQUIREMENTS = `
Getting your CLE application right requires attention to detail. The LERIS portal has made the process mostly online, which is convenient, but mistakes in your application can create delays that cost you your spot in the next exam cycle. This guide walks you through the entire process step by step.

---

## CLE Application Requirements

Gather all documents before touching the LERIS portal.

**PSA Birth Certificate.** Must be from the Philippine Statistics Authority. Order from serbilis.psa.gov.ph and allow at least 3 to 4 weeks for delivery.

**Official Transcript of Records (OTR).** Issued by your university registrar with school dry seal and signature. Universities typically take 2 to 4 weeks. Request early.

**Certificate of Graduation or Diploma.** Check whether PRC requires original, certified true copy, or photocopy for your specific cycle.

**Certificate of Good Moral Character.** Usually from your school guidance office or registrar. Some PRC cycles accept a barangay-issued certificate.

**2x2 ID Photos.** White background, taken within 3 months, formal attire, no eyeglasses. Have these taken at a photo studio and mention it is for PRC.

**Valid Government-Issued ID.** Bring original and one photocopy front and back.

*Always verify the complete and current requirements at prc.gov.ph before submitting.*
`;

const AFTER_STEPS = `
---

## CLE Exam Schedule 2026

| Cycle | Typical Exam Period | Application Window |
|-------|--------------------|--------------------|
| February 2026 | February 2026 | November to December 2025 |
| August 2026 | August 2026 | May to June 2026 |

*Exact dates announced by PRC. Always verify at prc.gov.ph.*

---

## Common CLE Application Mistakes to Avoid

**Name mismatch with PSA documents.** Even a missing middle initial causes problems. Use your name exactly as it appears on your birth certificate.

**Waiting until the final week to apply.** Slots fill fast. Apply the first week the window opens.

**Wrong photo specs.** A photo studio familiar with PRC requirements saves you from a flagged application.

**Not checking email after submitting.** PRC sends important updates to your registered email. Check inbox and spam folder regularly.

---

## Once Registered, Start Reviewing Now

The time between submitting your application and exam day is your review window. LisensyaPrep has free reviewers and practice questions for all six CLE subjects. No account needed.
`;

export default function CleApplicationGuidePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cle-application" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/criminology" className="text-gray-500 hover:text-gray-300 transition-colors">Criminology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">CLE Application Guide 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400">Criminology (CLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                How to Apply for CLE via PRC LERIS 2026 (Step by Step Guide)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>April 23, 2026</span><span>•</span>
                <span>7 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-cle-application-results.jpg"
              alt="Person applying for CLE board exam online via PRC LERIS portal Philippines 2026"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(REQUIREMENTS)}
              <AdPlaceholder slot="banner" className="my-6" />

              <h2 className="text-2xl font-extrabold text-white mt-8 mb-4">Step by Step: Applying via LERIS</h2>
              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 310" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="310" fill="#0f172a" rx="10"/>
                  <text x="380" y="28" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">CLE Application Process via PRC LERIS</text>
                  <line x1="60" y1="40" x2="700" y2="40" stroke="#334155" strokeWidth="1"/>
                  <circle cx="100" cy="72" r="18" fill="#f59e0b"/>
                  <text x="100" y="78" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">1</text>
                  <text x="240" y="68" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Create or Log In to LERIS Account</text>
                  <text x="280" y="84" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Go to online.prc.gov.ph. Use exact name from PSA Birth Certificate.</text>
                  <line x1="100" y1="92" x2="100" y2="110" stroke="#334155" strokeWidth="2" strokeDasharray="4"/>
                  <circle cx="100" cy="122" r="18" fill="#f59e0b"/>
                  <text x="100" y="128" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">2</text>
                  <text x="240" y="118" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Select CLE Application</text>
                  <text x="280" y="134" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Go to Examination Application, select Criminologist Licensure Examination.</text>
                  <line x1="100" y1="142" x2="100" y2="160" stroke="#334155" strokeWidth="2" strokeDasharray="4"/>
                  <circle cx="100" cy="172" r="18" fill="#f59e0b"/>
                  <text x="100" y="178" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">3</text>
                  <text x="240" y="168" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Upload Documents and Photo</text>
                  <text x="280" y="184" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Upload 2x2 photo and all required documents. Use built-in cropping tool.</text>
                  <line x1="100" y1="192" x2="100" y2="210" stroke="#334155" strokeWidth="2" strokeDasharray="4"/>
                  <circle cx="100" cy="222" r="18" fill="#f59e0b"/>
                  <text x="100" y="228" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">4</text>
                  <text x="270" y="218" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Choose Schedule and Testing Center</text>
                  <text x="280" y="234" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Apply early. NCR centers fill up fastest. Apply the week the window opens.</text>
                  <line x1="100" y1="242" x2="100" y2="260" stroke="#334155" strokeWidth="2" strokeDasharray="4"/>
                  <circle cx="100" cy="272" r="18" fill="#86efac"/>
                  <text x="100" y="278" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">5</text>
                  <text x="240" y="268" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Pay Fee and Book Verification Appointment</text>
                  <text x="310" y="284" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Save receipt. Book document verification at PRC office. Download NOA before exam.</text>
                  <text x="380" y="302" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | CLE Application Guide 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>CLE application process step by step via PRC LERIS</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(AFTER_STEPS)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-red-400 font-extrabold text-lg mb-2">Start Your CLE Review at LisensyaPrep</p>
              <p className="text-gray-400 text-sm mb-4">Free practice questions for all six CLE subjects. No account required.</p>
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
