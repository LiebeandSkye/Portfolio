import React, { useState, useRef, useEffect } from 'react';
import { TiThList } from "react-icons/ti";
import { IoGrid } from "react-icons/io5";
import { FaCaretDown, FaCheck, FaSearch, FaRandom } from 'react-icons/fa';
import { HiOutlineSparkles } from "react-icons/hi2";

const PortfolioHeader = ({ allTags, selectedTags, onTagChange, onClearFilters, view, setView }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredTags = allTags.filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className='flex items-center justify-between py-4 border-b border-(--border-light)'>
            <div className='flex items-center gap-3'>
                <p className='text-(--text-light) text-sm font-medium'>Layout</p>

                {/* Segmented Layout Buttons */}
                <div className='flex bg-(--pixel) rounded-md border border-(--border-light) overflow-hidden'>
                    <button
                        onClick={() => setView('list')}
                        className={`px-3 py-1 flex items-center gap-2 text-sm font-semibold border-r border-(--border-light) transition-colors ${view === 'list' ? 'bg-(--pixel) text-(--text-light)' : 'text-(--text-gray) hover:bg-(--pixel-hover) cursor-pointer'}`}
                    >
                        <TiThList className={view === 'list' ? "text-red-400" : ""} /> list
                    </button>
                    <button
                        onClick={() => setView('grid')}
                        className={`px-3 py-1 flex items-center gap-2 text-sm font-semibold transition-colors ${view === 'grid' ? 'bg-(--pixel) text-(--text-light)' : 'text-(--text-gray) hover:bg-(--pixel-hover)'} cursor-pointer`}
                    >
                        <IoGrid className={view === 'grid' ? "text-red-400" : ""} /> grid
                    </button>
                </div>

                <div className='w-[1px] h-5 bg-(--border-light) mx-1'></div>

                {/* Dropdown Filter */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 bg-(--pixel) border border-(--border-light) rounded-md px-4 py-1 text-sm font-medium hover:bg-(--pixel-hover) transition-colors cursor-pointer"
                    >
                        <span className="text-(--text-light) font-semibold">Filter by Tag</span>
                        <FaCaretDown className="text-(--text-gray) text-[10px]" />
                    </button>

                    {isOpen && (
                        <div className="absolute left-0 mt-2 w-72 bg-(--pixel) border border-(--border-light) rounded-lg shadow-2xl z-50 overflow-hidden">
                            {/* Search Header */}
                            <div className="p-2 border-b border-(--border-light) bg-(--pixel">
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-2.5 text-(--text-gray) text-xs" />
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="Search tags"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-(--pixel) border border-(--border-light) rounded-md py-1.5 pl-8 pr-3 text-sm text-(--text-light) focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da]"
                                    />
                                </div>
                            </div>

                            {/* Scrollable Tag List with BRAVE/DESKTOP FIX */}
                            <div className="max-h-64 overflow-y-auto github-scrollbar bg-(--pixel)
                                [&::-webkit-scrollbar]:w-[6px]
                                [&::-webkit-scrollbar-track]:bg-[#161b22]
                                [&::-webkit-scrollbar-thumb]:bg-[#30363d]
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-button]:hidden
                            ">
                                {/* All Option */}
                                <div
                                    onClick={onClearFilters}
                                    className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-(--pixel-hover) border-b border-(--border-light) text-(--text-light)"
                                >
                                    <div className="w-6 flex items-center">
                                        {selectedTags.length === 0 && <FaCheck className="text-[10px]" />}
                                    </div>
                                    <span className="font-medium">All</span>
                                </div>

                                {/* Dynamic Tags */}
                                {filteredTags.map(tag => (
                                    <div
                                        key={tag}
                                        onClick={() => onTagChange(tag)}
                                        className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-(--pixel-hover) border-b border-(--border-light) last:border-0 text-(--text-light)"
                                    >
                                        <div className="w-6 flex items-center">
                                            {selectedTags.includes(tag) && <FaCheck className="text-[10px]" />}
                                        </div>
                                        <span>{tag}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button className="flex items-center gap-2 bg-(--pixel) border border-(--border-light) rounded-md px-3 py-1 text-sm font-medium hover:bg-(--pixel-hover) transition-colors">
                    <FaRandom className="text-xs" /> Random
                </button>
            </div>

            <button className="flex items-center gap-2 bg-(--sucess) text-white border border-(--sucess) rounded-md px-4 py-1.5 text-sm font-semibold hover:bg-(--sucess-hover) transition-colors">
                <HiOutlineSparkles className="text-lg" /> Ask SakuPilot
            </button>
        </div>
    );
};

export default PortfolioHeader;