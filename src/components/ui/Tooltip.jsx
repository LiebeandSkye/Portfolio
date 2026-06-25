import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * Tooltip that renders via a React Portal so it's never clipped by
 * overflow-hidden parents (e.g. the SakuPilot panel).
 *
 * Style matches BotButton.jsx: dark gray pill, arrow pointing up toward trigger,
 * tooltip appears BELOW the trigger (same as BotButton's `top-10` placement).
 * Auto-flips to appear ABOVE if there isn't enough space below the viewport.
 */

const Tooltip = ({ children, text, shortcut, position = 'bottom' }) => {
    const isTop = position === 'top';
    const isLeft = position === 'left';
    const isRight = position === 'right';

    // Tooltip pill positioning relative to the trigger
    const tooltipPos = isTop
        ? 'bottom-full mb-2 left-1/2 -translate-x-1/2 origin-bottom'
        : isLeft
        ? 'right-full mr-2 top-1/2 -translate-y-1/2 origin-right'
        : isRight
        ? 'left-full ml-2 top-1/2 -translate-y-1/2 origin-left'
        : 'top-full mt-2 left-1/2 -translate-x-1/2 origin-top'; // bottom (default)

    // Arrow positioning — points from tooltip toward the trigger
    const arrowPos = isTop
        ? 'top-full left-1/2 -translate-x-1/2 -mt-1'
        : isLeft
        ? 'left-full top-1/2 -translate-y-1/2 -ml-1'
        : isRight
        ? 'right-full top-1/2 -translate-y-1/2 -mr-1'
        : '-top-1 left-1/2 -translate-x-1/2'; // bottom (default)

    return (
        <div className="relative group flex items-center justify-center">
            {children}

            <div
                className={`absolute ${tooltipPos} scale-0 group-hover:scale-100 transition-all duration-200 z-50 hidden md:flex items-center gap-1.5 bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 text-xs py-1 px-2 rounded whitespace-nowrap shadow-lg pointer-events-none`}
            >
                <span className="">{text}</span>
                {shortcut && (
                    <span className="text-[#8b949e] dark:text-gray-500 bg-[#161b22] dark:bg-gray-200 px-1 rounded border border-[#30363d] dark:border-gray-300 text-[9px]">
                        {shortcut}
                    </span>
                )}

                {/* Arrow pointing toward the trigger */}
                <div
                    className={`absolute ${arrowPos} w-2 h-2 rotate-45 bg-gray-800 dark:bg-gray-100`}
                />
            </div>
        </div>
    );
};

export default Tooltip;