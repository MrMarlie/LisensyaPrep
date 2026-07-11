import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'Pharmacist First Job Guide Philippines 2026 (Honest RPh Career Paths)',
  description:
    'Where should a new pharmacist work? Honest guide from a real RPh - community, hospital, industry, government, abroad, and business paths, with the salary talk nobody gives fresh board passers.',
  path: '/pharmacy/pharmacist-first-job-philippines',
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Where do most new pharmacists work first in the Philippines?","acceptedAnswer":{"@type":"Answer","text":"Community and retail pharmacy, the widest and fastest-hiring path since every drugstore branch legally requires a pharmacist. Many RPhs use it as a launchpad toward industry, government, abroad, or business ownership."}},{"@type":"Question","name":"Do pharmacists need the Civil Service Exam for government jobs?","acceptedAnswer":{"@type":"Answer","text":"No. Under RA 1080, passing the Pharmacy board examination confers civil service eligibility for government positions."}},{"@type":"Question","name":"Can pharmacists open their own drugstore in the Philippines?","acceptedAnswer":{"@type":"Answer","text":"Yes. A licensed pharmacist can legally establish and operate a pharmacy, subject to capital requirements and FDA licensing."}}]}`;

const RELATED_ARTICLES = [
  { text: 'What to Do After Passing the Board Exam Philippines', href: '/blog/after-passing-board-exam-philippines' },
  { text: 'Government Jobs with Civil Service Eligibility', href: '/civil-service/government-jobs-cse-eligibility' },
  { text: 'PLE Coverage 2026', href: '/pharmacy/ple-coverage-2026' },
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
Let me start with my own story, because it is not the tidy one they describe in school.

I am a Registered Pharmacist. After passing the board exam, I resigned from my hospital job — and instead of climbing the usual local ladder, I flew to Dubai to try my luck there. I landed a job in **retail pharmacy abroad**, worked it for about a year, then came back home. My first job back in the Philippines was in **community pharmacy**.

If that zigzag tells you anything, it is this: **being a licensed professional in the Philippines genuinely lands you a lot of options.** The RPh license is a master key. But — and this is the part nobody says out loud during oath-taking — the doors it opens do not all lead to the same salary. Some of them, honestly, pay far less than the license deserves. This guide walks through every path with that honesty intact.

---

## The Paths Open to a New RPh

### 1. Community / Retail Pharmacy — The Widest Door

Drugstore chains and independent pharmacies are where most new RPhs start, for a simple reason: **the jobs are everywhere and they hire continuously.** Every drugstore branch legally requires a pharmacist, so demand is structural.

**The work:** dispensing, patient counseling, inventory and expiry management, regulatory compliance, and a lot of retail operations reality (sales targets exist).

**The honest part:** entry-level pay in community pharmacy is widely considered modest relative to how hard that board exam was. I have lived this path — it is honorable, stable, skill-building work, and it is also the path many RPhs eventually outgrow financially. Treat it as a **launchpad**: real licensed experience that qualifies you for everything else on this list.

**How to apply:** major chains hire through their careers pages and walk-in HR; bring your PRC license, board rating, TOR, and NBI clearance. Hiring is typically fast — often the fastest of any path.

### 2. Hospital Pharmacy — The Clinical Track

Institutional pharmacy: medication management, IV admixture, clinical rounds support, and closer collaboration with doctors and nurses.

**The honest part:** slots are fewer than retail, competition is real, and compensation in many institutions is likewise modest at entry. What hospital pharmacy pays you in is **clinical depth** — the experience currency for specialization, government items, and abroad applications.

### 3. Pharmaceutical Industry — The Higher Ceiling

This is where the salary conversation changes. Pharma companies hire RPhs as:

- **Professional Medical Representatives** (field-based, allowances + incentives can outpace store-based pay quickly)
- **Quality Assurance / Quality Control** in manufacturing
- **Regulatory Affairs** (FDA submissions, compliance — a specialty that compounds in value)
- **Production and R&D roles**

Industry hiring is more competitive and slower than retail, but the growth curve is fundamentally different. If your priority is earnings trajectory, aim your applications here early — you do not need retail experience first, though it never hurts.

### 4. Government — The Stable Track

FDA, DOH, and government hospital pharmacy items offer Salary Grade pay, GSIS, and security of tenure. And remember: **under RA 1080, your board passing is already your civil service eligibility** — no CSE needed. Watch the CSC job portal and agency postings; competition per item is stiff, but the items are real. ([How government hiring works](/civil-service/government-jobs-cse-eligibility))

### 5. Abroad — The Path I Actually Took

Filipino pharmacists work worldwide, and the Gulf is the most common first stop — it is where I went. My honest reflections from the Dubai chapter:

- **Retail pharmacy abroad pays multiples of the local equivalent** for substantially similar work
- Each country (and in the UAE, even each licensing authority) has its **own credentialing exams and document verification requirements** — research your target market's current process specifically before spending on applications
- The experience — professional and personal — was worth the leap even though I ultimately came home

Abroad is not an escape hatch; it is a legitimate career strategy that many RPhs run for a few years to build savings before returning to better local positions or their own ventures.

### 6. Your Own Pharmacy — The Owner's Path

The endgame many RPhs quietly aim for: as a licensed pharmacist, **you are legally qualified to establish and run your own drugstore.** Capital, location, and FDA licensing requirements make this a later-career move for most — but it is the path where the license stops earning a salary and starts earning a business.

### 7. Beyond the Counter

Academe (with graduate studies), clinical research organizations, health-tech, medical writing, and — speaking from experience — building something of your own in the health-education space. The license is a credibility asset far beyond dispensing.

---

## The Section I Wish Someone Wrote for Me: Choose With Your Bills in Mind

Here is my most honest advice, the thing I would tell my fresh-passer self:

**Choose the right path early — the one that realistically gets you the salary that feeds you and pays your bills.**

That sounds obvious. It is not. Fresh passers are told to "gain experience first" and "be patient," and there is truth in that — but patience does not pay rent, and some paths' ceilings are simply low no matter how patient you are. I eventually stepped away from the traditional store-and-hospital track precisely because the compensation could not justify staying.

So be deliberate:

- **Money-first?** Aim at industry, abroad, or government items from day one — do not default into the nearest drugstore just because it said yes first
- **Clinical passion?** Hospital pharmacy, eyes open about the pay, building toward specialization or abroad credentials
- **Long game?** Every path above can fund the owner's path eventually — but the higher-paying ones fund it faster

There is no shame in any choice on this list. The only mistake is drifting into one by default and discovering the ceiling five years in.

---

## Application Essentials (All Paths)

- **PRC RPh license** ([registration guide](/blog/prc-initial-registration-guide)) and Certificate of Rating
- TOR, diploma, PSA birth certificate, NBI clearance, valid IDs
- Updated resume — license number up top; for industry, highlight thesis/research and communication skills; for hospital, clinical rotation depth
- For government: **PDS (CS Form 212, Rev. 2017)** and the posted vacancy's requirements

---

## Frequently Asked Questions

**Where do most new pharmacists work first?**
Community/retail pharmacy — the widest and fastest-hiring door. Many use it as a launchpad toward industry, government, abroad, or business.

**Is pharmacist pay in the Philippines really low?**
Entry-level pay in community and hospital settings is widely considered modest relative to the license. Industry roles, government items, abroad positions, and pharmacy ownership carry substantially higher ceilings.

**Can a new RPh work abroad immediately?**
Possible, but each destination has its own credentialing exams and verification requirements — research your specific target market's current process. Local licensed experience generally strengthens applications.

**Do pharmacists need the Civil Service Exam for government jobs?**
No — board passing confers eligibility under RA 1080.

**Can pharmacists open their own drugstore?**
Yes. A licensed pharmacist can legally establish and operate a pharmacy, subject to capital and FDA licensing requirements.

---

## For Those Still on the Board Exam Road

Everything above starts with three letters: RPh. If you or someone you know is still preparing for the Pharmacy Licensure Examination, LisensyaPrep has a [free gamified PLE reviewer](/pharmacy/) — built by a pharmacist who has walked every step of this article. Kaya mo yan.
`;

export default function PharmacistFirstJobPage() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: '/pharmacy', name: 'Pharmacy' }, { url: '/pharmacy/pharmacist-first-job-philippines', name: 'Pharmacist First Job Guide' }]} />
      <Script id="schema-rph-first-job-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/pharmacy" className="text-gray-500 hover:text-gray-300 transition-colors">Pharmacy</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Pharmacist First Job Guide</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">Pharmacy (PLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Pharmacist First Job Guide Philippines 2026: Honest Career Paths from a Real RPh
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 20, 2026</span><span>•</span>
                <span>10 min read</span>
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

            <div className="mt-8 bg-gradient-to-br from-purple-900/20 to-purple-900/10 border border-purple-500/30 rounded-2xl p-6 text-center">
              <p className="text-purple-400 font-extrabold text-lg mb-2">Still Preparing for the PLE?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified Pharmacy board reviewer built by a real RPh. No account required.</p>
              <Link href="/pharmacy" className="inline-block bg-purple-500 hover:bg-purple-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
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
