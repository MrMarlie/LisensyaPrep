import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Medical-Surgical Nursing Reviewer for NLE Philippines 2026 (Complete Guide)',
  description:
    'Studying for the NLE? This medical-surgical nursing reviewer covers cardiovascular, respiratory, neurological, gastrointestinal, and renal nursing care tested in the PNLE board exam.',
  path: '/nursing/medical-surgical-nursing-reviewer',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Medical-Surgical Nursing Reviewer for NLE Philippines 2026',
  description:
    'Complete medical-surgical nursing reviewer for the Philippine Nurse Licensure Examination covering cardiovascular, respiratory, neurological, gastrointestinal, and renal nursing care.',
  image: 'https://lisensyaprep.com/images/articles/hero-nle-medical-surgical.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-25',
  dateModified: '2026-04-25',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/medical-surgical-nursing-reviewer' },
};

const ALL_NLE_ARTICLES = [
  { text: 'PNLE Coverage 2026 Complete Topic Breakdown', href: '/nursing/pnle-coverage-2026' },
  { text: 'Community Health Nursing Reviewer NLE 2026', href: '/nursing/community-health-nursing-reviewer' },
  { text: 'Medical-Surgical Nursing Reviewer NLE 2026', href: '/nursing/medical-surgical-nursing-reviewer' },
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
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />);
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

const INTRO = `
Medical-Surgical Nursing is the largest and most content-heavy subject in the PNLE. It covers nursing care of adult patients across all major body systems and accounts for the bulk of Part 2B of the exam.

The sheer volume of content in MedSurg intimidates a lot of examinees. The key to reviewing it effectively is not trying to memorize every disease condition in existence but mastering the nursing process approach for the most commonly tested conditions across each body system. This reviewer covers the highest-yield topics organized by body system.

---

## The Nursing Process: Your Framework for Every MedSurg Question

Before diving into specific conditions, internalize this principle: almost every MedSurg NLE question tests one step of the nursing process. When you read a question, identify which step it is asking about.
`;

const MAIN_CONTENT = `
---

## Cardiovascular Nursing

### Heart Failure

Heart failure occurs when the heart cannot pump enough blood to meet the body's needs. Know the difference between left-sided and right-sided heart failure.

**Left-sided heart failure** causes pulmonary congestion. Key signs: dyspnea, orthopnea, paroxysmal nocturnal dyspnea, crackles in the lungs, pink frothy sputum in severe cases.

**Right-sided heart failure** causes systemic congestion. Key signs: peripheral edema (ankles and legs), jugular vein distension, hepatomegaly, ascites.

**Priority nursing diagnosis:** Decreased cardiac output related to altered myocardial contractility.

**Key nursing interventions:** Semi-Fowler's or high Fowler's position to ease breathing. Daily weight monitoring (report weight gain of more than 1 kg in a day or 2 kg in a week). Fluid restriction. Sodium restriction. Administer diuretics and monitor electrolytes.

### Myocardial Infarction (MI)

MI occurs when a coronary artery is blocked, causing ischemia and necrosis of heart muscle.

**Classic signs:** Crushing, squeezing chest pain radiating to the left arm, jaw, or back. Not relieved by rest or nitroglycerin. Associated with diaphoresis, nausea, and pallor.

**Atypical presentation in women and diabetics:** Fatigue, shortness of breath, indigestion, or no chest pain. Know this because the NLE tests it.

**Priority action:** Administer oxygen, nitroglycerin (if SBP above 90 mmHg), and morphine. Aspirin 325 mg chewed immediately. Place patient on cardiac monitor.

**Enzyme markers:** Troponin I and T are the most specific markers for myocardial damage. They rise within 3 to 6 hours and remain elevated for 7 to 14 days.

---

## Respiratory Nursing

### Tuberculosis (TB)

TB is a priority health concern in the Philippines and appears in both MedSurg and CHN sections of the NLE.

**Transmission:** Airborne via droplet nuclei. Isolation: negative pressure room, N95 respirator for healthcare workers.

**Classic signs:** Productive cough lasting more than 2 weeks, hemoptysis, night sweats, weight loss, low-grade afternoon fever.

**DOTS (Directly Observed Treatment Short-course):**
- Intensive phase: 2 months of HRZE (Isoniazid, Rifampicin, Pyrazinamide, Ethambutol)
- Continuation phase: 4 months of HR (Isoniazid, Rifampicin)

**Key side effects to teach:** Rifampicin causes orange-red discoloration of urine, sweat, and tears (normal, not harmful). Isoniazid causes peripheral neuropathy (give Vitamin B6 as prophylaxis). Ethambutol causes optic neuritis (monitor vision).

### Chronic Obstructive Pulmonary Disease (COPD)

COPD is a progressive lung disease including emphysema and chronic bronchitis.

**Emphysema:** Destruction of alveolar walls. Pink Puffer appearance: barrel chest, pursed lip breathing, use of accessory muscles.

**Chronic Bronchitis:** Excessive mucus production. Blue Bloater appearance: cyanosis, productive cough, peripheral edema from cor pulmonale.

**Critical nursing point:** Do not administer high-flow oxygen to COPD patients. They rely on hypoxic drive to breathe. Use low-flow oxygen at 1 to 2 L/min via nasal cannula.

---

## Neurological Nursing

### Stroke (Cerebrovascular Accident)

**Ischemic stroke:** Caused by blood clot blocking cerebral artery. Treatment: tPA (tissue plasminogen activator) within 3 to 4.5 hours of symptom onset if no contraindications.

**Hemorrhagic stroke:** Caused by rupture of a cerebral blood vessel. tPA is contraindicated.

**Signs of stroke (FAST):** Face drooping, Arm weakness, Speech difficulty, Time to call emergency services.

**Nursing priority:** Airway maintenance. Position head of bed at 30 degrees to reduce intracranial pressure. Monitor for increased ICP: Cushing's triad (hypertension with widened pulse pressure, bradycardia, irregular respirations).

### Increased Intracranial Pressure (ICP)

**Early signs:** Headache, vomiting (often projectile), altered level of consciousness, pupillary changes.

**Cushing's Triad (late and ominous sign):** Hypertension (widened pulse pressure), bradycardia, and irregular respirations. This is a medical emergency.

**Nursing interventions:** Elevate head of bed 30 to 45 degrees. Keep head in neutral alignment. Avoid anything that increases ICP: Valsalva maneuver, coughing, straining, hip flexion.

---

## Gastrointestinal Nursing

### Peptic Ulcer Disease

**Duodenal ulcer:** Pain relieved by food. Most common type.

**Gastric ulcer:** Pain worsened by food.

**H. pylori** is the most common cause of peptic ulcers. Treatment includes triple therapy: two antibiotics plus a proton pump inhibitor.

**Complication to watch for:** Perforation presents as sudden severe abdominal pain, rigid board-like abdomen, and signs of shock. This is a surgical emergency.

### Liver Cirrhosis

**Key complications:**
Portal hypertension leads to esophageal varices (risk of massive hemorrhage), ascites (fluid accumulation in abdomen), and splenomegaly.

Hepatic encephalopathy results from accumulation of ammonia. Signs: asterixis (flapping tremor), confusion, altered consciousness.

**Nursing priority for varices:** Avoid anything that increases portal pressure. No straining, no heavy lifting. Soft foods. Monitor for signs of bleeding.

**For hepatic encephalopathy:** Restrict dietary protein. Administer lactulose to reduce ammonia absorption. Monitor neurological status.

---

## Renal Nursing

### Acute Kidney Injury (AKI)

AKI is a sudden decrease in kidney function. Three types based on cause.

**Prerenal:** Caused by decreased blood flow to kidneys (dehydration, shock, heart failure). Treated by restoring fluid volume.

**Intrarenal:** Caused by damage within the kidney itself (nephrotoxic drugs, contrast dye, glomerulonephritis).

**Postrenal:** Caused by obstruction to urine flow (kidney stones, enlarged prostate, tumor).

**Oliguric phase:** Urine output less than 400 mL per day. Monitor for hyperkalemia (peaked T waves on ECG), fluid overload, metabolic acidosis.

**Nursing priority:** Strict intake and output monitoring. Daily weight. Restrict potassium, sodium, and fluid.

---

## Normal Lab Values Quick Reference

| Lab Test | Normal Value | Clinical Significance |
|----------|-------------|----------------------|
| Sodium (Na) | 135 to 145 mEq/L | Fluid balance regulation |
| Potassium (K) | 3.5 to 5.0 mEq/L | Cardiac function, muscle activity |
| Hemoglobin | 12 to 17 g/dL | Oxygen carrying capacity |
| Blood glucose (fasting) | 70 to 100 mg/dL | Diabetes screening |
| Creatinine | 0.6 to 1.2 mg/dL | Kidney function |
| BUN | 7 to 20 mg/dL | Kidney function, protein metabolism |
| pH (arterial) | 7.35 to 7.45 | Acid-base balance |

---

## Practice What You Just Learned

Medical-Surgical Nursing has too much content to master through reading alone. You need to practice applying the nursing process to scenario questions across every body system.

Head to LisensyaPrep and start practicing now. No registration required.

**[Practice Medical-Surgical Nursing Questions at LisensyaPrep](https://lisensyaprep.com/nursing)**
`;

export default function MedSurgNursingReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-medsurg-reviewer" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Medical-Surgical Nursing Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (NLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Medical-Surgical Nursing Reviewer for NLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>April 25, 2026</span><span>•</span>
                <span>12 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-nle-medical-surgical.jpg"
              alt="Filipino nurse in teal scrubs holding patient chart in hospital ward for NLE medical surgical nursing reviewer Philippines 2026"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="200" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">The Nursing Process Applied to MedSurg</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="46" y="52" width="124" height="110" fill="#1e3a5f" rx="8"/>
                  <text x="108" y="80" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">ASSESS</text>
                  <text x="108" y="98" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Gather data</text>
                  <text x="108" y="114" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Signs, symptoms</text>
                  <text x="108" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Lab values</text>
                  <text x="108" y="146" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Patient history</text>
                  <rect x="182" y="52" width="124" height="110" fill="#172033" rx="8"/>
                  <text x="244" y="80" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">DIAGNOSE</text>
                  <text x="244" y="98" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Identify problem</text>
                  <text x="244" y="114" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Nursing diagnosis</text>
                  <text x="244" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Priority setting</text>
                  <text x="244" y="146" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Maslow&apos;s hierarchy</text>
                  <rect x="318" y="52" width="124" height="110" fill="#1e3a5f" rx="8"/>
                  <text x="380" y="80" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">PLAN</text>
                  <text x="380" y="98" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Set goals</text>
                  <text x="380" y="114" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Expected outcomes</text>
                  <text x="380" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Nursing orders</text>
                  <text x="380" y="146" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Prioritize care</text>
                  <rect x="454" y="52" width="124" height="110" fill="#14532d" rx="8"/>
                  <text x="516" y="80" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">IMPLEMENT</text>
                  <text x="516" y="98" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">Carry out care</text>
                  <text x="516" y="114" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">Nursing interventions</text>
                  <text x="516" y="130" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">Patient education</text>
                  <text x="516" y="146" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">Medications</text>
                  <rect x="590" y="52" width="124" height="110" fill="#172033" rx="8"/>
                  <text x="652" y="80" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">EVALUATE</text>
                  <text x="652" y="98" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Did it work?</text>
                  <text x="652" y="114" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Compare to goals</text>
                  <text x="652" y="130" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Modify plan</text>
                  <text x="652" y="146" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">as needed</text>
                  <text x="380" y="190" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | NLE Medical-Surgical Nursing Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Apply the nursing process to every MedSurg scenario question</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(MAIN_CONTENT)}
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">Related NLE Articles</h2>
              <ul className="space-y-3">
                {ALL_NLE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-pink-900/20 to-pink-900/10 border border-pink-500/30 rounded-2xl p-6 text-center">
              <p className="text-pink-400 font-extrabold text-lg mb-2">Practice Medical-Surgical Nursing</p>
              <p className="text-gray-400 text-sm mb-4">Free NLE practice questions. No registration required.</p>
              <Link href="/nursing" className="inline-block bg-pink-500 hover:bg-pink-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                🏥 Start Practicing at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">NLE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_NLE_ARTICLES.map(({ text, href }) => (
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
