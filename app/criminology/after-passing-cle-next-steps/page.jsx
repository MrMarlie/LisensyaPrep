import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'What to Do After Passing the CLE - RCrim Next Steps 2026',
  description:
    'Just passed the criminology board exam? Complete guide for new Registered Criminologists - oath, PRC ID, joining the PNP without the NAPOLCOM exam, BJMP, BFP, and career paths for RCrims.',
  path: '/criminology/after-passing-cle-next-steps',
});

const SCHEMA_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'What to Do After Passing the CLE',
  description:
    'Complete roadmap for new Registered Criminologists from rating verification to oath, PRC ID, and choosing between PNP, BJMP, BFP, private security, and other career paths.',
  step: [
    { '@type': 'HowToStep', name: 'Verify Your Rating', text: 'Confirm your result on prc.gov.ph and use the Verification of Rating service on LERIS.' },
    { '@type': 'HowToStep', name: 'Take Your Professional Oath', text: 'Register through LERIS and attend the ceremony with your printed Oath Form.' },
    { '@type': 'HowToStep', name: 'Complete Initial Registration', text: 'Book a LERIS appointment, pay 1,050 pesos, and claim your PRC ID.' },
    { '@type': 'HowToStep', name: 'Use Your RA 11131 Eligibility', text: 'Your RCrim license serves as eligibility for PNP entry without the NAPOLCOM entrance exam.' },
    { '@type': 'HowToStep', name: 'Choose Your Career Path', text: 'Apply to the PNP through the CORPS portal, or pursue BJMP, BFP, private security, or other agencies.' },
  ],
  author: { '@type': 'Organization', name: 'LisensyaPrep Team' },
  publisher: { '@type': 'Organization', name: 'LisensyaPrep' },
  datePublished: '2026-07-13',
};

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I still need the NAPOLCOM entrance exam if I am a Registered Criminologist?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Under RA 6506 as amended by RA 11131, your criminologist license serves as your eligibility for PNP entry.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the age limit for joining the PNP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '21 to 30 years old upon oath-taking. NAPOLCOM may grant age waivers for applicants not less than 20 and not more than 35.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to pay anything to apply to the PNP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. PNP recruitment is completely free of charge. Anyone charging fees for application assistance is a scammer and should be reported.',
      },
    },
  ],
};

const RELATED_ARTICLES = [
  { text: 'What to Do After Passing the Board Exam Philippines', href: '/blog/after-passing-board-exam-philippines' },
  { text: 'PRC Oath Taking Guide 2026', href: '/blog/prc-oath-taking-guide' },
  { text: 'PRC Initial Registration 2026: How to Get Your PRC ID', href: '/blog/prc-initial-registration-guide' },
  { text: 'CLE August 2026 Schedule and Subjects Guide', href: '/criminology/cle-august-2026-guide' },
  { text: 'CLE Coverage 2026 Complete Breakdown', href: '/criminology/cle-coverage-2026' },
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
Congratulations, RCrim! Passing the Criminologist Licensure Examination — one of the largest and most competitive board exams in the country — earns you the title **Registered Criminologist** and unlocks career doors that most graduates do not fully realize they now hold the keys to.

Here is the complete roadmap: the registration steps every passer must complete, and then the career decision that matters most — PNP, BJMP, BFP, private security, or beyond.

**Quick answer:** Verify your rating on LERIS → take your oath → complete initial registration (₱1,050) for your PRC ID → then choose your path. Your RCrim license already serves as your eligibility for uniformed service — no separate NAPOLCOM entrance exam needed.

---

## Step 1: Verify Your Rating

- Official results on **prc.gov.ph**
- **Verification of Rating** on **LERIS (online.prc.gov.ph)** for your official per-subject rating
- Save your Certificate of Rating — agencies request it during recruitment

---

## Step 2: Take Your Professional Oath

Register via **LERIS → Select Transaction → Oath**, print your **Oath Form with QR code**, and attend the ceremony (face-to-face is the 2026 norm; online and special oath options exist).

Full walkthrough: [PRC Oath Taking Guide 2026](/blog/prc-oath-taking-guide)

---

## Step 3: Get Your PRC ID (Initial Registration)

No walk-ins — book through LERIS, pay **₱1,050** (₱600 registration + ₱450 for the 3-year ID), appear personally to sign the Roster of Registered Professionals, and claim your ID.

Complete step-by-step from real experience: [PRC Initial Registration 2026](/blog/prc-initial-registration-guide)

---

## Step 4: Know Your Biggest Advantage — RA 11131

Here is what many new passers underestimate: under **RA 6506 as amended by RA 11131 (the Philippine Criminology Profession Act)**, your RCrim license itself serves as an **eligibility for entry into the uniformed services** — including the PNP.

In plain terms: **you do not need to take the NAPOLCOM PNP Entrance Examination.** Your board license is your eligibility. While other applicants line up for NAPOLCOM exam schedules, you can proceed directly to recruitment. This is one of the strongest professional advantages any board exam confers in the Philippines.

---

## Step 5: Choose Your Career Path

### Path A: Philippine National Police (PNP)

The most popular route. Entry rank is **Patrolman/Patrolwoman**, with a base salary of roughly ₱29,000+ monthly plus allowances — total take-home for new officers is substantially higher once allowances are included.

**Basic qualifications (per RA 6975, as amended by RA 8551):**

- Filipino citizen of good moral character
- Baccalaureate degree (your BS Criminology qualifies)
- **21 to 30 years old** upon oath (age waiver possible for 20 up to 35 under NAPOLCOM waiver rules)
- Height: 1.62 m for males, 1.57 m for females (waivers available, including for members of indigenous groups certified by the NCIP)
- Weight within 5 kg of the standard for your height, age, and sex
- Eligibility — **your RCrim license covers this**
- No dishonorable discharge or conviction involving moral turpitude

**How to apply:** Recruitment now runs through the **CORPS portal (Comprehensive Online Recruitment Processing System)** at app.corps.pnprss.com. Create an account, upload your documents, and monitor your region's recruitment quota announcements on the PNP Recruitment and Selection Service Facebook page.

**The screening gauntlet:** Physical Agility Test, psychological/neuro-psychiatric exam, medical exam, drug test, character and background investigation, and panel interview. If you pass everything, you take your oath as Patrolman/Patrolwoman and complete the **Public Safety Basic Recruit Course (PSBRC)** and Field Training Program to attain permanent status.

**Important:** PNP recruitment is completely **free of charge**, and recommendation letters earn no points. Anyone asking for money to "assist" your application is running a scam — report them.

### Path B: BJMP and BFP

The **Bureau of Jail Management and Penology** and **Bureau of Fire Protection** recruit criminologists with similar qualification structures and salary grades to the PNP. Corrections work (BJMP) aligns directly with your Correctional Administration training. Watch their official recruitment pages for quota announcements.

### Path C: Private Security Industry

A growing path many overlook: security officers, security managers, and detectives in the private sector. Your RCrim credentials position you for supervisory and management roles rather than entry-level guard positions — think security manager tracks in malls, banks, BPOs, and logistics companies.

### Path D: Other Government Agencies and Academe

- **PDEA, BuCor, and investigation agencies** recruit criminologists for agent and officer roles
- **Academe** — with your license (and eventually a master's degree), you can teach criminology; the profession's growth means schools constantly need instructors
- **LGU public safety offices** and traffic management roles

The honest advice we give every passer: pick the path that builds toward where you want to be at 30 — not just the first recruitment quota that opens.

---

## Step 6: Know Your License Obligations

- **Renew every 3 years** during your birth month via LERIS
- **CPD units** may be required at renewal — trainings and seminars count, keep certificates
- Details: [PRC ID Renewal and CPD Guide](/blog/prc-id-renewal-cpd-guide)

---

## Frequently Asked Questions

**Do I still need the NAPOLCOM entrance exam if I'm a Registered Criminologist?**
No. Under RA 6506 as amended by RA 11131, your criminologist license serves as your eligibility for PNP entry.

**What is the age limit for joining the PNP?**
21 to 30 years old upon oath-taking. NAPOLCOM may grant age waivers for applicants not less than 20 and not more than 35, subject to waiver rules.

**How much is the starting salary of a Patrolman?**
Base pay is roughly ₱29,000+ monthly, with allowances pushing total compensation significantly higher. We cover full figures in our upcoming [Criminologist and Police Salary guide](/criminology/criminologist-police-salary-philippines).

**Is there a height requirement waiver?**
Yes. Waivers exist under NAPOLCOM rules, including lower thresholds and special provisions for members of indigenous groups certified by the NCIP.

**Do I need to pay anything to apply to the PNP?**
No. Recruitment is free. Anyone charging fees or promising assistance for money is a scammer — report them to the PNP-RSS.

**Can I work in private security instead of the uniformed services?**
Absolutely. Your RCrim license qualifies you for supervisory and management roles in the private security industry, often with faster hiring than government quotas.

---

## For Those Still Reviewing

Know someone taking the next CLE? LisensyaPrep has a [free gamified criminology reviewer](/criminology/) covering all six board subjects. Sa susunod na batch — laban lang.
`;

export default function AfterPassingClePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-after-cle-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_HOWTO) }} />
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: '/criminology', name: 'Criminology' }, { url: '/criminology/after-passing-cle-next-steps', name: 'What to Do After Passing the CLE' }]} />
      <Script id="schema-after-cle-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/criminology" className="text-gray-500 hover:text-gray-300 transition-colors">Criminology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">After Passing the CLE</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400">Criminology (CLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                What to Do After Passing the CLE: Registered Criminologist Next Steps 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 13, 2026</span><span>•</span>
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

            <div className="mt-8 bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-red-400 font-extrabold text-lg mb-2">Know Someone Still Reviewing for the CLE?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified criminology reviewer covering all six board subjects. No account required.</p>
              <Link href="/criminology" className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
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
