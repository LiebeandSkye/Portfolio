import React from 'react';
import Projects from '../../Data/Projects';
import { Link } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";
import { IoCodeOutline, IoEyeOutline } from "react-icons/io5";
import { useLanguage } from '../Header/Lang/LanguageContext';
const ProjectList = ({ projects }) => {
    const { t } = useLanguage();
    return (
        <div className="w-full">
            {projects.length === 0 ? (
                <div className="py-20 text-center border-b border-(--border-light)">
                    <p className="text-(--text-gray)">{t('portfolio.noMatches')}</p>
                </div>
            ) : (
                projects.map((project) => {
                    // Pull translations based on the project's langKey
                    const projectTitle = t(`projects.${project.langKey}.title`);
                    const projectDesc = t(`projects.${project.langKey}.description`);

                    return (
                        <div key={project.id} className="py-6 border-b border-(--border-light) last:border-0">
                            <div className="flex items-center gap-2 mb-1">
                                {/* Blue Title */}
                                <h3 className="text-[#58a6ff] text-xl font-semibold hover:underline cursor-pointer">
                                    <Link to={`/portfolio/${project.id}`}>{projectTitle}</Link>
                                </h3>
                                {/* Public Tag */}
                                {project.public && (
                                    <span className="text-(--text-gray-dark) text-xs border border-(--border-light) rounded-full px-2 py-0.5 font-medium">
                                        {t('portfolio.statusPublic')}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-(--text-gray) text-sm mb-4 max-w-3xl leading-relaxed">
                                {projectDesc}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-(--text-gray)">
                                {/* Language */}
                                <div className="flex items-center gap-1">
                                    <GoDotFill className={project.red ? "text-yellow-400" : "text-blue-400"} />
                                    <span className="text-(--text-light)">JavaScript</span>
                                </div>

                                {/* Demo Link */}
                                {project.demo && (
                                    <a
                                        href={project.demo}
                                        target='_blank'
                                        rel="noreferrer"
                                        className="flex items-center gap-1.5 hover:text-(--sucess) transition-colors"
                                    >
                                        <IoEyeOutline className="text-sm" />
                                        {t('portfolio.btnDemo')}
                                    </a>
                                )}

                                {/* Code Link */}
                                {project.code && (
                                    <a
                                        href={project.code}
                                        target='_blank'
                                        rel="noreferrer"
                                        className="flex items-center gap-1.5 hover:text-(--sucess) transition-colors"
                                    >
                                        <IoCodeOutline className="text-sm" />
                                        {t('portfolio.btnCode')}
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default ProjectList;