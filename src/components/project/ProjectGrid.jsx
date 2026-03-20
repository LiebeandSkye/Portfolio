import React from 'react';
import { Link } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";
import { IoCodeOutline, IoEyeOutline } from "react-icons/io5";
import { useLanguage } from '../Header/Lang/LanguageContext';
const ProjectGrid = ({ projects }) => {
    const { t } = useLanguage();
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {projects.length === 0 ? (
                <div className="col-span-full py-20 text-center border border-(--border-light) rounded-lg">
                    {/* Using translation for the empty state message */}
                    <p className="text-(--text-gray)">{t('portfolio.noMatches')}</p>
                </div>
            ) : (
                projects.map((project) => {
                    // Fetch translated content using the langKey
                    const projectTitle = t(`projects.${project.langKey}.title`);
                    const projectDesc = t(`projects.${project.langKey}.description`);

                    return (
                        <div
                            key={project.id}
                            className="hover:bg-(--pixel) border border-(--border-light) rounded-xl overflow-hidden transition-all flex flex-col group"
                        >
                            {/* Thumbnail Image Section */}
                            <div className="relative aspect-video overflow-hidden border-b border-(--border-light) bg-(--pixel)">
                                {project.thumbnail ? (
                                    <img
                                        src={project.thumbnail}
                                        alt={projectTitle}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-(--text-gray) text-xs">
                                        {t('portfolio.noPreview')}
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-[#58a6ff] text-lg font-bold hover:underline cursor-pointer">
                                        <Link to={`/portfolio/${project.id}`}>{projectTitle}</Link>
                                    </h3>
                                    {project.public && (
                                        <span className="text-(--text-gray-dark) text-[10px] border border-(--border-light) rounded-full px-2 py-0.5 font-medium uppercase tracking-wide">
                                            {t('portfolio.statusPublic')}
                                        </span>
                                    )}
                                </div>

                                <p className="text-(--text-gray) text-sm mb-6 line-clamp-2 leading-relaxed flex-1">
                                    {projectDesc}
                                </p>

                                {/* Footer Section - Language and Links */}
                                <div className="flex items-center gap-4 text-xs text-(--text-gray) mt-auto">
                                    <div className="flex items-center gap-1">
                                        <GoDotFill className={project.red ? "text-yellow-400" : "text-blue-400"} />
                                        <span className="text-(--text-light)">JavaScript</span>
                                    </div>

                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target='_blank'
                                            rel="noreferrer"
                                            className="flex items-center gap-1.5 hover:text-[#58a6ff] hover:underline transition-colors"
                                        >
                                            <IoEyeOutline className="text-sm" />
                                            {t('portfolio.btnDemo')}
                                        </a>
                                    )}

                                    {project.code && (
                                        <a
                                            href={project.code}
                                            target='_blank'
                                            rel="noreferrer"
                                            className="flex items-center gap-1.5 hover:text-[#58a6ff] hover:underline transition-colors"
                                        >
                                            <IoCodeOutline className="text-sm" />
                                            {t('portfolio.btnCode')}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default ProjectGrid;