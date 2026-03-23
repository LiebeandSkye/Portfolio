import React, { useState, useEffect, useCallback, memo } from 'react';
import Kry_rithisak from '../assets/Kry_Rithisak.jpg';
import Information from '../Data/Contacts';
import CopyButton from './ui/CopyButton';
import { useNotification } from './context/NotificationContext';
import { useLanguage } from './Header/Lang/LanguageContext';
import { FaRandom } from "react-icons/fa";

// ─── Info sidebar  ────
const Info = memo(function Info() {
    const { t } = useLanguage();
    const { addNotification } = useNotification();
    const [quote, setQuote] = useState({ text: '', author: '' });

    const randomizeQuote = useCallback(() => {
        const quotes = t('quotes');
        if (Array.isArray(quotes) && quotes.length > 0) {
            setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        }
    }, [t]);

    useEffect(() => { randomizeQuote(); }, [randomizeQuote]);

    const handleCopy = useCallback(() => {
        addNotification(t('copyMessage'), 'success');
    }, [addNotification, t]);

    return (
        <div className="w-full md:w-[280px] px-4 md:px-6 flex-shrink-0 hidden md:block">
            <div className="flex flex-col justify-center gap-5">
                {/* Avatar */}
                <div className="w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden mx-auto md:mx-1">
                    <img
                        src={Kry_rithisak}
                        alt="Kry Rithisak"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-(--text-light) text-3xl">{t('name')}</h1>
                    <p className="text-(--text-gray) font-semibold text-lg leading-relaxed">{t('job')}</p>
                </div>

                {/* Description */}
                <p className="text-(--text-light) leading-relaxed">{t('description')}</p>

                {/* Contact info */}
                <div className="flex flex-col gap-1 border-t border-(--border-light) border-b py-8">
                    {Information.map((info, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="flex items-center text-(--text-gray)">{info.icon}</div>
                            {info.copy ? (
                                <div className="flex items-center">
                                    <span className="text-(--text-light)">{info.name}</span>
                                    <CopyButton text={info.name} onCopy={handleCopy} />
                                </div>
                            ) : (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={info.type === 'email' ? `mailto:${info.url}` : info.url}
                                    className={`text-(--text-light) ${info.blue ? 'hover:text-blue-500 hover:underline' : ''}`}
                                >
                                    {info.name}
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {/* Quote */}
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <p className="text-(--sucess) leading-relaxed italic">{quote.text}</p>
                        <p className="text-(--sucess) leading-relaxed text-sm mt-1">{quote.author}</p>
                    </div>
                    <button
                        onClick={randomizeQuote}
                        title={t('randomizeBtn')}
                        className="p-2 text-(--sucess) hover:bg-green-500/10 rounded-full transition-all duration-300 cursor-pointer flex-shrink-0"
                    >
                        <FaRandom size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
});

export default Info;