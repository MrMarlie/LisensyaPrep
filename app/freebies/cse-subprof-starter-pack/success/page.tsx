import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Check Your Email — CSE SubProf Starter Pack Sent | LisensyaPrep',
  description: 'Your free CSE SubProfessional Starter Pack is on its way. Check your inbox.',
  path: '/freebies/cse-subprof-starter-pack/success',
});

const SUGGESTED = [
  {
    href: '/civil-service/professional-vs-subprofessional-cse',
    title: 'CSE Professional vs SubProfessional — Which Should You Take?',
    desc: 'Understand the key differences, exam coverage, and which level matches your career goals.',
  },
  {
    href: '/civil-service/clerical-ability-reviewer-cse',
    title: 'Clerical Ability Reviewer for CSE SubProfessional',
    desc: 'Filing, alphabetizing, spelling, and pattern matching — the SubProf-exclusive section.',
  },
  {
    href: '/civil-service/ra-6713-reviewer-cse',
    title: 'RA 6713 Reviewer for CSE — All 8 Norms',
    desc: 'The most-tested law in the CSE. Know all 8 norms and common exam patterns.',
  },
];

export default function CSESubProfFreebieSuccessPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">

        <div className="text-5xl mb-6">📬</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">Check your email!</h1>
        <p className="text-gray-300 text-lg mb-2">
          Your CSE SubProfessional Starter Pack is on its way.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          It should arrive within a few minutes. If you don&apos;t see it, check your spam folder.
        </p>

        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5 mb-8 text-left">
          <p className="text-white font-semibold text-sm mb-1">📌 Quick tip</p>
          <p className="text-gray-400 text-sm">
            Add <span className="text-yellow-400 font-mono">lisensyaprep@gmail.com</span> to your
            contacts so future emails (like your CSE SubProf Mastery System delivery) don&apos;t go to spam.
          </p>
        </div>

        {/* Mastery upsell CTA */}
        <div className="bg-[#0f1629] border border-yellow-400/20 rounded-2xl p-5 mb-8 text-left">
          <p className="text-yellow-400 font-semibold text-sm mb-2">⭐ Want the full Mastery System?</p>
          <p className="text-gray-400 text-sm mb-3">
            The CSE SubProfessional Mastery System (465+ questions) is now live. First 100 buyers get the
            ₱149 launch price (₱199 after).
          </p>
          <Link
            href="/premium/cse-subprof-mastery"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Get the Mastery System →
          </Link>
        </div>

        {/* Also get Pro */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5 mb-8 text-left">
          <p className="text-white font-semibold text-sm mb-2">Planning to take Professional later?</p>
          <p className="text-gray-400 text-sm mb-3">
            Get the CSE Professional Starter Pack too — free. 30 questions covering Analytical Ability and higher-level content.
          </p>
          <Link
            href="/freebies/cse-pro-starter-pack"
            className="text-yellow-400 hover:text-yellow-300 font-bold text-sm underline"
          >
            Get the CSE Pro Starter Pack →
          </Link>
        </div>

        {/* Share */}
        <div className="bg-[#0f1629] border border-blue-500/20 rounded-2xl p-5 mb-8">
          <p className="text-white font-semibold text-sm mb-2">Help more CSE takers get this free pack</p>
          <p className="text-gray-400 text-sm mb-4">
            Share on Facebook and help your barkada prepare for the CSE too.
          </p>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flisensyaprep.com%2Ffreebies%2Fcse-subprof-starter-pack"
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
            href="/civil-service"
            className="text-gray-500 hover:text-gray-300 text-sm underline transition-colors"
          >
            ← Back to CSE Study Guides
          </Link>
        </div>

      </div>
    </div>
  );
}
