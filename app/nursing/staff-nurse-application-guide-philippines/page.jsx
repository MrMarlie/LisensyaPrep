import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'How to Apply as a Staff Nurse in Philippine Hospitals 2026',
  description:
    'Complete staff nurse application guide for new RNs in the Philippines - private and government hospital hiring, requirements, exams and interviews, Salary Grade 15 items, and first-job tips.',
  path: '/nursing/staff-nurse-application-guide-philippines',
});

const SCHEMA_HOWTO = `{"@context":"https://schema.org","@type":"HowTo","name":"How to Apply as a Staff Nurse in Philippine Hospitals","description":"Complete application process for new registered nurses in private and government hospitals in the Philippines.","step":[{"@type":"HowToStep","name":"Prepare Your Credentials","text":"Complete your PRC registration, secure BLS and ideally IVT certifications, and prepare your documents folder."},{"@type":"HowToStep","name":"Apply to Multiple Hospitals","text":"Submit applications through careers pages, HR offices, and job portals simultaneously."},{"@type":"HowToStep","name":"Pass the Nursing Examination","text":"Most hospitals test nursing knowledge including med-surg priorities and drug computations."},{"@type":"HowToStep","name":"Complete the Interviews","text":"Pass the HR interview and the nursing service panel interview with prioritization scenarios."},{"@type":"HowToStep","name":"Pass Pre-Employment Medical","text":"Complete the physical exam, laboratory tests, and drug test."},{"@type":"HowToStep","name":"Consider Government Items","text":"Apply to posted Nurse I plantilla positions at Salary Grade 15, where your board passing serves as civil service eligibility under RA 1080."}],"author":{"@type":"Organization","name":"LisensyaPrep Team"},"publisher":{"@type":"Organization","name":"LisensyaPrep"},"datePublished":"2026-07-18"}`;

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Can fresh graduate nurses apply as staff nurses without experience?","acceptedAnswer":{"@type":"Answer","text":"Yes. Hospitals hire new RNs into orientation and training programs. Your license, BLS and IVT certifications, and clinical rotations serve as your entry credentials."}},{"@type":"Question","name":"Do I need the Civil Service Exam for government hospital nurse positions?","acceptedAnswer":{"@type":"Answer","text":"No. Under RA 1080, passing your board examination is itself a civil service eligibility for government nurse positions."}},{"@type":"Question","name":"What salary grade is an entry-level government nurse in the Philippines?","acceptedAnswer":{"@type":"Answer","text":"Nurse I positions are classified at Salary Grade 15, plus government benefits such as GSIS and leave credits."}}]}`;

const RELATED_ARTICLES = [
  { text: 'What to Do After Passing the PNLE', href: '/nursing/after-passing-pnle-next-steps' },
  { text: 'Nurse Salary Philippines 2026', href: '/nursing/nurse-salary-philippines' },
  { text: 'What is the NCLEX? Complete Guide', href: '/nursing/what-is-the-nclex' },
  { text: 'PRC Initial Registration Guide', href: '/blog/prc-initial-registration-guide' },
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
You have the license. Now you need the first duty. For new RNs, the staff nurse application process is a maze of HR folders, nursing exams, panel interviews — and two very different worlds: **private hospitals** and **government hospitals**, each with its own rules, timelines, and pay structures.

This guide covers both paths end to end, plus the folder checklist and the honest realities nobody puts in the job posting.

**Quick answer:** Prepare your credentials (PRC license, board rating, BLS — ideally IVT too) → for **private hospitals**, apply through HR/careers pages and pass their exam-interview-medical sequence → for **government hospitals**, watch for posted plantilla vacancies and apply CSC-style, where your RN license itself is your civil service eligibility (RA 1080) and Nurse I items start at **Salary Grade 15**. Details below.

---

## Before You Apply: The Credentials That Get Folders Shortlisted

- **PRC RN License** — completed registration, ID on hand or in process ([registration guide here](/blog/prc-initial-registration-guide))
- **Certificate of Rating** — many HR offices ask for it alongside the license
- **BLS certification** — the near-universal expectation for hospital roles
- **IVT (ANSAP) certification** — the standard for bedside positions; getting it before applying signals readiness
- **TOR, diploma, PSA birth certificate, valid IDs**
- **Updated resume** — lead with your license number, rating (if strong), certifications, and clinical rotation highlights (units, notable cases, hours)

Full certification strategy: [What to Do After Passing the PNLE](/nursing/after-passing-pnle-next-steps)

---

## Path A: Private Hospital Application

### The Typical Sequence

1. **Application** — via the hospital's careers page, job portals, email, or walk-in submission to HR. Apply to **many hospitals simultaneously**; waiting for one reply at a time wastes months
2. **Nursing/written examination** — most established hospitals test nursing knowledge first. Your PNLE review knowledge carries you here; brush up on med-surg priorities, drug computations, and fundamentals
3. **Initial interview** — usually HR: background, availability, salary expectations
4. **Panel/final interview** — nursing service leadership: clinical scenarios, prioritization questions ("Which patient do you see first?"), and character
5. **Pre-employment medical** — physical exam, laboratory tests, chest x-ray, drug test
6. **Job offer / training pool** — direct hiring into orientation, or placement in a training program before regular staffing

### The Honest Part: Ask About Status and Pay

Some institutions run **paid training programs**; others have historically used volunteer or trainee arrangements with little or no compensation. Before committing to any "training" arrangement, ask directly: *Is this compensated? What is my employment status? Does this period count as employment for my records?* A hospital that answers clearly is telling you something good about itself. Get a Certificate of Employment for **every** engagement — documented months become your experience credentials for better positions and abroad applications later.

### Realistic Expectations

Big-name hospitals in Metro Manila receive floods of applications, and their processes run long. **Provincial and mid-size hospitals often hire faster** and hand new nurses broader experience earlier (more procedures, more autonomy) — which later reads well on charge-nurse and abroad applications. The prestige-name can come on your second job.

---

## Path B: Government Hospital Application

Government hospitals (DOH-run, LGU hospitals, and specialty centers) offer **plantilla items** — permanent government positions with Salary Grade pay, GSIS, leave credits, and security of tenure.

### Your Hidden Advantage: RA 1080

Under **RA 1080**, passing a board examination — your PNLE — **is itself a civil service eligibility**. You do not need to take the Civil Service Exam to qualify for government nurse positions. Many new RNs do not realize they are already eligibility-complete for government employment the day they register.

### How Government Hiring Works

1. **Find posted vacancies** — government positions must be published: check the **CSC Bulletin of Vacant Positions**, the hospital's website and official Facebook page, and their HR bulletin boards
2. **Submit the CSC-style folder** — typically: application letter addressed per the posting, **Personal Data Sheet (CS Form No. 212, Revised 2017)**, PRC license and rating, TOR/diploma, certificates of training (BLS/IVT), certificates of employment if any
3. **Selection process** — government hiring follows merit-based screening: document evaluation, written exam and/or interview by the hospital's selection board, and comparative ranking of candidates
4. **Appointment** — to the plantilla item, processed through CSC rules

### The Pay Difference

Entry-level government nurse positions (**Nurse I**) are classified at **Salary Grade 15** — a meaningful step above what many private hospitals offer new nurses, before even counting government benefits and mandated increases. Exact peso figures move with salary standardization tranches; full current numbers in our [Nurse Salary Philippines guide](/nursing/nurse-salary-philippines).

The trade-off: fewer openings, slower processes, and stiff competition per item. The smart play many new RNs use: **work private now for experience while applying to every government item that posts.**

---

## Application Folder Checklist (Print This)

- ☐ Application letter (addressed per the specific posting)
- ☐ Updated resume / PDS (CS Form 212 Rev. 2017 for government)
- ☐ Photocopy of PRC ID (+ original for verification)
- ☐ Certificate of Rating
- ☐ TOR and Diploma
- ☐ BLS certificate (+ IVT if completed)
- ☐ PSA Birth Certificate
- ☐ Certificates of Employment (if any)
- ☐ 2x2 photos, valid IDs
- ☐ NBI/police clearance (commonly required at pre-employment)

---

## Interview Preparation: What Nursing Panels Actually Ask

- **Prioritization scenarios** — "You receive four patients..." Answer with ABC and Maslow frameworks, the same clinical judgment your board review built
- **"Why nursing?" and "Why this hospital?"** — sincere beats rehearsed; know one specific thing about the institution
- **Weakness questions** — pick a real one with a real improvement plan
- **Availability and shifting** — new staff nurses rotate shifts; hesitation here costs offers

---

## Frequently Asked Questions

**Can fresh graduates with no experience apply as staff nurses?**
Yes. Hospitals hire new RNs into orientation and training programs — your license, BLS/IVT, and clinical rotations are your entry credentials.

**Do I need the Civil Service Exam for government hospital jobs?**
No. Under RA 1080, your board exam passing is itself a civil service eligibility for nurse positions.

**What salary grade is an entry-level government nurse?**
Nurse I is classified at Salary Grade 15, plus government benefits. See our salary guide for current peso figures.

**Is volunteer nursing required before getting hired?**
No rule requires it, and practices vary by institution. Ask directly about compensation and employment status before joining any training arrangement, and always secure a Certificate of Employment.

**How long does the hiring process take?**
Private hospitals: commonly a few weeks to a couple of months across exam, interviews, and medical. Government items: often longer due to posting and CSC processes. Apply to multiple institutions in parallel.

**Can I apply while my PRC ID is still processing?**
Many HR offices accept proof of passing and registration-in-process, but policies vary — bring your Certificate of Rating and registration documents, and complete your ID as soon as slots allow.

---

## The Long Game

Your first staff nurse job is rarely your last stop — it is the experience engine for everything after: specialization, charge roles, government items, or the abroad pathway. Speaking of which: local bedside years strengthen NCLEX-era applications enormously. When you are ready to look outward, start here: [What is the NCLEX? Complete Guide for Filipino Nurses](/nursing/what-is-the-nclex).

And for friends still reviewing: [free gamified PNLE reviewer at LisensyaPrep](/nursing/).
`;

export default function StaffNurseApplicationPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-staff-nurse-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_HOWTO }} />
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: '/nursing', name: 'Nursing' }, { url: '/nursing/staff-nurse-application-guide-philippines', name: 'Staff Nurse Application Guide' }]} />
      <Script id="schema-staff-nurse-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Staff Nurse Application Guide</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (PNLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                How to Apply as a Staff Nurse in Philippine Hospitals 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 18, 2026</span><span>•</span>
                <span>9 min read</span>
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

            <div className="mt-8 bg-gradient-to-br from-pink-900/20 to-pink-900/10 border border-pink-500/30 rounded-2xl p-6 text-center">
              <p className="text-pink-400 font-extrabold text-lg mb-2">Know Someone Still Reviewing for the PNLE?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified nursing board reviewer covering all NLE areas. No account required.</p>
              <Link href="/nursing" className="inline-block bg-pink-500 hover:bg-pink-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
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
