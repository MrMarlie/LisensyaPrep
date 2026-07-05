import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'LERIS PRC Online 2026: Login, Register & Book Appointment (Complete Guide)',
  description:
    'Log in and register on LERIS (online.prc.gov.ph) step by step: create your PRC account, book your board exam appointment, renew your license, and fix common LERIS login errors. Complete 2026 guide.',
  path: '/blog/leris-prc-online-guide',
});

const SCHEMA_HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Register and Book a PRC Appointment on LERIS',
  description:
    'Step-by-step guide to creating a LERIS account, logging in, and booking a PRC appointment for board exam application or license renewal.',
  step: [
    { '@type': 'HowToStep', name: 'Visit LERIS', text: 'Go to online.prc.gov.ph using an updated browser' },
    { '@type': 'HowToStep', name: 'Accept Terms', text: 'Read and accept the terms and conditions' },
    { '@type': 'HowToStep', name: 'Register', text: 'Enter your details and create your account with a secure password' },
    { '@type': 'HowToStep', name: 'Complete Profile', text: 'Fill in all personal information until your profile is 100% complete' },
    { '@type': 'HowToStep', name: 'Upload Photo', text: 'Upload a compliant 2x2 digital photo' },
    { '@type': 'HowToStep', name: 'Select Transaction', text: 'Choose Examination, Renewal, or Registration' },
    { '@type': 'HowToStep', name: 'Book Appointment', text: 'Select your PRC office, date, and time' },
    { '@type': 'HowToStep', name: 'Pay and Print', text: 'Pay the fee, wait for confirmation, and print your application form' },
  ],
  author: { '@type': 'Organization', name: 'LisensyaPrep Team' },
  publisher: { '@type': 'Organization', name: 'LisensyaPrep' },
  datePublished: '2026-06-01',
};

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is LERIS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LERIS stands for Licensure Examination and Registration Information System. It is the official online platform of the Professional Regulation Commission (PRC) for board exam applications, registration, renewals, and verification, accessible at online.prc.gov.ph.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the LERIS website address?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The official LERIS portal is online.prc.gov.ph. The old system at www.prc-online.com is no longer active. You must register a new account at the current portal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an appointment to renew my PRC license?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All PRC transactions, including renewals, now require an online appointment booked through LERIS.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does payment confirmation take on LERIS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Usually within 24 hours. Keep your receipt and refresh your dashboard. Contact PRC support if it remains pending past the stated time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I reschedule my PRC appointment on LERIS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If the Reschedule button appears in your transaction, pick a new slot. If it does not appear, cancel and rebook when the next batch of slots opens, before making payment.',
      },
    },
  ],
};

const ALL_PRC_ARTICLES = [
  { text: 'LERIS PRC Online Guide 2026', href: '/blog/leris-prc-online-guide' },
  { text: 'PNLE Application Guide 2026', href: '/nursing/pnle-application-guide-2026' },
  { text: 'LET Application Guide 2026', href: '/education/let-application-guide-2026' },
  { text: 'CLE Application Guide 2026', href: '/criminology/cle-application-guide-2026' },
  { text: 'Complete PRC Board Exam Schedule 2026', href: '/blog/prc-board-exam-schedule-2026-all-professions' },
  { text: 'What is the PNLE? Complete Guide 2026', href: '/nursing/what-is-the-pnle' },
];

function formatInline(text) {
  return text
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]*)\)/g,
      (_, t, url) =>
        `<a href="${url}"${url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''} class="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">${t}</a>`
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em class="text-gray-400 italic">$1</em>');
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
  let inList = false;
  for (const el of elements) {
    if (el.type === 'li') {
      inList = true;
      listBuffer.push(el);
    } else {
      if (inList) {
        wrapped.push(<ul key={`ul-${key++}`} className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>);
        listBuffer = [];
        inList = false;
      }
      wrapped.push(el);
    }
  }
  if (inList && listBuffer.length) wrapped.push(<ul key="ul-final" className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>);
  return wrapped;
}

const MAIN_CONTENT = `
If you are taking a Philippine board exam or renewing your professional license, you will use **LERIS**, the PRC's online portal. Whether you are a nursing graduate applying for the PNLE, a teacher applying for the LET, or a licensed professional renewing your ID, every transaction now begins at the LERIS website.

This guide explains exactly what LERIS is, how to create an account, how to log in, and how to book your PRC appointment step by step.

---

## What is LERIS?

**LERIS stands for Licensure Examination and Registration Information System.** It is the official online platform of the **Professional Regulation Commission (PRC)** for managing licensure examination applications, registration, renewals, and verification.

Through LERIS, every professional in the Philippines, from nurses to engineers to teachers, can process transactions online using a computer or mobile phone without lining up at a PRC office for the initial steps.

The official LERIS website is **online.prc.gov.ph**.

**Important note:** If you had an account with the old system at www.prc-online.com, that account is no longer active. You must register a new account at the current LERIS portal.

---

## What Can You Do on LERIS?

LERIS handles nearly all PRC transactions:

- **Examination application** - Apply for board exams (PNLE, LET, CLE, and others)
- **Initial registration** - Register as a new professional after passing a board exam
- **License renewal** - Renew your Professional Identification Card (PIC)
- **Certifications** - Request certificates of registration, ratings, and good standing
- **Authentication** - Authenticate documents
- **Name or status change** - Update records after marriage or correction
- **Lost or damaged ID** - Request a replacement
- **License verification** - Verify professional registration

**Important:** All PRC transactions now require an online appointment, even renewals.

---

## Requirements Before You Register

Prepare these before creating your LERIS account to avoid delays:

**1. A valid email address** - Use your personal, official email. Do not create duplicate accounts.

**2. A digital 2x2 ID photo** - Recent photo in JPG format, plain white background, decent attire with a collar. LERIS will reject poor-quality photos, and a wrong photo can cause penalties on exam day.

**3. Personal information** - Have your details ready exactly as they appear on your school records and valid ID.

**4. An updated browser** - Use a current version of Google Chrome or Microsoft Edge.

**5. Valid ID** - For matching your records and bringing to your appointment.

---

## How to Create a LERIS Account (Step by Step)

### Step 1: Visit the LERIS Website

Go to **online.prc.gov.ph** using an updated browser.

### Step 2: Read and Accept the Terms

Read the terms and conditions on the screen. Scroll to the bottom and click the green **I AGREE** button.

### Step 3: Enter Your Registration Details

Click **Register**. Enter your details exactly as printed on your valid ID and school records. Your password must be at least 6 characters long and include at least 1 letter, 1 number, and 1 special character.

Click the **REGISTER** button when finished.

### Step 4: Complete Your Personal Information

On the next page, enter or edit your personal information, including:

- Permanent mailing address
- Mother's maiden name and citizenship
- Name of school
- Degree or course
- Date of graduation

**Your profile must be 100% complete before you can apply for an exam.**

### Step 5: Upload Your Photo

Upload your digital 2x2 photo following the format requirements (JPG, white background, collared attire).

---

## How to Log In to LERIS

Once you have an account:

1. Go to **online.prc.gov.ph**
2. Enter your registered email and password
3. Click **Log In**
4. You will see your dashboard with options to select a transaction

If you forget your password, use the password recovery option on the login page, or contact PRC's Licensure Exam Division for help with resetting your password.

---

## How to Book a PRC Appointment for Board Exam Application

After logging in with a complete profile:

### Step 1: Select Transaction

Click **Select Transaction** from the left menu.

### Step 2: Choose Examination

Choose **Examination** as your transaction type.

### Step 3: Select Your Exam

Choose the specific board exam you are applying for (such as Nurse Licensure Examination, Licensure Examination for Teachers, or Criminologist Licensure Examination).

### Step 4: Pick Your PRC Office and Schedule

Select your preferred PRC branch, date, and time. LERIS will show available schedules.

**Tips:**

- Choose a PRC branch close to your residence
- Morning slots fill up fastest
- Popular exams (teachers, nursing, civil engineering) fill quickly, so book early
- New slots open in batches, so check again if your preferred date is full

### Step 5: Get Your Reference Number

After selecting a schedule, LERIS generates a **Reference Number** for payment.

### Step 6: Pay the Fee

Pay the required fee through the available payment channels. After payment, wait approximately 24 hours for confirmation to appear in your account.

### Step 7: Print Your Application Form

Once payment is confirmed, print your PRC Application Form. Bring this document along with your other requirements and valid IDs to your scheduled appointment at the PRC office for document verification.

---

## How to Renew Your PRC License Online

Renewal also goes through LERIS:

1. Log in to your LERIS account
2. Click **Select Transaction**
3. Choose **Renewal**
4. Complete the renewal information
5. Select your PRC office, date, and time (appointments are required even for renewals)
6. Pay the renewal fee
7. Print your renewal slip and bring it to your appointment

**Note on CPD:** Continuing Professional Development units are generally required for renewal, though PRC allows renewals without full CPD compliance in certain cases. Check the current CPD requirements for your profession.

---

## Common LERIS Problems and How to Fix Them

### "No Record Found"

Match your name and birthdate exactly to your valid ID. If you accidentally created a second account, contact PRC support to merge or deactivate the duplicate account.

### Fully Booked Office

Try another date or another PRC office. New slots appear in batches, so check back regularly.

### Payment Pending

Wait a few minutes, then refresh your dashboard. Keep your payment receipt. If the pending status remains past the stated time, contact PRC support with your reference number and a screenshot of your payment.

### Forgot Password

Use the password reset option on the login page. For persistent login problems or mismatched records, email PRC's Licensure Examination Division.

### Photo Rejected

Ensure your photo is in JPG format, has a plain white background, and shows you in decent collared attire. Re-upload a compliant photo.

---

## Important Reminders for Exam Applicants

- **Profile must be 100% complete** before you can apply for an exam
- **Print your application form** and bring it on your appointment date
- **Arrive at least 15 minutes early** for your appointment
- **Bring valid IDs** for document verification
- **Some services do not allow representatives** - check the note in your transaction
- **Use the same name format** as your school records to avoid mismatches

---

## What Comes After Your Board Exam

Once you pass your board exam, you return to LERIS for **Initial Registration** to receive your PRC ID and Certificate of Registration. You can also complete oath-taking through LERIS for some professions (keep your camera on, use your registered name, and have a valid ID ready for online oath).

---

## Prepare for Your Board Exam with LisensyaPrep

While you handle your LERIS application, start reviewing for your board exam. LisensyaPrep offers **free gamified board exam reviewers** for nursing (PNLE), teaching (LET), criminology (CLE), pharmacy, medical technology, agriculture, and the Civil Service Exam.

**[Start Your Free Board Exam Review at LisensyaPrep](https://lisensyaprep.com/)**

---

## Frequently Asked Questions

**What is the LERIS website address?**
The official LERIS portal is online.prc.gov.ph. Be careful of unofficial lookalike sites.

**Is my old prc-online.com account still active?**
No. The old system at www.prc-online.com is no longer active. You must register a new account at online.prc.gov.ph.

**Do I need an appointment to renew my license?**
Yes. All PRC transactions, including renewals, now require an online appointment.

**Can someone else process my transaction for me?**
Some services do not allow representatives. Check the note in your specific transaction. Examinations typically require your personal appearance.

**How long does payment confirmation take?**
Usually within 24 hours. Keep your receipt and refresh your dashboard. Contact PRC support if it remains pending past the stated time.

**What if I created two LERIS accounts by mistake?**
Contact PRC support to merge or deactivate the duplicate so all your records stay under one account.

**Can I reschedule my appointment?**
If the Reschedule button appears in your transaction, pick a new slot. If it does not appear, cancel and rebook when the next batch of slots opens (before making payment).

---

## Related Articles

- [What is the PNLE? Complete Guide for Nursing Graduates](/nursing/what-is-the-pnle)
- [PNLE Application Guide 2026](/nursing/pnle-application-guide-2026)
- [LET Application Guide 2026](/education/let-application-guide-2026)
- [CLE Application Guide 2026](/criminology/cle-application-guide-2026)
- [Complete PRC Board Exam Schedule 2026](/blog/prc-board-exam-schedule-2026-all-professions)
`;

export default function LerisGuide2026Page() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-leris-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_HOWTO) }} />
      <Script id="schema-leris-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">LERIS PRC Online Guide</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400">PRC Guide</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                LERIS PRC Online 2026: Login, Register &amp; Book Your PRC Appointment (Complete Guide)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>June 1, 2026</span><span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">Related PRC Guides</h2>
              <ul className="space-y-3">
                {ALL_PRC_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 border border-yellow-500/30 rounded-2xl p-6 text-center">
              <p className="text-yellow-400 font-extrabold text-lg mb-2">Start Your Board Exam Review</p>
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
                {ALL_PRC_ARTICLES.map(({ text, href }) => (
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
