import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { PNLE } from '@/lib/mockExamMeta';
import { getExamUser, checkAccess, pnleCombined } from '@/lib/mockExam';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Your PNLE Mock Board Results | LisensyaPrep',
  robots: { index: false, follow: false },
};

function pct(p: number | null) {
  return p == null ? '—' : `${Math.round(p * 100)}%`;
}

export default async function PnleResultsPage() {
  const user = await getExamUser();
  if (!user) redirect('/mock-board/login?next=/mock-board/pnle/results');

  const access = await checkAccess(user.email, PNLE.product);
  if (!access.ok) redirect(`/mock-board/pnle?access=${access.reason}`);

  const admin = supabaseAdmin();
  const data = await pnleCombined(admin, user.email);
  const genPct = data.generalAverage;

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-white">Your PNLE Mock Board results</h1>
          <p className="text-gray-500 text-sm mt-1">
            Based on your latest attempt in each of the 5 Nursing Practice modules.
          </p>
        </div>

        {/* Overall verdict */}
        {data.allTaken ? (
          <div
            className={`rounded-2xl p-8 text-center border ${
              data.passedOverall ? 'border-green-400/40 bg-green-500/5' : 'border-red-400/30 bg-red-500/5'
            }`}
          >
            <div className="text-5xl mb-2">{data.passedOverall ? '🎉' : '📚'}</div>
            <p
              className={`text-sm font-bold uppercase tracking-widest ${
                data.passedOverall ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {data.passedOverall ? 'Passing standard met' : 'Below passing standard'}
            </p>
            <p className="text-white text-5xl font-black mt-2">{pct(genPct)}</p>
            <p className="text-gray-400 mt-1">
              General average · needs {Math.round(PNLE.generalAverage * 100)}% with no module below{' '}
              {Math.round(PNLE.subjectFloor * 100)}%
            </p>
            {data.lowest && data.lowest.percent != null && (
              <p className="text-gray-500 text-sm mt-2">
                Lowest module: {data.lowest.short} ({pct(data.lowest.percent)})
                {data.lowest.percent < PNLE.subjectFloor ? ' — below the 60% floor' : ' ✓'}
              </p>
            )}
          </div>
        ) : (
          <div className="rounded-2xl p-6 text-center border border-pink-400/30 bg-pink-500/5">
            <div className="text-4xl mb-2">🧭</div>
            <p className="text-white font-bold">
              You&apos;ve finished {data.takenCount} of 5 modules.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Take all five to see your PNLE general-average verdict (75% average, no module below 60%).
            </p>
            {genPct != null && (
              <p className="text-gray-500 text-sm mt-2">Average so far: {pct(genPct)}</p>
            )}
          </div>
        )}

        {/* Per-module breakdown */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 mt-5">
          <h2 className="text-white font-bold mb-4">By module</h2>
          <div className="space-y-3">
            {data.modules.map((m) => {
              const p = m.percent;
              const below = p != null && p < PNLE.subjectFloor;
              return (
                <div key={m.key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">
                      NP {m.roman} · {m.short}
                    </span>
                    {m.taken ? (
                      <span className={below ? 'text-red-400 font-semibold' : 'text-gray-300'}>
                        {m.score}/{m.total} ({pct(p)}){below ? ' · below 60%' : ' ✓'}
                      </span>
                    ) : (
                      <Link href={`/mock-board/${m.slug}/exam`} className="text-pink-400 underline">
                        Not taken — start →
                      </Link>
                    )}
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        p == null ? 'bg-white/10' : below ? 'bg-red-400/70' : 'bg-green-400/70'
                      }`}
                      style={{ width: `${p == null ? 0 : Math.round(p * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center mt-6">
          <Link href="/mock-board/pnle" className="text-gray-500 text-sm underline">
            ← Back to modules
          </Link>
        </p>
      </div>
    </div>
  );
}
