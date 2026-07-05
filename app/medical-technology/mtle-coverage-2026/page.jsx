import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'MTLE Coverage 2026 Complete Subject Breakdown for Medical Technology Board Exam Philippines',
  description:
    'What does the PRC medical technology board exam cover in 2026? Complete MTLE subject breakdown with reviewer links for hematology, clinical chemistry, microbiology, blood banking, and all tested areas.',
  path: '/medical-technology/mtle-coverage-2026',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'MTLE Coverage 2026: Complete Subject Breakdown for the Medical Technology Board Exam',
  description:
    'Complete breakdown of all six MTLE subject areas for the 2026 PRC Medical Technologist Licensure Examination with deep-dive reviewer links for each subject.',
  image: 'https://lisensyaprep.com/images/articles/hero-mtle-coverage-2026.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-01',
  dateModified: '2026-05-01',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/medical-technology/mtle-coverage-2026' },
};

const ALL_MTLE_ARTICLES = [
  { text: 'How to Pass the MTLE Board Exam on Your First Take', href: '/medical-technology/how-to-pass-mtle-board-exam' },
  { text: 'MTLE Coverage 2026 Complete Subject Breakdown', href: '/medical-technology/mtle-coverage-2026' },
  { text: 'Hematology Reviewer for MTLE Philippines 2026', href: '/medical-technology/hematology-reviewer' },
  { text: 'Clinical Chemistry Reviewer for MTLE Philippines 2026', href: '/medical-technology/clinical-chemistry-reviewer' },
  { text: 'Microbiology and Parasitology Reviewer MTLE 2026', href: '/medical-technology/microbiology-parasitology-reviewer' },
  { text: 'Blood Banking and Serology Reviewer MTLE 2026', href: '/medical-technology/blood-banking-serology-reviewer' },
  { text: 'Urinalysis and Body Fluids Reviewer MTLE 2026', href: '/medical-technology/urinalysis-body-fluids-reviewer' },
  { text: 'Histopathology and Cytology Reviewer MTLE 2026', href: '/medical-technology/histopathology-cytology-reviewer' },
  { text: 'MTLE Application Guide and Passing Rate 2026', href: '/medical-technology/mtle-application-results-2026' },
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
      if (inTable) { wrapped.push(<div key={`tbl-${key++}`} className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>); tableBuffer = []; inTable = false; }
      wrapped.push(el);
    }
  }
  if (inTable && tableBuffer.length) wrapped.push(<div key="tbl-final" className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>);
  return wrapped;
}

const INTRO = `
The Medical Technologist Licensure Examination covers six major laboratory disciplines that form the core of medical technology practice. Understanding exactly what each subject tests before you start reviewing saves you weeks of misdirected effort and dramatically improves your chances of passing on your first attempt.

This page is your complete MTLE study map for 2026.

---

## MTLE Overview
`;

const SECTION2 = `
---

## Subject 1: Clinical Chemistry

Clinical Chemistry is typically the highest-weighted subject in the MTLE and covers the biochemical analysis of blood and body fluids.

**Major topics:** Glucose metabolism and diabetes diagnosis, lipid panel and Friedewald equation, liver function tests (bilirubin, ALT, AST, ALP, albumin), renal function tests (BUN, creatinine, GFR), electrolytes, cardiac enzymes, acid-base balance, quality control (Levey-Jennings, Westgard rules).

**Full reviewer:** [Clinical Chemistry Reviewer for MTLE Philippines 2026](https://lisensyaprep.com/medical-technology/clinical-chemistry-reviewer)

**Practice now:** [LisensyaPrep Medical Technology Quiz](https://lisensyaprep.com/medical-technology)

---

## Subject 2: Hematology

Hematology covers the study of blood cells, their formation, and the disorders that arise from abnormalities in the blood.

**Major topics:** Hematopoiesis and cell development pathway, CBC normal values, RBC morphology (anisocytosis, poikilocytosis, target cells, sickle cells, schistocytes), WBC differential, coagulation cascade (intrinsic vs extrinsic pathway, PT vs aPTT), anemia classification by MCV (microcytic, normocytic, macrocytic), iron studies, hemoglobin disorders.

**Full reviewer:** [Hematology Reviewer for MTLE Philippines 2026](https://lisensyaprep.com/medical-technology/hematology-reviewer)

**Practice now:** [LisensyaPrep Medical Technology Quiz](https://lisensyaprep.com/medical-technology)

---

## Subject 3: Microbiology and Parasitology

Microbiology and Parasitology tests your knowledge of disease-causing organisms and the laboratory methods used to identify them.

**Major topics:** Gram stain procedure and results, clinically important bacteria profiles (S. aureus, Strep pneumoniae, E. coli, Klebsiella, Pseudomonas, Salmonella), culture media (Blood agar, MacConkey, Chocolate agar, Thayer-Martin, Sabouraud), special stains (Acid-fast, India ink, KOH, Giemsa), malaria species differentiation, intestinal and blood parasites, biosafety levels.

**Full reviewer:** [Microbiology and Parasitology Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/microbiology-parasitology-reviewer)

**Practice now:** [LisensyaPrep Medical Technology Quiz](https://lisensyaprep.com/medical-technology)

---

## Subject 4: Blood Banking and Serology

Blood Banking and Serology covers immunohematology and transfusion medicine.

**Major topics:** ABO blood group system (antigens, antibodies, genotypes), Rh system (D antigen, weak D, HDFN prevention with RhoGAM), crossmatching (major, minor, electronic), blood components and storage conditions, transfusion reactions (AHTR, FNHTR, TACO, TRALI), Direct vs Indirect Antiglobulin Test.

**Full reviewer:** [Blood Banking and Serology Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/blood-banking-serology-reviewer)

**Practice now:** [LisensyaPrep Medical Technology Quiz](https://lisensyaprep.com/medical-technology)

---

## Subject 5: Urinalysis and Body Fluids

Urinalysis and Body Fluids covers physical, chemical, and microscopic examination of urine and other body fluids.

**Major topics:** Physical examination (color, clarity, specific gravity), dipstick parameters (pH, protein, glucose, ketones, blood, bilirubin, urobilinogen, leukocyte esterase), microscopic examination (cells, casts, crystals), CSF analysis (normal values, bacterial vs viral vs TB meningitis), transudate vs exudate pleural fluid, Light's criteria.

**Full reviewer:** [Urinalysis and Body Fluids Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/urinalysis-body-fluids-reviewer)

**Practice now:** [LisensyaPrep Medical Technology Quiz](https://lisensyaprep.com/medical-technology)

---

## Subject 6: Histopathology and Cytology

Histopathology and Cytology covers tissue and cell preparation for diagnostic microscopy.

**Major topics:** Tissue processing steps (fixation, processing, embedding, sectioning, staining, mounting), 10% NBF fixative, H and E stain colors (hematoxylin = blue-purple nuclei, eosin = pink cytoplasm), special stains and what they identify, Pap stain, Bethesda System for cervical cytology, frozen section.

**Full reviewer:** [Histopathology and Cytology Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/histopathology-cytology-reviewer)

**Practice now:** [LisensyaPrep Medical Technology Quiz](https://lisensyaprep.com/medical-technology)

---

## All MTLE Articles on LisensyaPrep

- [How to Pass the MTLE Board Exam on Your First Take](https://lisensyaprep.com/medical-technology/how-to-pass-mtle-board-exam)
- [Clinical Chemistry Reviewer MTLE Philippines 2026](https://lisensyaprep.com/medical-technology/clinical-chemistry-reviewer)
- [Hematology Reviewer for MTLE Philippines 2026](https://lisensyaprep.com/medical-technology/hematology-reviewer)
- [Microbiology and Parasitology Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/microbiology-parasitology-reviewer)
- [Blood Banking and Serology Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/blood-banking-serology-reviewer)
- [Urinalysis and Body Fluids Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/urinalysis-body-fluids-reviewer)
- [Histopathology and Cytology Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/histopathology-cytology-reviewer)
- [MTLE Application Guide and Passing Rate 2026](https://lisensyaprep.com/medical-technology/mtle-application-results-2026)
`;

export default function MtleCoverage2026Page() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-mtle-coverage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/medical-technology","name":"Medical Technology"},{"url":"/medical-technology/mtle-coverage-2026","name":"MTLE Coverage 2026"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/medical-technology" className="text-gray-500 hover:text-gray-300 transition-colors">Medical Technology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">MTLE Coverage 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400">Medical Technology (MTLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                MTLE Coverage 2026: Complete Subject Breakdown for the Medical Technology Board Exam
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 1, 2026</span><span>•</span>
                <span>8 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-mtle-coverage-2026.jpg"
                alt="Filipino male medical technologist in white coat holding clipboard for MTLE coverage 2026 Philippines"
                width={1200} height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 170" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="170" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">MTLE 2026 Key Facts</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="46" y="52" width="150" height="88" fill="#1e3a5f" rx="8"/>
                  <text x="121" y="82" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">PASSING</text>
                  <text x="121" y="102" textAnchor="middle" fill="#fcd34d" fontSize="26" fontWeight="700" fontFamily="Arial,sans-serif">75%</text>
                  <text x="121" y="122" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">GWA required</text>
                  <rect x="210" y="52" width="150" height="88" fill="#172033" rx="8"/>
                  <text x="285" y="82" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">MINIMUM</text>
                  <text x="285" y="102" textAnchor="middle" fill="#fcd34d" fontSize="26" fontWeight="700" fontFamily="Arial,sans-serif">60%</text>
                  <text x="285" y="122" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Per subject minimum</text>
                  <rect x="374" y="52" width="150" height="88" fill="#1e3a5f" rx="8"/>
                  <text x="449" y="82" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">SUBJECTS</text>
                  <text x="449" y="102" textAnchor="middle" fill="#fcd34d" fontSize="26" fontWeight="700" fontFamily="Arial,sans-serif">6</text>
                  <text x="449" y="122" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Major disciplines</text>
                  <rect x="538" y="52" width="182" height="88" fill="#14532d" rx="8"/>
                  <text x="629" y="78" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">UPCOMING EXAM</text>
                  <text x="629" y="98" textAnchor="middle" fill="#fcd34d" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">August 2026</text>
                  <text x="629" y="116" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Apply now at</text>
                  <text x="629" y="132" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">online.prc.gov.ph</text>
                  <text x="380" y="160" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | Verify schedule at prc.gov.ph</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>MTLE 2026 key facts at a glance</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(SECTION2)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-sky-900/20 to-sky-900/10 border border-sky-500/30 rounded-2xl p-6 text-center">
              <p className="text-sky-400 font-extrabold text-lg mb-2">Start Your MTLE Review</p>
              <p className="text-gray-400 text-sm mb-4">Free practice questions for all MTLE subject areas. No registration required.</p>
              <Link href="/medical-technology" className="inline-block bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start MTLE Practice at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">All MTLE Articles on LisensyaPrep</h2>
              <ul className="space-y-3">
                {ALL_MTLE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">MTLE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_MTLE_ARTICLES.map(({ text, href }) => (
                  <Link key={href} href={href} className="group block">
                    <p className="text-gray-300 text-sm group-hover:text-sky-400 transition-colors leading-snug">{text}</p>
                  </Link>
                ))}
              </div>
            </div>
            <AdPlaceholder slot="sidebar" />
          </aside>

        </div>
      </div>
    <ArticlePopupTriggers type="mtle" />
    </div>
  );
}
