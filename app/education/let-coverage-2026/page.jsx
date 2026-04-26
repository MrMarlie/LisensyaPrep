import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'LET Coverage 2026 Complete Subject Breakdown for the Teaching Board Exam Philippines',
  description:
    'What does the PRC LET board exam cover in 2026? Complete subject breakdown for the Licensure Examination for Teachers covering all three components with reviewer links for each topic.',
  path: '/education/let-coverage-2026',
  image: '/images/articles/hero-let-coverage-2026.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LET Coverage 2026: Complete Subject Breakdown for the Teaching Board Exam Philippines',
  description:
    'Complete breakdown of all LET components for the 2026 Licensure Examination for Teachers covering Professional Education, General Education, and Field of Specialization with reviewer links.',
  image: 'https://lisensyaprep.com/images/articles/hero-let-coverage-2026.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://lisensyaprep.com/education/let-coverage-2026',
  },
};

const RELATED_ARTICLES = [
  { text: 'How to Pass the LET on Your First Take', href: '/education/how-to-pass-let-first-take' },
  { text: 'Professional Education Reviewer LET 2026', href: '/education/professional-education-reviewer' },
  { text: 'General Education Reviewer LET 2026', href: '/education/general-education-reviewer' },
  { text: 'LET Secondary Major Filipino Reviewer 2026', href: '/education/let-secondary-major-filipino-reviewer' },
  { text: 'LET Secondary Major Science Reviewer 2026', href: '/education/let-secondary-major-science-reviewer' },
  { text: 'LET Secondary Major Social Studies Reviewer 2026', href: '/education/let-secondary-major-social-studies-reviewer' },
  { text: 'LET Application Guide 2026', href: '/education/let-application-guide-2026' },
  { text: 'LET Passing Rate and Results 2026', href: '/education/let-passing-rate-results-2026' },
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
*By LisensyaPrep Team | Last Updated: April 2026 | 8-minute read*

---

The Licensure Examination for Teachers is the highest-volume PRC board exam in the country. Tens of thousands of education graduates take it every cycle, and the passing rate consistently sits between 30 and 50 percent. That wide gap between examinees and passers comes down to one thing more than any other: most people do not review the right subjects in the right amounts.

This page is your complete LET study map for 2026. It tells you exactly what the exam covers, how much weight each component carries, and where to find the deep-dive reviewers for every topic on LisensyaPrep.

---

## LET Overview

The Licensure Examination for Teachers is administered by the PRC Board of Professional Teachers twice a year, in March and September.
`;

const SECTION_2 = `
**Important distinction from other PRC boards:** The LET minimum per component is 50 percent, not 60 percent. This means a strong performance in one area can compensate for a weaker area, as long as nothing falls below 50.

---

## The Three LET Components
`;

const SECTION_3 = `
---

## Component 1: Professional Education

Professional Education is the most heavily weighted component of the LET and appears for both elementary and secondary level examinees. It is also the most commonly underestimated subject.

**Major topics covered:**
- Major learning theories: Behaviorism, Cognitivism, Constructivism, Humanism, Multiple Intelligences
- Piaget's stages of cognitive development
- Vygotsky's Zone of Proximal Development and scaffolding
- Bloom's Revised Taxonomy: Remembering, Understanding, Applying, Analyzing, Evaluating, Creating
- Curriculum types: explicit, implicit (hidden), null, and extracurricular
- Lesson planning: objectives, subject matter, procedure, evaluation, assignment
- Teaching methods: direct instruction, inquiry-based, cooperative learning, problem-based
- Assessment: formative vs summative, authentic assessment, validity and reliability
- Classroom management principles
- Educational philosophy: Progressivism, Essentialism, Perennialism, Reconstructionism

**Full reviewer:** [Professional Education Reviewer LET 2026](/education/professional-education-reviewer)

**Practice now:** [LisensyaPrep LET Quiz](/education)

---

## Component 2: General Education

General Education covers content knowledge across multiple subject areas. The scope varies slightly between elementary and secondary levels.

**Major topics covered:**
- English: reading comprehension, grammar, communication strategies
- Filipino: gramatika, pagbasa, komunikasyon, panitikan
- Mathematics: arithmetic, algebra, geometry, statistics, probability
- Science: biology (cell theory, photosynthesis, genetics), physics (Newton's laws), chemistry basics, earth science
- Social Studies: Philippine history, government structure, economics, culture
- Technology and Livelihood Education: home economics, agriculture basics, ICT

**Full reviewer:** [General Education Reviewer LET 2026](/education/general-education-reviewer)

**Practice now:** [LisensyaPrep LET Quiz](/education)

---

## Component 3: Field of Specialization (Secondary Level)

Secondary level examinees take an additional component testing deep knowledge of their major subject. This is where secondary examinees often spend most of their review time, sometimes to the neglect of Professional Education.

**Available specializations and their reviewers on LisensyaPrep:**

**English Major**
Grammar and linguistics, language acquisition theories, literary genres and analysis, approaches to teaching literature, English teaching methods.
[LET Secondary Major English Reviewer](/education/let-secondary-major-english-reviewer)

**Mathematics Major**
Number theory, algebra, geometry, trigonometry, statistics and probability, Polya's problem-solving framework, teaching mathematics.
[LET Secondary Major Math Reviewer](/education/let-secondary-major-math-reviewer)

**Filipino Major**
Gramatika, kasaysayan ng wikang Filipino, panitikan, retorika, komunikasyon, pagtuturo ng Filipino.
[LET Secondary Major Filipino Reviewer](/education/let-secondary-major-filipino-reviewer)

**Science Major**
Biology, chemistry, physics, earth science, science process skills, teaching science.
[LET Secondary Major Science Reviewer](/education/let-secondary-major-science-reviewer)

**Social Studies Major**
Philippine history, world history, geography, economics, political science, teaching social studies.
[LET Secondary Major Social Studies Reviewer](/education/let-secondary-major-social-studies-reviewer)

**Practice now:** [LisensyaPrep LET Quiz](/education)

---

## The Single Biggest Mistake LET Examinees Make

Secondary level examinees who are strong in their major subject often spend 70 to 80 percent of their review time on Component 3 and treat Professional Education as an afterthought.

This is the most common reason secondary level teachers fail the LET despite knowing their subject deeply.

Professional Education is the heaviest component. A weak ProEd performance pulls your general weighted average down significantly, even if your specialization score is excellent. If nothing else, take this away from this page: give Professional Education at least 40 percent of your total review time regardless of your level or major.

---

## How to Use This Study Map

**Week 1:** Take a diagnostic quiz for all three components at LisensyaPrep. Identify your weakest areas before building your schedule.

**Weeks 2 to 5:** Deep review of Professional Education first. It affects both components and is the heaviest weighted area.

**Weeks 6 to 7:** General Education review. Focus on your weakest subject areas within GenEd rather than reviewing everything equally.

**Weeks 8 to 10:** Field of Specialization (secondary level). Use subject-specific reviewers.

**Weeks 11 to 12:** Full mixed practice sessions across all three components. Rest in the final week.

---

## LET Quick Facts 2026

| Detail | Information |
|--------|-------------|
| Exam Name | Licensure Examination for Teachers (LET) |
| Administered By | PRC Board of Professional Teachers |
| Levels | Elementary and Secondary |
| Passing Score | 75% GWA, no component below 50% |
| 2026 Schedules | March and September |
| Application Portal | online.prc.gov.ph |

---

## All LET Articles on LisensyaPrep

- [How to Pass the LET on Your First Take](/education/how-to-pass-let-first-take)
- [Professional Education Reviewer LET 2026](/education/professional-education-reviewer)
- [General Education Reviewer LET 2026](/education/general-education-reviewer)
- [LET Secondary Major English Reviewer](/education/let-secondary-major-english-reviewer)
- [LET Secondary Major Math Reviewer](/education/let-secondary-major-math-reviewer)
- [LET Secondary Major Filipino Reviewer](/education/let-secondary-major-filipino-reviewer)
- [LET Secondary Major Science Reviewer](/education/let-secondary-major-science-reviewer)
- [LET Secondary Major Social Studies Reviewer](/education/let-secondary-major-social-studies-reviewer)
- [LET Application Guide and Passing Rate 2026](/education/let-application-guide-2026)
`;

export default function LETCoverageHubPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-let-coverage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">LET Coverage 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400">
                Education (LET)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                LET Coverage 2026: Complete Subject Breakdown for the Teaching Board Exam
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 27, 2026</span>
                <span>•</span>
                <span>8 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-let-coverage-2026.jpg"
                alt="Young Filipino male teacher in navy shirt with arms crossed for LET coverage 2026 board exam Philippines"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 190" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="190" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">LET 2026 Key Facts</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="46" y="52" width="154" height="100" fill="#1e3a5f" rx="8"/>
                  <text x="123" y="82" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">PASSING</text>
                  <text x="123" y="100" textAnchor="middle" fill="#fcd34d" fontSize="26" fontWeight="700" fontFamily="Arial,sans-serif">75%</text>
                  <text x="123" y="120" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">General Weighted</text>
                  <text x="123" y="136" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Average required</text>
                  <rect x="212" y="52" width="154" height="100" fill="#172033" rx="8"/>
                  <text x="289" y="82" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">MINIMUM</text>
                  <text x="289" y="100" textAnchor="middle" fill="#fcd34d" fontSize="26" fontWeight="700" fontFamily="Arial,sans-serif">50%</text>
                  <text x="289" y="120" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Per component</text>
                  <text x="289" y="136" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">minimum score</text>
                  <rect x="378" y="52" width="154" height="100" fill="#1e3a5f" rx="8"/>
                  <text x="455" y="82" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">SCHEDULES</text>
                  <text x="455" y="104" textAnchor="middle" fill="#93c5fd" fontSize="13" fontFamily="Arial,sans-serif">March</text>
                  <text x="455" y="122" textAnchor="middle" fill="#93c5fd" fontSize="13" fontFamily="Arial,sans-serif">and</text>
                  <text x="455" y="140" textAnchor="middle" fill="#93c5fd" fontSize="13" fontFamily="Arial,sans-serif">September</text>
                  <rect x="544" y="52" width="172" height="100" fill="#172033" rx="8"/>
                  <text x="630" y="82" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">LEVELS</text>
                  <text x="630" y="104" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">Elementary</text>
                  <text x="630" y="122" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">and</text>
                  <text x="630" y="140" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">Secondary</text>
                  <text x="380" y="180" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">Source: PRC Board of Professional Teachers | LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>LET 2026 key facts and requirements</figcaption>
              </figure>

              {renderContent(SECTION_2)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="320" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">LET 2026 Three Components Breakdown</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="76" fill="#1e3a5f" rx="8"/>
                  <text x="200" y="76" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">COMPONENT 1</text>
                  <text x="200" y="96" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">Professional Education</text>
                  <text x="200" y="114" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Both Elementary and Secondary</text>
                  <text x="500" y="72" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Heaviest weighted component</text>
                  <text x="500" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">{"Learning theories, Bloom's Taxonomy, curriculum development,"}</text>
                  <text x="500" y="106" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">assessment, classroom management, educational philosophy</text>
                  <rect x="40" y="134" width="680" height="76" fill="#172033" rx="8"/>
                  <text x="200" y="160" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">COMPONENT 2</text>
                  <text x="200" y="180" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">General Education</text>
                  <text x="200" y="198" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Both Elementary and Secondary</text>
                  <text x="500" y="156" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Broad content knowledge</text>
                  <text x="500" y="174" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">English, Filipino, Mathematics, Science, Social Studies,</text>
                  <text x="500" y="190" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Technology and Livelihood Education</text>
                  <rect x="40" y="218" width="680" height="76" fill="#14532d" rx="8"/>
                  <text x="200" y="244" textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">COMPONENT 3</text>
                  <text x="200" y="264" textAnchor="middle" fill="#d1fae5" fontSize="12" fontFamily="Arial,sans-serif">Field of Specialization</text>
                  <text x="200" y="282" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Secondary level ONLY</text>
                  <text x="500" y="244" textAnchor="middle" fill="#d1fae5" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Deep subject knowledge</text>
                  <text x="500" y="262" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">English, Filipino, Mathematics, Science, Social Studies,</text>
                  <text x="500" y="278" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">MAPEH, TLE, and other approved majors</text>
                  <text x="380" y="312" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | LET Coverage 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>LET 2026 three components with coverage areas</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_3)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice LET questions across all three components. No registration required.
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
