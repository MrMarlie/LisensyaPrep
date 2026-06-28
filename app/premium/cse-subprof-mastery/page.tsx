import Link from 'next/link';
import Script from 'next/script';
import { buildMetadata } from '@/lib/seo';
import CSEPromoBar from '@/components/CSEPromoBar';

export const metadata = buildMetadata({
  title: 'CSE SubProfessional Mastery System 2026 — Premium Reviewer | LisensyaPrep',
  description:
    '465+ CSE SubProfessional questions with full rationales across Verbal, Numerical, Clerical, and General Information. Built for the 2026 CSC TOS. ₱149 launch special. Pay via GCash.',
  path: '/premium/cse-subprof-mastery',
});

const PRODUCT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'CSE SubProfessional Mastery System 2026',
  description:
    'Premium Civil Service Exam (SubProfessional) reviewer with 465+ questions and full rationales across Verbal Ability, Numerical Ability, Clerical Ability, and General Information, built for the 2026 CSC Table of Specifications.',
  brand: { '@type': 'Brand', name: 'LisensyaPrep' },
  offers: {
    '@type': 'Offer',
    price: '149',
    priceCurrency: 'PHP',
    availability: 'https://schema.org/InStock',
    url: 'https://lisensyaprep.com/premium/cse-subprof-mastery/checkout',
  },
};

const FEATURES = [
  { icon: '📝', title: '465+ Questions with Full Rationales', desc: 'Every answer explains WHY it\'s right AND why the others are wrong — the way the CSC actually tests.' },
  { icon: '🏛️', title: 'All 4 SubProfessional Sections', desc: 'Verbal Ability, Numerical Ability, Clerical Ability, and General Information — nothing skipped.' },
  { icon: '📋', title: 'Clerical Ability — Done Right', desc: 'The SubProf-exclusive section most reviewers ignore: filing, alphabetizing, spelling, and pattern matching with full coverage.' },
  { icon: '📊', title: 'Full 165-Item Mock Exam', desc: 'Matches the actual SubProfessional exam length. Take it under timed conditions before exam day.' },
  { icon: '📅', title: 'Built-in 8-Week Study Schedule', desc: 'Day-by-day plan covering all 4 sections. Know exactly what to study each week up to exam day.' },
  { icon: '📌', title: 'RA 6713 + Constitution Cheat Sheets', desc: 'The Code of Conduct and the 1987 Constitution essentials — the most-tested General Information in one place.' },
  { icon: '🧠', title: 'Memory Hooks & Test-Taking Strategies', desc: 'How to actually remember rules and shortcuts — no calculator allowed, so we teach the mental math too.' },
  { icon: '📱', title: 'Mobile-Friendly Format', desc: 'Read on your phone during your commute or break. Designed for small screens first.' },
];

const COVERAGE = [
  {
    emoji: '📘',
    subject: 'Verbal Ability',
    count: '~120 questions',
    topics: ['Grammar and Correct Usage', 'Vocabulary', 'Reading Comprehension', 'Paragraph Organization'],
  },
  {
    emoji: '📙',
    subject: 'Numerical Ability',
    count: '~120 questions',
    topics: ['Basic Operations (no calculator!)', 'Word Problems', 'Percentage, ratio, proportion', 'Time and work problems'],
  },
  {
    emoji: '📋',
    subject: 'Clerical Ability — SubProf Exclusive',
    count: '~100 questions',
    topics: ['Filing and alphabetizing', 'Attention to detail', 'Spelling identification', 'Pattern matching'],
  },
  {
    emoji: '📔',
    subject: 'General Information',
    count: '~125 questions',
    topics: ['1987 Philippine Constitution', 'RA 6713 (Code of Conduct)', 'Peace and Human Rights Issues', 'Environmental Management and Protection'],
  },
];

const COMPARISON = [
  { feature: 'Price', free: 'Free', book: '₱250–₱900', ours: '₱149 launch / ₱199 regular' },
  { feature: 'Covers all 4 SubProf sections', free: 'Partial', book: 'Partial', ours: 'Yes' },
  { feature: 'Full Clerical Ability coverage', free: 'No', book: 'Partial', ours: 'Yes' },
  { feature: 'Rationales for every answer', free: 'No', book: 'Partial', ours: 'Yes' },
  { feature: 'Mobile-optimized', free: 'No', book: 'No', ours: 'Yes' },
  { feature: '8-week study schedule', free: 'No', book: 'No', ours: 'Yes' },
  { feature: '165-item mock exam included', free: 'No', book: 'No', ours: 'Yes' },
  { feature: 'Instant delivery', free: 'No', book: '3–7 days', ours: 'Same-day' },
];

const FAQS = [
  { q: 'What format is the reviewer in?', a: 'PDF, optimized for mobile viewing. Works on any device — phone, tablet, laptop, or desktop.' },
  { q: 'Who is the SubProfessional exam for?', a: 'Anyone targeting first-level (clerical, administrative) government positions. You don\'t need a college degree to take the SubProfessional exam.' },
  { q: 'Does this cover Clerical Ability?', a: 'Yes — fully. Clerical Ability is unique to the SubProfessional exam and most free reviewers barely touch it. We give it complete treatment: filing, alphabetizing, spelling, and pattern matching, all with rationales.' },
  { q: 'Can I print it?', a: 'Yes, you can print it for personal use. Sharing or reselling the file is strictly prohibited.' },
  { q: 'What\'s your refund policy?', a: 'As this is a digital product, all sales are final. No refunds will be issued once the file has been delivered.' },
  { q: 'When do I get the reviewer?', a: 'Within 12 hours of payment confirmation (usually the same hour during 8 AM–10 PM).' },
  { q: 'I want to take Professional, not SubProfessional.', a: 'We have a separate CSE Professional Mastery System — see the link at the bottom of this page.' },
  { q: 'I already downloaded the free Starter Pack — is the Mastery System different?', a: 'Yes, completely. The free Starter Pack has 30 sample questions. The Mastery System has 465+ questions across all 4 sections, plus a 165-item mock exam, 8-week study schedule, cheat sheets, and more.' },
];

export default function CSESubProfMasteryPage() {
  return (
    <>
      <Script id="schema-cse-subprof-mastery" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_SCHEMA) }} />
      <div className="min-h-screen">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-b from-[#0a0f1e] to-[#080d1b] pt-14 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 uppercase tracking-widest mb-5">
              Premium Reviewer — Launch Special
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              Pass the CSE SubProfessional Without Guessing on Clerical Ability.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Free CSE reviewers online skip Clerical Ability, give answers with no explanations, and recycle outdated questions. We built something different — 465+ questions across all 4 SubProfessional sections, every single one with a full rationale.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/premium/cse-subprof-mastery/checkout"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
              >
                GET YOUR COPY — ₱149
              </Link>
              <a href="#whats-inside" className="border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
                See What&apos;s Inside ↓
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-4">📋 Launch price — ₱199 after first 100 buyers</p>
          </div>
        </section>

        <CSEPromoBar level="subprof" variant="full" />

        {/* ── Product headline ── */}
        <section className="py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              The LisensyaPrep CSE SubProfessional Mastery System
            </h2>
            <p className="text-yellow-400 font-bold text-xl mb-10">
              465+ questions. All 4 sections. Every one with a full rationale.
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
              📋 LAUNCH SPECIAL
            </p>
            <p className="text-gray-900 font-bold text-xl mb-6">
              First 100 Buyers Pay Only ₱149
            </p>
            <p className="text-gray-900/80 mb-8">
              After the first 100 buyers, the price returns to <strong>₱199</strong>. Pay via GCash — no credit card needed.
            </p>
            <Link
              href="/premium/cse-subprof-mastery/checkout"
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
                    'Non-college graduate applying for government jobs',
                    'Targeting first-level (clerical, administrative) positions',
                    'Job order / contract of service worker wanting a permanent post',
                    'LGU employee who needs CSC eligibility',
                    'Self-reviewer who keeps neglecting Clerical Ability',
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
                    'You\'re taking the Professional exam (get the Pro version instead)',
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
            <p className="text-gray-400 text-center mb-8">465+ questions distributed across all 4 SubProfessional sections (per 2026 CSC TOS)</p>
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
                { step: '2', text: 'Send ₱149 via GCash' },
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
              href="/premium/cse-subprof-mastery/checkout"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-10 py-5 rounded-xl text-xl transition-colors"
            >
              GET YOUR COPY — ₱149
            </Link>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>📱 Pay via GCash</span>
              <span>📩 PDF delivered to email</span>
              <span>✅ All 4 SubProf sections</span>
            </div>
          </div>
        </section>

        {/* ── Cross-links ── */}
        <section className="py-8 px-4 border-t border-white/10">
          <div className="max-w-xl mx-auto text-center space-y-3">
            <p className="text-gray-400 text-sm">
              Taking the Professional exam instead?{' '}
              <Link href="/premium/cse-pro-mastery" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 transition-colors">
                See the CSE Professional Mastery System →
              </Link>
            </p>
            <p className="text-gray-500 text-sm">
              Not ready to buy yet?{' '}
              <Link href="/freebies/cse-subprof-starter-pack" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 transition-colors">
                🎁 Download the free SubProf Starter Pack (30 questions, no cost)
              </Link>
            </p>
          </div>
        </section>

      </div>
    </>
  );
}
