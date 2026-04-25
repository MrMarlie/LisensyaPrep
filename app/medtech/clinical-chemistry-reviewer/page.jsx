import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Clinical Chemistry Reviewer for MTLE Philippines 2026 (Complete Guide)',
  description:
    'Studying for the medical technology board exam? This clinical chemistry reviewer covers glucose, lipids, liver function, kidney function, enzymes, and quality control tested in the MTLE.',
  path: '/medtech/clinical-chemistry-reviewer',
  image: '/images/articles/hero-mtle-clinical-chemistry.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Clinical Chemistry Reviewer for MTLE Philippines 2026',
  description:
    'Complete clinical chemistry reviewer for the PRC Medical Technologist Licensure Examination covering glucose metabolism, lipids, liver function tests, renal function tests, enzymes, and quality control.',
  image: 'https://lisensyaprep.com/images/articles/hero-mtle-clinical-chemistry.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-26',
  dateModified: '2026-04-26',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/medtech/clinical-chemistry-reviewer' },
};

const RELATED_ARTICLES = [
  { text: 'Hematology Reviewer for MTLE Philippines 2026', href: '/medtech/hematology-reviewer' },
  { text: 'Microbiology and Parasitology Reviewer MTLE 2026', href: '/medtech/microbiology-parasitology-reviewer' },
  { text: 'PRC Board Exam Passing Rate by Profession 2026', href: '/blog/prc-board-exam-passing-rate-by-profession' },
  { text: 'PRC Board Exam Schedule 2026 for All Professions', href: '/blog/prc-board-exam-schedule-2026' },
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
*By LisensyaPrep Team | Last Updated: April 2026 | 11-minute read*

---

Clinical Chemistry is one of the largest and most technically demanding subjects in the Medical Technologist Licensure Examination. It covers the biochemical analysis of blood and other body fluids to diagnose and monitor disease states.

What makes clinical chemistry manageable for the MTLE is that the same core principles apply across most analytes: you need to know the normal reference range, what causes values to increase, what causes values to decrease, and the clinical significance of abnormal results. Build that framework for each analyte and you have covered the majority of what the exam tests.

---

## Carbohydrates: Glucose Metabolism and Diabetes

### Glucose Reference Values

| Test | Normal Value | Clinical Use |
|------|-------------|--------------|
| Fasting Blood Glucose | 70 to 100 mg/dL | Diabetes screening |
| 2-hour postprandial glucose | Less than 140 mg/dL | Diabetes monitoring |
| Random blood glucose | Less than 200 mg/dL | Symptomatic diabetes diagnosis |
| HbA1c | Less than 5.7% | Long-term glucose control (past 2 to 3 months) |

### Diagnosis of Diabetes Mellitus

Any one of the following criteria confirms diabetes:
- Fasting plasma glucose of 126 mg/dL or higher on two separate occasions
- Random plasma glucose of 200 mg/dL or higher with symptoms
- 2-hour plasma glucose of 200 mg/dL or higher during a 75g oral glucose tolerance test
- HbA1c of 6.5% or higher

**Pre-diabetes values:** Fasting glucose 100 to 125 mg/dL (impaired fasting glucose) or HbA1c 5.7 to 6.4%.

### Glucose Tolerance Test (GTT)

The GTT is most commonly used to diagnose gestational diabetes. The patient fasts for 8 to 12 hours, a fasting blood glucose is drawn, then 75g of glucose solution is consumed, and blood glucose is measured at 1 and 2 hours.

**MTLE important point:** GTT specimens must be processed immediately. Glucose is metabolized by red blood cells at approximately 10 mg/dL per hour at room temperature. Use sodium fluoride tubes (gray top) to inhibit glycolysis and preserve glucose levels.

---

## Lipids and Lipoproteins
`;

const SECTION_2 = `
---

## Liver Function Tests

The liver produces proteins, metabolizes drugs, and processes bilirubin. Liver function tests (LFTs) assess different aspects of liver health.

### Bilirubin

**Total bilirubin normal:** 0.2 to 1.2 mg/dL

**Direct (conjugated) bilirubin:** Bilirubin that has been processed by the liver. Elevated in obstructive jaundice and hepatocellular disease.

**Indirect (unconjugated) bilirubin:** Bilirubin not yet processed. Elevated in hemolytic disease, neonatal jaundice, and Gilbert syndrome.

**Types of jaundice by bilirubin pattern:**

Pre-hepatic (hemolytic) jaundice: Elevated indirect bilirubin. Urine is dark (urobilinogen elevated), stool is normal color.

Hepatic (hepatocellular) jaundice: Both direct and indirect bilirubin elevated. Seen in hepatitis and cirrhosis.

Post-hepatic (obstructive) jaundice: Elevated direct bilirubin. Pale stools (no bilirubin reaching gut), dark urine (bilirubin excreted by kidneys).

### Liver Enzymes

**ALT (Alanine Aminotransferase):** More specific to the liver than AST. Markedly elevated in viral hepatitis. Normal: 7 to 56 U/L.

**AST (Aspartate Aminotransferase):** Found in liver, heart, skeletal muscle, and red blood cells. Less liver-specific. Normal: 10 to 40 U/L.

**AST:ALT ratio:** Ratio greater than 2:1 suggests alcoholic liver disease. In viral hepatitis, ALT is typically higher than AST.

**ALP (Alkaline Phosphatase):** Elevated in obstructive liver disease and bone disorders. Normal: 44 to 147 U/L.

**GGT (Gamma-Glutamyl Transferase):** Sensitive marker for alcohol use. Also elevated in obstructive liver disease and with enzyme-inducing drugs.

### Protein Tests

**Total protein normal:** 6.0 to 8.0 g/dL. Includes albumin and globulin.

**Albumin normal:** 3.5 to 5.0 g/dL. Produced exclusively by the liver. Long half-life (20 days), so low albumin reflects chronic liver dysfunction. Used to calculate osmotic pressure.

**Prothrombin Time (PT):** Clotting factors II, V, VII, X are made by the liver. Prolonged PT in liver disease indicates impaired synthetic function.

---

## Renal Function Tests

### Creatinine and Blood Urea Nitrogen

**Creatinine:** Waste product of muscle metabolism, freely filtered by the kidneys. More specific for kidney function than BUN because it is not affected by diet.

Normal: 0.6 to 1.2 mg/dL (higher in males due to greater muscle mass)

Elevated in: Acute kidney injury, chronic kidney disease, rhabdomyolysis

**Blood Urea Nitrogen (BUN):** Urea is the end product of protein metabolism. Affected by protein intake, hydration status, and catabolic states, making it less specific for kidney function than creatinine.

Normal: 7 to 20 mg/dL

**BUN:Creatinine Ratio:** Normal is 10:1 to 20:1.
- Greater than 20:1 suggests pre-renal causes (dehydration, GI bleeding, high protein diet)
- Less than 10:1 suggests intrinsic renal disease or low protein intake

### Glomerular Filtration Rate (GFR)

GFR estimates how well the kidneys filter waste per minute. It is calculated using creatinine, age, sex, and race.

Normal GFR is greater than 90 mL/min/1.73m².

Chronic kidney disease is classified by GFR stage from G1 (normal or mildly reduced) to G5 (kidney failure, GFR less than 15).

---

## Quality Control in the Clinical Chemistry Laboratory

Quality control is a consistent source of MTLE questions because it tests your understanding of laboratory operations, not just clinical knowledge.

**Accuracy** refers to how close a measured value is to the true value. Measured by comparing results to certified reference materials.

**Precision** refers to the reproducibility of results. A method is precise if repeated measurements give the same result even if that result is not accurate.

**Levey-Jennings Chart** is used to plot quality control results over time. Control values should fall within 2 standard deviations of the mean 95.5% of the time.

**Westgard Rules** are a set of decision rules used to interpret QC data and determine whether an analytical run should be accepted or rejected.

The most important Westgard rules for the MTLE:

**1-2s rule:** Warning rule. One control value exceeds 2 standard deviations. Does not require rejection alone.

**1-3s rule:** Rejection rule. One control value exceeds 3 standard deviations. Reject the run.

**2-2s rule:** Rejection rule. Two consecutive control values exceed 2 standard deviations on the same side of the mean.

**R-4s rule:** Rejection rule. The range between two control values within a run exceeds 4 standard deviations.

---

Clinical chemistry questions in the MTLE combine knowledge of reference values, clinical interpretation, and laboratory technique. Practice questions that require you to interpret abnormal results and identify the appropriate next action.

Head to LisensyaPrep and practice now. No registration required.

**[Practice Clinical Chemistry Questions at LisensyaPrep](/medical-technology)**
`;

export default function ClinicalChemistryReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-mtle-chem" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/medical-technology" className="text-gray-500 hover:text-gray-300 transition-colors">Medical Technology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Clinical Chemistry Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400">
                Medical Technology (MTLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Clinical Chemistry Reviewer for MTLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 26, 2026</span>
                <span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-mtle-clinical-chemistry.jpg"
                alt="Young Filipino male medical technologist in white coat with safety glasses examining test tube for MTLE clinical chemistry reviewer Philippines 2026"
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
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Lipid Panel Reference Values and Clinical Significance</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="170" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">ANALYTE</text>
                  <text x="360" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">DESIRABLE VALUE</text>
                  <text x="580" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">CLINICAL NOTE</text>
                  <line x1="40" y1="64" x2="720" y2="64" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="70" width="680" height="32" fill="#1e3a5f" rx="4"/>
                  <text x="170" y="91" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Total Cholesterol</text>
                  <text x="360" y="91" textAnchor="middle" fill="#86efac" fontSize="12" fontFamily="Arial,sans-serif">Less than 200 mg/dL</text>
                  <text x="580" y="91" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Requires 9 to 12 hour fasting for accurate result</text>
                  <rect x="40" y="108" width="680" height="32" fill="#172033" rx="4"/>
                  <text x="170" y="129" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">LDL Cholesterol</text>
                  <text x="360" y="129" textAnchor="middle" fill="#86efac" fontSize="12" fontFamily="Arial,sans-serif">Less than 100 mg/dL (optimal)</text>
                  <text x="580" y="129" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Bad cholesterol. Main target for statin therapy</text>
                  <rect x="40" y="146" width="680" height="32" fill="#1e3a5f" rx="4"/>
                  <text x="170" y="167" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">HDL Cholesterol</text>
                  <text x="360" y="167" textAnchor="middle" fill="#86efac" fontSize="12" fontFamily="Arial,sans-serif">Greater than 40 mg/dL (men), 50 (women)</text>
                  <text x="580" y="167" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Good cholesterol. Higher is protective</text>
                  <rect x="40" y="184" width="680" height="32" fill="#172033" rx="4"/>
                  <text x="170" y="205" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Triglycerides</text>
                  <text x="360" y="205" textAnchor="middle" fill="#86efac" fontSize="12" fontFamily="Arial,sans-serif">Less than 150 mg/dL</text>
                  <text x="580" y="205" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Elevated by alcohol, diabetes, high carb diet</text>
                  <rect x="40" y="222" width="680" height="26" fill="#1e3a5f" rx="4"/>
                  <text x="380" y="240" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Friedewald Equation: LDL = Total Cholesterol minus HDL minus (Triglycerides divided by 5)</text>
                  <text x="380" y="253" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">LisensyaPrep.com | Note: Invalid when TG is above 400 mg/dL</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Lipid panel reference values for the MTLE</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_2)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-sky-900/20 to-sky-900/10 border border-sky-500/30 rounded-2xl p-6 text-center">
              <p className="text-sky-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice MTLE clinical chemistry questions with instant feedback. No registration required.
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
