import React, { memo, useState, useCallback } from 'react';
import '../../index.css';
import Projects from '../../Data/Projects';
import { Link } from 'react-router-dom';
import { BsPinAngleFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa6";
import { useLanguage } from '../context/LanguageContext';
import PrivateRepoModal from './PrivateRepoModal';

// ─── Single card — memoized so it only re-renders when its own project data
// or language changes. Without memo, all cards re-render whenever any parent
// state updates (e.g. search input, tab switch, anything in Portfolio page).\
const ProjectCard = memo(function ProjectCard({ project, t, onPrivateCode }) {
    const title = t(`projects.${project.langKey}.title`);
    const desc  = t(`projects.${project.langKey}.description`);

    const handleCodeClick = useCallback(() => {
        if (project.code === false) {
            onPrivateCode(project.title);
        } else if (typeof project.code === 'string') {
            window.open(project.code, '_blank', 'noopener,noreferrer');
        }
    }, [project.code, project.title, onPrivateCode]);

    return (
        <div className="min-w-[85%] md:min-w-0 snap-start border border-(--border-light) rounded-md p-4 flex flex-col justify-between h-[140px] transition-colors hover:bg-(--pixel)">
            <div>
                <div className="flex items-center mb-1 gap-5">
                    <div className="flex items-center gap-2 text-[#58a6ff] min-w-0">
                        <FaBook size={14} className="text-(--text-gray) flex-shrink-0" />
                        <h3 className="font-semibold text-sm hover:underline cursor-pointer truncate max-w-[140px] w-full">
                            <Link to={`/portfolio/${project.id}`}>{title}</Link>
                        </h3>
                    </div>
                    <span className="text-(--text-gray) text-[10px] px-2 py-0.5 border border-(--border-light) rounded-full flex-shrink-0">
                        {project.code === false ? 'Private' : 'Public'}
                    </span>
                </div>
                <p className="text-(--text-gray) text-xs mt-2 line-clamp-2">{desc}</p>
            </div>
            <div className="flex items-center gap-2 mt-3">
                <div className={`rounded-full w-3 h-3 flex-shrink-0 ${project.red ? 'bg-[#ff7b72]' : 'bg-[#58a6ff]'}`} />
                <p className="text-[11px] text-(--text-gray)">{project.bread}</p>
                <button
                    onClick={handleCodeClick}
                    className="ml-auto text-[10px] text-(--text-gray) hover:text-[#58a6ff] hover:underline transition-colors duration-150 cursor-pointer"
                >
                    {t('sourceCode')}
                </button>
            </div>
        </div>
    );
});

// ─── Pinned — memo so it doesn't re-render on unrelated parent updates ────────
const Pinned = memo(function Pinned() {
    const { t } = useLanguage();
    const [modalState, setModalState] = useState({ isOpen: false, projectTitle: '' });

    const handlePrivateCode = useCallback((projectTitle) => {
        setModalState({ isOpen: true, projectTitle });
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalState(prev => ({ ...prev, isOpen: false }));
    }, []);

    // Only show projects that have pinned: true
    const pinnedProjects = Projects.filter(p => p.pinned === true);

    return (
        <>
            <div className="w-full max-w-4xl rounded-lg flex-shrink-0">
                <div className="flex items-center gap-2 mb-4">
                    <BsPinAngleFill className="text-(--text-gray) -rotate-45" />
                    <h2 className="text-(--text-light) text-sm font-semibold">{t('pinned')}</h2>
                </div>

                {pinnedProjects.length > 0 ? (
                    <div className="
                        flex flex-nowrap overflow-x-auto gap-4 pb-2
                        snap-x snap-mandatory scrollbar-hide
                        md:grid md:grid-cols-2 md:overflow-visible
                    ">
                        {pinnedProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                t={t}
                                onPrivateCode={handlePrivateCode}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-xs text-(--text-gray) italic">No pinned projects yet.</p>
                )}
            </div>

            <PrivateRepoModal
                isOpen={modalState.isOpen}
                onClose={handleCloseModal}
                projectTitle={modalState.projectTitle}
            />
        </>
    );
});

export default Pinned;