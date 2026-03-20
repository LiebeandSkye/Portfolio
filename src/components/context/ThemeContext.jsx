import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === 'undefined') return false;

        return (
            localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        );
    });

    useEffect(() => {
        const root = window.document.documentElement;

        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);