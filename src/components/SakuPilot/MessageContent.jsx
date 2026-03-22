import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../context/ThemeContext';

const MessageContent = ({ content }) => {
    const isString = typeof content === "string";

    const processedContent = isString
        ? content.replace(/•/g, '\n•')
        : content;

    const { isDark } = useTheme();
    
    return (
        <div className="overflow-x-hidden w-full min-w-0">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        
                        if (inline || !match) {
                            return (
                                <code 
                                    className="text-(--sucess) font-mono text-sm font-medium break-all whitespace-pre-wrap" 
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        }

                        return (
                            <CodeBlock 
                                language={match[1]}
                                isDark={isDark}
                                code={String(children).replace(/\n$/, '')} 
                            />
                        );
                    },

                    li: ({ children }) => (
                        <li className="mb-2 last:mb-0 text-(--text-light) leading-relaxed break-words">
                            {children}
                        </li>
                    ),
                    ul: ({ children }) => <ul className="list-disc pl-5 space-y-1.5 my-3 text-(--text-light)">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1.5 my-3 text-(--text-light)">{children}</ol>,
                    strong: ({ children }) => <strong className="font-semibold text-(--text-light)">{children}</strong>,
                    p: ({ children }) => (
                        <p className="mb-3 last:mb-0 leading-relaxed text-(--text-light) whitespace-pre-wrap break-words overflow-wrap-anywhere">
                            {children}
                        </p>
                    ),
                    h1: ({ children }) => <h1 className="mb-3 last:mb-0 font-semibold text-2xl text-(--text-light) break-words">{children}</h1>,
                    h2: ({ children }) => <h2 className="mb-3 last:mb-0 font-semibold text-(--text-light) break-words">{children}</h2>,
                    h3: ({ children }) => <h3 className="mb-3 last:mb-0 font-semibold text-lg text-(--text-light) break-words">{children}</h3>,
                    a: ({ href, children }) => (
                        <a 
                            href={href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-(--sucess) hover:underline transition-all break-all"
                        >
                            {children}
                        </a>
                    ),
                    table: ({ children }) => (
                        <div className="my-4 overflow-x-auto rounded-lg border border-(--border-light) max-w-full">
                            <table className="w-full border-collapse text-sm text-left">
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children }) => <thead className="bg-(--pixel) text-(--text-gray-dark)">{children}</thead>,
                    th: ({ children }) => (
                        <th className="px-4 py-2.5 font-semibold border-b border-(--border-light) break-words">{children}</th>
                    ),
                    td: ({ children }) => (
                        <td className="px-4 py-2 border-b border-(--border-light) text-(--text-light) last:border-0 break-words">{children}</td>
                    ),
                    tr: ({ children }) => (
                        <tr className="transition-colors last:border-0">{children}</tr>
                    ),
                }}
            >
                {processedContent}
            </ReactMarkdown>
        </div>
    );
};

// ─── Fallback copy for environments where clipboard API is unavailable ────────
function copyToClipboard(text) {
    // Modern async clipboard API
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        return navigator.clipboard.writeText(text);
    }

    // Legacy execCommand fallback
    return new Promise((resolve, reject) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (success) resolve();
        else reject(new Error('execCommand copy failed'));
    });
}

function CodeBlock({ language, code, isDark }) {
    // 'idle' | 'copied' | 'error'
    const [copyState, setCopyState] = useState('idle');

    const handleCopy = () => {
        // Prevent double-clicks while animation is running
        if (copyState !== 'idle') return;

        copyToClipboard(code)
            .then(() => {
                setCopyState('copied');
                setTimeout(() => setCopyState('idle'), 2000);
            })
            .catch(() => {
                setCopyState('error');
                setTimeout(() => setCopyState('idle'), 2000);
            });
    };

    return (
        <div className="relative my-4 rounded-lg overflow-hidden border border-(--border-light) bg-(--pixel) group max-w-full">
            {/* Header bar */}
            <div className="flex items-center justify-between bg-(--pixel-hover) px-4 py-2 text-xs text-(--text-gray-dark)">
                <span className="font-bold tracking-widest">{language.toUpperCase()}</span>

                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 transition-colors cursor-pointer select-none
                        hover:text-(--text-light)"
                >
                    {copyState === 'copied' && (
                        <>
                            {/* Animated tick */}
                            <svg
                                className="w-3.5 h-3.5 text-(--sucess) animate-[copyTick_0.25s_ease-out]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span className="text-(--sucess) font-medium">Copied!</span>
                        </>
                    )}

                    {copyState === 'error' && (
                        <>
                            <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-red-400 font-medium">Failed</span>
                        </>
                    )}

                    {copyState === 'idle' && (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code content */}
            <div className="overflow-x-auto">
                <SyntaxHighlighter
                    language={language}
                    style={isDark ? oneDark : prism}
                    customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        background: 'transparent',
                        padding: '1.25rem',
                        fontSize: '0.875rem',
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}

export default MessageContent;