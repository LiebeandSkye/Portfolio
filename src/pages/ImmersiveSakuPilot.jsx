import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Textarea from 'react-textarea-autosize';
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
} from 'react-icons/fi';
import { GoDependabot } from 'react-icons/go';

import Projects from '../Data/Projects';
import { useLanguage } from '../components/context/LanguageContext';
import { getGroqResponse } from '../Utils/groq';
import MessageContent from '../components/SakuPilot/MessageContent';
import BotMessage from '../components/SakuPilot/BotMessage';
import {
    createConversation,
    loadConversations,
    saveConversations,
    summarizeConversationTitle,
    upsertConversation,
} from '../components/SakuPilot/immersiveChatStorage';

const STARTER_PROMPTS = [
    'Review my portfolio like a senior recruiter.',
    'Help me explain AI MemoryPorter in a premium way.',
    'Compare my projects and suggest what to improve next.',
];

const ImmersiveSakuPilot = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const fileInputRef = useRef(null);
    const scrollRef = useRef(null);

    const [conversations, setConversations] = useState(() => loadConversations());
    const [activeConversation, setActiveConversation] = useState(() => createConversation());
    const [inputValue, setInputValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [projectContext, setProjectContext] = useState(null);

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
    }, [activeConversation.id]);

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
            'Respond in an immersive SakuPilot style: thoughtful, premium, well-structured, and detailed when the question deserves depth.',
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

        persistActiveConversation(nextConversation);
        setInputValue('');
        setAttachments([]);
        setIsThinking(true);

        try {
            const apiHistory = nextConversation.messages
                .slice(0, -1)
                .map(({ role, content }) => ({ role, content }));

            const response = await getGroqResponse(
                prompt,
                apiHistory,
                projectContext,
                { mode: 'immersive' }
            );

            persistActiveConversation({
                ...nextConversation,
                messages: [...nextConversation.messages, { role: 'assistant', content: response }],
                updatedAt: new Date().toISOString(),
            });
        } finally {
            setIsThinking(false);
        }
    }, [activeConversation, attachments, inputValue, persistActiveConversation, projectContext]);

    return (
        <section className="flex h-full w-full overflow-hidden bg-(--light) text-(--text-light) relative">
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

                    <button onClick={handleNewChat} className="mb-2 flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-(--pixel-hover)">
                        <FiEdit3 />
                        New Chat
                    </button>

                    <details className="group mb-2 rounded-md">
                        <summary className="flex cursor-pointer list-none items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-(--pixel-hover)">
                            <FiFolder />
                            Projects
                        </summary>
                        <div className="mt-1 space-y-1 pl-4">
                            {projectOptions.map((project) => (
                                <button
                                    key={project.id}
                                    onClick={() => handleProjectSelect(project)}
                                    className="w-full truncate rounded-md px-3 py-2 text-left text-xs text-(--text-gray) hover:bg-(--pixel-hover) hover:text-(--text-light)"
                                >
                                    {project.displayTitle}
                                </button>
                            ))}
                        </div>
                    </details>

                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="mb-5 flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-(--pixel-hover)"
                    >
                        <FiSearch className="text-(--text-gray)" />
                        Search chat
                    </button>

                    <p className="px-2 pb-2 text-xs font-semibold text-(--text-gray)">Recent</p>
                    <div className="github-scrollbar flex-1 space-y-1 overflow-y-auto pr-1">
                        {conversations.length === 0 ? (
                            <p className="px-2 py-3 text-xs text-(--text-gray)">No saved conversations yet.</p>
                        ) : conversations.map((conversation) => (
                            <div key={conversation.id} className={`group flex items-center gap-1 rounded-md ${activeConversation.id === conversation.id ? 'bg-(--pixel-hover)' : 'hover:bg-(--pixel-hover)'}`}>
                                <button
                                    onClick={() => handleSelectConversation(conversation)}
                                    className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-left text-sm"
                                >
                                    <FiMessageSquare className="shrink-0 text-(--text-gray)" />
                                    <span className="truncate">{conversation.title}</span>
                                </button>
                                <button
                                    onClick={() => handleDeleteConversation(conversation.id)}
                                    className="mr-1 rounded p-1.5 text-(--text-gray) opacity-0 hover:text-red-400 group-hover:opacity-100"
                                    aria-label={`Delete ${conversation.title}`}
                                >
                                    <FiTrash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.aside>
                )}
            </AnimatePresence>

            {isSidebarOpen && <button className="fixed inset-0 z-[70] bg-black/50 md:hidden" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar backdrop" />}

            <div className="flex min-w-0 flex-1 flex-col bg-(--light)">
                <div className="flex h-14 shrink-0 items-center justify-between px-3 md:px-5">
                    <div className="flex items-center gap-2">
                        <button 
                            className="rounded-md p-2 text-(--text-gray) hover:bg-(--pixel-hover) hover:text-(--text-light) transition-colors" 
                            onClick={() => setIsSidebarOpen(prev => !prev)} 
                            aria-label="Toggle sidebar"
                        >
                            <FiMenu size={20} />
                        </button>
                        <button onClick={handleGoBack} className="hidden rounded-md p-2 text-(--text-gray) hover:bg-(--pixel-hover) hover:text-(--text-light) md:block" aria-label="Go back">
                            <FiArrowLeft size={20} />
                        </button>
                        <span className="ml-2 text-sm font-medium text-(--text-light) md:hidden">SakuPilot</span>
                    </div>
                    <button onClick={handleNewChat} className="rounded-md p-2 text-(--text-gray) hover:bg-(--pixel-hover) hover:text-(--text-light) md:hidden" aria-label="New chat">
                        <FiEdit3 size={20} />
                    </button>
                </div>

                <div ref={scrollRef} className="github-scrollbar flex-1 overflow-y-auto px-3 py-6 sm:px-5 md:px-6">
                    {activeConversation.messages.length === 0 ? (
                        <div className="mx-auto flex min-h-full max-w-[720px] flex-col items-center justify-center text-center">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-(--border-light) bg-(--pixel)">
                                <GoDependabot size={24} className="text-(--sucess)" />
                            </div>
                            <h2 className="mb-3 text-2xl font-semibold md:text-3xl">Where should we begin?</h2>
                            <p className="mb-6 max-w-xl text-sm leading-6 text-(--text-gray)">
                                Ask about Kry's projects, get portfolio strategy, analyze attached files, or use SakuPilot like a focused general AI assistant.
                            </p>
                            <div className="grid w-full gap-2 sm:grid-cols-3">
                                {STARTER_PROMPTS.map((prompt) => (
                                    <button
                                        key={prompt}
                                        onClick={() => handleSendMessage(prompt)}
                                        className="rounded-lg border border-(--border-light) bg-(--pixel2) px-4 py-3 text-left text-sm hover:bg-(--pixel-hover)"
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
                            {isThinking && (
                                <div className="flex items-center gap-3 text-sm text-(--text-gray)">
                                    <GoDependabot className="text-(--sucess)" />
                                    <span className="animate-thinking">SakuPilot is thinking...</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="bg-(--light) px-3 pb-6 pt-2 sm:px-5">
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
                            <Textarea
                                value={inputValue}
                                onChange={(event) => setInputValue(event.target.value)}
                                minRows={1}
                                maxRows={8}
                                placeholder="Message SakuPilot..."
                                className="github-scrollbar min-w-0 flex-1 resize-none bg-transparent py-2 text-sm leading-6 outline-none placeholder:text-(--text-gray)"
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
                        <p className="mt-2 text-center text-[11px] text-(--text-gray)">SakuPilot can make mistakes. Verify important details.</p>
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
                                placeholder="Search chats..."
                                className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-(--text-gray)"
                                onKeyDown={(event) => {
                                    if (event.key === 'Escape') setIsSearchOpen(false);
                                }}
                            />
                            <button onClick={() => setIsSearchOpen(false)} className="rounded-md p-2 text-(--text-gray) hover:bg-(--pixel-hover) hover:text-(--text-light)" aria-label="Close search">
                                <FiX />
                            </button>
                        </div>
                        <div className="github-scrollbar flex-1 overflow-y-auto p-3">
                            <button
                                onClick={handleNewChat}
                                className="mb-3 flex w-full items-center gap-3 rounded-xl bg-(--pixel-hover) px-4 py-3 text-left text-sm font-medium"
                            >
                                <FiEdit3 />
                                New chat
                            </button>

                            <p className="px-4 py-2 text-xs text-(--text-gray)">Recent</p>
                            {filteredConversations.length === 0 ? (
                                <p className="px-4 py-5 text-sm text-(--text-gray)">No chats match your search.</p>
                            ) : filteredConversations.map((conversation) => (
                                <button
                                    key={conversation.id}
                                    onClick={() => handleSelectConversation(conversation)}
                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm hover:bg-(--pixel-hover)"
                                >
                                    <FiMessageSquare className="shrink-0 text-(--text-gray)" />
                                    <span className="truncate">{conversation.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

const ChatMessage = ({ message, handleNavigate }) => {
    const isUser = message.role === 'user';
    return (
        <article className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--border-light) bg-(--pixel2)">
                    <GoDependabot className="text-(--sucess)" />
                </div>
            )}
            <div className={`min-w-0 max-w-[88%] ${isUser ? 'rounded-2xl bg-(--pixel) px-4 py-3' : 'py-1'}`}>
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
        </article>
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

export default ImmersiveSakuPilot;
