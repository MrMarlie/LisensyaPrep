import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';
import { PNLE, pnleModules } from '@/lib/mockExamMeta';
import { getExamUser, checkAccess } from '@/lib/mockExam';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'PNLE Mock Board Exam 2026 — Timed 5-Module Simulation | LisensyaPrep',
  description: `Sit the full PNLE online: 5 Nursing Practice modules, 100 items each, timed at 2 hours per module like the real PRC board. Full rationales, unlimited retakes. ₱${PNLE.price} unlocks all 5 via GCash.`,
  openGraph: {
    title: 'PNLE Mock Board Exam 2026 — Timed Online Simulation | LisensyaPrep',
    description: 'Five timed Nursing Practice modules (500 items) that mirror the real PRC PNLE. One ₱99 purchase unlocks all five.',
    url: 'https://lisensyaprep.com/mock-board/pnle',
  },
};

const ACCESS_MSG: Record<string, string> = {
  expired: `Your access has ended — the PNLE Mock Board campaign closed on ${PNLE.accessEnds}.`,
  'no-access': 'That account doesn’t have PNLE Mock Board access yet.',
  revoked: 'Access for this account has been revoked. Contact us if this is a mistake.',
  'no-user': 'Please sign in to start your exam.',
};

export default async function PnleMockHub({
  searchParams,
}: {
  searchParams: { access?: string };
}) {
  const modules = pnleModules();
  const user = await getExamUser();
  const access = user ? await checkAccess(user.email, PNLE.product) : { ok: false, reason: 'no-user' };
  const entitled = access.ok;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'PNLE Mock Board Exam 2026',
    description:
      'Full-length, timed PNLE simulation: 5 Nursing Practice modules of 100 items each, 2 hours per module, with complete rationales.',
    brand: { '@type': 'Brand', name: 'LisensyaPrep' },
    offers: {
      '@type': 'Offer',
      price: String(PNLE.price),
      priceCurrency: 'PHP',
      availability: 'https://schema.org/InStock',
      url: 'https://lisensyaprep.com/mock-board/pnle/checkout',
    },
  };

  return (
    <>
      <Script id="pnle-mock-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen">
        {/* Hero */}
        <section className="px-4 pt-14 pb-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 uppercase tracking-widest mb-5">
              Timed Online PNLE Mock Board · ₱{PNLE.price}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              PNLE Mock Board Exam 2026
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
              A real, timed PNLE simulation you take online — the full five Nursing Practice tests, 100 items each,
              timed at <strong className="text-white">2 hours per module</strong> exactly like the PRC board. One purchase
              unlocks all five.
            </p>

            {searchParams.access && ACCESS_MSG[searchParams.access] && (
              <div className="max-w-md mx-auto mb-6 bg-red-500/10 border border-red-400/30 rounded-xl p-3">
                <p className="text-red-300 text-sm">{ACCESS_MSG[searchParams.access]}</p>
              </div>
            )}

            {entitled ? (
              <div className="flex flex-col items-center gap-3">
                <p className="text-green-400 font-semibold">✓ You have access to all 5 modules until {PNLE.accessEnds}.</p>
                <Link
                  href="/mock-board/pnle/results"
                  className="text-pink-400 underline text-sm"
                >
                  View your combined results dashboard →
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Link
                  href="/mock-board/pnle/checkout"
                  className="bg-pink-500 hover:bg-pink-400 text-white font-extrabold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
                >
                  Unlock all 5 modules — ₱{PNLE.price}
                </Link>
                <p className="text-gray-500 text-sm">
                  Already bought?{' '}
                  <Link href="/mock-board/login?next=/mock-board/pnle" className="text-pink-400 underline">
                    Sign in to start
                  </Link>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Modules */}
        <section className="px-4 pb-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-white font-bold text-lg mb-4 text-center">
              {entitled ? 'Pick a module to start' : 'What’s inside — 5 timed modules'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {modules.map((m) => (
                <div key={m.slug} className="bg-[#0f1629] border border-white/10 rounded-2xl p-5 flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-pink-400 font-extrabold">NP {m.roman}</span>
                    <span className="text-white font-bold">{m.short}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3 flex-1">{m.topics}</p>
                  <p className="text-gray-500 text-xs mb-3">100 items · 2-hour timer · full rationales</p>
                  {entitled ? (
                    <Link
                      href={`/mock-board/${m.slug}/exam`}
                      className="bg-pink-500 hover:bg-pink-400 text-white font-bold px-4 py-2.5 rounded-lg transition-colors text-center"
                    >
                      ▶ Start / Resume
                    </Link>
                  ) : (
                    <span className="text-gray-600 text-xs text-center border border-white/10 rounded-lg py-2.5">
                      🔒 Unlocks with purchase
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pass rule + features */}
        <section className="px-4 pb-16">
          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
            <div className="bg-[#0f1629] border border-pink-400/20 rounded-2xl p-5 sm:col-span-2">
              <p className="text-white font-bold mb-1">🎯 Scored like the real PNLE</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                To pass, you need a <strong className="text-white">75% general average</strong> across the five modules,
                with <strong className="text-white">no single module below 60%</strong>. After you finish all five, your
                combined dashboard shows your general average and flags any module under the 60% floor.
              </p>
            </div>
            {[
              { icon: '⏱️', t: '2 hours per module', d: 'A real 120-minute countdown per module, pinned on-screen, that auto-submits at zero — PRC exam pressure.' },
              { icon: '🔀', t: 'Shuffled every attempt', d: 'Questions and choices reshuffle each time, so you learn the concepts — not the position of the answer.' },
              { icon: '🧠', t: 'Rationales at the end', d: 'No feedback mid-exam (like the real thing). After you submit, review every item with a full rationale.' },
              { icon: '🔁', t: 'Unlimited retakes', d: `One purchase, take all five modules as many times as you want until ${PNLE.accessEnds}.` },
            ].map((f) => (
              <div key={f.t} className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
                <div className="text-2xl mb-2">{f.icon}</div>
                <p className="text-white font-bold mb-1">{f.t}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>

          {!entitled && (
            <div className="max-w-3xl mx-auto text-center mt-8">
              <Link
                href="/mock-board/pnle/checkout"
                className="inline-block bg-pink-500 hover:bg-pink-400 text-white font-extrabold px-8 py-4 rounded-xl text-lg transition-colors"
              >
                Unlock all 5 modules — ₱{PNLE.price} →
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
