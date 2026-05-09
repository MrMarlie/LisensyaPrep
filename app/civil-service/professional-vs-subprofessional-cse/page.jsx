import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Professional vs Subprofessional Civil Service Exam Complete Comparison 2026',
  description:
    'What is the difference between Professional and Subprofessional Civil Service Exam? Complete comparison covers item count, time limit, coverage, eligibility, and which level you should take Philippines 2026.',
  path: '/civil-service/professional-vs-subprofessional-cse',
});

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between Professional and Subprofessional Civil Service Exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professional level has 170 items in 3 hours 10 minutes and qualifies you for both first and second-level government positions. Subprofessional has 165 items in 2 hours 40 minutes and qualifies you for first-level positions only. Professional includes Analytical Ability, Subprofessional includes Clerical Ability.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I take both Professional and Subprofessional in the same cycle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. You can only take one level per exam administration. After passing one level you can take the other level in a future cycle.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which level should I take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Take Professional if you have a college degree and want maximum career flexibility including second-level positions with higher salaries. Take Subprofessional if you target clerical or first-level positions or want a higher chance of passing on your first attempt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Professional level harder than Subprofessional?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Professional has more items (170 vs 165), includes Analytical Ability which requires higher-order reasoning, and has a historically lower passing rate (10-17 percent) compared to Subprofessional (17-20 percent).',
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
One of the most common questions among Civil Service Exam applicants is which level to take: **Professional or Subprofessional?** The answer depends on your career goals, current position, and what kind of government job you want.

This guide compares both levels in detail and helps you make the right choice.

---

## Quick Comparison Table

| Feature | Professional | Subprofessional |
|---------|-------------|-----------------|
| Total Items | 170 | 165 |
| Time Limit | 3 hours, 10 minutes | 2 hours, 40 minutes |
| Passing Score | 80 percent | 80 percent |
| Special Subject | Analytical Ability | Clerical Ability |
| Eligibility For | First and second-level positions | First-level positions only |
| Difficulty Level | Higher | Lower |
| Salary Grade Range | SG 1 to SG 24+ | SG 1 to SG 10 |

---

## What Each Level Qualifies You For

### Professional Level Qualifies You For:

**Both first-level and second-level government positions.** This means you can apply for clerical positions AND professional, technical, scientific, or managerial positions.

**Examples of positions requiring Professional eligibility:**

- Administrative Officer II (HRMO I) - Salary Grade 11
- Administrative Officer II (Management & Audit Analyst I) - SG 11
- Computer Programmer I - SG 11
- Internal Auditor I - SG 11
- Records Officer I - SG 10 (some positions)
- Various Division Chief positions
- Most professional, technical, and managerial roles in government

### Subprofessional Level Qualifies You For:

**First-level government positions only.** These are typically clerical, trades, custodial, and administrative aide positions.

**Examples of positions requiring Subprofessional eligibility:**

- Administrative Aide IV (Clerk II) - Salary Grade 4
- Administrative Aide VI (Clerk III) - SG 6
- Computer File Librarian II - SG 10 (some positions)
- Custodial positions
- Trades positions (carpenter, electrician, mechanic in government service)
- Driver positions
- Most positions with Salary Grades 1 to 10

**Important:** Subprofessional eligibility cannot be used for second-level positions. To move up to higher-paying professional positions, you would need to retake and pass the Professional level later.

---

## Detailed Subject Coverage Comparison

### Subjects Both Levels Share

Both Professional and Subprofessional include:

- **Verbal Ability:** Vocabulary, grammar, paragraph organization, reading comprehension
- **Numerical Reasoning:** Basic math, word problems, fractions, decimals, percentages
- **General Information:** Philippine Constitution, RA 6713, Peace and Human Rights, Environment

### Where the Two Levels Differ

**Professional Level Adds: Analytical Ability**

- Word Analogy
- Logic and Abstract Reasoning
- Data Interpretation (tables, graphs, charts)
- Identifying Assumptions and Conclusions

**Subprofessional Level Adds: Clerical Ability**

- Filing (alphabetical and numerical)
- Spelling
- Basic clerical operations

### Why the Difference Matters

Professional positions require higher-order thinking. Analytical Ability tests your ability to interpret data, recognize patterns, and reason logically — skills directly relevant to professional, technical, and managerial work.

Subprofessional positions are mostly clerical. Clerical Ability tests practical office skills like proper filing and accurate spelling — skills directly relevant to first-level administrative work.

---

## Difficulty Comparison

### Why Professional is Harder

**Higher question count:** 170 vs 165 items.

**Higher cognitive demand:** Analytical Ability requires logical reasoning, pattern recognition, and abstract thinking. These are harder skills than the clerical tasks tested in Subprofessional.

**Tighter time per question:** With 170 items in 190 minutes, you have approximately 67 seconds per question. Subprofessional gives you about 58 seconds per question, but the Subprofessional questions are individually less complex.

**Lower historical passing rate:** Professional level historically averages 10 to 17 percent passing rate while Subprofessional averages 17 to 20 percent.

### Why Subprofessional is Easier

**No Analytical Ability section** removes the most difficult subject for many examinees.

**Clerical Ability is mostly procedural** and rewards memorization (alphabetical filing rules, common spelling) rather than reasoning.

**Less time pressure per question** means more time to review your answers.

---

## Which Level Should You Take?

### Take the Professional Level If:

- You have a college degree and want to apply for professional positions
- You currently hold a first-level government position and want to qualify for promotion
- You want maximum career flexibility (Professional eligibility qualifies you for ALL positions)
- You are confident in your reasoning and analytical skills
- You want higher Salary Grade positions

### Take the Subprofessional Level If:

- You only need eligibility for first-level positions (clerical, trades, custodial)
- You are a high school graduate without college education
- You struggle with logic and abstract reasoning
- Your current job target requires only first-level eligibility
- You want a higher chance of passing on your first attempt

### Should You Try Both?

**You can only take one level per exam administration.** However, after passing one level, you can take the other level in a future cycle.

**Common pathway:** Some examinees take Subprofessional first to build confidence and earn first-level eligibility, then take Professional later for full eligibility.

**Important:** You cannot take the same level within 3 months of your previous attempt at that level. So if you fail the Professional level in March, you can take Subprofessional in August (different level), or wait until the next March to retake Professional.

---

## Salary Grade Implications

Government salaries are determined by Salary Grade. Higher Salary Grades mean higher pay.

**Subprofessional eligibility limits you to:**
- SG 1 to SG 10 (most cases)
- Approximate monthly salary range: PHP 14,000 to PHP 23,000 (2026 rates)

**Professional eligibility opens you to:**
- SG 11 and above
- Approximate monthly salary range: PHP 27,000 to PHP 80,000+ for second-level positions

**The salary difference is significant.** A Professional eligible person at SG 11 earns approximately PHP 4,000 to PHP 7,000 more per month than a Subprofessional eligible at SG 10.

Over a 30-year government career, the cumulative salary difference can exceed **PHP 2 million.**

---

## What If You Fail One Level?

### Failed Professional? Take Subprofessional Next.

If you fail Professional, you can apply for Subprofessional in the next cycle. Subprofessional has a higher passing rate, so you have better odds. Earning Subprofessional eligibility lets you start your government career while continuing to prepare for Professional.

### Failed Subprofessional? Try Again or Try Professional.

You can retake Subprofessional after a 3-month gap. Alternatively, if you have improved your verbal and numerical skills, you can attempt Professional in the next cycle.

There is **no limit** to the number of times you can take the CSE.

---

## Both Levels Use the Same Application Process

The application process, requirements, and fee (PHP 500) are identical for both levels. The only difference is which level you select on CS Form No. 100.

For the complete application guide visit [our CSE Application Guide 2026](/civil-service/cse-application-guide-2026).

---

## Start Your CSE Review at LisensyaPrep

Whether you choose Professional or Subprofessional, LisensyaPrep has practice questions for both levels. No account needed.

**[Start Your CSE Practice Quiz at LisensyaPrep](/civil-service)**

---

## Frequently Asked Questions

**Can I take both Professional and Subprofessional in the same exam administration?**
No. You can only take one level per exam administration.

**Does Subprofessional eligibility qualify me for promotion?**
Subprofessional qualifies you for first-level positions only. To be promoted to second-level positions (typically SG 11 and above), you need Professional eligibility.

**Is Subprofessional eligibility "less valuable" than Professional?**
Both are valid Career Service eligibilities. The difference is only the range of positions you can apply for. For someone targeting clerical roles, Subprofessional is exactly what they need.

**Can I upgrade my Subprofessional eligibility to Professional?**
You cannot "upgrade" your eligibility. To get Professional eligibility, you must take and pass the Professional level exam separately.

**Which level has more job openings?**
First-level positions (Subprofessional eligibility required) actually have more total openings because there are more clerical and administrative aide positions in government than professional positions. However, Professional positions pay significantly more.

---

## Related CSE Articles

- [What is the Civil Service Exam Complete Guide 2026](/blog/what-is-the-civil-service-exam)
- [Civil Service Exam Coverage 2026 Complete Subject Breakdown](/civil-service/cse-coverage-2026)
- [How to Apply for the Civil Service Exam 2026](/civil-service/cse-application-guide-2026)
- [How to Pass the Civil Service Exam on Your First Take](/civil-service/how-to-pass-civil-service-exam)
- [CSE Schedule 2026 Complete Timeline](/civil-service/cse-schedule-2026)
`;

export default function ProfessionalVsSubprofessionalCsePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cse-profvssub-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/civil-service" className="text-gray-500 hover:text-gray-300 transition-colors">Civil Service</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Professional vs Subprofessional CSE</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service (CSE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Professional vs Subprofessional Civil Service Exam: Complete Comparison 2026
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
