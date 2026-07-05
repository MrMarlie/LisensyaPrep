import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'Clinical Pharmacy Reviewer for PLE Philippines 2026 (Complete Guide)',
  description:
    'Studying for the pharmacy board exam? This clinical pharmacy reviewer covers pharmacokinetics, drug interactions, adverse effects, therapeutic monitoring, and disease management tested in the PLE.',
  path: '/pharmacy/clinical-pharmacy-reviewer',
  image: '/images/articles/hero-pharmacy-clinical.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Clinical Pharmacy Reviewer for PLE Philippines 2026',
  description:
    'Complete clinical pharmacy reviewer for the PRC Pharmacy Licensure Examination covering pharmacokinetics, CYP450 interactions, therapeutic drug monitoring, and disease-specific drug management.',
  image: 'https://lisensyaprep.com/images/articles/hero-pharmacy-clinical.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-02',
  dateModified: '2026-05-02',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/pharmacy/clinical-pharmacy-reviewer' },
};

const RELATED_ARTICLES = [
  { text: 'PLE Coverage 2026 Complete Subject Breakdown', href: '/pharmacy/ple-coverage-2026' },
  { text: 'Pharmacology Reviewer PLE Philippines 2026', href: '/pharmacy/pharmacology-reviewer' },
  { text: 'Pharmaceutical Chemistry Reviewer PLE 2026', href: '/pharmacy/pharmaceutical-chemistry-reviewer' },
  { text: 'Pharmaceutical Calculations Practice Problems PLE 2026', href: '/pharmacy/pharmaceutical-calculations-reviewer' },
  { text: 'How to Pass the Pharmacy Board Exam Philippines', href: '/pharmacy/how-to-pass-pharmacy-board-exam' },
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

Clinical pharmacy is where pharmaceutical science meets direct patient care. It is the discipline that ensures patients receive the right drug, at the right dose, via the right route, for the right duration. The PLE tests clinical pharmacy through scenario-based questions that require integrating drug knowledge with patient-specific factors.

---

## Pharmacokinetics: What the Body Does to the Drug

Pharmacokinetics describes the movement of drugs through the body. The four processes are absorption, distribution, metabolism, and excretion, commonly remembered as ADME.

### Absorption

Absorption is the movement of a drug from its site of administration into the systemic circulation.

**Bioavailability (F):** The fraction of an administered dose that reaches systemic circulation unchanged. IV administration has 100% bioavailability. Oral drugs undergo first-pass metabolism in the liver before reaching systemic circulation, reducing bioavailability.

**First-pass effect:** Drugs absorbed from the GI tract pass through the portal vein to the liver before entering systemic circulation. Extensive first-pass metabolism significantly reduces bioavailability of some drugs. Examples of high first-pass drugs: morphine, lidocaine, propranolol, nitroglycerin (sublingual route bypasses first-pass).

**Factors affecting oral absorption:** Gastric pH, gastric motility, food-drug interactions, drug solubility, formulation factors.

### Distribution

Distribution describes how a drug spreads from the bloodstream to tissues.

**Volume of distribution (Vd):** A theoretical volume that would be required to contain the total amount of drug at the same concentration found in the plasma. High Vd means drug distributes extensively into tissues. Low Vd means drug stays mostly in plasma.

**Protein binding:** Most drugs bind to plasma proteins, primarily albumin (for acidic drugs) and alpha-1-acid glycoprotein (for basic drugs). Only the free (unbound) fraction is pharmacologically active.

**Blood-brain barrier (BBB):** Only lipophilic, non-ionized, protein-unbound drugs cross the BBB. This limits CNS effects of many drugs and must be considered for CNS infections requiring antibiotics.

### Metabolism

Most drug metabolism occurs in the liver via cytochrome P450 (CYP450) enzymes.
`;

const SECTION_2 = `
### Excretion

The kidneys are the primary organ of drug excretion. Renal excretion involves glomerular filtration, tubular secretion, and tubular reabsorption.

**Creatinine clearance (CrCl):** Used to estimate glomerular filtration rate (GFR) and adjust doses of renally eliminated drugs. The Cockcroft-Gault equation is used clinically.

**CrCl (mL/min) = [(140 − age) × weight in kg] ÷ (72 × serum creatinine)**
For females, multiply the result by 0.85.

Drugs requiring dose adjustment in renal impairment: aminoglycosides, vancomycin, digoxin, metformin, most antibiotics.

---

## Pharmacodynamics: What the Drug Does to the Body

### Drug-Receptor Interactions

**Agonist:** Binds to a receptor and activates it, producing a pharmacological effect. Example: morphine is an agonist at opioid receptors.

**Antagonist:** Binds to a receptor but does not activate it. Blocks the action of agonists. Example: naloxone is an opioid receptor antagonist used to reverse opioid overdose.

**Partial agonist:** Binds and activates the receptor but produces a submaximal effect even at full receptor occupancy. Example: buprenorphine at opioid receptors.

### Therapeutic Index

**Therapeutic index (TI) = LD50 ÷ ED50**

A narrow therapeutic index (NTI) means there is a small difference between the therapeutic dose and the toxic dose. NTI drugs require close monitoring.

**NTI drugs to know for the PLE:** Digoxin, warfarin, lithium, phenytoin, theophylline, aminoglycosides, vancomycin, cyclosporine.

---

## Clinical Drug Management by Disease

### Hypertension

**First-line agents:** ACE inhibitors (enalapril, lisinopril), ARBs (losartan, valsartan), calcium channel blockers (amlodipine), thiazide diuretics (hydrochlorothiazide).

**ACE inhibitor key adverse effect:** Dry cough (bradykinin accumulation). Switch to ARB if intolerable.

**Contraindications:** ACE inhibitors and ARBs are contraindicated in pregnancy (teratogenic). Beta-blockers are contraindicated in asthma.

### Diabetes Mellitus

**Type 1 DM:** Requires insulin. Absolute insulin deficiency due to autoimmune destruction of beta cells.

**Type 2 DM:** First-line treatment is metformin (unless contraindicated by renal impairment, CrCl less than 30). Mechanism: decreases hepatic glucose production.

**Sulfonylureas** (glibenclamide, glipizide): Stimulate insulin secretion. Risk of hypoglycemia.

**SGLT-2 inhibitors** (empagliflozin, dapagliflozin): Inhibit glucose reabsorption in the kidney. Additional benefit: cardiovascular and renal protection.

**GLP-1 agonists** (semaglutide, liraglutide): Stimulate insulin secretion, inhibit glucagon, slow gastric emptying, reduce appetite. Weight loss benefit.

### Antimicrobial Therapy

**Beta-lactams** (penicillins, cephalosporins, carbapenems): Inhibit cell wall synthesis by binding to penicillin-binding proteins (PBPs). Bactericidal.

**Mechanism of resistance:** Beta-lactamase production. Overcome with beta-lactamase inhibitors (clavulanate, sulbactam, tazobactam).

**Aminoglycosides** (gentamicin, amikacin): Inhibit protein synthesis at 30S ribosome. Bactericidal. Narrow therapeutic index. Monitor peak and trough levels. Nephrotoxic and ototoxic.

**Fluoroquinolones** (ciprofloxacin, levofloxacin): Inhibit DNA gyrase and topoisomerase IV. Bactericidal. Avoid in children (cartilage damage) and pregnancy.

---

## Therapeutic Drug Monitoring (TDM)

TDM involves measuring drug concentrations in the blood to ensure therapeutic levels are achieved without toxicity.
`;

const SECTION_3 = `
---

## Drug Interactions of Clinical Significance

**Warfarin interactions:** Warfarin has the most clinically significant drug interactions of any common medication. CYP450 inducers (rifampicin, carbamazepine) decrease warfarin levels, reducing anticoagulant effect. CYP450 inhibitors (fluconazole, amiodarone) increase warfarin levels, increasing bleeding risk.

**Metformin and contrast media:** Metformin should be held 48 hours before and after IV iodinated contrast to prevent lactic acidosis in patients with contrast-induced nephropathy.

**Statins and CYP3A4 inhibitors:** Simvastatin and lovastatin are metabolized by CYP3A4. Concurrent use with strong CYP3A4 inhibitors (clarithromycin, ketoconazole) dramatically increases statin levels and risk of myopathy and rhabdomyolysis.

**MAO inhibitors and sympathomimetics:** Combination causes hypertensive crisis. MAOIs also interact with opioids (especially meperidine) causing serotonin syndrome.

---

## Practice What You Just Learned

Clinical pharmacy questions in the PLE present patient scenarios requiring you to select the correct drug, identify an interaction, or recognize a toxicity pattern. Practice those scenarios now at LisensyaPrep. No account needed.

**[Practice Clinical Pharmacy Questions at LisensyaPrep](https://lisensyaprep.com/pharmacy)**
`;

export default function ClinicalPharmacyReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-clinical-pharm" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/pharmacy","name":"Pharmacy"},{"url":"/pharmacy/clinical-pharmacy-reviewer","name":"Clinical Pharmacy Reviewer"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/pharmacy" className="text-gray-500 hover:text-gray-300 transition-colors">Pharmacy</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Clinical Pharmacy Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">
                Pharmacy (PLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Clinical Pharmacy Reviewer for PLE Philippines 2026
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
                src="/images/articles/hero-pharmacy-clinical.jpg"
                alt="Young Filipino male pharmacist in white coat with arms crossed smiling for PLE clinical pharmacy reviewer Philippines 2026"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="240" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">CYP450 Drug Interactions: Inducers and Inhibitors</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="330" height="170" fill="#1e3a5f" rx="8"/>
                  <text x="205" y="74" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">CYP450 INHIBITORS</text>
                  <text x="205" y="92" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">DECREASE enzyme activity</text>
                  <text x="205" y="108" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">→ Increased drug levels → Toxicity risk</text>
                  <text x="205" y="128" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Key inhibitors:</text>
                  <text x="205" y="146" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Ketoconazole, fluconazole (antifungals)</text>
                  <text x="205" y="162" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Erythromycin, clarithromycin (macrolides)</text>
                  <text x="205" y="178" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Ritonavir (HIV protease inhibitor)</text>
                  <text x="205" y="194" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Cimetidine, amiodarone</text>
                  <text x="205" y="210" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="Arial,sans-serif">Grapefruit juice (CYP3A4)</text>
                  <rect x="390" y="50" width="330" height="170" fill="#7f1d1d" rx="8"/>
                  <text x="555" y="74" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">CYP450 INDUCERS</text>
                  <text x="555" y="92" textAnchor="middle" fill="#fecaca" fontSize="11" fontFamily="Arial,sans-serif">INCREASE enzyme activity</text>
                  <text x="555" y="108" textAnchor="middle" fill="#fca5a5" fontSize="10" fontFamily="Arial,sans-serif">→ Decreased drug levels → Therapeutic failure</text>
                  <text x="555" y="128" textAnchor="middle" fill="#fecaca" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Key inducers:</text>
                  <text x="555" y="146" textAnchor="middle" fill="#fecaca" fontSize="10" fontFamily="Arial,sans-serif">Rifampicin (most potent inducer)</text>
                  <text x="555" y="162" textAnchor="middle" fill="#fecaca" fontSize="10" fontFamily="Arial,sans-serif">Phenytoin, carbamazepine (anticonvulsants)</text>
                  <text x="555" y="178" textAnchor="middle" fill="#fecaca" fontSize="10" fontFamily="Arial,sans-serif">Phenobarbital</text>
                  <text x="555" y="194" textAnchor="middle" fill="#fecaca" fontSize="10" fontFamily="Arial,sans-serif">{'St. John\'s Wort (herbal)'}</text>
                  <text x="555" y="210" textAnchor="middle" fill="#fca5a5" fontSize="10" fontFamily="Arial,sans-serif">Chronic alcohol use</text>
                  <text x="380" y="232" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | PLE Clinical Pharmacy Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>CYP450 inhibitors and inducers and their clinical effects</figcaption>
              </figure>

              {renderContent(SECTION_2)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="200" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="700" fontFamily="Georgia,serif">Key Drugs Requiring TDM and Target Ranges</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="140" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">DRUG</text>
                  <text x="360" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">THERAPEUTIC RANGE</text>
                  <text x="580" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">TOXICITY SIGNS</text>
                  <line x1="40" y1="64" x2="720" y2="64" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="70" width="680" height="26" fill="#1e3a5f" rx="4"/>
                  <text x="140" y="88" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">Digoxin</text>
                  <text x="360" y="88" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">0.5 to 2.0 ng/mL</text>
                  <text x="580" y="88" textAnchor="middle" fill="#fca5a5" fontSize="11" fontFamily="Arial,sans-serif">Nausea, visual changes (yellow-green), arrhythmias</text>
                  <rect x="40" y="102" width="680" height="26" fill="#172033" rx="4"/>
                  <text x="140" y="120" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">Phenytoin</text>
                  <text x="360" y="120" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">10 to 20 mcg/mL</text>
                  <text x="580" y="120" textAnchor="middle" fill="#fca5a5" fontSize="11" fontFamily="Arial,sans-serif">Nystagmus, ataxia, diplopia, gingival hyperplasia</text>
                  <rect x="40" y="134" width="680" height="26" fill="#1e3a5f" rx="4"/>
                  <text x="140" y="152" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">Lithium</text>
                  <text x="360" y="152" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">0.6 to 1.2 mEq/L (maint)</text>
                  <text x="580" y="152" textAnchor="middle" fill="#fca5a5" fontSize="11" fontFamily="Arial,sans-serif">Tremor, polyuria, confusion, seizures at toxic levels</text>
                  <rect x="40" y="166" width="680" height="26" fill="#172033" rx="4"/>
                  <text x="140" y="184" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">Vancomycin</text>
                  <text x="360" y="184" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Trough: 10 to 20 mcg/mL</text>
                  <text x="580" y="184" textAnchor="middle" fill="#fca5a5" fontSize="11" fontFamily="Arial,sans-serif">Nephrotoxicity, ototoxicity, Red Man Syndrome</text>
                  <text x="380" y="198" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Key drugs requiring TDM with therapeutic ranges and toxicity signs</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_3)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-purple-900/20 to-purple-900/10 border border-purple-500/30 rounded-2xl p-6 text-center">
              <p className="text-purple-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice PLE clinical pharmacy questions with instant feedback. No registration required.
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
