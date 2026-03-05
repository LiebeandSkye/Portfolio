import React from 'react';
import { GoDependabot } from 'react-icons/go';
import { MdFullscreen } from 'react-icons/md';
import { useLanguage } from './Lang/LanguageContext';

const BotButton = () => {
    const { t } = useLanguage();

    return (
        <div className="flex items-center gap-1">
            {/* Bot button with tooltip */}
            <div className="relative group">
                <button className="icon-button">
                    <GoDependabot size={18} />
                </button>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 origin-top bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 text-xs py-1 px-2 rounded whitespace-nowrap shadow-lg">
                    {t('botTooltip')}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-800 dark:bg-gray-100"></div>
                </div>
            </div>

            {/* Fullscreen button with tooltip */}
            <div className="relative group">
                <button className="icon-button">
                    <MdFullscreen size={18} />
                </button>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 origin-top bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 text-xs py-1 px-2 rounded whitespace-nowrap shadow-lg">
                    {t('fullscreenTooltip')}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-800 dark:bg-gray-100"></div>
                </div>
            </div>
        </div>
    );
};

export default BotButton;