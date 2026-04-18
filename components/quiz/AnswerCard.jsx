'use client';

// Individual answer choice card with correct/wrong feedback state

export default function AnswerCard({ choice, index, onSelect, state, disabled }) {
  // state: 'idle' | 'correct' | 'wrong' | 'reveal'
  const letters = ['A', 'B', 'C', 'D'];
  const letter = letters[index] || String.fromCharCode(65 + index);

  const baseClasses =
    'w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-start gap-3 group';

  const stateClasses = {
    idle: 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-yellow-400/60 cursor-pointer',
    correct:
      'bg-green-500/20 border-green-400 cursor-default shadow-lg shadow-green-500/20',
    wrong:
      'bg-red-500/20 border-red-400 cursor-default',
    reveal:
      'bg-green-500/10 border-green-400/40 cursor-default opacity-80',
    disabled: 'bg-white/5 border-white/10 cursor-default opacity-40',
  };

  const finalClass = disabled && state === 'idle'
    ? `${baseClasses} ${stateClasses.disabled}`
    : `${baseClasses} ${stateClasses[state] || stateClasses.idle}`;

  return (
    <button
      onClick={() => !disabled && state === 'idle' && onSelect(choice)}
      className={finalClass}
      disabled={disabled && state === 'idle'}
    >
      {/* Letter badge */}
      <span
        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
          state === 'correct'
            ? 'bg-green-400 text-gray-900'
            : state === 'wrong'
            ? 'bg-red-400 text-white'
            : state === 'reveal'
            ? 'bg-green-400/60 text-white'
            : 'bg-white/10 text-gray-300 group-hover:bg-yellow-400 group-hover:text-gray-900'
        }`}
      >
        {state === 'correct' ? '✓' : state === 'wrong' ? '✗' : letter}
      </span>

      <span
        className={`text-sm font-medium leading-relaxed pt-0.5 ${
          state === 'correct'
            ? 'text-green-300'
            : state === 'wrong'
            ? 'text-red-300'
            : state === 'reveal'
            ? 'text-green-300'
            : 'text-gray-200 group-hover:text-white'
        }`}
      >
        {choice}
      </span>
    </button>
  );
}
