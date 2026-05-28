import React, { useState } from 'react';
import { GoDependabot } from 'react-icons/go';
import { MdFullscreen } from 'react-icons/md';
import { useLanguage } from './Lang/LanguageContext';
import SakuPilot from '../SakuPilot/SakuPilot';
import SakuPilotIcon from '../../assets/Tools/SakuPilotIcon.poster.png';

const BotButton = () => {
    const { t } = useLanguage();
    const [isChatOpen, setIsChatOpen] = useState(false);
    return (
        <div className="items-center border border-(--border-light) dark:border-(--dark-border) rounded-md flex">
            {/* Bot button with tooltip */}
            <div className="relative group border-r border-(--border-light) dark:border-(--dark-border)">
                <button 
                    className={`icon-button ${isChatOpen ? 'bg-blue-500/10 text-blue-500' : ''}`}
                    onClick={() => setIsChatOpen(!isChatOpen)}
                >
                    <GoDependabot size={18} />
                </button>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 origin-top bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 text-xs py-1 px-2 rounded whitespace-nowrap shadow-lg">
                    {t('botTooltip')}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-800 dark:bg-gray-100"></div>
                </div>
            </div>
            
            {/* Fullscreen button with tooltip */}
            <div className="relative group hidden md:block border-l border-(--border-light) dark:border-(--dark-border)">
                <button className="icon-button">
                    <MdFullscreen size={18} />
                </button>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 origin-top bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 text-xs py-1 px-2 rounded whitespace-nowrap shadow-lg">
                    {t('fullscreenTooltip')}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-800 dark:bg-gray-100"></div>
                </div>
            </div>
            {/* SakuPilot */}
            <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="fixed bottom-8 right-4 md:w-32 md:h-32 w-24 h-24 text-white bg-transparent flex items-center justify-center hover:scale-105 transition-transform z-[60] cursor-pointer"
            >
                <img src={SakuPilotIcon} alt="SakuPilotIcon" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full" />
            </button>

            {/* Chat Window */}
            <SakuPilot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    );
};

export default BotButton;
