import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PNLE Mastery System 2026 — Premium Reviewer | LisensyaPrep',
  description:
    '300+ PNLE questions with full rationales across all 6 NLE subjects. Built for the 2026 PNLE syllabus. ₱199 launch price. Pay via GCash.',
  openGraph: {
    title: 'PNLE Mastery System 2026 — Premium Reviewer | LisensyaPrep',
    description: '300+ PNLE questions with full rationales across all 6 NLE subjects. ₱199 launch price.',
    url: 'https://lisensyaprep.com/premium/pnle-mastery',
  },
};

const PRODUCT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'PNLE Mastery System 2026',
  description: 'Premium PNLE reviewer with 300+ questions and full rationales across all 6 NLE subjects, built for the 2026 PNLE syllabus.',
  brand: { '@type': 'Brand', name: 'LisensyaPrep' },
  offers: {
    '@type': 'Offer',
    price: '199',
    priceCurrency: 'PHP',
    availability: 'https://schema.org/InStock',
    url: 'https://lisensyaprep.com/premium/pnle-mastery/checkout',
  },
};

const FEATURES = [
  { icon: '📝', title: '300+ Questions with Full Rationales', desc: 'Every answer explains WHY it\'s correct AND why the distractors are wrong — the way PNLE actually tests.' },
  { icon: '🩺', title: 'All 6 NLE Subjects Covered', desc: 'Community Health, Med-Surg, Maternal & Child, Psychiatric, Fundamentals, and Jurisprudence.' },
  { icon: '📊', title: 'Full 100-Item Mock Exam', desc: 'Proportionally weighted like the real PNLE (Part 1 Community Health + Part 2 Clinical).' },
  { icon: '📅', title: '12-Week PNLE Study Schedule', desc: 'Week-by-week plan built around the 6 NLE subjects. Know exactly what to prioritize.' },
  { icon: '💊', title: 'High-Yield Drug Cheat Sheet', desc: 'The most tested pharmacology drugs — doses, nursing considerations, and antidotes.' },
  { icon: '📌', title: 'Community Health Quick Reference', desc: 'DOH programs, EPI vaccines, vital stats formulas — the CHN facts most frequently tested.' },
  { icon: '👶', title: 'Nursing Jurisprudence Section', desc: 'RA 9173, BON resolutions, and code of ethics — often overlooked but always on the exam.' },
  { icon: '📱', title: 'Mobile-Friendly Format', desc: 'Read on your phone between hospital duties. Designed for small screens first.' },
];

const COVERAGE = [
  {
    emoji: '🏘️',
    subject: 'Community Health Nursing',
    count: '~60 questions',
    topics: ['DOH programs and services', 'EPI vaccines and schedule', 'Epidemiology and vital statistics', 'Family planning methods', 'Nursing bag technique'],
  },
  {
    emoji: '🩺',
    subject: 'Medical-Surgical Nursing',
    count: '~80 questions',
    topics: ['Cardiovascular and respiratory disorders', 'Neurological and musculoskeletal', 'GI, hepatic, and renal nursing', 'Pharmacology and drug calculations', 'Pre/Post-op nursing care'],
  },
  {
    emoji: '🤱',
    subject: 'Maternal & Child Nursing',
    count: '~60 questions',
    topics: ['Stages of labor and delivery', 'APGAR scoring and newborn care', 'High-risk pregnancies', 'Postpartum complications', 'Pediatric milestones and illnesses'],
  },
  {
    emoji: '🧠',
    subject: 'Psychiatric Nursing',
    count: '~50 questions',
    topics: ['Therapeutic communication techniques', 'Psychiatric disorders (DSM-based)', 'Psychopharmacology', 'Crisis intervention', 'Milieu therapy'],
  },
  {
    emoji: '📋',
    subject: 'Fundamentals of Nursing',
    count: '~30 questions',
    topics: ['Basic nursing skills and procedures', 'Vital signs and physical assessment', 'Infection control and asepsis', 'Documentation and legal-ethical issues'],
  },
  {
    emoji: '👶',
    subject: 'Nursing Jurisprudence & Ethics',
    count: '~20 questions',
    topics: ['RA 9173 (Philippine Nursing Act)', 'BON resolutions and code of ethics', 'Legal aspects of nursing practice'],
  },
];

const FAQS = [
  { q: 'What format is the reviewer in?', a: 'PDF, optimized for mobile viewing. Works on any device — phone, tablet, laptop, or desktop.' },
  { q: 'Is this for all nursing board exam takers?', a: 'Yes. This covers all 6 NLE subjects tested in the Philippine Nurse Licensure Examination (PNLE).' },
  { q: 'Can I print it?', a: 'Yes, you can print it for personal use. Sharing or reselling the file is strictly prohibited.' },
  { q: 'Is this enough to pass the PNLE alone?', a: 'This reviewer covers the high-yield topics across all 6 NLE subjects. We recommend pairing it with our free articles and practice questions for additional context.' },
  { q: 'What\'s your refund policy?', a: 'As this is a digital product, all sales are final. No refunds will be issued once the file has been delivered.' },
  { q: 'When do I get the reviewer?', a: 'Within 12 hours of payment confirmation (usually same hour during 8 AM–10 PM).' },
  { q: 'I already downloaded the free Starter Pack — is the Mastery System different?', a: 'Yes, completely different. The free Starter Pack has 30 sample questions. The Mastery System has 300+ questions across all 6 subjects, plus a 100-item mock exam, 12-week study schedule, pharmacology cheat sheet, and more.' },
];

export default function PNLEMasteryPage() {
  return (
    <>
      <Script id="schema-pnle-mastery" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_SCHEMA) }} />
      <div className="min-h-screen">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-b from-[#0a0f1e] to-[#080d1b] pt-14 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-pink-400/10 text-pink-400 uppercase tracking-widest mb-5">
              Now Available — Launch Price
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              Stop Guessing Your Way Through the PNLE.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Random PDFs from Facebook groups have outdated questions, missing rationales, and answers nobody verified. We built something different — 300+ questions across all 6 NLE subjects, every single one with a full rationale.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/premium/pnle-mastery/checkout"
                className="bg-pink-500 hover:bg-pink-400 text-white font-extrabold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
              >
                GET YOUR COPY — ₱199
              </Link>
              <a href="#whats-inside" className="border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
                See What&apos;s Inside ↓
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-4">Pay via GCash · PDF delivered to your email</p>
          </div>
        </section>

        {/* ── Product headline ── */}
        <section className="py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              The LisensyaPrep PNLE Mastery System
            </h2>
            <p className="text-pink-400 font-bold text-xl mb-10">
              300+ questions. All 6 NLE subjects. Every one with a full rationale.
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

        {/* ── CTA ── */}
        <section className="py-16 px-4 bg-pink-500">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white font-extrabold text-3xl sm:text-4xl mb-2">
              🏥 LAUNCH PRICE
            </p>
            <p className="text-white/90 font-bold text-xl mb-6">
              PNLE Mastery System 2026 — ₱199
            </p>
            <p className="text-white/80 mb-8">
              300+ questions · All 6 NLE subjects · Pay via GCash
            </p>
            <Link
              href="/premium/pnle-mastery/checkout"
              className="inline-block bg-white hover:bg-gray-100 text-pink-600 font-extrabold px-10 py-5 rounded-xl text-xl transition-colors shadow-xl"
            >
              GET YOUR COPY NOW →
            </Link>
            <p className="text-white/60 text-sm mt-4">PDF delivered to your email</p>
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
                    'BSN graduate preparing for your first PNLE',
                    'Retaker who wants a structured, subject-by-subject approach',
                    'Self-reviewer who needs one trusted source, not 50 random PDFs',
                    'Someone who wants full rationales — not just answer keys',
                    'Busy nurse who needs to study efficiently on a phone',
                  ].map((item) => (
                    <li key={item} className="flex gap-2 text-gray-300 text-sm">
                      <span className="text-pink-400 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6">
                <p className="text-white font-extrabold text-lg mb-4">❌ This is NOT for you if…</p>
                <ul className="space-y-2">
                  {[
                    'You only want a question dump with no explanations',
                    'You already passed and want a casual refresher only',
                    'You\'re not seriously preparing for the PNLE',
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
            <p className="text-gray-400 text-center mb-8">300+ questions distributed across all 6 NLE subjects</p>
            <div className="space-y-4">
              {COVERAGE.map(({ emoji, subject, count, topics }) => (
                <div key={subject} className="bg-[#0f1629] border border-white/10 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span>{emoji}</span>
                    <span className="text-white font-semibold text-sm">{subject}</span>
                    <span className="text-pink-400 text-xs ml-auto font-bold">{count}</span>
                  </div>
                  <ul className="space-y-1">
                    {topics.map((t) => (
                      <li key={t} className="text-gray-500 text-xs flex items-start gap-1.5">
                        <span className="text-pink-400/50 mt-0.5">•</span>
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
                  <div className="w-8 h-8 bg-pink-500 text-white font-extrabold rounded-full flex items-center justify-center mx-auto mb-3 text-sm">
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
            <p className="text-gray-400 text-sm mb-2">Ready to study smarter?</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
              Get your copy today and pass the PNLE with confidence.
            </h2>
            <Link
              href="/premium/pnle-mastery/checkout"
              className="inline-block bg-pink-500 hover:bg-pink-400 text-white font-extrabold px-10 py-5 rounded-xl text-xl transition-colors"
            >
              GET YOUR COPY — ₱199
            </Link>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>📱 Pay via GCash</span>
              <span>📩 PDF delivered to email</span>
              <span>✅ All 6 NLE subjects</span>
            </div>
          </div>
        </section>

        {/* ── Free starter pack link ── */}
        <section className="py-8 px-4 border-t border-white/10">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-gray-500 text-sm mb-3">Not ready to buy yet?</p>
            <Link
              href="/freebies/pnle-nursing-starter-pack"
              className="text-pink-400 hover:text-pink-300 underline underline-offset-2 text-sm transition-colors"
            >
              🎁 Download the free PNLE Nursing Starter Pack (30 questions, no cost)
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
