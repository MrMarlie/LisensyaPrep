'use client';

import Link from 'next/link';
import type { MasteryOffer } from '@/lib/popupOffers';
import { trackEvent } from '@/lib/analytics';

const ACCENT = {
  yellow: { btn: 'bg-yellow-400 hover:bg-yellow-300 text-gray-900', badge: 'text-yellow-400' },
  pink: { btn: 'bg-pink-500 hover:bg-pink-400 text-white', badge: 'text-pink-400' },
  green: { btn: 'bg-green-500 hover:bg-green-400 text-white', badge: 'text-green-400' },
} as const;

type Props = {
  offer: MasteryOffer;
  trigger?: string;
  onClose: () => void;
};

export default function MasteryUpsellPopup({ offer, trigger = 'unknown', onClose }: Props) {
  const a = ACCENT[offer.accent];

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

        <div className="text-center mb-5">
          <p className="text-3xl mb-2">🚀</p>
          <h2 className="text-white font-extrabold text-xl">{offer.name}</h2>
          <p className="text-gray-400 text-sm mt-1">{offer.tagline}</p>
        </div>

        <ul className="space-y-2 mb-5">
          {offer.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-gray-300 text-sm">
              <span className={`${a.badge} font-bold flex-shrink-0`}>✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="text-center mb-4">
          <span className="text-gray-400 text-sm">Launch price </span>
          <span className={`${a.badge} text-2xl font-extrabold`}>{offer.price}</span>
        </div>

        <Link
          href={offer.url}
          onClick={() => {
            trackEvent('mastery_upsell_click', { product: offer.name, trigger });
            onClose();
          }}
          className={`block w-full text-center ${a.btn} font-extrabold py-3 rounded-xl text-sm transition-colors`}
        >
          See the Full Reviewer →
        </Link>
        <button
          onClick={onClose}
          className="block w-full text-center text-gray-500 hover:text-gray-300 text-xs mt-3"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
