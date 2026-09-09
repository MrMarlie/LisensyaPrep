'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Google Auto Ads loader. Suppressed on:
//  - the Mock Board EXAM runner (paid, timed, ad-free per product spec)
//  - the free /quiz "battle" runner (Auto Ads interstitials + a fixed bottom
//    "anchor" ad overlay the player-setup modal and answer cards, swallowing
//    taps on the "Start Battle" button so the quiz never starts; the quiz places
//    its own affiliate banners intentionally)
//  - all /admin pages (internal tooling)
//  - all /premium pages, incl. landing/checkout/thank-you (paid product funnel)
//  - any /checkout route (e.g. mock-board checkout)
// Everywhere else it loads as before.
export default function AutoAds() {
  const pathname = usePathname();
  const p = pathname || '';
  const isSuppressed =
    /^\/mock-board\/[^/]+\/exam(\/|$)/.test(p) ||
    /^\/quiz(\/|$)/.test(p) ||
    /^\/admin(\/|$)/.test(p) ||
    /^\/premium(\/|$)/.test(p) ||
    /\/checkout(\/|$)/.test(p);
  if (isSuppressed) return <AdSuppressor />;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4592431148309561"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

// Not loading the <Script> is not enough on its own: Next keeps already-mounted
// <Script> tags across client-side navigations, so when a user reaches an
// ad-free route from an ad-bearing one (e.g. clicks "Battle Now" on a module
// page → /quiz), the Auto Ads script is still live and keeps injecting a fixed
// bottom anchor ad and vignette interstitials that cover interactive UI.
// Hide those overlays with CSS (display:none also stops them intercepting
// clicks) and strip any that are already mounted. None of the site's own
// affiliate banners use `ins.adsbygoogle`, so this only affects Google ads.
function AdSuppressor() {
  useEffect(() => {
    // The CSS below hides the ads (a display:none element can't intercept
    // clicks, and the anchor is position:fixed so hiding it reclaims no
    // layout). The only thing CSS can't undo is the full-screen vignette
    // interstitial's scroll-lock, which Google applies as an inline
    // overflow:hidden on <html>/<body> — clear that here whenever it reappears.
    const unlockScroll = () => {
      if (document.documentElement.style.overflow) document.documentElement.style.overflow = '';
      if (document.body.style.overflow) document.body.style.overflow = '';
    };
    unlockScroll();
    const obs = new MutationObserver(unlockScroll);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
    obs.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    return () => obs.disconnect();
  }, []);

  return (
    <style>{`
      ins.adsbygoogle,
      .google-auto-placed,
      #google_vignette,
      .google-vignette,
      ins[data-anchor-status],
      ins[data-vignette-loaded] { display: none !important; }
    `}</style>
  );
}
