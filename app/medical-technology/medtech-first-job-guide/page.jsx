import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'MedTech First Job Guide Philippines 2026 (Labs, Clinics & Beyond)',
  description:
    'Where do new RMTs work? Complete first job guide for medical technologists - hospital laboratories, diagnostic chains, government items, industry roles, and the abroad pathway via ASCPi.',
  path: '/medical-technology/medtech-first-job-guide',
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Where do most new medical technologists work first in the Philippines?","acceptedAnswer":{"@type":"Answer","text":"Hospital laboratories and large diagnostic chains. Hospitals offer broader section rotation across chemistry, hematology, microbiology, and blood bank, while diagnostic chains often hire faster."}},{"@type":"Question","name":"Do RMTs need the Civil Service Exam for government laboratory positions?","acceptedAnswer":{"@type":"Answer","text":"No. Under RA 1080, passing the Medical Technology Licensure Examination confers civil service eligibility for government positions."}},{"@type":"Question","name":"What is ASCPi certification?","acceptedAnswer":{"@type":"Answer","text":"The international certification of the American Society for Clinical Pathology — the key credential for Filipino medical technologists pursuing the US pathway."}}]}`;

const RELATED_ARTICLES = [
  { text: 'What to Do After Passing the Board Exam Philippines', href: '/blog/after-passing-board-exam-philippines' },
  { text: 'Government Jobs with Civil Service Eligibility', href: '/civil-service/government-jobs-cse-eligibility' },
  { text: 'What is the MTLE? Complete Guide', href: '/medical-technology/what-is-the-mtle' },
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
Congratulations, RMT! Behind every diagnosis is a laboratory result, and behind every result is a medical technologist. Your license makes you the profession hospitals cannot legally run their labs without — which means real, structural demand for your skills.

But "the lab" is not one destination. New RMTs choose between hospital laboratories, diagnostic chains, blood banks, government items, industry roles, and an unusually strong abroad pathway. Here is the complete first-job map.

**Quick answer:** Most new RMTs start in **hospital laboratories or large diagnostic chains** (fastest hiring). Government lab items offer Salary Grade stability — and your board passing is already your civil service eligibility under RA 1080. The **ASCPi certification** opens the international route many RMTs eventually take. Details below.

---

## Before You Apply: The RMT Starter Folder

- **PRC RMT license** ([registration guide](/blog/prc-initial-registration-guide)) and **Certificate of Rating**
- TOR, diploma, PSA birth certificate, NBI clearance, valid IDs
- **Internship records** — your clinical internship rotations (chemistry, hematology, microbiology, blood bank, immunology, clinical microscopy) are your experience currency; document them well in your resume
- Updated resume — license number up top, internship section highlights, any special skills (phlebotomy proficiency, laboratory information systems exposure)

---

## Path A: Hospital Laboratory — The Classic First Job

Hospital labs run **24/7**, and they hire new RMTs continuously into rotating sections:

- **Clinical Chemistry** — analyzers, metabolic panels
- **Hematology** — CBCs, coagulation, morphology
- **Microbiology** — cultures, sensitivity testing
- **Blood Bank** — typing, crossmatching, transfusion service (the highest-stakes bench)
- **Immunology/Serology** and **Clinical Microscopy**

**The hiring sequence** mirrors most hospital professional hiring: application to HR → written exam (expect board-level questions; your MTLE review knowledge carries you) → interview(s) → pre-employment medical → orientation and section rotation.

**The honest realities:** night shifts and rotating duties are structural (labs never close), stat-request pressure is real, and entry pay at some private institutions is modest relative to the license — consistent with what new professionals across healthcare report. What hospital bench years buy you is **generalist depth across all sections**, the credential that everything else on this list values.

**Tip:** provincial and mid-size hospital labs often hire faster and rotate you through more sections sooner than the big-name institutions — broader experience, earlier.

## Path B: Diagnostic Chains and Freestanding Labs

Large diagnostic laboratory chains and outpatient clinic labs hire heavily and often faster than hospitals. The work skews toward high-volume routine testing and phlebotomy-forward patient interaction, with more predictable hours than hospital rotations. A common first job — and a good one for building speed and accuracy.

## Path C: Blood Banks and Public Health Laboratories

Blood service facilities and public-health laboratories (national reference laboratories, DOH facilities, research institutes) offer mission-driven bench work, from donor screening to disease surveillance. Openings are fewer but the specialization value is high.

## Path D: Government Laboratory Items

Government hospitals and health facilities post Medical Technologist plantilla items with **Salary Grade pay, GSIS, and security of tenure** — and here is the advantage many new RMTs miss: **under RA 1080, your board passing is already your civil service eligibility.** No Civil Service Exam needed.

Watch the CSC job portal and facility postings, prepare the **PDS (CS Form 212, Rev. 2017)** folder, and compete through merit selection. Full mechanics: [Government Jobs with Civil Service Eligibility](/civil-service/government-jobs-cse-eligibility).

## Path E: Industry and Beyond the Bench

Your RMT credentials travel further than many realize:

- **Medical and laboratory equipment companies** — product specialists and application specialists who train labs on analyzers (field-based, allowance-boosted compensation)
- **Pharmaceutical QC** — RMTs qualify for various quality control laboratory roles
- **Research assistants** in clinical studies
- **Academe** — teaching and internship supervision, especially with graduate units

## Path F: The Abroad Pathway — Where RMTs Shine

Medical technology is one of the most internationally mobile Filipino professions. The key credential for the US route is the **ASCPi (American Society for Clinical Pathology international) certification**, which many Filipino RMTs take while still working locally. The Middle East also recruits Filipino medtechs steadily, with country-specific credentialing and verification requirements.

The consistent pattern: **local bench experience across multiple sections strengthens every abroad application.** Your first PH lab years are an investment, not a delay.

---

## Choosing Deliberately

The advice we give every profession in this series applies here with full force: **pick the first job that builds toward where you want to be at 30.** If abroad is the plan, prioritize hospital generalist rotation over a single-section clinic role. If government stability is the plan, start applying to items now while working private. If industry is the plan, keep your communication skills as sharp as your pipetting. Drifting is the only wrong choice.

---

## Frequently Asked Questions

**Where do most new RMTs work first?**
Hospital laboratories and large diagnostic chains — both hire continuously, with hospitals offering broader section rotation and chains offering faster hiring.

**Do medical technologists work night shifts?**
In hospital labs, yes — laboratories operate 24/7 and new RMTs typically join rotating shift schedules.

**Do RMTs need the Civil Service Exam for government lab items?**
No. Under RA 1080, passing the MTLE confers civil service eligibility.

**What is ASCPi and do I need it?**
The international certification of the American Society for Clinical Pathology — the key credential for the US pathway and a strong differentiator elsewhere. Not required for local practice.

**Can fresh RMT graduates get hired without experience?**
Yes. Your internship rotations are your entry experience — hospitals and chains hire new RMTs into orientation and supervised bench rotation.

---

## For Future RMTs Still Preparing

Everything above starts with passing the MTLE. If you or someone you know is preparing, LisensyaPrep has a **free MTLE Starter Pack (30 questions)** to diagnose your readiness — and for serious reviewees, our complete **MTLE Mastery System** with 396 questions and a full mock exam: **[Start free at the LisensyaPrep MedTech reviewer](/medical-technology/)**.
`;

export default function MedTechFirstJobPage() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: '/medical-technology', name: 'Medical Technology' }, { url: '/medical-technology/medtech-first-job-guide', name: 'MedTech First Job Guide' }]} />
      <Script id="schema-medtech-first-job-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/medical-technology" className="text-gray-500 hover:text-gray-300 transition-colors">Medical Technology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">MedTech First Job Guide</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400">Medical Technology (MTLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                MedTech First Job Guide Philippines 2026: Hospital Labs, Clinics, and Beyond
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 21, 2026</span><span>•</span>
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

            <div className="mt-8 bg-gradient-to-br from-sky-900/20 to-sky-900/10 border border-sky-500/30 rounded-2xl p-6 text-center">
              <p className="text-sky-400 font-extrabold text-lg mb-2">Still Preparing for the MTLE?</p>
              <p className="text-gray-400 text-sm mb-4">Free MTLE Starter Pack (30 questions) plus the full Mastery System with 396 questions. No account required to start.</p>
              <Link href="/medical-technology" className="inline-block bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
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
