import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'NCLEX Gateway States for Filipino Nurses 2026 (NY, TX, IL Complete Guide)',
  description:
    'Best NCLEX gateway states for Filipino nurses. Compare New York, Texas, Illinois, California, and other states by requirements, processing time, and ease of application for foreign-trained nurses.',
  path: '/nursing/nclex-gateway-states-filipinos',
});

const SCHEMA_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'NCLEX Gateway States for Filipino Nurses 2026 NY TX IL Complete Guide',
  description:
    'Compare the best NCLEX gateway states for Filipino nurses including New York, Texas, Illinois, California, and Florida by requirements, processing time, and concurrency.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-05-31',
  dateModified: '2026-05-31',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lisensyaprep.com/nursing/nclex-gateway-states-filipinos' },
};

const ALL_NCLEX_ARTICLES = [
  { text: 'What is the NCLEX? Complete Guide for Filipino Nurses', href: '/nursing/what-is-the-nclex' },
  { text: 'NCLEX 2026 Coverage and Test Plan Changes', href: '/nursing/nclex-2026-coverage' },
  { text: 'How to Take NCLEX in the Philippines (Step-by-Step)', href: '/nursing/how-to-take-nclex-philippines' },
  { text: 'NCLEX-RN vs NCLEX-PN: Which Should Filipino Nurses Take?', href: '/nursing/nclex-rn-vs-pn-filipino-nurses' },
  { text: 'NCLEX vs PNLE: Complete Comparison for Filipino Nurses', href: '/nursing/nclex-vs-pnle-comparison' },
  { text: 'NCLEX Gateway States for Filipino Nurses', href: '/nursing/nclex-gateway-states-filipinos' },
  { text: 'How to Pass the NCLEX on Your First Take', href: '/nursing/how-to-pass-nclex-first-take' },
  { text: 'Management of Care Reviewer for NCLEX-RN', href: '/nursing/management-of-care-nclex-reviewer' },
  { text: 'Pharmacology Reviewer for NCLEX-RN', href: '/nursing/pharmacology-nclex-reviewer' },
  { text: 'Physiological Adaptation Reviewer for NCLEX-RN', href: '/nursing/physiological-adaptation-nclex-reviewer' },
  { text: 'Safety and Infection Control Reviewer for NCLEX-RN', href: '/nursing/safety-infection-prevention-nclex' },
  { text: 'Health Promotion and Maintenance Reviewer for NCLEX-RN', href: '/nursing/health-promotion-nclex-reviewer' },
  { text: 'Psychosocial Integrity Reviewer for NCLEX-RN', href: '/nursing/psychosocial-integrity-nclex-reviewer' },
  { text: 'NCLEX Lab Values Cheat Sheet', href: '/nursing/nclex-lab-values-cheat-sheet' },
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
    } else if (line.startsWith('#### ')) {
      elements.push(<h4 key={key++} className="text-base font-semibold text-white mt-4 mb-2">{line.slice(5)}</h4>);
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
One of the most important decisions Filipino nurses make in the NCLEX process is **which US state to apply through**. The state you choose affects your credential evaluation requirements, processing time, costs, English exam requirements, and how easily you can transfer your license later.

This guide compares the best "gateway states" for Filipino nurses based on application ease, requirements, and practical considerations.

---

## What Is a Gateway State?

A "gateway state" is a US state with **favorable requirements for foreign-trained nurses** to obtain initial licensure. Filipino nurses often apply through a gateway state for their first US license, then transfer to their desired state later through endorsement.

The ideal gateway state has:
- Reasonable credential evaluation requirements
- No requirement for concurrent clinical and theory hours
- Faster processing times
- Lower costs
- Acceptance of CGFNS evaluation

---

## Quick Comparison Table

| State | Concurrency Requirement | SSN Required to Test | English Exam | Processing Speed | Filipino Community |
|-------|------------------------|----------------------|--------------|------------------|--------------------|
| New York | No | No | Sometimes waived | Moderate | Large |
| Texas | No | Yes (for license) | Required | Moderate | Growing |
| Illinois | No | No | Required | Moderate | Moderate |
| California | Yes (strict) | Yes | Required | Slow | Very Large |
| Florida | No | Yes | Required | Fast | Growing |
| New Jersey | No | No | Required | Moderate | Large |

---

## The Concurrency Issue (Critical for Filipinos)

The single biggest factor for Filipino nurses is the **concurrency requirement**.

### What Is Concurrency?

Some states (notably California) require that your nursing education included **theory and clinical practice taught concurrently** (during the same term) for each nursing subject.

**The problem:** Many Philippine nursing programs teach theory in one semester and the related clinical practice (RLE - Related Learning Experience) in a different arrangement. This can cause California to find your education "deficient" in concurrency.

### States Without Concurrency Requirements

These states do NOT require concurrency, making them easier for Filipino nurses:
- New York
- Texas
- Illinois
- Florida
- New Jersey

**This is why New York is the most popular gateway state for Filipino nurses.**

---

## State-by-State Detailed Breakdown

### New York (Most Popular Gateway State)

**Why Filipino nurses choose New York:**
- No concurrency requirement
- No Social Security Number required to take the NCLEX
- CGFNS evaluation accepted
- English exam may be waived if nursing education was in English (Philippine programs qualify)
- Large established Filipino nurse community

**Requirements:**
- CGFNS Credentials Evaluation Service (CES) report (Course-by-Course)
- Application to NY State Education Department
- Good moral character documentation
- Fee approximately $143

**Processing time:** 3-6 months after documents submitted.

**Best for:** First-time applicants who want the smoothest path. Many Filipino nurses get licensed in NY first, then endorse to other states.

### Texas

**Why Filipino nurses choose Texas:**
- No concurrency requirement
- High demand for nurses
- Lower cost of living
- Growing Filipino community
- Strong job market

**Requirements:**
- CGFNS CES report
- Texas Nursing Jurisprudence Exam (state-specific)
- English proficiency (IELTS/TOEFL)
- Criminal background check with fingerprinting
- Social Security Number required for license issuance (not for testing)

**Processing time:** 2-4 months.

### Illinois

**Why Filipino nurses choose Illinois:**
- No concurrency requirement
- No SSN required to test
- Streamlined foreign nurse process
- Chicago has Filipino communities

**Requirements:**
- CGFNS CES report
- English proficiency exam
- Application to Illinois Department of Financial and Professional Regulation
- Background check

**Processing time:** 3-5 months.

### California (Most Difficult but Highest Reward)

**Why Filipino nurses are drawn to California:**
- Largest Filipino population in the US
- Highest nursing salaries ($110,000-$150,000)
- Familiar culture and community

**Why California is challenging:**
- **Strict concurrency requirement** (often the dealbreaker for Filipino-educated nurses)
- Requires Social Security Number
- Longer processing times (6-12 months)
- More document scrutiny

**The concurrency problem:** California Board of Registered Nursing reviews whether your theory and clinical were taught concurrently. Many Philippine graduates receive deficiency notices requiring remediation.

**Workaround:** Many Filipino nurses get licensed in a gateway state (NY, TX) first, work to gain experience, then apply to California by endorsement (which has different, often easier requirements than initial licensure).

### Florida

**Why Filipino nurses choose Florida:**
- No concurrency requirement
- Fast processing
- Growing Filipino community
- No state income tax
- High nursing demand

**Requirements:**
- CGFNS CES report
- English proficiency exam
- Background check with fingerprinting
- SSN required

**Processing time:** 1-3 months (among the fastest).

---

## The Nurse Licensure Compact (NLC)

The **Nurse Licensure Compact** allows nurses to hold one multistate license valid in all compact states.

Texas, Florida, and many others are NLC members. New York, California, and Illinois are NOT compact states (as of 2026).

**For Filipino nurses:** A multistate license requires a permanent US residence in a compact state. New immigrants typically get a single-state license first. The compact becomes valuable later once you establish residency.

---

## How to Choose Your Gateway State

### Choose New York if:
- You want the smoothest first-time application
- Your school may have concurrency issues
- You do not yet have a Social Security Number
- You plan to endorse to another state later

### Choose Texas if:
- You want to work in Texas long-term
- You prefer lower cost of living
- You can complete the Jurisprudence exam

### Choose Florida if:
- You want fast processing
- You plan to live in Florida
- You have an SSN

### Choose California if:
- You are certain your education meets concurrency
- California is your definite destination
- You are willing to wait longer
- (Otherwise, get licensed elsewhere first and endorse)

---

## The Endorsement Strategy

Many experienced Filipino nurses recommend this approach:

**Step 1:** Get initial licensure in an easy gateway state (New York).

**Step 2:** Pass the NCLEX (your NCLEX result is valid for ALL states - you only take it once).

**Step 3:** Work and gain US nursing experience.

**Step 4:** Apply by endorsement to your desired state (California, etc.). Endorsement is often easier than initial licensure because you already hold a valid US license.

**Key insight:** You take the NCLEX only ONCE. Your passing result transfers to any state. You do not retake the NCLEX when moving between states - you apply for licensure by endorsement.

---

## Frequently Asked Questions

**Which state is easiest for Filipino nurses?**
New York is generally considered easiest due to no concurrency requirement, no SSN needed to test, and possible English exam waiver.

**Can I change states after getting licensed?**
Yes, through endorsement. Your NCLEX result transfers. You apply to the new state board for licensure by endorsement.

**What if California finds my education deficient?**
You can complete remediation courses, or get licensed in a gateway state first and endorse to California later after gaining experience.

**Does my chosen state affect my visa?**
Your nursing license is separate from immigration. However, your employer (who sponsors your visa) is typically in a specific state, which may influence where you seek licensure.

---

## Start Your NCLEX Preparation

Regardless of which state you choose, you must pass the same NCLEX-RN. LisensyaPrep has **400 free NCLEX practice questions** across all 8 content categories.

**[Start Free NCLEX Practice at LisensyaPrep](/nclex)**

---

## Related NCLEX Articles

- [What is the NCLEX? Complete Guide for Filipino Nurses](/nursing/what-is-the-nclex)
- [How to Take NCLEX in the Philippines](/nursing/how-to-take-nclex-philippines)
- [NCLEX-RN vs NCLEX-PN: Which Should Filipino Nurses Take?](/nursing/nclex-rn-vs-pn-filipino-nurses)
- [How to Pass the NCLEX on Your First Take](/nursing/how-to-pass-nclex-first-take)
- [NCLEX vs PNLE: Complete Comparison](/nursing/nclex-vs-pnle-comparison)
`;

export default function NclexGatewayStatesPage() {
  return (
    <div className="min-h-screen py-10">
      <Script id="schema-gateway-states-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ARTICLE) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">NCLEX Gateway States</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Nursing (NCLEX)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                NCLEX Gateway States for Filipino Nurses 2026 (NY, TX, IL Complete Guide)
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>May 31, 2026</span><span>•</span>
                <span>12 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">NCLEX Articles for Filipino Nurses</h2>
              <ul className="space-y-3">
                {ALL_NCLEX_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-blue-400 font-extrabold text-lg mb-2">Start Your NCLEX Practice</p>
              <p className="text-gray-400 text-sm mb-4">400 free NCLEX questions. No account required.</p>
              <Link href="/nclex" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
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
