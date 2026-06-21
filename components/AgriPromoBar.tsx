'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type PromoData = {
  claimed: number;
  total_slots: number;
  remaining: number;
  percent_filled: number;
  active: boolean;
  regular_price: number;
  discounted_price: number;
};

export default function AgriPromoBar({ variant }: { variant: 'full' | 'compact' }) {
  const [promo, setPromo] = useState<PromoData | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchPromo() {
    try {
      const res = await fetch('/api/promo/agri-first-100');
      if (!res.ok) return;
      const data = await res.json();
      setPromo(data);
    } catch {
      // fail silently — don't break the page
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPromo();
    const interval = setInterval(fetchPromo, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !promo || !promo.active) return null;

  const { remaining, percent_filled, discounted_price, regular_price } = promo;

  let headerText = '';
  let spotText = '';
  let barClass = '';
  let wrapperClass = '';
  let textClass = '';
  let pulse = false;

  if (percent_filled <= 50) {
    headerText = '🌾 FIRST 100 BUYERS PROMO';
    spotText = `Only ${remaining} spots left at this price!`;
    barClass = 'bg-green-400';
    wrapperClass = 'bg-[#02160c] border-green-400/40';
    textClass = 'text-green-400';
  } else if (percent_filled <= 89) {
    headerText = '🔥 FILLING UP FAST — FIRST 100 PROMO';
    spotText = `Only ${remaining} spots left — don't miss out!`;
    barClass = 'bg-gradient-to-r from-green-400 to-emerald-300';
    wrapperClass = 'bg-[#031a0d] border-emerald-400/40';
    textClass = 'text-emerald-400';
  } else {
    headerText = '⚠️ LAST CHANCE — FIRST 100 PROMO';
    spotText = `🔥 LAST ${remaining} SPOTS!`;
    barClass = 'bg-red-500';
    wrapperClass = 'bg-[#1a0500] border-red-400/40';
    textClass = 'text-red-400';
    pulse = true;
  }

  if (variant === 'compact') {
    return (
      <div className={`rounded-xl border px-4 py-3 mb-4 ${wrapperClass} ${pulse ? 'animate-pulse' : ''}`}>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className={`font-bold text-sm ${textClass}`}>{spotText}</p>
            <p className="text-gray-400 text-xs mt-0.5">
              ₱{discounted_price} launch price → ₱{regular_price} after first 100 buyers
            </p>
          </div>
          <p className="text-gray-500 text-xs flex-shrink-0">{promo.claimed}/{promo.total_slots} claimed</p>
        </div>
        <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barClass}`}
            style={{ width: `${percent_filled}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <section className={`border-b px-4 py-6 ${wrapperClass} ${pulse ? 'animate-pulse' : ''}`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className={`font-extrabold text-base ${textClass}`}>{headerText}</p>
            <p className={`font-bold text-lg mt-0.5 ${textClass}`}>{spotText}</p>
            <p className="text-gray-300 text-sm mt-1">
              Save ₱{regular_price - discounted_price} — launch price{' '}
              <strong className="text-white">₱{discounted_price}</strong>
              <span className="text-gray-500 line-through ml-2 text-xs">₱{regular_price}</span>
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 max-w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barClass}`}
                  style={{ width: `${percent_filled}%` }}
                />
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">
                {promo.claimed} of {promo.total_slots} claimed
              </span>
            </div>
          </div>
          <Link
            href="/premium/agri-mastery/checkout"
            className="flex-shrink-0 bg-green-500 hover:bg-green-400 text-white font-extrabold px-6 py-3 rounded-xl text-base transition-colors shadow-lg whitespace-nowrap"
          >
            LOCK IN ₱{discounted_price} →
          </Link>
        </div>
      </div>
    </section>
  );
}
