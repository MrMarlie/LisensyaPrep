import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Crop Science Reviewer for ALE Philippines 2026 (Deep Dive Guide)',
  description:
    'Studying for the PRC agriculture board exam? This crop science reviewer covers plant physiology, crop production systems, major Philippine crops, NSIC varieties, and post-harvest tested in the ALE.',
  path: '/blog/crop-science-reviewer-ale',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Crop Science Reviewer for ALE Philippines 2026 (Deep Dive)',
  description:
    'Complete crop science deep dive reviewer for the PRC Agriculture Licensure Examination covering plant physiology, rice production, major Philippine crops, cropping systems, fertilizers, and post-harvest technology.',
  image: 'https://lisensyaprep.com/images/articles/hero-ale-crop-science.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-01',
  dateModified: '2026-05-01',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/blog/crop-science-reviewer-ale' },
};

const ALL_ALE_ARTICLES = [
  { text: 'How to Pass the Agriculture Board Exam on Your First Take', href: '/blog/how-to-pass-agriculture-board-exam' },
  { text: 'ALE Coverage 2026: Complete Subject Breakdown', href: '/blog/ale-coverage-2026' },
  { text: 'Animal Science Reviewer for ALE Philippines 2026', href: '/blog/animal-science-reviewer-ale' },
  { text: 'Plant Pathology and Crop Protection Reviewer for ALE 2026', href: '/blog/ale-crop-protection-reviewer' },
  { text: 'Crop Science Reviewer for ALE Philippines 2026', href: '/blog/crop-science-reviewer-ale' },
  { text: 'Soil Science Reviewer for ALE Philippines 2026', href: '/blog/soil-science-reviewer-ale' },
  { text: 'Agricultural Economics Reviewer for ALE Philippines 2026', href: '/blog/agri-economics-reviewer-ale' },
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
Crop Science is the largest and most heavily tested subject in the Agriculture Licensure Examination. It covers the complete cycle of crop production from seed selection and land preparation through harvest and post-harvest handling. This deep dive reviewer goes beyond the basics and covers the specific technical knowledge that separates passing from failing ALE scores.

---

## Plant Physiology: Understanding How Plants Work

Plant physiology questions appear throughout the ALE because understanding why a crop behaves the way it does is essential for making correct production and management decisions.

### Photosynthesis and Plant Growth

Photosynthesis is the foundation of all crop production. Plants convert light energy, water, and carbon dioxide into glucose and oxygen.

**Equation:** 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂

**Light reaction (in thylakoids):** Light energy is captured and converted to ATP and NADPH. Oxygen is released as a byproduct of water splitting.

**Calvin cycle (in stroma):** ATP and NADPH are used to fix CO₂ into glucose. This is where actual sugar production occurs.

**C3 plants:** Most crops including rice, wheat, soybean, and most vegetables. Fix CO₂ directly through the Calvin cycle. Less efficient in hot, dry conditions.

**C4 plants:** Corn, sugarcane, sorghum. Have a more efficient CO₂ fixation mechanism that reduces photorespiration. Better adapted to high temperature and high light intensity. This explains why corn yields are typically higher than rice per unit area under optimal tropical conditions.

### Plant Hormones and Their Functions
`;

const SECTION2 = `
---

## Rice Production: The Most Tested Crop in the ALE

Rice is the most economically and culturally significant crop in the Philippines and the most consistently tested crop in ALE questions.

### Rice Growth Stages

**Vegetative phase:** From germination to panicle initiation. Includes germination, seedling, tillering, and stem elongation stages. Duration varies by variety (typically 55 to 75 days for most Philippine varieties).

**Reproductive phase:** From panicle initiation to flowering. Duration is approximately 35 days. This is when the panicle (flower head) develops and flowering (heading) occurs.

**Ripening phase:** From flowering to maturity. Duration approximately 30 days. Grain filling and hardening occur during this phase.

### Critical Growth Stages for Water Requirement

The two most critical stages for water in rice are tillering and the heading to flowering period. Water stress during these stages causes significant yield loss. This is a common ALE question.

### Key Rice Varieties in the Philippines

The National Seed Industry Council (NSIC) registers approved rice varieties. Some key NSIC-registered varieties frequently referenced in ALE questions:

**NSIC Rc 222 (Tubigan 18):** Widely grown inbred variety. Good yield potential, intermediate amylose content, tolerant to tungro.

**NSIC Rc 216 (Tubigan 14):** High-yielding inbred variety. Resistant to bacterial leaf blight.

**NSIC Rc 160 (Mestiso 7):** Hybrid rice variety. Significantly higher yield than inbred varieties.

### PhilRice

The Philippine Rice Research Institute (PhilRice) is the government agency responsible for rice research and development in the Philippines. PhilRice develops and releases NSIC-registered rice varieties.

---

## Corn Production

Corn (Zea mays) is the second most important cereal crop in the Philippines after rice.

**Types of corn:**
- Yellow corn: Used primarily for animal feed. Major production areas: Mindanao, Isabela.
- White corn: Used for human food (grits, corn flour). Predominantly grown in Cebu and Leyte.
- Sweet corn: Fresh market vegetable. High sugar content.

**Growth requirements:** Corn is a C4 crop requiring high solar radiation. It is sensitive to waterlogging but moderately drought tolerant during vegetative stages. Critical water requirement period is during tasseling and silking.

**Pollination:** Corn is cross-pollinated. The tassel (male flower) at the top sheds pollen that falls onto the silks (female stigmas) below.

---

## Coconut Production

The Philippines is one of the world's largest producers and exporters of coconut products.

**Scientific name:** Cocos nucifera

**Products from coconut:**
- Copra: dried coconut meat, the source of coconut oil
- Virgin coconut oil (VCO): extracted from fresh coconut meat without heat
- Coconut water: sterile liquid from young green coconuts
- Coir fiber: from the husk, used for rope and matting
- Coconut lumber: from the trunk of old palms

**Philippine Coconut Authority (PCA):** The government agency responsible for the development of the coconut industry in the Philippines.

---

## Cropping Systems
`;

const SECTION3 = `
---

## Fertilizers and Crop Nutrition

### The Primary Macronutrients (NPK)

**Nitrogen (N):** Most limiting nutrient for crop growth. Promotes vegetative growth and green color. Deficiency: yellowing starting from older leaves (chlorosis). Urea (46-0-0) is the most common N fertilizer.

**Phosphorus (P):** Essential for root development, flowering, and fruiting. Deficiency: purple or reddish discoloration of leaves, poor root development. Most available in slightly acidic soils (pH 6.0 to 6.5).

**Potassium (K):** Improves disease resistance, water use efficiency, and quality of fruits and grains. Deficiency: scorching and browning of leaf margins starting from older leaves.

### Fertilizer Calculations

Fertilizer calculations are a reliable source of ALE questions. Practice the following formula:

**Amount of fertilizer needed (kg) = (Required nutrient kg/ha) ÷ (Nutrient content of fertilizer as decimal)**

Example: If a rice crop needs 90 kg N/ha and you are using urea (46-0-0):
Amount of urea = 90 ÷ 0.46 = 195.6 kg/ha

Complete fertilizer grade is expressed as N-P₂O₅-K₂O. A 14-14-14 fertilizer contains 14% each of N, P₂O₅, and K₂O.

---

## Post-Harvest Technology

Post-harvest losses in the Philippines are estimated at 10 to 37 percent for rice and can be even higher for vegetables and fruits. Reducing these losses is a major food security goal.

### Post-Harvest Loss Points

Harvesting (cutting, threshing losses), transport, drying, storage, and milling are the five main points where grain losses occur.

### Moisture Content and Storage

**Safe moisture content for long-term rice storage:** 14 percent or below. Above this, molds and insects proliferate rapidly.

**Equilibrium moisture content:** The moisture level at which grain neither gains nor loses moisture to the surrounding air. Depends on relative humidity and temperature.

### Grain Drying Methods

**Sun drying:** Traditional method. Simple and low cost but dependent on weather. Grain is spread on concrete or tarpaulin and raked periodically.

**Mechanical drying:** Uses heated air forced through the grain mass. Faster and weather-independent. Flatbed dryer and recirculating batch dryer are common types in the Philippines.

---

## Practice What You Just Learned

Crop science questions in the ALE combine plant physiology, crop-specific production knowledge, and applied calculations. Practice now at LisensyaPrep. No account needed.

**[Practice Agriculture Questions at LisensyaPrep](https://lisensyaprep.com/agriculture)**

---

## Related ALE Articles

- [ALE Coverage 2026 Complete Subject Breakdown](https://lisensyaprep.com/blog/ale-coverage-2026)
- [Soil Science Deep Dive Reviewer for ALE 2026](https://lisensyaprep.com/blog/soil-science-reviewer-ale)
- [Agricultural Economics Deep Dive Reviewer for ALE 2026](https://lisensyaprep.com/blog/agri-economics-reviewer-ale)
- [Plant Pathology and Crop Protection Reviewer ALE 2026](https://lisensyaprep.com/blog/ale-crop-protection-reviewer)
- [Animal Science Reviewer for ALE Philippines 2026](https://lisensyaprep.com/blog/animal-science-reviewer-ale)
`;

export default function CropScienceReviewerAlePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-crop-science-ale" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Crop Science Reviewer for ALE</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-lime-500/10 text-lime-400">Agriculture (ALE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Crop Science Reviewer for ALE Philippines 2026 (Deep Dive)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 1, 2026</span><span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-ale-crop-science.jpg"
              alt="Young Filipino male agriculture student in green polo holding a rice seedling for ALE crop science reviewer Philippines 2026"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="280" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Plant Hormones and Their Agricultural Applications</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="140" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">HORMONE</text>
                  <text x="330" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PRIMARY FUNCTION</text>
                  <text x="570" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">AGRICULTURAL USE</text>
                  <line x1="40" y1="64" x2="720" y2="64" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="70" width="680" height="32" fill="#14532d" rx="4"/>
                  <text x="140" y="91" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Auxins (IAA)</text>
                  <text x="330" y="91" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Cell elongation, apical dominance</text>
                  <text x="570" y="91" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Rooting of cuttings, fruit set, weed control (2,4-D)</text>
                  <rect x="40" y="108" width="680" height="32" fill="#1e3a5f" rx="4"/>
                  <text x="140" y="129" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Gibberellins (GA)</text>
                  <text x="330" y="129" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Stem elongation, seed germination</text>
                  <text x="570" y="129" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Seedless fruit production, breaking dormancy</text>
                  <rect x="40" y="146" width="680" height="32" fill="#172033" rx="4"/>
                  <text x="140" y="167" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Cytokinins</text>
                  <text x="330" y="167" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Cell division, delay of senescence</text>
                  <text x="570" y="167" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Tissue culture, extending shelf life of cut flowers</text>
                  <rect x="40" y="184" width="680" height="32" fill="#78350f" rx="4"/>
                  <text x="140" y="205" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Ethylene</text>
                  <text x="330" y="205" textAnchor="middle" fill="#fef3c7" fontSize="11" fontFamily="Arial,sans-serif">Fruit ripening, abscission</text>
                  <text x="570" y="205" textAnchor="middle" fill="#fef3c7" fontSize="11" fontFamily="Arial,sans-serif">Uniform ripening of banana and mango for export</text>
                  <rect x="40" y="222" width="680" height="32" fill="#172033" rx="4"/>
                  <text x="140" y="243" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Abscisic Acid (ABA)</text>
                  <text x="330" y="243" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Seed dormancy, stomatal closure</text>
                  <text x="570" y="243" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Stress response, drought tolerance signaling</text>
                  <text x="380" y="272" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | ALE Crop Science Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Plant hormones and their agricultural applications for the ALE</figcaption>
              </figure>

              {renderContent(SECTION2)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="240" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Cropping Systems for the ALE</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="38" fill="#1e3a5f" rx="6"/>
                  <text x="190" y="70" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">MONOCULTURE</text>
                  <text x="490" y="66" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Single crop grown on the same land season after season.</text>
                  <text x="490" y="80" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Simple to manage but increases pest and disease buildup over time.</text>
                  <rect x="40" y="94" width="680" height="38" fill="#172033" rx="6"/>
                  <text x="190" y="114" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">INTERCROPPING</text>
                  <text x="490" y="110" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Two or more crops grown simultaneously on the same land.</text>
                  <text x="490" y="124" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Benefits: land use efficiency, risk reduction, income diversification.</text>
                  <rect x="40" y="138" width="680" height="38" fill="#14532d" rx="6"/>
                  <text x="190" y="158" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">CROP ROTATION</text>
                  <text x="490" y="154" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Different crops grown on the same land in successive seasons.</text>
                  <text x="490" y="168" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">Key benefit: breaks pest and disease cycles, maintains soil fertility.</text>
                  <rect x="40" y="182" width="680" height="38" fill="#1e3a5f" rx="6"/>
                  <text x="190" y="202" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">RELAY CROPPING</text>
                  <text x="490" y="198" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Second crop planted before first crop is harvested.</text>
                  <text x="490" y="212" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Maximizes land use. Common in rice-vegetable systems.</text>
                  <text x="380" y="232" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Major cropping systems tested in the ALE</figcaption>
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
