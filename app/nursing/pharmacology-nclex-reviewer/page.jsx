import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Pharmacology Reviewer for NCLEX-RN 2026 (Complete Guide for Filipino Nurses)',
  description:
    'Complete NCLEX-RN Pharmacology reviewer covering drug classifications, prototype drugs, side effects, dosage calculations, and high-alert medications. Designed for Filipino nurses preparing for 2026 NCLEX.',
  path: '/nursing/pharmacology-nclex-reviewer',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pharmacology Reviewer for NCLEX-RN 2026 Complete Guide',
  description:
    'Comprehensive Pharmacology reviewer for the NCLEX-RN covering drug classifications, prototype drugs, side effects, dosage calculations, and high-alert medications for Filipino nurses.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-31',
  dateModified: '2026-05-31',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/pharmacology-nclex-reviewer' },
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
**Pharmacological and Parenteral Therapies is the second-largest category on the NCLEX-RN**, comprising **13-19% of the entire exam**. For Filipino nurses, this is often the most feared category because US drug names, classifications, and clinical applications differ from Philippine practice.

This reviewer covers every Pharmacology topic tested on the 2026 NCLEX-RN, focusing on the prototype drugs and concepts that appear most frequently.

---

## Why Pharmacology Is Hard for Filipino Nurses

Three specific challenges make NCLEX Pharmacology difficult:

**1. Generic versus brand names.** The NCLEX uses **generic names** (acetaminophen, not Tylenol). Filipino nurses often learned drugs by brand names common in the Philippines (e.g., Biogesic for paracetamol, which is acetaminophen).

**2. US-specific medications.** Some medications widely used in the US are uncommon in the Philippines, while some Philippine medications are unfamiliar in the US.

**3. Calculation under pressure.** The NCLEX has an on-screen calculator, but timing is tight. Practice without a calculator first, then with one for the exam.

This guide addresses all three challenges.

---

## How to Approach NCLEX Pharmacology

You cannot memorize every drug. Instead, master the **prototype drug for each class** and understand class-wide principles.

**Strategy:**

1. Learn the drug **class** (what it does mechanistically)
2. Learn the **prototype** (most representative drug in the class)
3. Learn the **side effects** (usually class-wide)
4. Learn the **contraindications**
5. Learn the **monitoring parameters**
6. Learn the **patient education** points

Once you understand one drug in a class, you can answer questions about any drug in that class.

---

## High-Yield Drug Classifications

These are the drug classes most heavily tested on the NCLEX-RN. Master these first.

### Cardiovascular Medications

#### Beta-Blockers (-olol suffix)

**Prototype:** Metoprolol (Lopressor)
**Other examples:** Atenolol, Propranolol, Carvedilol

**Mechanism:** Block beta receptors, reducing heart rate, blood pressure, and contractility.

**Indications:** Hypertension, MI, heart failure, dysrhythmias, anxiety (off-label).

**Side effects to know:**
- Bradycardia (hold if HR <60)
- Hypotension
- Bronchospasm (caution in asthma)
- Hypoglycemia masking (in diabetics)
- Fatigue, depression

**Patient teaching:**
- Do not stop abruptly (rebound hypertension/tachycardia)
- Check HR before each dose
- Report HR <60 to provider
- Rise slowly to prevent orthostatic hypotension

**NCLEX trick:** Hold metoprolol if HR is below 60 or systolic BP below 90. This is heavily tested.

#### ACE Inhibitors (-pril suffix)

**Prototype:** Lisinopril (Zestril, Prinivil)
**Other examples:** Enalapril, Captopril, Ramipril

**Mechanism:** Inhibit angiotensin-converting enzyme, causing vasodilation and reducing aldosterone.

**Indications:** Hypertension, heart failure, diabetic nephropathy, post-MI.

**Side effects:**
- Dry persistent cough (15-20% of patients)
- Hyperkalemia (monitor potassium)
- Angioedema (life-threatening - swelling of face/lips/tongue)
- First-dose hypotension
- Renal impairment (monitor creatinine)

**Contraindications:**
- Pregnancy (teratogenic)
- Bilateral renal artery stenosis
- History of angioedema

**NCLEX trick:** Sudden lip/tongue swelling = stop ACE inhibitor immediately, this is anaphylactic-like angioedema.

#### Angiotensin Receptor Blockers (ARBs, -sartan suffix)

**Prototype:** Losartan (Cozaar)
**Other examples:** Valsartan, Irbesartan

**Mechanism:** Block angiotensin II receptors.

**Use:** Alternative to ACE inhibitors (less cough, less angioedema). Same indications.

**Side effects:** Hyperkalemia, hypotension (cough less common).

#### Calcium Channel Blockers

**Two types:**

**Dihydropyridines (-dipine suffix):** Amlodipine, Nifedipine
- Mainly vasodilation
- Side effects: peripheral edema, headache, flushing

**Non-dihydropyridines:** Verapamil, Diltiazem
- Affect heart rate and contractility too
- Side effects: bradycardia, constipation (verapamil), heart block

**Indications:** Hypertension, angina, dysrhythmias (non-dihydropyridines).

#### Diuretics

**Loop diuretics (-semide suffix):** Furosemide (Lasix)
- Most potent
- Side effects: hypokalemia, ototoxicity (IV push too fast), dehydration
- Monitor: potassium, BUN, creatinine
- Patient teaching: increase potassium-rich foods

**Thiazide diuretics:** Hydrochlorothiazide (HCTZ)
- Less potent than loops
- Side effects: hypokalemia, hyperglycemia, hyperuricemia (gout)
- Ineffective in renal failure

**Potassium-sparing diuretics:** Spironolactone, Triamterene
- Weaker but preserve potassium
- Side effects: hyperkalemia, gynecomastia (spironolactone)
- Used with loops/thiazides to balance potassium

**NCLEX trick:** Furosemide IV must be pushed slowly (over 1-2 minutes) to prevent ototoxicity (tinnitus, hearing loss).

#### Antiarrhythmics

**Amiodarone (Cordarone):**
- Multiple uses for various dysrhythmias
- Side effects: pulmonary toxicity (most serious), thyroid dysfunction, blue-gray skin, corneal deposits
- Long half-life (months in tissues)

**Digoxin:**
- Used for heart failure and atrial fibrillation
- Narrow therapeutic range (0.5-2.0 ng/mL)
- Toxicity signs: nausea, visual changes (yellow halos), dysrhythmias, bradycardia
- Hold if HR <60
- Check potassium (hypokalemia increases toxicity risk)

#### Anticoagulants

**Heparin (IV/SubQ):**
- Monitor aPTT (therapeutic 1.5-2.5 × control)
- Antidote: protamine sulfate
- Watch for HIT (heparin-induced thrombocytopenia)

**Warfarin (Coumadin, PO):**
- Monitor INR (therapeutic 2.0-3.0 for most indications)
- Antidote: vitamin K (FFP for emergencies)
- Avoid foods high in vitamin K (consistent intake, not avoidance)
- Multiple drug interactions

**Direct Oral Anticoagulants (DOACs):**
- Rivaroxaban, Apixaban, Dabigatran
- No routine monitoring needed
- Specific reversal agents (idarucizumab for dabigatran)
- Cleaner than warfarin

**Low Molecular Weight Heparin (LMWH):** Enoxaparin (Lovenox)
- SubQ administration
- No routine monitoring
- Used for DVT prophylaxis and treatment

---

### Diabetes Medications

#### Insulin (most heavily tested category)

**Onset, Peak, Duration - MEMORIZE THIS:**

| Insulin Type | Onset | Peak | Duration |
|--------------|-------|------|----------|
| Rapid (Lispro, Aspart) | 15 min | 1 hr | 3-4 hr |
| Short (Regular) | 30-60 min | 2-3 hr | 6-8 hr |
| Intermediate (NPH) | 1-2 hr | 4-12 hr | 18-24 hr |
| Long (Glargine, Detemir) | 1-2 hr | No peak | 24 hr |

**Critical rules:**

1. **Always check blood glucose before administering insulin.** Hold if hypoglycemic.

2. **Insulin onset must match food intake.** Give rapid-acting insulin right before meal. Give regular insulin 30 minutes before meal.

3. **Mixing insulins:** Draw up regular (clear) FIRST, then NPH (cloudy). "Clear before cloudy."

4. **Storage:** Unopened in refrigerator. Opened vial at room temperature for 28 days.

5. **Hypoglycemia treatment:** 15g fast-acting carb (juice, glucose tabs), recheck in 15 minutes. If still <70, repeat.

**NCLEX trick:** A patient with BG of 65 mg/dL should NOT receive insulin. Treat hypoglycemia first.

#### Oral Diabetes Medications

**Metformin (Glucophage):**
- First-line for type 2 DM
- Does NOT cause hypoglycemia as monotherapy
- Side effect: GI upset, diarrhea
- Contraindicated: renal failure (creatinine >1.5), held 24-48 hrs before/after contrast (lactic acidosis risk)

**Sulfonylureas:** Glipizide, Glyburide
- CAN cause hypoglycemia
- Take with meals

**SGLT2 inhibitors:** Empagliflozin (Jardiance)
- Newer class, also benefits heart and kidneys
- Side effect: UTIs, dehydration, euglycemic DKA

**GLP-1 agonists:** Semaglutide (Ozempic), Liraglutide
- Injectable (some oral options)
- Weight loss benefit
- Side effects: nausea, pancreatitis risk

---

### Respiratory Medications

#### Bronchodilators

**Short-acting beta-2 agonists (SABA):** Albuterol (rescue)
- Use for acute attacks
- Rapid onset (within minutes)
- Side effects: tachycardia, tremor

**Long-acting beta-2 agonists (LABA):** Salmeterol, Formoterol
- Maintenance (not rescue)
- Never use alone for asthma (combine with inhaled corticosteroid)

**Anticholinergics:** Ipratropium (Atrovent), Tiotropium (Spiriva)
- Used for COPD primarily
- Side effects: dry mouth

#### Inhaled Corticosteroids (ICS)

**Examples:** Fluticasone, Budesonide, Beclomethasone

- Daily controller medication
- Reduce airway inflammation
- Side effects: oral candidiasis (rinse mouth after use)
- NOT for acute attacks

#### Leukotriene Inhibitors

**Montelukast (Singulair):**
- Oral, taken in evening
- Used for asthma, allergic rhinitis
- Black box warning: neuropsychiatric effects (depression, suicidal thoughts)

---

### CNS Medications

#### Antidepressants

**SSRIs (-tine, -pram suffixes):** Sertraline, Fluoxetine, Citalopram
- First-line for depression
- Take 4-6 weeks for full effect
- Side effects: sexual dysfunction, GI upset, weight changes
- Serotonin syndrome (life-threatening): fever, agitation, muscle rigidity
- Black box warning: increased suicidal ideation in young adults

**SNRIs:** Venlafaxine, Duloxetine
- Used for depression, anxiety, neuropathic pain
- Side effects similar to SSRIs plus hypertension

**Tricyclics (TCAs):** Amitriptyline, Nortriptyline
- Older, more side effects
- Side effects: anticholinergic (dry mouth, urinary retention), cardiac toxicity in overdose
- Used now mainly for neuropathic pain, not depression

**MAOIs:** Phenelzine, Tranylcypromine
- Rare use due to dietary restrictions
- Avoid tyramine (aged cheese, cured meats, fermented foods) - causes hypertensive crisis
- Drug interactions with many medications

#### Anxiolytics

**Benzodiazepines (-zepam, -zolam suffixes):** Lorazepam (Ativan), Alprazolam (Xanax), Diazepam (Valium)
- Risk: respiratory depression, dependence, falls in elderly
- Antidote: flumazenil
- Used for acute anxiety, seizures, alcohol withdrawal

**Buspirone (BuSpar):**
- Non-addictive anxiolytic
- Takes 2-4 weeks for effect

#### Antipsychotics

**First-generation (typical):** Haloperidol (Haldol), Chlorpromazine
- Side effects: extrapyramidal symptoms (EPS - tremor, rigidity, akathisia), tardive dyskinesia, neuroleptic malignant syndrome (NMS)

**Second-generation (atypical):** Risperidone, Quetiapine, Olanzapine
- Less EPS but more metabolic side effects (weight gain, diabetes, lipid problems)
- Used for schizophrenia, bipolar disorder

**Neuroleptic Malignant Syndrome (NMS):**
- Life-threatening reaction to antipsychotics
- Signs: hyperthermia, muscle rigidity, altered mental status, autonomic instability
- Treatment: stop antipsychotic, dantrolene, supportive care

#### Mood Stabilizers

**Lithium:**
- Used for bipolar disorder
- Narrow therapeutic range (0.6-1.2 mEq/L)
- Toxicity signs: tremor (coarse), ataxia, confusion, seizures, dysrhythmias
- Maintain consistent sodium and fluid intake (low sodium increases lithium levels)
- Avoid NSAIDs (increase lithium levels)

**Valproate (Depakote):**
- Used for bipolar, seizures
- Side effects: weight gain, hair loss, hepatotoxicity, thrombocytopenia

---

### Pain Medications

#### Non-opioids

**Acetaminophen (Tylenol):**
- Max 4g/day (lower in liver disease)
- Hepatotoxic in overdose
- Antidote: N-acetylcysteine (Mucomyst)

**NSAIDs:** Ibuprofen, Naproxen, Ketorolac
- Side effects: GI bleeding, renal impairment, cardiovascular risk
- Avoid in: peptic ulcer, renal disease, last trimester of pregnancy

**Aspirin:**
- Antiplatelet effect at low doses (81 mg)
- Reye's syndrome in children with viral illness (avoid)

#### Opioids

**Examples:** Morphine, Hydromorphone, Fentanyl, Oxycodone, Hydrocodone

**Side effects to monitor:**
- Respiratory depression (most concerning)
- Sedation
- Constipation (universal - start bowel regimen)
- Nausea
- Pruritus
- Urinary retention

**Antidote:** Naloxone (Narcan)

**Key teaching:**
- Take with food to reduce nausea
- Avoid alcohol
- Do not drive
- Constipation prevention essential (senna + docusate)

**NCLEX trick:** Respiratory rate <12 = hold opioid, may need naloxone.

---

### Antibiotics

#### Penicillins (-cillin suffix)

**Examples:** Amoxicillin, Penicillin G, Piperacillin

- Cross-reactivity with cephalosporins (5-10%)
- Allergic reactions ranging from mild to anaphylaxis
- Take on empty stomach (some)

#### Cephalosporins (cef- prefix)

**Generations 1-5** with increasing gram-negative coverage
**Examples:** Cefazolin, Ceftriaxone, Cefepime

- Use with caution in penicillin-allergic patients
- Disulfiram-like reaction with alcohol (some)

#### Macrolides (-mycin suffix)

**Examples:** Azithromycin, Erythromycin, Clarithromycin

- Alternative for penicillin allergy
- Side effects: GI upset, QT prolongation
- Drug interactions (CYP450 inhibitors)

#### Fluoroquinolones (-floxacin suffix)

**Examples:** Ciprofloxacin, Levofloxacin

- Black box warnings: tendinitis/tendon rupture, peripheral neuropathy, aortic aneurysm, CNS effects
- Avoid with dairy and antacids (decrease absorption)
- C. diff infection risk

#### Aminoglycosides

**Examples:** Gentamicin, Tobramycin, Amikacin

- Nephrotoxic and ototoxic
- Monitor peak and trough levels
- IV/IM only (not absorbed orally)

#### Vancomycin

- Used for MRSA, severe gram-positive infections
- Red Man Syndrome with rapid IV infusion (slow infusion over 60+ min)
- Monitor trough levels
- Nephrotoxic

---

### Other High-Yield Medications

#### Corticosteroids (-sone suffix)

**Examples:** Prednisone, Methylprednisolone, Hydrocortisone, Dexamethasone

**Short-term side effects:**
- Increased appetite, weight gain
- Mood changes
- Hyperglycemia
- Insomnia

**Long-term side effects:**
- Osteoporosis
- Cushing's syndrome (moon face, buffalo hump)
- Cataracts, glaucoma
- Immunosuppression
- Adrenal suppression (taper slowly)
- Hypertension
- Hyperglycemia/diabetes

**Patient teaching:**
- Take with food
- Do not stop abruptly
- Monitor blood sugar
- Increased infection risk

#### Statins (-statin suffix)

**Examples:** Atorvastatin (Lipitor), Simvastatin, Rosuvastatin

**Side effects:**
- Muscle pain (myopathy)
- Rhabdomyolysis (severe, rare)
- Liver enzyme elevation

**Patient teaching:**
- Report unexplained muscle pain
- Avoid grapefruit juice (increases statin levels)
- Take at bedtime

---

## Dosage Calculations

The NCLEX includes dosage calculation questions. Master these formulas.

### Basic Formula

**Dose Desired / Dose Available × Quantity = Amount to Give**

**Example:** Order: Acetaminophen 650 mg PO. Available: 325 mg tablets.

(650 / 325) × 1 = 2 tablets

### Weight-Based Calculations

**Convert pounds to kilograms first:** lbs ÷ 2.2 = kg

**Example:** Order: Medication 5 mg/kg. Client weighs 132 lbs.

132 ÷ 2.2 = 60 kg
60 × 5 = 300 mg

### IV Drip Rate Calculations

**(Volume in mL / Time in minutes) × Drop factor = gtt/min**

**Example:** Infuse 1000 mL over 8 hours with drop factor 15 gtt/mL.

8 hr × 60 = 480 min
(1000 / 480) × 15 = 31.25 → 31 gtt/min

### IV Pump Calculations

**Volume / Hours = mL/hour**

**Example:** Infuse 250 mL over 2 hours.

250 / 2 = 125 mL/hour

---

## High-Alert Medications (Memorize These)

The Institute for Safe Medication Practices (ISMP) lists high-alert medications requiring double verification:

- **Heparin and other anticoagulants**
- **Insulin**
- **Opioids (especially IV)**
- **Concentrated electrolytes (potassium chloride)**
- **Chemotherapy agents**
- **Neuromuscular blockers (paralytics)**
- **Magnesium sulfate**

**NCLEX trick:** Any question about heparin, insulin, or potassium chloride likely requires double verification or specific safety practices.

**Critical rule:** Potassium chloride IV must NEVER be given as IV push - always diluted and infused slowly via pump. Rapid administration causes fatal cardiac arrest.

---

## NCLEX Pharmacology Study Strategy

**Week 1: Cardiovascular medications**
Master beta-blockers, ACE inhibitors, ARBs, calcium channel blockers, diuretics, anticoagulants.

**Week 2: Endocrine medications**
Focus heavily on insulin (most tested), oral diabetes medications, corticosteroids, thyroid medications.

**Week 3: CNS medications**
Antidepressants, anxiolytics, antipsychotics, mood stabilizers, antiepileptics, pain medications.

**Week 4: Other systems**
Respiratory, GI, antibiotics, antineoplastics, immunosuppressants.

**Daily practice:** 30-50 pharmacology questions per day with full rationale review.

**Memorize antidote pairs:**
- Heparin → Protamine sulfate
- Warfarin → Vitamin K
- Opioids → Naloxone
- Benzodiazepines → Flumazenil
- Acetaminophen → N-acetylcysteine
- Iron → Deferoxamine
- Magnesium → Calcium gluconate

---

## Practice NCLEX Pharmacology at LisensyaPrep

LisensyaPrep's NCLEX Quiz Module 1 contains **50 practice questions specifically on Pharmacology**, covering drug classifications, dosage calculations, IV therapy, side effects, and high-alert medications.

**[Start Module 1: Pharmacology Practice](/nclex)**

---

## Related NCLEX Articles

- [What is the NCLEX? Complete Guide for Filipino Nurses](/nursing/what-is-the-nclex)
- [NCLEX 2026 Coverage and Test Plan Changes](/nursing/nclex-2026-coverage)
- [How to Pass the NCLEX on Your First Take](/nursing/how-to-pass-nclex-first-take)
- [Management of Care Reviewer for NCLEX-RN](/nursing/management-of-care-nclex-reviewer)
- [NCLEX vs PNLE: Complete Comparison](/nursing/nclex-vs-pnle-comparison)
`;

export default function PharmacologyNclexReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-pharmacology-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Pharmacology Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Nursing (NCLEX)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Pharmacology Reviewer for NCLEX-RN 2026 (Complete Guide)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 31, 2026</span><span>•</span>
                <span>14 min read</span>
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
