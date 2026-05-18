import { buildMetadata } from '@/lib/seo';
import CSEProFreebieCTA from '@/components/CSEProFreebieCTA';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'Free CSE Professional Starter Pack 2026 — 30 Questions Across All 4 Sections | LisensyaPrep',
  description:
    'Download our free CSE Professional reviewer. 30 questions covering Verbal, Numerical, Analytical Ability, and General Information. Built for the 2026 CSC TOS.',
  path: '/freebies/cse-pro-starter-pack',
});

const WHATS_INSIDE = [
  '30 CSE Professional Questions across all 4 tested sections',
  'Verbal, Numerical, Analytical Ability, and General Information',
  'Detailed rationales for every question (not just answer keys)',
  'Built for the 2026 Civil Service Commission Table of Specifications',
  'Mobile-optimized — study on your phone',
];

const SECTION_BREAKDOWN = [
  { emoji: '📘', section: 'Verbal Ability', topics: 'Grammar, vocabulary, paragraph organization, reading comprehension' },
  { emoji: '📙', section: 'Numerical Ability', topics: 'Basic operations, word problems, percentage, ratio, no calculator allowed' },
  { emoji: '📊', section: 'Analytical Ability', topics: 'Word association, logic and syllogisms, data interpretation' },
  { emoji: '📔', section: 'General Information', topics: '1987 Constitution, RA 6713, peace and human rights, environmental management' },
];

const WHY_DIFFERENT = [
  'Every question has a full rationale — most free PDFs only have answer keys',
  'Analytical Ability section explained — the section that trips up most takers',
  'RA 6713 questions with full context — the most-tested law in CSE',
  'Built for the 2026 TOS — not recycled questions from years ago',
];

const FAQ = [
  {
    q: 'Is this really free?',
    a: 'Yes, 100% free. No credit card, no payment, no catch. Just your email so we can send the PDF.',
  },
  {
    q: 'Will you spam me?',
    a: 'No — we send max 1 email per week, mostly CSE tips and study resources. Unsubscribe anytime with one click.',
  },
  {
    q: 'Can I share this PDF?',
    a: 'YES — please do! Help your fellow CSE takers. The more who pass, the better.',
  },
  {
    q: 'What is the CSE Professional pass rate?',
    a: 'Only about 10-12% of takers pass the CSE Professional. Proper preparation makes the difference.',
  },
  {
    q: 'What\'s the difference between Professional and SubProfessional?',
    a: 'CSE Professional is for 2nd-level (college grad) positions. SubProfessional is for 1st-level (clerical) positions. Pro has an Analytical Ability section; SubProf has a Clerical Ability section instead.',
  },
];

const RELATED = [
  { href: '/civil-service/how-to-pass-civil-service-exam', label: 'How to Pass the Civil Service Exam in 2026' },
  { href: '/civil-service/professional-vs-subprofessional-cse', label: 'CSE Professional vs SubProfessional — Which Should You Take?' },
  { href: '/civil-service/ra-6713-reviewer-cse', label: 'RA 6713 Reviewer for CSE — All 8 Norms Explained' },
  { href: '/civil-service/analytical-ability-reviewer-cse', label: 'Analytical Ability Reviewer for CSE Professional' },
  { href: '/civil-service/verbal-ability-reviewer-cse', label: 'Verbal Ability Reviewer for CSE 2026' },
];

export default function CSEProStarterPackPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Hero */}
        <div className="text-center mb-8">
          <span className="inline-block bg-yellow-400/10 text-yellow-400 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            🎁 Free Download
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            CSE Professional Starter Pack 2026
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            30 Questions Across All 4 Sections
          </p>
          <p className="text-gray-500 text-sm">
            Built for the 2026 CSC TOS. 100% free — just enter your email below.
          </p>
        </div>

        {/* Top form */}
        <CSEProFreebieCTA redirectOnSuccess />

        {/* Section breakdown */}
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
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Section Breakdown</p>
            <div className="space-y-2">
              {SECTION_BREAKDOWN.map(({ emoji, section, topics }) => (
                <div key={section} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0">{emoji}</span>
                  <div>
                    <span className="text-white font-semibold">{section}</span>
                    <span className="text-gray-500"> — {topics}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pass rate reality */}
        <section className="mt-6 bg-[#0f1629] border border-yellow-400/20 rounded-2xl p-6">
          <h2 className="text-yellow-400 font-extrabold text-lg mb-3">The Reality of the CSE Professional</h2>
          <div className="space-y-2 text-sm text-gray-300">
            <p>📊 <strong className="text-white">Pass rate:</strong> Only <strong className="text-yellow-400">10–12%</strong> of takers pass the CSE Professional</p>
            <p>👥 <strong className="text-white">Takers:</strong> Over <strong className="text-yellow-400">307,000+</strong> examinees per year</p>
            <p>📋 <strong className="text-white">Items:</strong> <strong className="text-yellow-400">170 questions</strong> in 3 hours and 10 minutes</p>
            <p className="text-gray-500 text-xs mt-3">Most takers fail because they don&apos;t prepare strategically. This Starter Pack shows you what real preparation looks like.</p>
          </div>
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

        {/* Why giving away */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-3">Why We&apos;re Giving This Away Free</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            We believe quality Civil Service Exam prep should be accessible to every Filipino who wants to serve.
            The full CSE Professional Mastery System (550+ questions) is coming soon — and waitlist members get
            an early-bird discount. This Starter Pack is our way of saying salamat in advance.
          </p>
        </section>

        {/* Coming soon teaser */}
        <section className="mt-6 bg-gradient-to-br from-yellow-900/20 to-amber-900/10 border border-yellow-400/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-yellow-400/20 text-yellow-400 text-xs font-extrabold px-2 py-1 rounded-full uppercase tracking-wide">🚀 Coming Soon</span>
          </div>
          <h2 className="text-yellow-400 font-extrabold text-lg mb-3">
            CSE Professional Mastery System — In Development
          </h2>
          <ul className="space-y-2 text-gray-300 text-sm mb-4">
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> 550+ questions across all 4 sections</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Full 170-item Mock Exam with rationales</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> RA 6713 Full Breakdown (all 8 norms)</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> 8-Week Study Schedule</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Constitution Quick Reference Cheat Sheet</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Launch price: ₱249 (waitlist members save ₱49)</li>
          </ul>
          <Link
            href="/premium/cse-pro-mastery"
            className="inline-block text-yellow-400 hover:text-yellow-300 font-bold text-sm underline underline-offset-2 transition-colors"
          >
            Join the waitlist → See what&apos;s coming
          </Link>
        </section>

        {/* SubProf cross-link */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Taking SubProfessional instead?</p>
          <p className="text-white font-bold mb-2">📋 CSE SubProfessional Starter Pack</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            Targeting first-level positions? Our CSE SubProf Starter Pack covers Verbal, Numerical, <strong className="text-white">Clerical Ability</strong> (SubProf-exclusive), and General Information.
          </p>
          <Link href="/freebies/cse-subprof-starter-pack" className="text-yellow-400 hover:text-yellow-300 underline text-sm font-semibold">
            Get the SubProf Starter Pack — Free →
          </Link>
        </section>

        {/* Second form */}
        <div className="mt-6">
          <p className="text-center text-gray-400 text-sm mb-2">Ready? Enter your email and get the PDF instantly.</p>
          <CSEProFreebieCTA redirectOnSuccess />
        </div>

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
            for daily CSE tips and updates.
          </p>
        </section>

      </div>
    </div>
  );
}
