import React, { createContext, useState, useContext } from 'react';
import languages from '../../../Data/Language';
import translations from './Translation';
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [currentLang, setCurrentLang] = useState(() => {
        const saved = localStorage.getItem('app_lang');
        return languages.find(l => l.code === saved) || languages[0];
    });

    
    const t = (key) => {
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
    };

    const changeLanguage = (langCode) => {
        const lang = languages.find((l) => l.code === langCode) || languages[0];
        setCurrentLang(lang);
        localStorage.setItem('app_lang', langCode);
    };

    return (
        // translations also exposed so chat.js system prompt can consume full portfolio context
        <LanguageContext.Provider value={{ currentLang, changeLanguage, t, translations }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;

