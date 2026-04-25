import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Microbiology and Parasitology Reviewer for MTLE Philippines 2026 (Complete Guide)',
  description:
    'Studying for the medical technology board exam? This microbiology and parasitology reviewer covers bacteria identification, staining techniques, parasites, and culture media tested in the MTLE.',
  path: '/medtech/microbiology-parasitology-reviewer',
  image: '/images/articles/hero-mtle-microbiology.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Microbiology and Parasitology Reviewer for MTLE Philippines 2026',
  description:
    'Complete microbiology and parasitology reviewer for the PRC Medical Technologist Licensure Examination covering Gram staining, bacterial identification, culture media, special stains, and parasitology.',
  image: 'https://lisensyaprep.com/images/articles/hero-mtle-microbiology.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-26',
  dateModified: '2026-04-26',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/medtech/microbiology-parasitology-reviewer' },
};

const RELATED_ARTICLES = [
  { text: 'Hematology Reviewer for MTLE Philippines 2026', href: '/medtech/hematology-reviewer' },
  { text: 'Clinical Chemistry Reviewer for MTLE Philippines 2026', href: '/medtech/clinical-chemistry-reviewer' },
  { text: 'PRC Board Exam Passing Rate by Profession 2026', href: '/blog/prc-board-exam-passing-rate-by-profession' },
  { text: 'PRC Board Exam Schedule 2026 for All Professions', href: '/blog/prc-board-exam-schedule-2026' },
  { text: 'How Long to Study for PRC Board Exam', href: '/blog/how-long-to-study-for-prc-board-exam' },
];

function formatInline(text) {
  let result = text
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]*)\)/g,
      (_, t, url) =>
        `<a href="${url}"${url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''} class="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">${t}</a>`
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em class="text-gray-400 italic">$1</em>');
  return result;
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
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(
        <p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    }
  }
  return elements;
}

const SECTION_1 = `
*By LisensyaPrep Team | Last Updated: April 2026 | 11-minute read*

---

Microbiology and Parasitology tests your knowledge of the microscopic organisms that cause disease in humans and the laboratory methods used to identify them. For many MTLE examinees, this is actually one of the more enjoyable subjects because the content is concrete and pattern-based. Each organism has specific characteristics, staining reactions, and media preferences that you can learn as a profile.

This reviewer covers the highest-yield organisms, staining techniques, culture media, and parasitology topics for the MTLE.

---

## Bacterial Classification and Gram Staining

### The Gram Stain

The Gram stain is the most fundamental technique in bacteriology and one of the most consistently tested topics in MTLE microbiology. Know every step, what each reagent does, and what the results mean.
`;

const SECTION_2 = `
---

## Clinically Important Bacteria

### Gram-Positive Cocci

**Staphylococcus aureus:** Gram-positive cocci in clusters. Coagulase positive (distinguishes it from other Staph). Causes skin infections, wound infections, food poisoning (via heat-stable enterotoxin), toxic shock syndrome, and pneumonia. MRSA (methicillin-resistant S. aureus) is a major concern in hospital settings.

**Streptococcus pyogenes (Group A Strep):** Gram-positive cocci in chains. Beta-hemolytic. Causes strep throat, scarlet fever, impetigo, and rheumatic fever. Bacitracin sensitive (used to differentiate from other beta-hemolytic Strep).

**Streptococcus pneumoniae:** Gram-positive lancet-shaped diplococci. Alpha-hemolytic. Optochin sensitive and bile soluble. Most common cause of community-acquired pneumonia, bacterial meningitis in adults, and otitis media in children.

**Enterococcus:** Gram-positive cocci in pairs or chains. Grows in 6.5% NaCl (salt tolerance test). Common cause of urinary tract infections and infective endocarditis.

### Gram-Negative Rods

**Escherichia coli:** Gram-negative rod. Facultative anaerobe. IMViC pattern: indole positive, methyl red positive, Voges-Proskauer negative, citrate negative. Most common cause of urinary tract infections and the most common cause of gram-negative bacteremia.

**Klebsiella pneumoniae:** Gram-negative rod with thick capsule. IMViC: indole negative, MR negative, VP positive, citrate positive. Causes lobar pneumonia with currant jelly sputum (bloody, mucoid). Commonly associated with hospital-acquired infections.

**Pseudomonas aeruginosa:** Gram-negative rod. Non-fermenter. Produces a blue-green pigment (pyocyanin). Grape-like or fruity odor. Oxidase positive. Opportunistic pathogen in immunocompromised patients, burn victims, and cystic fibrosis patients.

**Salmonella typhi:** Gram-negative rod. Causes typhoid fever. Non-lactose fermenter on MacConkey agar. Produces H2S on triple sugar iron (TSI) agar. Found in blood (first week), urine (second week), and stool (third week) during infection.

---

## Common Culture Media
`;

const SECTION_3 = `
---

## Special Staining Techniques

**Acid-Fast Stain (Ziehl-Neelsen Stain):** Used to identify mycobacteria (M. tuberculosis, M. leprae) and some parasites (Cryptosporidium oocysts). Acid-fast organisms retain carbol fuchsin and appear RED against a blue background. The waxy cell wall resists decolorization with acid-alcohol.

**India Ink Preparation:** Used to identify Cryptococcus neoformans in cerebrospinal fluid. The thick polysaccharide capsule repels the ink, creating a clear halo around the organism against a dark background.

**KOH (Potassium Hydroxide) Preparation:** Used for fungal detection in clinical specimens. KOH dissolves keratin and host cells, leaving fungal elements (hyphae, pseudohyphae, yeast cells) visible.

**Giemsa Stain:** Used to identify blood parasites (Plasmodium species causing malaria, Trypanosoma, Babesia), Chlamydia inclusions, and Histoplasma within macrophages.

---

## Parasitology: High-Yield Organisms for the MTLE

### Blood Parasites

**Plasmodium species (Malaria):**
- P. falciparum: Most dangerous. Can affect all RBC ages. Multiple ring forms per RBC. Banana-shaped gametocytes. Causes cerebral malaria.
- P. vivax and P. ovale: Affect young RBCs (reticulocytes). Schuffner's dots visible. Can cause relapse from liver dormancy (hypnozoites).
- P. malariae: Affects older RBCs. Band form trophozoites. Quartan fever (every 72 hours).

**Diagnosis:** Thick and thin blood smears stained with Giemsa. Thick smear for detection, thin smear for species identification.

### Intestinal Parasites

**Ascaris lumbricoides:** Largest intestinal roundworm. Eggs are bile-stained, mammillated (bumpy) outer coat. Fertilized eggs are diagnostic. Heavy infections can cause intestinal obstruction.

**Entamoeba histolytica:** Causes amoebic dysentery. Trophozoites contain ingested RBCs (hematophagous trophozoites). This is the key diagnostic feature distinguishing E. histolytica from non-pathogenic amoebae.

**Giardia lamblia (intestinalis):** Most common intestinal protozoan worldwide. Trophozoite has a characteristic pear shape with two nuclei (owl-eye appearance) and four pairs of flagella. Causes giardiasis: foul-smelling, fatty (steatorrhea), non-bloody diarrhea.

**Trichuris trichiura (Whipworm):** Barrel-shaped eggs with polar plugs. Adults have a whip-like anterior end embedded in the colonic mucosa.

**Taenia saginata (Beef tapeworm) and Taenia solium (Pork tapeworm):** Adults attach to the small intestine via their scolex. T. saginata has an unarmed scolex (no hooks). T. solium has an armed scolex (with hooks). T. solium is uniquely dangerous because its eggs can cause cysticercosis.

---

## Laboratory Safety in Microbiology

**Biosafety Levels (BSL):**

BSL-1: Standard microbiological practices. Non-pathogenic organisms.

BSL-2: Organisms of moderate hazard (E. coli, S. aureus, hepatitis B, HIV). Splash shields, face protection, limited access.

BSL-3: Serious or potentially lethal agents transmitted via the respiratory route (M. tuberculosis, SARS-CoV, C. burnetii). Negative pressure rooms, respiratory protection.

BSL-4: Dangerous and exotic agents with no available treatment (Ebola, Marburg, smallpox). Full-body pressure suits, maximum containment.

---

Microbiology and parasitology reward systematic study. Learn each organism as a profile: Gram stain result, morphology, key biochemical reactions, media preference, and disease caused.

Practice questions for MTLE Microbiology are at LisensyaPrep. No registration required.

**[Practice Microbiology Questions at LisensyaPrep](/medical-technology)**
`;

export default function MicrobiologyParasitologyReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-mtle-micro" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/medical-technology" className="text-gray-500 hover:text-gray-300 transition-colors">Medical Technology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Microbiology and Parasitology Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400">
                Medical Technology (MTLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Microbiology and Parasitology Reviewer for MTLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 26, 2026</span>
                <span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-mtle-microbiology.jpg"
                alt="Young Filipino female medical technologist in white coat with safety glasses for MTLE microbiology parasitology reviewer Philippines 2026"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="280" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Gram Stain Procedure and Results</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="38" fill="#1e3a5f" rx="6"/>
                  <text x="120" y="66" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">STEP 1</text>
                  <text x="120" y="80" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Crystal Violet</text>
                  <text x="440" y="73" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Primary stain. All bacteria stain purple. Apply for 1 minute then rinse.</text>
                  <rect x="40" y="94" width="680" height="38" fill="#172033" rx="6"/>
                  <text x="120" y="110" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">STEP 2</text>
                  <text x="120" y="124" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Gram's Iodine</text>
                  <text x="440" y="117" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Mordant. Forms crystal violet-iodine complex. Fixes stain in cell wall. Apply 1 minute.</text>
                  <rect x="40" y="138" width="680" height="38" fill="#1e3a5f" rx="6"/>
                  <text x="120" y="154" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">STEP 3</text>
                  <text x="120" y="170" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Decolorizer (Acetone-Alcohol)</text>
                  <text x="440" y="154" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Gram-negative bacteria lose crystal violet (thin peptidoglycan).</text>
                  <text x="440" y="170" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Gram-positive bacteria retain crystal violet (thick peptidoglycan).</text>
                  <rect x="40" y="182" width="680" height="38" fill="#14532d" rx="6"/>
                  <text x="120" y="198" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">STEP 4</text>
                  <text x="120" y="214" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Safranin (Counterstain)</text>
                  <text x="440" y="198" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Gram-negative bacteria stain PINK or RED.</text>
                  <text x="440" y="214" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Arial,sans-serif">Gram-positive bacteria remain PURPLE. Apply 1 minute then rinse and blot dry.</text>
                  <rect x="40" y="232" width="680" height="32" fill="#78350f" rx="6"/>
                  <text x="380" y="248" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">MEMORY AID: "Gram-Positive Picks Purple" | "Gram-Negative Never misses Pink"</text>
                  <text x="380" y="272" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | MTLE Microbiology Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Gram stain procedure step by step</figcaption>
              </figure>

              {renderContent(SECTION_2)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 290" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="290" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Common Bacteriology Culture Media</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="170" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">MEDIUM</text>
                  <text x="360" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">TYPE</text>
                  <text x="570" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">USED FOR</text>
                  <line x1="40" y1="64" x2="720" y2="64" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="70" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="170" y="90" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Blood Agar</text>
                  <text x="360" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Enriched, non-selective</text>
                  <text x="570" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">General purpose, hemolysis patterns</text>
                  <rect x="40" y="106" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="170" y="126" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">MacConkey Agar</text>
                  <text x="360" y="126" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Selective and differential</text>
                  <text x="570" y="126" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Gram-negative rods, lactose fermentation</text>
                  <rect x="40" y="142" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="170" y="162" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Chocolate Agar</text>
                  <text x="360" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Enriched</text>
                  <text x="570" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Haemophilus, Neisseria (fastidious organisms)</text>
                  <rect x="40" y="178" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="170" y="198" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Thayer-Martin Agar</text>
                  <text x="360" y="198" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Selective and enriched</text>
                  <text x="570" y="198" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Neisseria gonorrhoeae and N. meningitidis</text>
                  <rect x="40" y="214" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="170" y="234" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Sabouraud Dextrose Agar</text>
                  <text x="360" y="234" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Selective for fungi</text>
                  <text x="570" y="234" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Yeasts and molds, fungal culture</text>
                  <rect x="40" y="250" width="680" height="28" fill="#172033" rx="4"/>
                  <text x="170" y="268" textAnchor="middle" fill="#f8fafc" fontSize="12" fontFamily="Arial,sans-serif">Lowenstein-Jensen Medium</text>
                  <text x="360" y="268" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Selective for mycobacteria</text>
                  <text x="570" y="268" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Mycobacterium tuberculosis culture</text>
                  <text x="380" y="283" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Common bacteriology culture media for the MTLE</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_3)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-sky-900/20 to-sky-900/10 border border-sky-500/30 rounded-2xl p-6 text-center">
              <p className="text-sky-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice MTLE microbiology questions with instant feedback. No registration required.
              </p>
              <Link
                href="/medical-technology"
                className="inline-block bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Start MTLE Practice at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">Related MTLE Articles</h2>
              <ul className="space-y-3">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">MTLE Study Guides</h3>
              <div className="space-y-4">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <Link key={href} href={href} className="group block">
                    <p className="text-gray-300 text-sm group-hover:text-yellow-400 transition-colors leading-snug">
                      {text}
                    </p>
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
