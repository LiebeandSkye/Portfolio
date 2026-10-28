import React, { memo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    FiAlertCircle,
    FiAlertTriangle,
    FiCheck,
    FiCheckCircle,
    FiChevronDown,
    FiInfo,
    FiX,
} from 'react-icons/fi';
import { HiOutlineLightBulb } from 'react-icons/hi2';
import { InlineText, WidgetCard, WidgetTitle } from './shared';

/** Numbered how-to list with a connecting line. */
export const StepsWidget = memo(function StepsWidget({ title, steps = [] }) {
    if (steps.length === 0) return null;
    return (
        <WidgetCard>
            <WidgetTitle icon="list">{title}</WidgetTitle>
            <ol className="flex flex-col">
                {steps.map((step, i) => (
                    <li key={`${step.label}-${i}`} className="relative flex gap-3 pb-4 last:pb-0">
                        {i < steps.length - 1 && (
                            <span aria-hidden="true" className="absolute bottom-0 left-[13px] top-7 w-px bg-(--border-light)" />
                        )}
                        <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-(--border-light) bg-(--pixel) text-xs font-medium text-(--text-light)">
                            {i + 1}
                        </span>
                        <div className="min-w-0 pt-0.5">
                            <p className="text-sm font-medium text-(--text-light) break-words">{step.label}</p>
                            {step.description && (
                                <p className="mt-0.5 text-[13px] leading-snug text-(--text-gray) break-words">
                                    <InlineText text={step.description} />
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </WidgetCard>
    );
});

/** Tick-able list with a slim progress bar. */
export const ChecklistWidget = memo(function ChecklistWidget({ title, items = [] }) {
    const [done, setDone] = useState(() => items.map(i => Boolean(i.done)));
    if (items.length === 0) return null;

    const count = done.filter(Boolean).length;
    const toggle = idx => setDone(prev => prev.map((v, i) => (i === idx ? !v : v)));

    return (
        <WidgetCard>
            <WidgetTitle
                icon="check"
                aside={
                    <span className="shrink-0 text-xs tabular-nums text-(--text-gray)">
                        {count}/{items.length}
                    </span>
                }
            >
                {title || 'Checklist'}
            </WidgetTitle>
            <div className="mb-3 h-1 overflow-hidden rounded-full bg-(--pixel)">
                <div
                    className="h-full rounded-full bg-(--sucess) transition-all duration-300"
                    style={{ width: `${(count / items.length) * 100}%` }}
                />
            </div>
            <ul className="flex flex-col gap-0.5">
                {items.map((item, i) => (
                    <li key={`${item.label}-${i}`}>
                        <button
                            type="button"
                            role="checkbox"
                            aria-checked={done[i]}
                            onClick={() => toggle(i)}
                            className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-(--pixel) cursor-pointer select-none"
                        >
                            <span
                                aria-hidden="true"
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                                    done[i]
                                        ? 'border-(--sucess) bg-(--sucess) text-white'
                                        : 'border-(--border-light) bg-transparent'
                                }`}
                            >
                                {done[i] && <FiCheck className="h-3.5 w-3.5" />}
                            </span>
                            <span
                                className={`min-w-0 text-sm break-words transition-colors ${
                                    done[i] ? 'text-(--text-gray) line-through' : 'text-(--text-light)'
                                }`}
                            >
                                <InlineText text={item.label} />
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </WidgetCard>
    );
});

const CALLOUT_STYLES = {
    tip: { Icon: HiOutlineLightBulb, box: 'border-emerald-500/30 bg-emerald-500/10', icon: 'text-emerald-500' },
    info: { Icon: FiInfo, box: 'border-sky-500/30 bg-sky-500/10', icon: 'text-sky-500' },
    warning: { Icon: FiAlertTriangle, box: 'border-amber-500/30 bg-amber-500/10', icon: 'text-amber-500' },
    success: { Icon: FiCheckCircle, box: 'border-emerald-500/30 bg-emerald-500/10', icon: 'text-emerald-500' },
    danger: { Icon: FiAlertCircle, box: 'border-rose-500/30 bg-rose-500/10', icon: 'text-rose-500' },
};

/** Tip / info / warning / success / danger note. */
export const CalloutWidget = memo(function CalloutWidget({ variant = 'info', title, text }) {
    const style = CALLOUT_STYLES[variant] || CALLOUT_STYLES.info;
    const Icon = style.Icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            role="note"
            className={`my-3 flex w-full items-start gap-3 rounded-2xl border px-4 py-3 ${style.box}`}
        >
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${style.icon}`} aria-hidden="true" />
            <div className="min-w-0 text-sm leading-relaxed">
                {title && <p className="font-medium text-(--text-light)">{title}</p>}
                <p className={title ? 'mt-0.5 text-(--text-gray)' : 'text-(--text-light)'}>
                    <InlineText text={text} />
                </p>
            </div>
        </motion.div>
    );
});

/** Two columns: what's good, what's not. */
export const ProsConsWidget = memo(function ProsConsWidget({ title, pros = [], cons = [] }) {
    if (pros.length + cons.length === 0) return null;

    const column = (heading, list, Icon, tone) =>
        list.length > 0 && (
            <div className="min-w-0 flex-1">
                <p className="mb-2 text-xs font-medium text-(--text-gray)">{heading}</p>
                <ul className="flex flex-col gap-2">
                    {list.map((entry, i) => (
                        <li key={`${entry}-${i}`} className="flex items-start gap-2 text-sm text-(--text-light)">
                            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${tone}`} aria-hidden="true" />
                            <span className="min-w-0 break-words">
                                <InlineText text={entry} />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        );

    return (
        <WidgetCard>
            <WidgetTitle icon="layers">{title}</WidgetTitle>
            <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
                {column('Pros', pros, FiCheck, 'text-emerald-500')}
                {column('Cons', cons, FiX, 'text-rose-500')}
            </div>
        </WidgetCard>
    );
});

/** Segmented tabs; one panel visible at a time. */
export const TabsWidget = memo(function TabsWidget({ title, tabs = [] }) {
    const [active, setActive] = useState(0);
    if (tabs.length === 0) return null;
    const current = tabs[Math.min(active, tabs.length - 1)];

    return (
        <WidgetCard>
            <WidgetTitle icon="grid">{title}</WidgetTitle>
            <div
                role="tablist"
                className="mb-3 inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-(--pixel) p-1 no-scrollbar"
            >
                {tabs.map((tab, i) => (
                    <button
                        key={tab.label}
                        type="button"
                        role="tab"
                        aria-selected={i === active}
                        onClick={() => setActive(i)}
                        className={`shrink-0 rounded-full px-3.5 py-1 text-sm transition-colors cursor-pointer ${
                            i === active
                                ? 'bg-(--pixel2) font-medium text-(--text-light) shadow-xs'
                                : 'text-(--text-gray) hover:text-(--text-light)'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <p role="tabpanel" className="whitespace-pre-line text-sm leading-relaxed text-(--text-light) break-words">
                <InlineText text={current.content} />
            </p>
        </WidgetCard>
    );
});

/** Collapsible questions, one open at a time. */
export const FaqWidget = memo(function FaqWidget({ title, items = [] }) {
    const [open, setOpen] = useState(null);
    if (items.length === 0) return null;

    return (
        <WidgetCard className="px-2! pb-2! pt-4!">
            {title && (
                <div className="px-2">
                    <WidgetTitle icon="chat">{title}</WidgetTitle>
                </div>
            )}
            <div className="flex flex-col">
                {items.map((item, i) => {
                    const isOpen = open === i;
                    return (
                        <div key={`${item.question}-${i}`} className={i > 0 ? 'border-t border-(--border-light)' : ''}>
                            <button
                                type="button"
                                aria-expanded={isOpen}
                                onClick={() => setOpen(isOpen ? null : i)}
                                className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-3 text-left transition-colors hover:bg-(--pixel) cursor-pointer"
                            >
                                <span className="min-w-0 text-sm font-medium text-(--text-light) break-words">
                                    {item.question}
                                </span>
                                <FiChevronDown
                                    className={`h-4 w-4 shrink-0 text-(--text-gray) transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.18 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-2 pb-3 text-sm leading-relaxed text-(--text-gray) break-words">
                                            <InlineText text={item.answer} />
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </WidgetCard>
    );
});

/** Vertical dated events. */
export const TimelineWidget = memo(function TimelineWidget({ title, events = [] }) {
    if (events.length === 0) return null;
    return (
        <WidgetCard>
            <WidgetTitle icon="clock">{title}</WidgetTitle>
            <ol className="flex flex-col">
                {events.map((event, i) => (
                    <li key={`${event.when}-${i}`} className="relative flex gap-3 pb-4 last:pb-0">
                        {i < events.length - 1 && (
                            <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-4 w-px bg-(--border-light)" />
                        )}
                        <span
                            aria-hidden="true"
                            className="relative z-10 mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-(--sucess) bg-(--pixel2)"
                        />
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-(--text-gray)">{event.when}</p>
                            <p className="mt-0.5 text-sm text-(--text-light) break-words">
                                <InlineText text={event.text} />
                            </p>
                        </div>
                    </li>
                ))}
            </ol>
        </WidgetCard>
    );
});
