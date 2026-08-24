import React, { memo } from 'react';
import { GoArrowRight } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import Kry_Rithisak from '../../assets/Kry_Rithisak.optimized.jpg';
import SakuPilotIcon from '../../assets/Tools/SakuPilotIcon.poster.png';

// memo — only re-renders when filteredProjects or searchQuery changes
const HomeView = memo(function HomeView({ filteredProjects, searchQuery, setSearchQuery, startChat, t }) {
    return (
        <div className="flex flex-col items-center p-6">
            <div className="relative w-24 h-24 flex items-center justify-center mb-6 mt-4 select-none">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 via-neutral-500/20 to-black/40 dark:from-white/15 dark:via-neutral-700/20 dark:to-black/60 blur-[3px] opacity-90 pointer-events-none" />
                <div className="absolute inset-[3px] bg-gradient-to-b from-white/20 via-(--pixel2) to-black/20 dark:from-white/10 dark:via-(--pixel2) dark:to-black/40 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center p-2 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)] select-none">
                    <img src={SakuPilotIcon} alt="SakuPilot" className="w-full h-full object-contain filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)] select-none pointer-events-none" draggable={false} />
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-3 text-(--text-light)">Ask SakuPilot</h2>
            <p className="text-center text-[#8b949e] text-[14px] px-4 mb-8">
                Select one of my projects to get started.
            </p>

            <div className="w-full border border-(--border-light) rounded-lg bg-(--pixel) overflow-hidden">
                <div className="flex items-center px-3 py-2.5 border-b border-(--border-light)">
                    <IoSearchOutline className="text-[#8b949e] mr-2" size={18} />
                    <input
                        type="text"
                        placeholder="Search a project to chat about"
                        className="bg-transparent w-full text-sm outline-none placeholder:text-(--text-gray)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="max-h-[140px] overflow-y-auto github-scrollbar">
                    {filteredProjects.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => startChat(p)}
                            className="w-full flex items-center justify-between px-4 py-2 hover:bg-(--pixel-hover) group cursor-pointer"
                        >
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                                    <img
                                        src={Kry_Rithisak}
                                        className="w-full h-full object-cover"
                                        alt=""
                                        width="28"
                                        height="28"
                                        loading="lazy"
                                    />
                                </div>
                                <span className="text-(--text-light)">
                                    Kry-Rithisak/<span className="font-medium">{t(`projects.${p.langKey}.title`)}</span>
                                </span>
                            </div>
                            <GoArrowRight className="text-[#8b949e]" />
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => startChat(null)}
                    className="w-full flex items-center justify-between px-4 py-4 hover:bg-(--pixel-hover) border-t border-(--border-light) transition-colors cursor-pointer"
                >
                    <span className="text-sm font-medium text-(--text-light)">General purpose chat</span>
                    <GoArrowRight className="text-[#8b949e]" />
                </button>
            </div>
        </div>
    );
});

export default HomeView;
