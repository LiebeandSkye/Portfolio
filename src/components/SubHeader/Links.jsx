import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../index.css'
import { useLanguage } from '../Header/Lang/LanguageContext';
import { FaHome } from "react-icons/fa";
import { MdOutlineCode } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
const Links = () => {
    const { t } = useLanguage();
    const Link = [
        { name: t('links')?.welcome || 'Welcome', path: '/', icon: <FaHome /> },
        { name: t('links')?.portfolio || 'Portfolio', path: '/portfolio', icon: <MdOutlineCode /> },
        { name: t('links')?.contact || 'Contact', path: '/contact', icon: <RiMessage2Line /> },
    ]
    return (
        <div>
            <div className='flex gap-10 px-10 pb-2 bg-(--light) border-b border-(--border-light)'>
                {Link.map((link) => (
                    <NavLink key={link.path} to={link.path} data-text={link.name} className={({ isActive }) => isActive ? 'active nav-link' : 'inactive nav-link'}>
                        <div className='flex items-center gap-1 text-(--text-light)'>
                        <span className="flex items-center mr-2">{link.icon}</span>
                        {link.name}
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Links
