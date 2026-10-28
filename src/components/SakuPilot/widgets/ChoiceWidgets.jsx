import React, { memo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiRotateCcw, FiSend, FiX } from 'react-icons/fi';
import { InlineText, WidgetCard } from './shared';
import { primaryButtonClass, softButtonClass } from './styles';

function RadioDot({ selected }) {
    return (
        <span
            aria-hidden="true"
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                selected
                    ? 'border-(--text-light) bg-(--text-light)'
                    : 'border-(--border-light) bg-transparent'
            }`}
        >
            {selected && <span className="h-2 w-2 rounded-full bg-(--light)" />}
        </span>
    );
}

/**
 * Option builder card: grouped radio choices + one action button.
 * Sends "<button label> — <picked options>" back to the chat.
 */
export const OptionSelectorWidget = memo(function OptionSelectorWidget({
    groups = [],
    buttonLabel = 'Continue',
    onSubmitSelection,
}) {
    const [selectedByGroup, setSelectedByGroup] = useState(() =>
        Object.fromEntries(groups.map((_, i) => [i, 0]))
    );
    const [sent, setSent] = useState(false);

    if (!groups || groups.length === 0) return null;

    const handleSelect = (groupIdx, optIdx) => {
        setSelectedByGroup(prev => ({ ...prev, [groupIdx]: optIdx }));
        setSent(false);
    };

    const handleSubmit = () => {
        if (!onSubmitSelection) return;
        const chosen = groups
            .map((group, gIdx) => {
                const opt = group.options[selectedByGroup[gIdx] ?? 0] || group.options[0];
                if (!opt) return '';
                return groups.length > 1 ? `${group.title}: ${opt.raw}` : opt.raw;
            })
            .filter(Boolean);
        setSent(true);
        onSubmitSelection(`${buttonLabel} — ${chosen.join(' | ')}`);
    };

    return (
        <WidgetCard>
            {groups.map((group, gIdx) => (
                <div
                    key={`${group.title}-${gIdx}`}
                    className={gIdx > 0 ? 'mt-4 border-t border-(--border-light) pt-4' : ''}
                >
                    <h4 className="mb-2 text-sm font-semibold text-(--text-light)">{group.title}</h4>
                    <div role="radiogroup" aria-label={group.title} className="flex flex-col gap-0.5">
                        {group.options.map((opt, oIdx) => {
                            const selected = (selectedByGroup[gIdx] ?? 0) === oIdx;
                            return (
                                <button
                                    key={`${opt.label}-${oIdx}`}
                                    type="button"
                                    role="radio"
                                    aria-checked={selected}
                                    onClick={() => handleSelect(gIdx, oIdx)}
                                    className="flex w-full items-start gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-(--pixel) cursor-pointer select-none"
                                >
                                    <RadioDot selected={selected} />
                                    <span className="min-w-0">
                                        <span
                                            className={`block text-sm break-words ${
                                                selected ? 'font-medium text-(--text-light)' : 'text-(--text-light)/90'
                                            }`}
                                        >
                                            {opt.label}
                                        </span>
                                        {opt.description && (
                                            <span className="block truncate text-xs text-(--text-gray)">
                                                {opt.description}
                                            </span>
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={handleSubmit}
                disabled={!onSubmitSelection || sent}
                className={`${primaryButtonClass} mt-4 w-full`}
            >
                {sent ? (
                    <>
                        <FiCheck className="h-4 w-4" />
                        <span>Sent</span>
                    </>
                ) : (
                    <>
                        <span>{buttonLabel}</span>
                        <FiArrowRight className="h-4 w-4" />
                    </>
                )}
            </button>
        </WidgetCard>
    );
});

/**
 * Quick knowledge check. No header badge: just the question, the options,
 * and a one-line verdict after answering.
 */
export const QuizWidget = memo(function QuizWidget({
    question,
    options = [],
    answer = 0,
    explanation = '',
}) {
    const [picked, setPicked] = useState(null);
    const answered = picked !== null;
    const isCorrect = picked === answer;

    return (
        <WidgetCard>
            <div className="mb-3 flex items-start justify-between gap-3">
                <p className="text-sm font-medium leading-snug text-(--text-light)">{question}</p>
                {answered && (
                    <button
                        type="button"
                        onClick={() => setPicked(null)}
                        aria-label="Try again"
                        title="Try again"
                        className="-mr-1 -mt-1 rounded-full p-1.5 text-(--text-gray) transition-colors hover:bg-(--pixel) hover:text-(--text-light) cursor-pointer"
                    >
                        <FiRotateCcw className="h-3.5 w-3.5" />
                    </button>
                )}
            </div>

            <div className="flex flex-col gap-2">
                {options.map((opt, idx) => {
                    const isPicked = picked === idx;
                    const isAnswer = idx === answer;

                    let state = 'border-(--border-light) hover:bg-(--pixel)';
                    if (answered) {
                        if (isAnswer) state = 'border-emerald-500/50 bg-emerald-500/10';
                        else if (isPicked) state = 'border-rose-500/50 bg-rose-500/10';
                        else state = 'border-(--border-light) opacity-50';
                    }

                    return (
                        <button
                            key={idx}
                            type="button"
                            disabled={answered}
                            onClick={() => setPicked(idx)}
                            className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm text-(--text-light) transition-colors cursor-pointer disabled:cursor-default ${state}`}
                        >
                            <span className="min-w-0 break-words">{opt}</span>
                            {answered && isAnswer && <FiCheck className="h-4 w-4 shrink-0 text-emerald-500" />}
                            {answered && isPicked && !isAnswer && <FiX className="h-4 w-4 shrink-0 text-rose-500" />}
                        </button>
                    );
                })}
            </div>

            <AnimatePresence>
                {answered && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 overflow-hidden text-sm leading-relaxed"
                    >
                        <span className={`font-medium ${isCorrect ? 'text-emerald-500' : 'text-amber-500'}`}>
                            {isCorrect ? 'Correct' : 'Not quite'}
                        </span>
                        {explanation && (
                            <InlineText text={` · ${explanation}`} className="text-(--text-gray)" />
                        )}
                    </motion.p>
                )}
            </AnimatePresence>
        </WidgetCard>
    );
});

/**
 * Chip picker: tap one (or several) chips, then one action button.
 */
export const PickWidget = memo(function PickWidget({
    title,
    options = [],
    multi = false,
    buttonLabel = 'Continue',
    onSendPrompt,
}) {
    const [chosen, setChosen] = useState([]);
    const [sent, setSent] = useState(false);

    const toggle = opt => {
        setSent(false);
        setChosen(prev => {
            if (!multi) return [opt];
            return prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt];
        });
    };

    const submit = () => {
        if (!onSendPrompt || chosen.length === 0) return;
        setSent(true);
        onSendPrompt(`${buttonLabel} — ${chosen.join(', ')}`);
    };

    return (
        <WidgetCard>
            <h4 className="mb-3 text-sm font-semibold text-(--text-light)">{title}</h4>
            <div
                role={multi ? 'group' : 'radiogroup'}
                aria-label={title}
                className="flex flex-wrap gap-2"
            >
                {options.map(opt => {
                    const selected = chosen.includes(opt);
                    return (
                        <button
                            key={opt}
                            type="button"
                            role={multi ? 'checkbox' : 'radio'}
                            aria-checked={selected}
                            onClick={() => toggle(opt)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 ${
                                selected
                                    ? 'rounded-full border border-(--text-light) bg-(--text-light) text-sm text-(--light) cursor-pointer'
                                    : softButtonClass
                            }`}
                        >
                            {selected && multi && <FiCheck className="h-3.5 w-3.5" />}
                            <span>{opt}</span>
                        </button>
                    );
                })}
            </div>
            <button
                type="button"
                onClick={submit}
                disabled={!onSendPrompt || chosen.length === 0 || sent}
                className={`${primaryButtonClass} mt-4`}
            >
                {sent ? (
                    <>
                        <FiCheck className="h-4 w-4" />
                        <span>Sent</span>
                    </>
                ) : (
                    <>
                        <span>{buttonLabel}</span>
                        <FiArrowRight className="h-4 w-4" />
                    </>
                )}
            </button>
        </WidgetCard>
    );
});

/**
 * One question, one text box. Sends "<button label> — <answer>" to the chat.
 */
export const AskWidget = memo(function AskWidget({
    title,
    placeholder = 'Type your answer',
    buttonLabel = 'Send',
    onSendPrompt,
}) {
    const [value, setValue] = useState('');
    const [sent, setSent] = useState(false);

    const canSend = Boolean(onSendPrompt) && value.trim().length > 0 && !sent;

    const handleSubmit = e => {
        e.preventDefault();
        if (!canSend) return;
        setSent(true);
        onSendPrompt(`${buttonLabel} — ${value.trim()}`);
    };

    return (
        <WidgetCard>
            <form onSubmit={handleSubmit}>
                {title && (
                    <label className="mb-2 block text-sm font-semibold text-(--text-light)">{title}</label>
                )}
                <div className="flex items-center gap-2 rounded-full border border-(--border-light) bg-(--pixel) py-1.5 pl-4 pr-1.5 transition-colors focus-within:border-(--text-gray)">
                    <input
                        value={value}
                        onChange={e => {
                            setValue(e.target.value);
                            setSent(false);
                        }}
                        placeholder={placeholder}
                        maxLength={300}
                        aria-label={title || placeholder}
                        className="min-w-0 flex-1 bg-transparent text-sm text-(--text-light) outline-none placeholder:text-(--text-gray)"
                    />
                    <button
                        type="submit"
                        disabled={!canSend}
                        aria-label={buttonLabel}
                        className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-(--text-light) px-3 text-sm font-medium text-(--light) transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                    >
                        {sent ? <FiCheck className="h-4 w-4" /> : <FiSend className="h-4 w-4" />}
                        <span className="hidden sm:inline">{sent ? 'Sent' : buttonLabel}</span>
                    </button>
                </div>
            </form>
        </WidgetCard>
    );
});
