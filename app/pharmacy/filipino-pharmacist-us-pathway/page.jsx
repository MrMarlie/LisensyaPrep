import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: "Filipino Pharmacist to the US 2026 - FPGEE & FPGEC Honest Guide",
  description: "Complete US pathway for Filipino pharmacists - FPGEC certification, the FPGEE exam, TOEFL requirements, the 5-year curriculum rule every Filipino RPh must check, and the state licensure steps after.",
  path: "/pharmacy/filipino-pharmacist-us-pathway",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Can a 4-year BS Pharmacy graduate qualify for the FPGEE?","acceptedAnswer":{"@type":"Answer","text":"For graduates on or after January 1, 2003, NABP requires a pharmacy curriculum of at least five years, so a standalone 4-year degree generally does not qualify without additional recognized coursework. Candidates should verify their specific case against the current FPGEC Candidate Application Bulletin."}},{"@type":"Question","name":"How often is the FPGEE offered?","acceptedAnswer":{"@type":"Answer","text":"Once per year at Pearson VUE test centers, with registration deadlines months before the exam date. The 2026 administration is October 15."}},{"@type":"Question","name":"Is FPGEC certification a license to practice pharmacy in the US?","acceptedAnswer":{"@type":"Answer","text":"No. FPGEC certification is the prerequisite credential. US licensure still requires state internship hours, passing the NAPLEX, and a state pharmacy law examination."}}]}`;

const RELATED_ARTICLES = [
  { text: "Pharmacist First Job Guide Philippines", href: "/pharmacy/pharmacist-first-job-philippines" },
  { text: "Pharmacist Salary Philippines 2026", href: "/pharmacy/pharmacist-salary-philippines" },
  { text: "New OFW Guide for Licensed Professionals", href: "/blog/ofw-guide-licensed-professionals" },
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
I am a Registered Pharmacist who took the abroad leap myself (Dubai, in my case), so I will give you the US pathway the way I wish it were explained: complete, current, and honest about the one eligibility rule that stops many Filipino RPhs before they start.

**Quick answer:** The US route runs **FPGEC Certification** (education review + TOEFL iBT + passing the **FPGEE** exam) → state **intern hours** → **NAPLEX** → a state law exam (**MPJE/UMPJE**) → state pharmacist license. Budget roughly **$1,600-$2,500+** and 8-12 months just to FPGEC certification. **But read the eligibility section first — the 5-year curriculum rule is the make-or-break for Filipino graduates.**

## The Eligibility Rule Filipino RPhs Must Check First

Per NABP's current requirements: **graduates on or after January 1, 2003 must hold a pharmacy degree from a curriculum of at least five years.** The traditional Philippine **BS Pharmacy is a four-year program** — which means many Filipino RPh degrees, standing alone, do not meet the FPGEC education requirement.

What this means in practice, honestly:

- **Check your own curriculum first** against the current FPGEC Candidate Application Bulletin before spending a peso — this single rule decides everything
- Filipino pharmacists have addressed the gap through **additional recognized coursework and advanced degrees** (this is one reason PharmD programs exist in the Philippines now)
- It is also, frankly, one reason many Filipino RPhs choose the **Gulf route** ([which I took](https://lisensyaprep.com/pharmacy/pharmacist-first-job-philippines)) or other destinations instead

NABP also requires a **current, unrestricted pharmacist license** and — per current guidance — **practice experience as a licensed pharmacist**. Verify every criterion in the current Bulletin; these rules have real teeth.

## The FPGEC Certification Process

**Step 1 — NABP e-Profile:** create it with your name exactly matching your passport. Name mismatches stall everything later.

**Step 2 — Credential evaluation (ECE):** NABP uses Educational Credential Evaluators for a course-by-course review. Your school sends transcripts and degree proof **directly, sealed** — the same rule as CGFNS for nurses. Start school requests early; registrars are the classic bottleneck.

**Step 3 — TOEFL iBT:** the **only English exam NABP accepts** for FPGEC, with **updated minimum section scores in effect for 2026 applications** (the scoring scale itself changed in January 2026) — take the current minimums from the Bulletin, not from old forum posts.

**Step 4 — The FPGEE:** offered **once per year** (the 2026 administration: October 15, with registration deadlines months earlier — miss the window, wait a year). Computer-based at Pearson VUE, 200 questions, scaled passing score of 75, results in ~8 weeks. You get a 2-year eligibility window from acceptance and a **lifetime maximum of 5 attempts**. Content blueprint: heavy on pharmaceutical sciences and clinical sciences, with biomedical and social/administrative sciences rounding it out — your PLE foundation is relevant, but prepare against the FPGEE outline specifically.

**Step 5 — FPGEC Certification** issues once your passing FPGEE and TOEFL scores are in. This is a credential, **not a license**.

## After FPGEC: The State-Level Half

1. **Choose your state** — each board sets its own intern-hour requirements (commonly ~1,500 hours, varies), timing, and law exam
2. **Register as an intern** and complete the required hours
3. **Pass the NAPLEX** — the US pharmacist licensing exam
4. **Pass the state law exam** — most states use the MPJE, several are transitioning to the UMPJE, a few run their own; check your target state
5. **Receive your state pharmacist license**

And the immigration reality check: the license does not confer a visa. Employer sponsorship (commonly EB-3 routes) runs on its own timeline — factor it into the plan.

## Costs and Timeline, Honestly

FPGEC application (~$1,000) + FPGEE (~$650) + TOEFL ($225-255/attempt) + documents and couriers = **$1,600-$2,500 to certification**, before state fees, NAPLEX, and law exams. Timeline: **8-12 months to FPGEC** with clean documents, then intern hours and exams — a multi-year project end to end. The FPGEE's once-a-year schedule makes calendar discipline the difference between a 2-year and 4-year journey.

## Frequently Asked Questions

**Can a 4-year BS Pharmacy graduate take the FPGEE?**
For graduates on or after January 1, 2003, NABP requires a five-year curriculum — a standalone 4-year degree generally does not qualify without additional recognized coursework. Check your specific case against the current FPGEC Bulletin.

**How often is the FPGEE offered?**
Once per year, at Pearson VUE centers, with registration deadlines months before the exam date.

**What English test does the FPGEC accept?**
Only the TOEFL iBT, with minimum section scores updated for 2026 applications.

**Is FPGEC certification a US pharmacist license?**
No — it is the prerequisite credential. Licensure still requires state intern hours, the NAPLEX, and a law exam.

**How many FPGEE attempts do I get?**
A lifetime maximum of 5 attempts, within 2-year eligibility windows.
`;

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: "/pharmacy", name: "Pharmacy" }, { url: "/pharmacy/filipino-pharmacist-us-pathway", name: "Pharmacist to the US Pathway" }]} />
      <Script id="schema-filipino-pharmacist-us-pathway-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/pharmacy" className="text-gray-500 hover:text-gray-300 transition-colors">Pharmacy</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Pharmacist to the US Pathway</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">Pharmacy (PLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Filipino Pharmacist to the US 2026: FPGEE and FPGEC Pathway (The Honest Guide)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>August 3, 2026</span><span>•</span>
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

            <div className="mt-8 bg-gradient-to-br from-purple-900/20 to-purple-900/10 border border-purple-500/30 rounded-2xl p-6 text-center">
              <p className="text-purple-400 font-extrabold text-lg mb-2">Still Preparing for the PLE?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified pharmacy board reviewer covering all PLE subjects. No account required.</p>
              <Link href="/pharmacy" className="inline-block bg-purple-500 hover:bg-purple-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Related Guides</h3>
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
