import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CiSearch } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';

const SearchPalette = ({
    isOpen,
    query,
    setQuery,
    handleKeyDown,
    onClose,
    allResults,
    filteredPages,
    filteredProjects,
    filteredPilot,
    getFlatIndex,
    activeIndex,
    setActiveIndex,
    handleSelect,
    t,
    Kry_Rithisak,
}) => {
    const inputRef = useRef(null);
    const listRef  = useRef(null);

    // ── Body scroll lock ───────────────────────────────────────────────────────
    useEffect(() => {
        if (isOpen) {
            const y = window.scrollY;
            document.body.style.overflow  = 'hidden';
            document.body.style.position  = 'fixed';
            document.body.style.width     = '100%';
            document.body.style.top       = `-${y}px`;
        } else {
            const top = document.body.style.top;
            document.body.style.overflow  = '';
            document.body.style.position  = '';
            document.body.style.width     = '';
            document.body.style.top       = '';
            if (top) window.scrollTo(0, -parseInt(top, 10));
        }
        return () => {
            document.body.style.overflow  = '';
            document.body.style.position  = '';
            document.body.style.width     = '';
            document.body.style.top       = '';
        };
    }, [isOpen]);

    // ── Focus input when opened ────────────────────────────────────────────────
    useEffect(() => {
        if (isOpen) {
            const id = setTimeout(() => inputRef.current?.focus(), 60);
            return () => clearTimeout(id);
        }
    }, [isOpen]);

    // ── Scroll active item into view ───────────────────────────────────────────
    useEffect(() => {
        if (!listRef.current) return;
        const el = listRef.current.querySelector('[data-active="true"]');
        el?.scrollIntoView({ block: 'nearest' });
    }, [activeIndex]);

    if (!isOpen) return null;

    const noResults = allResults.length === 0;

    const content = (
        <>
            {/* Keyframe definitions — injected once, scoped to this mount */}
            <style>{`
                @keyframes sp-backdrop { from { opacity:0 } to { opacity:1 } }
                @keyframes sp-panel    { from { opacity:0; transform:translateY(-10px) scale(.97) }
                                         to   { opacity:1; transform:translateY(0)     scale(1)   } }
            `}</style>

            {/* ── Backdrop ─────────────────────────────────────────────────── */}
            <div
                className="fixed inset-0 z-[9998] flex justify-center items-start"
                style={{ background:'rgba(0,0,0,0.55)', backdropFilter:'blur(2px)',
                         animation:'sp-backdrop 0.18s ease' }}
                onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >
                {/* ── Panel ────────────────────────────────────────────────── */}
                <div
                    className="w-[84%] mt-[2vh]
                        bg-(--pixel2) border border-(--border-light)
                        rounded-xl overflow-hidden flex flex-col h-[80vh] md:h-auto
                        shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
                    style={{ animation:'sp-panel 0.2s cubic-bezier(.16,1,.3,1)', zIndex:9999 }}
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    {/* Input row */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-(--border-light) flex-shrink-0">
                        <CiSearch size={17} className="text-(--text-gray) flex-shrink-0" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={t('search.placeholder') || 'Search this website...'}
                            className="flex-1 bg-transparent text-(--text-light) text-sm outline-none placeholder:text-(--text-gray)"
                            autoComplete="off"
                            spellCheck={false}
                        />
                        {/* ESC badge */}
                        <button
                            onClick={onClose}
                            className="hidden md:flex items-center text-[11px] text-(--text-gray) border border-(--border-light) rounded px-1.5 py-0.5 hover:text-(--text-light) hover:border-(--text-gray) transition-colors cursor-pointer flex-shrink-0 font-mono"
                        >
                            ESC
                        </button>
                        {/* × for mobile */}
                        <button
                            onClick={onClose}
                            className="md:hidden text-(--text-gray) hover:text-(--text-light) cursor-pointer flex-shrink-0 transition-colors"
                        >
                            <IoClose size={17} />
                        </button>
                    </div>

                    {/* Scrolling place */}
                    <div
                        ref={listRef}
                        className="overflow-y-auto github-scrollbar overflow-x-clip"
                        style={{ maxHeight: '360px' }}
                    >
                        {noResults ? (
                            <p className="py-10 text-center text-sm text-(--text-gray)">
                                {t('portfolio.noMatches') || 'No results found'}
                            </p>
                        ) : (
                            <>
                                {filteredPages.length > 0 && (
                                    <Section label={t('search.pages') || 'Pages'}>
                                        {filteredPages.map((page, i) => {
                                            const fi = getFlatIndex('page', i);
                                            return (
                                                <Row
                                                    key={page.id}
                                                    isActive={activeIndex === fi}
                                                    onMouseEnter={() => setActiveIndex(fi)}
                                                    onClick={() => handleSelect({ ...page, _type:'page' })}
                                                    left={
                                                        <span className="flex items-center gap-3">
                                                            <span className="text-(--text-gray) flex-shrink-0">{page.icon}</span>
                                                            <span className="text-(--text-light) text-sm">{page.label}</span>
                                                        </span>
                                                    }
                                                    right={<ActionLabel>{page.action}</ActionLabel>}
                                                />
                                            );
                                        })}
                                    </Section>
                                )}
                                <div className='w-full h-[0.5px] mt-4 -mb-2 bg-(--border-light)'></div>
                                {filteredProjects.length > 0 && (   
                                    <Section label={t('search.projects') || 'Projects'}>
                                        {filteredProjects.map((proj, i) => {
                                            const fi = getFlatIndex('project', i);
                                            return (
                                                <Row
                                                    key={proj.id}
                                                    isActive={activeIndex === fi}
                                                    onMouseEnter={() => setActiveIndex(fi)}
                                                    onClick={() => handleSelect({ ...proj, _type:'project' })}
                                                    left={
                                                        <span className="flex items-center gap-3 min-w-0">
                                                            <span className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 border border-(--border-light)">
                                                                <img src={Kry_Rithisak} className="w-full h-full object-cover" alt="" />
                                                            </span>
                                                            <span className="text-sm text-(--text-gray) truncate">
                                                                Kry-Rithisak/<span className="text-(--text-light) font-semibold">{proj.label}</span>
                                                            </span>
                                                        </span>
                                                    }
                                                    right={<ActionLabel>{proj.action}</ActionLabel>}
                                                />
                                            );
                                        })}
                                    </Section>
                                )}
                                <div className='w-full h-[0.5px] mt-4 -mb-2 bg-(--border-light)'></div>
                                {filteredPilot.length > 0 && (
                                    <Section label="SakuPilot">
                                        {filteredPilot.map((entry, i) => {
                                            const fi = getFlatIndex('pilot', i);
                                            return (
                                                <Row
                                                    key={entry.id}
                                                    isActive={activeIndex === fi}
                                                    onMouseEnter={() => setActiveIndex(fi)}
                                                    onClick={() => handleSelect({ ...entry, _type:'pilot' })}
                                                    left={
                                                        <span className="flex items-center gap-3">
                                                            <span className="text-(--sucess) flex-shrink-0">{entry.icon}</span>
                                                            <span className="text-(--text-light) text-sm">{entry.label}</span>
                                                        </span>
                                                    }
                                                    right={<ActionLabel>{entry.action}</ActionLabel>}
                                                />
                                            );
                                        })}
                                    </Section>
                                )}
                            </>
                        )}
                    </div>

                    {/* Footer hints */}
                    <div className="flex items-center gap-3 px-4 py-2  text-[11px] text-(--text-gray) select-none flex-shrink-0">
                        <span><Kbd>↑↓</Kbd> navigate</span>
                        <span><Kbd>↵</Kbd> open</span>
                        <span><Kbd>esc</Kbd> close</span>
                        <span className="ml-auto hidden md:inline">
                            Press <Kbd>/</Kbd> to search
                        </span>
                    </div>
                </div>
            </div>
        </>
    );

    return createPortal(content, document.body);
};

// ── Sub-components ─────────────────────────────────────────────────────────────

const Section = ({ label, children }) => (
    <div>
        <div className="px-4 pt-3 pb-1">
            <span className="text-[11px] font-semibold text-(--text-gray) uppercase tracking-wider">{label}</span>
        </div>
        {children}
    </div>
);

const Row = ({ left, right, isActive, onClick, onMouseEnter }) => (
    <button
        data-active={isActive}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        className={`
            group w-full flex items-center justify-between px-4 py-2.5 text-left
            transition-colors duration-75 cursor-pointer border-l-2
            ${isActive
                ? 'bg-(--pixel) border-l-(--sucess)'
                : 'bg-transparent border-l-transparent hover:bg-(--pixel)'
            }
        `}
    >
        <div className="flex-1 min-w-0 mr-4">{left}</div>
        <div className="flex-shrink-0">{right}</div>
    </button>
);

const ActionLabel = ({ children }) => (
    <span className="text-xs text-(--text-gray) group-hover:text-(--text-light) transition-colors">
        {children}
    </span>
);

const Kbd = ({ children }) => (
    <kbd className="bg-(--pixel) border border-(--border-light) rounded px-1 py-0.5 font-mono text-[10px] text-(--text-gray)">
        {children}
    </kbd>
);

export default SearchPalette;