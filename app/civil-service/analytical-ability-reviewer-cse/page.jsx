import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';

export const metadata = buildMetadata({
  title: 'Analytical Ability Reviewer for CSE Professional Level 2026 Philippines',
  description:
    'Studying for the Civil Service Exam Professional level? This analytical ability reviewer covers word analogy, logic, abstract reasoning, and data interpretation tested only in the CSE Professional level.',
  path: '/civil-service/analytical-ability-reviewer-cse',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Analytical Ability Reviewer for CSE Professional Level 2026 Philippines',
  description:
    'Complete analytical ability reviewer for the Civil Service Exam Professional level covering word analogy, logic and syllogisms, abstract reasoning, data interpretation, and assumptions.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-09',
  dateModified: '2026-05-09',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/civil-service/analytical-ability-reviewer-cse' },
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
Analytical Ability is the section that **only appears on the Professional level** of the Civil Service Exam. With approximately **30 to 35 items** out of 170, it is one of the largest content areas and the section that most differentiates Professional from Subprofessional examinees.

This deep dive reviewer covers all four major question types: word analogy, logic, abstract reasoning, and data interpretation.

---

## What Analytical Ability Tests

The CSE Analytical Ability section assesses higher-order thinking required for second-level government positions including professional, technical, scientific, and managerial roles.

**Topics covered:**

1. Word analogy (relationships between word pairs)
2. Logic (syllogisms, valid arguments, conclusions)
3. Abstract reasoning (pattern recognition in shapes and sequences)
4. Data interpretation (tables, graphs, charts)
5. Identifying assumptions and conclusions

---

## Topic 1: Word Analogy

Word analogy tests your ability to identify the relationship between two words and apply that relationship to other word pairs.

### Format

The format is typically: **WORD A : WORD B :: WORD C : WORD ?**

Read as: "Word A is to Word B as Word C is to Word ?"

### Common Analogy Relationships

**Synonym relationship:**
- HAPPY : JOYFUL :: SAD : ?
- Answer: SORROWFUL (synonyms)

**Antonym relationship:**
- HOT : COLD :: TALL : ?
- Answer: SHORT (antonyms)

**Part-to-Whole relationship:**
- PETAL : FLOWER :: PAGE : ?
- Answer: BOOK (a page is part of a book)

**Whole-to-Part relationship:**
- BICYCLE : WHEEL :: TREE : ?
- Answer: BRANCH or LEAF (a branch is part of a tree)

**Cause-Effect relationship:**
- VIRUS : ILLNESS :: CARELESSNESS : ?
- Answer: ACCIDENT (carelessness causes accidents)

**Tool-User relationship:**
- BRUSH : PAINTER :: SCALPEL : ?
- Answer: SURGEON (a surgeon uses a scalpel)

**Object-Function relationship:**
- KNIFE : CUT :: PEN : ?
- Answer: WRITE (a pen is used to write)

**Member-Group relationship:**
- DOG : MAMMAL :: SHARK : ?
- Answer: FISH (a shark is a fish)

**Item-Category relationship:**
- ROSE : FLOWER :: OAK : ?
- Answer: TREE (an oak is a tree)

**Degree relationship:**
- WARM : HOT :: COOL : ?
- Answer: COLD (cool to cold is the same degree as warm to hot)

### Word Analogy Strategy

**Step 1: Identify the relationship between the first pair.** State it in a complete sentence: "A is the X of B."

**Step 2: Apply the same relationship to the second pair.** Use the exact same sentence structure.

**Step 3: Eliminate wrong answers.** Any answer that does not match the relationship is wrong.

**Step 4: Watch for word order.** PETAL : FLOWER (part to whole) is different from FLOWER : PETAL (whole to part).

---

## Topic 2: Logic and Syllogisms

Logic questions test your ability to draw valid conclusions from given premises.

### Syllogism Basics

A syllogism has two **premises** (statements assumed to be true) and a **conclusion** (claim derived from the premises).

**Example of valid syllogism:**
- Premise 1: All teachers are professionals.
- Premise 2: Maria is a teacher.
- Conclusion: Therefore, Maria is a professional.

This is **valid** because the conclusion necessarily follows from the premises.

### Common Logical Forms

**Universal Affirmative (All A are B):**
- All birds have feathers.
- A robin is a bird.
- Therefore, a robin has feathers. (VALID)

**Universal Negative (No A are B):**
- No fish are mammals.
- A whale is a mammal.
- Therefore, a whale is not a fish. (VALID)

**Particular Affirmative (Some A are B):**
- Some students are athletes.
- Some athletes are tall.
- Therefore, some students are tall. (INVALID - the "some" sets may not overlap)

**Particular Negative (Some A are not B):**
- Some employees are not managers.
- Maria is an employee.
- Therefore, Maria is not a manager. (INVALID - we cannot conclude this about Maria specifically)

### Logical Fallacies to Avoid

**Affirming the consequent:**
- If it is raining, the ground is wet.
- The ground is wet.
- Therefore, it is raining. (INVALID - the ground could be wet for other reasons)

**Denying the antecedent:**
- If it is raining, the ground is wet.
- It is not raining.
- Therefore, the ground is not wet. (INVALID - the ground could still be wet)

### Logic Strategy

**Read each premise as a strict mathematical statement.** "All A are B" means literally everything in set A is also in set B.

**Use Venn diagrams mentally.** Draw circles to represent sets when the logic gets complex.

**Watch for "all" vs "some".** "All" makes claims about every member; "some" makes claims about at least one.

**Distinguish between valid and true.** A conclusion can be valid (logically follows) even if the premises are false. The CSE asks about validity, not truth.

---

## Topic 3: Abstract Reasoning

Abstract reasoning tests pattern recognition using shapes, figures, and sequences without words.

### Common Pattern Types

**Sequence patterns:** Each figure changes systematically.

Example: Square, Triangle, Pentagon, Hexagon, ___?
Pattern: Number of sides increases by 1.
Answer: Heptagon (7 sides)

**Rotation patterns:** A figure rotates by a fixed angle.

Example: An arrow rotating 90 degrees clockwise each step.

**Reflection patterns:** A figure mirrors across an axis.

**Transformation patterns:** Color, size, or shape changes systematically.

**Counting patterns:** The number of elements (lines, dots, shapes) follows a sequence.

### Abstract Reasoning Strategy

**Look for changes in:**
- Shape (square to triangle to pentagon)
- Number of sides or elements
- Color or shading (white to gray to black)
- Position (rotating, reflecting, moving)
- Size (small to medium to large)

**Test multiple variables.** Often a single figure changes in multiple ways. Identify all changes.

**Eliminate impossible answers first.** Some answer choices clearly do not fit. Cross them out.

---

## Topic 4: Data Interpretation

Data interpretation tests your ability to read and analyze information from tables, graphs, and charts.

### Types of Data Displays

**Tables:** Organized rows and columns of numerical data.

**Bar Graphs:** Heights of bars represent values; useful for comparing quantities.

**Line Graphs:** Lines show changes over time; useful for trends.

**Pie Charts:** Slices show proportions; useful for parts of a whole.

### Data Interpretation Strategy

**Step 1: Read the title and labels.** Understand what the data represents before answering questions.

**Step 2: Note the units.** Are values in thousands, millions, percentages?

**Step 3: Read each question carefully.** Identify what specific data point or calculation is needed.

**Step 4: Calculate when needed.** Some questions require percentage calculations or differences.

**Step 5: Verify your answer.** Re-read the question to ensure you answered what was asked.

### Common Data Interpretation Questions

**Direct reading questions:** "According to the table, what was the population of Region X in 2024?"
**Comparison questions:** "Which region had the highest population growth?"
**Percentage questions:** "What percentage of total sales came from Product A?"
**Trend questions:** "What was the average annual increase from 2020 to 2024?"

---

## Topic 5: Assumptions and Conclusions

These questions ask you to identify what must be assumed for an argument to work, or what conclusion follows from given premises.

### Identifying Assumptions

**Example:**
"Government employees should receive higher salaries because they perform critical public services."

**Hidden assumption:** Critical public services should be compensated proportionally to their importance.

If this assumption is false, the argument falls apart.

### Identifying Conclusions

**Example:**
"All teachers are professionals. Maria is a teacher."

**Conclusion:** Maria is a professional.

The conclusion is what necessarily follows from the premises, not what might be true otherwise.

### Strategy

**Look for the main claim.** What is the argument trying to prove?

**Identify hidden assumptions.** What must be true for the conclusion to follow?

**Test by negation.** If you negate an assumption, does the argument fall apart? If yes, you found a real assumption.

---

## Practice Strategy for Analytical Ability

**Daily target:** 25 to 30 analytical questions per day starting 6 weeks before exam.

**Mix all four topics.** Do not specialize. The actual exam mixes question types.

**Time yourself.** Target 60 to 70 seconds per analytical question.

**Review patterns.** Keep notes on common analogy types, logical fallacies, and pattern types.

---

## Common Mistakes in Analytical Ability

**Mistake 1: Relying on outside knowledge for word analogy.** The relationship between A and B is determined by their relationship in the question, not what you know about the words.

**Mistake 2: Confusing valid with true.** A conclusion can be valid (follows from premises) without being true in the real world.

**Mistake 3: Missing multiple changes in abstract reasoning.** Always check for shape, color, size, position, and count changes.

**Mistake 4: Spending too long on one analytical question.** If stuck, mark and move on. Return if time permits.

---

## Practice Analytical Ability at LisensyaPrep

LisensyaPrep has free analytical ability practice questions for CSE Professional level.

**[Start Analytical Ability Practice at LisensyaPrep](/civil-service)**

---

## Related CSE Articles

- [Civil Service Exam Coverage 2026 Complete Subject Breakdown](/civil-service/cse-coverage-2026)
- [Professional vs Subprofessional CSE Complete Comparison](/civil-service/professional-vs-subprofessional-cse)
- [Numerical Reasoning Reviewer for CSE 2026](/civil-service/numerical-reasoning-reviewer-cse)
- [Verbal Ability Reviewer for CSE 2026](/civil-service/verbal-ability-reviewer-cse)
- [How to Pass the Civil Service Exam on Your First Take](/civil-service/how-to-pass-civil-service-exam)
`;

export default function AnalyticalAbilityReviewerCSEPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cse-analytical-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/civil-service","name":"Civil Service"},{"url":"/civil-service/analytical-ability-reviewer-cse","name":"Analytical Ability Reviewer"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/civil-service" className="text-gray-500 hover:text-gray-300 transition-colors">Civil Service</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Analytical Ability Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service (CSE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Analytical Ability Reviewer for CSE Professional Level 2026 Philippines
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 9, 2026</span><span>•</span>
                <span>11 min read</span>
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
