import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import GenEdMasteryCTA from '@/components/GenEdMasteryCTA';
import PremiumStickyBar from '@/components/PremiumStickyBar';

export const metadata = buildMetadata({
  title: 'LET Gen Ed Reviewer 2026 - Complete 8-Week Mastery Study Plan Philippines',
  description:
    'Master LET General Education in 8 weeks. Complete study plan covering English, Math, Science, Filipino, and Social Sciences tested in the September 2026 LET. Free reviewer plus optional Mastery Pack PDF.',
  path: '/education/let-gen-ed-mastery-study-plan-2026',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LET Gen Ed Reviewer 2026 - Complete 8-Week Mastery Study Plan Philippines',
  description:
    'Master LET General Education in 8 weeks with this complete study plan covering English, Math, Science, Filipino, and Social Sciences tested in the September 2026 LET.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-21',
  dateModified: '2026-05-21',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://lisensyaprep.com/education/let-gen-ed-mastery-study-plan-2026',
  },
};

const RELATED_ARTICLES = [
  { text: 'General Education Reviewer LET 2026', href: '/education/general-education-reviewer' },
  { text: 'LET Prof Ed Reviewer 2026 - Complete 8-Week Mastery Study Plan', href: '/education/let-prof-ed-mastery-study-plan-2026' },
  { text: 'Professional Education Reviewer LET 2026', href: '/education/professional-education-reviewer' },
  { text: 'How to Pass the LET on Your First Take', href: '/education/how-to-pass-let-first-take' },
  { text: 'LET Coverage 2026 Complete Subject Breakdown', href: '/education/let-coverage-2026' },
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
    .replace(/\*([^*]+)\*/g, '<em class="text-gray-400 italic">$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-white/10 px-1 rounded text-yellow-300 text-xs">$1</code>');
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
*By LisensyaPrep Team | Last Updated: May 2026 | 11-minute read*

---

General Education is the broadest component of the LET. It tests your foundational knowledge across English, Mathematics, Science, Filipino, and Social Sciences. While it carries 20 percent weight in Secondary and 40 percent in Elementary, its sheer breadth makes it one of the trickiest components to master.

This guide gives you the complete 8-week study plan covering every Gen Ed subject area for the September 2026 LET.

---

## Why Gen Ed Trips Up Educated Examinees

It sounds backwards, but college graduates often perform worse in Gen Ed than expected. Here is why:

**1. The coverage is enormous.** You are tested on content from Kindergarten through Grade 12 across 5 major subject areas. No examinee remembers all of it perfectly.

**2. Specific Philippine content.** Filipino literature, Philippine history, and the Filipino language receive heavy weighting. Foreign-trained or English-medium graduates often have gaps here.

**3. Computation without calculator.** Math questions require mental computation. Examinees who relied on calculators in college struggle.

**4. Reading speed matters.** English comprehension passages take time. Slow readers run out of time before answering all questions.

---

## The Complete Gen Ed Coverage for 2026

General Education covers five major subject areas. Each area requires its own preparation approach.

### Area 1: English (Language and Literature)

**Approximately 25 to 30 percent of Gen Ed questions.**

Topics tested:

**Grammar and Correct Usage**
- Subject-verb agreement
- Pronoun-antecedent agreement
- Verb tenses and consistency
- Parallel structure
- Modifiers and dangling phrases
- Comma usage and punctuation

**Vocabulary**
- Synonyms and antonyms
- Words in context
- Word roots, prefixes, and suffixes
- Idioms and expressions

**Reading Comprehension**
- Main idea identification
- Supporting details
- Inference and implication
- Author's tone and purpose
- Vocabulary in context

**Literature**
- American, British, and World Literature classics
- Major literary periods and movements
- Literary devices (metaphor, simile, irony, foreshadowing)
- Genre identification (epic, sonnet, novel, drama)

### Area 2: Mathematics

**Approximately 20 to 25 percent of Gen Ed questions.**

Topics tested:

**Number Sense and Arithmetic**
- Order of operations (PEMDAS)
- Fractions, decimals, percentages
- Ratio and proportion
- Number patterns and sequences

**Algebra**
- Solving linear equations
- Systems of equations
- Quadratic equations
- Polynomials and factoring

**Geometry**
- Area and perimeter
- Volume of solids
- Pythagorean theorem
- Angles and triangles
- Coordinate geometry

**Statistics and Probability**
- Mean, median, mode
- Standard deviation basics
- Basic probability
- Interpreting graphs and tables

**Word Problems**
- Age, time, distance, work, money
- Mixture problems
- Speed and rate problems

### Area 3: Science

**Approximately 20 percent of Gen Ed questions.**

Topics tested:

**Biology**
- Cell structure and function
- Genetics and inheritance
- Human anatomy and physiology
- Ecosystems and biodiversity
- Evolution and natural selection

**Chemistry**
- Atomic structure and periodic table
- Chemical bonding and reactions
- Acids, bases, and pH
- Solutions and mixtures

**Physics**
- Motion and forces (Newton's laws)
- Energy and work
- Waves and sound
- Electricity and magnetism basics
- Light and optics

**Earth and Environmental Science**
- Plate tectonics
- Weather and climate
- Solar system
- Environmental issues

### Area 4: Filipino

**Approximately 15 to 20 percent of Gen Ed questions.**

Topics tested:

**Wika at Gramatika**
- Mga bahagi ng pananalita
- Pang-uri at antas ng paghahambing
- Pandiwa at aspekto
- Pang-abay
- Mga pangungusap (uri at parte)

**Panitikan**
- Panitikang Pilipino (mga makata, manunulat, akda)
- Florante at Laura, Noli Me Tangere, El Filibusterismo
- Mga sinaunang awit at salawikain
- Mga kababayan na manunulat

**Komunikasyon**
- Mga uri ng komunikasyon
- Mga sangay ng komunikasyon
- Mga konteksto ng komunikasyon

### Area 5: Social Sciences

**Approximately 15 to 20 percent of Gen Ed questions.**

Topics tested:

**Philippine History**
- Pre-colonial Philippines
- Spanish colonial period
- American colonial period
- Japanese occupation
- Post-independence period
- Key historical figures and events

**World History and Geography**
- Major civilizations
- World wars
- Geography of continents
- Capitals and major cities

**Government and Constitution**
- 1987 Philippine Constitution
- Bill of Rights
- Three branches of government
- Local government structure

**Economics**
- Basic economic concepts
- Supply and demand
- Inflation and economic indicators
`;

const SECTION_2 = `
---

## The 8-Week Gen Ed Mastery Study Plan

Use this structured plan to systematically cover all five subject areas.

### Week 1: Diagnostic and English Foundation

**Days 1 to 2:** Take a full-length Gen Ed diagnostic quiz. Identify your weakest of the 5 subject areas. The LisensyaPrep diagnostic is free.

**Days 3 to 7:** Begin English review.

Focus on grammar rules first, then vocabulary building. Read at least 30 minutes of quality English content daily (newspapers, novels, academic articles).

### Week 2: English Mastery

**Days 1 to 3:** Grammar drills and practice.

Daily: 40 to 50 grammar questions with rationale review. Focus on common error types (subject-verb agreement, pronoun-antecedent, parallel structure).

**Days 4 to 5:** Vocabulary expansion.

Build a vocabulary notebook. Add 20 new words daily with definitions, sample sentences, and synonyms.

**Days 6 to 7:** Reading comprehension practice.

Practice 3 to 5 passages daily. Time yourself. Aim to read and answer 5 questions in 8 minutes.

### Week 3: Mathematics

**Days 1 to 2:** Basic operations and number sense.

Master mental math: multiplication tables up to 15 × 15, percentage shortcuts (10%, 25%, 50%, 5%), fraction-decimal-percentage conversions.

**Days 3 to 4:** Algebra fundamentals.

Practice solving linear equations, systems of equations, basic quadratics. 30 problems per day.

**Days 5 to 6:** Geometry and measurement.

Memorize key formulas: area and perimeter of basic shapes, volume of solids, Pythagorean theorem.

**Day 7:** Mixed math practice with word problems.

### Week 4: Science

**Days 1 to 2:** Biology essentials.

Cell structure, basic genetics, body systems, ecosystems. Use diagrams to memorize systems.

**Days 3 to 4:** Chemistry fundamentals.

Atomic structure, periodic table groups, common chemical reactions, acids and bases.

**Days 5 to 6:** Physics basics.

Newton's laws, energy, basic electricity, waves. Focus on conceptual understanding over heavy computation.

**Day 7:** Earth science and environment.

### Week 5: Filipino

**Days 1 to 3:** Wika at Gramatika.

Bahagi ng pananalita, mga uri ng pang-uri at pandiwa, pangungusap.

**Days 4 to 7:** Panitikan at Komunikasyon.

Mga klasikong akda: Florante at Laura, Noli Me Tangere, El Filibusterismo. Mga sikat na makata at manunulat. Magbasa ng mga literary excerpts.

### Week 6: Social Sciences

**Days 1 to 3:** Philippine History.

Pre-colonial through post-EDSA. Memorize key dates, figures, and events. Use timelines.

**Days 4 to 5:** Government and Constitution.

1987 Constitution focus. Bill of Rights, three branches, local government.

**Days 6 to 7:** Economics and World History.

### Week 7: Mixed Practice and Weak Spot Repair

**Daily:** Take 60 to 80 mixed Gen Ed questions per day across all 5 areas.

Focus 50 percent of practice time on your weakest 2 subject areas (from Week 1 diagnostic).

### Week 8: Final Review and Mock Examinations

**Days 1 to 4:** Two full-length Gen Ed mock examinations under timed conditions.

**Days 5 to 6:** Light review of weakest areas. No new material.

**Day 7:** Rest before exam day.
`;

const SECTION_3 = `
---

## Subject-Specific Strategy Tips

### For English

**Read daily.** Vocabulary and comprehension improve through exposure, not memorization. 30 minutes of quality reading daily for 8 weeks builds significant skill.

**Master common errors.** Subject-verb agreement is the most tested grammar topic. Drill it until automatic.

### For Mathematics

**No calculator allowed.** Build mental math speed from Day 1.

**Memorize formulas.** Area, perimeter, volume, Pythagorean theorem, quadratic formula. Write them daily until automatic.

### For Science

**Conceptual over computational.** Focus on understanding WHY things happen rather than memorizing facts.

**Diagrams help.** Body systems, plant structures, atomic structures. Visual learning sticks.

### For Filipino

**Read Filipino content.** Most college graduates have weak Filipino literacy. Build it back through daily reading of Filipino news (Pilipino Star Ngayon, Bandera) or literature.

**Klasikong panitikan.** Maraming tanong tungkol sa Florante at Laura, Noli Me Tangere, at El Filibusterismo. Basahin o panoorin ang mga summary.

### For Social Sciences

**Use timelines.** Philippine history is easier with visual timelines of events.

**Memorize the Constitution structure.** 18 Articles. Know what each covers. Bill of Rights (Article III) is the most tested.

---

## Common Gen Ed Mistakes to Avoid

**Mistake 1: Neglecting Filipino.** College graduates often have weakest Filipino skills. They lose easy points here that could secure their overall passing rate.

**Mistake 2: Math anxiety paralysis.** Many examinees skip Math entirely. Even moderate Math improvement from 30 percent to 50 percent meaningfully raises your overall Gen Ed score.

**Mistake 3: Studying the wrong literature.** Some reviewers focus on outdated literature lists. Check current LET coverage for the major works (Florante at Laura, Noli, Fili are evergreen).

**Mistake 4: Skipping science computation.** Some science questions involve simple computations (chemical equations, physics formulas). Practice these.

**Mistake 5: Ignoring Constitution updates.** The 1987 Philippine Constitution has not changed, but the way it is tested has expanded. Read the actual document.

---

## Frequently Asked Questions

**How many items is General Education in the LET?**
General Education questions are part of a combined examination. For Secondary Level, Gen Ed counts as 20 percent of your total LET rating. For Elementary, Gen Ed is 40 percent.

**Is General Education the same for Elementary and Secondary?**
Yes, the Gen Ed content areas are the same for both levels. Elementary weights Gen Ed heavier (40 percent vs 20 percent for Secondary).

**Can I pass the LET if I fail Gen Ed?**
You can pass if your other components compensate, but no component can fall below 50 percent. Falling below 50 percent in Gen Ed automatically fails the entire exam.

**Which Gen Ed subject is the hardest?**
This varies by examinee, but Filipino and Mathematics are the most commonly cited as difficult by Secondary Level examinees. English is often cited as difficult by some Elementary examinees.

**How long should I review for Gen Ed?**
A focused 8-week study plan is recommended. Add 2 to 4 weeks if you have been away from formal study for more than 3 years.
`;

export default function GenEdMasteryStudyPlanPage() {
  return (
    <div className="min-h-screen py-10">
      <PremiumStickyBar />
      <Script id="schema-let-gened-mastery" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/education","name":"Education"},{"url":"/education/let-gen-ed-mastery-study-plan-2026","name":"LET Gen Ed 8-Week Mastery Study Plan 2026"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">LET Gen Ed 8-Week Mastery Study Plan 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">
                Education (LET)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                LET Gen Ed Reviewer 2026: Complete 8-Week Mastery Study Plan Philippines
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>May 21, 2026</span>
                <span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_2)}

              <GenEdMasteryCTA />

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_3)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice LET Gen Ed questions with instant feedback. No registration required.
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
