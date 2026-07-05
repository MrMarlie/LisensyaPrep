import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';

export const metadata = buildMetadata({
  title: 'Soil Science Reviewer for ALE Philippines 2026 (Deep Dive Guide)',
  description:
    'Studying for the PRC agriculture board exam? This soil science reviewer covers soil formation, texture, pH and nutrient availability, CEC, fertilizers, and soil conservation tested in the ALE.',
  path: '/agriculture/soil-science-reviewer-ale',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Soil Science Reviewer for ALE Philippines 2026 (Deep Dive)',
  description:
    'Complete soil science deep dive reviewer for the PRC Agriculture Licensure Examination covering soil formation, texture, soil profile, pH and nutrient availability, CEC, fertilizers, and soil conservation.',
  image: 'https://lisensyaprep.com/images/articles/hero-ale-soil-science.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-01',
  dateModified: '2026-05-01',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/agriculture/soil-science-reviewer-ale' },
};

const ALL_ALE_ARTICLES = [
  { text: 'How to Pass the Agriculture Board Exam on Your First Take', href: '/agriculture/how-to-pass-agriculture-board-exam' },
  { text: 'ALE Coverage 2026: Complete Subject Breakdown', href: '/agriculture/ale-coverage-2026' },
  { text: 'Animal Science Reviewer for ALE Philippines 2026', href: '/agriculture/animal-science-reviewer-ale' },
  { text: 'Plant Pathology and Crop Protection Reviewer for ALE 2026', href: '/agriculture/ale-crop-protection-reviewer' },
  { text: 'Crop Science Reviewer for ALE Philippines 2026', href: '/agriculture/crop-science-reviewer-ale' },
  { text: 'Soil Science Reviewer for ALE Philippines 2026', href: '/agriculture/soil-science-reviewer-ale' },
  { text: 'Agricultural Economics Reviewer for ALE Philippines 2026', href: '/agriculture/agri-economics-reviewer-ale' },
  { text: 'How to Apply for ALE via PRC LERIS 2026', href: '/agriculture/ale-application-guide-2026' },
  { text: 'ALE Passing Rate and Results 2026', href: '/agriculture/ale-passing-rate-results-2026' },
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
Soil Science is the second most heavily weighted subject in the ALE and the one with the most consistent year-to-year question patterns. If there is one topic you can count on seeing in every ALE cycle it is soil pH and its relationship to nutrient availability. This deep dive reviewer covers everything you need to master this subject completely.

---

## Soil Formation and Profile

### How Soils Form

Soil forms through the weathering of parent material over time. The five soil-forming factors are summarized by the acronym CLORPT:

**Climate:** Temperature and rainfall drive chemical and biological weathering. Tropical climates like the Philippines promote rapid weathering and deep soil development.

**Organisms:** Plant roots, soil animals, and microorganisms contribute organic matter and physically break up rock.

**Relief (topography):** Slope affects drainage, erosion, and the accumulation of materials. Flat areas accumulate deeper soils. Steep slopes have shallow, eroded soils.

**Parent material:** The rock or sediment from which the soil develops. Volcanic parent material (common in the Philippines) produces fertile soils.

**Time:** Soil formation is a very slow process measured in thousands to millions of years.

### The Soil Profile

A soil profile is a vertical cross-section of soil from the surface to the parent material. It consists of horizontal layers called horizons.
`;

const SECTION2 = `
---

## Soil Physical Properties

### Soil Texture

Soil texture refers to the relative proportions of sand, silt, and clay particles.

**Sand:** Largest particles (0.05 to 2.0 mm). Feels gritty. Low water holding capacity. High aeration. Low fertility.

**Silt:** Medium particles (0.002 to 0.05 mm). Feels smooth or floury when moist. Moderate water holding capacity.

**Clay:** Smallest particles (less than 0.002 mm). Feels sticky and plastic when moist. High water holding capacity. High CEC. Prone to waterlogging and compaction.

**Loam:** A balanced mixture of sand, silt, and clay that exhibits the best properties for crop production. Loam soils have good water holding capacity, drainage, aeration, and nutrient retention.

**Textural triangle:** The USDA soil textural triangle is used to classify soil texture based on the percentages of sand, silt, and clay. ALE questions may present a composition and ask you to identify the texture class.

### Soil Structure

Soil structure refers to the arrangement of soil particles into aggregates. Good soil structure promotes:
- Aeration and gas exchange for root respiration
- Water infiltration and drainage
- Root penetration and growth
- Microbial activity

**Granular structure:** Small, rounded aggregates. Ideal for crop production. Common in well-managed topsoils with high organic matter.

**Platy structure:** Flat, horizontal layers. Restricts water movement and root penetration.

**Massive structure:** No visible aggregation. Hard when dry, dense and sticky when wet. Common in compacted or poorly managed soils.

---

## Soil pH and Nutrient Availability

Soil pH is the most consistently tested concept in ALE soil science. Every cycle has questions about it.
`;

const SECTION3 = `
### Correcting Soil pH

**Acidic soils (pH too low):** Apply agricultural lime (CaCO₃) or dolomitic lime (CaMg(CO₃)₂) to raise pH. Lime also supplies calcium and magnesium. The amount of lime needed depends on the soil's buffer capacity (ability to resist pH change).

**Alkaline soils (pH too high):** Apply elemental sulfur, which is oxidized by soil bacteria to form sulfuric acid, lowering pH. Acidifying fertilizers like ammonium sulfate also gradually lower pH.

---

## Cation Exchange Capacity (CEC)

CEC is the total capacity of a soil to hold exchangeable cations. It is one of the most important indicators of soil fertility.

**Units:** expressed in cmol(+)/kg or meq/100g soil.

**What contributes to CEC:**
- Clay minerals: high CEC due to negatively charged surfaces
- Organic matter (humus): very high CEC, up to 200 cmol(+)/kg
- Sand and silt: low CEC

**Why CEC matters:** Soils with high CEC hold more nutrients and are less susceptible to nutrient leaching. Sandy soils with low CEC require more frequent fertilizer applications.

**Base saturation:** The percentage of CEC occupied by basic cations (Ca²⁺, Mg²⁺, K⁺, Na⁺). High base saturation indicates fertile soil. Low base saturation indicates acidic, potentially infertile soil.

---

## Soil Classification in the Philippines

The Philippines uses the USDA Soil Taxonomy system for classifying soils. Some major soil orders commonly encountered:

**Ultisols:** Acidic, leached soils found in humid tropical areas. Low base saturation. Common in upland Mindanao. Low natural fertility.

**Inceptisols:** Weakly developed soils with some horizon development. Common in river valleys and younger landforms. Moderate fertility.

**Entisols:** Minimal soil development. Found on recent alluvial deposits and steep slopes. Include the fertile alluvial soils of river plains.

**Vertisols:** Heavy clay soils that shrink and crack when dry and swell when wet. Found in parts of Bicol and Central Luzon. Difficult to manage but potentially fertile.

---

## Soil Conservation and Erosion Control

### Types of Soil Erosion

**Sheet erosion:** Uniform removal of a thin layer of topsoil over a large area. Most insidious because it is often not visible.

**Rill erosion:** Formation of small channels (rills) as water concentrates on slopes. Early stage of gully erosion.

**Gully erosion:** Deep channels formed by concentrated runoff. Severe form of erosion that removes subsoil.

**Wind erosion:** Removal of dry, loose topsoil by wind. More common in dry areas and during dry season.

### Soil Conservation Measures

**Contour farming:** Planting across the slope rather than up and down. Rows act as barriers to water flow and reduce runoff velocity.

**Strip cropping:** Alternating strips of erosion-susceptible crops (corn, tobacco) with erosion-resistant crops (grasses, legumes) across the slope.

**Terracing:** Construction of level benches on steep slopes to reduce slope length and slow runoff. Requires significant labor but highly effective.

**Hedgerow intercropping (alley cropping):** Rows of trees or shrubs planted along contour lines with crops grown between them. Trees reduce erosion, add organic matter, and can fix nitrogen.

**Cover cropping:** Growing crops specifically to protect soil from erosion during fallow periods.

---

## Practice What You Just Learned

Soil science questions in the ALE are most reliable when you fully understand the pH-nutrient relationship and CEC. Practice these concepts now. No account needed.

**[Practice Agriculture Questions at LisensyaPrep](https://lisensyaprep.com/agriculture)**

---

## Related ALE Articles

- [ALE Coverage 2026 Complete Subject Breakdown](https://lisensyaprep.com/agriculture/ale-coverage-2026)
- [Crop Science Deep Dive Reviewer for ALE 2026](https://lisensyaprep.com/agriculture/crop-science-reviewer-ale)
- [Agricultural Economics Deep Dive Reviewer for ALE 2026](https://lisensyaprep.com/agriculture/agri-economics-reviewer-ale)
- [Plant Pathology and Crop Protection Reviewer ALE 2026](https://lisensyaprep.com/agriculture/ale-crop-protection-reviewer)
- [How to Pass the Agriculture Board Exam on Your First Take](https://lisensyaprep.com/agriculture/how-to-pass-agriculture-board-exam)
`;

export default function SoilScienceReviewerAlePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-soil-science-ale" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/blog","name":"Blog"},{"url":"/agriculture/soil-science-reviewer-ale","name":"Soil Science Reviewer for ALE"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Soil Science Reviewer for ALE</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-lime-500/10 text-lime-400">Agriculture (ALE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Soil Science Reviewer for ALE Philippines 2026 (Deep Dive)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 1, 2026</span><span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-ale-soil-science.jpg"
              alt="Young Filipino female agriculture student holding a soil sample bag for ALE soil science reviewer Philippines 2026"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="280" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Soil Profile Horizons</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="34" fill="#14532d" rx="5"/>
                  <text x="130" y="68" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">O HORIZON</text>
                  <text x="130" y="78" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Organic layer</text>
                  <text x="490" y="71" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Accumulation of organic matter (litter, humus). Not always present. Rich in carbon.</text>
                  <rect x="40" y="90" width="680" height="34" fill="#78350f" rx="5"/>
                  <text x="130" y="108" textAnchor="middle" fill="#fcd34d" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">A HORIZON</text>
                  <text x="130" y="118" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Topsoil</text>
                  <text x="490" y="111" textAnchor="middle" fill="#fef3c7" fontSize="11" fontFamily="Arial,sans-serif">Most fertile layer. High in organic matter, nutrients, and biological activity. Darkest color.</text>
                  <rect x="40" y="130" width="680" height="34" fill="#1e3a5f" rx="5"/>
                  <text x="130" y="148" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">B HORIZON</text>
                  <text x="130" y="158" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Subsoil</text>
                  <text x="490" y="151" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Zone of accumulation. Receives materials leached from A horizon. Less organic matter.</text>
                  <rect x="40" y="170" width="680" height="34" fill="#172033" rx="5"/>
                  <text x="130" y="188" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">C HORIZON</text>
                  <text x="130" y="198" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Substratum</text>
                  <text x="490" y="191" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Partially weathered parent material. Transitional zone between soil and bedrock.</text>
                  <rect x="40" y="210" width="680" height="34" fill="#1e293b" rx="5"/>
                  <text x="130" y="228" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">R HORIZON</text>
                  <text x="130" y="238" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Bedrock</text>
                  <text x="490" y="231" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="Arial,sans-serif">Unweathered parent rock. Source material for soil formation above.</text>
                  <text x="380" y="270" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | ALE Soil Science Reviewer 2026 | A horizon = topsoil = most important for crop production</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Soil profile horizons from surface to bedrock</figcaption>
              </figure>

              {renderContent(SECTION2)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="200" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="700" fontFamily="Georgia,serif">Soil pH and Nutrient Availability</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="380" y="58" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Most nutrients are available between pH 6.0 and 7.0 (slightly acidic to neutral)</text>
                  <rect x="46" y="70" width="100" height="90" fill="#7f1d1d" rx="6"/>
                  <text x="96" y="92" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">pH 4.0-5.0</text>
                  <text x="96" y="108" textAnchor="middle" fill="#fecaca" fontSize="10" fontFamily="Arial,sans-serif">Strongly</text>
                  <text x="96" y="122" textAnchor="middle" fill="#fecaca" fontSize="10" fontFamily="Arial,sans-serif">Acidic</text>
                  <text x="96" y="138" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="Arial,sans-serif">Al, Mn toxicity</text>
                  <text x="96" y="152" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="Arial,sans-serif">P, Ca, Mg locked</text>
                  <rect x="158" y="70" width="100" height="90" fill="#78350f" rx="6"/>
                  <text x="208" y="92" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">pH 5.0-6.0</text>
                  <text x="208" y="108" textAnchor="middle" fill="#fef3c7" fontSize="10" fontFamily="Arial,sans-serif">Moderately</text>
                  <text x="208" y="122" textAnchor="middle" fill="#fef3c7" fontSize="10" fontFamily="Arial,sans-serif">Acidic</text>
                  <text x="208" y="138" textAnchor="middle" fill="#fcd34d" fontSize="9" fontFamily="Arial,sans-serif">Some Al/Mn issues</text>
                  <text x="208" y="152" textAnchor="middle" fill="#fcd34d" fontSize="9" fontFamily="Arial,sans-serif">P still limited</text>
                  <rect x="270" y="60" width="220" height="110" fill="#14532d" rx="6"/>
                  <text x="380" y="84" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">pH 6.0 to 7.0</text>
                  <text x="380" y="102" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">OPTIMAL RANGE</text>
                  <text x="380" y="120" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">All major nutrients available</text>
                  <text x="380" y="136" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">N, P, K, Ca, Mg, S at maximum</text>
                  <text x="380" y="152" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="Arial,sans-serif">Best for most field crops</text>
                  <rect x="502" y="70" width="100" height="90" fill="#1e3a5f" rx="6"/>
                  <text x="552" y="92" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">pH 7.0-8.0</text>
                  <text x="552" y="108" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="Arial,sans-serif">Neutral to</text>
                  <text x="552" y="122" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="Arial,sans-serif">Alkaline</text>
                  <text x="552" y="138" textAnchor="middle" fill="#93c5fd" fontSize="9" fontFamily="Arial,sans-serif">Fe, Mn, Zn limited</text>
                  <text x="552" y="152" textAnchor="middle" fill="#93c5fd" fontSize="9" fontFamily="Arial,sans-serif">Mo available</text>
                  <rect x="614" y="70" width="106" height="90" fill="#172033" rx="6"/>
                  <text x="667" y="92" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">pH 8.0+</text>
                  <text x="667" y="108" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="Arial,sans-serif">Strongly</text>
                  <text x="667" y="122" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="Arial,sans-serif">Alkaline</text>
                  <text x="667" y="138" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="Arial,sans-serif">Micronutrient</text>
                  <text x="667" y="152" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="Arial,sans-serif">deficiencies</text>
                  <text x="380" y="190" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | Key: Acidic soils = Al/Mn toxicity | Alkaline soils = micronutrient deficiencies</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Soil pH and its effect on nutrient availability</figcaption>
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
    <ArticlePopupTriggers type="agri" />
    </div>
  );
}
