'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

// Google Auto Ads loader. Suppressed on:
//  - the Mock Board EXAM runner (paid, timed, ad-free per product spec)
//  - all /admin pages (internal tooling)
//  - all /premium pages, incl. landing/checkout/thank-you (paid product funnel)
//  - any /checkout route (e.g. mock-board checkout)
// Everywhere else it loads as before.
export default function AutoAds() {
  const pathname = usePathname();
  const p = pathname || '';
  const isSuppressed =
    /^\/mock-board\/[^/]+\/exam(\/|$)/.test(p) ||
    /^\/admin(\/|$)/.test(p) ||
    /^\/premium(\/|$)/.test(p) ||
    /\/checkout(\/|$)/.test(p);
  if (isSuppressed) return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4592431148309561"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
