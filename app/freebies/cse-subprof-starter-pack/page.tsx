import { buildMetadata } from '@/lib/seo';
import CSESubProfFreebieCTA from '@/components/CSESubProfFreebieCTA';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'Free CSE SubProfessional Starter Pack 2026 — 30 Questions for First-Level Positions | LisensyaPrep',
  description:
    'Download our free CSE SubProfessional reviewer. 30 questions covering Verbal, Numerical, Clerical Ability, and General Information. Built for the 2026 CSC TOS.',
  path: '/freebies/cse-subprof-starter-pack',
});

const WHATS_INSIDE = [
  '30 CSE SubProfessional Questions across all 4 tested sections',
  'Verbal, Numerical, Clerical Ability (SubProf-exclusive), and General Information',
  'Detailed rationales for every question (not just answer keys)',
  'Built for the 2026 Civil Service Commission Table of Specifications',
  'Mobile-optimized — study on your phone',
];

const SECTION_BREAKDOWN = [
  { emoji: '📘', section: 'Verbal Ability', topics: 'Grammar, vocabulary, reading comprehension, language use' },
  { emoji: '📙', section: 'Numerical Ability', topics: 'Basic operations, word problems, percentage, ratio' },
  { emoji: '📋', section: 'Clerical Ability', topics: 'Filing and alphabetizing, attention to detail, spelling, pattern matching — SubProf exclusive' },
  { emoji: '📔', section: 'General Information', topics: '1987 Constitution, RA 6713, peace and human rights, environmental management' },
];

const WHY_DIFFERENT = [
  'Clerical Ability section fully covered — most free reviewers ignore it entirely',
  'Every question has a full rationale — not just answer keys',
  'RA 6713 questions with full context — consistently tested in both levels',
  'Built for the 2026 TOS — current and accurate',
];

const FAQ = [
  {
    q: 'Is this really free?',
    a: 'Yes, 100% free. No credit card, no payment, no catch. Just your email so we can send the PDF.',
  },
  {
    q: 'Who should take the SubProfessional exam?',
    a: 'If you don\'t have a college degree, or if you\'re applying for first-level (clerical) government positions, CSE SubProfessional is the right exam for you.',
  },
  {
    q: 'What\'s the difference between Pro and SubProf?',
    a: 'CSE Professional is for college graduates targeting 2nd-level positions. SubProfessional is for 1st-level (clerical/job order) positions. The key difference: SubProf has a Clerical Ability section instead of Analytical Ability.',
  },
  {
    q: 'Can I share this PDF?',
    a: 'YES — please do! Help your fellow CSE takers.',
  },
  {
    q: 'Will you spam me?',
    a: 'No — we send max 1 email per week, mostly CSE tips and study resources. Unsubscribe anytime.',
  },
];

const RELATED = [
  { href: '/civil-service/professional-vs-subprofessional-cse', label: 'CSE Professional vs SubProfessional — Which Should You Take?' },
  { href: '/civil-service/clerical-ability-reviewer-cse', label: 'Clerical Ability Reviewer for CSE SubProfessional' },
  { href: '/civil-service/how-to-pass-civil-service-exam', label: 'How to Pass the Civil Service Exam in 2026' },
  { href: '/civil-service/ra-6713-reviewer-cse', label: 'RA 6713 Reviewer for CSE — All 8 Norms Explained' },
  { href: '/civil-service/numerical-reasoning-reviewer-cse', label: 'Numerical Reasoning Reviewer for CSE 2026' },
];

export default function CSESubProfStarterPackPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Hero */}
        <div className="text-center mb-8">
          <span className="inline-block bg-yellow-400/10 text-yellow-400 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            🎁 Free Download
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            CSE SubProfessional Starter Pack 2026
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            30 Questions for First-Level Government Positions
          </p>
          <p className="text-gray-500 text-sm">
            Built for the 2026 CSC TOS. 100% free — just enter your email below.
          </p>
        </div>

        {/* Top form */}
        <CSESubProfFreebieCTA redirectOnSuccess />

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

        {/* Who it's for */}
        <section className="mt-6 bg-[#0f1629] border border-yellow-400/20 rounded-2xl p-6">
          <h2 className="text-yellow-400 font-extrabold text-lg mb-3">Who Is This For?</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Non-college graduates applying for government jobs</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Anyone targeting first-level (clerical, administrative) positions</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Job order / contract of service workers wanting permanent positions</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> LGU employees who need CSC eligibility</li>
          </ul>
        </section>

        {/* Clerical ability callout */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-3">The Section Most Reviewers Ignore</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            <strong className="text-yellow-400">Clerical Ability</strong> is unique to the SubProfessional exam — it doesn&apos;t exist in the Professional level.
            Most free reviewers focus on Verbal and Numerical and barely cover Clerical.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            This Starter Pack gives you Clerical questions with full rationales so you actually understand
            the logic behind filing, alphabetizing, and pattern matching — not just memorize answers.
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

        {/* Upgrade teaser */}
        <section className="mt-6 bg-gradient-to-br from-yellow-900/20 to-amber-900/10 border border-yellow-400/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-yellow-400/20 text-yellow-400 text-xs font-extrabold px-2 py-1 rounded-full uppercase tracking-wide">⭐ Now Available</span>
          </div>
          <h2 className="text-yellow-400 font-extrabold text-lg mb-3">
            CSE SubProfessional Mastery System — Get the Full Reviewer
          </h2>
          <ul className="space-y-2 text-gray-300 text-sm mb-4">
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> 465+ questions across all 4 sections</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Full 165-item Mock Exam with rationales</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Clerical Ability complete coverage</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> 8-Week Study Schedule</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Launch price: ₱149 (₱199 after first 100 buyers)</li>
          </ul>
          <Link
            href="/premium/cse-subprof-mastery"
            className="inline-block text-yellow-400 hover:text-yellow-300 font-bold text-sm underline underline-offset-2 transition-colors"
          >
            See the full Mastery System →
          </Link>
        </section>

        {/* Pro cross-link */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Planning to take Professional later?</p>
          <p className="text-white font-bold mb-2">📊 CSE Professional Starter Pack</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            Once you have your SubProf eligibility, many people upgrade to Professional. Get the Pro Starter Pack now — covers Analytical Ability and the higher-level content.
          </p>
          <Link href="/freebies/cse-pro-starter-pack" className="text-yellow-400 hover:text-yellow-300 underline text-sm font-semibold">
            Get the CSE Pro Starter Pack — Free →
          </Link>
        </section>

        {/* Second form */}
        <div className="mt-6">
          <p className="text-center text-gray-400 text-sm mb-2">Ready? Enter your email and get the PDF instantly.</p>
          <CSESubProfFreebieCTA redirectOnSuccess />
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
