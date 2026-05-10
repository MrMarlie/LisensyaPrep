'use client';

import { usePathname } from 'next/navigation';
import { getProductsForPath } from '@/lib/affiliateLinks';
import AffiliateBanner from '@/components/AffiliateBanner';
import AffiliateBannerCompact from '@/components/AffiliateBannerCompact';

/**
 * Smart ad slot — shows contextual Shopee affiliate banners when products are mapped
 * for the current page. Falls back to a gray placeholder when no products match
 * (e.g. agriculture articles, general PRC guides).
 *
 * Supported slots: 'banner' (full-width), 'sidebar' (compact), 'square' (compact)
 */
export default function AdPlaceholder({ slot = 'banner', className = '' }) {
  const pathname = usePathname();
  const products = getProductsForPath(pathname, slot === 'square' ? 'banner' : slot);

  if (products.length === 0) {
    // Original gray placeholder — shown when no affiliate products match this page
    const heights = {
      banner: 'h-24',
      square: 'h-64',
      sidebar: 'h-[600px]',
    };
    const labels = {
      banner: 'Leaderboard',
      square: 'Medium Rectangle',
      sidebar: 'Half Page',
    };
    return (
      <div
        className={`w-full ${heights[slot] || 'h-24'} flex items-center justify-center bg-white/5 border border-white/10 rounded-xl ${className}`}
        aria-label="Advertisement"
      >
        <div className="text-center text-gray-600 select-none">
          <p className="text-xs font-medium uppercase tracking-widest mb-1">Ad</p>
          <p className="text-xs">{labels[slot] || 'Leaderboard'}</p>
        </div>
      </div>
    );
  }

  if (slot === 'sidebar') {
    return <AffiliateBannerCompact product={products[0]} className={className} slot="sidebar" />;
  }

  return <AffiliateBanner products={products} className={className} slot={slot} />;
}
