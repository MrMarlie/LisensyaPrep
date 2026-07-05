import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';

export const metadata = buildMetadata({
  title: 'NCLEX Lab Values Cheat Sheet 2026 (Must-Memorize Normal Values)',
  description:
    'Complete NCLEX lab values cheat sheet with all the normal ranges you must memorize for the NCLEX-RN. Includes electrolytes, CBC, ABG, coagulation, and critical values with nursing implications.',
  path: '/nursing/nclex-lab-values-cheat-sheet',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'NCLEX Lab Values Cheat Sheet 2026 Must-Memorize Normal Values',
  description:
    'Complete NCLEX lab values cheat sheet with all normal ranges including electrolytes, CBC, ABG, coagulation studies, glucose, cardiac markers, and therapeutic drug levels.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-31',
  dateModified: '2026-05-31',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/nclex-lab-values-cheat-sheet' },
};

const ALL_NCLEX_ARTICLES = [
  { text: 'What is the NCLEX? Complete Guide for Filipino Nurses', href: '/nursing/what-is-the-nclex' },
  { text: 'NCLEX 2026 Coverage and Test Plan Changes', href: '/nursing/nclex-2026-coverage' },
  { text: 'How to Take NCLEX in the Philippines (Step-by-Step)', href: '/nursing/how-to-take-nclex-philippines' },
  { text: 'NCLEX-RN vs NCLEX-PN: Which Should Filipino Nurses Take?', href: '/nursing/nclex-rn-vs-pn-filipino-nurses' },
  { text: 'NCLEX vs PNLE: Complete Comparison for Filipino Nurses', href: '/nursing/nclex-vs-pnle-comparison' },
  { text: 'NCLEX Gateway States for Filipino Nurses', href: '/nursing/nclex-gateway-states-filipinos' },
  { text: 'How to Pass the NCLEX on Your First Take', href: '/nursing/how-to-pass-nclex-first-take' },
  { text: 'Management of Care Reviewer for NCLEX-RN', href: '/nursing/management-of-care-nclex-reviewer' },
  { text: 'Pharmacology Reviewer for NCLEX-RN', href: '/nursing/pharmacology-nclex-reviewer' },
  { text: 'Physiological Adaptation Reviewer for NCLEX-RN', href: '/nursing/physiological-adaptation-nclex-reviewer' },
  { text: 'Safety and Infection Control Reviewer for NCLEX-RN', href: '/nursing/safety-infection-prevention-nclex' },
  { text: 'Health Promotion and Maintenance Reviewer for NCLEX-RN', href: '/nursing/health-promotion-nclex-reviewer' },
  { text: 'Psychosocial Integrity Reviewer for NCLEX-RN', href: '/nursing/psychosocial-integrity-nclex-reviewer' },
  { text: 'NCLEX Lab Values Cheat Sheet', href: '/nursing/nclex-lab-values-cheat-sheet' },
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
    } else if (line.startsWith('#### ')) {
      elements.push(<h4 key={key++} className="text-base font-semibold text-white mt-4 mb-2">{line.slice(5)}</h4>);
    } else if (line.trim() === '---') {
      elements.push(<hr key={key++} className="border-white/10 my-6" />);
    } else if (line.startsWith('- ')) {
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />);
    } else if (line.match(/^\d+\. /)) {
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, '')) }} />);
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
  let listBuffer = [];
  let inTable = false;
  let inList = false;
  for (const el of elements) {
    if (el.type === 'tr') {
      if (inList) { wrapped.push(<ul key={`ul-${key++}`} className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>); listBuffer = []; inList = false; }
      inTable = true; tableBuffer.push(el);
    } else if (el.type === 'li') {
      if (inTable) { wrapped.push(<div key={`tbl-${key++}`} className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>); tableBuffer = []; inTable = false; }
      inList = true; listBuffer.push(el);
    } else {
      if (inTable) { wrapped.push(<div key={`tbl-${key++}`} className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>); tableBuffer = []; inTable = false; }
      if (inList) { wrapped.push(<ul key={`ul-${key++}`} className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>); listBuffer = []; inList = false; }
      wrapped.push(el);
    }
  }
  if (inTable && tableBuffer.length) wrapped.push(<div key="tbl-final" className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>);
  if (inList && listBuffer.length) wrapped.push(<ul key="ul-final" className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>);
  return wrapped;
}

const MAIN_CONTENT = `
Lab values appear throughout the NCLEX-RN, especially in the Reduction of Risk Potential and Physiological Adaptation categories. You **must memorize the normal ranges** because the NCLEX expects you to recognize abnormal values and respond appropriately.

This cheat sheet contains every lab value you need for the 2026 NCLEX-RN, organized by category with nursing implications.

---

## Electrolytes (Highest Priority - Memorize First)

| Lab | Normal Range | Critical Low | Critical High |
|-----|--------------|--------------|---------------|
| Sodium (Na) | 135-145 mEq/L | <120 | >160 |
| Potassium (K) | 3.5-5.0 mEq/L | <2.5 | >6.5 |
| Chloride (Cl) | 95-105 mEq/L | - | - |
| Calcium (Ca) | 8.5-10.5 mg/dL | <6 | >13 |
| Magnesium (Mg) | 1.8-2.6 mg/dL | <1 | >5 |
| Phosphorus (P) | 2.5-4.5 mg/dL | - | - |

### Key Nursing Implications

**Potassium** is the most critical electrolyte for the NCLEX:
- Hyperkalemia (>5.0): peaked T waves, widened QRS, risk of cardiac arrest
- Hypokalemia (<3.5): flat T waves, U waves, muscle weakness, dysrhythmias
- IV potassium must NEVER be given as IV push (causes fatal cardiac arrest)

**Sodium** affects neurological status:
- Hyponatremia: confusion, seizures, correct slowly
- Hypernatremia: thirst, dry membranes, seizures

**Calcium** affects neuromuscular excitability:
- Hypocalcemia: tetany, Chvostek's and Trousseau's signs
- Hypercalcemia: weakness, kidney stones, constipation

---

## Complete Blood Count (CBC)

| Lab | Normal Range |
|-----|--------------|
| WBC (White Blood Cells) | 4,500-11,000/mm³ |
| Hemoglobin (Hgb) | 14-18 g/dL (M), 12-16 g/dL (F) |
| Hematocrit (Hct) | 42-52% (M), 37-47% (F) |
| Platelets | 150,000-400,000/mm³ |

### Key Nursing Implications

**WBC:**
- Elevated (leukocytosis): infection, inflammation, leukemia
- Low (leukopenia): immunosuppression, risk of infection
- Neutropenia (ANC <500): severe infection risk, neutropenic precautions

**Hemoglobin/Hematocrit:**
- Low: anemia, bleeding (transfuse if <7 g/dL or symptomatic)
- Hct is roughly 3 times the Hgb

**Platelets:**
- <50,000: bleeding precautions
- <20,000: spontaneous bleeding risk
- HIT (heparin-induced thrombocytopenia): sudden drop while on heparin

---

## Arterial Blood Gases (ABG)

| Value | Normal Range |
|-------|--------------|
| pH | 7.35-7.45 |
| PaCO2 | 35-45 mmHg |
| HCO3 (Bicarbonate) | 22-26 mEq/L |
| PaO2 | 80-100 mmHg |
| O2 Saturation | 95-100% |

### ABG Interpretation (ROME Method)

**R**espiratory **O**pposite: pH and CO2 move in opposite directions
**M**etabolic **E**qual: pH and HCO3 move in same direction

| Condition | pH | CO2 | HCO3 |
|-----------|-----|-----|------|
| Respiratory Acidosis | ↓ | ↑ | normal/↑ |
| Respiratory Alkalosis | ↑ | ↓ | normal/↓ |
| Metabolic Acidosis | ↓ | normal/↓ | ↓ |
| Metabolic Alkalosis | ↑ | normal/↑ | ↑ |

**Steps to interpret:**
1. Look at pH (acidotic <7.35 or alkalotic >7.45)
2. Look at CO2 (respiratory indicator)
3. Look at HCO3 (metabolic indicator)
4. Match which one (CO2 or HCO3) explains the pH
5. Check for compensation

---

## Kidney Function

| Lab | Normal Range |
|-----|--------------|
| BUN (Blood Urea Nitrogen) | 7-20 mg/dL |
| Creatinine | 0.6-1.3 mg/dL |
| GFR | >90 mL/min |
| Specific Gravity (urine) | 1.005-1.030 |

### Key Nursing Implications

- Elevated BUN and creatinine: kidney impairment
- BUN can also rise with dehydration, GI bleeding
- Creatinine is more specific to kidney function
- Hold metformin and nephrotoxic drugs if creatinine elevated
- GFR <60 for 3+ months indicates chronic kidney disease

---

## Coagulation Studies

| Lab | Normal Range | Therapeutic Range |
|-----|--------------|-------------------|
| PT (Prothrombin Time) | 11-13.5 sec | - |
| INR | 0.8-1.1 | 2.0-3.0 (warfarin) |
| aPTT | 30-40 sec | 60-80 sec (heparin) |

### Key Nursing Implications

**Warfarin** monitored by INR:
- Therapeutic: 2.0-3.0 (most conditions)
- INR >4-5: high bleeding risk, hold warfarin, give vitamin K

**Heparin** monitored by aPTT:
- Therapeutic: 1.5-2.5 times control
- Too high: bleeding risk, antidote is protamine sulfate

---

## Glucose

| Lab | Normal Range |
|-----|--------------|
| Fasting Blood Glucose | 70-110 mg/dL |
| Random Glucose | <200 mg/dL |
| Hemoglobin A1C | <5.7% (normal), <7% (diabetic goal) |

### Key Nursing Implications

- Hypoglycemia (<70): give 15g fast carbs, recheck in 15 min
- Hyperglycemia (>250 with ketones): possible DKA
- A1C reflects 2-3 month average glucose
- Hold insulin if hypoglycemic

---

## Cardiac Markers

| Lab | Normal Range | Significance |
|-----|--------------|--------------|
| Troponin I | <0.04 ng/mL | Elevated = MI |
| BNP | <100 pg/mL | Elevated = heart failure |
| CK-MB | 0-3 ng/mL | Elevated = cardiac damage |

### Key Nursing Implications

- Troponin: most specific cardiac marker, rises 3-4 hours after MI, stays elevated 7-14 days
- BNP: indicates heart failure severity (>400 significant)

---

## Therapeutic Drug Levels

| Drug | Therapeutic Range | Toxic Level |
|------|-------------------|-------------|
| Digoxin | 0.5-2.0 ng/mL | >2.0 |
| Lithium | 0.6-1.2 mEq/L | >1.5 |
| Phenytoin (Dilantin) | 10-20 mcg/mL | >20 |
| Vancomycin (trough) | 10-20 mcg/mL | varies |

### Key Nursing Implications

**Digoxin toxicity:** nausea, vomiting, visual changes (yellow halos), dysrhythmias. Check potassium (hypokalemia increases toxicity).

**Lithium toxicity:** tremor, ataxia, confusion. Maintain consistent sodium/fluid intake.

---

## Most Tested Lab Values on the NCLEX

If you have limited time, prioritize memorizing these:

1. **Potassium** (3.5-5.0) - most tested
2. **Sodium** (135-145)
3. **ABG values** (pH 7.35-7.45, CO2 35-45, HCO3 22-26)
4. **Hemoglobin** (12-18)
5. **Platelets** (150,000-400,000)
6. **INR** (therapeutic 2-3)
7. **Glucose** (70-110 fasting)
8. **Creatinine** (0.6-1.3)
9. **Digoxin** (0.5-2.0)
10. **WBC** (4,500-11,000)

---

## Frequently Asked Questions

**Do I need to memorize all lab values?**
Focus on the high-yield ones (electrolytes, CBC, ABG, coagulation, glucose, common drug levels). The NCLEX rarely tests obscure values.

**Will the NCLEX give me normal ranges?**
No. You must know them. The NCLEX expects you to recognize abnormal values without reference.

**Which lab value is most important for the NCLEX?**
Potassium. It appears frequently and has life-threatening implications (cardiac arrest) at abnormal levels.

---

## Practice Lab Value Questions at LisensyaPrep

LisensyaPrep's NCLEX quiz includes lab value interpretation in Module 5 (Reduction of Risk Potential) and throughout other modules.

**[Start Free NCLEX Practice at LisensyaPrep](/nclex)**

---

## Related NCLEX Articles

- [Physiological Adaptation Reviewer for NCLEX-RN](/nursing/physiological-adaptation-nclex-reviewer)
- [Pharmacology Reviewer for NCLEX-RN](/nursing/pharmacology-nclex-reviewer)
- [How to Pass the NCLEX on Your First Take](/nursing/how-to-pass-nclex-first-take)
- [NCLEX 2026 Coverage and Test Plan Changes](/nursing/nclex-2026-coverage)
- [Management of Care Reviewer for NCLEX-RN](/nursing/management-of-care-nclex-reviewer)
`;

export default function NclexLabValuesCheatSheetPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-lab-values-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/nursing","name":"Nursing"},{"url":"/nursing/nclex-lab-values-cheat-sheet","name":"NCLEX Lab Values Cheat Sheet"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">NCLEX Lab Values Cheat Sheet</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Nursing (NCLEX)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                NCLEX Lab Values Cheat Sheet 2026 (Must-Memorize Normal Values)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 31, 2026</span><span>•</span>
                <span>10 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">NCLEX Articles for Filipino Nurses</h2>
              <ul className="space-y-3">
                {ALL_NCLEX_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Start Your NCLEX Practice</p>
              <p className="text-gray-400 text-sm mb-4">400 free NCLEX questions. No account required.</p>
              <Link href="/nclex" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">NCLEX Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_NCLEX_ARTICLES.map(({ text, href }) => (
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
      <ArticlePopupTriggers type="pnle" />
    </div>
  );
}
