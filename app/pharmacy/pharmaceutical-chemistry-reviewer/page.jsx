import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Pharmaceutical Chemistry Reviewer for PLE Philippines 2026 (Complete Guide)',
  description:
    'Studying for the pharmacy board exam? This pharmaceutical chemistry reviewer covers drug stability, acid-base chemistry, organic functional groups, and pharmaceutical analysis tested in the PLE.',
  path: '/pharmacy/pharmaceutical-chemistry-reviewer',
  image: '/images/articles/hero-pharmacy-pharmaceutical-chemistry.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pharmaceutical Chemistry Reviewer for PLE Philippines 2026',
  description:
    'Complete pharmaceutical chemistry reviewer for the PRC Pharmacy Licensure Examination covering acid-base chemistry, drug stability, organic functional groups, solubility, and pharmaceutical analysis.',
  image: 'https://lisensyaprep.com/images/articles/hero-pharmacy-pharmaceutical-chemistry.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-02',
  dateModified: '2026-05-02',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/pharmacy/pharmaceutical-chemistry-reviewer' },
};

const RELATED_ARTICLES = [
  { text: 'PLE Coverage 2026 Complete Subject Breakdown', href: '/pharmacy/ple-coverage-2026' },
  { text: 'Pharmacology Reviewer PLE Philippines 2026', href: '/pharmacy/pharmacology-reviewer' },
  { text: 'Pharmacy Law and Ethics Reviewer PLE 2026', href: '/pharmacy/pharmacy-law-ethics-reviewer' },
  { text: 'Pharmaceutical Calculations Practice Problems PLE 2026', href: '/pharmacy/pharmaceutical-calculations-reviewer' },
  { text: 'Clinical Pharmacy Reviewer PLE Philippines 2026', href: '/pharmacy/clinical-pharmacy-reviewer' },
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
*By LisensyaPrep Team | Last Updated: May 2026 | 11-minute read*

---

Pharmaceutical Chemistry bridges the gap between pure chemistry and clinical pharmacy practice. It explains why drugs behave the way they do in formulations, how they interact with the body at the molecular level, and why storage conditions matter. For the PLE, pharmaceutical chemistry tests your ability to apply chemical principles to pharmaceutical problems, not just recall isolated facts.

---

## Acid-Base Chemistry in Pharmacy

### pH and the Henderson-Hasselbalch Equation

The pH of a drug solution affects its stability, solubility, absorption, and compatibility with other ingredients. The Henderson-Hasselbalch equation is the most important equation in pharmaceutical chemistry.

**For acids:** pH = pKa + log([A⁻]/[HA])

**For bases:** pH = pKa + log([B]/[BH⁺])

Where pKa is the negative log of the acid dissociation constant, [A⁻] is the concentration of the conjugate base, and [HA] is the concentration of the weak acid.

**Clinical application:** Most drugs are either weak acids or weak bases. Their ionization state at a given pH determines how well they are absorbed. Unionized (non-polar) drugs cross cell membranes more easily than ionized drugs.

**Rule of thumb:** A weak acid is better absorbed in an acidic environment (stomach). A weak base is better absorbed in an alkaline environment (small intestine).

### Buffers in Pharmaceutical Formulations

A buffer resists changes in pH when small amounts of acid or base are added. Pharmaceutical buffers are used to maintain the pH of formulations at the optimal range for stability and compatibility.

**Buffer capacity** is the ability of a buffer to resist pH change. It is greatest when the ratio of conjugate base to weak acid is 1:1, meaning when pH equals pKa.

**Common pharmaceutical buffers:**
- Acetate buffer: pH range 3.6 to 5.6
- Phosphate buffer: pH range 5.8 to 8.0
- Citrate buffer: pH range 3.0 to 6.2
- Borate buffer: pH range 8.0 to 10.0

---

## Drug Stability

Drug stability is one of the most heavily tested topics in PLE pharmaceutical chemistry. An unstable drug loses potency, may form toxic degradation products, or may change in appearance or physical properties.
`;

const SECTION_2 = `
### Shelf Life and Expiration Dating

**Shelf life (t90):** The time for a drug to degrade to 90 percent of its original potency. Most expiration dates are based on t90.

**Zero-order kinetics:** Drug degrades at a constant rate regardless of concentration. Amount degraded per unit time is constant.

**First-order kinetics:** Rate of degradation is proportional to drug concentration. Most drug degradation follows first-order kinetics.

**Arrhenius equation:** Used to predict stability at different temperatures. A 10°C increase in temperature approximately doubles the rate of degradation (Q10 rule). This is why cold chain storage matters for temperature-sensitive drugs.

---

## Organic Functional Groups in Drugs

Understanding functional groups helps predict drug properties including solubility, stability, and biological activity.

| Functional Group | Properties | Drug Examples |
|-----------------|-----------|--------------|
| Carboxylic acid (-COOH) | Acidic, water-soluble as salt | Aspirin, ibuprofen, penicillins |
| Amine (-NH₂, -NHR, -NR₂) | Basic, forms salts with acids | Amphetamine, procaine, antihistamines |
| Ester (-COO-) | Susceptible to hydrolysis | Aspirin, cocaine, procaine |
| Hydroxyl (-OH) | Hydrogen bonding, water-soluble | Paracetamol, morphine, steroids |
| Amide (-CONH-) | More stable than ester, less prone to hydrolysis | Paracetamol, lidocaine, penicillins |
| Phenol (ArOH) | Susceptible to oxidation | Adrenaline, morphine, propofol |

---

## Solubility and Drug Formulation

### Solubility Principles

**Like dissolves like:** Polar (hydrophilic) drugs dissolve in polar solvents like water. Non-polar (lipophilic) drugs dissolve in non-polar solvents.

**Partition coefficient (log P):** The ratio of drug concentration in octanol to water. High log P indicates lipophilic drug (good membrane penetration but poor water solubility). Low log P indicates hydrophilic drug (poor membrane penetration but good water solubility).

**Salt formation:** Converting a drug to its salt form dramatically increases water solubility. Most oral and injectable drugs are formulated as salts. Example: diclofenac sodium, morphine sulfate, amlodipine besylate.

### Routes of Administration and Formulation Implications

**Oral formulations** must withstand the acidic pH of the stomach (pH 1 to 3) and the alkaline environment of the intestine (pH 7 to 8). Enteric coating protects acid-labile drugs.

**Parenteral formulations** must be sterile, pyrogen-free, and isotonic. pH should be near physiological (7.4). Precipitation in the syringe or IV line is a major incompatibility concern.

**Topical formulations** must penetrate the skin barrier. Lipophilic drugs penetrate better. Penetration enhancers like propylene glycol increase absorption.

---

## Pharmaceutical Analysis

Pharmaceutical analysis ensures that drug products contain the correct amount of active ingredient and meet purity specifications.

### Titrimetric Analysis

**Acid-base titration:** Determines the content of acidic or basic drugs. Uses a standard solution of known concentration (titrant) and an indicator or pH meter to detect the endpoint.

**Redox titration:** Used for drugs that can be oxidized or reduced. Example: permanganate titration for ferrous salts.

**Complexometric titration:** Uses EDTA to determine metal ion content. Used for calcium and magnesium in mineral supplements.

### Spectrophotometric Analysis

**UV-Vis spectrophotometry:** Measures absorbance of UV or visible light. Most drugs absorb UV light due to aromatic rings or conjugated double bonds. Beer-Lambert law: Absorbance = ε × c × l (molar absorptivity × concentration × path length).

**Infrared (IR) spectroscopy:** Used for identifying functional groups and confirming drug identity.

**HPLC (High Performance Liquid Chromatography):** The most widely used method in pharmaceutical analysis. Separates drug from impurities and degradation products. Provides both identification and quantification.

---

## Practice What You Just Learned

Pharmaceutical chemistry questions in the PLE combine chemistry principles with pharmaceutical applications. Practice now at LisensyaPrep. No account needed.

**[Practice Pharmaceutical Chemistry Questions at LisensyaPrep](https://lisensyaprep.com/pharmacy)**
`;

export default function PharmaceuticalChemistryReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-pharma-chem" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/pharmacy" className="text-gray-500 hover:text-gray-300 transition-colors">Pharmacy</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Pharmaceutical Chemistry Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">
                Pharmacy (PLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Pharmaceutical Chemistry Reviewer for PLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>May 2, 2026</span>
                <span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-pharmacy-pharmaceutical-chemistry.jpg"
                alt="Young Filipino male pharmacist in white coat examining a flask for PLE pharmaceutical chemistry reviewer Philippines 2026"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="280" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Drug Degradation Pathways and Prevention</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="52" fill="#7f1d1d" rx="6"/>
                  <text x="190" y="72" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">HYDROLYSIS</text>
                  <text x="190" y="88" textAnchor="middle" fill="#fecaca" fontSize="10" fontFamily="Arial,sans-serif">Most common pathway</text>
                  <text x="490" y="68" textAnchor="middle" fill="#fecaca" fontSize="11" fontFamily="Arial,sans-serif">Water breaks drug molecule. Affects esters, amides, lactams.</text>
                  <text x="490" y="84" textAnchor="middle" fill="#fca5a5" fontSize="10" fontFamily="Arial,sans-serif">Prevention: anhydrous formulation, lyophilization, sealed packaging.</text>
                  <rect x="40" y="108" width="680" height="52" fill="#1e3a5f" rx="6"/>
                  <text x="190" y="130" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">OXIDATION</text>
                  <text x="190" y="146" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Second most common</text>
                  <text x="490" y="126" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Oxygen reacts with drug. Affects phenols, catechols, aldehydes, unsaturated bonds.</text>
                  <text x="490" y="142" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Prevention: antioxidants (BHA, BHT, ascorbic acid), nitrogen purging, opaque containers.</text>
                  <rect x="40" y="166" width="680" height="52" fill="#172033" rx="6"/>
                  <text x="190" y="188" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">PHOTODEGRADATION</text>
                  <text x="190" y="204" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Light-induced breakdown</text>
                  <text x="490" y="184" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">UV and visible light break chemical bonds. Affects nitroprusside, nifedipine, furosemide.</text>
                  <text x="490" y="200" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Prevention: amber glass, opaque packaging, store away from light.</text>
                  <rect x="40" y="224" width="680" height="40" fill="#14532d" rx="6"/>
                  <text x="190" y="244" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">RACEMIZATION</text>
                  <text x="490" y="240" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Chiral drug converts to mixture of enantiomers. May reduce or alter activity.</text>
                  <text x="490" y="254" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">Example: epinephrine (L-form active, D-form inactive).</text>
                  <text x="380" y="272" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | PLE Pharmaceutical Chemistry Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Drug degradation pathways and prevention strategies</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_2)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-purple-900/20 to-purple-900/10 border border-purple-500/30 rounded-2xl p-6 text-center">
              <p className="text-purple-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice PLE pharmaceutical chemistry questions with instant feedback. No registration required.
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
