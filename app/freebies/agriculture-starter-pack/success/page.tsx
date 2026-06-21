import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Check Your Email — Agriculture (ALE) Starter Pack Sent | LisensyaPrep',
  description: 'Your free Agriculture (ALE) Starter Pack is on its way. Check your inbox.',
  path: '/freebies/agriculture-starter-pack/success',
});

const SUGGESTED = [
  {
    href: '/blog/ale-coverage-2026',
    title: 'ALE Coverage 2026 — Complete Subject Breakdown',
    desc: 'What the agriculture board exam covers, subject by subject, with study links for each.',
  },
  {
    href: '/blog/crop-science-reviewer-ale',
    title: 'Crop Science Reviewer for the ALE',
    desc: 'Plant physiology, crop management, and production systems — the core of the ALE.',
  },
  {
    href: '/blog/animal-science-reviewer-ale',
    title: 'Animal Science Reviewer for the ALE',
    desc: 'Livestock production, animal nutrition, and breeding — the topics most reviewers skip.',
  },
];

export default function AgricultureFreebieSuccessPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">

        <div className="text-5xl mb-6">📬</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">Check your email!</h1>
        <p className="text-gray-300 text-lg mb-2">
          Your Agriculture (ALE) Starter Pack is on its way.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          It should arrive within a few minutes. If you don&apos;t see it, check your spam folder.
        </p>

        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5 mb-8 text-left">
          <p className="text-white font-semibold text-sm mb-1">📌 Quick tip</p>
          <p className="text-gray-400 text-sm">
            Add <span className="text-green-400 font-mono">lisensyaprep@gmail.com</span> to your
            contacts so future emails (like ALE tips and updates) don&apos;t go to spam.
          </p>
        </div>

        {/* Mastery upsell */}
        <div className="bg-[#0f1629] border border-green-400/20 rounded-2xl p-5 mb-8 text-left">
          <p className="text-green-400 font-semibold text-sm mb-2">✅ Want the full Agriculture Mastery System?</p>
          <p className="text-gray-400 text-sm mb-3">
            The complete Agriculture (ALE) Mastery System is available now — 300+ questions across all 6
            subjects with full rationales, a 100-item mock exam, and an 8-week study schedule. Launch
            price is ₱149 for the first 100 buyers (₱249 after).
          </p>
          <Link
            href="/premium/agri-mastery"
            className="inline-block bg-green-500 hover:bg-green-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            See the Agriculture Mastery System →
          </Link>
        </div>

        {/* Keep practicing */}
        <div className="bg-[#0f1629] border border-green-400/20 rounded-2xl p-5 mb-8 text-left">
          <p className="text-green-400 font-semibold text-sm mb-2">Keep practicing — free</p>
          <p className="text-gray-400 text-sm mb-3">
            Practice all 6 agriculture subjects with 600+ free board-style questions. No account required.
          </p>
          <Link
            href="/agriculture"
            className="inline-block bg-green-500 hover:bg-green-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Start practicing at LisensyaPrep →
          </Link>
        </div>

        {/* Share */}
        <div className="bg-[#0f1629] border border-blue-500/20 rounded-2xl p-5 mb-8">
          <p className="text-white font-semibold text-sm mb-2">Help more ALE takers get this free pack</p>
          <p className="text-gray-400 text-sm mb-4">
            Share on Facebook and help your barkada prepare for the ALE too.
          </p>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flisensyaprep.com%2Ffreebies%2Fagriculture-starter-pack"
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
              className="block bg-[#0f1629] border border-white/10 rounded-xl p-4 hover:border-green-400/30 transition-colors group"
            >
              <p className="text-white font-semibold text-sm group-hover:text-green-400 transition-colors mb-1">
                {title}
              </p>
              <p className="text-gray-500 text-xs">{desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/agriculture"
            className="text-gray-500 hover:text-gray-300 text-sm underline transition-colors"
          >
            ← Back to Agriculture Review
          </Link>
        </div>

      </div>
    </div>
  );
}
