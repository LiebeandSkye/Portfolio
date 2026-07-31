import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoClose, IoAddOutline } from "react-icons/io5";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { GoDependabot } from "react-icons/go";

import Projects from '../../Data/Projects';
import { getGroqResponse } from '../../Utils/groq';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import Tooltip from '../ui/Tooltip';

import HomeView from './HomeView';
import ChatView from './ChatView';
import TypingMessage from './TypingMessage';
import ChatInput from './ChatInput';
import AttachProjectModal from './AttachProjectModal';
import AttachFileModal from './AttachFileModal';
import ConfirmNewChatModal from './ConfirmNewChatModal';

// ─────────────────────────────────────────────────────────────────────────────
// SakuPilot — optimised
//
// Key change: `typingMessage` is a *separate* state from `messages`.
// During typing, only <TypingMessage> re-renders (every 30ms).
// <ChatView> only re-renders when a complete message is committed to `messages`.
// This eliminates the main source of lag: previously, every 15ms tick caused
// ALL past messages + markdown re-renders.
// ─────────────────────────────────────────────────────────────────────────────

const SakuPilot = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const [view, setView]                       = useState('home');
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchQuery, setSearchQuery]         = useState('');
    const [isModalOpen, setIsModalOpen]         = useState(false);
    const [isFileModalOpen, setIsFileModalOpen] = useState(false);
    const [isThinking, setIsThinking]           = useState(false);
    const [attachedFiles, setAttachedFiles]     = useState([]);
    const [messages, setMessages]               = useState([]);
    const [inputValue, setInputValue]           = useState('');
    const [stagedFiles, setStagedFiles]         = useState([]);
    const [isUploading, setIsUploading]         = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    // ── Separate typing state — ONLY TypingMessage subscribes to this ──────────
    // `messages` never changes during typing → ChatView never re-renders during it
    const [typingMessage, setTypingMessage] = useState(null); // { content: string } | null

    const fileInputRef          = useRef(null);
    const messagesEndRef        = useRef(null);
    const messagesContainerRef  = useRef(null);
    const textareaRef           = useRef(null);
    const userScrolledUp        = useRef(false);
    const lastScrollTop         = useRef(0);
    // Throttle scroll — only scroll once per animation frame during typing
    const scrollRafRef          = useRef(null);

    // ── Derived (memoized) ────────────────────────────────────────────────────
    const filteredProjects = useMemo(
        () => Projects.filter(p =>
            t(`projects.${p.langKey}.title`).toLowerCase().includes(searchQuery.toLowerCase())
        ),
        [searchQuery, t]
    );

    const suggestedQuestions = useMemo(() => {
        if (!selectedProject) return [];
        const fromT = t(`projects.${selectedProject.langKey}.botQuestions`);
        if (Array.isArray(fromT)) return fromT;
        return [
            t('bot.whatIsAbout') || 'What is this project about?',
            t('bot.techStack')   || 'What tech stack was used?',
            t('bot.role')        || 'What was your role?',
        ];
    }, [selectedProject, t]);

    // ── Scroll helpers ────────────────────────────────────────────────────────
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

    // RAF-throttled scroll called during typing
    const scheduleScroll = useCallback(() => {
        if (scrollRafRef.current) return; // already scheduled this frame
        scrollRafRef.current = requestAnimationFrame(() => {
            scrollRafRef.current = null;
            if (!userScrolledUp.current || isNearBottom()) {
                messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
            }
        });
    }, [isNearBottom]);

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

    // ── Mobile body lock ──────────────────────────────────────────────────────
    useEffect(() => {
        const isMobile = () => window.innerWidth < 768;
        if (isOpen && isMobile()) {
            const y = window.scrollY;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width    = '100%';
            document.body.style.top      = `-${y}px`;
        } else {
            const top = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width    = '';
            document.body.style.top      = '';
            if (top) window.scrollTo(0, -parseInt(top));
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width    = '';
            document.body.style.top      = '';
        };
    }, [isOpen]);

    // ── Navigation ────────────────────────────────────────────────────────────
    const handleNavigate = useCallback((path) => {
        onClose();
        setTimeout(() => navigate(path), 150);
    }, [onClose, navigate]);

    // ── Send message ──────────────────────────────────────────────────────────
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

        // Use a snapshot of messages BEFORE the user msg was added
        // (the setMessages above is async in React 18, so we pass the pre-update array)
        const response = await getGroqResponse(`${text}${fileContext}`, messages, projectContext);
        setIsThinking(false);

        // Start typing animation — does NOT touch `messages` yet
        setTypingMessage({ fullText: response, displayText: '' });
    }, [inputValue, attachedFiles, messages, selectedProject, t]);

    // ── Typing animation — runs in isolation, only TypingMessage re-renders ───
    // Interval: 30ms (was 15ms) — still ~60 chars/sec, imperceptible difference
    // Scroll: RAF-throttled — max once per frame (~16ms) instead of every 15ms
    useEffect(() => {
        if (!typingMessage) return;
        const { fullText } = typingMessage;
        let idx = 0;

        const interval = setInterval(() => {
            idx += 4; // characters per tick
            const displayText = fullText.slice(0, idx);
            setTypingMessage({ fullText, displayText });
            scheduleScroll();

            if (idx >= fullText.length) {
                clearInterval(interval);
                // Commit finished message to main array — ChatView re-renders once
                setMessages(prev => [...prev, { role: 'assistant', content: fullText }]);
                setTypingMessage(null);
            }
        }, 30);

        return () => {
            clearInterval(interval);
            if (scrollRafRef.current) {
                cancelAnimationFrame(scrollRafRef.current);
                scrollRafRef.current = null;
            }
        };
    }, [typingMessage, scheduleScroll]); // only restarts on NEW message

    // ── Chat lifecycle ────────────────────────────────────────────────────────
    const startChat = useCallback((project) => {
        setSelectedProject(project);
        setMessages([]);
        setTypingMessage(null);
        setView('chat');
        setIsModalOpen(false);
        setSearchQuery('');
    }, []);

    const handleStartNewChat = useCallback(() => {
        if (messages.length > 0) setIsConfirmModalOpen(true);
        else setView('home');
    }, [messages.length]);

    const confirmNewChat = useCallback(() => {
        setMessages([]);
        setTypingMessage(null);
        setSelectedProject(null);
        setView('home');
        setIsConfirmModalOpen(false);
    }, []);

    // ── File handling ─────────────────────────────────────────────────────────
    const handleFileUpload = useCallback((e) => {
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
    }, [addNotification]);

    useEffect(() => {
        const handleDrag = (e) => {
            if (e.target.tagName === 'IMG') addNotification('File type is not supported', 'error');
        };
        window.addEventListener('dragstart', handleDrag);
        return () => window.removeEventListener('dragstart', handleDrag);
    }, [addNotification]);

    const confirmUpload = useCallback(() => {
        if (!stagedFiles.length) return;
        setIsUploading(true);
        setTimeout(() => {
            setAttachedFiles(prev => [...prev, ...stagedFiles]);
            setStagedFiles([]);
            setIsUploading(false);
            setIsFileModalOpen(false);
        }, 1500);
    }, [stagedFiles]);

    const removeFile = useCallback(
        (i) => setAttachedFiles(prev => prev.filter((_, idx) => idx !== i)),
        []
    );

    const readFileContent = (file) => new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = e => res(e.target.result);
        r.onerror = rej;
        r.readAsText(file);
    });

    const handlePaste = useCallback((e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        const start = e.target.selectionStart;
        const end   = e.target.selectionEnd;
        setInputValue(v => v.slice(0, start) + text + v.slice(end));
        requestAnimationFrame(() => {
            textareaRef.current?.setSelectionRange(start + text.length, start + text.length);
        });
    }, []);

    // ── Stable modal close handlers ───────────────────────────────────────────
    const closeModal         = useCallback(() => setIsModalOpen(false),     []);
    const closeFileModal     = useCallback(() => setIsFileModalOpen(false),  []);
    const cancelConfirm      = useCallback(() => setIsConfirmModalOpen(false), []);
    const openProjectModal   = useCallback(() => setIsModalOpen(true),      []);

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
                                <div className="w-6 h-6 rounded-full bg-(--pixel) border border-(--border-light) flex items-center justify-center">
                                    <GoDependabot size={14} className="text-(--sucess)" />
                                </div>
                                <span className="text-sm font-semibold text-(--text-light)">SakuPilot</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Tooltip text="New conversation">
                                    <button onClick={handleStartNewChat} className="p-1.5 hover:bg-(--pixel-hover) rounded-md transition-colors cursor-pointer text-(--text-light)">
                                        <IoAddOutline size={20} />
                                    </button>
                                </Tooltip>
                                <Tooltip text="View Projects">
                                    <button onClick={openProjectModal} className="p-1.5 hover:bg-(--pixel-hover) rounded-md transition-colors cursor-pointer text-(--text-light)">
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

                        {/* Content */}
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
                                <>
                                    {/*
                                      ChatView receives only `messages` (stable between typing ticks).
                                      It re-renders ONLY when a full message is committed.
                                      TypingMessage is rendered separately and updates independently.
                                    */}
                                    <ChatView
                                        messages={messages}
                                        isThinking={isThinking}
                                        suggestedQuestions={suggestedQuestions}
                                        selectedProject={selectedProject}
                                        handleSendMessage={handleSendMessage}
                                        handleNavigate={handleNavigate}
                                        t={t}
                                    />

                                    {/* Isolated typing bubble — only this re-renders during animation */}
                                    {typingMessage && (
                                        <TypingMessage
                                            content={typingMessage.displayText + '▌'}
                                            onNavigate={handleNavigate}
                                        />
                                    )}

                                    {/* Scroll anchor */}
                                    <div ref={messagesEndRef} className="h-px" />
                                </>
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
                onClose={closeModal}
                filteredProjects={filteredProjects}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                startChat={startChat}
                t={t}
            />

            <AttachFileModal
                isOpen={isFileModalOpen}
                onClose={closeFileModal}
                stagedFiles={stagedFiles}
                setStagedFiles={setStagedFiles}
                isUploading={isUploading}
                confirmUpload={confirmUpload}
                fileInputRef={fileInputRef}
                handleFileUpload={handleFileUpload}
            />

            <ConfirmNewChatModal
                isOpen={isConfirmModalOpen}
                onCancel={cancelConfirm}
                onConfirm={confirmNewChat}
            />
        </>
    );
};

export default SakuPilot;
