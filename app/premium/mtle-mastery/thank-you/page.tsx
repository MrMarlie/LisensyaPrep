import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Received — LisensyaPrep',
  robots: { index: false },
};

const FREE_ARTICLES = [
  { text: 'MTLE Coverage 2026 — Complete Subject Breakdown', href: '/medical-technology/mtle-coverage-2026' },
  { text: 'How to Pass the MTLE Board Exam on Your First Take', href: '/medical-technology/how-to-pass-mtle-board-exam' },
  { text: 'Free Medical Technology Practice Questions', href: '/medical-technology' },
];

export default function MTLEMasteryThankYouPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-xl mx-auto text-center">

        <div className="text-6xl mb-6">🧪</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Order Received!
        </h1>
        <p className="text-gray-300 text-lg mb-2">
          Thank you for your purchase. We&apos;re verifying your GCash payment now.
        </p>
        <p className="text-gray-400 mb-10">
          You&apos;ll receive your MTLE Mastery System PDF by email within <strong className="text-white">12 hours</strong> (usually the same hour during 8 AM–10 PM).
        </p>

        {/* Next steps */}
        <div className="bg-[#0f1629] border border-cyan-400/20 rounded-2xl p-6 text-left mb-8">
          <p className="text-white font-bold mb-4">What happens next:</p>
          <ol className="space-y-3">
            {[
              { icon: '✅', text: 'Check your email for an order confirmation (sent right now)' },
              { icon: '🔍', text: 'We verify your GCash payment — usually within 1–2 hours' },
              { icon: '📧', text: 'You receive a second email with your PDF reviewer' },
              { icon: '📚', text: 'Start studying for the MTLE!' },
            ].map(({ icon, text }, i) => (
              <li key={i} className="flex gap-3 text-gray-300 text-sm">
                <span className="flex-shrink-0">{icon}</span>
                {text}
              </li>
            ))}
          </ol>
        </div>

        {/* Study while waiting */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 text-left mb-8">
          <p className="text-white font-bold mb-4">Study while you wait — free resources:</p>
          <ul className="space-y-3">
            {FREE_ARTICLES.map(({ text, href }) => (
              <li key={href}>
                <Link href={href} className="text-cyan-400 hover:text-cyan-300 text-sm underline underline-offset-2 transition-colors">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="text-sm text-gray-500 space-y-1">
          <p>Didn&apos;t receive your PDF within 12 hours?</p>
          <p>
            Email us at{' '}
            <a href="mailto:lisensyaprep@gmail.com" className="text-cyan-400 hover:text-cyan-300">
              lisensyaprep@gmail.com
            </a>{' '}
            or message us on{' '}
            <a href="https://www.facebook.com/LisensyaPrep" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
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
