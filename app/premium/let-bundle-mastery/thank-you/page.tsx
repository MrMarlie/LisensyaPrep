import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bundle Order Received — LisensyaPrep',
  robots: { index: false },
};

export default function BundleThankYouPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-xl mx-auto text-center">

        <div className="text-6xl mb-6">🎁</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Bundle Order Received!
        </h1>
        <p className="text-gray-300 text-lg mb-2">
          Salamat for going all-in with the LET Mastery Bundle!
        </p>
        <p className="text-gray-400 mb-10">
          You&apos;ll receive <strong className="text-white">both PDF reviewers</strong> by email within <strong className="text-white">12 hours</strong> (usually the same hour during 8 AM–10 PM).
        </p>

        {/* What you'll receive */}
        <div className="bg-[#0f1629] border border-green-400/20 rounded-2xl p-6 text-left mb-8">
          <p className="text-white font-bold mb-4">You&apos;ll receive both:</p>
          <div className="space-y-3">
            <div className="flex gap-3">
              <span>📘</span>
              <div>
                <p className="text-yellow-400 font-bold text-sm">LET ProfEd Mastery System</p>
                <p className="text-gray-400 text-xs">430+ ProfEd questions with full rationales (~100 pages)</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span>📗</span>
              <div>
                <p className="text-green-400 font-bold text-sm">LET Gen Ed Mastery System</p>
                <p className="text-gray-400 text-xs">430+ Gen Ed questions with full rationales (~120 pages)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 text-left mb-8">
          <p className="text-white font-bold mb-4">What happens next:</p>
          <ol className="space-y-3">
            {[
              { icon: '✅', text: 'Check your email for an order confirmation (sent right now)' },
              { icon: '🔍', text: 'We verify your GCash payment — usually within 1–2 hours' },
              { icon: '📧', text: 'You receive a second email with Google Drive links to both PDFs' },
              { icon: '📚', text: 'Start with ProfEd (foundational theory), then move to Gen Ed' },
            ].map(({ icon, text }, i) => (
              <li key={i} className="flex gap-3 text-gray-300 text-sm">
                <span className="flex-shrink-0">{icon}</span>
                {text}
              </li>
            ))}
          </ol>
        </div>

        {/* Recommended order */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 text-left mb-8">
          <p className="text-white font-bold mb-3">Recommended Study Order:</p>
          <ol className="space-y-2">
            {[
              'Start with ProfEd Mastery (foundational teaching theory)',
              'Move to Gen Ed Mastery (broader academic subjects)',
              'Take both mock exams in your final 2 weeks of prep',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-300 text-sm">
                <span className="text-yellow-400 font-bold flex-shrink-0">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
          <p className="text-gray-500 text-xs mt-3">You saved ₱99 with this bundle. Good move.</p>
        </div>

        {/* Support */}
        <div className="text-sm text-gray-500 space-y-1">
          <p>Didn&apos;t receive your PDFs within 12 hours?</p>
          <p>
            Email us at{' '}
            <a href="mailto:lisensyaprep@gmail.com" className="text-yellow-400 hover:text-yellow-300">
              lisensyaprep@gmail.com
            </a>{' '}
            or message us on{' '}
            <a href="https://www.facebook.com/LisensyaPrep" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">
              Facebook
            </a>.
          </p>
        </div>

        <div className="mt-10">
          <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            ← Back to LisensyaPrep Home
          </Link>
        </div>

      </div>
    </div>
  );
}
