import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'LET Results March 2026 Released - Passing Rate, Topnotchers, How to Check Online',
  description:
    'LET March 2026 results released May 12, 2026. 73.10% passed Secondary, 56.03% passed Elementary. Complete passing rate breakdown, topnotchers, top performing schools, and how to check your rating online.',
  path: '/education/let-march-2026-results',
});

const SCHEMA_NEWS = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'LET Results March 2026 Philippines - Passing Rate, Topnotchers, and How to Check',
  description:
    'The PRC released the March 2026 Licensure Examination for Teachers results on May 12, 2026. 73.10 percent passed Secondary Level and 56.03 percent passed Elementary Level. Complete official statistics and how to check your rating.',
  datePublished: '2026-05-13T00:00:00+08:00',
  dateModified: '2026-05-13T00:00:00+08:00',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/education/let-march-2026-results' },
};

const SCHEMA_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When were the March 2026 LET results released?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The PRC released the March 2026 LET results on Tuesday, May 12, 2026, 37 working days after the March 15, 2026 examination.',
      },
    },
    {
      '@type': 'Question',
      name: 'What was the overall passing rate for the March 2026 LET?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '67.17 percent of all examinees passed the March 2026 LET. 63,377 out of 94,357 examinees passed across both Elementary and Secondary levels.',
      },
    },
    {
      '@type': 'Question',
      name: 'What was the Secondary Level passing rate for March 2026 LET?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Secondary Level passing rate was 73.10 percent, with 45,001 out of 61,561 examinees passing the March 2026 LET.',
      },
    },
    {
      '@type': 'Question',
      name: 'What was the Elementary Level passing rate for March 2026 LET?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Elementary Level passing rate was 56.03 percent, with 18,376 out of 32,796 examinees passing the March 2026 LET.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I check my individual LET rating online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Log in to online.prc.gov.ph (the LERIS portal) and use the Verification of Rating feature. You will see your individual subject scores and overall rating for the March 2026 LET.',
      },
    },
  ],
};

const RELATED_ARTICLES = [
  { text: 'LET Coverage 2026 Complete Subject Breakdown', href: '/education/let-coverage-2026' },
  { text: 'How to Pass the LET on Your First Take', href: '/education/how-to-pass-let-first-take' },
  { text: 'Professional Education Reviewer LET 2026', href: '/education/professional-education-reviewer' },
  { text: 'General Education Reviewer LET 2026', href: '/education/general-education-reviewer' },
  { text: 'What is the LET Complete Guide 2026', href: '/education/what-is-the-let' },
  { text: 'LET Application Guide and Passing Rate 2026', href: '/education/let-application-guide-2026' },
  { text: 'LET Passing Rate and Results 2026', href: '/education/let-passing-rate-results-2026' },
  { text: 'Top Performing Schools PRC Board Exams', href: '/blog/top-performing-schools-prc-board-exams-2025' },
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
      elements.push(
        <li key={key++} className="text-gray-300 text-sm ml-4 mb-1 flex items-start gap-2">
          <span className="text-yellow-400 mt-1 flex-shrink-0">•</span>
          <span dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
        </li>
      );
    } else if (line.match(/^\d+\. /)) {
      elements.push(
        <li key={key++} className="text-gray-300 text-sm ml-4 mb-1 flex items-start gap-2">
          <span className="text-yellow-400 mt-1 flex-shrink-0">{line.match(/^(\d+)\./)[1]}.</span>
          <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, '')) }} />
        </li>
      );
    } else if (line.startsWith('| ') && line.endsWith(' |')) {
      const cells = line.split('|').filter((c) => c.trim() && !c.match(/^[-\s]+$/));
      const isHeader = i > 0 && lines[i + 1]?.includes('---');
      if (isHeader) {
        elements.push(
          <tr key={key++} className="border-b border-white/10">
            {cells.map((cell, ci) => (
              <th key={ci} className="px-4 py-2 text-left text-yellow-400 font-semibold text-sm">{cell.trim()}</th>
            ))}
          </tr>
        );
      } else if (!line.match(/^\|[-\s|]+\|$/)) {
        elements.push(
          <tr key={key++} className="border-b border-white/5">
            {cells.map((cell, ci) => (
              <td key={ci} className="px-4 py-2 text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: formatInline(cell.trim()) }} />
            ))}
          </tr>
        );
      }
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(
        <p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    }
  }
  const wrapped = [];
  let tableBuffer = [];
  let inTable = false;
  for (const el of elements) {
    if (el.type === 'tr') {
      inTable = true;
      tableBuffer.push(el);
    } else {
      if (inTable) {
        wrapped.push(
          <div key={`tbl-${key++}`} className="overflow-x-auto my-4">
            <table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden">
              <tbody>{tableBuffer}</tbody>
            </table>
          </div>
        );
        tableBuffer = [];
        inTable = false;
      }
      wrapped.push(el);
    }
  }
  if (inTable && tableBuffer.length) {
    wrapped.push(
      <div key="tbl-final" className="overflow-x-auto my-4">
        <table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden">
          <tbody>{tableBuffer}</tbody>
        </table>
      </div>
    );
  }
  return wrapped;
}

const CONTENT = `
*By LisensyaPrep Team | Published: May 13, 2026 | 8 min read*

---

The Professional Regulation Commission (PRC) officially released the results of the **March 2026 Licensure Examination for Teachers (LET)** on **Tuesday, May 12, 2026**, just 37 working days after the exam date. This is significantly faster than the typical 40 working day release window, beating the official target date of May 15, 2026.

This page contains the complete official statistics, passing rates, topnotcher information, and step by step instructions for checking your rating online.

---

## March 2026 LET Results: The Official Numbers

The PRC and the Board for Professional Teachers (BPT) announced the following official results from the March 15, 2026 examination conducted in at least 40 testing centers nationwide.

### Combined Results (Elementary and Secondary)

**63,377 out of 94,357 examinees passed the March 2026 LET, representing an overall passing rate of 67.17 percent.**

This is one of the highest overall LET passing rates in recent years and reflects strong examinee preparation across both levels.

### Secondary Level Results

| Statistic | Number |
|-----------|--------|
| Total examinees | 61,561 |
| Total passers | **45,001** |
| **Passing rate** | **73.10 percent** |
| First-time takers who passed | 39,446 |
| Repeaters who passed | 5,555 |

### Elementary Level Results

| Statistic | Number |
|-----------|--------|
| Total examinees | 32,796 |
| Total passers | **18,376** |
| **Passing rate** | **56.03 percent** |
| First-time takers who passed | 15,670 |
| Repeaters who passed | 2,706 |

### Withheld Results

The PRC announced that **60 examinee results were withheld**: 58 examinees pending final determination of liabilities under licensure examination rules and regulations, and 2 examinees pending further verification of submitted documents.

---

## How Does This Compare to Previous LET Cycles?

The March 2026 LET shows notably improved passing rates compared to recent cycles, especially at the Secondary Level.

### Historical Passing Rate Comparison

**Secondary Level Passing Rates:**

| Exam Cycle | Passing Rate | Examinees |
|------------|-------------|-----------|
| **March 2026** | **73.10%** | 61,561 |
| September-November 2025 | 72.62% | 79,493 |
| March 2025 | 62.27% | 62,225 |
| September 2024 | 56.88% | 85,926 |

**Elementary Level Passing Rates:**

| Exam Cycle | Passing Rate | Examinees |
|------------|-------------|-----------|
| **March 2026** | **56.03%** | 32,796 |
| March 2025 | 46.77% | 34,810 |
| September 2024 | 45.51% | 44,002 |

The March 2026 cycle shows the **highest Secondary Level passing rate** in recent history and a significant **9.26 percentage point improvement** at the Elementary Level compared to March 2025.

---

## How to Check Your March 2026 LET Result

There are two main ways to verify whether you passed and to see your individual rating.

### Method 1: Check the Official PRC Passers List

The complete alphabetical roll of successful examinees was published on the official PRC website at **prc.gov.ph**. The list is organized by surname ranges and divided into Secondary Level and Elementary Level sections.

**To find your name:**

1. Visit prc.gov.ph and navigate to Board Results
2. Select March 2026 Licensure Examination for Teachers
3. Choose your level (Elementary or Secondary)
4. Find the surname range that includes your last name (for example A-B, C-D, E-F)
5. Use Ctrl+F (Windows) or Command+F (Mac) to search for your surname within the PDF

**Important:** Always verify directly through the official PRC website or LERIS portal. Avoid relying on screenshots or unofficial sources.

### Method 2: Verify Your Individual Rating Online

To see your specific score breakdown by subject, log in to the PRC online portal.

**Step by step:**

1. Visit **online.prc.gov.ph** (the official LERIS portal)
2. Log in to your account using the credentials you used during application
3. Navigate to **Verification of Rating**
4. Select March 2026 LET
5. Your individual scores per subject and overall rating will be displayed

**Information required:**
- Exam name (Licensure Examination for Teachers)
- Examination date (March 15, 2026)
- Application number
- First name and last name
- Date of birth

### What to Do If Your Name Is Not on the List

If you do not see your name in the passers list, do not panic immediately. Try these steps first:

1. **Double-check the correct surname range** - Some PDFs split surnames in unexpected places
2. **Verify your level** - Make sure you are searching the Secondary list if you took Secondary, and Elementary if you took Elementary
3. **Check Verification of Rating in LERIS** - Your individual scores will show whether you passed or not regardless of the alphabetical list
4. **Wait 48 hours** - In rare cases, the list is updated within a few days of initial release

If your scores in LERIS show below 75 percent general weighted average or any subject below 50 percent, you did not pass this cycle.

---

## March 2026 LET Topnotchers (Top 10 Passers)

The PRC typically releases the complete list of top 10 passers (topnotchers) for both Elementary and Secondary Levels alongside or shortly after the main results announcement. The topnotchers achieve the highest general weighted averages and are recognized for their exceptional performance.

**For the official March 2026 LET topnotchers:**

The complete list of top 10 passers including their names, schools, and average ratings can be viewed on the official PRC website at prc.gov.ph under the Board Results section for the March 2026 LET.

### Historical Context: Recent LET Topnotchers

For reference on what scores typically lead the LET:

**September-November 2025 LET Secondary Level top placers** achieved average ratings in the **93 to 95 percent range**.

**March 2025 LET Secondary Level top placers** had ratings in the **93 to 94 percent range**.

**September 2024 LET** saw multiple examinees tie at **94.00 percent** for the highest place, including graduates from Cebu Normal University, Mindanao State University - General Santos City, University of the Philippines - Diliman, Holy Child Central Colleges, and Kolehiyo ng Subic.

The schools that consistently produce LET topnotchers include:
- Philippine Normal University (PNU)
- University of the Philippines (UP) - Diliman
- Cebu Normal University
- Mindanao State University (various campuses)
- University of Southeastern Philippines

---

## Top Performing Schools for March 2026 LET

The PRC also releases an official list of top performing schools and a complete performance of schools report alongside the LET results. This recognizes schools whose graduates achieved high passing rates with significant examinee participation.

**Eligibility for top performing school recognition:**

To qualify as a top performing school, a university or college must have:
1. A passing rate significantly above the national average
2. A minimum number of examinees (typically at least 50 first-time takers per level)

**For the complete list of top performing schools and performance of schools for March 2026 LET**, visit the official PRC website at prc.gov.ph.

Historically, schools that consistently appear in top performing rankings include Philippine Normal University, various state universities and colleges in the regions, CHED-recognized colleges of education, and several private universities with strong teacher education programs.

For more details on Filipino schools that consistently top the boards visit our [Top Performing Schools PRC Board Exams Guide](/blog/top-performing-schools-prc-board-exams-2025).

---

## What to Do After Passing the LET

Congratulations to all 63,377 new Licensed Professional Teachers (LPTs). Here are the next steps in becoming officially registered with the PRC.

### Step 1: Register Online for Initial Registration

All successful examinees must complete online registration for the issuance of their Professional Identification Card (PRC ID) and Certificate of Registration.

**Where to register:** online.prc.gov.ph

**Requirements for initial registration:**
- Downloaded duly accomplished Oath Form (Panunumpa ng Propesyonal)
- Notice of Admission (NOA) for identification purposes
- Two (2) pieces of passport-sized ID photos with white background and complete name tag

### Step 2: Attend the Oath Taking Ceremony

PRC offers three oath taking options for new LET passers:

**Option A: Face-to-face Mass Oath Taking**
- Register online by 12:00 NN the day before the ceremony
- Print the QR-coded Oath Form
- Submit during the ceremony
- Inductees should register in the regions where they took the exam and intend to register

**Option B: Online Oath Taking (e-OATH)**
- Register at least 5 days before the scheduled date
- Select "e-OATH" as the transaction at online.prc.gov.ph
- Print and complete the Oath of Professional form
- Attend the virtual ceremony

**Option C: Special Oath Taking**
- Request directly through PRC
- Specific schedules announced once confirmed

### Step 3: Sign the Roster of Registered Professionals

After the oath taking, you must **personally register and sign in the Roster of Registered Professionals** at the PRC office. This step is required to complete your official registration as a Licensed Professional Teacher.

### Step 4: Receive Your PRC ID and Certificate of Registration

After completing all registration steps, the PRC will issue your:
- Professional Identification Card (PRC ID)
- Certificate of Registration as Licensed Professional Teacher (LPT)

These documents officially authorize you to practice the teaching profession in the Philippines.

---

## Important Reminders for New LPTs

**1. The LPT title is required by law.** Per Republic Act 7836 (Philippine Teachers Professionalization Act of 1994), passing the LET and obtaining a valid professional license are both required before practicing teaching in the Philippines. Violators may face fines and imprisonment under penal provisions.

**2. CPD compliance is required for license renewal.** Once registered, you must complete Continuing Professional Development (CPD) units to maintain and renew your PRC license every 3 years.

**3. Your eligibility opens many career paths.** Beyond traditional teaching, your LPT credential qualifies you for:
- DepEd public school teaching positions
- Private school teaching
- International schools in the Philippines
- Overseas teaching opportunities (US, Singapore, Vietnam, Thailand, Middle East)
- Tutoring and educational consultancy
- Curriculum development roles

---

## For LET Examinees Who Did Not Pass

If you did not pass the March 2026 LET, you are not alone. Of the 31,000+ examinees who did not pass this cycle, many will successfully pass on their next attempt with focused preparation.

### Immediate Next Steps

**1. Review your subject scores in LERIS.** Your individual subject ratings will tell you exactly where you fell short. Common patterns:
- Below 75 percent overall but no subject below 50: focus on raising your weakest subjects
- One subject below 50: that subject becomes your absolute priority
- All subjects mediocre: you need a more comprehensive review approach

**2. Plan your retake strategy.** The next regular LET will be in **September 2026** (results from this cycle would be released around November).

**3. Switch your review approach.** If you used a particular reviewer or method and did not pass, consider switching to a different approach for your next attempt.

### Free LET Practice at LisensyaPrep

LisensyaPrep has free practice questions for all LET components including Professional Education, General Education, and all major Field of Specialization subjects (English, Math, Filipino, Social Studies, Science, MAPEH, TLE). No registration required.

**[Start Your LET Practice at LisensyaPrep](/education)**

---

## March 2026 LET Coverage Summary

For reference, the March 2026 LET covered the following content areas:

**Elementary Level (2 components):**
- Professional Education: 60 percent weight
- General Education: 40 percent weight

**Secondary Level (3 components):**
- Professional Education: 40 percent weight
- General Education: 20 percent weight
- Field of Specialization (your major): 40 percent weight

**Passing requirements:**
- General weighted average of at least 75 percent
- No individual component rating below 50 percent

For a detailed breakdown visit our [LET Coverage 2026 Complete Subject Breakdown](/education/let-coverage-2026).

---

## Frequently Asked Questions

**When were the March 2026 LET results released?**
The PRC released the March 2026 LET results on **Tuesday, May 12, 2026**, 37 working days after the March 15, 2026 examination.

**What was the overall passing rate for the March 2026 LET?**
**67.17 percent** of all examinees passed (63,377 out of 94,357 examinees).

**What was the Secondary Level passing rate?**
**73.10 percent** (45,001 out of 61,561 examinees passed).

**What was the Elementary Level passing rate?**
**56.03 percent** (18,376 out of 32,796 examinees passed).

**How do I check my individual LET rating?**
Log in to **online.prc.gov.ph** (LERIS) and use the Verification of Rating feature. You will see your individual subject scores and overall rating.

**Where can I see the complete list of passers?**
The official alphabetical roll of successful examinees is published at **prc.gov.ph** under Board Results for the March 2026 LET. Choose your level (Elementary or Secondary) and find the surname range that includes your last name.

**When is the next LET examination?**
The next regular LET is scheduled for **September 2026**. Visit prc.gov.ph for the exact dates and application windows.

**Do I have to attend oath taking in the same region where I took the exam?**
Yes, for face-to-face oath taking. Inductees are advised to register and confirm their attendance in the regions where they took their licensure examination and intend to register as professionals.

**Can I start teaching immediately after my name appears in the passers list?**
No. You must complete the full registration process (oath taking, signing the Roster of Registered Professionals, and receiving your PRC ID) before you can legally practice the teaching profession in the Philippines.

---

## Congratulations to All March 2026 LET Passers

To all 63,377 newly Licensed Professional Teachers, congratulations on this milestone achievement. Your hard work, dedication, and preparation paid off. Welcome to a profession that shapes the future of the Philippines.

For those preparing for upcoming LET cycles or other PRC board exams, LisensyaPrep has free practice questions for all major Philippine board exams.
`;

export default function LETMarch2026ResultsPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-let-march-2026-news" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_NEWS) }} />
      <Script id="schema-let-march-2026-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">LET Results March 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400">
                Education (LET)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                LET Results March 2026 Philippines: Passing Rate, Topnotchers, and How to Check
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>May 13, 2026</span>
                <span>•</span>
                <span>8 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(CONTENT)}
            </div>

            <AdPlaceholder slot="banner" className="my-6" />

            <div className="mt-10 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Prepare for the Next LET</p>
              <p className="text-gray-400 text-sm mb-4">
                Free practice questions for all LET components. No registration required.
              </p>
              <Link
                href="/education"
                className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Start LET Practice at LisensyaPrep →
              </Link>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">Related LET Articles</h2>
              <ul className="space-y-3">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">LET Study Guides</h3>
              <div className="space-y-4">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <Link key={href} href={href} className="group block">
                    <p className="text-gray-300 text-sm group-hover:text-yellow-400 transition-colors leading-snug">
                      {text}
                    </p>
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
