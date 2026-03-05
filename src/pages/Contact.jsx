import React from 'react'
import Info from '../components/Info'
import { useLanguage } from '../components/Header/Lang/LanguageContext'
import { FaLongArrowAltLeft } from "react-icons/fa";
const Contact = () => {
  const { t } = useLanguage();
  return (
    <div>
      <div className='px-24 py-6 flex gap-5'>
        <Info />
        <div className='border border-(--border-light) w-full h-fit py-4 px-6 flex flex-col'>
          <p className='text-xs'>Kry-Rithisak<span className='text-(--text-gray)'> / </span>Contact<span className='text-(--text-gray)'>.jsx</span></p>
          <form className='flex flex-col gap-8 my-8'>
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="name">{t('contact')?.name}<span className='text-red-500'> *</span></label>
              <input type="text" name="name" id="name" placeholder={t('contact')?.nameHolder} className='pl-3 pr-8 py-2 border border-(--border-light) rounded-md text-sm bg-transparent text-(--text-light) placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-white focus:border-transparent mx-0.5' />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="email">{t('contact')?.email}<span className='text-red-500'> *</span></label>
              <input type="email" name="email" id="email" placeholder={t('contact')?.emailHolder} className='pl-3 pr-8 py-2 border border-(--border-light) rounded-md text-sm bg-transparent text-(--text-light) placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-white focus:border-transparent mx-0.5' />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="subject">{t('contact')?.tel}<span className='text-red-500'> *</span></label>
              <input type="tel" name="tel" id='tel' placeholder={t('contact')?.telHolder} className='pl-3 pr-8 py-2 border border-(--border-light) rounded-md text-sm bg-transparent text-(--text-light) placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-white focus:border-transparent mx-0.5'></input>
            </div>
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="comment">{t('contact')?.message}<span className='text-red-500'> *</span></label>
              <textarea name="message" className='pl-3 pr-8 py-1.5 border border-(--border-light) rounded-md text-sm bg-transparent text-(--text-light) placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-white focus:border-transparent mx-0.5 h-30' placeholder={t('contact')?.messageHolder}>
              </textarea>
            </div>
            <button className='w-36 bg-(--sucess) text-md text-white font-semibold py-2 px-4 rounded-md my-2 cursor-pointer'>{t('contact')?.submit}</button>
            <div className='flex gap-4 text-(--text-gray) items-center'>
              <FaLongArrowAltLeft size={24} />
              <p className='text-(--text-light)'>{t('contact')?.tip}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
