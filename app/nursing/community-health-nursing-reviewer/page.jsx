import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Community Health Nursing Reviewer for NLE Philippines 2026 (Complete Guide)',
  description:
    'Studying for the NLE board exam? This community health nursing reviewer covers DOH programs, epidemiology, EPI vaccines, family planning, and vital statistics tested in the PNLE.',
  path: '/nursing/community-health-nursing-reviewer',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Community Health Nursing Reviewer for NLE Philippines 2026',
  description:
    'Complete community health nursing reviewer for the Philippine Nurse Licensure Examination covering DOH programs, EPI vaccines, epidemiology, vital statistics, family planning, and nursing bag technique.',
  image: 'https://lisensyaprep.com/images/articles/hero-nle-community-health-nursing.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-25',
  dateModified: '2026-04-25',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/community-health-nursing-reviewer' },
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
Community Health Nursing is Part 1 of the PNLE and accounts for 100 items out of the total 500. It is consistently the subject that surprises examinees the most because it feels different from the clinical nursing they spent most of nursing school studying.

While clinical nursing focuses on individual patients in hospital settings, community health nursing focuses on families, population groups, and communities. The approach, the tools, and the frameworks are different and they require dedicated review time to master.

Many NLE examinees who fail trace their poor result to a CHN score that pulled below the 60 percent minimum threshold despite strong performance in the clinical subjects. Do not let that happen to you.

---

## The Philippine Health Care Delivery System

### Levels of Health Care

Understanding how health care is organized in the Philippines is the foundation of CHN for the NLE. Questions about which facility handles which type of patient and which health worker is responsible for what appear in almost every exam cycle.
`;

const AFTER_LEVELS = `
### The Rural Health Unit (RHU)

The Rural Health Unit is the basic health care facility at the municipal level and the primary workplace of community health nurses in the Philippines. Know its composition:

**Rural Health Physician:** Heads the RHU. Provides medical services and supervises health programs.

**Public Health Nurse:** Supervises midwives and Barangay Health Workers. Implements nursing programs in the community.

**Rural Health Midwife:** Provides maternal and child health services at the barangay level.

**Barangay Health Worker (BHW):** Volunteer community health worker who provides basic health education and first aid at the grassroots level.

---

## Expanded Program on Immunization (EPI)

The EPI is one of the most heavily tested topics in NLE Community Health Nursing. Know the vaccines, the diseases they prevent, the schedule, and the storage requirements.
`;

const MAIN_CONTENT = `
### Cold Chain Management

Vaccines must be stored at specific temperatures to remain effective. Cold chain failure is a common source of NLE questions.

**Freezer (minus 15 to minus 25 degrees Celsius):** MMR, Varicella, OPV

**Refrigerator (2 to 8 degrees Celsius):** BCG, DPT, Hepatitis B, PCV, Pentavalent

**Never freeze:** Hepatitis B, DPT, Pentavalent. Freezing these vaccines destroys them. This is one of the most tested cold chain facts in the NLE.

---

## Epidemiology: Vital Statistics You Must Know

Epidemiology and vital statistics questions are a consistent part of the CHN section. Know how to compute and interpret these rates.

**Crude Birth Rate:** Number of live births per 1,000 population per year.

**Crude Death Rate:** Number of deaths per 1,000 population per year.

**Infant Mortality Rate:** Number of deaths of infants under 1 year of age per 1,000 live births per year. This is the most sensitive indicator of a community's health status.

**Maternal Mortality Rate:** Number of maternal deaths per 100,000 live births per year. Maternal death is defined as death during pregnancy or within 42 days of termination of pregnancy.

**Morbidity Rate (Incidence Rate):** Number of new cases of a disease per population at risk over a specific time period.

**Prevalence Rate:** Total number of existing cases (old and new) of a disease in a population at a given time.

The key distinction between incidence and prevalence appears frequently in NLE questions. Incidence measures new cases only. Prevalence measures all existing cases.

---

## Family Planning Methods

Family planning is a major DOH program and a consistent source of NLE CHN questions. Know the methods, their mechanisms, and nursing responsibilities for each.

**Natural Family Planning Methods:**

Calendar method (Rhythm method): Abstinence during fertile period estimated by calendar calculation.

Basal Body Temperature (BBT) method: Abstinence when temperature rises slightly (0.2 to 0.5 degrees Celsius) indicating ovulation.

Billing's Method (Cervical mucus method): Abstinence when cervical mucus becomes clear, slippery, and stretchy (spinnbarkeit) indicating ovulation.

Lactational Amenorrhea Method (LAM): Exclusive breastfeeding provides contraceptive protection for up to 6 months postpartum when menstruation has not returned.

**Artificial Methods:**

Combined oral contraceptive pills: Contain estrogen and progesterone. Inhibit ovulation. Start on the first day of menstruation.

Progestin-only pills (Mini-pill): Suitable for breastfeeding mothers. Taken at the same time every day without breaks.

Intrauterine Device (IUD): Inserted into the uterus. Copper IUDs are non-hormonal. Most effective when inserted within 48 hours postpartum or after menstruation.

Condom: Barrier method. Only contraceptive that also protects against sexually transmitted infections.

---

## The Nursing Bag and Home Visit

### Contents of the Public Health Nursing Bag

The nursing bag and proper technique for its use are tested in the NLE. The bag contains:
- Soap in a soap dish
- Hand towel
- Thermometer (oral and rectal)
- Sphygmomanometer and stethoscope
- Kidney basin
- Cotton balls
- Gauze and bandage materials
- Scissors and forceps
- Measuring tape
- Pen and paper
- Baby scale

### Bag Technique Principles

The nursing bag must never be placed on the floor. It is placed on a lined surface (the lining paper from the bag itself). The nurse washes hands before opening the bag and again before and after each procedure. The bag must be cleaned and restocked after every home visit.

The purpose of bag technique is to prevent cross-contamination between families visited during the nurse's rounds.

---

## Key DOH Programs to Know

| Program | Target | Key Points |
|---------|--------|-----------|
| Garantisadong Pambata | Children under 6 | Vitamin A supplementation, deworming, growth monitoring |
| Oplan Alis Dumi | All ages | Sanitation and hygiene promotion |
| MNCHN Strategy | Mothers and newborns | Maternal, newborn, child health and nutrition |
| DOTS Program | Tuberculosis patients | Directly Observed Treatment Short-course for TB |
| PhilHealth | All Filipinos | Universal health insurance coverage |

---

## Practice What You Just Learned

Community Health Nursing rewards practice more than reading. The best preparation is answering questions that force you to apply CHN concepts to real community scenarios.

Head to LisensyaPrep and start practicing now. No account needed.

**[Practice Community Health Nursing Questions at LisensyaPrep](https://lisensyaprep.com/nursing)**
`;

export default function CommunityHealthNursingReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-chn-reviewer" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Community Health Nursing Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Nursing (NLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Community Health Nursing Reviewer for NLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>April 25, 2026</span><span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-nle-community-health-nursing.jpg"
              alt="Young Filipino nurse smiling in white scrubs for NLE community health nursing reviewer Philippines 2026"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="280" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Levels of Health Care in the Philippines</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="54" fill="#14532d" rx="8"/>
                  <text x="200" y="72" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">PRIMARY LEVEL</text>
                  <text x="200" y="90" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">First contact care</text>
                  <text x="490" y="68" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Barangay Health Centers, Rural Health Units (RHUs)</text>
                  <text x="490" y="84" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Handled by: Barangay Health Workers, Midwives, Rural Health Physicians</text>
                  <rect x="40" y="112" width="680" height="54" fill="#1e3a5f" rx="8"/>
                  <text x="200" y="134" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">SECONDARY LEVEL</text>
                  <text x="200" y="152" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">General hospital care</text>
                  <text x="490" y="130" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">District Hospitals, Provincial Hospitals, City Hospitals</text>
                  <text x="490" y="146" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Handles cases referred from primary level, general medical and surgical care</text>
                  <rect x="40" y="174" width="680" height="54" fill="#172033" rx="8"/>
                  <text x="200" y="196" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">TERTIARY LEVEL</text>
                  <text x="200" y="214" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Specialized care</text>
                  <text x="490" y="192" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Regional Medical Centers, Specialty Hospitals (PGH, NKTI, PCMC)</text>
                  <text x="490" y="208" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Handles complex cases requiring specialized equipment and expertise</text>
                  <text x="380" y="270" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | NLE Community Health Nursing Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Three levels of health care in the Philippines</figcaption>
              </figure>

              {renderContent(AFTER_LEVELS)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="340" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">EPI Vaccine Schedule for Infants Philippines</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="160" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">VACCINE</text>
                  <text x="330" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">AGE GIVEN</text>
                  <text x="510" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">DISEASE PREVENTED</text>
                  <text x="670" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">ROUTE</text>
                  <line x1="40" y1="64" x2="720" y2="64" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="70" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="160" y="90" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">BCG</text>
                  <text x="330" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">At birth</text>
                  <text x="510" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Tuberculosis</text>
                  <text x="670" y="90" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">ID (right arm)</text>
                  <rect x="40" y="106" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="160" y="126" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">Hepatitis B</text>
                  <text x="330" y="126" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">At birth (within 24 hrs)</text>
                  <text x="510" y="126" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Hepatitis B</text>
                  <text x="670" y="126" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">IM</text>
                  <rect x="40" y="142" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="160" y="162" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">DPT-HepB-Hib (Pentavalent)</text>
                  <text x="330" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">6, 10, 14 weeks</text>
                  <text x="510" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Diphtheria, Pertussis, Tetanus, HepB, Hib</text>
                  <text x="670" y="162" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">IM</text>
                  <rect x="40" y="178" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="160" y="198" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">OPV (Oral Polio Vaccine)</text>
                  <text x="330" y="198" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">6, 10, 14 weeks</text>
                  <text x="510" y="198" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Poliomyelitis</text>
                  <text x="670" y="198" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Oral</text>
                  <rect x="40" y="214" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="160" y="234" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">PCV (Pneumococcal)</text>
                  <text x="330" y="234" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">6, 10, 14 weeks</text>
                  <text x="510" y="234" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Pneumonia, meningitis</text>
                  <text x="670" y="234" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">IM</text>
                  <rect x="40" y="250" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="160" y="270" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">MMR</text>
                  <text x="330" y="270" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">12 months</text>
                  <text x="510" y="270" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Measles, Mumps, Rubella</text>
                  <text x="670" y="270" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">SC</text>
                  <rect x="40" y="286" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="160" y="306" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">Rotavirus</text>
                  <text x="330" y="306" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">6 and 10 weeks</text>
                  <text x="510" y="306" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Rotavirus gastroenteritis</text>
                  <text x="670" y="306" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Oral</text>
                  <text x="380" y="332" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | Verify current schedule with DOH Philippines</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>EPI vaccine schedule for infants in the Philippines</figcaption>
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
              <p className="text-pink-400 font-extrabold text-lg mb-2">Practice Community Health Nursing</p>
              <p className="text-gray-400 text-sm mb-4">Free NLE practice questions. No account required.</p>
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
