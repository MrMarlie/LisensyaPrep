import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { examBySlug as metaBySlug, PRICE, ACCESS_ENDS, DURATION_LABEL } from '@/lib/mockExamMeta';
import { getExamUser, checkAccess } from '@/lib/mockExam';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const exam = metaBySlug(params.slug);
  if (!exam) return { title: 'Mock Board Exam | LisensyaPrep' };
  return {
    title: `${exam.title} 2026 — Timed 150-Item Simulation | LisensyaPrep`,
    description: `${exam.blurb} 180-minute timer, shuffled every attempt, full rationales, unlimited retakes. ₱${PRICE} via GCash.`,
    openGraph: {
      title: `${exam.title} 2026 — Timed Online Mock | LisensyaPrep`,
      description: exam.blurb,
      url: `https://lisensyaprep.com/mock-board/${exam.slug}`,
    },
  };
}

const ACCESS_MSG: Record<string, string> = {
  expired: `Your access has ended — the Mock Board campaign closed on ${ACCESS_ENDS}.`,
  'no-access': 'That account doesn’t have access to this Mock Board yet.',
  revoked: 'Access for this account has been revoked. Contact us if this is a mistake.',
  'no-user': 'Please sign in to start your exam.',
};

export default async function MockLandingPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { access?: string };
}) {
  const exam = metaBySlug(params.slug);
  if (!exam) notFound();

  const user = await getExamUser();
  const access = user ? await checkAccess(user.email, exam.product) : { ok: false, reason: 'no-user' };
  const entitled = access.ok;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${exam.title} 2026`,
    description: exam.blurb,
    brand: { '@type': 'Brand', name: 'LisensyaPrep' },
    offers: {
      '@type': 'Offer',
      price: String(PRICE),
      priceCurrency: 'PHP',
      availability: 'https://schema.org/InStock',
      url: `https://lisensyaprep.com/mock-board/${exam.slug}/checkout`,
    },
  };

  return (
    <>
      <Script id="mock-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen">
        <section className="px-4 pt-14 pb-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 uppercase tracking-widest mb-5">
              Timed Online Mock Board · ₱{PRICE}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">{exam.title}</h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">{exam.blurb}</p>

            {searchParams.access && ACCESS_MSG[searchParams.access] && (
              <div className="max-w-md mx-auto mb-6 bg-red-500/10 border border-red-400/30 rounded-xl p-3">
                <p className="text-red-300 text-sm">{ACCESS_MSG[searchParams.access]}</p>
              </div>
            )}

            {entitled ? (
              <div className="flex flex-col items-center gap-3">
                <Link
                  href={`/mock-board/${exam.slug}/exam`}
                  className="bg-green-500 hover:bg-green-400 text-gray-900 font-extrabold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
                >
                  ▶ Start / Resume Exam
                </Link>
                <p className="text-gray-500 text-sm">You have access until {ACCESS_ENDS}. Unlimited retakes.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Link
                  href={`/mock-board/${exam.slug}/checkout`}
                  className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
                >
                  Get Access — ₱{PRICE}
                </Link>
                <p className="text-gray-500 text-sm">
                  Already bought?{' '}
                  <Link href={`/mock-board/login?next=/mock-board/${exam.slug}/exam`} className="text-yellow-400 underline">
                    Sign in to start
                  </Link>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Feature grid */}
        <section className="px-4 pb-12">
          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
            {[
              { icon: '⏱️', t: `${DURATION_LABEL} timer`, d: 'A real 180-minute countdown, pinned on-screen, that auto-submits at zero — just like PRC exam pressure.' },
              { icon: '🔀', t: 'Shuffled every attempt', d: 'Questions and choices reshuffle each time, so you learn the concepts — not the position of the answer.' },
              { icon: '📝', t: '150 items, full length', d: exam.blurb },
              { icon: '🧠', t: 'Rationales at the end', d: 'No feedback mid-exam (like the real thing). After you submit, review every item with a full rationale.' },
              { icon: '📊', t: 'Score & per-subject breakdown', d: 'See your % against the 75% passing line and which subjects need work.' },
              { icon: '🔁', t: 'Unlimited retakes', d: `One purchase, take it as many times as you want until ${ACCESS_ENDS}.` },
            ].map((f) => (
              <div key={f.t} className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
                <div className="text-2xl mb-2">{f.icon}</div>
                <p className="text-white font-bold mb-1">{f.t}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Coverage */}
        <section className="px-4 pb-16">
          <div className="max-w-3xl mx-auto bg-[#0f1629] border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4">What&apos;s covered</h2>
            <div className="flex flex-wrap gap-2">
              {exam.subjects.map((s) => (
                <span key={s} className="text-sm text-gray-300 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">{s}</span>
              ))}
            </div>
            {!entitled && (
              <Link
                href={`/mock-board/${exam.slug}/checkout`}
                className="inline-block mt-6 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-6 py-3 rounded-xl transition-colors"
              >
                Get Access — ₱{PRICE} →
              </Link>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
