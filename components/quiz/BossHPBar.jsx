'use client';

// Boss HP bar with dynamic color and boss portrait

export default function BossHPBar({ hp, maxHp = 100, bossName = 'Board Exam Boss' }) {
  const percentage = Math.max(0, (hp / maxHp) * 100);

  const barColor =
    percentage > 50
      ? 'from-red-500 to-rose-600'
      : percentage > 25
      ? 'from-orange-500 to-red-500'
      : 'from-yellow-400 to-orange-500';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👹</span>
          <div>
            <p className="text-white font-bold text-sm">{bossName}</p>
            <p className="text-gray-400 text-xs">Board Exam Guardian</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-red-400 font-bold text-lg tabular-nums">{hp}</span>
          <span className="text-gray-500 text-sm">/{maxHp} HP</span>
        </div>
      </div>

      {/* HP Bar */}
      <div className="relative h-5 bg-gray-800 rounded-full border border-gray-700 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-700 ease-out relative`}
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer */}
          <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
        </div>
        {/* HP text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white drop-shadow">{Math.round(percentage)}%</span>
        </div>
      </div>

      {hp <= 0 && (
        <p className="text-center text-yellow-400 font-bold text-sm mt-2 animate-bounce">
          💥 BOSS DEFEATED!
        </p>
      )}
    </div>
  );
}
