import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'PLE Coverage 2026 Complete Subject Breakdown for the Pharmacy Board Exam Philippines',
  description:
    'What does the PRC pharmacy board exam cover in 2026? Complete PLE subject breakdown with reviewer links for pharmacology, pharmaceutical chemistry, pharmacy law, and clinical pharmacy.',
  path: '/pharmacy/ple-coverage-2026',
  image: '/images/articles/hero-pharmacy-coverage-2026.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'PLE Coverage 2026: Complete Subject Breakdown for the Pharmacy Board Exam Philippines',
  description:
    'Complete breakdown of all five PLE subject areas for the 2026 PRC Pharmacy Licensure Examination with reviewer links for each subject.',
  image: 'https://lisensyaprep.com/images/articles/hero-pharmacy-coverage-2026.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-26',
  dateModified: '2026-04-26',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/pharmacy/ple-coverage-2026' },
};

const RELATED_ARTICLES = [
  { text: 'Pharmacology Reviewer for PLE Philippines 2026', href: '/pharmacy/pharmacology-reviewer' },
  { text: 'Pharmacy Law and Ethics Reviewer PLE 2026', href: '/pharmacy/pharmacy-law-ethics-reviewer' },
  { text: 'PLE Coverage 2026 Complete Subject Breakdown', href: '/pharmacy/ple-coverage-2026' },
  { text: 'PRC Board Exam Passing Rate by Profession 2026', href: '/blog/prc-board-exam-passing-rate-by-profession' },
  { text: 'How Long to Study for PRC Board Exam', href: '/blog/how-long-to-study-for-prc-board-exam' },
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
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(
        <p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    }
  }
  return elements;
}

const SECTION_1 = `
*By LisensyaPrep Team | Last Updated: April 2026 | 9-minute read*

---

The Pharmacy Licensure Examination is one of the most underserved board exams in the Philippines when it comes to free online reviewer content. Most pharmacy graduates find themselves either buying expensive review books or hunting through scattered Facebook groups for study materials.

LisensyaPrep is building that resource here, for free. This page is your complete PLE study map for 2026.

---

## PLE Overview

The Pharmacy Licensure Examination is administered by the PRC Board of Pharmacy. It tests across five major subject areas that span both the science and practice of pharmacy.
`;

const SECTION_2 = `
---

## The Five PLE Subject Areas
`;

const SECTION_3 = `
---

### Subject 1: Pharmaceutical Chemistry

This subject tests your knowledge of the chemical properties, structure, and stability of drugs. It bridges your chemistry foundation from college with real pharmaceutical applications.

**Major topics:**
- General chemistry review: acids, bases, buffers, pH calculations
- Organic chemistry: functional groups, reactions, drug synthesis basics
- Inorganic pharmaceuticals: metals used in medicine, inorganic salt properties
- Drug stability: hydrolysis, oxidation, photodegradation, storage conditions
- Pharmaceutical analysis: volumetric analysis, spectrophotometry, chromatography
- Physicochemical properties: solubility, partition coefficient, ionization

---

### Subject 2: Pharmacology and Toxicology

Pharmacology is the most clinically relevant subject in the PLE and one of the most heavily tested.

**Major topics:**
- Pharmacokinetics: absorption, distribution, metabolism, excretion (ADME)
- Pharmacodynamics: receptor theory, dose-response relationships, drug interactions
- Autonomic nervous system drugs: cholinergics, anticholinergics, adrenergics, beta-blockers
- Cardiovascular drugs: antihypertensives, antiarrhythmics, anticoagulants, statins
- Central nervous system drugs: analgesics, anesthetics, antiepileptics, antipsychotics
- Anti-infective drugs: antibiotics, antifungals, antivirals, antiparasitics
- Toxicology: mechanisms of toxicity, antidotes, management of poisoning

**Full reviewer:** [Pharmacology Reviewer PLE Philippines 2026](/pharmacy/pharmacology-reviewer)

**Practice now:** [LisensyaPrep Pharmacy Quiz](/pharmacy)

---

### Subject 3: Pharmacy and Drug Information

This subject covers the practical dispensing skills and pharmaceutical calculations every licensed pharmacist needs.

**Major topics:**
- Pharmaceutical calculations: doses, concentrations, dilutions, IV flow rates
- Compounding: extemporaneous preparations, sterile compounding basics
- Dosage forms: tablets, capsules, solutions, suspensions, emulsions, suppositories
- Drug information sources: primary, secondary, and tertiary literature
- Dispensing procedures: prescription reading, labeling, counseling points
- Incompatibilities: physical and chemical incompatibilities in compounding

**Practice now:** [LisensyaPrep Pharmacy Quiz](/pharmacy)

---

### Subject 4: Pharmacy Law, Ethics and Jurisprudence

**Major topics:**
- Republic Act 5921 (Pharmacy Law): practice of pharmacy in the Philippines, qualifications, PRC registration
- Republic Act 9502 (Universally Accessible Cheaper and Quality Medicines Act): generic drugs, drug pricing
- Republic Act 9165 (Dangerous Drugs Act): controlled substances, prescription requirements, penalties
- PDEA regulations: drug schedules, record-keeping requirements
- Food and Drug Administration (FDA) Philippines: drug registration, GMP standards
- Professional ethics for pharmacists: patient confidentiality, conflicts of interest

**Full reviewer:** [Pharmacy Law and Ethics Reviewer PLE 2026](/pharmacy/pharmacy-law-ethics-reviewer)

**Practice now:** [LisensyaPrep Pharmacy Quiz](/pharmacy)

---

### Subject 5: Clinical Pharmacy and Therapeutics

Clinical pharmacy is the most patient-focused subject in the PLE. It tests your ability to apply pharmacological knowledge to real disease management scenarios.

**Major topics:**
- Cardiovascular disease management: hypertension, heart failure, dyslipidemia
- Infectious disease: antimicrobial selection, resistance patterns, treatment guidelines
- Diabetes mellitus: insulin types, oral antidiabetics, monitoring parameters
- Respiratory diseases: asthma, COPD management
- Drug therapy monitoring: therapeutic drug monitoring, adverse effect management
- Patient counseling: medication adherence, lifestyle modifications

**Practice now:** [LisensyaPrep Pharmacy Quiz](/pharmacy)

---

## Study Strategy for the PLE

The PLE spans very different disciplines. Pharmaceutical Chemistry requires chemistry problem-solving skills. Pharmacology requires memorization and understanding of drug mechanisms. Pharmacy Law requires knowing specific provisions of several laws. Clinical Pharmacy requires applying everything to patient scenarios.

Because these subjects require different mental approaches, avoid marathon study sessions that jump between all of them. Instead, dedicate specific days of the week to specific subjects and rotate systematically.

---

## All Pharmacy Articles on LisensyaPrep

- [Pharmacology Reviewer PLE Philippines 2026](/pharmacy/pharmacology-reviewer)
- [Pharmacy Law and Ethics Reviewer PLE 2026](/pharmacy/pharmacy-law-ethics-reviewer)
- [PRC Board Exam Schedule 2026 for All Professions](/blog/prc-board-exam-schedule-2026)
- [How to Apply for PRC Board Exam Online 2026](/blog/how-to-apply-prc-board-exam-online-2026)
- [PRC Board Exam Passing Rate by Profession 2026](/blog/prc-board-exam-passing-rate-by-profession)
`;

export default function PleCoverage2026Page() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-pharmacy-ple" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/pharmacy" className="text-gray-500 hover:text-gray-300 transition-colors">Pharmacy</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">PLE Coverage 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">
                Pharmacy (PLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                PLE Coverage 2026: Complete Subject Breakdown for the Pharmacy Board Exam
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 26, 2026</span>
                <span>•</span>
                <span>9 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-pharmacy-coverage-2026.jpg"
                alt="Young Filipino female pharmacist in white coat holding medicine bottle for PLE pharmacy board exam reviewer Philippines 2026"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="200" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">PLE Key Facts 2026</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="50" y="52" width="150" height="110" fill="#1e3a5f" rx="8"/>
                  <text x="125" y="80" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Exam Name</text>
                  <text x="125" y="100" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Pharmacy</text>
                  <text x="125" y="116" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Licensure</text>
                  <text x="125" y="132" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Examination</text>
                  <text x="125" y="148" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">(PLE)</text>
                  <rect x="214" y="52" width="150" height="110" fill="#172033" rx="8"/>
                  <text x="289" y="80" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Administered</text>
                  <text x="289" y="100" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">PRC Board</text>
                  <text x="289" y="116" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">of Pharmacy</text>
                  <rect x="378" y="52" width="150" height="110" fill="#14532d" rx="8"/>
                  <text x="453" y="80" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Passing Score</text>
                  <text x="453" y="104" textAnchor="middle" fill="#fcd34d" fontSize="22" fontWeight="700" fontFamily="Arial,sans-serif">75%</text>
                  <text x="453" y="126" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">GWA required</text>
                  <text x="453" y="142" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">No subject below 60%</text>
                  <rect x="542" y="52" width="168" height="110" fill="#172033" rx="8"/>
                  <text x="626" y="80" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">Application</text>
                  <text x="626" y="100" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">online.prc.gov.ph</text>
                  <text x="626" y="120" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">via PRC LERIS</text>
                  <text x="626" y="140" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Check prc.gov.ph</text>
                  <text x="626" y="155" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">for 2026 schedule</text>
                  <text x="380" y="192" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | Always verify current schedule at prc.gov.ph</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>PLE 2026 key facts and requirements</figcaption>
              </figure>

              {renderContent(SECTION_2)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="320" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">PLE Five Major Subject Areas</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="46" fill="#1e3a5f" rx="6"/>
                  <text x="220" y="70" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">PHARMACEUTICAL CHEMISTRY</text>
                  <text x="220" y="86" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Inorganic and organic chemistry</text>
                  <text x="530" y="78" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Drug structure, synthesis, stability, and chemical properties of pharmaceuticals</text>
                  <rect x="40" y="102" width="680" height="46" fill="#172033" rx="6"/>
                  <text x="220" y="122" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">PHARMACOLOGY AND TOXICOLOGY</text>
                  <text x="220" y="138" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Drug actions and effects</text>
                  <text x="530" y="130" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Mechanism of action, drug classifications, side effects, drug interactions, toxicology</text>
                  <rect x="40" y="154" width="680" height="46" fill="#1e3a5f" rx="6"/>
                  <text x="220" y="174" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">PHARMACY AND DRUG INFORMATION</text>
                  <text x="220" y="190" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Dispensing and drug information</text>
                  <text x="530" y="182" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Compounding, dispensing, pharmaceutical calculations, drug information sources</text>
                  <rect x="40" y="206" width="680" height="46" fill="#14532d" rx="6"/>
                  <text x="220" y="226" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">PHARMACY LAW, ETHICS AND JURISPRUDENCE</text>
                  <text x="220" y="242" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">Legal and ethical framework</text>
                  <text x="530" y="234" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">RA 5921, RA 9502, PDEA regulations, professional ethics, drug laws</text>
                  <rect x="40" y="258" width="680" height="46" fill="#172033" rx="6"/>
                  <text x="220" y="278" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">CLINICAL PHARMACY AND THERAPEUTICS</text>
                  <text x="220" y="294" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Patient-centered pharmacy practice</text>
                  <text x="530" y="286" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Disease state management, drug therapy monitoring, patient counseling</text>
                  <text x="380" y="312" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | PLE Coverage 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Five major subject areas of the PLE 2026</figcaption>
              </figure>

              {renderContent(SECTION_3)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-purple-900/20 to-purple-900/10 border border-purple-500/30 rounded-2xl p-6 text-center">
              <p className="text-purple-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice PLE questions with instant feedback. No registration required.
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
