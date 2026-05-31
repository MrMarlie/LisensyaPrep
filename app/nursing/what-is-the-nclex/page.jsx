import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'What is the NCLEX? Complete Guide for Filipino Nurses 2026',
  description:
    'What is the NCLEX? Complete guide for Filipino nurses planning to work in the US. Learn what NCLEX-RN means, exam format, passing standard, and how it differs from PNLE.',
  path: '/nursing/what-is-the-nclex',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What is the NCLEX? Complete Guide for Filipino Nurses 2026',
  description:
    'Complete guide explaining what is the NCLEX for Filipino nurses including exam format, eligibility, cost, and how it differs from PNLE.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-31',
  dateModified: '2026-05-31',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/what-is-the-nclex' },
};

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the NCLEX?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The NCLEX is the National Council Licensure Examination administered by the National Council of State Boards of Nursing in the United States. It is required to obtain a nursing license to practice in the US, Canada, and other recognized jurisdictions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Filipino nurses take the NCLEX in the Philippines?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pearson VUE testing centers in Manila and Cebu administer the NCLEX. Filipino nurses do not need to travel to the US to take the exam.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does the NCLEX cost for Filipino nurses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The total cost ranges from $1,435 to $4,000+ USD (PHP 80,000 to PHP 224,000+) including the NCLEX exam fee, CGFNS credential evaluation, state board application, English proficiency testing, and review materials.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the NCLEX differ from the PNLE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The NCLEX uses Computerized Adaptive Testing with 75-145 variable questions over 5 hours, emphasizing clinical judgment. The PNLE uses paper and pencil with 500 fixed questions over 2 days, emphasizing subject knowledge.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the NCLEX passing rate for Filipino nurses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Filipino nurses pass the NCLEX at approximately 50-60% overall, lower than US-educated nurses (85-90%). Filipino nurses who prepare specifically for the NCLEX format pass at rates above 70%.',
      },
    },
  ],
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
If you are a Filipino nurse considering working in the United States or other English-speaking countries, you have likely encountered the term NCLEX. But what exactly is it, who takes it, and why is it the most important exam for nurses pursuing international careers?

This guide answers every question Filipino nurses ask about the NCLEX in one place.

---

## What is the NCLEX?

The **NCLEX (National Council Licensure Examination)** is the official licensure examination administered by the **National Council of State Boards of Nursing (NCSBN)** in the United States.

Passing the NCLEX is required to obtain a nursing license to practice in the **United States, Canada, Australia (in some cases), and other recognized jurisdictions**. Without passing the NCLEX, a foreign-trained nurse cannot legally practice as a registered nurse in these countries.

The NCLEX has two versions:

- **NCLEX-RN** (for Registered Nurses)
- **NCLEX-PN** (for Practical/Vocational Nurses)

For Filipino nurses who graduated with a Bachelor of Science in Nursing (BSN), the NCLEX-RN is the relevant examination.

---

## Why Do Filipino Nurses Take the NCLEX?

The Philippines is the **largest source of foreign-trained nurses in the United States**. Approximately **20,000 to 25,000 Filipino nurses take the NCLEX each year**, driven by:

**1. Higher salaries.** US registered nurses earn an average of $80,000 to $120,000 per year, compared to PHP 35,000 to PHP 50,000 monthly in the Philippines.

**2. Career advancement.** US nursing offers specialized roles, continuing education, and clear career pathways.

**3. Better working conditions.** Lower nurse-to-patient ratios (1:4 to 1:6 in the US vs 1:40+ in PH hospitals).

**4. Pathway to permanent residency.** Nursing is on most US immigrant visa lists, allowing many Filipino nurses to eventually become permanent residents.

**5. Family stability.** Many Filipino nurses send remittances home to support family and eventually petition family members.

---

## NCLEX Exam Format and Structure

The NCLEX is unlike any exam Filipino nurses have experienced in the Philippines. It uses **Computerized Adaptive Testing (CAT)**, which adjusts difficulty based on your answers.

### NCLEX-RN Format

| Feature | Detail |
|---------|--------|
| Minimum questions | 75 |
| Maximum questions | 145 |
| Time limit | 5 hours |
| Format | Computerized Adaptive Testing (CAT) |
| Pretest questions (unscored) | 15 |
| Question types | Multiple choice, multiple response, fill-in-the-blank, ordered response, hot spot |

### How the CAT System Works

The computer starts with a medium-difficulty question. If you answer correctly, the next question is slightly harder. If you answer incorrectly, the next is slightly easier. The exam ends when the computer determines with **95% confidence** that you are either above or below the passing standard.

This means:
- The exam **could end at 75 questions** if your performance is clearly above or below passing standard.
- The exam **may continue to 145 questions** if your performance is borderline.
- Most examinees finish between 75 to 145 questions.

**Critical point:** The exam ending at 75 questions does NOT mean you failed. It means the computer has enough data to determine your result.

---

## What Does the NCLEX Test?

The NCLEX-RN tests entry-level nursing knowledge through eight major content categories based on the **2023 NCLEX-RN Test Plan** (current through 2025-2026):

### Client Needs Categories

| Category | Approximate Weight |
|----------|-------------------|
| Management of Care | 15-21% |
| Safety and Infection Control | 10-16% |
| Health Promotion and Maintenance | 6-12% |
| Psychosocial Integrity | 6-12% |
| Basic Care and Comfort | 6-12% |
| Pharmacological and Parenteral Therapies | 13-19% |
| Reduction of Risk Potential | 9-15% |
| Physiological Adaptation | 11-17% |

### Integrated Processes

Beyond content categories, the NCLEX evaluates:

- **Nursing Process** (Assessment, Diagnosis, Planning, Implementation, Evaluation)
- **Caring**
- **Communication and Documentation**
- **Teaching/Learning**
- **Culture and Spirituality**

For deeper coverage breakdowns visit [NCLEX 2026 Coverage and Test Plan Changes](/nursing/nclex-2026-coverage).

---

## NCLEX vs PNLE: The Key Differences

Filipino nurses often ask how the NCLEX compares to the PNLE they already passed. The differences are significant.

| Feature | PNLE | NCLEX-RN |
|---------|------|----------|
| Format | Paper and pencil | Computerized Adaptive |
| Questions | 500 (fixed) | 75 to 145 (variable) |
| Days | 2 days | 1 session (5 hours) |
| Subjects | 5 parts by subject | 8 content categories |
| Passing | 75% GWA, no subject below 60% | Pass/Fail (computer determines) |
| Languages | English | English only |
| Cost | PHP 1,500 | $200 USD (~PHP 11,200) |
| Eligibility | BSN graduate | BSN graduate + state requirements |
| Frequency | Twice yearly | Year-round, schedule anytime |

The NCLEX emphasizes **clinical judgment** and **prioritization** much more than the PNLE. Many Filipino nurses who scored well on the PNLE struggle with the NCLEX because of these different testing approaches.

For complete comparison visit [NCLEX vs PNLE: Complete Comparison for Filipino Nurses](/nursing/nclex-vs-pnle-comparison).

---

## NCLEX Passing Rate for Filipino Nurses

The NCLEX passing rate varies significantly by examinee group:

| Group | Average NCLEX-RN Passing Rate |
|-------|-------------------------------|
| US-educated first-time takers | 85% to 90% |
| International first-time takers | 47% to 55% |
| Filipino nurses (overall) | 50% to 60% |
| Repeat takers (all groups) | 35% to 45% |

**Why is the passing rate lower for Filipino nurses?**

1. **Different testing format** (CAT vs paper-and-pencil)
2. **Emphasis on prioritization** rather than recall
3. **US-specific clinical practices** (delegation, scope of practice, US laws)
4. **English language nuances** in test questions
5. **Limited exposure to NCLEX-style questions** during nursing school

The good news: **Filipino nurses who prepare specifically for the NCLEX format and practice with NCLEX-style questions consistently pass at rates above 70%**.

---

## NCLEX Eligibility for Filipino Nurses

To take the NCLEX-RN as a Filipino-trained nurse, you must:

### Step 1: Hold a BSN from a Recognized Philippine Institution

Your nursing school must be CHED-recognized. Most Philippine BSN programs meet US state requirements, but some states have specific evaluations.

### Step 2: Choose a US State to Apply Through

You must apply to a specific State Board of Nursing. **Filipino nurses commonly apply through:**

- **New York** - Most lenient credential evaluation requirements
- **California** - Largest Filipino nurse population, but stricter requirements
- **Texas** - High demand for nurses, reasonable requirements
- **Illinois** - Streamlined process for foreign-trained nurses
- **Florida** - Growing Filipino nurse community

For detailed state comparisons visit [NCLEX Gateway States for Filipino Nurses](/nursing/how-to-take-nclex-philippines).

### Step 3: Complete CGFNS Credential Evaluation (Most States)

The **Commission on Graduates of Foreign Nursing Schools (CGFNS)** evaluates your nursing education credentials. Most US states require:

- **CES (Credentials Evaluation Service)** report - certifies your education
- **VisaScreen** certificate - required for visa applications (separate process)

Cost: $350 to $500 USD for the standard CGFNS evaluation.

### Step 4: Apply to State Board and ATT

After credential evaluation, apply to your chosen state board of nursing. Once approved, you receive an **Authorization to Test (ATT)** allowing you to schedule the NCLEX.

### Step 5: Schedule and Take the NCLEX

Schedule your NCLEX at a Pearson VUE testing center. The Philippines has Pearson VUE centers in **Manila and Cebu** where you can take the NCLEX without traveling abroad.

For complete step-by-step process visit [How to Take NCLEX in the Philippines](/nursing/how-to-take-nclex-philippines).

---

## How Much Does the NCLEX Cost?

The total cost for Filipino nurses to take the NCLEX includes multiple fees:

| Expense | Cost (USD) | PHP Equivalent |
|---------|-----------|----------------|
| NCLEX exam fee | $200 | ~PHP 11,200 |
| CGFNS CES report | $350 | ~PHP 19,600 |
| CGFNS VisaScreen | $540 | ~PHP 30,240 |
| State Board application fee | $50-$200 | ~PHP 2,800-11,200 |
| Background check/fingerprinting | $50-$100 | ~PHP 2,800-5,600 |
| English proficiency test (IELTS) | $245 | ~PHP 13,700 |
| Review materials and courses | $200-$3,000 | ~PHP 11,200-168,000 |
| **TOTAL minimum** | **$1,435** | **~PHP 80,000** |
| **TOTAL with review courses** | **$4,000+** | **~PHP 224,000+** |

Plan for at least **PHP 80,000 to PHP 200,000** in total expenses to complete the NCLEX process.

---

## NCLEX 2026 Test Plan Changes

The NCLEX underwent significant changes on **April 1, 2023** with the introduction of the **Next Generation NCLEX (NGN)** format. These changes remain in effect for 2026 and include:

**1. New question types** that test clinical judgment:
- Bowtie items
- Trend items
- Drag and drop
- Highlight in text
- Drop-down rationale

**2. Greater emphasis on clinical judgment** using the NCSBN Clinical Judgment Model:
- Recognize cues
- Analyze cues
- Prioritize hypotheses
- Generate solutions
- Take action
- Evaluate outcomes

**3. Case study questions** that present complex patient scenarios with multiple linked questions.

**Important:** All Filipino nurses taking the NCLEX in 2026 must prepare specifically for the NGN format. Older reviewer books from before 2023 do not adequately cover these changes.

---

## Frequently Asked Questions

**Can I take the NCLEX in the Philippines?**
Yes. Pearson VUE testing centers in Manila and Cebu administer the NCLEX. You do not need to travel to the US.

**Do I need to be in the US to apply?**
No. You can complete the entire application process from the Philippines, including credential evaluation, state board application, and taking the exam.

**How long does the NCLEX process take?**
From starting credential evaluation to taking the exam, expect 6 to 12 months. CGFNS evaluation alone takes 3 to 6 months.

**Can I retake the NCLEX if I fail?**
Yes. You can retake the NCLEX after a 45-day waiting period. There is no limit on the number of attempts in most states.

**Is my PNLE eligibility valid for working in the US?**
No. PNLE eligibility is only valid in the Philippines. You must pass the NCLEX to work as an RN in the United States.

**Do I need to speak English fluently?**
Yes. Most US state boards require an English proficiency test (IELTS or TOEFL) score. NCLEX questions are written in clinical English requiring strong reading comprehension.

**Can I work in the US immediately after passing NCLEX?**
No. Passing the NCLEX gets you a nursing license, but you still need an employment visa (H-1B, EB-3, or similar) to work in the US.

---

## Start Your NCLEX Preparation at LisensyaPrep

LisensyaPrep is the **first Filipino-focused NCLEX practice platform** with **400 free NCLEX questions** across all 8 content categories. No registration required.

**[Start Your Free NCLEX Practice at LisensyaPrep](/nclex)**

Filipino nurses who prepare with NCLEX-specific practice (not just PNLE reviewers) have significantly higher passing rates. Start practicing today.

---

## Related NCLEX Articles

- [NCLEX 2026 Coverage and Test Plan Changes](/nursing/nclex-2026-coverage)
- [How to Take NCLEX in the Philippines](/nursing/how-to-take-nclex-philippines)
- [NCLEX-RN vs NCLEX-PN: Which Should Filipino Nurses Take?](/nursing/nclex-rn-vs-pn-filipino-nurses)
- [NCLEX vs PNLE: Complete Comparison](/nursing/nclex-vs-pnle-comparison)
- [How to Pass the NCLEX on Your First Take](/nursing/how-to-pass-nclex-first-take)
`;

export default function WhatIsTheNclexPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-nclex-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <Script id="schema-nclex-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">What is the NCLEX</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Nursing (NCLEX)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                What is the NCLEX? Complete Guide for Filipino Nurses 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 31, 2026</span><span>•</span>
                <span>10 min read</span>
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
