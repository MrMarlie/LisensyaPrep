import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Health Promotion and Maintenance Reviewer for NCLEX-RN 2026 (Complete Guide)',
  description:
    'Complete NCLEX-RN Health Promotion and Maintenance reviewer covering growth and development, maternity, pediatrics, immunizations, and screenings. For Filipino nurses preparing for 2026 NCLEX.',
  path: '/nursing/health-promotion-nclex-reviewer',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Health Promotion and Maintenance Reviewer for NCLEX-RN 2026 Complete Guide',
  description:
    'Comprehensive Health Promotion and Maintenance reviewer for the NCLEX-RN covering growth and development, maternity, pediatrics, immunizations, and health screenings.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-31',
  dateModified: '2026-05-31',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/health-promotion-nclex-reviewer' },
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
**Health Promotion and Maintenance comprises 6-12% of the NCLEX-RN.** This category covers wellness, prevention, growth and development across the lifespan, maternity, and pediatric nursing. It emphasizes keeping patients healthy and preventing disease.

This reviewer covers the high-yield Health Promotion topics tested on the 2026 NCLEX-RN.

---

## Growth and Development (High-Yield)

### Erikson's Psychosocial Stages

| Stage | Age | Conflict |
|-------|-----|----------|
| Infancy | 0-1 yr | Trust vs Mistrust |
| Toddler | 1-3 yr | Autonomy vs Shame |
| Preschool | 3-6 yr | Initiative vs Guilt |
| School-age | 6-12 yr | Industry vs Inferiority |
| Adolescence | 12-18 yr | Identity vs Role Confusion |
| Young Adult | 18-40 yr | Intimacy vs Isolation |
| Middle Adult | 40-65 yr | Generativity vs Stagnation |
| Older Adult | 65+ yr | Integrity vs Despair |

### Key Developmental Milestones

**2 months:** social smile, lifts head
**4 months:** rolls over, laughs
**6 months:** sits with support, transfers objects
**9 months:** sits alone, pulls to stand, stranger anxiety
**12 months:** first words, walks with assistance
**18 months:** walks independently, 10-word vocabulary
**2 years:** runs, two-word phrases, parallel play
**3 years:** rides tricycle, speaks in sentences

---

## Immunizations

### Childhood Schedule (High-Yield)

**Birth:** HepB
**2 months:** DTaP, IPV, Hib, PCV, RV, HepB
**4 months:** DTaP, IPV, Hib, PCV, RV
**6 months:** DTaP, IPV, Hib, PCV, RV, HepB, influenza (annual)
**12-15 months:** MMR, varicella, Hib, PCV, HepA
**4-6 years:** DTaP, IPV, MMR, varicella

**Live vaccines (MMR, varicella, rotavirus):** contraindicated in immunocompromised and pregnancy.

### Adult Immunizations

- Annual influenza (everyone 6 months+)
- Tdap once, then Td every 10 years
- Shingles (Shingrix) at 50+
- Pneumococcal at 65+ (or earlier with conditions)
- HPV through age 26

---

## Maternity Nursing

### Prenatal Care

**First trimester:** folic acid (prevents neural tube defects), confirm pregnancy, establish care.

**Routine visits:** weight, BP, urine (protein/glucose), fetal heart tones, fundal height.

**Visit frequency:** every 4 weeks until 28 weeks, every 2 weeks until 36 weeks, weekly after 36 weeks.

### Danger Signs in Pregnancy

- Severe headache, visual changes, epigastric pain (preeclampsia)
- Vaginal bleeding
- Decreased fetal movement
- Leaking fluid
- Regular contractions before 37 weeks (preterm labor)

### Preeclampsia

**Signs:** hypertension, proteinuria, edema (face/hands), headache, visual changes.

**Treatment:** magnesium sulfate (seizure prevention), monitor for magnesium toxicity (decreased reflexes, respiratory depression - antidote is calcium gluconate), delivery is definitive treatment.

### Labor Stages

**Stage 1:** onset to full dilation (10 cm)
**Stage 2:** full dilation to birth
**Stage 3:** birth to placenta delivery
**Stage 4:** first 1-4 hours postpartum

### Postpartum Assessment (BUBBLE-HE)

- **B**reasts
- **U**terus (fundus firm, midline)
- **B**ladder
- **B**owel
- **L**ochia (rubra → serosa → alba)
- **E**pisiotomy/perineum
- **H**oman's sign (DVT)
- **E**motional status

**Postpartum hemorrhage:** saturating pad in <1 hour, boggy uterus. First action: fundal massage.

---

## Pediatric Nursing

### Safe Sleep (SIDS Prevention)

- Back to sleep
- Firm surface
- No soft objects in crib
- Room-share, not bed-share

### Car Seat Safety

- Rear-facing until age 2 (or max height/weight)
- Forward-facing 5-point harness until outgrown
- Booster until seatbelt fits (4'9", 8-12 years)
- Back seat until age 13

### Poisoning Prevention

- Secure medications and chemicals
- Poison Control: 1-800-222-1222
- Never call medicine "candy"

---

## Health Screenings

### Cancer Screening (Adults)

- **Cervical:** Pap smear starting age 21
- **Breast:** mammogram starting 40-50
- **Colon:** colonoscopy starting 45
- **Prostate:** discuss with provider at 50

### Nutrition Across Lifespan

- Infants: breast milk/formula, no honey before 1 year (botulism), introduce solids at 6 months
- Adolescents: increased calcium, iron, calories
- Pregnancy: folic acid, iron, increased calories
- Elderly: decreased calories, maintained protein, calcium/vitamin D

---

## Common Health Promotion Question Examples

### Example 1: Developmental Milestone

**Question:** Which milestone is expected for a 9-month-old?

A. Walking independently
B. Sitting without support and pulling to stand
C. Speaking in sentences
D. Toilet trained

**Answer: B** - At 9 months, infants sit alone and pull to stand.

### Example 2: Immunization Timing

**Question:** At what age is the first MMR vaccine given?

A. Birth
B. 2 months
C. 12-15 months
D. 4-6 years

**Answer: C** - MMR is given at 12-15 months (live vaccine, given after maternal antibodies wane).

---

## Practice Health Promotion at LisensyaPrep

LisensyaPrep's NCLEX Quiz Module 6 contains **50 practice questions on Health Promotion and Maintenance**.

**[Start Module 6: Health Promotion Practice](/nclex)**

---

## Related NCLEX Articles

- [Pharmacology Reviewer for NCLEX-RN](/nursing/pharmacology-nclex-reviewer)
- [Management of Care Reviewer for NCLEX-RN](/nursing/management-of-care-nclex-reviewer)
- [Physiological Adaptation Reviewer for NCLEX-RN](/nursing/physiological-adaptation-nclex-reviewer)
- [Safety and Infection Control Reviewer for NCLEX-RN](/nursing/safety-infection-prevention-nclex)
- [How to Pass the NCLEX on Your First Take](/nursing/how-to-pass-nclex-first-take)
`;

export default function HealthPromotionNclexPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-health-promo-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Health Promotion Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Nursing (NCLEX)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Health Promotion and Maintenance Reviewer for NCLEX-RN 2026 (Complete Guide)
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
