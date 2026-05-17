'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

const REFERRAL_OPTIONS = [
  { value: 'article', label: 'LisensyaPrep article' },
  { value: 'facebook', label: 'Facebook / Social Media' },
  { value: 'friend', label: 'Friend referral' },
  { value: 'google', label: 'Google search' },
  { value: 'other', label: 'Other' },
];

const WAITLIST_CODE = 'WAITLIST49';
const WAITLIST_DISCOUNT = 49;
const BASE_PRICE = 249;
// Code valid for 7 days from launch: 2026-05-18
const WAITLIST_EXPIRY = new Date('2026-05-25T23:59:59+08:00');

function today() {
  return new Date().toISOString().split('T')[0];
}

function isWaitlistCodeValid(code: string) {
  return code.trim().toUpperCase() === WAITLIST_CODE && new Date() <= WAITLIST_EXPIRY;
}

export default function GenEdCheckoutPage() {
  const router = useRouter();

  useEffect(() => { trackEvent('gen_ed_mastery_checkout_start'); }, []);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
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

  const price = promoApplied ? BASE_PRICE - WAITLIST_DISCOUNT : BASE_PRICE;

  function applyPromo() {
    if (isWaitlistCodeValid(promoCode)) {
      setPromoApplied(true);
      setPromoError('');
    } else if (promoCode.trim().toUpperCase() === WAITLIST_CODE) {
      setPromoError('This promo code has expired.');
    } else {
      setPromoError('Invalid promo code.');
    }
  }

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: '' }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.gcashRef.trim()) e.gcashRef = 'GCash reference number is required.';
    else if (!/^\d{13}$/.test(form.gcashRef.trim())) e.gcashRef = 'Reference number must be exactly 13 digits.';
    if (!form.paymentDate) e.paymentDate = 'Payment date is required.';
    if (!form.referralSource) e.referralSource = 'Please select how you heard about us.';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    setSubmitError('');
    trackEvent('gen_ed_mastery_payment_submitted');
    try {
      const res = await fetch('/api/orders/submit-gen-ed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, promoCode: promoApplied ? WAITLIST_CODE : '' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed.');
      router.push('/premium/let-gen-ed-mastery/thank-you');
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-xl mx-auto">

        <Link href="/premium/let-gen-ed-mastery" className="text-yellow-400 hover:text-yellow-300 text-sm mb-6 inline-block transition-colors">
          ← Back to product page
        </Link>

        {/* Header */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 mb-6">
          <p className="text-yellow-400 font-extrabold text-lg">Complete Your Order</p>
          <p className="text-white font-bold mt-1">LisensyaPrep LET Gen Ed Mastery System 2026</p>
          <div className="flex items-center gap-3 mt-2">
            {promoApplied ? (
              <>
                <span className="text-yellow-400 text-2xl font-extrabold">₱{price}</span>
                <span className="text-gray-500 line-through text-sm">₱{BASE_PRICE}</span>
                <span className="text-xs bg-green-400/10 text-green-400 px-2 py-0.5 rounded-full font-semibold">Waitlist Discount Applied</span>
              </>
            ) : (
              <span className="text-yellow-400 text-2xl font-extrabold">₱{BASE_PRICE}</span>
            )}
          </div>
        </div>

        {/* Promo Code */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 mb-6">
          <p className="text-white font-bold mb-3">Have a Promo Code?</p>
          {promoApplied ? (
            <div className="bg-green-400/10 border border-green-400/20 rounded-xl p-3">
              <p className="text-green-400 text-sm font-semibold">✅ {WAITLIST_CODE} applied — ₱{WAITLIST_DISCOUNT} off! You pay ₱{price}.</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoError(''); }}
                placeholder="Enter promo code"
                className="flex-1 bg-[#080d1b] border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 transition-colors"
              />
              <button
                type="button"
                onClick={applyPromo}
                className="bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 font-bold px-4 py-3 rounded-xl text-sm transition-colors whitespace-nowrap"
              >
                Apply
              </button>
            </div>
          )}
          {promoError && <p className="text-red-400 text-xs mt-2">{promoError}</p>}
        </div>

        {/* Step 1: GCash */}
        <div className="bg-[#0f1629] border border-yellow-400/30 rounded-2xl p-6 mb-6">
          <p className="text-yellow-400 font-extrabold mb-4">Step 1: Send Payment via GCash</p>
          <div className="space-y-3 mb-4">
            <div className="bg-[#080d1b] rounded-xl p-4 border border-white/10">
              <p className="text-gray-500 text-xs mb-1">GCash Number</p>
              <p className="text-white font-extrabold text-xl tracking-widest">0906-346-5789</p>
            </div>
            <div className="bg-[#080d1b] rounded-xl p-4 border border-white/10">
              <p className="text-gray-500 text-xs mb-1">Amount to Send</p>
              <p className="text-yellow-400 font-extrabold text-xl">₱{price}</p>
            </div>
          </div>
          <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-3">
            <p className="text-yellow-400 text-xs font-semibold">⚠️ Double-check the number before sending!</p>
          </div>
        </div>

        {/* Step 2: Screenshot reminder */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 mb-6">
          <p className="text-white font-extrabold mb-2">Step 2: Take a Screenshot</p>
          <p className="text-gray-400 text-sm mb-3">After sending, take a screenshot of your GCash receipt. You&apos;ll need:</p>
          <ul className="space-y-1.5">
            {[
              'The Reference Number (13-digit code)',
              'The Date and Time of transaction',
              `The Amount (should be ₱${price})`,
            ].map((item) => (
              <li key={item} className="flex gap-2 text-gray-300 text-sm">
                <span className="text-yellow-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Step 3: Form */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 mb-6">
          <p className="text-white font-extrabold mb-5">Step 3: Confirm Your Order</p>
          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">Full Name <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => set('fullName', e.target.value)}
                placeholder="Your full name"
                className="w-full bg-[#080d1b] border border-white/20 rounded-xl px-4 py-3 text-white text-base placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 transition-colors"
                style={{ fontSize: '16px' }}
              />
              {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">Email Address <span className="text-red-400">*</span></label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="you@email.com"
                className="w-full bg-[#080d1b] border border-white/20 rounded-xl px-4 py-3 text-white text-base placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 transition-colors"
                style={{ fontSize: '16px' }}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              <p className="text-gray-500 text-xs mt-1">We&apos;ll send your PDF here. Double-check this!</p>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">GCash Reference Number <span className="text-red-400">*</span></label>
              <input
                type="text"
                inputMode="numeric"
                value={form.gcashRef}
                onChange={(e) => set('gcashRef', e.target.value.replace(/\D/g, '').slice(0, 13))}
                placeholder="13-digit reference number"
                className="w-full bg-[#080d1b] border border-white/20 rounded-xl px-4 py-3 text-white text-base placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 transition-colors font-mono tracking-widest"
                style={{ fontSize: '16px' }}
              />
              {errors.gcashRef && <p className="text-red-400 text-xs mt-1">{errors.gcashRef}</p>}
              <p className="text-gray-500 text-xs mt-1">Found in your GCash transaction receipt. Exactly 13 digits.</p>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">Date of Payment <span className="text-red-400">*</span></label>
              <input
                type="date"
                value={form.paymentDate}
                onChange={(e) => set('paymentDate', e.target.value)}
                max={today()}
                className="w-full bg-[#080d1b] border border-white/20 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-yellow-400/50 transition-colors"
                style={{ fontSize: '16px' }}
              />
              {errors.paymentDate && <p className="text-red-400 text-xs mt-1">{errors.paymentDate}</p>}
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">Phone Number <span className="text-gray-500 font-normal">(optional)</span></label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder="09XXXXXXXXX"
                className="w-full bg-[#080d1b] border border-white/20 rounded-xl px-4 py-3 text-white text-base placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 transition-colors"
                style={{ fontSize: '16px' }}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-3">How did you hear about us? <span className="text-red-400">*</span></label>
              <div className="space-y-2">
                {REFERRAL_OPTIONS.map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${form.referralSource === value ? 'border-yellow-400 bg-yellow-400' : 'border-white/30 group-hover:border-white/60'}`}>
                      {form.referralSource === value && <div className="w-2 h-2 rounded-full bg-gray-900" />}
                    </div>
                    <input
                      type="radio"
                      name="referralSource"
                      value={value}
                      checked={form.referralSource === value}
                      onChange={() => set('referralSource', value)}
                      className="sr-only"
                    />
                    <span className="text-gray-300 text-sm">{label}</span>
                  </label>
                ))}
              </div>
              {errors.referralSource && <p className="text-red-400 text-xs mt-2">{errors.referralSource}</p>}
            </div>

            {submitError && (
              <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4">
                <p className="text-red-400 text-sm">{submitError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-extrabold py-4 rounded-xl text-lg transition-colors mt-2"
            >
              {submitting ? 'Submitting...' : `SUBMIT ORDER — ₱${price}`}
            </button>
          </form>
        </div>

        {/* What happens next */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 mb-6">
          <p className="text-white font-bold mb-3">What Happens Next?</p>
          <ol className="space-y-2">
            {[
              'We receive your order confirmation',
              'We verify your GCash payment (usually 1–2 hours, 8 AM–10 PM)',
              'We email you the PDF reviewer via Google Drive link',
              'You start studying',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-300 text-sm">
                <span className="text-yellow-400 font-bold flex-shrink-0">✅</span>
                {item}
              </li>
            ))}
          </ol>
        </div>

        {/* Help */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 mb-6 text-sm text-gray-400">
          <p className="text-white font-bold mb-2">Need Help?</p>
          <p>Facebook: <a href="https://www.facebook.com/LisensyaPrep" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">LisensyaPrep</a></p>
          <p>Email: <a href="mailto:lisensyaprep@gmail.com" className="text-yellow-400 hover:text-yellow-300">lisensyaprep@gmail.com</a></p>
          <p className="mt-1">Response time: Within 4 hours during 8 AM–10 PM</p>
        </div>

        <div className="text-center space-y-2 text-sm text-gray-500 pb-8">
          <p>🔒 We never store your payment info — GCash handles the transaction.</p>
          <p>🛡️ Your email is used only for product delivery and updates.</p>
        </div>

      </div>
    </div>
  );
}
