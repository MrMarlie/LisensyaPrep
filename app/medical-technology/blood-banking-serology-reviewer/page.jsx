import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: 'Blood Banking and Serology Reviewer for MTLE Philippines 2026 (Complete Guide)',
  description:
    'Studying for the medical technology board exam? This blood banking and serology reviewer covers ABO typing, Rh system, crossmatching, blood components, and immunohematology tested in the MTLE.',
  path: '/medical-technology/blood-banking-serology-reviewer',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Blood Banking and Serology Reviewer for MTLE Philippines 2026',
  description:
    'Complete blood banking and serology reviewer for the PRC Medical Technologist Licensure Examination covering ABO typing, Rh system, crossmatching, blood components, and transfusion reactions.',
  image: 'https://lisensyaprep.com/images/articles/hero-mtle-blood-banking.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-01',
  dateModified: '2026-05-01',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/medical-technology/blood-banking-serology-reviewer' },
};

const ALL_MTLE_ARTICLES = [
  { text: 'How to Pass the MTLE Board Exam on Your First Take', href: '/medical-technology/how-to-pass-mtle-board-exam' },
  { text: 'MTLE Coverage 2026 Complete Subject Breakdown', href: '/medical-technology/mtle-coverage-2026' },
  { text: 'Hematology Reviewer for MTLE Philippines 2026', href: '/medical-technology/hematology-reviewer' },
  { text: 'Clinical Chemistry Reviewer for MTLE Philippines 2026', href: '/medical-technology/clinical-chemistry-reviewer' },
  { text: 'Microbiology and Parasitology Reviewer MTLE 2026', href: '/medical-technology/microbiology-parasitology-reviewer' },
  { text: 'Blood Banking and Serology Reviewer MTLE 2026', href: '/medical-technology/blood-banking-serology-reviewer' },
  { text: 'Urinalysis and Body Fluids Reviewer MTLE 2026', href: '/medical-technology/urinalysis-body-fluids-reviewer' },
  { text: 'Histopathology and Cytology Reviewer MTLE 2026', href: '/medical-technology/histopathology-cytology-reviewer' },
  { text: 'MTLE Application Guide and Passing Rate 2026', href: '/medical-technology/mtle-application-results-2026' },
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
Blood Banking and Serology is one of the most technically demanding subjects in the Medical Technologist Licensure Examination. It combines immunohematology, blood group genetics, and transfusion medicine into a subject where precision is not optional. In a real blood bank, a single error can cost a patient their life. The MTLE reflects that gravity in how it tests this subject.

The good news is that blood banking follows logical systems. Once you understand the rules of ABO typing, Rh grouping, and compatibility testing, most questions become pattern recognition rather than pure memorization.

---

## ABO Blood Group System

The ABO blood group system is the most important blood group system in transfusion medicine and one of the most heavily tested topics in MTLE blood banking.

### ABO Genetics and Antigens

ABO blood group is determined by the ABO gene on chromosome 9. The three main alleles are IA, IB, and i.

**Type A:** Has A antigens on red blood cells. Has anti-B antibodies in plasma. Genotype IA IA or IA i.

**Type B:** Has B antigens on red blood cells. Has anti-A antibodies in plasma. Genotype IB IB or IB i.

**Type AB:** Has both A and B antigens on red blood cells. Has neither anti-A nor anti-B antibodies in plasma. Genotype IA IB. Universal recipient for red blood cells.

**Type O:** Has neither A nor B antigens on red blood cells. Has both anti-A and anti-B antibodies in plasma. Genotype ii. Universal donor for red blood cells.
`;

const SECTION2 = `
### ABO Typing Procedure

ABO typing requires both forward (cell) typing and reverse (serum) typing. Results must agree before a blood type is reported.

**Forward (cell) typing:** Patient red blood cells are tested against anti-A and anti-B reagents. Agglutination with anti-A means A antigen is present.

**Reverse (serum) typing:** Patient serum is tested against A1 cells and B cells. Agglutination with A1 cells means anti-A is present.

**Discrepancies** between forward and reverse typing must be resolved before issuing blood. Common causes: recent transfusion, bone marrow transplant, subgroup variants, cold autoantibodies.

---

## Rh Blood Group System

The Rh system is the second most clinically important blood group system. The D antigen is the most immunogenic of all red blood cell antigens and the one that causes Hemolytic Disease of the Fetus and Newborn (HDFN).

**Rh positive:** D antigen present on red blood cells. About 85% of Filipinos are Rh positive.

**Rh negative:** D antigen absent. These individuals can develop anti-D if exposed to Rh positive blood.

### Weak D (Du)

Weak D is a variant with reduced expression of the D antigen. Weak D patients are typed as Rh positive for transfusion purposes to prevent sensitization. Weak D donors are labeled as Rh positive.

### Hemolytic Disease of the Fetus and Newborn (HDFN)

HDFN occurs when an Rh negative mother carries an Rh positive fetus. Maternal anti-D IgG antibodies cross the placenta and destroy fetal red blood cells.

**Prevention:** Rh immunoglobulin (RhoGAM) is given to Rh negative mothers at 28 weeks gestation and within 72 hours after delivery of an Rh positive infant. It prevents sensitization by destroying fetal cells before the mother's immune system can respond.

---

## Compatibility Testing

### Pre-transfusion Testing Steps

**Type and Screen:** ABO and Rh typing plus antibody screen. Done before any potential transfusion.

**Type and Crossmatch:** Done when blood is actually needed for transfusion.

### The Crossmatch

**Major crossmatch:** Patient serum tested against donor red blood cells. Detects antibodies in patient that could destroy donor cells. This is the critical compatibility test.

**Minor crossmatch:** Donor serum tested against patient red blood cells. Less clinically significant in modern practice.

**Electronic crossmatch:** Computer-based compatibility check allowed when patient has no clinically significant antibodies and has had two separate ABO typings on record.

### Antibody Identification

When an antibody screen is positive, the antibody must be identified using a panel of red blood cells with known antigen profiles. The pattern of reactions across the panel identifies the specificity of the antibody.

---

## Blood Components and Their Uses
`;

const SECTION3 = `
---

## Transfusion Reactions

Transfusion reactions are a consistent source of MTLE questions because they require integrating clinical presentation with laboratory findings.

**Acute Hemolytic Transfusion Reaction (AHTR):** Most dangerous transfusion reaction. Caused by ABO incompatibility usually due to clerical error. Signs: fever, chills, back and flank pain, hemoglobinuria (red-brown urine), hypotension, shock. Management: stop transfusion immediately, maintain IV access, notify blood bank, send post-reaction samples.

**Febrile Non-Hemolytic Transfusion Reaction (FNHTR):** Most common transfusion reaction. Caused by recipient antibodies against donor leukocyte antigens. Temperature rise of 1°C or more during or within 4 hours of transfusion. Management: slow or stop transfusion, administer antipyretics. Prevented by using leukoreduced blood products.

**Allergic Reaction:** Caused by recipient antibodies against donor plasma proteins. Ranges from mild urticaria (hives) to anaphylaxis. Mild reactions: slow transfusion, give antihistamines. Anaphylaxis: stop transfusion, give epinephrine.

**Transfusion Associated Circulatory Overload (TACO):** Volume overload from transfusion. Signs: dyspnea, hypertension, pulmonary edema. Most common in elderly patients and those with cardiac disease.

**Transfusion Related Acute Lung Injury (TRALI):** Non-cardiogenic pulmonary edema within 6 hours of transfusion. Caused by donor antibodies against recipient neutrophil antigens. Characterized by hypoxia and bilateral pulmonary infiltrates without evidence of cardiac overload.

---

## Basic Serology: Antigen-Antibody Reactions

Serology tests detect antigens or antibodies using known reagents. The principles underlying these reactions appear throughout the MTLE.

**Direct Antiglobulin Test (DAT) / Direct Coombs Test:** Detects antibodies or complement already bound to the patient's red blood cells in vivo. Positive in autoimmune hemolytic anemia, HDFN, and transfusion reactions.

**Indirect Antiglobulin Test (IAT) / Indirect Coombs Test:** Detects antibodies in patient serum that could bind to red blood cells in vitro. Used in antibody screening, crossmatching, and Rh typing for weak D.

**Key distinction:** DAT looks at what is on the cells. IAT looks at what is in the serum.

---

## Practice What You Just Learned

Blood banking questions in the MTLE cover ABO and Rh typing, crossmatching, blood component selection, and transfusion reaction recognition. Practice all of these at LisensyaPrep. No account needed.

**[Practice MTLE Blood Banking Questions at LisensyaPrep](https://lisensyaprep.com/medical-technology)**

---

## Related MTLE Articles

- [Hematology Reviewer for MTLE Philippines 2026](https://lisensyaprep.com/medical-technology/hematology-reviewer)
- [Clinical Chemistry Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/clinical-chemistry-reviewer)
- [Microbiology and Parasitology Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/microbiology-parasitology-reviewer)
- [Urinalysis and Body Fluids Reviewer MTLE 2026](https://lisensyaprep.com/medical-technology/urinalysis-body-fluids-reviewer)
- [MTLE Coverage 2026 Complete Subject Breakdown](https://lisensyaprep.com/medical-technology/mtle-coverage-2026)
`;

export default function BloodBankingSerologyReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-mtle-blood-banking" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <BreadcrumbSchema items={[{"url":"/","name":"Home"},{"url":"/medical-technology","name":"Medical Technology"},{"url":"/medical-technology/blood-banking-serology-reviewer","name":"Blood Banking and Serology Reviewer"}]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/medical-technology" className="text-gray-500 hover:text-gray-300 transition-colors">Medical Technology</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Blood Banking and Serology Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400">Medical Technology (MTLE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Blood Banking and Serology Reviewer for MTLE Philippines 2026
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 1, 2026</span><span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-mtle-blood-banking.jpg"
                alt="Filipino male medical technologist in white coat with blue gloves examining a blood bag for MTLE blood banking serology reviewer Philippines 2026"
                width={1200} height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="240" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">ABO Blood Group System Quick Reference</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="100" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">BLOOD TYPE</text>
                  <text x="250" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">RBC ANTIGENS</text>
                  <text x="420" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PLASMA ANTIBODIES</text>
                  <text x="580" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">GENOTYPE</text>
                  <text x="690" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">FREQUENCY</text>
                  <line x1="40" y1="64" x2="720" y2="64" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="70" width="680" height="30" fill="#7f1d1d" rx="4"/>
                  <text x="100" y="90" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">A</text>
                  <text x="250" y="90" textAnchor="middle" fill="#fecaca" fontSize="11" fontFamily="Arial,sans-serif">A antigen</text>
                  <text x="420" y="90" textAnchor="middle" fill="#fecaca" fontSize="11" fontFamily="Arial,sans-serif">Anti-B</text>
                  <text x="580" y="90" textAnchor="middle" fill="#fecaca" fontSize="11" fontFamily="Arial,sans-serif">IAIA or IAi</text>
                  <text x="690" y="90" textAnchor="middle" fill="#fecaca" fontSize="11" fontFamily="Arial,sans-serif">28%</text>
                  <rect x="40" y="106" width="680" height="30" fill="#1e3a5f" rx="4"/>
                  <text x="100" y="126" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">B</text>
                  <text x="250" y="126" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">B antigen</text>
                  <text x="420" y="126" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Anti-A</text>
                  <text x="580" y="126" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">IBIB or IBi</text>
                  <text x="690" y="126" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">20%</text>
                  <rect x="40" y="142" width="680" height="30" fill="#14532d" rx="4"/>
                  <text x="100" y="162" textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">AB</text>
                  <text x="250" y="162" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">A and B antigens</text>
                  <text x="420" y="162" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Neither anti-A nor anti-B</text>
                  <text x="580" y="162" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">IAIB</text>
                  <text x="690" y="162" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">4%</text>
                  <rect x="40" y="178" width="680" height="30" fill="#172033" rx="4"/>
                  <text x="100" y="198" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">O</text>
                  <text x="250" y="198" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Neither A nor B</text>
                  <text x="420" y="198" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Anti-A and Anti-B</text>
                  <text x="580" y="198" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">ii</text>
                  <text x="690" y="198" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">48%</text>
                  <text x="380" y="232" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | MTLE Blood Banking Reviewer 2026 | Type O most common in Philippines</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>ABO blood group system complete reference</figcaption>
              </figure>

              {renderContent(SECTION2)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="280" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Blood Components and Clinical Indications</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <text x="170" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">COMPONENT</text>
                  <text x="380" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">STORAGE</text>
                  <text x="580" y="56" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">INDICATION</text>
                  <line x1="40" y1="64" x2="720" y2="64" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="70" width="680" height="32" fill="#1e3a5f" rx="4"/>
                  <text x="170" y="91" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Packed Red Blood Cells</text>
                  <text x="380" y="91" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">1 to 6°C, up to 42 days</text>
                  <text x="580" y="91" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Symptomatic anemia, blood loss</text>
                  <rect x="40" y="108" width="680" height="32" fill="#172033" rx="4"/>
                  <text x="170" y="129" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Fresh Frozen Plasma (FFP)</text>
                  <text x="380" y="129" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">minus 18°C, up to 1 year</text>
                  <text x="580" y="129" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Coagulation factor deficiencies, warfarin reversal</text>
                  <rect x="40" y="146" width="680" height="32" fill="#1e3a5f" rx="4"/>
                  <text x="170" y="167" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Platelets</text>
                  <text x="380" y="167" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">20 to 24°C, 5 days with agitation</text>
                  <text x="580" y="167" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Thrombocytopenia, platelet dysfunction</text>
                  <rect x="40" y="184" width="680" height="32" fill="#172033" rx="4"/>
                  <text x="170" y="205" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Cryoprecipitate</text>
                  <text x="380" y="205" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">minus 18°C, up to 1 year</text>
                  <text x="580" y="205" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Hemophilia A, von Willebrand disease, fibrinogen deficiency</text>
                  <rect x="40" y="222" width="680" height="32" fill="#1e3a5f" rx="4"/>
                  <text x="170" y="243" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Whole Blood</text>
                  <text x="380" y="243" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">1 to 6°C, up to 35 days</text>
                  <text x="580" y="243" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Massive hemorrhage requiring all components</text>
                  <text x="380" y="272" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | MTLE Blood Banking Reviewer 2026 | Key: Platelets stored at room temp with agitation</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Blood components, storage conditions, and clinical indications</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(SECTION3)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-sky-900/20 to-sky-900/10 border border-sky-500/30 rounded-2xl p-6 text-center">
              <p className="text-sky-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">Practice MTLE blood banking questions with instant feedback. No registration required.</p>
              <Link href="/medical-technology" className="inline-block bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start MTLE Practice at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">All MTLE Articles on LisensyaPrep</h2>
              <ul className="space-y-3">
                {ALL_MTLE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">MTLE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_MTLE_ARTICLES.map(({ text, href }) => (
                  <Link key={href} href={href} className="group block">
                    <p className="text-gray-300 text-sm group-hover:text-sky-400 transition-colors leading-snug">{text}</p>
                  </Link>
                ))}
              </div>
            </div>
            <AdPlaceholder slot="sidebar" />
          </aside>

        </div>
      </div>
    <ArticlePopupTriggers type="mtle" />
    </div>
  );
}
