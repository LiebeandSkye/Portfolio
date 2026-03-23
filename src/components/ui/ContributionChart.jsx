import React, { useState, useMemo, useCallback, memo } from 'react';
import characterMapLarge from '../../Data/characterMapLarge';
import characterMapSmall from '../../Data/characterMapSmall';

const WEEKS = 52;
const DAYS = 7;
const MAX_CHARACTERS = 14;

// Themes defined at module scope — never recreated
const THEMES = [
    { id: 'green',  colors: ['#0e4429', '#006d32', '#26a641', '#39d353'] },
    { id: 'blue',   colors: ['#1e3a8a', '#1d4ed8', '#3b82f6', '#60a5fa'] },
    { id: 'orange', colors: ['#7c2d12', '#9a3412', '#ea580c', '#fb923c'] },
    { id: 'purple', colors: ['#4c1d95', '#6d28d9', '#8b5cf6', '#a78bfa'] },
    { id: 'red',    colors: ['#7f1d1d', '#b91c1c', '#ef4444', '#f87171'] },
    { id: 'yellow', colors: ['#715c00', '#a28300', '#d4ab00', '#f7c600'] },
    { id: 'emoji',  symbols: ['😁', '😍', '😎', '🤩'] },
];

const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ─── Pure function — computes active squares from text ────────────────────────
function computeActiveSquares(text) {
    const nonSpaceCount = text.replace(/\s/g, '').length;
    const charWidthLarge   = 5, charSpacingLarge   = 2;
    const charWidthSmall   = 3, charSpacingSmall   = 1;
    const maxCharsLarge    = Math.floor(WEEKS / (charWidthLarge + charSpacingLarge));
    const isSmall          = nonSpaceCount > maxCharsLarge;
    const charMap          = isSmall ? characterMapSmall : characterMapLarge;
    const charWidth        = isSmall ? charWidthSmall  : charWidthLarge;
    const charSpacing      = isSmall ? charSpacingSmall: charSpacingLarge;

    // Use a Set of "x,y" strings for O(1) lookups instead of .some() O(n)
    const activeSet = new Set();
    let startX = 0;

    for (const char of text) {
        if (char === ' ') {
            startX += charSpacing;
        } else {
            const grid = charMap[char] || [];
            for (let row = 0; row < grid.length; row++) {
                for (let col = 0; col < grid[row].length; col++) {
                    if (grid[row][col] === 1) {
                        activeSet.add(`${startX + col},${row}`);
                    }
                }
            }
            startX += charWidth + charSpacing;
        }
    }
    return activeSet;
}

// ─── Single grid cell — memoized ─────────────────────────────────────────────
const GridCell = memo(function GridCell({ active, color, symbol }) {
    return (
        <div
            className="w-[11px] h-[11px] rounded-[2px] flex items-center justify-center bg-(--pixel)"
            style={{ backgroundColor: active && color ? color : undefined }}
        >
            {active && symbol && <span className="text-[9px] select-none">{symbol}</span>}
        </div>
    );
});

// ─── ContributionChart ────────────────────────────────────────────────────────
const ContributionChart = memo(function ContributionChart({ word = '' }) {
    const [inputText, setInputText] = useState(word || 'HELLO');
    const [chartStyle, setChartStyle] = useState('green');
    const [errorMessage, setErrorMessage] = useState('');

    const activeTheme = useMemo(
        () => THEMES.find(t => t.id === chartStyle),
        [chartStyle]
    );

    // Only recomputes when inputText changes — not on theme change
    const activeSet = useMemo(() => computeActiveSquares(inputText), [inputText]);

    const handleInputChange = useCallback((e) => {
        const raw      = e.target.value.toUpperCase();
        const filtered = raw.replace(/[^A-Z0-9\s]/g, '');

        if (filtered.length < raw.length) {
            setErrorMessage('Only letters, numbers, and spaces allowed');
            return;
        }
        const nonSpaceCount = filtered.replace(/\s/g, '').length;
        if (nonSpaceCount > MAX_CHARACTERS) {
            setErrorMessage(`Maximum ${MAX_CHARACTERS} characters`);
            return;
        }
        setErrorMessage('');
        setInputText(filtered);
    }, []);

    // Precompute the code snippet string — only changes when inputText changes
    const codeSnippet = useMemo(
        () => `const arr = [${inputText.split('').map(c => `'${c}'`).join(', ')}];`,
        [inputText]
    );

    return (
        <div className="flex items-center font-sans text-gray-300 p-4 md:p-0 github-scrollbar">
            <div className="flex flex-col lg:flex-row gap-6 md:gap-10 max-w-6xl w-full flex-shrink-0">

                {/* Main content */}
                <div className="flex-1 space-y-4 min-w-0">
                    <div className="space-y-2">
                        <h2 className="text-base md:text-lg font-medium text-(--text-light)">
                            Type below to generate a personalised graph
                        </h2>
                        <input
                            type="text"
                            placeholder="Type something"
                            value={inputText}
                            onChange={handleInputChange}
                            className="w-full border border-(--border-light) rounded-md py-3 px-4 text-(--text-light)
                                bg-transparent focus:outline-none placeholder:text-(--text-gray)
                                focus:ring-1 focus:ring-gray-500 transition-all"
                        />
                        <div className="h-5">
                            {errorMessage ? (
                                <p className="text-red-500 text-xs font-medium animate-pulse">{errorMessage}</p>
                            ) : (
                                <p className="text-xs text-gray-500">
                                    {MAX_CHARACTERS - inputText.replace(/\s/g, '').length}/{MAX_CHARACTERS} characters remaining
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Chart card */}
                    <div className="border border-(--border-light) rounded-xl p-4 md:p-8 overflow-hidden">
                        <div className="overflow-x-auto pb-4 scrollbar-hide">
                            <div className="inline-block min-w-max">
                                {/* Month labels */}
                                <div className="grid mb-3 ml-10" style={{ gridTemplateColumns: `repeat(${WEEKS}, 1fr)` }}>
                                    {MONTH_LABELS.map((m, i) => (
                                        <span key={i} className="text-[10px] text-gray-500 col-span-4">{m}</span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    {/* Y-axis */}
                                    <div className="flex flex-col justify-between text-[10px] text-gray-500 py-1 h-[95px]">
                                        <span>Mon</span><span>Wed</span><span>Fri</span>
                                    </div>

                                    {/* Grid — uses Set for O(1) active lookup */}
                                    <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${WEEKS}, 1fr)` }}>
                                        {Array.from({ length: WEEKS }, (_, x) => (
                                            <div key={x} className="grid grid-rows-7 gap-[3px]">
                                                {Array.from({ length: DAYS }, (_, y) => {
                                                    const active   = activeSet.has(`${x},${y}`);
                                                    const colorIdx = (x + y) % 4;
                                                    return (
                                                        <GridCell
                                                            key={y}
                                                            active={active}
                                                            color={active && activeTheme.colors ? activeTheme.colors[colorIdx] : undefined}
                                                            symbol={active && activeTheme.symbols ? activeTheme.symbols[colorIdx] : undefined}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center border-t border-gray-800 pt-4 gap-4">
                            <code className="text-[10px] md:text-[11px] text-(--text-gray) font-mono break-all">
                                {codeSnippet}
                            </code>
                            <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider self-end md:self-auto">
                                <span>Less</span>
                                <div className="flex gap-[3px] items-center">
                                    <div className="w-[11px] h-[11px] bg-(--pixel) rounded-[1px]" />
                                    {activeTheme.colors?.map(c => (
                                        <div key={c} className="w-[11px] h-[11px] rounded-[1px]" style={{ backgroundColor: c }} />
                                    ))}
                                    {activeTheme.symbols?.map(s => (
                                        <span key={s} className="text-[11px] leading-none">{s}</span>
                                    ))}
                                </div>
                                <span>More</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Theme selector sidebar */}
                <div className="flex flex-row lg:flex-col flex-wrap lg:flex-nowrap gap-3 md:gap-4 lg:mt-16 justify-center items-center">
                    {THEMES.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => setChartStyle(theme.id)}
                            className={`p-2 rounded-lg transition-all border cursor-pointer ${
                                chartStyle === theme.id
                                    ? 'bg-(--pixel) border-(--border-light) shadow-xl scale-110'
                                    : 'hover:bg-(--pixel) border-transparent opacity-70 hover:opacity-100'
                            }`}
                        >
                            <div className="flex gap-[2px]">
                                {theme.colors ? theme.colors.map(c => (
                                    <div key={c} className="w-4 h-3 rounded-[1px]" style={{ backgroundColor: c }} />
                                )) : (
                                    <div className="flex gap-0.5">
                                        {theme.symbols.map((s, i) => (
                                            <span key={i} className="text-xs md:text-sm">{s}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default ContributionChart;