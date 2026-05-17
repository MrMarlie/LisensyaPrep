import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';
import { PremiumPageViewTracker } from '@/components/PremiumAnalytics';

export const metadata: Metadata = {
  title: 'LET ProfEd Mastery System 2026 — Premium Reviewer | LisensyaPrep',
  description:
    '430+ questions with full rationales. Built for the 2026 Enhanced TOS. ₱149 launch special. Pay via GCash.',
  openGraph: {
    title: 'LET ProfEd Mastery System 2026 — Premium Reviewer | LisensyaPrep',
    description: '430+ questions with full rationales. Built for the 2026 Enhanced TOS. ₱149 launch special. Pay via GCash.',
    url: 'https://lisensyaprep.com/premium/let-profed-mastery',
  },
};

const PRODUCT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'LET ProfEd Mastery System 2026',
  description: '100-page premium LET Professional Education reviewer with 430+ questions and full rationales, built for the 2026 Enhanced TOS.',
  brand: { '@type': 'Brand', name: 'LisensyaPrep' },
  offers: {
    '@type': 'Offer',
    price: '149',
    priceCurrency: 'PHP',
    availability: 'https://schema.org/InStock',
    url: 'https://lisensyaprep.com/premium/let-profed-mastery/checkout',
  },
};

const FEATURES = [
  { icon: '📝', title: '430+ Questions with Full Rationales', desc: 'Every answer explains WHY it\'s right AND why the other choices are wrong.' },
  { icon: '📋', title: 'Mapped to the 2026 Enhanced TOS', desc: 'Every topic weighted exactly the way PRC tests it. No outdated content.' },
  { icon: '📅', title: 'Built-in 8-Week Study Schedule', desc: 'Day-by-day plan. Know exactly what to study each week up to exam day.' },
  { icon: '📊', title: 'Full 50-Question Mock Exam', desc: 'Proportionally weighted like the real LET ProfEd. Take it under timed conditions.' },
  { icon: '📌', title: 'Quick Reference Cheat Sheets', desc: 'RAs, theorists, key dates — all in one place for final-week review.' },
  { icon: '📱', title: 'Mobile-Friendly Format', desc: 'Read on your phone during commute. Designed for small screens first.' },
  { icon: '🧠', title: 'Memory Hooks for Every Law & Theory', desc: 'How to actually remember 11 different RAs and a dozen theorists.' },
];

const COMPARISON = [
  { feature: 'Price', free: 'Free', book: '₱275–₱1,500', ours: '₱149 launch / ₱249 regular' },
  { feature: 'Updated for 2026 TOS', free: 'No', book: 'Partial', ours: 'Yes' },
  { feature: 'Rationales for every answer', free: 'No', book: 'Partial', ours: 'Yes' },
  { feature: 'Mobile-optimized', free: 'No', book: 'No', ours: 'Yes' },
  { feature: '8-week study schedule', free: 'No', book: 'No', ours: 'Yes' },
  { feature: 'Mock exam included', free: 'No', book: 'No', ours: 'Yes' },
  { feature: 'Instant delivery', free: 'No', book: '3–7 days', ours: 'Same-day' },
  { feature: 'Memory hooks', free: 'No', book: 'No', ours: 'Yes' },
];

const FAQS = [
  { q: 'Is this for BEEd or BSEd takers?', a: 'Both. ProfEd is required for ALL LET takers regardless of whether you\'re taking Elementary (BEEd) or Secondary (BSEd) level.' },
  { q: 'What format is the reviewer in?', a: 'PDF, optimized for mobile viewing. Works on any device — phone, tablet, laptop, desktop.' },
  { q: 'Can I print it?', a: 'Yes, you can print it for personal use. Sharing or reselling the file is strictly prohibited.' },
  { q: 'Is this enough to pass LET ProfEd alone?', a: 'This reviewer covers 100% of the Enhanced TOS topics. We recommend pairing it with our free articles for additional context.' },
  { q: 'What\'s your refund policy?', a: 'As this is a digital product, all sales are final. No refunds will be issued once the file has been delivered.' },
  { q: 'When do I get the reviewer?', a: 'Within 12 hours of payment confirmation (usually same hour during 8 AM–10 PM).' },
  { q: 'Will there be a Gen Ed version?', a: 'Yes — coming after this launch. ProfEd buyers will get a launch discount on Gen Ed when it releases.' },
];

const TOC = [
  { part: 'Front Matter', items: ['Welcome & How to Use This Reviewer', '2026 LET ProfEd Coverage (Enhanced TOS Visual)', 'The 8-Week Study Schedule', 'Test-Taking Strategies for LET', 'PRC Exam Day Checklist'] },
  { part: 'Part 1: Foundations of Education (80 questions)', items: ['Teaching Profession & Code of Ethics', 'Philosophical Foundations', 'Sociological Foundations', 'Historical Foundations (Pre-colonial → K-12)', 'Legal Bases (RA 4670, RA 7836, RA 9155, RA 10533, RA 10912)'] },
  { part: 'Part 2: Child & Adolescent Development (80 questions)', items: ["Piaget's Cognitive Stages", "Erikson's Psychosocial Stages", "Kohlberg's Moral Development", "Vygotsky's Sociocultural Theory", "Bronfenbrenner's Ecological Systems", "Bandura's Social Learning Theory"] },
  { part: 'Part 3: Facilitating Learning (80 questions)', items: ['Behaviorism (Pavlov, Skinner, Thorndike)', 'Cognitivism (Bruner, Ausubel, Gagne)', 'Constructivism', "Gardner's Multiple Intelligences", "Bloom's Taxonomy (Revised)", 'Motivation Theories'] },
  { part: 'Part 4: Curriculum & Instruction (70 questions)', items: ['7 Types of Curriculum', 'K-12 Curriculum Framework', 'Teaching Approaches', 'Inclusive Education & Differentiated Instruction', 'Lesson Planning (BTL, OBE, 4As)'] },
  { part: 'Part 5: Assessment of Learning (60 questions)', items: ['Types of Assessment', 'Test Construction (Difficulty Index, Discrimination Index)', 'Authentic Assessment & Rubrics', 'Grading Systems (DepEd Order 8 s.2015)'] },
  { part: 'Part 6: PPST & Professional Practice (60 questions)', items: ['7 Domains of PPST', 'Career Stages', 'RPMS-PPST', 'Continuing Professional Development (CPD)'] },
  { part: 'Mock Exam & Back Matter', items: ['50-Item Mock Exam with Full Rationales', 'Quick Reference Cheat Sheet'] },
];

export default function PremiumLandingPage() {
  return (
    <>
      <PremiumPageViewTracker event="premium_page_view" />
      <Script id="schema-product" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_SCHEMA) }} />
      <div className="min-h-screen">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-b from-[#0a0f1e] to-[#080d1b] pt-14 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 uppercase tracking-widest mb-5">
              Premium Reviewer — Launch Special
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              Stop Studying Random LET Questions From 2018 PDFs.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Free reviewers floating online have outdated questions, missing rationales, and wrong answers nobody fact-checked. We built something different.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/premium/let-profed-mastery/checkout"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
              >
                GET YOUR COPY — ₱149
              </Link>
              <a href="#what-is-inside" className="border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
                See What&apos;s Inside ↓
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-4">🔥 Launch price — ₱249 after first 100 buyers</p>
          </div>
        </section>

        {/* ── Product headline ── */}
        <section className="py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              The LisensyaPrep LET ProfEd Mastery System
            </h2>
            <p className="text-yellow-400 font-bold text-xl mb-10">
              100 pages. 430+ questions. Every single one with a full rationale.
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
              🔥 LAUNCH SPECIAL
            </p>
            <p className="text-gray-900 font-bold text-xl mb-6">
              First 100 Buyers Pay Only ₱149
            </p>
            <p className="text-gray-800 mb-8">
              After the first 100 buyers, the price returns to <strong>₱249</strong>. Pay via GCash — no credit card needed.
            </p>
            <Link
              href="/premium/let-profed-mastery/checkout"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-yellow-400 font-extrabold px-10 py-5 rounded-xl text-xl transition-colors shadow-xl"
            >
              GET YOUR COPY NOW →
            </Link>
            <p className="text-gray-700 text-sm mt-4">PDF delivered to your email</p>
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
                    'BEEd graduate preparing for your first LET',
                    'BSEd graduate needing a strong ProfEd foundation',
                    'Retaker who failed ProfEd and wants a structured comeback',
                    'Working teacher reviewing for ranking or reactivation',
                    'Reviewer who wants one trusted source, not 50 random PDFs',
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

        {/* ── Table of Contents ── */}
        <section id="what-is-inside" className="py-14 px-4 bg-[#0a0f1e]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 text-center">
              What&apos;s Inside (100 Pages)
            </h2>
            <div className="space-y-4">
              {TOC.map(({ part, items }) => (
                <div key={part} className="bg-[#0f1629] border border-white/10 rounded-xl p-5">
                  <p className="text-yellow-400 font-bold text-sm mb-3">{part}</p>
                  <ul className="space-y-1">
                    {items.map((item) => (
                      <li key={item} className="flex gap-2 text-gray-400 text-sm">
                        <span className="text-gray-600 flex-shrink-0">—</span>
                        <span>{item}</span>
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
              href="/premium/let-profed-mastery/checkout"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-10 py-5 rounded-xl text-xl transition-colors"
            >
              GET YOUR COPY — ₱149
            </Link>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>📱 Pay via GCash</span>
              <span>📩 PDF delivered to email</span>
              <span>✅ Digital copy, instant access</span>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
