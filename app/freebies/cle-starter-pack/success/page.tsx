import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Check Your Email — CLE Criminology Starter Pack Sent | LisensyaPrep',
  description: 'Your free CLE Criminology Starter Pack is on its way. Check your inbox.',
  path: '/freebies/cle-starter-pack/success',
});

const SUGGESTED = [
  {
    href: '/criminology/cle-coverage-2026',
    title: 'CLE Coverage 2026 — Complete Subject Breakdown',
    desc: 'What the criminology board exam covers, subject by subject, with study links for each.',
  },
  {
    href: '/criminology/criminalistics-dactyloscopy-reviewer',
    title: 'Criminalistics and Dactyloscopy Reviewer',
    desc: 'Fingerprint patterns, ballistics, and questioned documents — the most-tested forensic topics.',
  },
  {
    href: '/criminology/criminal-jurisprudence-procedure-reviewer',
    title: 'Criminal Jurisprudence and Procedure Reviewer',
    desc: 'Revised Penal Code, criminal procedure, and the special penal laws that show up every exam.',
  },
];

export default function CLEFreebieSuccessPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">

        <div className="text-5xl mb-6">📬</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">Check your email!</h1>
        <p className="text-gray-300 text-lg mb-2">
          Your CLE Criminology Starter Pack is on its way.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          It should arrive within a few minutes. If you don&apos;t see it, check your spam folder.
        </p>

        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5 mb-8 text-left">
          <p className="text-white font-semibold text-sm mb-1">📌 Quick tip</p>
          <p className="text-gray-400 text-sm">
            Add <span className="text-yellow-400 font-mono">lisensyaprep@gmail.com</span> to your
            contacts so future emails (like the CLE Mastery System launch) don&apos;t go to spam.
          </p>
        </div>

        {/* Coming soon */}
        <div className="bg-[#0f1629] border border-yellow-400/20 rounded-2xl p-5 mb-8 text-left">
          <p className="text-yellow-400 font-semibold text-sm mb-2">🚀 You&apos;re on the CLE Mastery waitlist</p>
          <p className="text-gray-400 text-sm">
            The full CLE Criminology Mastery System is in development — hundreds of questions across all
            6 subjects with mock exams. As a waitlist member, you&apos;ll get first access and an early-bird
            discount at launch.
          </p>
        </div>

        {/* Keep practicing */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5 mb-8 text-left">
          <p className="text-white font-semibold text-sm mb-2">Keep practicing — free</p>
          <p className="text-gray-400 text-sm mb-3">
            Practice all 6 CLE subjects with free board-style questions. No account required.
          </p>
          <Link
            href="/criminology"
            className="text-yellow-400 hover:text-yellow-300 font-bold text-sm underline"
          >
            Start practicing at LisensyaPrep →
          </Link>
        </div>

        {/* Share */}
        <div className="bg-[#0f1629] border border-blue-500/20 rounded-2xl p-5 mb-8">
          <p className="text-white font-semibold text-sm mb-2">Help more CLE takers get this free pack</p>
          <p className="text-gray-400 text-sm mb-4">
            Share on Facebook and help your barkada prepare for the CLE too.
          </p>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flisensyaprep.com%2Ffreebies%2Fcle-starter-pack"
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
            href="/criminology"
            className="text-gray-500 hover:text-gray-300 text-sm underline transition-colors"
          >
            ← Back to Criminology Review
          </Link>
        </div>

      </div>
    </div>
  );
}
