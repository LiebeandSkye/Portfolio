import React, { useState } from 'react';
import languages from '../../../Data/Language';
import { useLanguage } from './LanguageContext';

const Language = () => {
    const { currentLang, changeLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectLanguage = (langCode) => {
        changeLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className="relative group">
            <button
                onClick={toggleDropdown}
                className="icon-button border border-(--border-light) flex items-center gap-1"
            >
                <span>{currentLang.code.toUpperCase()}</span>
                {/* Arrow with rotation on open */}
                <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* Tooltip – only shown when dropdown is closed */}
            {!isOpen && (
                <div className="absolute top-10 right-0 scale-0 group-hover:scale-100 transition-all duration-200 origin-top bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 text-xs py-1 px-2 rounded whitespace-nowrap shadow-lg">
                    {t('languageTooltip')}
                    <div className="absolute -top-1 right-2 w-2 h-2 rotate-45 bg-gray-800 dark:bg-gray-100"></div>
                </div>
            )}

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-900 border border-(--border-light) rounded-md shadow-lg overflow-hidden z-10">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => selectLanguage(lang.code)}
                            className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${currentLang.code === lang.code
                                    ? 'bg-gray-100 dark:bg-gray-800 font-medium'
                                    : ''
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