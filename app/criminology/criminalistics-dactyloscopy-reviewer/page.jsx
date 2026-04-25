import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Criminalistics and Dactyloscopy Reviewer CLE Philippines 2026',
  description:
    'Studying for the PRC criminology board exam? This criminalistics and dactyloscopy reviewer covers fingerprint science, forensic ballistics, questioned documents, and crime scene investigation for the CLE.',
  path: '/criminology/criminalistics-dactyloscopy-reviewer',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Criminalistics and Dactyloscopy Reviewer for CLE Philippines 2026',
  description:
    'Complete criminalistics and dactyloscopy reviewer for the PRC Criminologist Licensure Examination covering fingerprint science, forensic ballistics, questioned documents, and crime scene investigation.',
  image: 'https://lisensyaprep.com/images/articles/cle-criminalistics-dactyloscopy-reviewer.jpg',
  author: { '@type': 'Person', name: 'LisensyaPrep Team', jobTitle: 'Licensed Criminologist' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/assets/logo.png' },
  },
  datePublished: '2026-04-22',
  dateModified: '2026-04-22',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://lisensyaprep.com/criminology/criminalistics-dactyloscopy-reviewer',
  },
};

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
Criminalistics is the subject in the CLE that most examinees underestimate until they sit down and realize they cannot differentiate a loop from a whorl, or explain why the chain of custody matters in drug cases.

It is also the subject where well-prepared examinees pick up easy points, because the content is concrete and testable. Unlike subjects that require legal interpretation, criminalistics has clear definitions and established classifications. If you know the material, you know it.

This reviewer covers the core areas of Crime Detection and Investigation as tested in the CLE, with an emphasis on dactyloscopy since it is the most consistently tested topic in this subject area.
`;

const SECTION_2 = `
---

## What Crime Detection and Investigation Covers in the CLE

This subject area tests your knowledge of the scientific methods and investigative procedures used to detect, document, and solve crimes. The major topic areas are:

- Dactyloscopy (fingerprint science)
- Forensic ballistics and firearms identification
- Questioned documents examination
- Crime scene investigation procedures
- Forensic photography
- Polygraphy
- Chain of custody

Of these, dactyloscopy receives the most exam items in most CLE cycles. Give it the most attention.

---

## Dactyloscopy: The Science of Fingerprints

Dactyloscopy is the scientific study and classification of fingerprints for the purpose of identification. It is the most reliable biometric method of human identification because fingerprints are unique to each individual, remain unchanged throughout a person's lifetime, and can be recovered from crime scenes.

### The Three Fundamentals of Dactyloscopy

Before anything else, you need to know the three properties that make fingerprints useful for identification. These show up directly or indirectly in CLE questions on this topic.

**Individuality.** No two persons have ever been found to have identical fingerprints, including identical twins. This uniqueness is what makes fingerprint evidence so powerful in criminal investigations.

**Permanence.** Friction ridge skin develops before birth and remains unchanged until decomposition after death. Minor injuries like cuts or burns cause temporary damage, but the ridges regenerate in the same pattern once the skin heals.

**Classifiability.** Fingerprints can be systematically organized into a classification system that allows them to be searched and matched against large databases.

---

### Fingerprint Pattern Types

The Henry Classification System is the foundation of fingerprint identification used in the Philippines and most of the world. Under this system, fingerprint patterns are divided into three major groups.

**Loops** are the most common pattern type, appearing in roughly 60 to 65 percent of all fingerprints. A loop has one or more ridges that enter from one side of the finger, curve back, and exit from the same side. Loops are further divided into radial loops, which open toward the radius bone on the thumb side of the hand, and ulnar loops, which open toward the ulna bone on the little finger side.

**Whorls** are the second most common type, appearing in roughly 30 to 35 percent of fingerprints. A whorl contains at least one ridge that makes a complete circuit. Whorls are subdivided into plain whorls, central pocket loop whorls, double loop whorls, and accidental whorls.

**Arches** are the least common pattern, appearing in about 5 percent of fingerprints. Arches have ridges that enter from one side and exit from the other without recurving. They are divided into plain arches, which have a smooth wave, and tented arches, which have a sharper spike in the center.

---

### Types of Fingerprints Found at Crime Scenes

When fingerprints are recovered from a crime scene, they are classified based on how they were deposited and how they appear on the surface.

**Latent fingerprints** are invisible to the naked eye. They are formed by sweat and body oils left on a surface when someone touches it. Developing latent prints requires techniques such as powder dusting, chemical treatment with ninhydrin or cyanoacrylate fuming, or alternate light source examination.

**Patent fingerprints** are visible without any development because they were deposited in a substance that contrasts with the surface, such as blood, grease, or paint.

**Plastic fingerprints** are three-dimensional impressions left in a soft material such as wax, putty, soap, or fresh paint.

---

### Fingerprint Comparison and Identification

When a latent print recovered from a crime scene is compared against a known fingerprint, the examiner looks for ridge characteristics called minutiae. The most important minutiae are:

**Ridge endings** occur where a ridge suddenly stops.

**Bifurcations** occur where a single ridge splits into two.

**Short ridges (dots or islands)** are ridges that are very short in length.

There is no universal minimum number of matching points required for identification in the Philippines, but examiners typically look for 12 or more matching minutiae before declaring a positive identification.
`;

const SECTION_3 = `
## Forensic Ballistics

Forensic ballistics is the examination of firearms and ammunition to establish whether a specific firearm fired a specific bullet or cartridge case. It is tested in the CLE at a conceptual level rather than a highly technical one.

### Key Concepts in Ballistics

**Interior ballistics** covers what happens inside the firearm when it is fired, from the primer ignition through the movement of the bullet down the barrel.

**Exterior ballistics** covers the flight of the bullet from the muzzle to the target, including trajectory and range.

**Terminal ballistics** covers what happens when the bullet strikes the target, including penetration, deformation, and wound characteristics.

**Striations and class characteristics.** When a bullet passes through a barrel, the rifling inside the barrel imparts spiral grooves onto the bullet. These striations are unique to the individual firearm and can be used to match a bullet to the weapon that fired it.

**Gunshot residue (GSR).** When a firearm is discharged, it releases particles of primer, propellant, and metal. These particles settle on the hands and clothing of the shooter. GSR analysis is used to determine whether a person has recently fired a weapon.

---

## Questioned Documents Examination

Questioned documents examination involves the analysis of documents whose authenticity or origin is in dispute. For the CLE, focus on these core concepts.

**Handwriting examination.** The examiner compares the handwriting in a questioned document against known samples from a suspect. Characteristics examined include pen pressure, letter formation, spacing, and line quality.

**Typewriting and printing examination.** Documents produced by typewriters or printers can sometimes be traced to a specific machine based on defects in individual characters or printing elements.

**Alterations and erasures.** A document examiner can detect whether a document has been altered by erasure, chemical means, or overwriting. Infrared and ultraviolet light examination often reveals these alterations.

**Indented writing.** When someone writes on a pad of paper, the pressure sometimes transfers an impression to the sheet below. This indented writing can be recovered using the Electrostatic Detection Apparatus (ESDA).

---

## Crime Scene Investigation Procedures

Crime scene investigation follows a standardized process designed to ensure that evidence is preserved, documented, and collected in a way that maintains its value in court.

**First responder responsibilities.** The first law enforcement officer to arrive at a crime scene is responsible for securing the area, rendering aid to the injured, and protecting the scene from contamination. No evidence should be moved or disturbed until the crime scene has been documented.

**Documentation.** Crime scene documentation involves three methods used together: photography to record the scene visually, sketching to provide measurements and spatial relationships, and written notes to describe observations in detail.

**Evidence collection and packaging.** Physical evidence must be collected carefully to avoid contamination and packaged appropriately for the type of evidence. Biological evidence such as blood is collected in paper bags, not plastic, because plastic traps moisture and promotes bacterial growth that degrades DNA.

**Chain of custody.** Every person who handles evidence from collection to presentation in court must be documented. A break in the chain of custody can result in evidence being challenged or excluded in court.

---

## Quick Reference: Fingerprint Pattern Frequency

| Pattern Type | Approximate Frequency | Subtypes |
| ------------ | --------------------- | -------- |
| Loop | 60 to 65 percent | Radial loop, Ulnar loop |
| Whorl | 30 to 35 percent | Plain, Central pocket loop, Double loop, Accidental |
| Arch | 5 percent | Plain arch, Tented arch |

---

## Quick Reference: Types of Fingerprints at Crime Scenes

| Type | Visibility | How Deposited | Development Needed |
| ---- | ---------- | ------------- | ------------------ |
| Latent | Invisible | Sweat and oils on surface | Yes, powder or chemicals |
| Patent | Visible | Deposited in contrasting substance (blood, grease) | No |
| Plastic | Visible, 3D | Impression in soft material (wax, putty) | No |
`;

const RELATED_ARTICLES = [
  { text: 'Criminal Jurisprudence and Procedure Reviewer CLE 2026', href: '/criminology/criminal-jurisprudence-procedure-reviewer' },
  { text: 'Law Enforcement Administration Reviewer CLE 2026', href: '/criminology/law-enforcement-administration-reviewer' },
  { text: 'PRC Board Exam Passing Rate by Profession 2026', href: '/guides/prc-board-exam-passing-rate-by-profession' },
  { text: 'How to Apply for PRC Board Exam Online 2026', href: '/guides/how-to-apply-prc-board-exam-online-2026' },
];

export default function CriminalisticsDactyloscopyPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-cle-02" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Article */}
          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/criminology" className="text-gray-500 hover:text-gray-300 transition-colors">Criminology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Criminalistics and Dactyloscopy Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400">
                Criminology (CLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Criminalistics and Dactyloscopy Reviewer for CLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team, RCrim</span>
                <span>•</span>
                <span>April 22, 2026</span>
                <span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(SECTION_1)}
              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(SECTION_2)}
              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(SECTION_3)}
            </div>

            {/* CTA */}
            <div className="mt-10 bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-red-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Criminalistics is not a subject where passive reading works well. Practice with scenario-based questions at LisensyaPrep and see immediately where your knowledge holds up.
              </p>
              <Link
                href="https://lisensyaprep.com"
                className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                ⚔️ Practice Criminalistics Questions →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            {/* Related Articles */}
            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">Related CLE Reviewer Articles</h2>
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

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">CLE Reviewer Series</h3>
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
