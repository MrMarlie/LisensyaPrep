import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'PRC ID Renewal and CPD Units Guide 2026 (Fees & Requirements)',
  description:
    'How to renew your PRC ID in 2026 - fees, CPD unit requirements, first renewal exemption, LERIS steps, and pickup vs delivery. Real renewal experience from a Registered Pharmacist.',
  path: '/blog/prc-id-renewal-cpd-guide',
});

const SCHEMA_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Renew Your PRC ID',
  description:
    'Step-by-step PRC license renewal through LERIS including fees, CPD requirements, and claiming options.',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'PHP', value: '450' },
  step: [
    { '@type': 'HowToStep', name: 'Log in to LERIS', text: 'Go to online.prc.gov.ph and log in with your existing account.' },
    { '@type': 'HowToStep', name: 'Select Renewal', text: 'Choose Select Transaction then Renewal and confirm your details.' },
    { '@type': 'HowToStep', name: 'Declare CPD Compliance', text: 'For second renewals onward, declare CPD units. First renewals are exempt.' },
    { '@type': 'HowToStep', name: 'Choose Office and Pay', text: 'Pick any convenient PRC office and pay 450 pesos through online payment channels.' },
    { '@type': 'HowToStep', name: 'Claim Your New ID', text: 'Pick up at your chosen office or use the delivery option where available.' },
  ],
  author: { '@type': 'Organization', name: 'LisensyaPrep Team' },
  publisher: { '@type': 'Organization', name: 'LisensyaPrep' },
  datePublished: '2026-07-14',
};

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need CPD units for my first PRC renewal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Newly registered professionals are exempt from CPD requirements for their first renewal. CPD applies from the second renewal onward, with required units varying by profession.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much is PRC ID renewal in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '450 pesos for the 3-year Professional ID Card for baccalaureate-degree professions. Late renewals may carry surcharges.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I renew at a different PRC office from where I registered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can process and claim your renewal at any PRC office convenient to you.',
      },
    },
  ],
};

const RELATED_PRC_ARTICLES = [
  { text: 'What to Do After Passing the Board Exam Philippines', href: '/blog/after-passing-board-exam-philippines' },
  { text: 'PRC Oath Taking Guide 2026', href: '/blog/prc-oath-taking-guide' },
  { text: 'PRC Initial Registration 2026: How to Get Your PRC ID', href: '/blog/prc-initial-registration-guide' },
  { text: 'LERIS PRC Online Guide 2026', href: '/blog/leris-prc-online-guide' },
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
Your PRC ID is valid for **three years** and must be renewed during your **birth month** — and if you let it lapse, you technically cannot legally practice your profession. Yet renewal is one of the most procrastinated tasks among Filipino professionals, mostly because of confusion around one thing: **CPD units**.

I am a Registered Pharmacist, and I have been through my own renewal, so this guide covers what the process actually looks like — including the CPD exemption that surprised me in the best way.

**Quick answer:** Renew through LERIS (online.prc.gov.ph) → Select Transaction → Renewal → pay ₱450 for the 3-year card → claim at your chosen PRC office or via delivery. Your **first renewal does not require CPD units**; succeeding renewals do, with the required units varying by profession.

---

## When Should You Renew?

- Your PRC ID expires on your **birthday, three years after issuance**
- You can renew **during or before your birth month** — do not wait for the expiry date itself
- Renewing early is allowed and smart; slots near month-end fill up

**What happens if it expires?** You can still renew a lapsed license, but practicing with an expired license exposes you to professional and employment problems — many employers and clients check validity. Renew before it becomes an HR conversation.

---

## The CPD Question, Answered Honestly

CPD (Continuing Professional Development) under **RA 10912** is the main source of renewal anxiety. Here is how it actually works:

### First Renewal: No CPD Required

This surprised me during my own renewal: **for your first renewal after initial registration, CPD units are not required.** Newly registered professionals are exempt for their first renewal cycle. If you registered recently and your first renewal is coming up, you can breathe.

### Succeeding Renewals: CPD Required, Varies by Profession

From your second renewal onward, CPD compliance applies. For us pharmacists, the requirement is **45 CPD units** per three-year cycle. Other professions have their own unit requirements set by their Professional Regulatory Boards — some higher, some lower — and these can change via PRC resolutions, so **always check the current CPD requirement for your specific profession** on the PRC website or with your accredited professional organization before your renewal window.

### How to Earn CPD Units

- **Accredited seminars and conventions** (your professional organization's events usually qualify)
- **Online CPD courses** from PRC-accredited providers
- **In-service trainings** — many workplace trainings count if the provider is accredited
- **Graduate studies** — units for completed academic work
- **Self-directed learning** — some professions credit publications, lectures given, and similar activities

**The golden rule: keep every certificate.** Store digital copies the moment you receive them. Scrambling for proof of a 2024 seminar during your 2027 renewal is a self-inflicted wound.

---

## How Much Does Renewal Cost?

| Fee | Amount |
|-----|--------|
| Professional ID Card renewal (3 years) | ₱450 |

That is the standard renewal fee for baccalaureate-degree professions — the same ₱450 (₱150/year) card fee from your initial registration. Late renewals may carry surcharges depending on how long the license has lapsed, so renewing on time is also the cheaper option.

---

## Step-by-Step: How to Renew via LERIS

1. **Log in** at online.prc.gov.ph (same account as always — never create a duplicate)
2. **Select Transaction → Renewal**
3. **Confirm your details** and upload an updated photo if prompted
4. **CPD declaration** — for succeeding renewals, declare your compliance; keep certificates ready in case of audit. First-time renewers skip this in practice
5. **Choose your PRC office** for claiming — and here is a convenience many miss: **you can renew and claim at any PRC office**, not just where you originally registered. I picked mine up at the PRC office nearest to me, no drama
6. **Pay ₱450** via GCash, Maya, LandBank Link.Biz, or partner channels
7. **Claim your new ID** on your chosen date — or use the delivery option (Metro Manila, ₱180 via courier) if available for your transaction

Need a refresher on the LERIS portal itself? Full walkthrough: [LERIS PRC Online Guide](/blog/leris-prc-online-guide)

---

## Frequently Asked Questions

**Do I need CPD units for my first PRC renewal?**
No. Newly registered professionals are exempt from CPD requirements for their first renewal. CPD applies from your second renewal onward.

**How many CPD units do I need?**
It varies by profession — pharmacists currently need 45 units per cycle, while other professions have different requirements set by their boards. Check your profession's current requirement on the PRC website before renewing.

**Can I renew at a different PRC office from where I registered?**
Yes. You can process and claim your renewal at any PRC office convenient to you.

**Can I renew before my birth month?**
Yes, early renewal is allowed. Waiting until the exact expiry risks appointment slot shortages.

**What happens if my license already expired?**
You can still renew, though surcharges may apply for lapsed periods. Avoid practicing while expired — renew as soon as possible.

**Can someone else claim my renewed ID?**
Rules vary by office; a representative with an authorization letter or SPA and valid IDs is often accepted for renewal claiming, unlike initial registration which requires personal appearance. Confirm with your chosen office.

---

## The Complete Professional's Toolkit

Renewal closes the loop we started with passing the boards. The full journey, in order:

1. [What to Do After Passing the Board Exam](/blog/after-passing-board-exam-philippines)
2. [PRC Oath Taking Guide](/blog/prc-oath-taking-guide)
3. [PRC Initial Registration: Getting Your PRC ID](/blog/prc-initial-registration-guide)
4. **PRC Renewal and CPD** — you are here
5. And if someone in your life is still reviewing: [free gamified board exam reviewers at LisensyaPrep](/)
`;

export default function PrcIdRenewalCpdGuidePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-prc-renewal-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_HOWTO) }} />
      <Script id="schema-prc-renewal-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">PRC ID Renewal and CPD Guide</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">PRC Guide</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                PRC ID Renewal and CPD Units Guide 2026: Fees, Requirements, Step-by-Step
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 14, 2026</span><span>•</span>
                <span>8 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">Related PRC Guides</h2>
              <ul className="space-y-3">
                {RELATED_PRC_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 border border-yellow-500/30 rounded-2xl p-6 text-center">
              <p className="text-yellow-400 font-extrabold text-lg mb-2">Still Reviewing for Your Board Exam?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified reviewers for PNLE, LET, CLE, and more. No account required.</p>
              <Link href="/" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">PRC Application Guides</h3>
              <div className="space-y-3">
                {RELATED_PRC_ARTICLES.map(({ text, href }) => (
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
