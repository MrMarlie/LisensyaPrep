import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';
import { buildMetadata } from '@/lib/seo';

const _mtleMeta = buildMetadata({
  title: 'MTLE August 2026 Schedule, Application, and Results (PRC Official Dates)',
  description:
    'Complete MTLE August 2026 schedule, application window dates, and how to check results. Updated for the next medical technology board exam cycle.',
  path: '/medical-technology/mtle-application-results-2026',
});
const _mtleTitle = 'MTLE August 2026 Schedule, Application, and Results (PRC Official Dates)';
export const metadata = {
  ..._mtleMeta,
  title: { absolute: _mtleTitle },
  openGraph: { ..._mtleMeta.openGraph, title: _mtleTitle },
  twitter: { ..._mtleMeta.twitter, title: _mtleTitle },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'MTLE Application Guide and Passing Rate 2026 Philippines PRC Official Data',
  description:
    'Complete PRC LERIS application guide for the Medical Technologist Licensure Examination plus official MTLE passing rate data and what to do after results are released.',
  image: 'https://lisensyaprep.com/images/articles/hero-mtle-application-results.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-01',
  dateModified: '2026-05-01',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/medical-technology/mtle-application-results-2026' },
};

const ALL_MTLE_ARTICLES = [
  { text: 'How to Pass the MTLE Board Exam on Your First Take', href: '/medical-technology/how-to-pass-mtle-board-exam' },
  { text: 'MTLE Coverage 2026 Complete Subject Breakdown', href: '/medical-technology/mtle-coverage-2026' },
  { text: 'Hematology Reviewer for MTLE Philippines 2026', href: '/medtech/hematology-reviewer' },
  { text: 'Clinical Chemistry Reviewer for MTLE Philippines 2026', href: '/medtech/clinical-chemistry-reviewer' },
  { text: 'Microbiology and Parasitology Reviewer MTLE 2026', href: '/medtech/microbiology-parasitology-reviewer' },
  { text: 'Blood Banking and Serology Reviewer MTLE 2026', href: '/medical-technology/blood-banking-serology-reviewer' },
  { text: 'Urinalysis and Body Fluids Reviewer MTLE 2026', href: '/medical-technology/urinalysis-body-fluids-reviewer' },
  { text: 'Histopathology and Cytology Reviewer MTLE 2026', href: '/medical-technology/histopathology-cytology-reviewer' },
  { text: 'MTLE Application Guide and Passing Rate 2026', href: '/medical-technology/mtle-application-results-2026' },
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
This page covers two things every MTLE examinee needs: how to apply for the August 2026 exam via PRC LERIS, and what the MTLE passing rate looks like so you can set realistic expectations going into your review.

---

## How to Apply for the MTLE via PRC LERIS

### Application Requirements
`;

const SECTION2 = `
### LERIS Application Steps

**Step 1:** Go to online.prc.gov.ph. Log in or create your account using your exact name from your PSA Birth Certificate.

**Step 2:** Navigate to Examination Application and select Medical Technologist Licensure Examination.

**Step 3:** Fill in your personal and educational information. Double check your university name, degree, and graduation year.

**Step 4:** Upload your 2x2 photo and required documents. Compress files before uploading if they are too large.

**Step 5:** Choose your exam schedule and testing center. Apply the first week the window opens. NCR slots fill fastest.

**Step 6:** Pay the examination fee through accepted channels. Save your payment receipt.

**Step 7:** Book your document verification appointment at your nearest PRC regional office.

**Step 8:** Download and print your Notice of Admission from LERIS before exam day. Phone screenshots are not accepted.

### August 2026 MTLE Schedule

| | Details |
|-|---------|
| Exam Period | August 2026 |
| Application Window | May to June 2026 |
| Application Portal | online.prc.gov.ph |

*Always verify exact dates at prc.gov.ph. Apply immediately when the window opens.*

---

## MTLE Passing Rate and Results

### How to Check Your MTLE Results

PRC releases MTLE results within 5 working days after the last exam day.

**Step 1:** Go to prc.gov.ph and navigate to Board Results.

**Step 2:** Find the Medical Technologist Licensure Examination results for your cycle.

**Step 3:** Open the passers list PDF and search for your surname using Ctrl F or Command F.

**Step 4:** Log in to online.prc.gov.ph and use Verification of Rating to see your individual subject scores.

### After Passing: Becoming a Registered Medical Technologist (RMT)

**Oath Taking:** Register for an oath taking ceremony slot through your LERIS account. This is where you formally become a Registered Medical Technologist.

**Initial Registration:** Apply for your PRC Certificate of Registration and Professional Identification Card. Your RMT license is required to practice medical technology in any Philippine hospital or laboratory.

### If You Did Not Pass

Check your individual subject scores through LERIS immediately. The most common failure pattern in the MTLE is falling below 60 percent in Blood Banking or Histopathology while performing well in the other subjects. Identify your specific weak subjects and build a targeted retake plan rather than reviewing everything from scratch.

---

## Start Your MTLE Review Now

The August 2026 MTLE is approaching. LisensyaPrep has free practice questions for all six MTLE subject areas. No account needed.

**[Start Your MTLE Practice Quiz at LisensyaPrep](https://lisensyaprep.com/medical-technology)**

---

## Related MTLE Articles

- [MTLE Coverage 2026 Complete Subject Breakdown](https://lisensyaprep.com/medical-technology/mtle-coverage-2026)
- [How to Pass the MTLE Board Exam on Your First Take](https://lisensyaprep.com/medical-technology/how-to-pass-mtle-board-exam)
- [Blood Banking and Serology Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/blood-banking-serology-reviewer)
- [How to Check PRC Board Exam Results Online](https://lisensyaprep.com/blog/how-to-check-prc-board-exam-results)
- [PRC Board Exam Retake Rules and Policies](https://lisensyaprep.com/blog/prc-board-exam-retake-rules)
`;

export default function MtleApplicationResults2026Page() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-mtle-application" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/medical-technology" className="text-gray-500 hover:text-gray-300 transition-colors">Medical Technology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">MTLE Application Guide and Passing Rate 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400">Medical Technology (MTLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                MTLE Application Guide and Passing Rate 2026 Philippines
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 1, 2026</span><span>•</span>
                <span>7 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-mtle-application-results.jpg"
                alt="Filipino female medical technologist graduate at laptop for MTLE application guide and passing rate Philippines 2026"
                width={1200} height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="240" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">MTLE Application Requirements Checklist</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="30" fill="#1e3a5f" rx="5"/>
                  <text x="60" y="62" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="62" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PSA Birth Certificate</text>
                  <text x="90" y="75" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">PSA-authenticated copy. Order at serbilis.psa.gov.ph. Allow 3 to 4 weeks.</text>
                  <rect x="40" y="86" width="680" height="30" fill="#172033" rx="5"/>
                  <text x="60" y="98" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="98" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Official Transcript of Records for BS Medical Technology</text>
                  <text x="90" y="111" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">With university dry seal and registrar signature. Request at least 3 to 4 weeks before deadline.</text>
                  <rect x="40" y="122" width="680" height="30" fill="#1e3a5f" rx="5"/>
                  <text x="60" y="134" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="134" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Certificate of Graduation or Diploma</text>
                  <text x="90" y="147" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Verify if PRC requires original or certified true copy for your specific exam cycle.</text>
                  <rect x="40" y="158" width="680" height="30" fill="#172033" rx="5"/>
                  <text x="60" y="170" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="170" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Certificate of Good Moral Character</text>
                  <text x="90" y="183" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">From your university registrar or guidance office.</text>
                  <rect x="40" y="194" width="680" height="30" fill="#1e3a5f" rx="5"/>
                  <text x="60" y="206" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">✓</text>
                  <text x="90" y="206" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">2x2 ID Photos and Valid Government-Issued ID</text>
                  <text x="90" y="219" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">White background, formal attire, no eyeglasses, taken within 3 months at a photo studio.</text>
                  <text x="380" y="234" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">Always verify current requirements at prc.gov.ph before submitting. | LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>MTLE application requirements checklist for 2026</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(SECTION2)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-sky-900/20 to-sky-900/10 border border-sky-500/30 rounded-2xl p-6 text-center">
              <p className="text-sky-400 font-extrabold text-lg mb-2">Start Your MTLE Review Now</p>
              <p className="text-gray-400 text-sm mb-4">Free practice questions for all six MTLE subject areas. No registration required.</p>
              <Link href="/medical-technology" className="inline-block bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start MTLE Practice at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">All MTLE Articles on LisensyaPrep</h2>
              <ul className="space-y-3">
                {ALL_MTLE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">MTLE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_MTLE_ARTICLES.map(({ text, href }) => (
                  <Link key={href} href={href} className="group block">
                    <p className="text-gray-300 text-sm group-hover:text-sky-400 transition-colors leading-snug">{text}</p>
                  </Link>
                ))}
              </div>
            </div>
            <AdPlaceholder slot="sidebar" />
          </aside>

        </div>
      </div>
    <ArticlePopupTriggers type="mtle" />
    </div>
  );
}
