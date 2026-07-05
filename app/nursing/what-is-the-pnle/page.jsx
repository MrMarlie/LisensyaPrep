import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';

export const metadata = buildMetadata({
  title: 'What is the PNLE? Complete Guide to the Philippine Nurse Licensure Examination 2026',
  description:
    'What is the PNLE? The Philippine Nurse Licensure Examination is the official PRC board exam for nurses. This guide covers everything: meaning, subjects, requirements, schedule, and passing rate.',
  path: '/nursing/what-is-the-pnle',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What is the PNLE? Complete Guide to the Philippine Nurse Licensure Examination 2026',
  description:
    'Complete guide answering what is the PNLE including its meaning, subjects, requirements, schedule, passing score, and passing rate.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-06',
  dateModified: '2026-05-06',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/what-is-the-pnle' },
};

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does PNLE stand for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PNLE stands for Philippine Nurse Licensure Examination. It is the official board examination administered by the PRC Board of Nursing for nursing graduates in the Philippines.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the PNLE passing score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To pass the PNLE you need a general weighted average of at least 75 percent and no individual subject score below 60 percent.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many parts does the PNLE have?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The PNLE is divided into 5 parts taken over 2 days, with 100 multiple-choice questions per part for a total of 500 questions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the PNLE the same as the NLE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. PNLE and NLE refer to the same examination. PNLE is the official name and NLE is the more common short form.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often is the PNLE held?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The PNLE is administered twice a year, typically in February and August.',
      },
    },
  ],
};

const ALL_NLE_ARTICLES = [
  { text: 'What is the PNLE? Complete Guide 2026', href: '/nursing/what-is-the-pnle' },
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
  let listType = 'ul';
  for (const el of elements) {
    if (el.type === 'tr') {
      if (inList) { wrapped.push(listType === 'ol' ? <ol key={`ol-${key++}`} className="list-decimal list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ol> : <ul key={`ul-${key++}`} className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>); listBuffer = []; inList = false; }
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
If you are a nursing graduate or a current nursing student in the Philippines, you have probably heard the term PNLE many times. But what does it actually stand for, what does it cover, and what do you need to know to take it?

This guide answers every question about the PNLE in one place.

---

## What Does PNLE Stand For?

**PNLE stands for Philippine Nurse Licensure Examination.**

It is the official board examination administered by the Philippine Professional Regulation Commission (PRC) Board of Nursing. Passing the PNLE is the legal requirement to practice nursing professionally in the Philippines as a Registered Nurse (RN).

The PNLE is sometimes also called the **NLE (Nurse Licensure Examination)** in everyday conversation. Both terms refer to the same exam.

---

## Who Takes the PNLE?

The PNLE is taken by graduates of a Bachelor of Science in Nursing (BSN) degree from a Commission on Higher Education (CHED) recognized university or college in the Philippines. Foreign-trained nurses may also take the PNLE if they meet PRC eligibility requirements.

**You must be a BSN graduate to take the PNLE.** Nursing assistants, caregivers, and midwives have separate examinations and cannot take the PNLE.

---

## When is the PNLE Held?

The PNLE is administered **twice a year**, typically in February and August. The exact dates and application windows are announced on the official PRC website at prc.gov.ph.

**For 2026:** The August 2026 PNLE is the next scheduled cycle. Application windows typically open 2 to 3 months before the exam date.

For the complete schedule visit [our PRC Board Exam Schedule 2026 guide](https://lisensyaprep.com/blog/prc-board-exam-schedule-2026-all-professions).

---

## How is the PNLE Structured?

The PNLE is a **two-day examination** divided into five parts. Each part covers different areas of nursing.

### Day 1

**Test 1: Care of Mother, Child, Family, and Population Group as Client**
This part focuses on maternal and child nursing, community health nursing, and family-centered care.

**Test 2: Care of Client with Physiologic and Psychosocial Alterations Part 1**
The first half of medical-surgical nursing, covering specific body systems and disease conditions.

### Day 2

**Test 3: Care of Client with Physiologic and Psychosocial Alterations Part 2**
The second half of medical-surgical nursing, including surgical care and complex nursing scenarios.

**Test 4: Care of Client with Physiologic and Psychosocial Alterations Part 3**
Covers psychiatric nursing, communication, and mental health concepts.

**Test 5: Care of Client with Physiologic and Psychosocial Alterations Part 4**
Includes additional medical-surgical content, leadership and management, and ethical-legal aspects of nursing.

Each part contains **100 multiple-choice questions** for a total of **500 questions** across the two days.

---

## What Subjects Does the PNLE Cover?

The PNLE comprehensively tests the following nursing subject areas:

**Community Health Nursing (CHN)**
Public health concepts, family health nursing, vital statistics, EPI (Expanded Program on Immunization), DOH programs, environmental health, and the nursing process applied to communities.

**Medical-Surgical Nursing (Med-Surg)**
The largest content area. Covers care of adult clients across all major body systems: cardiovascular, respiratory, gastrointestinal, renal, neurological, endocrine, musculoskeletal, integumentary, and immune systems.

**Maternal and Child Nursing**
Care of pregnant women through prenatal, intrapartum, and postpartum stages plus care of newborns, infants, children, and adolescents.

**Psychiatric Nursing**
Mental health concepts, therapeutic communication, common mental health disorders, psychiatric medications, and nursing interventions for behavioral health.

**Fundamentals of Nursing**
Basic nursing concepts, the nursing process (assessment, diagnosis, planning, implementation, evaluation), patient safety, infection control, and core clinical skills.

**Nursing Leadership, Management, and Research**
Leadership theories, management principles, the Philippine healthcare system, ethics, jurisprudence, and basic nursing research concepts.

For deeper coverage of each subject visit [our PNLE Coverage 2026 guide](/nursing/pnle-coverage-2026).

---

## What is the PNLE Passing Score?

To pass the PNLE you need to meet **two requirements simultaneously:**

**Requirement 1:** A general weighted average of **at least 75 percent** across all five parts.

**Requirement 2:** **No score below 60 percent** on any individual part.

This means you cannot pass with a strong overall average if even one of the five parts falls below 60. This is why a balanced review across all subject areas is critical for the PNLE.

For more on what to expect from results visit [our PNLE Passing Rate and Results 2026 guide](/nursing/pnle-passing-rate-results-2026).

---

## What Are the Requirements to Take the PNLE?

To apply for the PNLE you need:

1. **PSA Birth Certificate** (PSA-authenticated copy)
2. **Official Transcript of Records (OTR)** from your nursing school with dry seal
3. **Certificate of Graduation** or Diploma from your university
4. **Certificate of Good Moral Character**
5. **2x2 ID Photos** (white background, formal attire, taken within 3 months)
6. **Valid Government-Issued ID**

You must also have completed your BSN degree and the related-learning experience (RLE) hours required by CHED.

For the complete application process visit [our PNLE Application Guide 2026](/nursing/pnle-application-guide-2026).

---

## How Much Does It Cost to Take the PNLE?

PRC examination fees vary slightly per cycle but the PNLE typically costs around PHP 900 to PHP 1,000 for the examination fee itself. Additional costs include:

- PSA Birth Certificate: approximately PHP 150 to PHP 365
- Photo studio session for 2x2 photos: PHP 100 to PHP 250
- OTR processing fee at your university (varies by school)
- Transportation to PRC office for document verification
- Exam-day transportation and meals

The total cost for a fresh examinee is typically PHP 1,500 to PHP 3,000 depending on your university OTR fees and location.

---

## What is the PNLE Passing Rate?

The PNLE passing rate has historically ranged from approximately **40 to 55 percent**, varying significantly between cycles and between fresh graduates versus repeat takers.

**For the February 2026 PNLE:** 44.24 percent passing rate (3,612 out of 8,162 examinees passed).

This means roughly half of all examinees do not pass on their first attempt. The good news is that with proper preparation, individual passing rates can be much higher than the national average.

---

## What Comes After Passing the PNLE?

After passing the PNLE, the next steps are:

**1. Oath Taking Ceremony.** Register through your LERIS account and attend the formal oath-taking event. This is where you officially become a Registered Nurse (RN).

**2. Initial Registration.** Apply for your PRC Certificate of Registration and Professional Identification Card through the LERIS portal.

**3. Begin Practice.** With your RN license you can now legally practice nursing in any Philippine hospital, clinic, public health office, or other healthcare setting. You can also pursue overseas employment as a Filipino-trained nurse, though additional certifications may be required for specific destinations.

---

## How Should You Prepare for the PNLE?

The most effective PNLE preparation combines three things: comprehensive subject review, regular practice questions, and full-length mock examinations.

**LisensyaPrep** offers free practice questions for all PNLE subjects with no registration required. The site is specifically built for PRC board examinees in the Philippines.

**[Start Your PNLE Practice Quiz at LisensyaPrep](/nursing)**

For a complete study plan visit [our PNLE 3-Month Study Plan for Self-Reviewers](/nursing/pnle-3-month-study-plan).

---

## Frequently Asked Questions

**Is the PNLE the same as the NLE?**
Yes. PNLE and NLE refer to the same examination. PNLE (Philippine Nurse Licensure Examination) is the official name. NLE (Nurse Licensure Examination) is the more commonly used short form.

**Can I retake the PNLE if I do not pass?**
Yes. There is no limit to how many times you can take the PNLE. You can retake it in the next available cycle.

**Is the PNLE harder than the NCLEX?**
The PNLE and the U.S. NCLEX-RN are different examinations testing similar core nursing knowledge but in different formats and contexts. The PNLE is the requirement for Philippine practice. The NCLEX-RN is required for U.S. practice. Many Filipino nurses take both at different points in their careers.

**Do I need a review center to pass the PNLE?**
No. Many examinees pass the PNLE through self-review using free online resources, college textbooks, and practice question banks. Whether to enroll in a review center depends on your learning style, discipline, and budget.

**Can foreign nursing graduates take the PNLE?**
Foreign nursing graduates may take the PNLE if they meet PRC's specific eligibility requirements which include CHED evaluation of their foreign degree. Check prc.gov.ph for the latest foreign credential requirements.

---

## Related PNLE Articles

- [PNLE Coverage 2026 Complete Subject Breakdown](/nursing/pnle-coverage-2026)
- [PNLE 3-Month Study Plan for Self-Reviewers](/nursing/pnle-3-month-study-plan)
- [PNLE Application Guide via PRC LERIS 2026](/nursing/pnle-application-guide-2026)
- [PNLE Passing Rate and Results 2026](/nursing/pnle-passing-rate-results-2026)
- [Community Health Nursing Reviewer NLE 2026](/nursing/community-health-nursing-reviewer)
- [Medical-Surgical Nursing Reviewer NLE 2026](/nursing/medical-surgical-nursing-reviewer)
`;

export default function WhatIsThePnlePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-pnle-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/nursing","name":"Nursing"},{"url":"/nursing/what-is-the-pnle","name":"What is the PNLE"}]} />
      <Script id="schema-pnle-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">What is the PNLE</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (NLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                What is the PNLE? Complete Guide to the Philippine Nurse Licensure Examination 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 6, 2026</span><span>•</span>
                <span>9 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
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
              <p className="text-pink-400 font-extrabold text-lg mb-2">Start Your PNLE Practice</p>
              <p className="text-gray-400 text-sm mb-4">Free NLE practice questions. No account required.</p>
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
      <ArticlePopupTriggers type="pnle" />
    </div>
  );
}
