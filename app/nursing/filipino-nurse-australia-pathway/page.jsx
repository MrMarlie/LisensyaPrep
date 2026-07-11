import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: "Filipino Nurse to Australia & NZ 2026 - AHPRA Pathway Guide",
  description: "Complete Australia pathway for Filipino nurses - AHPRA registration, the outcomes-based assessment with MCQ and OSCE, English requirements, and skilled visa routes. Plus the New Zealand option.",
  path: "/nursing/filipino-nurse-australia-pathway",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What exam does Australia require for Filipino nurses?","acceptedAnswer":{"@type":"Answer","text":"Internationally qualified nurses typically complete the outcomes-based assessment under AHPRA: an NCLEX-style multiple-choice cognitive exam plus an OSCE practical exam conducted in Australia."}},{"@type":"Question","name":"Does NCLEX review help for the Australian nursing exam?","acceptedAnswer":{"@type":"Answer","text":"Yes, directly. The cognitive component of Australia's outcomes-based assessment is NCLEX-style, so NCLEX question banks and reviewers are the standard preparation."}}]}`;

const RELATED_ARTICLES = [
  { text: "Filipino Nurse Work Abroad: All Destinations Compared", href: "/nursing/filipino-nurse-work-abroad-guide" },
  { text: "Free NCLEX Practice Questions", href: "/nclex" },
  { text: "Filipino Nurse to the UK Pathway", href: "/nursing/filipino-nurse-uk-pathway" },
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
Australia pairs some of the highest nurse compensation in the English-speaking world with an assessment route that is demanding but transparent. Here is how Filipino RNs navigate it — plus the New Zealand alternative next door.

**Quick answer:** Apply to the **Nursing and Midwifery Board of Australia via AHPRA** → complete a self-check of your qualifications → meet the English requirement (**IELTS 7.0 / OET B / PTE equivalents** per current rules) → complete the **outcomes-based assessment** for internationally qualified nurses — a **multiple-choice cognitive exam (NCLEX-style) plus an OSCE** conducted in Australia → register as an RN → work under skilled or employer-sponsored visas.

## Step 1: AHPRA Self-Check and Application

The **Australian Health Practitioner Regulation Agency (AHPRA)** handles registration for the Nursing and Midwifery Board. Start with the **online self-check**, which sorts internationally qualified nurses (IQNs) into assessment streams based on how your qualification compares to Australian standards. Philippine BSN graduates commonly route through the **outcomes-based assessment (OBA)** stream. Requirements and stream criteria evolve — treat AHPRA's site as the source of truth at application time.

## Step 2: English — The Gate Many Underestimate

Australia's English bar is genuinely strict: benchmarks of **IELTS 7.0 in each band, OET grade B, or PTE Academic equivalents**, with specific rules on combining sittings that AHPRA periodically updates. Filipino nurses who clear this gate comfortably tend to be the ones who prepared for it as seriously as the clinical exams. Book preparation time accordingly.

## Step 3: The Outcomes-Based Assessment (OBA)

The OBA has two components for typical IQN candidates:

1. **A cognitive (multiple-choice) exam** assessing nursing knowledge — **NCLEX-style in format and substance**, which means your NCLEX preparation resources transfer directly. Practice with our [free 400-question NCLEX bank](https://lisensyaprep.com/nclex) and the [subject reviewers](https://lisensyaprep.com/nursing/nclex-2026-coverage)
2. **An OSCE** — a practical, simulation-based clinical exam conducted **in Australia**, testing hands-on competencies against Australian standards

Pass both, complete registration requirements, and you hold Australian RN registration.

## Step 4: Visas and Work

Nursing consistently features on Australia's skilled occupation lists, opening **employer-sponsored and independent skilled visa routes**; many Filipino nurses arrive via employer sponsorship with regional hospitals and aged-care providers actively recruiting. Visa categories and points rules shift with policy — confirm current settings on the Department of Home Affairs site or with a registered migration agent (verify registration; unregistered "consultants" are a known scam vector).

## The New Zealand Option

New Zealand's Nursing Council runs its own assessment for internationally qualified nurses — historically involving competence assessment programmes and, in recent years, updated examination-based pathways. NZ offers a similar lifestyle-and-pay proposition at smaller scale, and Trans-Tasman recognition means an Australian registration future stays open. If NZ interests you, check the Nursing Council of New Zealand's current IQN process directly.

## Frequently Asked Questions

**What exam does Australia require for Filipino nurses?**
Typically the outcomes-based assessment: an NCLEX-style multiple-choice cognitive exam plus an OSCE conducted in Australia, under AHPRA's IQN framework.

**Does my NCLEX review help for Australia?**
Directly — the OBA's cognitive exam is NCLEX-style, so NCLEX question banks and reviewers are the standard preparation.

**How strict is the English requirement?**
Among the strictest: IELTS 7.0 per band, OET B, or PTE equivalents under AHPRA's current rules. Prepare for it seriously.

**Can I take everything from the Philippines?**
The application, self-check, and English tests, yes. The OSCE component is conducted in Australia.
`;

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: "/nursing", name: "Nursing" }, { url: "/nursing/filipino-nurse-australia-pathway", name: "Nurse to Australia Pathway" }]} />
      <Script id="schema-filipino-nurse-australia-pathway-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Nurse to Australia Pathway</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (PNLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Filipino Nurse to Australia and New Zealand 2026: AHPRA Pathway
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>August 1, 2026</span><span>•</span>
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
