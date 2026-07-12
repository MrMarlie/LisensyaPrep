import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "NAPOLCOM PNP Entrance Exam 2026 - Schedule & Who Can Skip It",
  description: "NAPOLCOM PNP Entrance Exam guide 2026 - schedule, requirements, coverage, passing score, and the RA 11131 rule that lets Registered Criminologists skip the exam entirely.",
  path: "/criminology/napolcom-exam-schedule-guide",
});

const SCHEMA_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do Registered Criminologists need to take the NAPOLCOM PNP Entrance Exam?","acceptedAnswer":{"@type":"Answer","text":"No. Under RA 6506 as amended by RA 11131, the criminologist license itself serves as eligibility for PNP entry, so Registered Criminologists skip the NAPOLCOM exam entirely."}},{"@type":"Question","name":"Who should take the NAPOLCOM PNP Entrance Exam?","acceptedAnswer":{"@type":"Answer","text":"College graduates of any course who want to join the PNP but do not hold an accepted eligibility such as a board license, bar membership, or Civil Service Professional eligibility."}}]};

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
      if (line.match(/^\|[-\s|]+\|$/)) continue;
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
Before you spend months preparing for the NAPOLCOM PNP Entrance Examination, read the first section of this guide — because a large share of the people searching for it **do not need to take it at all.**

## First: Do You Even Need This Exam?

The PNP Entrance Exam exists to grant **eligibility for appointment as Patrolman/Patrolwoman**. But eligibility has multiple doors:

- **Registered Criminologists — you already hold eligibility.** Under RA 6506 as amended by **RA 11131**, the criminologist license itself is your PNP entry eligibility. Skip NAPOLCOM entirely and go straight to [the CORPS application](https://lisensyaprep.com/criminology/how-to-join-pnp-criminologist)
- **Board/bar passers (RA 1080)** and **Civil Service Professional** eligibles — accepted eligibilities as well
- **Everyone else** — a college graduate without any of the above needs the NAPOLCOM exam. That is who this guide serves

## The Schedule

NAPOLCOM has historically administered the PNP Entrance Examination (alongside promotional exams) in periodic nationwide administrations, announced per cycle on official NAPOLCOM channels with online application windows.

Because NAPOLCOM sets each administration by its own announcement rather than a fixed annual calendar, the exact next PNP Entrance Exam date and application window are published per cycle — check **napolcom.gov.ph** and the official NAPOLCOM Facebook page for the current schedule before you plan around it.

The pattern that holds across cycles: **applications are online, slots are limited per testing center, and windows close fast** — follow NAPOLCOM's official channels the moment an administration is announced.

## Requirements and Qualifications

- Filipino citizen
- **Baccalaureate degree** (any course — this exam exists precisely for non-criminology graduates)
- Age, and other qualifications aligned with PNP entry standards (21-30 for appointment, with waiver rules)
- Application requirements per announcement: accomplished form, photos, valid ID, fee

## Coverage and Passing

The PNP Entrance Exam covers general aptitude territory: verbal reasoning, quantitative reasoning, logic, and general information including police-related basics. Passing score per NAPOLCOM's announcements has historically been set at **75%**. It is a competitive aptitude exam — pacing practice matters as much as knowledge.

## The Honest Strategic Advice

If you are a criminology student or graduate who has not yet passed the CLE: **the CLE is the better investment.** The same review effort that earns NAPOLCOM eligibility earns you, via the board exam, the RCrim title, the eligibility, *and* a professional license with careers beyond the uniform — [the full comparison here](https://lisensyaprep.com/criminology/after-passing-cle-next-steps). NAPOLCOM is the right path specifically for non-criminology graduates set on the PNP.

Either way, the exam is only the eligibility. The [PNP screening gauntlet](https://lisensyaprep.com/criminology/how-to-join-pnp-criminologist) — PAT, medical, neuro-psych, background investigation — is where applications are actually won and lost.

## Frequently Asked Questions

**Do criminology graduates need the NAPOLCOM exam?**
Registered Criminologists do not — the license is their eligibility under RA 11131. Criminology *graduates who have not passed the CLE* need one of the accepted eligibilities like anyone else.

**What is the NAPOLCOM exam passing score?**
Historically 75%, per NAPOLCOM's announcements.

**Can any course graduate take the PNP Entrance Exam?**
Yes — any baccalaureate degree qualifies you to take it, which is exactly its role in the system.

**Is the NAPOLCOM exam eligibility permanent?**
NAPOLCOM eligibility is used for PNP appointment per its rules — check the current announcement for validity terms.
`;

export default function NapolcomExamScheduleGuidePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-napolcom-exam-schedule-guide-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_FAQ) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/criminology" className="text-gray-500 hover:text-gray-300 transition-colors">Criminology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">{"NAPOLCOM PNP Entrance Exam 2026 - Schedule, Requirements, and Who Can Skip It"}</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400">Criminology</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                {"NAPOLCOM PNP Entrance Exam 2026 - Schedule, Requirements, and Who Can Skip It"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 28, 2026</span><span>•</span>
                <span>7 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
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
              <h3 className="text-white font-bold mb-4">Start Reviewing</h3>
              <p className="text-gray-400 text-sm mb-4">Reading is good, but practice is better. Test your knowledge with our free gamified reviewers.</p>
              <Link href="/" className="block w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl text-center text-sm transition-colors">
                ⚔️ Start Quiz
              </Link>
            </div>
            <AdPlaceholder slot="sidebar" />
          </aside>

        </div>
      </div>
    </div>
  );
}
