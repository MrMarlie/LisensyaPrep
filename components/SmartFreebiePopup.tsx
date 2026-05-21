'use client';

import { useState } from 'react';

type Props = {
  type: 'profed' | 'gened' | 'auto' | 'pnle';
  trigger?: string;
  onClose: () => void;
};

export default function SmartFreebiePopup({ type, trigger = 'unknown', onClose }: Props) {
  const [selectedPack, setSelectedPack] = useState<'profed' | 'gened'>(type === 'gened' ? 'gened' : 'profed');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isPNLE = type === 'pnle';
  const packLabel = isPNLE
    ? 'PNLE Nursing Starter Pack'
    : selectedPack === 'profed' ? 'LET ProfEd Starter Pack' : 'LET Gen Ed Starter Pack';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus('loading');
    try {
      let res: Response;
      if (isPNLE) {
        res = await fetch('/api/freebies/pnle-nursing-starter-pack', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.trim(), email: email.trim(), source: trigger }),
        });
      } else {
        res = await fetch('/api/popup/freebie-signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.trim(), email: email.trim(), pack: selectedPack, trigger }),
        });
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed.');

      if (!isPNLE) {
        try {
          const existing = localStorage.getItem('lp_starter_pack_downloaded');
          if (!existing) {
            localStorage.setItem('lp_starter_pack_downloaded', selectedPack);
          } else if (existing !== 'both' && existing !== selectedPack) {
            localStorage.setItem('lp_starter_pack_downloaded', 'both');
          }
        } catch { /* ignore */ }
      }

      setStatus('success');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#080d1b]/95 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#0f1629] border border-white/10 rounded-2xl p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white text-lg leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        {status === 'success' ? (
          <div className="text-center py-4">
            <p className="text-4xl mb-3">🎁</p>
            <p className="text-green-400 font-extrabold text-xl mb-2">Check your email!</p>
            <p className="text-gray-300 text-sm mb-1">
              Your <strong className="text-white">{packLabel}</strong> is on the way to{' '}
              <strong className="text-white">{email}</strong>.
            </p>
            <p className="text-gray-500 text-xs mt-2">Check spam if you don&apos;t see it within a few minutes.</p>
            <button
              onClick={onClose}
              className={`mt-4 ${isPNLE ? 'bg-pink-500 hover:bg-pink-400 text-white' : 'bg-yellow-400 hover:bg-yellow-300 text-gray-900'} font-bold px-6 py-2.5 rounded-xl text-sm transition-colors`}
            >
              Continue Studying →
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-5">
              <p className="text-3xl mb-2">🎁</p>
              <h2 className="text-white font-extrabold text-xl">Get Your FREE Starter Pack</h2>
              <p className="text-gray-400 text-sm mt-1">
                {isPNLE
                  ? '30 PNLE questions with full rationales — delivered to your email instantly.'
                  : '30 LET questions with full rationales — delivered to your email instantly.'}
              </p>
            </div>

            {type === 'auto' && (
              <div className="flex gap-2 mb-4">
                {(['profed', 'gened'] as const).map((pack) => (
                  <button
                    key={pack}
                    type="button"
                    onClick={() => setSelectedPack(pack)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-colors ${
                      selectedPack === pack
                        ? 'bg-yellow-400 text-gray-900 border-yellow-400'
                        : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {pack === 'profed' ? '📘 ProfEd' : '📗 Gen Ed'}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none ${isPNLE ? 'focus:border-pink-400/50' : 'focus:border-yellow-400/50'} transition-colors`}
                style={{ fontSize: '16px' }}
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none ${isPNLE ? 'focus:border-pink-400/50' : 'focus:border-yellow-400/50'} transition-colors`}
                style={{ fontSize: '16px' }}
              />
              {status === 'error' && (
                <p className="text-red-400 text-xs">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full ${isPNLE ? 'bg-pink-500 hover:bg-pink-400 text-white' : 'bg-yellow-400 hover:bg-yellow-300 text-gray-900'} disabled:opacity-60 font-extrabold py-3 rounded-xl text-sm transition-colors`}
              >
                {status === 'loading' ? 'Sending…' : `Get the ${packLabel} →`}
              </button>
              <p className="text-gray-600 text-xs text-center">
                Free forever. No spam. Unsubscribe anytime.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
