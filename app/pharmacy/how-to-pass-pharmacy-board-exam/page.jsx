import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'How to Pass the Pharmacy Board Exam on Your First Take (2026 PLE Guide Philippines)',
  description:
    'Planning to take the PRC pharmacy board exam? This honest guide covers PLE coverage, a study plan, and proven strategies to help you pass the pharmacy licensure exam on your first attempt in 2026.',
  path: '/pharmacy/how-to-pass-pharmacy-board-exam',
  image: '/images/articles/hero-pharmacy-how-to-pass.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Pass the Pharmacy Board Exam on Your First Take (2026 PLE Guide Philippines)',
  description:
    'Complete guide to passing the PRC Pharmacy Licensure Examination on the first attempt covering PLE subject areas, a 10-week study plan, and proven strategies.',
  image: 'https://lisensyaprep.com/images/articles/hero-pharmacy-how-to-pass.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-02',
  dateModified: '2026-05-02',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/pharmacy/how-to-pass-pharmacy-board-exam' },
};

const RELATED_ARTICLES = [
  { text: 'PLE Coverage 2026 Complete Subject Breakdown', href: '/pharmacy/ple-coverage-2026' },
  { text: 'Pharmacology Reviewer PLE Philippines 2026', href: '/pharmacy/pharmacology-reviewer' },
  { text: 'Pharmaceutical Chemistry Reviewer PLE 2026', href: '/pharmacy/pharmaceutical-chemistry-reviewer' },
  { text: 'Pharmaceutical Calculations Practice Problems PLE 2026', href: '/pharmacy/pharmaceutical-calculations-reviewer' },
  { text: 'Clinical Pharmacy Reviewer PLE Philippines 2026', href: '/pharmacy/clinical-pharmacy-reviewer' },
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
*By LisensyaPrep Team | Last Updated: May 2026 | 9-minute read*

---

The Pharmacy Licensure Examination is one of the most content-dense board exams in the PRC system. It spans five major disciplines from pharmaceutical chemistry to clinical pharmacotherapeutics, requiring both broad coverage and the ability to apply knowledge to patient-care scenarios.

This guide gives you the honest picture of what the PLE tests, what a structured review looks like, and the specific strategies that make the difference between passing on your first attempt and needing a retake.

---

## What the PLE Actually Tests
`;

const SECTION_2 = `
**To pass the PLE:** General weighted average of at least 75 percent with no individual subject falling below 60 percent.

---

## The 10-Week PLE Study Plan
`;

const SECTION_3 = `
---

## 6 Strategies That Separate Passers from Retakers

### 1. Master Pharmaceutical Calculations First

Calculation questions are the most reliable free points in the PLE. They have one definite correct answer and they reward practice over memorization. Spend dedicated time on dilutions, dosage calculations, IV flow rates, and isotonicity. Once you can solve these automatically, you free up mental energy for conceptual questions.

### 2. Build Drug Class Frameworks for Pharmacology

The most common mistake in PLE pharmacology review is memorizing individual drugs in isolation. Instead, learn drug classes as frameworks: mechanism of action, key therapeutic uses, major adverse effects, and important contraindications. When you see a new drug name in a question, you can identify its class from the name ending and apply the class framework.

Common name endings to know: -olol (beta-blockers), -pril (ACE inhibitors), -sartan (ARBs), -dipine (calcium channel blockers), -statin (HMG-CoA reductase inhibitors), -cillin (penicillins), -mycin (macrolides or aminoglycosides), -azole (antifungals or proton pump inhibitors).

### 3. Know the Four Major Pharmacy Laws Cold

Pharmacy Law is one of the most predictable subjects in the PLE. Four laws cover the vast majority of questions: RA 5921 (Pharmacy Law), RA 9502 (Cheaper Medicines Act), RA 9165 (Dangerous Drugs Act), and RA 9711 (FDA Act). For each law, know its title, key provisions, and the penalties for violations.

### 4. Never Neglect Clinical Pharmacy

Clinical pharmacy is the most recently emphasized subject in the PLE. Examinees who focus heavily on the basic sciences (chemistry and pharmacology) and underestimate clinical pharmacy are increasingly finding it pulls their GWA below 75. Give it equal time with the other subjects.

### 5. Practice CYP450 Interactions Until They Are Automatic

CYP450 drug interactions appear in both Pharmacology and Clinical Pharmacy sections of the PLE. Know the major inhibitors (ketoconazole, erythromycin, ritonavir, grapefruit juice) and major inducers (rifampicin, phenytoin, carbamazepine, St. John's Wort) and their clinical consequences.

### 6. Use LisensyaPrep for Daily Practice from Week 2 Onward

Reading reviewers builds the foundation. Answering questions builds exam-ready thinking. Starting from Week 2, dedicate 30 to 45 minutes daily to practice questions on LisensyaPrep in addition to your reading. The immediate feedback on wrong answers is more efficient than re-reading chapters.

---

## The Week Before Your PLE

Stop adding new material 7 days before exam day. Review your weak spots list only. Protect your sleep every night. A well-rested brain on exam day outperforms a sleep-deprived brain that crammed one more chapter.

Print and verify your Notice of Admission. Confirm your testing center location. Pack your bag the night before with all required documents and materials.

---

## Start Your PLE Review at LisensyaPrep

LisensyaPrep has free practice questions for all five PLE subjects. No account needed.

**[Start Your PLE Practice Quiz at LisensyaPrep](https://lisensyaprep.com/pharmacy)**
`;

export default function HowToPassPharmacyBoardExamPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-how-to-pass-ple" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/pharmacy" className="text-gray-500 hover:text-gray-300 transition-colors">Pharmacy</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">How to Pass the Pharmacy Board Exam</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">
                Pharmacy (PLE)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                How to Pass the Pharmacy Board Exam on Your First Take (2026 PLE Guide Philippines)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>May 2, 2026</span>
                <span>•</span>
                <span>9 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-pharmacy-how-to-pass.jpg"
                alt="Young Filipino female pharmacist in white coat holding medicine bottle with thumbs up for PLE board exam guide Philippines 2026"
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
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">PLE Five Subject Areas at a Glance</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="38" fill="#1e3a5f" rx="6"/>
                  <text x="200" y="70" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PHARMACEUTICAL CHEMISTRY</text>
                  <text x="490" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Acid-base, drug stability, functional groups, solubility, analysis</text>
                  <rect x="40" y="94" width="680" height="38" fill="#172033" rx="6"/>
                  <text x="200" y="114" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PHARMACOLOGY AND TOXICOLOGY</text>
                  <text x="490" y="114" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Mechanisms, drug classes, adverse effects, toxicology antidotes</text>
                  <rect x="40" y="138" width="680" height="38" fill="#1e3a5f" rx="6"/>
                  <text x="200" y="158" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PHARMACY AND DRUG INFORMATION</text>
                  <text x="490" y="158" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Compounding, dispensing, calculations, pharmaceutical technology</text>
                  <rect x="40" y="182" width="680" height="38" fill="#172033" rx="6"/>
                  <text x="200" y="202" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">PHARMACY LAW, ETHICS AND JURISPRUDENCE</text>
                  <text x="490" y="202" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">RA 5921, RA 9502, RA 9165, RA 9711, FDA Philippines</text>
                  <rect x="40" y="226" width="680" height="38" fill="#14532d" rx="6"/>
                  <text x="200" y="246" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">CLINICAL PHARMACY AND THERAPEUTICS</text>
                  <text x="490" y="246" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="Arial,sans-serif">Pharmacokinetics, drug interactions, TDM, disease management</text>
                  <text x="380" y="272" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | Passing: 75% GWA, no subject below 60%</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>PLE five subject areas overview</figcaption>
              </figure>

              {renderContent(SECTION_2)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="300" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">PLE 10-Week Self-Review Plan</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="32" fill="#1e293b" rx="5"/>
                  <text x="150" y="70" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">WEEK 1</text>
                  <text x="460" y="70" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Arial,sans-serif">Diagnostic quiz all 5 subjects. Map weak spots. Adjust plan accordingly.</text>
                  <rect x="40" y="88" width="680" height="32" fill="#1e3a5f" rx="5"/>
                  <text x="150" y="104" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">WEEK 2</text>
                  <text x="150" y="114" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Pharmaceutical Chemistry</text>
                  <text x="460" y="108" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">pH, buffers, drug stability, functional groups, solubility, spectrophotometry.</text>
                  <rect x="40" y="126" width="680" height="32" fill="#172033" rx="5"/>
                  <text x="150" y="142" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">WEEK 3</text>
                  <text x="150" y="152" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Pharmacology Part 1</text>
                  <text x="460" y="146" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">ANS drugs, cardiovascular drugs, CNS drugs, mechanisms and adverse effects.</text>
                  <rect x="40" y="164" width="680" height="32" fill="#1e3a5f" rx="5"/>
                  <text x="150" y="180" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">WEEK 4</text>
                  <text x="150" y="190" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Pharmacology Part 2</text>
                  <text x="460" y="184" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Antibiotics, antifungals, antivirals, chemotherapy, toxicology antidotes.</text>
                  <rect x="40" y="202" width="680" height="32" fill="#172033" rx="5"/>
                  <text x="150" y="218" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">WEEK 5</text>
                  <text x="150" y="228" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Pharmacy and Drug Information</text>
                  <text x="460" y="222" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Calculations, compounding, pharmaceutical technology, dosage forms.</text>
                  <rect x="40" y="240" width="680" height="32" fill="#1e3a5f" rx="5"/>
                  <text x="150" y="256" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">WEEK 6</text>
                  <text x="150" y="266" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Arial,sans-serif">Pharmacy Law + Clinical Pharmacy</text>
                  <text x="460" y="260" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Arial,sans-serif">Key laws, FDA Philippines, ADME, CYP450, TDM, disease management.</text>
                  <rect x="40" y="278" width="680" height="16" fill="#14532d" rx="5"/>
                  <text x="380" y="290" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">WEEKS 7 TO 10: Mixed practice sessions, weak spot repair, rest in final days.</text>
                  <text x="380" y="298" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">LisensyaPrep.com</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>PLE 10-week self-review plan</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_3)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-purple-900/20 to-purple-900/10 border border-purple-500/30 rounded-2xl p-6 text-center">
              <p className="text-purple-400 font-extrabold text-lg mb-2">Ready to Start Your PLE Review?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice all five PLE subjects with instant feedback. No registration required.
              </p>
              <Link
                href="/pharmacy"
                className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Start Pharmacy Practice at LisensyaPrep →
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />

            <div className="mt-10">
              <h2 className="text-xl font-extrabold text-white mb-4">Related Pharmacy Articles</h2>
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
              <h3 className="text-white font-bold mb-4">Pharmacy Study Guides</h3>
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
