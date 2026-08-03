'use client';

import { useState } from 'react';

type Exam = { key: 'gened' | 'profed'; label: string; segment: string; price: number };

const EXAMS: Exam[] = [
  { key: 'gened', label: '📢 Announce Gen Ed Mock Board', segment: 'Gen Ed Starter Pack subscribers', price: 49 },
  { key: 'profed', label: '📢 Announce Prof Ed Mock Board', segment: 'Prof Ed Starter Pack subscribers', price: 59 },
];

function AnnounceButton({ exam }: { exam: Exam }) {
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
      const res = await fetch('/api/admin/announce-mock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam: exam.key }),
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
    <div className="bg-[#0f1629] border border-yellow-400/30 rounded-xl p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-yellow-400 font-bold text-sm mb-1">{exam.label}</p>
          <p className="text-gray-500 text-xs">
            Emails every {exam.segment} that the ₱{exam.price} Mock Board is live.
          </p>
          {result && (
            <p className={`text-xs mt-2 font-medium ${status === 'done' ? 'text-green-400' : 'text-red-400'}`}>
              {result}
            </p>
          )}
          {confirmed && status === 'idle' && (
            <p className="text-yellow-400 text-xs mt-2 font-semibold">
              ⚠️ Click again to confirm — this emails all {exam.segment}.
            </p>
          )}
        </div>
        <button
          onClick={handleSend}
          disabled={status === 'sending' || status === 'done'}
          className={`flex-shrink-0 font-bold px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
            confirmed && status === 'idle'
              ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900'
              : status === 'done'
              ? 'bg-green-900/40 border border-green-500/30 text-green-400'
              : 'bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/30 text-yellow-400'
          }`}
        >
          {status === 'sending' ? 'Sending...' : status === 'done' ? '✅ Sent' : confirmed ? 'Confirm Send' : 'Send Announcement'}
        </button>
      </div>
    </div>
  );
}

export default function AnnounceMockButtons() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {EXAMS.map((e) => (
        <AnnounceButton key={e.key} exam={e} />
      ))}
    </div>
  );
}
