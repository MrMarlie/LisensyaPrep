import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Check Your Email — PNLE Nursing Starter Pack Sent | LisensyaPrep',
  description: 'Your free PNLE Nursing Starter Pack is on its way. Check your inbox.',
  path: '/freebies/pnle-nursing-starter-pack/success',
});

const SUGGESTED = [
  {
    href: '/nursing/pnle-coverage-2026',
    title: 'PNLE Coverage 2026 — Complete Topic Breakdown',
    desc: 'All 500 items explained. Part 1 (Community Health) and Part 2 (Clinical Nursing) subject weights.',
  },
  {
    href: '/nursing/pnle-3-month-study-plan',
    title: 'PNLE 3-Month Study Plan for Self-Reviewers',
    desc: 'Week-by-week self-review plan for the nursing board exam. Covers all NLE subjects.',
  },
  {
    href: '/nursing/medical-surgical-nursing-reviewer',
    title: 'Medical-Surgical Nursing Reviewer NLE 2026',
    desc: 'Cardiovascular, respiratory, neuro, GI, and renal nursing — the largest portion of the PNLE.',
  },
];

export default function PNLEFreebieSuccessPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">

        <div className="text-5xl mb-6">📬</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">Check your email!</h1>
        <p className="text-gray-300 text-lg mb-2">
          Your PNLE Nursing Starter Pack is on its way.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          It should arrive within a few minutes. If you don&apos;t see it, check your spam folder.
        </p>

        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5 mb-8 text-left">
          <p className="text-white font-semibold text-sm mb-1">📌 Quick tip</p>
          <p className="text-gray-400 text-sm">
            Add <span className="text-pink-400 font-mono">lisensyaprep@gmail.com</span> to your
            contacts so future emails don&apos;t go to spam.
          </p>
        </div>

        {/* Coming soon CTA */}
        <div className="bg-[#0f1629] border border-pink-400/20 rounded-2xl p-5 mb-8 text-left">
          <p className="text-pink-400 font-semibold text-sm mb-2">🏥 PNLE Mastery System — Now Available!</p>
          <p className="text-gray-400 text-sm mb-3">
            The full PNLE Mastery System with 300+ questions across all 6 NLE subjects is live now for only ₱199.
          </p>
          <Link
            href="/premium/pnle-mastery"
            className="inline-block bg-pink-500 hover:bg-pink-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Get PNLE Mastery System →
          </Link>
        </div>

        {/* Share */}
        <div className="bg-[#0f1629] border border-blue-500/20 rounded-2xl p-5 mb-8">
          <p className="text-white font-semibold text-sm mb-2">Help more nursing grads pass the PNLE</p>
          <p className="text-gray-400 text-sm mb-4">
            Share on Facebook and help your batchmates prepare for the NLE too.
          </p>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flisensyaprep.com%2Ffreebies%2Fpnle-nursing-starter-pack"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Share on Facebook →
          </a>
        </div>

        <h2 className="text-white font-bold text-lg mb-4 text-left">Read these while you wait</h2>
        <div className="space-y-3 text-left">
          {SUGGESTED.map(({ href, title, desc }) => (
            <Link
              key={href}
              href={href}
              className="block bg-[#0f1629] border border-white/10 rounded-xl p-4 hover:border-pink-400/30 transition-colors group"
            >
              <p className="text-white font-semibold text-sm group-hover:text-pink-400 transition-colors mb-1">
                {title}
              </p>
              <p className="text-gray-500 text-xs">{desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/nursing"
            className="text-gray-500 hover:text-gray-300 text-sm underline transition-colors"
          >
            ← Back to Nursing Study Guides
          </Link>
        </div>

      </div>
    </div>
  );
}
