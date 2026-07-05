import Link from 'next/link';
import Script from 'next/script';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ArticlePopupTriggers from '@/components/ArticlePopupTriggers';

export const metadata = buildMetadata({
  title: 'PNLE Reviewer with Rationale — 300+ Q Explained | 2026',
  description:
    'Every PNLE question explained — why the answer is right and the distractors wrong. 300+ items across all 6 NLE subjects, ₱199 via GCash. Start free.',
  path: '/nursing/pnle-reviewer-with-rationale',
});

const PAGE_URL = 'https://lisensyaprep.com/nursing/pnle-reviewer-with-rationale';

const ARTICLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'PNLE Reviewer with Rationale — 300+ Questions That Explain Every Answer (2026)',
  description:
    'A PNLE reviewer where every one of 300+ questions explains why the correct answer is right and why each distractor is wrong, across all 6 NLE subjects, built for the 2026 PNLE Table of Specification.',
  author: { '@type': 'Organization', name: 'LisensyaPrep Team', url: 'https://lisensyaprep.com/about' },
  publisher: {
    '@type': 'Organization',
    name: 'LisensyaPrep',
    logo: { '@type': 'ImageObject', url: 'https://lisensyaprep.com/images/logo.png' },
  },
  datePublished: '2026-07-06',
  dateModified: '2026-07-06',
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
};

const FAQS = [
  {
    q: 'Is every PNLE question really explained with a rationale?',
    a: 'Yes. All 300+ questions include a full rationale that explains why the correct answer is right AND why each of the three distractors is wrong — the reasoning the PNLE actually tests, not just an answer letter.',
  },
  {
    q: 'Is the reviewer updated for the 2026 PNLE?',
    a: 'Yes. The questions and topic weighting are built around the 2026 PNLE Table of Specification across all 6 NLE subjects, so you are reviewing current coverage — not an outdated 2023 or 2024 PDF.',
  },
  {
    q: 'What format is it in? Can I read it on my phone?',
    a: 'It is a mobile-optimized PDF designed for small screens first, so you can review between hospital duties. It works on any phone, tablet, laptop, or desktop, and you can print it for personal use.',
  },
  {
    q: 'How do I pay? Do you accept GCash?',
    a: 'Yes. The launch price is ₱199 and you can pay via GCash. After payment confirmation you receive the reviewer within 12 hours (usually the same hour between 8 AM and 10 PM).',
  },
  {
    q: 'Is 300 questions enough to pass the PNLE?',
    a: 'The reviewer concentrates on the high-yield, most-tested concepts across all 6 subjects, plus a full 100-item mock exam, a 12-week study schedule, and a pharmacology cheat sheet. We recommend pairing it with the free practice questions on LisensyaPrep for extra repetition.',
  },
  {
    q: 'How is this different from the free PDFs on Scribd or Facebook groups?',
    a: 'Free PDFs give you answer letters with no explanation, unverified answers, and outdated coverage. Every item here is reviewed by nurses, checked against the 2026 Table of Specification, and carries a full rationale — so you learn the reasoning, not just memorize a key.',
  },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

// Ungated sample items pulled from the free Starter Pack — the on-page proof of rationale quality.
const SAMPLE_QUESTIONS = [
  {
    subject: 'Psychiatric Nursing',
    href: '/nursing/psychiatric-nursing-reviewer',
    question:
      'A client with major depressive disorder says, "I feel like such a burden to everyone." Which nurse response is MOST therapeutic?',
    options: [
      'You shouldn\'t feel that way — your family loves you.',
      'What makes you feel like you are a burden?',
      'Everyone feels down from time to time.',
      'Let\'s focus on something more positive today.',
    ],
    correct: 1,
    rationale:
      'The correct answer is B. An open-ended, exploratory response invites the client to share feelings and shows active listening — the core of therapeutic communication. A is false reassurance that dismisses the feeling. C generalizes and minimizes the client\'s experience. D changes the subject and avoids the emotion, which shuts communication down.',
  },
  {
    subject: 'Pharmacology / Medical-Surgical',
    href: '/nursing/pharmacology-nclex-reviewer',
    question:
      'A client taking digoxin has a serum potassium level of 2.9 mEq/L. What is the nurse\'s PRIORITY concern?',
    options: [
      'Increased risk of digoxin toxicity',
      'Decreased effectiveness of digoxin',
      'Rebound hypertension',
      'Fluid volume overload',
    ],
    correct: 0,
    rationale:
      'The correct answer is A. Normal potassium is 3.5–5.0 mEq/L; 2.9 is hypokalemia, which potentiates digoxin binding to cardiac cells and dramatically raises the risk of toxicity and lethal dysrhythmias. B is the opposite of what happens — low potassium intensifies, not weakens, digoxin\'s effect. C and D are unrelated to a low potassium level in this scenario.',
  },
  {
    subject: 'Maternal & Child Nursing',
    href: '/nursing/maternal-child-nursing-reviewer',
    question:
      'The fetal monitor shows late decelerations during labor. What should the nurse do FIRST?',
    options: [
      'Document the finding and continue monitoring.',
      'Reposition the mother to the left lateral side.',
      'Increase the oxytocin infusion rate.',
      'Prepare the client for immediate cesarean delivery.',
    ],
    correct: 1,
    rationale:
      'The correct answer is B. Late decelerations signal uteroplacental insufficiency. The first intrauterine resuscitation step is repositioning to the left lateral side to relieve pressure on the vena cava and improve placental perfusion (followed by oxygen, stopping oxytocin, and notifying the physician). A ignores a warning sign. C worsens the insufficiency. D is premature before conservative measures are tried.',
  },
  {
    subject: 'Community Health Nursing',
    href: '/nursing/community-health-nursing-reviewer',
    question: 'Which vaccine in the EPI should NEVER be stored in the freezer?',
    options: [
      'Oral Polio Vaccine (OPV)',
      'Measles vaccine',
      'Hepatitis B vaccine',
      'MMR vaccine',
    ],
    correct: 2,
    rationale:
      'The correct answer is C. Hepatitis B — along with DPT, Pentavalent, and Tetanus Toxoid — is freeze-sensitive; freezing permanently destroys its potency, so it is kept in the refrigerator (2–8°C). OPV, Measles, and MMR are freezer-stored vaccines (−15 to −25°C). Cold chain "never freeze" facts are among the most tested CHN items.',
  },
  {
    subject: 'Nursing Jurisprudence & Ethics',
    href: '/nursing/pnle-coverage-2026',
    question:
      'Under RA 9173 (Philippine Nursing Act of 2002), what is the minimum result required to pass the Nurse Licensure Examination?',
    options: [
      'A general average of 70% with no grade below 60%',
      'A general average of 75% with no grade below 60%',
      'A general average of 80% with no grade below 70%',
      'A general average of 75% with no grade below 50%',
    ],
    correct: 1,
    rationale:
      'The correct answer is B. A candidate must obtain a general weighted average of at least 75%, with no grade lower than 60% in any single subject. Miss the 60% floor in even one subject — most often Community Health Nursing — and you fail despite a passing average. This is a frequently tested jurisprudence and exam-mechanics fact.',
  },
];

const SUBJECTS = [
  { emoji: '🏘️', name: 'Community Health Nursing', count: '~60 questions', href: '/nursing/community-health-nursing-reviewer' },
  { emoji: '🩺', name: 'Medical-Surgical Nursing', count: '~80 questions', href: '/nursing/medical-surgical-nursing-reviewer' },
  { emoji: '🤱', name: 'Maternal & Child Nursing', count: '~60 questions', href: '/nursing/maternal-child-nursing-reviewer' },
  { emoji: '🧠', name: 'Psychiatric Nursing', count: '~50 questions', href: '/nursing/psychiatric-nursing-reviewer' },
  { emoji: '📋', name: 'Fundamentals of Nursing', count: '~30 questions', href: '/nursing/pnle-coverage-2026' },
  { emoji: '⚖️', name: 'Nursing Jurisprudence & Ethics', count: '~20 questions', href: '/nursing/pnle-coverage-2026' },
];

const RELATED = [
  { text: 'PNLE Coverage 2026 — Complete Topic Breakdown', href: '/nursing/pnle-coverage-2026' },
  { text: 'PNLE 3-Month Study Plan 2026', href: '/nursing/pnle-3-month-study-plan' },
  { text: 'Community Health Nursing Reviewer NLE 2026', href: '/nursing/community-health-nursing-reviewer' },
  { text: 'Medical-Surgical Nursing Reviewer NLE 2026', href: '/nursing/medical-surgical-nursing-reviewer' },
  { text: 'Maternal and Child Nursing Reviewer NLE 2026', href: '/nursing/maternal-child-nursing-reviewer' },
  { text: 'Psychiatric Nursing Reviewer NLE 2026', href: '/nursing/psychiatric-nursing-reviewer' },
];

const LETTERS = ['A', 'B', 'C', 'D'];

export default function PNLEReviewerWithRationalePage() {
  return (
    <div className="min-h-screen">
      <Script id="schema-pnle-rationale-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <Script id="schema-pnle-rationale-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <BreadcrumbSchema items={[{ url: '/', name: 'Home' }, { url: '/nursing', name: 'Nursing' }, { url: '/nursing/pnle-reviewer-with-rationale', name: 'PNLE Reviewer with Rationale' }]} />

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-b from-pink-950/40 to-[#080d1b] pt-12 pb-14 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
            <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
            <span className="text-gray-700">/</span>
            <Link href="/nursing" className="text-gray-500 hover:text-gray-300 transition-colors">Nursing</Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-400 truncate">PNLE Reviewer with Rationale</span>
          </nav>

          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-pink-400/10 text-pink-400 uppercase tracking-widest mb-5">
            Built for the 2026 PNLE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            PNLE Reviewer with Rationale — 300+ Questions That Explain Every Answer
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            A <strong className="text-white">PNLE reviewer with rationale</strong> where every one of 300+ questions explains
            <em className="text-gray-400"> why</em> the correct answer is right — and why the three wrong ones are wrong.
            Across all 6 NLE subjects, built for the 2026 Table of Specification.
          </p>

          <div className="flex flex-wrap gap-3 mb-8 text-sm">
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-gray-200">💯 ₱199 launch price</span>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-gray-200">📱 Pay via GCash</span>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-gray-200">🩺 All 6 NLE subjects</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/premium/pnle-mastery/checkout" className="bg-pink-500 hover:bg-pink-400 text-white font-extrabold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg text-center">
              Get the Reviewer — ₱199
            </Link>
            <a href="#samples" className="border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors text-center">
              See sample rationales ↓
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* ── What "with rationale" means ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-white mb-4">What a &ldquo;PNLE reviewer with rationale&rdquo; actually means</h2>
          <div className="bg-[#0f1629] border border-pink-500/20 rounded-2xl p-6 mb-4">
            <p className="text-gray-300 leading-relaxed">
              A <strong className="text-white">rationale</strong> is the clinical reasoning behind an answer — the explanation of why the
              correct option is correct and why the others are traps. Most free PNLE reviewer PDFs only give you an answer key:
              a letter, and nothing else. That teaches you to memorize, not to reason. The PNLE tests
              <strong className="text-white"> application and analysis</strong>, so a reviewer that explains every item is the difference
              between recognizing a question and actually being able to answer a new one.
            </p>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Every question in this reviewer carries a full rationale — including the &ldquo;why each distractor is wrong&rdquo; breakdown
            that even most paid apps hide behind a signup. Here are five real, ungated samples so you can judge the quality yourself.
          </p>
        </section>

        {/* ── Sample questions (conversion engine) ── */}
        <section id="samples" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-extrabold text-white mb-2">See 5 real questions with full rationales</h2>
          <p className="text-gray-400 text-sm mb-6">One from each major NLE subject. No signup, no download — this is exactly how every item in the reviewer is written.</p>

          <div className="space-y-6">
            {SAMPLE_QUESTIONS.map((item, qi) => (
              <div key={qi} className="bg-[#0a1022] border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between gap-3">
                  <Link href={item.href} className="text-pink-400 text-xs font-bold uppercase tracking-wide hover:text-pink-300 transition-colors">
                    {item.subject}
                  </Link>
                  <span className="text-gray-600 text-xs">Sample {qi + 1} of 5</span>
                </div>
                <div className="p-5">
                  <p className="text-white font-semibold mb-4 leading-relaxed">{item.question}</p>
                  <ul className="space-y-2 mb-5">
                    {item.options.map((opt, oi) => {
                      const isCorrect = oi === item.correct;
                      return (
                        <li
                          key={oi}
                          className={`flex gap-3 rounded-xl px-4 py-2.5 text-sm border ${
                            isCorrect
                              ? 'bg-green-500/10 border-green-500/40 text-green-200'
                              : 'bg-white/[0.02] border-white/5 text-gray-400'
                          }`}
                        >
                          <span className={`font-bold ${isCorrect ? 'text-green-400' : 'text-gray-500'}`}>{LETTERS[oi]}.</span>
                          <span>{opt}{isCorrect && <span className="ml-2 text-green-400 font-semibold">✓ Correct</span>}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="bg-yellow-400/5 border-l-2 border-yellow-400/60 rounded-r-lg px-4 py-3">
                    <p className="text-yellow-400 text-xs font-bold uppercase tracking-wide mb-1">Rationale</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.rationale}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/premium/pnle-mastery/checkout" className="inline-block bg-pink-500 hover:bg-pink-400 text-white font-bold px-7 py-3.5 rounded-xl transition-colors">
              Get all 300+ explained questions — ₱199
            </Link>
          </div>
        </section>

        {/* ── 6 subjects ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-white mb-2">All 6 NLE subjects covered — 300+ questions</h2>
          <p className="text-gray-400 text-sm mb-6">Weighted to match the real PNLE. Tap any subject to open its free reviewer.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SUBJECTS.map((s) => (
              <Link key={s.name} href={s.href} className="group flex items-center gap-3 bg-[#0f1629] border border-white/10 hover:border-pink-500/40 rounded-xl p-4 transition-all">
                <span className="text-2xl">{s.emoji}</span>
                <span className="flex-1">
                  <span className="block text-white text-sm font-bold group-hover:text-pink-400 transition-colors">{s.name}</span>
                  <span className="block text-gray-500 text-xs">{s.count}</span>
                </span>
                <span className="text-yellow-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Why rationale-based review ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-white mb-4">Why rationale-based review passes the PNLE</h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            The PNLE does not reward pure memorization. Its items are written at the application and analysis level — priority-setting,
            &ldquo;what should the nurse do first,&rdquo; and safe-practice judgment. When you review with rationales, you learn the
            underlying rule (why left-lateral for late decelerations, why hypokalemia raises digoxin toxicity), so you can answer a
            brand-new question you have never seen before.
          </p>
          <p className="text-gray-300 leading-relaxed">
            It also protects your weakest subject. To pass, you need a general average of <strong className="text-white">75%</strong> with
            <strong className="text-white"> no grade below 60%</strong> in any subject. Understanding <em className="text-gray-400">why</em>,
            not just <em className="text-gray-400">what</em>, is how you lift the subject that could otherwise pull you below that 60% floor.
          </p>
        </section>

        {/* ── Pricing / GCash ── */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-pink-900/25 to-pink-900/10 border border-pink-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-extrabold text-white mb-4">How to get it — ₱199, pay via GCash</h2>
            <ul className="space-y-2.5 text-gray-300 text-sm mb-6">
              <li className="flex gap-2"><span className="text-pink-400">✓</span> <span><strong className="text-white">300+ questions</strong>, every one with a full rationale</span></li>
              <li className="flex gap-2"><span className="text-pink-400">✓</span> <span><strong className="text-white">Full 100-item mock exam</strong> weighted like the real PNLE</span></li>
              <li className="flex gap-2"><span className="text-pink-400">✓</span> <span><strong className="text-white">12-week study schedule</strong> built around the 6 subjects</span></li>
              <li className="flex gap-2"><span className="text-pink-400">✓</span> <span><strong className="text-white">High-yield drug cheat sheet</strong> + Community Health quick reference</span></li>
              <li className="flex gap-2"><span className="text-pink-400">✓</span> <span>Mobile-optimized PDF — delivered within 12 hours of GCash payment</span></li>
            </ul>
            <Link href="/premium/pnle-mastery/checkout" className="block sm:inline-block bg-pink-500 hover:bg-pink-400 text-white font-extrabold px-8 py-4 rounded-xl text-lg transition-colors text-center">
              Get the PNLE Mastery System — ₱199
            </Link>
          </div>
        </section>

        {/* ── Free vs Mastery ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-white mb-4">Not ready to buy? Start free.</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-[#0a1022] border border-white/10 rounded-xl overflow-hidden text-sm">
              <tbody>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left text-gray-400 font-medium"></th>
                  <th className="px-4 py-3 text-left text-gray-300 font-bold">Free Starter Pack</th>
                  <th className="px-4 py-3 text-left text-pink-400 font-bold">Mastery System — ₱199</th>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-3 text-gray-400">Questions with rationale</td>
                  <td className="px-4 py-3 text-gray-300">30 sample items</td>
                  <td className="px-4 py-3 text-white font-semibold">300+ items</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-3 text-gray-400">100-item mock exam</td>
                  <td className="px-4 py-3 text-gray-500">—</td>
                  <td className="px-4 py-3 text-white font-semibold">✓</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-3 text-gray-400">12-week study schedule</td>
                  <td className="px-4 py-3 text-gray-500">—</td>
                  <td className="px-4 py-3 text-white font-semibold">✓</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-400">Drug &amp; CHN cheat sheets</td>
                  <td className="px-4 py-3 text-gray-500">—</td>
                  <td className="px-4 py-3 text-white font-semibold">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <Link href="/freebies/pnle-nursing-starter-pack" className="flex-1 border border-white/20 hover:border-white/40 text-gray-200 font-semibold px-6 py-3 rounded-xl transition-colors text-center">
              Download the free Starter Pack
            </Link>
            <Link href="/premium/pnle-mastery" className="flex-1 bg-pink-500 hover:bg-pink-400 text-white font-bold px-6 py-3 rounded-xl transition-colors text-center">
              See the full Mastery System
            </Link>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-extrabold text-white mb-5">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group bg-[#0f1629] border border-white/10 rounded-xl px-5 py-4">
                <summary className="text-white font-semibold text-sm cursor-pointer list-none flex items-center justify-between gap-3">
                  {q}
                  <span className="text-pink-400 group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="text-gray-400 text-sm leading-relaxed mt-3">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Related ── */}
        <section className="mb-12">
          <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-extrabold text-white mb-4">Keep reviewing — free NLE guides</h2>
            <ul className="space-y-3">
              {RELATED.map(({ text, href }) => (
                <li key={href}>
                  <Link href={href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors">{text}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Closing CTA band ── */}
        <section className="bg-gradient-to-br from-pink-900/25 to-pink-900/10 border border-pink-500/30 rounded-2xl p-6 text-center">
          <p className="text-pink-400 font-extrabold text-lg mb-2">Stop memorizing answer keys. Start understanding them.</p>
          <p className="text-gray-400 text-sm mb-5">300+ PNLE questions, every one explained. ₱199 via GCash, delivered within 12 hours.</p>
          <Link href="/premium/pnle-mastery/checkout" className="inline-block bg-pink-500 hover:bg-pink-400 text-white font-extrabold px-8 py-4 rounded-xl text-lg transition-colors">
            Get Your Copy — ₱199 →
          </Link>
        </section>

      </div>
      <ArticlePopupTriggers type="pnle" />
    </div>
  );
}
