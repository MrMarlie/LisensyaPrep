import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'How to Take NCLEX in the Philippines (Step-by-Step Guide 2026)',
  description:
    'Complete step-by-step guide on how to take the NCLEX in the Philippines for Filipino nurses. Includes CGFNS, state board application, Pearson VUE Manila, and Cebu testing centers.',
  path: '/nursing/how-to-take-nclex-philippines',
});

const SCHEMA_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Take NCLEX in the Philippines',
  description:
    'Complete step-by-step guide for Filipino nurses to take the NCLEX in the Philippines without traveling abroad.',
  step: [
    { '@type': 'HowToStep', name: 'Choose US State', text: 'Select which US state to apply through (New York, California, Texas, Illinois, or Florida)' },
    { '@type': 'HowToStep', name: 'Complete CGFNS Evaluation', text: 'Submit credentials to CGFNS for evaluation (3-6 months processing time)' },
    { '@type': 'HowToStep', name: 'Apply to State Board', text: 'Submit state board application with required documents and fees' },
    { '@type': 'HowToStep', name: 'Receive ATT', text: 'Authorization to Test allows you to schedule the NCLEX' },
    { '@type': 'HowToStep', name: 'Schedule NCLEX', text: 'Book your exam at Pearson VUE Manila or Cebu' },
    { '@type': 'HowToStep', name: 'Take NCLEX', text: 'Take the NCLEX-RN at the testing center' },
    { '@type': 'HowToStep', name: 'Receive License', text: 'State board issues RN license after passing' },
  ],
  author: { '@type': 'Organization', name: 'LisensyaPrep Team' },
  publisher: { '@type': 'Organization', name: 'LisensyaPrep' },
  datePublished: '2026-05-31',
};

const ALL_NCLEX_ARTICLES = [
  { text: 'What is the NCLEX? Complete Guide for Filipino Nurses', href: '/nursing/what-is-the-nclex' },
  { text: 'NCLEX 2026 Coverage and Test Plan Changes', href: '/nursing/nclex-2026-coverage' },
  { text: 'How to Take NCLEX in the Philippines (Step-by-Step)', href: '/nursing/how-to-take-nclex-philippines' },
  { text: 'NCLEX-RN vs NCLEX-PN: Which Should Filipino Nurses Take?', href: '/nursing/nclex-rn-vs-pn-filipino-nurses' },
  { text: 'NCLEX vs PNLE: Complete Comparison for Filipino Nurses', href: '/nursing/nclex-vs-pnle-comparison' },
  { text: 'How to Pass the NCLEX on Your First Take', href: '/nursing/how-to-pass-nclex-first-take' },
  { text: 'Management of Care Reviewer for NCLEX-RN 2026', href: '/nursing/management-of-care-nclex-reviewer' },
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
    } else if (line.startsWith('#### ')) {
      elements.push(<h4 key={key++} className="text-base font-semibold text-white mt-4 mb-2">{line.slice(5)}</h4>);
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
Many Filipino nurses do not realize they can take the NCLEX **without leaving the Philippines**. Pearson VUE testing centers in Manila and Cebu administer the full NCLEX exam to Filipino nurses every business day.

This guide walks you through the complete process from credential evaluation to receiving your NCLEX results, all from the Philippines.

---

## Overview: The Complete NCLEX Process

The NCLEX application process involves **5 major stages** typically completed over **6 to 12 months**.

| Stage | Estimated Time | Major Tasks |
|-------|---------------|-------------|
| 1. Preparation | 1-2 months | Choose state, gather documents, save funds |
| 2. CGFNS Evaluation | 3-6 months | Submit credentials, await report |
| 3. State Board Application | 1-3 months | Apply, background check, get ATT |
| 4. Schedule and Take Exam | 1-2 weeks | Schedule, take NCLEX at Pearson VUE |
| 5. Results and License | 1-4 weeks | Receive results, get license |

---

## Stage 1: Preparation and Choosing a State

The first major decision is **which US state to apply through**. Each state has different requirements, costs, and processing times.

### Top 5 States for Filipino Nurses (Gateway States)

**1. New York**
- Most lenient credential evaluation
- High Filipino nurse population
- Higher cost of living
- Strong job market for nurses

**2. California**
- Stricter requirements (concurrency requirement may apply)
- Largest Filipino community in the US
- Highest nurse salaries
- More expensive licensing process

**3. Texas**
- High demand for nurses
- Lower cost of living
- Reasonable licensing requirements
- Growing Filipino community

**4. Illinois**
- Streamlined foreign-trained nurse process
- Strong nursing schools nearby for further education
- Chicago metro has Filipino communities

**5. Florida**
- Growing Filipino nurse community
- Lower cost of living than NY/CA
- High nursing demand

### Documents to Gather (Start Now)

Before beginning credential evaluation, gather these documents:

**Educational documents:**
- Original BSN diploma (or certified copy)
- Official transcript of records (sealed)
- Certificate of good moral character from your school

**Professional documents:**
- Original PNLE certificate
- PRC license (current)
- Certificate of registration as RN

**Identity documents:**
- Valid Philippine passport
- Birth certificate (PSA-issued)
- Marriage certificate (if applicable, for name change)

**English proficiency:**
- IELTS or TOEFL scores (typically required, varies by state)
- Recommended IELTS minimum: 6.5 overall, 7.0 speaking

### Budget Planning

Save **PHP 80,000 to PHP 200,000** for the entire process. Major expenses:

| Expense | Cost (PHP) |
|---------|-----------|
| CGFNS CES report | ~PHP 20,000 |
| NCLEX exam fee | ~PHP 11,200 |
| State Board application | PHP 3,000-11,000 |
| IELTS test | ~PHP 13,700 |
| CGFNS VisaScreen (for visa) | ~PHP 30,000 |
| Document authentication (apostille) | PHP 1,000-3,000 |
| Review courses (optional) | PHP 10,000-150,000 |

---

## Stage 2: CGFNS Credential Evaluation

The **Commission on Graduates of Foreign Nursing Schools (CGFNS)** evaluates whether your Philippine nursing education meets US standards.

### What CGFNS Evaluates

- Authenticity of your nursing education
- Comparability to US BSN programs
- Clinical hours completed
- Theory hours by subject

### The CGFNS CES Report Process

**Step 1: Create an account at cgfns.org**
Set up your CGFNS online account and start your application.

**Step 2: Submit Your Application**
Complete the online application and pay the fee ($350 USD / ~PHP 19,600).

**Step 3: Send Documents Directly**
CGFNS requires documents sent **directly from your school and the PRC**. They will not accept documents you submit yourself.

Documents needed:
- Official transcript from your nursing school (sent directly to CGFNS)
- Certificate of registration from PRC (sent directly to CGFNS)
- Diploma verification

**Step 4: Wait for Evaluation**
CGFNS takes **3 to 6 months** to complete the evaluation. Some files take longer due to school response delays.

**Step 5: CES Report Delivered**
Once complete, CGFNS sends your CES report directly to the state board of nursing you specified.

### Tips for Faster CGFNS Processing

**1. Follow up with your school.** Many delays happen because schools take time to send transcripts. Visit your school in person if possible.

**2. Submit clear photocopies.** Ensure all documents are legible and complete.

**3. Use the correct address.** Triple-check the state board address you select.

**4. Track your application.** Check your CGFNS portal weekly for updates.

---

## Stage 3: State Board Application

Once CGFNS submits your CES report, apply to your chosen state board of nursing.

### Application Components (Vary by State)

**1. Application form and fee**
Each state has its own application form. Fees range from $50 to $200 USD.

**2. Identity verification**
Submit copies of your passport, birth certificate, and other identification.

**3. Background check / Fingerprinting**
Most states require FBI background check. You can get fingerprints taken at:
- US Embassy in Manila
- Approved fingerprinting services in major Philippine cities
- Bureau of Immigration

Cost: ~PHP 3,000-5,000 plus FBI processing fee.

**4. English proficiency proof**
Submit IELTS or TOEFL scores. Recommended IELTS scores:
- Overall: 6.5 minimum
- Speaking: 7.0 minimum
- All other sections: 6.5 minimum

**5. State-specific requirements**
- New York: No additional requirements beyond standard
- California: May require concurrency review (theory and clinical taught simultaneously)
- Texas: Requires Texas-specific declaration of practice

### Receiving Your Authorization to Test (ATT)

Once approved, you receive an **Authorization to Test (ATT)** via email. The ATT contains:
- Your unique ATT code
- Eligible testing period (90 to 365 days)
- Authorized examination type (NCLEX-RN)

**Important:** You must schedule and take the NCLEX within your ATT validity period.

---

## Stage 4: Schedule and Take the NCLEX

With your ATT in hand, you can now schedule the NCLEX at a Pearson VUE testing center.

### Pearson VUE Testing Centers in the Philippines

**Manila Testing Center**
Location: BGC, Taguig
- Modern facility with strong security
- Multiple testing rooms
- Available most business days

**Cebu Testing Center**
Location: Cebu IT Park
- Convenient for Visayas and Mindanao examinees
- Fewer slots than Manila
- Book in advance

### How to Schedule

**Step 1: Go to pearsonvue.com/nclex**
Create an account using your ATT information.

**Step 2: Pay the NCLEX Exam Fee**
$200 USD (~PHP 11,200) via credit card.

**Step 3: Select Testing Center**
Choose Manila or Cebu (or any international Pearson VUE location).

**Step 4: Choose Date and Time**
Select an available date. Book 2-3 weeks in advance for preferred slots.

**Step 5: Confirm and Receive Confirmation**
Print your confirmation email and bring it on exam day.

### What to Bring on Exam Day

**Required:**
- Valid Philippine passport (primary ID)
- Secondary government-issued ID (driver's license, voter's ID)
- ATT confirmation email (printed)
- Pearson VUE confirmation email (printed)

**Prohibited items (locked in storage):**
- Cellphone, smartwatch, electronic devices
- Personal items, bags, wallets
- Food, drinks, gum
- Reference materials, notes
- Hats, jewelry (some exceptions for religious items)

### What to Expect on Exam Day

1. **Arrive 30 minutes early.** Late arrivals may be denied entry.
2. **Identity verification.** Fingerprint scan, photo, signature comparison with passport.
3. **Storage of personal items.** All belongings stored in lockers outside testing room.
4. **Testing room entry.** Escorted to assigned computer station with whiteboard for notes.
5. **Tutorial (8 minutes).** Practice the question types and computer interface.
6. **NCLEX begins.** 75 to 145 questions. You have up to 5 hours total.
7. **Breaks.** Optional break after 2 hours. All breaks count against your 5-hour total.
8. **Exam ends.** When the computer determines pass/fail with 95% confidence, the exam ends automatically.

---

## Stage 5: Results and License Issuance

After taking the NCLEX, here is what happens next.

### Initial Results

**Official results take 6 weeks** through the state board of nursing. However, you can purchase **Quick Results** for $7.95 USD to see your unofficial result within **48 hours** through the Pearson VUE website.

### Pass/Fail Determination

The NCLEX is pass/fail. There are no numerical scores or category breakdowns provided to passers. Failed examinees receive a Candidate Performance Report (CPR) showing weak areas.

### Receiving Your License

If you passed, the state board of nursing issues your **RN license**. Some states issue licenses within 1-2 weeks of receiving NCLEX results; others take 4-8 weeks.

**Your license allows you to:**
- Practice as a Registered Nurse in that state
- Apply for nursing positions
- Begin the visa process for US employment

**Your license does NOT automatically:**
- Allow you to enter the US
- Grant you a work visa
- Transfer to other states (each state requires separate licensing)

---

## What If You Fail?

If you fail, do not lose hope. Here is what to do.

### The Candidate Performance Report (CPR)

Failed examinees receive a CPR showing performance in each content category as:
- Above the passing standard
- Near the passing standard
- Below the passing standard

This identifies your weak areas for retake preparation.

### Retake Rules

**Waiting period:** Minimum 45 days between attempts (most states; some require 90 days).

**Retake limit:** Most states allow up to 8 attempts within a 2-year period.

**Re-applying:** You must pay the NCLEX exam fee again ($200 USD) and submit a new application to the state board.

### Strategies for Retakers

1. Focus on the areas marked "Below" or "Near" on your CPR
2. Use NGN-specific review materials
3. Take more practice questions (aim for 2,000+ before retake)
4. Consider a structured review course
5. Address test anxiety if it was a factor

---

## Frequently Asked Questions

**Can I take the NCLEX before completing all requirements?**
No. You must have an ATT before you can schedule the exam.

**Do I need to travel to the US for the NCLEX?**
No. The NCLEX can be taken at Pearson VUE Manila or Cebu without traveling abroad.

**How long does the entire process take?**
Average 6-12 months from start to NCLEX exam date.

**Can I take the NCLEX without IELTS?**
Some states do not require IELTS, but most do. Check your chosen state's requirements.

**What if my school is closed or merged?**
CGFNS has procedures for evaluating credentials from closed schools. Provide as much documentation as possible.

**Can I have someone help me with the application?**
You can use a credential review service or attorney, but the documents must come directly from official sources.

---

## Start Your NCLEX Preparation Now

While completing the application process, start preparing with NCLEX-specific practice questions. LisensyaPrep has **400 free NCLEX questions** across all 8 content categories.

**[Start Free NCLEX Practice](/nclex)**

---

## Related NCLEX Articles

- [What is the NCLEX? Complete Guide for Filipino Nurses](/nursing/what-is-the-nclex)
- [NCLEX 2026 Coverage and Test Plan Changes](/nursing/nclex-2026-coverage)
- [NCLEX-RN vs NCLEX-PN: Which Should Filipino Nurses Take?](/nursing/nclex-rn-vs-pn-filipino-nurses)
- [NCLEX vs PNLE: Complete Comparison](/nursing/nclex-vs-pnle-comparison)
- [How to Pass the NCLEX on Your First Take](/nursing/how-to-pass-nclex-first-take)
`;

export default function HowToTakeNclexPhilippinesPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-nclex-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_HOWTO) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">How to Take NCLEX in the Philippines</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Nursing (NCLEX)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                How to Take NCLEX in the Philippines: Step-by-Step Guide 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 31, 2026</span><span>•</span>
                <span>12 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">NCLEX Articles for Filipino Nurses</h2>
              <ul className="space-y-3">
                {ALL_NCLEX_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Start Your NCLEX Practice</p>
              <p className="text-gray-400 text-sm mb-4">400 free NCLEX questions. No account required.</p>
              <Link href="/nclex" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">NCLEX Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_NCLEX_ARTICLES.map(({ text, href }) => (
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
