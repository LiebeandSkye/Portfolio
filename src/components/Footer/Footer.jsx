import React from 'react'
import { useLanguage } from '../context/LanguageContext';
import { NavLink } from 'react-router-dom';
const Footer = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    return (
        <div>
            <div className='w-full flex justify-center items-center px-8 py-3 pb-10 gap-4 flex-col-reverse md:flex-row'>
                <div className="flex items-center gap-2">
                    <div className="border border-(--text-light) rounded-md w-10 h-9 flex items-center justify-center font-bold text-(--text-light)">
                        <a onClick={scrollToTop} href='/'>K</a>
                    </div>
                    <p className="font-semibold text-(--text-gray) text-xs"> © {currentYear} <span className='font-bold'>{t('name')}</span></p>
                </div>
                <div className='flex items-center gap-3'>
                    <NavLink to="/contact" onClick={scrollToTop} className='font-semibold text-(--text-gray) text-xs hover:text-(--sucess)'>{t('links')?.contact}</NavLink>
                    <a className='font-semibold text-(--text-gray) text-xs hover:text-(--sucess)' href='#' target='_blank'>LinkedIn</a>
                    <a className='font-semibold text-(--text-gray) text-xs hover:text-(--sucess)' href='https://github.com/LiebeandSkye' target='_blank'>Github</a>
                    <NavLink to="/contact" className='font-semibold text-(--text-gray) text-xs hover:text-(--sucess)'>{t('aboutWebsite')}</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Footer
