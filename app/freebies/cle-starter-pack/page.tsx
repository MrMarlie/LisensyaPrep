import { buildMetadata } from '@/lib/seo';
import CLEFreebieCTA from '@/components/CLEFreebieCTA';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'Free CLE Criminology Starter Pack 2026 — 30 Questions Across All 6 Subjects | LisensyaPrep',
  description:
    'Download our free Criminologist Licensure Exam (CLE) reviewer. 30 questions covering all 6 PRC criminology subjects with full rationales. Built for the 2026 board exam.',
  path: '/freebies/cle-starter-pack',
});

const WHATS_INSIDE = [
  '30 CLE Questions across all 6 tested subjects',
  '5 questions per subject — Jurisprudence, Law Enforcement, Criminalistics, Corrections, Juvenile Delinquency, Sociology & Ethics',
  'Detailed rationales for every question (not just answer keys)',
  'Built for the 2026 PRC Board of Criminology coverage',
  'Mobile-optimized — study on your phone',
];

const SUBJECT_BREAKDOWN = [
  { emoji: '⚖️', subject: 'Criminal Jurisprudence & Procedure', topics: 'Revised Penal Code, criminal procedure, special penal laws' },
  { emoji: '👮', subject: 'Law Enforcement Administration', topics: 'RA 6975, RA 8551, PNP structure, NAPOLCOM, arrest & search' },
  { emoji: '🔬', subject: 'Criminalistics', topics: 'Dactyloscopy, forensic ballistics, questioned documents, CSI' },
  { emoji: '🏛️', subject: 'Correctional Administration', topics: 'Theories of penology, BuCor, BJMP, probation under PD 968' },
  { emoji: '🧒', subject: 'Juvenile Delinquency & Crime Prevention', topics: 'RA 9344, CICL, diversion, delinquency theories, prevention' },
  { emoji: '📖', subject: 'Criminal Sociology & Ethics', topics: 'Schools of criminology, theories of crime causation, RA 6506' },
];

const WHY_DIFFERENT = [
  'Every question has a full rationale — most free PDFs only have answer keys',
  'Covers all 6 subjects, not just the law-heavy ones',
  'Dactyloscopy and theory questions explained — the topics that trip up most takers',
  'Built for the 2026 coverage — not recycled questions from years ago',
];

const FAQ = [
  {
    q: 'Is this really free?',
    a: 'Yes, 100% free. No credit card, no payment, no catch. Just your email so we can send the PDF.',
  },
  {
    q: 'Will you spam me?',
    a: 'No — we send max 1 email per week, mostly CLE tips and study resources. Unsubscribe anytime with one click.',
  },
  {
    q: 'Can I share this PDF?',
    a: 'YES — please do! Help your fellow CLE takers. The more who pass, the better.',
  },
  {
    q: 'What score do I need to pass the CLE?',
    a: 'You need a general weighted average of at least 75%, with no individual subject falling below 60%. Failing even one subject below 60% means you do not pass — even if your average is above 75%.',
  },
  {
    q: 'When does the full CLE Mastery System launch?',
    a: 'It\'s currently in development. Sign up above to join the waitlist and get first access plus an early-bird discount at launch.',
  },
];

const RELATED = [
  { href: '/criminology/cle-coverage-2026', label: 'CLE Coverage 2026 — Complete Subject Breakdown' },
  { href: '/criminology/criminal-jurisprudence-procedure-reviewer', label: 'Criminal Jurisprudence and Procedure Reviewer' },
  { href: '/criminology/law-enforcement-administration-reviewer', label: 'Law Enforcement Administration Reviewer' },
  { href: '/criminology/criminalistics-dactyloscopy-reviewer', label: 'Criminalistics and Dactyloscopy Reviewer' },
  { href: '/criminology/cle-application-guide-2026', label: 'How to Apply for CLE via PRC LERIS 2026' },
];

export default function CLEStarterPackPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Hero */}
        <div className="text-center mb-8">
          <span className="inline-block bg-yellow-400/10 text-yellow-400 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            🎁 Free Download
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            CLE Criminology Starter Pack 2026
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            30 Questions Across All 6 Subjects
          </p>
          <p className="text-gray-500 text-sm">
            Built for the 2026 Criminologist Licensure Exam. 100% free — just enter your email below.
          </p>
        </div>

        {/* Top form */}
        <CLEFreebieCTA redirectOnSuccess />

        {/* Subject breakdown */}
        <section className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-4">What You&apos;ll Get</h2>
          <ul className="space-y-2.5 mb-5">
            {WHATS_INSIDE.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-gray-300 text-sm">
                <span className="text-yellow-400 font-bold flex-shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/10 pt-4">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Subject Breakdown</p>
            <div className="space-y-2">
              {SUBJECT_BREAKDOWN.map(({ emoji, subject, topics }) => (
                <div key={subject} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0">{emoji}</span>
                  <div>
                    <span className="text-white font-semibold">{subject}</span>
                    <span className="text-gray-500"> — {topics}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pass rate reality */}
        <section className="mt-6 bg-[#0f1629] border border-yellow-400/20 rounded-2xl p-6">
          <h2 className="text-yellow-400 font-extrabold text-lg mb-3">The Reality of the CLE</h2>
          <div className="space-y-2 text-sm text-gray-300">
            <p>📊 <strong className="text-white">Passing rate:</strong> Around <strong className="text-yellow-400">65%</strong> nationally — but it drops fast if you neglect any single subject</p>
            <p>📋 <strong className="text-white">To pass:</strong> <strong className="text-yellow-400">75%</strong> general average, with <strong className="text-yellow-400">no subject below 60%</strong></p>
            <p>📚 <strong className="text-white">Coverage:</strong> <strong className="text-yellow-400">6 subjects</strong> — law, science, theory, and corrections all in one exam</p>
            <p className="text-gray-500 text-xs mt-3">Most takers fail because they over-focus on the law subjects and neglect theory and criminalistics. This Starter Pack shows you what balanced preparation looks like.</p>
          </div>
        </section>

        {/* Why different */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-4">
            What Makes This Different from Free PDFs Online
          </h2>
          <ul className="space-y-2.5">
            {WHY_DIFFERENT.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-gray-300 text-sm">
                <span className="text-green-400 font-bold flex-shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Why giving away */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-3">Why We&apos;re Giving This Away Free</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            We believe quality Criminology board exam prep should be accessible to every aspiring Filipino
            criminologist. The full CLE Mastery System is in development — and waitlist members get an
            early-bird discount at launch. This Starter Pack is our way of saying salamat in advance.
          </p>
        </section>

        {/* Coming soon teaser */}
        <section className="mt-6 bg-gradient-to-br from-yellow-900/20 to-amber-900/10 border border-yellow-400/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-yellow-400/20 text-yellow-400 text-xs font-extrabold px-2 py-1 rounded-full uppercase tracking-wide">🚀 Coming Soon</span>
          </div>
          <h2 className="text-yellow-400 font-extrabold text-lg mb-3">
            CLE Mastery System — In Development
          </h2>
          <ul className="space-y-2 text-gray-300 text-sm mb-4">
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Hundreds of questions across all 6 CLE subjects</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Full-length Mock Exams with rationales</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Dactyloscopy &amp; criminology theory quick-reference sheets</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> 8-Week Study Schedule</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400 font-bold flex-shrink-0">✓</span> Early-bird discount for waitlist members</li>
          </ul>
          <p className="text-gray-500 text-xs">
            Sign up above to join the waitlist and get first access + early-bird discount.
          </p>
        </section>

        {/* Second form */}
        <div className="mt-6">
          <p className="text-center text-gray-400 text-sm mb-2">Ready? Enter your email and get the PDF instantly.</p>
          <CLEFreebieCTA redirectOnSuccess />
        </div>

        {/* FAQ */}
        <section className="mt-6">
          <h2 className="text-white font-extrabold text-lg mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-[#0f1629] border border-white/10 rounded-xl p-5">
                <p className="text-white font-semibold text-sm mb-2">{q}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related articles */}
        <section className="mt-8 border-t border-white/10 pt-8">
          <h2 className="text-white font-bold text-base mb-4">Study While You Wait</h2>
          <ul className="space-y-2">
            {RELATED.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 text-sm transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Facebook */}
        <section className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Join our community on{' '}
            <a
              href="https://www.facebook.com/LisensyaPrep"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Facebook
            </a>{' '}
            for daily CLE tips and updates.
          </p>
        </section>

      </div>
    </div>
  );
}
