import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'What is the Civil Service Exam? Complete Guide to the CSE Philippines 2026',
  description:
    'What is the Civil Service Exam? The CSE is the official Career Service Exam administered by the Civil Service Commission Philippines for government employment eligibility. Complete guide covers the meaning, levels, coverage, and passing rate.',
  path: '/blog/what-is-the-civil-service-exam',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What is the Civil Service Exam? Complete Guide to the CSE Philippines 2026',
  description:
    'Complete guide answering what is the Civil Service Exam including its meaning, two levels, coverage, eligibility requirements, schedule, passing rate, and career benefits.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-09',
  dateModified: '2026-05-09',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/blog/what-is-the-civil-service-exam' },
};

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Civil Service Exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Civil Service Exam (CSE) is the official Career Service Examination - Pen and Paper Test administered by the Civil Service Commission of the Philippines. Passing the CSE grants Career Service Eligibility required for permanent government employment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the CSE passing score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To pass the Civil Service Exam you need a general rating of at least 80 percent. There is no per-subject minimum.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the two levels of the CSE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The CSE has two levels: Professional (170 items, 3 hours 10 minutes, qualifies for first and second-level positions) and Subprofessional (165 items, 2 hours 40 minutes, qualifies for first-level positions only).',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I take the CSE without a college degree?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Civil Service Commission has lifted the educational requirement. Even high school graduates can take both Professional and Subprofessional levels as long as they are at least 18 years old.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does CSE eligibility expire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Civil Service Eligibility is valid for life. You only need to pass once.',
      },
    },
  ],
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
If you are aiming to work in the Philippine government, you have probably encountered the term Civil Service Exam many times. But what does it actually mean, what does it cover, and who needs to take it?

This guide answers every question about the Civil Service Exam in one place.

---

## What is the Civil Service Exam?

The **Civil Service Exam (CSE)**, officially called the **Career Service Examination - Pen and Paper Test (CSE-PPT)**, is the official examination administered by the **Civil Service Commission (CSC)** of the Philippines.

Passing the CSE grants you **Career Service Eligibility**, which is required to be appointed to permanent positions in the Philippine government.

The CSE is one of the most widely taken examinations in the country, with over **331,000 examinees** in a single cycle. It is administered twice a year, typically in March and August.

---

## Why Take the Civil Service Exam?

Career Service Eligibility is the standard requirement for permanent government employment in the Philippines. Without CSE eligibility, you cannot be appointed to most permanent government positions, regardless of your educational qualifications.

If you currently work in the government on a Job Order (JO), Contract of Service (COS), Casual, or Contractual basis, passing the CSE is your pathway to becoming a regular employee with full benefits.

CSE eligibility is also required for many positions in:

- National government agencies
- Local government units (LGUs)
- State universities and colleges (SUCs)
- Government-owned and controlled corporations (GOCCs)

---

## What Are the Two Levels of the CSE?

The Civil Service Exam has two levels, and you can only take **one level per exam administration.**

### Professional Level

The Professional Level qualifies you for both **first-level (clerical, trades) and second-level (professional, technical, scientific) government positions**.

- **170 questions** total
- **3 hours and 10 minutes** time limit
- Includes **Analytical Ability** (logic, abstract reasoning, data interpretation)

### Subprofessional Level

The Subprofessional Level qualifies you for **first-level government positions only** (clerical, trades, custodial, administrative aide).

- **165 questions** total
- **2 hours and 40 minutes** time limit
- Includes **Clerical Ability** (filing, spelling, basic operations)

For a complete breakdown visit [our Professional vs Subprofessional CSE comparison guide](/civil-service/professional-vs-subprofessional-cse).

---

## What Subjects Does the CSE Cover?

Both Professional and Subprofessional levels share these core subjects, all written in **English and Filipino:**

### Verbal Ability

Tests your command of language including:

- Vocabulary (synonyms, antonyms)
- Grammar and correct usage
- Paragraph organization
- Reading comprehension
- Spelling (Subprofessional only)

### Numerical Ability

Tests basic math skills including:

- Basic arithmetic operations
- Fractions, decimals, percentages
- Word problems (age, time, distance, work)
- PEMDAS and order of operations
- Ratio and proportion

### Analytical Ability (Professional Only)

Tests higher-order reasoning including:

- Word analogy
- Logic and abstract reasoning
- Data interpretation (tables, graphs, charts)
- Identifying assumptions and conclusions

### Clerical Ability (Subprofessional Only)

Tests practical office skills including:

- Filing (alphabetical, numerical)
- Spelling
- Basic operations

### General Information

Both levels test foundational government knowledge:

- Philippine Constitution
- RA 6713 (Code of Conduct and Ethical Standards for Public Officials and Employees)
- Peace and Human Rights Issues
- Environment Management and Protection

For deeper coverage of each subject visit [our CSE Coverage 2026 guide](/civil-service/cse-coverage-2026).

---

## Who Can Take the Civil Service Exam?

**You are eligible to take the CSE if you meet all of the following:**

1. Filipino citizen
2. **At least 18 years old** (no maximum age limit)
3. Of good moral character
4. No criminal conviction involving moral turpitude, dishonesty, or examination irregularity
5. Not dishonorably discharged from military service
6. Not previously dismissed for cause from any government civilian position

**Important:** You do **NOT** need a college degree to take the CSE. Even high school graduates can take both the Professional and Subprofessional levels.

You also cannot take the same level of CSE within 3 months of your previous attempt at that level.

---

## What is the CSE Passing Score?

To pass the Civil Service Exam, you need a **general rating of at least 80.00 percent**.

This is significantly higher than most PRC board exams, which require only 75 percent. The 80 percent passing score is one reason why CSE passing rates are historically low.

Unlike PRC board exams, the CSE does **not** have a per-subject minimum. Your overall 80 percent rating is what matters, regardless of how you score in individual subjects.

---

## What is the CSE Passing Rate?

The Civil Service Exam has one of the **lowest passing rates of any major Philippine exam**, typically ranging from **10 to 20 percent** depending on the cycle.

For example:
- **March 2024 CSE-PPT:** 17.20 percent (57,683 out of 335,385 examinees passed)
- **March 2025 CSE-PPT:** Approximately 14.6 percent (46,470 out of 318,973 examinees passed)

This means **80 to 90 percent of examinees do not pass on their first attempt**. Effective preparation is critical.

For more on results visit [our CSE Passing Rate 2026 Guide](/civil-service/cse-passing-rate-2026).

---

## When Are the 2026 Civil Service Exams?

The CSC announced two CSE-PPT administrations for 2026:

| Exam Date | Application Period |
|-----------|-------------------|
| **March 8, 2026** | November 3 to 28, 2025 |
| **August 9, 2026** | May 14 to June 10, 2026 |

The August 2026 application window is **open now**. Apply early because slots fill on a first-come, first-served basis.

For the complete schedule visit [our CSE Schedule 2026 Complete Timeline](/civil-service/cse-schedule-2026).

---

## How Much Does the CSE Cost?

The CSE examination fee is **PHP 500** as of 2026. There is no application fee separate from the examination fee.

Additional costs to consider:

- 4 pieces of identical 1.8 in x 1.4 in colored ID photos: PHP 100 to PHP 250
- Photocopies of valid ID: minimal
- Transportation to the CSC Regional or Field Office for application
- Transportation to your testing center on exam day

The total cost for first-time examinees is typically PHP 700 to PHP 1,200.

---

## What Comes After Passing the CSE?

**1. Wait for Results.** The CSC releases results approximately 60 days after the exam date. Check the CSC website (csc.gov.ph) and the OCSERGS (Online Civil Service Exam Result Generation System).

**2. Request Your Certificate of Eligibility (COE).** Once results are released, you can request your COE printed on official CSC letterhead from the CSC Regional or Field Office where you took the exam. The COE is issued **free of charge**.

**3. Apply for Government Positions.** With your eligibility, you can now apply for permanent positions in the Philippine government that match your eligibility level.

**4. Eligibility is Lifetime.** You only need to pass once. Civil Service eligibility does not expire and is valid for life.

---

## How Should You Prepare for the CSE?

The most effective CSE preparation combines structured subject review with daily practice questions. Given the brutal 10 to 20 percent passing rate, casual preparation is not enough.

**LisensyaPrep** offers free practice questions for the Civil Service Exam with no registration required.

**[Start Your CSE Practice Quiz at LisensyaPrep](/civil-service)**

For a complete study plan visit [How to Pass the Civil Service Exam on Your First Take](/civil-service/how-to-pass-civil-service-exam).

---

## Frequently Asked Questions

**Is the CSE the same as the Career Service Examination?**
Yes. CSE, Career Service Exam, and CSE-PPT all refer to the same examination administered by the Civil Service Commission.

**Can I take the CSE without a college degree?**
Yes. The CSC has lifted the educational requirement. Even high school graduates can take both Professional and Subprofessional levels as long as they are at least 18 years old.

**Does my CSE eligibility expire?**
No. Civil Service Eligibility is valid for life. You only need to pass once.

**Can I take both Professional and Subprofessional in the same cycle?**
No. You can only take one level per exam administration.

**Do PRC board exam passers need to take the CSE?**
No. Under RA 1080, passers of PRC licensure examinations are automatically considered civil service eligible. Doctors, nurses, teachers, engineers, and other licensed professionals do not need to take the CSE.

**How long should I review for the CSE?**
For most examinees, **1 to 3 months of consistent review** is recommended. Working professionals should plan for 3 to 4 months.

---

## Related CSE Articles

- [Civil Service Exam Coverage 2026 Complete Subject Breakdown](/civil-service/cse-coverage-2026)
- [How to Pass the Civil Service Exam on Your First Take](/civil-service/how-to-pass-civil-service-exam)
- [Professional vs Subprofessional CSE Complete Comparison](/civil-service/professional-vs-subprofessional-cse)
- [CSE Application Guide 2026 Step by Step](/civil-service/cse-application-guide-2026)
- [CSE Schedule 2026 Complete Timeline](/civil-service/cse-schedule-2026)
`;

export default function WhatIsTheCsePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cse-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <Script id="schema-cse-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">What is the Civil Service Exam</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service (CSE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                What is the Civil Service Exam? Complete Guide to the CSE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 9, 2026</span><span>•</span>
                <span>9 min read</span>
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
