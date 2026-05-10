'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { trackClick } from '@/lib/affiliateLinks';

// Shopee orange — matches brand recognition on the CTA button
const SHOPEE_ORANGE = '#EE4D2D';

function ProductImagePlaceholder({ name }) {
  const initial = name ? name.charAt(0).toUpperCase() : 'S';
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-xl text-white font-extrabold text-2xl"
      style={{ backgroundColor: SHOPEE_ORANGE, width: 80, height: 80 }}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}

function ProductCard({ product, scoreMessage, slot }) {
  const pathname = usePathname();

  const handleClick = () => {
    trackClick(product.id, pathname, slot || 'banner');
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          width={80}
          height={80}
          loading="lazy"
          className="rounded-xl object-cover flex-shrink-0"
          style={{ width: 80, height: 80 }}
        />
      ) : (
        <ProductImagePlaceholder name={product.name} />
      )}

      <div className="flex-1 min-w-0">
        {scoreMessage && (
          <p className="text-xs font-semibold text-yellow-400 mb-1">{scoreMessage}</p>
        )}
        <p className="text-white font-bold text-sm leading-snug line-clamp-2">{product.name}</p>
        <p className="text-gray-400 text-xs mt-1 leading-relaxed line-clamp-2">{product.desc}</p>
      </div>

      <a
        href={product.url}
        target="_blank"
        rel="noopener nofollow sponsored"
        onClick={handleClick}
        className="flex-shrink-0 px-4 py-2 rounded-lg font-bold text-white text-sm transition-opacity hover:opacity-90 whitespace-nowrap"
        style={{ backgroundColor: SHOPEE_ORANGE }}
        aria-label={`Buy ${product.name} on Shopee`}
      >
        Buy on Shopee
      </a>
    </div>
  );
}

/**
 * Full-width affiliate banner card.
 * Supports 1–3 products; shows each as a stacked card row.
 *
 * Props:
 *   products      — array of product objects from affiliateLinks.js
 *   scoreMessage  — optional string override shown above the first product (used in quiz game-over)
 *   className     — additional Tailwind classes for the outer wrapper
 *   slot          — slot identifier for click tracking ('banner' | 'sidebar')
 */
export default function AffiliateBanner({ products = [], scoreMessage, className = '', slot = 'banner' }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || products.length === 0) return null;

  return (
    <aside
      className={`relative bg-[#0f1629] border border-white/10 rounded-2xl p-5 ${className}`}
      aria-label="Sponsored product recommendation"
    >
      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-400 transition-colors text-lg leading-none"
        aria-label="Dismiss banner"
      >
        ×
      </button>

      {/* Products */}
      <div className="space-y-5 pr-4">
        {products.map((product, i) => (
          <div key={product.id}>
            {i > 0 && <div className="border-t border-white/10 pt-5" />}
            <ProductCard
              product={product}
              scoreMessage={i === 0 ? scoreMessage : undefined}
              slot={slot}
            />
          </div>
        ))}
      </div>

      {/* Disclosure */}
      <p className="text-gray-600 text-[10px] mt-4 leading-relaxed">
        Affiliate link. We may earn a commission at no extra cost to you.{' '}
        <a href="/disclosure" className="underline hover:text-gray-500 transition-colors">
          Learn more
        </a>
      </p>
    </aside>
  );
}
