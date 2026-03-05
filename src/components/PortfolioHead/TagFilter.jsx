import React, { useState, useMemo, useRef, useEffect } from 'react';
import Projects from '../../Data/Projects';
import '../../index.css';
import { FaCaretDown, FaCheck, FaSearch } from 'react-icons/fa';

const TagFilter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const allTags = useMemo(() => {
        const tagsSet = new Set();
        Projects.forEach(project => project.tags.forEach(tag => tagsSet.add(tag)));
        return Array.from(tagsSet).sort();
    }, []);

    const filteredTags = useMemo(() => {
        return allTags.filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [allTags, searchTerm]);

    const handleTagChange = (tag) => {
        if (tag === 'all') {
            setSelectedTags([]);
        } else {
            setSelectedTags(prev =>
                prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
            );
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* The Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-[#21262d] border border-(--border-light) rounded-md px-3 py-1 text-sm font-medium hover:bg-[#30363d] transition-colors"
            >
                <span className="text-(--text-light)">Filter by Tag</span>
                <FaCaretDown className="text-(--text-gray) text-xs" />
            </button>

            {/* The Dropdown Menu */}
            {isOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-[#161b22] border border-(--border-light) rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="p-2 border-b border-(--border-light)">
                        <div className="relative flex items-center">
                            <FaSearch className="absolute left-3 text-(--text-gray) text-xs" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search tags"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#0d1117] border border-(--border-light) rounded-md py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* The Dropdown Menu List Container */}
                    <div className="max-h-64 overflow-y-auto github-scrollbar">
                        {/* 'All' Option - Matches the image top item */}
                        <div
                            onClick={onClearFilters}
                            className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-[#30363d] border-b border-(--border-light)"
                        >
                            <div className="w-5 flex items-center">
                                {selectedTags.length === 0 && <FaCheck className="text-[10px] text-(--text-light)" />}
                            </div>
                            <span className="font-medium text-(--text-light)">All</span>
                        </div>

                        {/* List of Tags */}
                        {filteredTags.map(tag => (
                            <div
                                key={tag}
                                onClick={() => onTagChange(tag)}
                                className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-[#30363d] border-b border-[#21262d] last:border-0"
                            >
                                <div className="w-5 flex items-center">
                                    {selectedTags.includes(tag) && <FaCheck className="text-[10px] text-(--text-light)" />}
                                </div>
                                <span className="text-(--text-light)">{tag}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TagFilter;