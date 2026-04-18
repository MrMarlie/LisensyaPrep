// Ad placeholder component — swap for real ad network tags later

export default function AdPlaceholder({ slot = 'banner', className = '' }) {
  const configs = {
    banner: { height: 'h-24', label: 'Advertisement (728×90)', size: 'Leaderboard' },
    square: { height: 'h-64', label: 'Advertisement (300×250)', size: 'Medium Rectangle' },
    sidebar: { height: 'h-[600px]', label: 'Advertisement (300×600)', size: 'Half Page' },
  };

  const config = configs[slot] || configs.banner;

  return (
    <div
      className={`w-full ${config.height} flex items-center justify-center bg-white/5 border border-white/10 rounded-xl ${className}`}
      aria-label="Advertisement"
    >
      <div className="text-center text-gray-600 select-none">
        <p className="text-xs font-medium uppercase tracking-widest mb-1">Ad</p>
        <p className="text-xs">{config.size}</p>
      </div>
    </div>
  );
}
