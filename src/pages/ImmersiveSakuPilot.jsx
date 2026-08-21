import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import {
    FiArrowLeft,
    FiEdit3,
    FiFolder,
    FiImage,
    FiMenu,
    FiMessageSquare,
    FiPaperclip,
    FiSearch,
    FiSend,
    FiTrash2,
    FiX,
    FiMoreHorizontal,
    FiEdit2,
    FiChevronDown,
    FiCheck,
    FiAlertCircle,
    FiClock
} from 'react-icons/fi';
import { BsPinAngle, BsPinAngleFill } from 'react-icons/bs';
import { GoDependabot } from 'react-icons/go';

import GroqIcon from '../assets/Tools/chatgpt.png';
import GeminiIcon from '../assets/Models/gemini.jpg';

import Projects from '../Data/Projects';
import { useLanguage } from '../components/context/LanguageContext';
import { getGroqResponse } from '../Utils/groq';
import MessageContent from '../components/SakuPilot/MessageContent';
import BotMessage from '../components/SakuPilot/BotMessage';
import TypingMessage from '../components/SakuPilot/TypingMessage';
import AutoResizeTextarea from '../components/ui/AutoResizeTextarea';
import {
    createConversation,
    loadConversations,
    saveConversations,
    summarizeConversationTitle,
    upsertConversation,
} from '../components/SakuPilot/immersiveChatStorage';

const ImmersiveSakuPilot = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const fileInputRef = useRef(null);
    const scrollRef = useRef(null);

    const [conversations, setConversations] = useState(() => loadConversations());
    const [activeConversation, setActiveConversation] = useState(() => createConversation());
    const activeConversationRef = useRef(activeConversation);
    activeConversationRef.current = activeConversation;
    const [inputValue, setInputValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [projectContext, setProjectContext] = useState(null);
    const [dropdownOpenId, setDropdownOpenId] = useState(null);
    const [typingMessage, setTypingMessage] = useState(null);
    const [editingConversationId, setEditingConversationId] = useState(null);
    const [editTitleValue, setEditTitleValue] = useState('');
    const [selectedModel, setSelectedModel] = useState(() => {
        const saved = localStorage.getItem('sakupilot_model');
        if (saved === 'gemini') return 'gemini';
        return 'groq';
    });
    const [error, setError] = useState(null);
    const [retryCountdown, setRetryCountdown] = useState(0);

    useEffect(() => {
        localStorage.setItem('sakupilot_model', selectedModel);
    }, [selectedModel]);

    useEffect(() => {
        if (retryCountdown > 0) {
            const timer = setInterval(() => {
                setRetryCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [retryCountdown]);
    const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
    const scrollRafRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-container')) {
                setDropdownOpenId(null);
            }
            if (!event.target.closest('.model-switcher-container')) {
                setIsModelMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        // Close sidebar by default on mobile
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    }, []);

    const filteredConversations = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return conversations;
        return conversations.filter((conversation) =>
            conversation.title.toLowerCase().includes(query) ||
            conversation.messages.some((message) => message.content.toLowerCase().includes(query))
        );
    }, [conversations, searchQuery]);

    const { pinnedConversations, recentConversations } = useMemo(() => {
        const pinned = [];
        const recent = [];
        filteredConversations.forEach((conv) => {
            if (conv.pinned) {
                pinned.push(conv);
            } else {
                recent.push(conv);
            }
        });
        const sortByDate = (a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
        pinned.sort(sortByDate);
        recent.sort(sortByDate);
        return { pinnedConversations: pinned, recentConversations: recent };
    }, [filteredConversations]);

    const projectOptions = useMemo(() => Projects.map((project) => ({
        ...project,
        displayTitle: t(`projects.${project.langKey}.title`),
    })), [t]);

    useEffect(() => {
        saveConversations(conversations);
    }, [conversations]);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }, [activeConversation.messages, isThinking]);

    const persistActiveConversation = useCallback((conversation) => {
        setActiveConversation(conversation);
        if (conversation.messages.length > 0) {
            setConversations((prev) => upsertConversation(prev, conversation));
        }
    }, []);
    const persistActiveConversationRef = useRef(persistActiveConversation);
    persistActiveConversationRef.current = persistActiveConversation;

    const handleGoBack = useCallback(() => {
        if (window.history.length > 1) navigate(-1);
        else navigate('/portfolio');
    }, [navigate]);

    const handleNewChat = useCallback(() => {
        setActiveConversation(createConversation());
        setAttachments([]);
        setInputValue('');
        setProjectContext(null);
        if (window.innerWidth < 768) setIsSidebarOpen(false);
        setIsSearchOpen(false);
    }, []);

    const handleNavigate = useCallback((path) => {
        navigate(path);
    }, [navigate]);

    const handleSelectConversation = useCallback((conversation) => {
        setActiveConversation(conversation);
        setAttachments([]);
        setProjectContext(null);
        if (window.innerWidth < 768) setIsSidebarOpen(false);
        setIsSearchOpen(false);
    }, []);

    const handleDeleteConversation = useCallback((conversationId) => {
        setConversations((prev) => prev.filter((conversation) => conversation.id !== conversationId));
        if (activeConversation.id === conversationId) {
            setActiveConversation(createConversation());
        }
        setDropdownOpenId(null);
    }, [activeConversation.id]);

    const handlePinConversation = useCallback((conversationId) => {
        setConversations((prev) => prev.map(c => c.id === conversationId ? { ...c, pinned: !c.pinned } : c));
        if (activeConversation.id === conversationId) {
            setActiveConversation((prev) => ({ ...prev, pinned: !prev.pinned }));
        }
        setDropdownOpenId(null);
    }, [activeConversation.id]);

    const handleRenameConversation = useCallback((conversationId, currentTitle) => {
        setEditingConversationId(conversationId);
        setEditTitleValue(currentTitle);
        setDropdownOpenId(null);
    }, []);

    const handleSaveRename = useCallback((conversationId) => {
        if (editTitleValue.trim()) {
            setConversations((prev) => prev.map(c => c.id === conversationId ? { ...c, title: editTitleValue.trim() } : c));
            if (activeConversation.id === conversationId) {
                setActiveConversation((prev) => ({ ...prev, title: editTitleValue.trim() }));
            }
        }
        setEditingConversationId(null);
    }, [activeConversation.id, editTitleValue]);

    const handleCancelRename = useCallback(() => {
        setEditingConversationId(null);
    }, []);

    const handleProjectSelect = useCallback((project) => {
        setProjectContext({
            title: project.displayTitle,
            tech: project.tech?.join(', '),
            role: 'Developer',
        });
        setInputValue((value) => value || `Let's talk about ${project.displayTitle}.`);
        if (window.innerWidth < 768) setIsSidebarOpen(false);
    }, []);

    const handleAttachmentChange = useCallback(async (event) => {
        const files = Array.from(event.target.files || []);
        const prepared = await Promise.all(files.map(prepareAttachment));
        setAttachments((prev) => [...prev, ...prepared.filter(Boolean)].slice(0, 6));
        event.target.value = '';
    }, []);

    const removeAttachment = useCallback((id) => {
        setAttachments((prev) => prev.filter((attachment) => attachment.id !== id));
    }, []);

    const handleSendMessage = useCallback(async (textOverride) => {
        const text = typeof textOverride === 'string' ? textOverride : inputValue;
        if (!text.trim() && attachments.length === 0) return;

        const attachmentText = attachments.map((attachment) => (
            `--- ATTACHMENT: ${attachment.name} (${attachment.type}) ---\n${attachment.content || attachment.note}\n--- END ATTACHMENT ---`
        )).join('\n\n');
        const prompt = [
            text.trim(),
            attachmentText ? `Attached context:\n${attachmentText}` : '',
        ].filter(Boolean).join('\n\n');

        const userMessage = {
            role: 'user',
            content: text.trim() || `Uploaded ${attachments.length} attachment(s)`,
            files: attachments.map(({ name, type }) => ({ name, type })),
        };

        const baseConversation = activeConversation.messages.length === 0
            ? { ...activeConversation, title: summarizeConversationTitle(userMessage.content) }
            : activeConversation;

        const nextConversation = {
            ...baseConversation,
            messages: [...baseConversation.messages, userMessage],
            updatedAt: new Date().toISOString(),
        };

        userScrolledUp.current = false;
        persistActiveConversation(nextConversation);
        const lastInput = text.trim();
        setInputValue('');
        setAttachments([]);
        setIsThinking(true);

        try {
            setError(null);
            const apiHistory = nextConversation.messages
                .slice(0, -1)
                .map(({ role, content }) => ({ role, content }));

            const response = await getGroqResponse(
                prompt,
                apiHistory,
                projectContext,
                { mode: 'immersive', model: selectedModel }
            );

            setTypingMessage({ fullText: response, displayText: '' });
        } catch (err) {
            console.error(err);
            setError(err);
            setInputValue(lastInput); // Restore input on error
            if (err.code === 'RATE_LIMIT') {
                setRetryCountdown(err.retryAfter || 60);
            }
            setIsThinking(false);
        }
    }, [activeConversation, attachments, inputValue, persistActiveConversation, projectContext, selectedModel]);

    const userScrolledUp = useRef(false);
    const lastScrollTop = useRef(0);

    const isNearBottom = useCallback(() => {
        const c = scrollRef.current;
        if (!c) return true;
        return c.scrollHeight - c.scrollTop - c.clientHeight < 120;
    }, []);

    const handleScroll = useCallback(() => {
        const c = scrollRef.current;
        if (!c) return;
        const scrollingUp = c.scrollTop < lastScrollTop.current;
        lastScrollTop.current = c.scrollTop;
        if (scrollingUp && !isNearBottom()) userScrolledUp.current = true;
        else if (isNearBottom()) userScrolledUp.current = false;
    }, [isNearBottom]);

    const scheduleScroll = useCallback(() => {
        if (scrollRafRef.current) return;
        scrollRafRef.current = requestAnimationFrame(() => {
            scrollRafRef.current = null;
            if (!userScrolledUp.current || isNearBottom()) {
                scrollRef.current?.scrollTo({
                    top: scrollRef.current.scrollHeight,
                    behavior: 'auto',
                });
            }
        });
    }, [isNearBottom]);

    useEffect(() => {
        if (!typingMessage?.fullText) return;
        const fullText = typingMessage.fullText;
        let idx = 0;

        const interval = setInterval(() => {
            idx += 12; // Fast typing like Gemini Flash
            const displayText = fullText.slice(0, idx);
            setTypingMessage({ fullText, displayText });
            scheduleScroll();

            if (idx >= fullText.length) {
                clearInterval(interval);
                const currentConv = activeConversationRef.current;
                persistActiveConversationRef.current({
                    ...currentConv,
                    messages: [...currentConv.messages, { role: 'assistant', content: fullText, isNew: true }],
                    updatedAt: new Date().toISOString(),
                });
                setTypingMessage(null);
                setIsThinking(false);
            }
        }, 15);

        return () => {
            clearInterval(interval);
            if (scrollRafRef.current) {
                cancelAnimationFrame(scrollRafRef.current);
                scrollRafRef.current = null;
            }
        };
    }, [typingMessage?.fullText, scheduleScroll]);

    return (
        <section className="flex h-full w-full overflow-hidden bg-(--light) text-(--text-light) relative border-t border-(--border-light) dark:border-(--dark-border)">
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 290, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 left-0 z-[80] border-r border-(--border-light) bg-(--pixel2) md:static shadow-xl md:shadow-none overflow-hidden"
                    >
                        <div className="w-[290px] h-full flex flex-col p-3">
                    <div className="mb-3 flex items-center justify-between px-2 py-1">
                        <div className="flex items-center gap-2 text-sm font-semibold">
                            <GoDependabot className="text-(--sucess)" />
                            SakuPilot
                        </div>
                        <button className="rounded-md p-2 hover:bg-(--pixel-hover) md:hidden" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar">
                            <FiX />
                        </button>
                    </div>

                    <button onClick={handleGoBack} className="mb-2 flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-(--pixel-hover) cursor-pointer">
                        <FiArrowLeft />
                        {t('sakupilot.immersive.goBack')}
                    </button>

                    <button onClick={handleNewChat} className="mb-2 flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-(--pixel-hover) cursor-pointer">
                        <FiEdit3 />
                        {t('sakupilot.immersive.newChat')}
                    </button>

                    <details className="group mb-2 rounded-md">
                        <summary className="flex cursor-pointer list-none items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-(--pixel-hover)">
                            <FiFolder />
                            {t('sakupilot.immersive.projects')}
                        </summary>
                        <div className="mt-1 space-y-1 pl-4">
                            {projectOptions.map((project) => (
                                <button
                                    key={project.id}
                                    onClick={() => handleProjectSelect(project)}
                                    className="w-full truncate rounded-md px-3 py-2 text-left text-xs text-(--text-gray) hover:bg-(--pixel-hover) hover:text-(--text-light) cursor-pointer"
                                >
                                    {project.displayTitle}
                                </button>
                            ))}
                        </div>
                    </details>

                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="mb-5 flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-(--pixel-hover) cursor-pointer"
                    >
                        <FiSearch className="text-(--text-gray)" />
                        {t('sakupilot.immersive.searchChat')}
                    </button>

                    <p className="px-2 pb-2 text-xs font-semibold text-(--text-gray)">{t('sakupilot.immersive.recent')}</p>
                    <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto pr-1">
                        {pinnedConversations.length === 0 && recentConversations.length === 0 ? (
                            <p className="px-2 py-3 text-xs text-(--text-gray)">{t('sakupilot.immersive.noSavedChats')}</p>
                        ) : (
                            <>
                                {pinnedConversations.length > 0 && (
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-(--text-gray)">
                                            <span className="flex items-center gap-1.5">
                                                <BsPinAngleFill size={12} className="text-(--sucess)" />
                                                {t('sakupilot.immersive.pinned') || 'Pinned'}
                                            </span>
                                            <span className="rounded-full bg-(--pixel) px-2 py-0.5 text-[10px] font-semibold text-(--text-gray)">
                                                {pinnedConversations.length}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <AnimatePresence mode="popLayout">
                                                {pinnedConversations.map((conversation) => (
                                                    <motion.div
                                                        key={conversation.id}
                                                        layout
                                                        initial={{ opacity: 0, y: -4 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        transition={{ duration: 0.18 }}
                                                        className={`group relative flex items-center gap-1 rounded-md dropdown-container ${
                                                            activeConversation.id === conversation.id ? 'bg-(--pixel-hover) font-medium' : 'hover:bg-(--pixel-hover)'
                                                        }`}
                                                    >
                                                        {editingConversationId === conversation.id ? (
                                                            <div className="flex flex-1 items-center gap-2 px-2 py-1.5">
                                                                <BsPinAngleFill className="shrink-0 text-(--sucess)" size={13} />
                                                                <input
                                                                    autoFocus
                                                                    value={editTitleValue}
                                                                    onChange={(e) => setEditTitleValue(e.target.value)}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === 'Enter') handleSaveRename(conversation.id);
                                                                        if (e.key === 'Escape') handleCancelRename();
                                                                    }}
                                                                    onBlur={() => handleSaveRename(conversation.id)}
                                                                    className="min-w-0 flex-1 border-b border-(--sucess) bg-transparent text-sm outline-none"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <button
                                                                    onClick={() => handleSelectConversation(conversation)}
                                                                    className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-left text-sm cursor-pointer"
                                                                >
                                                                    <BsPinAngleFill className="shrink-0 text-(--sucess)" size={13} />
                                                                    <span className="truncate">{conversation.title}</span>
                                                                </button>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handlePinConversation(conversation.id);
                                                                    }}
                                                                    className="rounded p-1 text-(--text-gray) opacity-100 md:opacity-0 hover:text-(--sucess) md:group-hover:opacity-100 transition-opacity cursor-pointer"
                                                                    title={t('sakupilot.immersive.unpin') || 'Unpin'}
                                                                    aria-label="Unpin chat"
                                                                >
                                                                    <BsPinAngleFill size={13} className="text-(--sucess)" />
                                                                </button>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setDropdownOpenId(dropdownOpenId === conversation.id ? null : conversation.id);
                                                                    }}
                                                                    className="mr-1 rounded p-1.5 text-(--text-gray) opacity-100 md:opacity-0 hover:text-(--text-light) md:group-hover:opacity-100 cursor-pointer"
                                                                    aria-label={`More options for ${conversation.title}`}
                                                                >
                                                                    <FiMoreHorizontal size={14} />
                                                                </button>

                                                                {dropdownOpenId === conversation.id && (
                                                                    <div className="absolute right-0 top-full z-[100] mt-1 w-40 overflow-hidden rounded-md border border-(--border-light) bg-(--pixel2) py-1 shadow-lg">
                                                                        <button
                                                                            onClick={() => handlePinConversation(conversation.id)}
                                                                            className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-(--text-light) hover:bg-(--pixel-hover) cursor-pointer"
                                                                        >
                                                                            <BsPinAngleFill size={13} className="text-(--sucess)" />
                                                                            {t('sakupilot.immersive.unpin')}
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleRenameConversation(conversation.id, conversation.title)}
                                                                            className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-(--text-light) hover:bg-(--pixel-hover) cursor-pointer"
                                                                        >
                                                                            <FiEdit2 size={12} /> {t('sakupilot.immersive.rename')}
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteConversation(conversation.id)}
                                                                            className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-red-400 hover:bg-(--pixel-hover) cursor-pointer"
                                                                        >
                                                                            <FiTrash2 size={12} /> {t('sakupilot.immersive.delete')}
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                )}

                                {pinnedConversations.length > 0 && recentConversations.length > 0 && (
                                    <div className="my-2 border-t border-(--border-light)/40" />
                                )}

                                {(recentConversations.length > 0 || pinnedConversations.length > 0) && (
                                    <div className="space-y-1">
                                        {pinnedConversations.length > 0 && (
                                            <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-(--text-gray)">
                                                {t('sakupilot.immersive.recent')}
                                            </div>
                                        )}
                                        <div className="space-y-1">
                                            <AnimatePresence mode="popLayout">
                                                {recentConversations.map((conversation) => (
                                                    <motion.div
                                                        key={conversation.id}
                                                        layout
                                                        initial={{ opacity: 0, y: -4 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        transition={{ duration: 0.18 }}
                                                        className={`group relative flex items-center gap-1 rounded-md dropdown-container ${
                                                            activeConversation.id === conversation.id ? 'bg-(--pixel-hover) font-medium' : 'hover:bg-(--pixel-hover)'
                                                        }`}
                                                    >
                                                        {editingConversationId === conversation.id ? (
                                                            <div className="flex flex-1 items-center gap-2 px-2 py-1.5">
                                                                <FiMessageSquare className="shrink-0 text-(--text-gray)" />
                                                                <input
                                                                    autoFocus
                                                                    value={editTitleValue}
                                                                    onChange={(e) => setEditTitleValue(e.target.value)}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === 'Enter') handleSaveRename(conversation.id);
                                                                        if (e.key === 'Escape') handleCancelRename();
                                                                    }}
                                                                    onBlur={() => handleSaveRename(conversation.id)}
                                                                    className="min-w-0 flex-1 border-b border-(--sucess) bg-transparent text-sm outline-none"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <button
                                                                    onClick={() => handleSelectConversation(conversation)}
                                                                    className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-left text-sm cursor-pointer"
                                                                >
                                                                    <FiMessageSquare className="shrink-0 text-(--text-gray)" />
                                                                    <span className="truncate">{conversation.title}</span>
                                                                </button>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handlePinConversation(conversation.id);
                                                                    }}
                                                                    className="rounded p-1 text-(--text-gray) opacity-0 hover:text-(--sucess) group-hover:opacity-100 transition-opacity cursor-pointer"
                                                                    title={t('sakupilot.immersive.pinchat') || 'Pin chat'}
                                                                    aria-label="Pin chat"
                                                                >
                                                                    <BsPinAngle size={13} />
                                                                </button>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setDropdownOpenId(dropdownOpenId === conversation.id ? null : conversation.id);
                                                                    }}
                                                                    className="mr-1 rounded p-1.5 text-(--text-gray) opacity-100 md:opacity-0 hover:text-(--text-light) md:group-hover:opacity-100 cursor-pointer"
                                                                    aria-label={`More options for ${conversation.title}`}
                                                                >
                                                                    <FiMoreHorizontal size={14} />
                                                                </button>

                                                                {dropdownOpenId === conversation.id && (
                                                                    <div className="absolute right-0 top-full z-[100] mt-1 w-40 overflow-hidden rounded-md border border-(--border-light) bg-(--pixel2) py-1 shadow-lg">
                                                                        <button
                                                                            onClick={() => handlePinConversation(conversation.id)}
                                                                            className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-(--text-light) hover:bg-(--pixel-hover) cursor-pointer"
                                                                        >
                                                                            <BsPinAngle size={13} />
                                                                            {t('sakupilot.immersive.pinchat')}
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleRenameConversation(conversation.id, conversation.title)}
                                                                            className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-(--text-light) hover:bg-(--pixel-hover) cursor-pointer"
                                                                        >
                                                                            <FiEdit2 size={12} /> {t('sakupilot.immersive.rename')}
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteConversation(conversation.id)}
                                                                            className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-red-400 hover:bg-(--pixel-hover) cursor-pointer"
                                                                        >
                                                                            <FiTrash2 size={12} /> {t('sakupilot.immersive.delete')}
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </motion.aside>
                )}
            </AnimatePresence>

            {isSidebarOpen && <button className="fixed inset-0 z-[70] bg-black/50 md:hidden" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar backdrop" />}

            <div className="flex min-w-0 flex-1 flex-col bg-(--light) min-h-0">
                <div className="relative flex h-14 shrink-0 items-center px-3 md:px-5">
                    <div className="flex items-center gap-1">
                        {/* Sidebar toggle */}
                        <button
                            className="rounded-md p-2 text-(--text-gray) hover:bg-(--pixel-hover) hover:text-(--text-light) transition-colors cursor-pointer"
                            onClick={() => setIsSidebarOpen(prev => !prev)}
                            aria-label="Toggle sidebar"
                        >
                            <FiMenu size={20} />
                        </button>
                    </div>

                    {/* Model Switcher — Centered */}
                    <div className="model-switcher-container absolute left-1/2 -translate-x-1/2 z-[10]">
                        <button
                            onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-(--pixel-hover) transition-colors group cursor-pointer"
                        >
                            <span className="text-sm font-semibold text-(--text-light) flex items-center gap-2">
                                SakuPilot <span className="text-(--text-gray) font-normal">-</span> {selectedModel === 'gemini' ? 'Gemini 3.7 Flash' : 'GPT-OSS 120B'}
                            </span>
                            <FiChevronDown className={`text-(--text-gray) transition-transform duration-200 ${isModelMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isModelMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-(--pixel2) border border-(--border-light) rounded-xl shadow-2xl overflow-hidden p-1"
                                >
                                    {[
                                        { id: 'groq', name: 'GPT-OSS 120B', desc: 'Chatgpt', icon: GroqIcon },
                                        { id: 'gemini', name: 'Gemini 3.7 Flash', desc: 'Google AI', icon: GeminiIcon }
                                    ].map((m) => (
                                        <button
                                            key={m.id}
                                            onClick={() => {
                                                setSelectedModel(m.id);
                                                setIsModelMenuOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-(--pixel-hover) transition-colors text-left group cursor-pointer"
                                        >
                                            <div className="relative flex-shrink-0">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden  ${selectedModel === m.id || (m.id === 'groq' && selectedModel === 'llama') ? 'border-(--sucess)' : ''}`}>
                                                    <img src={m.icon} alt={m.name} className="w-full h-full object-contain p-0.5" />
                                                </div>
                                                
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-bold text-(--text-light) truncate">{m.name}</div>
                                                <div className="text-[10px] text-(--text-gray) uppercase tracking-wider">{m.desc}</div>
                                            </div>
                                            {(selectedModel === m.id || (m.id === 'groq' && selectedModel === 'llama')) && (
                                                <FiCheck className="text-(--sucess)" size={16} />
                                            )}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* New chat — mobile only, right side */}
                    <button
                        onClick={handleNewChat}
                        className="ml-auto rounded-md p-2 text-(--text-gray) hover:bg-(--pixel-hover) hover:text-(--text-light) md:hidden"
                        aria-label="New chat"
                    >
                        <FiEdit3 size={20} />
                    </button>
                </div>

                <div ref={scrollRef} onScroll={handleScroll} className="no-scrollbar flex-1 overflow-y-auto px-3 py-6 sm:px-5 md:px-6 min-h-0">
                    {activeConversation.messages.length === 0 ? (
                        <div className="mx-auto flex min-h-full max-w-[720px] flex-col items-center justify-center text-center">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-(--border-light) bg-(--pixel)">
                                <GoDependabot size={24} className="text-(--sucess)" />
                            </div>
                            <h2 className="mb-3 text-2xl font-semibold md:text-3xl">{t('sakupilot.immersive.whereToBegin')}</h2>
                            <p className="mb-6 max-w-xl text-sm leading-6 text-(--text-gray)">
                                {t('sakupilot.immersive.description')}
                            </p>
                            <div className="grid w-full gap-2 sm:grid-cols-3">
                                {[
                                    t('sakupilot.immersive.starter1'),
                                    t('sakupilot.immersive.starter2'),
                                    t('sakupilot.immersive.starter3')
                                ].map((prompt) => (
                                    <button
                                        key={prompt}
                                        onClick={() => handleSendMessage(prompt)}
                                        className="rounded-lg border border-(--border-light) bg-(--pixel2) px-4 py-3 text-left text-sm hover:bg-(--pixel-hover) cursor-pointer"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="mx-auto flex max-w-[720px] flex-col gap-7">
                            {activeConversation.messages.map((message, index) => (
                                <ChatMessage key={`${message.role}-${index}`} message={message} handleNavigate={handleNavigate} />
                            ))}
                            {typingMessage && (
                                <TypingMessage
                                    content={typingMessage.displayText + '▌'}
                                    onNavigate={handleNavigate}
                                />
                            )}
                            {isThinking && !typingMessage && (
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        animate={{ scale: [1, 1.12, 1] }}
                                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--border-light) bg-(--pixel2)"
                                    >
                                        <GoDependabot className="text-(--sucess)" />
                                    </motion.div>
                                    <span className="animate-thinking text-sm">{t('sakupilot.immersive.thinking')}</span>
                                </div>
                            )}

                            {error && (
                                <ErrorDisplay error={error} retryCountdown={retryCountdown} onRetry={() => handleSendMessage()} />
                            )}
                        </div>
                    )}
                </div>

                <div className="shrink-0 bg-(--light) px-3 pb-6 pt-2 sm:px-5">
                    <div className="mx-auto max-w-[720px]">
                        {projectContext && (
                            <div className="mb-2 flex w-fit items-center gap-2 rounded-md border border-(--border-light) bg-(--pixel2) px-3 py-1.5 text-xs">
                                <FiFolder className="text-(--text-gray)" />
                                {projectContext.title}
                                <button onClick={() => setProjectContext(null)} aria-label="Remove project context">
                                    <FiX />
                                </button>
                            </div>
                        )}

                        {attachments.length > 0 && (
                            <div className="mb-2 flex flex-wrap gap-2">
                                {attachments.map((attachment) => (
                                    <div key={attachment.id} className="flex items-center gap-2 rounded-md border border-(--border-light) bg-(--pixel2) px-2 py-1 text-xs">
                                        {attachment.kind === 'image' ? <FiImage /> : <FiPaperclip />}
                                        <span className="max-w-[180px] truncate">{attachment.name}</span>
                                        <button onClick={() => removeAttachment(attachment.id)} aria-label={`Remove ${attachment.name}`}>
                                            <FiX />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex items-end gap-2 rounded-3xl border border-(--border-light) bg-(--pixel) px-4 py-2 focus-within:border-(--sucess) focus-within:ring-1 focus-within:ring-(--sucess)">
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                className="hidden"
                                accept=".txt,.md,.json,.csv,.js,.jsx,.ts,.tsx,.css,.html,.py,.pdf,image/*"
                                onChange={handleAttachmentChange}
                            />
                            <button onClick={() => fileInputRef.current?.click()} className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-(--text-gray) hover:bg-(--pixel-hover) hover:text-(--text-light)" aria-label="Attach file">
                                <FiPaperclip size={18} />
                            </button>
                            <AutoResizeTextarea
                                value={inputValue}
                                onChange={(event) => setInputValue(event.target.value)}
                                minRows={1}
                                maxRows={8}
                                placeholder={t('sakupilot.immersive.messagePlaceholder')}
                                className="no-scrollbar min-w-0 flex-1 resize-none bg-transparent py-2 text-sm leading-6 outline-none placeholder:text-(--text-gray)"
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' && !event.shiftKey) {
                                        event.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={isThinking || (!inputValue.trim() && attachments.length === 0)}
                                className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--text-light) text-(--light) transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                                aria-label="Send message"
                            >
                                <FiSend size={16} className="-ml-0.5" />
                            </button>
                        </div>
                        <p className="mt-2 text-center text-[11px] text-(--text-gray)">{t('sakupilot.immersive.disclaimer')}</p>
                    </div>
                </div>
            </div>

            {isSearchOpen && (
                <div className="fixed inset-0 z-[120] flex items-start justify-center bg-black/45 px-4 pt-20 backdrop-blur-[1px]">
                    <div className="flex max-h-[70vh] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl border border-(--border-light) bg-(--pixel2) shadow-2xl">
                        <div className="flex items-center gap-3 border-b border-(--border-light) px-5 py-4">
                            <FiSearch className="shrink-0 text-(--text-gray)" />
                            <input
                                autoFocus
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                placeholder={t('sakupilot.immersive.searchChatsPlaceholder')}
                                className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-(--text-gray)"
                                onKeyDown={(event) => {
                                    if (event.key === 'Escape') setIsSearchOpen(false);
                                }}
                            />
                            <button onClick={() => setIsSearchOpen(false)} className="rounded-md p-2 text-(--text-gray) hover:bg-(--pixel-hover) hover:text-(--text-light)" aria-label="Close search">
                                <FiX />
                            </button>
                        </div>
                        <div className="no-scrollbar flex-1 overflow-y-auto p-3">
                            <button
                                onClick={handleNewChat}
                                className="mb-3 flex w-full items-center gap-3 rounded-xl bg-(--pixel-hover) px-4 py-3 text-left text-sm font-medium"
                            >
                                <FiEdit3 />
                                {t('sakupilot.immersive.newChat')}
                            </button>

                            {pinnedConversations.length === 0 && recentConversations.length === 0 ? (
                                <p className="px-4 py-5 text-sm text-(--text-gray)">{t('sakupilot.immersive.noMatch')}</p>
                            ) : (
                                <>
                                    {pinnedConversations.length > 0 && (
                                        <div className="mb-3">
                                            <p className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-(--text-gray)">
                                                <BsPinAngleFill size={12} className="text-(--sucess)" />
                                                {t('sakupilot.immersive.pinned') || 'Pinned'}
                                            </p>
                                            <div className="space-y-1">
                                                {pinnedConversations.map((conversation) => (
                                                    <button
                                                        key={conversation.id}
                                                        onClick={() => handleSelectConversation(conversation)}
                                                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm hover:bg-(--pixel-hover) cursor-pointer"
                                                    >
                                                        <BsPinAngleFill className="shrink-0 text-(--sucess)" size={14} />
                                                        <span className="truncate">{conversation.title}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {recentConversations.length > 0 && (
                                        <div>
                                            <p className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-(--text-gray)">
                                                {t('sakupilot.immersive.recent')}
                                            </p>
                                            <div className="space-y-1">
                                                {recentConversations.map((conversation) => (
                                                    <button
                                                        key={conversation.id}
                                                        onClick={() => handleSelectConversation(conversation)}
                                                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm hover:bg-(--pixel-hover) cursor-pointer"
                                                    >
                                                        <FiMessageSquare className="shrink-0 text-(--text-gray)" />
                                                        <span className="truncate">{conversation.title}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

const ChatMessage = ({ message, handleNavigate }) => {
    const isUser = message.role === 'user';
    const isNew = message.isNew === true;
    return (
        <motion.article
            className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} w-full min-w-0`}
            initial={isNew ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
            {!isUser && (
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--border-light) bg-(--pixel2)">
                    <GoDependabot className="text-(--sucess)" />
                </div>
            )}
            <div className={`min-w-0 max-w-[88%] overflow-visible ${isUser ? 'rounded-2xl bg-(--pixel) px-4 py-3' : 'py-1'}`}>
                {isUser && message.files?.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-2">
                        {message.files.map((file) => (
                            <span key={file.name} className="rounded-md border border-(--border-light) bg-(--pixel2) px-2 py-1 text-xs text-(--text-gray)">
                                {file.name}
                            </span>
                        ))}
                    </div>
                )}
                {isUser ? (
                    <MessageContent content={message.content} />
                ) : (
                    <BotMessage content={message.content} onNavigate={handleNavigate} />
                )}
            </div>
        </motion.article>
    );
};

const prepareAttachment = async (file) => {
    const base = {
        id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        type: file.type || 'unknown',
        kind: file.type.startsWith('image/') ? 'image' : 'document',
    };

    if (file.size > 1_500_000) {
        return {
            ...base,
            note: 'This file is larger than the current in-browser context limit. Ask the user to paste a relevant excerpt.',
        };
    }

    if (file.type.startsWith('image/')) {
        return {
            ...base,
            note: 'Image attached. Current SakuPilot text flow can use the filename and user description; visual analysis depends on the Groq model configured on the backend.',
        };
    }

    const content = await file.text();
    return {
        ...base,
        content: content.slice(0, 45_000),
        note: content.length > 45_000 ? 'File was trimmed to fit the chat context.' : '',
    };
};

const ErrorDisplay = ({ error, retryCountdown, onRetry }) => {
    const { t } = useLanguage();
    const isRateLimit = error.code === 'RATE_LIMIT';
    const isApiError = error.code === 'API_ERROR';
    
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-3 p-4 rounded-2xl border border-red-500/20 bg-red-500/5 dark:bg-red-500/10"
        >
            <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-500">
                    {isRateLimit ? <FiClock size={18} /> : <FiAlertCircle size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-red-500 flex items-center gap-2">
                        {isRateLimit ? t('sakupilot.immersive.rateLimitExceeded') : isApiError ? t('sakupilot.immersive.apiConnectionError') : t('sakupilot.immersive.systemError')}
                        {isRateLimit && retryCountdown > 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-[10px] font-mono">
                                {Math.floor(retryCountdown / 60)}:{(retryCountdown % 60).toString().padStart(2, '0')}
                            </span>
                        )}
                    </h3>
                    <p className="text-sm text-(--text-gray) mt-1 leading-relaxed">
                        {error.message || "I encountered an unexpected issue while processing your request."}
                    </p>
                    {error.details && (
                        <div className="mt-2 p-2 rounded bg-black/5 dark:bg-white/5 font-mono text-[10px] text-(--text-gray) break-all">
                            Error Code: {error.code} | {error.details}
                        </div>
                    )}
                </div>
            </div>
            
            <div className="flex items-center gap-2 mt-1">
                <button 
                    onClick={onRetry}
                    disabled={isRateLimit && retryCountdown > 0}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >{t('sakupilot.immersive.tryAgain')}
                    Try Again
                </button>
                {isRateLimit && (
                    <span className="text-[11px] text-(--text-gray)">
                        {retryCountdown > 0 ? `Wait for the timer to finish...` : 'Ready to retry.'}
                    </span>
                )}
            </div>
        </motion.div>
    );
};

export default ImmersiveSakuPilot;
