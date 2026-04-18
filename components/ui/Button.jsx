// Reusable button component with multiple variants

const VARIANTS = {
  primary: 'bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold shadow-lg shadow-yellow-400/20',
  secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
  danger: 'bg-red-500 hover:bg-red-400 text-white font-bold',
  ghost: 'text-gray-300 hover:text-white hover:bg-white/10',
  outline: 'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-bold',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
  xl: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  href,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const classes = `${base} ${VARIANTS[variant] || VARIANTS.primary} ${SIZES[size] || SIZES.md} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  );
}
