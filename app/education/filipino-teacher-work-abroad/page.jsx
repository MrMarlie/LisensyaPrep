import Link from 'next/link';
import Script from 'next/script';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = buildMetadata({
  title: "Filipino Teachers Abroad 2026 - US, Japan & Other Destinations",
  description: "How Filipino teachers work abroad - US exchange (J-1) and state licensing routes, Japan ALT programs, international schools, Middle East, and online teaching. Honest requirements and warnings.",
  path: "/education/filipino-teacher-work-abroad",
});

const SCHEMA_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Can Filipino teachers teach in US public schools?","acceptedAnswer":{"@type":"Answer","text":"Yes, most commonly through J-1 cultural exchange visitor programs, which are time-limited, and longer-term through state teacher licensing with employer sponsorship, strongest in shortage subjects like math, science, and special education."}},{"@type":"Question","name":"Do Filipino teachers need Japanese to teach in Japan?","acceptedAnswer":{"@type":"Answer","text":"Often not to start as an assistant language teacher, since programs center on English instruction, though Japanese language skills expand long-term options."}}]}`;

const RELATED_ARTICLES = [
  { text: "What to Do After Passing the LET", href: "/education/after-passing-let-next-steps" },
  { text: "Teacher Salary Philippines 2026", href: "/education/teacher-salary-philippines" },
  { text: "New OFW Guide for Licensed Professionals", href: "/blog/ofw-guide-licensed-professionals" },
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
    } else if (line.startsWith('| ') && line.endsWith(' |')) {
      if (line.match(/^\|[-\s|]+\|$/)) continue; // separator row
      const cells = line.split('|').slice(1, -1).map((c) => c.trim());
      const isHeader = lines[i + 1]?.includes('---') && lines[i + 1]?.match(/^\|[-\s|]+\|$/);
      if (isHeader) {
        elements.push(
          <tr key={key++} className="border-b border-white/10">
            {cells.map((cell, ci) => (
              <th key={ci} className="px-4 py-2 text-left text-yellow-400 font-semibold text-sm">{cell}</th>
            ))}
          </tr>
        );
      } else {
        elements.push(
          <tr key={key++} className="border-b border-white/5">
            {cells.map((cell, ci) => (
              <td key={ci} className="px-4 py-2 text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: formatInline(cell) }} />
            ))}
          </tr>
        );
      }
    } else if (line.startsWith('- ')) {
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />);
    } else if (line.match(/^\d+\. /)) {
      elements.push(<li key={key++} dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\. /, '')) }} />);
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(<p key={key++} className="text-gray-300 text-sm my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />);
    }
  }

  const wrapped = [];
  let listBuffer = [];
  let tableBuffer = [];
  const flushList = () => {
    if (listBuffer.length) {
      wrapped.push(<ul key={`ul-${key++}`} className="list-disc list-inside space-y-1 my-3 text-gray-300 text-sm pl-2">{listBuffer}</ul>);
      listBuffer = [];
    }
  };
  const flushTable = () => {
    if (tableBuffer.length) {
      wrapped.push(
        <div key={`table-${key++}`} className="overflow-x-auto my-4">
          <table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden">
            <tbody>{tableBuffer}</tbody>
          </table>
        </div>
      );
      tableBuffer = [];
    }
  };
  for (const el of elements) {
    if (el.type === 'li') {
      flushTable();
      listBuffer.push(el);
    } else if (el.type === 'tr') {
      flushList();
      tableBuffer.push(el);
    } else {
      flushList();
      flushTable();
      wrapped.push(el);
    }
  }
  flushList();
  flushTable();
  return wrapped;
}

const MAIN_CONTENT = `
Filipino teachers — English-fluent, LET-licensed, famously dedicated — have quietly become one of the country's most in-demand professional exports. But teaching abroad is a patchwork of very different routes, each with its own logic. Here is the honest map.

**Quick answer:** The main routes are the **US** (cultural-exchange J-1 programs and, longer-term, state teacher licensing with employer sponsorship), **Japan** (assistant language teacher programs), **international schools** worldwide (experience-driven), the **Middle East**, and the **online teaching economy**. Every legitimate route runs through verifiable programs or DMW-licensed recruitment — and teaching abroad is a space thick with scams, so verification is rule one.

## Route 1: The United States

**The J-1 exchange route** is how most Filipino teachers reach US classrooms: cultural-exchange visitor programs placing licensed, experienced teachers (typically requiring a bachelor's in education or the subject field, current teaching experience — commonly 2+ years — and English fluency) in US schools for a program period of several years. Key honest points:

- J-1 is an **exchange visa, not immigration** — it is time-limited, and some placements carry home-residency requirements after
- Placements run through **designated sponsor organizations** — verify any recruiter's claimed sponsor designation on the official US State Department exchange program listings
- Districts in teacher-shortage states actively welcome Filipino educators, particularly in math, science, and special education

**The longer game — state licensing:** US public school teaching as a career (H-1B or employer-sponsored routes) requires a **state teaching license**, with credential evaluation of your Philippine degree and, commonly, state exams. Requirements vary by state; shortage-subject teachers have the strongest sponsorship odds.

## Route 2: Japan

Japan's **assistant language teacher (ALT)** economy — the long-running government JET Programme and private ALT dispatch companies — hires Filipino English teachers, valuing the accent-neutral fluency and classroom training LPTs bring. Requirements center on a bachelor's degree and English proficiency; Japanese language helps but is often not required to start. Honest framing: ALT pay supports a decent life in Japan and a meaningful save-and-send rate, but it is an entry rung, not a career ceiling — many use it as the beachhead toward licensed international school posts.

## Route 3: International Schools (Worldwide)

The premium route: international schools in Asia, the Middle East, and beyond pay the top of the teaching market. The currency they trade in is **experience and curriculum familiarity** — IB, Cambridge, or American curricula — plus your LET license and, increasingly, a master's degree. The classic ladder: PH private/international school experience → smaller international school abroad → top-tier school. Recruitment runs through school career pages and established international educator job fairs/platforms.

## Route 4: The Middle East

Gulf schools recruit Filipino teachers steadily — direct school hiring and DMW-licensed agency deployment both operate. The same rules as every Gulf profession apply: **verify the agency on the DMW website, read the contract, complete the OEC process.** ([Full OFW guide](https://lisensyaprep.com/blog/ofw-guide-licensed-professionals))

## Route 5: Online Teaching

The zero-relocation route: online English platforms and tutoring marketplaces serving students worldwide. Honest read: rates vary wildly and platform dependence is real, but as a **supplement, a bridge between contracts, or a portfolio builder**, it is a legitimate arm of the modern Filipino teacher's career.

## The Warnings That Protect You

- **Verify everything**: J-1 sponsors on official listings, agencies on the DMW website, schools through their real domains
- **Huge upfront "processing fees" are the scam signature** — legitimate programs have transparent, regulated cost structures
- **Never surrender your passport** to a recruiter
- Teaching-abroad scams specifically prey on the profession's earnestness; skepticism is professional self-care

## Frequently Asked Questions

**Can Filipino teachers teach in US public schools?**
Yes — most commonly through J-1 cultural exchange programs (time-limited), and longer-term through state teacher licensing with employer sponsorship, strongest in shortage subjects.

**Do I need to speak Japanese to teach in Japan?**
Often not to start as an ALT — programs center on English instruction — though Japanese skills expand your options.

**What do international schools look for?**
Experience with international curricula (IB, Cambridge, American), your teaching license, strong references, and increasingly a master's degree.

**Is the LET license recognized abroad?**
It is the foundation credential proving you are a licensed educator; most destinations then apply their own licensing or program requirements on top.
`;

export default function Page() {
  return (
    <div className="min-h-screen py-10">
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: "/education", name: "Education" }, { url: "/education/filipino-teacher-work-abroad", name: "Filipino Teachers Abroad" }]} />
      <Script id="schema-filipino-teacher-work-abroad-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: SCHEMA_FAQ }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <article className="lg:col-span-2">
            <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
              <span className="text-gray-700">/</span>
              <Link href="/education" className="text-gray-500 hover:text-gray-300 transition-colors">Education</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400 truncate">Filipino Teachers Abroad</span>
            </nav>

            <header className="mb-8">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">Education (LET)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
                Filipino Teachers Abroad 2026: US, Japan, and Other Destinations
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>LisensyaPrep Team</span><span>•</span>
                <span>August 5, 2026</span><span>•</span>
                <span>8 min read</span>
              </div>
            </header>

            <div className="prose-content">
              {renderContent(MAIN_CONTENT)}
              <AdPlaceholder slot="banner" className="my-6" />
            </div>

            <div className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-white mb-4">Related Guides</h2>
              <ul className="space-y-3">
                {RELATED_ARTICLES.map(({ text, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-gradient-to-br from-violet-900/20 to-violet-900/10 border border-violet-500/30 rounded-2xl p-6 text-center">
              <p className="text-violet-400 font-extrabold text-lg mb-2">Still Reviewing for the LET?</p>
              <p className="text-gray-400 text-sm mb-4">Free gamified LET reviewer covering Gen Ed and Prof Ed. No account required.</p>
              <Link href="/education" className="inline-block bg-violet-500 hover:bg-violet-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Start Practicing at LisensyaPrep
              </Link>
            </div>

            <AdPlaceholder slot="banner" className="mt-8" />
          </article>

          <aside className="space-y-6">
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Related Guides</h3>
              <div className="space-y-3">
                {RELATED_ARTICLES.map(({ text, href }) => (
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
