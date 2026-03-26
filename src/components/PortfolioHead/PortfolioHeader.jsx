import React, { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiThList } from "react-icons/ti";
import { IoGrid } from "react-icons/io5";
import { FaCaretDown, FaCheck, FaSearch, FaRandom } from 'react-icons/fa';
import { HiOutlineSparkles } from "react-icons/hi2";
import Projects from '../../Data/Projects';
import TagFilter from './TagFilter';
import { useSakuPilot } from './context/SakupilotContext';

const PortfolioHeader = memo(function PortfolioHeader({
    allTags,
    selectedTags,
    onTagChange,
    onClearFilters,
    view,
    setView,
    handleClearFilters,
    handleTagChange,
}) {
    const navigate = useNavigate();
    const { openChat } = useSakuPilot(); //Example here u should tryna use this every file so it works lah
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const filteredTags = useMemo(
        () => allTags.filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())),
        [allTags, searchTerm]
    );

    const handleRandom = useCallback(() => {
        if (!Projects.length) return;
        const random = Projects[Math.floor(Math.random() * Projects.length)];
        navigate(`/portfolio/${random.id}`);
    }, [navigate]);

    // ── Shared dropdown ───────────
    const renderDropdown = (width = 'w-72') => isOpen && (
        <div
            className={`absolute left-0 mt-2 ${width} bg-(--pixel) border border-(--border-light)
                rounded-lg shadow-2xl z-50 overflow-hidden`}
            style={{ animation: 'sp-panel 0.18s cubic-bezier(.16,1,.3,1)' }}
        >
            <div className="p-2 border-b border-(--border-light)">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-2.5 text-(--text-gray) text-xs" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search tags"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-(--pixel2) border border-(--border-light) rounded-md py-1.5 pl-8 pr-3
                            text-sm text-(--text-light) focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="max-h-56 overflow-y-auto github-scrollbar">
                <div
                    onClick={() => { onClearFilters(); setIsOpen(false); }}
                    className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-(--pixel-hover) border-b border-(--border-light) text-(--text-light)"
                >
                    <div className="w-6 flex-shrink-0">
                        {selectedTags.length === 0 && <FaCheck className="text-[10px]" />}
                    </div>
                    <span className="font-medium">All</span>
                </div>
                {filteredTags.map(tag => (
                    <div
                        key={tag}
                        onClick={() => { onTagChange(tag); }}
                        className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-(--pixel-hover) border-b border-(--border-light) last:border-0 text-(--text-light)"
                    >
                        <div className="w-6 flex-shrink-0">
                            {selectedTags.includes(tag) && <FaCheck className="text-[10px]" />}
                        </div>
                        <span>{tag}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="py-4 border-b border-(--border-light)">

            {/* ── DESKTOP (md+) ─────────────────────────────────────────────── */}
            <div className="hidden md:flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <p className="text-(--text-light) text-sm font-medium">Layout</p>

                    {/* List / Grid toggle */}
                    <div className="flex bg-(--pixel) rounded-md border border-(--border-light) overflow-hidden">
                        <button
                            onClick={() => setView('list')}
                            className={`px-3 py-1 flex items-center gap-2 text-sm font-semibold border-r border-(--border-light) transition-colors cursor-pointer
                                ${view === 'list' ? 'text-(--text-light)' : 'text-(--text-gray) hover:bg-(--pixel-hover)'}`}
                        >
                            <TiThList className={view === 'list' ? 'text-red-400' : ''} /> list
                        </button>
                        <button
                            onClick={() => setView('grid')}
                            className={`px-3 py-1 flex items-center gap-2 text-sm font-semibold transition-colors cursor-pointer
                                ${view === 'grid' ? 'text-(--text-light)' : 'text-(--text-gray) hover:bg-(--pixel-hover)'}`}
                        >
                            <IoGrid className={view === 'grid' ? 'text-red-400' : ''} /> grid
                        </button>
                    </div>

                    <div className="w-[1px] h-5 bg-(--border-light) mx-1" />

                    {/* Filter by Tag */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsOpen(v => !v)}
                            className="flex items-center gap-2 bg-(--pixel) border border-(--border-light) rounded-md px-4 py-1
                                text-sm font-semibold text-(--text-light) hover:bg-(--pixel-hover) transition-colors cursor-pointer"
                        >
                            Filter by Tag
                            <FaCaretDown className={`text-(--text-gray) text-[10px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {renderDropdown('w-72')}
                    </div>

                    {/* Random */}
                    <button
                        onClick={handleRandom}
                        className="flex items-center gap-2 bg-(--pixel) border border-(--border-light) rounded-md px-3 py-1
                            text-sm font-medium text-(--text-light) hover:bg-(--pixel-hover) transition-colors cursor-pointer"
                    >
                        <FaRandom className="text-xs" /> Random
                    </button>
                </div>

                {/* Ask SakuPilot */}
                <button
                    onClick={openChat}
                    className="flex items-center gap-2 bg-(--sucess) text-white border border-(--sucess) rounded-md px-4 py-1.5
                        text-sm font-semibold hover:bg-(--sucess-hover) transition-colors cursor-pointer"
                >
                    <HiOutlineSparkles className="text-lg" /> Ask SakuPilot
                </button>
            </div>

            {/* ── MOBILE (< md) ─────────────────────────────────────────────── */}
            <div className="flex flex-col gap-2 md:hidden">

                {/* Row 1: Layout label + toggle */}
                <div className="flex items-center gap-3">
                    <span className="text-(--text-light) text-sm font-medium">Layout</span>
                    <div className="flex bg-(--pixel) rounded-md border border-(--border-light) overflow-hidden">
                        <button
                            onClick={() => setView('list')}
                            className={`px-3 py-1.5 flex items-center gap-1.5 text-sm font-semibold border-r border-(--border-light) transition-colors cursor-pointer
                                ${view === 'list' ? 'text-(--text-light)' : 'text-(--text-gray) hover:bg-(--pixel-hover)'}`}
                        >
                            <TiThList className={view === 'list' ? 'text-red-400' : ''} /> list
                        </button>
                        <button
                            onClick={() => setView('grid')}
                            className={`px-3 py-1.5 flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer
                                ${view === 'grid' ? 'text-(--text-light)' : 'text-(--text-gray) hover:bg-(--pixel-hover)'}`}
                        >
                            <IoGrid className={view === 'grid' ? 'text-red-400' : ''} /> grid
                        </button>
                    </div>
                </div>

                {/* Row 2: Random + Ask SakuPilot (50/50) */}
                <div className="flex gap-2">
                    <button
                        onClick={handleRandom}
                        className="flex-1 flex items-center justify-center gap-2
                            bg-(--pixel) border border-(--border-light) rounded-md py-2
                            text-sm font-semibold text-(--text-light)
                            hover:bg-(--pixel-hover) transition-colors cursor-pointer"
                    >
                        <FaRandom className="text-xs" /> Random
                    </button>
                    <button
                        onClick={openChat}
                        className="flex-1 flex items-center justify-center gap-2
                            bg-(--sucess) text-white border border-(--sucess) rounded-md py-2
                            text-sm font-semibold hover:bg-(--sucess-hover) transition-colors cursor-pointer"
                    >
                        <HiOutlineSparkles className="text-base" /> Ask SakuPilot
                    </button>
                </div>

                {/* Row 3: Filter by Tag — full width */}
                <TagFilter
                    selectedTags={selectedTags}
                    onTagChange={handleTagChange}
                    onClearFilters={handleClearFilters}
                />
            </div>
        </div>
    );
});

export default PortfolioHeader;