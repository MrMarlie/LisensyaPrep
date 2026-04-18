// Generic animated progress bar

export default function ProgressBar({
  value,
  max = 100,
  color = 'bg-yellow-400',
  bgColor = 'bg-white/10',
  height = 'h-3',
  showLabel = false,
  label,
  className = '',
  animated = true,
}) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between mb-1 text-xs text-gray-400">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full ${bgColor} rounded-full ${height} overflow-hidden`}>
        <div
          className={`${height} ${color} rounded-full ${animated ? 'transition-all duration-500 ease-out' : ''}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
