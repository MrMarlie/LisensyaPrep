'use client';

import { useState } from 'react';
import Link from 'next/link';

const REFERRALS = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'google', label: 'Google search' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'friend', label: 'Friend referral' },
  { value: 'email', label: 'LisensyaPrep email' },
  { value: 'other', label: 'Other' },
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function CheckoutForm({ exam, title }: { exam: string; title: string }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    gcashRef: '',
    paymentDate: today(),
    phone: '',
    referralSource: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState<{ orderId: string } | null>(null);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  function validate() {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Your full name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email address.';
    if (!form.gcashRef.trim()) e.gcashRef = 'GCash reference number is required.';
    else if (!/^\d{13}$/.test(form.gcashRef.trim())) e.gcashRef = 'Reference number must be exactly 13 digits.';
    if (!form.paymentDate) e.paymentDate = 'Payment date is required.';
    if (!form.referralSource) e.referralSource = 'Please select how you heard about us.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setSubmitError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/orders/submit-mock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setDone({ orderId: data.orderId });
      window.scrollTo(0, 0);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="bg-[#0f1629] border border-green-400/30 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-3">✅</div>
        <h2 className="text-white text-2xl font-extrabold mb-2">Order received!</h2>
        <p className="text-gray-400 text-sm mb-1">Order ID: <span className="text-white font-mono">{done.orderId}</span></p>
        <p className="text-gray-300 text-sm leading-relaxed mt-4">
          We&apos;re verifying your GCash payment (usually 1–2 hours, 8 AM–10 PM). Once verified, we&apos;ll email you —
          then sign in at{' '}
          <Link href="/mock-board/login" className="text-yellow-400 underline">/mock-board/login</Link>{' '}
          with <strong className="text-white">{form.email.trim().toLowerCase()}</strong> to start your exam.
        </p>
        <div className="bg-[#080d1b] border border-yellow-400/20 rounded-xl p-4 mt-5 text-left">
          <p className="text-yellow-400 text-xs font-bold mb-1">⚠️ Use the same email to sign in</p>
          <p className="text-gray-400 text-xs leading-relaxed">
            Your access is tied to the email above. Signing in with a different email won&apos;t find your purchase.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0f1629] border border-white/10 rounded-2xl p-6">
      <p className="text-white font-extrabold mb-1">Step 3: Confirm your payment</p>
      <p className="text-gray-500 text-sm mb-5">You&apos;re buying: <span className="text-yellow-400 font-semibold">{title}</span></p>

      <label className="block text-gray-300 text-sm font-medium mb-1.5">Full Name <span className="text-red-400">*</span></label>
      <input
        value={form.fullName}
        onChange={(e) => set('fullName', e.target.value)}
        className="w-full bg-[#080d1b] border border-white/15 focus:border-yellow-400/50 outline-none rounded-lg px-4 py-2.5 text-white mb-1"
        placeholder="Juan Dela Cruz"
      />
      {errors.fullName && <p className="text-red-400 text-xs mb-2">{errors.fullName}</p>}

      <label className="block text-gray-300 text-sm font-medium mb-1.5 mt-3">
        Email <span className="text-red-400">*</span>
      </label>
      <input
        type="email"
        value={form.email}
        onChange={(e) => set('email', e.target.value)}
        className="w-full bg-[#080d1b] border border-white/15 focus:border-yellow-400/50 outline-none rounded-lg px-4 py-2.5 text-white mb-1"
        placeholder="you@email.com"
      />
      <p className="text-yellow-400/80 text-xs mb-1">You&apos;ll sign in to the exam with this exact email — use one you can access.</p>
      {errors.email && <p className="text-red-400 text-xs mb-2">{errors.email}</p>}

      <label className="block text-gray-300 text-sm font-medium mb-1.5 mt-3">GCash Reference Number <span className="text-red-400">*</span></label>
      <input
        inputMode="numeric"
        value={form.gcashRef}
        onChange={(e) => set('gcashRef', e.target.value.replace(/\D/g, '').slice(0, 13))}
        className="w-full bg-[#080d1b] border border-white/15 focus:border-yellow-400/50 outline-none rounded-lg px-4 py-2.5 text-white mb-1"
        placeholder="13-digit reference"
      />
      {errors.gcashRef && <p className="text-red-400 text-xs mb-2">{errors.gcashRef}</p>}
      <p className="text-gray-500 text-xs mb-2">Found in your GCash receipt. Exactly 13 digits.</p>

      <label className="block text-gray-300 text-sm font-medium mb-1.5 mt-3">Payment Date <span className="text-red-400">*</span></label>
      <input
        type="date"
        value={form.paymentDate}
        onChange={(e) => set('paymentDate', e.target.value)}
        className="w-full bg-[#080d1b] border border-white/15 focus:border-yellow-400/50 outline-none rounded-lg px-4 py-2.5 text-white mb-1"
      />
      {errors.paymentDate && <p className="text-red-400 text-xs mb-2">{errors.paymentDate}</p>}

      <label className="block text-gray-300 text-sm font-medium mb-1.5 mt-3">Phone (optional)</label>
      <input
        value={form.phone}
        onChange={(e) => set('phone', e.target.value)}
        className="w-full bg-[#080d1b] border border-white/15 focus:border-yellow-400/50 outline-none rounded-lg px-4 py-2.5 text-white mb-3"
        placeholder="09xxxxxxxxx"
      />

      <label className="block text-gray-300 text-sm font-medium mb-2 mt-1">How did you hear about us? <span className="text-red-400">*</span></label>
      <div className="grid grid-cols-2 gap-2 mb-1">
        {REFERRALS.map(({ value, label }) => (
          <label key={value} className="flex items-center gap-2 cursor-pointer group text-sm">
            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${form.referralSource === value ? 'border-yellow-400 bg-yellow-400' : 'border-white/30'}`}>
              {form.referralSource === value && <span className="w-2 h-2 rounded-full bg-gray-900" />}
            </span>
            <input type="radio" name="referralSource" value={value} checked={form.referralSource === value} onChange={() => set('referralSource', value)} className="sr-only" />
            <span className="text-gray-300">{label}</span>
          </label>
        ))}
      </div>
      {errors.referralSource && <p className="text-red-400 text-xs mt-1">{errors.referralSource}</p>}

      {submitError && <p className="text-red-400 text-sm mt-4">{submitError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full mt-5 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-gray-900 font-extrabold py-3 rounded-xl transition-colors"
      >
        {submitting ? 'Submitting…' : 'Submit order for verification'}
      </button>
      <p className="text-gray-600 text-xs mt-3 text-center">🔒 GCash handles the transaction — we never store payment info.</p>
    </form>
  );
}
