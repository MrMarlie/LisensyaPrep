import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: "New OFW Guide 2026 - DMW, OEC & Avoiding Illegal Recruiters",
  description: "First-time OFW guide for licensed Filipino professionals - how the DMW works, agency verification, the OEC requirement, direct hiring rules, document authentication, and the illegal recruitment red flags.",
  path: "/blog/ofw-guide-licensed-professionals",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What replaced the POEA?","acceptedAnswer":{"@type":"Answer","text":"The Department of Migrant Workers (DMW), which absorbed the POEA and related offices into a single department covering recruitment regulation, deployment processing, and OFW welfare."}},{"@type":"Question","name":"What is the OEC and is it required?","acceptedAnswer":{"@type":"Answer","text":"The Overseas Employment Certificate is the exit clearance proving legal deployment, checked at immigration. It is required and ties the worker into OWWA membership and the legal protections of the overseas employment system."}},{"@type":"Question","name":"How do I check if a recruitment agency is legitimate?","acceptedAnswer":{"@type":"Answer","text":"Verify the agency's license status directly on the Department of Migrant Workers website before engaging or paying anything."}}]}`;

const RELATED_ARTICLES = [
  { text: "Filipino Nurse Work Abroad: All Destinations Compared", href: "/nursing/filipino-nurse-work-abroad-guide" },
  { text: "Filipino Nurse to Saudi and UAE Guide", href: "/nursing/filipino-nurse-middle-east-guide" },
  { text: "Filipino Teachers Abroad", href: "/education/filipino-teacher-work-abroad" },
  { text: "Filipino Pharmacist to the US Pathway", href: "/pharmacy/filipino-pharmacist-us-pathway" },
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
Every abroad pathway on this site — nurse to the Gulf, teacher to the US, pharmacist to Dubai (my own chapter) — eventually funnels through the same gate: the Philippine overseas employment system. Master it once and every future deployment gets easier. Ignore it and you become the cautionary tale in the Facebook group.

**Quick answer:** Overseas employment is governed by the **Department of Migrant Workers (DMW)** — the department that absorbed the former POEA. Legitimate deployment runs through **DMW-licensed agencies or approved direct-hire channels**, every departing worker needs an **OEC (Overseas Employment Certificate)**, and the single most protective habit an aspiring OFW can build is **verifying everything on official DMW channels before paying anyone anything.**

## The DMW: Your Government, Abroad

The **Department of Migrant Workers** consolidated the old POEA and related offices into one department covering the full OFW lifecycle — recruitment regulation, deployment processing, welfare (with OWWA), and repatriation. Practical translations:

- **Agency licensing and verification** live on the DMW website — the license lookup is your first stop for any recruiter's name
- **Job orders** (approved overseas positions) are published through DMW systems — a "job offer" that exists nowhere in the system is a red flag
- Old references to "POEA" you see in blogs and forums generally map to today's DMW processes

## The OEC: The Document Every OFW Needs

The **Overseas Employment Certificate** is your exit clearance and proof of legal deployment — checked at immigration when you fly out. It ties you into the system that protects you: OWWA membership, welfare services, and legal standing if the job goes wrong. Processing runs through DMW's online systems (with exemptions and streamlined revalidation for returning workers rejoining the same employer). **No OEC, no legal deployment** — and any recruiter suggesting you fly as a "tourist" and convert later is proposing to strip you of every protection the system offers. That is the classic trafficking pattern; walk away.

## The Two Legitimate Roads

**1. DMW-licensed agency deployment** — the standard road. The agency holds the job order, processes your documents, and is legally accountable for the deployment. Verify the license, check for standing complaints, and understand the **regulated fee structure**: legitimate placement costs are capped and documented, and several destination frameworks (notably ethical health-worker recruitment) prohibit charging the worker at all.

**2. Direct hiring** — generally restricted, with exemptions for specific employer categories and professional/skilled hires processed through the DMW's direct-hire evaluation. If a foreign employer approaches you directly, the deployment still goes **through** the DMW's process — a legitimate employer will cooperate with it; an illegitimate one will pressure you around it.

## Documents: Prepare the Boring Things Early

The abroad-bound professional's standing folder:

- **PRC license and board rating** (renewed — [renewal guide](https://lisensyaprep.com/blog/prc-id-renewal-cpd-guide))
- **Apostilled documents** — PSA birth/marriage certificates, TOR, diploma authenticated through DFA apostille (destination-dependent)
- **Employment certificates** from every employer, dates consistent (source-verification systems like DataFlow check them literally)
- **NBI clearance** (fresh — validity windows matter)
- **Passport** with generous validity
- Destination-specific credentials (Prometric passes, NCLEX, CBT, ASCPi — per your profession's pathway guides)

## The Red Flags, Memorized

1. **Fees before services, or fees far beyond regulated caps** — the signature of illegal recruitment
2. **No verifiable DMW license**, or a borrowed/expired one ("we process under our partner's license")
3. **Tourist-visa deployment schemes** — the trafficking classic
4. **Passport surrender** to the recruiter
5. **Guaranteed placements and impossible salaries** — legitimate recruitment has interviews, requirements, and rejections
6. **Pressure and secrecy** — "sign today," "don't tell others about this rate"

Report suspected illegal recruitment to the DMW — you will not just protect yourself; you will protect the next applicant in line.

## The Mindset That Ties It Together

Across every guide in this series, one principle repeats: **your license is a master key, and the abroad chapter is a strategy, not an escape.** Choose the destination that serves your actual goal — fastest earnings (Gulf), structured sponsorship (UK), permanent residency (Canada/US) — fund it properly, paper it legally, and the OFW chapter becomes the investment it is supposed to be.

## Frequently Asked Questions

**What replaced the POEA?**
The Department of Migrant Workers (DMW), which absorbed the POEA and related offices into a single department covering recruitment regulation, deployment, and OFW welfare.

**What is the OEC and do I really need it?**
The Overseas Employment Certificate — your exit clearance and proof of legal deployment, checked at immigration. Yes: it is what ties you into OWWA membership and every legal protection the system offers.

**How do I verify a recruitment agency?**
Look up its license status directly on the DMW website before engaging. No verifiable license, no engagement.

**Can a foreign employer hire me directly?**
Direct hiring is restricted with specific exemptions, and legitimate direct hires are still processed through the DMW's evaluation. Employers who pressure you to bypass the process are the ones to avoid.

**How much should placement cost?**
Fee structures are regulated and documented, and several frameworks — especially ethical health-worker recruitment — prohibit charging workers at all. Enormous upfront "processing fees" are the scam signature.
`;

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: "/blog", name: "Blog" }, { url: "/blog/ofw-guide-licensed-professionals", name: "OFW Guide for Professionals" }]} />
      <Script id="schema-ofw-guide-licensed-professionals-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">OFW Guide for Professionals</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">PRC Guide</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                New OFW Guide for Licensed Professionals 2026: DMW, OEC, and Staying Scam-Free
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>August 6, 2026</span><span>•</span>
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

            <div className="mt-8 bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 border border-yellow-500/30 rounded-2xl p-6 text-center">
              <p className="text-yellow-400 font-extrabold text-lg mb-2">Still Reviewing for Your Board Exam?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified reviewers for PNLE, LET, CLE, PLE, MTLE, and more. No account required.</p>
              <Link href="/" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-colors">
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
