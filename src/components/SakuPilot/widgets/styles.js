// Shared class strings so every Intelligent UI component looks like one family:
// soft cards, sentence-case text, round pills, one accent colour.

export const cardClass =
    'my-3 w-full rounded-2xl border border-(--border-light) bg-(--pixel2) p-4';

export const iconBoxClass =
    'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-(--pixel) text-(--sucess)';

export const primaryButtonClass =
    'inline-flex items-center justify-center gap-2 rounded-full bg-(--text-light) px-4 py-2 text-sm font-medium text-(--light) transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer';

export const softButtonClass =
    'rounded-full border border-(--border-light) bg-(--pixel2) text-sm text-(--text-light) transition-colors hover:bg-(--pixel) cursor-pointer';

export const mutedText = 'text-(--text-gray)';

// Distinct, theme-safe hues for multi-series charts
export const CHART_COLORS = [
    '#3fb950',
    '#58a6ff',
    '#d29922',
    '#f778ba',
    '#a371f7',
    '#ff7b72',
    '#39c5cf',
    '#8b949e',
];
