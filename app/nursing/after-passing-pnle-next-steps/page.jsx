import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'What to Do After Passing the PNLE - New RN Next Steps 2026',
  description:
    'Just passed the PNLE? Complete guide for new registered nurses - oath taking, PRC ID, BLS and IVT certifications, first hospital job, and pathways to working abroad as a Filipino nurse.',
  path: '/nursing/after-passing-pnle-next-steps',
});

const SCHEMA_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'What to Do After Passing the PNLE',
  description:
    'Complete roadmap for new registered nurses in the Philippines from rating verification to oath, PRC ID, certifications, first job, and abroad pathways.',
  step: [
    { '@type': 'HowToStep', name: 'Verify Your Rating', text: 'Confirm your result on prc.gov.ph and use the Verification of Rating service on LERIS.' },
    { '@type': 'HowToStep', name: 'Take Your Professional Oath', text: 'Register through LERIS and attend the ceremony with your printed Oath Form.' },
    { '@type': 'HowToStep', name: 'Complete Initial Registration', text: 'Book a LERIS appointment, pay 1,050 pesos, and claim your PRC ID.' },
    { '@type': 'HowToStep', name: 'Get Hospital Certifications', text: 'Complete BLS training, then IVT certification for bedside roles.' },
    { '@type': 'HowToStep', name: 'Choose Your Career Path', text: 'Apply to hospitals, explore non-hospital nursing roles, or begin the abroad pathway such as the NCLEX.' },
    { '@type': 'HowToStep', name: 'Maintain Your License', text: 'Renew every 3 years during your birth month and keep CPD certificates.' },
  ],
  author: { '@type': 'Organization', name: 'LisensyaPrep Team' },
  publisher: { '@type': 'Organization', name: 'LisensyaPrep' },
  datePublished: '2026-07-12',
};

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What certifications should I get first as a new RN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BLS first, as it is the near-universal hospital requirement. IVT (ANSAP-recognized) next for bedside roles. ACLS strengthens ER and ICU applications.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I apply to hospitals before receiving my physical PRC ID?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many hospitals process applications using your verified rating and proof of registration in progress, but requirements vary by institution. Complete your registration as early as slots allow.',
      },
    },
    {
      '@type': 'Question',
      name: 'How soon can I take the NCLEX after passing the PNLE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The processes are independent. You can start your NCLEX credential evaluation and state board application while working locally in the Philippines.',
      },
    },
  ],
};

const RELATED_ARTICLES = [
  { text: 'What to Do After Passing the Board Exam Philippines', href: '/blog/after-passing-board-exam-philippines' },
  { text: 'PRC Oath Taking Guide 2026', href: '/blog/prc-oath-taking-guide' },
  { text: 'PRC Initial Registration 2026: How to Get Your PRC ID', href: '/blog/prc-initial-registration-guide' },
  { text: 'What is the NCLEX? Complete Guide for Filipino Nurses', href: '/nursing/what-is-the-nclex' },
  { text: 'How to Take the NCLEX in the Philippines', href: '/nursing/how-to-take-nclex-philippines' },
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
Congratulations, RN! Passing the Philippine Nurse Licensure Examination puts you in a profession that commands genuine respect. As a Registered Pharmacist who has worked alongside nurses, one thing has always struck me: nurses stay composed no matter what case or patient comes through the door. It is tiring work, no question — but nurses are deeply respected, not only inside hospitals but outside them too. You are joining that company now.

Before your first duty, though, there is a sequence to complete: verification, oath, registration, certifications, and the first big career decision. Here is your complete roadmap.

**Quick answer:** Verify your rating on LERIS → take your oath → complete initial registration (₱1,050) for your PRC ID → get BLS (and ideally IVT) certified → apply to hospitals or explore non-hospital and abroad pathways.

---

## Step 1: Verify Your Rating

- Official results on **prc.gov.ph** and the **Verification of Rating** service on **LERIS (online.prc.gov.ph)**
- Save your verified rating — hospital HR departments commonly request your Certificate of Rating alongside your license during applications

---

## Step 2: Take Your Professional Oath

After results, the PRC and the Board of Nursing announce oath schedules. Register via **LERIS → Select Transaction → Oath**, print your **Oath Form with QR code**, and attend (face-to-face is the 2026 norm; online and special oaths exist).

Full walkthrough: [PRC Oath Taking Guide 2026](/blog/prc-oath-taking-guide)

---

## Step 3: Get Your PRC ID (Initial Registration)

Remember: **no walk-ins** — everything starts with a LERIS appointment. Book Initial Registration, pay **₱1,050** (₱600 registration + ₱450 for the 3-year ID), appear personally to sign the Roster of Registered Professionals, and claim your ID.

Complete step-by-step from real experience: [PRC Initial Registration 2026](/blog/prc-initial-registration-guide)

---

## Step 4: Get the Certifications Hospitals Actually Ask For

Here is what many new RNs learn only when they start applying: your license opens the door, but hospitals commonly expect additional certifications. Getting these early makes your application folder stand out:

**Basic Life Support (BLS)** — the near-universal requirement for hospital staff nurse applications. Get it from a recognized training provider; validity is typically 2 years.

**Intravenous Therapy (IVT) Training** — the ANSAP-recognized IV therapy course is a standard expectation for bedside roles, since IV insertion and management are daily nursing work.

**Advanced Cardiac Life Support (ACLS)** — not always required for entry-level, but a strong differentiator, especially for ER and ICU ambitions.

Budget for these trainings as part of your post-exam expenses — they are investments that directly convert to employability.

---

## Step 5: Choose Your First Career Move

### Path A: Hospital Staff Nurse

The classic route: apply to government and private hospitals. Government hospitals offer Salary Grade-based pay and benefits; private hospitals vary widely. Expect written exams, interviews, and sometimes a training or probationary period. Application folders typically include your PRC license, Certificate of Rating, TOR, certifications (BLS/IVT), and PSA documents.

Competition for slots in major hospitals is real — apply broadly, and do not take rejections personally. Provincial and smaller hospitals often hire faster and give you the bedside experience that bigger institutions later value.

### Path B: Non-Hospital Nursing

Your RN is more versatile than many new passers realize:

- **Company/occupational health nurse** — regular hours, corporate benefits
- **School nurse** — academic calendar, stable schedule
- **Clinic nursing** — outpatient settings, less acuity
- **HMO and health-account BPO roles** — competitive pay, office-based
- **Public health programs** — DOH and LGU deployment programs open periodically; watch official DOH announcements

### Path C: The Abroad Pathway

Many Filipino RNs plan international careers from day one. The honest advice: **local bedside experience strengthens almost every abroad application**, so your first PH hospital years are an investment, not a delay.

If the United States is your goal, the key exam is the NCLEX — and you can take it without leaving the Philippines. Start with our complete guides:

- [What is the NCLEX? Complete Guide for Filipino Nurses](/nursing/what-is-the-nclex)
- [How to Take the NCLEX in the Philippines](/nursing/how-to-take-nclex-philippines)
- [NCLEX vs PNLE: Complete Comparison](/nursing/nclex-vs-pnle-comparison)

Other major destinations (UK, Middle East, Australia, Canada) each have their own licensing routes — we are building dedicated pathway guides for each.

---

## Step 6: Know Your License Obligations

- **Renewal every 3 years** during your birth month via LERIS
- **CPD units** — keep certificates from trainings and seminars; BLS/IVT and hospital in-service trainings often count
- **Professional organization** — nurses' AIPO membership comes up at renewal; keep receipts

Details: [PRC ID Renewal and CPD Guide](/blog/prc-id-renewal-cpd-guide)

---

## Frequently Asked Questions

**Can I apply to hospitals before receiving my physical PRC ID?**
Many hospitals will process applications using your verified rating and proof of registration in progress, but requirements vary. Complete your registration as early as slots allow.

**What certifications should I get first as a new RN?**
BLS first — it is the near-universal hospital requirement. IVT (ANSAP) next for bedside roles. ACLS strengthens ER/ICU applications.

**Is volunteer nursing still required to get hired?**
Practices vary by institution. Some hospitals hire directly; others run paid training programs. Ask directly about compensation and status before committing to any arrangement.

**How soon can I take the NCLEX after passing the PNLE?**
The processes are independent — you can start your NCLEX application (credential evaluation, state board application) while working locally. See our [NCLEX Philippines guide](/nursing/how-to-take-nclex-philippines) for the full timeline.

**How much is a nurse's salary in the Philippines?**
Government positions follow the Salary Grade system; private varies widely. We cover current figures in our upcoming [Nurse Salary Philippines guide](/nursing/nurse-salary-philippines).

---

## For Those Still Reviewing

Know someone taking the next PNLE? LisensyaPrep has a [free gamified PNLE reviewer](/nursing/) covering all five subjects — and for future US-bound nurses, [400 free NCLEX practice questions](/nclex). Laban lang, future RN.
`;

export default function AfterPassingPnlePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-after-pnle-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_HOWTO) }} />
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: '/nursing', name: 'Nursing' }, { url: '/nursing/after-passing-pnle-next-steps', name: 'What to Do After Passing the PNLE' }]} />
      <Script id="schema-after-pnle-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">After Passing the PNLE</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (PNLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                What to Do After Passing the PNLE: New RN Guide 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 12, 2026</span><span>•</span>
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
              <p className="text-gray-400 text-sm mb-4">Free gamified PNLE reviewer covering all five subjects, plus 400 free NCLEX questions. No account required.</p>
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
