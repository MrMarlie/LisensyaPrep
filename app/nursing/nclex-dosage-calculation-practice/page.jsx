import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';

export const metadata = buildMetadata({
  title: 'NCLEX Dosage Calculation Practice 2026 (Formulas, Problems, Solutions)',
  description:
    'NCLEX dosage calculation practice with formulas, worked examples, and practice problems. Master IV drip rates, weight-based dosing, and unit conversions for the 2026 NCLEX-RN.',
  path: '/nursing/nclex-dosage-calculation-practice',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'NCLEX Dosage Calculation Practice 2026 Formulas Problems and Solutions',
  description:
    'NCLEX dosage calculation practice with formulas, worked examples, and practice problems covering IV drip rates, weight-based dosing, and unit conversions for the NCLEX-RN.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-06-01',
  dateModified: '2026-06-01',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/nclex-dosage-calculation-practice' },
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
  { text: 'NCLEX Dosage Calculation Practice 2026', href: '/nursing/nclex-dosage-calculation-practice' },
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
Dosage calculation questions appear on every NCLEX-RN. While the math itself is basic arithmetic, calculation errors in nursing can be fatal, so the NCLEX tests whether you can compute accurately under pressure. The good news: dosage calculations follow predictable formulas. Master them and these become guaranteed points.

This guide gives you every formula, worked examples, and practice problems with full solutions.

---

## The Golden Rule: Always Label Your Units

Most dosage calculation errors come from mismatched units. Before any calculation:

1. Write down what you have (available)
2. Write down what you want (ordered)
3. Make sure units match (convert if needed)
4. Label every number with its unit
5. Double-check that your answer makes clinical sense

A dose of 50 tablets or 0.0001 mL should immediately signal an error.

---

## Essential Conversions to Memorize

| Conversion | Equivalent |
|------------|------------|
| 1 kg | 2.2 lbs |
| 1 g | 1,000 mg |
| 1 mg | 1,000 mcg |
| 1 L | 1,000 mL |
| 1 tsp | 5 mL |
| 1 tbsp | 15 mL |
| 1 oz | 30 mL |
| 1 grain (gr) | 60 mg |
| 1 cup | 240 mL |

---

## Formula 1: Basic Dose Calculation

**Formula:** (Dose Desired / Dose Available) × Quantity = Amount to Give

This is written as **D/H × Q** (Desired over Have, times Quantity).

### Worked Example 1

**Order:** Acetaminophen 650 mg PO. **Available:** 325 mg tablets.

(650 mg / 325 mg) × 1 tablet = **2 tablets**

### Worked Example 2

**Order:** Amoxicillin 500 mg PO. **Available:** 250 mg/5 mL suspension.

(500 mg / 250 mg) × 5 mL = **10 mL**

### Worked Example 3

**Order:** Furosemide 30 mg IV. **Available:** 40 mg/4 mL vial.

(30 mg / 40 mg) × 4 mL = **3 mL**

---

## Formula 2: Weight-Based Dosing

Many medications, especially in pediatrics, are dosed by body weight.

**Step 1:** Convert pounds to kilograms (lbs ÷ 2.2 = kg)
**Step 2:** Multiply weight by the dose per kg

### Worked Example 4

**Order:** Medication 5 mg/kg/day. **Client weighs:** 132 lbs.

132 ÷ 2.2 = 60 kg
60 kg × 5 mg/kg = **300 mg/day**

### Worked Example 5

**Order:** Acetaminophen 10 mg/kg per dose. **Child weighs:** 22 lbs.

22 ÷ 2.2 = 10 kg
10 kg × 10 mg/kg = **100 mg per dose**

### Worked Example 6 (Two-Step)

**Order:** Medication 15 mg/kg/day divided into 3 doses. **Client weighs:** 88 lbs.

88 ÷ 2.2 = 40 kg
40 kg × 15 mg/kg = 600 mg/day
600 mg ÷ 3 doses = **200 mg per dose**

---

## Formula 3: IV Drip Rate (Drops per Minute)

When an IV runs by gravity (not a pump), you calculate drops per minute using the tubing's drop factor.

**Formula:** (Total Volume in mL / Time in minutes) × Drop Factor = gtt/min

Common drop factors: 10, 15, 20 (macrodrip), 60 (microdrip) gtt/mL.

### Worked Example 7

**Order:** 1,000 mL over 8 hours. **Drop factor:** 15 gtt/mL.

8 hours × 60 = 480 minutes
(1,000 mL / 480 min) × 15 gtt/mL = 31.25 → **31 gtt/min**

(Always round drip rates to the nearest whole number; you cannot give a partial drop.)

### Worked Example 8

**Order:** 500 mL over 4 hours. **Drop factor:** 20 gtt/mL.

4 hours × 60 = 240 minutes
(500 mL / 240 min) × 20 gtt/mL = 41.6 → **42 gtt/min**

### Worked Example 9 (Microdrip Shortcut)

With a microdrip set (60 gtt/mL), the gtt/min equals the mL/hr.

**Order:** 100 mL over 1 hour with 60 gtt/mL.

(100 / 60) × 60 = **100 gtt/min** (same as the mL/hr rate)

---

## Formula 4: IV Pump Rate (mL per Hour)

Pumps are set in mL/hour.

**Formula:** Total Volume / Time in hours = mL/hour

### Worked Example 10

**Order:** 1,000 mL over 8 hours.

1,000 / 8 = **125 mL/hour**

### Worked Example 11

**Order:** 50 mL over 30 minutes.

30 minutes = 0.5 hours
50 / 0.5 = **100 mL/hour**

---

## Formula 5: IV Infusion Time

**Formula:** Total Volume / Rate (mL/hr) = Time in hours

### Worked Example 12

**Infusing:** 1,000 mL at 125 mL/hour.

1,000 / 125 = **8 hours**

---

## Formula 6: Units-Based Calculations (Heparin, Insulin)

High-alert medications like heparin are often ordered in units.

### Worked Example 13

**Order:** Heparin 5,000 units SubQ. **Available:** 10,000 units/mL.

(5,000 / 10,000) × 1 mL = **0.5 mL**

### Worked Example 14 (Heparin Infusion)

**Order:** Heparin 1,000 units/hour. **Available:** 25,000 units in 500 mL.

First find concentration: 25,000 units / 500 mL = 50 units/mL
1,000 units/hr ÷ 50 units/mL = **20 mL/hour**

---

## Practice Problems (Solutions Below)

Try these before checking the answers.

**Problem 1:** Order: Digoxin 0.25 mg PO. Available: 0.125 mg tablets. How many tablets?

**Problem 2:** Order: Cefazolin 1 g IV. Available: 500 mg/mL after reconstitution. How many mL?

**Problem 3:** Client weighs 176 lbs. Order: Medication 3 mg/kg. How many mg?

**Problem 4:** Order: 1,500 mL over 12 hours. Drop factor 15 gtt/mL. How many gtt/min?

**Problem 5:** Order: 250 mL over 2 hours via pump. What mL/hour?

**Problem 6:** Order: Heparin 8,000 units SubQ. Available: 20,000 units/mL. How many mL?

**Problem 7:** Child weighs 33 lbs. Order: 20 mg/kg/day divided into 2 doses. How many mg per dose?

**Problem 8:** Order: 1,000 mL at 100 mL/hour. How many hours to infuse?

---

## Practice Problem Solutions

**Solution 1:** (0.25 / 0.125) × 1 = **2 tablets**

**Solution 2:** 1 g = 1,000 mg. (1,000 / 500) × 1 = **2 mL**

**Solution 3:** 176 ÷ 2.2 = 80 kg. 80 × 3 = **240 mg**

**Solution 4:** 12 × 60 = 720 min. (1,500 / 720) × 15 = 31.25 → **31 gtt/min**

**Solution 5:** 250 / 2 = **125 mL/hour**

**Solution 6:** (8,000 / 20,000) × 1 = **0.4 mL**

**Solution 7:** 33 ÷ 2.2 = 15 kg. 15 × 20 = 300 mg/day. 300 ÷ 2 = **150 mg per dose**

**Solution 8:** 1,000 / 100 = **10 hours**

---

## NCLEX Dosage Calculation Tips

**1. Use the on-screen calculator.** The NCLEX provides one. Do not do complex math in your head.

**2. Read the question twice.** Note whether it asks for mL, gtt/min, mg, or mL/hour.

**3. Watch the units.** Convert g to mg, lbs to kg, hours to minutes before calculating.

**4. Round correctly.** Drip rates (gtt/min) round to whole numbers. Some answers want one or two decimal places. Read the instructions.

**5. Sanity-check your answer.** 50 tablets or 0.001 mL signals an error. Re-do the calculation.

**6. Know your high-alert medications.** Heparin, insulin, and potassium calculations require extra care and often double verification.

---

## Practice More at LisensyaPrep

LisensyaPrep's NCLEX Quiz Module 1 (Pharmacology) includes dosage calculation questions in the boss-battle format, with full solutions for every problem.

**[Practice NCLEX Dosage Calculations at LisensyaPrep](/nclex)**

---

## Frequently Asked Questions

**Can I use a calculator on the NCLEX?**
Yes. The NCLEX provides an on-screen calculator for dosage calculation questions.

**How many dosage calculation questions are on the NCLEX?**
The number varies because of the adaptive format, but expect several calculation questions distributed through the Pharmacological Therapies category.

**What is the most common calculation error?**
Mismatched units (forgetting to convert lbs to kg, or g to mg) and rounding incorrectly.

**Do I round drip rates up or down?**
Round to the nearest whole number using standard rounding rules (0.5 and above rounds up).

**What formula should I memorize first?**
The basic D/H × Q (Desired over Have times Quantity) formula, as it underlies most calculations.

---

## Related NCLEX Articles

- [Pharmacology Reviewer for NCLEX-RN](/nursing/pharmacology-nclex-reviewer)
- [NCLEX Lab Values Cheat Sheet](/nursing/nclex-lab-values-cheat-sheet)
- [How to Pass the NCLEX on Your First Take](/nursing/how-to-pass-nclex-first-take)
- [NCLEX 2026 Coverage and Test Plan Changes](/nursing/nclex-2026-coverage)
- [What is the NCLEX? Complete Guide for Filipino Nurses](/nursing/what-is-the-nclex)
`;

export default function NclexDosageCalculationPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-dosage-calc-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/nursing","name":"Nursing"},{"url":"/nursing/nclex-dosage-calculation-practice","name":"NCLEX Dosage Calculation Practice"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">NCLEX Dosage Calculation Practice</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Nursing (NCLEX)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                NCLEX Dosage Calculation Practice 2026 (Formulas, Problems, and Solutions)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>June 1, 2026</span><span>•</span>
                <span>12 min read</span>
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
