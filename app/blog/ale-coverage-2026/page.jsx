import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'ALE Coverage 2026 Complete Subject Breakdown for Agriculture Board Exam Philippines',
  description:
    'What does the PRC agriculture board exam cover in 2026? Complete ALE subject breakdown covering all five tested areas with reviewer links and a study guide for each topic.',
  path: '/blog/ale-coverage-2026',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'ALE Coverage 2026: Complete Subject Breakdown for the Agriculture Board Exam Philippines',
  description:
    'Complete breakdown of all five ALE subject areas for the 2026 PRC Agriculture Licensure Examination with reviewer links and study guide for each topic.',
  image: 'https://lisensyaprep.com/images/articles/hero-ale-coverage-2026.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/blog/ale-coverage-2026' },
};

const ALL_ALE_ARTICLES = [
  { text: 'How to Pass the Agriculture Board Exam on Your First Take', href: '/blog/how-to-pass-agriculture-board-exam' },
  { text: 'ALE Coverage 2026: Complete Subject Breakdown', href: '/blog/ale-coverage-2026' },
  { text: 'Animal Science Reviewer for ALE Philippines 2026', href: '/blog/animal-science-reviewer-ale' },
  { text: 'Plant Pathology and Crop Protection Reviewer for ALE 2026', href: '/blog/ale-crop-protection-reviewer' },
  { text: 'How to Apply for ALE via PRC LERIS 2026', href: '/blog/ale-application-guide-2026' },
  { text: 'ALE Passing Rate and Results 2026', href: '/blog/ale-passing-rate-results-2026' },
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
      elements.push(<p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />);
    }
  }
  const wrapped = [];
  let tableBuffer = [];
  let inTable = false;
  for (const el of elements) {
    if (el.type === 'tr') { inTable = true; tableBuffer.push(el); }
    else {
      if (inTable) { wrapped.push(<div key={`tbl-${key++}`} className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>); tableBuffer = []; inTable = false; }
      wrapped.push(el);
    }
  }
  if (inTable && tableBuffer.length) wrapped.push(<div key="tbl-final" className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>);
  return wrapped;
}

const INTRO = `
The Agriculture Licensure Examination is administered by the PRC Board of Agriculture and covers the major disciplines of a Bachelor of Science in Agriculture program. Unlike some other PRC board exams where the coverage is clearly published per subject, the ALE coverage can feel broad and sometimes unpredictable between cycles.

This page is your complete ALE study map. It breaks down every subject area, tells you what each covers, and links you to the deep-dive reviewers and practice resources for each topic on LisensyaPrep.

---

## ALE Overview
`;

const SECTION2 = `
**Important note about the ALE:** The Agriculture board exam is known for having one of the most variable passing rates among all PRC boards, sometimes ranging from below 30 percent to above 70 percent in different cycles. The reason is that emphasis between subject areas can shift from cycle to cycle. The only reliable protection against this is broad coverage across all five subject areas.

---

## The Five ALE Subject Areas
`;

const SECTION3 = `
---

### Subject 1: Crop Science

Crop Science is the largest and most heavily weighted subject in the ALE. It encompasses the full spectrum of crop production from seed selection through post-harvest handling.

**Major topics:**

Plant physiology: photosynthesis, transpiration, nutrient uptake, plant growth regulators

Crop production: land preparation, planting methods, cultural management, irrigation, fertilization

Major Philippine crops: rice, corn, vegetables, fruit crops, industrial crops (sugarcane, coconut, tobacco)

NSIC-registered varieties: Know the major recommended rice varieties and their characteristics

Cropping systems: monoculture, intercropping, crop rotation, relay cropping

Post-harvest technology: drying, milling, storage, quality standards

**Practice now:** [LisensyaPrep Agriculture Quiz](https://lisensyaprep.com/agriculture)

---

### Subject 2: Soil Science

Soil Science is the second most heavily weighted ALE subject and one where consistent year-to-year patterns make it very reviewable.

**Major topics:**

Soil formation: weathering processes, soil profile, soil horizons (O, A, B, C horizons)

Soil texture and structure: sand, silt, clay, loam classifications; textural triangle

Soil pH and nutrient availability: the single most tested topic in soil science

Soil fertility and fertilizers: NPK fertilizers, organic amendments, fertilizer calculations

Cation Exchange Capacity (CEC): clay and organic matter as exchange sites

Soil conservation: erosion types, conservation measures, contour farming, strip cropping

Philippine soil classification: major soil series used in Philippine agriculture

**Full reviewer:** [Soil Science Cheat Sheet: pH, CEC, and Nutrient Availability](https://lisensyaprep.com/blog/soil-science-cheat-sheet)

**Practice now:** [LisensyaPrep Agriculture Quiz](https://lisensyaprep.com/agriculture)

---

### Subject 3: Animal Science

Animal Science covers the production and management of livestock and poultry species important to Philippine agriculture.

**Major topics:**

Major livestock breeds: swine (Yorkshire, Landrace, Duroc), cattle (Brahman, Holstein Friesian), carabao (Murrah cross), goat, sheep

Animal nutrition: six essential nutrient classes, common feed ingredients in Philippine livestock rations

Reproductive management: gestation periods, estrous cycles, parturition management for each species

Poultry production: broiler vs layer management, incubation periods, production performance indicators

Common livestock diseases: hog cholera, FMD, Newcastle disease, avian influenza

**Full reviewer:** [Animal Science Reviewer for ALE Philippines 2026](https://lisensyaprep.com/blog/animal-science-reviewer-ale)

**Practice now:** [LisensyaPrep Agriculture Quiz](https://lisensyaprep.com/agriculture)

---

### Subject 4: Crop Protection

Crop Protection covers plant pathology (plant diseases) and entomology (insect pests) as well as Integrated Pest Management (IPM) principles.

**Major topics:**

Plant disease symptoms: leaf spots, blights, rusts, wilts, rots, mosaics

Disease causative agents: fungi, bacteria, viruses, nematodes

Major Philippine crop diseases: rice blast, bacterial leaf blight, tungro virus, corn borer damage

Insect pest classification: chewing insects, sucking insects, boring insects

IPM principles: cultural control, biological control, chemical control as last resort

Pesticide classification: insecticides, fungicides, herbicides, rodenticides

Pesticide safety: signal words (Danger, Warning, Caution), PPE, re-entry intervals

**Practice now:** [LisensyaPrep Agriculture Quiz](https://lisensyaprep.com/agriculture)

---

### Subject 5: Agricultural Economics

Agricultural Economics covers the business and extension side of farming, including farm management, marketing, and government agricultural programs.

**Major topics:**

Farm budgeting: gross income, total costs, net farm income

Break-even analysis: break-even price, break-even yield

Return on investment (ROI): formula and interpretation

Marketing channels and functions: assembly, storage, processing, distribution

Agricultural extension: extension methods (individual, group, mass), extension agencies in the Philippines

Key DA agencies: PhilRice, BAR, PCAMRD, PhilFIDA, NDA, SRA

**Full reviewer:** [Agricultural Economics Key Formulas and Concepts](https://lisensyaprep.com/blog/agricultural-economics-key-concepts)

**Practice now:** [LisensyaPrep Agriculture Quiz](https://lisensyaprep.com/agriculture)

---

## How to Use This Study Map

**Week 1:** Take the diagnostic quiz on LisensyaPrep covering all ALE subject areas. Record your scores per subject before deciding how to allocate your review time.

**Weeks 2 to 3:** Crop Science first. It is the heaviest subject and rewards deep structured review.

**Weeks 4 to 5:** Soil Science. Focus especially on pH and nutrient relationships plus fertilizer calculations.

**Week 6:** Animal Science. Use the breed tables, reproductive parameters, and nutrition framework to organize your study.

**Week 7:** Crop Protection. Learn disease and pest profiles systematically, one crop at a time.

**Week 8:** Agricultural Economics. Master the calculations first, then the extension concepts.

**Weeks 9 to 10:** Full practice sessions across all five subjects. Rest in the final days before your exam.

---

## All Agriculture Articles on LisensyaPrep

- [How to Pass the Agriculture Board Exam on Your First Take](https://lisensyaprep.com/blog/how-to-pass-agriculture-board-exam)
- [Animal Science Reviewer for ALE Philippines 2026](https://lisensyaprep.com/blog/animal-science-reviewer-ale)
- [10 Must-Know Crop Science Topics for the Agriculture Board Exam](https://lisensyaprep.com/blog/crop-science-board-exam-tips)
- [Soil Science Cheat Sheet: pH, CEC, and Nutrient Availability](https://lisensyaprep.com/blog/soil-science-cheat-sheet)
- [Agricultural Economics Key Formulas and Concepts](https://lisensyaprep.com/blog/agricultural-economics-key-concepts)
`;

export default function AleCoverage2026Page() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-ale-coverage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">ALE Coverage 2026</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-lime-500/10 text-lime-400">Agriculture (ALE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                ALE Coverage 2026: Complete Subject Breakdown for the Agriculture Board Exam
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>April 27, 2026</span><span>•</span>
                <span>8 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-ale-coverage-2026.jpg"
              alt="Young Filipino female agriculture graduate in blazer holding a potted plant for ALE coverage 2026 board exam Philippines"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 180" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="180" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">ALE 2026 Key Facts</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="46" y="52" width="150" height="96" fill="#14532d" rx="8"/>
                  <text x="121" y="82" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">PASSING</text>
                  <text x="121" y="104" textAnchor="middle" fill="#fcd34d" fontSize="26" fontWeight="700" fontFamily="Arial,sans-serif">75%</text>
                  <text x="121" y="126" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">GWA required</text>
                  <text x="121" y="140" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">No subject below 60%</text>
                  <rect x="210" y="52" width="150" height="96" fill="#1e3a5f" rx="8"/>
                  <text x="285" y="82" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">EXAM</text>
                  <text x="285" y="104" textAnchor="middle" fill="#93c5fd" fontSize="24" fontWeight="700" fontFamily="Arial,sans-serif">ALE</text>
                  <text x="285" y="126" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Agriculture</text>
                  <text x="285" y="140" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Licensure Exam</text>
                  <rect x="374" y="52" width="150" height="96" fill="#172033" rx="8"/>
                  <text x="449" y="82" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">SUBJECTS</text>
                  <text x="449" y="104" textAnchor="middle" fill="#fcd34d" fontSize="26" fontWeight="700" fontFamily="Arial,sans-serif">5</text>
                  <text x="449" y="126" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Major subject</text>
                  <text x="449" y="140" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">areas</text>
                  <rect x="538" y="52" width="182" height="96" fill="#1e3a5f" rx="8"/>
                  <text x="629" y="82" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">PRACTICE NOW</text>
                  <text x="629" y="104" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">300 questions</text>
                  <text x="629" y="120" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">6 modules</text>
                  <text x="629" y="136" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Free on LisensyaPrep</text>
                  <text x="380" y="170" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">Source: PRC Board of Agriculture | LisensyaPrep.com | Verify schedule at prc.gov.ph</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>ALE 2026 key facts at a glance</figcaption>
              </figure>

              {renderContent(SECTION2)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="340" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">ALE 2026 Five Subject Areas at a Glance</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="52" fill="#14532d" rx="8"/>
                  <text x="190" y="72" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">CROP SCIENCE</text>
                  <text x="190" y="90" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">Heaviest weighted area</text>
                  <text x="490" y="68" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Plant physiology, crop production, cropping systems, irrigation,</text>
                  <text x="490" y="84" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">post-harvest handling, varietal selection, NSIC-registered varieties</text>
                  <rect x="40" y="108" width="680" height="52" fill="#1e3a5f" rx="8"/>
                  <text x="190" y="130" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">SOIL SCIENCE</text>
                  <text x="190" y="148" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">High and consistent weight</text>
                  <text x="490" y="126" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Soil formation, classification, texture, structure, pH effects,</text>
                  <text x="490" y="142" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">nutrient availability, fertilizers, CEC, soil conservation</text>
                  <rect x="40" y="166" width="680" height="52" fill="#172033" rx="8"/>
                  <text x="190" y="188" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">ANIMAL SCIENCE</text>
                  <text x="190" y="206" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Consistent exam presence</text>
                  <text x="490" y="184" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Livestock breeds, animal nutrition, reproductive management,</text>
                  <text x="490" y="200" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">poultry production, disease recognition and control</text>
                  <rect x="40" y="224" width="680" height="52" fill="#1e3a5f" rx="8"/>
                  <text x="190" y="246" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">CROP PROTECTION</text>
                  <text x="190" y="264" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Plant pathology and entomology</text>
                  <text x="490" y="242" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Plant disease identification, pest identification and damage,</text>
                  <text x="490" y="258" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Integrated Pest Management, pesticide classification and safety</text>
                  <rect x="40" y="282" width="680" height="50" fill="#172033" rx="8"/>
                  <text x="190" y="304" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">AGRICULTURAL ECONOMICS</text>
                  <text x="190" y="322" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Farm management and extension</text>
                  <text x="490" y="300" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Farm budgeting, break-even analysis, ROI, marketing channels,</text>
                  <text x="490" y="316" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">agricultural extension, DA programs and agencies</text>
                  <text x="380" y="336" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">LisensyaPrep.com | ALE Coverage 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Five subject areas of the ALE 2026</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(SECTION3)}
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">All ALE Articles on LisensyaPrep</h2>
              <ul className="space-y-3">
                {ALL_ALE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-green-900/20 to-green-900/10 border border-green-500/30 rounded-2xl p-6 text-center">
              <p className="text-green-400 font-extrabold text-lg mb-2">Start Your ALE Review</p>
              <p className="text-gray-400 text-sm mb-4">Free practice questions for all ALE subject areas. No account required.</p>
              <Link href="/agriculture" className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                ⚔️ Start Practicing at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">ALE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_ALE_ARTICLES.map(({ text, href }) => (
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
