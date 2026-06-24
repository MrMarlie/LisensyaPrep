'use client';

import { useState, useEffect } from 'react';
import SmartFreebiePopup from '@/components/SmartFreebiePopup';
import { decidePopup } from '@/lib/popupOffers';

type Props = {
  type: 'profed' | 'gened';
};

const DELAY_MS = 90_000;

export default function MasteryPopupTrigger({ type }: Props) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('lp_popup_shown')) return;
    } catch { /* ignore */ }

    const timer = setTimeout(() => {
      try {
        if (sessionStorage.getItem('lp_popup_shown')) return;
      } catch { /* ignore */ }
      // Only the lead-capture freebie makes sense here. If the user already has
      // a pack (or bought), don't pop — they're already on the Mastery page.
      if (decidePopup(type).kind !== 'freebie') return;
      try { sessionStorage.setItem('lp_popup_shown', '1'); } catch { /* ignore */ }
      setShowPopup(true);
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!showPopup) return null;

  return (
    <SmartFreebiePopup
      type={type}
      trigger="time"
      onClose={() => setShowPopup(false)}
    />
  );
}
