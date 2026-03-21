import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoSend, IoAttachOutline, IoAddOutline, IoSearchOutline, IoDocumentOutline } from "react-icons/io5";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { GoDependabot, GoArrowRight } from "react-icons/go";
import Projects from '../../Data/Projects';
import MessageContent from './MessageContent';
import { getGroqResponse } from '../../Utils/groq';
import { useLanguage } from '../Header/Lang/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import Kry_Rithisak from '../../assets/Kry_Rithisak.jpg';
import Tooltip from '../ui/Tooltip';
import Textarea from 'react-textarea-autosize';
const SakuPilot = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const [view, setView] = useState('home');
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFileModalOpen, setIsFileModalOpen] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [messages, setMessages] = useState([]);
    const fileInputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);
    const [stagedFiles, setStagedFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const { addNotification } = useNotification();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const textareaRef = useRef(null);
    const [typingIndex, setTypingIndex] = useState(null);
    const [typedText, setTypedText] = useState("");

    const filteredProjects = Projects.filter(p =>
        t(`projects.${p.langKey}.title`).toLowerCase().includes(searchQuery.toLowerCase())
    );
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };
    const isNearBottom = () => {
        const container = messagesEndRef.current?.parentElement;
        if (!container) return true;

        return container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);
    // NOTE SAMJCBHHH
    const handleSendMessage = async () => {
        if (!inputValue.trim() && attachedFiles.length === 0) return;

        setIsThinking(true);

        let fileContext = "";
        if (attachedFiles.length > 0) {
            const fileContents = await Promise.all(
                attachedFiles.map(async (file) => {
                    const content = await readFileContent(file);
                    return `--- FILE: ${file.name} ---\n${content}\n--- END FILE ---`;
                })
            );
            fileContext = "\n\nAttached Files:\n" + fileContents.join("\n\n");
        }

        const fullMessageContent = `${inputValue}${fileContext}`;

        const userDisplayMessage = {
            role: "user",
            content: inputValue || `Uploaded ${attachedFiles.length} file(s)`
        };

        setMessages(prev => [...prev, userDisplayMessage]);

        setInputValue("");
        setAttachedFiles([]);

        const projectContext = selectedProject ? {
            title: t(`projects.${selectedProject.langKey}.title`),
            tech: selectedProject.tech?.join(", "),
            role: "Developer"
        } : null;

        // Api calling
        const response = await getGroqResponse(fullMessageContent, messages, projectContext);

        setIsThinking(false);

        setMessages(prev => {
            const newIndex = prev.length;

            setTypingIndex(newIndex);
            setTypedText("");

            return [...prev, { role: "assistant", content: response }];
        });
    };

    useEffect(() => {
        if (typingIndex === null) return;

        const fullText = messages[typingIndex]?.content;
        if (!fullText) return;

        let currentIndex = 0;
        const chunkSize = 2; // increase for faster speed
        const intervalTime = 20; // ms per tick

        const interval = setInterval(() => {
            currentIndex += chunkSize;
            setTypedText(fullText.slice(0, currentIndex));

            if (isNearBottom()) {
                messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
            }

            if (currentIndex >= fullText.length) {
                clearInterval(interval);
                setTypingIndex(null);
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, [typingIndex, messages]);

    const startChat = (project) => {
        setSelectedProject(project);
        setView('chat');
        setIsModalOpen(false);
        setSearchQuery("");
    };
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const allowedTypes = ['text/css', 'text/html', 'application/javascript', 'application/json', 'text/plain'];

        const newStagedFiles = [];

        files.forEach(file => {
            const extOk = /\.(js|jsx|ts|tsx|css|html|py|json)$/i.test(file.name);
            const mimeOk = allowedTypes.includes(file.type);

            if (!extOk && !mimeOk) {
                addNotification("File type is not supported", "error");
                return;
            }

            newStagedFiles.push(file);
        });

        if (newStagedFiles.length > 0) {
            setStagedFiles(prev => [...prev, ...newStagedFiles]);
        }
    };

    useEffect(() => {
        const handleDrag = (e) => {
            if (e.target.tagName === 'IMG') {
                addNotification("File type is not supported", "error");
            }
        };
        window.addEventListener('dragstart', handleDrag);
        return () => window.removeEventListener('dragstart', handleDrag);
    }, []);

    const confirmUpload = () => {
        if (stagedFiles.length === 0) return;

        setIsUploading(true);

        setTimeout(() => {
            setAttachedFiles(prev => [...prev, ...stagedFiles]);
            setStagedFiles([]);
            setIsUploading(false);
            setIsFileModalOpen(false);
        }, 1500);
    };
    const removeFile = (index) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index));
    };
    useEffect(() => {
        if (isModalOpen || isFileModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isModalOpen, isFileModalOpen]); // FileModal
    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    };
    const handleStartNewChat = () => {
        if (messages.length > 0) {
            setIsConfirmModalOpen(true);
        } else {
            setView('home');
        }
    };

    const confirmNewChat = () => {
        setMessages([]);
        setSelectedProject(null);
        setView('home');
        setIsConfirmModalOpen(false);
    };
    return (
        <>
            {/* --- MAIN CHAT POPOVER (Bottom Right) --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 40 }}
                        className="fixed bottom-0 right-0 md:bottom-2 md:right-3 w-full h-full md:w-[580px] md:h-[620px] bg-(--pixel2) border-t md:border border-(--border-light) md:rounded-xl flex flex-col z-[100] text-[#e6edf3] "
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-(--border-light) flex justify-between items-center">
                            <span className="text-sm font-semibold text-(--text-light)">Quick chat</span>
                            <div className="flex items-center gap-1">
                                <Tooltip text='Start a new conversation'>
                                    <button onClick={handleStartNewChat} className="p-1.5 hover:bg-(--pixel-hover) rounded-md transition-colors cursor-pointer text-(--text-light)">
                                        <IoAddOutline size={20} />
                                    </button>
                                </Tooltip>
                                {/* THIS BUTTON OPENS THE CENTER MODAL */}
                                <Tooltip text='View Project List'>
                                    <button onClick={() => setIsModalOpen(true)} className="p-1.5 hover:bg-(--pixel-hover) rounded-md transition-colors cursor-pointer text-(--text-light)">
                                        <HiOutlineCodeBracket size={18} />
                                    </button>
                                </Tooltip>
                                <Tooltip text='Close'>
                                    <button onClick={onClose} className="p-1.5 hover:bg-(--pixel-hover) rounded-md transition-colors ml-1 cursor-pointer text-(--text-light)">
                                        <IoClose size={20} />
                                    </button>
                                </Tooltip>
                            </div>
                        </div>

                        {/* Content Area (Same as previous Home/Chat logic) */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {view === 'home' ? (
                                <div className="flex flex-col items-center p-6">
                                    <div className="relative w-24 h-24 flex items-center justify-center mb-6 mt-4">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#3fb950] via-[#ab7df8] to-[#2f81f7] animate-rotate-gradient blur-[1px]"></div>
                                        <div className="absolute inset-[3px] bg-(--pixel) rounded-full flex items-center justify-center">
                                            <GoDependabot size={40} className="text-(--text-light)" />
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3 text-(--text-light)">Ask SakuPilot</h2>
                                    <p className="text-center text-[#8b949e] text-[14px] px-4 mb-8">Select one of my projects to get started.</p>

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
                                                <button key={p.id} onClick={() => startChat(p)} className="w-full flex items-center justify-between px-4 py-2 hover:bg-(--pixel-hover) group cursor-pointer">
                                                    <div className="flex items-center gap-3 text-sm">
                                                        <div className='w-7 h-7 rounded-full flex items-center justify-center'>
                                                            <img src={Kry_Rithisak} className="w-full h-full rounded-full object-cover" />
                                                        </div>
                                                        <span className='text-(--text-light)'>Kry-Rithisak/<span className="text-(--text-light)">{t(`projects.${p.langKey}.title`)}</span></span>
                                                    </div>
                                                    <GoArrowRight className="text-[#8b949e]" />
                                                </button>
                                            ))}
                                        </div>
                                        {/* Restoration of General Purpose Chat Button */}
                                        <button
                                            onClick={() => startChat(null)}
                                            className="w-full flex items-center justify-between px-4 py-4 hover:bg-(--pixel-hover) border-t border-(--border-light) transition-colors cursor-pointer"
                                        >
                                            <span className="text-sm font-medium text-(--text-light)">General purpose chat</span>
                                            <GoArrowRight className="text-[#8b949e]" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className='sticky top-0 z-10 bg-(--pixel2) p-2'>
                                        <p className="text-center text-[11px] text-[#8b949e]">SakuPilot uses AI. Check for mistakes.</p>
                                    </div>

                                    <div className="flex flex-col gap-4 px-4">
                                        {/* Render Messages */}
                                        {messages.map((msg, i) => {
                                            const isTyping = i === typingIndex;

                                            return (
                                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[85%] p-3 rounded-lg text-sm space-y-1.5 break-words min-h-[1.5em] ${msg.role === 'user' ? 'bg-(--pixel)' : ''}`}>

                                                        {/* Always use MessageContent so it formats LIVE! */}
                                                        <MessageContent
                                                            content={isTyping ? typedText + "▌" : msg.content}
                                                        />

                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Thinking State */}
                                        {isThinking && (
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-(--pixel2) flex items-center justify-center">
                                                    <GoDependabot size={14} className="text-(--sucess)" />
                                                </div>
                                                <span className="animate-thinking text-sm font-medium italic">SakuPilot is thinking...</span>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div >
                                </div>
                            )}
                        </div>

                        {/* Footer - Input Bar */}
                        {view !== 'home' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-(--pixel2)"
                            >
                                {/* Multi-File Preview Chips */}
                                {attachedFiles.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {attachedFiles.map((file, idx) => (
                                            <div key={idx} className="relative group bg-(--pixel) border border-(--border-light) rounded-lg p-2 flex items-center gap-2 min-w-[100px]">
                                                <IoDocumentOutline className="text-(--text-gray)" />
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] font-bold text-(--text-gray) truncate max-w-[80px]">{file.name}</span>
                                                    <span className="text-[9px] text-gray-500 uppercase">File</span>
                                                </div>
                                                <button
                                                    onClick={() => removeFile(idx)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                                >
                                                    <IoClose size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Project Label */}
                                {selectedProject && (
                                    <div className="flex items-center gap-2 p-1.5 px-3 bg-(--pixel) border border-(--border-light) rounded-md w-fit text-[11px] mb-2">
                                        <HiOutlineCodeBracket className="text-(--text-gray)" />
                                        <span className='text-(--text-light)'>Kry-Rithisak/{t(`projects.${selectedProject.langKey}.title`)}</span>
                                        <IoClose onClick={() => setSelectedProject(null)} className="cursor-pointer text-(--text-light)" />
                                    </div>
                                )}

                                {/* Input Bar */}
                                <div className="relative flex items-center bg-(--pixel) border border-(--border-light) rounded-xl px-3 py-3 focus-within:ring-1 ring-blue-500 transition-all">
                                    <Textarea
                                        ref={textareaRef}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Ask SakuPilot"
                                        className="bg-transparent w-full text-sm outline-none overflow-y-auto github-scrollbar resize-none"
                                        minRows={1}
                                        maxRows={10}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage();
                                            }
                                        }}
                                    />
                                    <div className="flex items-center gap-3 text-[#8b949e]">
                                        <Tooltip text='Attach a code or txt files' shortcut='⌘+A'>
                                            <IoAttachOutline
                                                size={22}
                                                className="hover:text-(--text-light) cursor-pointer"
                                                onClick={() => setIsFileModalOpen(true)}
                                            />
                                        </Tooltip>
                                        <Tooltip text='Send now' shortcut='⌘+Enter'>
                                            <IoSend
                                                size={20}
                                                className={`cursor-pointer transition-colors ${inputValue.trim() || attachedFiles.length > 0
                                                    ? 'text-blue-500 hover:text-blue-400'
                                                    : 'text-gray-600'
                                                    }`}
                                                onClick={handleSendMessage}
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- ATTACH PROJECT --- */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-[2px]">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-[95%] max-w-lg bg-(--pixel) border border-(--border-light) rounded-xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-4 border-b border-(--border-light) flex justify-between items-center">
                                <h3 className="font-semibold text-(--text-light)">Attach a Project</h3>
                                <IoClose onClick={() => setIsModalOpen(false)} className="cursor-pointer text-gray-400 hover:text-white" size={20} />
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
                                                        <div className='w-8 h-8 flex items-center justify-center'>
                                                            <img src={Kry_Rithisak} className="w-full h-full rounded-full border border-(--border-light) object-cover" alt="" />
                                                        </div>
                                                        <span className="text-sm">Kry-Rithisak/<span className="text-(--text-light) font-medium">{t(`projects.${p.langKey}.title`)}</span></span>
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
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2 bg-(--pixel2) hover:bg-(--pixel-hover) border border-(--border-light) rounded-md text-sm font-medium cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isFileModalOpen && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 backdrop-blur-[2px]">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-[90%] max-w-md bg-(--pixel) border border-(--border-light) rounded-xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-4 border-b border-(--border-light) flex justify-between items-center">
                                <h3 className="text-md font-semibold text-(--text-light)">Attach a File</h3>
                                <IoClose
                                    onClick={() => { setIsFileModalOpen(false); setStagedFiles([]); }}
                                    className="cursor-pointer text-gray-400 hover:text-white"
                                    size={20}
                                />
                            </div>

                            <div className="p-6">
                                {/* Upload Area / File List */}
                                <div className="min-h-[120px] mb-6 flex flex-col items-center justify-center border-2 border-dashed border-[#30363d] rounded-lg bg-(--pixel2) hover:border-[#444c56] transition-colors relative">
                                    {isUploading ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                            <p className="text-xs text-gray-400">Uploading {stagedFiles.length} file(s)...</p>
                                        </div>
                                    ) : stagedFiles.length > 0 ? (
                                        <div className="w-full p-2 space-y-2">
                                            {stagedFiles.map((file, idx) => (
                                                <div key={idx} className="flex items-center justify-between bg-(--pixel) border border-(--border-light) rounded-md px-3 py-2">
                                                    <div className="flex items-center gap-2">
                                                        <IoDocumentOutline className="text-gray-400" />
                                                        <span className="text-sm text-(--text-light) truncate max-w-[200px]">{file.name}</span>
                                                    </div>
                                                    <IoClose
                                                        size={16}
                                                        className="text-gray-500 hover:text-red-400 cursor-pointer"
                                                        onClick={() => setStagedFiles(prev => prev.filter((_, i) => i !== idx))}
                                                    />
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => fileInputRef.current.click()}
                                                className="w-full text-xs text-blue-500 hover:underline py-1 cursor-pointer"
                                            >
                                                + Add more files
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center p-4 cursor-pointer w-full h-full" onClick={() => fileInputRef.current.click()}>
                                            <IoAttachOutline size={30} className="mx-auto text-gray-500 mb-2" />
                                            <p className="text-sm text-gray-400">Click to select text or code files</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        multiple
                                        onChange={handleFileUpload}
                                    />
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        disabled={isUploading}
                                        onClick={() => { setIsFileModalOpen(false); setStagedFiles([]); }}
                                        className="px-4 py-2 text-sm text-gray-400 hover:text-(--text-light) transition-colors disabled:opacity-50 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={stagedFiles.length === 0 || isUploading}
                                        onClick={confirmUpload}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${stagedFiles.length > 0
                                            ? 'bg-[#238636] hover:bg-[#2ea043] text-(--text-light)'
                                            : 'bg-(--pixel-hover) text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {isUploading ? 'Uploading...' : 'Upload'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* --- start new chat or nah --- */}
            <AnimatePresence>
                {isConfirmModalOpen && (
                    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/80 backdrop-blur-[2px]">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-[90%] max-w-[400px] bg-(--pixel2) border border-(--border-light) rounded-xl shadow-2xl p-6"
                        >
                            <h3 className="text-xl font-bold text-(--text-light) mb-4">Are you sure?</h3>
                            <p className="text-(--text-light) text-sm mb-8 leading-relaxed">
                                Your current conversation with SakuPilot will be lost and cannot be recovered.
                            </p>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setIsConfirmModalOpen(false)}
                                    className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-(--border-light) text-(--text-light) hover:bg-(--pixel-hover) transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmNewChat}
                                    className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-(--text-light) text-(--text-dark)  hover:bg-(--pixel-hover2) transition-colors cursor-pointer"
                                >
                                    I'm sure
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SakuPilot;