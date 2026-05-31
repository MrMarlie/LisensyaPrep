import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Physiological Adaptation Reviewer for NCLEX-RN 2026 (Complete Guide)',
  description:
    'Complete NCLEX-RN Physiological Adaptation reviewer covering medical emergencies, fluid and electrolyte imbalances, and body system alterations. For Filipino nurses preparing for the 2026 NCLEX.',
  path: '/nursing/physiological-adaptation-nclex-reviewer',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Physiological Adaptation Reviewer for NCLEX-RN 2026 Complete Guide',
  description:
    'Comprehensive Physiological Adaptation reviewer for the NCLEX-RN covering medical emergencies, fluid and electrolyte imbalances, acid-base balance, and body system alterations.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-31',
  dateModified: '2026-05-31',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/physiological-adaptation-nclex-reviewer' },
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
**Physiological Adaptation is one of the largest NCLEX-RN categories at 11-17% of the exam.** It covers the body's response to acute, chronic, and life-threatening conditions across all body systems. This is where your medical-surgical nursing knowledge is tested most directly.

This reviewer covers the high-yield conditions, emergencies, and body system alterations most frequently tested on the 2026 NCLEX-RN.

---

## What Physiological Adaptation Covers

This category tests your ability to:
- Manage medical emergencies
- Recognize and respond to complications
- Understand pathophysiology
- Provide care for acute and chronic illnesses
- Manage fluid and electrolyte imbalances
- Interpret hemodynamic changes

---

## Fluid and Electrolyte Imbalances (High-Yield)

Electrolyte questions appear frequently. Memorize normal values and the signs of imbalances.

### Sodium (Normal: 135-145 mEq/L)

**Hyponatremia (<135):**
- Causes: SIADH, excessive water intake, diuretics, vomiting/diarrhea
- Signs: confusion, headache, seizures, nausea, muscle cramps
- Treatment: fluid restriction (SIADH), careful sodium replacement (correct slowly to avoid central pontine myelinolysis)

**Hypernatremia (>145):**
- Causes: dehydration, diabetes insipidus, excessive sodium intake
- Signs: thirst, dry mucous membranes, restlessness, seizures
- Treatment: fluid replacement, address underlying cause

### Potassium (Normal: 3.5-5.0 mEq/L)

**Hypokalemia (<3.5):**
- Causes: diuretics, vomiting, diarrhea, NG suction
- Signs: muscle weakness, flat T waves, U waves, dysrhythmias, decreased reflexes
- Treatment: oral or IV potassium (NEVER IV push)

**Hyperkalemia (>5.0):**
- Causes: renal failure, ACE inhibitors, potassium-sparing diuretics, tissue damage
- Signs: peaked T waves, widened QRS, muscle weakness, cardiac arrest
- Treatment: calcium gluconate (cardiac protection), insulin/glucose, kayexalate, dialysis

**NCLEX trick:** Hyperkalemia peaked T waves and hypokalemia U waves are classic ECG findings.

### Calcium (Normal: 8.5-10.5 mg/dL)

**Hypocalcemia (<8.5):**
- Signs: tetany, Chvostek's sign, Trousseau's sign, seizures, tingling
- Treatment: calcium replacement

**Hypercalcemia (>10.5):**
- Causes: hyperparathyroidism, malignancy
- Signs: weakness, kidney stones, constipation, confusion
- Treatment: hydration, bisphosphonates

### Magnesium (Normal: 1.8-2.6 mg/dL)

**Hypomagnesemia:** tremors, tetany, dysrhythmias (torsades de pointes)
**Hypermagnesemia:** decreased reflexes, respiratory depression, bradycardia

---

## Acid-Base Balance (Frequently Tested)

Master ABG interpretation. Memorize normal values:
- pH: 7.35-7.45
- PaCO2: 35-45 mmHg
- HCO3: 22-26 mEq/L

### The Four Imbalances

**Respiratory Acidosis** (pH low, CO2 high)
- Causes: hypoventilation, COPD, respiratory depression
- Signs: confusion, dyspnea, headache

**Respiratory Alkalosis** (pH high, CO2 low)
- Causes: hyperventilation, anxiety, pain, fever
- Signs: lightheadedness, tingling, tetany

**Metabolic Acidosis** (pH low, HCO3 low)
- Causes: DKA, renal failure, diarrhea, lactic acidosis
- Signs: Kussmaul respirations, confusion

**Metabolic Alkalosis** (pH high, HCO3 high)
- Causes: vomiting, NG suction, excessive antacids
- Signs: muscle cramps, dizziness

**ROME method:** Respiratory Opposite (pH and CO2 move opposite directions), Metabolic Equal (pH and HCO3 move same direction).

---

## Cardiovascular Emergencies

### Myocardial Infarction (MI)

**Signs:** crushing chest pain (may radiate to arm/jaw), diaphoresis, dyspnea, nausea. Women and diabetics may have atypical symptoms.

**Diagnosis:** ECG (ST elevation in STEMI), troponin elevation.

**Treatment (MONA-B):** Morphine, Oxygen (if hypoxic), Nitroglycerin, Aspirin (chewed), Beta-blocker. Reperfusion (PCI within 90 minutes) is critical.

### Heart Failure

**Left-sided HF:** pulmonary symptoms (dyspnea, crackles, pink frothy sputum, orthopnea)
**Right-sided HF:** systemic symptoms (peripheral edema, JVD, hepatomegaly, weight gain)

**Treatment:** diuretics, ACE inhibitors, beta-blockers, daily weights, sodium/fluid restriction, high Fowler's position.

### Acute Pulmonary Edema

**Signs:** severe dyspnea, pink frothy sputum, crackles, anxiety.
**Treatment:** high Fowler's, oxygen, IV furosemide, morphine, possibly positive pressure ventilation.

---

## Respiratory Conditions

### COPD

**Pathophysiology:** chronic airflow limitation, CO2 retention, hypoxic drive.

**Care:** low-flow oxygen (1-3 L/min, target SpO2 88-92%), bronchodilators, pursed-lip breathing, tripod positioning.

**Critical:** High-flow oxygen can suppress respiratory drive in COPD patients.

### Pneumonia

**Signs:** fever, productive cough, crackles, dyspnea, elevated WBC.
**Care:** antibiotics, oxygen, hydration, deep breathing, incentive spirometry.

### Pulmonary Embolism

**Signs:** sudden dyspnea, chest pain, tachycardia, hypoxia, anxiety.
**Treatment:** anticoagulation (heparin), oxygen, supportive care. Massive PE may need thrombolytics.

---

## Endocrine Emergencies

### Diabetic Ketoacidosis (DKA)

**Type 1 diabetes.** Signs: hyperglycemia (>250), ketones, metabolic acidosis, Kussmaul respirations, fruity breath, dehydration.

**Treatment:** IV regular insulin, IV fluids, electrolyte correction (especially potassium), identify trigger.

### Hyperosmolar Hyperglycemic State (HHS)

**Type 2 diabetes.** Severe hyperglycemia (>600) without significant ketosis. Profound dehydration. Treatment: aggressive IV fluids, insulin.

### Thyroid Storm

**Severe hyperthyroidism.** Signs: high fever, tachycardia, hypertension, agitation. Treatment: beta-blockers, antithyroid drugs, supportive care.

### Myxedema Coma

**Severe hypothyroidism.** Signs: hypothermia, bradycardia, altered mental status. Treatment: IV levothyroxine, warming, supportive care.

### Addisonian Crisis

**Adrenal insufficiency.** Signs: hypotension, hyponatremia, hyperkalemia, hypoglycemia. Treatment: IV hydrocortisone, fluids, electrolyte correction.

---

## Neurological Conditions

### Stroke (CVA)

**Ischemic:** clot blocks blood flow. tPA within 4.5 hours (after ruling out hemorrhage with CT).
**Hemorrhagic:** bleeding. tPA contraindicated.

**Assessment:** BE FAST (Balance, Eyes, Face, Arms, Speech, Time).

**Care:** monitor neuro status, manage BP, prevent complications, swallow evaluation before oral intake.

### Increased Intracranial Pressure (ICP)

**Signs:** Cushing's triad (hypertension with widening pulse pressure, bradycardia, irregular respirations), headache, vomiting, altered consciousness, pupil changes.

**Care:** elevate HOB 30 degrees, maintain neutral head position, avoid activities that increase ICP, possibly mannitol.

### Seizures

**Care:** protect from injury, turn to side, do NOT restrain or insert objects in mouth, time the seizure, document.

---

## Renal Conditions

### Acute Kidney Injury (AKI)

**Types:** prerenal (decreased perfusion), intrarenal (kidney damage), postrenal (obstruction).

**Care:** monitor I&O, electrolytes (especially potassium), avoid nephrotoxic drugs (NSAIDs, contrast), possible dialysis.

### Chronic Kidney Disease (CKD)

**Complications:** anemia (decreased erythropoietin), bone disease, fluid overload, hyperkalemia, metabolic acidosis.

**Care:** renal diet (restrict potassium, phosphorus, sodium, protein), phosphate binders, erythropoietin, possible dialysis.

---

## Shock (Critical Emergency)

**Types:**
- **Hypovolemic:** fluid/blood loss
- **Cardiogenic:** heart pump failure
- **Distributive:** septic, anaphylactic, neurogenic
- **Obstructive:** PE, cardiac tamponade

**Universal signs:** hypotension, tachycardia, weak pulse, cool clammy skin, oliguria, altered mental status, elevated lactate.

**General treatment:** identify and treat cause, IV fluids, vasopressors, oxygen, monitor hemodynamics.

### Sepsis

**Recognize early:** fever, tachycardia, tachypnea, elevated WBC, elevated lactate.

**Sepsis bundle:** blood cultures, lactate, broad-spectrum antibiotics within 1 hour, 30 mL/kg fluid for hypotension/lactate >4, vasopressors if needed.

---

## Practice Physiological Adaptation at LisensyaPrep

LisensyaPrep's NCLEX Quiz Module 4 contains **50 practice questions on Physiological Adaptation** covering medical emergencies, electrolytes, and body system alterations.

**[Start Module 4: Physiological Adaptation Practice](/nclex)**

---

## Related NCLEX Articles

- [Pharmacology Reviewer for NCLEX-RN](/nursing/pharmacology-nclex-reviewer)
- [Management of Care Reviewer for NCLEX-RN](/nursing/management-of-care-nclex-reviewer)
- [How to Pass the NCLEX on Your First Take](/nursing/how-to-pass-nclex-first-take)
- [NCLEX 2026 Coverage and Test Plan Changes](/nursing/nclex-2026-coverage)
- [NCLEX Lab Values Cheat Sheet](/nursing/nclex-lab-values-cheat-sheet)
`;

export default function PhysiologicalAdaptationNclexPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-physio-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Physiological Adaptation Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Nursing (NCLEX)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Physiological Adaptation Reviewer for NCLEX-RN 2026 (Complete Guide)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 31, 2026</span><span>•</span>
                <span>13 min read</span>
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
    </div>
  );
}
