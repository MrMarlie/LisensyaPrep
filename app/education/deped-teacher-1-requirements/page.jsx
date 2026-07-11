import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'DepEd Teacher 1 Requirements 2026 - Complete Document Checklist',
  description:
    'Complete DepEd Teacher 1 application requirements checklist for 2026 - letter of intent, PDS CS Form 212, PRC license, certificates, and division-specific rules. Avoid the mistakes that get folders rejected.',
  path: '/education/deped-teacher-1-requirements',
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What PDS version does DepEd require for Teacher 1 applications?","acceptedAnswer":{"@type":"Answer","text":"CS Form No. 212, Revised 2017, completely filled out with the Work Experience Sheet attached if you have work history."}},{"@type":"Question","name":"Do training certificates older than five years count in DepEd ranking?","acceptedAnswer":{"@type":"Answer","text":"No. Under DO 7, s. 2023, only relevant training acquired in the last five years earns points, computed based on training hours."}},{"@type":"Question","name":"What do carry-over RQA applicants need to submit?","acceptedAnswer":{"@type":"Answer","text":"Under DO 21, s. 2024: an application letter stating their intent, PDS, checklist of requirements, and only the updated documents. Applicants retaining all previous scores state that intent in their letter."}}]}`;

const RELATED_ARTICLES = [
  { text: 'DepEd Teacher 1 Ranking Guide 2026', href: '/education/deped-teacher-1-ranking-guide' },
  { text: 'What to Do After Passing the LET', href: '/education/after-passing-let-next-steps' },
  { text: 'PRC ID Renewal and CPD Guide', href: '/blog/prc-id-renewal-cpd-guide' },
  { text: 'PRC Initial Registration Guide', href: '/blog/prc-initial-registration-guide' },
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
Every ranking season, applicants lose points — or lose their slot entirely — not because they lack qualifications, but because of a **folder problem**: a missing photocopy, an outdated PDS form, a certificate that never got requested from a previous employer. The ranking evaluates what is *in your folder*, not what you have somewhere at home.

This is the complete document checklist for the **2026 DepEd Teacher 1 application** under DepEd Order No. 7, s. 2023, plus the preparation mistakes that trip up applicants every cycle.

**Companion guide:** for the full points system, process, and RQA explanation, read our [DepEd Teacher 1 Ranking Guide](/education/deped-teacher-1-ranking-guide) first. This article is the document-preparation half.

---

## The Core Requirements (DO 7, s. 2023)

### 1. Letter of Intent / Application Letter

Addressed to the Head of Office or the designated HR officer — **check your division's Call for Applications for the exact addressee and position title**. Getting the addressee wrong is a sloppy first impression on page one of your folder.

Include: the position and level you are applying for (Kindergarten, Elementary, JHS, or SHS with your specialization), and — if you are a carry-over applicant under DO 21, s. 2024 — your explicit intent to **retain your previous scores or update specific credentials**.

### 2. Personal Data Sheet (CS Form No. 212, Revised 2017)

The single most botched requirement. Common errors:

- Using an **old version** of the form — it must be the **Revised 2017** edition (download fresh from the CSC website; do not reuse a years-old file from a friend)
- Leaving items blank instead of writing "N/A"
- Missing the **Work Experience Sheet** attachment when you have experience
- Unsigned, or missing the photo and thumbmark where required

Fill it out completely, honestly, and legibly. The PDS is a sworn document — inconsistencies with your supporting papers create problems later.

### 3. Photocopy of Valid PRC License/ID

Your license must be **current**. If your PRC ID is nearing expiry, renew before applying — see our [PRC Renewal Guide](/blog/prc-id-renewal-cpd-guide). New passers whose physical ID is still in process should check their division's memo for whether proof of registration is accepted meanwhile.

### 4. Photocopy of Certificate of Rating (LET/PBET/LEPT)

Your board rating converts to up to 10 ranking points, so this document is not a formality. Lost yours? Request a **certification of rating** through LERIS/PRC before the application window — processing takes time.

### 5. Transcript of Records and Diploma

Include certificates of completed **graduate and post-graduate units or degrees** if you have them — these earn Education points. Master's units sitting unreported in your drawer are ranking points thrown away.

### 6. Certificates of Training

Only training from the **last five years** earns points, and it must be relevant (curriculum and instruction, or specialized training related to the position; for SHS, training relevant to your strand). Arrange them newest-first and make sure each certificate shows the **number of hours** — hours are what get counted.

### 7. Certificates of Employment / Service Records

For applicants with teaching experience — **private school experience counts**, so request a Certificate of Employment from every school you taught at, stating inclusive dates and position. Former employers can be slow; request these weeks before the application window, not the night before.

### 8. Performance Ratings (if applicable)

For applicants with prior government service or where the division requires it — typically your most recent performance review from a previous teaching engagement.

---

## Division-Specific Extras (Read the Memo!)

DO 7, s. 2023 sets the core list, but **each Schools Division Office adds its own logistics** in its Call for Applications. Real examples from actual division memoranda: specific **folder colors with tabbing** requirements, prescribed document order, dress codes for submission day, and omnibus certifications of document authenticity.

The rule is simple: **your division's memorandum is the final word.** Download it, print it, and check off every line. An applicant who follows the memo exactly signals the kind of attention to detail schools want in a teacher.

---

## Smart Preparation Tips

**Prepare originals AND photocopies.** Photocopies go in the folder; originals come with you for verification on submission day.

**Secure PSA documents early.** Some divisions require PSA birth certificates (and marriage certificates for married women applicants). PSA delivery takes days to weeks.

**Make a personal master file.** Scan every document — license, rating, TOR, every training certificate — into one cloud folder now. Under DO 21, s. 2024, next year's update only needs your *new* documents, and a maintained file makes annual updating a 30-minute task instead of a scramble.

**Carry-over applicants submit less.** If you were in a previous CAR-RQA and choose to update, you only need: application letter, PDS, checklist of requirements, and the **updated documents** (new certificates, new experience). If retaining all scores, state it in your letter.

**Never pay anyone.** No fee, no fixer, no recommendation letter earns a single point. The Open Ranking System lets you witness your own paper evaluation.

---

## Quick Checklist (Print This)

- ☐ Letter of intent (correct addressee, position, level; carry-over intent if applicable)
- ☐ PDS — CS Form 212, **Revised 2017**, complete + Work Experience Sheet
- ☐ Photocopy of valid PRC License/ID (renewed if near expiry)
- ☐ Photocopy of Certificate of Rating
- ☐ TOR and Diploma (+ graduate units/degree certificates)
- ☐ Training certificates (last 5 years, hours indicated, relevant)
- ☐ Certificates of Employment / service records
- ☐ Performance ratings (if applicable)
- ☐ Division-specific items per your SDO's memo (folder, tabs, order, PSA documents)
- ☐ Originals on hand for verification

---

## Frequently Asked Questions

**What PDS version does DepEd require?**
CS Form No. 212, Revised 2017, with the Work Experience Sheet if you have work history. Download it fresh from the CSC website.

**Do training certificates older than five years count?**
No — DO 7, s. 2023 credits relevant training acquired in the last five years, with points based on hours.

**Does private school experience need documentation?**
Yes. Request Certificates of Employment showing inclusive dates and position from each school — undocumented experience earns zero points.

**I'm a carry-over applicant from last year's RQA. What do I submit?**
Under DO 21, s. 2024: application letter (stating your intent), PDS, checklist, and only your updated documents. If retaining all scores, say so in your letter.

**My PRC ID is still being processed. Can I apply?**
Check your division's memo — many accept proof of registration in process for new passers, but the policy is division-specific.

**Where do I submit my folder?**
To the Schools Division Office named in the Call for Applications, within the stated window. Hiring is decentralized — there is no central DepEd application portal.

---

## Next Steps

Documents ready? Now win where the points actually are — the demo teaching (35 points) and Teacher Reflection Form (25 points). Full strategy: [DepEd Teacher 1 Ranking Guide 2026](/education/deped-teacher-1-ranking-guide).

Still preparing for the LET? Your board rating is worth 10 ranking points — [review free at LisensyaPrep](/education/).
`;

export default function DepEdRequirementsPage() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: '/education', name: 'Education' }, { url: '/education/deped-teacher-1-requirements', name: 'DepEd Teacher 1 Requirements' }]} />
      <Script id="schema-deped-req-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">DepEd Teacher 1 Requirements</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">Education (LET)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                DepEd Teacher 1 Requirements 2026: Complete Document Checklist
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 16, 2026</span><span>•</span>
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

            <div className="mt-8 bg-gradient-to-br from-violet-900/20 to-violet-900/10 border border-violet-500/30 rounded-2xl p-6 text-center">
              <p className="text-violet-400 font-extrabold text-lg mb-2">Still Reviewing for the LET?</p>
              <p className="text-gray-400 text-sm mb-4">Your LET rating is worth 10 ranking points. Free gamified General Education and Professional Education reviewers. No account required.</p>
              <Link href="/education" className="inline-block bg-violet-500 hover:bg-violet-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
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
