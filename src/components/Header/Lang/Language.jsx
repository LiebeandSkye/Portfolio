import React, { useState } from 'react';
import languages from '../../../Data/Language';
import { useLanguage } from './LanguageContext';
import "flag-icons/css/flag-icons.min.css";
const Language = ({ variant = 'dropdown' }) => {
    const { currentLang, changeLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const selectLanguage = (langCode) => {
        changeLanguage(langCode);
        setIsOpen(false);
    };

    // --- DRAWER VARIANT: Small Rectangle Cards ---
    if (variant === 'selector') {
        return (
            <div className="grid grid-cols-2 gap-2 w-full py-2">
                {languages.map((lang) => {
                    const isActive = currentLang.code === lang.code;
                    return (
                        <button
                            key={lang.code}
                            onClick={() => selectLanguage(lang.code)}
                            className={`cursor-pointer flex items-center justify-center gap-3 py-2.5 px-3 rounded-md border transition-all duration-200 ${
                                isActive 
                                ? 'bg-white dark:bg-gray-700 border-(--border-light) text-(--text-light) dark:text-(--dark-text) shadow-sm' 
                                : 'bg-(--pixel) dark:bg-gray-800/50 border-(--border-light) dark:border-(--dark-border) text-gray-500 hover:border-gray-400'
                            }`}
                        >
                            {/* SVG Flag from flag-icons */}
                            <span className={`${lang.flagClass} rounded-sm shadow-sm w-5 h-4`} />
                            <span className="text-[11px] font-bold uppercase tracking-tight">{lang.name}</span>
                        </button>
                    );
                })}
            </div>
        );
    }

    // --- ORIGINAL DESIGN: Dropdown (Header) ---
    return (
        <div className={`relative group`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="icon-button border border-(--border-light) flex items-center gap-1 h-[37px]"
            >
                <span>{currentLang.code.toUpperCase()}</span>
                <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {!isOpen && (
                <div className="absolute top-10 right-0 scale-0 group-hover:scale-100 transition-all duration-200 origin-top bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 text-xs py-1 px-2 rounded whitespace-nowrap shadow-lg z-50">
                    {t('languageTooltip')}
                    <div className="absolute -top-1 right-2 w-2 h-2 rotate-45 bg-gray-800 dark:bg-gray-100"></div>
                </div>
            )}

            {isOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-900 border border-(--border-light) rounded-md shadow-lg overflow-hidden z-50">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => selectLanguage(lang.code)}
                            className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                                currentLang.code === lang.code ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''
                            }`}
                        >
                            {lang.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Language;