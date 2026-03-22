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

    // Design matches the screenshot: white card, colored icon circle, thin bottom bar
    const config = {
        success: {
            iconBg: 'bg-green-500',
            icon: '✓',
            bar: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
        },
        error: {
            iconBg: 'bg-red-500',
            icon: '!',
            bar: 'bg-red-400',
        },
        info: {
            iconBg: 'bg-blue-500',
            icon: 'i',
            bar: 'bg-blue-400',
        },
        warning: {
            iconBg: 'bg-yellow-500',
            icon: '⚠',
            bar: 'bg-yellow-400',
        },
    };

    const c = config[type] || config.info;

    return (
        <div
            className="relative w-[340px] sm:w-[370px] rounded-xl overflow-hidden shadow-lg bg-white dark:bg-[#1e2228] cursor-default select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Card body */}
            <div className="flex items-center gap-3 px-4 py-4 pr-10">
                {/* Colored circle icon */}
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[11px] ${c.iconBg}`}>
                    {c.icon}
                </div>

                {/* Message */}
                <span className="text-[13.5px] font-normal text-gray-700 dark:text-gray-200 leading-snug">
                    {message}
                </span>
            </div>

            {/* Close button — top right */}
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-0.5 cursor-pointer"
                aria-label="Close"
            >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Bottom progress bar */}
            <div className="h-[3px] bg-gray-100 dark:bg-white/5 w-full">
                <div
                    className={`h-full ${c.bar} transition-none`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}