import React, { memo } from 'react';
import { GoArrowRight, GoDependabot } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import Kry_Rithisak from '../../assets/Kry_Rithisak.optimized.jpg';

// memo — only re-renders when filteredProjects or searchQuery changes
const HomeView = memo(function HomeView({ filteredProjects, searchQuery, setSearchQuery, startChat, t }) {
    return (
        <div className="flex flex-col items-center p-6">
            <div className="relative w-24 h-24 flex items-center justify-center mb-6 mt-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#3fb950] via-[#ab7df8] to-[#2f81f7] animate-rotate-gradient blur-[1px]" />
                <div className="absolute inset-[3px] bg-(--pixel) rounded-full flex items-center justify-center">
                    <GoDependabot size={40} className="text-(--text-light)" />
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
