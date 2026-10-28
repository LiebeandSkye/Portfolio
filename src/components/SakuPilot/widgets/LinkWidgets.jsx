import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiGlobe } from 'react-icons/fi';
import Projects from '../../../Data/Projects';
import { DynamicIcon } from './DynamicIcon';
import { WidgetCard, WidgetTitle } from './shared';
import { iconBoxClass } from './styles';

/**
 * Tap-to-ask cards: icon, short label, one-line hint.
 * Clicking sends the card's prompt to the chat.
 */
export const CardsWidget = memo(function CardsWidget({ title, cards = [], onSendPrompt }) {
    if (cards.length === 0) return null;
    return (
        <div className="my-3 w-full">
            {title && <p className="mb-2 px-1 text-sm font-semibold text-(--text-light)">{title}</p>}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {cards.map((card, i) => (
                    <motion.button
                        key={`${card.label}-${i}`}
                        type="button"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.2 }}
                        disabled={!onSendPrompt}
                        onClick={() => onSendPrompt?.(card.prompt)}
                        className="group flex items-start gap-3 rounded-2xl border border-(--border-light) bg-(--pixel2) p-3.5 text-left transition-colors hover:bg-(--pixel) disabled:cursor-default cursor-pointer"
                    >
                        <span className={iconBoxClass}>
                            <DynamicIcon name={card.icon} className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-(--text-light)">{card.label}</span>
                            {card.text && (
                                <span className="mt-0.5 line-clamp-2 text-xs leading-snug text-(--text-gray)">
                                    {card.text}
                                </span>
                            )}
                        </span>
                        <FiArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-(--text-gray) opacity-0 transition-opacity group-hover:opacity-100" />
                    </motion.button>
                ))}
            </div>
        </div>
    );
});

/** External links as a tidy list: icon, name, domain. Always opens in a new tab. */
export const LinksWidget = memo(function LinksWidget({ title, links = [] }) {
    if (links.length === 0) return null;
    return (
        <WidgetCard className="px-2! pb-2! pt-4!">
            {title && (
                <div className="px-2">
                    <WidgetTitle icon="link">{title}</WidgetTitle>
                </div>
            )}
            <ul className="flex flex-col">
                {links.map(link => (
                    <li key={link.url}>
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-(--pixel)"
                        >
                            <span className={iconBoxClass}>
                                <FiGlobe className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-medium text-(--text-light)">{link.label}</span>
                                <span className="block truncate text-xs text-(--text-gray)">{link.domain}</span>
                            </span>
                            <FiArrowUpRight className="h-4 w-4 shrink-0 text-(--text-gray) transition-colors group-hover:text-(--text-light)" />
                        </a>
                    </li>
                ))}
            </ul>
        </WidgetCard>
    );
});

/**
 * Portfolio project cards built from the real Projects data:
 * thumbnail, name, one line, up to three tags. Click opens the project page.
 */
export const ProjectWidget = memo(function ProjectWidget({ ids = [], onNavigate }) {
    const projects = useMemo(
        () => ids.map(id => Projects.find(p => p.id === id)).filter(Boolean),
        [ids]
    );
    if (projects.length === 0) return null;

    return (
        <div className="my-3 flex w-full flex-col gap-2">
            {projects.map((project, i) => (
                <motion.button
                    key={project.id}
                    type="button"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                    disabled={!onNavigate}
                    onClick={() => onNavigate?.(`/portfolio/${project.id}`)}
                    className="group flex w-full items-center gap-3 rounded-2xl border border-(--border-light) bg-(--pixel2) p-2.5 pr-3.5 text-left transition-colors hover:bg-(--pixel) disabled:cursor-default cursor-pointer"
                >
                    {project.thumbnail && (
                        <img
                            src={project.thumbnail}
                            alt=""
                            loading="lazy"
                            className="h-14 w-20 shrink-0 rounded-xl bg-(--pixel) object-cover"
                        />
                    )}
                    <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-(--text-light)">{project.title}</span>
                        {project.description && (
                            <span className="mt-0.5 line-clamp-1 text-xs text-(--text-gray)">
                                {project.description}
                            </span>
                        )}
                        {Array.isArray(project.tags) && project.tags.length > 0 && (
                            <span className="mt-1.5 flex gap-1.5 overflow-hidden">
                                {project.tags.slice(0, 3).map(tag => (
                                    <span
                                        key={tag}
                                        className="shrink-0 rounded-full bg-(--pixel) px-2 py-0.5 text-[11px] text-(--text-gray)"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </span>
                        )}
                    </span>
                    <FiArrowUpRight className="h-4 w-4 shrink-0 text-(--text-gray) transition-colors group-hover:text-(--text-light)" />
                </motion.button>
            ))}
        </div>
    );
});
