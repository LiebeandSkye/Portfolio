import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../index.css';
import { useLanguage } from '../Header/Lang/LanguageContext';
import { FaHome } from "react-icons/fa";
import { MdOutlineCode } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";

const Links = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [moreOpen, setMoreOpen] = useState(false);
    const moreRef = useRef(null);

    // All nav links
    const allLinks = [
        { name: t('links')?.welcome || 'Welcome', path: '/', icon: <FaHome size={14} /> },
        { name: t('links')?.portfolio || 'Portfolio', path: '/portfolio', icon: <MdOutlineCode size={14} /> },
        { name: t('links')?.contact || 'Get in Touch', path: '/contact', icon: <RiMessage2Line size={14} /> },
    ];

    // On mobile: show first 2 as visible links, rest go in the 3-dot menu
    // On desktop (md+): show ALL links, no 3-dot button at all
    const visibleLinks = allLinks.slice(0, 2);   // always shown
    const overflowLinks = allLinks.slice(2);      // mobile overflow only


    useEffect(() => {
        const handler = (e) => {
            if (moreRef.current && !moreRef.current.contains(e.target)) {
                setMoreOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const linkClass = ({ isActive }) =>
        isActive ? 'active nav-link ' : 'inactive nav-link';

    return (
        <div className="bg-(--light) border-b border-(--border-light)">
            <div className="flex items-end px-4
            sm:px-6 md:px-10">

                {/* ── Mobile ────────── */}
                <div className="flex items-end justify-between w-full md:hidden">

                    <div className="flex items-end">
                        {visibleLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.path === '/'}
                                data-text={link.name}
                                className={linkClass}
                            >
                                <div className="flex items-center gap-1.5 whitespace-nowrap">
                                    <span className="flex-shrink-0">{link.icon}</span>
                                    <span className="text-sm">{link.name}</span>
                                </div>
                            </NavLink>
                        ))}
                    </div>

                    {/* 3-dot menu */}
                    {overflowLinks.length > 0 && (
                        <div ref={moreRef} className="relative flex items-end pb-3">
                            <button
                                onClick={() => setMoreOpen(v => !v)}
                                className={`
                    flex items-center justify-center w-7 h-7 rounded-md
                    text-(--text-gray) transition-colors duration-150 cursor-pointer
                    hover:bg-(--pixel-hover) hover:text-(--text-light)
                    ${moreOpen ? 'bg-(--pixel-hover) text-(--text-light)' : ''}
                `}
                                aria-label="More links"
                            >
                                <BsThreeDots size={16} />
                            </button>

                            {/* Dropdown :)()()( goin craaazy*/}
                            {moreOpen && (
                                <div
                                    className="absolute top-[calc(100%+8px)] right-0
                        bg-(--pixel2) border border-(--border-light) rounded-xl
                        shadow-[0_8px_30px_rgba(0,0,0,0.2)]
                        min-w-[180px] z-[200] overflow-hidden"
                                    style={{ animation: 'sp-panel 0.18s cubic-bezier(.16,1,.3,1)' }}
                                >
                                    {overflowLinks.map((link) => (
                                        <button
                                            key={link.path}
                                            onClick={() => { setMoreOpen(false); navigate(link.path); }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5
                                text-left text-sm text-(--text-light)
                                hover:bg-(--pixel-hover)
                                transition-colors duration-100 cursor-pointer"
                                        >
                                            <span className="text-(--text-gray) flex-shrink-0">{link.icon}</span>
                                            {link.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* ── for md: ────────── */}
                <div className="hidden md:flex items-end">
                    {allLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === '/'}
                            data-text={link.name}
                            className={linkClass}
                        >
                            <div className="flex items-center gap-1.5 whitespace-nowrap">
                                <span className="flex-shrink-0">{link.icon}</span>
                                <span className="text-sm">{link.name}</span>
                            </div>
                        </NavLink>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Links;