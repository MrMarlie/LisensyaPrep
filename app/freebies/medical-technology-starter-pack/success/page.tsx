import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Check Your Email — Medical Technology (MTLE) Starter Pack Sent | LisensyaPrep',
  description: 'Your free Medical Technology (MTLE) Starter Pack is on its way. Check your inbox.',
  path: '/freebies/medical-technology-starter-pack/success',
});

const SUGGESTED = [
  {
    href: '/medical-technology/mtle-coverage-2026',
    title: 'MTLE Coverage 2026 — Complete Subject Breakdown',
    desc: 'What the medical technology board exam covers, subject by subject, with study links for each.',
  },
  {
    href: '/medical-technology/how-to-pass-mtle-board-exam',
    title: 'How to Pass the MTLE Board Exam',
    desc: 'A practical study plan and strategy for the six MTLE subjects.',
  },
  {
    href: '/medical-technology/blood-banking-serology-reviewer',
    title: 'Blood Banking & Serology Reviewer for the MTLE',
    desc: 'ABO/Rh grouping, crossmatching, and transfusion reactions — high-yield, commonly tested topics.',
  },
];

export default function MedTechFreebieSuccessPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">

        <div className="text-5xl mb-6">📬</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">Check your email!</h1>
        <p className="text-gray-300 text-lg mb-2">
          Your Medical Technology (MTLE) Starter Pack is on its way.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          It should arrive within a few minutes. If you don&apos;t see it, check your spam folder.
        </p>

        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5 mb-8 text-left">
          <p className="text-white font-semibold text-sm mb-1">📌 Quick tip</p>
          <p className="text-gray-400 text-sm">
            Add <span className="text-cyan-400 font-mono">lisensyaprep@gmail.com</span> to your
            contacts so future emails (like MTLE tips and updates) don&apos;t go to spam.
          </p>
        </div>

        {/* Keep practicing */}
        <div className="bg-[#0f1629] border border-cyan-400/20 rounded-2xl p-5 mb-8 text-left">
          <p className="text-cyan-400 font-semibold text-sm mb-2">Keep practicing — free</p>
          <p className="text-gray-400 text-sm mb-3">
            Practice all 6 medical technology subjects with 300+ free board-style questions. No account required.
          </p>
          <Link
            href="/medical-technology"
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Start practicing at LisensyaPrep →
          </Link>
        </div>

        {/* Share */}
        <div className="bg-[#0f1629] border border-blue-500/20 rounded-2xl p-5 mb-8">
          <p className="text-white font-semibold text-sm mb-2">Help more MTLE takers get this free pack</p>
          <p className="text-gray-400 text-sm mb-4">
            Share on Facebook and help your barkada prepare for the MTLE too.
          </p>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flisensyaprep.com%2Ffreebies%2Fmedical-technology-starter-pack"
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
              className="block bg-[#0f1629] border border-white/10 rounded-xl p-4 hover:border-cyan-400/30 transition-colors group"
            >
              <p className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors mb-1">
                {title}
              </p>
              <p className="text-gray-500 text-xs">{desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/medical-technology"
            className="text-gray-500 hover:text-gray-300 text-sm underline transition-colors"
          >
            ← Back to Medical Technology Review
          </Link>
        </div>

      </div>
    </div>
  );
}
