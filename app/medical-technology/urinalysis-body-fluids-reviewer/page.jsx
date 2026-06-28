import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Urinalysis and Body Fluids Reviewer for MTLE Philippines 2026 (Complete Guide)',
  description:
    'Studying for the medical technology board exam? This urinalysis and body fluids reviewer covers physical, chemical, and microscopic urine examination plus CSF and other body fluids tested in the MTLE.',
  path: '/medical-technology/urinalysis-body-fluids-reviewer',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Urinalysis and Body Fluids Reviewer for MTLE Philippines 2026',
  description:
    'Complete urinalysis and body fluids reviewer for the PRC Medical Technologist Licensure Examination covering physical, chemical, and microscopic urine examination plus CSF and body fluid analysis.',
  image: 'https://lisensyaprep.com/images/articles/hero-mtle-urinalysis.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-01',
  dateModified: '2026-05-01',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/medical-technology/urinalysis-body-fluids-reviewer' },
};

const ALL_MTLE_ARTICLES = [
  { text: 'How to Pass the MTLE Board Exam on Your First Take', href: '/medical-technology/how-to-pass-mtle-board-exam' },
  { text: 'MTLE Coverage 2026 Complete Subject Breakdown', href: '/medical-technology/mtle-coverage-2026' },
  { text: 'Hematology Reviewer for MTLE Philippines 2026', href: '/medtech/hematology-reviewer' },
  { text: 'Clinical Chemistry Reviewer for MTLE Philippines 2026', href: '/medtech/clinical-chemistry-reviewer' },
  { text: 'Microbiology and Parasitology Reviewer MTLE 2026', href: '/medtech/microbiology-parasitology-reviewer' },
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
Urinalysis is one of the oldest and most informative laboratory tests in clinical medicine. A complete urinalysis has three components: physical examination, chemical examination using the dipstick, and microscopic examination of the urine sediment. The MTLE tests all three components in detail, plus analysis of other body fluids including cerebrospinal fluid, pleural fluid, and synovial fluid.

---

## Physical Examination of Urine

### Color

Normal urine is pale yellow to amber, the color coming from the pigment urochrome. The intensity of color varies with concentration.

| Color | Possible Cause |
|-------|---------------|
| Colorless | Very dilute urine, diabetes insipidus |
| Dark yellow to amber | Concentrated urine, dehydration |
| Orange | Bilirubin, urobilin, rifampicin |
| Red to red-brown | Hematuria, hemoglobinuria, myoglobinuria, beets |
| Brown to black | Melanin, methemoglobin, alkaptonuria |
| Green to blue-green | Biliverdin, Pseudomonas UTI, methylene blue |
| Cloudy white (milky) | Pyuria, chyluria, phosphaturia |

### Clarity (Turbidity)

Normal fresh urine is clear. Turbidity can result from cells, casts, bacteria, crystals, mucus, or lipids.

### Specific Gravity

Specific gravity measures urine concentration by comparing its density to water. Normal range is 1.001 to 1.035.

**Isosthenuria:** Fixed specific gravity at 1.010, the same as plasma ultrafiltrate. Indicates loss of renal concentrating ability. Seen in chronic renal failure.

**Hyposthenuria:** Specific gravity below 1.010. Seen in diabetes insipidus, excessive fluid intake.

**Hypersthenuria:** Specific gravity above 1.020. Seen in dehydration, diabetes mellitus (glucose adds to SG), syndrome of inappropriate ADH.

---

## Chemical Examination: The Dipstick
`;

const SECTION2 = `
---

## Microscopic Examination of Urine Sediment

The microscopic examination identifies formed elements in urine. It is the most technically demanding and most information-rich part of the urinalysis.

### Cells

**Red Blood Cells:** Normal is 0 to 2 per high power field (HPF). More than 3 RBCs per HPF is hematuria. Dysmorphic RBCs (acanthocytes, fragmented forms) indicate glomerular origin. Isomorphic RBCs indicate lower urinary tract bleeding.

**White Blood Cells:** Normal is 0 to 5 per HPF. More than 5 WBCs per HPF is pyuria, indicating urinary tract infection or interstitial nephritis. Clumps of WBCs suggest infection.

**Epithelial Cells:** Squamous epithelial cells from the lower urethra are normal and indicate specimen contamination. Transitional epithelial cells from the bladder and ureters are occasionally seen. Renal tubular epithelial cells (RTECs) are abnormal and indicate tubular damage from toxins, ischemia, or viral infection.

### Casts

Casts are cylindrical structures formed in the renal tubules. They are named for what is incorporated within their protein matrix.

**Hyaline casts:** Made of Tamm-Horsfall protein alone. Can be seen in normal urine after exercise or dehydration. Low clinical significance.

**RBC casts:** Contain red blood cells. Pathognomonic of glomerulonephritis. The most significant finding in urinalysis for renal disease.

**WBC casts:** Contain white blood cells. Indicate pyelonephritis or interstitial nephritis.

**Granular casts:** Contain cellular debris. Indicate renal tubular damage. Fine granular casts are less significant than coarse granular casts.

**Waxy casts:** Broad, waxy appearance. Indicate severe chronic renal disease and stasis of urine flow.

**Fatty casts:** Contain lipids. Seen in nephrotic syndrome. Associated with oval fat bodies and free fat droplets.

**Bacterial casts:** Indicate bacterial infection within the tubules.

---

## Cerebrospinal Fluid (CSF) Analysis

CSF analysis is tested in the MTLE body fluids section. Knowing the normal values and what abnormal findings indicate is essential.

| Parameter | Normal CSF | Bacterial Meningitis | Viral Meningitis | TB Meningitis |
|-----------|-----------|---------------------|-----------------|--------------|
| Appearance | Clear, colorless | Turbid, cloudy | Clear | Clear to cloudy |
| WBC count | 0 to 5 cells/uL | >1000, mostly PMNs | 10 to 500, mostly lymphocytes | 100 to 500, lymphocytes |
| Protein | 15 to 45 mg/dL | Markedly elevated | Normal to slightly elevated | Elevated |
| Glucose | 60 to 80% of blood glucose | Very low (<40 mg/dL) | Normal | Low |
| Gram stain | Negative | Often positive | Negative | Negative (AFB stain needed) |

**Xanthochromia:** Yellow discoloration of CSF supernatant. Indicates subarachnoid hemorrhage that occurred more than 2 hours before lumbar puncture. Differentiates true bleeding from traumatic tap.

---

## Other Body Fluids

### Pleural Fluid (Thoracentesis)

**Transudate vs Exudate** is the critical distinction in pleural fluid analysis.

**Transudate:** Results from imbalance in hydrostatic and oncotic pressures. Causes: heart failure, cirrhosis, nephrotic syndrome. Low protein, low LDH, low specific gravity.

**Exudate:** Results from inflammation, infection, or malignancy. High protein (more than 3 g/dL), high LDH. Causes: pneumonia, tuberculosis, malignancy, pulmonary embolism.

**Light's Criteria** is used to classify pleural fluid. Exudate if any of: pleural fluid protein to serum protein ratio more than 0.5, pleural LDH to serum LDH ratio more than 0.6, pleural LDH more than two-thirds the upper normal limit for serum LDH.

### Synovial Fluid

Normal synovial fluid is clear, viscous, and straw-colored. In inflammatory conditions it becomes turbid with decreased viscosity. In septic arthritis it can become frankly purulent with very high WBC counts.

The string test assesses viscosity. Normal synovial fluid forms a string of 4 to 6 cm when dropped from a syringe. Inflammatory fluid has reduced viscosity and does not string well.

---

## Practice What You Just Learned

Urinalysis questions in the MTLE present clinical scenarios and ask you to interpret physical, chemical, and microscopic findings. Practice those scenarios at LisensyaPrep now. No account needed.

**[Practice MTLE Urinalysis Questions at LisensyaPrep](https://lisensyaprep.com/medical-technology)**

---

## Related MTLE Articles

- [Hematology Reviewer for MTLE Philippines 2026](https://lisensyaprep.com/medtech/hematology-reviewer)
- [Blood Banking and Serology Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/blood-banking-serology-reviewer)
- [Histopathology and Cytology Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/histopathology-cytology-reviewer)
- [MTLE Coverage 2026 Complete Subject Breakdown](https://lisensyaprep.com/medical-technology/mtle-coverage-2026)
- [How to Pass the MTLE Board Exam Philippines](https://lisensyaprep.com/medical-technology/how-to-pass-mtle-board-exam)
`;

export default function UrinalysisBodyFluidsReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-mtle-urinalysis" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/medical-technology" className="text-gray-500 hover:text-gray-300 transition-colors">Medical Technology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Urinalysis and Body Fluids Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400">Medical Technology (MTLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Urinalysis and Body Fluids Reviewer for MTLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 1, 2026</span><span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-mtle-urinalysis.jpg"
                alt="Filipino female medical technologist in white coat examining a specimen tube for MTLE urinalysis body fluids reviewer Philippines 2026"
                width={1200} height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="360" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Urine Dipstick: Key Parameters and Clinical Significance</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="130" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PARAMETER</text>
                  <text x="310" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">NORMAL</text>
                  <text x="560" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">ABNORMAL SIGNIFICANCE</text>
                  <line x1="40" y1="64" x2="720" y2="64" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="70" width="680" height="28" fill="#1e3a5f" rx="4"/>
                  <text x="130" y="89" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">pH</text>
                  <text x="310" y="89" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">4.5 to 8.0</text>
                  <text x="560" y="89" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Acidic: fever, starvation, UTI (E. coli). Alkaline: UTI (Proteus), post-meal</text>
                  <rect x="40" y="104" width="680" height="28" fill="#172033" rx="4"/>
                  <text x="130" y="123" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Protein</text>
                  <text x="310" y="123" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Negative (trace OK)</text>
                  <text x="560" y="123" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Glomerular disease, nephrotic syndrome, hypertension, preeclampsia</text>
                  <rect x="40" y="138" width="680" height="28" fill="#1e3a5f" rx="4"/>
                  <text x="130" y="157" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Glucose</text>
                  <text x="310" y="157" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Negative</text>
                  <text x="560" y="157" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Diabetes mellitus (blood glucose exceeds renal threshold of 180 mg/dL)</text>
                  <rect x="40" y="172" width="680" height="28" fill="#172033" rx="4"/>
                  <text x="130" y="191" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Ketones</text>
                  <text x="310" y="191" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Negative</text>
                  <text x="560" y="191" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Diabetic ketoacidosis, starvation, prolonged vomiting, low carb diet</text>
                  <rect x="40" y="206" width="680" height="28" fill="#1e3a5f" rx="4"/>
                  <text x="130" y="225" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Blood (Heme)</text>
                  <text x="310" y="225" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Negative</text>
                  <text x="560" y="225" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Hematuria (RBCs), hemoglobinuria, myoglobinuria (muscle damage)</text>
                  <rect x="40" y="240" width="680" height="28" fill="#172033" rx="4"/>
                  <text x="130" y="259" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Bilirubin</text>
                  <text x="310" y="259" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Negative</text>
                  <text x="560" y="259" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Liver disease, obstructive jaundice. Only conjugated (direct) bilirubin appears</text>
                  <rect x="40" y="274" width="680" height="28" fill="#1e3a5f" rx="4"/>
                  <text x="130" y="293" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Urobilinogen</text>
                  <text x="310" y="293" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">0.1 to 1.0 EU/dL</text>
                  <text x="560" y="293" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Elevated: hemolytic anemia, liver disease. Absent: complete biliary obstruction</text>
                  <rect x="40" y="308" width="680" height="28" fill="#172033" rx="4"/>
                  <text x="130" y="327" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Leukocyte Esterase</text>
                  <text x="310" y="327" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Negative</text>
                  <text x="560" y="327" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Pyuria, urinary tract infection. Screens for WBCs in urine</text>
                  <text x="380" y="352" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | MTLE Urinalysis Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Urine dipstick parameters and clinical significance</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(SECTION2)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-sky-900/20 to-sky-900/10 border border-sky-500/30 rounded-2xl p-6 text-center">
              <p className="text-sky-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">Practice MTLE urinalysis questions with instant feedback. No registration required.</p>
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
