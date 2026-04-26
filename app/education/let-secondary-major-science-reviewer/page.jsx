import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'LET Secondary Major Science Reviewer 2026 Philippines (Complete Guide)',
  description:
    'Taking the LET for Secondary Science? This reviewer covers biology, chemistry, physics, earth science, science process skills, and science teaching methods tested in the LET major subject.',
  path: '/education/let-secondary-major-science-reviewer',
  image: '/images/articles/hero-let-secondary-science.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LET Secondary Major Science Reviewer 2026 Philippines',
  description:
    'Complete LET Secondary Major Science reviewer covering biology, chemistry, physics, earth science, science process skills, and science teaching methods.',
  image: 'https://lisensyaprep.com/images/articles/hero-let-secondary-science.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-04-27',
  dateModified: '2026-04-27',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://lisensyaprep.com/education/let-secondary-major-science-reviewer',
  },
};

const RELATED_ARTICLES = [
  { text: 'How to Pass the LET on Your First Take', href: '/education/how-to-pass-let-first-take' },
  { text: 'LET Coverage 2026 Complete Subject Breakdown', href: '/education/let-coverage-2026' },
  { text: 'Professional Education Reviewer LET 2026', href: '/education/professional-education-reviewer' },
  { text: 'LET Secondary Major Social Studies Reviewer', href: '/education/let-secondary-major-social-studies-reviewer' },
  { text: 'LET Secondary Major Filipino Reviewer', href: '/education/let-secondary-major-filipino-reviewer' },
];

function formatInline(text) {
  return text
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]*)\)/g,
      (_, t, url) =>
        `<a href="${url}"${url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''} class="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">${t}</a>`
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em class="text-gray-400 italic">$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-white/10 px-1 rounded text-yellow-300 text-xs">$1</code>');
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
        elements.push(
          <tr key={key++} className="border-b border-white/10">
            {cells.map((cell, ci) => (
              <th key={ci} className="px-4 py-2 text-left text-yellow-400 font-semibold text-sm">{cell.trim()}</th>
            ))}
          </tr>
        );
      } else if (!line.match(/^\|[-\s|]+\|$/)) {
        elements.push(
          <tr key={key++} className="border-b border-white/5">
            {cells.map((cell, ci) => (
              <td key={ci} className="px-4 py-2 text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: formatInline(cell.trim()) }} />
            ))}
          </tr>
        );
      }
    } else if (line.trim().startsWith('**') && line.includes('**')) {
      elements.push(
        <p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(
        <p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    }
  }
  const wrapped = [];
  let tableBuffer = [];
  let inTable = false;
  for (const el of elements) {
    if (el.type === 'tr') {
      inTable = true;
      tableBuffer.push(el);
    } else {
      if (inTable) {
        wrapped.push(
          <div key={`tbl-${key++}`} className="overflow-x-auto my-4">
            <table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden">
              <tbody>{tableBuffer}</tbody>
            </table>
          </div>
        );
        tableBuffer = [];
        inTable = false;
      }
      wrapped.push(el);
    }
  }
  if (inTable && tableBuffer.length) {
    wrapped.push(
      <div key="tbl-final" className="overflow-x-auto my-4">
        <table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden">
          <tbody>{tableBuffer}</tbody>
        </table>
      </div>
    );
  }
  return wrapped;
}

const SECTION_1 = `
*By LisensyaPrep Team | Last Updated: April 2026 | 11-minute read*

---

The LET Secondary Major in Science covers a broad range of scientific disciplines: biology, chemistry, physics, and earth science. It also tests your knowledge of how to teach these subjects effectively in a secondary classroom.

The breadth of science content is what challenges most examinees. The key is not to try to master every topic equally but to focus on the fundamental principles in each discipline that have the most application across different question types.

---

## Biology

### Cell Biology

**Cell Theory:** All living things are composed of cells. The cell is the basic structural and functional unit of life. All cells arise from pre-existing cells.

**Prokaryotic vs Eukaryotic cells:**

Prokaryotic cells (bacteria) have no true nucleus. Their genetic material floats freely in the cytoplasm. They have no membrane-bound organelles.

Eukaryotic cells (plants, animals, fungi, protists) have a true nucleus enclosed by a nuclear membrane. They contain membrane-bound organelles.

**Key organelles and their functions:**

| Organelle | Function |
|-----------|----------|
| Nucleus | Contains DNA, controls cell activities |
| Mitochondria | Site of cellular respiration, produces ATP (powerhouse of cell) |
| Ribosome | Site of protein synthesis |
| Endoplasmic Reticulum (rough) | Protein processing and transport |
| Golgi apparatus | Packaging and secretion of proteins |
| Chloroplast | Site of photosynthesis (plant cells only) |
| Lysosome | Contains digestive enzymes, waste disposal |
| Cell membrane | Controls what enters and exits the cell |

### Photosynthesis and Cellular Respiration

**Photosynthesis:** Occurs in chloroplasts. Plants convert light energy, water, and carbon dioxide into glucose and oxygen.

Overall equation: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2

**Cellular Respiration:** Occurs in mitochondria. Glucose is broken down to release energy in the form of ATP.

Overall equation: C6H12O6 + 6O2 → 6CO2 + 6H2O + ATP

### Genetics and Heredity

**Mendel's Laws:**

Law of Segregation: Each organism has two alleles for each trait. These alleles separate during gamete formation so each gamete carries only one allele.

Law of Independent Assortment: Alleles for different traits are distributed to gametes independently of each other (applies to genes on different chromosomes).

**Dominant and recessive alleles:** Dominant alleles are expressed when present. Recessive alleles are only expressed when two copies are present (homozygous recessive).

**DNA structure:** Double helix composed of nucleotides. Each nucleotide contains a sugar (deoxyribose), a phosphate group, and a nitrogenous base. Base pairing: Adenine pairs with Thymine (A-T), Guanine pairs with Cytosine (G-C).

---

## Chemistry
`;

const SECTION_2 = `
### Periodic Table

Elements are arranged in the periodic table by increasing atomic number. The table is organized into periods (horizontal rows) and groups or families (vertical columns).

**Metals** are found on the left side. They are good conductors of heat and electricity, malleable, and ductile.

**Non-metals** are on the right side. They are poor conductors and are often gases at room temperature.

**Metalloids** (semi-metals) are along the staircase line. They have properties of both metals and non-metals. Silicon is the most important metalloid (semiconductor).

**Key groups:** Group 1 (alkali metals) are highly reactive. Group 17 (halogens) are very reactive non-metals. Group 18 (noble gases) are inert.

---

## Physics

### Newton's Laws of Motion

**First Law (Law of Inertia):** An object at rest remains at rest, and an object in motion remains in motion with the same speed and direction, unless acted upon by an unbalanced force.

**Second Law:** Force equals mass times acceleration. F = ma. When the same force is applied, a more massive object accelerates less.

**Third Law:** For every action there is an equal and opposite reaction. When a gun fires, it recoils. When you push against a wall, the wall pushes back.

### Work, Energy, and Power

**Work (W):** W = Force x distance x cos θ. Work is done when a force causes displacement in the direction of the force. Unit: Joule (J).

**Kinetic Energy (KE):** Energy of motion. KE = 1/2 mv². A moving car has kinetic energy.

**Potential Energy (PE):** Stored energy. Gravitational PE = mgh (mass x gravity x height).

**Law of Conservation of Energy:** Energy cannot be created or destroyed, only transformed from one form to another.

**Power:** The rate at which work is done. P = Work / Time. Unit: Watt (W).

### Waves and Light

**Electromagnetic spectrum** from longest to shortest wavelength: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays.

Visible light occupies only a small portion of the electromagnetic spectrum. The colors in order from longest to shortest wavelength: Red, Orange, Yellow, Green, Blue, Indigo, Violet (ROYGBIV).

**Wave properties:** Wavelength (distance between peaks), frequency (number of waves per second), amplitude (height of wave), speed = frequency x wavelength.

---

## Earth Science

### Earth's Structure

**Crust:** Outermost solid layer. Continental crust is thicker (30 to 70 km) and less dense. Oceanic crust is thinner (5 to 10 km) and denser.

**Mantle:** Below the crust. Semi-solid rock. Convection currents in the mantle drive plate tectonics.

**Outer Core:** Liquid iron and nickel. Movement here generates Earth's magnetic field.

**Inner Core:** Solid iron and nickel. Extremely hot and under enormous pressure.

### Plate Tectonics

The lithosphere (crust and upper mantle) is divided into tectonic plates that move slowly over the semi-solid asthenosphere.

**Types of plate boundaries:**

Convergent (plates collide): Forms mountains, volcanoes, and ocean trenches. The Philippine archipelago was formed largely through convergent plate boundaries.

Divergent (plates move apart): Forms mid-ocean ridges and rift valleys.

Transform (plates slide past each other): Forms faults and causes earthquakes. The San Andreas Fault is an example.

---

## Science Process Skills

Science process skills are tested in the LET both as content knowledge and as the basis for questions about how to teach science effectively.

**Basic process skills:** Observing, classifying, measuring, communicating, inferring, predicting.

**Integrated process skills:** Formulating hypotheses, identifying variables, defining operationally, experimenting, interpreting data, formulating models.

**Scientific method steps:** Observation, question, hypothesis, experiment, data collection, analysis, conclusion, communication.

---

## Teaching Science: Methods and Approaches

### Inquiry-Based Learning

Inquiry-based science teaching places students in the role of scientists. Rather than receiving information passively, students observe phenomena, ask questions, design investigations, collect data, and draw conclusions.

The 5E Instructional Model is widely used in science education: Engage (spark interest), Explore (hands-on investigation), Explain (connect experience to concepts), Elaborate (apply concepts to new situations), Evaluate (assess understanding).

### Conceptual Change Model

Students come to class with pre-existing ideas about how the world works. Effective science teaching identifies these misconceptions and creates cognitive conflict that motivates students to revise their understanding.

**Example:** Many students believe heavier objects fall faster than lighter ones. The teacher designs an activity that demonstrates both objects falling at the same rate, creating the need to revise the prior misconception.

---

## Practice What You Just Learned

LET Secondary Major Science questions test both content knowledge across all four science disciplines and the ability to apply science teaching principles. Practice both types at LisensyaPrep. No account needed.

**[Practice LET Secondary Science Questions at LisensyaPrep](/education)**

---

## Related LET Articles

- [How to Pass the LET on Your First Take](/education/how-to-pass-let-first-take)
- [LET Coverage 2026 Complete Subject Breakdown](/education/let-coverage-2026)
- [Professional Education Reviewer LET 2026](/education/professional-education-reviewer)
- [LET Secondary Major Social Studies Reviewer](/education/let-secondary-major-social-studies-reviewer)
- [LET Secondary Major Filipino Reviewer](/education/let-secondary-major-filipino-reviewer)
`;

export default function LETScienceReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-let-science" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Secondary Major Science Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">
                Education (LET)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                LET Secondary Major Science Reviewer 2026 Philippines
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 27, 2026</span>
                <span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-let-secondary-science.jpg"
                alt="Young Filipino male science teacher in blazer holding a globe for LET secondary major science reviewer Philippines 2026"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="260" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Key Chemistry Concepts for LET Secondary Science</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="320" height="90" fill="#1e3a5f" rx="8"/>
                  <text x="200" y="72" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">MATTER AND ITS PROPERTIES</text>
                  <text x="200" y="92" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">States: solid, liquid, gas, plasma</text>
                  <text x="200" y="108" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Physical properties: color, density, melting point</text>
                  <text x="200" y="124" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Chemical properties: reactivity, flammability</text>
                  <rect x="400" y="50" width="320" height="90" fill="#172033" rx="8"/>
                  <text x="560" y="72" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">ATOMIC STRUCTURE</text>
                  <text x="560" y="92" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Protons (+) in nucleus, neutrons (neutral)</text>
                  <text x="560" y="108" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Electrons (-) orbit nucleus in shells</text>
                  <text x="560" y="124" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Atomic number = number of protons</text>
                  <rect x="40" y="150" width="320" height="90" fill="#172033" rx="8"/>
                  <text x="200" y="172" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">ACIDS AND BASES</text>
                  <text x="200" y="192" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">pH scale: 0 to 14</text>
                  <text x="200" y="208" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Below 7: acid (H+ ions). Above 7: base (OH- ions)</text>
                  <text x="200" y="224" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">pH 7: neutral (pure water)</text>
                  <rect x="400" y="150" width="320" height="90" fill="#1e3a5f" rx="8"/>
                  <text x="560" y="172" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">CHEMICAL REACTIONS</text>
                  <text x="560" y="192" textAnchor="middle" fill="#93c5fd" fontSize="11" fontFamily="Arial,sans-serif">Reactants → Products</text>
                  <text x="560" y="208" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Law of Conservation of Mass: matter is</text>
                  <text x="560" y="220" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">neither created nor destroyed in a reaction</text>
                  <text x="380" y="252" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | LET Secondary Major Science Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Key chemistry concepts for LET Secondary Science</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_2)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice LET Secondary Science questions with instant feedback. No registration required.
              </p>
              <Link
                href="/education"
                className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Start LET Practice at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">Related LET Articles</h2>
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
              <h3 className="text-white font-bold mb-4">LET Study Guides</h3>
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
