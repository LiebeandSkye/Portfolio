import React from 'react';
import { NavLink } from 'react-router-dom';
import MainLayout from './MainLayout';
import { useLanguage } from '../components/context/LanguageContext';
import { FaArrowLeft, FaCode, FaRocket, FaPalette } from "react-icons/fa6";
import { RiStackLine } from "react-icons/ri";
import { MdOutlineViewQuilt } from "react-icons/md";

const portfolioList = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#0f172a"/>
  <rect x="40" y="40" width="1200" height="640" rx="24" fill="#111827" stroke="#334155"/>
  <text x="90" y="105" fill="#f8fafc" font-family="Arial, sans-serif" font-size="34" font-weight="700">Portfolio list view</text>
  <text x="90" y="140" fill="#94a3b8" font-family="Arial, sans-serif" font-size="18">Project cards displayed in a single-column portfolio list</text>
  <rect x="90" y="180" width="1100" height="110" rx="16" fill="#1e293b"/>
  <rect x="115" y="205" width="170" height="60" rx="10" fill="#334155"/>
  <rect x="315" y="210" width="310" height="18" rx="9" fill="#e2e8f0"/>
  <rect x="315" y="242" width="520" height="12" rx="6" fill="#64748b"/>
  <rect x="315" y="264" width="430" height="12" rx="6" fill="#475569"/>
  <rect x="90" y="315" width="1100" height="110" rx="16" fill="#1e293b"/>
  <rect x="115" y="340" width="170" height="60" rx="10" fill="#334155"/>
  <rect x="315" y="345" width="280" height="18" rx="9" fill="#e2e8f0"/>
  <rect x="315" y="377" width="500" height="12" rx="6" fill="#64748b"/>
  <rect x="315" y="399" width="390" height="12" rx="6" fill="#475569"/>
  <rect x="90" y="450" width="1100" height="110" rx="16" fill="#1e293b"/>
  <rect x="115" y="475" width="170" height="60" rx="10" fill="#334155"/>
  <rect x="315" y="480" width="330" height="18" rx="9" fill="#e2e8f0"/>
  <rect x="315" y="512" width="540" height="12" rx="6" fill="#64748b"/>
  <rect x="315" y="534" width="410" height="12" rx="6" fill="#475569"/>
</svg>
`)}`;
const portfolioGrid = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#0f172a"/>
  <rect x="40" y="40" width="1200" height="640" rx="24" fill="#111827" stroke="#334155"/>
  <text x="90" y="105" fill="#f8fafc" font-family="Arial, sans-serif" font-size="34" font-weight="700">Portfolio grid view</text>
  <text x="90" y="140" fill="#94a3b8" font-family="Arial, sans-serif" font-size="18">Projects arranged in a multi-card portfolio gallery</text>
  <rect x="90" y="190" width="320" height="180" rx="18" fill="#1e293b"/>
  <rect x="118" y="218" width="264" height="90" rx="12" fill="#334155"/>
  <rect x="118" y="325" width="180" height="16" rx="8" fill="#e2e8f0"/>
  <rect x="430" y="190" width="320" height="180" rx="18" fill="#1e293b"/>
  <rect x="458" y="218" width="264" height="90" rx="12" fill="#334155"/>
  <rect x="458" y="325" width="180" height="16" rx="8" fill="#e2e8f0"/>
  <rect x="770" y="190" width="320" height="180" rx="18" fill="#1e293b"/>
  <rect x="798" y="218" width="264" height="90" rx="12" fill="#334155"/>
  <rect x="798" y="325" width="180" height="16" rx="8" fill="#e2e8f0"/>
  <rect x="90" y="400" width="320" height="180" rx="18" fill="#1e293b"/>
  <rect x="118" y="428" width="264" height="90" rx="12" fill="#334155"/>
  <rect x="118" y="535" width="180" height="16" rx="8" fill="#e2e8f0"/>
  <rect x="430" y="400" width="320" height="180" rx="18" fill="#1e293b"/>
  <rect x="458" y="428" width="264" height="90" rx="12" fill="#334155"/>
  <rect x="458" y="535" width="180" height="16" rx="8" fill="#e2e8f0"/>
  <rect x="770" y="400" width="320" height="180" rx="18" fill="#1e293b"/>
  <rect x="798" y="428" width="264" height="90" rx="12" fill="#334155"/>
  <rect x="798" y="535" width="180" height="16" rx="8" fill="#e2e8f0"/>
</svg>
`)}`;
const projectDetails = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#0f172a"/>
  <rect x="40" y="40" width="1200" height="640" rx="24" fill="#111827" stroke="#334155"/>
  <text x="90" y="105" fill="#f8fafc" font-family="Arial, sans-serif" font-size="34" font-weight="700">Project details page</text>
  <text x="90" y="140" fill="#94a3b8" font-family="Arial, sans-serif" font-size="18">Detailed portfolio project view with preview, description, and metadata</text>
  <rect x="90" y="190" width="640" height="300" rx="20" fill="#1e293b"/>
  <rect x="770" y="190" width="420" height="300" rx="20" fill="#1e293b"/>
  <rect x="800" y="225" width="220" height="22" rx="11" fill="#e2e8f0"/>
  <rect x="800" y="265" width="330" height="12" rx="6" fill="#64748b"/>
  <rect x="800" y="289" width="300" height="12" rx="6" fill="#64748b"/>
  <rect x="800" y="313" width="280" height="12" rx="6" fill="#64748b"/>
  <rect x="800" y="355" width="110" height="34" rx="17" fill="#2563eb"/>
  <rect x="930" y="355" width="130" height="34" rx="17" fill="#334155"/>
  <rect x="90" y="525" width="1100" height="100" rx="18" fill="#1e293b"/>
  <rect x="120" y="553" width="220" height="16" rx="8" fill="#e2e8f0"/>
  <rect x="120" y="581" width="500" height="12" rx="6" fill="#64748b"/>
</svg>
`)}`;

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
