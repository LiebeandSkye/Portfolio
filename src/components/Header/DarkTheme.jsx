import { useState, useRef, useEffect } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function DarkTheme({ variant = 'icon' }) {
  const { t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const [rotating, setRotating] = useState(false);
  const timeoutRef = useRef(null); // Keep track of the timeout

  const handleToggle = () => {
    setRotating(true);
    toggleTheme();
    
    // If spammed, cancel the old timeout and start a new one
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => setRotating(false), 300);
  };

  // Cleanup timeout if component unmounts mid-spin
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // --- TOGGLE VERSION ---
  if (variant === 'toggle') {
    return (
      <div className="flex items-center justify-between w-full py-2 ">
        <span className="text-sm text-(--text-light)">
          {isDark ? t('themeTooltipLight') : t('themeTooltipDark')}
        </span>

        <button
          onClick={handleToggle}
          className={`cursor-pointer relative w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
            isDark ? 'bg-green-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
              isDark ? 'translate-x-5' : 'translate-x-0'
            }`}
          >
            {isDark ? (
              <MdDarkMode size={10} className="text-gray-800" />
            ) : (
              <MdLightMode size={10} className="text-orange-500" />
            )}
          </div>
        </button>
      </div>
    );
  }

  // --- ICON VERSION ---
  return (
    <div className="relative group hidden md:block">
      <button
        onClick={handleToggle}
        className="icon-button border border-(--border-light) cursor-pointer"
      >
        <div className={`transition-transform duration-300 ${rotating ? 'rotate-180' : ''}`}>
          {isDark ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
        </div>
      </button>

      <div className="absolute top-10 right-0 scale-0 group-hover:scale-100 transition-all duration-200 origin-top bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 text-xs py-1 px-2 rounded whitespace-nowrap shadow-lg">
        {isDark ? t('themeTooltipLight') : t('themeTooltipDark')}
        <div className="absolute -top-1 right-2 w-2 h-2 rotate-45 bg-gray-800 dark:bg-gray-100"></div>
      </div>
    </div>
  );
}