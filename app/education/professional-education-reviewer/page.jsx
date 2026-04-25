import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Professional Education Reviewer for LET Philippines 2026 (Complete Guide)',
  description:
    'Studying for the LET board exam? This professional education reviewer covers learning theories, Bloom\'s Taxonomy, curriculum development, classroom management, and assessment tested in the LET.',
  path: '/education/professional-education-reviewer',
  image: '/images/articles/hero-let-professional-education.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Professional Education Reviewer for LET Philippines 2026',
  description:
    'Complete professional education reviewer for the Licensure Examination for Teachers covering learning theories, Bloom\'s Taxonomy, curriculum development, and assessment.',
  image: 'https://lisensyaprep.com/images/articles/hero-let-professional-education.jpg',
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
    '@id': 'https://lisensyaprep.com/education/professional-education-reviewer',
  },
};

const RELATED_ARTICLES = [
  { text: 'How to Pass the LET on Your First Take', href: '/education/how-to-pass-let-first-take' },
  { text: 'General Education Reviewer LET 2026', href: '/education/general-education-reviewer' },
  { text: 'LET Secondary Major English Reviewer 2026', href: '/education/let-secondary-major-english-reviewer' },
  { text: 'LET Secondary Major Math Reviewer 2026', href: '/education/let-secondary-major-math-reviewer' },
  { text: 'PRC Board Exam Schedule 2026 for All Professions', href: '/blog/prc-board-exam-schedule-2026' },
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
*By LisensyaPrep Team | Last Updated: April 2026 | 11-minute read*

---

Professional Education is the most heavily weighted component of the Licensure Examination for Teachers and the one most likely to determine whether you pass or fall short. It is also the subject that many examinees underestimate, assuming their college education covered it sufficiently.

It did not. The LET tests Professional Education at a depth and breadth that requires dedicated structured review. This article covers the major frameworks, theories, and concepts you need to know before exam day.

---

## Learning Theories: The Foundation of Professional Education

More LET Professional Education questions trace back to learning theories than to any other single topic area. If you know these deeply you can answer a significant portion of ProEd questions even without memorizing specific curriculum or assessment provisions.
`;

const SECTION_2 = `
---

## Piaget's Stages of Cognitive Development

Jean Piaget's developmental stages are among the most frequently tested concepts in LET Professional Education. MTLE questions often describe a child's behavior and ask which stage they are in.

**Sensorimotor (Birth to 2 years).** Children learn through sensory experiences and physical interaction with the world. Object permanence develops during this stage, meaning the child understands that objects continue to exist even when not visible.

**Preoperational (2 to 7 years).** Language develops rapidly. Children are egocentric, meaning they cannot take another person's perspective. They cannot yet perform mental operations. Conservation has not yet developed.

**Concrete Operational (7 to 11 years).** Children can think logically about concrete objects and events. Conservation develops. They can classify objects and understand reversibility.

**Formal Operational (11 years and above).** Abstract thinking develops. Children can reason about hypothetical situations and think systematically about possibilities.

---

## Vygotsky's Zone of Proximal Development

Lev Vygotsky introduced the Zone of Proximal Development (ZPD), defined as the distance between what a learner can do independently and what they can do with guidance from a more capable person.

**Scaffolding** is the support provided by a teacher or more capable peer to help a learner accomplish tasks within their ZPD. As the learner gains competence, scaffolding is gradually removed.

This concept appears frequently in LET questions as a basis for why teachers should pitch instruction slightly above the learner's current level, and why cooperative learning and peer tutoring are effective strategies.

---

## Bloom's Taxonomy: The Most Tested Framework in ProEd

Bloom's Taxonomy classifies educational objectives into levels of cognitive complexity. Almost every LET question about lesson objectives, assessment items, or questioning strategies connects to Bloom's.
`;

const SECTION_3 = `
---

## Curriculum Development

### Types of Curriculum

**Explicit curriculum** is the formally planned and documented course of study. It is what is written in syllabi and lesson plans.

**Implicit curriculum** (hidden curriculum) refers to the unplanned lessons, values, and perspectives that students learn from the school environment and culture.

**Null curriculum** refers to what is deliberately excluded or not taught.

**Extracurricular** covers school activities outside the formal academic program.

### Curriculum Design Approaches

**Subject-centered design** organizes curriculum around academic disciplines or subjects. Most traditional schools use this approach.

**Learner-centered design** organizes curriculum around the needs, interests, and experiences of students.

**Problem-centered design** organizes curriculum around real-life problems and social issues.

---

## Principles of Teaching and Lesson Planning

### Parts of a Detailed Lesson Plan

A standard detailed lesson plan for Philippine public schools follows this structure:

**Objectives** state what students should be able to do after the lesson, written in behavioral terms using action verbs aligned to Bloom's Taxonomy.

**Subject Matter** identifies the topic, references, and materials needed.

**Procedure** covers the teaching-learning activities including the motivation, presentation, discussion, and generalization.

**Evaluation** assesses whether objectives were achieved.

**Assignment** provides follow-up activities for independent practice.

### Teaching Methods

**Direct instruction** is teacher-centered. The teacher presents information, demonstrates skills, and guides practice. Effective for teaching specific skills and factual knowledge.

**Inquiry-based learning** is student-centered. Students investigate questions and discover answers through exploration. Rooted in constructivist theory.

**Cooperative learning** involves structured group activities where students work together toward a shared goal. Based on Vygotsky's social learning theory.

**Problem-based learning** presents students with real-world problems to solve, building both content knowledge and critical thinking skills.

---

## Assessment: Principles and Types

### Formative vs Summative Assessment

**Formative assessment** happens during learning to monitor progress and provide feedback. Examples: exit tickets, quizzes, observation, oral questioning. Purpose is to improve learning while it is happening.

**Summative assessment** happens at the end of an instructional unit to evaluate overall achievement. Examples: unit tests, final examinations, term papers. Purpose is to measure what was learned.

### Authentic Assessment

Authentic assessment requires students to demonstrate knowledge through real-world tasks rather than traditional tests. Examples include portfolios, performance tasks, demonstrations, and projects.

### Validity and Reliability

**Validity** means the assessment measures what it is supposed to measure.

**Reliability** means the assessment produces consistent results across different administrations.

An assessment can be reliable without being valid, but a valid assessment must also be reliable.

---

## Practice What You Just Learned

Professional Education is the heaviest component of the LET. The best way to prepare is by practicing questions that force you to apply these concepts to real classroom scenarios.

Head to LisensyaPrep and start practicing now. No registration required.

**[Practice Professional Education Questions at LisensyaPrep](https://lisensyaprep.com)**
`;

export default function ProfessionalEducationReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-let-proEd" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Professional Education Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">
                Education (LET)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Professional Education Reviewer for LET Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 25, 2026</span>
                <span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-let-professional-education.jpg"
                alt="Filipino teacher standing confidently in classroom for LET professional education reviewer Philippines 2026"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="380" fill="#0f172a" rx="10"/>
                  <text x="380" y="28" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Major Learning Theories for the LET</text>
                  <line x1="40" y1="40" x2="720" y2="40" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="54" fill="#1e3a5f" rx="6"/>
                  <text x="200" y="72" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">BEHAVIORISM</text>
                  <text x="200" y="88" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Pavlov, Skinner, Thorndike</text>
                  <text x="490" y="68" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Learning is a change in behavior through stimulus and response.</text>
                  <text x="490" y="84" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Reinforcement and punishment shape behavior. Drill and practice.</text>
                  <text x="490" y="98" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Classroom: rewards, repetition, programmed instruction.</text>
                  <rect x="40" y="110" width="680" height="54" fill="#172033" rx="6"/>
                  <text x="200" y="132" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">COGNITIVISM</text>
                  <text x="200" y="148" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Bruner, Piaget, Ausubel</text>
                  <text x="490" y="128" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Learning involves mental processes: memory, thinking, problem-solving.</text>
                  <text x="490" y="144" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Piaget: stages of cognitive development. Bruner: discovery learning.</text>
                  <text x="490" y="158" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Ausubel: meaningful learning, advance organizers.</text>
                  <rect x="40" y="170" width="680" height="54" fill="#14532d" rx="6"/>
                  <text x="200" y="192" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">CONSTRUCTIVISM</text>
                  <text x="200" y="208" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Piaget, Vygotsky</text>
                  <text x="490" y="188" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Learners actively construct knowledge through experience.</text>
                  <text x="490" y="204" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">Vygotsky: Zone of Proximal Development, scaffolding, social learning.</text>
                  <text x="490" y="218" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Classroom: inquiry, collaboration, hands-on activities.</text>
                  <rect x="40" y="230" width="680" height="54" fill="#1e3a5f" rx="6"/>
                  <text x="200" y="252" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">HUMANISM</text>
                  <text x="200" y="268" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Maslow, Rogers</text>
                  <text x="490" y="248" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Learning is driven by the need for self-actualization and growth.</text>
                  <text x="490" y="264" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Maslow: Hierarchy of Needs. Rogers: student-centered learning.</text>
                  <text x="490" y="278" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Classroom: supportive environment, intrinsic motivation, student choice.</text>
                  <rect x="40" y="290" width="680" height="54" fill="#172033" rx="6"/>
                  <text x="200" y="312" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">MULTIPLE INTELLIGENCES</text>
                  <text x="200" y="328" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Howard Gardner</text>
                  <text x="490" y="308" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Intelligence is not singular. Eight distinct types of intelligence exist.</text>
                  <text x="490" y="324" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Linguistic, Logical, Musical, Spatial, Bodily-Kinesthetic, Interpersonal,</text>
                  <text x="490" y="338" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Intrapersonal, Naturalist.</text>
                  <text x="380" y="372" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | LET Professional Education Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Major learning theories tested in LET Professional Education</figcaption>
              </figure>

              {renderContent(SECTION_2)}

              <AdPlaceholder slot="banner" className="my-6" />

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="300" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">{"Bloom's Taxonomy (Revised) — Lowest to Highest"}</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="48" width="680" height="32" fill="#172033" rx="5"/>
                  <text x="180" y="68" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">REMEMBERING</text>
                  <text x="490" y="68" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Recall facts. Keywords: define, list, recall, identify, name, state.</text>
                  <rect x="40" y="86" width="680" height="32" fill="#1e3a5f" rx="5"/>
                  <text x="180" y="106" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">UNDERSTANDING</text>
                  <text x="490" y="106" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Explain ideas. Keywords: describe, explain, summarize, paraphrase, classify.</text>
                  <rect x="40" y="124" width="680" height="32" fill="#172033" rx="5"/>
                  <text x="180" y="144" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">APPLYING</text>
                  <text x="490" y="144" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Use knowledge in new situations. Keywords: solve, use, demonstrate, apply.</text>
                  <rect x="40" y="162" width="680" height="32" fill="#1e3a5f" rx="5"/>
                  <text x="180" y="182" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">ANALYZING</text>
                  <text x="490" y="182" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Break down information. Keywords: compare, contrast, differentiate, examine.</text>
                  <rect x="40" y="200" width="680" height="32" fill="#14532d" rx="5"/>
                  <text x="180" y="220" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">EVALUATING</text>
                  <text x="490" y="220" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Make judgments. Keywords: judge, defend, critique, assess, justify.</text>
                  <rect x="40" y="238" width="680" height="32" fill="#78350f" rx="5"/>
                  <text x="180" y="258" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">CREATING</text>
                  <text x="490" y="258" textAnchor="middle" fill="#fef3c7" fontSize="11" fontFamily="Arial,sans-serif">Produce new work. Keywords: design, construct, formulate, compose, plan.</text>
                  <text x="380" y="290" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | LET Professional Education Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>{"Bloom's Revised Taxonomy from lowest to highest cognitive level"}</figcaption>
              </figure>

              {renderContent(SECTION_3)}
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
