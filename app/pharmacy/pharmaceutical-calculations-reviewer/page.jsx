import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'Pharmaceutical Calculations Practice Problems for PLE Philippines 2026',
  description:
    'Studying for the pharmacy board exam? This pharmaceutical calculations reviewer covers dosage calculations, concentration problems, IV flow rates, and dilution equations tested in the PLE.',
  path: '/pharmacy/pharmaceutical-calculations-reviewer',
  image: '/images/articles/hero-pharmacy-calculations.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pharmaceutical Calculations Practice Problems for PLE Philippines 2026',
  description:
    'Complete pharmaceutical calculations reviewer for the PRC Pharmacy Licensure Examination covering dosage calculations, dilutions, IV flow rates, percentage strength, isotonicity, and powder volume.',
  image: 'https://lisensyaprep.com/images/articles/hero-pharmacy-calculations.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-02',
  dateModified: '2026-05-02',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/pharmacy/pharmaceutical-calculations-reviewer' },
};

const RELATED_ARTICLES = [
  { text: 'PLE Coverage 2026 Complete Subject Breakdown', href: '/pharmacy/ple-coverage-2026' },
  { text: 'Pharmaceutical Chemistry Reviewer PLE 2026', href: '/pharmacy/pharmaceutical-chemistry-reviewer' },
  { text: 'Clinical Pharmacy Reviewer PLE Philippines 2026', href: '/pharmacy/clinical-pharmacy-reviewer' },
  { text: 'How to Pass the Pharmacy Board Exam Philippines', href: '/pharmacy/how-to-pass-pharmacy-board-exam' },
  { text: 'Pharmacology Reviewer PLE Philippines 2026', href: '/pharmacy/pharmacology-reviewer' },
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

Pharmaceutical calculations are among the most predictable questions in the PLE. Unlike conceptual questions where multiple interpretations are possible, calculation questions have one correct numerical answer. This makes them free points for examinees who practice them consistently.

The key is not memorizing formulas in isolation but understanding what each formula is solving for. This reviewer walks through the major calculation types with worked examples.

---

## Concentration Expressions

Understanding concentration expressions is the foundation of all pharmaceutical calculations.
`;

const SECTION_2 = `
---

## Dosage Calculations

### Dose Based on Body Weight

**Formula:** Dose = Patient weight (kg) × Dose per kg

**Example:** A patient weighs 60 kg. The prescribed dose of amoxicillin is 25 mg/kg/day in 3 divided doses. What is the single dose?

Total daily dose = 60 kg × 25 mg/kg = 1,500 mg/day
Single dose = 1,500 mg ÷ 3 = **500 mg per dose**

### Dose Based on Body Surface Area (BSA)

BSA is used for chemotherapy and pediatric dosing where weight-based calculations are insufficient.

**Mosteller formula:** BSA (m²) = √(Height cm × Weight kg ÷ 3,600)

**Example:** Patient height 170 cm, weight 65 kg.
BSA = √(170 × 65 ÷ 3,600) = √(3.069) = **1.75 m²**

**Dose = BSA × Dose per m²**

### Pediatric Dosing: Clark's Rule

Clark's Rule uses body weight to estimate pediatric dose from adult dose.

**Formula:** Child dose = (Child's weight in kg ÷ 70) × Adult dose

**Example:** Adult dose of paracetamol is 500 mg. Child weighs 20 kg.
Child dose = (20 ÷ 70) × 500 mg = 0.286 × 500 = **143 mg**

### Young's Rule (Age-Based)

**Formula:** Child dose = [Age in years ÷ (Age + 12)] × Adult dose

**Example:** Child is 6 years old. Adult dose is 500 mg.
Child dose = [6 ÷ (6 + 12)] × 500 = (6 ÷ 18) × 500 = 0.333 × 500 = **167 mg**

---

## Dilution Calculations

### Simple Dilution: C1V1 = C2V2

This is the most used calculation in pharmacy. When you dilute a solution, the amount of solute stays the same but the volume increases.

**Formula:** C1 × V1 = C2 × V2

Where C1 = initial concentration, V1 = initial volume, C2 = final concentration, V2 = final volume.

**Example:** How many mL of a 10% solution is needed to prepare 500 mL of a 2% solution?

C1 × V1 = C2 × V2
10% × V1 = 2% × 500 mL
V1 = (2 × 500) ÷ 10 = **100 mL**

Add 100 mL of the 10% solution to enough diluent to make 500 mL total.

### Alligation Method

Used when mixing two concentrations to get a desired intermediate concentration.

**Example:** How many mL of 70% alcohol and 30% alcohol are needed to make 1,000 mL of 50% alcohol?

Step 1: Set up the alligation grid.
- Higher concentration (70%) minus desired (50%) = 20 parts of 30%
- Desired (50%) minus lower concentration (30%) = 20 parts of 70%
- Total parts = 20 + 20 = 40 parts

Step 2: Calculate volumes.
- Volume of 70% = (20 ÷ 40) × 1,000 mL = **500 mL**
- Volume of 30% = (20 ÷ 40) × 1,000 mL = **500 mL**

---

## IV Flow Rate Calculations

### Drops per Minute (gtt/min)

**Formula:** Flow rate (gtt/min) = [Volume (mL) × Drop factor (gtt/mL)] ÷ Time (minutes)

**Standard drop factors:**
- Macrodrip: 10, 15, or 20 gtt/mL
- Microdrip: 60 gtt/mL

**Example:** Infuse 1,000 mL D5W over 8 hours using a macrodrip set with 20 gtt/mL.

Time in minutes = 8 × 60 = 480 minutes
Flow rate = (1,000 × 20) ÷ 480 = 20,000 ÷ 480 = **41.7 gtt/min ≈ 42 gtt/min**

### mL per Hour

**Formula:** Flow rate (mL/hr) = Volume (mL) ÷ Time (hours)

**Example:** Infuse 500 mL over 4 hours.
Flow rate = 500 ÷ 4 = **125 mL/hr**

---

## Percentage Strength Calculations

### Calculating Amount of Drug in a Preparation

**Formula:** Amount of drug = % strength × Volume (or weight) of preparation

**Example:** How many grams of sodium chloride are in 500 mL of 0.9% NaCl solution?

Amount = 0.9% × 500 mL = 0.009 × 500 = **4.5 g**

### Calculating Percentage Strength

**Formula:** % strength = (Amount of drug ÷ Total volume or weight) × 100

**Example:** 2 g of drug dissolved in 50 mL of solution. What is the % w/v?

% w/v = (2 g ÷ 50 mL) × 100 = **4% w/v**

---

## Isotonicity Calculations

### Sodium Chloride Equivalent Method

Isotonic solutions have the same osmotic pressure as blood (approximately 0.9% NaCl). Formulations for ophthalmic, nasal, and parenteral use should ideally be isotonic.

**Sodium chloride equivalent (E value):** The weight of NaCl that is osmotically equivalent to 1 g of the drug.

**Formula:** w = 0.009 × V − (drug amount × E value)

Where w = weight of NaCl to add, V = volume of solution in mL.

**Example:** How much NaCl is needed to make 100 mL of a 1% pilocarpine HCl solution isotonic? (E value of pilocarpine HCl = 0.24)

NaCl needed to make 100 mL isotonic = 0.009 × 100 = 0.9 g
NaCl equivalent of drug = 1 g × 0.24 = 0.24 g
Additional NaCl needed = 0.9 − 0.24 = **0.66 g**

---

## Powder Volume Calculations

When a dry powder is reconstituted, the powder itself occupies volume. This powder volume must be accounted for in calculations.

**Formula:** Powder volume = Final volume − Volume of diluent added

**Example:** A vial of amoxicillin powder is reconstituted by adding 9 mL of water to get 10 mL of final solution. What is the powder volume?

Powder volume = 10 mL − 9 mL = **1 mL**

**Using powder volume to find concentration:** If the vial contains 500 mg of amoxicillin and the final volume is 10 mL:
Concentration = 500 mg ÷ 10 mL = **50 mg/mL**

---

## Practice What You Just Learned

Pharmaceutical calculation questions in the PLE are pure points if you practice them. Head to LisensyaPrep and practice the calculation-based questions now. No account needed.

**[Practice Pharmaceutical Calculations at LisensyaPrep](https://lisensyaprep.com/pharmacy)**
`;

export default function PharmaceuticalCalculationsReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-pharma-calc" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/pharmacy","name":"Pharmacy"},{"url":"/pharmacy/pharmaceutical-calculations-reviewer","name":"Pharmaceutical Calculations Reviewer"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/pharmacy" className="text-gray-500 hover:text-gray-300 transition-colors">Pharmacy</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Pharmaceutical Calculations Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">
                Pharmacy (PLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Pharmaceutical Calculations Practice Problems for PLE Philippines 2026
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
                src="/images/articles/hero-pharmacy-calculations.jpg"
                alt="Young Filipino female pharmacist in white coat writing calculations with calculator for PLE pharmaceutical calculations reviewer Philippines 2026"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="260" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Pharmaceutical Concentration Expressions</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="160" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">EXPRESSION</text>
                  <text x="360" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">DEFINITION</text>
                  <text x="580" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">EXAMPLE</text>
                  <line x1="40" y1="64" x2="720" y2="64" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="70" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="160" y="90" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">% w/v</text>
                  <text x="360" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Grams of solute per 100 mL of solution</text>
                  <text x="580" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">5% w/v = 5 g per 100 mL</text>
                  <rect x="40" y="106" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="160" y="126" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">% w/w</text>
                  <text x="360" y="126" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Grams of solute per 100 g of preparation</text>
                  <text x="580" y="126" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">2% w/w ointment = 2 g drug per 100 g</text>
                  <rect x="40" y="142" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="160" y="162" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">% v/v</text>
                  <text x="360" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">mL of solute per 100 mL of solution</text>
                  <text x="580" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">70% v/v alcohol = 70 mL per 100 mL</text>
                  <rect x="40" y="178" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="160" y="198" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">mg/mL (mg%)</text>
                  <text x="360" y="198" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Milligrams of solute per milliliter</text>
                  <text x="580" y="198" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Glucose 50 mg/mL IV solution</text>
                  <rect x="40" y="214" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="160" y="234" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Parts per million (ppm)</text>
                  <text x="360" y="234" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">mg of solute per kg (or L) of solution</text>
                  <text x="580" y="234" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Fluoride 1 ppm in drinking water</text>
                  <text x="380" y="253" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | PLE Pharmaceutical Calculations 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Pharmaceutical concentration expressions reference</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_2)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-purple-900/20 to-purple-900/10 border border-purple-500/30 rounded-2xl p-6 text-center">
              <p className="text-purple-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice PLE pharmaceutical calculations with instant feedback. No registration required.
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
