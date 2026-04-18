'use client';

import { useState } from 'react';
import { saveUserProfile } from '@/lib/storage';
import { containsProfanity } from '@/lib/profanityFilter';
import AuthModal from '@/components/auth/AuthModal';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PlayerSetupModal({ onComplete }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const nameError = (() => {
    if (!name.trim()) return 'Name is required.';
    if (containsProfanity(name)) return 'Please choose an appropriate name.';
    return null;
  })();

  const emailError = (() => {
    if (!email.trim()) return 'Email is required.';
    if (!EMAIL_RE.test(email)) return 'Enter a valid email address.';
    return null;
  })();

  const isValid = !nameError && !emailError;

  async function handleSubmit(e) {
    e.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);
    if (!isValid) return;
    await saveUserProfile(name.trim(), email.trim());
    onComplete(name.trim());
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080d1b]/95 px-4">
      <div className="w-full max-w-md bg-[#0f1629] border border-white/10 rounded-2xl p-8 shadow-2xl">
        {/* Branding */}
        <div className="text-center mb-6">
          <span className="text-4xl">⚔️</span>
          <h2 className="text-white font-extrabold text-2xl mt-2">Before you battle…</h2>
          <p className="text-gray-400 text-sm mt-1">
            Enter your name to personalize your HP bar.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-1">
              Your Name <span className="text-yellow-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              maxLength={20}
              placeholder="e.g. Juan dela Cruz"
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setNameTouched(true)}
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none focus:ring-2 transition-all ${
                nameTouched && nameError
                  ? 'border-red-500 focus:ring-red-500/40'
                  : 'border-white/10 focus:ring-yellow-400/40 focus:border-yellow-400/60'
              }`}
            />
            <div className="flex justify-between mt-1">
              {nameTouched && nameError ? (
                <p className="text-red-400 text-xs">{nameError}</p>
              ) : (
                <span />
              )}
              <p className="text-gray-600 text-xs">{name.length}/20</p>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-1">
              Email Address <span className="text-yellow-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              placeholder="e.g. juan@email.com"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none focus:ring-2 transition-all ${
                emailTouched && emailError
                  ? 'border-red-500 focus:ring-red-500/40'
                  : 'border-white/10 focus:ring-yellow-400/40 focus:border-yellow-400/60'
              }`}
            />
            {emailTouched && emailError && (
              <p className="text-red-400 text-xs mt-1">{emailError}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={nameTouched && emailTouched && !isValid}
            className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-extrabold py-3 rounded-xl text-base transition-all mt-2"
          >
            Start Battle →
          </button>
        </form>

        <p className="text-gray-600 text-xs text-center mt-4">
          Your info is saved only on this device.{' '}
          <button
            type="button"
            onClick={() => setShowAuth(true)}
            className="text-yellow-400 underline"
          >
            Sign in
          </button>{' '}
          to sync across devices.
        </p>
      </div>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}
