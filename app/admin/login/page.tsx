'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || 'Incorrect password.');
        return;
      }
      router.push('/admin/orders');
    } catch {
      setError('Server error. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-yellow-400 font-extrabold text-2xl">LisensyaPrep</p>
          <p className="text-gray-400 text-sm mt-1">Admin Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#0f1629] border border-white/10 rounded-2xl p-8 space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-[#080d1b] border border-white/20 rounded-xl px-4 py-3 text-white text-base placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 transition-colors"
              style={{ fontSize: '16px' }}
              autoFocus
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-gray-900 font-bold py-3 rounded-xl transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
