import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { useLanguage } from './Lang/LanguageContext';

const Search = () => {
    const { t } = useLanguage();

    return (
        <div className="relative">
            {/* Desktop View: Full Search Input with Icon Inside */}
            <div className="hidden md:block">
                <input
                    type="search"
                    placeholder={t('searchPlaceholder')}
                    className="pl-3 pr-8 py-1.5 border border-(--border-light) dark:border-(--dark-border) rounded-md text-sm bg-transparent text-(--text-light) placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:border-transparent"
                />
                <CiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            </div>

            {/* Mobile View: Icon Only (acts as a button) */}
            <button className="icon-button border border-(--border-light) dark:border-(--dark-border) md:hidden flex items-center justify-center p-2 rounded-md transition-all">
                <CiSearch size={20} className="text-(--text-light) dark:text-(--dark-text)" />
            </button>
        </div>
    );
};

export default Search;