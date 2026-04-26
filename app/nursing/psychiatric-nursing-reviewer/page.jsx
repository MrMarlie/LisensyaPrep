import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Psychiatric and Mental Health Nursing Reviewer for NLE Philippines 2026',
  description:
    'Studying for the NLE board exam? This psychiatric nursing reviewer covers therapeutic communication, major psychiatric disorders, psychopharmacology, and crisis intervention tested in the PNLE.',
  path: '/nursing/psychiatric-nursing-reviewer',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Psychiatric and Mental Health Nursing Reviewer for NLE Philippines 2026',
  description:
    'Complete psychiatric nursing reviewer for the Philippine Nurse Licensure Examination covering therapeutic communication, major psychiatric disorders, psychopharmacology, EPS, NMS, and crisis intervention.',
  image: 'https://lisensyaprep.com/images/articles/hero-nle-psychiatric-nursing.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-26',
  dateModified: '2026-04-26',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/psychiatric-nursing-reviewer' },
};

const ALL_NLE_ARTICLES = [
  { text: 'PNLE Coverage 2026 Complete Topic Breakdown', href: '/nursing/pnle-coverage-2026' },
  { text: 'Community Health Nursing Reviewer NLE 2026', href: '/nursing/community-health-nursing-reviewer' },
  { text: 'Medical-Surgical Nursing Reviewer NLE 2026', href: '/nursing/medical-surgical-nursing-reviewer' },
  { text: 'Psychiatric Nursing Reviewer NLE 2026', href: '/nursing/psychiatric-nursing-reviewer' },
  { text: 'Maternal and Child Nursing Reviewer NLE 2026', href: '/nursing/maternal-child-nursing-reviewer' },
  { text: 'PNLE 3-Month Study Plan 2026', href: '/nursing/pnle-3-month-study-plan' },
  { text: 'PNLE Application Guide 2026', href: '/nursing/pnle-application-guide-2026' },
  { text: 'PNLE Passing Rate and Results 2026', href: '/nursing/pnle-passing-rate-results-2026' },
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
Psychiatric and Mental Health Nursing is Part 2C of the PNLE and is one of the subjects that catches many examinees off guard. The content feels different from the rest of clinical nursing because it is less about physical assessments and procedures and more about communication, therapeutic relationships, and understanding how mental illness presents and is treated.

The good news is that psychiatric nursing questions in the NLE follow predictable patterns. If you master therapeutic communication techniques and the major psychiatric disorder profiles, you can answer a large portion of this section confidently.

---

## Therapeutic Communication: The Foundation of Psychiatric Nursing

Therapeutic communication is the single most tested concept in NLE psychiatric nursing. It appears in scenario questions asking what the nurse should say or do in response to a patient's statement or behavior.
`;

const AFTER_SVG1 = `
### How to Answer Therapeutic Communication Questions

When an NLE question asks what the nurse should say, eliminate any option that:
- Gives direct advice
- Uses false reassurance like "everything will be okay"
- Asks "why" questions
- Judges, moralizes, or defends
- Closes off the conversation

The correct answer almost always keeps the conversation open, reflects the patient's feelings, or encourages them to share more.

---

## Major Psychiatric Disorders

### Schizophrenia

Schizophrenia is a chronic psychotic disorder characterized by disturbances in thought, perception, affect, and behavior.

**Positive symptoms** are symptoms added to normal functioning: hallucinations, delusions, disorganized speech, and disorganized behavior. These respond better to antipsychotic medications.

**Negative symptoms** are symptoms that represent a loss of normal functioning: flat affect, alogia (poverty of speech), avolition (lack of motivation), anhedonia (inability to feel pleasure), and social withdrawal. These respond less well to medication.

**Hallucinations** are sensory perceptions without external stimuli. Auditory hallucinations (hearing voices) are most common in schizophrenia. The nurse should acknowledge the patient's experience without reinforcing the hallucination.

Correct response: "I know the voices seem real to you, but I don't hear them. Let's focus on what we can do right now."

**Delusions** are fixed false beliefs not consistent with cultural norms. Do not argue with or reinforce delusions. Redirect to reality without direct confrontation.

**Nursing priority:** Safety. A patient experiencing command hallucinations telling them to harm themselves or others requires immediate safety measures.

### Mood Disorders

**Major Depressive Disorder:**

Key signs: persistent depressed mood, loss of interest (anhedonia), sleep disturbances (usually insomnia but can be hypersomnia), appetite changes, fatigue, feelings of worthlessness, difficulty concentrating, and suicidal ideation.

**Priority nursing assessment:** Assess for suicidal ideation directly. Ask "Are you thinking about hurting yourself or ending your life?" Directly asking about suicide does not plant the idea and is essential for safety planning.

**Nursing interventions:** Establish therapeutic relationship. Stay with the patient. Remove harmful objects from the environment. Administer antidepressants as ordered. Monitor for side effects especially in the first 2 weeks when energy returns before mood improves (this is when suicide risk is highest).

**Bipolar Disorder:**

Characterized by cycles of depression and mania or hypomania.

**Manic episode key signs:** Elevated or expansive mood, decreased need for sleep, pressured speech, grandiosity, increased goal-directed activity, poor judgment, and impulsive behavior.

**Nursing priority during mania:** Safety and meeting basic needs. Manic patients often forget to eat, sleep, or maintain hygiene. Provide high-calorie finger foods they can eat on the move. Reduce environmental stimulation. Set firm consistent limits on unsafe behavior.

### Anxiety Disorders

**Generalized Anxiety Disorder (GAD):** Excessive worry about multiple areas of life for at least 6 months. Physical symptoms: muscle tension, restlessness, fatigue, difficulty concentrating, sleep disturbances.

**Panic Disorder:** Recurrent unexpected panic attacks with fear of future attacks. During a panic attack: stay with the patient, speak calmly in short sentences, assist with controlled breathing, provide a calm quiet environment. Do not leave the patient alone.

**Levels of anxiety:**

Mild anxiety enhances learning and performance.

Moderate anxiety narrows the perceptual field but the patient can still function with direction.

Severe anxiety greatly reduces the perceptual field. The patient focuses only on immediate concerns.

Panic level anxiety disorganizes the individual completely.

### Personality Disorders

**Borderline Personality Disorder (BPD):** Characterized by instability in relationships, self-image, and emotions. Key behaviors: splitting (seeing people as all-good or all-bad), self-harm, impulsivity, intense fear of abandonment, and identity disturbance.

**Nursing approach:** Consistent, firm, and non-rejecting. Maintain consistent limits. Avoid power struggles. Do not allow manipulation of staff through splitting.

**Antisocial Personality Disorder:** Persistent disregard for and violation of rights of others. Manipulative behavior, lack of remorse. Set clear consistent limits. Do not moralize or lecture.

---

## Psychopharmacology for Psychiatric Nursing
`;

const MAIN_CONTENT = `
### Extrapyramidal Side Effects (EPS)

EPS are movement-related side effects from typical antipsychotic medications. These are frequently tested in NLE psychiatric nursing.

**Acute Dystonia:** Sudden, painful muscle spasms, usually of the neck, face, or back. Appears within hours to days of starting medication. Treatment: diphenhydramine (Benadryl) or benztropine (Cogentin) IM.

**Akathisia:** Subjective feeling of restlessness and need to move constantly. Patient appears agitated and cannot sit still. Often mistaken for worsening psychosis. Treatment: reduce dose or switch medication. Beta-blockers may help.

**Pseudoparkinsonism:** Drug-induced Parkinson-like symptoms: tremor, rigidity, bradykinesia, shuffling gait. Treatment: anticholinergic agents like benztropine.

**Tardive Dyskinesia:** Late-onset involuntary repetitive movements, especially of the mouth, tongue, and face (lip smacking, tongue protrusion, grimacing). May be irreversible. Prevention is key: use lowest effective dose, monitor regularly.

### Neuroleptic Malignant Syndrome (NMS)

NMS is a rare but potentially fatal reaction to antipsychotic medications. The NLE tests recognition of this emergency.

Key signs (think FEVER): Fever (high), Encephalopathy (altered consciousness), Vitals unstable (autonomic instability: tachycardia, hypertension), Elevated enzymes (elevated CPK), Rigidity (severe muscle rigidity).

Nursing action: Discontinue the antipsychotic immediately. Notify the physician. Supportive care. This is a medical emergency.

---

## Crisis Intervention

A psychiatric crisis occurs when a person's usual coping mechanisms fail in response to a stressful event, resulting in acute psychological distress and inability to function.

**Principles of crisis intervention:**

Time-limited: Crisis intervention is focused on the immediate problem, not long-term therapy.

Focus on the precipitating event: What happened to trigger this crisis?

Strengthen coping: Help the person identify and use their existing strengths and support systems.

**Levels of intervention:**

Environmental manipulation: Change the situation causing the crisis.

General support: Provide emotional support and validation.

Generic approach: Use techniques effective for most crisis situations.

Individual approach: Tailor intervention to the specific person and crisis.

**Suicidal Ideation Assessment:**

Always assess suicidal ideation directly. Asking does not increase risk. Key factors that increase suicide risk: previous attempts (strongest predictor), specific plan, access to means, hopelessness, substance abuse, social isolation, recent loss.

**Suicide precautions:** One-to-one observation, remove harmful objects, check environment for potential ligature points, document assessment findings.

---

## The Therapeutic Milieu

The therapeutic milieu is the total environment of a psychiatric unit, designed to promote healing and reduce maladaptive behaviors. NLE questions test the principles that guide milieu management.

**Key principles:** Safety must be maintained at all times. Patients participate in their own care and governance. Clear consistent structure and limits reduce anxiety. Community meetings allow patients to address unit concerns.

**Seclusion and restraint** are last resort interventions when a patient poses an imminent danger to self or others. They require a physician order, continuous monitoring, and documentation. The nurse must assess circulation, sensation, and movement at regular intervals.

---

## Practice What You Just Learned

Psychiatric nursing questions in the NLE are scenario-based. The best preparation is answering questions that require you to choose the correct therapeutic response or identify the appropriate nursing priority.

Head to LisensyaPrep and practice now. No account needed.

**[Practice Psychiatric Nursing Questions at LisensyaPrep](https://lisensyaprep.com/nursing)**
`;

export default function PsychiatricNursingReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-psych-reviewer" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Psychiatric Nursing Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (NLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Psychiatric and Mental Health Nursing Reviewer for NLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>April 26, 2026</span><span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-nle-psychiatric-nursing.jpg"
              alt="Young Filipino nurse in white scrubs sitting in calm therapeutic setting for NLE psychiatric nursing reviewer Philippines 2026"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="360" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Therapeutic vs Non-Therapeutic Communication</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="200" y="56" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">THERAPEUTIC TECHNIQUES</text>
                  <text x="560" y="56" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">NON-THERAPEUTIC TECHNIQUES</text>
                  <line x1="380" y1="46" x2="380" y2="348" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="64" width="330" height="34" fill="#14532d" rx="5"/>
                  <text x="120" y="80" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Active Listening</text>
                  <text x="270" y="80" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">Give full attention, maintain eye contact</text>
                  <rect x="390" y="64" width="330" height="34" fill="#7f1d1d" rx="5"/>
                  <text x="490" y="80" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Giving Advice</text>
                  <text x="620" y="80" textAnchor="middle" fill="#fecaca" fontSize="10" fontFamily="Arial,sans-serif">&quot;You should just leave him&quot;</text>
                  <rect x="40" y="104" width="330" height="34" fill="#14532d" rx="5"/>
                  <text x="120" y="120" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Open-Ended Questions</text>
                  <text x="270" y="120" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">&quot;Tell me more about how you feel&quot;</text>
                  <rect x="390" y="104" width="330" height="34" fill="#7f1d1d" rx="5"/>
                  <text x="490" y="120" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Giving False Reassurance</text>
                  <text x="620" y="120" textAnchor="middle" fill="#fecaca" fontSize="10" fontFamily="Arial,sans-serif">&quot;Everything will be fine, don&apos;t worry&quot;</text>
                  <rect x="40" y="144" width="330" height="34" fill="#14532d" rx="5"/>
                  <text x="120" y="160" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Reflection</text>
                  <text x="270" y="160" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">Mirror feelings back: &quot;You sound angry&quot;</text>
                  <rect x="390" y="144" width="330" height="34" fill="#7f1d1d" rx="5"/>
                  <text x="490" y="160" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Changing the Subject</text>
                  <text x="620" y="160" textAnchor="middle" fill="#fecaca" fontSize="10" fontFamily="Arial,sans-serif">Avoids the patient&apos;s concern entirely</text>
                  <rect x="40" y="184" width="330" height="34" fill="#14532d" rx="5"/>
                  <text x="120" y="200" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Clarification</text>
                  <text x="270" y="200" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">&quot;I&apos;m not sure I understand, can you explain?&quot;</text>
                  <rect x="390" y="184" width="330" height="34" fill="#7f1d1d" rx="5"/>
                  <text x="490" y="200" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Passing Judgment</text>
                  <text x="620" y="200" textAnchor="middle" fill="#fecaca" fontSize="10" fontFamily="Arial,sans-serif">&quot;That was wrong of you to do&quot;</text>
                  <rect x="40" y="224" width="330" height="34" fill="#14532d" rx="5"/>
                  <text x="120" y="240" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Silence</text>
                  <text x="270" y="240" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">Allows patient time to think and express</text>
                  <rect x="390" y="224" width="330" height="34" fill="#7f1d1d" rx="5"/>
                  <text x="490" y="240" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Why Questions</text>
                  <text x="620" y="240" textAnchor="middle" fill="#fecaca" fontSize="10" fontFamily="Arial,sans-serif">&quot;Why did you do that?&quot; puts patient on defense</text>
                  <rect x="40" y="264" width="330" height="34" fill="#14532d" rx="5"/>
                  <text x="120" y="280" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Focusing</text>
                  <text x="270" y="280" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">Helps patient explore a specific concern</text>
                  <rect x="390" y="264" width="330" height="34" fill="#7f1d1d" rx="5"/>
                  <text x="490" y="280" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Defending</text>
                  <text x="620" y="280" textAnchor="middle" fill="#fecaca" fontSize="10" fontFamily="Arial,sans-serif">Defending staff or institution when patient criticizes</text>
                  <rect x="40" y="304" width="330" height="34" fill="#14532d" rx="5"/>
                  <text x="120" y="320" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Accepting</text>
                  <text x="270" y="320" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">&quot;I hear what you are saying&quot;</text>
                  <rect x="390" y="304" width="330" height="34" fill="#7f1d1d" rx="5"/>
                  <text x="490" y="320" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Agreeing or Disagreeing</text>
                  <text x="620" y="320" textAnchor="middle" fill="#fecaca" fontSize="10" fontFamily="Arial,sans-serif">Closes off further exploration of feelings</text>
                  <text x="380" y="352" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | NLE Psychiatric Nursing Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Therapeutic vs non-therapeutic communication techniques for the NLE</figcaption>
              </figure>

              {renderContent(AFTER_SVG1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="300" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Psychiatric Medications: Key Points for NLE</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="160" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">DRUG CLASS</text>
                  <text x="360" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">EXAMPLES</text>
                  <text x="580" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">KEY NURSING CONSIDERATIONS</text>
                  <line x1="40" y1="64" x2="720" y2="64" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="70" width="680" height="38" fill="#1e3a5f" rx="5"/>
                  <text x="160" y="86" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Typical Antipsychotics</text>
                  <text x="160" y="100" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">(First generation)</text>
                  <text x="360" y="93" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Haloperidol, Chlorpromazine</text>
                  <text x="580" y="86" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">EPS side effects: tardive dyskinesia, akathisia,</text>
                  <text x="580" y="100" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">dystonia. Monitor for NMS (neuroleptic malignant syndrome)</text>
                  <rect x="40" y="114" width="680" height="38" fill="#172033" rx="5"/>
                  <text x="160" y="130" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Atypical Antipsychotics</text>
                  <text x="160" y="144" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">(Second generation)</text>
                  <text x="360" y="137" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Risperidone, Clozapine, Olanzapine</text>
                  <text x="580" y="130" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Clozapine: monitor WBC weekly (agranulocytosis risk).</text>
                  <text x="580" y="144" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Metabolic side effects: weight gain, diabetes risk</text>
                  <rect x="40" y="158" width="680" height="38" fill="#1e3a5f" rx="5"/>
                  <text x="160" y="174" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Antidepressants (SSRIs)</text>
                  <text x="160" y="188" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Most commonly prescribed</text>
                  <text x="360" y="181" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Fluoxetine, Sertraline, Paroxetine</text>
                  <text x="580" y="174" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Take 2 to 4 weeks for full effect. Monitor suicide risk</text>
                  <text x="580" y="188" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">in first weeks. Serotonin syndrome risk with MAOIs</text>
                  <rect x="40" y="202" width="680" height="38" fill="#14532d" rx="5"/>
                  <text x="160" y="218" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Mood Stabilizers</text>
                  <text x="160" y="232" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">For bipolar disorder</text>
                  <text x="360" y="225" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Lithium, Valproic acid, Carbamazepine</text>
                  <text x="580" y="218" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Lithium: narrow therapeutic index (0.6 to 1.2 mEq/L).</text>
                  <text x="580" y="232" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Monitor levels. Toxicity: tremors, nausea, confusion</text>
                  <rect x="40" y="246" width="680" height="38" fill="#172033" rx="5"/>
                  <text x="160" y="262" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Benzodiazepines</text>
                  <text x="160" y="276" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">For anxiety</text>
                  <text x="360" y="269" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Diazepam, Lorazepam, Alprazolam</text>
                  <text x="580" y="262" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Risk of dependence. Do not stop abruptly.</text>
                  <text x="580" y="276" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">CNS depression. Avoid with alcohol.</text>
                  <text x="380" y="292" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | NLE Psychiatric Nursing Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Psychiatric medications and key nursing considerations for the NLE</figcaption>
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
              <p className="text-pink-400 font-extrabold text-lg mb-2">Practice Psychiatric Nursing</p>
              <p className="text-gray-400 text-sm mb-4">Free NLE practice questions. No account required.</p>
              <Link href="/nursing" className="inline-block bg-pink-500 hover:bg-pink-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
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
