'use client';

import Link from 'next/link';
import type { MockOffer } from '@/lib/popupOffers';
import { trackEvent } from '@/lib/analytics';

type Props = {
  offer: MockOffer;
  trigger?: string;
  onClose: () => void;
};

export default function MockCampaignPopup({ offer, trigger = 'unknown', onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#080d1b]/95 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#0f1629] border border-yellow-400/20 rounded-2xl p-6 shadow-2xl relative"
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
          <p className="text-3xl mb-2">🧪</p>
          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 uppercase tracking-widest mb-2">
            New · Timed Mock Board
          </span>
          <h2 className="text-white font-extrabold text-xl">{offer.title}</h2>
          <p className="text-gray-400 text-sm mt-1">{offer.tagline}</p>
        </div>

        <ul className="space-y-2 mb-5">
          {offer.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-gray-300 text-sm">
              <span className="text-yellow-400 font-bold flex-shrink-0">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="text-center mb-4">
          <span className="text-yellow-400 text-2xl font-extrabold">{offer.price}</span>
          <span className="text-gray-500 text-sm"> · unlimited retakes until Oct 1</span>
        </div>

        <Link
          href={offer.url}
          onClick={() => {
            trackEvent('mock_campaign_click', { product: offer.title, trigger });
            onClose();
          }}
          className="block w-full text-center bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold py-3 rounded-xl text-sm transition-colors"
        >
          Try the Mock Board →
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
