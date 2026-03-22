import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { GoArrowRight } from "react-icons/go";
import Kry_Rithisak from '../../assets/Kry_Rithisak.jpg';

const AttachProjectModal = ({
    isOpen,
    onClose,
    filteredProjects,
    searchQuery,
    setSearchQuery,
    startChat,
    t,
}) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-[2px]">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="w-[95%] max-w-lg bg-(--pixel) border border-(--border-light) rounded-xl shadow-2xl overflow-hidden"
                >
                    <div className="p-4 border-b border-(--border-light) flex justify-between items-center">
                        <h3 className="font-semibold text-(--text-light)">Attach a Project</h3>
                        <IoClose onClick={onClose} className="cursor-pointer text-gray-400 hover:text-(--text-light)" size={20} />
                    </div>

                    <div className="p-5">
                        <div className="relative mb-4">
                            <IoSearchOutline className="absolute left-3 top-3 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search a project to attach"
                                className="w-full bg-(--pixel2) border border-(--border-light) rounded-md pl-10 pr-4 py-2 text-sm outline-none focus:border-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="max-h-[350px] overflow-y-auto github-scrollbar space-y-1">
                            {filteredProjects.length === 0 ? (
                                <p className="text-center py-10 text-sm text-gray-500">{t('portfolio.noMatches')}</p>
                            ) : (
                                <>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase px-2 py-2">Portfolio</p>
                                    {filteredProjects.map(p => (
                                        <div
                                            key={p.id}
                                            onClick={() => startChat(p)}
                                            className="flex items-center justify-between p-3 hover:bg-(--pixel-hover) rounded-lg cursor-pointer group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full overflow-hidden border border-(--border-light)">
                                                    <img src={Kry_Rithisak} className="w-full h-full object-cover" alt="" />
                                                </div>
                                                <span className="text-sm">
                                                    Kry-Rithisak/<span className="text-(--text-light) font-medium">{t(`projects.${p.langKey}.title`)}</span>
                                                </span>
                                            </div>
                                            <GoArrowRight className="text-gray-500 group-hover:text-(--text-light)" />
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="p-4 bg-(--pixel2) flex justify-between items-center">
                        <button
                            onClick={() => startChat(null)}
                            className="text-xs text-blue-500 hover:underline font-medium cursor-pointer"
                        >
                            Continue with General Purpose Chat
                        </button>
                        <button
                            onClick={onClose}
                            className="px-5 py-2 bg-(--pixel2) hover:bg-(--pixel-hover) border border-(--border-light) rounded-md text-sm font-medium cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

export default AttachProjectModal;