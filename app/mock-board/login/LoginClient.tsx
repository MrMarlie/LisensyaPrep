'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

export default function LoginClient() {
  const params = useSearchParams();
  const next = params.get('next') || '/mock-board';
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setStatus('error');
      setMsg('Please enter a valid email address.');
      return;
    }
    setStatus('sending');
    setMsg('');
    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
      const { error } = await supabase.auth.signInWithOtp({
        email: clean,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) throw error;
      setStatus('sent');
    } catch (err: unknown) {
      setStatus('error');
      setMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-yellow-400 font-black text-2xl">LisensyaPrep</Link>
          <p className="text-gray-500 text-sm mt-1">Mock Board Exam access</p>
        </div>

        {status === 'sent' ? (
          <div className="bg-[#0f1629] border border-green-400/30 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">📧</div>
            <h1 className="text-white text-xl font-extrabold mb-2">Check your email</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              We sent a secure sign-in link to <strong className="text-white">{email.trim().toLowerCase()}</strong>.
              Open it on this device to unlock your Mock Board Exam.
            </p>
            <p className="text-gray-600 text-xs mt-4">
              Didn&apos;t get it? Check spam, or{' '}
              <button onClick={() => setStatus('idle')} className="text-yellow-400 underline">try again</button>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#0f1629] border border-white/10 rounded-2xl p-8">
            <h1 className="text-white text-xl font-extrabold mb-1">Sign in to your exam</h1>
            <p className="text-gray-400 text-sm mb-6">
              Enter the <strong className="text-yellow-400">exact email you paid with</strong>. We&apos;ll email you a
              one-tap sign-in link — no password needed.
            </p>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              autoComplete="email"
              className="w-full bg-[#080d1b] border border-white/15 focus:border-yellow-400/50 outline-none rounded-lg px-4 py-3 text-white mb-4"
              required
            />
            {status === 'error' && <p className="text-red-400 text-sm mb-4">{msg}</p>}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-gray-900 font-extrabold py-3 rounded-lg transition-colors"
            >
              {status === 'sending' ? 'Sending link…' : 'Email me a sign-in link'}
            </button>
            <p className="text-gray-600 text-xs mt-4 text-center">
              Haven&apos;t bought a Mock Board yet?{' '}
              <Link href="/mock-board" className="text-yellow-400 underline">See the exams</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
