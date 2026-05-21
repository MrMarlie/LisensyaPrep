import { buildMetadata } from '@/lib/seo';
import PNLEFreebieCTA from '@/components/PNLEFreebieCTA';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'PNLE Mastery System 2026 — Coming Soon | LisensyaPrep',
  description:
    '300+ PNLE questions with full rationales across all NLE subjects. Coming soon. Get notified and receive the free Starter Pack now.',
  path: '/premium/pnle-mastery',
});

const COVERAGE = [
  {
    emoji: '🏘️',
    subject: 'Community Health Nursing',
    count: '~60 questions',
    topics: ['DOH programs and services', 'EPI vaccines and schedule', 'Epidemiology and vital statistics', 'Family planning methods', 'Nursing bag technique'],
  },
  {
    emoji: '🩺',
    subject: 'Medical-Surgical Nursing',
    count: '~80 questions',
    topics: ['Cardiovascular and respiratory disorders', 'Neurological and musculoskeletal', 'GI, hepatic, and renal nursing', 'Pharmacology and drug calculations', 'Pre/Post-op nursing care'],
  },
  {
    emoji: '🤱',
    subject: 'Maternal & Child Nursing',
    count: '~60 questions',
    topics: ['Stages of labor and delivery', 'APGAR scoring and newborn care', 'High-risk pregnancies', 'Postpartum complications', 'Pediatric milestones and illnesses'],
  },
  {
    emoji: '🧠',
    subject: 'Psychiatric Nursing',
    count: '~50 questions',
    topics: ['Therapeutic communication techniques', 'Psychiatric disorders (DSM-based)', 'Psychopharmacology', 'Crisis intervention', 'Milieu therapy'],
  },
  {
    emoji: '📋',
    subject: 'Fundamentals of Nursing',
    count: '~30 questions',
    topics: ['Basic nursing skills and procedures', 'Vital signs and physical assessment', 'Infection control and asepsis', 'Documentation and legal-ethical issues'],
  },
  {
    emoji: '👶',
    subject: 'Nursing Jurisprudence & Ethics',
    count: '~20 questions',
    topics: ['RA 9173 (Philippine Nursing Act)', 'BON resolutions and code of ethics', 'Legal aspects of nursing practice'],
  },
];

export default function PNLEMasteryPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Coming soon badge */}
        <div className="text-center mb-8">
          <span className="inline-block bg-pink-400/10 text-pink-400 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            🚀 Coming Soon
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            PNLE Mastery System
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            300+ Questions Across All 6 NLE Subjects
          </p>
          <p className="text-gray-500 text-sm">
            We&apos;re building this now. Get the free Starter Pack below while you wait.
          </p>
        </div>

        {/* Free starter pack CTA */}
        <div className="bg-gradient-to-br from-pink-900/20 to-rose-900/10 border border-pink-400/30 rounded-2xl p-6 mb-8">
          <p className="text-pink-400 font-extrabold text-base mb-2">🎁 Free While You Wait</p>
          <p className="text-gray-300 text-sm mb-4">
            Get the PNLE Nursing Starter Pack now — 30 NLE questions with full rationales, absolutely free.
            Enter your email below and we&apos;ll also notify you when the full Mastery System launches.
          </p>
          <PNLEFreebieCTA />
        </div>

        {/* What's coming */}
        <section className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-extrabold text-lg mb-4">What&apos;s Coming in the Mastery System</h2>
          <ul className="space-y-2 text-gray-300 text-sm mb-4">
            <li className="flex items-start gap-2"><span className="text-pink-400 font-bold flex-shrink-0">✓</span> 300+ PNLE questions across all 6 NLE subjects</li>
            <li className="flex items-start gap-2"><span className="text-pink-400 font-bold flex-shrink-0">✓</span> Full 100-item Mock Exam (Part 1 Community Health + Part 2 Clinical)</li>
            <li className="flex items-start gap-2"><span className="text-pink-400 font-bold flex-shrink-0">✓</span> 12-Week PNLE Study Schedule</li>
            <li className="flex items-start gap-2"><span className="text-pink-400 font-bold flex-shrink-0">✓</span> High-Yield Drug Cheat Sheet (Pharmacology)</li>
            <li className="flex items-start gap-2"><span className="text-pink-400 font-bold flex-shrink-0">✓</span> Community Health Nursing Quick Reference</li>
            <li className="flex items-start gap-2"><span className="text-pink-400 font-bold flex-shrink-0">✓</span> Full rationales for every question — no guessing required</li>
          </ul>
        </section>

        {/* Coverage breakdown */}
        <section className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-extrabold text-lg mb-4">Subject Coverage</h2>
          <div className="space-y-4">
            {COVERAGE.map(({ emoji, subject, count, topics }) => (
              <div key={subject} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-2 mb-2">
                  <span>{emoji}</span>
                  <span className="text-white font-semibold text-sm">{subject}</span>
                  <span className="text-pink-400 text-xs ml-auto">{count}</span>
                </div>
                <ul className="space-y-1">
                  {topics.map((t) => (
                    <li key={t} className="text-gray-500 text-xs flex items-start gap-1.5">
                      <span className="text-pink-400/50 mt-0.5">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Related links */}
        <section className="mt-6 border-t border-white/10 pt-6">
          <h2 className="text-white font-bold text-base mb-4">Study Now — Free Resources</h2>
          <ul className="space-y-2">
            {[
              { href: '/freebies/pnle-nursing-starter-pack', label: '🎁 PNLE Nursing Starter Pack — Free Download' },
              { href: '/nursing/pnle-coverage-2026', label: 'PNLE Coverage 2026 — Complete Topic Breakdown' },
              { href: '/nursing/pnle-3-month-study-plan', label: 'PNLE 3-Month Study Plan for Self-Reviewers' },
              { href: '/nursing', label: '🏥 Start Free NLE Practice Questions' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-pink-400 hover:text-pink-300 underline underline-offset-2 text-sm transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}
