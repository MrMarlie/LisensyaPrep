import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'CSE Premium Reviewers — Coming Soon',
  description:
    'LisensyaPrep Civil Service Exam Mastery Systems are in development. Join the waitlist for early-bird access and discounts.',
  path: '/premium/cse',
});

export default function CSEPremiumHubPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-10">
          <span className="inline-block bg-yellow-400/10 text-yellow-400 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            🚀 Coming Soon
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            CSE Premium Reviewers
          </h1>
          <p className="text-gray-400 text-base">
            Both Mastery Systems are currently in development. Join the waitlist to be notified at launch.
          </p>
        </div>

        {/* CSE Pro */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 mb-4">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">📊</span>
                <span className="bg-yellow-400/20 text-yellow-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">Coming Soon</span>
              </div>
              <h2 className="text-white font-extrabold text-xl mb-1">CSE Professional Mastery System</h2>
              <p className="text-gray-400 text-sm">For college graduates targeting 2nd-level government positions</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-gray-500 text-xs">At launch</p>
              <p className="text-white font-extrabold text-xl">₱249</p>
            </div>
          </div>
          <ul className="space-y-1.5 mb-5">
            <li className="text-gray-400 text-sm flex items-center gap-2"><span className="text-yellow-400">✓</span> 550+ questions with full rationales</li>
            <li className="text-gray-400 text-sm flex items-center gap-2"><span className="text-yellow-400">✓</span> Verbal, Numerical, Analytical, General Information</li>
            <li className="text-gray-400 text-sm flex items-center gap-2"><span className="text-yellow-400">✓</span> Full 170-item Mock Exam</li>
            <li className="text-gray-400 text-sm flex items-center gap-2"><span className="text-yellow-400">✓</span> Launching Q3–Q4 2026</li>
          </ul>
          <Link
            href="/premium/cse-pro-mastery"
            className="block w-full text-center bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-5 py-3 rounded-xl text-sm transition-colors"
          >
            Join Waitlist — Early-Bird ₱200 →
          </Link>
        </div>

        {/* CSE SubProf */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">📋</span>
                <span className="bg-yellow-400/20 text-yellow-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">Coming Soon</span>
              </div>
              <h2 className="text-white font-extrabold text-xl mb-1">CSE SubProfessional Mastery System</h2>
              <p className="text-gray-400 text-sm">For first-level (clerical) government position applicants</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-gray-500 text-xs">At launch</p>
              <p className="text-white font-extrabold text-xl">₱199</p>
            </div>
          </div>
          <ul className="space-y-1.5 mb-5">
            <li className="text-gray-400 text-sm flex items-center gap-2"><span className="text-yellow-400">✓</span> 465+ questions with full rationales</li>
            <li className="text-gray-400 text-sm flex items-center gap-2"><span className="text-yellow-400">✓</span> Verbal, Numerical, Clerical Ability, General Information</li>
            <li className="text-gray-400 text-sm flex items-center gap-2"><span className="text-yellow-400">✓</span> Full 165-item Mock Exam</li>
            <li className="text-gray-400 text-sm flex items-center gap-2"><span className="text-yellow-400">✓</span> Launching Q3–Q4 2026</li>
          </ul>
          <Link
            href="/premium/cse-subprof-mastery"
            className="block w-full text-center bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-5 py-3 rounded-xl text-sm transition-colors"
          >
            Join Waitlist — Early-Bird ₱150 →
          </Link>
        </div>

        {/* Free starter packs */}
        <section className="bg-[#0f1629] border border-green-400/20 rounded-2xl p-6">
          <p className="text-green-400 font-semibold text-sm mb-3">🎁 While You Wait — Download Free Starter Packs</p>
          <div className="space-y-3">
            <Link
              href="/freebies/cse-pro-starter-pack"
              className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-colors"
            >
              <div>
                <p className="text-white font-semibold text-sm">📔 CSE Pro Starter Pack</p>
                <p className="text-gray-500 text-xs">30 questions · Full rationales · Free</p>
              </div>
              <span className="text-yellow-400 text-sm font-bold">Download →</span>
            </Link>
            <Link
              href="/freebies/cse-subprof-starter-pack"
              className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-colors"
            >
              <div>
                <p className="text-white font-semibold text-sm">📔 CSE SubProf Starter Pack</p>
                <p className="text-gray-500 text-xs">30 questions · Full rationales · Free</p>
              </div>
              <span className="text-yellow-400 text-sm font-bold">Download →</span>
            </Link>
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link href="/civil-service" className="text-gray-500 hover:text-gray-300 text-sm underline transition-colors">
            ← Back to CSE Study Guides
          </Link>
        </div>

      </div>
    </div>
  );
}
