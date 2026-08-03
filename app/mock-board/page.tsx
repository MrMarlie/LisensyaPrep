import Link from 'next/link';
import type { Metadata } from 'next';
import { EXAMS, PRICE, ACCESS_ENDS, PNLE } from '@/lib/mockExamMeta';

export const metadata: Metadata = {
  title: 'LET Mock Board Exams 2026 — Timed Online Simulations | LisensyaPrep',
  description: `Timed, full-length LET Mock Board Exams for Gen Ed and Prof Ed. 150 items each, 180-minute timer, shuffled every attempt, full rationales. From ₱${PRICE} via GCash.`,
  openGraph: {
    title: 'LET Mock Board Exams 2026 | LisensyaPrep',
    description: 'Timed, full-length LET Mock Board Exams for Gen Ed and Prof Ed.',
    url: 'https://lisensyaprep.com/mock-board',
  },
};

export default function MockBoardHub() {
  const exams = Object.values(EXAMS);
  return (
    <div className="min-h-screen px-4 py-14">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 uppercase tracking-widest mb-4">
            New · Timed Online Mock Boards
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">LET Mock Board Exams 2026</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Sit a real, timed LET simulation online — 150 items, a 180-minute countdown, questions shuffled every attempt,
            and full rationales after you submit.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {exams.map((e) => (
            <div key={e.slug} className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 flex flex-col">
              <h2 className="text-white text-xl font-extrabold mb-2">{e.short}</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{e.blurb}</p>
              <ul className="text-gray-400 text-sm space-y-1 mb-5">
                <li>✓ 150 items · 180-minute timer</li>
                <li>✓ Shuffled every attempt</li>
                <li>✓ Full rationales + score breakdown</li>
                <li>✓ Unlimited retakes until {ACCESS_ENDS}</li>
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-yellow-400 font-extrabold text-2xl">₱{e.price}</span>
                <Link
                  href={`/mock-board/${e.slug}`}
                  className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-5 py-2.5 rounded-lg transition-colors"
                >
                  View exam →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Cross-sell: PNLE (nursing) mock board */}
        <Link
          href="/mock-board/pnle"
          className="block mt-6 bg-[#0f1629] border border-pink-400/30 hover:border-pink-400/60 rounded-2xl p-5 transition-colors"
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-pink-400 font-extrabold">🏥 Taking the PNLE instead?</p>
              <p className="text-gray-400 text-sm mt-1">
                PNLE Mock Board — 5 timed Nursing Practice modules (500 items), 2 hours each. One ₱{PNLE.price} unlocks all five.
              </p>
            </div>
            <span className="text-pink-400 font-bold whitespace-nowrap">View PNLE mock →</span>
          </div>
        </Link>

        <p className="text-center text-gray-500 text-sm mt-8">
          Already purchased?{' '}
          <Link href="/mock-board/login" className="text-yellow-400 underline">Sign in to start</Link>
        </p>
      </div>
    </div>
  );
}
