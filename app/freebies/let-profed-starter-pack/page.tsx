import { buildMetadata } from '@/lib/seo';
import FreebieCTA from '@/components/FreebieCTA';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'Free LET ProfEd Starter Pack 2026 — 30 Questions with Rationales',
  description:
    'Download our free LET Professional Education reviewer. 30 questions, full rationales, study schedule included. Built for the 2026 Enhanced TOS.',
  path: '/freebies/let-profed-starter-pack',
});

const WHATS_INSIDE = [
  '30 LET ProfEd Questions covering Foundations of Education',
  'Detailed rationales (1–2 paragraphs each explaining WHY)',
  'Memory hooks (with Tagalog) for retention',
  '8-Week Study Schedule',
  'PRC Exam Day Checklist',
  'Test-Taking Strategies',
];

const WHY_DIFFERENT = [
  'Every question has a full rationale — most free PDFs only have answer keys',
  'Built for the 2026 Enhanced TOS — most free PDFs are 2018–2020',
  'Mobile-optimized layout',
  'Mga memory hook na Tagalog para mas tumatak',
];

const COMING_NEXT = [
  '430+ questions across ALL 6 LET ProfEd content areas',
  'Full 50-item Mock Exam with rationales',
  'Quick Reference Cheat Sheets',
  'Launch price: ₱249 (waitlist members save ₱50)',
];

const FAQ = [
  {
    q: 'Is this really free?',
    a: 'Yes, 100% free. No credit card, no payment, no catch. Just your email so we can send the PDF.',
  },
  {
    q: 'Will you spam me?',
    a: 'No — we send max 1 email per week, mostly LET tips and study resources. Unsubscribe anytime with one click.',
  },
  {
    q: 'When does the full Mastery System launch?',
    a: 'Coming soon. Waitlist members get first access and an early-bird discount (₱50 off).',
  },
  {
    q: 'Can I share this PDF?',
    a: 'YES — please do! Help your fellow LET takers. The more who pass, the better.',
  },
];

const RELATED = [
  { href: '/education/professional-education-reviewer', label: 'Professional Education Reviewer for LET 2026' },
  { href: '/education/how-to-pass-let-first-take', label: 'How to Pass the LET on Your First Take' },
  { href: '/education/let-coverage-2026', label: 'LET Coverage 2026 — Complete Subject Breakdown' },
];

export default function FreebiesStarterPackPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Hero */}
        <div className="text-center mb-8">
          <span className="inline-block bg-yellow-400/10 text-yellow-400 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            🎁 Free Download
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            LET ProfEd Starter Pack 2026
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            30 Premium Questions with Full Rationales
          </p>
          <p className="text-gray-500 text-sm">
            Built for the 2026 Enhanced TOS. 100% free — just enter your email below.
          </p>
        </div>

        {/* Top form */}
        <FreebieCTA redirectOnSuccess />

        {/* What you'll get */}
        <section className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-4">What You&apos;ll Get</h2>
          <ul className="space-y-2.5">
            {WHATS_INSIDE.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-gray-300 text-sm">
                <span className="text-yellow-400 font-bold flex-shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Why giving this away */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-3">Why We&apos;re Giving This Away Free</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            We believe quality LET prep should be accessible to every aspiring Filipino teacher. The full
            Mastery System (430+ questions) will launch soon — and waitlist members get an early-bird
            discount. This Starter Pack is our way of saying salamat in advance.
          </p>
        </section>

        {/* What makes it different */}
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

        {/* Coming next */}
        <section className="mt-6 bg-gradient-to-br from-yellow-900/20 to-amber-900/10 border border-yellow-400/20 rounded-2xl p-6">
          <h2 className="text-yellow-400 font-extrabold text-lg mb-4">
            What&apos;s Coming Next — The Full Mastery System
          </h2>
          <ul className="space-y-2.5">
            {COMING_NEXT.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-gray-300 text-sm">
                <span className="text-yellow-400 font-bold flex-shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-500 text-xs mt-4">
            Sign up above to join the waitlist and get first access.
          </p>
        </section>

        {/* Second form */}
        <div className="mt-6">
          <p className="text-center text-gray-400 text-sm mb-2">Ready? Enter your email and get the PDF instantly.</p>
          <FreebieCTA redirectOnSuccess />
        </div>

        {/* Trust */}
        <section className="mt-6 bg-[#0f1629] border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-gray-300 text-sm italic mb-3">
            &quot;Built by educators who know the LET. Tested by LET takers like you.&quot;
          </p>
          <p className="text-gray-600 text-xs">
            Testimonials coming soon — be one of the first and let us know how it helped you pass!
          </p>
        </section>

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
            for daily LET tips and updates.
          </p>
        </section>

      </div>
    </div>
  );
}
