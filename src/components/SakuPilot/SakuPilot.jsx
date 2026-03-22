import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoClose, IoAddOutline } from "react-icons/io5";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { GoDependabot } from "react-icons/go";

import Projects from '../../Data/Projects';
import { getGroqResponse } from '../../Utils/groq';
import { useLanguage } from '../Header/Lang/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import Tooltip from '../ui/Tooltip';

import HomeView from './HomeView';
import ChatView from './ChatView';
import ChatInput from './ChatInput';
import AttachProjectModal from './AttachProjectModal';
import AttachFileModal from './AttachFileModal';
import ConfirmNewChatModal from './ConfirmNewChatModal';

const SakuPilot = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const [view, setView] = useState('home');
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFileModalOpen, setIsFileModalOpen] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [stagedFiles, setStagedFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [typingIndex, setTypingIndex] = useState(null);
    const [typedText, setTypedText] = useState('');

    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const textareaRef = useRef(null);
    const userScrolledUp = useRef(false);
    const lastScrollTop = useRef(0);

    const filteredProjects = Projects.filter(p =>
        t(`projects.${p.langKey}.title`).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const suggestedQuestions = (() => {
        if (!selectedProject) return [];
        const fromT = t(`projects.${selectedProject.langKey}.botQuestions`);
        if (Array.isArray(fromT)) return fromT;
        return [
            t('bot.whatIsAbout') || 'What is this project about?',
            t('bot.techStack')   || 'What tech stack was used?',
            t('bot.role')        || 'What was your role?',
        ];
    })();

    // ─── Scroll ───────────────────────────────────────────────────────────────
    const isNearBottom = useCallback(() => {
        const c = messagesContainerRef.current;
        if (!c) return true;
        return c.scrollHeight - c.scrollTop - c.clientHeight < 120;
    }, []);

    const scrollToBottom = useCallback((force = false) => {
        if (force || !userScrolledUp.current) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const handleScroll = useCallback(() => {
        const c = messagesContainerRef.current;
        if (!c) return;
        const scrollingUp = c.scrollTop < lastScrollTop.current;
        lastScrollTop.current = c.scrollTop;
        if (scrollingUp && !isNearBottom()) userScrolledUp.current = true;
        else if (isNearBottom()) userScrolledUp.current = false;
    }, [isNearBottom]);

    useEffect(() => {
        if (!messages.length) return;
        if (messages[messages.length - 1]?.role === 'user') {
            userScrolledUp.current = false;
            scrollToBottom(true);
        }
    }, [messages, scrollToBottom]);

    useEffect(() => {
        if (isThinking) scrollToBottom();
    }, [isThinking, scrollToBottom]);

    // ─── Mobile-only body lock ────────────────────────────────────────────────
    useEffect(() => {
        const isMobile = () => window.innerWidth < 768;
        if (isOpen && isMobile()) {
            const scrollY = window.scrollY;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${scrollY}px`;
        } else {
            const top = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            if (top) window.scrollTo(0, -parseInt(top));
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
        };
    }, [isOpen]);

    // ─── Navigation ───────────────────────────────────────────────────────────
    const handleNavigate = useCallback((path) => {
        onClose();
        setTimeout(() => navigate(path), 150);
    }, [onClose, navigate]);

    // ─── Send ─────────────────────────────────────────────────────────────────
    const handleSendMessage = useCallback(async (textOverride) => {
        const text = typeof textOverride === 'string' ? textOverride : inputValue;
        if (!text.trim() && attachedFiles.length === 0) return;

        setIsThinking(true);
        let fileContext = '';
        const filesMeta = attachedFiles.map(f => ({ name: f.name }));

        if (attachedFiles.length > 0) {
            const contents = await Promise.all(
                attachedFiles.map(async (file) => {
                    const c = await readFileContent(file);
                    return `--- FILE: ${file.name} ---\n${c}\n--- END FILE ---`;
                })
            );
            fileContext = '\n\nAttached Files:\n' + contents.join('\n\n');
        }

        setMessages(prev => [...prev, {
            role: 'user',
            content: text || `Uploaded ${attachedFiles.length} file(s)`,
            files: filesMeta.length > 0 ? filesMeta : undefined,
        }]);
        setInputValue('');
        setAttachedFiles([]);

        const projectContext = selectedProject ? {
            title: t(`projects.${selectedProject.langKey}.title`),
            tech: selectedProject.tech?.join(', '),
            role: 'Developer',
        } : null;

        const response = await getGroqResponse(`${text}${fileContext}`, messages, projectContext);
        setIsThinking(false);

        setMessages(prev => {
            const newIndex = prev.length;
            setTypingIndex(newIndex);
            setTypedText('');
            return [...prev, { role: 'assistant', content: response }];
        });
    }, [inputValue, attachedFiles, messages, selectedProject, t]);

    // ─── Typing animation ─────────────────────────────────────────────────────
    useEffect(() => {
        if (typingIndex === null) return;
        const fullText = messages[typingIndex]?.content;
        if (!fullText) return;
        let idx = 0;
        const interval = setInterval(() => {
            idx += 4;
            setTypedText(fullText.slice(0, idx));
            if (!userScrolledUp.current || isNearBottom()) {
                messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
            }
            if (idx >= fullText.length) {
                clearInterval(interval);
                setTypingIndex(null);
            }
        }, 15);
        return () => clearInterval(interval);
    }, [typingIndex, messages, isNearBottom]);

    // ─── Chat lifecycle ───────────────────────────────────────────────────────
    const startChat = (project) => {
        setSelectedProject(project);
        setMessages([]);
        setView('chat');
        setIsModalOpen(false);
        setSearchQuery('');
    };

    const handleStartNewChat = () => {
        if (messages.length > 0) setIsConfirmModalOpen(true);
        else setView('home');
    };

    const confirmNewChat = () => {
        setMessages([]);
        setSelectedProject(null);
        setView('home');
        setIsConfirmModalOpen(false);
    };

    // ─── Files ────────────────────────────────────────────────────────────────
    const handleFileUpload = (e) => {
        const allowedTypes = ['text/css', 'text/html', 'application/javascript', 'application/json', 'text/plain'];
        const next = [];
        Array.from(e.target.files).forEach(file => {
            const extOk = /\.(js|jsx|ts|tsx|css|html|py|json)$/i.test(file.name);
            if (!extOk && !allowedTypes.includes(file.type)) {
                addNotification('File type is not supported', 'error');
                return;
            }
            next.push(file);
        });
        if (next.length) setStagedFiles(prev => [...prev, ...next]);
    };

    useEffect(() => {
        const handleDrag = (e) => {
            if (e.target.tagName === 'IMG') addNotification('File type is not supported', 'error');
        };
        window.addEventListener('dragstart', handleDrag);
        return () => window.removeEventListener('dragstart', handleDrag);
    }, []);

    const confirmUpload = () => {
        if (!stagedFiles.length) return;
        setIsUploading(true);
        setTimeout(() => {
            setAttachedFiles(prev => [...prev, ...stagedFiles]);
            setStagedFiles([]);
            setIsUploading(false);
            setIsFileModalOpen(false);
        }, 1500);
    };

    const removeFile = (i) => setAttachedFiles(prev => prev.filter((_, idx) => idx !== i));

    const readFileContent = (file) => new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = e => res(e.target.result);
        r.onerror = rej;
        r.readAsText(file);
    });

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        setInputValue(inputValue.slice(0, start) + text + inputValue.slice(end));
        requestAnimationFrame(() => {
            if (textareaRef.current) {
                textareaRef.current.setSelectionRange(start + text.length, start + text.length);
            }
        });
    };

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 40 }}
                        className="fixed inset-0 md:inset-auto md:bottom-2 md:right-3 md:w-[580px] md:h-[640px]
                            bg-(--pixel2) border-t md:border border-(--border-light)
                            md:rounded-xl flex flex-col z-[100] text-[#e6edf3] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex-shrink-0 p-4 border-b border-(--border-light) flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-(--text-light)">Quick chat</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Tooltip text="Start a new conversation">
                                    <button onClick={handleStartNewChat} className="p-1.5 hover:bg-(--pixel-hover) rounded-md transition-colors cursor-pointer text-(--text-light)">
                                        <IoAddOutline size={20} />
                                    </button>
                                </Tooltip>
                                <Tooltip text="View Project List">
                                    <button onClick={() => setIsModalOpen(true)} className="p-1.5 hover:bg-(--pixel-hover) rounded-md transition-colors cursor-pointer text-(--text-light)">
                                        <HiOutlineCodeBracket size={18} />
                                    </button>
                                </Tooltip>
                                <Tooltip text="Close">
                                    <button onClick={onClose} className="p-1.5 hover:bg-(--pixel-hover) rounded-md transition-colors ml-1 cursor-pointer text-(--text-light)">
                                        <IoClose size={20} />
                                    </button>
                                </Tooltip>
                            </div>
                        </div>

                        {/* Scrollable content */}
                        <div
                            ref={messagesContainerRef}
                            onScroll={handleScroll}
                            className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar min-h-0"
                        >
                            {view === 'home' ? (
                                <HomeView
                                    filteredProjects={filteredProjects}
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    startChat={startChat}
                                    t={t}
                                />
                            ) : (
                                <ChatView
                                    messages={messages}
                                    typingIndex={typingIndex}
                                    typedText={typedText}
                                    isThinking={isThinking}
                                    suggestedQuestions={suggestedQuestions}
                                    selectedProject={selectedProject}
                                    handleSendMessage={handleSendMessage}
                                    handleNavigate={handleNavigate}
                                    messagesEndRef={messagesEndRef}
                                    t={t}
                                />
                            )}
                        </div>

                        {/* Footer */}
                        {view !== 'home' && (
                            <ChatInput
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                                attachedFiles={attachedFiles}
                                removeFile={removeFile}
                                selectedProject={selectedProject}
                                setSelectedProject={setSelectedProject}
                                textareaRef={textareaRef}
                                handlePaste={handlePaste}
                                handleSendMessage={handleSendMessage}
                                setIsFileModalOpen={setIsFileModalOpen}
                                t={t}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <AttachProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                filteredProjects={filteredProjects}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                startChat={startChat}
                t={t}
            />

            <AttachFileModal
                isOpen={isFileModalOpen}
                onClose={() => setIsFileModalOpen(false)}
                stagedFiles={stagedFiles}
                setStagedFiles={setStagedFiles}
                isUploading={isUploading}
                confirmUpload={confirmUpload}
                fileInputRef={fileInputRef}
                handleFileUpload={handleFileUpload}
            />

            <ConfirmNewChatModal
                isOpen={isConfirmModalOpen}
                onCancel={() => setIsConfirmModalOpen(false)}
                onConfirm={confirmNewChat}
            />
        </>
    );
};

export default SakuPilot;