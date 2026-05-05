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
const Tooltip = ({ children, text, shortcut }) => {
    const triggerRef = useRef(null);
    const [pos, setPos] = useState(null); // { top, left, flip }
    const [visible, setVisible] = useState(false);

    const computePosition = useCallback(() => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        const TOOLTIP_HEIGHT = 32; // rough estimate
        const MARGIN = 8;
        const spaceBelow = window.innerHeight - rect.bottom;
        const flip = spaceBelow < TOOLTIP_HEIGHT + MARGIN;

        setPos({
            // Horizontally centered on trigger
            left: rect.left + rect.width / 2,
            // Below or above depending on available space
            top: flip ? rect.top - MARGIN : rect.bottom + MARGIN,
            flip,
        });
    }, []);

    const show = useCallback(() => {
        computePosition();
        setVisible(true);
    }, [computePosition]);

    const hide = useCallback(() => {
        setVisible(false);
    }, []);

    // Recompute on scroll/resize while visible
    useEffect(() => {
        if (!visible) return;
        window.addEventListener('scroll', computePosition, true);
        window.addEventListener('resize', computePosition);
        return () => {
            window.removeEventListener('scroll', computePosition, true);
            window.removeEventListener('resize', computePosition);
        };
    }, [visible, computePosition]);

    const tooltip = visible && pos ? (
        <div
            style={{
                position: 'fixed',
                left: pos.left,
                top: pos.top,
                transform: pos.flip
                    ? 'translateX(-50%) translateY(-100%)'
                    : 'translateX(-50%)',
                zIndex: 99999,
                pointerEvents: 'none',
            }}
        >
            {/* Pill */}
            <div className="relative items-center gap-1.5 bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 text-xs py-1 px-2 rounded whitespace-nowrap shadow-lg hidden md:flex">
                <span className="font-medium">{text}</span>
                {shortcut && (
                    <span className="text-[#8b949e] dark:text-gray-500 bg-[#161b22] dark:bg-gray-200 px-1 rounded border border-[#30363d] dark:border-gray-300 text-[9px]">
                        {shortcut}
                    </span>
                )}

                {/* Arrow — points toward the trigger */}
                {pos.flip ? (
                    // Arrow at bottom (tooltip is above trigger)
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-800 dark:bg-gray-100 border-b border-r border-transparent" />
                ) : (
                    // Arrow at top (tooltip is below trigger) — matches BotButton
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-800 dark:bg-gray-100" />
                )}
            </div>
        </div>
    ) : null;

    return (
        <>
            <div
                ref={triggerRef}
                className="flex items-center justify-center"
                onMouseEnter={show}
                onMouseLeave={hide}
                onFocus={show}
                onBlur={hide}
            >
                {children}
            </div>
            {typeof document !== 'undefined' && createPortal(tooltip, document.body)}
        </>
    );
};

export default Tooltip;
