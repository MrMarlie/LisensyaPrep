import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';

export const metadata = buildMetadata({
  title: 'Philippine Constitution Reviewer for CSE 2026 (Complete Guide Philippines)',
  description:
    'Studying for the Civil Service Exam? This Philippine Constitution reviewer covers all 18 articles, the Bill of Rights, branches of government, and key provisions tested in the CSE General Information section.',
  path: '/civil-service/philippine-constitution-reviewer-cse',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Philippine Constitution Reviewer for CSE 2026 Complete Guide Philippines',
  description:
    'Complete Philippine Constitution reviewer for the Civil Service Exam covering all 18 articles, the Bill of Rights, branches of government, term limits, Constitutional Commissions, and key provisions.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-09',
  dateModified: '2026-05-09',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/civil-service/philippine-constitution-reviewer-cse' },
};

const ALL_CSE_ARTICLES = [
  { text: 'What is the Civil Service Exam? Complete Guide 2026', href: '/blog/what-is-the-civil-service-exam' },
  { text: 'Civil Service Exam Coverage 2026 Complete Subject Breakdown', href: '/civil-service/cse-coverage-2026' },
  { text: 'Civil Service Exam Schedule 2026 Complete Timeline', href: '/civil-service/cse-schedule-2026' },
  { text: 'How to Apply for the Civil Service Exam 2026', href: '/civil-service/cse-application-guide-2026' },
  { text: 'Professional vs Subprofessional CSE Complete Comparison', href: '/civil-service/professional-vs-subprofessional-cse' },
  { text: 'How to Pass the Civil Service Exam on Your First Take', href: '/civil-service/how-to-pass-civil-service-exam' },
  { text: 'Numerical Reasoning Reviewer for CSE 2026', href: '/civil-service/numerical-reasoning-reviewer-cse' },
  { text: 'Verbal Ability Reviewer for CSE 2026', href: '/civil-service/verbal-ability-reviewer-cse' },
  { text: 'Analytical Ability Reviewer for CSE Professional Level 2026', href: '/civil-service/analytical-ability-reviewer-cse' },
  { text: 'Clerical Ability Reviewer for CSE Subprofessional Level 2026', href: '/civil-service/clerical-ability-reviewer-cse' },
  { text: 'Philippine Constitution Reviewer for CSE 2026', href: '/civil-service/philippine-constitution-reviewer-cse' },
  { text: 'RA 6713 Code of Conduct Reviewer for CSE 2026', href: '/civil-service/ra-6713-reviewer-cse' },
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
    } else if (line.startsWith('| ') && line.endsWith(' |')) {
      const cells = line.split('|').filter((c) => c.trim() && !c.match(/^[-\s]+$/));
      const isHeader = i > 0 && lines[i + 1]?.includes('---');
      if (isHeader) {
        elements.push(<tr key={key++} className="border-b border-white/10">{cells.map((cell, ci) => <th key={ci} className="px-4 py-2 text-left text-yellow-400 font-semibold text-sm">{cell.trim()}</th>)}</tr>);
      } else if (!line.match(/^\|[-\s|]+\|$/)) {
        elements.push(<tr key={key++} className="border-b border-white/5">{cells.map((cell, ci) => <td key={ci} className="px-4 py-2 text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: formatInline(cell.trim()) }} />)}</tr>);
      }
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(<p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />);
    }
  }
  const wrapped = [];
  let tableBuffer = [];
  let listBuffer = [];
  let inTable = false;
  let inList = false;
  for (const el of elements) {
    if (el.type === 'tr') {
      if (inList) { wrapped.push(<ul key={`ul-${key++}`} className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>); listBuffer = []; inList = false; }
      inTable = true; tableBuffer.push(el);
    } else if (el.type === 'li') {
      if (inTable) { wrapped.push(<div key={`tbl-${key++}`} className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>); tableBuffer = []; inTable = false; }
      inList = true; listBuffer.push(el);
    } else {
      if (inTable) { wrapped.push(<div key={`tbl-${key++}`} className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>); tableBuffer = []; inTable = false; }
      if (inList) { wrapped.push(<ul key={`ul-${key++}`} className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>); listBuffer = []; inList = false; }
      wrapped.push(el);
    }
  }
  if (inTable && tableBuffer.length) wrapped.push(<div key="tbl-final" className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>);
  if (inList && listBuffer.length) wrapped.push(<ul key="ul-final" className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>);
  return wrapped;
}

const MAIN_CONTENT = `
The Philippine Constitution is one of the most heavily tested topics in the Civil Service Exam General Information section. With **15 to 20 items** likely covering the Constitution, mastering its key provisions is essential for reaching the 80 percent passing rate.

This deep dive reviewer covers all 18 articles of the 1987 Philippine Constitution with focus on the provisions most commonly tested in the CSE.

---

## Why the Constitution Matters in CSE

The Constitution is the supreme law of the Philippines. Government employees must understand its principles because all government action must comply with it.

The CSE tests:
- Specific provisions and their meanings
- Structural knowledge of branches of government
- Bill of Rights protections
- Constitutional principles and policies

---

## Overview: The 1987 Philippine Constitution

The current Philippine Constitution was ratified on **February 2, 1987**, replacing the 1973 Constitution. It is sometimes called the **"Cory Constitution"** because it was drafted during President Corazon Aquino's administration.

**Structure:**
- Preamble
- 18 Articles
- Various sections within each article

**Drafting body:** 50-member Constitutional Commission appointed by President Aquino.

---

## The Preamble

The Preamble is a statement of the Filipino people's aspirations and the purposes of the Constitution.

**Key concepts in the Preamble:**

- Sovereign Filipino people
- Aid of Almighty God
- Just and humane society
- Establish a Government
- Embody our ideals and aspirations
- Promote the common good
- Conserve and develop our patrimony
- Secure to ourselves and our posterity the blessings of independence and democracy
- Under the rule of law
- Regime of truth, justice, freedom, love, equality, and peace

**Common CSE question:** "Under what regime are the blessings of independence and democracy secured?" Answer: **Truth, justice, freedom, love, equality, and peace.**

---

## Article I: National Territory

The Philippines comprises:

- The Philippine archipelago
- All other territories over which the Philippines has sovereignty or jurisdiction
- The territorial sea, seabed, subsoil, insular shelves, and other submarine areas
- The waters around, between, and connecting the islands

**Key concept:** The **archipelagic doctrine** treats the Philippines as a single integrated unit.

---

## Article II: Declaration of Principles and State Policies

This article contains the foundational principles and policies of the Philippine state.

**Key principles to memorize:**

- **Section 1:** The Philippines is a democratic and republican State. Sovereignty resides in the people.
- **Section 2:** The Philippines renounces war as an instrument of national policy.
- **Section 3:** Civilian authority is supreme over the military.
- **Section 6:** The separation of Church and State shall be inviolable.
- **Section 7:** The State shall pursue an independent foreign policy.

---

## Article III: Bill of Rights (HEAVILY TESTED)

The Bill of Rights enumerates fundamental rights and freedoms. **This article is the single most tested portion of the Constitution in the CSE.**

### Key Sections to Memorize

**Section 1: Due Process and Equal Protection**
"No person shall be deprived of life, liberty, or property without due process of law, nor shall any person be denied the equal protection of the laws."

**Section 2: Search and Seizure**
"The right of the people to be secure in their persons, houses, papers, and effects against unreasonable searches and seizures of whatever nature and for any purpose shall be inviolable, and no search warrant or warrant of arrest shall issue except upon probable cause to be determined personally by the judge."

**Section 3: Privacy of Communication**
The privacy of communication and correspondence shall be inviolable except (1) upon lawful order of the court, or (2) when public safety or order requires.

**Section 4: Freedom of Expression**
"No law shall be passed abridging the freedom of speech, of expression, or of the press, or the right of the people peaceably to assemble and petition the government for redress of grievances."

**Section 5: Freedom of Religion**
"No law shall be made respecting an establishment of religion, or prohibiting the free exercise thereof."

**Section 7: Right to Information**
"The right of the people to information on matters of public concern shall be recognized."

**Section 11: Free Access to Courts**
Free access to courts and quasi-judicial bodies shall not be denied to any person by reason of poverty.

**Section 12: Rights of the Accused (Miranda Rights)**
Any person under investigation has the right to:
- Remain silent
- Have competent and independent counsel preferably of his own choice
- Be informed of his rights

**Section 14: Presumption of Innocence and Other Trial Rights**
"In all criminal prosecutions, the accused shall be presumed innocent until the contrary is proved."

**Section 17: No person shall be compelled to be a witness against himself.**

**Section 19: Prohibition Against Excessive Punishment**
"Excessive fines shall not be imposed, nor cruel, degrading or inhuman punishment inflicted."

**Section 20: No Imprisonment for Debt**
"No person shall be imprisoned for debt or non-payment of a poll tax."

**Section 21: Double Jeopardy**
"No person shall be twice put in jeopardy of punishment for the same offense."

---

## Article IV: Citizenship

**Filipino citizens are:**
1. Those who are citizens of the Philippines at the time of the adoption of the 1987 Constitution
2. Those whose fathers or mothers are citizens of the Philippines
3. Those born before January 17, 1973, of Filipino mothers, who elect Philippine citizenship upon reaching the age of majority
4. Those who are naturalized in accordance with law

---

## Article V: Suffrage

**Voting requirements:**
- Filipino citizens
- At least 18 years old
- Resident of the Philippines for at least one year
- Resident of the place where they propose to vote for at least six months

**No literacy, property, or other substantive requirements** can be imposed on the exercise of suffrage.

---

## Article VI: The Legislative Department

**Congress consists of:**
- **Senate:** 24 senators, 6-year term, maximum 2 consecutive terms
- **House of Representatives:** 250 maximum members, 3-year term, maximum 3 consecutive terms

**How a Bill Becomes Law:**

1. First Reading - Bill is introduced
2. Committee Hearing
3. Second Reading - Debate
4. Third Reading - Final vote
5. Transmittal to the other chamber (same process)
6. Bicameral Conference Committee (if disagreements)
7. Presidential approval or veto

**Veto override:** Two-thirds of all members of each chamber.

---

## Article VII: The Executive Department

**The President:**
- Single 6-year term, **no re-election**
- Must be at least 40 years old
- Filipino citizen by birth
- Resident of the Philippines for at least 10 years
- Registered voter

**Powers of the President:**
- Chief Executive
- Commander-in-Chief of the Armed Forces
- Power of Appointment
- Power to grant reprieves, commutations, pardons (after conviction by final judgment)
- Power to declare martial law (subject to congressional and judicial review)
- Power of Diplomatic Relations
- Veto Power

**The Vice President:**
- Same qualifications as President
- Single 6-year term, **may be re-elected once** (different from President!)

---

## Article VIII: The Judicial Department

**Supreme Court:**
- 1 Chief Justice and 14 Associate Justices (15 total)
- Appointed by the President from a list provided by the Judicial and Bar Council (JBC)
- Justices serve until age 70

**Power of judicial review:** Courts have authority to declare laws unconstitutional.

**Hierarchy of courts:**
1. Supreme Court
2. Court of Appeals
3. Regional Trial Courts
4. Municipal/Metropolitan Trial Courts

---

## Article IX: Constitutional Commissions

Three independent commissions:

**A. Civil Service Commission (CSC)**
- Central personnel agency of the government
- Administers the merit system

**B. Commission on Elections (COMELEC)**
- Enforces and administers election laws
- Decides election controversies

**C. Commission on Audit (COA)**
- Examines, audits government accounts
- Promotes financial accountability

Each commission has 7 members serving 7-year terms (rotating).

---

## Article X: Local Government

**Local Government Units (LGUs):**
- Provinces
- Cities (chartered or component)
- Municipalities
- Barangays

**Key principle:** **Local autonomy** - LGUs have power to govern local affairs.

**Officials:** Elected with 3-year terms, maximum 3 consecutive terms.

**Autonomous regions:** Currently the Bangsamoro Autonomous Region in Muslim Mindanao (BARMM) and historical Cordillera Administrative Region.

---

## Article XI: Accountability of Public Officers

**"Public office is a public trust."**

**Officials who can be impeached:**
- President
- Vice President
- Members of the Supreme Court
- Members of Constitutional Commissions
- Ombudsman

**Grounds for impeachment:** Culpable violation of the Constitution, treason, bribery, graft and corruption, other high crimes, or betrayal of public trust.

**Sandiganbayan:** Special anti-graft court for public officers.

**Office of the Ombudsman:** Investigates and prosecutes erring public officials.

---

## Articles XII to XVIII: Other Important Articles

**Article XII (National Economy and Patrimony):**
- 60-40 Filipino-foreign ownership requirement for certain industries
- Stewardship of natural resources

**Article XIII (Social Justice and Human Rights):**
- Agrarian reform
- Urban land reform and housing
- Health and ecology

**Article XIV (Education, Science and Technology, Arts, Culture, and Sports):**
- Free public elementary and secondary education
- Filipino as the national language

**Article XV (The Family):**
- Family as foundation of the nation
- Marriage as sanctuary

**Article XVI (General Provisions):**
- State flag and national anthem

**Article XVII (Amendments or Revisions):**
- Constitutional Convention
- Constitutional Assembly
- People's Initiative

**Article XVIII (Transitory Provisions):**
- Specific transitional rules

---

## Common CSE Constitution Questions

**1. "What is the supreme law of the Philippines?"** - The 1987 Philippine Constitution

**2. "How many articles does the Constitution have?"** - 18 articles

**3. "When was the Constitution ratified?"** - February 2, 1987

**4. "What is the Bill of Rights?"** - Article III

**5. "What is the term of a Senator?"** - 6 years

**6. "Maximum consecutive terms for a Representative?"** - 3 terms (9 years total)

**7. "Term limit for the President?"** - 1 term of 6 years, no re-election

**8. "Number of Supreme Court Justices?"** - 15 (1 Chief Justice + 14 Associate Justices)

**9. "Three Constitutional Commissions?"** - CSC, COMELEC, COA

**10. "Voting age in the Philippines?"** - 18 years old

---

## Strategy for the Constitution Section

**Read the actual text.** Download the 1987 Constitution from the Official Gazette (officialgazette.gov.ph). Read it at least twice.

**Memorize the Bill of Rights.** Article III is the most heavily tested. Know each section.

**Memorize term limits.** Senate (6 years, max 2 terms), House (3 years, max 3 terms), President (6 years, no re-election), VP (6 years, max 2 terms).

**Memorize the three branches.** Legislative, Executive, Judicial - their powers and structure.

**Use mnemonics.** "Three Cs" for Constitutional Commissions: CSC, COMELEC, COA.

---

## Practice the Constitution at LisensyaPrep

LisensyaPrep has free Philippine Constitution practice questions for CSE.

**[Start Constitution Practice at LisensyaPrep](/civil-service)**

---

## Related CSE Articles

- [Civil Service Exam Coverage 2026 Complete Subject Breakdown](/civil-service/cse-coverage-2026)
- [RA 6713 Code of Conduct Reviewer for CSE 2026](/civil-service/ra-6713-reviewer-cse)
- [How to Pass the Civil Service Exam on Your First Take](/civil-service/how-to-pass-civil-service-exam)
- [What is the Civil Service Exam Complete Guide](/blog/what-is-the-civil-service-exam)
- [CSE Schedule 2026 Complete Timeline](/civil-service/cse-schedule-2026)
`;

export default function PhilippineConstitutionReviewerCSEPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cse-constitution-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/civil-service","name":"Civil Service"},{"url":"/civil-service/philippine-constitution-reviewer-cse","name":"Philippine Constitution Reviewer"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/civil-service" className="text-gray-500 hover:text-gray-300 transition-colors">Civil Service</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Philippine Constitution Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service (CSE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Philippine Constitution Reviewer for CSE 2026 (Complete Guide Philippines)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 9, 2026</span><span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">Related CSE Articles</h2>
              <ul className="space-y-3">
                {ALL_CSE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Start Your CSE Practice</p>
              <p className="text-gray-400 text-sm mb-4">Free CSE practice questions. No account required.</p>
              <Link href="/civil-service" className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">CSE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_CSE_ARTICLES.map(({ text, href }) => (
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
      <ArticlePopupTriggers type="cse" />
    </div>
  );
}
