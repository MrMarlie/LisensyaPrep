import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'Histopathology and Cytology Reviewer for MTLE Philippines 2026 (Complete Guide)',
  description:
    'Studying for the medical technology board exam? This histopathology and cytology reviewer covers tissue processing, staining techniques, cytology specimens, and cell abnormalities tested in the MTLE.',
  path: '/medical-technology/histopathology-cytology-reviewer',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Histopathology and Cytology Reviewer for MTLE Philippines 2026',
  description:
    'Complete histopathology and cytology reviewer for the PRC Medical Technologist Licensure Examination covering tissue processing, H and E staining, special stains, Pap stain, and the Bethesda System.',
  image: 'https://lisensyaprep.com/images/articles/hero-mtle-histopathology.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-01',
  dateModified: '2026-05-01',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/medical-technology/histopathology-cytology-reviewer' },
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
Histopathology and Cytology is the laboratory discipline that examines tissue and cell specimens to diagnose disease, primarily cancer. While pathologists make the final diagnosis, medical technologists in the histopathology and cytology laboratory prepare the specimens that make diagnosis possible.

The MTLE tests your knowledge of tissue processing, fixation, staining, and the principles of cytology that underpin cancer screening programs in the Philippines and worldwide.

---

## Histopathology: Tissue Processing

Tissue processing transforms a fresh surgical specimen into a thin, stained section that can be examined under a microscope. Each step must be done correctly or the diagnostic quality of the final slide suffers.
`;

const SECTION2 = `
### Fixation

Fixation is the first and most critical step. It preserves tissue morphology and prevents autolysis (self-digestion by enzymes) and putrefaction.

**10% Neutral Buffered Formalin (NBF)** is the most commonly used fixative in surgical pathology. It cross-links proteins and preserves nucleic acids. The recommended fixation ratio is 10:1 (fixative volume to tissue volume).

**Fixation time:** Adequate fixation requires at least 6 to 24 hours depending on tissue thickness. Underfixation causes poor nuclear detail. Overfixation causes excessive hardening and poor antigen retrieval for immunohistochemistry.

**Other fixatives and their uses:**
- B5 fixative: best for lymph node and bone marrow biopsies
- Bouin's solution: best for testicular biopsies
- Glutaraldehyde: used for electron microscopy
- Zenker's fixative: used for liver and spleen specimens

### Staining

**Hematoxylin and Eosin (H and E) stain** is the routine stain used in histopathology.

**Hematoxylin** is a basic dye that stains acidic structures blue to purple. These are called **basophilic** structures. Basophilic structures include cell nuclei (containing DNA), ribosomes, and rough endoplasmic reticulum.

**Eosin** is an acidic dye that stains basic structures pink to red. These are called **eosinophilic** structures. Eosinophilic structures include cytoplasm, muscle, and collagen.

### Special Stains

Special stains are used when H and E alone is insufficient to identify specific tissue components or organisms.

| Special Stain | What It Identifies |
|--------------|-------------------|
| PAS (Periodic Acid-Schiff) | Glycogen, fungi, basement membranes |
| Masson's Trichrome | Collagen (blue-green), muscle (red), fibrin |
| Ziehl-Neelsen (Acid-Fast) | Mycobacterium tuberculosis |
| Grocott Methenamine Silver (GMS) | Fungi (black against green background) |
| Congo Red | Amyloid (apple-green birefringence under polarized light) |
| Prussian Blue (Perls') | Iron/hemosiderin |
| Reticulin (Gordon-Sweet) | Reticular fibers |

---

## Cytology: Examining Individual Cells

Cytology examines individual cells or small clusters rather than intact tissue architecture. It is used primarily for cancer screening and diagnosis.

### Papanicolaou (Pap) Stain

The Pap stain is the standard stain used in cytology. It was developed by George Papanicolaou and is the basis of cervical cancer screening worldwide.

**Staining results:**
- Nuclei: dark blue to purple (hematoxylin)
- Cytoplasm of superficial cells: pink to red (eosinophilic)
- Cytoplasm of intermediate cells: blue-green to green (cyanophilic)
- Cytoplasm of parabasal cells: blue-green

### Cervical Cytology and the Bethesda System

The Bethesda System is the standardized reporting system for cervical cytology. MTLE questions on cytology frequently reference Bethesda categories.
`;

const SECTION3 = `
### Sputum Cytology

Sputum specimens are used to detect malignant cells from the respiratory tract. For sputum cytology, the early morning deep-cough specimen is the most diagnostic. Three consecutive specimens improve sensitivity.

**Curschmann's spirals:** Coiled mucus plugs seen in asthma.

**Charcot-Leyden crystals:** Eosinophil breakdown products seen in asthma and allergic conditions.

**Ferruginous bodies (asbestos bodies):** Asbestos fibers coated with iron-containing protein. Indicate asbestos exposure.

---

## Frozen Section

A frozen section is a rapid intraoperative technique that allows diagnosis while the patient is still on the operating table. The tissue is frozen rather than processed in paraffin, sectioned at 6 to 8 microns, and stained with H and E. Results are available in 10 to 20 minutes.

**Indications:** Determination of surgical margins (is the tumor completely excised?), intraoperative diagnosis to guide the extent of surgery, identification of parathyroid tissue.

**Limitations:** Ice crystal artifact reduces cytological detail compared to permanent sections. Paraffin sections are still performed after frozen sections for final diagnosis.

---

## Practice What You Just Learned

Histopathology and cytology questions in the MTLE test staining principles, tissue processing knowledge, and cytological classification systems. Practice now at LisensyaPrep. No account needed.

**[Practice MTLE Histopathology Questions at LisensyaPrep](https://lisensyaprep.com/medical-technology)**

---

## Related MTLE Articles

- [Hematology Reviewer for MTLE Philippines 2026](https://lisensyaprep.com/medical-technology/hematology-reviewer)
- [Microbiology and Parasitology Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/microbiology-parasitology-reviewer)
- [Blood Banking and Serology Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/blood-banking-serology-reviewer)
- [Urinalysis and Body Fluids Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/urinalysis-body-fluids-reviewer)
- [MTLE Coverage 2026 Complete Subject Breakdown](https://lisensyaprep.com/medical-technology/mtle-coverage-2026)
`;

export default function HistopathologyCytologyReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-mtle-histopathology" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/medical-technology","name":"Medical Technology"},{"url":"/medical-technology/histopathology-cytology-reviewer","name":"Histopathology and Cytology Reviewer"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/medical-technology" className="text-gray-500 hover:text-gray-300 transition-colors">Medical Technology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Histopathology and Cytology Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400">Medical Technology (MTLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Histopathology and Cytology Reviewer for MTLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 1, 2026</span><span>•</span>
                <span>10 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-mtle-histopathology.jpg"
                alt="Filipino male medical technologist looking into microscope for MTLE histopathology cytology reviewer Philippines 2026"
                width={1200} height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="200" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="700" fontFamily="Georgia,serif">Histopathology Tissue Processing Steps</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="46" y="54" width="88" height="100" fill="#1e3a5f" rx="6"/>
                  <text x="90" y="82" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">FIXATION</text>
                  <text x="90" y="100" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">10% NBF</text>
                  <text x="90" y="116" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Arial,sans-serif">Preserves tissue</text>
                  <text x="90" y="130" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Arial,sans-serif">morphology</text>
                  <line x1="138" y1="104" x2="152" y2="104" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="148,98 160,104 148,110" fill="#f59e0b"/>
                  <rect x="160" y="54" width="88" height="100" fill="#172033" rx="6"/>
                  <text x="204" y="82" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">PROCESSING</text>
                  <text x="204" y="100" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Dehydration</text>
                  <text x="204" y="116" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Clearing</text>
                  <text x="204" y="130" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Arial,sans-serif">Removes water</text>
                  <line x1="252" y1="104" x2="266" y2="104" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="262,98 274,104 262,110" fill="#f59e0b"/>
                  <rect x="274" y="54" width="88" height="100" fill="#1e3a5f" rx="6"/>
                  <text x="318" y="82" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">EMBEDDING</text>
                  <text x="318" y="100" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Paraffin wax</text>
                  <text x="318" y="116" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Arial,sans-serif">Creates solid</text>
                  <text x="318" y="130" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Arial,sans-serif">block for cutting</text>
                  <line x1="366" y1="104" x2="380" y2="104" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="376,98 388,104 376,110" fill="#f59e0b"/>
                  <rect x="388" y="54" width="88" height="100" fill="#172033" rx="6"/>
                  <text x="432" y="82" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">SECTIONING</text>
                  <text x="432" y="100" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Microtome</text>
                  <text x="432" y="116" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">3 to 5 microns</text>
                  <text x="432" y="130" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Arial,sans-serif">Thin slice of block</text>
                  <line x1="480" y1="104" x2="494" y2="104" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="490,98 502,104 490,110" fill="#f59e0b"/>
                  <rect x="502" y="54" width="88" height="100" fill="#14532d" rx="6"/>
                  <text x="546" y="82" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">STAINING</text>
                  <text x="546" y="100" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">H and E stain</text>
                  <text x="546" y="116" textAnchor="middle" fill="#86efac" fontSize="9" fontFamily="Arial,sans-serif">Colors tissue</text>
                  <text x="546" y="130" textAnchor="middle" fill="#86efac" fontSize="9" fontFamily="Arial,sans-serif">components</text>
                  <line x1="594" y1="104" x2="608" y2="104" stroke="#f59e0b" strokeWidth="2"/>
                  <polygon points="604,98 616,104 604,110" fill="#f59e0b"/>
                  <rect x="616" y="54" width="102" height="100" fill="#1e3a5f" rx="6"/>
                  <text x="667" y="82" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">MOUNTING</text>
                  <text x="667" y="100" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Coverslip</text>
                  <text x="667" y="116" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Arial,sans-serif">Permanent slide</text>
                  <text x="667" y="130" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Arial,sans-serif">for diagnosis</text>
                  <text x="380" y="185" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | MTLE Histopathology Reviewer 2026 | NBF = Neutral Buffered Formalin</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Histopathology tissue processing steps from fixation to mounting</figcaption>
              </figure>

              {renderContent(SECTION2)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="260" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="700" fontFamily="Georgia,serif">Bethesda System for Cervical Cytology Reporting</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="30" fill="#14532d" rx="5"/>
                  <text x="200" y="70" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">NILM</text>
                  <text x="490" y="70" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Negative for Intraepithelial Lesion or Malignancy. Normal result.</text>
                  <rect x="40" y="86" width="680" height="30" fill="#172033" rx="5"/>
                  <text x="200" y="106" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">ASC-US</text>
                  <text x="490" y="106" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Atypical Squamous Cells of Undetermined Significance. Needs follow-up.</text>
                  <rect x="40" y="122" width="680" height="30" fill="#172033" rx="5"/>
                  <text x="200" y="142" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">ASC-H</text>
                  <text x="490" y="142" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Atypical Squamous Cells, cannot exclude HSIL. Higher risk than ASC-US.</text>
                  <rect x="40" y="158" width="680" height="30" fill="#78350f" rx="5"/>
                  <text x="200" y="178" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">LSIL</text>
                  <text x="490" y="178" textAnchor="middle" fill="#fef3c7" fontSize="11" fontFamily="Arial,sans-serif">Low-Grade Squamous Intraepithelial Lesion. Includes CIN 1 and HPV changes.</text>
                  <rect x="40" y="194" width="680" height="30" fill="#7f1d1d" rx="5"/>
                  <text x="200" y="214" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">HSIL</text>
                  <text x="490" y="214" textAnchor="middle" fill="#fecaca" fontSize="11" fontFamily="Arial,sans-serif">High-Grade Squamous Intraepithelial Lesion. Includes CIN 2 and CIN 3. Colposcopy needed.</text>
                  <rect x="40" y="230" width="680" height="22" fill="#450a0a" rx="5"/>
                  <text x="200" y="246" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Malignancy</text>
                  <text x="490" y="246" textAnchor="middle" fill="#fecaca" fontSize="11" fontFamily="Arial,sans-serif">Squamous cell carcinoma, adenocarcinoma. Immediate colposcopy and biopsy required.</text>
                  <text x="380" y="257" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Bethesda System categories for cervical cytology reporting</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(SECTION3)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-sky-900/20 to-sky-900/10 border border-sky-500/30 rounded-2xl p-6 text-center">
              <p className="text-sky-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">Practice MTLE histopathology questions with instant feedback. No registration required.</p>
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
