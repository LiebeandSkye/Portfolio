import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Kry_rithisak from '../assets/Kry_Rithisak.optimized.jpg';
import Information from '../Data/Contacts';
import CopyButton from './ui/CopyButton';
import { useNotification } from './context/NotificationContext';
import { useLanguage } from './context/LanguageContext';
import { FaRandom } from "react-icons/fa";

// ─── Info sidebar  ────
const Info = memo(function Info() {
    const { t } = useLanguage();
    const { addNotification } = useNotification();
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                <div 
                    onClick={() => setIsModalOpen(true)}
                    className="w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden mx-auto md:mx-1 cursor-pointer border border-(--border-light) group"
                >
                    <img
                        src={Kry_rithisak}
                        alt="Kry Rithisak"
                        width="256"
                        height="256"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1">
                    <p className="font-semibold text-(--text-light) text-3xl">{t('name')}</p>
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

            {/* Image Closer Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div 
                        onClick={() => setIsModalOpen(false)}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.98)_100%)] backdrop-blur-md cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 350, damping: 26 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-[90vw] max-h-[85vh] md:max-w-[420px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/40 cursor-default"
                        >
                            <img
                                src={Kry_rithisak}
                                alt="Kry Rithisak closer look"
                                className="w-full h-auto max-h-[85vh] object-contain select-none"
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
});

export default Info;
