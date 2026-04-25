import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Law Enforcement Administration Reviewer for CLE Philippines 2026',
  description:
    'Preparing for the criminology board exam? This law enforcement administration reviewer covers PNP organization, police operations, RA 6975, RA 8551, and other key laws tested in the CLE.',
  path: '/criminology/law-enforcement-administration-reviewer',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Law Enforcement Administration Reviewer for CLE Philippines 2026',
  description:
    'Complete law enforcement administration reviewer for the PRC Criminologist Licensure Examination covering PNP organization, RA 6975, RA 8551, NAPOLCOM, police operations, and key statutes.',
  image: 'https://lisensyaprep.com/images/articles/cle-law-enforcement-administration-reviewer.jpg',
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
    '@id': 'https://lisensyaprep.com/criminology/law-enforcement-administration-reviewer',
  },
};

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
Law Enforcement Administration is one of the most law-heavy subjects in the Criminologist Licensure Examination. It tests your knowledge of how the Philippine National Police is organized, how it operates, and the legal framework that governs it.

Many CLE takers find this subject manageable once they stop trying to memorize it section by section and start understanding the structure behind it. The PNP has a defined hierarchy, a defined set of operating procedures, and several foundational laws that govern everything it does. Once you understand that structure, a lot of the specific details fall into place naturally.

This reviewer walks through the major areas of Law Enforcement Administration that appear consistently in the CLE.
`;

const SECTION_2 = `
---

## The Legal Foundation of Philippine Law Enforcement

### Republic Act 6975: The DILG Act of 1990

Republic Act 6975, known as the Department of the Interior and Local Government Act of 1990, is the law that created the Philippine National Police as we know it today. Before RA 6975, law enforcement in the Philippines was under the Philippine Constabulary and the Integrated National Police.

Key provisions of RA 6975 that appear in the CLE:

**Creation of the PNP.** RA 6975 established the PNP as a national police organization under the DILG. The PNP absorbed the functions and personnel of the PC/INP.

**Civilian character of the PNP.** The PNP is explicitly established as a civilian organization. This distinction is important in CLE questions because the PNP is separate from the Armed Forces of the Philippines and is not a military organization.

**Mandate of the PNP.** The PNP is mandated to enforce all laws and ordinances, maintain peace and order, prevent and investigate crimes, arrest criminal offenders, bring them to justice, and ensure public safety.

**Control and supervision.** The National Police Commission (NAPOLCOM) exercises administrative control and supervision over the PNP. This is distinct from operational control, which is exercised by local executives during emergency situations under conditions specified in the law.

---

### Republic Act 8551: The PNP Reform and Reorganization Act of 1998

RA 8551 amended and expanded RA 6975. It introduced significant changes to PNP governance, qualifications, and disciplinary procedures. This law is heavily tested in the CLE.

**Key changes introduced by RA 8551:**

The law strengthened civilian oversight of the PNP by expanding the powers of NAPOLCOM. It also reorganized the administrative structure of the PNP and updated the qualification standards for PNP personnel.

**PNP personnel classifications under RA 8551:**

PNP uniformed personnel are classified into two broad categories:

Non-commissioned officers and patrolmen form the base of the PNP hierarchy. These are the ranks from Patrolman or Patrolwoman up through the various NCO levels.

Officers make up the command structure, from Police Lieutenant through Police General.

**Retirement and attrition.** RA 8551 established mandatory retirement provisions for PNP personnel. Officers and non-commissioned officers are retired upon reaching the age of 56 or upon completing 30 years of service in government, whichever comes first.

---

## PNP Organization and Structure

Understanding the organizational structure of the PNP is essential for Law Enforcement Administration questions in the CLE.

### National Headquarters

The PNP is headed by the Chief of the Philippine National Police, who holds the rank of Police General. The Chief PNP is appointed by the President of the Philippines upon recommendation of the NAPOLCOM from among the senior officers of the PNP.

Below the Chief PNP are the Deputy Chiefs for Administration and for Operations, each holding the rank of Police Lieutenant General.

### Administrative Regions and Units

The PNP is organized territorially through Regional Police Offices that cover each of the 17 administrative regions of the Philippines. Each regional office is headed by a Regional Director.

Below the regional level, the PNP operates through:

**Provincial Police Offices** covering each province, headed by a Provincial Director.

**City and Municipal Police Stations** at the local level, which are the primary points of contact between the PNP and communities.

**Police Community Precincts** which are sub-units of police stations established in barangays and communities.

---

## NAPOLCOM: The National Police Commission

The National Police Commission is the civilian oversight body of the PNP. CLE questions regularly test the composition, powers, and functions of NAPOLCOM.

### Composition of NAPOLCOM

NAPOLCOM is composed of:

- The Secretary of the Interior and Local Government, who serves as ex officio chairman
- Four regular commissioners appointed by the President, with the advice and consent of the Commission on Appointments
- The Chief of the PNP, who serves as ex officio member

### Powers of NAPOLCOM

**Administrative control.** NAPOLCOM exercises administrative control over the PNP. This includes setting standards for entrance, promotion, and retirement.

**Investigation of complaints.** NAPOLCOM has the power to investigate cases involving PNP personnel upon complaint by a private citizen. For crimes, the regular courts retain jurisdiction.

**Promulgation of rules.** NAPOLCOM issues rules and regulations regarding uniform standards of police discipline, physical fitness, and training.
`;

const SECTION_3 = `
## Police Operations: Key Concepts for the CLE

Law Enforcement Administration also covers operational aspects of police work. These are tested through scenario questions that ask you to identify the correct procedure in a given situation.

### Arrest

A lawful arrest requires either a valid warrant of arrest or the circumstances that allow warrantless arrest.

**Warrantless arrest is lawful** under the Rules of Court in three situations:

When a person is caught in the act of committing an offense, is attempting to commit one, or has just committed one. This is called in flagrante delicto arrest.

When a crime has just been committed and the arresting officer has personal knowledge of facts indicating that the person to be arrested committed it. This is called hot pursuit arrest.

When the person to be arrested is an escaped prisoner. This is called arrest of escaped prisoner.

A person who is lawfully arrested must be informed of the reason for the arrest and must be advised of their constitutional rights. Failure to do so does not make the arrest illegal but can affect the admissibility of evidence obtained.

### The Miranda Rights in Philippine Law

The Miranda rights as applied in the Philippines come from Article III, Section 12 of the 1987 Constitution. Any person under custodial investigation must be informed of:

- The right to remain silent
- The right to have competent and independent counsel, preferably of the person's own choice
- The right to be informed of these rights

Any statement or confession obtained in violation of these rights is inadmissible in evidence.

### Search and Seizure

A search requires a valid search warrant issued by a judge based on probable cause. However, several exceptions to the warrant requirement are recognized in Philippine jurisprudence and appear in CLE questions:

**Search incidental to lawful arrest.** When a person is lawfully arrested, the arresting officer may search the person and the immediate surroundings without a warrant.

**Stop and frisk.** An officer who has reasonable suspicion that a person is engaged in criminal activity may stop the person and conduct a pat-down search for weapons.

**Plain view doctrine.** Evidence that is in plain view of an officer who is lawfully present at the scene may be seized without a warrant.

**Consented search.** A search conducted with the voluntary and intelligent consent of the person being searched requires no warrant.

---

## Key Laws Summary for Law Enforcement Administration

| Law | What It Covers | Key Points for CLE |
| --- | -------------- | ------------------ |
| RA 6975 | Creation of PNP under DILG | PNP is civilian, separate from AFP |
| RA 8551 | PNP Reform Act | NAPOLCOM powers, mandatory retirement at 56 |
| RA 9708 | Amendment to RA 8551 | Appointment and promotion standards |
| RA 9263 | Bureau of Fire Protection and Bureau of Jail Management | Separate from PNP, also under DILG |

---

## How to Study Law Enforcement Administration

The trap most examinees fall into with this subject is trying to memorize specific section numbers and exact provisions of the law. That approach works for some items but breaks down for scenario questions.

A more effective approach is to understand the structure and purpose behind each law first. Why was RA 6975 enacted? What problem was RA 8551 designed to fix? What principle does NAPOLCOM oversight serve?

Once you understand the "why," the specific provisions become much easier to remember because they connect to a broader logic rather than sitting in isolation in your memory.

From there, practice scenario questions. CLE questions in this subject area frequently present a situation and ask what the correct procedure is, which officer has jurisdiction, or which law applies. That kind of question requires application, not just recall.
`;

const RELATED_ARTICLES = [
  { text: 'Criminal Jurisprudence and Procedure Reviewer CLE 2026', href: '/criminology/criminal-jurisprudence-procedure-reviewer' },
  { text: 'Criminalistics and Dactyloscopy Reviewer CLE Philippines', href: '/criminology/criminalistics-dactyloscopy-reviewer' },
  { text: 'How to Apply for PRC Board Exam Online 2026', href: '/guides/how-to-apply-prc-board-exam-online-2026' },
  { text: 'PRC Board Exam Schedule 2026 for All Professions', href: '/guides/prc-board-exam-schedule-2026' },
];

export default function LawEnforcementAdminPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cle-03" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Article */}
          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/criminology" className="text-gray-500 hover:text-gray-300 transition-colors">Criminology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Law Enforcement Administration Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400">
                Criminology (CLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Law Enforcement Administration Reviewer for CLE Philippines 2026
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
                LisensyaPrep has practice questions for Law Enforcement Administration covering PNP organization, NAPOLCOM powers, police operations, and the key statutes tested in the CLE.
              </p>
              <Link
                href="https://lisensyaprep.com"
                className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                ⚔️ Practice Law Enforcement Questions →
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
