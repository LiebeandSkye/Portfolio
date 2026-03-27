import React, { createContext, useState, useContext, useMemo, useCallback, useEffect, useTransition } from 'react';
import languages from '../../Data/Language';
import translations from '../Header/Lang/Translation';

const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    // 1. useTransition prevents the UI from locking up during massive text updates
    const [isPending, startTransition] = useTransition(); 
    
    const [currentLang, setCurrentLang] = useState(() => {
        const saved = localStorage.getItem('app_lang');
        return languages.find(l => l.code === saved) || languages[0];
    });

    // 2. ONLY write to localStorage here (off the main thread state cycle)
    useEffect(() => {
        localStorage.setItem('app_lang', currentLang.code);
    }, [currentLang.code]);

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

    const changeLanguage = useCallback((langCode) => {
        // 3. Wrap the heavy state update in a transition
        startTransition(() => {
            setCurrentLang((prevLang) => {
                if (prevLang.code === langCode) return prevLang; 
                return languages.find((l) => l.code === langCode) || languages[0];
            });
        });
    }, []);

    const contextValue = useMemo(() => (
        { currentLang, changeLanguage, t, translations, isPending }
    ), [currentLang, changeLanguage, t, isPending]);

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;