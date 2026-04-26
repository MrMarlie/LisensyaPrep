import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'LET Secondary Major Filipino Reviewer 2026 Philippines (Complete Guide)',
  description:
    'Taking the LET for Secondary Filipino? This reviewer covers gramatika, kasaysayan ng wikang Filipino, panitikan, retorika, and Filipino teaching methods tested in the LET major subject.',
  path: '/education/let-secondary-major-filipino-reviewer',
  image: '/images/articles/hero-let-secondary-filipino.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LET Secondary Major Filipino Reviewer 2026 Philippines',
  description:
    'Complete LET Secondary Major Filipino reviewer covering kasaysayan ng wikang Filipino, gramatika, panitikan, retorika, and Filipino teaching methods.',
  image: 'https://lisensyaprep.com/images/articles/hero-let-secondary-filipino.jpg',
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
    '@id': 'https://lisensyaprep.com/education/let-secondary-major-filipino-reviewer',
  },
};

const RELATED_ARTICLES = [
  { text: 'How to Pass the LET on Your First Take', href: '/education/how-to-pass-let-first-take' },
  { text: 'LET Coverage 2026 Complete Subject Breakdown', href: '/education/let-coverage-2026' },
  { text: 'Professional Education Reviewer LET 2026', href: '/education/professional-education-reviewer' },
  { text: 'General Education Reviewer LET 2026', href: '/education/general-education-reviewer' },
  { text: 'LET Secondary Major Science Reviewer 2026', href: '/education/let-secondary-major-science-reviewer' },
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
*By LisensyaPrep Team | Last Updated: April 2026 | 10-minute read*

---

Ang LET Secondary Major sa Filipino ay sumusubok ng iyong kaalaman sa wikang Filipino, panitikan, at mga pamamaraan ng pagtuturo nito sa antas sekundarya. Hindi lang basta kaalaman sa gramatika ang tinatasa dito. Kasama rin ang pag-unawa sa kasaysayan ng wika, pagsusuri ng mga akda, at kung paano ituturo ang mga ito nang epektibo sa mga mag-aaral.

This reviewer is written primarily in English with key Filipino terminology included, matching the format of the actual LET which uses both languages. It covers the highest-yield topics for the Filipino major specialization.

---

## Kasaysayan ng Wikang Filipino

The history of the Filipino language is one of the most consistently tested topics in the LET Filipino major. Know the key milestones.
`;

const SECTION_2 = `
---

## Gramatika: Grammar of the Filipino Language

### Mga Bahagi ng Pananalita (Parts of Speech)

The eight parts of speech in Filipino are tested consistently in the LET major. Know each one with examples.

**Pangngalan (Noun):** Names a person, place, thing, or idea. Subtypes: pantangi (proper), pambalana (common), kongkreto (concrete), abstrakto (abstract), kolektibo (collective).

**Panghalip (Pronoun):** Replaces a noun. Examples: ako, ikaw, siya, kami, tayo, kayo, sila. Know the distinction between kami (exclusive we, excludes the listener) and tayo (inclusive we, includes the listener).

**Pandiwa (Verb):** Expresses action or state. Filipino verbs change form through affixes. Know the focus system: actor focus (AF), object focus (OF), beneficiary focus (BF), and locative focus (LF).

**Pang-uri (Adjective):** Describes a noun. Degree of comparison: positibo (positive), komparativo (comparative, mas maganda), superlatibo (superlative, pinaka-maganda).

**Pang-abay (Adverb):** Modifies a verb, adjective, or another adverb. Types: pamanahon (time), panlunan (place), pamaraan (manner), panggaano (degree).

**Pang-ukol (Preposition):** Shows relationship between words. Examples: sa, para sa, tungkol sa, mula sa.

**Pangatnig (Conjunction):** Connects words, phrases, or clauses. Types: panagano (coordinating: at, o, ngunit), pantulong (subordinating: dahil, kung, habang).

**Padamdam (Interjection):** Expresses emotion. Examples: Ay, Naku, Hala, Susmaryosep.

---

### Kayarian ng Pangungusap (Sentence Structure)

Filipino sentences are structured around two main parts: the **panaguri** (predicate, what is said) and the **paksa** (subject, who or what the sentence is about).

**Uri ng pangungusap ayon sa kayarian:**

**Payak (Simple):** One independent clause with one complete thought.

**Tambal (Compound):** Two or more independent clauses joined by a coordinating conjunction.

**Hugnayan (Complex):** One independent clause and one or more dependent clauses joined by a subordinating conjunction.

**Langkapan (Compound-Complex):** Combines compound and complex structures.

---

## Panitikan: Philippine Literature

### Panahon ng Panitikan (Literary Periods)

| Panahon | Katangian |
|---------|-----------|
| Prekolonyal | Oral tradition: epics, myths, riddles, proverbs. Walang sistemang pagsulat. |
| Espanyol (1565 to 1898) | Relihiyosong literatura, awit, korido, sarsuwela. Influence ng Kristiyanismo. |
| Amerikano (1898 to 1946) | Pagtaas ng panitikang Ingles. Short story, novel, journalism. |
| Hapon (1942 to 1945) | Propaganda literature. Pagtangkilik sa Filipino bilang wikang panturo. |
| Republika (1946 hanggang kasalukuyan) | Modernong panitikan sa Filipino at Ingles. Nagtataglay ng makabansang diwa. |

### Mga Anyo ng Panitikan

**Epiko (Epic):** Mahabang tula na nagsasalaysay ng mga pakikipaglaban ng bayani. Halimbawa: Ibong Adarna, Florante at Laura (ni Francisco Balagtas), Biag ni Lam-ang (Ilokano epic).

**Awit at Korido:** Mahabang tula na may sukat at tugma. Ang awit ay may 12 pantig bawat linya (dodecasyllabic). Ang korido ay may 8 pantig (octosyllabic).

**Sarsuwela:** Musikal na dula na may kanta, sayaw, at diyalogo. Katanyagan noong panahon ng Kastila hanggang Amerikano.

**Maikling Kuwento:** Short story na may iisang kilos, limitadong tauhan, at malinaw na temang ginaganap.

### Mga Piling Akda at Manunulat

**Francisco Balagtas (Baltazar):** Kinikilalang Hari ng Makatang Tagalog. Akda: Florante at Laura. Ginamit ang alegorya upang punahin ang pamamalakad ng mga Kastila.

**Jose Rizal:** Noli Me Tangere at El Filibusterismo. Naisulat sa Espanyol ngunit may malalim na impluwensya sa pambansang kamalayan.

**Lope K. Santos:** Balarila ng Wikang Pambansa (1940). Nagtatag ng sistematikong gramatika para sa wikang pambansa.

---

## Retorika at Komunikasyon

### Uri ng Komunikasyon

**Verbal communication:** Wikang sinasalita o sinusulat bilang paraan ng paghahatid ng mensahe.

**Non-verbal communication:** Kilos, ekspresyon ng mukha, tono ng boses, espasyo (proxemics), at iba pang hindi-wikang palatandaan.

### Proseso ng Komunikasyon

Sender (nagpapadala) produces a message, encodes it, sends it through a channel, the receiver decodes it and sends feedback. Noise (ingay) refers to anything that interferes with the accurate transmission of the message.

### Antas ng Wika (Levels of Language)

**Pormal:** Ginagamit sa opisyal na sitwasyon, akademiko, at propesyonal na pakikipag-ugnayan.

**Di-pormal:** Ginagamit sa pang-araw-araw na pakikipag-usap sa mga kakilala at kaibigan.

**Kolokyal:** Impormal na antas na ginagamit sa mga kaibigan at pamilya.

**Balbal (Slang):** Hindi tinatanggap sa pormal na sitwasyon. Halimbawa: chika, petmalu, werpa.

---

## Mga Pamamaraan ng Pagtuturo ng Filipino

### Communicative Language Teaching (CLT)

Pinapahalagahan ang tunay na komunikasyon kaysa sa memorisasyon ng gramatika. Ginagamit ang wika sa makabuluhang gawain.

### Whole Language Approach

Itinuturo ang wika bilang isang buo, hindi hiwa-hiwalay na kasanayan. Pinagsama ang pakikinig, pagsasalita, pagbabasa, at pagsulat.

### Process Writing Approach

Itinuturo ang pagsulat bilang proseso: pre-writing (pag-iisip at pagpaplano), drafting (pagsulat ng unang kopya), revising (pagwawasto ng nilalaman), editing (pagwawasto ng gramatika at pagbabaybay), publishing (paglalathala).

---

## Practice What You Just Learned

LET Secondary Major Filipino questions test both content knowledge and the ability to teach Filipino effectively in secondary classrooms. Practice questions are available at LisensyaPrep. No account needed.

**[Practice LET Secondary Filipino Questions at LisensyaPrep](/education)**

---

## Related LET Articles

- [How to Pass the LET on Your First Take](/education/how-to-pass-let-first-take)
- [LET Coverage 2026 Complete Subject Breakdown](/education/let-coverage-2026)
- [Professional Education Reviewer LET 2026](/education/professional-education-reviewer)
- [General Education Reviewer LET 2026](/education/general-education-reviewer)
- [LET Secondary Major Science Reviewer 2026](/education/let-secondary-major-science-reviewer)
`;

export default function LETFilipinoReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-let-filipino" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Secondary Major Filipino Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">
                Education (LET)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                LET Secondary Major Filipino Reviewer 2026 Philippines
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span>
                <span>•</span>
                <span>April 27, 2026</span>
                <span>•</span>
                <span>10 min read</span>
              </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src="/images/articles/hero-let-secondary-filipino.jpg"
                alt="Young Filipino female teacher in maroon blouse holding a book for LET secondary major Filipino reviewer Philippines 2026"
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="prose-content">
              {renderContent(SECTION_1)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="320" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Kasaysayan ng Wikang Filipino: Key Milestones</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="38" fill="#1e3a5f" rx="5"/>
                  <text x="130" y="66" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">1937</text>
                  <text x="420" y="63" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Itinatag ang Surian ng Wikang Pambansa</text>
                  <text x="420" y="79" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Pinili ang Tagalog bilang batayan ng pambansang wika. Inihalal si Jaime de Veyra bilang unang direktor.</text>
                  <rect x="40" y="94" width="680" height="38" fill="#172033" rx="5"/>
                  <text x="130" y="110" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">1959</text>
                  <text x="420" y="107" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Pinalitan ng pangalang Pilipino</text>
                  <text x="420" y="123" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Sa ilalim ng Kalihim ng Edukasyon na si Jose Romero, pinalitan ng Pilipino ang Wikang Pambansa.</text>
                  <rect x="40" y="138" width="680" height="38" fill="#1e3a5f" rx="5"/>
                  <text x="130" y="154" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">1973</text>
                  <text x="420" y="151" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Saligang Batas 1973: Filipino bilang opisyal na wika</text>
                  <text x="420" y="167" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Idineklara ang Filipino at Ingles bilang mga opisyal na wika ng Pilipinas.</text>
                  <rect x="40" y="182" width="680" height="38" fill="#172033" rx="5"/>
                  <text x="130" y="198" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">1976</text>
                  <text x="420" y="195" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Itinatag ang Komisyon sa Wikang Filipino (KWF)</text>
                  <text x="420" y="211" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Pinalitan ang Surian ng Wikang Pambansa. Naging katawan ng gobyerno para sa wikang Filipino.</text>
                  <rect x="40" y="226" width="680" height="38" fill="#1e3a5f" rx="5"/>
                  <text x="130" y="242" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">1987</text>
                  <text x="420" y="239" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">Saligang Batas 1987: Filipino bilang pambansang wika</text>
                  <text x="420" y="255" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Idineklara ang Filipino bilang pambansang wika. Nagpatuloy ang Filipino at Ingles bilang opisyal na wika.</text>
                  <rect x="40" y="270" width="680" height="38" fill="#14532d" rx="5"/>
                  <text x="130" y="286" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">2009</text>
                  <text x="420" y="283" textAnchor="middle" fill="#d1fae5" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">RA 9745: Opisyal na pagkilala sa KWF</text>
                  <text x="420" y="299" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">Pinalkas ang mandato ng Komisyon sa Wikang Filipino bilang opisyal na katawan para sa wikang Filipino.</text>
                  <text x="380" y="313" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Arial,sans-serif">LisensyaPrep.com | LET Secondary Major Filipino Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Key milestones in the history of the Filipino language</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_2)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice LET Secondary Filipino questions with instant feedback. No registration required.
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
