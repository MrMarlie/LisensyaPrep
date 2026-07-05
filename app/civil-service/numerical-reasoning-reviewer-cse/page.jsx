import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';

export const metadata = buildMetadata({
  title: 'Numerical Reasoning Reviewer for CSE 2026 (Complete Guide Philippines)',
  description:
    'Studying for the Civil Service Exam 2026? This numerical reasoning reviewer covers basic operations, fractions, percentages, ratios, word problems, and shortcut techniques tested in the CSE.',
  path: '/civil-service/numerical-reasoning-reviewer-cse',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Numerical Reasoning Reviewer for CSE 2026 Complete Guide Philippines',
  description:
    'Complete numerical reasoning reviewer for the Civil Service Exam 2026 covering basic operations, fractions, percentages, ratios, word problems, sequences, and shortcut techniques.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-09',
  dateModified: '2026-05-09',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/civil-service/numerical-reasoning-reviewer-cse' },
};

const ALL_CSE_ARTICLES = [
  { text: 'What is the Civil Service Exam? Complete Guide 2026', href: '/blog/what-is-the-civil-service-exam' },
  { text: 'Civil Service Exam Coverage 2026 Complete Subject Breakdown', href: '/civil-service/cse-coverage-2026' },
  { text: 'Civil Service Exam Schedule 2026 Complete Timeline', href: '/civil-service/cse-schedule-2026' },
  { text: 'How to Apply for the Civil Service Exam 2026', href: '/civil-service/cse-application-guide-2026' },
  { text: 'Professional vs Subprofessional CSE Complete Comparison', href: '/civil-service/professional-vs-subprofessional-cse' },
  { text: 'How to Pass the Civil Service Exam on Your First Take', href: '/civil-service/how-to-pass-civil-service-exam' },
  { text: 'Numerical Reasoning Reviewer for CSE 2026', href: '/civil-service/numerical-reasoning-reviewer-cse' },
  { text: 'Verbal Ability Reviewer for CSE 2026', href: '/civil-service/verbal-ability-reviewer-cse' },
  { text: 'Analytical Ability Reviewer for CSE Professional Level 2026', href: '/civil-service/analytical-ability-reviewer-cse' },
  { text: 'Clerical Ability Reviewer for CSE Subprofessional Level 2026', href: '/civil-service/clerical-ability-reviewer-cse' },
  { text: 'Philippine Constitution Reviewer for CSE 2026', href: '/civil-service/philippine-constitution-reviewer-cse' },
  { text: 'RA 6713 Code of Conduct Reviewer for CSE 2026', href: '/civil-service/ra-6713-reviewer-cse' },
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
Numerical Reasoning is one of the most consistently tested and most feared subjects on the Civil Service Exam. Approximately **25 to 30 items** out of 170 (Professional) or 165 (Subprofessional) test your math skills under tight time pressure with **no calculator allowed**.

This deep dive reviewer covers every major topic, the shortcut techniques that save time, and the question patterns that appear in every CSE cycle.

---

## What Numerical Reasoning Tests

The CSE Numerical Reasoning section assesses your ability to solve mathematical problems quickly and accurately using only mental computation and pen-and-paper work.

**Key constraint:** Calculators and electronic devices are strictly prohibited. You must master mental math and shortcut techniques.

**Topics covered:**

1. Basic arithmetic operations
2. Order of operations (PEMDAS)
3. Fractions, decimals, percentages
4. Ratio and proportion
5. Word problems (age, time, distance, work, money)
6. Number sequences and patterns
7. Averages and weighted averages

---

## Topic 1: Basic Arithmetic Operations

Master these foundations because they appear in every other topic.

### Addition and Subtraction Shortcuts

**Round and adjust:** When adding 47 + 38, round to 50 + 40 = 90, then subtract the rounding error: 90 - 3 - 2 = 85.

**Left to right addition:** For 234 + 567, add hundreds first (200 + 500 = 700), then tens (30 + 60 = 90), then ones (4 + 7 = 11). Total: 800 + 1 = 801.

### Multiplication Shortcuts

**Multiply by 5:** Multiply by 10, then divide by 2. Example: 84 x 5 = 840 / 2 = 420.

**Multiply by 11:** For 2-digit numbers, add the digits and place between them. Example: 36 x 11 = 3 (3+6=9) 6 = 396.

**Multiply by 25:** Multiply by 100, then divide by 4. Example: 32 x 25 = 3,200 / 4 = 800.

**Multiply by 9:** Multiply by 10, then subtract the original. Example: 47 x 9 = 470 - 47 = 423.

### Division Shortcuts

**Divide by 5:** Multiply by 2, then divide by 10. Example: 240 / 5 = 480 / 10 = 48.

**Divide by 25:** Multiply by 4, then divide by 100. Example: 800 / 25 = 3,200 / 100 = 32.

---

## Topic 2: Order of Operations (PEMDAS)

PEMDAS dictates the sequence of operations in a math expression.

**P** - Parentheses
**E** - Exponents
**MD** - Multiplication and Division (left to right)
**AS** - Addition and Subtraction (left to right)

**Example:** 8 + 6 x (4 - 2) squared divided by 3

Step 1 (Parentheses): 8 + 6 x 4 / 3
Step 2 (Exponents): 8 + 6 x 4 / 3
Step 3 (Multiplication, left to right): 8 + 24 / 3
Step 4 (Division): 8 + 8
Step 5 (Addition): **16**

**Common mistake:** Doing multiplication before division when division comes first reading left to right.

---

## Topic 3: Fractions, Decimals, Percentages

These three forms represent the same value and questions often require converting between them.

### Conversion Reference

| Fraction | Decimal | Percentage |
|----------|---------|------------|
| 1/2 | 0.5 | 50% |
| 1/3 | 0.333... | 33.33% |
| 1/4 | 0.25 | 25% |
| 1/5 | 0.2 | 20% |
| 1/6 | 0.1667 | 16.67% |
| 1/8 | 0.125 | 12.5% |
| 2/3 | 0.667 | 66.67% |
| 3/4 | 0.75 | 75% |
| 3/5 | 0.6 | 60% |
| 4/5 | 0.8 | 80% |

**Memorize this table.** It will save 30 to 60 seconds on multiple questions.

### Fraction Operations

**Adding/Subtracting Fractions:** Find common denominator first.
1/3 + 1/4 = 4/12 + 3/12 = 7/12

**Multiplying Fractions:** Multiply numerators, multiply denominators.
2/3 x 3/4 = 6/12 = 1/2

**Dividing Fractions:** Flip the second fraction, then multiply.
2/3 / 1/4 = 2/3 x 4/1 = 8/3 = 2 2/3

### Percentage Shortcuts

**10 percent of any number:** Move decimal one place left. 10% of 250 = 25.

**1 percent of any number:** Move decimal two places left. 1% of 250 = 2.5.

**5 percent:** Half of 10%. 5% of 250 = 12.5.

**15 percent:** 10% + 5%. 15% of 200 = 20 + 10 = 30.

**20 percent:** Double 10%. 20% of 250 = 50.

**25 percent:** Divide by 4. 25% of 200 = 50.

**50 percent:** Divide by 2. 50% of 84 = 42.

---

## Topic 4: Ratio and Proportion

A ratio compares two quantities. A proportion is two equal ratios.

### Ratio Basics

**Reading a ratio:** 3:5 reads as "3 is to 5" or "3 to 5".

**Simplifying ratios:** Like simplifying fractions. 12:18 simplifies to 2:3 (divide both by 6).

**Total parts:** In ratio 3:5, total parts = 3 + 5 = 8.

### Solving Ratio Problems

**Example:** Two siblings share PHP 1,200 in the ratio 3:5. How much does each receive?

Total parts = 3 + 5 = 8
Each part = 1,200 / 8 = 150
First sibling: 3 x 150 = **PHP 450**
Second sibling: 5 x 150 = **PHP 750**

### Proportion (Cross Multiplication)

If a/b = c/d, then a x d = b x c

**Example:** If 5 workers can finish a job in 12 days, how many days will 8 workers need?

This is **inverse proportion** (more workers = fewer days):
5 x 12 = 8 x d
60 = 8d
d = **7.5 days**

---

## Topic 5: Word Problems by Type

Word problems are the most challenging part of CSE Numerical Reasoning. Each type follows a recognizable pattern.

### Age Problems

**Example:** Maria is 3 times as old as her sister. In 5 years, she will be twice as old. How old is Maria now?

Let sister's current age = x
Maria's current age = 3x
In 5 years: Maria = 3x + 5, Sister = x + 5
3x + 5 = 2(x + 5)
3x + 5 = 2x + 10
x = 5

Maria is currently 3 x 5 = **15 years old**.

### Distance, Rate, Time Problems

**Formula:** Distance = Rate x Time (D = R x T)

**Example:** A car travels at 60 km/h for 4 hours. How far does it go?
D = 60 x 4 = **240 km**

**Example:** Two cars start from the same point traveling in opposite directions at 50 km/h and 60 km/h. How long until they are 330 km apart?
Combined rate = 50 + 60 = 110 km/h
Time = 330 / 110 = **3 hours**

### Work Problems

**Formula:** If A finishes in x hours, A's rate = 1/x per hour.

**Example:** A finishes a job in 6 hours. B finishes the same job in 4 hours. How long if they work together?

A's rate = 1/6, B's rate = 1/4
Combined rate = 1/6 + 1/4 = 2/12 + 3/12 = 5/12
Time = 1 / (5/12) = 12/5 = **2.4 hours** (2 hours 24 minutes)

### Money Problems

**Example:** Ana invested PHP 10,000 at 5% simple interest per year. How much interest after 3 years?

Simple Interest = Principal x Rate x Time
SI = 10,000 x 0.05 x 3 = **PHP 1,500**

### Mixture Problems

**Example:** How much water must be added to 50 mL of 40% alcohol solution to make it 25% alcohol?

Pure alcohol stays the same: 50 x 0.40 = 20 mL
Final volume x 0.25 = 20
Final volume = 80 mL
Water added = 80 - 50 = **30 mL**

---

## Topic 6: Number Sequences

Identify the pattern, predict the next number.

### Common Patterns

**Arithmetic sequence:** Constant difference between terms.
2, 5, 8, 11, ___ (difference = 3, next = 14)

**Geometric sequence:** Constant ratio between terms.
3, 6, 12, 24, ___ (ratio = 2, next = 48)

**Squared numbers:** 1, 4, 9, 16, 25, ___ (next = 36)

**Cubed numbers:** 1, 8, 27, 64, ___ (next = 125)

**Fibonacci-like:** Each term is the sum of the two before.
1, 1, 2, 3, 5, 8, ___ (next = 13)

**Alternating patterns:** Two patterns interleaved.
2, 5, 4, 10, 6, 15, ___ (odd positions: +2, even positions: x2; next = 8)

---

## Topic 7: Averages

**Arithmetic Mean:** Sum / Number of items.

**Example:** Test scores 85, 90, 78, 92, 80. Average = (85 + 90 + 78 + 92 + 80) / 5 = 425 / 5 = **85**.

**Weighted Average:** Each value is multiplied by its weight before summing.

**Example:** Quiz worth 30%, Exam worth 70%. Quiz score 80, Exam score 90. Final grade?
(80 x 0.30) + (90 x 0.70) = 24 + 63 = **87**

---

## Practice Strategy for Numerical Reasoning

**Daily target:** 20 to 30 numerical questions per day starting 8 weeks before exam.

**Time yourself:** Target 60 seconds per question. If you finish faster, accuracy is more important than speed.

**Track common mistakes:** Keep a notebook of errors. Review weekly.

**Master multiplication tables:** Memorize 1x1 through 15x15. This single skill saves enormous time.

**Practice without calculator:** Train your brain. Calculators are not allowed on exam day.

---

## Common Mistakes That Cost Points

**Mistake 1: Misreading the question.** Read every word carefully. The question may ask "how many more" not "how many total".

**Mistake 2: Not converting units.** Convert hours to minutes, kilometers to meters, etc., when needed.

**Mistake 3: Skipping the scratch work.** Use the test booklet margins to organize your work. Mental math errors cost easy points.

**Mistake 4: Spending too long on one question.** If a question takes more than 90 seconds, mark it and move on.

**Mistake 5: Not checking answer choices.** Some answer choices are obvious traps (off by one, wrong sign). Eliminate clearly wrong options first.

---

## Practice Numerical Reasoning at LisensyaPrep

LisensyaPrep has free numerical reasoning practice questions for CSE. Test your skills under timed conditions.

**[Start Numerical Reasoning Practice at LisensyaPrep](/civil-service)**

---

## Related CSE Articles

- [Civil Service Exam Coverage 2026 Complete Subject Breakdown](/civil-service/cse-coverage-2026)
- [Verbal Ability Reviewer for CSE 2026](/civil-service/verbal-ability-reviewer-cse)
- [Analytical Ability Reviewer for CSE 2026](/civil-service/analytical-ability-reviewer-cse)
- [How to Pass the Civil Service Exam on Your First Take](/civil-service/how-to-pass-civil-service-exam)
- [What is the Civil Service Exam Complete Guide](/blog/what-is-the-civil-service-exam)
`;

export default function NumericalReasoningReviewerCSEPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cse-numerical-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/civil-service","name":"Civil Service"},{"url":"/civil-service/numerical-reasoning-reviewer-cse","name":"Numerical Reasoning Reviewer"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/civil-service" className="text-gray-500 hover:text-gray-300 transition-colors">Civil Service</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Numerical Reasoning Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service (CSE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Numerical Reasoning Reviewer for CSE 2026 (Complete Guide Philippines)
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
