import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Pharmacy Law and Ethics Reviewer for PLE Philippines 2026 (Complete Guide)',
  description:
    'Studying for the pharmacy board exam? This pharmacy law and ethics reviewer covers RA 5921, RA 9502, RA 9165, FDA regulations, and professional ethics tested in the PLE.',
  path: '/pharmacy/pharmacy-law-ethics-reviewer',
  image: '/images/articles/hero-pharmacy-law-ethics.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pharmacy Law and Ethics Reviewer for PLE Philippines 2026',
  description:
    'Complete pharmacy law and ethics reviewer for the PRC Pharmacy Licensure Examination covering RA 5921, RA 9502, RA 9165, FDA regulations, and professional ethics for pharmacists.',
  image: 'https://lisensyaprep.com/images/articles/hero-pharmacy-law-ethics.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-26',
  dateModified: '2026-04-26',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/pharmacy/pharmacy-law-ethics-reviewer' },
};

const RELATED_ARTICLES = [
  { text: 'PLE Coverage 2026 Complete Subject Breakdown', href: '/pharmacy/ple-coverage-2026' },
  { text: 'Pharmacology Reviewer PLE Philippines 2026', href: '/pharmacy/pharmacology-reviewer' },
  { text: 'PRC Board Exam Schedule 2026 for All Professions', href: '/blog/prc-board-exam-schedule-2026' },
  { text: 'How to Apply for PRC Board Exam Online 2026', href: '/blog/how-to-apply-prc-board-exam-online-2026' },
  { text: 'PRC Board Exam Retake Rules and Policies', href: '/blog/prc-board-exam-retake-rules' },
];

function formatInline(text) {
  let result = text
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]*)\)/g,
      (_, t, url) =>
        `<a href="${url}"${url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''} class="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">${t}</a>`
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em class="text-gray-400 italic">$1</em>');
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

const SECTION_1 = `
*By LisensyaPrep Team | Last Updated: April 2026 | 10-minute read*

---

Pharmacy Law and Ethics is one of those PLE subjects where examinees either do very well because they paid attention to the legal framework during school, or do poorly because they assumed it was just memorization and skipped it.

The truth is somewhere in between. Yes, you need to know specific provisions of several laws. But what the PLE tests most is whether you understand the purpose behind those provisions and can apply them to real pharmacy practice scenarios.

This reviewer covers the major laws, regulations, and ethical principles that appear in the PLE.

---

## Republic Act 5921: The Pharmacy Law of the Philippines

RA 5921, also known as the Pharmacy Act, is the foundational law governing the practice of pharmacy in the Philippines. It is one of the most heavily tested laws in this subject.
`;

const SECTION_2 = `
### Scope of Pharmacy Practice Under RA 5921

The law defines the practice of pharmacy to include:
- Compounding and dispensing of drugs and medicines
- Drug product selection and substitution
- Drug utilization review
- Provision of drug information and patient counseling
- Monitoring of drug therapy
- Administration of vaccines (with specific training)

---

## Republic Act 9502: Cheaper Medicines Act

RA 9502, the Universally Accessible Cheaper and Quality Medicines Act of 2008, is a landmark law that significantly changed pharmacy practice in the Philippines.

### Key Provisions

**Generic drug substitution:** Licensed pharmacists are authorized to substitute a prescribed branded drug with a generically equivalent drug unless the prescribing physician writes "no substitution" on the prescription.

**Duty to inform:** When substituting, the pharmacist must inform the patient of the substitution, the reasons, and the price difference.

**Pricing:** The law empowers the government to impose maximum retail prices on essential medicines. The President may impose price controls during declared states of emergency.

**Generic labeling:** Drug manufacturers must include the generic name prominently on all labels, printed at least half the size of the brand name.

### What PLE Questions Test in RA 9502

Most PLE questions on this law focus on the conditions for and process of drug substitution, and the pharmacist's responsibilities when exercising this authority. The key point: substitution is a pharmacist right and sometimes a duty, but patient consent and notification are required.

---

## Republic Act 9165: Comprehensive Dangerous Drugs Act of 2002

RA 9165 is the primary law governing dangerous drugs in the Philippines and generates many PLE questions, particularly about prescription requirements for controlled substances and penalties for violations.

### Drug Schedules

Under PDEA regulations implementing RA 9165, drugs are classified by schedule based on their potential for abuse and accepted medical use.

**Schedule I:** High abuse potential, no accepted medical use in the Philippines. Examples: heroin, LSD, ecstasy.

**Schedule II:** High abuse potential but with accepted medical use. Examples: morphine, fentanyl, methamphetamine (pharmaceutical grade), cocaine (topical anesthetic).

**Schedule III, IV, V:** Decreasing potential for abuse with accepted medical uses. Examples include benzodiazepines, mild opioid combinations.

### Prescription Requirements for Controlled Substances

Schedule II drugs require a triplicate prescription form (S2 license). The prescribing physician must have a special license from the PDEA to prescribe Schedule II substances. The pharmacist must verify the validity of the S2 prescription before dispensing.

### Key Pharmacist Responsibilities Under RA 9165

- Maintain a separate record book for all controlled substance transactions
- Report theft, loss, or discrepancy of controlled substances to PDEA
- Verify S2 prescription authenticity before dispensing
- Refuse to dispense on forged or suspicious prescriptions

---

## Food and Drug Administration (FDA) Philippines

The Philippine FDA (under Republic Act 9711, the FDA Act of 2009) is the regulatory body that oversees the safety and quality of food, drugs, cosmetics, and other health products.

**Drug Registration:** All pharmaceutical products sold in the Philippines must have a Certificate of Product Registration (CPR) from the FDA before they can be marketed. The CPR contains the approved indications, dosage, and labeling.

**Good Manufacturing Practice (GMP):** Pharmaceutical manufacturers must comply with GMP standards to receive and maintain their license to operate. GMP covers facility requirements, quality control, documentation, and personnel qualifications.

**Adverse Drug Reaction (ADR) Reporting:** Pharmacists and other healthcare professionals are encouraged to report adverse drug reactions to the FDA through the National Pharmacovigilance Program.

---

## Professional Ethics for Pharmacists
`;

const SECTION_3 = `
### Confidentiality

Patient medication records and health information are confidential. A pharmacist may not disclose this information without patient consent except when required by law (e.g., court order, public health reporting requirements).

### Conflicts of Interest

A pharmacist must not allow financial relationships with drug manufacturers or distributors to influence their professional judgment about which drugs to recommend or dispense. Accepting gifts or incentives that could compromise professional judgment is an ethical violation.

### Conscientious Objection

A pharmacist who has a moral objection to dispensing a specific medication (e.g., certain contraceptives) may decline, but must refer the patient to another pharmacist or pharmacy where the medication can be obtained without delay. The patient's access to legally prescribed medication must not be impeded.

---

## Key Laws Summary

| Law | Key Provisions |
|-----|---------------|
| RA 5921 | Pharmacy Act. Pharmacist must be present, prescription requirements, record keeping |
| RA 9502 | Cheaper Medicines Act. Generic substitution rights, duty to inform patient |
| RA 9165 | Dangerous Drugs Act. Drug schedules, S2 prescription, PDEA reporting |
| RA 9711 | FDA Act. Drug registration, GMP standards, market authorization |
| RA 10918 | Philippine Pharmacy Act of 2016 (updated RA 5921). Modern practice standards |

---

Pharmacy law questions in the PLE frequently present scenarios where you must identify the correct action for a pharmacist to take. Practice those scenarios now at LisensyaPrep. No account needed.

**[Practice Pharmacy Law Questions at LisensyaPrep](/pharmacy)**
`;

export default function PharmacyLawEthicsReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-pharmacy-law" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/pharmacy" className="text-gray-500 hover:text-gray-300 transition-colors">Pharmacy</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Pharmacy Law and Ethics Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">
                Pharmacy (PLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Pharmacy Law and Ethics Reviewer for PLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 26, 2026</span>
                <span>•</span>
                <span>10 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-pharmacy-law-ethics.jpg"
                alt="Young Filipino female pharmacist in white coat standing professionally for PLE pharmacy law and ethics reviewer Philippines 2026"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="300" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Key Provisions of RA 5921 (Pharmacy Act)</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="42" fill="#1e3a5f" rx="6"/>
                  <text x="200" y="68" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">WHO CAN PRACTICE</text>
                  <text x="490" y="64" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Only registered pharmacists licensed by the PRC Board of Pharmacy.</text>
                  <text x="490" y="80" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Practicing without a license is a criminal offense under this law.</text>
                  <rect x="40" y="98" width="680" height="42" fill="#172033" rx="6"/>
                  <text x="200" y="116" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PHARMACIST IN CHARGE</text>
                  <text x="490" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Every pharmacy must have a licensed pharmacist present during business hours.</text>
                  <text x="490" y="128" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Temporary absence allowed for up to 2 hours with a licensed substitute.</text>
                  <rect x="40" y="146" width="680" height="42" fill="#1e3a5f" rx="6"/>
                  <text x="200" y="164" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PRESCRIPTION REQUIREMENTS</text>
                  <text x="490" y="160" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Prescription drugs require a valid prescription from a licensed prescriber.</text>
                  <text x="490" y="176" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Pharmacist must verify completeness: prescriber name, date, drug, dose, quantity, signature.</text>
                  <rect x="40" y="194" width="680" height="42" fill="#172033" rx="6"/>
                  <text x="200" y="212" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">RECORD KEEPING</text>
                  <text x="490" y="208" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">All dispensed prescriptions must be recorded and retained.</text>
                  <text x="490" y="224" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Records must be available for inspection by authorized government officials.</text>
                  <rect x="40" y="242" width="680" height="42" fill="#1e3a5f" rx="6"/>
                  <text x="200" y="260" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PENALTIES</text>
                  <text x="490" y="256" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Violations may result in suspension or revocation of license by PRC.</text>
                  <text x="490" y="272" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Criminal penalties for practice without a license.</text>
                  <text x="380" y="292" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | PLE Pharmacy Law Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Key provisions of RA 5921 tested in the PLE</figcaption>
              </figure>

              {renderContent(SECTION_2)}

              <AdPlaceholder slot="banner" className="my-6" />

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="240" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Core Ethical Principles for Pharmacists</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="320" height="80" fill="#1e3a5f" rx="8"/>
                  <text x="200" y="74" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">BENEFICENCE</text>
                  <text x="200" y="94" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Act in the best interest of the patient.</text>
                  <text x="200" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Patient welfare comes before commercial interests.</text>
                  <rect x="400" y="50" width="320" height="80" fill="#172033" rx="8"/>
                  <text x="560" y="74" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">NON-MALEFICENCE</text>
                  <text x="560" y="94" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Do no harm. Refuse to dispense unsafe or</text>
                  <text x="560" y="110" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">inappropriate drug therapy.</text>
                  <rect x="40" y="146" width="320" height="80" fill="#14532d" rx="8"/>
                  <text x="200" y="170" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">AUTONOMY</text>
                  <text x="200" y="190" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Respect the patient's right to make informed</text>
                  <text x="200" y="206" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">decisions about their own drug therapy.</text>
                  <rect x="400" y="146" width="320" height="80" fill="#172033" rx="8"/>
                  <text x="560" y="170" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">JUSTICE</text>
                  <text x="560" y="190" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Treat all patients fairly and equitably</text>
                  <text x="560" y="206" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">regardless of background or ability to pay.</text>
                  <text x="380" y="233" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Core ethical principles for pharmacy practice</figcaption>
              </figure>

              {renderContent(SECTION_3)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-purple-900/20 to-purple-900/10 border border-purple-500/30 rounded-2xl p-6 text-center">
              <p className="text-purple-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice PLE pharmacy law questions with instant feedback. No registration required.
              </p>
              <Link
                href="/pharmacy"
                className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Start Pharmacy Practice at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">Related Pharmacy Articles</h2>
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

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Pharmacy Study Guides</h3>
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
