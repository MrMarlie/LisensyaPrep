'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

export default function FreebieStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('freebie-bar-dismissed');
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem('freebie-bar-dismissed', '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0f1629] border-t border-yellow-400/30 px-4 py-3 flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-bold truncate">🎁 FREE LET ProfEd Starter Pack</p>
        <p className="text-gray-400 text-xs">30 questions · Full rationales · Free</p>
      </div>
      <Link
        href="/freebies/let-profed-starter-pack"
        onClick={() => trackEvent('freebie_cta_click', { source: 'sticky_bar' })}
        className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors flex-shrink-0"
      >
        Download →
      </Link>
      <button
        onClick={dismiss}
        className="text-gray-500 hover:text-white flex-shrink-0 text-lg leading-none"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
