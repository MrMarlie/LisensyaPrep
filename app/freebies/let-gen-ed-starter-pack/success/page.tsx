import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Check Your Email — LET Gen Ed Starter Pack Sent',
  description: 'Your free LET Gen Ed Starter Pack is on its way. Check your inbox.',
  path: '/freebies/let-gen-ed-starter-pack/success',
});

const SUGGESTED = [
  {
    href: '/education/let-secondary-major-english-reviewer',
    title: 'LET Secondary Major English Reviewer 2026',
    desc: 'Language acquisition theories, literary genres, grammar, and English teaching methods.',
  },
  {
    href: '/education/let-secondary-major-math-reviewer',
    title: 'LET Secondary Major Math Reviewer 2026',
    desc: 'Algebra, geometry, statistics, and problem-solving strategies for LET.',
  },
  {
    href: '/education/let-secondary-major-science-reviewer',
    title: 'LET Secondary Major Science Reviewer 2026',
    desc: 'Biology, physics, chemistry, and earth science for the LET Major in Science.',
  },
];

export default function GenEdFreebieSuccessPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">

        {/* Success message */}
        <div className="text-5xl mb-6">📬</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">Check your email!</h1>
        <p className="text-gray-300 text-lg mb-2">
          Your LET Gen Ed Starter Pack is on its way.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          It should arrive within a few minutes. If you don&apos;t see it, check your spam folder.
        </p>

        {/* Add to contacts tip */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5 mb-8 text-left">
          <p className="text-white font-semibold text-sm mb-1">📌 Quick tip</p>
          <p className="text-gray-400 text-sm">
            Add <span className="text-yellow-400 font-mono">lisensyaprep@gmail.com</span> to your
            contacts so future emails (like the Gen Ed Mastery System launch) don&apos;t go to spam.
          </p>
        </div>

        {/* ProfEd cross-promo */}
        <div className="bg-[#0f1629] border border-yellow-400/20 rounded-2xl p-5 mb-8 text-left">
          <p className="text-yellow-400 font-semibold text-sm mb-2">Also studying ProfEd?</p>
          <p className="text-gray-400 text-sm mb-3">
            Our LET ProfEd Mastery System is already available — 430+ questions with full rationales, built for the 2026 Enhanced TOS.
          </p>
          <Link
            href="/premium/let-profed-mastery"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            See the ProfEd Mastery System →
          </Link>
        </div>

        {/* Share on Facebook */}
        <div className="bg-[#0f1629] border border-blue-500/20 rounded-2xl p-5 mb-8">
          <p className="text-white font-semibold text-sm mb-2">Help more LET takers get this free pack</p>
          <p className="text-gray-400 text-sm mb-4">
            Share on Facebook and help your barkada prepare for the LET too.
          </p>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flisensyaprep.com%2Ffreebies%2Flet-gen-ed-starter-pack"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Share on Facebook →
          </a>
        </div>

        {/* Read while waiting */}
        <h2 className="text-white font-bold text-lg mb-4 text-left">
          Read these while you wait
        </h2>
        <div className="space-y-3 text-left">
          {SUGGESTED.map(({ href, title, desc }) => (
            <Link
              key={href}
              href={href}
              className="block bg-[#0f1629] border border-white/10 rounded-xl p-4 hover:border-yellow-400/30 transition-colors group"
            >
              <p className="text-white font-semibold text-sm group-hover:text-yellow-400 transition-colors mb-1">
                {title}
              </p>
              <p className="text-gray-500 text-xs">{desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/education"
            className="text-gray-500 hover:text-gray-300 text-sm underline transition-colors"
          >
            ← Back to LET Study Guides
          </Link>
        </div>

      </div>
    </div>
  );
}
