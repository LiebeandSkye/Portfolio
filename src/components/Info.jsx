import React, { useState, useEffect, useCallback, memo } from 'react';
import { createPortal } from 'react-dom';
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

    // Close on ESC and lock body scroll
    useEffect(() => {
        if (!isModalOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsModalOpen(false);
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);

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
        <div className="w-full hidden md:block">
            <div className="flex flex-col justify-center gap-5">
                {/* Avatar */}
                <div className="relative w-full max-w-[280px] mx-auto">
                    <div 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full aspect-square rounded-full overflow-hidden cursor-pointer border border-(--border-light) group"
                    >
                        <img
                            src={Kry_rithisak}
                            alt="Kry Rithisak"
                            width="256"
                            height="256"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                    {/* Status Badge */}
                    <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 z-20 bg-(--light) border border-(--border-light) rounded-full flex items-center p-1.5 md:p-2 cursor-pointer shadow-lg hover:pr-3 md:hover:pr-4 group/badge transition-all duration-300">
                        <span className="shrink-0 leading-none text-base md:text-md">🚀</span>
                        <span className="text-[10px] md:text-xs text-(--text-light) font-medium max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover/badge:max-w-xs group-hover/badge:ml-1.5 md:group-hover/badge:ml-2 group-hover/badge:opacity-100">
                            Hello World
                        </span>
                    </div>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1">
                    <p className="font-semibold text-(--text-light) text-3xl break-words">{t('name')}</p>
                    <p className="text-(--text-gray) font-semibold text-lg leading-relaxed break-words">{t('job')}</p>
                </div>

                {/* Description */}
                <p className="text-(--text-light) leading-relaxed break-words">{t('description')}</p>

                {/* Contact info */}
                <div className="flex flex-col gap-1 border-t border-(--border-light) border-b py-8">
                    {Information.map((info, index) => (
                        <div key={index} className="flex items-center gap-3 min-w-0">
                            <div className="flex items-center text-(--text-gray) shrink-0">{info.icon}</div>
                            {info.copy ? (
                                <div className="flex items-center min-w-0">
                                    <span className="text-(--text-light) truncate">{info.name}</span>
                                    <CopyButton text={info.name} onCopy={handleCopy} />
                                </div>
                            ) : (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={info.type === 'email' ? `mailto:${info.url}` : info.url}
                                    className={`text-(--text-light) truncate ${info.blue ? 'hover:text-blue-500 hover:underline' : ''}`}
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
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {isModalOpen && (
                        <div 
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.98)_100%)] backdrop-blur-md cursor-pointer"
                            role="dialog"
                            aria-modal="true"
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
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
});

export default Info;
