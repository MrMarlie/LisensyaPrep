import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'PNLE 3-Month Study Plan for Self-Reviewers 2026 Philippines',
  description:
    'Planning to self-review for the Philippine Nurse Licensure Examination? This 3-month PNLE study plan breaks down exactly what to study each week so you pass on your first attempt.',
  path: '/nursing/pnle-3-month-study-plan',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'PNLE 3-Month Study Plan for Self-Reviewers 2026 Philippines',
  description:
    'Complete 3-month PNLE study plan for self-reviewers covering all nursing board exam subjects week by week with daily study structure, subject priority guide, and exam day tips.',
  image: 'https://lisensyaprep.com/images/articles/hero-nle-3-month-study-plan.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-26',
  dateModified: '2026-04-26',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/pnle-3-month-study-plan' },
};

const ALL_NLE_ARTICLES = [
  { text: 'PNLE Coverage 2026 Complete Topic Breakdown', href: '/nursing/pnle-coverage-2026' },
  { text: 'Community Health Nursing Reviewer NLE 2026', href: '/nursing/community-health-nursing-reviewer' },
  { text: 'Medical-Surgical Nursing Reviewer NLE 2026', href: '/nursing/medical-surgical-nursing-reviewer' },
  { text: 'Psychiatric Nursing Reviewer NLE 2026', href: '/nursing/psychiatric-nursing-reviewer' },
  { text: 'Maternal and Child Nursing Reviewer NLE 2026', href: '/nursing/maternal-child-nursing-reviewer' },
  { text: 'PNLE 3-Month Study Plan 2026', href: '/nursing/pnle-3-month-study-plan' },
  { text: 'PNLE Application Guide 2026', href: '/nursing/pnle-application-guide-2026' },
  { text: 'PNLE Passing Rate and Results 2026', href: '/nursing/pnle-passing-rate-results-2026' },
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

const INTRO = `
Three months is the sweet spot for PNLE self-review. It is enough time to cover all subject areas thoroughly, run multiple rounds of practice questions, and still have a proper rest week before exam day. It is also short enough to maintain momentum and urgency throughout.

The plan below is designed for someone reviewing full-time with 4 to 5 focused hours per day. If you are working or have other commitments, add 2 to 4 more weeks and reduce the daily target to 2 to 3 hours.

---

## Before You Start: Week Zero

Do not open a single reviewer yet. Spend your first week doing only two things.

**Take a diagnostic test for every PNLE subject.** LisensyaPrep has free practice questions organized by subject. Take 30 to 50 questions per subject and record your scores. Be honest. This is not a test you can fail. It is a map that tells you where to focus your time over the next 12 weeks.

**Build your personal schedule.** Use the template below as your framework but adjust it based on your diagnostic results. Subjects where you scored below 60 percent get more time. Subjects where you scored above 75 percent get lighter maintenance review.

---

## The 12-Week PNLE Study Plan
`;

const AFTER_SVG1 = `
---

## Weekly Study Structure

Knowing what to study each week is only half the picture. How you structure each day matters just as much.

**Morning block (2 hours): Content review**
Read your reviewer for the current subject. Focus on understanding concepts, not memorizing. For every concept you read, ask yourself how it would appear in an NLE scenario question.

**Afternoon block (2 hours): Practice questions**
Answer 30 to 50 questions on what you reviewed in the morning. Do not just mark correct and incorrect. Read the rationale for every wrong answer and for every correct answer you were unsure about.

**Evening (30 minutes): Weak spots notebook**
Review your weak spots notebook from the day. Write down concepts you got wrong more than once. These become your priority review items in Weeks 11 and 12.

---

## Subject Priority Guide

Not all subjects deserve equal time. Here is how to allocate based on exam weight and difficulty.
`;

const MAIN_CONTENT = `
---

## Rules to Follow for All 12 Weeks

**Never skip Community Health Nursing.** It is 100 items and the most commonly underestimated subject in the NLE. Examinees who fail often have CHN scores below 60 percent despite doing well everywhere else.

**Prioritize rationale over answer keys.** Understanding why an answer is correct is worth ten times more than knowing what the correct answer is. Every wrong answer is a learning opportunity if you read the rationale carefully.

**Do not study subjects you are already strong in.** Once you are consistently scoring above 75 percent in a subject during practice, reduce your time there and shift it to weaker areas. Reviewing what you already know feels productive but does not improve your overall score.

**Rest one full day per week.** Studying seven days straight without rest causes burnout and reduces retention. Schedule one complete rest day per week from the beginning. It is part of the plan, not a failure to follow it.

**Simulate exam conditions in the final 2 weeks.** Sit at a desk, set a timer for 60 seconds per item, answer without stopping, and score it when finished. This builds the mental endurance you need on exam day.

---

## What to Do the Week Before the Exam

Stop reviewing new material entirely by the time you are 7 days out from your exam.

**Days 7 to 4 before exam:** Light review of your weak spots notebook only. No new subjects. No new practice tests. Maximum 2 hours per day.

**Days 3 to 2 before exam:** Prepare your exam documents. Confirm your Notice of Admission is printed. Verify your testing center location. Pack your bag. Review your ID. Rest.

**Night before exam:** Stop all reviewing by 8 PM. Eat a proper meal. Sleep by 10 PM. Your brain consolidates everything you reviewed during sleep. A clear head on exam day is worth more than one more hour of cramming.

**Exam day morning:** Light breakfast. Leave early. Arrive at the venue at least 45 minutes before the scheduled start. You have prepared for this.

---

## Use LisensyaPrep Throughout Your Review

Every subject in this study plan has a dedicated reviewer and practice quiz on LisensyaPrep. Use them in order as you progress through each week.

- [PNLE Coverage 2026 Complete Topic Breakdown](https://lisensyaprep.com/nursing/pnle-coverage-2026)
- [Community Health Nursing Reviewer](https://lisensyaprep.com/nursing/community-health-nursing-reviewer)
- [Medical-Surgical Nursing Reviewer](https://lisensyaprep.com/nursing/medical-surgical-nursing-reviewer)
- [Psychiatric Nursing Reviewer](https://lisensyaprep.com/nursing/psychiatric-nursing-reviewer)
- [Maternal and Child Nursing Reviewer](https://lisensyaprep.com/nursing/maternal-child-nursing-reviewer)

**[Start Your Practice Quiz at LisensyaPrep](https://lisensyaprep.com/nursing)**

No registration required. Start immediately.
`;

export default function Pnle3MonthStudyPlanPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-pnle-studyplan" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">PNLE 3-Month Study Plan</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (NLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                PNLE 3-Month Study Plan for Self-Reviewers 2026 Philippines
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>April 26, 2026</span><span>•</span>
                <span>9 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-nle-3-month-study-plan.jpg"
              alt="Young Filipino nurse in white scrubs writing study plan in notebook for PNLE self-review Philippines 2026"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 440" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="440" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">PNLE 3-Month Self-Review Plan (12 Weeks)</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="48" width="680" height="44" fill="#1e293b" rx="6"/>
                  <text x="130" y="66" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">WEEK 0</text>
                  <text x="130" y="82" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Pre-review</text>
                  <text x="460" y="66" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Diagnostic tests for all subjects. Build your personal schedule.</text>
                  <text x="460" y="80" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Gather all reviewer materials. Set up your study space.</text>
                  <rect x="40" y="98" width="680" height="44" fill="#1e3a5f" rx="6"/>
                  <text x="130" y="116" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">WEEKS 1 to 2</text>
                  <text x="130" y="132" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Fundamentals of Nursing</text>
                  <text x="460" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Nursing process, safety, infection control, vital signs, medication administration,</text>
                  <text x="460" y="126" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">wound care, documentation. Daily: 30 practice questions with rationale review.</text>
                  <rect x="40" y="148" width="680" height="44" fill="#172033" rx="6"/>
                  <text x="130" y="166" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">WEEKS 3 to 4</text>
                  <text x="130" y="182" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Medical-Surgical Nursing</text>
                  <text x="460" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">All body systems: cardiovascular, respiratory, neuro, GI, renal, endocrine.</text>
                  <text x="460" y="176" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">One system per day. Daily: 50 practice questions. This is the largest subject.</text>
                  <rect x="40" y="198" width="680" height="44" fill="#1e3a5f" rx="6"/>
                  <text x="130" y="216" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">WEEK 5</text>
                  <text x="130" y="232" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Maternal and Child Nursing</text>
                  <text x="460" y="212" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Antepartum, intrapartum, postpartum, newborn care, child health and milestones.</text>
                  <text x="460" y="228" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Focus on APGAR, stages of labor, BUBBLE-LE, and EPI schedule.</text>
                  <rect x="40" y="248" width="680" height="44" fill="#172033" rx="6"/>
                  <text x="130" y="266" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">WEEK 6</text>
                  <text x="130" y="282" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Psychiatric Nursing</text>
                  <text x="460" y="262" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Therapeutic communication, major disorders, psychopharmacology, EPS, NMS,</text>
                  <text x="460" y="278" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">crisis intervention. Practice therapeutic communication scenarios daily.</text>
                  <rect x="40" y="298" width="680" height="44" fill="#78350f" rx="6"/>
                  <text x="130" y="316" textAnchor="middle" fill="#fcd34d" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">WEEKS 7 to 8</text>
                  <text x="130" y="332" textAnchor="middle" fill="#fef3c7" fontSize="10" fontFamily="Arial,sans-serif">Community Health Nursing</text>
                  <text x="460" y="312" textAnchor="middle" fill="#fef3c7" fontSize="11" fontFamily="Arial,sans-serif">DOH programs, EPI vaccines, epidemiology, vital statistics, family planning,</text>
                  <text x="460" y="326" textAnchor="middle" fill="#fef3c7" fontSize="11" fontFamily="Arial,sans-serif">nursing bag technique. Give this 2 weeks. Most underestimated subject.</text>
                  <rect x="40" y="348" width="680" height="44" fill="#14532d" rx="6"/>
                  <text x="130" y="366" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">WEEKS 9 to 10</text>
                  <text x="130" y="382" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">Full Mock Boards</text>
                  <text x="460" y="362" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Timed 100-item mock exams every other day. All subjects mixed.</text>
                  <text x="460" y="378" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Review all wrong answers. Identify remaining weak spots. Target them on off days.</text>
                  <rect x="40" y="398" width="680" height="34" fill="#1e3a5f" rx="6"/>
                  <text x="130" y="416" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">WEEKS 11 to 12</text>
                  <text x="460" y="412" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Light review of weak areas only. Rest. Prepare exam documents. Stop new material.</text>
                  <text x="380" y="434" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | PNLE 3-Month Study Plan 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>12-week PNLE self-review plan week by week</figcaption>
              </figure>

              {renderContent(AFTER_SVG1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="240" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="700" fontFamily="Georgia,serif">PNLE Subject Priority and Time Allocation</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="200" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">SUBJECT</text>
                  <text x="420" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">EXAM WEIGHT</text>
                  <text x="610" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">RECOMMENDED TIME</text>
                  <line x1="40" y1="64" x2="720" y2="64" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="70" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="200" y="90" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Medical-Surgical Nursing</text>
                  <text x="420" y="90" textAnchor="middle" fill="#86efac" fontSize="12" fontFamily="Arial,sans-serif">Largest portion of Part 2</text>
                  <text x="610" y="90" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">2 full weeks</text>
                  <rect x="40" y="106" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="200" y="126" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Community Health Nursing</text>
                  <text x="420" y="126" textAnchor="middle" fill="#86efac" fontSize="12" fontFamily="Arial,sans-serif">100 items (Part 1)</text>
                  <text x="610" y="126" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">2 full weeks</text>
                  <rect x="40" y="142" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="200" y="162" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Fundamentals of Nursing</text>
                  <text x="420" y="162" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">Foundation for all other subjects</text>
                  <text x="610" y="162" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">2 weeks</text>
                  <rect x="40" y="178" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="200" y="198" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Maternal and Child Nursing</text>
                  <text x="420" y="198" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">Part 2A alongside Fundamentals</text>
                  <text x="610" y="198" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">1 week</text>
                  <rect x="40" y="214" width="680" height="20" fill="#1e3a5f" rx="4"/>
                  <text x="200" y="229" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">Psychiatric Nursing</text>
                  <text x="420" y="229" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Part 2C</text>
                  <text x="610" y="229" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">1 week</text>
                  <text x="380" y="238" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>PNLE subject time allocation guide</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(MAIN_CONTENT)}
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">Related NLE Articles</h2>
              <ul className="space-y-3">
                {ALL_NLE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-pink-900/20 to-pink-900/10 border border-pink-500/30 rounded-2xl p-6 text-center">
              <p className="text-pink-400 font-extrabold text-lg mb-2">Start Your PNLE Practice</p>
              <p className="text-gray-400 text-sm mb-4">Free NLE practice questions. No account required.</p>
              <Link href="/nursing" className="inline-block bg-pink-500 hover:bg-pink-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">NLE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_NLE_ARTICLES.map(({ text, href }) => (
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
