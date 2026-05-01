import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Agricultural Economics Reviewer for ALE Philippines 2026 (Deep Dive Guide)',
  description:
    'Studying for the PRC agriculture board exam? This agricultural economics reviewer covers farm budgeting, break-even analysis, ROI, marketing, and agricultural extension tested in the ALE.',
  path: '/blog/agri-economics-reviewer-ale',
});

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Agricultural Economics Reviewer for ALE Philippines 2026 (Deep Dive)',
  description:
    'Complete agricultural economics deep dive reviewer for the PRC Agriculture Licensure Examination covering farm budgeting, break-even analysis, ROI, marketing functions, marketing channels, and agricultural extension.',
  image: 'https://lisensyaprep.com/images/articles/hero-ale-agri-economics.jpg',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-01',
  dateModified: '2026-05-01',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/blog/agri-economics-reviewer-ale' },
};

const ALL_ALE_ARTICLES = [
  { text: 'How to Pass the Agriculture Board Exam on Your First Take', href: '/blog/how-to-pass-agriculture-board-exam' },
  { text: 'ALE Coverage 2026: Complete Subject Breakdown', href: '/blog/ale-coverage-2026' },
  { text: 'Animal Science Reviewer for ALE Philippines 2026', href: '/blog/animal-science-reviewer-ale' },
  { text: 'Plant Pathology and Crop Protection Reviewer for ALE 2026', href: '/blog/ale-crop-protection-reviewer' },
  { text: 'Crop Science Reviewer for ALE Philippines 2026', href: '/blog/crop-science-reviewer-ale' },
  { text: 'Soil Science Reviewer for ALE Philippines 2026', href: '/blog/soil-science-reviewer-ale' },
  { text: 'Agricultural Economics Reviewer for ALE Philippines 2026', href: '/blog/agri-economics-reviewer-ale' },
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
Agricultural Economics is the subject in the ALE that connects crop and animal production to the real world of farming as a business. It covers farm management, financial analysis, marketing, and the extension systems that help farmers improve their practices.

For many BSA graduates, this subject feels more abstract than the biological sciences. But once you understand the core calculation frameworks and the key terms, agricultural economics questions become some of the most predictable in the entire ALE.

---

## Farm Management Concepts

### Types of Farm Costs

Understanding cost classification is the foundation of all farm financial analysis.

**Fixed costs:** Costs that do not change regardless of the level of production. They exist whether or not any crops are grown. Examples: land rent, depreciation of equipment, interest on loans, property taxes.

**Variable costs:** Costs that change directly with the level of production. Examples: seeds, fertilizers, pesticides, labor for planting and harvesting, fuel for irrigation pumps.

**Total cost = Fixed costs + Variable costs**

**Average total cost = Total cost ÷ Units produced**

**Marginal cost:** The additional cost of producing one more unit. Important for determining optimal production level.

### Farm Income Measures
`;

const SECTION2 = `
### Worked Example: Farm Budget Calculation

A rice farmer planted 1 hectare. Total production cost was PHP 35,000. Total harvest was 5,000 kg. Market price was PHP 12 per kg.

**Gross Income:** 5,000 kg × PHP 12 = PHP 60,000

**Net Farm Income:** PHP 60,000 − PHP 35,000 = PHP 25,000

**Break-even Price:** PHP 35,000 ÷ 5,000 kg = PHP 7.00 per kg

**Break-even Yield:** PHP 35,000 ÷ PHP 12 per kg = 2,917 kg

**ROI:** (PHP 25,000 ÷ PHP 35,000) × 100% = 71.4%

This type of calculation appears in almost every ALE cycle. Practice until you can solve it quickly.

---

## Supply and Demand in Agriculture

### Basic Market Principles

**Law of Demand:** As price increases, quantity demanded decreases, and vice versa. Agricultural products generally follow this law.

**Law of Supply:** As price increases, quantity supplied increases. Farmers plant more of a crop when prices are high.

**Market equilibrium:** The price at which quantity demanded equals quantity supplied. At equilibrium, there is no excess supply or excess demand.

### Agricultural Price Instability

Farm prices are notoriously unstable because:

**Production lag:** Farmers make planting decisions based on current prices but harvest occurs months later. By harvest time, prices may have changed significantly. This causes the cobweb cycle of price fluctuations.

**Inelastic demand for food:** People do not dramatically change how much they eat when prices change. So a large increase in supply causes a large price decrease, hurting farmer incomes.

**Seasonality:** Most crops are harvested within a short period, flooding the market with supply and causing prices to drop at harvest time.

---

## Agricultural Marketing

### Marketing Functions

Agricultural marketing is the chain of activities that gets farm products from the producer to the final consumer.

**Physical functions:**
- **Storage:** Holding products between harvest and sale to stabilize supply and price. Requires warehouses, cold storage, silos.
- **Transportation:** Moving products from farm to market. Affects product availability and price formation.
- **Processing:** Transforming raw products to increase value and shelf life. Rice milling, copra processing, fish drying.

**Exchange functions:**
- **Buying and selling:** Transfer of ownership.
- **Standardization and grading:** Classifying products by quality to facilitate trading.

**Facilitating functions:**
- **Financing:** Credit to fund production and marketing.
- **Risk bearing:** Insurance against price and production risks.
- **Market intelligence:** Information on prices and supply conditions.

### Marketing Channels

A marketing channel is the path a product takes from producer to consumer. The more middlemen (intermediaries) in the channel, the higher the consumer price relative to the farm-gate price.

**Farm gate price:** Price received directly at the farm.

**Consumer price:** Price paid by the final consumer.

**Marketing margin:** Consumer price minus farm gate price. Represents the cost and profit of all marketing functions.

**Short marketing channel:** Producer → Consumer (direct selling, farm gate sales, farmers markets). Higher farm gate price, lower consumer price.

**Long marketing channel:** Producer → Assembler → Wholesaler → Retailer → Consumer. Lower farm gate price, higher consumer price, more marketing services provided.

---

## Agricultural Extension

Agricultural extension is the system that delivers agricultural knowledge and technology from research institutions to farmers and rural communities.

### Extension Methods

**Individual methods:** Direct contact with individual farmers. Examples: farm visits, office calls, result demonstrations. Most effective but most expensive per farmer reached.

**Group methods:** Working with groups of farmers simultaneously. Examples: method demonstrations, field days, farmers' meetings, study tours. More cost-effective than individual methods.

**Mass media methods:** Reaching large numbers of farmers simultaneously. Examples: radio, television, newspapers, leaflets, social media. Least expensive per person reached but least interactive.

### Key Agricultural Extension Agencies in the Philippines

**Department of Agriculture (DA):** Primary government agency for agricultural development. Implements extension programs through its regional and provincial offices.

**Agricultural Training Institute (ATI):** Attached agency of the DA responsible for human resource development and extension for the agriculture and fisheries sector.

**State Universities and Colleges (SUCs):** Mandated to provide extension services to farming communities in their areas through their colleges of agriculture.

**Local Government Units (LGUs):** Municipal and city agriculture offices implement grassroots extension programs.

---

## Key DA Agencies and Their Mandates

| Agency | Mandate |
|--------|---------|
| PhilRice (Philippine Rice Research Institute) | Rice research, development, and extension |
| BAR (Bureau of Agricultural Research) | Coordinates agricultural R and D nationwide |
| PCAARRD | Research and development for agriculture in the regions |
| NDA (National Dairy Authority) | Dairy industry development |
| SRA (Sugar Regulatory Administration) | Sugar industry regulation |
| PCA (Philippine Coconut Authority) | Coconut industry development |
| NIA (National Irrigation Administration) | Irrigation systems development and management |

---

## Agribusiness Concepts

**Agribusiness** refers to all economic activities related to farming, including the supply of inputs, production, processing, and distribution of agricultural products.

**Value chain:** The sequence of activities from farm input supply through production, processing, and marketing to the final consumer. Each step adds value to the product.

**Contract farming:** An arrangement where farmers produce for a buyer under a pre-agreed contract specifying price, quantity, and quality. Reduces price risk for farmers and ensures supply for buyers.

**Cooperative:** A farmer-owned enterprise where members pool resources and share benefits. Agricultural cooperatives help farmers access credit, inputs, and markets at better terms than individual farmers can negotiate.

---

## Practice What You Just Learned

Agricultural economics questions in the ALE combine calculations with conceptual knowledge about marketing and extension. The calculations are free points if you practice them. Try the ALE quiz on LisensyaPrep now. No account needed.

**[Practice Agriculture Questions at LisensyaPrep](https://lisensyaprep.com/agriculture)**

---

## Related ALE Articles

- [ALE Coverage 2026 Complete Subject Breakdown](https://lisensyaprep.com/blog/ale-coverage-2026)
- [Crop Science Deep Dive Reviewer for ALE 2026](https://lisensyaprep.com/blog/crop-science-reviewer-ale)
- [Soil Science Deep Dive Reviewer for ALE 2026](https://lisensyaprep.com/blog/soil-science-reviewer-ale)
- [How to Pass the Agriculture Board Exam on Your First Take](https://lisensyaprep.com/blog/how-to-pass-agriculture-board-exam)
- [Animal Science Reviewer for ALE Philippines 2026](https://lisensyaprep.com/blog/animal-science-reviewer-ale)
`;

export default function AgriEconomicsReviewerAlePage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-agri-economics-ale" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-300 transition-colors">Blog</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Agricultural Economics Reviewer for ALE</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-lime-500/10 text-lime-400">Agriculture (ALE)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Agricultural Economics Reviewer for ALE Philippines 2026 (Deep Dive)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 1, 2026</span><span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            <Image
              src="/images/articles/hero-ale-agri-economics.jpg"
              alt="Young Filipino male agriculture graduate at desk with calculator and papers for ALE agricultural economics reviewer Philippines 2026"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '2rem' }}
              priority
            />

            <div className="prose-content">
              {renderContent(INTRO)}

              <figure style={{ margin: '2rem 0' }}>
                <svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', borderRadius: '10px' }}>
                  <rect width="760" height="260" fill="#0f172a" rx="10"/>
                  <text x="380" y="26" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">Farm Financial Analysis Formulas for the ALE</text>
                  <line x1="40" y1="38" x2="720" y2="38" stroke="#334155" strokeWidth="1"/>
                  <rect x="40" y="50" width="680" height="38" fill="#1e3a5f" rx="6"/>
                  <text x="210" y="70" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">GROSS INCOME (GI)</text>
                  <text x="510" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontFamily="Arial,sans-serif">GI = Total Production × Price per Unit</text>
                  <text x="510" y="82" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Total revenue before deducting any costs</text>
                  <rect x="40" y="94" width="680" height="38" fill="#172033" rx="6"/>
                  <text x="210" y="114" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">NET FARM INCOME (NFI)</text>
                  <text x="510" y="114" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontFamily="Arial,sans-serif">NFI = Gross Income − Total Production Cost</text>
                  <text x="510" y="126" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">The actual profit from farming operations</text>
                  <rect x="40" y="138" width="680" height="38" fill="#14532d" rx="6"/>
                  <text x="210" y="158" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">BREAK-EVEN PRICE</text>
                  <text x="510" y="158" textAnchor="middle" fill="#d1fae5" fontSize="12" fontFamily="Arial,sans-serif">BEP = Total Cost ÷ Total Production</text>
                  <text x="510" y="170" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Arial,sans-serif">Minimum price needed to recover all costs</text>
                  <rect x="40" y="182" width="680" height="38" fill="#1e3a5f" rx="6"/>
                  <text x="210" y="202" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">BREAK-EVEN YIELD</text>
                  <text x="510" y="202" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontFamily="Arial,sans-serif">BEY = Total Cost ÷ Price per Unit</text>
                  <text x="510" y="214" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Arial,sans-serif">Minimum production needed to recover all costs</text>
                  <rect x="40" y="226" width="680" height="26" fill="#78350f" rx="6"/>
                  <text x="210" y="242" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="700" fontFamily="Arial,sans-serif">RETURN ON INVESTMENT (ROI)</text>
                  <text x="510" y="242" textAnchor="middle" fill="#fef3c7" fontSize="12" fontFamily="Arial,sans-serif">ROI = (Net Farm Income ÷ Total Investment) × 100%</text>
                  <text x="380" y="256" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Arial,sans-serif">LisensyaPrep.com | ALE Agricultural Economics Reviewer 2026</text>
                </svg>
                <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Farm financial analysis formulas for the ALE</figcaption>
              </figure>

              <AdPlaceholder slot="banner" className="my-6" />
              {renderContent(SECTION2)}
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
