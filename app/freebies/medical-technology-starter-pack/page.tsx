import { buildMetadata } from '@/lib/seo';
import MedTechFreebieCTA from '@/components/MedTechFreebieCTA';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'Free Medical Technology (MTLE) Starter Pack 2026 — 30 Questions Across All 6 Subjects',
  description:
    'Download our free Medical Technologist Licensure Exam (MTLE) reviewer. 30 questions covering all 6 core med tech subjects with full rationales. Built for the 2026 PRC board exam.',
  path: '/freebies/medical-technology-starter-pack',
});

const WHATS_INSIDE = [
  '30 MTLE Questions across all 6 core subjects',
  '5 questions per subject — Clinical Chemistry, Hematology, Microbiology & Parasitology, Immunology & Serology, Blood Banking, Urinalysis & Body Fluids',
  'Detailed rationales for every question (not just answer keys)',
  'Built for the 2026 PRC Board of Medical Technology coverage',
  'Mobile-optimized — study on your phone',
];

const SUBJECT_BREAKDOWN = [
  { emoji: '🧪', subject: 'Clinical Chemistry', topics: 'Carbohydrate, lipid, liver and renal function tests, electrolytes, acid-base balance' },
  { emoji: '🩸', subject: 'Hematology', topics: 'CBC, anemias, white cell disorders, coagulation, leukemia classification' },
  { emoji: '🦠', subject: 'Microbiology & Parasitology', topics: 'Bacteriology, mycology, virology, medical parasitology, susceptibility testing' },
  { emoji: '🧬', subject: 'Immunology & Serology', topics: 'Innate and adaptive immunity, antigen-antibody reactions, ELISA, autoimmune and STI serology' },
  { emoji: '🅰️', subject: 'Blood Banking', topics: 'ABO and Rh grouping, crossmatching, component therapy, HDN, transfusion reactions' },
  { emoji: '🔬', subject: 'Urinalysis & Body Fluids', topics: 'Physical/chemical urinalysis, microscopy, CSF, synovial, serous and other body fluids' },
];

const WHY_DIFFERENT = [
  'Every question has a full rationale — most free PDFs only have answer keys',
  'Covers all 6 subjects, not just clinical chemistry and hematology',
  'Blood banking and serology questions explained — the topics most reviewers gloss over',
  'Built for the 2026 coverage — not recycled questions from years ago',
];

const FAQ = [
  {
    q: 'Is this really free?',
    a: 'Yes, 100% free. No credit card, no payment, no catch. Just your email so we can send the PDF.',
  },
  {
    q: 'Will you spam me?',
    a: 'No — we send max 1 email per week, mostly MTLE tips and study resources. Unsubscribe anytime with one click.',
  },
  {
    q: 'Can I share this PDF?',
    a: 'YES — please do! Help your fellow MTLE takers. The more who pass, the better.',
  },
  {
    q: 'What score do I need to pass the MTLE?',
    a: 'You need a general weighted average of at least 75%, with no individual subject falling below 50%. The Medical Technology board covers six dense subjects, so balanced preparation across all of them is the safest strategy.',
  },
];

const RELATED = [
  { href: '/medical-technology/mtle-coverage-2026', label: 'MTLE Coverage 2026 — Complete Subject Breakdown' },
  { href: '/medical-technology/how-to-pass-mtle-board-exam', label: 'How to Pass the MTLE Board Exam' },
  { href: '/medical-technology/hematology-reviewer', label: 'Hematology Reviewer for the MTLE' },
  { href: '/medical-technology/blood-banking-serology-reviewer', label: 'Blood Banking & Serology Reviewer for the MTLE' },
  { href: '/medical-technology/what-is-the-mtle', label: 'What is the MTLE? Complete Guide' },
];

export default function MedTechStarterPackPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Hero */}
        <div className="text-center mb-8">
          <span className="inline-block bg-cyan-400/10 text-cyan-400 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            🎁 Free Download
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            Medical Technology (MTLE) Starter Pack 2026
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            30 Questions Across All 6 Subjects
          </p>
          <p className="text-gray-500 text-sm">
            Built for the 2026 Medical Technologist Licensure Examination. 100% free — just enter your email below.
          </p>
        </div>

        {/* Top form */}
        <MedTechFreebieCTA redirectOnSuccess />

        {/* Subject breakdown */}
        <section className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-4">What You&apos;ll Get</h2>
          <ul className="space-y-2.5 mb-5">
            {WHATS_INSIDE.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-gray-300 text-sm">
                <span className="text-cyan-400 font-bold flex-shrink-0 mt-0.5">✓</span>
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
        <section className="mt-6 bg-[#0f1629] border border-cyan-400/20 rounded-2xl p-6">
          <h2 className="text-cyan-400 font-extrabold text-lg mb-3">The Reality of the MTLE</h2>
          <div className="space-y-2 text-sm text-gray-300">
            <p>📋 <strong className="text-white">To pass:</strong> <strong className="text-cyan-400">75%</strong> general weighted average, with <strong className="text-cyan-400">no subject below 50%</strong></p>
            <p>📚 <strong className="text-white">Coverage:</strong> <strong className="text-cyan-400">6 core subjects</strong> — clinical chemistry, hematology, microbiology, immunology/serology, blood banking, and urinalysis</p>
            <p>🗓️ <strong className="text-white">Schedule:</strong> Offered <strong className="text-cyan-400">twice a year</strong> (usually March/April and August/September) by the PRC</p>
            <p className="text-gray-500 text-xs mt-3">Six dense subjects mean most takers run out of time on the topics they left for last. This Starter Pack shows you what balanced preparation looks like.</p>
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
                <span className="text-cyan-400 font-bold flex-shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Why giving away */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-3">Why We&apos;re Giving This Away Free</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            We believe quality Medical Technology board exam prep should be accessible to every aspiring Filipino
            medical technologist. If this Starter Pack helps you, there&apos;s plenty more free practice waiting on
            LisensyaPrep — 300+ questions across all 6 subjects. This Starter Pack is our way of saying
            salamat in advance.
          </p>
        </section>

        {/* Keep practicing free */}
        <section className="mt-6 bg-gradient-to-br from-cyan-900/20 to-sky-900/10 border border-cyan-400/20 rounded-2xl p-6">
          <h2 className="text-cyan-400 font-extrabold text-lg mb-3">
            Keep Practicing — Free
          </h2>
          <ul className="space-y-2 text-gray-300 text-sm mb-4">
            <li className="flex items-start gap-2"><span className="text-cyan-400 font-bold flex-shrink-0">✓</span> 300+ questions across all 6 MTLE subjects</li>
            <li className="flex items-start gap-2"><span className="text-cyan-400 font-bold flex-shrink-0">✓</span> Full rationales on every question</li>
            <li className="flex items-start gap-2"><span className="text-cyan-400 font-bold flex-shrink-0">✓</span> Track your progress module by module</li>
            <li className="flex items-start gap-2"><span className="text-cyan-400 font-bold flex-shrink-0">✓</span> No account required — start instantly</li>
          </ul>
          <Link
            href="/medical-technology"
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Start practicing free →
          </Link>
        </section>

        {/* Second form */}
        <div className="mt-6">
          <p className="text-center text-gray-400 text-sm mb-2">Ready? Enter your email and get the PDF instantly.</p>
          <MedTechFreebieCTA redirectOnSuccess />
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
                  className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 text-sm transition-colors"
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
            for daily MTLE tips and updates.
          </p>
        </section>

      </div>
    </div>
  );
}
