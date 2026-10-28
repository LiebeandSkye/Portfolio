import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DynamicIcon } from './DynamicIcon';
import { InlineText, WidgetCard, WidgetTitle } from './shared';
import { CHART_COLORS } from './styles';

const numberFormat = new Intl.NumberFormat('en', { maximumFractionDigits: 1 });
const formatNumber = n => numberFormat.format(n);

/**
 * Key numbers as small tiles: icon, big value, short label.
 * The longer note (sub) lives in the tooltip instead of cluttering the tile.
 */
export const StatsWidget = memo(function StatsWidget({ items = [] }) {
    if (!items || items.length === 0) return null;

    return (
        <div className="my-3 grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
            {items.map((item, idx) => (
                <motion.div
                    key={`${item.label}-${idx}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.2 }}
                    title={item.sub || undefined}
                    className="flex flex-col gap-2.5 rounded-2xl border border-(--border-light) bg-(--pixel2) p-3.5"
                >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-(--pixel) text-(--sucess)">
                        <DynamicIcon name={item.icon} className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0">
                        <div className="text-xl font-semibold leading-tight tracking-tight text-(--text-light) break-words">
                            {item.value}
                        </div>
                        <div className="mt-0.5 truncate text-xs text-(--text-gray)">{item.label}</div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
});

/** Horizontal bars: label on the left, percent on the right. */
export const ProgressWidget = memo(function ProgressWidget({ title, bars = [] }) {
    if (bars.length === 0) return null;
    return (
        <WidgetCard>
            <WidgetTitle icon="activity">{title}</WidgetTitle>
            <div className="flex flex-col gap-3.5">
                {bars.map((bar, i) => (
                    <div key={`${bar.label}-${i}`}>
                        <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                            <span className="min-w-0 truncate text-(--text-light)">{bar.label}</span>
                            <span className="shrink-0 text-xs tabular-nums text-(--text-gray)">{bar.percent}%</span>
                        </div>
                        <div
                            role="progressbar"
                            aria-valuenow={bar.percent}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={bar.label}
                            className="h-2 overflow-hidden rounded-full bg-(--pixel)"
                        >
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${bar.percent}%` }}
                                transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
                                className="h-full rounded-full bg-(--sucess)"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </WidgetCard>
    );
});

function BarChart({ points, unit }) {
    const max = Math.max(...points.map(p => p.value), 0) || 1;
    return (
        <div className="flex h-44 items-end gap-2 sm:gap-3">
            {points.map((p, i) => {
                const height = Math.max(4, (Math.max(p.value, 0) / max) * 100);
                return (
                    <div
                        key={`${p.label}-${i}`}
                        className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5"
                        title={`${p.label}: ${formatNumber(p.value)}${unit ? ` ${unit}` : ''}`}
                    >
                        <span className="text-xs tabular-nums text-(--text-light)">{formatNumber(p.value)}</span>
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
                            className="w-full max-w-14 rounded-t-lg bg-(--sucess) opacity-85"
                        />
                        <span className="w-full truncate text-center text-xs text-(--text-gray)">{p.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

function DonutChart({ points, unit }) {
    const sum = points.reduce((acc, p) => acc + p.value, 0);
    const total = points.reduce((acc, p) => acc + Math.max(p.value, 0), 0) || 1;
    let cumulative = 0;
    const slices = points.map((p, i) => {
        const pct = (Math.max(p.value, 0) / total) * 100;
        const slice = { ...p, pct, offset: cumulative, color: CHART_COLORS[i % CHART_COLORS.length] };
        cumulative += pct;
        return slice;
    });

    return (
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
            <div className="relative h-36 w-36 shrink-0">
                <svg viewBox="0 0 42 42" className="h-full w-full -rotate-90" role="img" aria-label="Share of total">
                    <circle cx="21" cy="21" r="15.9155" fill="none" stroke="var(--pixel)" strokeWidth="5" />
                    {slices.map(s => (
                        <circle
                            key={s.label}
                            cx="21"
                            cy="21"
                            r="15.9155"
                            fill="none"
                            stroke={s.color}
                            strokeWidth="5"
                            strokeDasharray={`${Math.max(s.pct - 0.6, 0)} ${100 - Math.max(s.pct - 0.6, 0)}`}
                            strokeDashoffset={-s.offset}
                        />
                    ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-semibold leading-none text-(--text-light)">
                        {formatNumber(sum)}
                    </span>
                    {unit && <span className="mt-1 text-[11px] text-(--text-gray)">{unit}</span>}
                </div>
            </div>
            <ul className="flex w-full min-w-0 flex-1 flex-col gap-2">
                {slices.map(s => (
                    <li key={s.label} className="flex items-center gap-2.5 text-sm">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                        <span className="min-w-0 flex-1 truncate text-(--text-light)">{s.label}</span>
                        <span className="shrink-0 text-xs tabular-nums text-(--text-gray)">{Math.round(s.pct)}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function LineChart({ points, unit }) {
    const W = 600;
    const H = 150;
    const PAD = 12;
    const values = points.map(p => p.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;

    const coords = points.map((p, i) => ({
        x: PAD + (i * (W - PAD * 2)) / (points.length - 1),
        y: H - PAD - ((p.value - min) / span) * (H - PAD * 2),
        ...p,
    }));
    const path = coords.map(c => `${c.x},${c.y}`).join(' ');
    const area = `${PAD},${H - PAD} ${path} ${W - PAD},${H - PAD}`;

    return (
        <div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible" role="img" aria-label="Trend">
                <polygon points={area} fill="var(--sucess)" opacity="0.1" />
                <polyline
                    points={path}
                    fill="none"
                    stroke="var(--sucess)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {coords.map(c => (
                    <circle key={c.label} cx={c.x} cy={c.y} r="3.5" fill="var(--pixel2)" stroke="var(--sucess)" strokeWidth="2">
                        <title>{`${c.label}: ${formatNumber(c.value)}${unit ? ` ${unit}` : ''}`}</title>
                    </circle>
                ))}
            </svg>
            <div className="mt-2 flex justify-between gap-1 text-xs text-(--text-gray)">
                {points.map(p => (
                    <span key={p.label} className="min-w-0 flex-1 truncate text-center first:text-left last:text-right">
                        {p.label}
                    </span>
                ))}
            </div>
        </div>
    );
}

/** bar / donut / line chart drawn with plain SVG + CSS (no chart library). */
export const ChartWidget = memo(function ChartWidget({ chartType = 'bar', title, unit = '', points = [] }) {
    if (points.length === 0) return null;
    const icon = chartType === 'line' ? 'trend' : 'activity';
    return (
        <WidgetCard>
            <WidgetTitle icon={icon} aside={unit ? <span className="text-xs text-(--text-gray)">{unit}</span> : null}>
                {title}
            </WidgetTitle>
            {chartType === 'donut' && <DonutChart points={points} unit={unit} />}
            {chartType === 'line' && <LineChart points={points} unit={unit} />}
            {chartType === 'bar' && <BarChart points={points} unit={unit} />}
        </WidgetCard>
    );
});

/** Side-by-side table: a label column plus 2–4 option columns. */
export const CompareWidget = memo(function CompareWidget({ title, columns = [], rows = [] }) {
    const body = useMemo(() => rows, [rows]);
    if (columns.length === 0 || body.length === 0) return null;

    return (
        <WidgetCard className="overflow-hidden p-0!">
            {title && (
                <div className="px-4 pt-4">
                    <WidgetTitle icon="layers">{title}</WidgetTitle>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[320px] border-collapse text-left text-sm">
                    <thead>
                        <tr>
                            <th className="w-[26%] px-4 py-2.5" />
                            {columns.map(col => (
                                <th key={col} className="px-4 py-2.5 font-semibold text-(--text-light)">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {body.map(row => (
                            <tr key={row.label} className="border-t border-(--border-light)">
                                <th scope="row" className="px-4 py-2.5 align-top font-normal text-(--text-gray)">
                                    {row.label}
                                </th>
                                {row.cells.map((cell, i) => (
                                    <td key={`${row.label}-${i}`} className="px-4 py-2.5 align-top text-(--text-light)">
                                        <InlineText text={cell} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </WidgetCard>
    );
});
