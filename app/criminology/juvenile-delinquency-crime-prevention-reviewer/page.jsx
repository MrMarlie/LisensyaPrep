import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Juvenile Delinquency and Crime Prevention Reviewer CLE Philippines 2026',
  description:
    'Preparing for the PRC criminology board exam? This juvenile delinquency and crime prevention reviewer covers RA 9344, CICL, diversion programs, and crime prevention strategies tested in the CLE.',
  path: '/criminology/juvenile-delinquency-crime-prevention-reviewer',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Juvenile Delinquency and Crime Prevention Reviewer for CLE Philippines 2026',
  description:
    'Complete juvenile delinquency and crime prevention reviewer for the PRC Criminologist Licensure Examination covering RA 9344, CICL, diversion programs, theories of delinquency, and crime prevention strategies.',
  image: 'https://lisensyaprep.com/images/articles/hero-cle-juvenile-delinquency.jpg',
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
    '@id': 'https://lisensyaprep.com/criminology/juvenile-delinquency-crime-prevention-reviewer',
  },
};

const RELATED_ARTICLES = [
  { text: 'CLE Coverage 2026: Complete Subject Breakdown', href: '/criminology/cle-coverage-2026' },
  { text: 'Correctional Administration Reviewer CLE 2026', href: '/criminology/correctional-administration-reviewer' },
  { text: 'Criminal Sociology and Ethics Reviewer CLE 2026', href: '/criminology/criminal-sociology-ethics-reviewer' },
  { text: 'Criminal Jurisprudence and Procedure Reviewer', href: '/criminology/criminal-jurisprudence-procedure-reviewer' },
  { text: 'How to Pass the Criminology Board Exam (CLE 2026)', href: '/blog/how-to-pass-criminology-board-exam' },
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
Juvenile Delinquency and Crime Prevention is built around one landmark law, Republic Act 9344, and several theories of juvenile delinquency that appear consistently in CLE scenario questions. Once you understand that structure, this becomes one of the more manageable subjects in the entire CLE.
`;

const AFTER_THEORIES = `
---

## Republic Act 9344: Juvenile Justice and Welfare Act of 2006

RA 9344 is the most important law in this subject for the CLE. It establishes the Philippine framework for handling children in conflict with the law and sets the minimum age of criminal responsibility.

### Minimum Age of Criminal Responsibility (MACR)

Under RA 9344 as amended by Republic Act 10630, the minimum age of criminal responsibility is **15 years old.** A child who is 15 years of age or under at the time of the commission of the offense is exempt from criminal liability.

A child above 15 but below 18 may be held criminally responsible only if he or she acted with **discernment**, meaning the mental capacity to understand the difference between right and wrong and appreciate the consequences of an act.

### Children in Conflict with the Law (CICL)

A CICL is any person who at the time of the commission of the offense is below 18 years of age. Under RA 9344, CICL have specific rights including the right to be presumed innocent, the right to privacy and confidentiality of proceedings, the right to diversion if appropriate, and the right not to be subjected to torture or cruel treatment.

### Diversion Levels

Diversion is an alternative process that keeps children out of the formal justice system.

**Barangay level:** Offenses with imposable penalty of not more than 6 years.

**Law enforcement level:** Offenses with imposable penalty of not more than 12 years.

**Court level:** Higher penalties where the court has discretion to order diversion.

---

## RA 10630: Amendment to RA 9344

RA 10630 established Intensive Juvenile Intervention and Support Centers (IJISCs) for CICL above 12 but below 15 years of age who commit heinous crimes such as murder, rape, and kidnapping. It also strengthened provisions preventing CICL from being detained with adult offenders.
`;

const AFTER_AGENCIES = `
---

## Crime Prevention: Primary, Secondary, and Tertiary

This is the most commonly tested crime prevention framework in the CLE.

**Primary prevention** targets the general population before any criminal behavior occurs. It addresses social and economic conditions that create risk of crime through community development and public education.

**Secondary prevention** focuses on individuals or groups at higher risk of criminal activity. Early intervention programs for at-risk youth and mentorship initiatives fall here.

**Tertiary prevention** targets individuals who have already committed offenses, focusing on preventing reoffending. Rehabilitation programs, parole supervision, and probation fall under tertiary prevention.

---

## Key Provisions Quick Reference

| Provision | Details |
|-----------|---------|
| MACR | 15 years old and below are exempt from criminal liability |
| Ages 15 to 18 without discernment | Exempt from criminal liability |
| Ages 15 to 18 with discernment | May be held criminally liable |
| Diversion at barangay level | Offenses with penalty of not more than 6 years |
| Diversion at law enforcement level | Offenses with penalty of not more than 12 years |
| Heinous crimes by CICL ages 12 to 15 | Placement in IJISC |
| Managing agency for youth detention | DSWD |
| Coordinating body | JJWC |
`;

export default function JuvenileDelinquencyPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cle-juvenile" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/criminology" className="text-gray-500 hover:text-gray-300 transition-colors">Criminology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Juvenile Delinquency Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400">
                Criminology (CLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Juvenile Delinquency and Crime Prevention Reviewer for CLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 23, 2026</span>
                <span>•</span>
                <span>10 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-cle-juvenile-delinquency.jpg"
              alt="Mentor and youth in community setting for CLE juvenile delinquency crime prevention reviewer Philippines 2026"
              width={1200}
              height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <AdPlaceholder slot="banner" className="my-6" />

              <h2 className="text-2xl font-extrabold text-white mt-8 mb-4">Theories of Juvenile Delinquency</h2>
              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="360" fill="#0f172a" rx="10"/>
                  <text x="380" y="32" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="700" fontFamily="Georgia,serif">Major Theories of Juvenile Delinquency</text>
                  <line x1="60" y1="44" x2="700" y2="44" stroke="#334155" strokeWidth="1"/>
                  <rect x="60" y="54" width="620" height="50" fill="#1e3a5f" rx="6"/>
                  <text x="190" y="74" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">STRAIN THEORY</text>
                  <text x="190" y="90" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Robert Merton</text>
                  <text x="470" y="74" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Delinquency results when individuals cannot achieve</text>
                  <text x="470" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">accepted goals through legitimate means.</text>
                  <rect x="60" y="110" width="620" height="50" fill="#172033" rx="6"/>
                  <text x="190" y="130" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">SOCIAL LEARNING THEORY</text>
                  <text x="190" y="146" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Albert Bandura</text>
                  <text x="470" y="130" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Criminal behavior is learned through observation</text>
                  <text x="470" y="146" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">and imitation of criminal role models.</text>
                  <rect x="60" y="166" width="620" height="50" fill="#1e3a5f" rx="6"/>
                  <text x="190" y="186" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">SOCIAL CONTROL THEORY</text>
                  <text x="190" y="202" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Travis Hirschi</text>
                  <text x="470" y="186" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Delinquency occurs when social bonds are weak.</text>
                  <text x="470" y="202" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Bonds: attachment, commitment, involvement, belief.</text>
                  <rect x="60" y="222" width="620" height="50" fill="#14532d" rx="6"/>
                  <text x="190" y="242" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">LABELING THEORY</text>
                  <text x="190" y="258" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">Becker and Lemert</text>
                  <text x="470" y="242" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Being labeled delinquent becomes a self-fulfilling prophecy.</text>
                  <text x="470" y="258" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Foundation for RA 9344 diversion and confidentiality approach.</text>
                  <rect x="60" y="278" width="620" height="50" fill="#172033" rx="6"/>
                  <text x="190" y="298" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">BROKEN WINDOWS THEORY</text>
                  <text x="190" y="314" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Wilson and Kelling</text>
                  <text x="470" y="298" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Visible disorder signals neglect and invites more serious crime.</text>
                  <text x="470" y="314" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Prevention: address disorder before it escalates.</text>
                  <text x="380" y="350" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | CLE Juvenile Delinquency Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Major theories of juvenile delinquency for the CLE</figcaption>
              </figure>

              {renderContent(AFTER_THEORIES)}

              <h2 className="text-2xl font-extrabold text-white mt-8 mb-4">Key Government Agencies Under RA 9344</h2>
              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 220" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="220" fill="#0f172a" rx="10"/>
                  <text x="380" y="28" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Key Agencies Under RA 9344</text>
                  <line x1="40" y1="40" x2="720" y2="40" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="34" fill="#1e3a5f" rx="5"/>
                  <text x="220" y="72" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">JJWC (Juvenile Justice and Welfare Council)</text>
                  <text x="560" y="72" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Central coordinating body. Chaired by DOJ Secretary.</text>
                  <rect x="40" y="90" width="680" height="34" fill="#172033" rx="5"/>
                  <text x="220" y="112" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">LCPC (Local Councils for Protection of Children)</text>
                  <text x="560" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Provincial, city, and municipal level coordination.</text>
                  <rect x="40" y="130" width="680" height="34" fill="#1e3a5f" rx="5"/>
                  <text x="220" y="152" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">BCPC (Barangay Council for Protection of Children)</text>
                  <text x="560" y="152" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">First point of contact at barangay level.</text>
                  <rect x="40" y="170" width="680" height="34" fill="#14532d" rx="5"/>
                  <text x="220" y="192" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">DSWD (Dept of Social Welfare and Development)</text>
                  <text x="560" y="192" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Manages youth detention homes and social services.</text>
                  <text x="380" y="213" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Government agencies responsible for juvenile justice under RA 9344</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(AFTER_AGENCIES)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-red-400 font-extrabold text-lg mb-2">Practice What You Just Learned</p>
              <p className="text-gray-400 text-sm mb-4">
                LisensyaPrep has practice questions for Juvenile Delinquency and Crime Prevention covering CICL definitions, RA 9344 provisions, diversion rules, crime prevention levels, and theory-based scenarios. No sign-up required.
              </p>
              <Link href="/criminology" className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                ⚔️ Start Practicing at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">Related CLE Reviewer Articles</h2>
              <ul className="space-y-3">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>

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
