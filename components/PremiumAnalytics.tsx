'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export function PremiumPageViewTracker({ event }: { event: string }) {
  useEffect(() => {
    trackEvent(event);
  }, [event]);
  return null;
}

export function PremiumCtaButton({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      onClick={() => trackEvent('premium_cta_click', { destination: href })}
      className={className}
    >
      {children}
    </a>
  );
}
