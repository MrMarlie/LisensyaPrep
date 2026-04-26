import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Maternal and Child Nursing Reviewer for NLE Philippines 2026 (Complete Guide)',
  description:
    'Studying for the NLE? This maternal and child nursing reviewer covers antepartum care, stages of labor, postpartum care, newborn assessment, APGAR scoring, and child health tested in the PNLE.',
  path: '/nursing/maternal-child-nursing-reviewer',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Maternal and Child Nursing Reviewer for NLE Philippines 2026',
  description:
    'Complete maternal and child nursing reviewer for the Philippine Nurse Licensure Examination covering antepartum care, stages of labor, postpartum care, APGAR scoring, newborn care, and child development milestones.',
  image: 'https://lisensyaprep.com/images/articles/hero-nle-maternal-child-nursing.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-26',
  dateModified: '2026-04-26',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/maternal-child-nursing-reviewer' },
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
Maternal and Child Nursing covers two of the most life-affirming areas of clinical practice: the care of women through pregnancy, labor, and the postpartum period, and the care of children from the newborn stage through adolescence.

For the NLE, this subject rewards examinees who understand the normal sequence of events clearly because most questions test whether you can identify what is normal, recognize what is abnormal, and know the correct nursing response to each. This reviewer covers the highest-yield topics across the maternal and child nursing spectrum.

---

## Antepartum Care: The Pregnant Patient

### Naegele's Rule: Estimating Delivery Date

Naegele's rule calculates the estimated date of delivery (EDD) and appears consistently in NLE maternal nursing questions.

**Formula:** Take the first day of the last menstrual period (LMP). Subtract 3 months. Add 7 days. Add 1 year.

**Example:** If the LMP is September 10, 2025. Subtract 3 months = June 10. Add 7 days = June 17. Add 1 year = June 17, 2026.

### Prenatal Visit Schedule

| Gestational Age | Visit Frequency |
|----------------|----------------|
| Up to 28 weeks | Once a month |
| 28 to 36 weeks | Every 2 weeks |
| 36 weeks to delivery | Weekly |

### Danger Signs of Pregnancy

The NLE tests whether examinees can distinguish normal pregnancy discomforts from danger signs requiring immediate medical attention.

**Danger signs that require immediate reporting:**

Sudden gush or continuous leaking of fluid from the vagina (premature rupture of membranes)

Vaginal bleeding at any stage of pregnancy

Severe persistent headache with visual disturbances and edema (signs of pre-eclampsia)

Epigastric pain (upper abdominal pain, a sign of HELLP syndrome or severe pre-eclampsia)

Decreased or absent fetal movement after 28 weeks

Painful uterine contractions before 37 weeks (preterm labor)

Fever with chills

### Preeclampsia and Eclampsia

**Pre-eclampsia** is defined as hypertension (BP 140/90 or higher on two occasions at least 4 hours apart) occurring after 20 weeks of gestation, accompanied by proteinuria or end-organ damage.

**Severe features** include BP of 160/110 or higher, severe headache, visual disturbances, epigastric pain, thrombocytopenia, and impaired liver function.

**Eclampsia** is the onset of seizures in a woman with pre-eclampsia without another cause.

**Nursing priority:** Magnesium sulfate is the drug of choice for seizure prevention and treatment in eclampsia. Monitor for magnesium toxicity: loss of deep tendon reflexes (first sign), respiratory depression, and cardiac arrest. Antidote for magnesium toxicity: calcium gluconate (keep at bedside).

---

## Intrapartum Care: Labor and Delivery

### The Four Ps of Labor

The four factors that determine the course of labor are the Powers, Passage, Passenger, and Psyche.

**Powers** are the uterine contractions and maternal pushing effort.

**Passage** is the bony pelvis and soft tissues.

**Passenger** refers to the fetus, including its size, position, and presentation.

**Psyche** refers to the mother's psychological state and readiness.

### Stages of Labor
`;

const AFTER_SVG1 = `
### Fetal Heart Rate Monitoring

Normal fetal heart rate is 110 to 160 beats per minute.

**Early decelerations:** Uniform, mirror image of contractions. Caused by fetal head compression during contractions. Benign finding. No intervention needed.

**Variable decelerations:** Abrupt decrease in FHR. Caused by umbilical cord compression. Intervention: change maternal position (left lateral or knee-chest), administer oxygen, increase IV fluid.

**Late decelerations:** Begin after the peak of a contraction and return to baseline after the contraction ends. Caused by uteroplacental insufficiency. Ominous sign. Immediate intervention: turn patient to left lateral position, stop oxytocin if infusing, administer oxygen, notify physician, prepare for emergency delivery if unresolved.

---

## Postpartum Care

### Normal Postpartum Assessment (BUBBLE-LE)

The BUBBLE-LE acronym covers all postpartum assessment areas:

**B** reasts: Check for engorgement, nipple condition, and breastfeeding latch.

**U** terus: Should be firm, midline, at the umbilicus on day 1, descending 1 cm per day. A boggy uterus indicates atony and risk of hemorrhage.

**B** ladder: Encourage voiding every 2 to 3 hours. Urinary retention is common postpartum. Full bladder displaces the uterus and prevents it from contracting properly.

**B** owels: Return of bowel sounds, first bowel movement expected within 2 to 3 days.

**L** ochia: Normal progression from rubra (red, days 1 to 3) to serosa (pink-brown, days 4 to 10) to alba (white-yellow, days 11 to 6 weeks). Heavy saturating bright red bleeding is abnormal.

**E** pisiotomy or perineum: Inspect for redness, edema, ecchymosis, discharge, and approximation (REEDA).

**Lower extremities:** Check for Homans' sign (calf pain on dorsiflexion), redness, warmth, and swelling indicating possible deep vein thrombosis.

**E** motional status: Screen for postpartum blues (days 1 to 5, self-limiting), postpartum depression (persists beyond 2 weeks), and postpartum psychosis (rare but requires immediate intervention).

### Postpartum Hemorrhage (PPH)

PPH is blood loss of more than 500 mL after vaginal delivery or more than 1,000 mL after cesarean section. It is the leading cause of maternal mortality worldwide and one of the most tested postpartum complications in the NLE.

**Most common cause: Uterine atony** (failure of the uterus to contract after delivery).

**Nursing interventions for PPH:** Fundal massage to stimulate uterine contraction. Administer oxytocin as ordered. Monitor vital signs frequently. Establish large bore IV access. Prepare for blood transfusion if needed.

**4 Ts of PPH causes:** Tone (atony), Trauma (lacerations), Tissue (retained placenta), Thrombin (coagulation disorders).

---

## Newborn Assessment

### APGAR Scoring

The APGAR score is performed at 1 minute and 5 minutes after birth to assess newborn adaptation to extrauterine life.
`;

const MAIN_CONTENT = `
### Immediate Newborn Care

The first minutes after birth are critical. Know the sequence of immediate newborn care for the NLE:

**1. Dry and stimulate:** Immediately dry the newborn with a warm towel. Stimulate by rubbing the back or flicking the soles of the feet if the baby does not cry spontaneously.

**2. Assess breathing:** If breathing is present and heart rate is above 100 bpm, continue with routine care.

**3. Cord clamping:** Delayed cord clamping (30 to 60 seconds after birth) is now recommended. It allows transfer of blood from the placenta to the newborn, improving iron stores.

**4. Skin-to-skin contact:** Place the newborn on the mother's chest immediately after birth to promote bonding and breastfeeding initiation.

**5. Eye prophylaxis:** Erythromycin ophthalmic ointment is instilled in both eyes within 1 hour of birth to prevent ophthalmia neonatorum (gonococcal eye infection).

**6. Vitamin K injection:** Vitamin K (phytonadione) is given IM to prevent hemorrhagic disease of the newborn because newborns are born with very low Vitamin K levels.

**7. BCG and Hepatitis B vaccines:** Given within the first 24 hours of life per the Philippine EPI schedule.

---

## Child Health: Growth and Development Milestones

Growth and development milestones appear regularly in the child health section of the NLE. Know the key milestones by age group.

| Age | Motor Milestone | Language Milestone |
|-----|----------------|-------------------|
| 2 months | Lifts head when prone | Coos, social smile |
| 4 months | Holds head steady, rolls front to back | Laughs, babbles |
| 6 months | Sits with support, rolls both ways | Babbles consonant sounds |
| 9 months | Sits without support, pulls to stand | Says mama and dada non-specifically |
| 12 months | Walks with support, pincer grasp | First words, says mama and dada specifically |
| 18 months | Walks independently, stacks 2 to 3 blocks | 10 to 20 words, points to body parts |
| 2 years | Runs, kicks a ball, stacks 6 blocks | 2-word phrases, 50 or more words |
| 3 years | Rides tricycle, climbs stairs alternating feet | 3-word sentences, strangers understand 75% |

### Common Childhood Illnesses

**Dengue fever:** Transmitted by Aedes aegypti mosquito. Classic presentation: sudden high fever, severe headache, retro-orbital pain, myalgia, arthralgia, and rash. Warning signs of severe dengue: abdominal pain, persistent vomiting, rapid breathing, bleeding, restlessness, and sudden decrease in temperature with profuse sweating. Nursing priority: monitor platelet count, watch for hemorrhagic signs.

**Measles (Rubeola):** Characterized by the 3 Cs: cough, coryza (runny nose), and conjunctivitis. Koplik's spots (white spots on buccal mucosa) appear 2 to 3 days before the rash. Rash begins on the face and spreads downward.

---

## Practice What You Just Learned

Maternal and child nursing covers a wide range of content from Naegele's rule to APGAR scoring to childhood milestones. Practice is what ties all of it together.

Head to LisensyaPrep and start answering questions now. No account needed.

**[Practice Maternal and Child Nursing Questions at LisensyaPrep](https://lisensyaprep.com/nursing)**
`;

export default function MaternalChildNursingReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-mcn-reviewer" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Maternal and Child Nursing Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (NLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Maternal and Child Nursing Reviewer for NLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>April 26, 2026</span><span>•</span>
                <span>12 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-nle-maternal-child-nursing.jpg"
              alt="Young Filipino nurse in white uniform gently holding a newborn baby for NLE maternal and child nursing reviewer Philippines 2026"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="300" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Four Stages of Labor</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="54" fill="#1e3a5f" rx="8"/>
                  <text x="160" y="72" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">FIRST STAGE</text>
                  <text x="160" y="90" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Onset to full dilation (10 cm)</text>
                  <text x="490" y="68" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Latent phase: 0 to 3 cm. Active phase: 4 to 7 cm (1 cm/hr primip, 1.5 cm/hr multip).</text>
                  <text x="490" y="84" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Transition phase: 8 to 10 cm. Most intense contractions. Longest overall stage.</text>
                  <rect x="40" y="110" width="680" height="54" fill="#172033" rx="8"/>
                  <text x="160" y="132" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">SECOND STAGE</text>
                  <text x="160" y="150" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Full dilation to birth of baby</text>
                  <text x="490" y="132" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Active pushing begins. Up to 2 hours for primipara, 1 hour for multipara.</text>
                  <text x="490" y="148" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Monitor fetal heart rate closely. Crowning occurs just before birth.</text>
                  <rect x="40" y="170" width="680" height="54" fill="#14532d" rx="8"/>
                  <text x="160" y="192" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">THIRD STAGE</text>
                  <text x="160" y="210" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Birth of baby to delivery of placenta</text>
                  <text x="490" y="192" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Signs of placental separation: uterus rises and becomes globular, gush of blood,</text>
                  <text x="490" y="208" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">cord lengthens. Should deliver within 30 minutes. Oxytocin given after delivery.</text>
                  <rect x="40" y="230" width="680" height="54" fill="#172033" rx="8"/>
                  <text x="160" y="252" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">FOURTH STAGE</text>
                  <text x="160" y="270" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">First 1 to 2 hours after delivery</text>
                  <text x="490" y="252" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Immediate postpartum recovery. Monitor vital signs every 15 minutes.</text>
                  <text x="490" y="268" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Check uterine firmness, lochia, perineum. Highest risk for postpartum hemorrhage.</text>
                  <text x="380" y="293" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | NLE Maternal and Child Nursing Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Four stages of labor with key nursing considerations</figcaption>
              </figure>

              {renderContent(AFTER_SVG1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="240" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">APGAR Scoring System</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="140" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">SIGN</text>
                  <text x="310" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">SCORE 0</text>
                  <text x="480" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">SCORE 1</text>
                  <text x="640" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">SCORE 2</text>
                  <line x1="40" y1="64" x2="720" y2="64" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="70" width="680" height="28" fill="#1e3a5f" rx="4"/>
                  <text x="140" y="89" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Appearance (Color)</text>
                  <text x="310" y="89" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Blue all over</text>
                  <text x="480" y="89" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Blue extremities, pink body</text>
                  <text x="640" y="89" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Completely pink</text>
                  <rect x="40" y="104" width="680" height="28" fill="#172033" rx="4"/>
                  <text x="140" y="123" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Pulse (Heart Rate)</text>
                  <text x="310" y="123" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Absent</text>
                  <text x="480" y="123" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Below 100 bpm</text>
                  <text x="640" y="123" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">100 bpm or above</text>
                  <rect x="40" y="138" width="680" height="28" fill="#1e3a5f" rx="4"/>
                  <text x="140" y="157" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Grimace (Reflex)</text>
                  <text x="310" y="157" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">No response</text>
                  <text x="480" y="157" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Grimace only</text>
                  <text x="640" y="157" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Cry, cough, or sneeze</text>
                  <rect x="40" y="172" width="680" height="28" fill="#172033" rx="4"/>
                  <text x="140" y="191" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Activity (Muscle Tone)</text>
                  <text x="310" y="191" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Limp</text>
                  <text x="480" y="191" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Some flexion</text>
                  <text x="640" y="191" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Active flexion</text>
                  <rect x="40" y="206" width="680" height="24" fill="#1e3a5f" rx="4"/>
                  <text x="140" y="223" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Respiration</text>
                  <text x="310" y="223" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Absent</text>
                  <text x="480" y="223" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Slow, irregular</text>
                  <text x="640" y="223" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Strong cry</text>
                  <text x="380" y="236" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">Score 7 to 10: Normal | Score 4 to 6: Moderate depression, stimulation needed | Score 0 to 3: Severe depression, resuscitation needed | LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>APGAR scoring system with interpretation</figcaption>
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
              <p className="text-pink-400 font-extrabold text-lg mb-2">Practice Maternal and Child Nursing</p>
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
