'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

type Props = {
  variant: 'cse-pro-mastery' | 'cse-subprof-mastery';
};

const CONFIG = {
  'cse-pro-mastery': {
    label: 'CSE Professional Mastery System',
    apiPath: '/api/waitlist/cse-pro-mastery',
    trackAttempt: 'cse_pro_mastery_waitlist_signup_attempt',
    trackSuccess: 'cse_pro_mastery_waitlist_signup_success',
  },
  'cse-subprof-mastery': {
    label: 'CSE SubProfessional Mastery System',
    apiPath: '/api/waitlist/cse-subprof-mastery',
    trackAttempt: 'cse_subprof_mastery_waitlist_signup_attempt',
    trackSuccess: 'cse_subprof_mastery_waitlist_signup_success',
  },
};

export default function CSEWaitlistCTA({ variant }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const pathname = usePathname();
  const cfg = CONFIG[variant];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    trackEvent(cfg.trackAttempt, { source: pathname });

    try {
      const res = await fetch(cfg.apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), source: pathname }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      } else {
        trackEvent(cfg.trackSuccess, { source: pathname });
        setStatus('success');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-400/40 bg-[#0f1629] p-6 text-center">
        <p className="text-green-400 font-extrabold text-xl mb-2">You&apos;re on the waitlist!</p>
        <p className="text-gray-300 text-sm mb-1">
          We&apos;ll email <strong className="text-white">{email}</strong> the moment it launches.
        </p>
        <p className="text-gray-500 text-xs mt-2">
          Check your spam folder for the confirmation email. Add lisensyaprep@gmail.com to your contacts.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-yellow-400/40 bg-[#0f1629] p-6">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl flex-shrink-0">🚀</span>
        <div>
          <p className="text-yellow-400 font-extrabold text-base uppercase tracking-wide">
            Join the Waitlist
          </p>
          <p className="text-gray-300 text-sm mt-1">
            Get notified at launch + early-bird discount. Free to join.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2.5">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition-colors"
        />
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition-colors min-w-0"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-gray-900 font-bold px-4 py-2.5 rounded-lg text-sm whitespace-nowrap transition-colors flex-shrink-0"
          >
            {status === 'loading' ? 'Joining…' : 'Notify Me →'}
          </button>
        </div>
        {status === 'error' && (
          <p className="text-red-400 text-xs">{errorMsg}</p>
        )}
        <p className="text-gray-600 text-xs">We&apos;ll never spam you. Unsubscribe anytime.</p>
      </form>
    </div>
  );
}
