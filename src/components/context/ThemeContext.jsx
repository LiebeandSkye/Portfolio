import { createContext, useContext, useEffect, useState, useMemo, useCallback, useTransition } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isPending, startTransition] = useTransition();
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === 'undefined') return false;
        return (
            localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        );
    });

    useEffect(() => {
        // requestAnimationFrame prevents UI stutter by syncing with screen refresh
        requestAnimationFrame(() => {
            const root = window.document.documentElement;
            if (isDark) {
                root.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                root.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        });
    }, [isDark]);

    const toggleTheme = useCallback(() => {
        startTransition(() => {
            setIsDark(prev => !prev);
        });
    }, []);

    const contextValue = useMemo(() => ({ isDark, toggleTheme, isPending }), [isDark, toggleTheme, isPending]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);