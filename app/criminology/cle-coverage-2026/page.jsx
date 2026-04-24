import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'CLE Coverage 2026 Complete Subject Breakdown for Criminology Board Exam Philippines',
  description:
    'What does the PRC criminology board exam cover in 2026? Complete CLE subject breakdown covering all six tested areas with study guides and reviewer links for each topic.',
  path: '/criminology/cle-coverage-2026',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'CLE Coverage 2026: Complete Subject Breakdown for the Criminology Board Exam',
  description:
    'Complete breakdown of all six CLE subject areas for the 2026 PRC Criminologist Licensure Examination with deep-dive reviewer links for each subject.',
  image: 'https://lisensyaprep.com/images/articles/hero-cle-coverage-2026.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-23',
  dateModified: '2026-04-23',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://lisensyaprep.com/criminology/cle-coverage-2026',
  },
};

const ALL_CLE_ARTICLES = [
  { text: 'How to Pass the Criminology Board Exam (CLE 2026)', href: '/blog/how-to-pass-criminology-board-exam' },
  { text: 'Criminal Jurisprudence and Procedure Reviewer', href: '/criminology/criminal-jurisprudence-procedure-reviewer' },
  { text: 'Law Enforcement Administration Reviewer', href: '/criminology/law-enforcement-administration-reviewer' },
  { text: 'Criminalistics and Dactyloscopy Reviewer', href: '/criminology/criminalistics-dactyloscopy-reviewer' },
  { text: 'Correctional Administration Reviewer CLE 2026', href: '/criminology/correctional-administration-reviewer' },
  { text: 'Juvenile Delinquency and Crime Prevention Reviewer', href: '/criminology/juvenile-delinquency-crime-prevention-reviewer' },
  { text: 'Criminal Sociology and Ethics Reviewer CLE 2026', href: '/criminology/criminal-sociology-ethics-reviewer' },
  { text: 'How to Apply for CLE via PRC LERIS 2026', href: '/criminology/cle-application-guide-2026' },
  { text: 'CLE Passing Rate and Results 2026', href: '/criminology/cle-passing-rate-results-2026' },
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
  let inTable = false;
  for (const el of elements) {
    if (el.type === 'tr') { inTable = true; tableBuffer.push(el); }
    else {
      if (inTable) { wrapped.push(<div key={`tbl-${key++}`} className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>); tableBuffer = []; inTable = false; }
      wrapped.push(el);
    }
  }
  if (inTable && tableBuffer.length) wrapped.push(<div key="tbl-final" className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>);
  return wrapped;
}

const INTRO = `
The first question most CLE reviewees have is: what exactly does the exam cover? PRC does not publish a granular item breakdown per subject, but we know the six major subject areas, the general topics within each, and which areas historically carry the most exam items based on the experience of CLE passers across multiple cycles.

This page is your complete study map. It links to the deep-dive reviewer for every subject on LisensyaPrep.

---

## CLE Overview

**To pass the CLE you need:** A general weighted average of at least 75 percent, with no individual subject falling below 60 percent. Passing five subjects with high scores but failing one below 60 percent means you did not pass even if your overall average is above 75.
`;

const SUBJECTS = `
---

## The Six CLE Subject Areas

### 1. Criminal Jurisprudence and Procedure

The law-heavy foundation of the CLE. Covers the Revised Penal Code, Rules of Court on criminal procedure, and major special penal laws. Historically carries significant exam weight.

**Major topics:** RPC Book One (felonies, circumstances affecting liability, stages of execution, conspiracy), RPC Book Two (crimes against persons, property, chastity), criminal procedure (complaint, warrant, bail, arraignment, trial), special laws (RA 9165, RA 9262, RA 10591, PD 1829).

---

### 2. Law Enforcement Administration

Covers PNP organizational structure, laws that govern it, and operational procedures that define police work.

**Major topics:** RA 6975 (PNP creation, civilian character, mandate), RA 8551 (PNP Reform Act, NAPOLCOM powers, retirement), PNP organizational structure, NAPOLCOM composition and powers, lawful and warrantless arrest, Miranda rights, search and seizure.

---

### 3. Crime Detection and Investigation (Criminalistics)

Covers scientific methods used to detect, document, and investigate crimes. Dactyloscopy is the most consistently tested topic.

**Major topics:** Dactyloscopy (pattern types, fingerprint classification, minutiae), forensic ballistics, questioned documents examination, crime scene investigation procedures, chain of custody.

---

### 4. Correctional Administration

Covers what happens after conviction: theories of punishment, the Philippine prison system, corrections laws, and rehabilitation programs.

**Major topics:** Five theories of penology, BuCor, BJMP, provincial jails, PPA, RA 10575, BuCor facilities (NBP, CIW, Davao, Iwahig), prisoner classification by security level, probation under PD 968.

---

### 5. Juvenile Delinquency and Crime Prevention

Covers theories of juvenile delinquency, the Philippine legal framework for juvenile offenders, and crime prevention strategies.

**Major topics:** Strain Theory, Social Learning Theory, Social Control Theory, Labeling Theory, Broken Windows Theory, RA 9344 as amended by RA 10630, CICL, minimum age of criminal responsibility (15), discernment, diversion levels, JJWC, BCPC, DSWD, primary secondary and tertiary prevention.

---

### 6. Criminal Sociology and Ethics

The most theory-heavy subject. Covers schools of criminological thought, specific theories of crime causation, and professional ethics for licensed criminologists.

**Major topics:** Classical School (Beccaria, Bentham), Positivist School (Lombroso, born criminal theory), Chicago School (Social Disorganization), Anomie (Durkheim, Merton), Differential Association (Sutherland), Conflict Theory (Marx, Vold), Routine Activities (Cohen, Felson), professional ethics, RA 6506.

---

## How to Use This Study Map

**Week 1:** Take a diagnostic practice quiz at LisensyaPrep for each of the six subjects. See immediately which ones need the most attention.

**Weeks 2 to 5:** Read the full reviewer for each subject starting with your weakest. After each reviewer, practice questions for that subject at LisensyaPrep to test comprehension.

**Weeks 6 to 8:** Take full mixed-subject practice sessions to simulate actual exam conditions.

**Final 2 weeks:** Focus only on weak spots identified from practice. Rest and protect your sleep.

---

## CLE Quick Facts 2026

| Detail | Information |
|--------|-------------|
| Exam Name | Criminologist Licensure Examination (CLE) |
| Administered By | PRC Board of Criminology |
| Number of Subjects | 6 |
| Passing Score | 75% general average, no subject below 60% |
| Exam Cycles | February and August |
| February 2026 Passing Rate | 65.99% |
| Application Portal | online.prc.gov.ph |
`;

export default function CleCoverage2026Page() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cle-coverage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/criminology" className="text-gray-500 hover:text-gray-300 transition-colors">Criminology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">CLE Coverage 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400">Criminology (CLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                CLE Coverage 2026: Complete Subject Breakdown for the Criminology Board Exam
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>April 23, 2026</span><span>•</span>
                <span>8 min read</span>
              </div>
            </header>

            <img
              src="/images/articles/hero-cle-coverage-2026.jpg"
              alt="Filipino criminology graduate in academic gown holding diploma for CLE coverage 2026 Philippines"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              loading="eager"
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 180" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="180" fill="#0f172a" rx="10"/>
                  <text x="380" y="28" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">CLE February 2026 Official Results</text>
                  <line x1="60" y1="40" x2="700" y2="40" stroke="#334155" strokeWidth="1"/>
                  <rect x="80" y="55" width="180" height="80" fill="#1e3a5f" rx="8"/>
                  <text x="170" y="85" textAnchor="middle" fill="#f59e0b" fontSize="28" fontWeight="700" fontFamily="Arial,sans-serif">45,936</text>
                  <text x="170" y="108" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="Arial,sans-serif">Total Examinees</text>
                  <text x="170" y="124" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Feb 2026</text>
                  <rect x="290" y="55" width="180" height="80" fill="#14532d" rx="8"/>
                  <text x="380" y="85" textAnchor="middle" fill="#86efac" fontSize="28" fontWeight="700" fontFamily="Arial,sans-serif">30,320</text>
                  <text x="380" y="108" textAnchor="middle" fill="#d1fae5" fontSize="12" fontFamily="Arial,sans-serif">Total Passers</text>
                  <text x="380" y="124" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">Feb 2026</text>
                  <rect x="500" y="55" width="180" height="80" fill="#78350f" rx="8"/>
                  <text x="590" y="85" textAnchor="middle" fill="#fcd34d" fontSize="28" fontWeight="700" fontFamily="Arial,sans-serif">65.99%</text>
                  <text x="590" y="108" textAnchor="middle" fill="#fef3c7" fontSize="12" fontFamily="Arial,sans-serif">Passing Rate</text>
                  <text x="590" y="124" textAnchor="middle" fill="#fcd34d" fontSize="10" fontFamily="Arial,sans-serif">Feb 2026</text>
                  <text x="380" y="168" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">Source: Professional Regulation Commission | LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>CLE February 2026 official PRC results</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(SUBJECTS)}
            </div>

            {/* All CLE Articles */}
            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">All CLE Articles on LisensyaPrep</h2>
              <ul className="space-y-3">
                {ALL_CLE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-red-400 font-extrabold text-lg mb-2">Start Your CLE Review</p>
              <p className="text-gray-400 text-sm mb-4">Free practice questions for all six CLE subjects. No account required.</p>
              <Link href="/criminology" className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                ⚔️ Start Practicing at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">CLE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_CLE_ARTICLES.slice(0, 6).map(({ text, href }) => (
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
