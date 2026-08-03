import Link from 'next/link';
import type { Metadata } from 'next';
import { PNLE } from '@/lib/mockExamMeta';
import CheckoutForm from '../../[slug]/checkout/CheckoutForm';

const GCASH_NUMBER = '0906-346-5789';

export const metadata: Metadata = {
  title: 'Checkout — PNLE Mock Board Exam | LisensyaPrep',
  robots: { index: false, follow: false },
};

export default function PnleCheckoutPage() {
  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 uppercase tracking-widest mb-3">
            PNLE Mock Board Exam · ₱{PNLE.price}
          </span>
          <h1 className="text-2xl font-extrabold text-white">Unlock all 5 Nursing Practice modules</h1>
          <p className="text-gray-500 text-sm mt-1">
            500 items · 2-hour timer per module · unlimited retakes until {PNLE.accessEnds}
          </p>
        </div>

        {/* Step 1 */}
        <div className="bg-[#0f1629] border border-pink-400/30 rounded-2xl p-6 mb-5">
          <p className="text-pink-400 font-extrabold mb-4">Step 1: Send ₱{PNLE.price} via GCash</p>
          <div className="space-y-3">
            <div className="bg-[#080d1b] rounded-xl p-4 border border-white/10">
              <p className="text-gray-500 text-xs mb-1">GCash Number</p>
              <p className="text-white font-extrabold text-xl tracking-widest">{GCASH_NUMBER}</p>
            </div>
            <div className="bg-[#080d1b] rounded-xl p-4 border border-white/10">
              <p className="text-gray-500 text-xs mb-1">Amount to Send</p>
              <p className="text-pink-400 font-extrabold text-xl">₱{PNLE.price}</p>
            </div>
          </div>
          <div className="bg-pink-500/10 border border-pink-400/20 rounded-xl p-3 mt-3">
            <p className="text-pink-300 text-xs font-semibold">⚠️ Double-check the number before sending!</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 mb-5">
          <p className="text-white font-extrabold mb-2">Step 2: Screenshot your receipt</p>
          <p className="text-gray-400 text-sm">
            You&apos;ll need the 13-digit <strong className="text-gray-200">Reference Number</strong> and the payment date
            for the form below.
          </p>
        </div>

        {/* Step 3 */}
        <CheckoutForm exam="pnle" title="PNLE Mock Board Exam (all 5 modules)" />

        <p className="text-center mt-6">
          <Link href="/mock-board/pnle" className="text-gray-500 text-sm underline">← Back to details</Link>
        </p>
      </div>
    </div>
  );
}
