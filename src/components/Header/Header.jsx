import React, { useCallback } from 'react';
import '../../index.css';
import DarkTheme from './DarkTheme';
import Search from './Search';
import Language from './Lang/Language';
import Navigation from './Navigation';
import { useLanguage } from '../context/LanguageContext';
import { useSakuPilot } from '../context/SakuPilotContext';
import SakuPilotIcon from '../../assets/Tools/SakuPilotIcon.poster.png';
import { GoDependabot } from 'react-icons/go';
import { MdFullscreen } from 'react-icons/md';
import Tooltip from '../ui/Tooltip';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const { t } = useLanguage();
    const { openChat } = useSakuPilot();
    const navigate = useNavigate();
    const location = useLocation();
    const isImmersiveChat = location.pathname === '/sakupilot';
    const botButtonClass = 'icon-button cursor-pointer';
    const botIcon = <GoDependabot size={18} />;

    const handleOpenChat = useCallback(() => {
        openChat();
    }, [openChat]);
    const handleBotAction = useCallback(() => {
        if (window.matchMedia('(max-width: 767px)').matches) {
            navigate('/sakupilot');
            return;
        }
        openChat();
    }, [navigate, openChat]);

    return (
        <>
            <div className="bg-(--light) dark:bg-(--dark-bg) px-6 md:px-8 py-3 flex justify-between items-center dark:border-(--dark-border) z-50">

                {/* Left: logo + name */}
                <div className="flex items-center gap-4">
                    <div className="border border-(--text-light) dark:border-(--dark-text) rounded-md w-10 h-9 flex items-center justify-center font-bold text-(--text-light) dark:text-(--dark-text)">
                        <a href='/'>K</a>
                    </div>
                    <span className="font-semibold text-(--text-light) dark:text-(--dark-text) text-md hidden md:block">
                        {t('name')}
                    </span>
                </div>

                {/* Right: controls */}
                <div className="flex items-center gap-2 md:gap-3">

                    {/* Search */}
                    <Search onOpenChat={handleOpenChat} />

                    <div className="seperator hidden md:block" />

                    {/* Bot button  */}
                    <div className="items-center border border-(--border-light) dark:border-(--dark-border) rounded-md flex cursor-pointer">
                        <div className="border-r border-(--border-light) dark:border-(--dark-border) cursor-pointer">
                            <Tooltip text={t('botTooltip')}>
                                <button
                                    className={botButtonClass}
                                    onClick={handleBotAction}
                                    aria-label="Open chat assistant"
                                >
                                    {botIcon}
                                </button>
                            </Tooltip>
                        </div>
                        <div className="hidden md:block">
                            <Tooltip text={t('fullscreenTooltip')}>
                                <button
                                    className="icon-button flex items-center gap-1.5 cursor-pointer"
                                    onClick={() => navigate('/sakupilot')}
                                >
                                    <MdFullscreen size={18} />
                                </button>
                            </Tooltip>
                        </div>
                    </div>

                    {/* Floating sakupilot icon hehe*/}
                    {!isImmersiveChat && (
                        <button
                            onClick={openChat}
                            className="fixed bottom-0 right-1 md:w-34 md:h-40 w-24 h-28 text-white bg-transparent flex items-center justify-center hover:scale-105 transition-transform z-[60] cursor-pointer"
                        >
                            <img
                                src={SakuPilotIcon}
                                alt="SakuPilot"
                                width="144"
                                height="144"
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
                            />
                        </button>
                    )}

                    <div className="seperator hidden md:block" />
                    <DarkTheme />
                    <div className="hidden md:block">
                        <Language />
                    </div>
                    <Navigation />
                </div>
            </div>

        </>
    );
};

export default Header;
