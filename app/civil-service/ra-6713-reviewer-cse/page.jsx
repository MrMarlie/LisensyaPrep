import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';

export const metadata = buildMetadata({
  title: 'RA 6713 Code of Conduct Reviewer for CSE 2026 (Complete Guide Philippines)',
  description:
    'Studying for the Civil Service Exam? This RA 6713 reviewer covers the Code of Conduct and Ethical Standards for Public Officials and Employees, the 8 norms of conduct, prohibited acts, and SALN tested in the CSE.',
  path: '/civil-service/ra-6713-reviewer-cse',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'RA 6713 Code of Conduct Reviewer for CSE 2026 Complete Guide Philippines',
  description:
    'Complete RA 6713 reviewer for the Civil Service Exam covering the 8 norms of conduct, prohibited acts, SALN requirements, divestment rules, and penalties for violations.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-09',
  dateModified: '2026-05-09',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/civil-service/ra-6713-reviewer-cse' },
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
**Republic Act 6713** is one of the most consistently tested topics in the Civil Service Exam General Information section. Approximately **5 to 10 items** test your knowledge of the Code of Conduct and Ethical Standards for Public Officials and Employees.

This deep dive reviewer covers every key provision of RA 6713 with focus on the specific sections that appear in CSE questions.

---

## What is RA 6713?

**Republic Act No. 6713** is officially titled the **"Code of Conduct and Ethical Standards for Public Officials and Employees."**

It was approved on **February 20, 1989**, during President Corazon Aquino's administration.

**Purpose:** To uphold the time-honored principle that public office is a public trust by establishing standards of personal conduct in the discharge and execution of official duties of public officials and employees.

---

## Coverage of RA 6713

**Who is covered?** All officials and employees of the government:
- National government agencies
- Local government units
- Government-owned and controlled corporations (GOCCs)
- State universities and colleges
- All branches: executive, legislative, and judicial

**Who is NOT covered?** Public officials whose conduct is governed by separate laws (such as judges and military personnel).

---

## Section 4: Norms of Conduct (THE 8 NORMS)

Section 4 of RA 6713 establishes **eight (8) norms of conduct** that every public official and employee must observe. **This is the most heavily tested section.**

### The 8 Norms (Memorize All)

**1. Commitment to public interest**
Public officials must always uphold public interest over personal interest.

**2. Professionalism**
They must perform duties with the highest degree of excellence, professionalism, intelligence, and skill.

**3. Justness and sincerity**
They must remain true to the people at all times. They must act with justness and sincerity.

**4. Political neutrality**
They must provide service without unfair discrimination. They must not engage in partisan political activities.

**5. Responsiveness to the public**
They must extend prompt, courteous, and adequate service to the public.

**6. Nationalism and patriotism**
They must be loyal to the Republic and the Filipino people. They must promote the use of locally produced goods, resources, and technology.

**7. Commitment to democracy**
They must commit to the principles of democracy and republicanism. They must observe orderly transitions in democratic processes.

**8. Simple living**
They must lead modest lives appropriate to their positions and income. Public officials must not indulge in extravagant or ostentatious display of wealth.

### Memory Aid

Remember the acronym: **C-P-J-P-R-N-D-S** (Commitment, Professionalism, Justness, Political neutrality, Responsiveness, Nationalism, Democracy, Simple living)

---

## Section 7: Prohibited Acts and Transactions

Section 7 prohibits public officials from certain acts that conflict with their duties.

### Key Prohibitions

**1. Financial and material interest**
Public officials shall not directly or indirectly have any financial or material interest in any transaction requiring approval of their office.

**2. Outside employment and other activities related thereto**
Public officials shall not engage in private practice of their profession unless authorized by the Constitution or law, and provided that this does not conflict with their official functions.

**3. Disclosure and/or misuse of confidential information**
Public officials shall not use or divulge confidential or classified information officially known to them by reason of their office for personal gain or unwarranted advantage.

**4. Solicitation or acceptance of gifts**
Public officials shall not solicit or accept, directly or indirectly, any gift, gratuity, favor, entertainment, loan, or anything of monetary value from any person.

**Exceptions** (when gifts are NOT prohibited):
- Unsolicited gift of nominal or insignificant value
- Gifts from relatives within the third civil degree
- Honorarium granted by educational institutions for participating in educational/scientific activities

---

## Section 8: Statements and Disclosure (SALN)

This section requires public officials and employees to file a **Statement of Assets, Liabilities, and Net Worth (SALN)**.

### Who Must File a SALN?

All public officials and employees, including:
- Constitutional and elected officials and their personal staff
- Regular and special non-career service personnel
- Career executive service personnel
- Regular non-career permanent personnel of GOCCs
- All other public officers and employees

### Who is Exempt from Filing?

- Those serving in honorary capacity
- Laborers
- Casual or temporary workers

### When to File the SALN

**Initial:** Within 30 days after assumption of office or employment.

**Annual:** **On or before April 30** of every year covering the previous calendar year.

**Termination:** Within 30 days after separation from service.

### What the SALN Must Contain

The SALN must contain a true, detailed, and sworn declaration of:
- Assets (real and personal property)
- Liabilities (debts and obligations)
- Net worth (assets minus liabilities)
- Financial connections and business interests
- Identification of relatives in the government service within the fourth civil degree of consanguinity or affinity

---

## Section 9: Divestment

Public officials with substantial financial or material interest that may conflict with their duties must divest themselves of such interests within **60 days** from assumption of office.

---

## Section 10: Review and Compliance Procedures

Each agency designates a **Compliance Committee** that:
- Reviews SALN submissions
- Investigates non-compliance
- Submits annual reports

---

## Section 11: Penalties for Violations

Violations of RA 6713 carry the following penalties depending on severity:

### Light Offenses
- Verbal reprimand
- Censure

### Less Grave Offenses
- 30 days suspension
- Forfeiture of leave credits

### Grave Offenses
- 6 months to 1 year suspension
- Removal from service
- Disqualification from public office
- Forfeiture of retirement benefits

**Civil and criminal penalties** may also apply, including:
- Fines from PHP 1,000 to PHP 5,000
- Imprisonment up to 5 years
- Both fine and imprisonment in serious cases

---

## Section 14: Whistleblower Protection

Public officials and employees who report violations of RA 6713 are protected from retaliation. They are entitled to:
- Protection from harassment
- Job security
- Such other protective measures

---

## Common CSE Questions on RA 6713

**1. What is the title of RA 6713?**
**Answer:** Code of Conduct and Ethical Standards for Public Officials and Employees

**2. How many norms of conduct are established under RA 6713?**
**Answer:** Eight (8)

**3. When must the annual SALN be filed?**
**Answer:** On or before April 30 of every year

**4. Who must file a SALN?**
**Answer:** All public officials and employees, except those serving in honorary capacity, laborers, and casual or temporary workers

**5. Within what period must a public official divest conflicting interests?**
**Answer:** 60 days from assumption of office

**6. What is the principle underlying RA 6713?**
**Answer:** Public office is a public trust

**7. Are gifts from relatives within the third civil degree prohibited?**
**Answer:** No, they are exempted

**8. What is the maximum penalty for grave violations of RA 6713?**
**Answer:** Removal from service, disqualification from public office, and forfeiture of retirement benefits, plus possible criminal penalties

---

## Memorization Strategy for RA 6713

**Master the 8 Norms first.** This is the most heavily tested section. Use the C-P-J-P-R-N-D-S acronym.

**Memorize the SALN deadline.** April 30 is a frequently asked date.

**Know the prohibited acts.** Especially the gift exceptions which often appear in questions.

**Understand the penalties.** Grave offense penalties are severe and often tested.

**Read the actual law.** Download RA 6713 from the Official Gazette (officialgazette.gov.ph). Reading the actual text catches details that summaries miss.

---

## Common Mistakes on RA 6713 Questions

**Mistake 1: Confusing 8 norms with prohibited acts.** The 8 norms are positive obligations (what to do). Prohibited acts are negative obligations (what NOT to do). Different sections.

**Mistake 2: Wrong SALN deadline.** April 30, not April 15 (which is BIR income tax deadline).

**Mistake 3: Forgetting gift exceptions.** Not all gifts are prohibited. Know the exceptions.

**Mistake 4: Confusing civil degree.** SALN requires disclosure of relatives within the **fourth** civil degree, while the divestment provision uses different thresholds.

---

## Practice RA 6713 Questions at LisensyaPrep

LisensyaPrep has free RA 6713 practice questions for CSE.

**[Start RA 6713 Practice at LisensyaPrep](/civil-service)**

---

## Related CSE Articles

- [Civil Service Exam Coverage 2026 Complete Subject Breakdown](/civil-service/cse-coverage-2026)
- [Philippine Constitution Reviewer for CSE 2026](/civil-service/philippine-constitution-reviewer-cse)
- [How to Pass the Civil Service Exam on Your First Take](/civil-service/how-to-pass-civil-service-exam)
- [What is the Civil Service Exam Complete Guide](/blog/what-is-the-civil-service-exam)
- [Verbal Ability Reviewer for CSE 2026](/civil-service/verbal-ability-reviewer-cse)
`;

export default function RA6713ReviewerCSEPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cse-ra6713-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/civil-service","name":"Civil Service"},{"url":"/civil-service/ra-6713-reviewer-cse","name":"RA 6713 Code of Conduct Reviewer"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/civil-service" className="text-gray-500 hover:text-gray-300 transition-colors">Civil Service</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">RA 6713 Code of Conduct Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service (CSE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                RA 6713 Code of Conduct Reviewer for CSE 2026 (Complete Guide Philippines)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 9, 2026</span><span>•</span>
                <span>10 min read</span>
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
