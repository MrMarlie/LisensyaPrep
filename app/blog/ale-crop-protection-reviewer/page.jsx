import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Plant Pathology and Crop Protection Reviewer for ALE Philippines 2026',
  description:
    'Studying for the PRC agriculture board exam? This crop protection reviewer covers plant diseases, insect pests, IPM principles, and pesticide use tested in the ALE.',
  path: '/blog/ale-crop-protection-reviewer',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Plant Pathology and Crop Protection Reviewer for ALE Philippines 2026',
  description:
    'Complete plant pathology and crop protection reviewer for the PRC Agriculture Licensure Examination covering plant diseases, insect pests, IPM principles, and pesticide safety.',
  image: 'https://lisensyaprep.com/images/articles/hero-ale-crop-protection.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/blog/ale-crop-protection-reviewer' },
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
Crop Protection covers two interconnected disciplines: plant pathology, which deals with the diseases that attack crops, and entomology, which deals with the insect pests that damage them. Together they form one of the five major subject areas in the Agriculture Licensure Examination.

ALE questions in crop protection typically ask you to identify a disease or pest from a description of symptoms or damage, identify the causative agent, or select the appropriate management strategy. This reviewer organizes the content around those three question types.

---

## Plant Pathology: Understanding Plant Diseases

### The Disease Triangle

The plant disease triangle is the foundational concept in plant pathology. For a plant disease to occur, three conditions must be present simultaneously.
`;

const SECTION2 = `
**Susceptible host:** A plant that lacks resistance to a particular pathogen. Plant breeders develop disease-resistant varieties to reduce host susceptibility.

**Virulent pathogen:** A disease-causing organism capable of infecting and causing harm to the host plant. Pathogens include fungi, bacteria, viruses, nematodes, and phytoplasmas.

**Favorable environment:** The environmental conditions (temperature, humidity, moisture, wind) that support infection and disease development. High humidity and warm temperatures favor most fungal diseases.

**The practical application:** Crop protection strategies work by disrupting any one side of the triangle. Use resistant varieties to reduce host susceptibility. Apply fungicides to reduce pathogen populations. Improve drainage to reduce favorable environment for diseases that need standing water.

---

## Major Types of Plant Pathogens

### Fungi

Fungi cause more plant diseases than any other pathogen group. They spread primarily through spores that are dispersed by wind, water, insects, and infected plant material.

**Key characteristic:** Most fungal diseases are managed with fungicides. Fungal diseases are favored by high humidity and moderate temperatures.

**Common fungal disease symptoms:** Leaf spots, blights, rusts, powdery mildew, downy mildew, wilts, damping-off, anthracnose.

### Bacteria

Bacterial plant diseases spread through water splash, wounds, and infected tools. They cannot penetrate intact plant surfaces and require a wound or natural opening (stomata, lenticels) to enter.

**Key characteristic:** Bacterial diseases often show water-soaked lesions that later turn necrotic. There are no bactericides as effective as fungicides, so management focuses on prevention, sanitation, and use of resistant varieties.

**Common bacterial disease symptoms:** Water-soaked lesions, leaf blights, wilts, cankers, galls, soft rots.

### Viruses

Plant viruses spread through insect vectors (especially aphids and leafhoppers), infected planting material, and mechanical transmission. Viruses cannot be cured once a plant is infected.

**Key characteristic:** Virus management focuses on controlling the insect vector and using virus-free planting material. Roguing (removing) infected plants prevents spread.

**Common virus symptoms:** Mosaic (light and dark green patchy pattern), yellowing, leaf distortion, stunting, ring spots.

### Nematodes

Nematodes are microscopic roundworms that attack plant roots. Root-knot nematodes (Meloidogyne species) are the most economically important group worldwide.

**Key characteristic:** Infected plants show above-ground symptoms of nutrient deficiency and stunting, but the actual damage is root galls or root lesions visible below ground. Diagnosis requires root examination.

---

## Major Philippine Crop Diseases for the ALE
`;

const SECTION3 = `
---

## Agricultural Entomology: Insect Pests

### Classification by Feeding Habit

Understanding how an insect feeds helps identify it from damage descriptions, which is exactly how ALE questions are structured.

**Chewing insects** consume plant tissue directly. Damage appears as holes, ragged leaf edges, or complete defoliation. Examples: armyworms, cutworms, beetles, caterpillars.

**Sucking insects** pierce plant tissue and extract sap. Damage appears as yellowing, stippling, curling, and distortion. They may also inject toxins or transmit viruses. Examples: aphids, leafhoppers, whiteflies, thrips, mites.

**Boring insects** tunnel into stems, fruits, or roots. Damage appears as wilting of growing points (deadheart in rice), entry and exit holes, frass. Examples: stem borers, fruit borers, corn borers.

### Major Insect Pests in Philippine Agriculture

**Rice Stem Borer (Scirpophaga spp.):** Most damaging insect pest of rice in the Philippines. Young larvae bore into stems causing deadheart (dead central leaf) during vegetative stage and whitehead (unfilled spikelet) during reproductive stage.

**Rice Leafhopper and Planthopper:** Green leafhopper (Nephotettix virescens) vectors tungro virus. Brown planthopper (Nilaparvata lugens) causes hopperburn, a yellowing and drying of plants from concentrated feeding.

**Corn Borer (Ostrinia furnacalis):** Asian corn borer. Larvae bore into corn stalks and ears. Most damaging pest of corn in Asia.

**Aphids:** Small soft-bodied sucking insects that form colonies on young shoots and leaf undersides. Transmit many plant viruses. Secrete honeydew that promotes sooty mold growth.

**Fruit Flies (Bactrocera spp.):** Major pest of fruits and vegetables. Female lays eggs in fruit. Larvae feed inside causing premature fruit drop and unmarketable produce. Major quarantine pest for export.

---

## Integrated Pest Management (IPM)

IPM is the most important concept in crop protection for the ALE. It is a systems approach that combines multiple management strategies to keep pest populations below economically damaging levels while minimizing risks to human health and the environment.

### IPM Principles and Components

**Cultural control** prevents pest problems through farming practices. Examples: crop rotation to break pest cycles, proper plant spacing for air circulation, removal of crop residues that harbor pests, use of certified pest-free planting material, proper timing of planting to avoid peak pest periods.

**Biological control** uses natural enemies to suppress pest populations. Examples: Trichogramma wasps that parasitize insect eggs, predatory beetles that feed on aphids, Bacillus thuringiensis (Bt) that kills caterpillars, conservation of natural enemies by reducing broad-spectrum pesticide use.

**Host plant resistance** uses crop varieties that are naturally resistant or tolerant to specific pests and diseases. This is the most economical and environmentally sound control strategy.

**Chemical control** uses pesticides as a last resort when other methods are insufficient and pest populations reach the economic threshold. Chemical control should be targeted, selective, and timed correctly.

### Economic Threshold and Economic Injury Level

**Economic Injury Level (EIL):** The pest population density at which the cost of damage equals the cost of control. At this point, applying control measures is economically justified.

**Economic Threshold (ET) or Action Threshold:** The pest density at which control measures should be applied to prevent pest populations from reaching the EIL. It is set below the EIL to allow time for the control measure to take effect.

---

## Pesticides: Classification and Safety

### Classification by Target Pest

| Pesticide Type | Target | Examples |
|----------------|--------|---------|
| Insecticide | Insects | Malathion, Chlorpyrifos, Cypermethrin |
| Fungicide | Fungi | Mancozeb, Propiconazole, Copper oxychloride |
| Herbicide | Weeds | Glyphosate, Butachlor, 2,4-D |
| Rodenticide | Rodents | Zinc phosphide, Brodifacoum |
| Nematicide | Nematodes | Carbofuran, Fenamiphos |
| Acaricide | Mites | Abamectin, Propargite |

### Pesticide Signal Words

Signal words on pesticide labels indicate the level of acute toxicity and required safety precautions. These are consistently tested in ALE crop protection questions.

**DANGER (Peligro):** Highly toxic. Even small amounts can be fatal. Requires maximum protective equipment.

**WARNING (Babala):** Moderately toxic. Can cause serious injury. Requires protective equipment.

**CAUTION (Pag-ingat):** Slightly toxic. Least hazardous category. Still requires basic protective equipment.

### Personal Protective Equipment (PPE) for Pesticide Application

When applying pesticides, proper PPE includes: long-sleeved shirt and long pants, chemical-resistant gloves, chemical-resistant boots, face shield or goggles, and respirator or face mask. After application, wash all exposed skin and clothing thoroughly.

**Re-entry interval:** The period after pesticide application during which unprotected workers should not enter the treated area. This is specified on the pesticide label.

**Pre-harvest interval (PHI):** The minimum number of days that must pass between the last pesticide application and harvest. Violating the PHI results in residues above the maximum residue limit (MRL) in harvested produce.

---

## Practice What You Just Learned

Crop protection questions in the ALE ask you to identify diseases and pests from symptom descriptions and select the correct management strategy. Practice these scenario-based questions at LisensyaPrep. No account needed.

**[Practice Agriculture Questions at LisensyaPrep](https://lisensyaprep.com/agriculture)**

---

## Related ALE Articles

- [How to Pass the Agriculture Board Exam on Your First Take](https://lisensyaprep.com/blog/how-to-pass-agriculture-board-exam)
- [ALE Coverage 2026 Complete Subject Breakdown](https://lisensyaprep.com/blog/ale-coverage-2026)
- [Animal Science Reviewer for ALE Philippines 2026](https://lisensyaprep.com/blog/animal-science-reviewer-ale)
- [Crop Science Topics for the Agriculture Board Exam](https://lisensyaprep.com/blog/crop-science-board-exam-tips)
- [Soil Science Cheat Sheet: pH, CEC, and Nutrient Availability](https://lisensyaprep.com/blog/soil-science-cheat-sheet)
`;

export default function AleCropProtectionReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-ale-crop-protection" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Crop Protection Reviewer for ALE</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-lime-500/10 text-lime-400">Agriculture (ALE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Plant Pathology and Crop Protection Reviewer for ALE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>April 27, 2026</span><span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-ale-crop-protection.jpg"
              alt="Young Filipino male agriculture graduate examining a green leaf for ALE plant pathology crop protection reviewer Philippines 2026"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="260" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">The Plant Disease Triangle</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <polygon points="380,60 200,210 560,210" fill="none" stroke="#f59e0b" strokeWidth="2"/>
                  <circle cx="380" cy="60" r="40" fill="#14532d"/>
                  <text x="380" y="55" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">SUSCEPTIBLE</text>
                  <text x="380" y="72" textAnchor="middle" fill="#d1fae5" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">HOST</text>
                  <circle cx="200" cy="210" r="40" fill="#1e3a5f"/>
                  <text x="200" y="205" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">VIRULENT</text>
                  <text x="200" y="222" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PATHOGEN</text>
                  <circle cx="560" cy="210" r="40" fill="#172033"/>
                  <text x="560" y="205" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">FAVORABLE</text>
                  <text x="560" y="222" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">ENVIRONMENT</text>
                  <text x="380" y="148" textAnchor="middle" fill="#fcd34d" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif">DISEASE</text>
                  <text x="380" y="166" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">All three must overlap</text>
                  <text x="380" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">for disease to occur</text>
                  <text x="380" y="248" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | ALE Crop Protection Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>The plant disease triangle: all three conditions must be present simultaneously</figcaption>
              </figure>

              {renderContent(SECTION2)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="320" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Major Crop Diseases in Philippine Agriculture</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="130" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">DISEASE</text>
                  <text x="290" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">CROP</text>
                  <text x="440" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PATHOGEN</text>
                  <text x="630" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">KEY SYMPTOM</text>
                  <line x1="40" y1="64" x2="720" y2="64" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="70" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="130" y="90" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">Rice Blast</text>
                  <text x="290" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Rice</text>
                  <text x="440" y="90" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Pyricularia oryzae (fungus)</text>
                  <text x="630" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Diamond-shaped lesions on leaves</text>
                  <rect x="40" y="106" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="130" y="126" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">Bacterial Leaf Blight</text>
                  <text x="290" y="126" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Rice</text>
                  <text x="440" y="126" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Xanthomonas oryzae (bacteria)</text>
                  <text x="630" y="126" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Water-soaked to yellow leaf margins</text>
                  <rect x="40" y="142" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="130" y="162" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">Tungro</text>
                  <text x="290" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Rice</text>
                  <text x="440" y="162" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Virus (vector: green leafhopper)</text>
                  <text x="630" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Yellow-orange discoloration, stunting</text>
                  <rect x="40" y="178" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="130" y="198" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">Corn Downy Mildew</text>
                  <text x="290" y="198" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Corn</text>
                  <text x="440" y="198" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Peronosclerospora philippinensis</text>
                  <text x="630" y="198" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">White downy growth, chlorotic stripes</text>
                  <rect x="40" y="214" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="130" y="234" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">Late Blight</text>
                  <text x="290" y="234" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Potato, Tomato</text>
                  <text x="440" y="234" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Phytophthora infestans (oomycete)</text>
                  <text x="630" y="234" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Water-soaked lesions, white mold</text>
                  <rect x="40" y="250" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="130" y="270" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="Arial,sans-serif">Panama Wilt</text>
                  <text x="290" y="270" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Banana</text>
                  <text x="440" y="270" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Fusarium oxysporum f.sp. cubense</text>
                  <text x="630" y="270" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Yellowing from oldest leaves, wilting</text>
                  <rect x="40" y="286" width="680" height="24" fill="#14532d" rx="4"/>
                  <text x="380" y="302" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">Remember: Rice Blast and Bacterial Leaf Blight appear in almost every ALE cycle</text>
                  <text x="380" y="313" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Major crop diseases in Philippine agriculture for the ALE</figcaption>
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
