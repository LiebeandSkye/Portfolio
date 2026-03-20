import React from 'react';
import '../../index.css';
import DarkTheme from './DarkTheme';
import Search from './Search';
import BotButton from './BotButton';
import Language from './Lang/Language';
import Navigation from './Navigation';
import { useLanguage } from './Lang/LanguageContext';

const Header = () => {
    const { t } = useLanguage();

    return (
        <div className=" bg-(--light) px-8 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="border border-(--text-light) rounded-md w-10 h-9 flex items-center justify-center font-bold text-(--text-light)">
                    <a href='/'>K</a>
                </div>
                <span className="font-semibold text-(--text-light) text-md hidden md:block">{t('name')}</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
                <Search />
                <div className="seperator hidden md:block"></div>
                <BotButton />
                <div className="seperator hidden md:block"></div>
                <DarkTheme />
                <div className='hidden md:block'>
                    <Language />
                </div>
                <Navigation />
            </div>
        </div>
    );
};

export default Header;