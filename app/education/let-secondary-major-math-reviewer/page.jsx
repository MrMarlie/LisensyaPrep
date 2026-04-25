import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'LET Secondary Major Mathematics Reviewer 2026 Philippines (Complete Guide)',
  description:
    'Taking the LET for Secondary Mathematics? This reviewer covers algebra, geometry, trigonometry, statistics, number theory, and math teaching methods tested in the LET major subject.',
  path: '/education/let-secondary-major-math-reviewer',
  image: '/images/articles/hero-let-secondary-math.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LET Secondary Major Mathematics Reviewer 2026 Philippines',
  description:
    'Complete LET Secondary Major Mathematics reviewer covering algebra, geometry, trigonometry, statistics, number theory, and mathematics teaching methods.',
  image: 'https://lisensyaprep.com/images/articles/hero-let-secondary-math.jpg',
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
    '@id': 'https://lisensyaprep.com/education/let-secondary-major-math-reviewer',
  },
};

const RELATED_ARTICLES = [
  { text: 'How to Pass the LET on Your First Take', href: '/education/how-to-pass-let-first-take' },
  { text: 'Professional Education Reviewer LET 2026', href: '/education/professional-education-reviewer' },
  { text: 'General Education Reviewer LET 2026', href: '/education/general-education-reviewer' },
  { text: 'LET Secondary Major English Reviewer 2026', href: '/education/let-secondary-major-english-reviewer' },
  { text: 'PRC Board Exam Schedule 2026', href: '/blog/prc-board-exam-schedule-2026' },
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

The LET Secondary Major in Mathematics is one of the more challenging specialization exams because it combines deep content knowledge across several branches of mathematics with the ability to teach those concepts effectively. You need to know not just how to solve problems but how to explain the thinking behind them.

This reviewer covers the major topic areas of the LET Mathematics major subject with worked examples for the most commonly tested problem types.

---

## Number Theory and the Real Number System

### Properties of Real Numbers

These properties appear in LET questions both directly and as the basis for explaining why certain algebraic steps are valid.

**Commutative Property:** a plus b equals b plus a. a times b equals b times a. Order does not matter for addition and multiplication.

**Associative Property:** (a plus b) plus c equals a plus (b plus c). Grouping does not matter for addition and multiplication.

**Distributive Property:** a times (b plus c) equals (a times b) plus (a times c). This property connects multiplication and addition.

**Identity Property:** Adding 0 does not change a value. Multiplying by 1 does not change a value.

**Inverse Property:** Every number has an additive inverse (its negative) and a multiplicative inverse (its reciprocal), except zero which has no multiplicative inverse.

### Divisibility Rules

Divisibility rules are a reliable source of LET items because they test conceptual understanding rather than computation.

| Divisible by | Rule |
|-------------|------|
| 2 | Last digit is even |
| 3 | Sum of digits is divisible by 3 |
| 4 | Last two digits form a number divisible by 4 |
| 5 | Last digit is 0 or 5 |
| 6 | Divisible by both 2 and 3 |
| 9 | Sum of digits is divisible by 9 |
| 10 | Last digit is 0 |

---

## Algebra

### Linear Equations and Inequalities

A linear equation in one variable has the form ax plus b equals c. Solving involves isolating the variable by performing the same operation on both sides.

For inequalities, the same rules apply with one critical difference: when multiplying or dividing both sides by a negative number, the inequality sign reverses direction.

### Quadratic Equations

A quadratic equation has the form ax squared plus bx plus c equals 0.

**Factoring method:** Express the quadratic as a product of two binomials and set each factor equal to zero.

**Quadratic formula:** x equals negative b plus or minus the square root of (b squared minus 4ac), all divided by 2a.

The **discriminant** is b squared minus 4ac.
- If discriminant is greater than 0: two distinct real roots
- If discriminant equals 0: one repeated real root
- If discriminant is less than 0: no real roots (two complex roots)

### Functions and Relations

A **relation** is any set of ordered pairs. A **function** is a relation where each input (x-value) corresponds to exactly one output (y-value).

The **vertical line test** determines if a graph represents a function. If any vertical line crosses the graph more than once, it is not a function.

**Domain** is the set of all valid input values. **Range** is the set of all output values.

---

## Geometry
`;

const SECTION_2 = `
### Angle Relationships

**Complementary angles** sum to 90 degrees. **Supplementary angles** sum to 180 degrees.

**Vertical angles** are formed by two intersecting lines and are always equal.

**Corresponding angles** formed when a transversal crosses parallel lines are equal.

**Alternate interior angles** formed when a transversal crosses parallel lines are equal.

### Triangle Congruence and Similarity

**Congruent triangles** have exactly the same shape and size. Congruence postulates: SSS, SAS, ASA, AAS, and HL (for right triangles).

**Similar triangles** have the same shape but different sizes. Their corresponding angles are equal and corresponding sides are proportional.

---

## Trigonometry

### Basic Trigonometric Ratios

In a right triangle with angle theta, the hypotenuse, opposite side, and adjacent side:

**SOH-CAH-TOA** is the standard memory aid:
- Sine = Opposite divided by Hypotenuse
- Cosine = Adjacent divided by Hypotenuse
- Tangent = Opposite divided by Adjacent

### Special Angles

| Angle | Sin | Cos | Tan |
|-------|-----|-----|-----|
| 0° | 0 | 1 | 0 |
| 30° | 1/2 | √3/2 | 1/√3 |
| 45° | √2/2 | √2/2 | 1 |
| 60° | √3/2 | 1/2 | √3 |
| 90° | 1 | 0 | undefined |

---

## Statistics and Probability

### Measures of Central Tendency

**Mean** is the arithmetic average. Add all values and divide by the number of values.

**Median** is the middle value when data is arranged in ascending order. For an even number of values, take the average of the two middle values.

**Mode** is the most frequently occurring value. A data set can have no mode, one mode, or multiple modes.

### Standard Deviation

Standard deviation measures how spread out values are from the mean. A small standard deviation means values are clustered close to the mean. A large standard deviation means values are spread far from the mean.

### Probability

**Simple probability:** P(Event) = Number of favorable outcomes divided by total possible outcomes.

**Complementary events:** P(not A) = 1 minus P(A).

**Independent events:** P(A and B) = P(A) times P(B).

**Mutually exclusive events:** P(A or B) = P(A) plus P(B).

---

## Teaching Mathematics: Methods and Approaches

### Problem-Solving Approach (George Polya)

Polya's four-step problem solving framework is foundational for teaching mathematics and appears in LET questions:

**Step 1: Understand the problem.** What is given? What is being asked?
**Step 2: Devise a plan.** What strategy will you use? Draw a diagram, make a table, look for a pattern, work backward.
**Step 3: Carry out the plan.** Execute the strategy carefully.
**Step 4: Look back.** Does the answer make sense? Can you verify it? Is there another way?

### Conceptual Understanding vs Procedural Fluency

The LET tests your understanding that effective math teaching requires both. **Conceptual understanding** means knowing why a procedure works. **Procedural fluency** means being able to carry out procedures accurately and efficiently. Strong math teachers develop both in their students.

### Manipulatives and Concrete-Pictorial-Abstract Approach

The CPA approach moves from concrete objects (physical manipulatives) to pictorial representations (drawings and diagrams) to abstract symbols (numbers and equations). This sequence supports conceptual understanding before procedural practice.

---

## Practice What You Just Learned

The LET Secondary Major Math exam includes both computation problems and pedagogical questions about how to teach mathematical concepts. Practice questions that combine both types are essential preparation.

Head to LisensyaPrep and practice now. No registration required.

**[Practice LET Secondary Math Questions at LisensyaPrep](https://lisensyaprep.com)**
`;

export default function SecondaryMathReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-let-math" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Secondary Major Mathematics Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">
                Education (LET)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                LET Secondary Major Mathematics Reviewer 2026 Philippines
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
                src="/images/articles/hero-let-secondary-math.jpg"
                alt="Student solving mathematics equations under lamp light for LET secondary major math reviewer Philippines 2026"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="280" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Key Geometry Formulas for LET Secondary Math</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="200" y="62" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">SHAPE</text>
                  <text x="420" y="62" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">AREA</text>
                  <text x="620" y="62" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PERIMETER / CIRCUMFERENCE</text>
                  <line x1="40" y1="70" x2="720" y2="70" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="76" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="200" y="96" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Rectangle</text>
                  <text x="420" y="96" textAnchor="middle" fill="#86efac" fontSize="12" fontFamily="Arial,sans-serif">A = length x width</text>
                  <text x="620" y="96" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">P = 2(l + w)</text>
                  <rect x="40" y="112" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="200" y="132" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Triangle</text>
                  <text x="420" y="132" textAnchor="middle" fill="#86efac" fontSize="12" fontFamily="Arial,sans-serif">A = (1/2) x base x height</text>
                  <text x="620" y="132" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">P = sum of all sides</text>
                  <rect x="40" y="148" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="200" y="168" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Circle</text>
                  <text x="420" y="168" textAnchor="middle" fill="#86efac" fontSize="12" fontFamily="Arial,sans-serif">A = π r²</text>
                  <text x="620" y="168" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">C = 2πr or πd</text>
                  <rect x="40" y="184" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="200" y="204" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Trapezoid</text>
                  <text x="420" y="204" textAnchor="middle" fill="#86efac" fontSize="12" fontFamily="Arial,sans-serif">A = (1/2)(b1 + b2) x height</text>
                  <text x="620" y="204" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">P = sum of all sides</text>
                  <rect x="40" y="220" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="200" y="240" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Right Triangle (Pythagorean)</text>
                  <text x="490" y="240" textAnchor="middle" fill="#86efac" fontSize="12" fontFamily="Arial,sans-serif">a² + b² = c² where c is the hypotenuse</text>
                  <text x="380" y="270" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | LET Secondary Major Math Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Key geometry formulas for LET Secondary Mathematics</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_2)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice LET Secondary Math questions with instant feedback. No registration required.
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
