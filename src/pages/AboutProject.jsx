import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../components/Header/Lang/LanguageContext'; // Ensure this path is correct
import Projects from '../Data/Projects';
import Kry_rithisak from '../assets/Kry_Rithisak.jpg';
import Notification from '../components/ui/Notifcation';
import CopyButton from '../components/ui/CopyButton';
// Icons
import { FaArrowLeft, FaFacebook, FaLinkedin } from "react-icons/fa6";
import { IoCopySharp } from "react-icons/io5";
import { MdOutlineLibraryBooks, MdOutlinePhotoLibrary } from "react-icons/md";
import { FiCode } from "react-icons/fi";
import { GoDotFill, GoCheck } from "react-icons/go";
import { BsLayersHalf } from "react-icons/bs";
import { RiTwitterXFill, RiWhatsappFill } from "react-icons/ri";
import languages from '../Data/Language';

const AboutProject = () => {
    const { t } = useLanguage(); // Fixed: initialized translation hook
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('readme');
    const [notification, setNotification] = useState({ show: false, message: '' });

    const project = Projects.find(p => String(p.id) === String(projectId));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [projectId]);

    if (!project) return <div className="p-20 text-center text-white">Project Not Found</div>;

    const info = project.Information;

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
    };

    return (
        <div className="min-h-screen text-(--text-light) font-sans relative px-20">
            {notification.show && (
                <Notification
                    message={notification.message}
                    onClose={() => setNotification({ show: false, message: '' })}
                />
            )}

            {/* Top Nav */}
            <div className="flex items-center gap-3 px-4 md:px-8 py-3 text-sm text-(--text-gray)">
                <button onClick={() => navigate('/portfolio')} className="flex items-center gap-1 hover:text-c hover:underline cursor-pointer">
                    <FaArrowLeft size={10} /> Go Back
                </button>
            </div>

            {/* Header Area */}
            <div className="px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <img src={Kry_rithisak} alt="Profile" className="w-9 h-9 rounded-full border border-(--border-light) object-cover" />
                    <h1 className="text-xl font-semibold flex items-center gap-2">
                        <span className="text-(--text-light) hover:underline cursor-pointer">{project.title}</span>
                        <span className="text-[12px] border border-(--border-light) text-(--text-gray) px-2 py-0.5 rounded-full items-center flex">Public</span>
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-(--text-gray)">Share:</span>
                    <SocialAction href={shareLinks.twitter} icon={<RiTwitterXFill />} />
                    <SocialAction href={shareLinks.whatsapp} icon={<RiWhatsappFill />} />
                    <SocialAction href={shareLinks.facebook} icon={<FaFacebook />} />
                    <SocialAction href={shareLinks.linkedin} icon={<FaLinkedin />} />
                    <CopyButton
                        className="border border-(--border-light) rounded-full"
                        text={window.location.href}
                        isNotificationActive={notification.show}
                        onCopy={() => setNotification({ show: true, message: t('copyMessage') })}
                    />
                </div>
            </div>

            {/* Action Bar */}
            <div className="px-4 md:px-8 flex items-center gap-3 mb-8">
                <a href={project.demo} target="_blank" rel="noreferrer" className="bg-[#1f6feb] hover:bg-[#388bfd] text-white px-4 py-1.5 rounded-md text-sm font-semibold flex items-center gap-2 transition-all">
                    <BsLayersHalf /> View Demo
                </a>
                <a href={project.code} target="_blank" rel="noreferrer" className="bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-1.5 rounded-md text-sm font-semibold flex items-center gap-2 transition-all">
                    <FiCode /> Source Code
                </a>
            </div>

            <div className="px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">

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
                                        <h2 className="text-3xl font-bold pb-4">{info.title} Website</h2>
                                        <p className="text-(--text-light) text-lg leading-relaxed pb-10 md:pb-14 border-b border-(--border-light)">{info.description}</p>
                                    </section>

                                    <section>
                                        <h3 className="text-2xl font-bold mb-6">{info.coreFeatures.title}</h3>
                                        <ul className="space-y-4">
                                            {Object.values(info.coreFeatures || {}).filter(v => typeof v === 'object').map((f, i) => (
                                                <li key={i} className="flex gap-2 text-(--text-light)">
                                                    <span className="mt-1.5 text-(--text-light)">•</span>
                                                    <span><strong className="text-(--text-light)">{f.title}</strong> – {f.description}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    {info.HowItWorks && (
                                        <section>
                                            <h3 className="text-2xl font-bold mb-6">{info.HowItWorks.title}</h3>
                                            <div className="space-y-6">
                                                {Object.values(info.HowItWorks.steps || {}).map((step, i) => (
                                                    <div key={i} className="flex gap-3">
                                                        <span className="font-bold text-(--text-light)">{i + 1}.</span>
                                                        <p className="text-(--text-light)">
                                                            <strong className="text-(--text-light)">{step.title}</strong> – {step.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                            {info.HowItWorks.description && (
                                                <p className="mt-6 text-(--text-gray) italic border-l-2 border-(--border-light) pl-4">{info.HowItWorks.description}</p>
                                            )}
                                        </section>
                                    )}

                                    <section>
                                        <h3 className="text-2xl font-bold border-b border-(--border-light) pb-4 mb-8">{info.HowIBuiltIt?.title}</h3>
                                        <div className="space-y-10">
                                            <BuildSection title="Frameworks & Libraries" items={info.HowIBuiltIt?.frameworks} />
                                            <BuildSection title="Styling & UI" items={info.HowIBuiltIt?.Styles} />
                                            <BuildSection title="CMS & APIs" items={info.HowIBuiltIt?.Api} />
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
                            <StatusItem label="Designed" />
                            <StatusItem label="Developed" />
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
                            <div style={{ width: `${project.percent.javascript}%` }} className="bg-[#f1e05a]"></div>
                            <div style={{ width: `${project.percent.css}%` }} className="bg-[#563d7c]"></div>
                            {project.percent.html && <div style={{ width: `${project.percent.html}%` }} className="bg-[#e34c26]"></div>}
                        </div>
                        <div className="grid grid-cols-2 gap-y-2">
                            <LangLabel dot="#f1e05a" name="JavaScript" percent={`${project.percent.javascript}%`} />
                            <LangLabel dot="#563d7c" name="CSS" percent={`${project.percent.css}%`} />
                            {project.percent.html && <LangLabel dot="#e34c26" name="HTML" percent={`${project.percent.html}%`} />}
                        </div>
                    </div>
                </div>
            </div>
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

const BuildSection = ({ title, items }) => {
    if (!items) return null;
    return (
        <div>
            <h4 className="text-md font-semibold mb-4 text-(--text-light)">{title}</h4>
            <div className="space-y-3">
                {Object.values(items).map((item, i) => (
                    <div key={i} className="flex items-center bg-(--pixel) p-2  rounded-lg">
                        <div className="w-10 h-10 flex items-center justify-center rounded text-xl">
                            {typeof item.icon === 'string' ? <img src={item.icon} alt="" className="w-6 h-6 object-contain" /> : <item.icon className="text-[#58a6ff]" />}
                        </div>
                        <div className="text-sm">
                            <span className="font-semibold text-(--text-light)">{item.name}:</span>
                            <span className="text-[#8b949e] ml-2">{item.description}</span>
                        </div>
                    </div>
                ))}
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