import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';

export const metadata = buildMetadata({
  title: 'Psychosocial Integrity Reviewer for NCLEX-RN 2026 (Complete Guide)',
  description:
    'Complete NCLEX-RN Psychosocial Integrity reviewer covering mental health disorders, therapeutic communication, crisis intervention, and coping. For Filipino nurses preparing for the 2026 NCLEX.',
  path: '/nursing/psychosocial-integrity-nclex-reviewer',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Psychosocial Integrity Reviewer for NCLEX-RN 2026 Complete Guide',
  description:
    'Comprehensive Psychosocial Integrity reviewer for the NCLEX-RN covering mental health disorders, therapeutic communication, crisis intervention, suicide risk, and coping.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-31',
  dateModified: '2026-05-31',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/psychosocial-integrity-nclex-reviewer' },
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
**Psychosocial Integrity comprises 6-12% of the NCLEX-RN.** This category covers mental health nursing, therapeutic communication, crisis intervention, coping, and the psychological aspects of care. Filipino nurses often find this category challenging because therapeutic communication answers can feel counterintuitive.

This reviewer covers the high-yield Psychosocial Integrity topics tested on the 2026 NCLEX-RN.

---

## Therapeutic Communication (Most Heavily Tested)

The NCLEX heavily tests therapeutic communication. Master which responses are therapeutic and which are not.

### Therapeutic Techniques

- **Active listening** - giving full attention
- **Silence** - allowing time to think
- **Open-ended questions** - "Tell me more about..."
- **Reflection** - "You seem worried"
- **Clarification** - "What do you mean by...?"
- **Restating** - repeating in your own words
- **Acknowledging feelings** - "This must be difficult"
- **Offering self** - "I'll stay with you"
- **Summarizing** - reviewing key points

### Non-Therapeutic Responses (Avoid)

- **False reassurance** - "Everything will be fine"
- **Giving advice** - "You should..."
- **Asking "why"** - sounds accusatory
- **Changing the subject** - avoids the issue
- **Minimizing feelings** - "Don't worry"
- **Being defensive** - dismisses concerns
- **Closed-ended questions** when exploration is needed
- **Approving/disapproving** - judgmental

**NCLEX trick:** The therapeutic answer usually acknowledges feelings and encourages the patient to express more, rather than reassuring, advising, or fixing.

---

## Mental Health Disorders

### Depression

**Signs:** persistent sadness, anhedonia, sleep/appetite changes, fatigue, worthlessness, suicidal ideation.

**Care:** assess suicide risk (highest priority), therapeutic communication, medications (SSRIs - take 4-6 weeks for effect), ECT for severe cases.

**Critical:** Risk of suicide increases when energy improves before mood fully lifts (early treatment phase).

### Bipolar Disorder

**Mania signs:** elevated mood, grandiosity, decreased sleep, rapid speech, risky behavior.

**Care during mania:** calm low-stimulation environment, safety, structure, finger foods (too active to sit), mood stabilizers (lithium, valproate).

### Anxiety Disorders

**Care:** stay with patient, calm approach, deep breathing, grounding techniques. For panic: simple short directions, reduce stimulation.

### Schizophrenia

**Positive symptoms:** hallucinations, delusions, disorganized speech.
**Negative symptoms:** flat affect, social withdrawal, anhedonia.

**Care:** do not argue with delusions/hallucinations but do not reinforce them, ensure safety (especially command hallucinations), antipsychotics.

### Post-Traumatic Stress Disorder (PTSD)

**Signs:** flashbacks, nightmares, hypervigilance, avoidance.

**Care during flashback:** orient to present, ensure safety, calm reassurance, grounding.

---

## Suicide Risk

**Highest priority assessment.** Ask directly: "Are you thinking about harming yourself?" Asking does NOT increase risk.

**Risk factors (SAD PERSONS):** Sex (male), Age (young/old), Depression, Previous attempts, Ethanol/substance use, Rational thinking loss, Social support lacking, Organized plan, No spouse, Sickness.

**Warning signs:** giving away possessions, sudden calmness after depression, talking about death.

**Interventions:** ensure safety (1:1 observation, remove harmful objects), do not leave alone, contract for safety, refer for treatment.

---

## Crisis Intervention

**Crisis:** temporary state of disequilibrium when usual coping fails.

**Care:**
- Ensure safety first
- Stay calm and present
- Help identify the problem
- Explore coping mechanisms
- Identify support systems
- Focus on immediate problem-solving

---

## Defense Mechanisms

- **Denial** - refusing to accept reality
- **Projection** - attributing own feelings to others
- **Regression** - reverting to earlier behavior
- **Rationalization** - making excuses
- **Displacement** - redirecting emotions to safer target
- **Sublimation** - channeling into acceptable activities
- **Repression** - unconscious forgetting
- **Compensation** - overachieving in one area to offset weakness

---

## Substance Use Disorders

### Alcohol Withdrawal

**Timeline:** tremors/anxiety (6-12h), hallucinations (12-24h), seizures (24-48h), delirium tremens (48-72h).

**DTs:** confusion, severe tremor, fever, hallucinations - life-threatening.

**Treatment:** benzodiazepines (CIWA protocol), thiamine, supportive care.

### Opioid Withdrawal

Uncomfortable but not life-threatening: nausea, sweating, muscle aches, anxiety. Treatment: methadone, buprenorphine, supportive care.

---

## Abuse and Neglect

**Mandated reporting** for suspected child abuse, elder abuse (overrides confidentiality).

**Signs of abuse:** injuries in various healing stages, inconsistent explanations, fear, delayed treatment seeking.

**Care:** ensure safety, document objectively, report per law, non-judgmental support, respect autonomy (for competent adults).

---

## End-of-Life Care

**Therapeutic presence:** being with the patient, listening, allowing expression.

**Kübler-Ross stages of grief:** denial, anger, bargaining, depression, acceptance (not linear, not everyone experiences all).

**Care:** comfort, dignity, pain management, family support, respect cultural/spiritual practices.

---

## Common Psychosocial Question Examples

### Example 1: Therapeutic Communication

**Question:** A client says, "I don't think I'll ever get better." The most therapeutic response is:

A. "Of course you will get better."
B. "You should think positively."
C. "Tell me more about what you're feeling."
D. "Everyone feels that way sometimes."

**Answer: C** - Open-ended response encourages expression. Other options are false reassurance, advice, and minimizing.

### Example 2: Suicide Assessment

**Question:** A depressed client states, "I won't be a burden much longer." The nurse should:

A. Reassure the client they're not a burden
B. Ask directly if the client is thinking of suicide
C. Change the subject
D. Document and continue care

**Answer: B** - This statement suggests possible suicidal ideation. Direct assessment is essential and does not increase risk.

---

## Practice Psychosocial Integrity at LisensyaPrep

LisensyaPrep's NCLEX Quiz Module 7 contains **50 practice questions on Psychosocial Integrity**.

**[Start Module 7: Psychosocial Practice](/nclex)**

---

## Related NCLEX Articles

- [Management of Care Reviewer for NCLEX-RN](/nursing/management-of-care-nclex-reviewer)
- [Pharmacology Reviewer for NCLEX-RN](/nursing/pharmacology-nclex-reviewer)
- [Physiological Adaptation Reviewer for NCLEX-RN](/nursing/physiological-adaptation-nclex-reviewer)
- [Health Promotion and Maintenance Reviewer for NCLEX-RN](/nursing/health-promotion-nclex-reviewer)
- [How to Pass the NCLEX on Your First Take](/nursing/how-to-pass-nclex-first-take)
`;

export default function PsychosocialIntegrityNclexPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-psychosocial-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/nursing","name":"Nursing"},{"url":"/nursing/psychosocial-integrity-nclex-reviewer","name":"Psychosocial Integrity Reviewer"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Psychosocial Integrity Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Nursing (NCLEX)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Psychosocial Integrity Reviewer for NCLEX-RN 2026 (Complete Guide)
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
      <ArticlePopupTriggers type="pnle" />
    </div>
  );
}
