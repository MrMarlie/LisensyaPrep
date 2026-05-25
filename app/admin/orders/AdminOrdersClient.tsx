'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Order = {
  id: string;
  order_id: string;
  full_name: string;
  email: string;
  gcash_ref: string;
  payment_date: string;
  phone: string | null;
  referral_source: string;
  status: string;
  amount: number;
  product?: string;
  created_at: string;
  verified_at: string | null;
  delivered_at: string | null;
};

const PRODUCT_LABELS: Record<string, string> = {
  profed: '🎓 ProfEd',
  gened: '📗 Gen Ed',
  bundle: '🎁 Bundle',
  'pnle-mastery': '🏥 PNLE',
};

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-400/10 text-yellow-400',
  verified: 'bg-blue-400/10 text-blue-400',
  delivered: 'bg-green-400/10 text-green-400',
  refunded: 'bg-red-400/10 text-red-400',
};

export default function AdminOrdersClient({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  async function handleAction(orderId: string, action: 'deliver' | 'refund') {
    setLoading((l) => ({ ...l, [orderId]: true }));
    setMessage('');
    try {
      const res = await fetch('/api/orders/deliver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, action: action === 'refund' ? 'refund' : undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Action failed.');
      setMessage(action === 'deliver' ? `✅ Delivered to ${orderId}` : `Refund marked for ${orderId}`);
      router.refresh();
    } catch (err: unknown) {
      setMessage(`❌ ${err instanceof Error ? err.message : 'Error'}`);
    } finally {
      setLoading((l) => ({ ...l, [orderId]: false }));
    }
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {['all', 'pending', 'verified', 'delivered', 'refunded'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              filter === f ? 'bg-yellow-400 text-gray-900' : 'bg-[#0f1629] border border-white/10 text-gray-300 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {message && (
        <div className="mb-4 bg-[#0f1629] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300">
          {message}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-gray-500 text-center py-16">No orders found.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <div key={order.id} className="bg-[#0f1629] border border-white/10 rounded-xl p-5">
              <div className="flex flex-wrap gap-4 justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-white font-bold">{order.full_name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_STYLES[order.status] || 'bg-gray-400/10 text-gray-400'}`}>
                      {order.status}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
                      {PRODUCT_LABELS[order.product || 'profed'] || order.product || 'ProfEd'}
                    </span>
                  </div>
                  <p className="text-yellow-400 text-xs font-mono">{order.order_id}</p>
                </div>
                <div className="text-right text-sm text-gray-400">
                  <p>{new Date(order.created_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  <p className="text-yellow-400 font-bold">₱{order.amount}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm mb-4">
                <p className="text-gray-400">Email: <span className="text-gray-200">{order.email}</span></p>
                <p className="text-gray-400">GCash Ref: <span className="text-gray-200 font-mono">{order.gcash_ref}</span></p>
                <p className="text-gray-400">Payment Date: <span className="text-gray-200">{order.payment_date}</span></p>
                <p className="text-gray-400">Phone: <span className="text-gray-200">{order.phone || '—'}</span></p>
                <p className="text-gray-400">Referral: <span className="text-gray-200 capitalize">{order.referral_source}</span></p>
              </div>

              {order.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(order.order_id, 'deliver')}
                    disabled={loading[order.order_id]}
                    className="bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-gray-900 font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    {loading[order.order_id] ? 'Sending...' : '✅ Verify & Send Confirmation'}
                  </button>
                  <button
                    onClick={() => handleAction(order.order_id, 'refund')}
                    disabled={loading[order.order_id]}
                    className="bg-red-900/30 hover:bg-red-900/50 border border-red-500/30 text-red-400 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Refund
                  </button>
                </div>
              )}
              {order.status === 'verified' && (
                <button
                  onClick={() => handleAction(order.order_id, 'deliver')}
                  disabled={loading[order.order_id]}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  {loading[order.order_id] ? 'Sending...' : '📧 Resend Confirmation'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
