'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type PromoCounter = {
  id: string;
  promo_name: string;
  total_slots: number;
  claimed: number;
  active: boolean;
  discount_amount: number;
  regular_price: number;
  discounted_price: number;
  updated_at: string;
};

type AuditEntry = {
  id: string;
  promo_id: string;
  action: string;
  old_value: Record<string, unknown>;
  new_value: Record<string, unknown>;
  performed_by: string;
  reason: string | null;
  created_at: string;
};

type ModalType = 'counter' | 'pricing' | 'pause' | 'resume' | 'reset' | 'extend' | null;

export default function AdminPromosClient({ promo, auditLog }: { promo: PromoCounter; auditLog: AuditEntry[] }) {
  const router = useRouter();
  const [modal, setModal] = useState<ModalType>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [claimedInput, setClaimedInput] = useState(String(promo.claimed));
  const [totalSlotsInput, setTotalSlotsInput] = useState(String(promo.total_slots));
  const [regularPriceInput, setRegularPriceInput] = useState(String(promo.regular_price));
  const [discountedPriceInput, setDiscountedPriceInput] = useState(String(promo.discounted_price));
  const [additionalSlotsInput, setAdditionalSlotsInput] = useState('10');
  const [reasonInput, setReasonInput] = useState('');

  const remaining = Math.max(0, promo.total_slots - promo.claimed);
  const percentFilled = Math.round((promo.claimed / promo.total_slots) * 100);

  async function postAction(action: string, payload?: Record<string, unknown>) {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, promo_id: promo.id, payload }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Action failed.');
      setMessage(`✅ "${action}" completed.`);
      setModal(null);
      setReasonInput('');
      router.refresh();
    } catch (err: unknown) {
      setMessage(`❌ ${err instanceof Error ? err.message : 'Error'}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Promo Status Card */}
      <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-white font-extrabold text-lg">{promo.promo_name}</p>
            <p className="text-gray-500 text-sm font-mono">{promo.id}</p>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full font-bold ${promo.active ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
            {promo.active ? '🟢 ACTIVE' : '⏸️ PAUSED'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {[
            { label: 'Claimed', value: promo.claimed, color: 'text-yellow-400' },
            { label: 'Total Slots', value: promo.total_slots, color: 'text-white' },
            { label: 'Remaining', value: remaining, color: remaining <= 10 ? 'text-red-400' : 'text-green-400' },
            { label: 'Filled', value: `${percentFilled}%`, color: 'text-white' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#080d1b] rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">{label}</p>
              <p className={`text-xl font-extrabold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${percentFilled}%` }} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-[#080d1b] rounded-xl p-3">
            <p className="text-gray-500 text-xs mb-1">Launch Price</p>
            <p className="text-yellow-400 font-bold text-lg">₱{promo.discounted_price}</p>
          </div>
          <div className="bg-[#080d1b] rounded-xl p-3">
            <p className="text-gray-500 text-xs mb-1">Regular Price</p>
            <p className="text-white font-bold text-lg">₱{promo.regular_price}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={() => setModal('counter')} className="bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-bold px-4 py-2 rounded-lg text-sm hover:bg-yellow-400/20 transition-colors">
            Edit Counter
          </button>
          <button onClick={() => setModal('pricing')} className="bg-blue-400/10 border border-blue-400/30 text-blue-400 font-bold px-4 py-2 rounded-lg text-sm hover:bg-blue-400/20 transition-colors">
            Edit Pricing
          </button>
          <button onClick={() => setModal('extend')} className="bg-green-400/10 border border-green-400/30 text-green-400 font-bold px-4 py-2 rounded-lg text-sm hover:bg-green-400/20 transition-colors">
            Extend Slots
          </button>
          {promo.active ? (
            <button onClick={() => setModal('pause')} className="bg-orange-400/10 border border-orange-400/30 text-orange-400 font-bold px-4 py-2 rounded-lg text-sm hover:bg-orange-400/20 transition-colors">
              Pause Promo
            </button>
          ) : (
            <>
              <button onClick={() => setModal('resume')} className="bg-green-400/10 border border-green-400/30 text-green-400 font-bold px-4 py-2 rounded-lg text-sm hover:bg-green-400/20 transition-colors">
                Resume Promo
              </button>
              <button onClick={() => setModal('reset')} className="bg-red-900/30 border border-red-500/30 text-red-400 font-bold px-4 py-2 rounded-lg text-sm hover:bg-red-900/50 transition-colors">
                Reset Counter
              </button>
            </>
          )}
        </div>
      </div>

      {message && (
        <div className="bg-[#0f1629] border border-white/10 rounded-xl px-4 py-3 mb-4 text-sm text-gray-300">{message}</div>
      )}

      {/* Modals */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080d1b]/90 px-4" onClick={() => setModal(null)}>
          <div className="relative w-full max-w-md bg-[#0f1629] border border-white/10 rounded-2xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white text-lg leading-none">✕</button>

            {modal === 'counter' && (
              <>
                <h3 className="text-white font-extrabold mb-4">Edit Counter</h3>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Claimed (current: {promo.claimed})</label>
                    <input type="number" value={claimedInput} onChange={e => setClaimedInput(e.target.value)} className="w-full bg-[#080d1b] border border-white/20 rounded-lg px-3 py-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Total Slots (current: {promo.total_slots})</label>
                    <input type="number" value={totalSlotsInput} onChange={e => setTotalSlotsInput(e.target.value)} className="w-full bg-[#080d1b] border border-white/20 rounded-lg px-3 py-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Reason (optional)</label>
                    <input type="text" value={reasonInput} onChange={e => setReasonInput(e.target.value)} placeholder="e.g. Manual correction for refund" className="w-full bg-[#080d1b] border border-white/20 rounded-lg px-3 py-2 text-white text-sm" />
                  </div>
                </div>
                <button disabled={loading} onClick={() => postAction('edit_counter', { claimed: claimedInput, total_slots: totalSlotsInput, reason: reasonInput })} className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl text-sm disabled:opacity-60">
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            )}

            {modal === 'pricing' && (
              <>
                <h3 className="text-white font-extrabold mb-4">Edit Pricing</h3>
                <p className="text-gray-500 text-xs mb-4">Affects new orders only — existing buyers keep their locked price.</p>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Regular Price (₱)</label>
                    <input type="number" value={regularPriceInput} onChange={e => setRegularPriceInput(e.target.value)} className="w-full bg-[#080d1b] border border-white/20 rounded-lg px-3 py-2 text-white text-sm" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Discounted Price (₱)</label>
                    <input type="number" value={discountedPriceInput} onChange={e => setDiscountedPriceInput(e.target.value)} className="w-full bg-[#080d1b] border border-white/20 rounded-lg px-3 py-2 text-white text-sm" />
                  </div>
                </div>
                <button disabled={loading} onClick={() => postAction('edit_pricing', { regular_price: regularPriceInput, discounted_price: discountedPriceInput })} className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl text-sm disabled:opacity-60">
                  {loading ? 'Saving...' : 'Save Pricing'}
                </button>
              </>
            )}

            {modal === 'pause' && (
              <>
                <h3 className="text-white font-extrabold mb-2">Pause Promo?</h3>
                <p className="text-gray-400 text-sm mb-6">The status bar will disappear from all pages until you resume.</p>
                <div className="flex gap-2">
                  <button onClick={() => setModal(null)} className="flex-1 bg-white/5 border border-white/10 text-gray-300 font-bold py-3 rounded-xl text-sm">Cancel</button>
                  <button disabled={loading} onClick={() => postAction('pause')} className="flex-1 bg-orange-400 text-gray-900 font-bold py-3 rounded-xl text-sm disabled:opacity-60">
                    {loading ? 'Pausing...' : 'Confirm Pause'}
                  </button>
                </div>
              </>
            )}

            {modal === 'resume' && (
              <>
                <h3 className="text-white font-extrabold mb-2">Resume Promo?</h3>
                <p className="text-gray-400 text-sm mb-6">The status bar will reappear on all pages.</p>
                <div className="flex gap-2">
                  <button onClick={() => setModal(null)} className="flex-1 bg-white/5 border border-white/10 text-gray-300 font-bold py-3 rounded-xl text-sm">Cancel</button>
                  <button disabled={loading} onClick={() => postAction('resume')} className="flex-1 bg-green-400 text-gray-900 font-bold py-3 rounded-xl text-sm disabled:opacity-60">
                    {loading ? 'Resuming...' : 'Resume'}
                  </button>
                </div>
              </>
            )}

            {modal === 'reset' && (
              <>
                <h3 className="text-red-400 font-extrabold mb-2">Reset Counter?</h3>
                <p className="text-gray-400 text-sm mb-6">Sets claimed back to 0. Promo stays paused. This cannot be undone.</p>
                <div className="flex gap-2">
                  <button onClick={() => setModal(null)} className="flex-1 bg-white/5 border border-white/10 text-gray-300 font-bold py-3 rounded-xl text-sm">Cancel</button>
                  <button disabled={loading} onClick={() => postAction('reset')} className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl text-sm disabled:opacity-60">
                    {loading ? 'Resetting...' : 'RESET'}
                  </button>
                </div>
              </>
            )}

            {modal === 'extend' && (
              <>
                <h3 className="text-white font-extrabold mb-4">Extend Slots</h3>
                <div className="mb-4">
                  <label className="text-gray-400 text-xs mb-1 block">Additional Slots to Add</label>
                  <input type="number" value={additionalSlotsInput} onChange={e => setAdditionalSlotsInput(e.target.value)} className="w-full bg-[#080d1b] border border-white/20 rounded-lg px-3 py-2 text-white text-sm" />
                  <p className="text-gray-500 text-xs mt-1">New total: {promo.total_slots + Number(additionalSlotsInput || 0)} slots</p>
                </div>
                <button disabled={loading} onClick={() => postAction('extend', { additional_slots: additionalSlotsInput })} className="w-full bg-green-400 text-gray-900 font-bold py-3 rounded-xl text-sm disabled:opacity-60">
                  {loading ? 'Extending...' : 'Extend'}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Audit Log */}
      <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6">
        <h2 className="text-white font-extrabold mb-4">Audit Log (Last 50)</h2>
        {auditLog.length === 0 ? (
          <p className="text-gray-500 text-sm">No actions yet.</p>
        ) : (
          <div className="space-y-2">
            {auditLog.map((entry) => (
              <div key={entry.id} className="bg-[#080d1b] rounded-lg p-3 text-sm">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-yellow-400 font-mono font-bold">{entry.action}</span>
                  <span className="text-gray-600 text-xs flex-shrink-0">{new Date(entry.created_at).toLocaleString('en-PH')}</span>
                </div>
                <p className="text-gray-400 text-xs mt-1">
                  By: {entry.performed_by}{entry.reason ? ` — ${entry.reason}` : ''}
                </p>
                <p className="text-gray-600 text-xs font-mono mt-0.5">
                  {JSON.stringify(entry.old_value)} → {JSON.stringify(entry.new_value)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
