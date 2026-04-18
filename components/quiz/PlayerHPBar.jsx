'use client';

// Player HP bar with dynamic color

export default function PlayerHPBar({ hp, maxHp = 100, playerName = 'You' }) {
  const percentage = Math.max(0, (hp / maxHp) * 100);

  const barColor =
    percentage > 50
      ? 'from-emerald-400 to-green-500'
      : percentage > 25
      ? 'from-yellow-400 to-orange-400'
      : 'from-red-400 to-red-600';

  const hpColor =
    percentage > 50 ? 'text-green-400' : percentage > 25 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧑‍🎓</span>
          <div>
            <p className="text-white font-bold text-sm">{playerName}</p>
            <p className="text-gray-400 text-xs">Licensure Candidate</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`font-bold text-lg tabular-nums ${hpColor}`}>{hp}</span>
          <span className="text-gray-500 text-sm">/{maxHp} HP</span>
        </div>
      </div>

      <div className="relative h-5 bg-gray-800 rounded-full border border-gray-700 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white drop-shadow">{Math.round(percentage)}%</span>
        </div>
      </div>

      {hp <= 0 && (
        <p className="text-center text-red-400 font-bold text-sm mt-2">
          💀 HP Depleted!
        </p>
      )}
    </div>
  );
}
