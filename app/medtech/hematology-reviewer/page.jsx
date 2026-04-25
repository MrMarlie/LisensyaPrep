import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Hematology Reviewer for MTLE Philippines 2026 (Complete Guide)',
  description:
    'Studying for the PRC medical technology board exam? This hematology reviewer covers blood cell morphology, CBC interpretation, coagulation, and hemoglobin disorders tested in the MTLE.',
  path: '/medtech/hematology-reviewer',
  image: '/images/articles/hero-mtle-hematology.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Hematology Reviewer for MTLE Philippines 2026',
  description:
    'Complete hematology reviewer for the PRC Medical Technologist Licensure Examination covering blood cell morphology, CBC interpretation, coagulation, and anemia classification.',
  image: 'https://lisensyaprep.com/images/articles/hero-mtle-hematology.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-25',
  dateModified: '2026-04-25',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://lisensyaprep.com/medtech/hematology-reviewer',
  },
};

const RELATED_ARTICLES = [
  { text: 'Clinical Chemistry Reviewer for MTLE Philippines 2026', href: '/medtech/clinical-chemistry-reviewer' },
  { text: 'Microbiology and Parasitology Reviewer MTLE 2026', href: '/medtech/microbiology-parasitology-reviewer' },
  { text: 'Blood Banking and Serology Reviewer MTLE Philippines', href: '/medtech/blood-banking-serology-reviewer' },
  { text: 'Urinalysis and Body Fluids Reviewer MTLE 2026', href: '/medtech/urinalysis-body-fluids-reviewer' },
  { text: 'PRC Board Exam Passing Rate by Profession 2026', href: '/blog/prc-board-exam-passing-rate-by-profession' },
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
  return result.replace(
    /(?<![">])\b((?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.(?:gov\.ph|com\.ph|edu\.ph|org\.ph|com|net|org|ph)(?:\/[^\s<>"']*)?)\b/g,
    (url) => {
      const href = /^https?:\/\//.test(url) ? url : `https://${url}`;
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">${url}</a>`;
    }
  );
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
*By LisensyaPrep Team | Last Updated: April 2026 | 11-minute read*

---

Hematology is one of the most consistently tested subjects in the Medical Technologist Licensure Examination. It covers the study of blood, its components, their formation, and the disorders that arise when any part of that system breaks down.

The good news is that hematology rewards structured review more than almost any other MTLE subject. The concepts build on each other logically. Once you understand normal blood cell development, the abnormal findings in disease states become much easier to recognize and remember.

This reviewer covers the core areas of hematology tested in the MTLE, from blood cell morphology and CBC interpretation through coagulation and hemoglobin disorders.

---

## Blood Cell Formation: Hematopoiesis

All blood cells originate from a single pluripotent stem cell in the bone marrow. The process by which these stem cells develop into the various mature blood cell types is called hematopoiesis.

Understanding the normal developmental sequence is essential because many MTLE questions ask you to identify which stage a cell is at based on its morphological description, or to explain why a certain disorder produces a particular type of abnormal cell.
`;

const SECTION_2 = `
---

## Red Blood Cells: Normal Values and Morphology

### Normal RBC Reference Values

The complete blood count is the most commonly performed laboratory test and one of the most tested topics in MTLE hematology. Know these normal values by heart.

| Parameter | Male | Female |
|-----------|------|--------|
| Hemoglobin | 13.5 to 17.5 g/dL | 12.0 to 15.5 g/dL |
| Hematocrit | 41 to 53% | 36 to 46% |
| RBC count | 4.5 to 5.9 x 10^12/L | 4.0 to 5.2 x 10^12/L |
| MCV | 80 to 100 fL | 80 to 100 fL |
| MCH | 27 to 33 pg | 27 to 33 pg |
| MCHC | 32 to 36 g/dL | 32 to 36 g/dL |
| RDW | 11.5 to 14.5% | 11.5 to 14.5% |

### RBC Morphology Terms You Must Know

**Anisocytosis** refers to variation in red blood cell size. It is reflected in an elevated RDW.

**Poikilocytosis** refers to variation in red blood cell shape. It is a non-specific finding that appears in many different disorders.

**Microcytosis** means RBCs are smaller than normal. MCV below 80 fL. Seen in iron deficiency anemia, thalassemia, and anemia of chronic disease.

**Macrocytosis** means RBCs are larger than normal. MCV above 100 fL. Seen in megaloblastic anemia from vitamin B12 or folate deficiency.

**Target cells (codocytes)** are RBCs with a bull's-eye appearance. Seen in thalassemia, liver disease, and hemoglobin C disease.

**Sickle cells (drepanocytes)** are crescent-shaped RBCs seen in sickle cell disease caused by the HbS mutation.

**Schistocytes** are RBC fragments seen in microangiopathic hemolytic anemia, DIC, and thrombotic thrombocytopenic purpura.

**Spherocytes** are small, round, densely staining RBCs without central pallor. Seen in hereditary spherocytosis and autoimmune hemolytic anemia.

**Teardrop cells (dacrocytes)** are RBCs shaped like teardrops. Classically seen in myelofibrosis.

---

## White Blood Cell Differential

### Normal WBC Values and Differential

| Cell Type | Normal Range | Function |
|-----------|-------------|----------|
| Total WBC | 4.5 to 11.0 x 10^9/L | Overall immune defense |
| Neutrophils | 50 to 70% | First responders to bacterial infection |
| Lymphocytes | 20 to 40% | Adaptive immunity, viral defense |
| Monocytes | 2 to 8% | Phagocytosis, antigen presentation |
| Eosinophils | 1 to 4% | Parasitic infections, allergic reactions |
| Basophils | 0 to 1% | Allergic response, contain histamine |

### Left Shift and Right Shift

**Left shift** means immature neutrophils (bands, metamyelocytes) are released into circulation before they fully mature. It indicates the bone marrow is under demand, usually from severe bacterial infection or inflammation.

**Right shift** means neutrophils have more than the normal 5 lobes in their nucleus. Also called hypersegmentation. Classic finding in megaloblastic anemia from B12 or folate deficiency.

---

## Coagulation: The Clotting Cascade
`;

const SECTION_3 = `
### Key Coagulation Tests

**Prothrombin Time (PT/INR)** tests the extrinsic and common pathways. Prolonged in warfarin therapy, liver disease, and factor VII deficiency.

**Activated Partial Thromboplastin Time (aPTT)** tests the intrinsic and common pathways. Prolonged in heparin therapy, hemophilia A (factor VIII deficiency), and hemophilia B (factor IX deficiency).

**Thrombin Time (TT)** tests fibrinogen to fibrin conversion. Prolonged in hypofibrinogenemia, dysfibrinogenemia, and heparin contamination.

**D-dimer** is a fibrin degradation product elevated in DIC, pulmonary embolism, and deep vein thrombosis.

---

## Common Anemias: Classification and Recognition

### Microcytic Anemias (MCV below 80 fL)

**Iron deficiency anemia** is the most common anemia worldwide. Key findings: low serum iron, low ferritin, high TIBC, high RDW, microcytic hypochromic RBCs. Pencil cells (elliptocytes) may be seen on peripheral smear.

**Thalassemia** results from defective globin chain synthesis. Key finding: target cells on peripheral smear, normal or low RDW (unlike iron deficiency where RDW is high), elevated HbA2 in beta thalassemia trait.

**Anemia of chronic disease** shows low serum iron but also low TIBC, with normal or elevated ferritin. This distinguishes it from iron deficiency where TIBC is elevated.

### Macrocytic Anemias (MCV above 100 fL)

**Megaloblastic anemia** from B12 or folate deficiency shows hypersegmented neutrophils on peripheral smear, oval macrocytes, and pancytopenia in severe cases. B12 deficiency additionally causes neurological symptoms which folate deficiency does not.

### Normocytic Anemias (MCV 80 to 100 fL)

**Hemolytic anemias** including sickle cell disease, hereditary spherocytosis, and autoimmune hemolytic anemia. Key findings: elevated reticulocyte count, elevated indirect bilirubin, elevated LDH, decreased haptoglobin.

**Aplastic anemia** results from bone marrow failure. Shows pancytopenia with a hypocellular bone marrow biopsy.

---

## How to Study Hematology for the MTLE

Hematology questions in the MTLE come in two forms. The first type gives you lab values and asks you to identify the disorder. The second type describes a clinical scenario and asks what laboratory finding you would expect.

For both types, build a habit of thinking in patterns. Iron deficiency has a pattern: low iron, low ferritin, high TIBC, microcytic, high RDW. Megaloblastic anemia has a pattern: macrocytic, hypersegmented neutrophils, low B12 or folate. Learn the patterns, not isolated facts.

Practice questions for MTLE Hematology are available at LisensyaPrep. No account needed.

**[Practice Hematology Questions at LisensyaPrep](https://lisensyaprep.com)**
`;

export default function HematologyReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-mtle-hema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/medical-technology" className="text-gray-500 hover:text-gray-300 transition-colors">Medical Technology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Hematology Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400">
                Medical Technology (MTLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Hematology Reviewer for MTLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 25, 2026</span>
                <span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-mtle-hematology.jpg"
                alt="Filipino medical technologist examining blood samples under microscope for MTLE hematology reviewer Philippines 2026"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="320" fill="#0f172a" rx="10"/>
                  <text x="380" y="28" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Hematopoiesis: Blood Cell Development Pathway</text>
                  <line x1="40" y1="40" x2="720" y2="40" stroke="#334155" strokeWidth="1"/>
                  <rect x="300" y="52" width="160" height="36" fill="#1e3a5f" rx="6"/>
                  <text x="380" y="74" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Pluripotent Stem Cell</text>
                  <line x1="280" y1="70" x2="220" y2="104" stroke="#f59e0b" strokeWidth="2"/>
                  <line x1="460" y1="70" x2="520" y2="104" stroke="#f59e0b" strokeWidth="2"/>
                  <rect x="120" y="104" width="160" height="36" fill="#172033" rx="6"/>
                  <text x="200" y="126" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Myeloid Stem Cell</text>
                  <rect x="460" y="104" width="160" height="36" fill="#172033" rx="6"/>
                  <text x="540" y="126" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Lymphoid Stem Cell</text>
                  <line x1="160" y1="140" x2="100" y2="174" stroke="#64748b" strokeWidth="1.5"/>
                  <line x1="200" y1="140" x2="200" y2="174" stroke="#64748b" strokeWidth="1.5"/>
                  <line x1="240" y1="140" x2="300" y2="174" stroke="#64748b" strokeWidth="1.5"/>
                  <line x1="540" y1="140" x2="500" y2="174" stroke="#64748b" strokeWidth="1.5"/>
                  <line x1="540" y1="140" x2="580" y2="174" stroke="#64748b" strokeWidth="1.5"/>
                  <rect x="40" y="174" width="100" height="32" fill="#1e3a5f" rx="5"/>
                  <text x="90" y="194" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Erythrocytes</text>
                  <text x="90" y="206" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Arial,sans-serif">(Red Blood Cells)</text>
                  <rect x="150" y="174" width="100" height="32" fill="#1e3a5f" rx="5"/>
                  <text x="200" y="194" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Granulocytes</text>
                  <text x="200" y="206" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Arial,sans-serif">(WBC types)</text>
                  <rect x="260" y="174" width="100" height="32" fill="#1e3a5f" rx="5"/>
                  <text x="310" y="194" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Thrombocytes</text>
                  <text x="310" y="206" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Arial,sans-serif">(Platelets)</text>
                  <rect x="440" y="174" width="100" height="32" fill="#1e3a5f" rx="5"/>
                  <text x="490" y="194" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">T Lymphocytes</text>
                  <text x="490" y="206" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Arial,sans-serif">(Cell-mediated)</text>
                  <rect x="550" y="174" width="100" height="32" fill="#1e3a5f" rx="5"/>
                  <text x="600" y="194" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">B Lymphocytes</text>
                  <text x="600" y="206" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Arial,sans-serif">(Antibody-mediated)</text>
                  <rect x="40" y="240" width="640" height="48" fill="#1e293b" rx="6"/>
                  <text x="360" y="260" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Key Rule: As cells mature, they get SMALLER, lose their nucleus, and gain function-specific features.</text>
                  <text x="360" y="278" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Erythroblast loses nucleus to become RBC. Megakaryocyte fragments to produce platelets.</text>
                  <text x="380" y="312" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | MTLE Hematology Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Blood cell development pathway from pluripotent stem cell</figcaption>
              </figure>

              {renderContent(SECTION_2)}

              <AdPlaceholder slot="banner" className="my-6" />

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="280" fill="#0f172a" rx="10"/>
                  <text x="380" y="28" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Coagulation Cascade Overview</text>
                  <line x1="40" y1="40" x2="720" y2="40" stroke="#334155" strokeWidth="1"/>
                  <rect x="60" y="54" width="260" height="80" fill="#1e3a5f" rx="8"/>
                  <text x="190" y="76" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">INTRINSIC PATHWAY</text>
                  <text x="190" y="94" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Factors XII, XI, IX, VIII</text>
                  <text x="190" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Activated by contact with damaged surface</text>
                  <text x="190" y="124" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Measured by: PTT (aPTT)</text>
                  <rect x="440" y="54" width="260" height="80" fill="#172033" rx="8"/>
                  <text x="570" y="76" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">EXTRINSIC PATHWAY</text>
                  <text x="570" y="94" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Factor VII and Tissue Factor</text>
                  <text x="570" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Activated by tissue damage</text>
                  <text x="570" y="124" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Measured by: PT (INR)</text>
                  <line x1="320" y1="94" x2="380" y2="140" stroke="#f59e0b" strokeWidth="2"/>
                  <line x1="440" y1="94" x2="380" y2="140" stroke="#f59e0b" strokeWidth="2"/>
                  <rect x="280" y="140" width="200" height="46" fill="#14532d" rx="8"/>
                  <text x="380" y="160" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">COMMON PATHWAY</text>
                  <text x="380" y="176" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Factors X, V, II (Thrombin), I (Fibrin)</text>
                  <line x1="380" y1="186" x2="380" y2="210" stroke="#86efac" strokeWidth="2"/>
                  <rect x="280" y="210" width="200" height="34" fill="#78350f" rx="8"/>
                  <text x="380" y="231" textAnchor="middle" fill="#fcd34d" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">FIBRIN CLOT FORMED</text>
                  <text x="380" y="268" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | MTLE Hematology Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Coagulation cascade with pathway and laboratory test reference</figcaption>
              </figure>

              {renderContent(SECTION_3)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-sky-900/20 to-sky-900/10 border border-sky-500/30 rounded-2xl p-6 text-center">
              <p className="text-sky-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice MTLE hematology questions with instant feedback. No registration required.
              </p>
              <Link
                href="/medical-technology"
                className="inline-block bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Start MTLE Practice at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">Related MTLE Articles</h2>
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
              <h3 className="text-white font-bold mb-4">MTLE Study Guides</h3>
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
