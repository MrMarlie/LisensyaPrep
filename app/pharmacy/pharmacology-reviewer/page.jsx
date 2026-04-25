import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Pharmacology Reviewer for PLE Philippines 2026 (Complete Guide)',
  description:
    'Studying for the pharmacy board exam? This pharmacology reviewer covers pharmacokinetics, pharmacodynamics, major drug classifications, autonomic drugs, and cardiovascular drugs tested in the PLE.',
  path: '/pharmacy/pharmacology-reviewer',
  image: '/images/articles/hero-pharmacy-pharmacology.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pharmacology Reviewer for PLE Philippines 2026',
  description:
    'Complete pharmacology reviewer for the PRC Pharmacy Licensure Examination covering pharmacokinetics, pharmacodynamics, autonomic drugs, cardiovascular drugs, and anti-infective agents.',
  image: 'https://lisensyaprep.com/images/articles/hero-pharmacy-pharmacology.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-26',
  dateModified: '2026-04-26',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/pharmacy/pharmacology-reviewer' },
};

const RELATED_ARTICLES = [
  { text: 'PLE Coverage 2026 Complete Subject Breakdown', href: '/pharmacy/ple-coverage-2026' },
  { text: 'Pharmacy Law and Ethics Reviewer PLE 2026', href: '/pharmacy/pharmacy-law-ethics-reviewer' },
  { text: 'PRC Board Exam Passing Rate by Profession 2026', href: '/blog/prc-board-exam-passing-rate-by-profession' },
  { text: 'How Long to Study for PRC Board Exam', href: '/blog/how-long-to-study-for-prc-board-exam' },
  { text: 'PRC Board Exam Retake Rules and Policies', href: '/blog/prc-board-exam-retake-rules' },
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
*By LisensyaPrep Team | Last Updated: April 2026 | 12-minute read*

---

Pharmacology is the backbone of the Pharmacy Licensure Examination. It connects your chemistry knowledge to actual clinical practice and is the subject where understanding beats memorization every time. If you know why a drug works the way it does, you can answer scenario questions even about drugs you have never specifically studied.

This reviewer covers the essential pharmacology framework and the highest-yield drug categories for the PLE.

---

## Pharmacokinetics: What the Body Does to the Drug

Pharmacokinetics describes how the body handles a drug from the moment it enters until it is eliminated. The four processes are absorption, distribution, metabolism, and excretion. This is the ADME framework and it underlies almost every pharmacokinetics question in the PLE.
`;

const SECTION_2 = `
### Key Pharmacokinetics Concepts

**Bioavailability** is the fraction of an administered drug that reaches systemic circulation unchanged. Intravenous administration has 100% bioavailability. Oral bioavailability is reduced by first-pass metabolism.

**First-pass effect** occurs when a drug absorbed from the gastrointestinal tract is metabolized by the liver before reaching systemic circulation. Drugs with high first-pass effects (morphine, lidocaine, propranolol) have much lower oral bioavailability than IV bioavailability.

**Half-life (t½)** is the time required for the plasma concentration of a drug to decrease by 50%. It determines dosing intervals. After 4 to 5 half-lives, a drug is considered essentially eliminated from the body.

**Steady state** is reached after approximately 4 to 5 half-lives of repeated dosing. At steady state, the rate of drug input equals the rate of drug elimination.

**Volume of distribution (Vd)** describes how widely a drug distributes throughout body compartments. A large Vd means the drug distributes extensively into tissues rather than staying in the blood.

---

## Pharmacodynamics: What the Drug Does to the Body

Pharmacodynamics covers the mechanisms by which drugs produce their effects.

**Agonist:** A drug that binds to a receptor and activates it, producing a biological response.

**Antagonist:** A drug that binds to a receptor but does not activate it, blocking the response to agonists. Competitive antagonists can be overcome by increasing agonist concentration. Non-competitive antagonists cannot.

**Partial agonist:** A drug that binds to a receptor and activates it but produces a submaximal response even at full receptor occupancy.

**Therapeutic index (TI):** The ratio of the toxic dose to the effective dose. A narrow therapeutic index means the difference between the effective dose and the toxic dose is small, requiring careful monitoring. Examples of narrow TI drugs: digoxin, warfarin, lithium, phenytoin, theophylline.

---

## Autonomic Nervous System Drugs

The autonomic nervous system drugs are among the most heavily tested drug categories in PLE pharmacology. Know both the mechanism and the clinical effects.
`;

const SECTION_3 = `
---

## Cardiovascular Drugs

### Antihypertensives

**ACE Inhibitors** (captopril, enalapril, lisinopril): End in "-pril." Block conversion of angiotensin I to angiotensin II. Key side effect: dry cough (due to bradykinin accumulation). Contraindicated in pregnancy (causes fetal renal damage).

**Angiotensin Receptor Blockers (ARBs)** (losartan, valsartan): End in "-sartan." Block angiotensin II receptors. Same cardiovascular benefits as ACE inhibitors without the cough. Also contraindicated in pregnancy.

**Calcium Channel Blockers:** Dihydropyridines (amlodipine, nifedipine) act mainly on vascular smooth muscle causing vasodilation. Non-dihydropyridines (verapamil, diltiazem) also slow heart rate.

**Thiazide Diuretics** (hydrochlorothiazide): First-line treatment for hypertension. Watch for hypokalemia, hyperuricemia, and hyperglycemia as side effects.

### Anticoagulants

**Warfarin:** Vitamin K antagonist. Narrow therapeutic index. Monitored by INR. Antidote: Vitamin K for minor bleeding, fresh frozen plasma (FFP) for severe bleeding.

**Heparin:** Activates antithrombin III. Monitored by aPTT. Antidote: protamine sulfate.

**Low molecular weight heparins (LMWH)** (enoxaparin): More predictable than unfractionated heparin. Given subcutaneously. No routine monitoring needed.

### Antidyslipidemics

**Statins** (atorvastatin, simvastatin): End in "-statin." Inhibit HMG-CoA reductase, reducing cholesterol synthesis. Most effective LDL-lowering agents. Key side effects: myopathy (muscle pain), rhabdomyolysis (rare but serious).

---

## Anti-infective Drugs

### Antibiotics by Class

**Penicillins** (amoxicillin, ampicillin): Beta-lactam antibiotics. Inhibit cell wall synthesis. Major concern: allergic reactions including anaphylaxis. Cross-reactivity with cephalosporins in about 1 to 10% of penicillin-allergic patients.

**Cephalosporins** (cephalexin, cefuroxime, cefixime): Also beta-lactams. Grouped by generations with increasing gram-negative coverage in higher generations.

**Fluoroquinolones** (ciprofloxacin, levofloxacin): End in "-floxacin." Inhibit DNA gyrase. Broad-spectrum. Avoid in children and pregnant women (affect cartilage development). Can prolong QT interval.

**Macrolides** (azithromycin, clarithromycin): End in "-thromycin." Inhibit protein synthesis. Good for atypical pneumonia pathogens.

**Tetracyclines** (doxycycline, tetracycline): Inhibit protein synthesis. Avoid in children under 8 and pregnant women (discoloration of developing teeth and bones). Take with full glass of water, do not take with dairy or antacids.

**Aminoglycosides** (gentamicin, amikacin): Narrow therapeutic index. Monitor for nephrotoxicity and ototoxicity. Given parenterally for serious infections.

---

## Common Drug Interactions to Know

| Drug 1 | Drug 2 | Effect |
|--------|--------|--------|
| Warfarin | Aspirin | Increased bleeding risk |
| ACE inhibitor | Potassium-sparing diuretic | Hyperkalemia |
| Metformin | IV contrast dye | Risk of lactic acidosis (hold metformin) |
| Statins | Fibrates | Increased risk of myopathy |
| MAO inhibitors | Tyramine-rich foods | Hypertensive crisis |
| Fluoroquinolones | Antacids | Reduced fluoroquinolone absorption |

---

Pharmacology questions in the PLE combine mechanism knowledge with clinical application. The best preparation is practicing scenario questions that ask you to choose the right drug for a patient or identify the cause of a side effect.

Head to LisensyaPrep and practice now. No registration required.

**[Practice Pharmacology Questions at LisensyaPrep](/pharmacy)**
`;

export default function PharmacologyReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-pharmacy-pharm" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/pharmacy" className="text-gray-500 hover:text-gray-300 transition-colors">Pharmacy</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Pharmacology Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">
                Pharmacy (PLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Pharmacology Reviewer for PLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 26, 2026</span>
                <span>•</span>
                <span>12 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-pharmacy-pharmacology.jpg"
                alt="Young Filipino male pharmacist examining prescription bottle for PLE pharmacology reviewer Philippines 2026"
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
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">ADME: Pharmacokinetics Framework</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="46" y="52" width="154" height="160" fill="#1e3a5f" rx="8"/>
                  <text x="123" y="78" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">ABSORPTION</text>
                  <text x="123" y="100" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Drug enters</text>
                  <text x="123" y="116" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">bloodstream</text>
                  <text x="123" y="138" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Affected by:</text>
                  <text x="123" y="154" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Route, pH, food,</text>
                  <text x="123" y="170" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">bioavailability</text>
                  <text x="123" y="190" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">First-pass effect</text>
                  <rect x="212" y="52" width="154" height="160" fill="#172033" rx="8"/>
                  <text x="289" y="78" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">DISTRIBUTION</text>
                  <text x="289" y="100" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Drug spreads</text>
                  <text x="289" y="116" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">through body</text>
                  <text x="289" y="138" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Affected by:</text>
                  <text x="289" y="154" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Protein binding,</text>
                  <text x="289" y="170" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">lipid solubility,</text>
                  <text x="289" y="186" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">blood-brain barrier</text>
                  <rect x="378" y="52" width="154" height="160" fill="#14532d" rx="8"/>
                  <text x="455" y="78" textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">METABOLISM</text>
                  <text x="455" y="100" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Drug is</text>
                  <text x="455" y="116" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">chemically altered</text>
                  <text x="455" y="138" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">Primarily liver</text>
                  <text x="455" y="154" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">CYP450 enzymes</text>
                  <text x="455" y="174" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">Phase I: oxidation</text>
                  <text x="455" y="190" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">Phase II: conjugation</text>
                  <rect x="544" y="52" width="172" height="160" fill="#172033" rx="8"/>
                  <text x="630" y="78" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">EXCRETION</text>
                  <text x="630" y="100" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Drug leaves</text>
                  <text x="630" y="116" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">the body</text>
                  <text x="630" y="138" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Primarily kidneys</text>
                  <text x="630" y="154" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Also: bile, lungs,</text>
                  <text x="630" y="170" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">sweat, breast milk</text>
                  <text x="630" y="190" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Half-life and</text>
                  <text x="630" y="206" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">clearance concepts</text>
                  <text x="380" y="248" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | PLE Pharmacology Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>ADME pharmacokinetics framework for the PLE</figcaption>
              </figure>

              {renderContent(SECTION_2)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 290" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="290" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Autonomic Nervous System Drug Classifications</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="160" y="58" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">DRUG CLASS</text>
                  <text x="360" y="58" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">MECHANISM</text>
                  <text x="590" y="58" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">EXAMPLES AND USES</text>
                  <line x1="40" y1="66" x2="720" y2="66" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="72" width="680" height="34" fill="#1e3a5f" rx="4"/>
                  <text x="160" y="94" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Cholinergics (Parasympathomimetics)</text>
                  <text x="360" y="94" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Stimulate acetylcholine receptors</text>
                  <text x="590" y="94" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Pilocarpine (glaucoma), Bethanechol (urinary retention)</text>
                  <rect x="40" y="112" width="680" height="34" fill="#172033" rx="4"/>
                  <text x="160" y="134" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Anticholinergics (Parasympatholytics)</text>
                  <text x="360" y="134" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Block muscarinic receptors</text>
                  <text x="590" y="134" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Atropine (bradycardia), Scopolamine (motion sickness)</text>
                  <rect x="40" y="152" width="680" height="34" fill="#1e3a5f" rx="4"/>
                  <text x="160" y="174" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Adrenergics (Sympathomimetics)</text>
                  <text x="360" y="174" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Stimulate adrenergic receptors</text>
                  <text x="590" y="174" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Epinephrine (anaphylaxis), Albuterol (asthma)</text>
                  <rect x="40" y="192" width="680" height="34" fill="#172033" rx="4"/>
                  <text x="160" y="214" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Beta-Blockers (Beta-Adrenergic Antagonists)</text>
                  <text x="360" y="214" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Block beta-1 and/or beta-2 receptors</text>
                  <text x="590" y="214" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Propranolol (HTN, angina), Metoprolol (heart failure)</text>
                  <rect x="40" y="232" width="680" height="34" fill="#1e3a5f" rx="4"/>
                  <text x="160" y="254" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Alpha-Blockers (Alpha-Adrenergic Antagonists)</text>
                  <text x="360" y="254" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Block alpha-1 receptors</text>
                  <text x="590" y="254" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Prazosin (HTN, BPH), Tamsulosin (BPH)</text>
                  <text x="380" y="282" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Autonomic nervous system drug classifications for the PLE</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_3)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-purple-900/20 to-purple-900/10 border border-purple-500/30 rounded-2xl p-6 text-center">
              <p className="text-purple-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice PLE pharmacology questions with instant feedback. No registration required.
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
