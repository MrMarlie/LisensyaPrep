import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';

export const metadata = buildMetadata({
  title: 'Clerical Ability Reviewer for CSE Subprofessional Level 2026 Philippines',
  description:
    'Studying for the Civil Service Exam Subprofessional level? This clerical ability reviewer covers alphabetical filing, numerical filing, spelling, and basic clerical operations tested only in the Subprofessional level.',
  path: '/civil-service/clerical-ability-reviewer-cse',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Clerical Ability Reviewer for CSE Subprofessional Level 2026 Philippines',
  description:
    'Complete clerical ability reviewer for the Civil Service Exam Subprofessional level covering alphabetical filing rules, numerical filing, common spelling errors, and basic clerical operations.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-09',
  dateModified: '2026-05-09',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/civil-service/clerical-ability-reviewer-cse' },
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
Clerical Ability is the section that **only appears on the Subprofessional level** of the Civil Service Exam. With approximately **30 to 35 items** out of 165, it tests practical office skills relevant to first-level clerical, administrative, and trades positions.

Unlike the more abstract Analytical Ability tested in the Professional level, Clerical Ability is concrete and rule-based. Master the rules and the patterns become predictable.

---

## What Clerical Ability Tests

The CSE Clerical Ability section assesses your readiness for first-level office positions through three main skill areas.

**Topics covered:**

1. Alphabetical filing
2. Numerical filing
3. Spelling
4. Basic clerical operations

Calculators are not allowed for any clerical questions involving numbers.

---

## Topic 1: Alphabetical Filing

Alphabetical filing tests your ability to arrange names, words, and items in proper alphabetical sequence following standard filing rules.

### Basic Alphabetical Rules

**Rule 1: Compare letter by letter from left to right.**

Examples in proper order:
- ABLE
- ABLER
- ABLES
- ABOVE

When comparing ABLE and ABLES, the first 4 letters are identical. ABLE comes first because it has no fifth letter while ABLES has S.

**Rule 2: For names, last name comes first, then first name, then middle name.**

Examples in proper order:
- Cruz, Anna M.
- Cruz, Antonio P.
- Cruz, Maria T.

The last names are identical (Cruz), so we compare first names: Anna, Antonio, Maria.

**Rule 3: Identical names are arranged by suffix (Jr., Sr., II, III).**

Examples in proper order:
- Santos, Jose Sr.
- Santos, Jose Jr.
- Santos, Jose II

(Sr. comes before Jr., then numerical suffixes in order)

### Filing Special Cases

**Hyphenated names:** Treat the hyphen as a single name.
- Smith-Jones is filed as "Smith Jones" (one unit)

**Names with prefixes (De, Del, Dela, Van, Mc):** Treat prefixes as part of the surname.
- Dela Cruz is filed under "D"
- Van der Berg is filed under "V"
- McDonald is filed under "M"

**Filipino names with "y" (Maria y Santos):** The "y" portion is treated as part of the surname.

**Companies starting with "The":** Ignore "The" for filing purposes.
- "The First National Bank" is filed under "F"

**Companies with numbers:** Numbers come before letters.
- "1st Avenue Bakery" comes before "Always Fresh Bakery"
- Or numbers are spelled out: "First Avenue" comes after "Fifth Avenue"

### Alphabetical Filing Practice

Arrange these names in alphabetical order:

1. Reyes, Pedro
2. Reyes, Maria
3. Reyes, Anna
4. Reyes, Antonio

**Correct order:** Reyes Anna - Reyes Antonio - Reyes Maria - Reyes Pedro

(Same surname, so first names alphabetical: Anna, Antonio, Maria, Pedro)

---

## Topic 2: Numerical Filing

Numerical filing tests your ability to arrange numbers in correct sequential order.

### Basic Numerical Rules

**Rule 1: Smaller numbers come before larger numbers.**
- 100 - 250 - 1,500 - 10,000

**Rule 2: Compare digit by digit when numbers have the same number of digits.**
- 234 - 256 - 289 - 312

**Rule 3: For numbers with different digit counts, fewer digits usually come first when filing in ascending order.**
- 99 - 100 - 999 - 1,000

### Numerical Filing Special Cases

**Decimal numbers:**
- 0.05 - 0.5 - 5.0 - 50.0
- (Move decimal point and compare)

**Negative numbers:** Larger absolute value goes first when negative.
- -100 - -50 - -1 - 0 - 1 - 50 - 100

**File codes with letters and numbers:** Sort first by letters, then by numbers.
- A-1 - A-2 - A-10 - B-1 - B-5

### Numerical Filing Practice

Arrange these file codes in numerical filing order:

- File 145
- File 089
- File 1450
- File 14
- File 145.5

**Correct order:** File 14 - File 089 - File 145 - File 145.5 - File 1450

(14 has fewest digits and lowest value; 089 = 89 which is less than 145; 145.5 is between 145 and 1450)

---

## Topic 3: Spelling

Spelling questions present sentences with possibly misspelled words. You identify the correct or incorrect spelling.

### Common English Spelling Rules

**Rule 1: "i before e except after c"**
- Correct: believe, achieve, niece
- Exception (after c): receive, deceive, ceiling
- Exceptions to memorize: weird, leisure, foreign, height

**Rule 2: Doubling consonants when adding suffixes**
- For one-syllable words ending in CVC (consonant-vowel-consonant), double the final consonant: stop - stopping, run - running
- For multi-syllable words, double only if the stress is on the last syllable: begin - beginning, refer - referring

**Rule 3: Dropping final "e" before adding suffixes**
- Drop "e" before suffixes starting with vowels: hope - hoping, bake - baking
- Keep "e" before suffixes starting with consonants: hopeful, lonely

**Rule 4: Changing "y" to "i"**
- When adding suffixes to words ending in consonant + y, change y to i: happy - happier, study - studied
- Keep y when followed by suffix starting with i: study - studying

### Frequently Misspelled Words

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
| Independant | Independent |
| Maintainence | Maintenance |
| Privledge | Privilege |
| Recomend | Recommend |
| Acheive | Achieve |
| Beleive | Believe |
| Calender | Calendar |
| Cemetary | Cemetery |
| Concious | Conscious |
| Existance | Existence |

### Filipino Spelling Rules

**Common Filipino spelling errors:**

- **"Mga"** is the correct plural marker (NOT "manga")
- **"Ng"** is used as a possessive marker (NOT "nang")
- **"Daw"** is used after consonants (NOT "raw")
- **"Raw"** is used after vowels
- **"Po"** and **"opo"** are signs of respect (different uses, not interchangeable)
- **"Sariling"** (NOT "sarile")
- **"Pamamahala"** (NOT "pamamahalaan" in this context)

---

## Topic 4: Basic Clerical Operations

Basic clerical operations include simple math operations applied to office tasks.

### Counting and Tallying

**Example:** A clerk processed 47 documents on Monday, 53 on Tuesday, 38 on Wednesday, 62 on Thursday, and 50 on Friday. What is the total?

47 + 53 + 38 + 62 + 50 = **250 documents**

### Calculating Averages

**Example:** Using the data above, what is the average documents per day?

250 / 5 = **50 documents per day**

### Time and Schedule Calculations

**Example:** A meeting starts at 1:30 PM and lasts 2 hours and 45 minutes. What time does it end?

1:30 PM + 2:45 = **4:15 PM**

### Quantity and Inventory

**Example:** An office has 144 reams of paper. They use 12 reams per week. How many weeks before they run out?

144 / 12 = **12 weeks**

---

## Practice Strategy for Clerical Ability

**Daily target:** 20 to 30 clerical questions per day starting 6 weeks before exam.

**Master the filing rules first.** Memorize all alphabetical and numerical filing rules until they are automatic.

**Build a spelling word list.** Maintain a notebook of words you commonly misspell. Review weekly.

**Time yourself.** Target 30 to 45 seconds per clerical question. These should be quick wins.

---

## Common Mistakes in Clerical Ability

**Mistake 1: Forgetting filing rules for special cases.** Hyphenated names, prefixes, and "The" all have specific rules. Memorize them.

**Mistake 2: Misreading numbers.** When filing 1,500 vs 15,000, look at the comma placement carefully.

**Mistake 3: Falling for almost-correct spellings.** "Definately" looks reasonable but is wrong. The correct spelling is "Definitely".

**Mistake 4: Spending too long on one filing question.** Filing should be quick. If you cannot decide in 45 seconds, mark and move on.

---

## Practice Clerical Ability at LisensyaPrep

LisensyaPrep has free clerical ability practice questions for CSE Subprofessional level.

**[Start Clerical Ability Practice at LisensyaPrep](/civil-service)**

---

## Related CSE Articles

- [Civil Service Exam Coverage 2026 Complete Subject Breakdown](/civil-service/cse-coverage-2026)
- [Professional vs Subprofessional CSE Complete Comparison](/civil-service/professional-vs-subprofessional-cse)
- [Numerical Reasoning Reviewer for CSE 2026](/civil-service/numerical-reasoning-reviewer-cse)
- [Verbal Ability Reviewer for CSE 2026](/civil-service/verbal-ability-reviewer-cse)
- [How to Pass the Civil Service Exam on Your First Take](/civil-service/how-to-pass-civil-service-exam)
`;

export default function ClericalAbilityReviewerCSEPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cse-clerical-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/civil-service","name":"Civil Service"},{"url":"/civil-service/clerical-ability-reviewer-cse","name":"Clerical Ability Reviewer"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/civil-service" className="text-gray-500 hover:text-gray-300 transition-colors">Civil Service</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Clerical Ability Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service (CSE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Clerical Ability Reviewer for CSE Subprofessional Level 2026 Philippines
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
      <ArticlePopupTriggers type="cse" />
    </div>
  );
}
