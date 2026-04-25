import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'General Education Reviewer for LET Philippines 2026 (Complete Guide)',
  description:
    'Studying for the LET board exam? This general education reviewer covers English communication, Filipino, mathematics, science, social studies, and other GenEd topics tested in the LET.',
  path: '/education/general-education-reviewer',
  image: '/images/articles/hero-let-general-education.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'General Education Reviewer for LET Philippines 2026',
  description:
    'Complete general education reviewer for the Licensure Examination for Teachers covering English, Filipino, Mathematics, Science, Social Studies, and Technology and Livelihood Education.',
  image: 'https://lisensyaprep.com/images/articles/hero-let-general-education.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-25',
  dateModified: '2026-04-25',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://lisensyaprep.com/education/general-education-reviewer',
  },
};

const RELATED_ARTICLES = [
  { text: 'How to Pass the LET on Your First Take', href: '/education/how-to-pass-let-first-take' },
  { text: 'Professional Education Reviewer LET 2026', href: '/education/professional-education-reviewer' },
  { text: 'LET Secondary Major English Reviewer 2026', href: '/education/let-secondary-major-english-reviewer' },
  { text: 'LET Secondary Major Math Reviewer 2026', href: '/education/let-secondary-major-math-reviewer' },
  { text: 'PRC Board Exam Schedule 2026 for All Professions', href: '/blog/prc-board-exam-schedule-2026' },
];

function formatInline(text) {
  let result = text
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]*)\)/g,
      (_, t, url) =>
        `<a href="${url}"${url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''} class="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">${t}</a>`
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em class="text-gray-400 italic">$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-white/10 px-1 rounded text-yellow-300 text-xs">$1</code>');
  return result.replace(
    /(?<![">])\b((?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.(?:gov\.ph|com\.ph|edu\.ph|org\.ph|com|net|org|ph)(?:\/[^\s<>"']*)?)\b/g,
    (url) => {
      const href = /^https?:\/\//.test(url) ? url : `https://${url}`;
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">${url}</a>`;
    }
  );
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
      elements.push(
        <li key={key++} className="text-gray-300 text-sm ml-4 mb-1 flex items-start gap-2">
          <span className="text-yellow-400 mt-1 flex-shrink-0">•</span>
          <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
        </li>
      );
    } else if (line.startsWith('| ') && line.endsWith(' |')) {
      const cells = line.split('|').filter((c) => c.trim() && !c.match(/^[-\s]+$/));
      const isHeader = i > 0 && lines[i + 1]?.includes('---');
      if (isHeader) {
        elements.push(
          <tr key={key++} className="border-b border-white/10">
            {cells.map((cell, ci) => (
              <th key={ci} className="px-4 py-2 text-left text-yellow-400 font-semibold text-sm">{cell.trim()}</th>
            ))}
          </tr>
        );
      } else if (!line.match(/^\|[-\s|]+\|$/)) {
        elements.push(
          <tr key={key++} className="border-b border-white/5">
            {cells.map((cell, ci) => (
              <td key={ci} className="px-4 py-2 text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: formatInline(cell.trim()) }} />
            ))}
          </tr>
        );
      }
    } else if (line.trim().startsWith('**') && line.includes('**')) {
      elements.push(
        <p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(
        <p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    }
  }
  const wrapped = [];
  let tableBuffer = [];
  let inTable = false;
  for (const el of elements) {
    if (el.type === 'tr') {
      inTable = true;
      tableBuffer.push(el);
    } else {
      if (inTable) {
        wrapped.push(
          <div key={`tbl-${key++}`} className="overflow-x-auto my-4">
            <table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden">
              <tbody>{tableBuffer}</tbody>
            </table>
          </div>
        );
        tableBuffer = [];
        inTable = false;
      }
      wrapped.push(el);
    }
  }
  if (inTable && tableBuffer.length) {
    wrapped.push(
      <div key="tbl-final" className="overflow-x-auto my-4">
        <table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden">
          <tbody>{tableBuffer}</tbody>
        </table>
      </div>
    );
  }
  return wrapped;
}

const SECTION_1 = `
*By LisensyaPrep Team | Last Updated: April 2026 | 10-minute read*

---

General Education is the second major component of the Licensure Examination for Teachers. It covers a wide range of subject areas and many examinees find it challenging precisely because of that breadth. The key to reviewing GenEd effectively is not trying to cover everything equally but identifying the highest-yield topics within each subject area and spending most of your time there.

This reviewer covers the major GenEd topic areas with a focus on what actually shows up in the LET.

---

## What General Education Covers
`;

const SECTION_2 = `
---

## English: Communication and Reading

English in the LET GenEd component focuses primarily on communication skills and reading comprehension rather than literature. These are the highest-yield areas.

### Reading Comprehension Strategies

**Main idea questions** ask you to identify what a passage is primarily about. The main idea is the central thought that all other details support. It is often found in the topic sentence of the first paragraph but not always.

**Inference questions** ask you to draw conclusions from information implied but not directly stated in the passage. These require reading between the lines.

**Vocabulary in context questions** ask for the meaning of a word as it is used in a specific passage, not its general dictionary definition.

**Author's purpose questions** ask why the author wrote the passage. Common purposes are to inform, to persuade, to entertain, or to describe.

### Grammar and Usage

Focus on these grammar areas as they appear most consistently in LET GenEd:

**Subject-verb agreement:** The verb must agree with its subject in number. Collective nouns (class, team, family) take singular verbs when acting as a unit.

**Pronoun-antecedent agreement:** A pronoun must agree with its antecedent in number and gender.

**Correct use of tenses:** Pay attention to time markers in sentences that signal which tense is appropriate.

**Modifiers:** Misplaced and dangling modifiers are common test items. A modifier should be placed as close as possible to the word it modifies.

---

## Filipino: Komunikasyon at Pagbasa

The Filipino component of GenEd tests grammar, reading comprehension in Filipino, and basic literary concepts.

### Key Grammar Concepts in Filipino

**Kayarian ng pangungusap** covers sentence structure including the predicate (panaguri) and subject (paksa).

**Uri ng pangungusap ayon sa kayarian** includes simple (payak), compound (tambal), complex (hugnayan), and compound-complex sentences.

**Bantas** covers punctuation rules in Filipino writing.

**Gamit ng salita** covers the correct contextual use of Filipino words, including formal and informal registers.

---

## Mathematics: High-Yield Topics for GenEd

Mathematics in LET GenEd focuses on problem-solving across several topic areas. These are the most consistently tested:

### Statistics and Probability

**Measures of central tendency:** Mean is the arithmetic average. Median is the middle value when data is arranged in order. Mode is the most frequently occurring value. The LET frequently asks which measure is most appropriate for a given situation.

**Measures of variability:** Range is the difference between the highest and lowest values. Standard deviation measures how spread out values are from the mean.

**Probability:** P(Event) = Number of favorable outcomes divided by total number of possible outcomes. Know how to compute probability of simple and compound events.

### Arithmetic and Number Sense

**Ratio and proportion:** If A is to B as C is to D, then A times D equals B times C. This cross-multiplication principle appears frequently.

**Percentage problems:** Percentage equals rate times base. Identify which value is the rate (percent), which is the base (the whole), and which is the percentage (the part).

**Word problems involving integers, fractions, and decimals** appear regularly. Practice setting up the equation before solving.

### Geometry

**Perimeter, area, and volume formulas** for common shapes are tested. Know formulas for rectangles, triangles, circles, and basic 3D shapes.

**Pythagorean theorem:** In a right triangle, a squared plus b squared equals c squared where c is the hypotenuse.

---

## Science: Key Concepts for GenEd

Science in LET GenEd covers basic concepts across biology, chemistry, physics, and earth science. Focus on conceptual understanding rather than detailed calculations.

### Biology

**Cell theory:** All living things are made of cells, the cell is the basic unit of life, and all cells come from pre-existing cells.

**Photosynthesis:** Plants convert sunlight, water, and carbon dioxide into glucose and oxygen. Equation: 6CO2 plus 6H2O plus light energy produces C6H12O6 plus 6O2.

**DNA and genetics:** DNA carries genetic information. Genes determine inherited traits. Dominant alleles are expressed over recessive alleles.

### Physics

**Newton's Laws of Motion:**
First law: An object at rest stays at rest and an object in motion stays in motion unless acted upon by an unbalanced force.
Second law: Force equals mass times acceleration (F = ma).
Third law: For every action there is an equal and opposite reaction.

---

## Social Studies: Philippine History and Government

### Key Events in Philippine History

The LET tests broad knowledge of Philippine history with emphasis on the colonial period, the struggle for independence, and the contemporary period.

Know the sequence: Pre-colonial Philippines, Spanish colonization (1565), British occupation (1762), Philippine Revolution (1896), Execution of Rizal (1896), Aguinaldo's Declaration of Independence (1898), American period, Commonwealth, Japanese occupation, Third Republic, Marcos era and Martial Law, EDSA Revolution (1986), contemporary period.

### Philippine Government Structure

The Philippines is a democratic and republican state with three branches of government.

**Legislative branch:** Congress composed of the Senate (24 senators elected at-large) and the House of Representatives (district and party-list representatives).

**Executive branch:** The President serves as head of state and government. Elected to a single 6-year term with no reelection.

**Judicial branch:** Supreme Court as the highest court, with the Court of Appeals and lower courts below it.

---

## Study Strategy for GenEd

Because GenEd covers so many subject areas, the most efficient approach is to take a diagnostic test across all subject areas first and identify where you are already strong versus where you need the most work. Spend the bulk of your review time on your two or three weakest areas rather than reviewing everything equally.

Practice questions for LET General Education are available at LisensyaPrep. No account needed.

**[Practice General Education Questions at LisensyaPrep](https://lisensyaprep.com)**
`;

export default function GeneralEducationReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-let-genEd" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">General Education Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">
                Education (LET)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                General Education Reviewer for LET Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 25, 2026</span>
                <span>•</span>
                <span>10 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-let-general-education.jpg"
                alt="Filipino education graduate in academic gown holding books for LET general education reviewer Philippines 2026"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="260" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">LET General Education Subject Areas</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="50" y="52" width="195" height="70" fill="#1e3a5f" rx="8"/>
                  <text x="147" y="76" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">English</text>
                  <text x="147" y="94" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Communication, reading</text>
                  <text x="147" y="110" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">comprehension, grammar</text>
                  <rect x="255" y="52" width="195" height="70" fill="#172033" rx="8"/>
                  <text x="352" y="76" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Filipino</text>
                  <text x="352" y="94" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Komunikasyon, pagbasa,</text>
                  <text x="352" y="110" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">gramatika, panitikan</text>
                  <rect x="460" y="52" width="250" height="70" fill="#1e3a5f" rx="8"/>
                  <text x="585" y="76" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Mathematics</text>
                  <text x="585" y="94" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Arithmetic, algebra, geometry,</text>
                  <text x="585" y="110" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">statistics, measurement</text>
                  <rect x="50" y="134" width="195" height="70" fill="#172033" rx="8"/>
                  <text x="147" y="158" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Science</text>
                  <text x="147" y="176" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Biology, chemistry, physics,</text>
                  <text x="147" y="192" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">earth science</text>
                  <rect x="255" y="134" width="195" height="70" fill="#14532d" rx="8"/>
                  <text x="352" y="158" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Social Studies</text>
                  <text x="352" y="176" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">Philippine history, government,</text>
                  <text x="352" y="192" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">economics, culture</text>
                  <rect x="460" y="134" width="250" height="70" fill="#172033" rx="8"/>
                  <text x="585" y="158" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Technology and Livelihood</text>
                  <text x="585" y="176" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Home economics, agriculture,</text>
                  <text x="585" y="192" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">industrial arts, ICT</text>
                  <text x="380" y="250" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | LET General Education Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>LET General Education subject areas overview</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_2)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice LET questions with instant feedback. No registration required.
              </p>
              <Link
                href="/education"
                className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Start LET Practice at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">Related LET Articles</h2>
              <ul className="space-y-3">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">LET Study Guides</h3>
              <div className="space-y-4">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <Link key={href} href={href} className="group block">
                    <p className="text-gray-300 text-sm group-hover:text-yellow-400 transition-colors leading-snug">
                      {text}
                    </p>
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
