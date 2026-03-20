import { useEffect, useState, useRef } from 'react';

export default function Toast({ message, type = 'info', duration = 4200, onClose }) {
  const [remaining, setRemaining] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);
  const lastTickRef = useRef(Date.now());

  useEffect(() => {
    if (remaining <= 0) {
      onClose();
      return;
    }

    if (isPaused) return;

    lastTickRef.current = Date.now();
    const interval = setInterval(() => {
      const now = Date.now();
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;

      setRemaining((prev) => Math.max(0, prev - delta));
    }, 16);

    return () => clearInterval(interval);
  }, [isPaused, remaining, onClose]);

  const progress = (remaining / duration) * 100;

  const styles = {
    success: {
      bg: 'bg-[#1a1d21]/95',
      border: 'border-[#22c55e]/50',
      icon: '✓',
      iconColor: 'text-[#22c55e]',
      bar: 'bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-[#22c55e]'
    },
    error: {
      bg: 'bg-[#1a1d21]/95',
      border: 'border-[#ef4444]/50',
      icon: '!',
      iconColor: 'text-[#ef4444]',
      bar: 'bg-gradient-to-r from-[#ef4444] via-[#f87171] to-[#ef4444]'
    },
    info: {
      bg: 'bg-[#1a1d21]/95',
      border: 'border-[#3b82f6]/50',
      icon: 'i',
      iconColor: 'text-[#3b82f6]',
      bar: 'bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#3b82f6]'
    },
    warning: {
      bg: 'bg-[#1a1d21]/95',
      border: 'border-[#f59e0b]/50',
      icon: '⚠',
      iconColor: 'text-[#f59e0b]',
      bar: 'bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b]'
    }
  };

  const style = styles[type] || styles.info;

  return (
    <div
      className={`
        relative w-[340px] sm:w-[380px] 
        rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden 
        text-[#e2e8f0] text-[14px] border backdrop-blur-xl
        ${style.bg} ${style.border}
      `}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center gap-3 px-4 py-4">
        {/* Rounded Icon Container */}
        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] bg-white/10 ${style.iconColor}`}>
          {style.icon}
        </div>
        
        {/* Message text with matching weight */}
        <div className="flex-1 font-normal tracking-wide leading-tight">
          {message}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex-shrink-0 text-white/30 hover:text-white/80 transition-colors p-1"
          aria-label="Close"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* The Glow Progress Bar */}
      <div className="h-[4px] bg-white/5 w-full">
        <div
          className={`h-full ${style.bar} shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-all duration-[16ms] ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}