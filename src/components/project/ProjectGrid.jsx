import React, { memo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";
import { IoCodeOutline, IoEyeOutline } from "react-icons/io5";
import { useLanguage } from '../context/LanguageContext';
import PrivateRepoModal from './PrivateRepoModal';

// ─── Single grid card — memoized by project.id + language ────────────────────
// The Portfolio page may re-render when the user types in a search box.
// Without memo, every card re-renders on each keystroke even if its data
// didn't change. With memo, only truly changed cards update.
const GridCard = memo(function GridCard({ project, t, onPrivateCode }) {
    const projectTitle = t(`projects.${project.langKey}.title`);
    const projectDesc = t(`projects.${project.langKey}.description`);

    const handleCodeClick = useCallback(() => {
        if (project.code === false) {
            onPrivateCode(project.title);
        } else if (typeof project.code === 'string') {
            window.open(project.code, '_blank', 'noopener,noreferrer');
        }
    }, [project.code, project.title, onPrivateCode]);

    const isPrivate = project.code === false;

    return (
        <div className="hover:bg-(--pixel) border border-(--border-light) rounded-xl overflow-hidden transition-all flex flex-col group">
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden border-b border-(--border-light) bg-(--pixel)">
                {project.thumbnail ? (
                    <img
                        src={project.thumbnail}
                        alt={projectTitle}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-(--text-gray) text-xs">
                        No preview
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-[#58a6ff] text-lg font-bold hover:underline cursor-pointer">
                        <Link to={`/portfolio/${project.id}`}>{projectTitle}</Link>
                    </h3>
                    <span className="text-(--text-gray-dark) text-[10px] border border-(--border-light) rounded-full px-2 py-0.5 font-medium uppercase tracking-wide flex-shrink-0">
                        {isPrivate ? 'Private' : 'Public'}
                    </span>
                </div>

                <p className="text-(--text-gray) text-sm mb-6 line-clamp-2 leading-relaxed flex-1">
                    {projectDesc}
                </p>

                <div className="flex items-center gap-4 text-xs text-(--text-gray) mt-auto">
                    <div className="flex items-center gap-1">
                        <GoDotFill className={project.red ? 'text-yellow-400' : 'text-blue-400'} />
                        <span className="text-(--text-light)">JavaScript</span>
                    </div>
                    {project.demo && (
                        <a href={project.demo} target="_blank" rel="noreferrer"
                            className="flex items-center gap-1.5 hover:text-[#58a6ff] hover:underline transition-colors">
                            <IoEyeOutline />
                            {t('portfolio.btnDemo')}
                        </a>
                    )}
                    <button
                        onClick={handleCodeClick}
                        className="flex items-center gap-1.5 hover:text-[#58a6ff] hover:underline transition-colors cursor-pointer"
                    >
                        <IoCodeOutline />
                        {t('portfolio.btnCode')}
                    </button>
                </div>
            </div>
        </div>
    );
});

// ─── ProjectGrid ──────────────────────────────────────────────────────────────
const ProjectGrid = memo(function ProjectGrid({ projects }) {
    const { t } = useLanguage();
    const [modalState, setModalState] = useState({ isOpen: false, projectTitle: '' });

    const handlePrivateCode = useCallback((projectTitle) => {
        setModalState({ isOpen: true, projectTitle });
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalState(prev => ({ ...prev, isOpen: false }));
    }, []);

    if (projects.length === 0) {
        return (
            <div className="col-span-full py-20 text-center border border-(--border-light) rounded-lg">
                <p className="text-(--text-gray)">{t('portfolio.noMatches')}</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                {projects.map((project) => (
                    <GridCard key={project.id} project={project} t={t} onPrivateCode={handlePrivateCode} />
                ))}
            </div>
            <PrivateRepoModal
                isOpen={modalState.isOpen}
                onClose={handleCloseModal}
                projectTitle={modalState.projectTitle}
            />
        </>
    );
});

export default ProjectGrid;