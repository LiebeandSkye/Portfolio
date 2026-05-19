import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';
import { RiFolderInfoLine } from 'react-icons/ri';
import { useLanguage } from '../context/LanguageContext';

const AboutWebsiteCard = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full flex items-start flex-col bg-(--pixel2) border border-(--border-light) rounded-md p-4 md:p-5 mt-8">
      <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2 mb-3">
        <FaAngleRight className="text-(--sucess)" />
        {t('aboutWebsite')}
      </h2>
      <p className="text-sm text-(--text-gray)">
        This portfolio is inspired by GitHub-style layouts and interactions, with custom sections built for projects, contact,
        and AI-assisted exploration.
      </p>
      <p className="text-sm text-(--text-gray) mt-2">
        The full breakdown explains design choices, implementation details, and the Vite + React stack used to build this site.
      </p>
      <div className="w-1/6 h-px bg-(--border-light) mt-3" />
      <div className="w-full flex justify-between items-start gap-6 mt-3">
        <p className="text-sm text-(--text-gray)">
          Explore the documentation page for the complete “About this website” write-up and screenshots.
        </p>
        <img
          src="/about-website/laptopoctocat.png"
          alt="About this website preview"
          className="hidden sm:block w-[90px] h-[90px] object-cover object-center rounded-md"
          loading="lazy"
        />
      </div>
      <Link
        to="/about-website"
        className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-(--border-light) text-sm font-semibold hover:bg-(--pixel-hover)"
      >
        <RiFolderInfoLine />
        {t('aboutWebsite')}
      </Link>
    </div>
  );
};

export default AboutWebsiteCard;
