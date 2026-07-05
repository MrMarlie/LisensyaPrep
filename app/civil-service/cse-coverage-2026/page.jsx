import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';

export const metadata = buildMetadata({
  title: 'Civil Service Exam Coverage 2026 Complete Subject Breakdown Philippines',
  description:
    'What is the coverage of the Civil Service Exam 2026? Complete CSE subject breakdown for Professional and Subprofessional levels including verbal, numerical, analytical, clerical, and general information topics.',
  path: '/civil-service/cse-coverage-2026',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Civil Service Exam Coverage 2026 Complete Subject Breakdown Philippines',
  description:
    'Complete coverage breakdown of the Civil Service Exam 2026 covering all 8 subject areas for Professional and Subprofessional levels including item counts, time limits, and study time allocation.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-09',
  dateModified: '2026-05-09',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/civil-service/cse-coverage-2026' },
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
The Civil Service Exam covers eight major content areas across both Professional and Subprofessional levels. Knowing exactly what is tested and how questions are distributed is the foundation of any effective review strategy.

This guide gives you the complete coverage breakdown so you can build your study plan around what actually appears on the exam.

---

## CSE Exam Format Overview

| Feature | Professional | Subprofessional |
|---------|-------------|-----------------|
| Total Items | 170 | 165 |
| Time Limit | 3 hours, 10 minutes | 2 hours, 40 minutes |
| Passing Score | 80 percent | 80 percent |
| Languages | English and Filipino | English and Filipino |
| Format | Multiple choice | Multiple choice |

The exam is administered as a paper-and-pencil test (PPT). Calculators and electronic devices are strictly prohibited.

---

## The 8 Major Subject Areas

Both Professional and Subprofessional levels share six subject areas. The Professional level adds Analytical Ability while the Subprofessional level adds Clerical Ability.

### 1. Vocabulary

Vocabulary questions test your knowledge of word meanings in both English and Filipino.

**Question types:**
- Synonyms (words with similar meanings)
- Antonyms (words with opposite meanings)
- Word definitions in context
- Filipino vocabulary equivalents

**Approximate items:** 15 to 20 items per level.

**How to prepare:** Read consistently from quality sources like newspapers, novels, and academic articles. Use a dictionary alongside your reading. For Filipino vocabulary, read Filipino news articles and literature.

### 2. Grammar and Correct Usage

This section tests your ability to identify grammatically correct sentences and proper usage.

**Question types:**
- Subject-verb agreement
- Pronoun-antecedent agreement
- Verb tense consistency
- Modifiers and parallelism
- Sentence structure errors
- Filipino grammar rules

**Approximate items:** 15 to 20 items per level.

**How to prepare:** Master the basic rules of English and Filipino grammar. Practice identifying errors in sentences. The questions often test subtle distinctions, so understanding the rules is more important than memorizing examples.

### 3. Paragraph Organization (Organization of Ideas)

These questions present jumbled sentences or paragraphs and ask you to arrange them in logical order.

**Question types:**
- Sentence sequencing
- Paragraph reorganization
- Identifying topic sentences
- Logical flow of ideas

**Approximate items:** 5 to 10 items per level.

**How to prepare:** Practice identifying transitional words (however, therefore, furthermore) that signal logical connections. Look for chronological sequences and cause-effect relationships.

### 4. Reading Comprehension

Reading comprehension passages test your ability to understand, analyze, and draw conclusions from written text.

**Question types:**
- Main idea identification
- Specific detail recall
- Inference and implication
- Author's purpose or tone
- Vocabulary in context

**Approximate items:** 10 to 15 items per level.

**How to prepare:** Read passages carefully. Practice identifying the main idea before answering questions. For inference questions, focus only on what can be reasonably concluded from the passage, not outside knowledge.

### 5. Numerical Reasoning

This section tests basic mathematics and word problem solving without the use of calculators.

**Question types:**
- Basic arithmetic (addition, subtraction, multiplication, division)
- Fractions, decimals, percentages
- Order of operations (PEMDAS)
- Ratio and proportion
- Word problems involving age, time, distance, work, money
- Number sequences

**Approximate items:** 25 to 30 items per level.

**How to prepare:** Master basic operations and shortcut techniques. Practice mental math because no calculator is allowed. Focus on word problem patterns commonly used in CSE questions.

### 6. Analytical Ability (Professional Only)

This section tests higher-order reasoning skills required for second-level government positions. **It is not in the Subprofessional exam.**

**Question types:**
- Word analogy (relationships between word pairs)
- Logic (syllogisms, Venn diagrams, argument validity)
- Abstract reasoning (pattern recognition in shapes and sequences)
- Data interpretation (tables, graphs, charts)
- Identifying assumptions and conclusions

**Approximate items:** 30 to 35 items in the Professional exam.

**How to prepare:** Practice analogy patterns until they become automatic. For logic, learn the basic rules of valid and invalid arguments. For data interpretation, practice reading tables and charts quickly.

### 7. Clerical Ability (Subprofessional Only)

This section tests practical office skills relevant to first-level clerical positions. **It is not in the Professional exam.**

**Question types:**
- Filing (alphabetical sequencing, numerical filing)
- Spelling (correct usage in English and Filipino)
- Basic clerical operations

**Approximate items:** 30 to 35 items in the Subprofessional exam.

**How to prepare:** Master alphabetical and numerical filing rules. Pay attention to commonly misspelled words. Practice quickly identifying spelling errors.

### 8. General Information

This section is included in both Professional and Subprofessional exams. It tests foundational knowledge required of any government employee.

**Topics covered:**

- **Philippine Constitution:** Bill of Rights, branches of government, fundamental principles, important provisions
- **Code of Conduct (RA 6713):** Norms of conduct, prohibited acts, ethical standards for public officials
- **Peace and Human Rights:** Universal Declaration of Human Rights, Philippine peace processes
- **Environment Management and Protection:** Major environmental laws, climate change, ecological awareness

**Approximate items:** 20 to 30 items per level.

**How to prepare:** Read the Philippine Constitution especially the Bill of Rights (Article III). Familiarize yourself with the key provisions of RA 6713. Stay updated on current environmental and human rights issues.

---

## How to Allocate Your Review Time

Given the coverage breakdown, here is a recommended distribution of your review time:

**For Professional Level Examinees:**

- Verbal Ability (vocabulary, grammar, comprehension, organization): **30 percent**
- Numerical Reasoning: **25 percent**
- Analytical Ability: **25 percent**
- General Information (Constitution, RA 6713, etc.): **15 percent**
- Mixed practice and mock exams: **5 percent**

**For Subprofessional Level Examinees:**

- Verbal Ability (vocabulary, grammar, comprehension, organization): **30 percent**
- Numerical Reasoning: **25 percent**
- Clerical Ability (filing, spelling): **20 percent**
- General Information: **20 percent**
- Mixed practice and mock exams: **5 percent**

These percentages should be adjusted based on your diagnostic quiz results. Spend more time on your weakest areas.

---

## Common Misconceptions About CSE Coverage

**Misconception 1: "The Subprofessional exam is much easier than the Professional exam."**

Reality: Both have an 80 percent passing rate requirement. While Subprofessional removes Analytical Ability, it adds Clerical Ability which has its own challenges. Both levels are difficult.

**Misconception 2: "I can skip Numerical Reasoning if I am bad at math."**

Reality: Numerical Reasoning is approximately 15 percent of the exam. Skipping it makes reaching the 80 percent passing rate very difficult.

**Misconception 3: "General Information questions are easy because they are common knowledge."**

Reality: General Information tests specific provisions of the Constitution and RA 6713. It rewards careful study, not common knowledge.

---

## Start Your CSE Review Now

LisensyaPrep has free practice questions for all CSE subjects. No account needed. Start with a diagnostic quiz to identify your weak areas before you begin reviewing.

**[Start Your CSE Practice Quiz at LisensyaPrep](/civil-service)**

---

## Related CSE Articles

- [What is the Civil Service Exam Complete Guide 2026](/blog/what-is-the-civil-service-exam)
- [How to Pass the Civil Service Exam on Your First Take](/civil-service/how-to-pass-civil-service-exam)
- [Professional vs Subprofessional CSE Complete Comparison](/civil-service/professional-vs-subprofessional-cse)
- [How to Apply for the Civil Service Exam 2026](/civil-service/cse-application-guide-2026)
- [CSE Schedule 2026 Complete Timeline](/civil-service/cse-schedule-2026)
`;

export default function CseCoverage2026Page() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cse-coverage-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/civil-service","name":"Civil Service"},{"url":"/civil-service/cse-coverage-2026","name":"CSE Coverage 2026"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/civil-service" className="text-gray-500 hover:text-gray-300 transition-colors">Civil Service</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">CSE Coverage 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service (CSE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Civil Service Exam Coverage 2026: Complete Subject Breakdown Philippines
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 9, 2026</span><span>•</span>
                <span>12 min read</span>
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
      <ArticlePopupTriggers type="cse" />
    </div>
  );
}
