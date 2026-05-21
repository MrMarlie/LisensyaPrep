import { buildMetadata } from '@/lib/seo';
import PNLEFreebieCTA from '@/components/PNLEFreebieCTA';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'Free PNLE Nursing Starter Pack 2026 — 30 NLE Questions with Full Rationales | LisensyaPrep',
  description:
    'Download our free PNLE Nursing reviewer. 30 board exam-style questions covering all major NLE subjects with full rationales. Built for the 2026 NLE syllabus.',
  path: '/freebies/pnle-nursing-starter-pack',
});

const WHATS_INSIDE = [
  '30 NLE board exam-style questions across all major nursing subjects',
  'Community Health, Medical-Surgical, Maternal & Child, and Psychiatric Nursing',
  'Detailed rationales for every question — not just answer keys',
  'Built for the 2026 PNLE syllabus and item distribution',
  'Mobile-optimized — study anywhere, anytime',
];

const SUBJECT_BREAKDOWN = [
  { emoji: '🏘️', subject: 'Community Health Nursing', topics: 'DOH programs, EPI vaccines, epidemiology, family planning, nursing bag technique' },
  { emoji: '🩺', subject: 'Medical-Surgical Nursing', topics: 'Cardiovascular, respiratory, GI, neuro, renal — the largest portion of the NLE' },
  { emoji: '🤱', subject: 'Maternal & Child Nursing', topics: 'Labor stages, APGAR, postpartum care, newborn care, child milestones' },
  { emoji: '🧠', subject: 'Psychiatric Nursing', topics: 'Therapeutic communication, disorders, psychopharmacology, crisis intervention' },
];

const WHY_DIFFERENT = [
  'Every question has a full rationale — most free materials only have answer keys',
  'Medical-Surgical questions explained step by step — the most tested NLE area',
  'Community Health Nursing included — the most underestimated part of the PNLE',
  'Built for the 2026 syllabus — not recycled questions from old BON TOS versions',
];

const FAQ = [
  {
    q: 'Is this really free?',
    a: 'Yes, 100% free. No credit card, no payment, no catch. Just your email so we can send the PDF.',
  },
  {
    q: 'Will you spam me?',
    a: 'No — we send max 1 email per week, mostly PNLE tips and study resources. Unsubscribe anytime with one click.',
  },
  {
    q: 'Can I share this PDF?',
    a: 'YES — please do! Help your fellow nursing board takers. The more who pass, the better.',
  },
  {
    q: 'What is the PNLE passing rate?',
    a: 'Around 44% for February 2026. Strategic preparation and focusing on high-yield subjects makes the difference.',
  },
  {
    q: 'What subjects are covered in the PNLE?',
    a: 'The NLE has 500 items: Part 1 (Community Health Nursing, 100 items) and Part 2 (Clinical Nursing, 400 items — Medical-Surgical, Maternal & Child, Psychiatric, and Fundamentals of Nursing).',
  },
];

const RELATED = [
  { href: '/nursing/pnle-coverage-2026', label: 'PNLE Coverage 2026 — Complete Topic Breakdown' },
  { href: '/nursing/pnle-3-month-study-plan', label: 'PNLE 3-Month Study Plan for Self-Reviewers' },
  { href: '/nursing/medical-surgical-nursing-reviewer', label: 'Medical-Surgical Nursing Reviewer NLE 2026' },
  { href: '/nursing/community-health-nursing-reviewer', label: 'Community Health Nursing Reviewer NLE 2026' },
  { href: '/nursing/pnle-application-guide-2026', label: 'PNLE Application Guide 2026 via PRC LERIS' },
];

export default function PNLENursingStarterPackPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Hero */}
        <div className="text-center mb-8">
          <span className="inline-block bg-pink-400/10 text-pink-400 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            🎁 Free Download
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            PNLE Nursing Starter Pack 2026
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            30 NLE Questions with Full Rationales
          </p>
          <p className="text-gray-500 text-sm">
            Built for the 2026 PNLE syllabus. 100% free — just enter your email below.
          </p>
        </div>

        {/* Top form */}
        <PNLEFreebieCTA redirectOnSuccess />

        {/* What's inside */}
        <section className="mt-10 bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-extrabold text-lg mb-4">What You&apos;ll Get</h2>
          <ul className="space-y-2.5 mb-5">
            {WHATS_INSIDE.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-gray-300 text-sm">
                <span className="text-pink-400 font-bold flex-shrink-0 mt-0.5">✓</span>
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
        <section className="mt-6 bg-[#0f1629] border border-pink-400/20 rounded-2xl p-6">
          <h2 className="text-pink-400 font-extrabold text-lg mb-3">The Reality of the PNLE</h2>
          <div className="space-y-2 text-sm text-gray-300">
            <p>📊 <strong className="text-white">Pass rate:</strong> Around <strong className="text-pink-400">44%</strong> for February 2026</p>
            <p>👥 <strong className="text-white">Takers:</strong> Over <strong className="text-pink-400">8,000+</strong> examinees per exam cycle</p>
            <p>📋 <strong className="text-white">Items:</strong> <strong className="text-pink-400">500 questions</strong> split across Part 1 and Part 2</p>
            <p className="text-gray-500 text-xs mt-3">More than half of NLE takers fail each cycle. The difference is preparation — specifically, knowing the high-yield topics. This Starter Pack shows you what strategic PNLE preparation looks like.</p>
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
            We believe quality PNLE prep should be accessible to every Filipino nursing graduate.
            The full PNLE Mastery System (300+ questions across all NLE subjects) is coming soon.
            This Starter Pack is our way of saying salamat in advance — and helping you start preparing now.
          </p>
        </section>

        {/* Coming soon teaser */}
        <section className="mt-6 bg-gradient-to-br from-pink-900/20 to-rose-900/10 border border-pink-400/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-pink-400/20 text-pink-400 text-xs font-extrabold px-2 py-1 rounded-full uppercase tracking-wide">🚀 Coming Soon</span>
          </div>
          <h2 className="text-pink-400 font-extrabold text-lg mb-3">
            PNLE Mastery System — In Development
          </h2>
          <ul className="space-y-2 text-gray-300 text-sm mb-4">
            <li className="flex items-start gap-2"><span className="text-pink-400 font-bold flex-shrink-0">✓</span> 300+ questions across all 6 NLE subjects</li>
            <li className="flex items-start gap-2"><span className="text-pink-400 font-bold flex-shrink-0">✓</span> Full 100-item Mock Exam (Part 1 style) with rationales</li>
            <li className="flex items-start gap-2"><span className="text-pink-400 font-bold flex-shrink-0">✓</span> 12-Week PNLE Study Schedule</li>
            <li className="flex items-start gap-2"><span className="text-pink-400 font-bold flex-shrink-0">✓</span> High-Yield Drug Cheat Sheet (Pharmacology)</li>
            <li className="flex items-start gap-2"><span className="text-pink-400 font-bold flex-shrink-0">✓</span> Community Health Nursing Quick Reference</li>
          </ul>
          <Link
            href="/premium/pnle-mastery"
            className="inline-block text-pink-400 hover:text-pink-300 font-bold text-sm underline underline-offset-2 transition-colors"
          >
            See what&apos;s coming — PNLE Mastery System →
          </Link>
        </section>

        {/* Second form */}
        <div className="mt-6">
          <p className="text-center text-gray-400 text-sm mb-2">Ready? Enter your email and get the PDF instantly.</p>
          <PNLEFreebieCTA redirectOnSuccess />
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
                  className="text-pink-400 hover:text-pink-300 underline underline-offset-2 text-sm transition-colors"
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
            for daily PNLE tips and updates.
          </p>
        </section>

      </div>
    </div>
  );
}
