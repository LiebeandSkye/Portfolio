import React, { useState, useMemo, useRef, useEffect, memo, useCallback } from 'react';
import Projects from '../../Data/Projects';
import { FaCaretDown, FaCheck, FaSearch } from 'react-icons/fa';

/**
 * For reusing if u need:
 * TagFilter — controlled component
 *
 * Props (all required):
 *  selectedTags   – string[]         current active tags
 *  onTagChange    – (tag) => void    toggle a tag on/off
 *  onClearFilters – () => void       clear all selected tags
 */
const TagFilter = memo(function TagFilter({ selectedTags, onTagChange, onClearFilters }) {
    const [isOpen, setIsOpen]       = useState(false);
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

    const allTags = useMemo(() => {
        const set = new Set();
        Projects.forEach(p => p.tags?.forEach(tag => set.add(tag)));
        return Array.from(set).sort();
    }, []);

    const filteredTags = useMemo(
        () => allTags.filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())),
        [allTags, searchTerm]
    );

    const handleClear = useCallback(() => {
        onClearFilters();
        setIsOpen(false);
    }, [onClearFilters]);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger */}
            <button
                onClick={() => setIsOpen(v => !v)}
                className="flex items-center gap-2 bg-(--pixel) border border-(--border-light)
                    rounded-md px-3 py-1 text-sm font-medium
                    text-(--text-light) hover:bg-(--pixel-hover)
                    transition-colors cursor-pointer"
            >
                <span>Filter by Tag</span>
                {selectedTags.length > 0 && (
                    <span className="bg-(--sucess) text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0">
                        {selectedTags.length}
                    </span>
                )}
                <FaCaretDown className={`text-(--text-gray) text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="absolute left-0 mt-2 w-72 bg-(--pixel) border border-(--border-light)
                        rounded-lg shadow-2xl z-50 overflow-hidden"
                    style={{ animation: 'sp-panel 0.18s cubic-bezier(.16,1,.3,1)' }}
                >
                    {/* Search input */}
                    <div className="p-2 border-b border-(--border-light)">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-2.5 text-(--text-gray) text-xs" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search tags"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-(--pixel2) border border-(--border-light) rounded-md
                                    py-1.5 pl-8 pr-3 text-sm text-(--text-light)
                                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Tag list */}
                    <div className="max-h-64 overflow-y-auto github-scrollbar">
                        {/* All option */}
                        <div
                            onClick={handleClear}
                            className="flex items-center px-3 py-2 text-sm cursor-pointer
                                hover:bg-(--pixel-hover) border-b border-(--border-light) text-(--text-light)"
                        >
                            <div className="w-5 flex items-center flex-shrink-0">
                                {selectedTags.length === 0 && <FaCheck className="text-[10px]" />}
                            </div>
                            <span className="font-medium">All</span>
                        </div>

                        {filteredTags.map(tag => (
                            <div
                                key={tag}
                                onClick={() => onTagChange(tag)}
                                className="flex items-center px-3 py-2 text-sm cursor-pointer
                                    hover:bg-(--pixel-hover) border-b border-(--border-light)
                                    last:border-0 text-(--text-light)"
                            >
                                <div className="w-5 flex items-center flex-shrink-0">
                                    {selectedTags.includes(tag) && <FaCheck className="text-[10px]" />}
                                </div>
                                <span>{tag}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});

export default TagFilter;