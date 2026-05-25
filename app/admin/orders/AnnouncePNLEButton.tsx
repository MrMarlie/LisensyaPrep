'use client';

import { useState } from 'react';

export default function AnnouncePNLEButton() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [result, setResult] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  async function handleSend() {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    setStatus('sending');
    setResult('');
    try {
      const res = await fetch('/api/admin/announce-pnle-mastery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed.');
      setStatus('done');
      setResult(data.message || `Sent ${data.sent} emails.`);
    } catch (err: unknown) {
      setStatus('error');
      setResult(err instanceof Error ? err.message : 'Error sending emails.');
    }
  }

  return (
    <div className="bg-[#0f1629] border border-pink-400/30 rounded-xl p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-pink-400 font-bold text-sm mb-1">🏥 PNLE Mastery Launch Announcement</p>
          <p className="text-gray-500 text-xs">
            Send one email to every PNLE Starter Pack subscriber announcing the Mastery System is live at ₱199.
          </p>
          {result && (
            <p className={`text-xs mt-2 font-medium ${status === 'done' ? 'text-green-400' : 'text-red-400'}`}>
              {result}
            </p>
          )}
          {confirmed && status === 'idle' && (
            <p className="text-yellow-400 text-xs mt-2 font-semibold">
              ⚠️ Click again to confirm — this will email all PNLE starter pack subscribers.
            </p>
          )}
        </div>
        <button
          onClick={handleSend}
          disabled={status === 'sending' || status === 'done'}
          className={`flex-shrink-0 font-bold px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
            confirmed && status === 'idle'
              ? 'bg-pink-500 hover:bg-pink-400 text-white'
              : status === 'done'
              ? 'bg-green-900/40 border border-green-500/30 text-green-400'
              : 'bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/30 text-pink-400'
          }`}
        >
          {status === 'sending' ? 'Sending...' : status === 'done' ? '✅ Sent' : confirmed ? 'Confirm Send' : 'Send Announcement'}
        </button>
      </div>
    </div>
  );
}
