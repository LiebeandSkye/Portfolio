import React, { useEffect, useState, useCallback, useMemo, memo } from 'react';
import DarkTheme from '../Header/DarkTheme';
import Language from '../Header/Lang/Language';
import Information from '../../Data/Contacts';
import CopyButton from './CopyButton';
import { PiInfoDuotone } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaHome, FaRandom } from "react-icons/fa";
import { FaBrain } from "react-icons/fa6";
import { MdOutlineCode } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { GoDependabot } from 'react-icons/go';
import profile from '../../assets/Kry_Rithisak.optimized.jpg';

const ICON_HOME    = <FaHome />;
const ICON_CODE    = <MdOutlineCode />;
const ICON_BRAIN   = <FaBrain />;
const ICON_MESSAGE = <RiMessage2Line />;

const LINK_DEFS = [
    { path: '/',          icon: ICON_HOME,    labelKey: 'links.welcome'   },
    { path: '/portfolio', icon: ICON_CODE,    labelKey: 'links.portfolio' },
    { path: '/dev-quiz',  icon: ICON_BRAIN,   labelKey: 'links.devQuiz'   },
    { path: '/contact',   icon: ICON_MESSAGE, labelKey: 'links.contact'   },
];

const Drawer = memo(function Drawer({ isOpen, toggleSidebar }) {
    const { t } = useLanguage();
    const [notification, setNotification] = useState({ show: false, message: '' });
    const [quote, setQuote] = useState({ text: '', author: '' });

    const links = useMemo(() => LINK_DEFS.map(l => ({
        ...l, name: t(l.labelKey),
    })), [t]);

    // Body scroll lock
    useEffect(() => {
        const body = document.body;

        if (isOpen) {
            const sw = window.innerWidth - document.documentElement.clientWidth;

            requestAnimationFrame(() => {
                body.style.overflow = 'hidden';
                body.style.paddingRight = `${sw}px`;
            });
        } else {
            body.style.overflow = '';
            body.style.paddingRight = '';
        }

        return () => {
            body.style.overflow = '';
            body.style.paddingRight = '';
        };
    }, [isOpen]);

    const randomizeQuote = useCallback(() => {
        const quotes = t('quotes');
        if (Array.isArray(quotes) && quotes.length > 0) {
            setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        }
    }, [t]);

    useEffect(() => {
        const id = setTimeout(randomizeQuote, 0);
        return () => clearTimeout(id);
    }, [randomizeQuote]);

    // Stable — avoids creating a new arrow function on every render that
    // causes CopyButton to re-render unnecessarily
    const handleCopy = useCallback(() => {
        setNotification({ show: true, message: t('copyMessage') });
    }, [t]);

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/65 backdrop-blur-[1px] z-[99990]"
                    onClick={toggleSidebar}
                />
            )}

            <div className={`
                fixed top-0 right-0 h-full w-74 md:w-100
                bg-(--light) text-(--text-light) dark:bg-(--dark-bg) dark:text-(--dark-text)
                shadow-2xl z-[99999] border-l border-(--border-light)
                overflow-y-auto github-scrollbar
                transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                will-change-transform transform-gpu
                ring-1 ring-white/20 dark:ring-white/10
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                {/* Close */}
                <div className="flex justify-end p-6">
                    <button onClick={toggleSidebar} className="text-lg cursor-pointer">
                        <RxCross2 />
                    </button>
                </div>

                {/* Profile */}
                <div className="px-8 pb-4">
                    <div className="w-28 h-28 overflow-hidden mb-2">
                        <img src={profile} alt="Kry Rithisak" width="112" height="112" className="w-full h-full rounded-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold text-(--text-light) text-xl">{t('name')}</p>
                        <p className="text-(--text-gray) font-semibold text-md leading-relaxed">{t('job')}</p>
                        <p className="text-gray-400 leading-relaxed text-xs">{t('description')}</p>
                    </div>
                </div>

                {/* Settings */}
                <div className="px-8 py-2">
                    <SectionLabel>Settings</SectionLabel>
                    <DarkTheme variant="toggle" />
                    <Language variant="selector" />
                </div>

                {/* Links */}
                <div className="flex flex-col gap-2 px-8">
                    <SectionLabel>Explore</SectionLabel>
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === '/'}
                            onClick={toggleSidebar}
                            className="group flex items-center gap-3 py-2 text-sm px-2 hover:bg-(--pixel-hover) rounded-lg transition-colors"
                        >
                            {({ isActive }) => (
                                <>
                                    <div className={`flex items-center gap-2 transition-colors ${isActive ? '' : 'text-(--text-light)'}`}>
                                        <span className={`text-lg ${isActive ? '' : 'text-gray-400'}`}>{link.icon}</span>
                                        {link.name}
                                    </div>
                                    {isActive && (
                                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)] mt-1" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                    <NavLink
                        to="/sakupilot"
                        onClick={toggleSidebar}
                        className="group flex items-center justify-between gap-3 py-2.5 px-2 w-full
                            text-sm text-(--text-light) hover:bg-(--pixel-hover) rounded-lg
                            transition-all duration-200 cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-lg text-gray-400 group-hover:text-(--sucess) transition-colors">
                                <GoDependabot />
                            </span>
                            <span>{t('sakupilot.drawerLabel') || 'SakuPilot'}</span>
                        </div>
                        {/* AI tag */}
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold
                            bg-gradient-to-r from-blue-600/20 to-purple-600/20
                            border border-blue-500/30 text-blue-400
                            group-hover:border-blue-400/60 group-hover:text-blue-300
                            shadow-[0_0_8px_rgba(59,130,246,0.12)]
                            transition-all duration-200 whitespace-nowrap">
                            ✦ {t('sakupilot.drawerTag') || 'AI Chat'}
                        </span>
                    </NavLink>
                </div>

                {/* Social */}
                <div className="flex flex-col gap-1 px-8 mt-4">
                    <SectionLabel>Connect with me</SectionLabel>
                    <div className="flex flex-col py-2">
                        {Information.map((info, index) => (
                            <div key={index} className="flex items-center gap-2.5 hover:bg-(--pixel-hover) rounded-lg py-2 px-2 cursor-pointer">
                                <div className="text-(--text-gray) text-lg">{info.icon}</div>
                                {info.copy ? (
                                    <div className="flex items-center gap-1">
                                        <span className="text-(--text-light) text-sm">{info.name}</span>
                                        <CopyButton
                                            text={info.name}
                                            isNotificationActive={notification.show}
                                            onCopy={handleCopy}
                                        />
                                    </div>
                                ) : (
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={info.type === 'email' ? `mailto:${info.url}` : info.url}
                                        className={`text-(--text-light) text-sm ${info.blue ? 'hover:underline' : 'hover:opacity-70'}`}
                                    >
                                        {info.name}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col gap-1 px-8 pb-8">
                    <SectionLabel>Others</SectionLabel>
                    <NavLink
                        to="/about-website"
                        onClick={toggleSidebar}
                        className="text-(--text-gray) flex items-center gap-2 px-2 py-1 mt-1 hover:bg-(--pixel-hover) rounded-lg cursor-pointer"
                    >
                        <PiInfoDuotone />
                        <span className="text-(--text-light)">{t('aboutWebsite')}</span>
                    </NavLink>
                    <div className="w-full h-[1px] bg-(--border-light) md:hidden mt-2" />
                    <div className="md:hidden mt-2">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                                <p className="text-(--sucess) leading-relaxed text-sm italic">{quote.text}</p>
                                <p className="text-(--sucess) leading-relaxed text-xs mt-2">{quote.author}</p>
                            </div>
                            <button
                                onClick={randomizeQuote}
                                title={t('randomizeBtn')}
                                className="p-2 text-(--sucess) hover:bg-green-500/10 rounded-full transition-all cursor-pointer"
                            >
                                <FaRandom size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

const SectionLabel = ({ children }) => (
    <div className="flex flex-col gap-1 mb-1">
        <p className="text-gray-400 text-xs">{children}</p>
        <div className="w-full h-[1px] bg-(--border-light)" />
    </div>
);

export default Drawer;
