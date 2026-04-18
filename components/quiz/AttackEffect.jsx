'use client';

import { useEffect, useState } from 'react';

// Overlay animation effect for correct/wrong answers

export default function AttackEffect({ type, damage, penalty, onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  if (type === 'attack') {
    return (
      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
        {/* Screen flash */}
        <div className="absolute inset-0 bg-yellow-400/10 animate-ping" style={{ animationDuration: '0.4s' }} />
        {/* Damage number */}
        <div className="relative animate-bounce">
          <div className="bg-yellow-400 text-gray-900 font-black text-4xl px-6 py-3 rounded-2xl shadow-2xl shadow-yellow-400/50 border-4 border-yellow-300">
            ⚔️ -{damage} HP
          </div>
          <div className="absolute -top-2 -right-2 text-2xl animate-spin" style={{ animationDuration: '0.5s' }}>
            ✨
          </div>
        </div>
      </div>
    );
  }

  if (type === 'penalty') {
    return (
      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
        {/* Red flash */}
        <div className="absolute inset-0 bg-red-500/15 animate-pulse" style={{ animationDuration: '0.3s' }} />
        {/* Penalty number */}
        <div className="relative">
          <div className="bg-red-500 text-white font-black text-4xl px-6 py-3 rounded-2xl shadow-2xl shadow-red-500/50 border-4 border-red-400 animate-shake">
            💔 -{penalty} HP
          </div>
        </div>
      </div>
    );
  }

  return null;
}
