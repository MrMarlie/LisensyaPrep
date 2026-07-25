'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

// Google Auto Ads loader. Suppressed entirely on the Mock Board EXAM runner
// (paid, timed, ad-free per product spec). Everywhere else it loads as before.
export default function AutoAds() {
  const pathname = usePathname();
  const isExam = /^\/mock-board\/[^/]+\/exam(\/|$)/.test(pathname || '');
  if (isExam) return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4592431148309561"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
