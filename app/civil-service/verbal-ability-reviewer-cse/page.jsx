import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';

export const metadata = buildMetadata({
  title: 'Verbal Ability Reviewer for CSE 2026 (Vocabulary, Grammar, Comprehension)',
  description:
    'Studying for the Civil Service Exam 2026? This verbal ability reviewer covers vocabulary, grammar, paragraph organization, and reading comprehension tested in both Professional and Subprofessional levels.',
  path: '/civil-service/verbal-ability-reviewer-cse',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Verbal Ability Reviewer for CSE 2026 Vocabulary Grammar Comprehension Philippines',
  description:
    'Complete verbal ability reviewer for the Civil Service Exam 2026 covering vocabulary, grammar rules, paragraph organization, reading comprehension strategies, and Filipino language tips.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-09',
  dateModified: '2026-05-09',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/civil-service/verbal-ability-reviewer-cse' },
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
Verbal Ability is the largest single content area in the Civil Service Exam. With approximately **40 to 50 items** spanning vocabulary, grammar, paragraph organization, and reading comprehension across both English and Filipino, mastering this section is essential to reaching the 80 percent passing rate.

This deep dive reviewer covers every verbal subtopic with the rules, patterns, and techniques that work.

---

## What Verbal Ability Tests

The CSE Verbal Ability section assesses your command of language in **both English and Filipino**. Questions are mixed throughout the exam without warning, so you must be prepared in both languages.

**Topics covered:**

1. Vocabulary (synonyms, antonyms, word meaning)
2. Grammar and correct usage
3. Paragraph organization (sentence sequencing)
4. Reading comprehension
5. Spelling (Subprofessional only, but still helpful)

---

## Topic 1: Vocabulary

Vocabulary tests your knowledge of word meanings and relationships. Approximately 15 to 20 items per level.

### Synonyms

A synonym is a word that has the **same or nearly the same meaning** as another word.

**Common CSE synonym examples:**

| Word | Synonyms |
|------|----------|
| Abundant | Plentiful, copious, ample |
| Benevolent | Kind, generous, charitable |
| Concise | Brief, succinct, short |
| Diligent | Hardworking, industrious, persistent |
| Eloquent | Articulate, expressive, fluent |
| Frugal | Thrifty, economical, prudent |
| Genuine | Authentic, real, sincere |
| Humble | Modest, unassuming, meek |
| Incompetent | Unskilled, inept, unqualified |
| Jubilant | Joyful, ecstatic, elated |

### Antonyms

An antonym is a word that has the **opposite meaning** of another word.

**Common CSE antonym examples:**

| Word | Antonym |
|------|---------|
| Abundant | Scarce |
| Benevolent | Malevolent |
| Concise | Verbose |
| Diligent | Lazy |
| Frugal | Wasteful |
| Generous | Stingy |
| Optimistic | Pessimistic |
| Praise | Criticize |
| Tolerant | Intolerant |
| Wise | Foolish |

### Vocabulary Strategy

**Read regularly.** Build vocabulary through exposure to quality writing. Read newspapers (Philippine Daily Inquirer, BusinessWorld), classic novels, and feature articles.

**Use words in sentences.** Memorizing definitions does not stick. Use new words in your own sentences.

**Master Latin and Greek roots.** Many English words share roots. Knowing roots helps decode unfamiliar words.

**Common roots to know:**
- **bene-** (good): benefit, beneficial, benevolent
- **mal-** (bad): malicious, malevolent, malfunction
- **dict-** (say): predict, contradict, dictation
- **port-** (carry): transport, portable, deport
- **vis-/vid-** (see): vision, visible, evident

### Filipino Vocabulary

The CSE includes Filipino vocabulary throughout. Common topics:

**Mga Salitang Kasingkahulugan (Synonyms):**
- Maganda - kaaya-aya, kaakit-akit
- Mabait - matulungin, mabuti
- Malakas - matipuno, malusog
- Mahal - mamahalin, mahalaga

**Mga Salitang Magkasalungat (Antonyms):**
- Maganda x Pangit
- Mabuti x Masama
- Malakas x Mahina
- Maliwanag x Madilim

---

## Topic 2: Grammar and Correct Usage

Grammar tests your ability to identify grammatically correct sentences. Approximately 15 to 20 items per level.

### Subject-Verb Agreement

The verb must agree with the subject in number.

**Singular subject takes singular verb:**
- The student **is** studying.
- The book on the shelves **is** mine.

**Plural subject takes plural verb:**
- The students **are** studying.
- The books on the shelf **are** mine.

**Tricky cases:**
- "Each", "every", "either", "neither" take **singular** verb. (Each of the students **is** ready.)
- Two subjects joined by "and" usually take **plural** verb. (Maria **and** Juan **are** here.)
- Two subjects joined by "or" or "nor" agree with the **closer** subject. (Neither the manager nor the employees **are** present.)

### Pronoun-Antecedent Agreement

The pronoun must match its antecedent in number and gender.

**Singular antecedent takes singular pronoun:**
- A student should bring **his or her** books. (not "their")

**Plural antecedent takes plural pronoun:**
- Students should bring **their** books.

### Verb Tense Consistency

Maintain the same tense throughout a sentence unless time clearly changes.

**Wrong:** Maria walked to the store and **buys** milk.
**Right:** Maria walked to the store and **bought** milk.

### Parallel Structure

Items in a list or comparison must have the same grammatical form.

**Wrong:** She likes swimming, hiking, and **to read**.
**Right:** She likes swimming, hiking, and **reading**.

**Wrong:** The job requires that the applicant **be punctual**, **honest**, and **work hard**.
**Right:** The job requires that the applicant **be punctual**, **be honest**, and **work hard**.

### Common Misused Words

| Word | Correct Usage |
|------|--------------|
| Affect (verb) / Effect (noun) | The weather **affects** mood. The **effect** is visible. |
| Their / There / They're | **Their** house is **there**. **They're** coming. |
| Your / You're | **Your** book is here. **You're** late. |
| Its / It's | The dog wagged **its** tail. **It's** raining. |
| Lose / Loose | Don't **lose** your keys. The screw is **loose**. |
| Then / Than | First do this, **then** that. He is taller **than** me. |

### Filipino Grammar Quick Reference

**Pang-uri (Adjectives) Comparison:**
- Positive: maganda
- Comparative: mas maganda, lalong maganda
- Superlative: pinakamaganda

**Pandiwa (Verbs) Aspect:**
- Pangnagdaan (past): kumain
- Pangkasalukuyan (present): kumakain
- Panghinaharap (future): kakain

**Common Errors:**
- "Hindi" before consonants, "Wala" denotes absence
- "Po" and "opo" are signs of respect, not interchangeable

---

## Topic 3: Paragraph Organization

Paragraph organization tests your ability to arrange jumbled sentences in logical order. Approximately 5 to 10 items per level.

### How to Approach Paragraph Organization

**Step 1: Find the topic sentence.** This is usually the most general statement, often introducing a subject or making a main claim.

**Step 2: Look for transitional words.** Words like "first", "second", "however", "therefore", "in conclusion" signal the order of ideas.

**Step 3: Look for chronological clues.** Time markers like "before", "after", "then", "finally" indicate sequence.

**Step 4: Check pronoun references.** Pronouns like "he", "she", "it", "they" must come AFTER the noun they refer to.

### Common Transitional Words

**Showing addition:** Furthermore, Moreover, In addition, Also
**Showing contrast:** However, Nevertheless, On the other hand, Conversely
**Showing cause:** Because, Since, Due to, As a result
**Showing effect:** Therefore, Consequently, Thus, Hence
**Showing time:** First, Next, Then, Finally, Meanwhile
**Showing example:** For example, For instance, Specifically
**Showing conclusion:** In conclusion, To summarize, Overall

### Paragraph Organization Example

Arrange these sentences in logical order:

**A.** Then she opened the package carefully.
**B.** Maria received an unexpected delivery in the morning.
**C.** Inside was a beautiful handwritten letter from her grandmother.
**D.** She brought the package inside and placed it on the table.

**Correct order: B - D - A - C**

- B introduces the main topic (topic sentence)
- D follows naturally from B (after receiving)
- A continues the action ("then")
- C reveals what was inside (consequence of A)

---

## Topic 4: Reading Comprehension

Reading comprehension passages test your ability to understand and analyze written text. Approximately 10 to 15 items per level.

### Question Types

**1. Main Idea Questions**
"What is the main idea of the passage?" or "What is the author's primary point?"

**Strategy:** The main idea is usually found in the topic sentence (often the first or last sentence) or summarizes the entire passage.

**2. Specific Detail Questions**
"According to the passage, what year did X happen?" or "What does the passage say about Y?"

**Strategy:** Find the exact information in the passage. Do not rely on memory or outside knowledge.

**3. Inference Questions**
"What can be inferred from the passage?" or "The author would most likely agree with..."

**Strategy:** The answer must be supported by the passage but not explicitly stated. Avoid answers that go too far beyond what the passage suggests.

**4. Author's Tone or Purpose Questions**
"The author's tone is best described as..." or "Why did the author write this passage?"

**Strategy:** Pay attention to word choice. Words like "fortunately", "unfortunately", "should", "must" signal tone and stance.

**5. Vocabulary in Context Questions**
"In the passage, the word 'X' most nearly means..."

**Strategy:** Read the surrounding sentences. The word's meaning depends on its specific use, not its dictionary definition.

### Reading Comprehension Strategy

**Read the passage first, then questions.** Some advise reading questions first, but this often causes you to scan for keywords rather than understanding the passage.

**Identify the main idea immediately.** Write a 1-sentence summary of the passage in the margin.

**Mark keywords.** Underline names, dates, numbers, and key claims.

**For inference questions, find supporting evidence.** The correct answer must be defensible based on the passage.

**Eliminate extreme answers.** Answers with words like "always", "never", "all", "none" are usually wrong unless the passage explicitly says so.

---

## Topic 5: Spelling (Subprofessional)

Spelling questions present a sentence with a possibly misspelled word.

### Commonly Misspelled English Words

| Misspelling | Correct |
|------------|---------|
| Recieve | Receive |
| Seperate | Separate |
| Definately | Definitely |
| Occured | Occurred |
| Accomodate | Accommodate |
| Embarass | Embarrass |
| Wierd | Weird |
| Concience | Conscience |
| Beggining | Beginning |
| Goverment | Government |

### Memory Aids

**"i before e except after c":** receive, deceive, ceiling (after c) BUT believe, achieve (before e)

**"Double letters in commonly missed words":**
- Accommodate (two c's, two m's)
- Embarrass (two r's, two s's)
- Occurred (two c's, two r's)

### Filipino Spelling

**Common Filipino spelling errors:**
- "Mga" not "manga" (the plural marker)
- "Ng" not "nang" (when used as a possessive marker)
- "Daw" not "raw" (after consonants)
- "Sariling" not "sarile"

---

## Verbal Ability Practice Strategy

**Daily reading:** 30 minutes of quality writing daily. Mix English and Filipino content.

**Vocabulary notebook:** Write down every new word with its definition and a sample sentence.

**Grammar drills:** 20 to 30 grammar questions per day with explanation review.

**Reading comprehension:** 1 to 2 full passages with questions per day.

**Mock testing:** Time yourself. Aim for 1 minute per verbal question.

---

## Common Mistakes in Verbal Ability

**Mistake 1: Relying on outside knowledge.** Reading comprehension answers come ONLY from the passage. Outside knowledge is irrelevant.

**Mistake 2: Choosing answers that "sound right".** Grammar is rule-based, not feel-based. Apply the rules.

**Mistake 3: Skipping Filipino vocabulary.** Filipino questions are often easier wins for native speakers. Do not neglect them.

**Mistake 4: Spending too long on one passage.** If a passage is taking too long, answer what you can and return later.

---

## Practice Verbal Ability at LisensyaPrep

LisensyaPrep has free verbal ability practice questions for CSE in both English and Filipino.

**[Start Verbal Ability Practice at LisensyaPrep](/civil-service)**

---

## Related CSE Articles

- [Civil Service Exam Coverage 2026 Complete Subject Breakdown](/civil-service/cse-coverage-2026)
- [Numerical Reasoning Reviewer for CSE 2026](/civil-service/numerical-reasoning-reviewer-cse)
- [Analytical Ability Reviewer for CSE 2026](/civil-service/analytical-ability-reviewer-cse)
- [Clerical Ability Reviewer for CSE Subprofessional Level 2026](/civil-service/clerical-ability-reviewer-cse)
- [How to Pass the Civil Service Exam on Your First Take](/civil-service/how-to-pass-civil-service-exam)
`;

export default function VerbalAbilityReviewerCSEPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cse-verbal-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/civil-service","name":"Civil Service"},{"url":"/civil-service/verbal-ability-reviewer-cse","name":"Verbal Ability Reviewer"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/civil-service" className="text-gray-500 hover:text-gray-300 transition-colors">Civil Service</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Verbal Ability Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service (CSE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Verbal Ability Reviewer for CSE 2026 (Vocabulary, Grammar, Comprehension)
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
