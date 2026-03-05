import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { useLanguage } from './Lang/LanguageContext';

const Search = () => {
    const { t } = useLanguage();

    return (
        <div className="relative">
            <input
                type="search"
                placeholder={t('searchPlaceholder')}
                className="pl-3 pr-8 py-1.5 border border-(--border-light) rounded-md text-sm bg-transparent text-(--text-light) placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:border-transparent"
            />
            <CiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        </div>
    );
};

export default Search;