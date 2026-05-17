import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';
import { PremiumPageViewTracker } from '@/components/PremiumAnalytics';

export const metadata: Metadata = {
  title: 'LET Mastery Bundle — ProfEd + Gen Ed (Save ₱99) | LisensyaPrep',
  description:
    'Get both LET ProfEd Mastery + Gen Ed Mastery Systems. 860+ questions total. Save ₱99 vs buying separately. ₱399 via GCash.',
  openGraph: {
    title: 'LET Mastery Bundle — ProfEd + Gen Ed (Save ₱99) | LisensyaPrep',
    description: '860+ questions total. Save ₱99 vs buying separately. ₱399 via GCash.',
    url: 'https://lisensyaprep.com/premium/let-bundle-mastery',
  },
};

const BUNDLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'LET Mastery Bundle 2026 — ProfEd + Gen Ed',
  description: 'Complete bundle: LET ProfEd Mastery System + LET Gen Ed Mastery System. 860+ questions with full rationales.',
  brand: { '@type': 'Brand', name: 'LisensyaPrep' },
  offers: {
    '@type': 'Offer',
    price: '399',
    priceCurrency: 'PHP',
    availability: 'https://schema.org/InStock',
    url: 'https://lisensyaprep.com/premium/let-bundle-mastery/checkout',
  },
};

export default function BundleMasteryPage() {
  return (
    <>
      <PremiumPageViewTracker event="bundle_mastery_page_view" />
      <Script id="schema-bundle" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BUNDLE_SCHEMA) }} />
      <div className="min-h-screen">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-b from-[#0a0f1e] to-[#080d1b] pt-14 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-green-400/10 text-green-400 uppercase tracking-widest mb-5">
              Best Value — Save ₱99
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              🎁 LET Mastery Bundle
            </h1>
            <p className="text-2xl font-bold text-gray-300 mb-3">
              ProfEd Mastery + Gen Ed Mastery
            </p>
            <p className="text-gray-400 text-lg mb-6 max-w-xl mx-auto">
              860+ questions across ALL LET subjects. Full rationales. Two complete reviewers for the price of one-and-a-half.
            </p>

            {/* Price comparison */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-[#0f1629] border border-green-400/20 rounded-2xl px-8 py-5 mb-8">
              <div className="text-center">
                <p className="text-gray-500 text-xs mb-1">Regular (separate)</p>
                <p className="text-gray-500 line-through text-xl font-bold">₱498</p>
              </div>
              <div className="text-green-400 text-2xl font-extrabold hidden sm:block">→</div>
              <div className="text-center">
                <p className="text-green-400 text-xs font-semibold mb-1">Bundle Price</p>
                <p className="text-white text-4xl font-extrabold">₱399</p>
              </div>
              <div className="bg-green-400 text-gray-900 font-extrabold text-sm px-3 py-1 rounded-full">
                Save ₱99
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/premium/let-bundle-mastery/checkout"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
              >
                GET THE BUNDLE — ₱399
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-4">Two PDF reviewers delivered to your email within 12 hours</p>
          </div>
        </section>

        {/* ── What you get ── */}
        <section className="py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 text-center">
              What You Get
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {/* ProfEd */}
              <div className="bg-[#0f1629] border border-yellow-400/20 rounded-2xl p-6">
                <p className="text-yellow-400 font-extrabold text-lg mb-3">🎓 LET ProfEd Mastery System</p>
                <ul className="space-y-2 mb-4">
                  {[
                    '430+ Professional Education questions',
                    'Foundations of Education (80 questions)',
                    'Child & Adolescent Development (80 questions)',
                    'Facilitating Learning (80 questions)',
                    'Curriculum & Instruction (70 questions)',
                    'Assessment of Learning (60 questions)',
                    'PPST & Professional Practice (60 questions)',
                    '50-item Mock Exam with rationales',
                    '8-Week Study Schedule',
                    'Quick Reference Cheat Sheet',
                  ].map((item) => (
                    <li key={item} className="flex gap-2 text-gray-300 text-sm">
                      <span className="text-yellow-400 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-500 text-xs">~100 pages</p>
              </div>

              {/* Gen Ed */}
              <div className="bg-[#0f1629] border border-green-400/20 rounded-2xl p-6">
                <p className="text-green-400 font-extrabold text-lg mb-3">📗 LET Gen Ed Mastery System</p>
                <ul className="space-y-2 mb-4">
                  {[
                    '430+ General Education questions',
                    'English (101 questions — 30% of LET)',
                    'Filipino (80 questions — 20% of LET)',
                    'Mathematics (92 questions — 20% of LET)',
                    'Science (81 questions — 15% of LET)',
                    'Social Sciences (82 questions — 15% of LET)',
                    '50-item Mock Exam with rationales',
                    '8-Week Study Schedule',
                    'Quick Reference Cheat Sheet',
                    'Filipino memory hooks & formulas',
                  ].map((item) => (
                    <li key={item} className="flex gap-2 text-gray-300 text-sm">
                      <span className="text-green-400 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-500 text-xs">~120 pages</p>
              </div>
            </div>

            {/* Total stats */}
            <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { value: '860+', label: 'Total Questions' },
                { value: '2', label: 'Mock Exams' },
                { value: '220+', label: 'Total Pages' },
                { value: '₱99', label: 'Savings vs Separate' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-yellow-400 text-2xl font-extrabold">{value}</p>
                  <p className="text-gray-400 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Perfect for ── */}
        <section className="py-14 px-4 bg-[#0a0f1e]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-white mb-8 text-center">Perfect For</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: '🎓',
                  title: 'BEEd Takers',
                  desc: 'Gen Ed = 40% + ProfEd = 60% of your LET. You need both. This bundle covers everything.',
                },
                {
                  icon: '📐',
                  title: 'BSEd Takers',
                  desc: 'Gen Ed = 20% + ProfEd = 40% + Specialization = 40%. The bundle locks in 60% of your score.',
                },
                {
                  icon: '🏆',
                  title: 'Serious Retakers',
                  desc: 'You\'ve been here before. This time, prepare everything — not just the subject that tripped you up.',
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-[#0f1629] border border-white/10 rounded-xl p-5 text-center">
                  <span className="text-3xl mb-3 block">{icon}</span>
                  <p className="text-white font-bold mb-2">{title}</p>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-14 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">How to Get the Bundle</h2>
            <p className="text-gray-400 mb-10">One payment. Two reviewers delivered to your inbox.</p>
            <div className="grid sm:grid-cols-4 gap-4">
              {[
                { step: '1', text: 'Click "Get the Bundle"' },
                { step: '2', text: 'Send ₱399 via GCash' },
                { step: '3', text: 'Fill the confirmation form' },
                { step: '4', text: 'Get BOTH PDFs within 12 hours' },
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

        {/* ── CTA banner ── */}
        <section className="py-16 px-4 bg-yellow-400">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-900 font-extrabold text-3xl sm:text-4xl mb-2">
              🎁 BUNDLE DEAL — SAVE ₱99
            </p>
            <p className="text-gray-900 font-bold text-xl mb-2">
              ProfEd Mastery + Gen Ed Mastery
            </p>
            <p className="text-gray-800 mb-8">
              860+ questions. Two complete reviewers. ₱399 via GCash — instead of ₱498 for both.
            </p>
            <Link
              href="/premium/let-bundle-mastery/checkout"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-yellow-400 font-extrabold px-10 py-5 rounded-xl text-xl transition-colors shadow-xl"
            >
              GET THE BUNDLE — ₱399 →
            </Link>
            <p className="text-gray-700 text-sm mt-4">Both PDFs delivered to your email</p>
          </div>
        </section>

        {/* ── Individual options ── */}
        <section className="py-14 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-400 text-sm mb-6">Or buy individually:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/premium/let-profed-mastery" className="flex-1 bg-[#0f1629] border border-white/10 rounded-xl p-4 hover:border-yellow-400/30 transition-colors">
                <p className="text-yellow-400 font-bold text-sm mb-1">ProfEd Mastery Only</p>
                <p className="text-white font-extrabold">₱249</p>
              </Link>
              <Link href="/premium/let-gen-ed-mastery" className="flex-1 bg-[#0f1629] border border-white/10 rounded-xl p-4 hover:border-green-400/30 transition-colors">
                <p className="text-green-400 font-bold text-sm mb-1">Gen Ed Mastery Only</p>
                <p className="text-white font-extrabold">₱249</p>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
