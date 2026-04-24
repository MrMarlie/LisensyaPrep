import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Criminal Sociology and Ethics Reviewer for CLE Philippines 2026',
  description:
    'Preparing for the PRC criminology board exam? This criminal sociology and ethics reviewer covers major criminological theories, schools of thought, and professional ethics for CLE examinees.',
  path: '/criminology/criminal-sociology-ethics-reviewer',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Criminal Sociology and Ethics Reviewer for CLE Philippines 2026',
  description:
    'Complete criminal sociology and ethics reviewer for the PRC Criminologist Licensure Examination covering Classical and Positivist schools, major criminological theories, and professional ethics.',
  image: 'https://lisensyaprep.com/images/articles/hero-cle-criminal-sociology-ethics.jpg',
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
    '@id': 'https://lisensyaprep.com/criminology/criminal-sociology-ethics-reviewer',
  },
};

const RELATED_ARTICLES = [
  { text: 'CLE Coverage 2026: Complete Subject Breakdown', href: '/criminology/cle-coverage-2026' },
  { text: 'Juvenile Delinquency and Crime Prevention Reviewer', href: '/criminology/juvenile-delinquency-crime-prevention-reviewer' },
  { text: 'Correctional Administration Reviewer CLE 2026', href: '/criminology/correctional-administration-reviewer' },
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
      if (inTable) {
        wrapped.push(<div key={`tbl-${key++}`} className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>);
        tableBuffer = []; inTable = false;
      }
      wrapped.push(el);
    }
  }
  if (inTable && tableBuffer.length) wrapped.push(<div key="tbl-final" className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>);
  return wrapped;
}

const INTRO = `
Criminal Sociology and Ethics is the most theoretical subject in the CLE. The theories are not difficult once you understand what each one is trying to explain. The challenge is keeping them organized and distinct from each other when exam questions present similar-sounding concepts side by side.

This reviewer gives you the major criminological theories organized by school of thought, plus the professional ethics standards that apply to licensed criminologists in the Philippines.
`;

const AFTER_SCHOOLS = `
`;

const AFTER_THEORIES_TABLE = `
---

## Anomie Theory in Detail

**Emile Durkheim** introduced anomie as a condition of normlessness where social rules no longer effectively regulate behavior. During rapid social change, deviance increases.

**Robert Merton** adapted this to American society. He identified five adaptations when people cannot reach cultural goals through legitimate means:

**Conformity** accepts both goals and means. Most people conform.

**Innovation** accepts goals but rejects legitimate means and adopts illegitimate ones. This is the adaptation most associated with crime.

**Ritualism** rejects goals but continues following legitimate means.

**Retreatism** rejects both goals and means, seen in chronic substance dependence.

**Rebellion** rejects both and substitutes new ones, as in revolutionary movements.

---

## Differential Association Theory

Edwin Sutherland argued that criminal behavior is learned through interaction with others in intimate personal groups. Key points for the CLE:

Criminal behavior is learned, not inherited or invented independently.

The learning happens through communication in intimate groups, not through mass media.

A person becomes criminal when definitions favorable to violating the law exceed definitions favorable to obeying it.

---

## Professional Ethics for Licensed Criminologists

### Core Ethical Principles

**Integrity:** Honesty and truthfulness in all professional dealings including reports and court testimony.

**Objectivity:** Findings must be based on evidence and professional judgment, not personal bias or client preference.

**Competence:** Practice only within actual training, education, and experience. Taking on work beyond one's competence is a violation.

**Confidentiality:** Information obtained in professional work must be kept confidential except when disclosure is required by law.

**Respect for the law:** A criminologist must comply with Philippine laws and may not use professional skills to facilitate illegal activity.

### Republic Act 6506: Philippine Criminology Profession Act

RA 6506 established the professional status of criminologists and created the Board of Examiners for Criminology under the PRC. Only registered criminologists may practice criminology in the Philippines. The scope of practice includes law enforcement, correctional administration, crime detection and investigation, and instruction of criminology subjects.

---

## How to Study This Subject

The biggest mistake is memorizing theories as disconnected facts. A better approach: understand each theory as an answer to the question "what causes crime?" Then ask what solution each theory recommends.

When a CLE question gives you a scenario, identify which element maps to which theory. A young man who grew up poor in a high-crime neighborhood and was influenced by gang members involves Strain Theory for the economic frustration, Differential Association for the gang influence, and Social Disorganization for the neighborhood context.

Practice questions for Criminal Sociology and Ethics are available at LisensyaPrep. No account needed.
`;

export default function CriminalSociologyPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cle-sociology" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/criminology" className="text-gray-500 hover:text-gray-300 transition-colors">Criminology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Criminal Sociology &amp; Ethics Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400">Criminology (CLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Criminal Sociology and Ethics Reviewer for CLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>April 23, 2026</span><span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-cle-criminal-sociology-ethics.jpg"
              alt="Student studying criminological theories and ethics at desk for CLE board exam Philippines 2026"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}
              <AdPlaceholder slot="banner" className="my-6" />

              <h2 className="text-2xl font-extrabold text-white mt-8 mb-4">The Three Major Schools of Criminological Thought</h2>
              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="280" fill="#0f172a" rx="10"/>
                  <text x="380" y="30" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="700" fontFamily="Georgia,serif">Three Major Schools of Criminological Thought</text>
                  <line x1="60" y1="42" x2="700" y2="42" stroke="#334155" strokeWidth="1"/>
                  <rect x="60" y="52" width="620" height="60" fill="#1e3a5f" rx="8"/>
                  <text x="190" y="74" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">CLASSICAL SCHOOL</text>
                  <text x="190" y="90" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Beccaria and Bentham</text>
                  <text x="450" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Humans are rational actors who choose to commit crime.</text>
                  <text x="450" y="86" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Punishment must be swift, certain, and proportionate.</text>
                  <text x="450" y="102" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Gave rise to deterrence theory.</text>
                  <rect x="60" y="120" width="620" height="60" fill="#172033" rx="8"/>
                  <text x="190" y="142" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">POSITIVIST SCHOOL</text>
                  <text x="190" y="158" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Lombroso, Ferri, Garofalo</text>
                  <text x="450" y="138" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Criminal behavior is determined by biological or social forces.</text>
                  <text x="450" y="154" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Lombroso proposed the born criminal theory.</text>
                  <text x="450" y="170" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Introduced empirical and scientific study of crime.</text>
                  <rect x="60" y="188" width="620" height="60" fill="#1e3a5f" rx="8"/>
                  <text x="190" y="210" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">CHICAGO SCHOOL</text>
                  <text x="190" y="226" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Shaw and McKay</text>
                  <text x="450" y="206" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Crime rates tied to neighborhood conditions, not individual traits.</text>
                  <text x="450" y="222" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Social Disorganization Theory: poverty and weak institutions</text>
                  <text x="450" y="238" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">produce consistently high crime areas regardless of who lives there.</text>
                  <text x="380" y="272" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | CLE Criminal Sociology Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Three major schools of criminological thought</figcaption>
              </figure>

              {renderContent(AFTER_SCHOOLS)}

              <h2 className="text-2xl font-extrabold text-white mt-8 mb-4">Major Criminological Theories for the CLE</h2>
              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 390" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="390" fill="#0f172a" rx="10"/>
                  <text x="380" y="28" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Key Criminological Theories and Their Proponents</text>
                  <line x1="40" y1="40" x2="720" y2="40" stroke="#334155" strokeWidth="1"/>
                  <text x="160" y="58" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">THEORY</text>
                  <text x="340" y="58" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">PROPONENT</text>
                  <text x="570" y="58" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">CORE ARGUMENT</text>
                  <line x1="40" y1="66" x2="720" y2="66" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="72" width="680" height="32" fill="#1e3a5f" rx="4"/>
                  <text x="160" y="93" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Anomie Theory</text>
                  <text x="340" y="93" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Durkheim, Merton</text>
                  <text x="570" y="93" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Gap between goals and available means produces crime.</text>
                  <rect x="40" y="110" width="680" height="32" fill="#172033" rx="4"/>
                  <text x="160" y="131" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Differential Association</text>
                  <text x="340" y="131" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Edwin Sutherland</text>
                  <text x="570" y="131" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Criminal behavior is learned through intimate group interaction.</text>
                  <rect x="40" y="148" width="680" height="32" fill="#1e3a5f" rx="4"/>
                  <text x="160" y="169" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Conflict Theory</text>
                  <text x="340" y="169" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Marx, Vold</text>
                  <text x="570" y="169" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Crime defined by the powerful to serve their own interests.</text>
                  <rect x="40" y="186" width="680" height="32" fill="#172033" rx="4"/>
                  <text x="160" y="207" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Routine Activities</text>
                  <text x="340" y="207" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Cohen and Felson</text>
                  <text x="570" y="207" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Crime needs motivated offender, suitable target, no guardian.</text>
                  <rect x="40" y="224" width="680" height="32" fill="#1e3a5f" rx="4"/>
                  <text x="160" y="245" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Social Control Theory</text>
                  <text x="340" y="245" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Travis Hirschi</text>
                  <text x="570" y="245" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">People conform because of social bonds. Weak bonds lead to crime.</text>
                  <rect x="40" y="262" width="680" height="32" fill="#172033" rx="4"/>
                  <text x="160" y="283" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Labeling Theory</text>
                  <text x="340" y="283" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Becker, Lemert</text>
                  <text x="570" y="283" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Being labeled criminal reinforces criminal identity and behavior.</text>
                  <rect x="40" y="300" width="680" height="32" fill="#1e3a5f" rx="4"/>
                  <text x="160" y="321" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Social Disorganization</text>
                  <text x="340" y="321" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Shaw and McKay</text>
                  <text x="570" y="321" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Crime tied to neighborhood conditions, not individual traits.</text>
                  <rect x="40" y="338" width="680" height="32" fill="#172033" rx="4"/>
                  <text x="160" y="359" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Born Criminal Theory</text>
                  <text x="340" y="359" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Cesare Lombroso</text>
                  <text x="570" y="359" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Biology predisposes some individuals to criminality (now rejected).</text>
                  <text x="380" y="382" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Major criminological theories and proponents for the CLE</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(AFTER_THEORIES_TABLE)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-red-400 font-extrabold text-lg mb-2">Practice Criminal Sociology and Ethics Questions</p>
              <p className="text-gray-400 text-sm mb-4">No account needed. Test your knowledge of theories, schools of thought, and professional ethics for the CLE.</p>
              <Link href="/criminology" className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                ⚔️ Start Practicing at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">Related CLE Reviewer Articles</h2>
              <ul className="space-y-3">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <li key={href}><Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link></li>
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
