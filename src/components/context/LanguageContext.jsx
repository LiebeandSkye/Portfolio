import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import languages from '../../Data/Language';
import translations from '../Header/Lang/Translation';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [currentLang, setCurrentLang] = useState(() => {
        const saved = localStorage.getItem('app_lang');
        return languages.find(l => l.code === saved) || languages[0];
    });

    // 1. Memoize the heavy translation function. It ONLY needs to recreate if the language code changes.
    const t = useCallback((key) => {
        const keys = key.split('.');
        let result = translations[currentLang.code] || translations.en;

        for (const k of keys) {
            result = result?.[k];
            if (!result) break;
        }

        if (!result) {
            result = translations.en;
            for (const k of keys) {
                result = result?.[k];
                if (!result) break;
            }
        }

        return result || key;
    }, [currentLang.code]);

    // 2. Memoize the change function and prevent redundant state updates
    const changeLanguage = useCallback((langCode) => {
        setCurrentLang((prevLang) => {
            if (prevLang.code === langCode) return prevLang; // Stop re-renders if clicking the same language
            
            const lang = languages.find((l) => l.code === langCode) || languages[0];
            localStorage.setItem('app_lang', langCode);
            return lang;
        });
    }, []);

    // 3. Memoize the Context Value object
    const contextValue = useMemo(() => (
        { currentLang, changeLanguage, t, translations }
    ), [currentLang, changeLanguage, t]);

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;