import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'PRC Initial Registration 2026 - How to Get Your PRC ID (Step-by-Step)',
  description:
    'How to get your PRC ID after passing the board exam. Complete PRC initial registration guide 2026 with exact fees (₱1,050 total), oath-taking steps, real passer experience, and release timeline.',
  path: '/blog/prc-initial-registration-guide',
});

const SCHEMA_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Complete PRC Initial Registration and Get Your PRC ID',
  description:
    'Step-by-step process to complete PRC initial registration after passing a board exam in the Philippines, from oath-taking to claiming your PRC ID.',
  totalTime: 'P30D',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'PHP', value: '1050' },
  step: [
    { '@type': 'HowToStep', name: 'Log in to LERIS', text: 'Go to online.prc.gov.ph and log in with the account you used for your board exam application.' },
    { '@type': 'HowToStep', name: 'Register for Oath-Taking', text: 'Select Transaction, choose Oath, enter your Application Number, and book your oath slot. Print your Oath Form with QR code.' },
    { '@type': 'HowToStep', name: 'Attend Your Oath-Taking', text: 'Attend the face-to-face or online ceremony with your printed Oath Form and valid ID.' },
    { '@type': 'HowToStep', name: 'Book Initial Registration Appointment', text: 'In LERIS, select Initial Registration, choose your profession and PRC branch, and pick your appointment date.' },
    { '@type': 'HowToStep', name: 'Pay the Fees', text: 'Pay 600 pesos registration fee plus 450 pesos for the 3-year Professional ID Card, totaling 1,050 pesos, via GCash, Maya, or partner banks.' },
    { '@type': 'HowToStep', name: 'Submit Documents at PRC', text: 'On your appointment date, submit requirements and personally sign the Roster of Registered Professionals.' },
    { '@type': 'HowToStep', name: 'Claim Your PRC ID', text: 'Receive your PRC ID based on your chosen schedule, or use the Metro Manila delivery option for 180 pesos.' },
  ],
  author: { '@type': 'Organization', name: 'LisensyaPrep Team' },
  publisher: { '@type': 'Organization', name: 'LisensyaPrep' },
  datePublished: '2026-07-08',
};

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long before the PRC ID is released after initial registration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "It depends on your chosen PRC office's schedule and slot availability. You select your appointment date in LERIS, which determines when you receive your ID. The full process from oath-taking to registration can take around a month depending on slot availability.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much is PRC initial registration in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1,050 pesos total for baccalaureate-degree professions: 600 pesos registration fee plus 450 pesos for the 3-year Professional ID Card.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I just walk into a PRC office to register after passing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All PRC transactions require an online appointment booked through LERIS at online.prc.gov.ph before visiting any PRC office.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the PRC ID a valid government ID?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The PRC ID is accepted as a valid government-issued ID and is valid for 3 years, renewable during your birth month.',
      },
    },
  ],
};

const RELATED_PRC_ARTICLES = [
  { text: 'LERIS PRC Online Guide 2026', href: '/blog/leris-prc-online-guide' },
  { text: 'Complete PRC Board Exam Schedule 2026', href: '/blog/prc-board-exam-schedule-2026-all-professions' },
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
Congratulations, board passer! Before you can legally practice your profession, there is one final step: **PRC Initial Registration** — taking your professional oath and claiming your very first PRC ID.

This guide comes with real experience behind it. I am a BS Pharmacy graduate and a Registered Pharmacist, and I completed my own initial registration in January 2022, about a month after my oath-taking. Funny enough, I thought that after the oath-taking, I could just walk into the nearest PRC office and get my PRC ID. That is not how it works — and that small misconception is exactly why I wanted to write this guide for you, a PRC passer. (Congrats on that, by the way!)

And if you are not YET a PRC passer: trust yourself, stay focused, and stick to your study routine. Your time will come.

**Quick answer:** Register for oath-taking on LERIS (online.prc.gov.ph) → attend your oath → book an Initial Registration appointment online → pay ₱1,050 total → go to PRC on your appointment date with your documents → claim your PRC ID. Full details below.

---

## Important: You Cannot Just Walk In

The biggest mistake new passers make (I made it myself) is assuming you can show up at any PRC office after your oath and get your ID. **Everything starts with an online appointment through LERIS.** No appointment, no transaction. Book first, then go.

The current sequence in 2026 is:

1. **Oath-taking first** — register for a slot through LERIS and attend the ceremony
2. **Initial Registration second** — book an appointment, pay, submit documents, claim your ID

---

## Requirements Checklist

Here is the official list to prepare:

- **Printed Oath Form with your personal QR code** (generated in LERIS)
- **ID pictures** — colored, plain white background, complete name tag, decent attire with a collar, taken within the last 6 months
- **Documentary stamps** (can be purchased inside PRC)
- **Short brown envelope**
- **Notice of Admission (NOA)** — for identification
- **PSA Birth Certificate** (and PSA Marriage Certificate for married women)
- **One valid government ID**
- **Payment receipt or confirmation**

**From my experience:** on the day itself, what they actually checked from me was my valid government ID and the screenshot of my system-generated registration form. But requirements can vary by office and profession, so bring the complete list above — it is always better to over-prepare than to be sent home for one missing document.

---

## Step 1: Log In to LERIS

Go to **online.prc.gov.ph** and log in with the same account you used for your board exam application. If you forgot your password, use the account recovery option — do not create a duplicate account.

New to the PRC portal? See our complete [LERIS PRC Online Guide](/blog/leris-prc-online-guide) first.

## Step 2: Register for Oath-Taking

Click **Select Transaction → Oath**. Choose your ceremony type, select your profession, and enter your **Application Number** from your NOA. The system automatically verifies that you passed, so only successful examinees can proceed.

Select your preferred PRC regional office, and the system will show the earliest available oath date.

**Print your Oath Form with the QR code.** You must bring this to the ceremony — it gets scanned to tag you as "attended."

**A note from my experience:** I took my oath online at home because it was pandemic time back then. These days, mass oath-taking has returned to face-to-face ceremonies as the norm, though online and special oath-taking options still exist for those who cannot attend. Check the PRC announcements for your profession's schedule after results are released.

**Tip:** Take your oath in the same region where you took the exam and plan to register. If you miss the mass oath-taking, you can request a special or individual oath-taking from your Professional Regulatory Board, citing your reason.

## Step 3: Attend Your Oath-Taking

Attend your scheduled ceremony, whether face-to-face or online. Bring your printed Oath Form with the QR code and a valid ID. Dress appropriately — this is a formal professional ceremony (and honestly, a milestone worth dressing up for).

## Step 4: Book Your Initial Registration Appointment

After your oath, return to LERIS: **Select Transaction → Initial Registration**. Choose your profession, enter your Application Number, then pick your PRC branch, date, and time slot.

Slot availability depends on your chosen PRC office — popular branches fill up fast, which is partly why my own registration happened a month after my oath. Book as early as you can.

## Step 5: Pay the Fees

For examinations requiring a baccalaureate degree:

| Fee | Amount |
|-----|--------|
| Initial Registration Fee | ₱600.00 |
| Professional ID Card (3 years) | ₱450.00 |
| **Total** | **₱1,050.00** |

The ₱450 covers your Professional Identification Card for three years (₱150 per year). Payment channels include GCash, Maya, LandBank Link.Biz, and partner banks. Keep your payment confirmation — you will need it.

## Step 6: Go to PRC on Your Appointment Date

Bring all your requirements. Submit your documents at the Registration Division window and sign the **Roster of Registered Professionals** — this must be done personally, as your signature in the registry is what officially makes you a registered professional. No representatives for this part.

## Step 7: Claim Your PRC ID

Release timing depends on your chosen PRC office's schedule and availability. The good news: you choose the date when you will get your official PRC ID when you book your appointment, so you know exactly when to expect it. Some offices release the ID on the appointment day itself; others schedule the claiming separately depending on volume.

For Metro Manila addresses, a delivery option is also available via WExpress for ₱180, taking up to 7 working days.

Once you are holding that ID — congratulations. You are now officially a licensed professional in the Philippines.

---

## Frequently Asked Questions

**How long before the PRC ID is released after initial registration?**
It depends on your chosen PRC office's schedule and slot availability. You select your appointment date in LERIS, and that determines when you receive your ID. In my case, the whole process from oath-taking to registration took about a month, mostly due to slot availability.

**Can I just walk into a PRC office to register?**
No. All PRC transactions require an online appointment booked through LERIS at online.prc.gov.ph. This is the most common mistake new passers make.

**How much is PRC initial registration in 2026?**
₱1,050 total for baccalaureate-degree professions: ₱600 registration fee plus ₱450 for the 3-year Professional ID Card.

**Can a representative claim my PRC ID or sign for me?**
Signing the Roster of Registered Professionals must be done personally. Claiming rules vary by transaction, but for initial registration, plan to appear personally.

**What if I missed the mass oath-taking?**
You can request a special or individual oath-taking from your Professional Regulatory Board, citing the reason you were unable to attend, or join an online oath-taking if available for your profession.

**Is the PRC ID a valid government ID?**
Yes. The PRC ID is accepted as a valid government-issued ID by banks and institutions. It is valid for 3 years and renewable during your birth month.

**Can I have my PRC ID delivered instead of picking it up?**
Yes, for Metro Manila addresses only, via WExpress for ₱180, with delivery taking up to 7 working days.

---

## What Comes Next

Your PRC ID is valid for **3 years** and must be renewed during your birth month. CPD (Continuing Professional Development) units may be required depending on your profession — check your Professional Regulatory Board's current CPD requirements before your renewal window.

And if you have a friend or kababayan still preparing for their board exam, share LisensyaPrep with them — we offer [free gamified board exam reviewers](/) for nursing, teaching, criminology, pharmacy, and more. From one board passer to the next: you got this.
`;

export default function PrcInitialRegistrationGuidePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-prc-initreg-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_HOWTO) }} />
      <Script id="schema-prc-initreg-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">PRC Initial Registration Guide</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">PRC Guide</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                PRC Initial Registration 2026: How to Get Your PRC ID After Passing
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 8, 2026</span><span>•</span>
                <span>10 min read</span>
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
