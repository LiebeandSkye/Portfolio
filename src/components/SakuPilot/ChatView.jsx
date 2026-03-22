import React from 'react';
import { motion } from 'framer-motion';
import { GoDependabot } from "react-icons/go";
import { IoDocumentOutline } from "react-icons/io5";
import MessageContent from './MessageContent';
import BotMessage from './BotMessage';

const ChatView = ({
    messages,
    typingIndex,
    typedText,
    isThinking,
    suggestedQuestions,
    selectedProject,
    handleSendMessage,
    handleNavigate,
    messagesEndRef,
    t,
}) => (
    <div className="flex flex-col">
        {/* Sticky disclaimer */}
        <div className="sticky top-0 z-10 bg-(--pixel2) p-2">
            <p className="text-center text-[11px] text-[#8b949e]">SakuPilot uses AI. Check for mistakes.</p>
        </div>

        <div className="flex flex-col gap-4 px-4 py-4">

            {/* Suggested questions — project chats only, hidden once user sends a message */}
            {messages.length === 0 && suggestedQuestions.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-2"
                >
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-7 h-7 rounded-full bg-(--pixel) border border-(--border-light) flex items-center justify-center flex-shrink-0">
                            <GoDependabot size={15} className="text-(--sucess)" />
                        </div>
                        <p className="text-xs text-(--text-gray)">
                            Ask me anything about{' '}
                            <span className="text-(--text-light) font-medium">
                                {t(`projects.${selectedProject.langKey}.title`)}
                            </span>
                        </p>
                    </div>

                    {suggestedQuestions.map((q, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                            onClick={() => handleSendMessage(q)}
                            className="group flex items-center gap-3 w-full text-left px-4 py-2.5
                                bg-(--pixel) border border-(--border-light) rounded-xl
                                hover:bg-(--pixel-hover) hover:border-blue-500/30
                                transition-all duration-150 cursor-pointer"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-(--text-gray) group-hover:bg-blue-400 flex-shrink-0 transition-colors" />
                            <span className="text-sm text-(--text-light)">{q}</span>
                        </motion.button>
                    ))}
                </motion.div>
            )}

            {/* Message bubbles */}
            {messages.map((msg, i) => {
                const isTyping = i === typingIndex;
                const isUser = msg.role === 'user';

                return (
                    <div
                        key={i}
                        className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start items-start'}`}
                    >
                        {/* Bot avatar */}
                        {!isUser && (
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-(--pixel) border border-(--border-light) flex items-center justify-center mt-0.5">
                                <GoDependabot size={14} className="text-(--sucess)" />
                            </div>
                        )}

                        <div className={`
                            max-w-[82%] rounded-xl text-sm min-h-[1.5em] overflow-hidden
                            ${isUser ? 'bg-(--pixel) px-3 py-2.5' : 'px-1 py-0.5'}
                        `}>
                            {/* File chips inside user bubble */}
                            {isUser && msg.files?.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                    {msg.files.map((file, fi) => (
                                        <div key={fi} className="flex items-center gap-1.5 bg-(--pixel2) border border-(--border-light) rounded-md px-2 py-1">
                                            <IoDocumentOutline size={11} className="text-(--text-gray) flex-shrink-0" />
                                            <span className="text-[11px] text-(--text-gray) truncate max-w-[110px]">{file.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {isUser ? (
                                <div className="overflow-x-hidden break-words whitespace-pre-wrap w-full min-w-0">
                                    <MessageContent content={msg.content} />
                                </div>
                            ) : (
                                <BotMessage
                                    content={isTyping ? typedText + '▌' : msg.content}
                                    onNavigate={handleNavigate}
                                />
                            )}
                        </div>
                    </div>
                );
            })}

            {/* ── Thinking indicator — gradient shimmer text, same as .animate-thinking ── */}
            {isThinking && (
                <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-(--pixel) border border-(--border-light) flex items-center justify-center">
                        <GoDependabot size={14} className="text-(--sucess)" />
                    </div>
                    <span className="animate-thinking text-sm">
                        SakuPilot is thinking...
                    </span>
                </div>
            )}

            <div ref={messagesEndRef} />
        </div>
    </div>
);

export default ChatView;