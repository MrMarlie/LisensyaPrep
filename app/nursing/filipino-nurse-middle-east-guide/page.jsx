import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: "Filipino Nurse to Saudi & UAE 2026 - Prometric & DataFlow Guide",
  description: "Complete Middle East pathway for Filipino nurses - DataFlow verification, Prometric exams (SCFHS, DHA, MOH), experience requirements, deployment through DMW agencies, and honest pros and cons.",
  path: "/nursing/filipino-nurse-middle-east-guide",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many years of experience do Filipino nurses need for the Middle East?","acceptedAnswer":{"@type":"Answer","text":"Typically at least 2 years of post-license hospital experience, with some Gulf employers and roles requiring 3 or more years."}},{"@type":"Question","name":"What is DataFlow in Gulf nurse recruitment?","acceptedAnswer":{"@type":"Answer","text":"The primary source verification service used by all Gulf health authorities to authenticate a nurse's license, education, and work experience directly with the issuing institutions."}},{"@type":"Question","name":"Is working in the Gulf a path to permanent residency?","acceptedAnswer":{"@type":"Answer","text":"No. Gulf postings are fixed-term employment contracts without a PR track. Many nurses use Gulf earnings to fund applications to PR-track destinations like Canada, the UK, or the US."}}]}`;

const RELATED_ARTICLES = [
  { text: "Filipino Nurse Work Abroad: All Destinations Compared", href: "/nursing/filipino-nurse-work-abroad-guide" },
  { text: "New OFW Guide for Licensed Professionals", href: "/blog/ofw-guide-licensed-professionals" },
  { text: "Staff Nurse Application Guide Philippines", href: "/nursing/staff-nurse-application-guide-philippines" },
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
The Gulf is the fastest abroad chapter a Filipino nurse can open — measured in months, not years — and for decades it has been the classic first overseas posting: tax-free income, employer-provided housing, and dense Filipino communities. Speaking from our own Gulf work experience (Dubai, in our case): the earnings math is real, and so are the trade-offs. Here is the honest guide.

**Quick answer:** Secure **2+ years of hospital experience** → complete **DataFlow** primary source verification of your credentials → pass the **Prometric licensing exam of your target authority** (SCFHS for Saudi Arabia; DHA for Dubai, DOH for Abu Dhabi, MOH for other emirates; equivalents in Qatar, Oman, Bahrain, Kuwait) → get hired through a **DMW-licensed agency or direct ethical employer** → deploy on a fixed-term contract with the DMW's OEC process.

## Step 1: The Experience Requirement

Gulf regulators and employers typically require **at least 2 years of post-license hospital experience** (some roles and facilities want 3+). This is the step you cannot shortcut — your PH bedside years are literally the entry ticket. ([Building them: staff nurse guide](https://lisensyaprep.com/nursing/staff-nurse-application-guide-philippines))

## Step 2: DataFlow — Primary Source Verification

**DataFlow** verifies your credentials at the source: your license with the PRC, your diploma with your school, your experience with your employers. Every Gulf health authority uses it. Practicalities: it takes weeks to a couple of months, it costs real money (commonly shouldered by you or offset by the employer, depending on the deal), and **any inconsistency — a mismatched employment date, an unverifiable certificate — stalls everything.** Keep your COEs accurate and your document names consistent.

## Step 3: The Prometric Exam

Each authority licenses through its own computer-based exam delivered at **Prometric centers, including in the Philippines**:

- **Saudi Arabia:** SCFHS (Saudi Commission for Health Specialties) nurse exam
- **Dubai:** DHA | **Abu Dhabi:** DOH | **Other emirates:** MOH
- **Qatar, Oman, Bahrain, Kuwait:** respective health authority exams

The exams test practical nursing knowledge — med-surg priorities, pharmacology, fundamentals, infection control — at a level your PNLE base plus focused review handles well. NCLEX-style practice transfers effectively: [free 400-question bank here](https://lisensyaprep.com/nclex).

## Step 4: Recruitment and Deployment — Where Caution Pays

Gulf deployment runs through **DMW-licensed agencies** or approved direct-hire channels. The non-negotiables:

- **Verify the agency's license on the DMW website** before any engagement
- **Legitimate deployments have regulated fee structures** — enormous "placement fees" are the signature of illegal recruitment
- **Read the contract**: salary, housing, flight provisions, duty hours, and exit clauses. The difference between a good and bad Gulf experience is usually signed on page one
- Complete the **OEC (Overseas Employment Certificate)** process — your legal protection as an OFW ([full OFW guide](https://lisensyaprep.com/blog/ofw-guide-licensed-professionals))

## The Honest Pros and Cons

**Pros:** fastest deployment of any destination; tax-free income at multiples of PH pay; housing/flights commonly provided; huge Filipino communities; Gulf experience strengthens later UK/US/Canada applications — many nurses fund those applications from a Gulf contract.

**Cons:** fixed-term employment, not immigration — there is no PR track; family sponsorship is income-dependent and limited; cultural adjustment is real (especially in Saudi Arabia versus the more liberal UAE); workload intensity varies enormously by facility. The Gulf is a chapter, not usually the whole book — plan what it is funding.

## Frequently Asked Questions

**How many years of experience do I need for the Middle East?**
Typically at least 2 years of post-license hospital experience; some employers and roles require 3+.

**What is DataFlow?**
The primary source verification service all Gulf health authorities use to authenticate your license, education, and experience directly with the issuing institutions.

**Can I take the Prometric exam in the Philippines?**
Yes — SCFHS, DHA, MOH, and other Gulf authority exams are delivered at Prometric centers locally.

**Which pays more, Saudi or UAE?**
Packages vary more by facility and role than by country; compare total packages (salary + housing + flights + leave) rather than headline salary alone.

**Is the Gulf a path to permanent residency?**
No — Gulf postings are fixed-term employment. Many nurses use Gulf years to fund and strengthen PR-track applications to Canada, the UK, or the US.
`;

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: "/nursing", name: "Nursing" }, { url: "/nursing/filipino-nurse-middle-east-guide", name: "Nurse to the Middle East Guide" }]} />
      <Script id="schema-filipino-nurse-middle-east-guide-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Nurse to the Middle East Guide</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (PNLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Filipino Nurse to Saudi Arabia and UAE 2026: Prometric and DataFlow Guide
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>August 2, 2026</span><span>•</span>
                <span>8 min read</span>
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
              <p className="text-pink-400 font-extrabold text-lg mb-2">Still Reviewing for the PNLE?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified nursing board reviewer covering all NLE areas. No account required.</p>
              <Link href="/nursing" className="inline-block bg-pink-500 hover:bg-pink-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
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
