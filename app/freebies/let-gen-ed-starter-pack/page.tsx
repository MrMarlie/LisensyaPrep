import { buildMetadata } from '@/lib/seo';
import GenEdFreebieCTA from '@/components/GenEdFreebieCTA';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'Free LET Gen Ed Starter Pack 2026 — 30 Questions Across 5 Subjects',
  description:
    'Download our free LET General Education reviewer. 30 questions covering English, Filipino, Math, Science, and Social Sciences. Built for the 2026 Enhanced TOS.',
  path: '/freebies/let-gen-ed-starter-pack',
});

const WHATS_INSIDE = [
  '30 LET Gen Ed Questions across all 5 subject areas',
  '6 questions per subject: English, Filipino, Mathematics, Science, Social Sciences',
  'Detailed rationales (1–2 paragraphs each explaining WHY)',
  'Memory hooks (with Filipino expressions) for retention',
  'Built for the 2026 Enhanced TOS',
  'Mobile-optimized — study on your phone',
];

const WHY_DIFFERENT = [
  'Every question has a full rationale — most free PDFs only have answer keys',
  'Built for the 2026 Enhanced TOS — most free PDFs are 2018–2020',
  'Mobile-optimized layout',
  'Mga memory hook na Filipino para mas tumatak',
];

const SUBJECT_BREAKDOWN = [
  { emoji: '📘', subject: 'English', topics: 'Grammar, literature, reading comprehension, language acquisition' },
  { emoji: '📗', subject: 'Filipino', topics: 'Gramatika, panitikan, pagbasa, komunikasyon' },
  { emoji: '📙', subject: 'Mathematics', topics: 'Algebra, geometry, statistics, problem solving' },
  { emoji: '📕', subject: 'Science', topics: 'Biology, physics, chemistry, earth science' },
  { emoji: '📔', subject: 'Social Sciences', topics: 'Philippine history, government, Rizal, economics' },
];

const COMING_NEXT = [
  '430+ questions across ALL 5 Gen Ed subjects',
  'English: 100 questions',
  'Filipino: 80 questions',
  'Mathematics: 90 questions',
  'Science: 80 questions',
  'Social Sciences: 80 questions',
  'Full 50-item Mock Exam with rationales',
  'Quick Reference Cheat Sheets',
  '8-Week Study Schedule',
  'Launch price: ₱249 (waitlist members save ₱49)',
];

const FAQ = [
  {
    q: 'Is this really free?',
    a: 'Yes, 100% free. No credit card, no payment, no catch. Just your email so we can send the PDF.',
  },
  {
    q: 'Will you spam me?',
    a: 'No — we send max 1 email per week, mostly LET tips and study resources. Unsubscribe anytime with one click.',
  },
  {
    q: 'When does the full Gen Ed Mastery System launch?',
    a: 'Coming in 2–3 months. Waitlist members get first access and an early-bird discount (₱49 off).',
  },
  {
    q: 'Can I share this PDF?',
    a: 'YES — please do! Help your fellow LET takers. The more who pass, the better.',
  },
  {
    q: 'Do I get a discount if I already have the ProfEd Mastery System?',
    a: 'Yes! ProfEd Mastery buyers get ₱50 off the Gen Ed Mastery System at launch (₱199 instead of ₱249). The bundle deal will also be available.',
  },
];

const RELATED = [
  { href: '/education/let-secondary-major-english-reviewer', label: 'LET Secondary Major English Reviewer 2026' },
  { href: '/education/let-secondary-major-filipino-reviewer', label: 'LET Secondary Major Filipino Reviewer 2026' },
  { href: '/education/let-secondary-major-math-reviewer', label: 'LET Secondary Major Math Reviewer 2026' },
  { href: '/education/let-secondary-major-science-reviewer', label: 'LET Secondary Major Science Reviewer 2026' },
  { href: '/education/let-secondary-major-social-studies-reviewer', label: 'LET Secondary Major Social Studies Reviewer 2026' },
];

export default function GenEdStarterPackPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Hero */}
        <div className="text-center mb-8">
          <span className="inline-block bg-yellow-400/10 text-yellow-400 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            🎁 Free Download
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            LET Gen Ed Starter Pack 2026
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            30 Questions Across All 5 Subject Areas
          </p>
          <p className="text-gray-500 text-sm">
            Built for the 2026 Enhanced TOS. 100% free — just enter your email below.
          </p>
        </div>

        {/* Top form */}
        <GenEdFreebieCTA redirectOnSuccess />

        {/* Subject breakdown */}
        <section className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-4">What You&apos;ll Get</h2>
          <ul className="space-y-2.5 mb-5">
            {WHATS_INSIDE.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-gray-300 text-sm">
                <span className="text-yellow-400 font-bold flex-shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/10 pt-4">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Subject Breakdown</p>
            <div className="space-y-2">
              {SUBJECT_BREAKDOWN.map(({ emoji, subject, topics }) => (
                <div key={subject} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0">{emoji}</span>
                  <div>
                    <span className="text-white font-semibold">{subject}</span>
                    <span className="text-gray-500"> — {topics}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Score importance */}
        <section className="mt-6 bg-[#0f1629] border border-yellow-400/20 rounded-2xl p-6">
          <h2 className="text-yellow-400 font-extrabold text-lg mb-3">Gen Ed Is a Huge Part of Your LET Score</h2>
          <div className="space-y-2 text-sm text-gray-300">
            <p>📘 <strong className="text-white">BEEd takers:</strong> Gen Ed = <strong className="text-yellow-400">40%</strong> of your total LET score</p>
            <p>📗 <strong className="text-white">BSEd takers:</strong> Gen Ed = <strong className="text-yellow-400">20%</strong> of your total LET score</p>
            <p className="text-gray-500 text-xs mt-3">Either way, mastering Gen Ed means passing LET.</p>
          </div>
        </section>

        {/* Why giving away */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-3">Why We&apos;re Giving This Away Free</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            We believe quality LET prep should be accessible to every aspiring Filipino teacher. The full
            Gen Ed Mastery System (430+ questions) will launch in 2–3 months — and waitlist members get an
            early-bird discount. This Starter Pack is our way of saying salamat in advance.
          </p>
        </section>

        {/* Why different */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-4">
            What Makes This Different from Free PDFs Online
          </h2>
          <ul className="space-y-2.5">
            {WHY_DIFFERENT.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-gray-300 text-sm">
                <span className="text-green-400 font-bold flex-shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Coming next */}
        <section className="mt-6 bg-gradient-to-br from-yellow-900/20 to-amber-900/10 border border-yellow-400/20 rounded-2xl p-6">
          <h2 className="text-yellow-400 font-extrabold text-lg mb-4">
            What&apos;s Coming — The Full Gen Ed Mastery System
          </h2>
          <ul className="space-y-2.5">
            {COMING_NEXT.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-gray-300 text-sm">
                <span className="text-yellow-400 font-bold flex-shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-500 text-xs mt-4">
            Sign up above to join the waitlist and get first access + early-bird discount.
          </p>
        </section>

        {/* ProfEd cross-promo */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Already have our ProfEd Mastery?</p>
          <p className="text-white font-bold mb-2">👑 Exclusive for ProfEd Buyers</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Get <strong className="text-yellow-400">₱50 OFF</strong> the Gen Ed Mastery System launch price (₱199 instead of ₱249), or grab the bundle deal at ₱399 (save ₱99).
          </p>
          <p className="text-gray-500 text-xs mt-3">
            Don&apos;t have the ProfEd Mastery yet?{' '}
            <Link href="/premium/let-profed-mastery" className="text-yellow-400 hover:text-yellow-300 underline">
              Check it out here →
            </Link>
          </p>
        </section>

        {/* Second form */}
        <div className="mt-6">
          <p className="text-center text-gray-400 text-sm mb-2">Ready? Enter your email and get the PDF instantly.</p>
          <GenEdFreebieCTA redirectOnSuccess />
        </div>

        {/* Trust */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-gray-300 text-sm italic mb-3">
            &quot;Same depth and quality as our LET ProfEd Mastery System — just free.&quot;
          </p>
          <Link
            href="/premium/let-profed-mastery"
            className="text-yellow-400 hover:text-yellow-300 underline text-xs transition-colors"
          >
            See the LET ProfEd Mastery System →
          </Link>
        </section>

        {/* FAQ */}
        <section className="mt-6">
          <h2 className="text-white font-extrabold text-lg mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-[#0f1629] border border-white/10 rounded-xl p-5">
                <p className="text-white font-semibold text-sm mb-2">{q}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related articles */}
        <section className="mt-8 border-t border-white/10 pt-8">
          <h2 className="text-white font-bold text-base mb-4">Study While You Wait</h2>
          <ul className="space-y-2">
            {RELATED.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Facebook */}
        <section className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Join our community on{' '}
            <a
              href="https://www.facebook.com/LisensyaPrep"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Facebook
            </a>{' '}
            for daily LET tips and updates.
          </p>
        </section>

      </div>
    </div>
  );
}
