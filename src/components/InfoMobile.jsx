import React from 'react'
import Kry_rithisak from '../assets/Kry_Rithisak.optimized.jpg'
import { useLanguage } from './context/LanguageContext';
const InfoMobile = () => {
    const { t } = useLanguage();
    return (
        <div className='md:hidden border border-(--border-light) w-full py-4 px-4 flex flex-col '>
            <div className='flex items-center gap-4'>
                <div className='w-26 h-26 md:w-64 md:h-64 rounded-full overflow-hidden md:mx-1 mx-2'>
                    <img src={Kry_rithisak} alt="Kry Rithisak" width="104" height="104" className='w-full h-full object-cover' />
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='font-semibold text-(--text-light) text-3xl'>{t('name')}</p>
                    <p className='text-(--text-gray) font-semibold text-lg leading-relaxed'>{t('job')}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoMobile
