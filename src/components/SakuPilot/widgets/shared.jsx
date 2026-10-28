import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DynamicIcon } from './DynamicIcon';
import { cardClass } from './styles';

/** Soft card every widget sits in. */
export const WidgetCard = memo(function WidgetCard({ children, className = '', ...rest }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`${cardClass} ${className}`}
            {...rest}
        >
            {children}
        </motion.div>
    );
});

/** Icon + short title. Renders nothing when there is no title. */
export const WidgetTitle = memo(function WidgetTitle({ icon, children, aside }) {
    if (!children) return null;
    return (
        <div className="mb-3 flex items-center justify-between gap-3">
            <h4 className="flex min-w-0 items-center gap-2 text-sm font-semibold text-(--text-light)">
                {icon && <DynamicIcon name={icon} className="h-4 w-4 shrink-0 text-(--sucess)" />}
                <span className="truncate">{children}</span>
            </h4>
            {aside}
        </div>
    );
});

/**
 * Tiny, safe inline formatter: **bold** and `code` only.
 * (No HTML is ever injected.)
 */
export const InlineText = memo(function InlineText({ text, className = '' }) {
    const nodes = useMemo(
        () =>
            String(text ?? '')
                .split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
                .filter(Boolean)
                .map((chunk, i) => {
                    if (chunk.startsWith('**') && chunk.endsWith('**') && chunk.length > 4) {
                        return (
                            <strong key={i} className="font-semibold text-(--text-light)">
                                {chunk.slice(2, -2)}
                            </strong>
                        );
                    }
                    if (chunk.startsWith('`') && chunk.endsWith('`') && chunk.length > 2) {
                        return (
                            <code
                                key={i}
                                className="rounded bg-(--pixel) px-1 py-0.5 font-mono text-[0.85em] text-(--text-light)"
                            >
                                {chunk.slice(1, -1)}
                            </code>
                        );
                    }
                    return <React.Fragment key={i}>{chunk}</React.Fragment>;
                }),
        [text]
    );
    return <span className={className}>{nodes}</span>;
});
