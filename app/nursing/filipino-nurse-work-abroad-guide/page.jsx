import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: "How to Work Abroad as a Filipino Nurse 2026 - Destinations Compared",
  description: "Complete comparison of abroad pathways for Filipino nurses in 2026 - US (NCLEX), UK (NMC), Canada, Australia, and the Middle East. Requirements, timelines, and how to choose your destination.",
  path: "/nursing/filipino-nurse-work-abroad-guide",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Which country is easiest for Filipino nurses to work in?","acceptedAnswer":{"@type":"Answer","text":"The Middle East offers the fastest and least expensive entry via DataFlow verification and Prometric exams. Long-term, the best destination depends on whether your goal is employment speed, structured sponsorship, or permanent residency."}},{"@type":"Question","name":"Do Filipino nurses need work experience before applying abroad?","acceptedAnswer":{"@type":"Answer","text":"Nearly always yes. Most destinations and employers expect 1 to 3 years of bedside experience, with Gulf employers typically requiring at least 2 years."}}]}`;

const RELATED_ARTICLES = [
  { text: "What is the NCLEX? Complete Guide", href: "/nursing/what-is-the-nclex" },
  { text: "NCLEX Gateway States for Filipino Nurses", href: "/nursing/nclex-gateway-states-filipinos" },
  { text: "What to Do After Passing the PNLE", href: "/nursing/after-passing-pnle-next-steps" },
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
Filipino nurses are the most sought-after nursing workforce in the world — and for good reason: English-fluent, clinically trained, and famously composed under pressure. If you are an RN planning the abroad chapter, the real question is not *whether* but *where*. Each destination has its own licensing exam, English requirement, timeline, and immigration logic.

This is the comparison hub. Each destination below links to its dedicated step-by-step guide.

## The Destinations at a Glance

| Destination | Key exam/credential | English test | Typical timeline | Immigration character |
|-------------|--------------------|--------------|------------------|----------------------|
| **United States** | NCLEX-RN | IELTS/TOEFL (state-dependent) | 6-12+ months to exam; visa wait varies | Employer-sponsored green card (EB-3) |
| **United Kingdom** | NMC CBT + OSCE | IELTS 7.0 / OET B | Often under a year with a sponsor | Health & Care Worker visa, employer-driven |
| **Canada** | NNAS report + NCLEX-RN | IELTS/CELBAN | 1-2 years typical | Points-based PR routes possible |
| **Australia/NZ** | AHPRA assessment (incl. NCLEX-style MCQ + OSCE) | IELTS 7 / OET B / PTE | 1-2 years typical | Skilled visas, employer sponsorship |
| **Middle East** | DataFlow verification + Prometric exam | Usually none formal | Fastest — often months | Fixed-term employment contracts |

## How to Actually Choose

**Choose the US if** your goal is permanent immigration with family, the highest long-run earnings, and you can absorb a longer, costlier process. The NCLEX can be taken in Manila or Cebu — start with our complete [What is the NCLEX](https://lisensyaprep.com/nursing/what-is-the-nclex) and [How to Take the NCLEX in the Philippines](https://lisensyaprep.com/nursing/how-to-take-nclex-philippines) guides, and practice with our [400 free NCLEX questions](https://lisensyaprep.com/nclex).

**Choose the UK if** you want the fastest route to a Western country with structured employer sponsorship — the NHS actively recruits Filipino nurses, often covering exam and relocation costs. ([UK pathway guide](https://lisensyaprep.com/nursing/filipino-nurse-uk-pathway))

**Choose Canada if** permanent residency is the priority and you can navigate a document-heavy, province-specific process — health workers have benefited from targeted immigration draws. ([Canada pathway guide](https://lisensyaprep.com/nursing/filipino-nurse-canada-pathway))

**Choose Australia/NZ if** you want high pay and lifestyle with a rigorous but well-defined assessment path. ([Australia pathway guide](https://lisensyaprep.com/nursing/filipino-nurse-australia-pathway))

**Choose the Middle East if** you want to earn abroad *soonest*, bank tax-free income, and treat it as a stepping stone — many nurses fund their US/UK applications from a Gulf contract. ([Middle East guide](https://lisensyaprep.com/nursing/filipino-nurse-middle-east-guide))

## The Universal Prerequisites (Every Destination)

1. **Active PRC RN license** and PNLE rating documents
2. **Local bedside experience** — most destinations and employers want 1-3 years; the Gulf commonly requires 2+
3. **Clean records** — NBI clearance, verifiable employment certificates
4. **English proficiency** — even destinations without a formal test expect fluency
5. **Money for the process** — from tens of thousands of pesos (Gulf) to ₱200,000+ (US route)

## The Honest Warnings

- **Never pay a "recruiter" who is not a DMW-licensed agency** — verify every agency on the Department of Migrant Workers website before handing over a single peso ([full OFW guide](https://lisensyaprep.com/blog/ofw-guide-licensed-professionals))
- **Requirements change** — always confirm current rules on the official regulator's website (NMC, NNAS, AHPRA, NCSBN, DataFlow) before spending on applications
- **Local experience is not wasted time** — it is the entry requirement for nearly every good abroad position

## Frequently Asked Questions

**Which country is easiest for Filipino nurses?**
The Middle East has the fastest, least expensive entry (DataFlow + Prometric). "Easiest" long-term depends on your goal — employment speed (Gulf), sponsorship structure (UK), or permanent residency (US/Canada).

**Do I need work experience before applying abroad?**
Nearly always yes — commonly 1-3 years of bedside experience, with the Gulf typically requiring at least 2.

**Can I take the required exams in the Philippines?**
The NCLEX (Manila/Cebu), NMC CBT, and most Prometric exams are all available at Philippine test centers. OSCEs (UK, Australia) are taken in-country.

**How much does going abroad cost?**
From roughly ₱30,000-80,000 for a Gulf deployment through an ethical employer, to ₱150,000-250,000+ for the US route including CGFNS, NCLEX, and English testing.
`;

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: "/nursing", name: "Nursing" }, { url: "/nursing/filipino-nurse-work-abroad-guide", name: "Nurse Work Abroad Guide" }]} />
      <Script id="schema-filipino-nurse-work-abroad-guide-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Nurse Work Abroad Guide</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (PNLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                How to Work Abroad as a Filipino Nurse 2026: All Destinations Compared
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 29, 2026</span><span>•</span>
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
