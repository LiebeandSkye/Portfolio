import React from 'react'
import MainLayout from './MainLayout'
import { useLanguage } from '../components/Header/Lang/LanguageContext'
import { FaLongArrowAltLeft } from "react-icons/fa";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <MainLayout>

      <div className='border border-(--border-light) w-full py-4 px-4 sm:px-6 flex flex-col'>

        <p className='text-xs'>
          Kry-Rithisak<span className='text-(--text-gray)'> / </span>Contact<span className='text-(--text-gray)'>.jsx</span>
        </p>

        <form className='flex flex-col gap-8 my-8'>

          <div className='flex flex-col gap-1.5'>
            <label>{t('contact')?.name}<span className='text-red-500'> *</span></label>
            <input type="text" className='pl-3 pr-8 py-2 border border-(--border-light) rounded-md bg-transparent text-(--text-light)' />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label>{t('contact')?.email}<span className='text-red-500'> *</span></label>
            <input type="email" className='pl-3 pr-8 py-2 border border-(--border-light) rounded-md bg-transparent text-(--text-light)' />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label>{t('contact')?.tel}<span className='text-red-500'> *</span></label>
            <input type="tel" className='pl-3 pr-8 py-2 border border-(--border-light) rounded-md bg-transparent text-(--text-light)' />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label>{t('contact')?.message}<span className='text-red-500'> *</span></label>
            <textarea className='pl-3 pr-8 py-2 border border-(--border-light) rounded-md bg-transparent text-(--text-light) h-28'></textarea>
          </div>

          <button className='w-36 bg-(--sucess) text-white font-semibold py-2 px-4 rounded-md'>
            {t('contact')?.submit}
          </button>

          <div className='flex gap-4 text-(--text-gray) items-center'>
            <FaLongArrowAltLeft size={24} />
            <p className='text-(--text-light)'>{t('contact')?.tip}</p>
          </div>

        </form>

      </div>

    </MainLayout>
  )
}

export default Contact