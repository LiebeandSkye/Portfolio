import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiCornerDownRight, FiEdit2 } from 'react-icons/fi';
import { splitLabelDesc } from './widgetPayloads';

/**
 * Follow-up suggestions as one-tap pills.
 * Tap = send. The small pencil puts the text in the input bar to tweak first.
 */
const SuggestionChips = memo(function SuggestionChips({
    suggestions = [],
    onSelectSuggestion,
    onPopulateInput,
}) {
    const items = useMemo(
        () => (suggestions || []).map(splitLabelDesc).filter(Boolean),
        [suggestions]
    );

    if (items.length === 0 || !onSelectSuggestion) return null;

    return (
        <div className="mt-3 flex flex-wrap gap-2">
            {items.map((item, idx) => (
                <motion.div
                    key={`${item.raw}-${idx}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.2 }}
                    className="group inline-flex max-w-full items-center rounded-full border border-(--border-light) bg-(--pixel2) transition-colors hover:bg-(--pixel)"
                >
                    <button
                        type="button"
                        onClick={() => onSelectSuggestion(item.raw)}
                        title={item.raw}
                        className="flex min-w-0 items-center gap-1.5 py-1.5 pl-3 pr-3 text-[13px] text-(--text-light) cursor-pointer"
                    >
                        <FiCornerDownRight className="h-3.5 w-3.5 shrink-0 text-(--text-gray)" />
                        <span className="truncate">{item.label}</span>
                    </button>
                    {onPopulateInput && (
                        <button
                            type="button"
                            onClick={() => onPopulateInput(item.raw)}
                            aria-label="Edit before sending"
                            title="Edit before sending"
                            className="mr-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-(--text-gray) transition-opacity hover:text-(--text-light) cursor-pointer sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
                        >
                            <FiEdit2 className="h-3 w-3" />
                        </button>
                    )}
                </motion.div>
            ))}
        </div>
    );
});

export default SuggestionChips;
