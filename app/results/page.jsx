'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { MODULE_INFO } from '@/lib/quizEngine';

function ResultsContent() {
  const params = useSearchParams();
  const moduleId = params.get('moduleId') || 'module-1';
  const passed = params.get('passed') === 'true';
  const correct = parseInt(params.get('correct') || '0', 10);
  const total = parseInt(params.get('total') || '30', 10);
  const percentage = parseInt(params.get('percentage') || '0', 10);

  const mod = MODULE_INFO[moduleId];
  const wrong = total - correct;

  const grade =
    percentage >= 90 ? { label: 'Outstanding', color: 'text-yellow-400', emoji: '🌟' }
    : percentage >= 80 ? { label: 'Very Good', color: 'text-green-400', emoji: '🎯' }
    : percentage >= 70 ? { label: 'Good', color: 'text-blue-400', emoji: '👍' }
    : percentage >= 60 ? { label: 'Passing', color: 'text-orange-400', emoji: '✅' }
    : { label: 'Needs Improvement', color: 'text-red-400', emoji: '📚' };

  // Find next module
  const allMods = Object.values(MODULE_INFO);
  const currentIdx = allMods.findIndex(m => m.id === moduleId);
  const nextMod = allMods[currentIdx + 1] || null;

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4">
        {/* Result header */}
        <div className={`rounded-3xl border-2 p-8 text-center mb-6 ${
          passed
            ? 'bg-yellow-400/10 border-yellow-400'
            : 'bg-red-500/10 border-red-500'
        }`}>
          <p className="text-6xl mb-3">{passed ? '🏆' : '💀'}</p>
          <h1 className={`text-3xl font-extrabold mb-2 ${passed ? 'text-yellow-400' : 'text-red-400'}`}>
            {passed ? 'Stage Complete!' : 'Stage Failed'}
          </h1>
          <p className="text-gray-400">
            {passed
              ? 'You defeated the boss and earned a PRZ piece!'
              : 'Your HP ran out. Review the topics and try again.'}
          </p>
        </div>

        {/* Score summary */}
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-bold text-lg mb-5">Score Summary</h2>

          {/* Big score */}
          <div className="text-center mb-6">
            <p className={`text-7xl font-extrabold ${grade.color} tabular-nums`}>{percentage}%</p>
            <p className={`text-lg font-semibold mt-1 ${grade.color}`}>
              {grade.emoji} {grade.label}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
              <p className="text-2xl font-extrabold text-green-400">{correct}</p>
              <p className="text-gray-500 text-xs mt-0.5">Correct</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              <p className="text-2xl font-extrabold text-red-400">{wrong}</p>
              <p className="text-gray-500 text-xs mt-0.5">Wrong</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
              <p className="text-2xl font-extrabold text-blue-400">{total}</p>
              <p className="text-gray-500 text-xs mt-0.5">Total</p>
            </div>
          </div>

          {mod && (
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-sm">
              <span className="text-gray-500">Module</span>
              <span className="text-gray-300 font-medium">{mod.title}</span>
            </div>
          )}
        </div>

        {/* License Piece Reward */}
        {passed && mod && (
          <div className="bg-gradient-to-br from-yellow-900/30 to-amber-900/20 border-2 border-yellow-400/40 rounded-2xl p-6 mb-6 text-center">
            <p className="text-4xl mb-2">{mod.icon}</p>
            <p className="text-yellow-400 font-extrabold text-lg mb-1">License Piece Earned!</p>
            <p className="text-gray-400 text-sm">{mod.title} Badge has been added to your collection.</p>
            <Link
              href="/collection"
              className="inline-block mt-4 bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 font-semibold px-5 py-2 rounded-xl text-sm transition-colors border border-yellow-400/30"
            >
              View My Collection →
            </Link>
          </div>
        )}

        {/* Ad Placement */}
        <div className="mb-6">
          <AdPlaceholder slot="square" />
        </div>

        {/* CTA buttons */}
        <div className="space-y-3">
          {nextMod && passed ? (
            <Link
              href={`/agriculture/${nextMod.id}`}
              className="block w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold py-4 rounded-xl text-center text-lg transition-colors shadow-lg shadow-yellow-400/20"
            >
              ⚔️ Next Stage: {nextMod.title}
            </Link>
          ) : null}

          <Link
            href={`/quiz/${moduleId}`}
            className="block w-full bg-white/10 hover:bg-white/15 text-white font-semibold py-3 rounded-xl text-center border border-white/10 transition-colors"
          >
            🔄 Try Again
          </Link>

          <Link
            href="/agriculture"
            className="block w-full bg-white/5 hover:bg-white/10 text-gray-400 font-medium py-3 rounded-xl text-center border border-white/5 transition-colors text-sm"
          >
            ← Back to All Modules
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Loading results...</div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
