import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'How to Pass the LET Board Exam on Your First Take 2026 (Self-Review Guide Philippines)',
  description:
    'Planning to self-review for the Licensure Examination for Teachers? This honest guide covers everything you need to pass the LET board exam on your first attempt in 2026.',
  path: '/education/how-to-pass-let-first-take',
  image: '/images/articles/hero-let-how-to-pass-first-take.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Pass the LET Board Exam on Your First Take (2026 Self-Review Guide)',
  description:
    'Complete self-review guide for the Licensure Examination for Teachers covering the LET format, 12-week study plan, and 7 proven tips from LET passers.',
  image: 'https://lisensyaprep.com/images/articles/hero-let-how-to-pass-first-take.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-23',
  dateModified: '2026-04-23',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://lisensyaprep.com/education/how-to-pass-let-first-take',
  },
};

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
Teaching is one of the most respected professions in the Philippines, and the Licensure Examination for Teachers is the gateway to making it official. But the LET has one of the most variable passing rates of any PRC board exam, sitting anywhere between 30 and 50 percent depending on the cycle. That means roughly half of all examinees do not make it through on any given attempt.

The people who pass consistently are not necessarily the ones who studied the longest. They are the ones who understood the exam structure, focused their review on the right areas, and practiced applying concepts instead of just memorizing them.

If you are planning to self-review for the LET in 2026, this guide gives you a realistic picture of what the exam covers, where most examinees struggle, and what a focused review actually looks like.

---

## What the LET Actually Tests

The Licensure Examination for Teachers is administered by the PRC Board of Professional Teachers. It covers three major areas, each weighted differently in your final score.

**Professional Education** covers the theories, principles, and practices of teaching. This is the most heavily weighted component and appears in every LET regardless of whether you are taking the elementary or secondary level.

**General Education** covers content knowledge across multiple subject areas including communication, mathematics, science, social studies, and Filipino. The specific scope depends on whether you are taking elementary or secondary level.

**Field of Specialization** applies only to secondary level examinees. It tests your deep knowledge of your specific major subject, whether that is English, Mathematics, Biology, Filipino, or any of the other secondary education majors.

To pass the LET, you need a general weighted average of at least **75 percent** with no component falling below **50 percent**. Note that the minimum per component for LET is 50 percent, which is lower than most other PRC boards. This means a very strong performance in one area can compensate for a weaker area, as long as nothing falls below 50.
`;

const SECTION_2 = `
## Where Most LET Examinees Fall Short

Understanding why people fail the LET is just as useful as knowing what to study. Three patterns show up consistently among examinees who do not pass on their first attempt.

**Underestimating Professional Education.** This is the most common mistake. Many examinees treat ProEd as something they already know from college and spend most of their review time on General Education or their specialization. Professional Education is the heaviest component and the one most likely to pull an average below 75 if treated casually. It deserves at least 40 percent of your total review time.

**Treating General Education as too broad to review.** GenEd covers multiple subject areas and a lot of examinees respond to the breadth by reviewing everything shallowly. A more effective approach is to identify the subject areas within GenEd where you are already strong and focus your limited time on the areas where you are weak.

**Majors who know their subject but not how to teach it.** Secondary level examinees who are strong in their major sometimes underperform in Professional Education because they spent all their preparation time on their specialization. The exam tests both content knowledge and pedagogical knowledge. You need both.
`;

const SECTION_3 = `
## 7 Tips for Passing the LET on Your First Take

### 1. Take a Diagnostic Test Before Anything Else

Before you open a single reviewer, take a practice test across all three LET components. This tells you exactly where you stand right now, not where you think you stand. Your weakest areas get the most time in your schedule. Your strongest areas get maintenance review only.

LisensyaPrep has free LET practice questions organized by component. Start there before you build your study plan.

### 2. Master the Learning Theories in Professional Education

Professional Education is built on a foundation of learning theories. If you know these deeply, a huge portion of ProEd questions become straightforward because most classroom scenario questions trace back to an underlying theory.

The theories you absolutely must know: Behaviorism (Pavlov, Skinner, Thorndike), Constructivism (Piaget, Vygotsky), Cognitivism (Bruner, Bloom), Humanism (Maslow, Rogers), and Multiple Intelligences (Gardner). Know not just the theorist but how each theory looks in a real classroom context.

### 3. Bloom's Taxonomy Is Everywhere

Bloom's Taxonomy of Educational Objectives is one of the most consistently tested frameworks in the entire LET. Questions that ask about lesson objectives, assessment items, and question difficulty all reference Bloom's six levels: Remembering, Understanding, Applying, Analyzing, Evaluating, and Creating. Know which level each verb belongs to and practice classifying objectives.

### 4. For General Education, Work Backwards From Past Patterns

LET General Education covers a wide range of subjects. Rather than reviewing all of them equally, focus on the areas that appear most in practice tests and past exam patterns. Communication and reading comprehension in English and Filipino appear in almost every cycle. Basic mathematics especially statistics and measurement also shows up consistently. These are your highest-yield GenEd topics.

### 5. Secondary Examinees: Do Not Neglect ProEd for Your Major

The most common mistake among secondary level takers is spending 80 percent of review time on their major subject because it feels familiar and comfortable. Your specialization matters, but Professional Education carries significant weight and is the area where many secondary examinees with strong content knowledge still fall short. Balance your time.

### 6. Practice Questions, Not Just Reading

Reading reviewer material gives you exposure. Answering practice questions builds the actual skill the exam tests, which is applying what you know to real scenarios. For every hour you spend reading, spend at least 30 minutes answering practice questions on that material.

### 7. Simulate the Actual Exam Format in Your Final 2 Weeks

In the final two weeks before your exam, stop reading new material and shift entirely to timed full-length practice sessions. Sit down, set a timer, answer questions without stopping, and review your wrong answers afterward. This builds your stamina and time management for the actual exam day.

---

## LET Quick Facts 2026

| Detail | Information |
|--------|-------------|
| Exam Name | Licensure Examination for Teachers (LET) |
| Administered By | PRC Board of Professional Teachers |
| Levels | Elementary and Secondary |
| Passing Score | 75% general weighted average, no component below 50% |
| 2026 Schedules | March and September |
| Application Portal | online.prc.gov.ph (PRC LERIS) |
| Results Release | Up to 60 working days after last exam day |

*Always verify the latest schedule at prc.gov.ph.*
`;

const RELATED_ARTICLES = [
  { text: 'LET Coverage 2026 Complete Subject Breakdown', href: '/education/let-coverage-2026' },
  { text: 'Professional Education Reviewer LET 2026', href: '/education/professional-education-reviewer' },
  { text: 'General Education Reviewer LET 2026', href: '/education/general-education-reviewer' },
  { text: 'PRC Board Exam Schedule 2026 for All Professions', href: '/guides/prc-board-exam-schedule-2026' },
  { text: 'How Long to Study for PRC Board Exam', href: '/guides/how-long-to-study-for-prc-board-exam' },
];

export default function HowToPassLETPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-let-01" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Article */}
          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">How to Pass LET First Take</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">
                Education (LET)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                How to Pass the LET Board Exam on Your First Take (2026 Self-Review Guide)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 23, 2026</span>
                <span>•</span>
                <span>10 min read</span>
              </div>
            </header>

            {/* Hero Image */}
            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-let-how-to-pass-first-take.jpg"
                alt="Education graduate in academic cap and gown holding a notebook preparing for the LET board exam Philippines 2026"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <AdPlaceholder slot="banner" className="my-6" />

              {/* SVG: LET Coverage Breakdown */}
              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <defs>
                    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#0f172a' }} />
                      <stop offset="100%" style={{ stopColor: '#1e293b' }} />
                    </linearGradient>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#f59e0b' }} />
                      <stop offset="100%" style={{ stopColor: '#fbbf24' }} />
                    </linearGradient>
                  </defs>
                  <rect width="760" height="340" fill="url(#bgGrad)" rx="10"/>
                  <text x="380" y="38" textAnchor="middle" fill="#f8fafc" fontSize="17" fontWeight="700" fontFamily="Georgia, serif">LET Coverage Breakdown 2026</text>
                  <line x1="60" y1="50" x2="700" y2="50" stroke="#334155" strokeWidth="1"/>
                  <text x="130" y="76" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">COMPONENT</text>
                  <text x="370" y="76" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">WHAT IT COVERS</text>
                  <text x="640" y="76" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">MIN PASSING</text>
                  <line x1="60" y1="84" x2="700" y2="84" stroke="#334155" strokeWidth="1"/>
                  <rect x="60" y="90" width="640" height="62" fill="#1e3a5f" rx="6"/>
                  <text x="130" y="113" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="700" fontFamily="Arial, sans-serif">Professional</text>
                  <text x="130" y="131" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="700" fontFamily="Arial, sans-serif">Education</text>
                  <text x="340" y="109" fill="#cbd5e1" fontSize="11" fontFamily="Arial, sans-serif">Theories of teaching and learning, curriculum,</text>
                  <text x="340" y="124" fill="#cbd5e1" fontSize="11" fontFamily="Arial, sans-serif">assessment, child development, classroom</text>
                  <text x="340" y="139" fill="#cbd5e1" fontSize="11" fontFamily="Arial, sans-serif">management, educational philosophy</text>
                  <text x="640" y="124" textAnchor="middle" fill="#86efac" fontSize="15" fontWeight="700" fontFamily="Arial, sans-serif">50%</text>
                  <rect x="60" y="160" width="640" height="62" fill="#172033" rx="6"/>
                  <text x="130" y="183" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="700" fontFamily="Arial, sans-serif">General</text>
                  <text x="130" y="201" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="700" fontFamily="Arial, sans-serif">Education</text>
                  <text x="340" y="179" fill="#cbd5e1" fontSize="11" fontFamily="Arial, sans-serif">English, Filipino, Mathematics, Science,</text>
                  <text x="340" y="194" fill="#cbd5e1" fontSize="11" fontFamily="Arial, sans-serif">Social Studies, Technology and Livelihood</text>
                  <text x="340" y="209" fill="#cbd5e1" fontSize="11" fontFamily="Arial, sans-serif">Education (scope varies by level)</text>
                  <text x="640" y="194" textAnchor="middle" fill="#86efac" fontSize="15" fontWeight="700" fontFamily="Arial, sans-serif">50%</text>
                  <rect x="60" y="230" width="640" height="62" fill="#1e3a5f" rx="6"/>
                  <text x="130" y="253" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="700" fontFamily="Arial, sans-serif">Field of</text>
                  <text x="130" y="271" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="700" fontFamily="Arial, sans-serif">Specialization</text>
                  <text x="340" y="249" fill="#cbd5e1" fontSize="11" fontFamily="Arial, sans-serif">Secondary level only. Deep knowledge of your</text>
                  <text x="340" y="264" fill="#cbd5e1" fontSize="11" fontFamily="Arial, sans-serif">major subject: English, Math, Filipino, Science,</text>
                  <text x="340" y="279" fill="#cbd5e1" fontSize="11" fontFamily="Arial, sans-serif">Social Studies, MAPEH, TLE, and others</text>
                  <text x="640" y="264" textAnchor="middle" fill="#86efac" fontSize="15" fontWeight="700" fontFamily="Arial, sans-serif">50%</text>
                  <text x="380" y="322" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial, sans-serif">General Weighted Average of 75% required to pass | Source: PRC Board of Professional Teachers | LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>LET 2026 coverage breakdown across all three components</figcaption>
              </figure>

              <hr className="border-white/10 my-6" />

              {renderContent(SECTION_2)}

              <AdPlaceholder slot="banner" className="my-6" />

              {/* SVG: 12-Week Study Plan */}
              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <defs>
                    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#0f172a' }} />
                      <stop offset="100%" style={{ stopColor: '#1e293b' }} />
                    </linearGradient>
                  </defs>
                  <rect width="760" height="400" fill="url(#bg2)" rx="10"/>
                  <text x="380" y="36" textAnchor="middle" fill="#f8fafc" fontSize="17" fontWeight="700" fontFamily="Georgia, serif">12-Week LET Self-Review Plan</text>
                  <line x1="60" y1="48" x2="700" y2="48" stroke="#334155" strokeWidth="1"/>
                  <rect x="60" y="60" width="130" height="60" fill="#1e3a5f" rx="8"/>
                  <text x="125" y="84" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">WEEKS 1 to 2</text>
                  <text x="125" y="100" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial, sans-serif">Diagnostics</text>
                  <text x="125" y="114" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="Arial, sans-serif">All 3 components</text>
                  <polygon points="198,88 210,82 210,94" fill="#f59e0b"/>
                  <line x1="190" y1="88" x2="210" y2="88" stroke="#f59e0b" strokeWidth="2"/>
                  <rect x="215" y="60" width="130" height="60" fill="#1e3a5f" rx="8"/>
                  <text x="280" y="84" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">WEEKS 3 to 5</text>
                  <text x="280" y="100" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial, sans-serif">Professional Ed</text>
                  <text x="280" y="114" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="Arial, sans-serif">Deep review</text>
                  <polygon points="353,88 365,82 365,94" fill="#f59e0b"/>
                  <line x1="345" y1="88" x2="365" y2="88" stroke="#f59e0b" strokeWidth="2"/>
                  <rect x="370" y="60" width="130" height="60" fill="#1e3a5f" rx="8"/>
                  <text x="435" y="84" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">WEEKS 6 to 7</text>
                  <text x="435" y="100" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial, sans-serif">General Ed</text>
                  <text x="435" y="114" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="Arial, sans-serif">Weak areas first</text>
                  <polygon points="508,88 520,82 520,94" fill="#f59e0b"/>
                  <line x1="500" y1="88" x2="520" y2="88" stroke="#f59e0b" strokeWidth="2"/>
                  <rect x="525" y="60" width="135" height="60" fill="#1e3a5f" rx="8"/>
                  <text x="592" y="84" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">WEEKS 8 to 9</text>
                  <text x="592" y="100" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial, sans-serif">Specialization</text>
                  <text x="592" y="114" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="Arial, sans-serif">Secondary only</text>
                  <rect x="155" y="160" width="200" height="60" fill="#14532d" rx="8"/>
                  <text x="255" y="184" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">WEEKS 10 to 11</text>
                  <text x="255" y="200" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial, sans-serif">Full Mock Exams</text>
                  <text x="255" y="214" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial, sans-serif">All 3 components timed</text>
                  <polygon points="380,148 374,160 386,160" fill="#f59e0b"/>
                  <line x1="380" y1="120" x2="380" y2="160" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="363,188 375,182 375,194" fill="#f59e0b"/>
                  <line x1="355" y1="188" x2="375" y2="188" stroke="#f59e0b" strokeWidth="2"/>
                  <rect x="405" y="160" width="200" height="60" fill="#78350f" rx="8"/>
                  <text x="505" y="184" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">WEEK 12</text>
                  <text x="505" y="200" textAnchor="middle" fill="#fef3c7" fontSize="11" fontFamily="Arial, sans-serif">Rest and Light Review</text>
                  <text x="505" y="214" textAnchor="middle" fill="#fcd34d" fontSize="10" fontFamily="Arial, sans-serif">Stop new topics, protect sleep</text>
                  <rect x="60" y="250" width="640" height="50" fill="#1e293b" rx="8" stroke="#334155" strokeWidth="1"/>
                  <text x="380" y="271" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial, sans-serif">Daily Target: 4 to 5 focused hours</text>
                  <text x="380" y="290" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial, sans-serif">Quality over quantity. A distracted 8-hour session is worth less than a sharp 4-hour one.</text>
                  <rect x="60" y="318" width="640" height="50" fill="#1e3a5f" rx="8"/>
                  <text x="380" y="338" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="600" fontFamily="Arial, sans-serif">Give Professional Education at least 40% of your total review time.</text>
                  <text x="380" y="356" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial, sans-serif">It is the heaviest component and the most common reason LET examinees fall short.</text>
                  <text x="380" y="390" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial, sans-serif">LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>12-week self-review plan for LET 2026</figcaption>
              </figure>

              <hr className="border-white/10 my-6" />

              {renderContent(SECTION_3)}
            </div>

            {/* CTA */}
            <div className="mt-10 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Ready to Start Practicing?</p>
              <p className="text-gray-400 text-sm mb-4">
                Reading about the LET is just the beginning. The real preparation happens when you start answering actual practice questions and seeing where your knowledge holds up and where it needs more work.
              </p>
              <Link
                href="https://lisensyaprep.com"
                className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Start Your LET Practice at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            {/* Related Articles */}
            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">Related LET Articles on LisensyaPrep</h2>
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

          {/* Sidebar */}
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
