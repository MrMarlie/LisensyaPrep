import Link from 'next/link';
import Script from 'next/script';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import StudyPlanner from '@/components/tools/StudyPlanner';

const NAVY = '#0A1929';
const GOLD = '#D4AF37';

export const metadata = buildMetadata({
  title:
    'Free Board Exam Study Planner 2026 – Build Your Review Schedule (All PRC Exams)',
  description:
    'Free board exam study planner for LET, PNLE, CLE, and Civil Service review. Enter your exam date and hours to build a phased review schedule that weights your weak subjects. Print or save as PDF.',
  path: '/tools/study-planner',
});

const FAQS = [
  {
    q: 'How many hours a day should I review for a board exam?',
    a: 'There is no single magic number — consistency beats marathon days. Two to four focused hours on weekdays and four to six on weekends is a sustainable range for most working reviewers. What matters more than raw hours is that each session ends with active recall (self-quizzing) rather than passive re-reading, and that your weak subjects get roughly twice the time of your strong ones. This planner turns your available hours into a weekly split for you.',
  },
  {
    q: 'When should I start reviewing for the board exam?',
    a: 'Three to four months out is comfortable for a full four-phase plan: a Foundation stretch to rebuild content, then Drilling, Simulation, and a final Taper. Starting earlier mostly buys you a longer Foundation and more mock sets, not a different structure. If you have less time, the planner automatically compresses the schedule and tells you honestly what it dropped.',
  },
  {
    q: 'Is one month enough to review for a board exam?',
    a: 'It can be, if the material is not brand new to you and you protect the time. With under 30 days the planner skips the long Foundation build and moves straight into Drilling, Simulation, and Taper — heavy practice questions, timed mocks, and a light, sleep-protected final week. It is tight and depends on your starting point, but a focused month of retrieval practice and mock exams is far better than a scattered three months.',
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
  { text: 'Board Exam Study Tips', href: '/blog/board-exam-study-tips' },
  { text: 'PRC Passing Score Explained', href: '/blog/prc-passing-score-explained' },
  { text: 'PRC Grade Calculator', href: '/tools/prc-grade-calculator' },
];

export default function StudyPlannerPage() {
  return (
    <div className="min-h-screen py-8 sm:py-10">
      <Script
        id="faq-schema-study-planner"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <BreadcrumbSchema
        items={[
          { url: '/', name: 'Home' },
          { url: '/tools/study-planner', name: 'Study Planner' },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb nav */}
        <nav className="flex items-center gap-2 text-sm mb-6 print:hidden" aria-label="Breadcrumb">
          <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
          <span className="text-gray-700">/</span>
          <span className="text-gray-400 truncate">Study Planner</span>
        </nav>

        <header className="mb-6 print:hidden">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Free Board Exam Study Planner 2026
          </h1>
          <p className="text-gray-400 mt-3 leading-relaxed">
            Build a phased review schedule for the LET, PNLE, CLE, PhLE, MTLE, ALE, or
            Civil Service Exam. Enter your exam date and the hours you can study, rate your
            confidence per subject, and get a week-by-week plan that spends the most time on
            your weak areas — free, no login, and printable.
          </p>
        </header>

        {/* Tool */}
        <StudyPlanner />

        {/* Content section (~250 words) */}
        <section className="mt-10 print:hidden">
          <h2 className="text-2xl font-extrabold text-white mb-4">How the study phases work</h2>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              A good review is not one long, flat grind — it moves through stages, each with a
              different job. This planner splits the days between now and your exam into up to
              four phases.
            </p>
            <p>
              <strong className="text-white" style={{ color: GOLD }}>Foundation</strong> (about
              40% of your time) rebuilds content across every subject. The trick is to read a
              topic once and then immediately quiz yourself on it — retrieval practice locks in
              far more than re-reading the same page twice.{' '}
              <strong className="text-white" style={{ color: GOLD }}>Drilling</strong> (30%) shifts
              to heavy practice questions, weighted toward your weak subjects at roughly twice the
              hours of your strong ones. Spacing those weak areas across the week, and mixing
              subjects together, forces your brain to choose the right method — exactly what the
              real exam demands.
            </p>
            <p>
              <strong className="text-white" style={{ color: GOLD }}>Simulation</strong> (20%) is
              full-length, timed mock sets under exam conditions, so pacing and stamina feel
              familiar on the day.{' '}
              <strong className="text-white" style={{ color: GOLD }}>Taper</strong> (the final 10%)
              pulls back to light review and logistics — confirm your Notice of Admission, scout
              your room assignment, and above all protect your sleep, because that is when the
              brain consolidates everything you drilled.
            </p>
            <p>
              If fewer than 30 days remain, the planner drops the long Foundation phase and tells
              you it did — an honest compressed plan beats a comforting one that runs out of time.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10 print:hidden">
          <h2 className="text-2xl font-extrabold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-xl border border-white/10 p-4" style={{ background: NAVY }}>
                <h3 className="text-white font-bold text-sm mb-2">{f.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 print:hidden">
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
            <h2 className="text-white font-bold mb-4">Related Guides &amp; Tools</h2>
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
