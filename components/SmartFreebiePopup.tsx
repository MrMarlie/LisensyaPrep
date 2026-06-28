'use client';

import { useState } from 'react';
import { markPackDownloaded } from '@/lib/popupOffers';

type Props = {
  type: 'profed' | 'gened' | 'auto' | 'pnle' | 'cle' | 'agri' | 'cse' | 'mtle';
  trigger?: string;
  onClose: () => void;
};

export default function SmartFreebiePopup({ type, trigger = 'unknown', onClose }: Props) {
  const [selectedPack, setSelectedPack] = useState<'profed' | 'gened'>(type === 'gened' ? 'gened' : 'profed');
  // CSE has two levels (Professional / SubProfessional) — user picks in the popup.
  const [cseLevel, setCseLevel] = useState<'pro' | 'subprof'>('pro');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isPNLE = type === 'pnle';
  const isCLE = type === 'cle';
  const isAgri = type === 'agri';
  const isCSE = type === 'cse';
  const isMTLE = type === 'mtle';
  // Packs delivered by a dedicated freebie endpoint (not the profed/gened popup endpoint)
  const isDirectPack = isPNLE || isCLE || isAgri || isCSE || isMTLE;
  const packLabel = isPNLE
    ? 'PNLE Nursing Starter Pack'
    : isCLE
      ? 'CLE Criminology Starter Pack'
      : isAgri
        ? 'Agriculture (ALE) Starter Pack'
        : isMTLE
          ? 'Medical Technology (MTLE) Starter Pack'
          : isCSE
            ? (cseLevel === 'pro' ? 'CSE Professional Starter Pack' : 'CSE SubProfessional Starter Pack')
            : selectedPack === 'profed' ? 'LET ProfEd Starter Pack' : 'LET Gen Ed Starter Pack';

  // Per-profession accent colors (PNLE pink, Agriculture green, MedTech cyan, others yellow).
  const accent = isPNLE
    ? { btn: 'bg-pink-500 hover:bg-pink-400 text-white', focus: 'focus:border-pink-400/50' }
    : isAgri
      ? { btn: 'bg-green-500 hover:bg-green-400 text-white', focus: 'focus:border-green-400/50' }
      : isMTLE
        ? { btn: 'bg-cyan-500 hover:bg-cyan-400 text-white', focus: 'focus:border-cyan-400/50' }
        : { btn: 'bg-yellow-400 hover:bg-yellow-300 text-gray-900', focus: 'focus:border-yellow-400/50' };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus('loading');
    try {
      let res: Response;
      if (isDirectPack) {
        const endpoint = isPNLE
          ? '/api/freebies/pnle-nursing-starter-pack'
          : isCLE
            ? '/api/freebies/cle-starter-pack'
            : isAgri
              ? '/api/freebies/agriculture-starter-pack'
              : isMTLE
                ? '/api/freebies/medical-technology-starter-pack'
                : cseLevel === 'pro'
                  ? '/api/freebies/cse-pro-starter-pack'
                  : '/api/freebies/cse-subprof-starter-pack';
        res = await fetch(endpoint, {
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

      // Record the download so we never resend a starter pack — afterwards the
      // user sees the Mastery upsell popup instead. Direct packs (pnle/cle/agri)
      // store their own type; CSE stores the chosen level (cse-pro / cse-subprof);
      // the LET selector stores the chosen pack.
      markPackDownloaded(isCSE ? `cse-${cseLevel}` : isDirectPack ? type : selectedPack);

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
              className={`mt-4 ${accent.btn} font-bold px-6 py-2.5 rounded-xl text-sm transition-colors`}
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
                  : isCLE
                    ? '30 CLE criminology questions with full rationales — delivered to your email instantly.'
                    : isAgri
                      ? '30 agriculture (ALE) questions with full rationales — delivered to your email instantly.'
                      : isMTLE
                        ? '30 medical technology (MTLE) questions with full rationales — delivered to your email instantly.'
                        : isCSE
                          ? '30 Civil Service Exam questions with full rationales — delivered to your email instantly.'
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

            {isCSE && (
              <div className="flex gap-2 mb-4">
                {(['pro', 'subprof'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setCseLevel(level)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-colors ${
                      cseLevel === level
                        ? 'bg-yellow-400 text-gray-900 border-yellow-400'
                        : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {level === 'pro' ? '📊 Professional' : '📋 SubProfessional'}
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
                className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none ${accent.focus} transition-colors`}
                style={{ fontSize: '16px' }}
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none ${accent.focus} transition-colors`}
                style={{ fontSize: '16px' }}
              />
              {status === 'error' && (
                <p className="text-red-400 text-xs">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full ${accent.btn} disabled:opacity-60 font-extrabold py-3 rounded-xl text-sm transition-colors`}
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
