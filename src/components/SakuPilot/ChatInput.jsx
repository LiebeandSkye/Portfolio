import React from 'react';
import { motion } from 'framer-motion';
import { IoClose, IoSend, IoAttachOutline, IoDocumentOutline } from "react-icons/io5";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import Tooltip from '../ui/Tooltip';
import Textarea from 'react-textarea-autosize';

const ChatInput = ({
    inputValue,
    setInputValue,
    attachedFiles,
    removeFile,
    selectedProject,
    setSelectedProject,
    textareaRef,
    handlePaste,
    handleSendMessage,
    setIsFileModalOpen,
    t,
}) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-shrink-0 p-4 bg-(--pixel2) border-t border-(--border-light)"
    >
        {/* Attached file chips */}
        {attachedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
                {attachedFiles.map((file, idx) => (
                    <div key={idx} className="relative group bg-(--pixel) border border-(--border-light) rounded-lg p-2 flex items-center gap-2 min-w-[100px]">
                        <IoDocumentOutline className="text-(--text-gray)" size={14} />
                        <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-(--text-gray) truncate max-w-[80px]">{file.name}</span>
                            <span className="text-[9px] text-gray-500 uppercase">File</span>
                        </div>
                        <button
                            onClick={() => removeFile(idx)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                            <IoClose size={10} />
                        </button>
                    </div>
                ))}
            </div>
        )}

        {/* Active project label */}
        {selectedProject && (
            <div className="flex items-center gap-2 p-1.5 px-3 bg-(--pixel) border border-(--border-light) rounded-md w-fit text-[11px] mb-2">
                <HiOutlineCodeBracket className="text-(--text-gray)" size={12} />
                <span className="text-(--text-light)">
                    Kry-Rithisak/{t(`projects.${selectedProject.langKey}.title`)}
                </span>
                <IoClose
                    onClick={() => setSelectedProject(null)}
                    className="cursor-pointer text-(--text-gray) hover:text-(--text-light)"
                    size={12}
                />
            </div>
        )}

        {/* Input row — items-end keeps icons pinned to the bottom when textarea grows */}
        <div className="flex items-end gap-2 bg-(--pixel) border border-(--border-light) rounded-xl px-3 py-3 focus-within:ring-1 ring-blue-500 transition-all">
            <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPaste={handlePaste}
                placeholder="Ask SakuPilot"
                className="bg-transparent flex-1 text-sm outline-none overflow-y-auto overflow-x-hidden break-words github-scrollbar resize-none leading-5 placeholder:text-(--text-gray)"
                minRows={1}
                maxRows={8}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                    }
                }}
            />

            <div className="flex items-center gap-2.5 text-[#8b949e] flex-shrink-0 pb-0.5">
                <Tooltip text="Attach file" shortcut="⌘A">
                    <IoAttachOutline
                        size={20}
                        className="hover:text-(--text-light) cursor-pointer transition-colors"
                        onClick={() => setIsFileModalOpen(true)}
                    />
                </Tooltip>
                <Tooltip text="Send" shortcut="Enter">
                    <IoSend
                        size={18}
                        className={`cursor-pointer transition-colors ${
                            inputValue.trim() || attachedFiles.length > 0
                                ? 'text-blue-500 hover:text-blue-400'
                                : 'text-gray-600'
                        }`}
                        onClick={() => handleSendMessage()}
                    />
                </Tooltip>
            </div>
        </div>
    </motion.div>
);

export default ChatInput;