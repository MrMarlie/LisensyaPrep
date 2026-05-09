import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Mga Dapat Dalhin sa Civil Service Exam Day 2026 (Kumpleto na Checklist)',
  description:
    'Ano ang mga dapat dalhin sa Civil Service Exam day? Kumpleto na checklist para sa lahat ng CSE examinees sa 2026. Huwag kalimutan ang mga importanteng bagay para maiwasan ang problema.',
  path: '/blog/mga-dapat-dalhin-civil-service-exam',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Mga Dapat Dalhin sa Civil Service Exam Day 2026 (Kumpleto na Checklist)',
  description:
    'Kumpleto na checklist ng mga dapat dalhin sa Civil Service Exam day 2026 para maiwasan ang problema at maging handa sa lahat ng kailangan.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-09',
  dateModified: '2026-05-09',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/blog/mga-dapat-dalhin-civil-service-exam' },
};

const ALL_CSE_ARTICLES = [
  { text: 'What is the Civil Service Exam? Complete Guide 2026', href: '/blog/what-is-the-civil-service-exam' },
  { text: 'Civil Service Exam Coverage 2026 Complete Subject Breakdown', href: '/civil-service/cse-coverage-2026' },
  { text: 'Civil Service Exam Schedule 2026 Complete Timeline', href: '/civil-service/cse-schedule-2026' },
  { text: 'How to Apply for the Civil Service Exam 2026', href: '/civil-service/cse-application-guide-2026' },
  { text: 'Professional vs Subprofessional CSE Complete Comparison', href: '/civil-service/professional-vs-subprofessional-cse' },
  { text: 'How to Pass the Civil Service Exam on Your First Take', href: '/civil-service/how-to-pass-civil-service-exam' },
  { text: 'Civil Service Exam Passing Rate 2026', href: '/civil-service/cse-passing-rate-2026' },
  { text: 'How to Get Your COE After Passing the CSE', href: '/civil-service/how-to-get-coe-after-csc-exam' },
  { text: 'Civil Service Exam Retake Rules and Strategy', href: '/civil-service/cse-retake-rules-strategy' },
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
    } else if (line.match(/^- \[[ x]\] /)) {
      const text = line.replace(/^- \[[ x]\] /, '');
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: '☐ ' + formatInline(text) }} />);
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
Ang exam day ay hindi ang tamang araw para mawalan ng dokumento. Ang isang kulang na requirement ay pwedeng mag-resulta sa hindi pagpayag sa iyo na pumasok sa testing venue. Lahat ng oras na ginugol mo sa pag-aaral ay masasayang.

Gamitin ang detalyadong checklist na ito para tiyakin na handa ka sa lahat sa August 9, 2026 (o kahit anong cycle ng CSE).

---

## Mga Pangunahing Kailangan (HINDI PWEDENG WALA)

### 1. Online Notice of School Assignment (ONSA)

Ito ang pinaka-importanteng dokumento. Walang ONSA, walang pagsubok.

**Mga Kailangang Malaman:**
- I-download mula sa **csc.gov.ph** mga 2 linggo bago ang exam
- I-print sa puting bond paper (8.5 × 11 inches)
- **Hindi tinatanggap ang screenshot sa cellphone o tablet**
- Dalawang kopya ang pinakamabuti (isa para sa iyo, isa kung sakaling matuyo o ma-misplace)

**Ano ang nakalagay:**
- Pangalan mo
- Applicant Number
- Eksaktong testing venue
- Building, room, at seat assignment
- Schedule (oras ng start)

### 2. Confirmation Slip mula sa Application

Ito ay ang resibo na natanggap mo nang nag-apply ka sa CSC office. Nakalagay ang iyong reference number at confirmation ng acceptance ng application.

**Hindi parehas ng ONSA.** Pareho silang dapat dalhin.

### 3. Valid Government-Issued ID

Dapat ang **eksaktong ID na ginamit mo sa application**. Kapag nag-iiba, posibleng hindi ka payagang pumasok.

**Mga tinatanggap na ID:**
- Passport
- Driver's License
- PRC License
- SSS ID
- GSIS ID (UMID)
- Voter's ID
- BIR/TIN ID with picture
- PhilHealth ID with picture
- Postal ID
- NBI Clearance
- Police Clearance
- School ID
- Company ID
- Barangay ID

**Hindi pa-expire.** Dapat valid pa sa exam date.

### 4. Black Ballpens (HINDI Pencil)

Magdala ng **hindi bababa sa 2 itim na ballpen**. Ang CSC ay strict sa itim na ballpen.

**Bakit dalawa o higit pa?**
- Para may backup kung mawalan ng tinta
- Para may backup kung sira o nawala
- Hindi pinapayagan ang pakikihiram sa exam day

**Hindi tinatanggap:**
- Pencil (kahit mechanical)
- Asul, pula, o kahit anong kulay maliban sa itim
- Erasable pen (Pilot FriXion at iba pang katulad)
- Highlighters

---

## Mga Mainam Dalhin (Strongly Recommended)

### 5. Watch (Walang Smartwatch)

Ang pagsubaybay sa oras ay napaka-importante sa CSE.

**Mga rekomendadong watch:**
- Simple analog watch
- Basic digital watch (walang internet o messaging features)
- Casio standard model

**HINDI tinatanggap:**
- Apple Watch
- Samsung Galaxy Watch
- Fitbit
- Anumang smartwatch
- Watches na may calculator
- Watches na may camera

Maraming testing centers ay may mga wall clocks pero hindi ka makaka-tingin nang madalas dahil sa angle. Mas mabuti ang sariling watch.

### 6. Komportableng Damit

Ang testing venues ay madalas air-conditioned. Maaaring malamig sa loob.

**Mga payo:**
- Magsuot ng layered (T-shirt + light jacket o sweater)
- Komportableng pantalon o palda
- Hindi masyadong tight
- Closed shoes (avoid flip-flops o slippers)

**Iwasan:**
- Damit na may print ng letters o numbers (pwedeng ma-suspect na cheating reference)
- Damit na hindi komportable
- Bago na sapatos na hindi mo pa nasubukan

### 7. Snack at Tubig

Ang Civil Service Exam ay 2 hours 40 minutes (Subprofessional) o 3 hours 10 minutes (Professional). Mahaba ito at kailangan ng energy.

**Mga rekomendadong dalhin:**
- Tubig (transparent na bote)
- Tinapay o cookies
- Pang-energy na pagkain (chocolate, banana, granola bar)
- Kape o juice (kung uminom ka kasi nito)

**Importante:** Karaniwan, hindi pinapayagan ang pagkain at inumin sa loob mismo ng exam room. Gamitin ito sa break o bago pumasok.

### 8. Transparent Bag o Plastic Folder

Ang CSC ay nag-eencourage ng transparent bags para mas madali ang inspection ng mga gamit. Hindi requirement ito pero ina-applaud ng proctors.

---

## Mga BAWAL (Huwag Dalhin sa Loob)

**Cellphones at electronic devices** ay BAWAL sa loob ng exam room.
- Dapat naka-off
- Naka-lagay sa bag
- May mga centers na nagpapanawagan ng deposit ng phones sa labas

**Calculator** ay BAWAL.
- Walang scientific calculator
- Walang basic calculator
- Walang calculator app sa phone

**Review materials** ay BAWAL sa loob.
- Walang reviewer book
- Walang notes
- Walang scratch papers (binibigay ng CSC kung kailangan)

**Maingay na accessories:**
- Maingay na alahas
- Charm bracelets
- Watch na may alarm

**Bawal din ang:**
- Smart watches o fitness trackers
- Bluetooth earphones
- Magnifying glass
- Books (kahit Bibliya)

---

## Listahan na Dapat Tandaan (Quick Checklist)

Bago ka mag-aalis sa bahay, i-check ang mga ito:

- [ ] ONSA (printed at duplicate)
- [ ] Confirmation slip mula sa application
- [ ] Valid government-issued ID (yung ginamit sa application)
- [ ] 2 itim na ballpen (minimum)
- [ ] Watch (hindi smartwatch)
- [ ] Tubig at meryenda
- [ ] Komportableng damit
- [ ] Pamasahe at extra cash
- [ ] Allergy medication (kung kailangan)
- [ ] Address ng venue (kung first time pumunta)

---

## Mga Tips Bago ang Exam Day

### 1 Linggo Bago

- I-print at i-save ang ONSA
- Bisitahin ang testing venue (ocular inspection)
- I-double check ang oras ng start
- Mag-prepare ng backup transportation plan

### 1 Araw Bago

- Mag-prepare ng exam bag bago matulog
- I-set ng dalawang alarm clock
- Eat a normal dinner (huwag bagong pagkain)
- Sleep early (10 PM at the latest)

### Exam Day Mismo

**Umaga:**
- Mag-almusal ng maayos
- Iwasan ang masyadong matamis o mabigat na pagkain
- Uminom ng tubig pero hindi sobra (para hindi madalas mag-CR)

**Pagdating sa Venue:**
- 30 hanggang 45 minuto bago ang scheduled time
- Maglaan ng oras para sa parking, pagpila, at security check
- Mag-deep breathing kung kinakabahan
- Hanapin ang exam room mo at maupo

**Bago Sumakto sa Exam:**
- Bisitahin ang restroom
- Subukan ang ballpen mo
- I-arrange ang mga gamit sa desk

---

## Kung May Problema sa Documents

**Walang ONSA?** Pumunta sa CSC information desk sa testing venue. Maaaring may system na mag-aalalay sa iyo.

**Nakalimutan ang ID?** Mahirap ito. Tawagan agad ang isang kapamilya na pwedeng dalhin sa iyo. Kung hindi posible, baka hindi ka payagang pumasok.

**Hindi tugma ang ID sa application?** Mag-explain sa proctor. Maaaring may iba pang valid ID na ipakita.

---

## Magsimula sa Iyong Review at Maghanda ng Maaga

Ang LisensyaPrep ay may libreng practice questions para sa CSE. Walang account na kailangan.

**[Magsimula sa LisensyaPrep CSE Practice](/civil-service)**

---

## Kaugnay na Artikulo

- [Paano Pumasa sa Civil Service Exam 2026](https://lisensyaprep.com/blog/paano-pumasa-civil-service-exam)
- [Libreng Reviewer para sa Civil Service Exam 2026](https://lisensyaprep.com/blog/libreng-reviewer-civil-service-exam)
- [Civil Service Exam Schedule 2026](/civil-service/cse-schedule-2026)
- [How to Apply for the Civil Service Exam 2026](/civil-service/cse-application-guide-2026)
- [How to Pass the Civil Service Exam on Your First Take](/civil-service/how-to-pass-civil-service-exam)
`;

export default function MgaDapatDalhinCivilServiceExamPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-mga-dapat-dalhin-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Mga Dapat Dalhin sa CSE Day</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Civil Service (Filipino)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Mga Dapat Dalhin sa Civil Service Exam Day 2026 (Kumpleto na Checklist)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>Mayo 9, 2026</span><span>•</span>
                <span>6 minuto basahin</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">CSE Reviewer Series</h2>
              <ul className="space-y-3">
                {ALL_CSE_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Simulan ang CSE Practice</p>
              <p className="text-gray-400 text-sm mb-4">Libreng practice questions. Walang account na kailangan.</p>
              <Link href="/civil-service" className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Magsimula sa LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">CSE Reviewer Series</h3>
              <div className="space-y-3">
                {ALL_CSE_ARTICLES.map(({ text, href }) => (
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
