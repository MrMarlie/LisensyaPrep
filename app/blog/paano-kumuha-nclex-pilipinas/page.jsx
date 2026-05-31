import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Paano Kumuha ng NCLEX sa Pilipinas 2026 (Kumpletong Gabay)',
  description:
    'Paano kumuha ng NCLEX sa Pilipinas? Kumpletong gabay para sa mga Pinoy nurses - requirements, CGFNS, state board, Pearson VUE Manila at Cebu, at gastos ng NCLEX 2026.',
  path: '/blog/paano-kumuha-nclex-pilipinas',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Paano Kumuha ng NCLEX sa Pilipinas 2026 Kumpletong Gabay',
  description:
    'Kumpletong gabay kung paano kumuha ng NCLEX sa Pilipinas para sa mga Pinoy nurses - requirements, CGFNS, state board, Pearson VUE Manila at Cebu, at gastos.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team' },
  publisher: { '@type': 'Organization', name: 'LisensyaPrep' },
  datePublished: '2026-06-01',
  dateModified: '2026-06-01',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/blog/paano-kumuha-nclex-pilipinas' },
};

const ALL_NCLEX_ARTICLES = [
  { text: 'What is the NCLEX? Complete Guide for Filipino Nurses', href: '/nursing/what-is-the-nclex' },
  { text: 'How to Take NCLEX in the Philippines (Step-by-Step)', href: '/nursing/how-to-take-nclex-philippines' },
  { text: 'NCLEX vs PNLE: Complete Comparison for Filipino Nurses', href: '/nursing/nclex-vs-pnle-comparison' },
  { text: 'NCLEX Gateway States for Filipino Nurses', href: '/nursing/nclex-gateway-states-filipinos' },
  { text: 'How to Pass the NCLEX on Your First Take', href: '/nursing/how-to-pass-nclex-first-take' },
  { text: 'NCLEX Lab Values Cheat Sheet', href: '/nursing/nclex-lab-values-cheat-sheet' },
  { text: 'NCLEX Dosage Calculation Practice 2026', href: '/nursing/nclex-dosage-calculation-practice' },
  { text: 'Mga Tips para Pumasa sa NCLEX 2026', href: '/blog/mga-tips-pumasa-nclex' },
  { text: 'Libreng NCLEX Reviewer Philippines 2026', href: '/blog/libreng-nclex-reviewer-philippines' },
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
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />);
    } else if (line.match(/^\d+\. /)) {
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, '')) }} />);
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
  let listBuffer = [];
  let inTable = false;
  let inList = false;
  for (const el of elements) {
    if (el.type === 'tr') {
      if (inList) { wrapped.push(<ul key={`ul-${key++}`} className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>); listBuffer = []; inList = false; }
      inTable = true; tableBuffer.push(el);
    } else if (el.type === 'li') {
      if (inTable) { wrapped.push(<div key={`tbl-${key++}`} className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>); tableBuffer = []; inTable = false; }
      inList = true; listBuffer.push(el);
    } else {
      if (inTable) { wrapped.push(<div key={`tbl-${key++}`} className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>); tableBuffer = []; inTable = false; }
      if (inList) { wrapped.push(<ul key={`ul-${key++}`} className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>); listBuffer = []; inList = false; }
      wrapped.push(el);
    }
  }
  if (inTable && tableBuffer.length) wrapped.push(<div key="tbl-final" className="overflow-x-auto my-4"><table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden"><tbody>{tableBuffer}</tbody></table></div>);
  if (inList && listBuffer.length) wrapped.push(<ul key="ul-final" className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>);
  return wrapped;
}

const MAIN_CONTENT = `
Maraming Pinoy nurses ang gustong magtrabaho sa Amerika, pero hindi alam kung paano magsimula. Ang magandang balita: pwede kang kumuha ng **NCLEX dito mismo sa Pilipinas** nang hindi na kailangang lumipad pa sa Amerika.

Sa gabay na ito, ipapaliwanag namin nang step-by-step kung paano kumuha ng NCLEX bilang isang Pilipinong nars.

---

## Ano ang NCLEX?

Ang **NCLEX (National Council Licensure Examination)** ay ang opisyal na lisensiyang pagsusulit para sa mga nars sa Estados Unidos. Kailangan mong pumasa dito para makakuha ng lisensya bilang Registered Nurse sa Amerika at iba pang bansa.

Para sa mga Pinoy nurses na may BSN, ang **NCLEX-RN** ang dapat kunin.

Kung gusto mong maintindihan ang pagkakaiba ng NCLEX at PNLE, basahin ang aming [paghahambing ng NCLEX at PNLE](/nursing/nclex-vs-pnle-comparison).

---

## Bakit Kumukuha ng NCLEX ang mga Pinoy Nurses?

- **Mas malaking sahod** - Ang RN sa Amerika ay kumikita ng $80,000 hanggang $120,000 kada taon
- **Mas magandang kondisyon sa trabaho** - Mas kaunting pasyente kada nars
- **Daan papuntang permanenteng paninirahan** - Maraming Pinoy nurses ang nakakakuha ng green card
- **Pagkakataon para sa pamilya** - Maraming nakakatulong sa pamilya sa pamamagitan ng remittance

Humigit-kumulang **20,000 hanggang 25,000 Pinoy nurses** ang kumukuha ng NCLEX kada taon.

---

## Ang 5 Hakbang para Kumuha ng NCLEX sa Pilipinas

Ang buong proseso ay karaniwang tumatagal ng **6 hanggang 12 buwan**.

### Hakbang 1: Pumili ng US State

Kailangan mong mag-apply sa isang partikular na US State Board of Nursing. Ang mga sikat na pinipili ng mga Pinoy:

- **New York** - Pinakamadaling requirements (walang concurrency requirement, hindi kailangan ng Social Security Number para mag-test)
- **California** - Pinakamaraming Pinoy, pero mas mahigpit ang requirements
- **Texas** - Maraming trabaho, mas mababang gastos sa pamumuhay
- **Illinois** - Madaling proseso para sa foreign-trained nurses

Para sa detalyadong paghahambing ng mga state, basahin ang aming [gabay sa NCLEX gateway states](/nursing/nclex-gateway-states-filipinos).

### Hakbang 2: CGFNS Credential Evaluation

Ang **CGFNS (Commission on Graduates of Foreign Nursing Schools)** ang magsusuri kung ang iyong edukasyon sa pagiging nars ay katumbas ng US standards.

Ang proseso:
1. Gumawa ng account sa cgfns.org
2. Bayaran ang fee (humigit-kumulang $350 o PHP 19,600)
3. Ipadala ang iyong transcript at PRC records nang direkta mula sa iyong eskwelahan at PRC
4. Maghintay ng 3 hanggang 6 na buwan para sa ebalwasyon

### Hakbang 3: Mag-apply sa State Board

Kapag tapos na ang CGFNS, mag-apply sa napili mong state board. Kakailanganin mo:
- Application form at bayad
- Patunay ng pagkakakilanlan (passport, birth certificate)
- Background check at fingerprinting
- English proficiency exam (IELTS o TOEFL) sa karamihan ng states
- Iba pang state-specific requirements

Kapag aprubado, makakatanggap ka ng **Authorization to Test (ATT)**.

### Hakbang 4: Mag-schedule at Kumuha ng NCLEX

May Pearson VUE testing centers sa **Manila at Cebu** kung saan pwede kang kumuha ng NCLEX.

Para mag-schedule:
1. Pumunta sa pearsonvue.com/nclex
2. Bayaran ang NCLEX exam fee ($200 o humigit-kumulang PHP 11,200)
3. Piliin ang Manila o Cebu testing center
4. Pumili ng petsa
5. I-print ang confirmation

**Sa araw ng exam, dalhin:**
- Valid na Philippine passport
- Pangalawang government ID
- ATT confirmation email (naka-print)
- Pearson VUE confirmation (naka-print)

### Hakbang 5: Resulta at Lisensya

Ang opisyal na resulta ay aabutin ng 6 na linggo, pero pwede kang bumili ng **Quick Results** ($7.95) para makita ang unofficial result sa loob ng 48 oras.

Kapag pumasa ka, bibigyan ka ng state board ng iyong **RN license**.

---

## Magkano ang Gastos sa NCLEX?

| Gastos | Halaga (PHP) |
|--------|-------------|
| CGFNS evaluation | ~PHP 20,000 |
| NCLEX exam fee | ~PHP 11,200 |
| State Board application | PHP 3,000-11,000 |
| IELTS exam | ~PHP 13,700 |
| CGFNS VisaScreen (para sa visa) | ~PHP 30,000 |
| Review materials | PHP 10,000-150,000 |

Maghanda ng hindi bababa sa **PHP 80,000 hanggang PHP 200,000** para sa buong proseso.

---

## Mga Madalas na Tanong

**Pwede ba kumuha ng NCLEX sa Pilipinas?**
Oo. May Pearson VUE centers sa Manila at Cebu. Hindi mo na kailangang lumipad sa Amerika.

**Kailangan ko ba ng SSN para kumuha ng NCLEX?**
Hindi para sa ilang states tulad ng New York. Pero kailangan ng SSN para sa license issuance sa ibang states tulad ng Texas at California.

**Gaano katagal ang proseso?**
Karaniwang 6 hanggang 12 buwan mula simula hanggang sa exam.

**Pwede ba akong mag-retake kung hindi ako pumasa?**
Oo. May 45-araw na paghihintay bago mag-retake. Walang limitasyon sa bilang ng pagtatangka sa karamihan ng states.

**Valid ba ang PNLE ko para sa NCLEX?**
Hindi. Ang PNLE ay para lamang sa Pilipinas. Kailangan mong pumasa sa NCLEX para magtrabaho bilang RN sa Amerika.

---

## Magsimula nang Mag-review para sa NCLEX

Habang inaasikaso mo ang iyong application, magsimula nang mag-practice gamit ang mga NCLEX-style na tanong. May **400 libreng NCLEX practice questions** ang LisensyaPrep sa lahat ng 8 content categories.

**[Magsimula ng Libreng NCLEX Practice sa LisensyaPrep](/nclex)**

---

## Kaugnay na mga Artikulo

- [Mga Tips para Pumasa sa NCLEX](/blog/mga-tips-pumasa-nclex)
- [Libreng NCLEX Reviewer Philippines](/blog/libreng-nclex-reviewer-philippines)
- [What is the NCLEX? Complete Guide for Filipino Nurses](/nursing/what-is-the-nclex)
- [NCLEX vs PNLE: Complete Comparison](/nursing/nclex-vs-pnle-comparison)
- [NCLEX Gateway States for Filipino Nurses](/nursing/nclex-gateway-states-filipinos)
`;

export default function PaanoKumuhaNCLEXPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-paano-kumuha-nclex" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Paano Kumuha ng NCLEX sa Pilipinas</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-600/10 text-blue-400">NCLEX</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Paano Kumuha ng NCLEX sa Pilipinas 2026 (Kumpletong Gabay para sa Pinoy Nurses)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>June 1, 2026</span><span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">NCLEX Articles para sa mga Pinoy Nurses</h2>
              <ul className="space-y-3">
                {ALL_NCLEX_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Magsimula ng Libreng NCLEX Practice</p>
              <p className="text-gray-400 text-sm mb-4">400 libreng NCLEX questions. Walang registration.</p>
              <Link href="/nclex" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Magsimula sa LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">NCLEX Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_NCLEX_ARTICLES.map(({ text, href }) => (
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
