import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Correctional Administration Reviewer for CLE Philippines 2026',
  description:
    'Studying for the PRC criminology board exam? This correctional administration reviewer covers penology theories, BuCor, BJMP, RA 10575, and rehabilitation programs tested in the CLE.',
  path: '/criminology/correctional-administration-reviewer',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Correctional Administration Reviewer for CLE Philippines 2026',
  description:
    'Complete correctional administration reviewer for the PRC Criminologist Licensure Examination covering penology theories, BuCor, BJMP, RA 10575, and rehabilitation programs.',
  image: 'https://lisensyaprep.com/images/articles/hero-cle-correctional-administration.jpg',
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
    '@id': 'https://lisensyaprep.com/criminology/correctional-administration-reviewer',
  },
};

const RELATED_ARTICLES = [
  { text: 'CLE Coverage 2026: Complete Subject Breakdown', href: '/criminology/cle-coverage-2026' },
  { text: 'Juvenile Delinquency and Crime Prevention Reviewer', href: '/criminology/juvenile-delinquency-crime-prevention-reviewer' },
  { text: 'Criminal Sociology and Ethics Reviewer CLE 2026', href: '/criminology/criminal-sociology-ethics-reviewer' },
  { text: 'Criminal Jurisprudence and Procedure Reviewer', href: '/criminology/criminal-jurisprudence-procedure-reviewer' },
  { text: 'How to Pass the Criminology Board Exam (CLE 2026)', href: '/blog/how-to-pass-criminology-board-exam' },
];

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
  return result;
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

const INTRO = `
Correctional Administration covers what happens to an offender after conviction. It deals with the Philippine prison system, the theories behind punishment, the laws governing corrections, and the programs designed to rehabilitate offenders and eventually return them to society.

Many CLE reviewees treat this subject as secondary to criminal law or police administration. That is a mistake. It follows a clear structure once you understand the philosophy behind it and the specific laws that apply. This reviewer covers everything you need for exam day.
`;

const AFTER_THEORIES = `
---

## The Philippine Correctional System

### Bureau of Corrections (BuCor)

BuCor handles national prisoners sentenced to three years and one day or more. It operates under the Department of Justice.

**Republic Act 10575 (Bureau of Corrections Act of 2013)** is the primary law governing BuCor. It reorganized BuCor, created the position of Director General appointed by the President, set new personnel qualification standards, and strengthened the rehabilitation mandate requiring education, livelihood training, and values formation programs for all inmates.

### Bureau of Jail Management and Penology (BJMP)

The BJMP handles prisoners in city, district, and municipal jails, primarily those awaiting trial or serving three years or less. It operates under the DILG, making it organizationally separate from BuCor. This distinction is frequently tested in the CLE.

### Provincial Jails

Managed by the provincial government. They house prisoners serving six months and one day to three years.

### Parole and Probation Administration (PPA)

The PPA handles offenders on parole or probation as alternatives to imprisonment. Probation is governed by Presidential Decree 968 as amended by RA 10707.
`;

const AFTER_CLASSIFICATION = `
---

## BuCor Correctional Institutions

**New Bilibid Prison (NBP)** in Muntinlupa City is the largest BuCor facility housing maximum, medium, and minimum security inmates.

**Correctional Institution for Women (CIW)** in Mandaluyong City is the national facility for female inmates sentenced to three years and one day or more.

**Davao Prison and Penal Farm** in Davao del Norte houses medium and minimum security inmates with a strong agricultural rehabilitation program.

**Iwahig Prison and Penal Farm** in Palawan uses an open-colony approach where minimum security inmates live and work with significant freedom of movement.

**Sablayan Prison and Penal Farm** in Occidental Mindoro and **Leyte Regional Prison** complete the BuCor facility network.

---

## Security Level Classification

**Maximum security** covers those convicted of heinous crimes, those with long sentences remaining, or those with disciplinary problems.

**Medium security** applies to inmates who have demonstrated improved behavior and are considered lower risk.

**Minimum security** applies to inmates nearing the end of their sentence with good behavior records, eligible for work assignments outside the main facility.

---

## Key Laws Summary

| Law | What It Covers |
|-----|---------------|
| RA 10575 | Bureau of Corrections Act |
| RA 9263 | Professionalization of BJMP and BFP |
| PD 968 | Probation Law |
| Act 4103 | Indeterminate Sentence Law |
| RA 10707 | Amendment to the Probation Law |
`;

export default function CorrectionalAdministrationPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cle-corrections" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Article */}
          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/criminology" className="text-gray-500 hover:text-gray-300 transition-colors">Criminology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Correctional Administration Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400">
                Criminology (CLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Correctional Administration Reviewer for CLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 23, 2026</span>
                <span>•</span>
                <span>10 min read</span>
              </div>
            </header>

            <img
              src="/images/articles/hero-cle-correctional-administration.jpg"
              alt="Licensed criminologist in professional attire for CLE correctional administration reviewer Philippines 2026"
              width={1200}
              height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              loading="eager"
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <AdPlaceholder slot="banner" className="my-6" />

              <h2 className="text-2xl font-extrabold text-white mt-8 mb-4">Theories of Punishment</h2>
              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="340" fill="#0f172a" rx="10"/>
                  <text x="380" y="32" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="700" fontFamily="Georgia,serif">Five Theories of Punishment (Penology)</text>
                  <line x1="60" y1="44" x2="700" y2="44" stroke="#334155" strokeWidth="1"/>
                  <rect x="60" y="54" width="620" height="44" fill="#1e3a5f" rx="6"/>
                  <text x="175" y="72" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">RETRIBUTION</text>
                  <text x="175" y="88" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Oldest theory</text>
                  <text x="450" y="80" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontFamily="Arial,sans-serif">Punishment is deserved. Penalty must be proportional to the crime.</text>
                  <rect x="60" y="104" width="620" height="44" fill="#172033" rx="6"/>
                  <text x="175" y="122" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">DETERRENCE</text>
                  <text x="175" y="138" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">General and Specific</text>
                  <text x="450" y="130" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontFamily="Arial,sans-serif">General deters public. Specific deters the individual offender.</text>
                  <rect x="60" y="154" width="620" height="44" fill="#1e3a5f" rx="6"/>
                  <text x="175" y="172" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">INCAPACITATION</text>
                  <text x="175" y="188" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Removal from society</text>
                  <text x="450" y="180" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontFamily="Arial,sans-serif">Removes offender so he cannot commit further crimes against the public.</text>
                  <rect x="60" y="204" width="620" height="44" fill="#14532d" rx="6"/>
                  <text x="175" y="222" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">REHABILITATION</text>
                  <text x="175" y="238" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">Modern corrections focus</text>
                  <text x="450" y="230" textAnchor="middle" fill="#d1fae5" fontSize="12" fontFamily="Arial,sans-serif">Offenders reformed through education and treatment to rejoin society.</text>
                  <rect x="60" y="254" width="620" height="44" fill="#172033" rx="6"/>
                  <text x="175" y="272" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">RESTORATIVE JUSTICE</text>
                  <text x="175" y="288" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Most recent development</text>
                  <text x="450" y="280" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontFamily="Arial,sans-serif">Repairs harm caused by crime involving offender, victim, and community.</text>
                  <text x="380" y="328" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | CLE Correctional Administration Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Five major theories of punishment tested in the CLE</figcaption>
              </figure>

              {renderContent(AFTER_THEORIES)}

              <h2 className="text-2xl font-extrabold text-white mt-8 mb-4">Prisoner Classification Quick Reference</h2>
              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="240" fill="#0f172a" rx="10"/>
                  <text x="380" y="28" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Prisoner Classification and Custodial Agency</text>
                  <line x1="40" y1="40" x2="720" y2="40" stroke="#334155" strokeWidth="1"/>
                  <text x="190" y="58" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PRISONER TYPE</text>
                  <text x="430" y="58" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">SENTENCE LENGTH</text>
                  <text x="640" y="58" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">AGENCY</text>
                  <line x1="40" y1="66" x2="720" y2="66" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="72" width="680" height="36" fill="#1e3a5f" rx="5"/>
                  <text x="190" y="95" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">National Prisoner</text>
                  <text x="430" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontFamily="Arial,sans-serif">3 years and 1 day or more</text>
                  <text x="640" y="95" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">BuCor</text>
                  <rect x="40" y="114" width="680" height="36" fill="#172033" rx="5"/>
                  <text x="190" y="137" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">City or Municipal Detainee</text>
                  <text x="430" y="137" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontFamily="Arial,sans-serif">Awaiting trial or 3 years or less</text>
                  <text x="640" y="137" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">BJMP</text>
                  <rect x="40" y="156" width="680" height="36" fill="#1e3a5f" rx="5"/>
                  <text x="190" y="179" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Provincial Prisoner</text>
                  <text x="430" y="179" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontFamily="Arial,sans-serif">6 months and 1 day to 3 years</text>
                  <text x="640" y="179" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Provincial Jail</text>
                  <rect x="40" y="198" width="680" height="28" fill="#172033" rx="5"/>
                  <text x="190" y="217" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Probationer or Parolee</text>
                  <text x="430" y="217" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontFamily="Arial,sans-serif">Sentenced but released under supervision</text>
                  <text x="640" y="217" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">PPA</text>
                  <text x="380" y="234" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Prisoner classification by sentence length and responsible agency</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(AFTER_CLASSIFICATION)}
            </div>

            {/* CTA */}
            <div className="mt-10 bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-red-400 font-extrabold text-lg mb-2">Practice What You Just Learned</p>
              <p className="text-gray-400 text-sm mb-4">
                Head to LisensyaPrep and start answering Correctional Administration practice questions now. No registration required.
              </p>
              <Link
                href="/criminology"
                className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                ⚔️ Start Practicing at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

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
