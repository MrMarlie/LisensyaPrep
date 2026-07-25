import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { examBySlug, PRICE } from '@/lib/mockExamMeta';
import CheckoutForm from './CheckoutForm';

const GCASH_NUMBER = '0906-346-5789';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const exam = examBySlug(params.slug);
  return {
    title: exam ? `Checkout — ${exam.title} | LisensyaPrep` : 'Checkout | LisensyaPrep',
    robots: { index: false, follow: false },
  };
}

export default function MockCheckoutPage({ params }: { params: { slug: string } }) {
  const exam = examBySlug(params.slug);
  if (!exam) notFound();

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 uppercase tracking-widest mb-3">
            Mock Board Exam · ₱{PRICE}
          </span>
          <h1 className="text-2xl font-extrabold text-white">{exam.title}</h1>
          <p className="text-gray-500 text-sm mt-1">150 items · 180-minute timer · unlimited retakes until Oct 1, 2026</p>
        </div>

        {/* Step 1 */}
        <div className="bg-[#0f1629] border border-yellow-400/30 rounded-2xl p-6 mb-5">
          <p className="text-yellow-400 font-extrabold mb-4">Step 1: Send ₱{PRICE} via GCash</p>
          <div className="space-y-3">
            <div className="bg-[#080d1b] rounded-xl p-4 border border-white/10">
              <p className="text-gray-500 text-xs mb-1">GCash Number</p>
              <p className="text-white font-extrabold text-xl tracking-widest">{GCASH_NUMBER}</p>
            </div>
            <div className="bg-[#080d1b] rounded-xl p-4 border border-white/10">
              <p className="text-gray-500 text-xs mb-1">Amount to Send</p>
              <p className="text-yellow-400 font-extrabold text-xl">₱{PRICE}</p>
            </div>
          </div>
          <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-3 mt-3">
            <p className="text-yellow-400 text-xs font-semibold">⚠️ Double-check the number before sending!</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 mb-5">
          <p className="text-white font-extrabold mb-2">Step 2: Screenshot your receipt</p>
          <p className="text-gray-400 text-sm">You&apos;ll need the 13-digit <strong className="text-gray-200">Reference Number</strong> and the payment date for the form below.</p>
        </div>

        {/* Step 3 */}
        <CheckoutForm exam={exam.exam} title={exam.title} />

        <p className="text-center mt-6">
          <Link href={`/mock-board/${exam.slug}`} className="text-gray-500 text-sm underline">← Back to details</Link>
        </p>
      </div>
    </div>
  );
}
