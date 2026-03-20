import React, { useEffect, useState, useCallback } from 'react';
import DarkTheme from '../Header/DarkTheme';
import Language from '../Header/Lang/Language';
import Information from '../../Data/Contacts';
import CopyButton from './CopyButton';
import Notification from './Toast';
import { PiInfoDuotone } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../Header/Lang/LanguageContext';
import { FaHome } from "react-icons/fa";
import { MdOutlineCode } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { FaRandom } from "react-icons/fa";
import profile from '../../assets/Kry_Rithisak.jpg'
const Drawer = ({ isOpen, toggleSidebar }) => {
    const { t } = useLanguage();
    const [notification, setNotification] = useState({ show: false, message: '' });
    const [quote, setQuote] = useState({ text: '', author: '' });
    
    const links = [
        { name: t('links')?.welcome || 'Welcome', path: '/', icon: <FaHome /> },
        { name: t('links')?.portfolio || 'Portfolio', path: '/portfolio', icon: <MdOutlineCode /> },
        { name: t('links')?.contact || 'Contact', path: '/contact', icon: <RiMessage2Line /> },
    ];
    useEffect(() => {
        const body = document.body;

        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            body.style.overflow = 'hidden';
            body.style.paddingRight = `${scrollbarWidth}px`; // prevent layout shift
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
            if (quotes && quotes.length > 0) {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                setQuote(quotes[randomIndex]);
            }
        }, [t]);
    
        useEffect(() => {
            randomizeQuote();
        }, [randomizeQuote, t]);
    return (
        <>
            {/* --- Overlay Backdrop --- */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 transition-opacity"
                    onClick={toggleSidebar}
                />
            )}

            {/* --- Sidebar Menu --- */}
            <div className={`fixed top-0 right-0 h-full w-74 md:w-100 bg-(--light) text-(--text-light) dark:bg-(--dark-bg) dark:text-(--dark-text) shadow-2xl z-99999 transition-transform duration-300 ease-in-out will-change-transform border-l border-(--border-light) overflow-y-auto github-scrollbar ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Close Button */}
                <div className="flex justify-end p-6">
                    <button
                        onClick={toggleSidebar}
                        className="text-lg transition-transform cursor-pointer"
                    >
                        <RxCross2 />
                    </button>
                </div>
                {/* info */}
                <div className='px-8 pb-4'>
                    <div className='w-28 h-28 overflow-hidden mb-2 '>
                        <img src={profile} alt="" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='flex flex-col'>
                            <h1 className='font-semibold text-(--text-light) text-xl'>{t('name')}</h1>
                            <p className='text-(--text-gray) font-semibold text-md leading-relaxed'>{t('job')}</p>
                        </div>
                        <div className=''>
                            <p className='text-gray-400 leading-relaxed text-xs'>{t('description')}</p>
                        </div>
                    </div>
                </div>
                {/* Settings */}
                <div className='px-8 py-2'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-gray-400 text-xs'>Settings</p>
                        <div className='w-full h-[1px] bg-(--border-light)'></div>
                    </div>
                    <DarkTheme variant="toggle" />
                    <Language variant="selector" />
                </div>
                {/* Links */}
                <div className="flex flex-col gap-2 px-8">
                    <div className='flex flex-col gap-1'>
                        <p className='text-gray-400 text-xs'>Explore</p>
                        <div className='w-full h-[1px] bg-(--border-light)'></div>
                    </div>
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={toggleSidebar} // Close drawer when clicking a link
                            className="group flex items-center gap-3 py-2 transition-colors text-sm px-2 hover:bg-(--pixel-hover) rounded-lg"
                        >
                            {({ isActive }) => (
                                <>
                                    {/* Left Side: Icon + Label */}
                                    <div className={`flex items-center gap-2 transition-colors ${isActive ? '' : 'text-(--text-light) dark:text-(--dark-text)'}`}>
                                        <span className={`text-lg ${isActive ? '' : 'text-gray-400'}`}>
                                            {link.icon}
                                        </span>
                                        {link.name}
                                    </div>

                                    {/* Right Side: The Orange Ball */}
                                    {isActive && (
                                        <span className="w-1.5 h-1.5 bg-orange-500 flex items-center rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)] mt-1" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
                {/* Social */}
                <div className='flex flex-col gap-1 px-8 mt-4'>
                    <p className='text-gray-400 text-xs'>Connect with me</p>
                    <div className='w-full h-[1px] bg-(--border-light)'></div>
                    <div className="flex flex-col py-2">
                        {Information.map((info, index) => (
                            <div key={index} className="flex items-center gap-2.5 hover:bg-(--pixel-hover) rounded-lg py-2 px-2 cursor-pointer">
                                <div className='flex items-center text-(--text-gray) text-lg'>{info.icon}</div>
                                {info.copy ? (
                                    <div className="flex items-center gap-1">
                                        <span className="text-(--text-light) text-sm">{info.name}</span>
                                        <CopyButton
                                            text={info.name}
                                            isNotificationActive={notification.show}
                                            onCopy={() => setNotification({ show: true, message: t('copyMessage') })}
                                        />
                                    </div>
                                ) : (
                                    <a
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        href={info.type === 'email' ? `mailto:${info.url}` : info.url}
                                        className={`text-(--text-light) text-sm ${info.blue ? ' hover:underline' : 'hover:opacity-70'}`}>
                                        {info.name}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Bottom */}
                <div className='flex flex-col gap-1 px-8 pb-8'>
                    <p className='text-gray-400 text-xs'>Others</p>
                    <div className='w-full h-[1px] bg-(--border-light)'></div>
                    <div className='text-(--text-gray) flex items-center gap-2 px-2 py-1 mt-1 hover:bg-(--pixel-hover) rounded-lg cursor-pointer'>
                        <PiInfoDuotone className='flex items-center' />
                        <a className='text-(--text-light)'>{t('aboutWebsite')}</a>
                    </div>
                    {/* Quote */}
                    <div className='w-full h-[1px] bg-(--border-light) md:hidden mt-2'></div>
                    <div className='group relative md:hidden mt-2'>
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                                <p className='text-(--sucess) leading-relaxed text-sm italic'>{quote.text}</p>
                                <p className='text-(--sucess) leading-relaxed text-xs mt-2'>{quote.author}</p>
                            </div>

                            <button
                                onClick={randomizeQuote}
                                title={t('randomizeBtn')}
                                className="p-2 text-(--sucess) hover:bg-green-500/10 rounded-full transition-all duration-300"
                            >
                                <FaRandom size={14} className="hover:rotate-180 transition-transform duration-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Drawer;