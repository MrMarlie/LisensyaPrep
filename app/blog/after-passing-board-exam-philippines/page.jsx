import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'What to Do After Passing the Board Exam Philippines (2026 Checklist)',
  description:
    'Just passed the PRC board exam? Complete checklist of what to do next - verify your rating, oath-taking, initial registration, PRC ID, and starting your career. From a real board passer.',
  path: '/blog/after-passing-board-exam-philippines',
});

const SCHEMA_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'What to Do After Passing the Board Exam in the Philippines',
  description:
    'Complete post-exam checklist for new PRC board passers from rating verification to oath-taking, initial registration, and starting your professional career.',
  step: [
    { '@type': 'HowToStep', name: 'Verify Your Rating', text: 'Confirm your result on prc.gov.ph and use the Verification of Rating service on LERIS.' },
    { '@type': 'HowToStep', name: 'Register for Oath-Taking', text: 'Book your oath slot through LERIS and print your Oath Form with QR code.' },
    { '@type': 'HowToStep', name: 'Complete Initial Registration', text: 'Book an appointment through LERIS, pay 1,050 pesos, submit requirements, and sign the Roster of Registered Professionals.' },
    { '@type': 'HowToStep', name: 'Update Your Professional Title', text: 'Add your license to your resume, LinkedIn, and job profiles.' },
    { '@type': 'HowToStep', name: 'Know Your Obligations', text: 'Renew every 3 years during your birth month and comply with CPD requirements.' },
    { '@type': 'HowToStep', name: 'Plan Your Career Direction', text: 'Choose your professional path deliberately from your first job.' },
  ],
  author: { '@type': 'Organization', name: 'LisensyaPrep Team' },
  publisher: { '@type': 'Organization', name: 'LisensyaPrep' },
  datePublished: '2026-07-09',
};

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I work immediately after passing the board exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You become a licensed professional only after completing your oath and initial registration. Many employers will process applications using your verified rating while your PRC ID is being released.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to get my PRC ID after passing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1,050 pesos total for baccalaureate professions: 600 pesos initial registration plus 450 pesos for the 3-year Professional ID Card.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I delay my initial registration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your passing does not expire, but you cannot legally practice or use your professional title until you complete registration. Register as soon as slots allow.',
      },
    },
  ],
};

const RELATED_ARTICLES = [
  { text: 'PRC Initial Registration 2026 - How to Get Your PRC ID', href: '/blog/prc-initial-registration-guide' },
  { text: 'LERIS PRC Online Guide 2026', href: '/blog/leris-prc-online-guide' },
  { text: 'How to Apply for PRC Board Exam Online (LERIS)', href: '/blog/how-to-apply-prc-board-exam-online-2026' },
  { text: 'What to Bring on PRC Board Exam Day', href: '/blog/what-to-bring-prc-board-exam-day' },
  { text: 'PNLE August 2026 - Schedule & Complete Guide', href: '/nursing/pnle-august-2026-schedule' },
  { text: 'CLE August 2026 - Schedule & Complete Guide', href: '/criminology/cle-august-2026-guide' },
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
You passed. Take a moment — you earned it.

I still remember mine. I am a Registered Pharmacist, and funny enough, I was asleep when the results came out. My colleague called me with the most excited voice, congratulating me before I even knew. I verified my name on the list, took a screenshot, and sent it to my family and my girlfriend. That screenshot is still one of my favorite photos.

But after the kilig wears off, a practical question hits every new passer: **okay... what now?** Passing the exam does not automatically make you a licensed professional. There is a sequence of steps between "I passed!" and legally practicing your profession. Here is the complete checklist, in order.

---

## Step 1: Verify Your Rating Officially

Before anything else, confirm your result through official channels — not just a screenshot of a results page shared in a group chat.

- Check the official results on the **PRC website (prc.gov.ph)** or newspapers of general circulation
- Use the **Verification of Rating** service on **LERIS (online.prc.gov.ph)** to see your official rating per subject

Save or screenshot your verified rating. Some employers ask for it before your PRC ID is released.

**Tip:** On results day, the PRC website often slows down from traffic. If it will not load, try again late at night or early morning.

---

## Step 2: Watch for Your Oath-Taking Announcement

You cannot register as a professional without taking your **professional oath** first. After results are released, the PRC and your Professional Regulatory Board announce the oath-taking schedules — watch the PRC website and their official Facebook page.

- Register for your oath slot through **LERIS → Select Transaction → Oath**
- Print your **Oath Form with your personal QR code** — it gets scanned at the ceremony
- Face-to-face mass oath-taking is the norm in 2026; online and special oath-taking exist for those who cannot attend

Full walkthrough here: [PRC Oath Taking Guide 2026](/blog/prc-oath-taking-guide)

---

## Step 3: Complete Your Initial Registration (Get Your PRC ID)

Here is the mistake I personally made: I thought that after oath-taking, I could just walk into the nearest PRC office and get my ID. You cannot. **Everything requires an online appointment through LERIS.**

The short version:

1. LERIS → **Select Transaction → Initial Registration**
2. Pick your PRC branch, date, and time
3. Pay **₱1,050 total** (₱600 registration + ₱450 for the 3-year Professional ID Card)
4. Appear personally on your appointment date, submit requirements, and sign the **Roster of Registered Professionals**
5. Claim your PRC ID based on your chosen schedule

I wrote the complete step-by-step with my own experience here: [PRC Initial Registration 2026: How to Get Your PRC ID](/blog/prc-initial-registration-guide)

---

## Step 4: Update Your Title Everywhere

This is the fun part. Once registered, you have earned the right to your professional title — RPh, RN, LPT, RCrim, RMT, and so on.

- Update your **resume/CV** with your license number and rating (if strong)
- Update **LinkedIn, Jobstreet, and Indeed profiles** — recruiters filter searches by license
- Order a professional **name tag or seal** if your profession uses one

From my experience: job hunting becomes dramatically easier once you can say you are a PRC-licensed professional. Once I updated my profiles after passing, opportunities started pouring into my email. The license is not just a card — it is a filter that puts you in a different applicant pool entirely.

---

## Step 5: Know Your Post-License Obligations

New passers often do not realize the license comes with maintenance:

- **Renewal every 3 years** during your birth month, through LERIS
- **CPD (Continuing Professional Development) units** may be required for renewal depending on your profession
- **Professional organization membership** — some professions require joining the Accredited Integrated Professional Organization (AIPO)
- Some professions and employers require a **Professional Tax Receipt (PTR)** from your city or municipal hall, especially for those in private practice

Details here: [PRC ID Renewal and CPD Guide](/blog/prc-id-renewal-cpd-guide)

---

## Step 6: Decide Your Career Direction Early

If I could go back in time while keeping the knowledge I have today, this is the one thing I would change: I would choose my career path deliberately from day one, instead of just going where the current took me.

Every profession has multiple paths, and they lead to very different lives five years later:

- **Pharmacists:** community, hospital, industry, regulatory, academe
- **Nurses:** hospital, public health, abroad (NCLEX route), specialization
- **Teachers:** DepEd, private schools, international schools, higher ed
- **Criminologists:** PNP, BJMP, BFP, private security management, academe

You do not need the perfect answer this week. But ask yourself early: *Where do I want to be at 30?* Then pick the first job that builds toward it, not just the first job that says yes. Your first two years shape your trajectory more than most people realize.

---

## Step 7: Protect Yourself from Scams

Sadly, new passers are targets. Watch out for:

- **Fixers** offering to "rush" your PRC ID for a fee — there is no legitimate rush service; everything goes through LERIS
- **Fake congratulatory messages** with links asking for your personal details or LERIS password
- **Recruitment scams** promising overseas placement for large upfront fees — verify agencies with DMW

The PRC will never ask for your password, and all official fees are paid through official LERIS payment channels only.

---

## A Word to Those Still Reviewing

If you are reading this before your exam: focus, take care of your brain (sweets helped me during review, honestly), but do not forget to take breaks. You need to rest and enjoy too — burnout fails more exams than difficult questions do.

And when your name appears on that list, come back to this checklist. It will be waiting.

Free gamified reviewers for nursing, pharmacy, teaching, criminology, and more: **[Start reviewing at LisensyaPrep](/)**

---

## Frequently Asked Questions

**Can I work immediately after passing the board exam?**
You become a licensed professional only after completing your oath and initial registration. However, many employers will process your application using your verified rating while your PRC ID is being released. Requirements vary by employer and industry.

**How long after the results is the oath-taking?**
It varies by profession and region. The PRC announces oath schedules shortly after results are released — sometimes within weeks. Watch the PRC website and official Facebook page.

**How much does it cost to get my PRC ID after passing?**
₱1,050 total for baccalaureate professions: ₱600 initial registration plus ₱450 for the 3-year Professional ID Card.

**Do I need to attend the mass oath-taking specifically?**
No. If you miss it, you can request a special or individual oath-taking from your Professional Regulatory Board, or join an online oath-taking if available.

**What happens if I delay my initial registration?**
Your passing does not expire, but you cannot legally practice or use your professional title until you complete registration. Long delays may also require a petition and additional steps, so register as soon as slots allow.
`;

export default function AfterPassingBoardExamPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-after-passing-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_HOWTO) }} />
      <Script id="schema-after-passing-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">After Passing the Board Exam</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">PRC Guide</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                What to Do After Passing the Board Exam Philippines (Complete 2026 Checklist)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 9, 2026</span><span>•</span>
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
