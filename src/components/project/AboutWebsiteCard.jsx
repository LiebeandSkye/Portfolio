import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import { RiFolderInfoLine } from 'react-icons/ri';
import { useLanguage } from '../context/LanguageContext';

const AboutWebsiteCard = () => {
  const { t } = useLanguage();
  const copy = t('aboutWebsiteCard');

  return (
    <div className="group relative w-full grid grid-cols-1 sm:grid-cols-[1fr_auto] bg-(--pixel2) border border-(--border-light) rounded-lg p-5 md:p-6 mt-8 gap-x-6 gap-y-5 items-start transition-colors duration-300 hover:border-(--text-gray)">
      <div className="flex flex-col items-start">
        <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2 mb-3">
          <FaAngleRight className="text-(--sucess)" />
          {copy.title}
        </h2>

        <p className="text-sm text-(--text-gray) leading-relaxed">
          {copy.p1}
        </p>

        <p className="text-sm text-(--text-gray) mt-2 leading-relaxed">
          {copy.p2}
        </p>

        <p className="text-sm text-(--text-gray) mt-4 italic opacity-80">
          {copy.note}
        </p>
      </div>

      <div className="justify-self-center sm:justify-self-end sm:row-span-2 relative w-32 h-32 sm:w-[130px] sm:h-[130px] flex items-center justify-center my-2 sm:my-0 sm:mr-2">
        <div className="absolute inset-0 bg-(--border-light) rounded-lg transform rotate-6 scale-105 opacity-40 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />

        <div className="relative z-10 w-full h-full rounded-lg overflow-hidden border border-(--border-light) shadow-[4px_4px_10px_rgba(0,0,0,0.2)] transition-all duration-500 group-hover:-translate-y-2 group-hover:-translate-x-1 group-hover:shadow-[8px_12px_20px_rgba(0,0,0,0.3)]">
          <img
            src="/about-website/chisa.jpg"
            alt={copy.imageAlt}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />

          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </div>

      <div className="sm:col-start-1">
        <Link
          to="/about-website"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-(--border-light) text-sm font-semibold transition-all duration-200 hover:bg-(--pixel-hover) hover:-translate-y-0.5 active:translate-y-0"
        >
          <RiFolderInfoLine className="text-lg" />
          {copy.title}
        </Link>
      </div>
    </div>
  );
};

export default AboutWebsiteCard;
