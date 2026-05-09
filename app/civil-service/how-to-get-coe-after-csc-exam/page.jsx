import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'How to Get Your Certificate of Eligibility After Passing the CSE 2026 (COE Guide)',
  description:
    'Passed the Civil Service Exam? Complete guide on how to request your Certificate of Eligibility (COE) from CSC, requirements, fees, processing time, and how to use your COE for government employment.',
  path: '/civil-service/how-to-get-coe-after-csc-exam',
});

const SCHEMA_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Get Your Certificate of Eligibility After Passing the CSE',
  description:
    'Step by step guide to requesting your Certificate of Eligibility (COE) from the Civil Service Commission after passing the CSE-PPT.',
  step: [
    { '@type': 'HowToStep', name: 'Confirm You Passed', text: 'Verify results through OCSERGS at exam.csc.gov.ph using your applicant number.' },
    { '@type': 'HowToStep', name: 'Identify CSC Office', text: 'Request COE from the CSC Regional or Field Office where you took your exam.' },
    { '@type': 'HowToStep', name: 'Prepare Documents', text: 'Bring valid ID, photocopy, confirmation slip, and 2 colored ID photos.' },
    { '@type': 'HowToStep', name: 'Visit CSC Office', text: 'Walk-in during business hours or schedule an appointment if required.' },
    { '@type': 'HowToStep', name: 'Fill Out Request Form', text: 'Complete the COE request form with your details.' },
    { '@type': 'HowToStep', name: 'Pay Documentary Fees', text: 'COE is free but documentary stamps may cost PHP 30 to PHP 50.' },
    { '@type': 'HowToStep', name: 'Wait for Processing', text: 'Same day to 5 business days depending on office volume.' },
    { '@type': 'HowToStep', name: 'Receive Your COE', text: 'Verify the details on your COE before leaving the office.' },
  ],
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
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
  { text: 'Civil Service Exam Passing Rate 2026', href: '/civil-service/cse-passing-rate-2026' },
  { text: 'How to Get Your COE After Passing the CSE', href: '/civil-service/how-to-get-coe-after-csc-exam' },
  { text: 'Civil Service Exam Retake Rules and Strategy', href: '/civil-service/cse-retake-rules-strategy' },
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
    } else if (line.match(/^- \[[ x]\] /)) {
      const text = line.replace(/^- \[[ x]\] /, '');
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: '☐ ' + formatInline(text) }} />);
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
Congratulations on passing the Civil Service Exam! The next critical step is obtaining your **Certificate of Eligibility (COE)**, the official document that proves your CSE eligibility and is required for permanent government employment.

This guide covers everything you need to know about requesting and using your COE.

---

## What is the Certificate of Eligibility (COE)?

The **Certificate of Eligibility (COE)** is the official document issued by the Civil Service Commission certifying that you have passed the CSE-PPT. It is your proof of Career Service Eligibility and is required when applying for permanent government positions.

The COE contains:
- Your full name
- Your CSE rating
- Date of examination
- Level passed (Professional or Subprofessional)
- Place of examination
- Validation details

**Important:** Your CSE eligibility is **lifetime**. The COE does not expire. You only need to request it once per level passed.

---

## When Will Your Results Be Released?

CSE-PPT results are typically released **60 days (about 2 months) after the exam date**.

| Exam Date | Approximate Results Release |
|-----------|----------------------------|
| March 8, 2026 | May 5, 2026 (already released) |
| August 9, 2026 | Approximately October 2026 |

You can verify your results at:
- **csc.gov.ph** (Examination Section)
- **exam.csc.gov.ph** (Online Civil Service Exam Result Generation System or OCSERGS)

---

## How to Request Your COE: Step by Step

The process to request your COE is straightforward. Here is what you need to do.

### Step 1: Confirm You Passed

Before requesting your COE, verify your results through OCSERGS at exam.csc.gov.ph. You will need:
- Your applicant number (from your application)
- Your full name
- Date of birth

If your name appears in the official passers list, you are eligible to request a COE.

### Step 2: Identify the Right CSC Office

You must request your COE from the **CSC Regional Office or Field Office where you took the exam.**

If you applied in NCR but took the exam in another region, request from the office that **administered** your exam, not the one where you applied.

You can verify office locations at csc.gov.ph.

### Step 3: Prepare Required Documents

Bring these documents when requesting your COE:

1. **Original valid government-issued ID** (the same one used during your application)
2. **Photocopy of valid ID** (front and back)
3. **Confirmation slip** from your CSE application (if available)
4. **Two (2) recent 1.8 in × 1.4 in colored ID photos** (white background, taken within the last 3 months)
5. **Authorization letter** if requesting through a representative (with their valid ID and photocopy)

**Note:** Some offices may have additional requirements. Verify with your specific CSC office before going.

### Step 4: Visit the CSC Office

Walk-in service is available at most CSC Regional and Field Offices during regular business hours. Some offices may require an online appointment, so call or check the office's social media before going.

**Operating hours:** Generally Monday to Friday, 8:00 AM to 5:00 PM, but may vary by office.

### Step 5: Fill Out the Request Form

The CSC office will provide a request form. Fill it out completely with:
- Your full name (as it appears on your CSE application)
- Your applicant number
- Your CSE level passed
- Date and location of exam
- Reason for the request

### Step 6: Pay the Fee (If Applicable)

**The COE itself is FREE of charge.** However, some offices may charge minimal fees for:
- Documentary stamps (typically PHP 30 to PHP 50)
- Authentication or certification (if requested)
- Multiple copies (additional copies may have a small fee)

### Step 7: Wait for Processing

Processing time varies by office and current volume:
- **Same-day release:** Some offices issue COE on the same day for walk-in requests
- **3 to 5 business days:** Average processing time
- **Up to 2 weeks:** During peak periods (right after results release)

### Step 8: Receive Your COE

When your COE is ready, you will receive an official document printed on CSC letterhead. The COE will be:
- Printed on official CSC letterhead
- Signed by the authorized CSC official
- Embossed with the official CSC seal
- Sealed in a CSC envelope

**Verify the details on your COE** before leaving the office. Errors in spelling or other details should be corrected immediately.

---

## How Many Copies Should You Request?

**Recommended: Request 2 to 3 original copies.**

You will need an original COE for:
- Each government position you apply to
- Submission with your 201 file (employment record)
- Personal record-keeping

Some offices charge a small fee for additional copies (typically PHP 50 to PHP 100). Getting multiple copies upfront saves you from having to return for more later.

---

## How to Use Your COE for Government Employment

Your COE is required when applying for permanent government positions that match your eligibility level.

### When Applying

**For each application:**
1. Submit a photocopy of your COE with your application documents
2. Bring the original for verification during interviews
3. Keep your original safely stored

**Common positions requiring COE:**

**For Professional Eligible:**
- Administrative Officer positions (SG 11+)
- Computer Programmer positions
- Internal Auditor positions
- Various professional, technical, and managerial roles

**For Subprofessional Eligible:**
- Administrative Aide positions (SG 1-6)
- Clerical positions
- Trades positions (carpenter, electrician, etc.)
- Custodial positions

### Where to Apply

Government positions are typically advertised at:
- **CSC Job Vacancy Portal** (jobs.csc.gov.ph)
- **Individual government agency websites**
- **Government Service Insurance System (GSIS)** for retirement-system jobs
- **Local Government Unit (LGU) websites**

---

## Replacing a Lost or Damaged COE

If you lose or damage your COE, you can request a replacement.

### What to Do

**Step 1:** File an Affidavit of Loss (notarized) explaining the circumstances.

**Step 2:** Visit the CSC Regional or Field Office where you originally got the COE.

**Step 3:** Submit:
- Affidavit of Loss
- Valid government-issued ID
- Application for COE replacement
- Replacement fee (typically PHP 100 to PHP 200)

**Step 4:** Wait for processing (typically 3 to 5 business days).

The replacement COE will have the same content as the original but will be marked as a replacement copy.

---

## Frequently Asked Questions

**Is the COE the same as the Certificate of Examination (COE)?**
Yes. The official term is "Certificate of Eligibility" but some refer to it as "Certificate of Examination." Both refer to the same document.

**Can I request my COE online?**
Currently, walk-in service at the CSC office where you took the exam is the standard process. Online requests are not yet widely available, though some pilot programs exist.

**Does my COE expire?**
No. CSE eligibility is lifetime, and your COE does not expire.

**Can I use my COE for private sector employment?**
No. The COE is specifically for government employment. Private sector employers do not require it.

**Can I get my COE if I am abroad?**
Yes. You can authorize a representative through a Special Power of Attorney (notarized abroad and apostilled or authenticated) and provide them with the required documents. Processing is the same.

**What if I want to change my name on the COE (after marriage)?**
The COE is issued in the name you used during the CSE application. To use a different name on government applications, you typically present your COE alongside your marriage certificate or other supporting documents. You generally do not need a "new" COE.

**Can I request a COE if I passed many years ago?**
Yes. CSE eligibility does not expire, so you can request your COE many years after passing. The CSC keeps records of all passers.

---

## Start Your CSE Review at LisensyaPrep

If you have not yet taken or passed the CSE, LisensyaPrep has free practice questions for all CSE subjects. No account needed.

**[Start Your CSE Practice at LisensyaPrep](/civil-service)**

---

## Related CSE Articles

- [What is the Civil Service Exam Complete Guide](https://lisensyaprep.com/blog/what-is-the-civil-service-exam)
- [Civil Service Exam Passing Rate 2026 Philippines](/civil-service/cse-passing-rate-2026)
- [How to Apply for the Civil Service Exam 2026](/civil-service/cse-application-guide-2026)
- [Civil Service Exam Schedule 2026](/civil-service/cse-schedule-2026)
- [Professional vs Subprofessional CSE Complete Comparison](/civil-service/professional-vs-subprofessional-cse)
`;

export default function HowToGetCoeAfterCscExamPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-coe-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_HOWTO) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/civil-service" className="text-gray-500 hover:text-gray-300 transition-colors">Civil Service</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">How to Get Your COE After the CSE</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service (CSE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                How to Get Your Certificate of Eligibility After Passing the CSE 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 9, 2026</span><span>•</span>
                <span>7 min read</span>
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
