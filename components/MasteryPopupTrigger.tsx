'use client';

import { useState, useEffect } from 'react';
import SmartFreebiePopup from '@/components/SmartFreebiePopup';

type Props = {
  type: 'profed' | 'gened';
};

const DELAY_MS = 90_000;

export default function MasteryPopupTrigger({ type }: Props) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('lp_popup_shown')) return;
      if (localStorage.getItem('lp_mastery_purchased')) return;
    } catch { /* ignore */ }

    const timer = setTimeout(() => {
      try {
        if (sessionStorage.getItem('lp_popup_shown')) return;
        if (localStorage.getItem('lp_mastery_purchased')) return;
        sessionStorage.setItem('lp_popup_shown', '1');
      } catch { /* ignore */ }
      setShowPopup(true);
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  if (!showPopup) return null;

  return (
    <SmartFreebiePopup
      type={type}
      trigger="time"
      onClose={() => setShowPopup(false)}
    />
  );
}
