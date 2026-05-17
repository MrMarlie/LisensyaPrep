import Link from 'next/link';

export default function GenEdMasteryCTA() {
  return (
    <div className="my-8 bg-gradient-to-r from-[#0f1629] to-[#0a1022] border border-yellow-400/20 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 uppercase tracking-wider">Now Available</span>
          </div>
          <p className="text-white font-extrabold text-lg leading-tight mb-1">
            🚀 LET Gen Ed Mastery System — ₱249
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            430+ Gen Ed questions with full rationales. English, Filipino, Math, Science, Social Sciences.
          </p>
          <p className="text-yellow-400 text-xs font-semibold">
            BEEd takers: Gen Ed = 40% of your LET score. BSEd: 20%. Either way — this matters.
          </p>
        </div>
        <div className="flex-shrink-0 w-full sm:w-auto">
          <Link
            href="/premium/let-gen-ed-mastery"
            className="block w-full sm:w-auto text-center bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            Get Yours →
          </Link>
          <Link
            href="/premium/let-bundle-mastery"
            className="block w-full sm:w-auto text-center mt-2 bg-transparent border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 font-semibold px-6 py-2.5 rounded-xl text-xs transition-colors whitespace-nowrap"
          >
            🎁 Bundle Deal — ₱399 (Save ₱99)
          </Link>
        </div>
      </div>
    </div>
  );
}
