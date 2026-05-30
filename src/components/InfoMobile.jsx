import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Kry_rithisak from '../assets/Kry_Rithisak.optimized.jpg'
import { useLanguage } from './context/LanguageContext';

const InfoMobile = () => {
    const { t } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='md:hidden border border-(--border-light) w-full py-4 px-4 flex flex-col '>
            <div className='flex items-center gap-4'>
                <div 
                    onClick={() => setIsModalOpen(true)}
                    className='w-26 h-26 md:w-64 md:h-64 rounded-full overflow-hidden md:mx-1 mx-2 cursor-pointer active:scale-95 border border-(--border-light) transition-all duration-300 flex-shrink-0'
                >
                    <img src={Kry_rithisak} alt="Kry Rithisak" width="104" height="104" className='w-full h-full object-cover' />
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='font-semibold text-(--text-light) text-3xl'>{t('name')}</p>
                    <p className='text-(--text-gray) font-semibold text-lg leading-relaxed'>{t('job')}</p>
                </div>
            </div>

            {/* Mobile Status Bar */}
            <div className="mt-5 px-3 border border-[#30363d] rounded-[6px] text-sm text-(--text-light) w-full flex items-center min-h-[38px] cursor-pointer hover:border-white/20 transition-all select-none gap-2">
                <span className="text-base leading-none">🚀</span>
                <span className="font-semibold">Hello World</span>
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
                            className="relative max-w-[90vw] max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/40 cursor-default"
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
    )
}

export default InfoMobile
