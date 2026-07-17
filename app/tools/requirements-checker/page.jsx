import Link from 'next/link';
import Script from 'next/script';
import { buildMetadata } from '@/lib/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import RequirementsChecker from '@/components/tools/RequirementsChecker';

const NAVY = '#0A1929';
const GOLD = '#D4AF37';

export const metadata = buildMetadata({
  title:
    'PRC Board Exam Requirements Checklist 2026 – Interactive Checker (All Professions)',
  description:
    'Interactive board exam requirements checklist for 2026. Check off LET requirements, PNLE requirements, and civil service exam requirements — tick each document, watch your progress fill, and print your list. Free, no login.',
  path: '/tools/requirements-checker',
});

const FAQS = [
  {
    q: 'What are the requirements for the board exam?',
    a: 'For a PRC licensure exam you generally need a LERIS account at online.prc.gov.ph, a PSA Birth Certificate, your Transcript of Records with the scanned picture and Special Order or Board Resolution notation as applicable, a valid government ID, ID photos in the current PRC specification, the application fee (the amount is shown in LERIS at the payment step and varies by exam), and an appointment slot with a printed Notice of Admission once your application is approved. The exact list is set by each cycle’s official announcement, so always confirm the current requirements in LERIS before your appointment. This checker lets you tick each item off and print the list.',
  },
  {
    q: 'Do retakers need different documents?',
    a: 'Retakers usually submit the same core documents as first-timers, plus proof of a prior rating or a verification of rating. Some professions also require a refresher program after three failed attempts before you can re-apply. Because retake rules differ by profession and change between cycles, treat the retaker items as a prompt to verify your own exam’s current rules rather than a fixed list — the checker note-hedges these items for exactly that reason.',
  },
  {
    q: 'Where do I apply for the board exam?',
    a: 'PRC licensure exams are applied for online through LERIS at online.prc.gov.ph — you fill out the form, upload your documents, pay, and book an appointment. The Civil Service Examination is different: you apply in person at the CSC Regional or Field Office that serves your place of residence, following the current CSC examination announcement, and slots there fill quickly.',
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

const GUIDE_LINKS = [
  { text: 'LERIS PRC Online Application Guide', href: '/blog/leris-prc-online-guide' },
  { text: 'PRC Board Exam Schedule 2026', href: '/blog/prc-board-exam-schedule' },
  { text: 'Civil Service Exam Schedule', href: '/civil-service/civil-service-exam-schedule' },
];

const TOOL_LINKS = [
  { text: 'Board Exam Study Planner', href: '/tools/study-planner' },
  { text: 'PRC Grade Calculator', href: '/tools/prc-grade-calculator' },
];

export default function RequirementsCheckerPage() {
  return (
    <div className="min-h-screen py-8 sm:py-10">
      <Script
        id="faq-schema-requirements-checker"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <BreadcrumbSchema
        items={[
          { url: '/', name: 'Home' },
          { url: '/tools/requirements-checker', name: 'Requirements Checker' },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb nav */}
        <nav className="flex items-center gap-2 text-sm mb-6 print:hidden" aria-label="Breadcrumb">
          <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">
            Home
          </Link>
          <span className="text-gray-700">/</span>
          <span className="text-gray-400 truncate">Requirements Checker</span>
        </nav>

        <header className="mb-6 print:hidden">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Board Exam Requirements Checker 2026
          </h1>
          <p className="text-gray-400 mt-3 leading-relaxed">
            Pick your exam — LET, PNLE, CLE, PhLE, MTLE, ALE, or the Civil Service Exam — and get an
            interactive checklist of everything you need to apply. Tick off each document, watch your
            progress bar fill, and print the list. Free, no login, and it saves on your device.
          </p>
        </header>

        {/* Tool */}
        <RequirementsChecker />

        {/* Content section (~250 words) — application timeline */}
        <section className="mt-10 print:hidden">
          <h2 className="text-2xl font-extrabold text-white mb-4">
            Start early: the application timeline no one warns you about
          </h2>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              The single biggest reason capable examinees miss a cycle is not the exam — it is the
              paperwork. The requirements themselves are short, but two of them run on other people’s
              clocks, and both can quietly eat weeks.
            </p>
            <p>
              The first is your{' '}
              <strong className="text-white" style={{ color: GOLD }}>
                Transcript of Records
              </strong>
              . Registrars are the classic bottleneck: a TOR with the scanned picture and the correct
              Special Order or Board Resolution notation can take days to weeks to release, especially
              near graduation season when everyone is requesting at once. Ask for it the moment you
              decide to sit the exam — long before you open LERIS. Your{' '}
              <strong className="text-white" style={{ color: GOLD }}>
                PSA Birth Certificate
              </strong>{' '}
              is the second outside dependency; order the PSA copy early so a delayed delivery never
              becomes the thing that stops you.
            </p>
            <p>
              The second squeeze is{' '}
              <strong className="text-white" style={{ color: GOLD }}>
                appointment slots
              </strong>
              . PRC releases slots per region, and popular exams fill fast — the earlier your documents
              are ready, the earlier you can lock a convenient date and location instead of taking
              whatever is left. Civil Service applicants feel this even more sharply: CSC slots at the
              Regional and Field Offices cap quickly, so being ready on announcement day is the whole
              game.
            </p>
            <p>
              Treat this checker as your prep list, then confirm the final requirements in LERIS or the
              CSC announcement before you pay — official lists are the only ones that count.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10 print:hidden">
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
        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 print:hidden">
          <div className="rounded-2xl border border-white/10 p-5" style={{ background: NAVY }}>
            <h2 className="text-white font-bold mb-4">Application Guides</h2>
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
          <div className="rounded-2xl border border-white/10 p-5" style={{ background: NAVY }}>
            <h2 className="text-white font-bold mb-4">Related Tools</h2>
            <ul className="space-y-2">
              {TOOL_LINKS.map(({ text, href }) => (
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
