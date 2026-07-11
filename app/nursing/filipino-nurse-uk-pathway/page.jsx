import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: "Filipino Nurse to the UK 2026 - NMC, CBT, OSCE & Visa Guide",
  description: "Complete UK pathway for Filipino nurses - NMC registration, the CBT you can take in the Philippines, the OSCE in the UK, English requirements, and the Health and Care Worker visa route.",
  path: "/nursing/filipino-nurse-uk-pathway",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Can Filipino nurses take the UK CBT in the Philippines?","acceptedAnswer":{"@type":"Answer","text":"Yes. The NMC Computer-Based Test is administered at Pearson VUE centers including in the Philippines. The OSCE practical exam is taken in the UK after arrival."}},{"@type":"Question","name":"Do UK employers pay for Filipino nurses' exams and relocation?","acceptedAnswer":{"@type":"Answer","text":"Reputable NHS trusts and large UK providers commonly cover CBT and OSCE fees, visa sponsorship, flights, and initial accommodation through DMW-licensed recruitment."}}]}`;

const RELATED_ARTICLES = [
  { text: "Filipino Nurse Work Abroad: All Destinations Compared", href: "/nursing/filipino-nurse-work-abroad-guide" },
  { text: "Filipino Nurse to Canada Pathway", href: "/nursing/filipino-nurse-canada-pathway" },
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
The United Kingdom has become one of the most structured, employer-supported routes for Filipino nurses — the NHS and UK care providers actively recruit in the Philippines, and reputable employers commonly shoulder exam fees, flights, and initial accommodation. Here is the pathway end to end.

**Quick answer:** Register with the **Nursing and Midwifery Council (NMC)** → pass the **CBT (Computer-Based Test)** at a Pearson VUE center in the Philippines → meet the English requirement (**IELTS Academic 7.0 or OET grade B** — always confirm current NMC score rules) → secure a UK employer/sponsor → fly on a **Health and Care Worker visa** → pass the **OSCE** in the UK within your employer's timeline → receive your NMC PIN as a UK Registered Nurse.

## Step 1: Check Eligibility and Open Your NMC Application

You need your BSN, active PRC RN registration, and typically post-registration clinical experience (UK employers commonly ask for at least 6-12 months; many prefer more). Create your account on the NMC's online portal and complete the self-assessment — the NMC verifies your qualifications and registration with the PRC.

## Step 2: Pass the English Requirement

The NMC accepts **IELTS Academic (7.0 overall benchmark, with a slightly lower writing allowance under current rules)** or **OET (grade B benchmark, with allowance in writing)** — and has periodically adjusted accepted combinations, including combining scores across sittings. **Check the NMC's current English language requirements page before booking**, because these rules have genuinely moved over the years. Many Filipino nurses find the OET (healthcare-scenario English) more natural than IELTS.

## Step 3: Pass the CBT — Without Leaving the Philippines

The **Computer-Based Test** is part one of the NMC Test of Competence, taken at **Pearson VUE centers including in the Philippines**. It covers numeracy (drug calculations) and clinical nursing knowledge in the UK context (NMC Code, safeguarding, UK frameworks). Your PNLE knowledge base carries much of it; study the UK-specific frameworks specifically.

## Step 4: Get Recruited (Often Before or Alongside Steps 2-3)

This is the UK route's defining feature: **NHS trusts and UK employers recruit directly from the Philippines through DMW-licensed agencies**, and strong employers sponsor the whole journey — CBT/OSCE fees, visa sponsorship, flights, initial housing. Verify every agency on the DMW website, and compare offers: the good ones differ enormously from the exploitative ones in what they cover and what they claw back if you leave early. Read your contract's repayment clauses before signing.

## Step 5: Health and Care Worker Visa, Then the OSCE in the UK

Your employer issues a Certificate of Sponsorship for the **Health and Care Worker visa** (reduced fees, faster processing than standard work visas — current visa rules on gov.uk). You fly to the UK, typically work first as a pre-registration nurse, and take the **OSCE (Objective Structured Clinical Examination)** — a practical simulation exam at an approved UK test center — within your employer's supported timeline. Pass it, complete registration, and receive your **NMC PIN**: you are now a UK RN.

## Costs and Who Pays

Self-funded, the exams and English tests run serious money (CBT, OSCE, IELTS/OET fees plus documents). The honest good news: **in well-structured NHS recruitment, the employer covers most of it.** If an "agency" is asking *you* for large placement fees for a UK nursing job, that is a red flag — legitimate UK recruitment charges workers little to nothing.

## Frequently Asked Questions

**Can I take the UK nursing exam in the Philippines?**
The CBT, yes — at Pearson VUE centers locally. The OSCE is taken in the UK after you arrive.

**What English score do I need for the NMC?**
The benchmarks are IELTS Academic 7.0 or OET grade B, with specific per-skill rules and allowances that the NMC updates — confirm the current requirements on the NMC website before booking.

**Do UK employers really pay for the process?**
Reputable NHS trusts and large providers commonly cover exam fees, visa sponsorship, flights, and initial accommodation. Compare offers and read repayment clauses.

**How long does the UK route take?**
Commonly under a year from application to arrival with an active employer sponsor — one of the fastest Western routes.

**Is UK experience useful for going to the US later?**
Yes — UK RN experience strengthens later applications, and some nurses run a UK chapter before a US move. ([US route starts here](https://lisensyaprep.com/nursing/what-is-the-nclex))
`;

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: "/nursing", name: "Nursing" }, { url: "/nursing/filipino-nurse-uk-pathway", name: "Nurse to the UK Pathway" }]} />
      <Script id="schema-filipino-nurse-uk-pathway-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Nurse to the UK Pathway</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (PNLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Filipino Nurse to the UK 2026: NMC, CBT, OSCE, and Visa Pathway
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 30, 2026</span><span>•</span>
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
