import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Safety and Infection Control Reviewer for NCLEX-RN 2026 (Complete Guide)',
  description:
    'Complete NCLEX-RN Safety and Infection Control reviewer covering precautions, PPE, restraints, fall prevention, and emergency response. For Filipino nurses preparing for the 2026 NCLEX.',
  path: '/nursing/safety-infection-prevention-nclex',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Safety and Infection Control Reviewer for NCLEX-RN 2026 Complete Guide',
  description:
    'Comprehensive Safety and Infection Control reviewer for the NCLEX-RN covering transmission-based precautions, PPE, restraints, fall prevention, and emergency response.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-31',
  dateModified: '2026-05-31',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/safety-infection-prevention-nclex' },
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
**Safety and Infection Control comprises 10-16% of the NCLEX-RN.** This category tests your ability to prevent harm and infection, two of the most important responsibilities in nursing. The NCLEX heavily emphasizes infection precautions, which Filipino nurses must master in their US-standardized forms.

This reviewer covers all major Safety and Infection Control topics tested on the 2026 NCLEX-RN.

---

## Transmission-Based Precautions (Most Heavily Tested)

Master the three types of transmission-based precautions and which diseases require each.

### Standard Precautions (All Patients)

Applied to ALL patients regardless of diagnosis:
- Hand hygiene before and after every patient contact
- Gloves when touching body fluids
- Gown, mask, eye protection when splashing is likely
- Safe injection practices
- Proper disposal of sharps

**Assume all body fluids (except sweat) are potentially infectious.**

### Contact Precautions

**For:** MRSA, VRE, C. difficile, RSV, scabies, wound infections, multidrug-resistant organisms.

**Requirements:**
- Private room (or cohort with same infection)
- Gown and gloves for all contact
- Dedicated equipment
- Hand hygiene (soap and water for C. diff - alcohol does not kill spores)

### Droplet Precautions

**For:** Influenza, pertussis, meningitis, mumps, rubella, pneumonia.

**Requirements:**
- Private room (or cohort)
- Surgical mask within 3-6 feet
- Patient wears mask during transport

### Airborne Precautions

**For:** Tuberculosis, measles (rubeola), varicella (chickenpox), disseminated zoster.

**Requirements:**
- Negative pressure room (AIIR)
- N95 respirator (fit-tested)
- Door kept closed
- Patient wears surgical mask during transport

**Memory aid for airborne: "My Chicken Has TB" (Measles, Chickenpox, Herpes zoster, TB)**

### Protective (Reverse) Isolation

**For:** severely immunocompromised patients (HSCT, neutropenia).

**Requirements:**
- Positive pressure room with HEPA filtration
- No fresh flowers, raw fruits/vegetables
- No sick visitors
- Strict hand hygiene

---

## Personal Protective Equipment (PPE)

### Donning (Putting On) Order

1. Gown
2. Mask/respirator
3. Goggles/face shield
4. Gloves

### Doffing (Removing) Order

1. Gloves (most contaminated)
2. Goggles/face shield
3. Gown
4. Mask/respirator

**Then perform hand hygiene immediately.**

**NCLEX trick:** Gloves come off FIRST when doffing because they are most contaminated.

---

## Hand Hygiene

The single most effective infection prevention practice.

**WHO Five Moments:**
1. Before patient contact
2. Before aseptic task
3. After body fluid exposure risk
4. After patient contact
5. After contact with patient surroundings

**Alcohol-based hand rub** is effective for most situations EXCEPT:
- C. difficile (use soap and water - spores resist alcohol)
- Visibly soiled hands (use soap and water)

---

## Patient Safety

### Patient Identification

Always use **two identifiers** (name and date of birth, or name and medical record number). Never use room number alone.

### Fall Prevention

**Assessment tools:** Morse Fall Scale, Hendrich II.

**Interventions:**
- Bed in low position
- Call light within reach
- Non-slip footwear
- Scheduled toileting
- Bed/chair alarms for high-risk
- Adequate lighting
- Clear pathways

### Restraints

**Last resort** after less restrictive measures fail.

**Requirements:**
- Provider order (time-limited, renewed per protocol)
- Cannot be PRN (as needed) orders
- Monitor every 2 hours (circulation, skin, ROM, toileting)
- Tie to bed frame, NOT side rails
- Document need, type, monitoring, and attempts at alternatives

**Restraint alternatives:** sitters, family presence, frequent reorientation, addressing underlying causes (pain, hypoxia, full bladder), covering lines with clothing.

---

## Emergency Response

### Fire Safety: RACE

- **R**escue patients in immediate danger
- **A**larm (pull alarm, call code)
- **C**onfine (close doors)
- **E**xtinguish (if small and safe)

### Fire Extinguisher: PASS

- **P**ull the pin
- **A**im at the base
- **S**queeze the handle
- **S**weep side to side

### Disaster Triage

In mass casualties, tag patients:
- **Red:** immediate (life-threatening but survivable)
- **Yellow:** delayed (serious but stable)
- **Green:** minor (walking wounded)
- **Black:** expectant (deceased or non-survivable)

---

## Medication Safety

### High-Alert Medications

Require double verification: heparin, insulin, opioids, concentrated electrolytes (potassium chloride), chemotherapy, neuromuscular blockers.

### Rights of Medication Administration

Right patient, medication, dose, route, time (plus right documentation, reason, response).

### Look-Alike/Sound-Alike Drugs

Use tall man lettering to differentiate (hydrOXYzine vs hydrALAZINE).

---

## Surgical Asepsis (Sterile Technique)

**Principles:**
- Only sterile touches sterile
- Keep sterile field in view (turn back = contaminated)
- 1-inch border of sterile field is non-sterile
- Items below waist are non-sterile
- Do not reach over sterile field
- Hold sterile items above waist

---

## Common Safety Question Examples

### Example 1: Precaution Type

**Question:** A client with active tuberculosis requires which type of precautions?

A. Contact
B. Droplet
C. Airborne
D. Standard only

**Answer: C** - TB requires airborne precautions with negative pressure room and N95 respirator.

### Example 2: C. diff Hand Hygiene

**Question:** After caring for a client with C. difficile, the nurse should:

A. Use alcohol-based hand rub
B. Wash hands with soap and water
C. No hand hygiene needed if gloves were worn
D. Use hand lotion only

**Answer: B** - C. diff spores resist alcohol. Soap and water physically removes spores.

### Example 3: PPE Removal

**Question:** When removing PPE, which item is removed first?

A. Gown
B. Mask
C. Gloves
D. Goggles

**Answer: C** - Gloves are removed first because they are most contaminated.

---

## Practice Safety and Infection Control at LisensyaPrep

LisensyaPrep's NCLEX Quiz Module 3 contains **50 practice questions on Safety and Infection Prevention and Control**.

**[Start Module 3: Safety Practice](/nclex)**

---

## Related NCLEX Articles

- [Management of Care Reviewer for NCLEX-RN](/nursing/management-of-care-nclex-reviewer)
- [Pharmacology Reviewer for NCLEX-RN](/nursing/pharmacology-nclex-reviewer)
- [Physiological Adaptation Reviewer for NCLEX-RN](/nursing/physiological-adaptation-nclex-reviewer)
- [How to Pass the NCLEX on Your First Take](/nursing/how-to-pass-nclex-first-take)
- [NCLEX 2026 Coverage and Test Plan Changes](/nursing/nclex-2026-coverage)
`;

export default function SafetyInfectionNclexPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-safety-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Safety and Infection Control Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Nursing (NCLEX)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Safety and Infection Control Reviewer for NCLEX-RN 2026 (Complete Guide)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 31, 2026</span><span>•</span>
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
    </div>
  );
}
