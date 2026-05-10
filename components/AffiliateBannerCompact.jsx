'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { trackClick } from '@/lib/affiliateLinks';

const SHOPEE_ORANGE = '#EE4D2D';

/**
 * Compact leaderboard-style affiliate banner.
 * Desktop: ~728×90 | Mobile: ~320×100
 *
 * Props:
 *   product   — single product object from affiliateLinks.js
 *   className — additional Tailwind classes for the outer wrapper
 *   slot      — slot identifier for click tracking ('sidebar' | 'compact')
 */
export default function AffiliateBannerCompact({ product, className = '', slot = 'compact' }) {
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  if (dismissed || !product) return null;

  const handleClick = () => {
    trackClick(product.id, pathname, slot);
  };

  return (
    <aside
      className={`relative flex items-center gap-3 bg-[#0f1629] border border-white/10 rounded-xl px-4 py-3 ${className}`}
      style={{ minHeight: 90 }}
      aria-label="Sponsored product recommendation"
    >
      {/* Product image / initial */}
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          width={52}
          height={52}
          loading="lazy"
          className="rounded-lg object-cover flex-shrink-0"
          style={{ width: 52, height: 52 }}
        />
      ) : (
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-lg text-white font-extrabold text-lg"
          style={{ backgroundColor: SHOPEE_ORANGE, width: 52, height: 52 }}
          aria-hidden="true"
        >
          {product.name.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-xs leading-snug line-clamp-1">{product.name}</p>
        <p className="text-gray-500 text-[10px] mt-0.5 leading-tight line-clamp-1">{product.desc}</p>
        <p className="text-gray-600 text-[9px] mt-1">Affiliate link — no extra cost to you</p>
      </div>

      {/* CTA */}
      <a
        href={product.url}
        target="_blank"
        rel="noopener nofollow sponsored"
        onClick={handleClick}
        className="flex-shrink-0 px-3 py-1.5 rounded-lg font-bold text-white text-xs transition-opacity hover:opacity-90 whitespace-nowrap"
        style={{ backgroundColor: SHOPEE_ORANGE }}
        aria-label={`Buy ${product.name} on Shopee`}
      >
        Buy on Shopee
      </a>

      {/* Dismiss */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-1.5 right-1.5 text-gray-600 hover:text-gray-400 transition-colors text-base leading-none"
        aria-label="Dismiss banner"
      >
        ×
      </button>
    </aside>
  );
}
