import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { FaHome } from 'react-icons/fa';
import { MdOutlineCode, MdFullscreen } from 'react-icons/md';
import { RiMessage2Line } from 'react-icons/ri';
import { GoDependabot } from 'react-icons/go';
import { useLanguage } from './Lang/LanguageContext';
import Projects from '../../Data/Projects';
import Kry_Rithisak from '../../assets/Kry_Rithisak.jpg';
import SearchPalette from './SearchPalette';

const PAGE_DEFS = [
    { id: 'welcome',   path: '/',          icon: <FaHome size={14} />,         labelKey: 'links.welcome',   actionKey: 'search.visit' },
    { id: 'portfolio', path: '/portfolio', icon: <MdOutlineCode size={14} />,  labelKey: 'links.portfolio', actionKey: 'search.visit' },
    { id: 'contact',   path: '/contact',   icon: <RiMessage2Line size={14} />, labelKey: 'links.contact',   actionKey: 'search.visit' },
];

const PILOT_DEFS = [
    { id: 'pilot-chat',      icon: <GoDependabot size={14} />, labelKey: 'search.quickChat', actionKey: 'search.startConversation', pilotAction: 'openChat' },
    { id: 'pilot-immersive', icon: <MdFullscreen size={14} />, labelKey: 'search.immersive', actionKey: 'search.startConversation', pilotAction: 'openImmersive' },
];

const Search = ({ onOpenChat }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const [isOpen, setIsOpen]       = useState(false);
    const [query, setQuery]         = useState('');
    const [activeIndex, setActive]  = useState(0);

    // Always-current ref — avoids ANY stale closure issue with onOpenChat
    const onOpenChatRef = useRef(onOpenChat);
    useEffect(() => { onOpenChatRef.current = onOpenChat; }, [onOpenChat]);

    // ── Build translated lists ────────────────────────────────────────────────
    const pages = PAGE_DEFS.map(p => ({
        ...p,
        label:  t(p.labelKey)  || p.id,
        action: t(p.actionKey) || 'Visit',
    }));

    const pilotEntries = PILOT_DEFS.map(e => ({
        ...e,
        label:  t(e.labelKey)  || e.id,
        action: t(e.actionKey) || 'Start conversation',
    }));

    const projects = Projects.map(p => ({
        id:     `project-${p.id}`,
        path:   `/portfolio/${p.id}`,
        label:  t(`projects.${p.langKey}.title`)       || p.title || '',
        desc:   t(`projects.${p.langKey}.description`) || '',
        action: t('search.jumpTo') || 'Jump to',
    }));

    // ── Filter ────────────────────────────────────────────────────────────────
    const q = query.trim().toLowerCase();

    const filteredPages    = q ? pages.filter(p => p.label.toLowerCase().includes(q)) : pages;
    const filteredProjects = q ? projects.filter(p =>
        p.label.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
    ) : projects;
    const filteredPilot = q
        ? pilotEntries.filter(e => e.label.toLowerCase().includes(q))
        : pilotEntries;

    const allResults = [
        ...filteredPages.map(p    => ({ ...p, _type: 'page' })),
        ...filteredProjects.map(p => ({ ...p, _type: 'project' })),
        ...filteredPilot.map(e    => ({ ...e, _type: 'pilot' })),
    ];

    // ── Open / close ──────────────────────────────────────────────────────────
    const open = () => { setIsOpen(true); setQuery(''); setActive(0); };
    const close = () => { setIsOpen(false); setQuery(''); setActive(0); };

    // '/' shortcut + Escape
    useEffect(() => {
        const handler = (e) => {
            const tag = document.activeElement?.tagName;
            if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
                e.preventDefault();
                open();
            }
            if (e.key === 'Escape' && isOpen) close();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    // open/close are defined inline so they're stable each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    useEffect(() => { setActive(0); }, [query]);

    // ── Keyboard nav ──────────────────────────────────────────────────────────
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive(i => Math.min(i + 1, allResults.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive(i => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const item = allResults[activeIndex];
            if (item) handleSelect(item);
        }
    };

    // ── Selection — the critical part ─────────────────────────────────────────
    // We do NOT wrap this in useCallback because we want it to always use
    // the latest `allResults`, `activeIndex`, and `onOpenChatRef`.
    const handleSelect = (item) => {
        // Step 1: close palette (restores body scroll synchronously via effect)
        close();

        if (item._type === 'pilot' && item.pilotAction === 'openChat') {
            // Step 2: call onOpenChat via ref — always points to the current
            // Header state setter, never stale.
            onOpenChatRef.current?.();
        } else if (item.path) {
            navigate(item.path);
        }
    };

    const getFlatIndex = (type, i) => {
        if (type === 'page')    return i;
        if (type === 'project') return filteredPages.length + i;
        return filteredPages.length + filteredProjects.length + i;
    };

    return (
        <>
            {/* Desktop: styled button that looks like a search input */}
            <div className="hidden md:block">
                <button
                    onClick={open}
                    className="flex items-center gap-2 pl-3 pr-2 py-1.5
                        border border-(--border-light)
                        rounded-md text-sm bg-transparent
                        text-(--text-gray)
                        hover:border-[#0969da] hover:bg-(--pixel)
                        transition-all duration-150 cursor-pointer
                        min-w-[190px] text-left"
                >
                    <CiSearch size={15} className="flex-shrink-0" />
                    <span className="flex-1 text-[13px]">{t('searchPlaceholder') || 'Search...'}</span>
                    <kbd className="text-[10px] bg-(--pixel) border border-(--border-light) rounded px-1.5 py-0.5 text-(--text-gray) font-sans">
                        /
                    </kbd>
                </button>
            </div>

            {/* Mobile: icon only */}
            <button
                onClick={open}
                className="icon-button border border-(--border-light) md:hidden flex items-center justify-center p-2 rounded-md transition-all"
            >
                <CiSearch size={20} className="text-(--text-light)" />
            </button>

            {/* Palette portal */}
            <SearchPalette
                isOpen={isOpen}
                query={query}
                setQuery={setQuery}
                handleKeyDown={handleKeyDown}
                onClose={close}
                allResults={allResults}
                filteredPages={filteredPages}
                filteredProjects={filteredProjects}
                filteredPilot={filteredPilot}
                getFlatIndex={getFlatIndex}
                activeIndex={activeIndex}
                setActiveIndex={setActive}
                handleSelect={handleSelect}
                t={t}
                Kry_Rithisak={Kry_Rithisak}
            />
        </>
    );
};

export default Search;