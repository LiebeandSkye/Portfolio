import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiCpu,
    FiZap,
    FiCode,
    FiGlobe,
    FiDatabase,
    FiShield,
    FiTerminal,
    FiLayers,
    FiCheck,
    FiX,
    FiPlay,
    FiSmartphone,
    FiServer,
    FiBookOpen,
    FiMusic,
    FiShoppingCart,
    FiMapPin,
    FiAward,
    FiRefreshCw,
    FiHelpCircle,
    FiPackage,
    FiClock,
    FiActivity,
    FiStar,
    FiArrowRight,
} from 'react-icons/fi';
import { HiOutlineSparkles, HiOutlineRocketLaunch, HiOutlinePuzzlePiece } from 'react-icons/hi2';

const ICON_MAP = {
    cpu: FiCpu,
    zap: FiZap,
    fast: FiZap,
    speed: FiZap,
    code: FiCode,
    globe: FiGlobe,
    web: FiGlobe,
    database: FiDatabase,
    db: FiDatabase,
    shield: FiShield,
    security: FiShield,
    privacy: FiShield,
    terminal: FiTerminal,
    layers: FiLayers,
    stack: FiLayers,
    check: FiCheck,
    play: FiPlay,
    mobile: FiSmartphone,
    android: FiSmartphone,
    smartphone: FiSmartphone,
    server: FiServer,
    book: FiBookOpen,
    music: FiMusic,
    audio: FiMusic,
    cart: FiShoppingCart,
    store: FiShoppingCart,
    map: FiMapPin,
    award: FiAward,
    sparkles: HiOutlineSparkles,
    ai: HiOutlineSparkles,
    rocket: HiOutlineRocketLaunch,
    game: HiOutlinePuzzlePiece,
    package: FiPackage,
    clock: FiClock,
    activity: FiActivity,
    star: FiStar,
};

export const DynamicIcon = memo(function DynamicIcon({ name, className = 'w-4 h-4', size }) {
    const key = String(name || 'sparkles').toLowerCase().trim();
    const IconComponent = ICON_MAP[key] || HiOutlineSparkles;
    return <IconComponent className={className} size={size} />;
});

/**
 * OptionSelectorWidget — Exact ChatGPT-style multi-group radio builder card
 * Matches the interactive option card aesthetic (grouped radio circles + em-dash descriptions + full-width pill CTA button)
 */
export const OptionSelectorWidget = memo(function OptionSelectorWidget({
    groups = [],
    buttonLabel = 'Continue with selection',
    onSubmitSelection,
}) {
    // Default each group to index 0 selected
    const [selectedByGroup, setSelectedByGroup] = useState(() =>
        groups.reduce((acc, _, gIdx) => {
            acc[gIdx] = 0;
            return acc;
        }, {})
    );
    const [submitted, setSubmitted] = useState(false);

    if (!groups || groups.length === 0) return null;

    const handleSelect = (groupIdx, optIdx) => {
        setSelectedByGroup(prev => ({
            ...prev,
            [groupIdx]: optIdx,
        }));
        if (submitted) setSubmitted(false);
    };

    const handleSubmit = () => {
        if (!onSubmitSelection) return;
        const chosenParts = groups.map((group, gIdx) => {
            const idx = selectedByGroup[gIdx] ?? 0;
            const opt = group.options[idx] || group.options[0];
            if (!opt) return '';
            return groups.length > 1
                ? `${group.title}: ${opt.raw}`
                : opt.raw;
        }).filter(Boolean);

        const promptText = `${buttonLabel} — ${chosenParts.join(' | ')}`;
        setSubmitted(true);
        onSubmitSelection(promptText);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24 }}
            className="my-4 rounded-2xl border border-(--border-light) dark:border-white/10 bg-(--pixel2) dark:bg-[#080a0e] p-4 sm:p-5 shadow-lg w-full"
        >
            {groups.map((group, gIdx) => {
                const currentSelection = selectedByGroup[gIdx] ?? 0;
                return (
                    <div key={`${group.title}-${gIdx}`}>
                        {gIdx > 0 && (
                            <div className="my-4 border-t border-(--border-light) dark:border-white/10" />
                        )}
                        <h4 className="text-sm font-bold text-(--text-light) mb-3 tracking-tight">
                            {group.title}
                        </h4>
                        <div className="flex flex-col gap-2.5">
                            {group.options.map((opt, oIdx) => {
                                const isSelected = currentSelection === oIdx;
                                return (
                                    <button
                                        key={`${opt.label}-${oIdx}`}
                                        type="button"
                                        onClick={() => handleSelect(gIdx, oIdx)}
                                        className="group flex items-start gap-3 w-full text-left py-1 rounded-lg transition-colors cursor-pointer select-none"
                                    >
                                        {/* Custom ChatGPT-style Radio Circle */}
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

                                        <span className="text-[14px] leading-snug break-words">
                                            <span className={isSelected ? 'font-medium text-(--text-light)' : 'text-(--text-light)/90'}>
                                                {opt.label}
                                            </span>
                                            {opt.description && (
                                                <span className="text-(--text-gray)">
                                                    {' '}— {opt.description}
                                                </span>
                                            )}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            {/* Full-width Pill Submit Button matching ChatGPT UI */}
            <button
                type="button"
                onClick={handleSubmit}
                className="mt-5 w-full rounded-full bg-(--text-light) dark:bg-[#e6edf3] hover:opacity-90 active:scale-[0.99] text-(--light) dark:text-[#0d1117] font-semibold text-xs sm:text-sm py-2.5 px-5 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
                <span>{buttonLabel}</span>
                <FiArrowRight className="w-4 h-4" />
            </button>
        </motion.div>
    );
});

/**
 * StatsWidget — Renders a responsive Bento grid of key metrics / benchmarks
 */
export const StatsWidget = memo(function StatsWidget({ items = [] }) {
    if (!items || items.length === 0) return null;

    return (
        <div className="my-3.5 grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full">
            {items.map((item, idx) => (
                <motion.div
                    key={`${item.label}-${idx}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.22 }}
                    className="group relative flex flex-col justify-between rounded-xl border border-(--border-light) bg-(--pixel2) p-3 shadow-xs hover:border-(--sucess)/50 transition-all"
                >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-(--text-gray) truncate">
                            {item.label}
                        </span>
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-(--pixel) border border-(--border-light) text-(--sucess)">
                            <DynamicIcon name={item.icon} className="w-3.5 h-3.5" />
                        </span>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-(--text-light) tracking-tight break-words">
                        {item.value}
                    </div>
                    {item.sub && (
                        <div className="mt-1 text-[11px] text-(--text-gray) leading-snug line-clamp-2">
                            {item.sub}
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    );
});

/**
 * QuizWidget — Interactive in-chat knowledge check / mini experiment
 */
export const QuizWidget = memo(function QuizWidget({
    question,
    options = [],
    answer = 0,
    explanation = '',
}) {
    const [selectedIdx, setSelectedIdx] = useState(null);
    const hasAnswered = selectedIdx !== null;
    const isCorrect = selectedIdx === answer;

    return (
        <div className="my-4 rounded-2xl border border-(--border-light) dark:border-white/10 bg-(--pixel2) dark:bg-[#080a0e] p-4 sm:p-5 shadow-sm w-full">
            <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/15 text-(--sucess)">
                        <FiHelpCircle className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-(--sucess)">
                        Interactive Check
                    </span>
                </div>
                {hasAnswered && (
                    <button
                        onClick={() => setSelectedIdx(null)}
                        className="flex items-center gap-1 text-[11px] text-(--text-gray) hover:text-(--text-light) transition-colors cursor-pointer"
                    >
                        <FiRefreshCw className="w-3 h-3" />
                        <span>Retry</span>
                    </button>
                )}
            </div>

            <p className="text-sm font-semibold text-(--text-light) mb-3 leading-snug">
                {question}
            </p>

            <div className="flex flex-col gap-2">
                {options.map((opt, idx) => {
                    const isThisSelected = selectedIdx === idx;
                    const isThisCorrect = idx === answer;

                    let stateClasses = 'border-(--border-light) bg-(--pixel) hover:bg-(--pixel-hover) text-(--text-light)';
                    if (hasAnswered) {
                        if (isThisCorrect) {
                            stateClasses = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-400 font-medium';
                        } else if (isThisSelected && !isThisCorrect) {
                            stateClasses = 'border-red-500/60 bg-red-500/10 text-red-400';
                        } else {
                            stateClasses = 'border-(--border-light)/50 bg-(--pixel)/50 text-(--text-gray) opacity-65';
                        }
                    }

                    return (
                        <button
                            key={idx}
                            disabled={hasAnswered}
                            onClick={() => setSelectedIdx(idx)}
                            className={`flex items-center justify-between gap-3 w-full rounded-xl border px-3.5 py-2.5 text-left text-xs sm:text-sm transition-all cursor-pointer disabled:cursor-default ${stateClasses}`}
                        >
                            <div className="flex items-center gap-2.5 min-w-0">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current/30 text-[11px] font-mono">
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                <span className="break-words">{opt}</span>
                            </div>
                            {hasAnswered && isThisCorrect && <FiCheck className="w-4 h-4 shrink-0 text-emerald-400" />}
                            {hasAnswered && isThisSelected && !isThisCorrect && <FiX className="w-4 h-4 shrink-0 text-red-400" />}
                        </button>
                    );
                })}
            </div>

            <AnimatePresence>
                {hasAnswered && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-(--border-light) text-xs leading-relaxed"
                    >
                        <span className={`font-bold mr-1.5 ${isCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {isCorrect ? '✓ Spot on!' : `✕ Correct answer: ${String.fromCharCode(65 + answer)}.`}
                        </span>
                        {explanation && <span className="text-(--text-gray)">{explanation}</span>}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});
