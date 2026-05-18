import { buildMetadata } from '@/lib/seo';
import CSEWaitlistCTA from '@/components/CSEWaitlistCTA';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'CSE SubProfessional Mastery System 2026 — Coming Soon | LisensyaPrep',
  description:
    '465+ CSE SubProfessional questions with full rationales. Coming soon. Join the waitlist for early-bird discount and launch bonuses.',
  path: '/premium/cse-subprof-mastery',
});

const COVERAGE = [
  {
    emoji: '📘',
    section: 'Verbal Ability',
    count: '~80 questions',
    topics: ['Grammar and Correct Usage', 'Vocabulary', 'Reading Comprehension', 'Paragraph Organization'],
  },
  {
    emoji: '📙',
    section: 'Numerical Ability',
    count: '~80 questions',
    topics: ['Basic Operations', 'Word Problems', 'Percentage, ratio, proportion', 'Time and work problems'],
  },
  {
    emoji: '📋',
    section: 'Clerical Ability',
    count: '~60 questions',
    topics: ['Filing and alphabetizing', 'Attention to detail', 'Spelling identification', 'Pattern matching — SubProf exclusive'],
  },
  {
    emoji: '📔',
    section: 'General Information',
    count: '~80 questions',
    topics: ['1987 Philippine Constitution', 'RA 6713 (Code of Conduct)', 'Peace and Human Rights Issues', 'Environmental Management and Protection'],
  },
];

const BONUSES = [
  'Full 165-item Mock Exam (matches actual exam length)',
  '8-Week Study Schedule',
  'Clerical Ability Quick Reference Guide',
  'RA 6713 Summary Cheat Sheet',
  'Test-Taking Strategies',
  'Exam Day Checklist',
  '~120 pages of curated content',
];

const PRICING = [
  { label: 'Standard Launch Price', price: '₱199', note: 'New buyers — when available' },
  { label: 'Waitlist Early-Bird', price: '₱150', note: 'Available only to waitlist members for first 7 days after launch', highlight: true },
];

const FAQ = [
  {
    q: 'When exactly will it launch?',
    a: 'Estimated Q3–Q4 2026. We\'re building it carefully to ensure quality across all sections.',
  },
  {
    q: 'Who is the SubProfessional exam for?',
    a: 'Anyone targeting first-level (clerical, administrative) government positions. You don\'t need a college degree to take the SubProfessional exam.',
  },
  {
    q: 'Can I get a free sample now?',
    a: 'YES! Download our free CSE SubProf Starter Pack (30 questions) right now while you wait for the full system.',
  },
  {
    q: 'Can I pre-order or pay in advance?',
    a: 'No, we don\'t accept pre-orders. Join the waitlist and you\'ll be notified the moment it launches with your early-bird discount.',
  },
  {
    q: 'I want to take Professional, not SubProfessional.',
    a: 'We\'re building a separate CSE Professional Mastery System too! Check the link below.',
  },
  {
    q: 'How will I receive it?',
    a: 'Same secure Google Drive delivery as our other products — within 12 hours of payment confirmation via GCash (when it launches).',
  },
];

export default function CSESubProfMasteryComingSoonPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* COMING SOON badge — prominent at top */}
        <div className="text-center mb-8">
          <div className="inline-flex flex-col items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl px-6 py-4 mb-6">
            <span className="text-yellow-400 font-extrabold text-xl tracking-wide">🚀 COMING SOON</span>
            <span className="text-gray-300 text-sm font-semibold">In Development — Launching Q3–Q4 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            CSE SubProfessional Mastery System 2026
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            465+ Questions with Full Rationales
          </p>
          <p className="text-gray-500 text-sm">
            Not available yet. Join the waitlist to be first in line at launch.
          </p>
        </div>

        {/* Top waitlist form */}
        <div id="waitlist-form">
          <CSEWaitlistCTA variant="cse-subprof-mastery" />
        </div>

        {/* Who it's for */}
        <section className="mt-8 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-3">Who Is This For?</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Non-college graduates applying for government jobs</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Anyone targeting first-level (clerical, administrative) positions</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Job order / contract of service workers wanting permanent positions</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> LGU employees who need CSC eligibility</li>
          </ul>
        </section>

        {/* Coverage breakdown */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-5">What It Will Cover (Per 2026 CSC TOS)</h2>
          <div className="space-y-5">
            {COVERAGE.map(({ emoji, section, count, topics }) => (
              <div key={section}>
                <div className="flex items-center gap-2 mb-2">
                  <span>{emoji}</span>
                  <span className="text-white font-bold text-sm">{section}</span>
                  <span className="text-gray-500 text-xs ml-auto">{count}</span>
                </div>
                <ul className="pl-6 space-y-1">
                  {topics.map((t) => (
                    <li key={t} className="text-gray-400 text-sm flex items-start gap-2">
                      <span className="text-gray-600 flex-shrink-0">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Clerical callout */}
        <section className="mt-6 bg-[#0f1629] border border-yellow-400/20 rounded-2xl p-6">
          <h2 className="text-yellow-400 font-extrabold text-lg mb-3">The Section Most Reviewers Ignore</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            <strong className="text-white">Clerical Ability</strong> is unique to the SubProfessional exam. Most free reviewers barely cover it.
            Our Mastery System will give it the full treatment — with complete coverage of filing, alphabetizing,
            spelling, and pattern matching, all with rationales.
          </p>
        </section>

        {/* Bonuses */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-4">Plus These Bonuses</h2>
          <ul className="space-y-2.5">
            {BONUSES.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-gray-300 text-sm">
                <span className="text-yellow-400 font-bold flex-shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Pricing — not buyable yet */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-1">Pricing at Launch</h2>
          <p className="text-gray-500 text-xs mb-4">Not available for purchase now — join the waitlist below</p>
          <div className="space-y-3">
            {PRICING.map(({ label, price, note, highlight }) => (
              <div
                key={label}
                className={`rounded-xl p-4 ${highlight ? 'bg-yellow-400/10 border border-yellow-400/30' : 'bg-white/5 border border-white/10'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-bold ${highlight ? 'text-yellow-400' : 'text-white'}`}>{label}</span>
                  <span className={`text-lg font-extrabold ${highlight ? 'text-yellow-400' : 'text-white'}`}>{price}</span>
                </div>
                <p className="text-gray-500 text-xs">{note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Waitlist perks */}
        <section className="mt-6 bg-gradient-to-br from-yellow-900/20 to-amber-900/10 border border-yellow-400/20 rounded-2xl p-6">
          <h2 className="text-yellow-400 font-extrabold text-lg mb-4">Waitlist Perks</h2>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2.5 text-gray-300 text-sm"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> First to know when it launches</li>
            <li className="flex items-start gap-2.5 text-gray-300 text-sm"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Early-bird discount (₱49 OFF for first 7 days)</li>
            <li className="flex items-start gap-2.5 text-gray-300 text-sm"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Direct email notification — no missing the launch</li>
          </ul>
        </section>

        {/* While you wait */}
        <section className="mt-6 bg-[#0f1629] border border-green-400/20 rounded-2xl p-6">
          <p className="text-green-400 font-semibold text-sm mb-2">🎁 While You Wait</p>
          <h2 className="text-white font-extrabold text-lg mb-2">Get the Free CSE SubProf Starter Pack Now</h2>
          <p className="text-gray-400 text-sm mb-4">
            Download our free 30-question CSE SubProfessional Starter Pack to preview the quality
            while you wait for the full Mastery System.
          </p>
          <Link
            href="/freebies/cse-subprof-starter-pack"
            className="inline-block bg-green-400 hover:bg-green-300 text-gray-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Download Free Starter Pack →
          </Link>
        </section>

        {/* Bottom waitlist form */}
        <div className="mt-8">
          <p className="text-center text-gray-400 text-sm mb-2">Join the waitlist — get early-bird discount at launch.</p>
          <CSEWaitlistCTA variant="cse-subprof-mastery" />
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

        {/* Pro cross-link */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-5 text-center">
          <p className="text-gray-400 text-sm mb-2">Taking Professional instead?</p>
          <Link
            href="/premium/cse-pro-mastery"
            className="text-yellow-400 hover:text-yellow-300 underline text-sm font-semibold"
          >
            See the CSE Professional Mastery System (Coming Soon) →
          </Link>
        </section>

      </div>

      {/* Sticky bottom bar — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0f1629] border-t border-yellow-400/30 px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-bold truncate">🚀 CSE SubProf Mastery — Coming Soon</p>
          <p className="text-gray-400 text-xs">Join the waitlist for early-bird discount</p>
        </div>
        <a
          href="#waitlist-form"
          className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors flex-shrink-0"
        >
          Join Waitlist
        </a>
      </div>
    </div>
  );
}
