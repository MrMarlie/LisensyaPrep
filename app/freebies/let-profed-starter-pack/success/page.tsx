import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Check Your Email — LET ProfEd Starter Pack Sent',
  description: 'Your free LET ProfEd Starter Pack is on its way. Check your inbox.',
  path: '/freebies/let-profed-starter-pack/success',
});

const SUGGESTED = [
  {
    href: '/education/professional-education-reviewer',
    title: 'Professional Education Reviewer for LET 2026',
    desc: 'Deep-dive into learning theories, Bloom\'s Taxonomy, and curriculum development.',
  },
  {
    href: '/education/how-to-pass-let-first-take',
    title: 'How to Pass the LET on Your First Take',
    desc: 'The honest guide to passing without a review center.',
  },
  {
    href: '/education/let-coverage-2026',
    title: 'LET Coverage 2026 — Complete Subject Breakdown',
    desc: 'Know exactly what ProfEd, GenEd, and Major subjects are tested.',
  },
];

export default function FreebieSuccessPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">

        {/* Success message */}
        <div className="text-5xl mb-6">📬</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">Check your email!</h1>
        <p className="text-gray-300 text-lg mb-2">
          Your LET ProfEd Starter Pack is on its way.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          It should arrive within a few minutes. If you don&apos;t see it, check your spam folder.
        </p>

        {/* Add to contacts tip */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5 mb-8 text-left">
          <p className="text-white font-semibold text-sm mb-1">📌 Quick tip</p>
          <p className="text-gray-400 text-sm">
            Add <span className="text-yellow-400 font-mono">lisensyaprep@gmail.com</span> to your
            contacts so future emails (like the Mastery System launch announcement) don&apos;t go
            to spam.
          </p>
        </div>

        {/* Share on Facebook */}
        <div className="bg-[#0f1629] border border-blue-500/20 rounded-2xl p-5 mb-8">
          <p className="text-white font-semibold text-sm mb-2">Help more LET takers get this free pack</p>
          <p className="text-gray-400 text-sm mb-4">
            Share on Facebook and help your barkada prepare for the LET too.
          </p>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flisensyaprep.com%2Ffreebies%2Flet-profed-starter-pack"
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
