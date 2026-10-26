import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiEdit3 } from 'react-icons/fi';

function splitLabelAndDesc(raw) {
    const cleaned = String(raw || '').trim();
    const dashMatch = /^(.+?)\s+(?:—|–|-)\s+(.+)$/.exec(cleaned);
    if (dashMatch) {
        return {
            label: dashMatch[1].trim(),
            description: dashMatch[2].trim(),
            raw: cleaned,
        };
    }
    return {
        label: cleaned,
        description: '',
        raw: cleaned,
    };
}

const SuggestionChips = memo(function SuggestionChips({
    suggestions = [],
    onSelectSuggestion,
    onPopulateInput,
}) {
    const [selectedIdx, setSelectedIdx] = useState(0);

    if (!suggestions || suggestions.length === 0 || !onSelectSuggestion) return null;

    const parsedItems = suggestions.map(splitLabelAndDesc);
    const activeItem = parsedItems[selectedIdx] || parsedItems[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="mt-4 rounded-2xl border border-(--border-light) dark:border-white/10 bg-(--pixel2) dark:bg-(--dark-bg) p-4 sm:p-5 shadow-md w-full"
        >
            <div className="flex items-center justify-between gap-2 mb-3">
                <h4 className="text-xs sm:text-sm font-bold text-(--text-light) tracking-tight">
                    Choose your next step
                </h4>
                {onPopulateInput && activeItem && (
                    <button
                        type="button"
                        onClick={() => onPopulateInput(activeItem.raw)}
                        title="Edit selected prompt in input bar"
                        className="flex items-center gap-1 text-[11px] text-(--text-gray) hover:text-(--text-light) transition-colors cursor-pointer"
                    >
                        <FiEdit3 className="w-3 h-3" />
                        <span>Customize</span>
                    </button>
                )}
            </div>

            <div className="flex flex-col gap-2.5">
                {parsedItems.map((item, idx) => {
                    const isSelected = idx === selectedIdx;
                    return (
                        <button
                            key={`${item.raw}-${idx}`}
                            type="button"
                            onClick={() => setSelectedIdx(idx)}
                            onDoubleClick={() => onSelectSuggestion(item.raw)}
                            className="group flex items-start gap-3 w-full text-left py-1 rounded-lg transition-colors cursor-pointer select-none"
                        >
                            {/* ChatGPT-style Radio Circle */}
                            <span
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all ${
                                    isSelected
                                        ? 'bg-(--text-light) dark:bg-white shadow-xs'
                                        : 'border border-(--border-light) dark:border-white/25 bg-transparent group-hover:border-(--text-gray) dark:group-hover:border-white/50'
                                }`}
                            >
                                {isSelected && (
                                    <span className="h-2 w-2 rounded-full bg-(--light) dark:bg-[#080a0e]" />
                                )}
                            </span>

                            <span className="text-[13.5px] sm:text-[14px] leading-snug break-words">
                                <span className={isSelected ? 'font-medium text-(--text-light)' : 'text-(--text-light)/90'}>
                                    {item.label}
                                </span>
                                {item.description && (
                                    <span className="text-(--text-gray)">
                                        {' '}— {item.description}
                                    </span>
                                )}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Full-width ChatGPT Pill Action Button */}
            <button
                type="button"
                onClick={() => activeItem && onSelectSuggestion(activeItem.raw)}
                className="mt-4 w-full rounded-full bg-(--text-light) dark:bg-[#e6edf3] hover:opacity-90 active:scale-[0.99] text-(--light) dark:text-[#0d1117] font-semibold text-xs sm:text-sm py-2.5 px-5 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
                <span className="truncate">{activeItem ? activeItem.label : 'Continue'}</span>
                <FiArrowRight className="w-4 h-4 shrink-0" />
            </button>
        </motion.div>
    );
});

export default SuggestionChips;
