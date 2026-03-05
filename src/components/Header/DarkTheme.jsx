import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useLanguage } from './Lang/LanguageContext';

export default function DarkTheme() {
  const { t } = useLanguage();
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  const [rotating, setRotating] = useState(false);

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

  const handleToggle = () => {
    setRotating(true);
    setIsDark(!isDark);
    setTimeout(() => setRotating(false), 300);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleToggle}
        className="icon-button border border-(--border-light) transition-all"
      >
        <div className={`transform transition-transform duration-300 ${rotating ? 'rotate-180' : ''}`}>
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