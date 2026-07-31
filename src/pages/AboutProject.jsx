import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../components/context/LanguageContext';
import Projects from '../Data/Projects';
import Kry_rithisak from '../assets/Kry_Rithisak.optimized.jpg';
import { useNotification } from '../components/context/NotificationContext';
import CopyButton from '../components/ui/CopyButton';
import PrivateRepoModal from '../components/project/PrivateRepoModal';
// Icons
import { FaArrowLeft, FaFacebook, FaLinkedin } from "react-icons/fa6";
import { IoCopySharp } from "react-icons/io5";
import { MdOutlineLibraryBooks, MdOutlinePhotoLibrary } from "react-icons/md";
import { FiCode } from "react-icons/fi";
import { GoDotFill, GoCheck } from "react-icons/go";
import { BsLayersHalf } from "react-icons/bs";
import { RiTwitterXFill, RiWhatsappFill } from "react-icons/ri";

const AboutProject = () => {
    const { addNotification } = useNotification();
    const { t } = useLanguage(); // Fixed: initialized translation hook
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('readme');
    const [privateModalOpen, setPrivateModalOpen] = useState(false);

    const project = Projects.find(p => String(p.id) === String(projectId));

    const handleCodeClick = useCallback(() => {
        if (project && project.code === false) {
            setPrivateModalOpen(true);
        } else if (project && typeof project.code === 'string') {
            window.open(project.code, '_blank', 'noopener,noreferrer');
        }
    }, [project]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [projectId]);

    if (!project) return <div className="p-20 text-center text-white">Project Not Found</div>;

    const info = project.Information;
    const languageStyles = {
        javascript: { label: 'JavaScript', color: '#f1e05a' },
        css: { label: 'CSS', color: '#563d7c' },
        html: { label: 'HTML', color: '#e34c26' },
        python: { label: 'Python', color: '#3572A5' },
    };
    const languageBreakdown = Object.entries(project.percent)
        .filter(([, percent]) => Number(percent) > 0)
        .map(([key, percent]) => ({
            key,
            percent,
            label: languageStyles[key]?.label || key,
            color: languageStyles[key]?.color || '#8b949e',
        }));

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
    };

    return (
        <div className="min-h-screen text-(--text-light) font-sans relative px-0 sm:px-0 md:px-20">

            {/* Top Nav */}
            <div className="flex items-center gap-3 px-4 md:px-8 py-3 text-sm text-(--text-gray)">
                <button onClick={() => navigate('/portfolio')} className="flex items-center gap-1 hover:text-[#388bfd] hover:underline cursor-pointer">
                    <FaArrowLeft size={10} /> Go Back
                </button>
            </div>

            {/* Header Area */}
            <div className="px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <img src={Kry_rithisak} loading='lazy' width="36" height="36" alt="Profile" className="w-9 h-9 rounded-full border border-(--border-light) object-cover" />
                    <h1 className="text-xl font-semibold flex items-center gap-2">
                        <span className="text-(--text-light) hover:underline cursor-pointer">{project.title}</span>
                        <span className="text-[12px] border border-(--border-light) text-(--text-gray) px-2 py-0.5 rounded-full items-center flex">
                            {project.code === false ? 'Private' : 'Public'}
                        </span>
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-(--text-gray)">{t('share')}</span>
                    <SocialAction href={shareLinks.twitter} icon={<RiTwitterXFill />} />
                    <SocialAction href={shareLinks.whatsapp} icon={<RiWhatsappFill />} />
                    <SocialAction href={shareLinks.facebook} icon={<FaFacebook />} />
                    <SocialAction href={shareLinks.linkedin} icon={<FaLinkedin />} />
                    <CopyButton
                        className="border border-(--border-light) rounded-full"
                        text={window.location.href}
                        onCopy={() => addNotification(t('copyMessage'), "success")}
                    />
                </div>
            </div>

            {/* Action Bar */}
            <div className="px-4 md:px-8 flex items-center gap-3 mb-8">
                <a href={project.demo} target="_blank" rel="noreferrer" className="bg-[#1f6feb] hover:bg-[#388bfd] text-white px-4 py-1.5 rounded-md text-sm font-semibold flex items-center gap-2 transition-all">
                    <BsLayersHalf /> {t('viewDemo')}
                </a>
                <button
                    onClick={handleCodeClick}
                    className="bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-1.5 rounded-md text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
                >
                    <FiCode /> {t('sourceCode')}
                </button>
            </div>

            <div className="px-0 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">

                {/* LEFT CONTENT */}
                <div className="lg:col-span-8">
                    <div className="border border-(--border-light) rounded-md overflow-visible">

                        {/* STICKY TAB HEADER (Only this part stays fixed) */}
                        <div className="sticky top-0 z-[40] flex border-b border-(--border-light) rounded-t-md bg-(--pixel)">
                            <TabBtn active={activeTab === 'readme'} onClick={() => setActiveTab('readme')} icon={<MdOutlineLibraryBooks />} label="Readme" />
                            <TabBtn active={activeTab === 'screenshots'} onClick={() => setActiveTab('screenshots')} icon={<MdOutlinePhotoLibrary />} label="Screenshots" />
                        </div>

                        <div className="p-6 md:p-10">
                            {activeTab === 'readme' ? (
                                <div className="space-y-10">
                                    <section>
                                        <h2 className="text-3xl font-bold pb-4">{t(`projects.${project.langKey}.Information.title`)}</h2>
                                        <p className="text-(--text-light) text-lg leading-relaxed pb-10 md:pb-14 border-b border-(--border-light)">{t(`projects.${project.langKey}.Information.description`)}</p>
                                    </section>

                                    <section>
                                        <h3 className="text-2xl font-bold mb-6">{t('projects.continental.Information.coreFeatures.title')}</h3>
                                        <ul className="space-y-4">
                                            {Object.keys(info.coreFeatures || {}).filter(key => key !== 'title').map((featureKey, i) => (
                                                <li key={i} className="flex gap-2 text-(--text-light) items-center">
                                                    <span className=" text-(--text-light)">•</span>
                                                    <span>
                                                        <strong className="text-(--text-light)">
                                                            {/* Correct Path: projects.continental.Information.coreFeatures.features1.title */}
                                                            {t(`projects.${project.langKey}.Information.coreFeatures.${featureKey}.title`)}
                                                        </strong>
                                                        {" – "}
                                                        {/* Correct Path: projects.continental.Information.coreFeatures.features1.description */}
                                                        {t(`projects.${project.langKey}.Information.coreFeatures.${featureKey}.description`)}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    {info.HowItWorks && (
                                        <section>
                                            <h3 className="text-2xl font-bold mb-6">{t('projects.titles.how')}</h3>
                                            <div className="space-y-6">
                                                {Object.keys(info.HowItWorks.steps || {}).map((stepKey, i) => (
                                                    <div key={i} className="flex gap-3">
                                                        <span className="font-bold text-(--text-light)">{i + 1}.</span>
                                                        <p className="text-(--text-light)">
                                                            <strong className="text-(--text-light)">
                                                                {t(`projects.${project.langKey}.Information.howItWorks.${stepKey}.title`)}
                                                            </strong> – {t(`projects.${project.langKey}.Information.howItWorks.${stepKey}.description`)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    <section>
                                        <h3 className="text-2xl font-bold border-b border-(--border-light) pb-4 mb-8">
                                            {t('projects.titles.built')}
                                        </h3>
                                        <div className="space-y-5 md:space-y-10">
                                            <BuildSection
                                                title={t('projects.titles.frameworks')}
                                                items={info.HowIBuiltIt?.frameworks}
                                                langPath={`projects.${project.langKey}.Information.howIBuiltIt.frameworks`}
                                            />
                                            <BuildSection
                                                title={t('projects.titles.styling')}
                                                items={info.HowIBuiltIt?.Styles}
                                                langPath={`projects.${project.langKey}.Information.howIBuiltIt.styles`}
                                            />
                                            <BuildSection
                                                title={t('projects.titles.api')}
                                                items={info.HowIBuiltIt?.Api}
                                                langPath={`projects.${project.langKey}.Information.howIBuiltIt.api`}
                                            />
                                        </div>
                                    </section>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    {info.screenshots && Object.values(info.screenshots).map((src, i) => (
                                        <div key={i} className="w-full border border-(--border-light) rounded-lg overflow-hidden bg-(--pixel)">
                                            <img src={src} alt={`Screenshot ${i}`} className="w-full h-auto block" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR (NOT STICKY - It will scroll away) */}
                <div className="lg:col-span-4 space-y-8 h-fit">
                    <div>
                        <h4 className="font-semibold text-sm mb-3 text-(--text-light)">About</h4>
                        <p className="text-sm text-(--text-light) leading-relaxed mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map(t => (
                                <span key={t} className="text-[12px] text-[#58a6ff] bg-[#388bfd1a] px-3 py-0.5 rounded-full border border-[#388bfd66] select-none hover:bg-[#388bfd] transition-all hover:text-white">
                                    {t}
                                </span>
                            ))}
                        </div>
                        <div className="space-y-2">
                            {project.designed && <StatusItem label="Designed" />}
                            {project.developed && <StatusItem label="Developed" />}
                        </div>
                    </div>

                    <hr className="border-(--border-light)" />

                    <div>
                        <h4 className="font-semibold text-sm mb-4 text-(--text-light)">{project.summary.title}</h4>
                        <div className="space-y-4">
                            <SummaryItem icon={<FiCode color="#3fb950" />} title="Frameworks & Libraries" value={project.summary.framework} />
                            <SummaryItem icon={<FiCode color="#3fb950" />} title="Styling & UI" value={project.summary.style} />
                            <SummaryItem icon={<FiCode color="#3fb950" />} title="CMS & APIs" value={project.summary.API} />
                        </div>
                    </div>

                    <hr className="border-(--border-light)" />

                    <div>
                        <h4 className="font-semibold text-sm mb-4 text-(--text-light)">Languages</h4>
                        <div className="h-2 w-full flex rounded-full overflow-hidden mb-4 bg-[#30363d]">
                            {languageBreakdown.map((language) => (
                                <div
                                    key={language.key}
                                    style={{ width: `${language.percent}%`, backgroundColor: language.color }}
                                />
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-y-2">
                            {languageBreakdown.map((language) => (
                                <LangLabel
                                    key={language.key}
                                    dot={language.color}
                                    name={language.label}
                                    percent={`${language.percent}%`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <PrivateRepoModal
                isOpen={privateModalOpen}
                onClose={() => setPrivateModalOpen(false)}
                projectTitle={project.title}
            />
        </div>
    );
};

// --- Sub-Components ---

const SocialAction = ({ href, icon }) => (
    <a href={href} target="_blank" rel="noreferrer" className="p-2 border border-(--border-light) rounded-full text-(--text-gray)  hover:text-[#388bfd] transition-all">
        {icon}
    </a>
);

const TabBtn = ({ active, onClick, icon, label }) => (
    <button onClick={onClick} className={`bg-(--pixel) flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 ${active ? 'border-[#f78166] text-(--text-light)' : 'border-transparent text-(--text-gray) hover:text-(--text-light) hover:bg-(--pixel-hover)'}`}>
        {icon} {label}
    </button>
);

const BuildSection = ({ title, items, langPath }) => {
    const { t } = useLanguage();
    if (!items) return null;

    return (
        <div className="mt-8">
            <h4 className="text-md font-semibold mb-4 text-(--text-light)">{title}</h4>
            <div className="space-y-4">
                {Object.keys(items).map((itemKey) => {
                    const item = items[itemKey];
                    return (
                        <div key={itemKey} className="flex items-center gap-4 p-3 rounded-lg border border-(--border-light) bg-(--pixel)">
                            <div className="text-2xl" style={{ color: item.color || '#388bfd' }}>
                                {typeof item.icon === 'function' ? (
                                    <item.icon />
                                ) : (
                                    <img src={item.icon} alt="" className="w-8 h-8" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-bold">
                                    {t(`${langPath}.${itemKey}.name`)}
                                </p>
                                <p className="text-xs text-[#8b949e]">
                                    {t(`${langPath}.${itemKey}.description`)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const StatusItem = ({ label }) => (
    <div className="flex items-center gap-2 text-xs text-(--text-gray)">
        <GoCheck className="text-[#3fb950]" /> {label}
    </div>
);

const SummaryItem = ({ icon, title, value }) => (
    <div className="flex items-start gap-3">
        <div className="mt-1">{icon}</div>
        <div>
            <p className="text-[13px] font-bold text-(--text-light)">{title}</p>
            <p className="text-[12px] text-(--text-gray)">{value}</p>
        </div>
    </div>
);

const LangLabel = ({ dot, name, percent }) => (
    <div className="flex items-center gap-2 text-[12px] font-medium">
        <GoDotFill color={dot} />
        <span className="text-(--text-light)">{name}</span>
        <span className="text-(--text-light)">{percent}</span>
    </div>
);

export default AboutProject;
