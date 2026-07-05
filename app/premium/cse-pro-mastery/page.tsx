import Link from 'next/link';
import Script from 'next/script';
import { buildMetadata } from '@/lib/seo';
import CSEPromoBar from '@/components/CSEPromoBar';

export const metadata = buildMetadata({
  title: 'CSE Professional Mastery System 2026 — Premium Reviewer',
  description:
    '550+ CSE Professional questions with full rationales across Verbal, Numerical, Analytical, and General Information. Built for the 2026 CSC TOS. ₱199 launch special. Pay via GCash.',
  path: '/premium/cse-pro-mastery',
});

const PRODUCT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'CSE Professional Mastery System 2026',
  description:
    'Premium Civil Service Exam (Professional) reviewer with 550+ questions and full rationales across Verbal Ability, Numerical Ability, Analytical Ability, and General Information, built for the 2026 CSC Table of Specifications.',
  brand: { '@type': 'Brand', name: 'LisensyaPrep' },
  offers: {
    '@type': 'Offer',
    price: '199',
    priceCurrency: 'PHP',
    availability: 'https://schema.org/InStock',
    url: 'https://lisensyaprep.com/premium/cse-pro-mastery/checkout',
  },
};

const FEATURES = [
  { icon: '📝', title: '550+ Questions with Full Rationales', desc: 'Every answer explains WHY it\'s right AND why the others are wrong — the way the CSC actually tests.' },
  { icon: '🏛️', title: 'All 4 Professional Sections', desc: 'Verbal Ability, Numerical Ability, Analytical Ability, and General Information — nothing skipped.' },
  { icon: '📊', title: 'Analytical Ability — The Hardest Section', desc: 'Word association, logic, syllogisms, assumptions, and data interpretation: full coverage of the section that fails most takers.' },
  { icon: '📈', title: 'Full 170-Item Mock Exam', desc: 'Matches the actual Professional exam length. Take it under timed conditions before exam day.' },
  { icon: '📅', title: 'Built-in 8-Week Study Schedule', desc: 'Day-by-day plan covering all 4 sections. Know exactly what to study each week up to exam day.' },
  { icon: '📌', title: 'RA 6713 + Constitution Cheat Sheets', desc: 'The Code of Conduct (all 8 norms) and the 1987 Constitution essentials — the most-tested General Information in one place.' },
  { icon: '🧠', title: 'Memory Hooks & Test-Taking Strategies', desc: 'How to actually remember rules and solve fast — no calculator allowed, so we teach the mental math too.' },
  { icon: '📱', title: 'Mobile-Friendly Format', desc: 'Read on your phone during your commute or break. Designed for small screens first.' },
];

const COVERAGE = [
  {
    emoji: '📘',
    subject: 'Verbal Ability',
    count: '~140 questions',
    topics: ['Grammar and Correct Usage', 'Vocabulary', 'Paragraph Organization', 'Reading Comprehension (English + Filipino)'],
  },
  {
    emoji: '📙',
    subject: 'Numerical Ability',
    count: '~130 questions',
    topics: ['Basic Operations (no calculator!)', 'Word Problems', 'Percentage, ratio, proportion', 'Time, distance, work problems'],
  },
  {
    emoji: '📊',
    subject: 'Analytical Ability — The HARDEST Section',
    count: '~150 questions',
    topics: ['Word Association (analogies)', 'Logic (syllogisms, assumptions, conclusions)', 'Data Interpretation', 'Number and letter series'],
  },
  {
    emoji: '📔',
    subject: 'General Information',
    count: '~130 questions',
    topics: ['1987 Philippine Constitution', 'RA 6713 (Code of Conduct) — heavily tested', 'Peace and Human Rights Issues', 'Environmental Management and Protection'],
  },
];

const COMPARISON = [
  { feature: 'Price', free: 'Free', book: '₱300–₱1,500', ours: '₱199 launch / ₱249 regular' },
  { feature: 'Covers all 4 Professional sections', free: 'Partial', book: 'Partial', ours: 'Yes' },
  { feature: 'Full Analytical Ability coverage', free: 'No', book: 'Partial', ours: 'Yes' },
  { feature: 'Rationales for every answer', free: 'No', book: 'Partial', ours: 'Yes' },
  { feature: 'Mobile-optimized', free: 'No', book: 'No', ours: 'Yes' },
  { feature: '8-week study schedule', free: 'No', book: 'No', ours: 'Yes' },
  { feature: '170-item mock exam included', free: 'No', book: 'No', ours: 'Yes' },
  { feature: 'Instant delivery', free: 'No', book: '3–7 days', ours: 'Same-day' },
];

const FAQS = [
  { q: 'What format is the reviewer in?', a: 'PDF, optimized for mobile viewing. Works on any device — phone, tablet, laptop, or desktop.' },
  { q: 'Why is the Professional exam so hard to pass?', a: 'The CSE Professional has only a 10–12% pass rate. Most takers fail because they don\'t prepare properly for Analytical Ability and the no-calculator Numerical section. This system targets exactly those weak points.' },
  { q: 'Does this cover Analytical Ability?', a: 'Yes — fully. Analytical Ability is the section that fails most takers: word association, logic, syllogisms, assumptions, and data interpretation. We give it complete treatment with rationales for every item.' },
  { q: 'Can I print it?', a: 'Yes, you can print it for personal use. Sharing or reselling the file is strictly prohibited.' },
  { q: 'What\'s your refund policy?', a: 'As this is a digital product, all sales are final. No refunds will be issued once the file has been delivered.' },
  { q: 'When do I get the reviewer?', a: 'Within 12 hours of payment confirmation (usually the same hour during 8 AM–10 PM).' },
  { q: 'I want to take SubProfessional, not Professional.', a: 'We have a separate CSE SubProfessional Mastery System — see the link at the bottom of this page.' },
  { q: 'I already downloaded the free Starter Pack — is the Mastery System different?', a: 'Yes, completely. The free Starter Pack has 30 sample questions. The Mastery System has 550+ questions across all 4 sections, plus a 170-item mock exam, 8-week study schedule, cheat sheets, and more.' },
];

export default function CSEProMasteryPage() {
  return (
    <>
      <Script id="schema-cse-pro-mastery" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_SCHEMA) }} />
      <div className="min-h-screen">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-b from-[#0a0f1e] to-[#080d1b] pt-14 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 uppercase tracking-widest mb-5">
              Premium Reviewer — Launch Special
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              Beat the 10% Pass Rate of the CSE Professional Exam.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Most takers fail Analytical Ability and the no-calculator Numerical section. Free reviewers give you answer keys with no explanations. We built something different — 550+ questions across all 4 Professional sections, every single one with a full rationale.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/premium/cse-pro-mastery/checkout"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
              >
                GET YOUR COPY — ₱199
              </Link>
              <a href="#whats-inside" className="border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
                See What&apos;s Inside ↓
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-4">📊 Launch price — ₱249 after first 100 buyers</p>
          </div>
        </section>

        <CSEPromoBar level="pro" variant="full" />

        {/* ── Product headline ── */}
        <section className="py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              The LisensyaPrep CSE Professional Mastery System
            </h2>
            <p className="text-yellow-400 font-bold text-xl mb-10">
              550+ questions. All 4 sections. Every one with a full rationale.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {FEATURES.map(({ icon, title, desc }) => (
                <div key={title} className="bg-[#0f1629] border border-white/10 rounded-xl p-5 flex gap-4">
                  <span className="text-2xl flex-shrink-0">{icon}</span>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">{title}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section className="py-14 px-4 bg-[#0a0f1e]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-8">
              Compare for Yourself
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full bg-[#0a1022]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left text-gray-400 text-sm font-semibold">Feature</th>
                    <th className="px-4 py-3 text-center text-gray-400 text-sm font-semibold">Free PDFs Online</th>
                    <th className="px-4 py-3 text-center text-gray-400 text-sm font-semibold">Physical Books</th>
                    <th className="px-4 py-3 text-center text-yellow-400 text-sm font-bold">LisensyaPrep</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                      <td className="px-4 py-3 text-gray-300 text-sm font-medium">{row.feature}</td>
                      <td className="px-4 py-3 text-center text-sm">
                        <span className={row.free === 'No' ? 'text-red-400' : 'text-gray-300'}>{row.free}</span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-300 text-sm">{row.book}</td>
                      <td className="px-4 py-3 text-center text-sm font-bold text-yellow-400">{row.ours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 px-4 bg-yellow-400">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-900 font-extrabold text-3xl sm:text-4xl mb-2">
              📊 LAUNCH SPECIAL
            </p>
            <p className="text-gray-900 font-bold text-xl mb-6">
              First 100 Buyers Pay Only ₱199
            </p>
            <p className="text-gray-900/80 mb-8">
              After the first 100 buyers, the price returns to <strong>₱249</strong>. Pay via GCash — no credit card needed.
            </p>
            <Link
              href="/premium/cse-pro-mastery/checkout"
              className="inline-block bg-[#080d1b] hover:bg-[#0f1629] text-yellow-400 font-extrabold px-10 py-5 rounded-xl text-xl transition-colors shadow-xl"
            >
              GET YOUR COPY NOW →
            </Link>
            <p className="text-gray-900/70 text-sm mt-4">PDF delivered to your email</p>
          </div>
        </section>

        {/* ── Who it's for ── */}
        <section className="py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6">
                <p className="text-white font-extrabold text-lg mb-4">✅ This is for you if…</p>
                <ul className="space-y-2">
                  {[
                    'College graduate targeting second-level government positions',
                    'Retaker who keeps getting stuck on Analytical Ability',
                    'Self-reviewer who needs one trusted source, not 50 random PDFs',
                    'Someone who wants full rationales — not just answer keys',
                    'Working professional who needs an efficient, structured plan',
                  ].map((item) => (
                    <li key={item} className="flex gap-2 text-gray-300 text-sm">
                      <span className="text-yellow-400 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6">
                <p className="text-white font-extrabold text-lg mb-4">❌ This is NOT for you if…</p>
                <ul className="space-y-2">
                  {[
                    'You only want a question dump with no rationales',
                    'You\'re taking the SubProfessional exam (get the SubProf version instead)',
                    'You\'re not seriously preparing for the CSE',
                  ].map((item) => (
                    <li key={item} className="flex gap-2 text-gray-400 text-sm">
                      <span className="text-red-400 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Coverage breakdown ── */}
        <section id="whats-inside" className="py-14 px-4 bg-[#0a0f1e]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 text-center">
              Section Coverage
            </h2>
            <p className="text-gray-400 text-center mb-8">550+ questions distributed across all 4 Professional sections (per 2026 CSC TOS)</p>
            <div className="space-y-4">
              {COVERAGE.map(({ emoji, subject, count, topics }) => (
                <div key={subject} className="bg-[#0f1629] border border-white/10 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span>{emoji}</span>
                    <span className="text-white font-semibold text-sm">{subject}</span>
                    <span className="text-yellow-400 text-xs ml-auto font-bold">{count}</span>
                  </div>
                  <ul className="space-y-1">
                    {topics.map((t) => (
                      <li key={t} className="text-gray-500 text-xs flex items-start gap-1.5">
                        <span className="text-yellow-400/50 mt-0.5">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-14 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              How You&apos;ll Get Your Reviewer
            </h2>
            <p className="text-gray-400 mb-10">
              We use direct GCash so 100% of Filipino buyers can access the product — no credit card, no rejected transactions.
            </p>
            <div className="grid sm:grid-cols-4 gap-4">
              {[
                { step: '1', text: 'Click "Get Your Copy Now"' },
                { step: '2', text: 'Send ₱199 via GCash' },
                { step: '3', text: 'Fill the confirmation form' },
                { step: '4', text: 'Get PDF in your email within 12 hours' },
              ].map(({ step, text }) => (
                <div key={step} className="bg-[#0f1629] border border-white/10 rounded-xl p-4">
                  <div className="w-8 h-8 bg-yellow-400 text-gray-900 font-extrabold rounded-full flex items-center justify-center mx-auto mb-3 text-sm">
                    {step}
                  </div>
                  <p className="text-gray-300 text-sm leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-14 px-4 bg-[#0a0f1e]">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="bg-[#0f1629] border border-white/10 rounded-xl p-5">
                  <p className="text-white font-bold text-sm mb-2">{q}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-16 px-4">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-gray-400 text-sm mb-2">Still on the fence?</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
              Get your copy today and start studying smarter.
            </h2>
            <Link
              href="/premium/cse-pro-mastery/checkout"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-10 py-5 rounded-xl text-xl transition-colors"
            >
              GET YOUR COPY — ₱199
            </Link>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>📱 Pay via GCash</span>
              <span>📩 PDF delivered to email</span>
              <span>✅ All 4 Professional sections</span>
            </div>
          </div>
        </section>

        {/* ── Cross-links ── */}
        <section className="py-8 px-4 border-t border-white/10">
          <div className="max-w-xl mx-auto text-center space-y-3">
            <p className="text-gray-400 text-sm">
              Taking the SubProfessional exam instead?{' '}
              <Link href="/premium/cse-subprof-mastery" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 transition-colors">
                See the CSE SubProfessional Mastery System →
              </Link>
            </p>
            <p className="text-gray-500 text-sm">
              Not ready to buy yet?{' '}
              <Link href="/freebies/cse-pro-starter-pack" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 transition-colors">
                🎁 Download the free Pro Starter Pack (30 questions, no cost)
              </Link>
            </p>
          </div>
        </section>

      </div>
    </>
  );
}
