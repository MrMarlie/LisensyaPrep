import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';
import { PremiumPageViewTracker } from '@/components/PremiumAnalytics';

export const metadata: Metadata = {
  title: 'LET Gen Ed Mastery System 2026 — Premium Reviewer | LisensyaPrep',
  description:
    '430+ Gen Ed questions with full rationales. English, Filipino, Math, Science, Social Sciences. Built for the 2026 Enhanced TOS. ₱249. Pay via GCash.',
  openGraph: {
    title: 'LET Gen Ed Mastery System 2026 — Premium Reviewer | LisensyaPrep',
    description: '430+ Gen Ed questions with full rationales. Built for the 2026 Enhanced TOS. ₱249. Pay via GCash.',
    url: 'https://lisensyaprep.com/premium/let-gen-ed-mastery',
  },
};

const PRODUCT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'LET Gen Ed Mastery System 2026',
  description: '~120-page premium LET General Education reviewer with 430+ questions and full rationales, built for the 2026 Enhanced TOS.',
  brand: { '@type': 'Brand', name: 'LisensyaPrep' },
  offers: {
    '@type': 'Offer',
    price: '249',
    priceCurrency: 'PHP',
    availability: 'https://schema.org/InStock',
    url: 'https://lisensyaprep.com/premium/let-gen-ed-mastery/checkout',
  },
};

const SUBJECTS = [
  { icon: '📘', title: 'English', questions: 101, weight: '30%', topics: 'Grammar, vocabulary, Philippine literature, world literature, communication, study skills' },
  { icon: '📗', title: 'Filipino', questions: 80, weight: '20%', topics: 'Balarila, panitikan, kultura, gramatika, komunikasyon' },
  { icon: '📙', title: 'Mathematics', questions: 92, weight: '20%', topics: 'Algebra, geometry, statistics, problem-solving, percentage, fractions, exponents' },
  { icon: '📕', title: 'Science', questions: 81, weight: '15%', topics: 'Biology, physics, chemistry, earth science, astronomy' },
  { icon: '📔', title: 'Social Sciences', questions: 82, weight: '15%', topics: 'Philippine history, government, Rizal, economics, sociology, philosophy, arts' },
];

const FEATURES = [
  { icon: '📝', title: '430+ Questions with Full Rationales', desc: 'Every answer explains WHY it\'s right AND why the other choices are wrong.' },
  { icon: '📋', title: 'Mapped to the 2026 Enhanced TOS', desc: 'All 5 subjects weighted exactly how PRC tests them. No outdated content.' },
  { icon: '📅', title: 'Built-in 8-Week Study Schedule', desc: 'Day-by-day plan covering all 5 Gen Ed subjects up to exam day.' },
  { icon: '📊', title: 'Full 50-Question Mock Exam', desc: 'Proportionally weighted like the real LET Gen Ed. Take it under timed conditions.' },
  { icon: '📌', title: 'Quick Reference Cheat Sheet', desc: 'Key RAs, dates, formulas, literary works — all in one final-week reference.' },
  { icon: '📱', title: 'Mobile-Friendly Format', desc: 'Study on your phone during commute. Designed for small screens first.' },
  { icon: '🧠', title: 'Filipino Memory Hooks', desc: 'Retention tricks for retaining literary authors, historical dates, math formulas.' },
  { icon: '⚡', title: 'Distractor Explanations', desc: 'Know exactly why each wrong answer is wrong — the secret to scoring higher.' },
];

const FAQS = [
  { q: 'Is this for BEEd or BSEd takers?', a: 'Both. Gen Ed is required for ALL LET takers. For BEEd takers, Gen Ed = 40% of your total LET score. For BSEd takers, Gen Ed = 20%. Either way, mastering Gen Ed moves the needle significantly.' },
  { q: 'What format is the reviewer in?', a: 'PDF, ~120 pages, optimized for mobile viewing. Works on any device — phone, tablet, laptop, desktop.' },
  { q: 'Can I print it?', a: 'Yes, for personal use. Sharing or reselling the file is strictly prohibited.' },
  { q: 'Is this enough to pass LET Gen Ed alone?', a: 'This reviewer covers 100% of the Enhanced TOS topics across all 5 Gen Ed subject areas. We recommend pairing it with our free Gen Ed articles for additional context.' },
  { q: 'What\'s your refund policy?', a: 'As this is a digital product, all sales are final. No refunds will be issued once the file has been delivered.' },
  { q: 'When do I get the reviewer?', a: 'Within 12 hours of payment confirmation (usually same hour during 8 AM–10 PM).' },
  { q: 'I already bought the ProfEd Mastery System. Do I get a discount?', a: 'Yes — ProfEd Mastery buyers get Gen Ed at ₱199 (₱50 off). Email us at lisensyaprep@gmail.com with your order ID to claim your discount before purchasing.' },
  { q: 'What\'s the Bundle Deal?', a: 'Get both ProfEd Mastery + Gen Ed Mastery for ₱399 — saving ₱99 vs buying separately. See the Bundle Deal page.' },
  { q: 'Is this affiliated with PRC?', a: 'No — independent educational product based on publicly available TOS.' },
];

export default function GenEdMasteryPage() {
  return (
    <>
      <PremiumPageViewTracker event="gen_ed_mastery_page_view" />
      <Script id="schema-product" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_SCHEMA) }} />
      <div className="min-h-screen">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-b from-[#0a0f1e] to-[#080d1b] pt-14 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-green-400/10 text-green-400 uppercase tracking-widest mb-5">
              Now Available — Gen Ed Mastery System
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              430+ LET Gen Ed Questions.<br />Every Single One With a Full Rationale.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
              English. Filipino. Math. Science. Social Sciences. All 5 Gen Ed subjects — one complete reviewer built for the 2026 Enhanced TOS.
            </p>
            <p className="text-green-400 font-bold text-base mb-8">
              BEEd: Gen Ed = 40% of your LET score. BSEd: Gen Ed = 20%. This matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/premium/let-gen-ed-mastery/checkout"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
              >
                BUY NOW — ₱249
              </Link>
              <Link
                href="/premium/let-bundle-mastery"
                className="bg-green-400/10 hover:bg-green-400/20 border border-green-400/30 text-green-400 font-extrabold px-8 py-4 rounded-xl text-lg transition-colors"
              >
                🎁 Bundle Deal — ₱399 (Save ₱99)
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-4">ProfEd Mastery buyer? Get Gen Ed at ₱199 — email us for your discount code.</p>
          </div>
        </section>

        {/* ── Subject Breakdown ── */}
        <section className="py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 text-center">
              What&apos;s Inside — 5 Complete Subject Areas
            </h2>
            <p className="text-gray-400 text-center mb-8">~120 pages. 430+ questions. Full rationales for every item.</p>
            <div className="space-y-3">
              {SUBJECTS.map(({ icon, title, questions, weight, topics }) => (
                <div key={title} className="bg-[#0f1629] border border-white/10 rounded-xl p-5 flex gap-4">
                  <span className="text-3xl flex-shrink-0">{icon}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="text-white font-bold">{title}</p>
                      <span className="text-xs bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded-full font-semibold">{questions} questions</span>
                      <span className="text-xs bg-white/5 text-gray-400 px-2 py-0.5 rounded-full">{weight} of LET</span>
                    </div>
                    <p className="text-gray-400 text-sm">{topics}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-[#0f1629] border border-white/10 rounded-xl p-5 space-y-2">
              <p className="text-yellow-400 font-bold text-sm">PLUS — Included in Every Copy:</p>
              {[
                '✓ Full 50-item Mock Exam with detailed rationales',
                '✓ 8-Week Study Schedule',
                '✓ Test-Taking Strategies',
                '✓ Exam Day Checklist',
                '✓ Quick Reference Cheat Sheet (key RAs, dates, formulas)',
              ].map((item) => (
                <p key={item} className="text-gray-300 text-sm">{item}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="py-14 px-4 bg-[#0a0f1e]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 text-center">
              What Makes This Different
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        {/* ── Pricing ── */}
        <section className="py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 text-center">Pricing</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {/* Standard */}
              <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Standard</p>
                <p className="text-white text-3xl font-extrabold mb-1">₱249</p>
                <p className="text-gray-400 text-sm mb-4">For new buyers</p>
                <Link
                  href="/premium/let-gen-ed-mastery/checkout"
                  className="block w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl text-sm text-center transition-colors"
                >
                  Buy Now
                </Link>
              </div>

              {/* ProfEd Buyer */}
              <div className="bg-[#0f1629] border border-yellow-400/30 rounded-2xl p-6 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-extrabold px-3 py-1 rounded-full">EXCLUSIVE</span>
                <p className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-3">ProfEd Buyer</p>
                <p className="text-white text-3xl font-extrabold mb-1">₱199</p>
                <p className="text-gray-400 text-sm mb-4">Save ₱50 — email us for code</p>
                <a
                  href="mailto:lisensyaprep@gmail.com?subject=ProfEd Buyer Discount — Gen Ed Mastery"
                  className="block w-full bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 font-bold py-3 rounded-xl text-sm text-center transition-colors"
                >
                  Claim Discount
                </a>
              </div>

              {/* Bundle */}
              <div className="bg-[#0f1629] border border-green-400/30 rounded-2xl p-6 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-400 text-gray-900 text-xs font-extrabold px-3 py-1 rounded-full whitespace-nowrap">BEST VALUE</span>
                <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-3">Bundle Deal</p>
                <p className="text-white text-3xl font-extrabold mb-1">₱399</p>
                <p className="text-gray-400 text-sm mb-4">ProfEd + Gen Ed — Save ₱99</p>
                <Link
                  href="/premium/let-bundle-mastery"
                  className="block w-full bg-green-400/10 hover:bg-green-400/20 border border-green-400/30 text-green-400 font-bold py-3 rounded-xl text-sm text-center transition-colors"
                >
                  Get Bundle →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="py-16 px-4 bg-yellow-400">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-900 font-extrabold text-3xl sm:text-4xl mb-2">
              🚀 NOW AVAILABLE
            </p>
            <p className="text-gray-900 font-bold text-xl mb-6">
              LET Gen Ed Mastery System 2026
            </p>
            <p className="text-gray-800 mb-8">
              430+ questions across all 5 Gen Ed subjects. Full rationales. Mobile-optimized PDF. ₱249 via GCash.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/premium/let-gen-ed-mastery/checkout"
                className="inline-block bg-gray-900 hover:bg-gray-800 text-yellow-400 font-extrabold px-10 py-5 rounded-xl text-xl transition-colors shadow-xl"
              >
                BUY NOW — ₱249 →
              </Link>
              <Link
                href="/premium/let-bundle-mastery"
                className="inline-block bg-gray-900/70 hover:bg-gray-900 text-white font-bold px-10 py-5 rounded-xl text-xl transition-colors"
              >
                Bundle Deal — ₱399
              </Link>
            </div>
            <p className="text-gray-700 text-sm mt-4">PDF delivered to your email within 12 hours</p>
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
                    'BEEd graduate — Gen Ed is 40% of your total LET score',
                    'BSEd graduate — Gen Ed is 20%, still significant',
                    'Retaker who struggled with English, Math, or Filipino',
                    'Anyone who wants structured Gen Ed prep in one PDF',
                    'Someone who learns better with explanations, not just answer keys',
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
                    'You already passed and want a casual refresher only',
                    'You\'re not seriously preparing for the LET',
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

        {/* ── How it works ── */}
        <section className="py-14 px-4 bg-[#0a0f1e]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              How to Get Your Reviewer
            </h2>
            <p className="text-gray-400 mb-10">
              GCash only — no credit card, no rejected transactions. 100% of Filipino buyers can access this.
            </p>
            <div className="grid sm:grid-cols-4 gap-4">
              {[
                { step: '1', text: 'Click "Buy Now"' },
                { step: '2', text: 'Send ₱249 via GCash' },
                { step: '3', text: 'Fill the confirmation form' },
                { step: '4', text: 'Get PDF within 12 hours' },
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

        {/* ── Also available ── */}
        <section className="py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-extrabold text-white mb-6">Also Available from LisensyaPrep</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 text-left">
                <p className="text-yellow-400 font-bold mb-2">🎓 LET ProfEd Mastery System</p>
                <p className="text-gray-400 text-sm mb-3">430+ Professional Education questions with full rationales. Required for ALL LET takers.</p>
                <p className="text-white font-bold mb-3">₱249</p>
                <Link href="/premium/let-profed-mastery" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition-colors">
                  View ProfEd Mastery →
                </Link>
              </div>
              <div className="bg-[#0f1629] border border-green-400/20 rounded-2xl p-6 text-left">
                <p className="text-green-400 font-bold mb-2">🎁 LET Mastery Bundle Deal</p>
                <p className="text-gray-400 text-sm mb-3">Both ProfEd + Gen Ed reviewers. 860+ total questions. Save ₱99 vs buying separately.</p>
                <p className="text-white font-bold mb-1">₱399 <span className="text-gray-500 line-through text-sm font-normal">₱498</span></p>
                <p className="text-green-400 text-xs mb-3">Save ₱99</p>
                <Link href="/premium/let-bundle-mastery" className="text-green-400 hover:text-green-300 text-sm font-semibold transition-colors">
                  Get the Bundle →
                </Link>
              </div>
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
              Get your copy today. Start studying smarter.
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/premium/let-gen-ed-mastery/checkout"
                className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-10 py-5 rounded-xl text-xl transition-colors"
              >
                BUY NOW — ₱249
              </Link>
              <Link
                href="/premium/let-bundle-mastery"
                className="inline-block bg-green-400/10 hover:bg-green-400/20 border border-green-400/30 text-green-400 font-extrabold px-10 py-5 rounded-xl text-xl transition-colors"
              >
                Bundle — ₱399
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>📱 Pay via GCash</span>
              <span>📩 PDF delivered to email</span>
              <span>✅ ~120 pages, mobile-optimized</span>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
