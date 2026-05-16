import Link from 'next/link';

export default function PremiumCTA() {
  return (
    <div className="my-8 rounded-2xl border border-yellow-400/40 bg-[#0f1629] p-6">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl flex-shrink-0">📘</span>
        <div>
          <p className="text-yellow-400 font-extrabold text-base uppercase tracking-wide">
            Get the Complete LET ProfEd Reviewer
          </p>
          <p className="text-gray-300 text-sm mt-1">
            Already studying for the LET? Get our 100-page premium reviewer with 430+ questions and full rationales — built for the 2026 Enhanced TOS.
          </p>
        </div>
      </div>
      <ul className="space-y-1.5 mb-5 ml-9">
        {[
          '8-week study schedule included',
          '50-item mock exam with rationales',
          'Memory hooks for every theory and law',
          '₱149 launch price (₱249 after first 100 buyers)',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-gray-300 text-sm">
            <span className="text-yellow-400 flex-shrink-0 font-bold">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/premium/let-profed-mastery"
        className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-xl text-sm transition-colors"
      >
        GET YOUR COPY →
      </Link>
    </div>
  );
}
