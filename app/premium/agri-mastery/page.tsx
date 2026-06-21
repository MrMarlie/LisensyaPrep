import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';
import AgriPromoBar from '@/components/AgriPromoBar';

export const metadata: Metadata = {
  title: 'Agriculture (ALE) Mastery System 2026 — Premium Reviewer | LisensyaPrep',
  description:
    '300+ Agriculturist Licensure Exam questions with full rationales across all 6 ALE subjects. Built for the 2026 PRC Board of Agriculture coverage. ₱149 launch special. Pay via GCash.',
  openGraph: {
    title: 'Agriculture (ALE) Mastery System 2026 — Premium Reviewer | LisensyaPrep',
    description: '300+ questions with full rationales across all 6 ALE subjects. ₱149 launch special. Pay via GCash.',
    url: 'https://lisensyaprep.com/premium/agri-mastery',
  },
};

const PRODUCT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Agriculture (ALE) Mastery System 2026',
  description: 'Premium Agriculturist Licensure Examination reviewer with 300+ questions and full rationales across all 6 ALE subjects, built for the 2026 PRC Board of Agriculture coverage.',
  brand: { '@type': 'Brand', name: 'LisensyaPrep' },
  offers: {
    '@type': 'Offer',
    price: '149',
    priceCurrency: 'PHP',
    availability: 'https://schema.org/InStock',
    url: 'https://lisensyaprep.com/premium/agri-mastery/checkout',
  },
};

const FEATURES = [
  { icon: '📝', title: '300+ Questions with Full Rationales', desc: 'Every answer explains WHY it\'s right AND why the other choices are wrong — the way the ALE actually tests.' },
  { icon: '🌾', title: 'All 6 ALE Subjects Covered', desc: 'Crop Science, Soil Science, Agricultural Economics, Crop Protection, Animal Science, and Agricultural Extension.' },
  { icon: '📊', title: 'Full 100-Item Mock Exam', desc: 'Proportionally weighted across all 6 subjects. Take it under timed conditions before exam day.' },
  { icon: '📅', title: 'Built-in 8-Week Study Schedule', desc: 'Day-by-day plan covering all 6 subjects. Know exactly what to study each week up to exam day.' },
  { icon: '🌱', title: 'Soil & Fertilizer Quick Reference', desc: 'Nutrient cycles, fertilizer grades, soil orders, and pH management — the most-tested soil facts in one place.' },
  { icon: '📌', title: 'Laws & Agri-Programs Cheat Sheet', desc: 'RA 8435 (AFMA), RA 10068 (Organic Ag), RA 10601, and the key DA programs — all in one final-week sheet.' },
  { icon: '🧠', title: 'Memory Hooks for Formulas & Terms', desc: 'How to actually remember fertilizer computations, pest classifications, and animal nutrition values.' },
  { icon: '📱', title: 'Mobile-Friendly Format', desc: 'Read on your phone during commute or field work. Designed for small screens first.' },
];

const COVERAGE = [
  {
    emoji: '🌾',
    subject: 'Crop Science and Production',
    count: '~60 questions',
    topics: ['Plant physiology and growth stages', 'Crop management and cropping systems', 'Variety selection and seed technology', 'Harvest and postharvest practices', 'Horticulture and plant propagation'],
  },
  {
    emoji: '🌱',
    subject: 'Soil Science and Fertilization',
    count: '~50 questions',
    topics: ['Soil properties, texture, and orders', 'Nutrient cycles and deficiencies', 'Fertilizer types, grades, and computations', 'Soil pH, acidity, and liming', 'Soil and water conservation'],
  },
  {
    emoji: '📊',
    subject: 'Agricultural Economics and Marketing',
    count: '~50 questions',
    topics: ['Farm economics and production', 'Agribusiness and farm management', 'Agricultural marketing and credit', 'Cooperatives and value chains', 'Agrarian reform and policy (RA 6657)'],
  },
  {
    emoji: '🛡️',
    subject: 'Crop Protection',
    count: '~50 questions',
    topics: ['Entomology and insect pests', 'Plant pathology and diseases', 'Weed science and management', 'Integrated Pest Management (IPM)', 'Pesticide classification and safe use'],
  },
  {
    emoji: '🐄',
    subject: 'Animal Science',
    count: '~50 questions',
    topics: ['Livestock and poultry production', 'Animal nutrition and feeds', 'Animal health and disease control', 'Breeding and reproduction', 'Dairy and meat processing basics'],
  },
  {
    emoji: '📡',
    subject: 'Agricultural Extension and Communication',
    count: '~40 questions',
    topics: ['Extension methods and approaches', 'Diffusion of innovations theory', 'Adult learning and teaching aids', 'Rural development and community organizing', 'Program planning and evaluation'],
  },
];

const COMPARISON = [
  { feature: 'Price', free: 'Free', book: '₱350–₱1,500', ours: '₱149 launch / ₱249 regular' },
  { feature: 'Covers all 6 ALE subjects', free: 'Partial', book: 'Partial', ours: 'Yes' },
  { feature: 'Rationales for every answer', free: 'No', book: 'Partial', ours: 'Yes' },
  { feature: 'Mobile-optimized', free: 'No', book: 'No', ours: 'Yes' },
  { feature: '8-week study schedule', free: 'No', book: 'No', ours: 'Yes' },
  { feature: 'Mock exam included', free: 'No', book: 'No', ours: 'Yes' },
  { feature: 'Instant delivery', free: 'No', book: '3–7 days', ours: 'Same-day' },
  { feature: 'Memory hooks', free: 'No', book: 'No', ours: 'Yes' },
];

const FAQS = [
  { q: 'What format is the reviewer in?', a: 'PDF, optimized for mobile viewing. Works on any device — phone, tablet, laptop, or desktop.' },
  { q: 'Does this cover all the ALE subjects?', a: 'Yes. All 6 core subjects tested in the Agriculturist Licensure Examination: Crop Science and Production, Soil Science and Fertilization, Agricultural Economics and Marketing, Crop Protection, Animal Science, and Agricultural Extension and Communication.' },
  { q: 'Can I print it?', a: 'Yes, you can print it for personal use. Sharing or reselling the file is strictly prohibited.' },
  { q: 'Is this enough to pass the ALE alone?', a: 'This reviewer covers the high-yield topics across all 6 subjects. We recommend pairing it with our free articles and practice questions for additional context.' },
  { q: 'What\'s your refund policy?', a: 'As this is a digital product, all sales are final. No refunds will be issued once the file has been delivered.' },
  { q: 'When do I get the reviewer?', a: 'Within 12 hours of payment confirmation (usually same hour during 8 AM–10 PM).' },
  { q: 'I already downloaded the free Starter Pack — is the Mastery System different?', a: 'Yes, completely different. The free Starter Pack has 30 sample questions. The Mastery System has 300+ questions across all 6 subjects, plus a 100-item mock exam, 8-week study schedule, cheat sheets, and more.' },
];

export default function AgriMasteryPage() {
  return (
    <>
      <Script id="schema-agri-mastery" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_SCHEMA) }} />
      <div className="min-h-screen">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-b from-[#0a0f1e] to-[#080d1b] pt-14 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-green-400/10 text-green-400 uppercase tracking-widest mb-5">
              Premium Reviewer — Launch Special
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              Stop Studying Random ALE Questions From Outdated PDFs.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Free agriculture reviewers floating online skip animal science and extension, have missing rationales, and wrong answers nobody fact-checked. We built something different — 300+ questions across all 6 ALE subjects, every single one with a full rationale.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/premium/agri-mastery/checkout"
                className="bg-green-500 hover:bg-green-400 text-white font-extrabold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
              >
                GET YOUR COPY — ₱149
              </Link>
              <a href="#whats-inside" className="border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
                See What&apos;s Inside ↓
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-4">🌾 Launch price — ₱249 after first 100 buyers</p>
          </div>
        </section>

        <AgriPromoBar variant="full" />

        {/* ── Product headline ── */}
        <section className="py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              The LisensyaPrep Agriculture Mastery System
            </h2>
            <p className="text-green-400 font-bold text-xl mb-10">
              300+ questions. All 6 ALE subjects. Every one with a full rationale.
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
                    <th className="px-4 py-3 text-center text-green-400 text-sm font-bold">LisensyaPrep</th>
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
                      <td className="px-4 py-3 text-center text-sm font-bold text-green-400">{row.ours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 px-4 bg-green-500">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white font-extrabold text-3xl sm:text-4xl mb-2">
              🌾 LAUNCH SPECIAL
            </p>
            <p className="text-white font-bold text-xl mb-6">
              First 100 Buyers Pay Only ₱149
            </p>
            <p className="text-white/90 mb-8">
              After the first 100 buyers, the price returns to <strong>₱249</strong>. Pay via GCash — no credit card needed.
            </p>
            <Link
              href="/premium/agri-mastery/checkout"
              className="inline-block bg-[#080d1b] hover:bg-[#0f1629] text-green-400 font-extrabold px-10 py-5 rounded-xl text-xl transition-colors shadow-xl"
            >
              GET YOUR COPY NOW →
            </Link>
            <p className="text-white/80 text-sm mt-4">PDF delivered to your email</p>
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
                    'BS Agriculture graduate preparing for your first ALE',
                    'Retaker who wants a structured, subject-by-subject comeback',
                    'Self-reviewer who needs one trusted source, not 50 random PDFs',
                    'Someone who wants full rationales — not just answer keys',
                    'Reviewee who keeps neglecting animal science and extension',
                  ].map((item) => (
                    <li key={item} className="flex gap-2 text-gray-300 text-sm">
                      <span className="text-green-400 flex-shrink-0">•</span>
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
                    'You\'re not seriously preparing for the ALE',
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
              Subject Coverage
            </h2>
            <p className="text-gray-400 text-center mb-8">300+ questions distributed across all 6 ALE subjects</p>
            <div className="space-y-4">
              {COVERAGE.map(({ emoji, subject, count, topics }) => (
                <div key={subject} className="bg-[#0f1629] border border-white/10 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span>{emoji}</span>
                    <span className="text-white font-semibold text-sm">{subject}</span>
                    <span className="text-green-400 text-xs ml-auto font-bold">{count}</span>
                  </div>
                  <ul className="space-y-1">
                    {topics.map((t) => (
                      <li key={t} className="text-gray-500 text-xs flex items-start gap-1.5">
                        <span className="text-green-400/50 mt-0.5">•</span>
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
                  <div className="w-8 h-8 bg-green-500 text-white font-extrabold rounded-full flex items-center justify-center mx-auto mb-3 text-sm">
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
              href="/premium/agri-mastery/checkout"
              className="inline-block bg-green-500 hover:bg-green-400 text-white font-extrabold px-10 py-5 rounded-xl text-xl transition-colors"
            >
              GET YOUR COPY — ₱149
            </Link>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>📱 Pay via GCash</span>
              <span>📩 PDF delivered to email</span>
              <span>✅ All 6 ALE subjects</span>
            </div>
          </div>
        </section>

        {/* ── Free starter pack link ── */}
        <section className="py-8 px-4 border-t border-white/10">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-gray-500 text-sm mb-3">Not ready to buy yet?</p>
            <Link
              href="/freebies/agriculture-starter-pack"
              className="text-green-400 hover:text-green-300 underline underline-offset-2 text-sm transition-colors"
            >
              🎁 Download the free Agriculture (ALE) Starter Pack (30 questions, no cost)
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
