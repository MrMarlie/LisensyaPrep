import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'DepEd Ranking 2026 - Teacher 1 Application Guide (Points System)',
  description:
    'Complete DepEd Teacher 1 ranking guide 2026. The DO 7 s.2023 points system explained - 50-point RQA cutoff, demo teaching worth 35 points, requirements checklist, and step-by-step application process.',
  path: '/education/deped-teacher-1-ranking-guide',
});

const SCHEMA_HOWTO = `{"@context":"https://schema.org","@type":"HowTo","name":"How to Apply for DepEd Teacher 1 Ranking","description":"Step-by-step DepEd Teacher 1 application process under DO 7 s.2023 including the points system, RQA cutoff, and requirements.","step":[{"@type":"HowToStep","name":"Watch for the Call for Applications","text":"Schools Division Offices announce Teacher 1 hiring around January for the next school year."},{"@type":"HowToStep","name":"Submit Requirements","text":"Submit your letter of intent, PDS, PRC license, Certificate of Rating, TOR, and training certificates to the SDO."},{"@type":"HowToStep","name":"Undergo Paper Evaluation","text":"Education, Training, Experience, and LET rating are scored under the Open Ranking System, worth 40 points total."},{"@type":"HowToStep","name":"Deliver Demonstration Teaching","text":"Your demo is scored against PPST Classroom Observable Indicators, worth 35 points."},{"@type":"HowToStep","name":"Complete the Teacher Reflection Form","text":"Written reflections scored against Non-Classroom Observable Indicators, worth 25 points."},{"@type":"HowToStep","name":"Enter the RQA","text":"Score at least 50 points to enter the Registry of Qualified Applicants, from which schools fill Teacher 1 vacancies."}],"author":{"@type":"Organization","name":"LisensyaPrep Team"},"publisher":{"@type":"Organization","name":"LisensyaPrep"},"datePublished":"2026-07-15"}`;

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What score do I need to make the DepEd RQA?","acceptedAnswer":{"@type":"Answer","text":"At least 50 points out of 100 under DepEd Order No. 7, s. 2023 — reduced from the previous 70-point cutoff."}},{"@type":"Question","name":"Is there still an English Proficiency Test in DepEd ranking?","acceptedAnswer":{"@type":"Answer","text":"No. DO 7, s. 2023 removed the EPT as a criterion, along with panel interviews, which were replaced by the Teacher Reflection Form."}},{"@type":"Question","name":"How much is demonstration teaching worth in DepEd ranking?","acceptedAnswer":{"@type":"Answer","text":"35 points — the single largest criterion. Together with the 25-point Teacher Reflection Form, performance measures make up 60 of the 100 total points."}},{"@type":"Question","name":"Does private school teaching experience count in DepEd ranking?","acceptedAnswer":{"@type":"Answer","text":"Yes. Teaching experience beyond the minimum requirement earns points whether it was in public or private schools."}}]}`;

const RELATED_ARTICLES = [
  { text: 'DepEd Teacher 1 Requirements 2026: Document Checklist', href: '/education/deped-teacher-1-requirements' },
  { text: 'What to Do After Passing the LET', href: '/education/after-passing-let-next-steps' },
  { text: 'PRC Initial Registration Guide', href: '/blog/prc-initial-registration-guide' },
  { text: 'LET Coverage 2026', href: '/education/let-coverage-2026' },
  { text: 'Teacher Salary Philippines 2026', href: '/education/teacher-salary-philippines' },
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

// Markdown-like renderer: headings, rules, bullet/numbered lists, tables, and paragraphs.
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
    } else if (line.startsWith('| ') && line.endsWith(' |')) {
      if (line.match(/^\|[-\s|]+\|$/)) continue; // separator row
      const cells = line.split('|').slice(1, -1).map((c) => c.trim());
      const isHeader = lines[i + 1]?.includes('---') && lines[i + 1]?.match(/^\|[-\s|]+\|$/);
      if (isHeader) {
        elements.push(
          <tr key={key++} className="border-b border-white/10">
            {cells.map((cell, ci) => (
              <th key={ci} className="px-4 py-2 text-left text-yellow-400 font-semibold text-sm">{cell}</th>
            ))}
          </tr>
        );
      } else {
        elements.push(
          <tr key={key++} className="border-b border-white/5">
            {cells.map((cell, ci) => (
              <td key={ci} className="px-4 py-2 text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: formatInline(cell) }} />
            ))}
          </tr>
        );
      }
    } else if (line.startsWith('- ')) {
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />);
    } else if (line.match(/^\d+\. /)) {
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, '')) }} />);
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(<p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />);
    }
  }

  // Wrap consecutive <li> into <ul> and consecutive <tr> into <table>.
  const wrapped = [];
  let listBuffer = [];
  let tableBuffer = [];
  const flushList = () => {
    if (listBuffer.length) {
      wrapped.push(<ul key={`ul-${key++}`} className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>);
      listBuffer = [];
    }
  };
  const flushTable = () => {
    if (tableBuffer.length) {
      wrapped.push(
        <div key={`table-${key++}`} className="overflow-x-auto my-4">
          <table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden">
            <tbody>{tableBuffer}</tbody>
          </table>
        </div>
      );
      tableBuffer = [];
    }
  };
  for (const el of elements) {
    if (el.type === 'li') {
      flushTable();
      listBuffer.push(el);
    } else if (el.type === 'tr') {
      flushList();
      tableBuffer.push(el);
    } else {
      flushList();
      flushTable();
      wrapped.push(el);
    }
  }
  flushList();
  flushTable();
  return wrapped;
}

const MAIN_CONTENT = `
For most new LPTs, the dream is a **permanent DepEd Teacher 1 item** — security of tenure, Salary Grade benefits, GSIS, and a classroom of your own. The gate to that dream is the **DepEd ranking process**, and it changed significantly under **DepEd Order No. 7, s. 2023**.

If your understanding of "ranking" comes from older batchmates — interviews, the English Proficiency Test, a 70-point cutoff — much of that is now outdated. This guide walks you through the current system: the exact points breakdown, the 50-point RQA cutoff, and how to maximize your score at every stage.

**Quick answer:** Apply to your target Schools Division Office when it issues a Call for Applications (typically around January). You are evaluated over 100 points across six criteria — with demonstration teaching alone worth 35 points. Score **at least 50 points** and you enter the **Registry of Qualified Applicants (RQA)**, from which schools fill Teacher 1 vacancies. Full breakdown below.

---

## The Governing Rules in 2026

Current Teacher 1 hiring follows three issuances, cited together in division Calls for Applications:

- **DepEd Order No. 19, s. 2022** — the Merit Selection Plan
- **DepEd Order No. 7, s. 2023** — the criteria, points system, and process
- **DepEd Order No. 21, s. 2024** — amendments, including the score carry-over option

Hiring is **decentralized**: you apply directly to the **Schools Division Office (SDO)** where you want to teach, not through a central portal. Each division issues its own memorandum with dates and venues.

---

## The Points System: 100 Points, Six Criteria

Under DO 7, s. 2023, Teacher 1 applicants are scored as follows:

| Criterion | Maximum Points |
|-----------|---------------|
| Education | 10 |
| Training | 10 |
| Experience | 10 |
| PBET/LET/LEPT Rating | 10 |
| **PPST Classroom Observable Indicators (Demonstration Teaching)** | **35** |
| **PPST Non-Classroom Observable Indicators (Teacher Reflection Form)** | **25** |
| **TOTAL** | **100** |

Read that table again, because it tells you where the battle is actually won:

**Your paper credentials — education, training, experience, and LET rating combined — are worth only 40 points.** The **demonstration teaching (35) and Teacher Reflection Form (25) are worth 60 points together.** A fresh graduate with zero experience who delivers an excellent demo and reflection can outrank a credential-heavy applicant who performs poorly on the day.

### What Changed from the Old System

DO 7, s. 2023 made three changes every applicant should know:

1. **No more English Proficiency Test (EPT)** — removed as a criterion
2. **No more panel interviews** — replaced by the written **Teacher Reflection Form**
3. **RQA cutoff reduced from 70 to 50 points** — making the registry more attainable, though competition for actual items remains

If you see older guides (or well-meaning friends) mention the EPT, interviews, or a 70-point cutoff, they are describing the pre-2023 system.

---

## The Six Criteria, Explained

### 1. Education (10 points)

Points are for qualifications **exceeding** the minimum (a bachelor's degree is the baseline and earns no extra points). Completed master's units, a full master's degree, and doctorate units add points per the increments table. Relevant education only — units must relate to the level you are applying for.

### 2. Training (10 points)

Training hours in curriculum and instruction or other relevant specialized training **beyond the minimum**, acquired in the **last five years**. Keep every seminar certificate — hours are counted.

### 3. Experience (10 points)

Teaching experience beyond the minimum requirement. **Private school teaching counts**, which is why many LPTs teach private first while waiting for an item. For SHS applicants, relevant industry or work experience may also be credited.

### 4. LET/PBET/LEPT Rating (10 points)

Your board rating converts to points via a formula. A higher LET rating means more points — one more reason your board exam preparation mattered beyond just passing.

### 5. Demonstration Teaching — PPST COI (35 points)

The single biggest criterion. You deliver an actual classroom demonstration observed and scored against the **Philippine Professional Standards for Teachers (PPST) Classroom Observable Indicators** using official rubrics.

How to prepare:
- Study the PPST indicators — observers score against these specific strands
- Prepare a complete lesson plan with clear objectives, differentiated activities, and assessment
- Practice your demo with a live audience (batchmates, family) at least twice
- Manage time strictly — an unfinished lesson scores poorly
- Show learner-centered techniques: questioning, engagement, positive discipline

### 6. Teacher Reflection Form — PPST NCOI (25 points)

The written replacement for interviews. You respond to prompts demonstrating your understanding of the **Non-Classroom Observable Indicators** — professionalism, learner diversity, community linkages — through narratives and reflections scored by rubric.

How to prepare:
- Write authentic, specific narratives — real situations, real actions, real results
- Connect every answer explicitly to PPST strands
- Structure responses clearly (situation → action → outcome → learning)

---

## The Application Requirements

Per DO 7, s. 2023, prepare:

1. **Letter of intent** addressed to the head of office (per the division's memo)
2. **Personal Data Sheet** — CS Form No. 212, Revised 2017, with Work Experience Sheet
3. **Photocopy of valid PRC License/ID**
4. **Photocopy of Certificate of Rating** (LET/PBET/LEPT)
5. **TOR and Diploma** — plus certificates of graduate units/degrees if any
6. **Certificates of Training**
7. **Certificates of Employment / service records** (if with experience)
8. **Performance ratings** (if applicable, for those with prior service)

Check your specific division's Call for Applications for folder format, tabbing, and submission logistics — divisions add their own document-arrangement rules. Our companion [DepEd Teacher 1 Requirements checklist](/education/deped-teacher-1-requirements) covers document preparation in full.

---

## The Process, Step by Step

1. **Watch for the Call for Applications** — divisions typically announce around **January** for the next school year, via division memoranda and official Facebook pages
2. **Submit your application** to the SDO within the stated window
3. **Paper evaluation** — the HR Merit Promotion and Selection Board evaluates your Education, Training, Experience, and LET rating under the **Open Ranking System** (you can witness the evaluation — transparency is mandated)
4. **Demonstration teaching** — scheduled by the division; scored against PPST COI rubrics
5. **Teacher Reflection Form** — completed and scored against NCOI rubrics
6. **Comparative Assessment Result (CAR) and RQA posting** — scores are consolidated; applicants with **50 points or above** enter the **Registry of Qualified Applicants** for that school year
7. **Appointment** — as Teacher 1 items open, schools fill them from the RQA

**Being in the RQA means you are qualified — appointment happens when an item opens.** Some applicants are appointed quickly; others wait within the RQA's validity for that school year.

---

## The Carry-Over Option (DO 21, s. 2024)

If you were in a previous CAR-RQA but not appointed — or even if you did not meet the cutoff — **you do not have to redo the entire process.** Under DO 21, s. 2024, you may:

- **Retain all your scores** — indicate this intent in your application letter, or
- **Update your credentials** — submit only your application letter, PDS, checklist, and the *updated* documents (new training certificates, new experience, completed graduate units)

Strategic implication: every year you wait, you can add training hours, teaching experience, and graduate units — updating only those criteria while keeping your demo score if it was strong.

---

## Honest Advice for Applicants

**Put 70% of your preparation into the demo and reflection.** They are 60% of your score and the only criteria you can dramatically improve in weeks rather than years.

**Do not despair over thin credentials.** The 50-point cutoff plus the 60-point weight on performance means fresh graduates realistically make the RQA with a strong demo.

**Ranking is free and merit-based.** No recommendation letters earn points, and anyone selling "assistance" or "backer" services is scamming you. The Open Ranking System exists precisely so you can watch your own evaluation.

**Teach while you wait.** Private school experience earns Experience points for your next update and makes your demo sharper — the wait becomes an investment.

---

## Frequently Asked Questions

**What score do I need to make the RQA?**
At least 50 points out of 100 under DO 7, s. 2023 — reduced from the previous 70-point cutoff.

**Is there still an English Proficiency Test?**
No. DO 7, s. 2023 removed the EPT as a criterion, along with panel interviews.

**Is the demonstration teaching really worth 35 points?**
Yes — it is the single largest criterion, and together with the 25-point Teacher Reflection Form, performance-based measures make up 60 of the 100 points.

**Does private school teaching experience count?**
Yes, teaching experience beyond the minimum earns Experience points regardless of whether it was public or private.

**When do applications open?**
Divisions typically issue Calls for Applications around January for the next school year, but timing varies — follow your target SDO's website and official Facebook page.

**I was in last year's RQA but not appointed. Do I start over?**
No. Under DO 21, s. 2024, you can carry over your scores or update only your changed credentials — state your choice in your application letter.

**Do I apply to DepEd Central Office?**
No. Hiring is decentralized — apply directly to the Schools Division Office where you want to teach.

---

## Before You Apply

Make sure your license paperwork is complete: [What to Do After Passing the LET](/education/after-passing-let-next-steps) covers oath, PRC ID, and your options while waiting for an item. And if you are still preparing for the LET itself — your board rating is worth 10 ranking points, so aim high: [free gamified LET reviewers at LisensyaPrep](/education/).
`;

export default function DepEdRankingGuidePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-deped-ranking-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_HOWTO }} />
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: '/education', name: 'Education' }, { url: '/education/deped-teacher-1-ranking-guide', name: 'DepEd Teacher 1 Ranking Guide' }]} />
      <Script id="schema-deped-ranking-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">DepEd Ranking Guide</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">Education (LET)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                DepEd Ranking 2026: Complete Teacher 1 Application Guide
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 15, 2026</span><span>•</span>
                <span>12 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">Related Guides</h2>
              <ul className="space-y-3">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-violet-900/20 to-violet-900/10 border border-violet-500/30 rounded-2xl p-6 text-center">
              <p className="text-violet-400 font-extrabold text-lg mb-2">Still Reviewing for the LET?</p>
              <p className="text-gray-400 text-sm mb-4">Your LET rating is worth 10 ranking points. Free gamified General Education and Professional Education reviewers. No account required.</p>
              <Link href="/education" className="inline-block bg-violet-500 hover:bg-violet-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Post-Exam Guides</h3>
              <div className="space-y-3">
                {RELATED_ARTICLES.map(({ text, href }) => (
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
    </div>
  );
}
