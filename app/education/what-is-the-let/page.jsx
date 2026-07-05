import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import PremiumCTA from '@/components/PremiumCTA';
import PremiumStickyBar from '@/components/PremiumStickyBar';
import FreebieCTA from '@/components/FreebieCTA';
import FreebieStickyBar from '@/components/FreebieStickyBar';

export const metadata = buildMetadata({
  title: 'What is the LET? Complete Guide to the Licensure Examination for Teachers 2026 Philippines',
  description:
    'What is the LET? The Licensure Examination for Teachers is the official PRC board exam for education graduates Philippines. Complete guide covers meaning, subjects, requirements, and passing rate.',
  path: '/education/what-is-the-let',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What is the LET? Complete Guide to the Licensure Examination for Teachers 2026',
  description:
    'Complete guide answering what is the LET including its meaning, components for elementary and secondary level, requirements, schedule, and passing score for Licensed Professional Teachers.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-06',
  dateModified: '2026-05-06',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/education/what-is-the-let' },
};

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does LET stand for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LET stands for Licensure Examination for Teachers. It is the official board examination administered by the PRC Board of Professional Teachers in the Philippines under RA 7836.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the LET passing score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To pass the LET you need a general weighted average of at least 75 percent and no component score below 50 percent. The minimum per component is 50 percent, not 60 percent like most other PRC boards.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is the LET structured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For elementary level, the LET has 2 components: Professional Education and General Education. For secondary level, it has 3 components: Professional Education, General Education, and Field of Specialization in your major subject.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often is the LET held?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The LET is administered twice a year, typically in March and September.',
      },
    },
  ],
};

const ALL_LET_ARTICLES = [
  { text: 'What is the LET? Complete Guide 2026', href: '/education/what-is-the-let' },
  { text: 'LET Coverage 2026 Complete Subject Breakdown', href: '/education/let-coverage-2026' },
  { text: 'How to Pass the LET on Your First Take', href: '/education/how-to-pass-let-first-take' },
  { text: 'Professional Education Reviewer LET 2026', href: '/education/professional-education-reviewer' },
  { text: 'General Education Reviewer LET 2026', href: '/education/general-education-reviewer' },
  { text: 'LET Application Guide and Passing Rate 2026', href: '/education/let-application-guide-2026' },
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
If you are an education graduate or current student in the Philippines, you have probably heard the term LET many times. But what does it stand for, what does it cover, and how do you take it?

This guide answers every question about the LET in one place.

---

## What Does LET Stand For?

**LET stands for Licensure Examination for Teachers.**

It is the official board examination administered by the Philippine Professional Regulation Commission (PRC) Board of Professional Teachers. Passing the LET is the legal requirement to teach in any Philippine public or private school as a Licensed Professional Teacher (LPT).

The LET is governed by **Republic Act 7836** (the Philippine Teachers Professionalization Act of 1994).

---

## Who Takes the LET?

The LET is taken by graduates of education-related programs from CHED-recognized universities and colleges. The two main qualifying degrees are:

**Bachelor of Elementary Education (BEEd)** - For aspiring elementary teachers (Kindergarten to Grade 6).

**Bachelor of Secondary Education (BSEd)** - For aspiring secondary teachers (Grade 7 to Grade 12) with a specific major (English, Mathematics, Filipino, Science, Social Studies, MAPEH, TLE, etc.).

Graduates of non-education degrees can also take the LET if they have completed at least 18 units of professional education courses through alternative pathways like the Certificate in Teaching program.

---

## When is the LET Held?

The LET is administered **twice a year**, typically in **March and September**.

For the complete schedule visit [our PRC Board Exam Schedule 2026 guide](/blog/prc-board-exam-schedule-2026-all-professions).

---

## How is the LET Structured?

The LET structure depends on whether you are taking the elementary or secondary level.

### For Elementary Level (BEEd)

The LET has **two components**:

**Component 1: Professional Education** - Tests pedagogical knowledge including learning theories, curriculum development, teaching methods, classroom management, and educational philosophy.

**Component 2: General Education** - Tests broad content knowledge across English, Filipino, Mathematics, Science, Social Studies, and other foundational subjects.

### For Secondary Level (BSEd)

The LET has **three components**:

**Component 1: Professional Education** - Same content as for elementary level, focused on pedagogical knowledge.

**Component 2: General Education** - Same content as for elementary level, broad content knowledge.

**Component 3: Field of Specialization** - Tests deep subject knowledge in your specific major (English, Mathematics, Filipino, Science, Social Studies, MAPEH, or TLE).

For deeper coverage of each component visit [our LET Coverage 2026 guide](/education/let-coverage-2026).

---

## What is the LET Passing Score?

The LET has **a unique passing requirement** different from most other PRC board exams.

**Requirement 1:** A general weighted average of **at least 75 percent**.

**Requirement 2:** **No component score below 50 percent** (not 60 percent like most other PRC boards).

This is critical to understand. The LET minimum per component is **50 percent**, lower than the typical 60 percent. This means a strong performance in one component can compensate for a weaker performance in another, as long as nothing falls below 50.

For more on results visit [our LET Passing Rate and Results 2026 guide](/education/let-application-guide-2026).

---

## What is the LET Passing Rate?

The LET historically has one of the **most variable passing rates** of any PRC board exam, ranging from approximately **30 to 50 percent** depending on the cycle, level (elementary or secondary), and major subject.

Some secondary majors consistently perform above 50 percent passing rate while others fall below 30 percent in the same cycle. This is why your specific major matters significantly to your individual passing strategy.

---

## What Are the Requirements to Take the LET?

To apply for the LET you need:

1. PSA Birth Certificate (PSA-authenticated copy)
2. Official Transcript of Records (OTR) for your education degree
3. Certificate of Graduation or Diploma
4. Certificate of Good Moral Character
5. 2x2 ID Photos (white background, formal attire, taken within 3 months)
6. Valid Government-Issued ID

Non-education degree applicants need additional documentation showing completion of the required professional education units.

For the complete application process visit [our LET Application Guide 2026](/education/let-application-guide-2026).

---

## What Comes After Passing the LET?

**1. Oath Taking Ceremony.** Register through your LERIS account and attend the formal oath-taking event where you officially become a Licensed Professional Teacher (LPT).

**2. Initial Registration.** Apply for your PRC Certificate of Registration and Professional Identification Card.

**3. Begin Teaching Career.** With your LPT license you can apply for teaching positions in:

- Department of Education (DepEd) public schools
- Private schools (basic and secondary)
- International schools in the Philippines
- Tutorial centers and academic institutions
- Higher education institutions (with additional graduate qualifications)

Many Filipino licensed teachers also pursue overseas opportunities, particularly in countries like the United States, Singapore, Vietnam, Thailand, the Middle East, and other locations with demand for English-speaking educators.

---

## How Should You Prepare for the LET?

The LET is one of the most competitive PRC board exams given its high volume of takers (often hundreds of thousands per cycle). Effective preparation combines comprehensive review with consistent practice.

**The single biggest mistake LET examinees make:** Spending most of their review time on their major subject and neglecting Professional Education. This is the most common reason secondary level teachers fail the LET despite knowing their subject well.

**The fix:** Give Professional Education at least 40 percent of your total review time regardless of your level or major.

**LisensyaPrep** offers free practice questions for all LET components with no registration required.

**[Start Your LET Practice Quiz at LisensyaPrep](/education)**

---

## Frequently Asked Questions

**Is the LET the same as the teachers board exam?**
Yes. LET and teachers board exam refer to the same examination. LET is the official term.

**Can I retake the LET if I do not pass?**
Yes. There is no limit on how many times you can take the LET.

**Can I take the LET without an education degree?**
Yes, but you need to have completed at least 18 units of professional education courses through an alternative pathway like a Certificate in Teaching program. PRC will evaluate your qualifications.

**What is the most important component of the LET?**
Professional Education is the most heavily weighted and most commonly underestimated component. It applies to both elementary and secondary level examinees.

**Why is the LET passing score 50 percent per component instead of 60 percent?**
This is set by the Board of Professional Teachers under the Philippine Teachers Professionalization Act. The 50 percent minimum is intended to allow some compensation between strong and weaker areas given the broad coverage of the LET.

---

## Related LET Articles

- [LET Coverage 2026 Complete Subject Breakdown](/education/let-coverage-2026)
- [How to Pass the LET on Your First Take](/education/how-to-pass-let-first-take)
- [Professional Education Reviewer LET 2026](/education/professional-education-reviewer)
- [General Education Reviewer LET 2026](/education/general-education-reviewer)
- [LET Application Guide and Passing Rate 2026](/education/let-application-guide-2026)
`;

export default function WhatIsTheLetPage() {
  return (
    <div className="min-h-screen py-10">
      <FreebieStickyBar />
      <PremiumStickyBar />
      <Script id="schema-let-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/education","name":"Education"},{"url":"/education/what-is-the-let","name":"What is the LET"}]} />
      <Script id="schema-let-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">What is the LET</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400">Education (LET)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                What is the LET? Complete Guide to the Licensure Examination for Teachers 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 6, 2026</span><span>•</span>
                <span>9 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <FreebieCTA />
              <PremiumCTA />
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">Related LET Articles</h2>
              <ul className="space-y-3">
                {ALL_LET_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-sky-900/20 to-sky-900/10 border border-sky-500/30 rounded-2xl p-6 text-center">
              <p className="text-sky-400 font-extrabold text-lg mb-2">Start Your LET Practice</p>
              <p className="text-gray-400 text-sm mb-4">Free LET practice questions. No account required.</p>
              <Link href="/education" className="inline-block bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">LET Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_LET_ARTICLES.map(({ text, href }) => (
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
