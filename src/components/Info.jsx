
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Kry_rithisak from '../assets/Kry_Rithisak.jpg';
import Information from '../Data/Contacts';
import Notification from './ui/Notifcation';
import CopyButton from './ui/CopyButton';
import { useLanguage } from './Header/Lang/LanguageContext';
import { FaRandom } from "react-icons/fa";
import { IoCopySharp } from "react-icons/io5";

const Info = () => {
    const { t } = useLanguage();
    const [notification, setNotification] = useState({ show: false, message: '' });
    const [quote, setQuote] = useState({ text: '', author: '' });

    // randomize quote
    const randomizeQuote = useCallback(() => {
        const quotes = t('quotes');
        if (quotes && quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setQuote(quotes[randomIndex]);
        }
    }, [t]);

    useEffect(() => {
        randomizeQuote();
    }, [randomizeQuote, t]);

    return (
        <>
            {notification.show && (
                <Notification
                    message={t('copyMessage')}
                    onClose={() => setNotification({ show: false, message: '' })}
                />
            )}
            <div className='w-[25%] h-full px-6 hidden md:block'>
                <div className='flex flex-col justify-center gap-5'>
                    <div className='w-64 h-64 rounded-full overflow-hidden mx-1'>
                        <img src={Kry_rithisak} className='w-full h-full object-cover' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-semibold text-(--text-light) text-3xl'>{t('name')}</h1>
                        <p className='text-(--text-gray) font-semibold text-lg leading-relaxed'>{t('job')}</p>
                    </div>
                    <div className=''>
                        <p className='text-(--text-light) leading-relaxed text-md'>{t('description')}</p>
                    </div>
                    <div className="flex flex-col gap-1 border-t border-(--border-light) border-b py-8">
                        {Information.map((info, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className='flex items-center text-(--text-gray)'>{info.icon}</div>
                                {info.copy ? (
                                    <div className="flex items-center">
                                        <span className="text-(--text-light)">{info.name}</span>
                                        <CopyButton
                                            text={info.name}
                                            isNotificationActive={notification.show}
                                            onCopy={() => setNotification({ show: true, message: t('copyMessage') })}
                                        />
                                    </div>
                                ) : (
                                    <a
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        href={info.type === 'email' ? `mailto:${info.url}` : info.url}
                                        className={`text-(--text-light) ${info.blue ? 'hover:text-blue-500 hover:underline' : ''}`}>
                                        {info.name}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='group relative'>
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                                <p className='text-(--sucess) leading-relaxed text-md italic'>{quote.text}</p>
                                <p className='text-(--sucess) leading-relaxed text-sm mt-1'>{quote.author}</p>
                            </div>

                            <button
                                onClick={randomizeQuote}
                                title={t('randomizeBtn')}
                                className="p-2 text-(--sucess) hover:bg-green-500/10 rounded-full transition-all duration-300"
                            >
                                <FaRandom size={16} className="hover:rotate-180 transition-transform duration-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Info;