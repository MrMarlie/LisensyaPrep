import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Criminal Jurisprudence and Procedure Reviewer 2026 (CLE Philippines)',
  description:
    'Preparing for the CLE in the Philippines? This criminal jurisprudence and procedure reviewer covers the Revised Penal Code, criminal procedure, and key laws you need to know before exam day.',
  path: '/criminology/criminal-jurisprudence-procedure-reviewer',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Criminal Jurisprudence and Procedure Reviewer 2026 (CLE Philippines)',
  description:
    'Complete criminal jurisprudence and procedure reviewer for the PRC Criminologist Licensure Examination covering the Revised Penal Code, criminal procedure, and key special penal laws.',
  image: 'https://lisensyaprep.com/images/articles/cle-criminal-jurisprudence-reviewer.jpg',
  author: { '@type': 'Person', name: 'LisensyaPrep Team', jobTitle: 'Licensed Criminologist' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/assets/logo.png' },
  },
  datePublished: '2026-04-22',
  dateModified: '2026-04-22',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://lisensyaprep.com/criminology/criminal-jurisprudence-procedure-reviewer',
  },
};

function formatInline(text) {
  let result = text
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]*)\)/g,
      (_, t, url) =>
        `<a href="${url}"${url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''} class="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">${t}</a>`
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em class="text-gray-400 italic">$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-white/10 px-1 rounded text-yellow-300 text-xs">$1</code>');
  return result.replace(
    /(?<![">])\b((?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.(?:gov\.ph|com\.ph|edu\.ph|org\.ph|com|net|org|ph)(?:\/[^\s<>"']*)?)\b/g,
    (url) => {
      const href = /^https?:\/\//.test(url) ? url : `https://${url}`;
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">${url}</a>`;
    }
  );
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
    } else if (line.trim().startsWith('**') && line.includes('**')) {
      elements.push(
        <p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
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

const SECTION_1 = `
If there is one subject in the Criminologist Licensure Examination that you simply cannot afford to underestimate, it is Criminal Jurisprudence and Procedure. It shows up consistently across every exam cycle, carries significant weight in your overall average, and rewards examinees who actually understand how laws are applied, not just those who memorized provisions.

This reviewer breaks down the subject into its core components, walks you through the laws and concepts most frequently tested in the CLE, and points you toward where to focus your preparation time.
`;

const SECTION_2 = `
---

## What Criminal Jurisprudence and Procedure Covers

Criminal Jurisprudence and Procedure is one of the six major subject areas in the CLE. It covers the legal framework that governs criminal offenses in the Philippines, including how crimes are defined, classified, prosecuted, and penalized.

The subject draws from several major sources of law:

**The Revised Penal Code (Republic Act 3815)** is the backbone of this subject. It defines felonies, classifies crimes, and sets out the circumstances that affect criminal liability. You will not pass this subject without knowing the RPC.

**The Rules of Court (Criminal Procedure)** covers how criminal cases move through the Philippine justice system, from the filing of complaints to the issuance of warrants, arraignment, trial, and judgment.

**Special penal laws** complement the RPC by covering offenses not found in the main code, such as drug crimes, dangerous weapons, and other specific violations.

---

## The Revised Penal Code: What to Focus On

### Book One: General Provisions

Book One covers the foundational principles of criminal law in the Philippines. This is where many CLE items come from because the concepts apply across all types of crimes.

**Felonies and their classification.** The RPC divides felonies into intentional felonies, where the act is willful and deliberate, and culpable felonies, where the harm results from imprudence or negligence. Understanding the distinction matters because the penalty differs between the two.

**Circumstances affecting criminal liability.** These are among the most heavily tested concepts in Criminal Jurisprudence. There are four types:

Justifying circumstances remove criminal liability entirely because the act itself is lawful. Self-defense is the most commonly tested example. To successfully invoke self-defense, three elements must be present: unlawful aggression by the victim, reasonable necessity of the means used to repel it, and lack of sufficient provocation on the part of the person defending himself.

Exempting circumstances acknowledge that a crime occurred but excuse the offender from liability because of a personal condition, such as insanity, minority, or accident.

Mitigating circumstances reduce the penalty without removing liability. Examples include incomplete self-defense, voluntary surrender, and acting under the impulse of passion or obfuscation.

Aggravating circumstances increase the penalty. Examples include treachery, evident premeditation, and use of a motor vehicle in committing the crime.

**Stages of execution of a felony.** A felony passes through three stages: attempted, frustrated, and consummated. The distinction between frustrated and consummated crime comes up regularly in CLE scenario questions. In a frustrated felony, the offender performs all the acts of execution but the crime does not result due to a cause independent of his will. In a consummated felony, all elements of the crime are present.

**Conspiracy and proposal.** Conspiracy exists when two or more persons agree to commit a felony and decide to carry it out. Under the RPC, conspiracy to commit a felony is punishable only in cases where the law specifically provides a penalty for it.
`;

const SECTION_3 = `
### Book Two: Specific Crimes

Book Two defines specific crimes and their penalties. Rather than trying to memorize every crime in the RPC, focus on the crime categories that appear most often in the CLE.

**Crimes against persons** include parricide, murder, homicide, and physical injuries. Know the qualifying circumstances that elevate homicide to murder: treachery, evident premeditation, price or reward, cruelty, and others listed in Article 248.

**Crimes against property** include robbery, theft, estafa, and malicious mischief. Know the elements of each and the distinctions between them. Robbery requires violence or intimidation. Theft does not.

**Crimes against chastity and against persons with authority** also appear in CLE items, particularly those involving rape and crimes committed by public officers.

---

## Criminal Procedure: The Flow of a Criminal Case

Criminal Procedure under the Rules of Court covers the step by step process of how a criminal case proceeds in the Philippine justice system. CLE questions in this area tend to be scenario based, asking what happens at a specific point in the process.

**Complaint and information.** A criminal case begins with a complaint or information filed before the proper court. The complaint is filed by the offended party. The information is filed by the public prosecutor after a finding of probable cause.

**Warrant of arrest.** After the information is filed, the judge evaluates it. If probable cause exists, the judge issues a warrant of arrest. The accused is then taken into custody.

**Bail.** The accused may post bail to secure temporary liberty while the case is pending. Not all offenses are bailable. Offenses punishable by reclusion perpetua, life imprisonment, or death are not bailable when evidence of guilt is strong.

**Arraignment and plea.** During arraignment, the accused is formally informed of the charges and asked to enter a plea. A plea of not guilty is entered automatically if the accused refuses to plead.

**Trial and judgment.** The prosecution presents its evidence first, followed by the defense. The judge then renders judgment based on the evidence and the applicable law.

---

## Key Special Penal Laws Tested in the CLE

Beyond the RPC, the CLE tests knowledge of several special laws that criminology graduates should know.

**Republic Act 9165 (Comprehensive Dangerous Drugs Act of 2002)** is one of the most heavily tested special laws in the CLE. Know the definitions of drug offenses, the penalties for possession and sale, and the chain of custody requirement for drug evidence.

**Republic Act 9262 (Anti-Violence Against Women and Their Children Act)** covers the different forms of violence covered under the law and the protective orders available to victims.

**Republic Act 10591 (Comprehensive Firearms and Ammunition Regulation Act)** replaced the old Illegal Possession of Firearms law. Know the classifications of firearms and the corresponding penalties for unlicensed possession.

**Presidential Decree 1829 (Obstruction of Justice)** is frequently tested. It penalizes acts that obstruct the apprehension and prosecution of criminal offenders.

---

## How to Study This Subject Effectively

Criminal Jurisprudence rewards understanding over memorization. Here is an approach that works for most examinees.

**Start with the RPC Book One.** The general principles covered there apply to every specific crime in Book Two and to most criminal procedure questions as well. If you understand how circumstances affect liability, you can answer many scenario questions even without having memorized the specific crime involved.

**Read the actual law text, not just summaries.** For the RPC and the Rules of Court, reading summaries gives you an overview but leaves gaps. Key phrases in the actual law text often contain the exact answer to CLE questions. You do not need to memorize word for word, but reading the provisions directly builds a much stronger foundation than reviewer summaries alone.

**Practice with scenario questions, not just definitions.** The CLE in this subject area rarely asks "define felony." It asks "A stabbed B from behind without warning. What qualifying circumstance is present?" That kind of question requires you to apply concepts, not recite them. Scenario practice is the most efficient way to build that skill.

---

## Quick Reference: Stages of a Felony

| Stage | What It Means | Key Distinction |
| ----- | ------------- | --------------- |
| Attempted | Offender begins execution but does not complete all acts | Not all acts of execution are performed |
| Frustrated | All acts of execution are performed but crime does not result | Independent cause prevents completion |
| Consummated | All elements of the crime are present | Crime is fully realized |

---

## Quick Reference: Types of Circumstances Affecting Liability

| Type | Effect on Liability | Common Examples |
| ---- | ------------------- | --------------- |
| Justifying | Removes criminal liability entirely | Self-defense, defense of relative, fulfillment of duty |
| Exempting | Removes liability due to personal condition | Insanity, minority under 15, accident |
| Mitigating | Reduces penalty | Voluntary surrender, passion or obfuscation, incomplete justifying circumstance |
| Aggravating | Increases penalty | Treachery, evident premeditation, use of motor vehicle |
`;

const RELATED_ARTICLES = [
  { text: 'Criminalistics and Dactyloscopy Reviewer for CLE Philippines', href: '/criminology/criminalistics-dactyloscopy-reviewer' },
  { text: 'Law Enforcement Administration Reviewer CLE 2026', href: '/criminology/law-enforcement-administration-reviewer' },
  { text: 'PRC Board Exam Schedule 2026 for All Professions', href: '/guides/prc-board-exam-schedule-2026' },
  { text: 'How to Apply for PRC Board Exam Online 2026', href: '/guides/how-to-apply-prc-board-exam-online-2026' },
];

export default function CriminalJurisprudencePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cle-01" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Article */}
          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/criminology" className="text-gray-500 hover:text-gray-300 transition-colors">Criminology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Criminal Jurisprudence Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400">
                Criminology (CLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Criminal Jurisprudence and Procedure Reviewer 2026 (CLE Philippines)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team, RCrim</span>
                <span>•</span>
                <span>April 22, 2026</span>
                <span>•</span>
                <span>10 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(SECTION_1)}
              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(SECTION_2)}
              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(SECTION_3)}
            </div>

            {/* CTA */}
            <div className="mt-10 bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-red-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Reading a reviewer is just the first step. Practice Criminal Jurisprudence questions now and see exactly where your weak spots are before exam day.
              </p>
              <Link
                href="https://lisensyaprep.com"
                className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                ⚔️ Start Practicing at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            {/* Related Articles */}
            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">Related CLE Reviewer Articles</h2>
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
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">CLE Reviewer Series</h3>
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
