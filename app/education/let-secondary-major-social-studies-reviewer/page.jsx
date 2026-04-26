import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'LET Secondary Major Social Studies Reviewer 2026 Philippines (Complete Guide)',
  description:
    'Taking the LET for Secondary Social Studies? This reviewer covers Philippine history, world history, economics, political science, geography, and social studies teaching methods tested in the LET.',
  path: '/education/let-secondary-major-social-studies-reviewer',
  image: '/images/articles/hero-let-secondary-social-studies.jpg',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LET Secondary Major Social Studies Reviewer 2026 Philippines',
  description:
    'Complete LET Secondary Major Social Studies reviewer covering Philippine history, world history, economics, political science, geography, and social studies teaching methods.',
  image: 'https://lisensyaprep.com/images/articles/hero-let-secondary-social-studies.jpg',
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
    '@id': 'https://lisensyaprep.com/education/let-secondary-major-social-studies-reviewer',
  },
};

const RELATED_ARTICLES = [
  { text: 'How to Pass the LET on Your First Take', href: '/education/how-to-pass-let-first-take' },
  { text: 'LET Coverage 2026 Complete Subject Breakdown', href: '/education/let-coverage-2026' },
  { text: 'Professional Education Reviewer LET 2026', href: '/education/professional-education-reviewer' },
  { text: 'LET Secondary Major Science Reviewer', href: '/education/let-secondary-major-science-reviewer' },
  { text: 'LET Application Guide and Passing Rate 2026', href: '/education/let-application-guide-2026' },
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

The LET Secondary Major in Social Studies is one of the widest-ranging specializations in the board exam. It covers Philippine history, world history, economics, political science, geography, and sociology, plus the pedagogical methods for teaching all of it effectively.

The key to reviewing Social Studies is knowing which historical events, concepts, and connections carry the most weight in the LET and focusing your time there rather than trying to memorize every date and name in the textbook. This reviewer covers the highest-yield topics for each discipline.

---

## Philippine History

### Pre-Colonial Philippines

Before Spanish colonization, the Philippine archipelago was composed of barangays, small autonomous communities governed by a datu or chief. Society was divided into three classes: the datu (ruling class), the timawa or maharlika (freemen), and the alipin (dependent class).

Pre-colonial Filipinos had their own systems of writing (Baybayin), trade networks with China, India, and other Southeast Asian nations, and rich oral literary traditions including epics, riddles, and folk tales.

### The Spanish Colonial Period (1565 to 1898)

**Key events:**

**1565:** Miguel Lopez de Legazpi established the first permanent Spanish settlement in Cebu. The Philippines was named after King Philip II of Spain.

**1571:** Manila was established as the colonial capital after the defeat of Rajah Sulayman.

**Galleon Trade (1565 to 1815):** Manila served as the hub of trade between Asia (particularly China) and New Spain (Mexico). Silk, porcelain, and spices moved eastward while silver moved westward. This enriched the colonial government but limited Philippine economic development.

**The Propagandists and the Reform Movement:** Filipino ilustrados (educated elite) in Spain, including Jose Rizal, Marcelo H. del Pilar, and Graciano Lopez Jaena, campaigned for reforms through La Solidaridad and other publications.

**1896 Philippine Revolution:** The Katipunan, founded by Andres Bonifacio in 1892, launched an armed revolt against Spain on August 23 to 26, 1896 (Cry of Pugad Lawin). Bonifacio led the masses while Emilio Aguinaldo led the Magdalo faction.

**Pact of Biak-na-Bato (1897):** Aguinaldo and other leaders accepted exile to Hong Kong in exchange for Spanish reforms and payment. The reforms were never fully implemented.

**1896:** Jose Rizal was executed by firing squad in Bagumbayan (now Rizal Park) on December 30. His execution strengthened Filipino resolve for independence.
`;

const SECTION_2 = `
### The American Colonial Period (1898 to 1946)

**1898:** Spain ceded the Philippines to the United States through the Treaty of Paris for $20 million following the Spanish-American War.

**June 12, 1898:** Emilio Aguinaldo declared Philippine independence in Kawit, Cavite. This date is now celebrated as Philippine Independence Day.

**1899 to 1902:** Philippine-American War. The United States suppressed Filipino resistance. Aguinaldo was captured in 1901 at Palanan, Isabela.

**Commonwealth Period (1935 to 1946):** Under the Tydings-McDuffie Act of 1934, the Philippines was granted Commonwealth status with a 10-year transition to independence. Manuel L. Quezon became the first President of the Commonwealth.

**1942 to 1945:** Japanese occupation during World War II. The Fall of Bataan (April 9, 1942), Death March, and the Battle of Leyte Gulf were significant events.

**July 4, 1946:** The Philippines achieved full independence from the United States.

---

## Philippine Government Structure

### The 1987 Constitution

The 1987 Philippine Constitution established the current structure of the Philippine government following the EDSA Revolution of February 1986 that ended the Marcos dictatorship.

**Three branches of government:**

**Legislative (Congress):** Composed of the Senate (24 senators, elected at-large, 6-year terms, maximum of 2 consecutive terms) and the House of Representatives (district and party-list representatives, 3-year terms, maximum of 3 consecutive terms).

**Executive:** The President is the head of state and government. Elected to a single 6-year term with no reelection. The Vice President is elected separately and can serve up to two terms.

**Judicial:** The Supreme Court is the highest court, composed of a Chief Justice and 14 Associate Justices. Below the Supreme Court are the Court of Appeals, Sandiganbayan (anti-graft court), Court of Tax Appeals, and lower courts.

---

## Economics

### Basic Economic Concepts

**Scarcity:** Resources are limited while human wants are unlimited. This fundamental problem forces choices about how to allocate resources.

**Opportunity cost:** The value of the next best alternative foregone when a choice is made. If you choose to spend your Saturday reviewing for the LET, the opportunity cost is whatever else you would have done with that time.

**Supply and demand:** Price is determined by the interaction of supply (how much producers are willing to sell at various prices) and demand (how much consumers are willing to buy at various prices). When supply increases and demand stays the same, prices tend to fall. When demand increases and supply stays the same, prices tend to rise.

**GDP (Gross Domestic Product):** The total monetary value of all goods and services produced within a country's borders in a given time period. It is the primary measure of a nation's economic output.

**Inflation:** A general increase in prices over time, reducing the purchasing power of money. Measured by the Consumer Price Index (CPI) in the Philippines.

---

## Geography

### Philippine Geography

The Philippines is an archipelago of 7,641 islands (official count) located in Southeast Asia. It is bounded by the South China Sea to the west, the Philippine Sea to the east, and the Celebes Sea to the south.

**Major island groups:** Luzon (largest, includes Metro Manila), Visayas (central islands including Cebu, Bohol, Leyte, Samar), and Mindanao (second largest, southernmost major island).

**Physical features:** The Philippines sits on the Pacific Ring of Fire, making it prone to volcanic eruptions and earthquakes. Major volcanoes include Mayon (most active), Taal, and Pinatubo (1991 eruption).

### World Geography Concepts

**Types of maps:** Political maps show boundaries and capitals. Physical maps show natural features. Thematic maps show specific data distributions (population, climate, resources).

**Latitude and longitude:** Latitude measures distance north or south of the equator (0°). Longitude measures distance east or west of the Prime Meridian (0°). The Philippines is approximately 5° to 20°N latitude and 116° to 127°E longitude.

---

## Teaching Social Studies

### Inquiry-Based Approach

Social studies inquiry places students in the role of historians and social scientists. Students examine primary sources, evaluate evidence, and construct their own understandings of historical events and social phenomena.

**Historical thinking skills tested in the LET:** Chronological thinking, historical comprehension, historical analysis and interpretation, historical research, historical issues and decision analysis.

### Cooperative Learning in Social Studies

Group activities like jigsaw (each member becomes an expert on one subtopic and teaches others), think-pair-share, and structured academic controversy are particularly effective in social studies because they mirror the social and civic processes students are studying.

### Values Integration

Social studies is unique among secondary subjects in its explicit mandate to develop values and character alongside content knowledge. The LET tests whether future teachers understand how to integrate values education into social studies instruction.

---

## Practice What You Just Learned

LET Secondary Major Social Studies covers a wide range of content disciplines. The key is practicing application questions that require you to connect historical events, apply economic concepts, or identify the appropriate teaching strategy for a given social studies lesson.

Head to LisensyaPrep now. No registration required.

**[Practice LET Secondary Social Studies Questions at LisensyaPrep](/education)**

---

## Related LET Articles

- [How to Pass the LET on Your First Take](/education/how-to-pass-let-first-take)
- [LET Coverage 2026 Complete Subject Breakdown](/education/let-coverage-2026)
- [Professional Education Reviewer LET 2026](/education/professional-education-reviewer)
- [LET Secondary Major Science Reviewer](/education/let-secondary-major-science-reviewer)
- [LET Application Guide and Passing Rate 2026](/education/let-application-guide-2026)
`;

export default function LETSocialStudiesReviewerPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-let-soc-studies" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Secondary Major Social Studies Reviewer</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">
                Education (LET)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                LET Secondary Major Social Studies Reviewer 2026 Philippines
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
                src="/images/articles/hero-let-secondary-social-studies.jpg"
                alt="Young Filipino male social studies teacher in dark shirt holding folder for LET secondary major social studies reviewer Philippines 2026"
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
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Philippine History Timeline: Key Events</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <line x1="380" y1="50" x2="380" y2="240" stroke="#334155" strokeWidth="2"/>
                  <circle cx="380" cy="70" r="8" fill="#f59e0b"/>
                  <text x="260" y="66" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">1565</text>
                  <text x="260" y="80" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Legazpi in Cebu</text>
                  <circle cx="380" cy="100" r="8" fill="#f59e0b"/>
                  <text x="500" y="96" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">1872</text>
                  <text x="500" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Gomburza executed</text>
                  <circle cx="380" cy="130" r="8" fill="#f59e0b"/>
                  <text x="260" y="126" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">1896</text>
                  <text x="260" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Katipunan revolt, Rizal executed</text>
                  <circle cx="380" cy="160" r="8" fill="#86efac"/>
                  <text x="500" y="156" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">1898</text>
                  <text x="500" y="170" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Declaration of Independence, June 12</text>
                  <circle cx="380" cy="190" r="8" fill="#fca5a5"/>
                  <text x="260" y="186" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">1899</text>
                  <text x="260" y="200" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Philippine-American War begins</text>
                  <circle cx="380" cy="220" r="8" fill="#f59e0b"/>
                  <text x="500" y="216" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif">1946</text>
                  <text x="500" y="230" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Arial,sans-serif">Philippine Independence, July 4</text>
                  <text x="380" y="252" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | LET Secondary Major Social Studies Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Key events in Philippine history for the LET Social Studies major</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />

              {renderContent(SECTION_2)}
            </div>

            <div className="mt-10 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Ready to Test Your Knowledge?</p>
              <p className="text-gray-400 text-sm mb-4">
                Practice LET Secondary Social Studies questions with instant feedback. No registration required.
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
