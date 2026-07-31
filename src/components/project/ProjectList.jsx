import React, { memo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";
import { IoCodeOutline, IoEyeOutline } from "react-icons/io5";
import { useLanguage } from '../context/LanguageContext';
import PrivateRepoModal from './PrivateRepoModal';

// ─── Single row — memoized so only changed rows re-render on filter/search ────
const ListRow = memo(function ListRow({ project, t, onPrivateCode }) {
    const projectTitle = t(`projects.${project.langKey}.title`);
    const projectDesc  = t(`projects.${project.langKey}.description`);

    const handleCodeClick = useCallback(() => {
        if (project.code === false) {
            onPrivateCode(project.title);
        } else if (typeof project.code === 'string') {
            window.open(project.code, '_blank', 'noopener,noreferrer');
        }
    }, [project.code, project.title, onPrivateCode]);

    const isPrivate = project.code === false;

    return (
        <div className="py-6 border-b border-(--border-light) last:border-0">
            <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[#58a6ff] text-xl font-semibold hover:underline cursor-pointer">
                    <Link to={`/portfolio/${project.id}`}>{projectTitle}</Link>
                </h3>
                {isPrivate ? (
                    <span className="text-(--text-gray-dark) text-xs border border-(--border-light) rounded-full px-2 py-0.5 font-medium flex-shrink-0">
                        Private
                    </span>
                ) : (
                    <span className="text-(--text-gray-dark) text-xs border border-(--border-light) rounded-full px-2 py-0.5 font-medium flex-shrink-0">
                        {t('portfolio.statusPublic')}
                    </span>
                )}
            </div>

            <p className="text-(--text-gray) text-sm mb-4 max-w-3xl leading-relaxed">
                {projectDesc}
            </p>

            <div className="flex items-center gap-4 text-xs text-(--text-gray)">
                <div className="flex items-center gap-1">
                    <GoDotFill className={project.red ? 'text-yellow-400' : 'text-blue-400'} />
                    <span className="text-(--text-light)">JavaScript</span>
                </div>
                {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 hover:text-(--sucess) transition-colors">
                        <IoEyeOutline />
                        {t('portfolio.btnDemo')}
                    </a>
                )}
                <button
                    onClick={handleCodeClick}
                    className="flex items-center gap-1.5 hover:text-(--sucess) transition-colors cursor-pointer"
                >
                    <IoCodeOutline />
                    {t('portfolio.btnCode')}
                </button>
            </div>
        </div>
    );
});

// ─── ProjectList ──────────────────────────────────────────────────────────────
const ProjectList = memo(function ProjectList({ projects }) {
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
            <div className="py-20 text-center border-b border-(--border-light)">
                <p className="text-(--text-gray)">{t('portfolio.noMatches')}</p>
            </div>
        );
    }

    return (
        <>
            <div className="w-full">
                {projects.map(project => (
                    <ListRow key={project.id} project={project} t={t} onPrivateCode={handlePrivateCode} />
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

export default ProjectList;