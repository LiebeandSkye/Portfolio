import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";
import { IoCodeOutline, IoEyeOutline } from "react-icons/io5";
import { useLanguage } from '../context/LanguageContext';

// ─── Single grid card — memoized by project.id + language ────────────────────
// The Portfolio page may re-render when the user types in a search box.
// Without memo, every card re-renders on each keystroke even if its data
// didn't change. With memo, only truly changed cards update.
const GridCard = memo(function GridCard({ project, t }) {
    const projectTitle = t(`projects.${project.langKey}.title`);
    const projectDesc = t(`projects.${project.langKey}.description`);

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
                    {project.public && (
                        <span className="text-(--text-gray-dark) text-[10px] border border-(--border-light) rounded-full px-2 py-0.5 font-medium uppercase tracking-wide flex-shrink-0">
                            Public
                        </span>
                    )}
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
                    {project.code && (
                        <a href={project.code} target="_blank" rel="noreferrer"
                            className="flex items-center gap-1.5 hover:text-[#58a6ff] hover:underline transition-colors">
                            <IoCodeOutline />
                            {t('portfolio.btnCode')}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
});

// ─── ProjectGrid ──────────────────────────────────────────────────────────────
const ProjectGrid = memo(function ProjectGrid({ projects }) {
    const { t } = useLanguage();

    if (projects.length === 0) {
        return (
            <div className="col-span-full py-20 text-center border border-(--border-light) rounded-lg">
                <p className="text-(--text-gray)">{t('portfolio.noMatches')}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {projects.map((project) => (
                <GridCard key={project.id} project={project} t={t} />
            ))}
        </div>
    );
});

export default ProjectGrid;