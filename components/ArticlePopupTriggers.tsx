'use client';

import { useState, useEffect, useRef } from 'react';
import SmartFreebiePopup from '@/components/SmartFreebiePopup';

type Props = {
  type: 'profed' | 'gened' | 'auto' | 'pnle';
};

export default function ArticlePopupTriggers({ type }: Props) {
  const [showPopup, setShowPopup] = useState(false);
  const [activeTrigger, setActiveTrigger] = useState<string>('scroll');
  const shownRef = useRef(false);

  function shouldShow(): boolean {
    if (shownRef.current) return false;
    try {
      if (sessionStorage.getItem('lp_popup_shown')) return false;
      if (localStorage.getItem('lp_mastery_purchased')) return false;
    } catch { /* ignore */ }
    return true;
  }

  function triggerPopup(trigger: string) {
    if (!shouldShow()) return;
    shownRef.current = true;
    try { sessionStorage.setItem('lp_popup_shown', '1'); } catch { /* ignore */ }
    setActiveTrigger(trigger);
    setShowPopup(true);
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

  if (!showPopup) return null;

  return (
    <SmartFreebiePopup
      type={type}
      trigger={activeTrigger}
      onClose={() => setShowPopup(false)}
    />
  );
}
