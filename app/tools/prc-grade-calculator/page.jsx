import Link from 'next/link';
import Script from 'next/script';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import GradeCalculator from '@/components/tools/GradeCalculator';

const NAVY = '#0A1929';
const GOLD = '#D4AF37';

export const metadata = buildMetadata({
  title: 'PRC Board Exam Grade Calculator 2026 – Compute Your GWA (All Professions)',
  description:
    'Free PRC board exam grade calculator for LET, PNLE, CLE, PhLE, MTLE, ALE, and CSE. Compute your weighted GWA, check the 75 passing average and per-subject floor rules, and see if you passed.',
  path: '/tools/prc-grade-calculator',
});

const FAQS = [
  {
    q: 'What is the passing score for PRC board exams?',
    a: 'Most PRC licensure exams require a general weighted average (GWA) of at least 75, with no single subject falling below a floor — usually 50, but 60 for the PNLE. The Civil Service Exam (CSE) is different: it uses a flat passing rating of 80 with no per-subject floor.',
  },
  {
    q: 'Can you fail a board exam even with a passing average?',
    a: 'Yes. This is the most common surprise. Even if your GWA is 75 or higher, scoring below the subject floor (for example, below 50, or below 60 in the PNLE) in any single subject is an automatic fail. A strong average cannot rescue one very low subject.',
  },
  {
    q: 'Is this PRC grade calculator official?',
    a: 'No. This is a study aid that estimates your GWA from the scores you enter. For several exams the exact subject weightings are not published, so equal weights are used and the GWA is an estimate. Only the official ratings released by the PRC are authoritative. The passing rules (75 average and the subject floor) are exact.',
  },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const REVIEWER_LINKS = [
  { text: 'LET (Teachers) Reviewer', href: '/education' },
  { text: 'PNLE (Nursing) Reviewer', href: '/nursing' },
  { text: 'CLE (Criminology) Reviewer', href: '/criminology' },
  { text: 'PhLE (Pharmacy) Reviewer', href: '/pharmacy' },
  { text: 'MTLE (Medical Technology) Reviewer', href: '/medical-technology' },
  { text: 'ALE (Agriculture) Reviewer', href: '/agriculture' },
  { text: 'CSE (Civil Service) Reviewer', href: '/civil-service' },
];

const GUIDE_LINKS = [
  { text: 'PRC Passing Score Explained', href: '/blog/prc-passing-score-explained' },
  { text: 'Board Exam Retake Limits', href: '/blog/board-exam-retake-limits' },
  { text: 'Board Exam Study Tips', href: '/blog/board-exam-study-tips' },
];

export default function PrcGradeCalculatorPage() {
  return (
    <div className="min-h-screen py-8 sm:py-10">
      <Script
        id="faq-schema-grade-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <BreadcrumbSchema
        items={[
          { url: '/', name: 'Home' },
          { url: '/tools/prc-grade-calculator', name: 'PRC Grade Calculator' },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb nav */}
        <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
          <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
          <span className="text-gray-700">/</span>
          <span className="text-gray-400 truncate">PRC Grade Calculator</span>
        </nav>

        <header className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            PRC Board Exam Grade Calculator 2026
          </h1>
          <p className="text-gray-400 mt-3 leading-relaxed">
            Compute your general weighted average (GWA) for the LET, PNLE, CLE, PhLE, MTLE,
            ALE, and CSE. Enter your subject scores to see your GWA and whether you pass the
            75 average and per-subject floor rules — instantly, on any phone.
          </p>
        </header>

        {/* Calculator */}
        <GradeCalculator />

        {/* Content section (~300 words) */}
        <section className="mt-10 prose-content">
          <h2 className="text-2xl font-extrabold text-white mb-4">
            How PRC Board Exam Grades Work
          </h2>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              Almost every Professional Regulation Commission (PRC) licensure exam is scored
              on the same two-part system, and you must satisfy <strong className="text-white">both</strong>{' '}
              parts to pass.
            </p>
            <p>
              <strong className="text-white" style={{ color: GOLD }}>Part one is the general weighted average (GWA).</strong>{' '}
              Each subject is rated out of 100, then combined according to its weight to
              produce a single average. For most boards you need a GWA of at least{' '}
              <strong className="text-white">75</strong> to pass. Some exams weight certain
              subjects more heavily than others; where the official weightings are not
              published, this calculator uses equal weights and clearly labels the result as
              an estimate.
            </p>
            <p>
              <strong className="text-white" style={{ color: GOLD }}>Part two is the per-subject floor.</strong>{' '}
              Even with a passing average, a single very low subject score can fail you. For
              most exams no subject may fall below <strong className="text-white">50</strong>.
              The Philippine Nurse Licensure Examination (PNLE) is stricter — no Nursing
              Practice area may fall below <strong className="text-white">60</strong>. This is
              why a student with an 80 average can still fail: one subject in the 40s pulls
              them under the floor. The rule exists so that no professional is licensed while
              being seriously weak in a core competency.
            </p>
            <p>
              The <strong className="text-white">Civil Service Exam (CSE)</strong> works
              differently. It is rated as a single overall score, and you pass with a flat{' '}
              <strong className="text-white">80.00</strong> — there are no per-subject floors.
            </p>
            <p>
              Use this calculator to model different score scenarios before results day, but
              remember: only the official ratings released by the PRC are authoritative. This
              tool is a study aid, not an official record.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <div
                key={f.q}
                className="rounded-xl border border-white/10 p-4"
                style={{ background: NAVY }}
              >
                <h3 className="text-white font-bold text-sm mb-2">{f.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 p-5" style={{ background: NAVY }}>
            <h2 className="text-white font-bold mb-4">Reviewers by Profession</h2>
            <ul className="space-y-2">
              {REVIEWER_LINKS.map(({ text, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm underline underline-offset-2 transition-colors"
                    style={{ color: GOLD }}
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 p-5" style={{ background: NAVY }}>
            <h2 className="text-white font-bold mb-4">Related Guides</h2>
            <ul className="space-y-2">
              {GUIDE_LINKS.map(({ text, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm underline underline-offset-2 transition-colors"
                    style={{ color: GOLD }}
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
