'use client';

import { useState, useEffect, useRef } from 'react';
import SmartFreebiePopup from '@/components/SmartFreebiePopup';
import MasteryUpsellPopup from '@/components/MasteryUpsellPopup';
import { decidePopup, type PopupType, type PopupDecision } from '@/lib/popupOffers';

type Props = {
  type: PopupType;
};

export default function ArticlePopupTriggers({ type }: Props) {
  const [decision, setDecision] = useState<PopupDecision | null>(null);
  const [activeTrigger, setActiveTrigger] = useState<string>('scroll');
  const shownRef = useRef(false);

  function triggerPopup(trigger: string) {
    if (shownRef.current) return;
    try {
      if (sessionStorage.getItem('lp_popup_shown')) return;
    } catch { /* ignore */ }

    const d = decidePopup(type);
    if (d.kind === 'none') return; // already a buyer (or no offer) — show nothing

    shownRef.current = true;
    try { sessionStorage.setItem('lp_popup_shown', '1'); } catch { /* ignore */ }
    setActiveTrigger(trigger);
    setDecision(d);
  }

  useEffect(() => {
    function handleScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total >= 0.7) {
        triggerPopup('scroll');
        window.removeEventListener('scroll', handleScroll);
      }
    }

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) {
        triggerPopup('exit-intent');
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    }

    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    function handleMobileExit() {
      const now = Date.now();
      const delta = lastScrollY - window.scrollY;
      const timeDelta = now - lastScrollTime;
      if (delta > 80 && timeDelta < 300) {
        triggerPopup('exit-intent');
        window.removeEventListener('scroll', handleMobileExit);
      }
      lastScrollY = window.scrollY;
      lastScrollTime = now;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleMobileExit, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleMobileExit);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!decision) return null;

  if (decision.kind === 'mastery') {
    return (
      <MasteryUpsellPopup
        offer={decision.offer}
        trigger={activeTrigger}
        onClose={() => setDecision(null)}
      />
    );
  }

  return (
    <SmartFreebiePopup
      type={type}
      trigger={activeTrigger}
      onClose={() => setDecision(null)}
    />
  );
}
