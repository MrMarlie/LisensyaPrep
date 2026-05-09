import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'How to Apply for the Civil Service Exam 2026 (CSC Step by Step Philippines)',
  description:
    'Step by step guide on how to apply for the Civil Service Exam August 9 2026. Complete requirements, application process at CSC Regional Offices, fees, and tips for Filipino applicants.',
  path: '/civil-service/cse-application-guide-2026',
});

const SCHEMA_HOW_TO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Apply for the Civil Service Exam 2026',
  description: 'Step by step guide to applying for the August 9 2026 Civil Service Exam at CSC Regional or Field Offices in the Philippines.',
  step: [
    { '@type': 'HowToStep', name: 'Download CS Form No. 100', text: 'Visit csc.gov.ph and download the latest application form. Fill out completely with black ink.' },
    { '@type': 'HowToStep', name: 'Identify Your CSC Office', text: 'Find the CSC Regional or Field Office covering your declared address.' },
    { '@type': 'HowToStep', name: 'Verify Office Procedure', text: 'Call or message your CSC office to confirm operating hours and any appointment requirements.' },
    { '@type': 'HowToStep', name: 'Go to CSC Office', text: 'Bring completed form, 4 ID photos, valid ID, and PHP 500 fee within May 14 to June 10 window.' },
    { '@type': 'HowToStep', name: 'Pay Examination Fee', text: 'Pay PHP 500 in cash and keep your official receipt.' },
    { '@type': 'HowToStep', name: 'Receive Confirmation', text: 'Get your confirmation slip with applicant control number and testing center.' },
    { '@type': 'HowToStep', name: 'Wait for ONSA', text: 'Online Notice of School Assignment with room number released 2 weeks before exam.' },
  ],
  author: { '@type': 'Organization', name: 'LisensyaPrep Team' },
  publisher: { '@type': 'Organization', name: 'LisensyaPrep' },
  datePublished: '2026-05-09',
};

const ALL_CSE_ARTICLES = [
  { text: 'What is the Civil Service Exam? Complete Guide 2026', href: '/blog/what-is-the-civil-service-exam' },
  { text: 'Civil Service Exam Coverage 2026 Complete Subject Breakdown', href: '/civil-service/cse-coverage-2026' },
  { text: 'Civil Service Exam Schedule 2026 Complete Timeline', href: '/civil-service/cse-schedule-2026' },
  { text: 'How to Apply for the Civil Service Exam 2026', href: '/civil-service/cse-application-guide-2026' },
  { text: 'Professional vs Subprofessional CSE Complete Comparison', href: '/civil-service/professional-vs-subprofessional-cse' },
  { text: 'How to Pass the Civil Service Exam on Your First Take', href: '/civil-service/how-to-pass-civil-service-exam' },
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
    } else if (line.match(/^\d+\. /)) {
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, '')) }} />);
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

const MAIN_CONTENT = `
Applying for the Civil Service Exam (CSE-PPT) is straightforward but requires precise document preparation and timely submission. Unlike PRC board exams which are filed through an online portal, CSE applications are **walk-in only** at CSC Regional or Field Offices.

This guide walks you through every step so your application gets accepted on the first attempt.

---

## Important Application Dates for August 9, 2026 CSE

| Item | Detail |
|------|--------|
| Exam date | **August 9, 2026 (Sunday)** |
| Application period start | **May 14, 2026** |
| Application period end | **June 10, 2026** |
| Examination fee | **PHP 500** |
| Application method | Walk-in at CSC Regional or Field Office |
| Slot allocation | First-come, first-served |

**Critical:** Apply within the first week (May 14 to 21). Slots in major testing centers fill quickly.

---

## Eligibility Requirements

Before applying, confirm you meet all CSE eligibility requirements:

1. **Filipino citizen**
2. **At least 18 years old** (no maximum age limit)
3. **Of good moral character**
4. **No criminal conviction** involving moral turpitude, dishonesty, or examination irregularity
5. **Not dishonorably discharged** from military service
6. **Not previously dismissed** for cause from any government civilian position
7. **Not having taken the same level** of CSE within 3 months of the application date

You do **not** need to be a college graduate. High school graduates and even non-graduates can take both Professional and Subprofessional levels.

---

## Documents to Prepare

Gather these documents **before** going to the CSC office. Incomplete applications will be rejected.

### 1. Completely Filled Out CS Form No. 100 (Application Form)

Download the latest CS Form No. 100 from **csc.gov.ph**. Fill it out completely with **black ink** (do not use blue or pencil). Sign all required sections.

The form requires:
- Personal information (use exact name from your birth certificate)
- Address and contact information
- Educational background
- Choice of examination level (Professional OR Subprofessional, not both)
- Choice of testing center
- Sworn declaration of eligibility

**Common mistake:** Listing the wrong examination level. Choose carefully because you cannot change your selection after submission.

### 2. Four (4) Identical Colored ID Photos

**Specifications:**
- Size: **1.8 inches x 1.4 inches** (not the same as 2x2)
- Background: **Plain white**
- Attire: Formal (collared shirt or blouse, no t-shirts)
- Taken within the last **3 months**
- Full name and signature written at the back of each photo

**Tip:** Tell the photo studio specifically that the photos are for the **Civil Service Exam application**. They know the exact size and specifications.

### 3. Original and Photocopy of Valid Government-Issued ID

You need to present one **original valid ID** and submit one photocopy.

**Acceptable IDs include:**
- Philippine Passport
- Driver's License (LTO O.R. with old License also accepted)
- PRC Professional License
- SSS ID
- GSIS ID (UMID)
- Voter's ID or Voter's Certification
- BIR/TIN ID (ATM type or card type with picture)
- PhilHealth ID (with name, picture, signature, and PhilHealth number)
- Company or Office ID
- School ID
- Police Clearance Certificate
- Postal ID
- Barangay ID
- NBI Clearance
- Senior Citizen ID
- Student Driver's Permit

The ID must be **non-expired and have your photo and signature.**

### 4. Examination Fee

**PHP 500** in cash. The CSC office may accept other payment methods at their discretion, but cash is universally accepted.

---

## Step by Step Application Process

### Step 1: Download and Complete CS Form No. 100

Visit csc.gov.ph and download the application form. Print on white short bond paper. Fill out completely with black ink.

### Step 2: Identify Your CSC Regional or Field Office

Find the CSC Regional Office or Field Office that covers your area at csc.gov.ph. The list of all CSC offices nationwide is published on the official website.

### Step 3: Verify Office Procedure

**Call or message your CSC office before going.** Some Field Offices require an online appointment, while others accept pure walk-ins. Confirm:

- Operating hours for application processing
- Whether an online appointment is required
- Current available slots for your preferred testing center
- Any office-specific requirements

### Step 4: Go to the CSC Office Within Application Period

**Bring:**
- Completed CS Form No. 100
- 4 colored ID photos with name and signature at the back
- Original and photocopy of valid government-issued ID
- PHP 500 examination fee in cash

Submit your documents at the application window. The processing officer will verify your documents and ID.

### Step 5: Pay the Examination Fee

After document verification, proceed to the cashier and pay the PHP 500 examination fee. Keep your **official receipt** for your records.

### Step 6: Receive Your Confirmation

You will receive a **confirmation slip** indicating your application has been accepted, your assigned testing center, and your applicant control number. Keep this slip safe. You will need it on exam day.

### Step 7: Wait for Online Notice of School Assignment (ONSA)

About **2 weeks before the exam**, the CSC will release the ONSA through csc.gov.ph. This contains your **specific room assignment** at your testing center.

Print your ONSA and bring it on exam day.

---

## Common Application Mistakes to Avoid

**Mistake 1: Applying late in the window.**
Slots fill on a first-come, first-served basis. Even if the official deadline is June 10, your preferred testing center may close earlier.

**Mistake 2: Wrong photo size.**
The CSE requires **1.8 x 1.4 inch** photos, not 2x2. Bringing the wrong size photos will get your application rejected.

**Mistake 3: Incomplete CS Form No. 100.**
Every required field must be filled. Missing information causes rejection.

**Mistake 4: Choosing the wrong examination level.**
You cannot change your level (Professional or Subprofessional) after submission. Choose carefully based on your career goals.

**Mistake 5: Going to the wrong CSC office.**
Apply only at the CSC Regional or Field Office that covers your declared address.

**Mistake 6: Bringing only a photocopy of ID.**
You need both the original and a photocopy. The original is for verification, the photocopy is what you submit.

---

## Special Cases and Exemptions

### Who Does NOT Need to Take the CSE?

Under RA 1080 and CSC Resolution No. 90-1212, the following are **automatically eligible** without taking the CSE:

- **PRC board exam passers** (doctors, nurses, teachers, engineers, accountants, lawyers, pharmacists, etc.)
- **Bar exam passers** (Supreme Court of the Philippines)
- **Marine deck and engine officer passers** under MARINA (RA 10635)
- **Career Service Foreign Service Officer (CSE-FSO) passers**
- **Honor graduates** (PD 907, Honor Graduate Eligibility)
- **Sanggunian Members** (RA 10156)
- **Barangay Officials** (RA 7160)
- **Barangay Health Workers** (RA 7883)
- **Barangay Nutrition Scholars** (PD 1569)

If you fall under any of these categories, you can request a Certificate of Eligibility directly from CSC without taking the exam.

---

## After Submitting Your Application

### What to Do Immediately

1. **Save your confirmation slip and receipt.** You will need these on exam day.

2. **Begin your CSE review.** You have approximately 3 months until the August 9 exam.

3. **Take a diagnostic quiz.** Identify your weak areas before starting your subject-by-subject review.

4. **Plan your study schedule.** Build a realistic plan based on your work or study commitments.

### What to Do 2 Weeks Before Exam

- Check csc.gov.ph for your **Online Notice of School Assignment (ONSA)**
- Print your ONSA on white bond paper
- Visit your assigned testing venue (ocular inspection)
- Review your weak areas one final time

### Exam Day Checklist

- ONSA (printed)
- Confirmation slip from your application
- Valid ID (the same one you used for application)
- 2 black ballpens minimum
- Transparent bag (encouraged by CSC)
- Snack and water
- Watch (no smartwatches)

---

## Start Your CSE Review While Waiting

After applying, the most productive use of your time is reviewing. LisensyaPrep has free practice questions for the Civil Service Exam. No account needed.

**[Start Your CSE Practice Quiz at LisensyaPrep](/civil-service)**

---

## Related CSE Articles

- [What is the Civil Service Exam Complete Guide 2026](/blog/what-is-the-civil-service-exam)
- [CSE Schedule 2026 Complete Timeline](/civil-service/cse-schedule-2026)
- [Civil Service Exam Coverage 2026 Complete Subject Breakdown](/civil-service/cse-coverage-2026)
- [How to Pass the Civil Service Exam on Your First Take](/civil-service/how-to-pass-civil-service-exam)
- [Professional vs Subprofessional CSE Complete Comparison](/civil-service/professional-vs-subprofessional-cse)
`;

export default function CseApplicationGuide2026Page() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cse-application-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_HOW_TO) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/civil-service" className="text-gray-500 hover:text-gray-300 transition-colors">Civil Service</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">CSE Application Guide 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service (CSE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                How to Apply for the Civil Service Exam 2026 (CSC Step by Step Philippines)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 9, 2026</span><span>•</span>
                <span>8 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">Related CSE Articles</h2>
              <ul className="space-y-3">
                {ALL_CSE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Start Your CSE Practice</p>
              <p className="text-gray-400 text-sm mb-4">Free CSE practice questions. No account required.</p>
              <Link href="/civil-service" className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">CSE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_CSE_ARTICLES.map(({ text, href }) => (
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
