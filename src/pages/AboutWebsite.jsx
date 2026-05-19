import React from 'react';
import { NavLink } from 'react-router-dom';
import MainLayout from './MainLayout';
import { useLanguage } from '../components/context/LanguageContext';
import { FaArrowLeft, FaCode, FaRocket, FaPalette } from "react-icons/fa6";
import { RiStackLine } from "react-icons/ri";
import { MdOutlineViewQuilt } from "react-icons/md";
import portfolioList from '../assets/Continental/screenshot7.webp';
import portfolioGrid from '../assets/Continental/screenshot10.webp';
import projectDetails from '../assets/Nebula/screenshot1.jpg';

const AboutWebsite = () => {
    const { t } = useLanguage();
    const pageT = t('aboutWebsitePage');

    const sections = [
        { id: 'introduction', icon: <FaArrowLeft />, title: pageT.sections?.introduction, paragraphs: pageT.introduction },
        { id: 'design', icon: <FaPalette />, title: pageT.sections?.design, paragraphs: pageT.design },
        { id: 'tech', icon: <RiStackLine />, title: pageT.sections?.techStack, paragraphs: pageT.techStack },
        { id: 'features', icon: <MdOutlineViewQuilt />, title: pageT.sections?.features, paragraphs: pageT.features },
        { id: 'deployment', icon: <FaRocket />, title: pageT.sections?.deployment, paragraphs: pageT.deployment },
    ];

    return (
        <MainLayout>
            <div className="w-full flex flex-col md:flex-row gap-6">
                <aside className="md:w-[230px] md:sticky md:top-24 h-fit border border-(--border-light) rounded-xl p-4 bg-(--pixel)">
                    <h2 className="text-sm font-semibold text-(--text-light) mb-3">{t('aboutWebsite')}</h2>
                    <div className="flex flex-col gap-2 text-sm">
                        {sections.map((section) => (
                            <a key={section.id} href={`#${section.id}`} className="text-(--text-gray) hover:text-(--text-light)">
                                {section.title}
                            </a>
                        ))}
                    </div>
                </aside>

                <div className="flex-1 border border-(--border-light) rounded-xl p-5 md:p-8 bg-(--pixel)">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--border-light) pb-4 mb-6">
                        <div>
                            <p className="text-xs text-(--text-gray)">{pageT.tagline}</p>
                            <h1 className="text-3xl md:text-4xl font-bold text-(--text-light)">{t('aboutWebsite')}</h1>
                        </div>
                        <a
                            href="https://github.com/LiebeandSkye/Portfolio"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#238636] text-white text-sm font-medium"
                        >
                            <FaCode />
                            {t('sourceCode')}
                        </a>
                    </div>

                    {sections.map((section) => (
                        <section key={section.id} id={section.id} className="pb-8 mb-8 border-b border-(--border-light) last:border-b-0 last:mb-0 last:pb-0">
                            <p className="text-xs text-(--text-gray) mb-2">{section.icon} <span className="ml-2">{section.title}</span></p>
                            <h2 className="text-2xl md:text-3xl font-bold text-(--text-light)">{section.paragraphs?.title}</h2>
                            {section.paragraphs?.items?.map((text, index) => (
                                <p key={index} className="text-(--text-gray) leading-relaxed mt-3">{text}</p>
                            ))}
                        </section>
                    ))}

                    <section className="pb-8 mb-8 border-b border-(--border-light)">
                        <h2 className="text-2xl md:text-3xl font-bold text-(--text-light)">{pageT.screenshots.title}</h2>
                        <p className="text-(--text-gray) leading-relaxed mt-3">{pageT.screenshots.description}</p>

                        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <figure className="border border-(--border-light) rounded-md overflow-hidden">
                                <img src={portfolioList} alt={pageT.screenshots.portfolioListAlt} className="w-full h-auto object-cover" loading="lazy" />
                                <figcaption className="text-xs text-(--text-gray) p-2 bg-(--light)">{pageT.screenshots.portfolioListCaption}</figcaption>
                            </figure>
                            <figure className="border border-(--border-light) rounded-md overflow-hidden">
                                <img src={portfolioGrid} alt={pageT.screenshots.portfolioGridAlt} className="w-full h-auto object-cover" loading="lazy" />
                                <figcaption className="text-xs text-(--text-gray) p-2 bg-(--light)">{pageT.screenshots.portfolioGridCaption}</figcaption>
                            </figure>
                        </div>

                        <figure className="mt-4 border border-(--border-light) rounded-md overflow-hidden">
                            <img src={projectDetails} alt={pageT.screenshots.projectDetailsAlt} className="w-full h-auto object-cover" loading="lazy" />
                            <figcaption className="text-xs text-(--text-gray) p-2 bg-(--light)">{pageT.screenshots.projectDetailsCaption}</figcaption>
                        </figure>
                    </section>

                    <div className="flex flex-wrap gap-3">
                        <NavLink to="/portfolio" className="px-3 py-2 text-sm rounded-md border border-(--border-light) hover:bg-(--pixel-hover) text-(--text-light)">
                            {pageT.links.portfolio}
                        </NavLink>
                        <NavLink to="/" className="px-3 py-2 text-sm rounded-md border border-(--border-light) hover:bg-(--pixel-hover) text-(--text-light)">
                            {pageT.links.welcome}
                        </NavLink>
                        <NavLink to="/contact" className="px-3 py-2 text-sm rounded-md border border-(--border-light) hover:bg-(--pixel-hover) text-(--text-light)">
                            {pageT.links.contact}
                        </NavLink>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default AboutWebsite;
