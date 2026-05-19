import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";
import { RiFolderInfoLine } from "react-icons/ri";
import { useLanguage } from '../context/LanguageContext';
import Memory1 from '../../assets/AI_MemoryPorter/Memory1.png';

const AboutWebsiteCard = () => {
    const { t } = useLanguage();

    return (
        <div className="w-full flex items-start flex-col bg-(--pixel) border border-(--border-light) rounded-md p-4 mt-6">
            <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2 mb-3 text-(--text-light)">
                <FaAngleRight size={24} className="text-(--text-gray)" />
                {t('portfolio.aboutWebsiteCard.title')}
            </h2>

            <p className="text-sm text-(--text-gray) leading-relaxed">
                {t('portfolio.aboutWebsiteCard.text1')}
            </p>
            <p className="text-sm text-(--text-gray) leading-relaxed mt-2">
                {t('portfolio.aboutWebsiteCard.text2')}
            </p>

            <div className="w-full flex items-start justify-between gap-6 mt-3">
                <p className="text-sm text-(--text-gray) leading-relaxed">
                    {t('portfolio.aboutWebsiteCard.text3')}
                </p>
                <img
                    src={Memory1}
                    alt={t('portfolio.aboutWebsiteCard.imageAlt')}
                    className="hidden sm:block w-[120px] h-[90px] object-cover rounded-md border border-(--border-light)"
                    loading="lazy"
                />
            </div>

            <NavLink
                to="/about-this-website"
                className="mt-3 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-(--border-light) hover:bg-(--pixel-hover) text-(--text-light)"
            >
                <RiFolderInfoLine />
                {t('aboutWebsite')}
            </NavLink>
        </div>
    );
};

export default AboutWebsiteCard;
