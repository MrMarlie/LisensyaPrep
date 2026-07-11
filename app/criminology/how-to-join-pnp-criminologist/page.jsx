import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'How to Join the PNP as a Criminology Graduate 2026 (Full Guide)',
  description:
    'How to join the PNP as a Registered Criminologist in 2026 - qualifications, CORPS online application, Physical Agility Test preparation, screening stages, and why RCrims skip the NAPOLCOM exam.',
  path: '/criminology/how-to-join-pnp-criminologist',
});

const SCHEMA_HOWTO = `{"@context":"https://schema.org","@type":"HowTo","name":"How to Join the PNP as a Criminology Graduate","description":"Complete PNP application process for Registered Criminologists including qualifications, CORPS registration, Physical Agility Test preparation, and screening stages.","step":[{"@type":"HowToStep","name":"Confirm Your Qualifications","text":"Meet the age (21-30), height, weight, education, and character standards. Your RCrim license serves as your eligibility under RA 11131."},{"@type":"HowToStep","name":"Register on CORPS","text":"Create an account at app.corps.pnprss.com when your region announces a recruitment quota and upload complete documents."},{"@type":"HowToStep","name":"Pass the Physical Agility Test","text":"Train 8-12 weeks in advance with running and calisthenics against your region's published standards."},{"@type":"HowToStep","name":"Complete Medical and Psychological Screening","text":"Pass the medical, dental, neuro-psychiatric examinations, and drug test."},{"@type":"HowToStep","name":"Clear the Background Investigation and Interview","text":"Pass the character and background investigation and the final panel interview."},{"@type":"HowToStep","name":"Complete Recruit Training","text":"Take your oath as Patrolman or Patrolwoman and finish the Public Safety Basic Recruit Course and Field Training Program for permanent status."}],"author":{"@type":"Organization","name":"LisensyaPrep Team"},"publisher":{"@type":"Organization","name":"LisensyaPrep"},"datePublished":"2026-07-17"}`;

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do Registered Criminologists need the NAPOLCOM entrance exam to join the PNP?","acceptedAnswer":{"@type":"Answer","text":"No. Under RA 6506 as amended by RA 11131, the criminologist license itself serves as eligibility for PNP entry."}},{"@type":"Question","name":"What is the age limit for PNP application?","acceptedAnswer":{"@type":"Answer","text":"21 to 30 years old upon oath-taking, with waivers possible for applicants aged at least 20 and up to 35 under NAPOLCOM waiver rules."}},{"@type":"Question","name":"How much does it cost to apply to the PNP?","acceptedAnswer":{"@type":"Answer","text":"Nothing. PNP recruitment is completely free of charge. Anyone asking for fees or offering paid assistance is running a scam and should be reported to the PNP-RSS."}}]}`;

const RELATED_ARTICLES = [
  { text: 'What to Do After Passing the CLE', href: '/criminology/after-passing-cle-next-steps' },
  { text: 'CLE Coverage 2026 Complete Breakdown', href: '/criminology/cle-coverage-2026' },
  { text: 'CLE August 2026 Schedule and Guide', href: '/criminology/cle-august-2026-guide' },
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
For most criminology graduates, the badge is the goal. And if you are a **Registered Criminologist**, you hold an advantage most applicants would love to have: under **RA 6506 as amended by RA 11131**, your board license **is your eligibility** — no NAPOLCOM PNP Entrance Examination needed.

But eligibility is only the entry ticket. Between you and the rank of Patrolman/Patrolwoman stands a screening gauntlet — and the stage that eliminates the most otherwise-qualified applicants is not paperwork. It is the **Physical Agility Test**. This guide covers the full process, including how to prepare your body months before you ever submit a folder.

**Quick answer:** Meet the basic qualifications (21-30 years old, height and weight standards, clean record) → register on the **CORPS portal** (app.corps.pnprss.com) when your region's quota opens → pass the screening stages (PAT, medical, psych/neuro, drug test, background investigation, interview) → take your oath as Patrolman/Patrolwoman → complete the **Public Safety Basic Recruit Course** for permanent status. Details below.

---

## Your RA 11131 Advantage, In Plain Terms

Non-criminologist applicants need an eligibility: the NAPOLCOM Entrance Exam, a bar/board exam under RA 1080, PD 907 honor-graduate eligibility, or Civil Service Professional. You already have yours — the RCrim license itself. While others wait for NAPOLCOM exam schedules and results, you can apply the moment a recruitment quota opens.

Not yet licensed? That is the strongest practical reason to pass the CLE first: [free gamified CLE reviewer here](/criminology/). Just passed? Complete your registration first: [What to Do After Passing the CLE](/criminology/after-passing-cle-next-steps).

---

## Basic Qualifications (RA 6975, as amended by RA 8551)

| Requirement | Standard |
|-------------|----------|
| Citizenship | Filipino citizen |
| Character | Good moral character; no conviction involving moral turpitude |
| Education | Baccalaureate degree (your BS Criminology qualifies) |
| Age | **21 to 30 years old** upon oath-taking |
| Height | 1.62 m (male) / 1.57 m (female) |
| Weight | Within 5 kg of the standard for your height, age, and sex |
| Service record | Never dishonorably discharged or dismissed for cause |
| Eligibility | **Your RCrim license (RA 11131)** |

**Waivers exist.** NAPOLCOM may grant an **age waiver** (applicant must be at least 20 and not more than 35) and **height waivers** — including lower thresholds for members of indigenous groups certified by the NCIP. Waivers are granted only when qualified applicants fall below the quota, so treat them as a possibility, not a plan.

**The weight rule is the quiet eliminator.** "Within 5 kg of standard" disqualifies applicants in both directions. Check your standard weight now — months before applying — because body composition takes time to change safely.

---

## How to Apply: The CORPS Portal

PNP recruitment now runs through the **Comprehensive Online Recruitment Processing System (CORPS)** at **app.corps.pnprss.com**:

1. **Watch for your region's recruitment quota announcement** — the PNP Recruitment and Selection Service (PNP-RSS) posts quotas and timelines on its official Facebook page and regional recruitment offices
2. **Create your CORPS account** and complete your profile
3. **Upload clear, complete scans** of your documents — blurry or incomplete uploads cause rejection or delays
4. **Monitor your application status** and respond to schedule notifications promptly

**Documents to prepare:** PSA birth certificate, PRC license and board rating documents (authenticated), transcript of records and diploma, valid IDs, clearances (barangay, police, NBI, court), Personal Data Sheet, and recent photos. Regional offices may require additional documents — follow your region's checklist exactly.

---

## The Screening Gauntlet, Stage by Stage

### 1. Preliminary Screening (Paper + Physical Standards)

Document verification plus initial height/weight measurement. This is where the 5-kg weight rule bites — arrive within standard.

### 2. Physical Agility Test (PAT) — The Great Eliminator

The PAT evaluates strength, speed, and endurance through timed events — typically calisthenics (push-ups, sit-ups) and running events (a sprint and a distance run). **Exact events and passing standards are set out in the current recruitment announcement — get your region's official standards and train against those numbers**, not against gym-friend hearsay.

**How to prepare (start 8-12 weeks out):**

- **Build a running base first.** Three runs weekly: one easy 30-40 minute run, one interval session (sprint repeats), one longer run. The distance run exposes anyone who only trained push-ups.
- **Calisthenics volume daily.** Push-ups and sit-ups in multiple submaximal sets (e.g., 5 sets of 60-70% your max) beats occasional max-outs. Test yourself weekly.
- **Train in the heat, sensibly.** PATs run outdoors on schedule, not in aircon. Acclimate gradually, hydrate aggressively.
- **Cut weight the slow way if needed.** Crash-dieting the week before wrecks your PAT performance and can flag your medical. One kilogram per week is the sustainable ceiling.
- **Rest the final 48 hours.** Arrive fresh, not sore.

### 3. Medical and Dental Examination

Comprehensive physical exam. Honest self-audit beforehand: vision, blood pressure, dental issues — address what is correctable early (some findings are fixable months out but disqualifying on the day).

### 4. Psychological / Neuro-Psychiatric Examination

Tests mental fitness for police service. There is no "reviewer" for this and gaming it backfires — the honest preparation is real: sleep well the week before, answer consistently and truthfully, and do not overthink repeated questions (consistency checks are built in).

### 5. Drug Test

Self-explanatory. Note that even some legitimate medications can flag initial screens — declare any prescriptions.

### 6. Character and Background Investigation (CBI)

Investigators verify your records, interview people who know you, and yes — **your social media is part of your character record**. Audit your public posts now. Undisclosed derogatory records discovered during CBI are worse than disclosed ones explained honestly.

### 7. Final Interview

Panel assessment of your bearing, motivation, and communication. Prepare a clear, honest answer to "Why do you want to be a police officer?" — memorized speeches read as memorized.

---

## After Selection: Training Before the Badge Is Permanent

Successful applicants take their oath as **Patrolman/Patrolwoman** — but permanent status comes only after completing the **Public Safety Basic Recruit Course (PSBRC)** and the **Field Training Program**. Expect months of academy discipline, academics, and physical training. Your PAT preparation habit becomes your academy survival kit.

**Compensation:** entry-level base pay is roughly ₱29,000+ monthly, with allowances pushing actual take-home substantially higher.

---

## The Non-Negotiable Warning

**PNP recruitment is 100% free.** No processing fees, no "assistance" fees, and recommendation letters earn zero points. Anyone — including anyone claiming to be an insider — asking for money in exchange for help getting you in is running a scam. Report them to the PNP-RSS. Paying a fixer does not just waste money; involvement in recruitment irregularities can permanently disqualify you.

---

## Frequently Asked Questions

**Do Registered Criminologists need the NAPOLCOM entrance exam?**
No. Under RA 6506 as amended by RA 11131, the criminologist license itself serves as eligibility for PNP entry.

**What is the age limit for PNP application?**
21 to 30 years old upon oath-taking, with waivers possible for applicants aged at least 20 and up to 35 under NAPOLCOM waiver rules.

**What is the hardest part of PNP screening?**
By elimination volume, the Physical Agility Test and the weight standard. Both are trainable with 2-3 months of honest preparation.

**Where do I apply for the PNP?**
Through the CORPS portal at app.corps.pnprss.com, when your region announces a recruitment quota. Follow the PNP-RSS official Facebook page for announcements.

**How much does it cost to apply?**
Nothing. Recruitment is free of charge — anyone charging fees is a scammer.

**Can female criminologists apply?**
Absolutely — Patrolwoman recruitment runs alongside Patrolman quotas, with the height standard at 1.57 m for female applicants.

**What if I fail the PAT?**
You can reapply in a future recruitment cycle. Use the gap to train specifically against the published standards.
`;

export default function JoinPnpCriminologistPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-pnp-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_HOWTO }} />
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: '/criminology', name: 'Criminology' }, { url: '/criminology/how-to-join-pnp-criminologist', name: 'How to Join the PNP as a Criminology Graduate' }]} />
      <Script id="schema-pnp-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/criminology" className="text-gray-500 hover:text-gray-300 transition-colors">Criminology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">How to Join the PNP</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400">Criminology (CLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                How to Join the PNP as a Criminology Graduate 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>July 17, 2026</span><span>•</span>
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

            <div className="mt-8 bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-red-400 font-extrabold text-lg mb-2">Not Yet a Registered Criminologist?</p>
              <p className="text-gray-400 text-sm mb-4">Your RCrim license is your PNP eligibility. Free gamified CLE reviewer covering all six board subjects. No account required.</p>
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
