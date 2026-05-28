import React, { useState, memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../context/ThemeContext';
import remarkGithubSafe from '../../Utils/githubMarkdown';

// ─── Static markdown component overrides ─────────────────────────────────────
// Defined at MODULE SCOPE so they are never recreated.
// ReactMarkdown compares the `components` prop by reference — if it changes
// every render, ReactMarkdown tears down and remounts every element.
// During the typing animation this fires every 20ms, so this fix alone
// eliminates hundreds of unnecessary DOM mutations per message.
const MDLi     = ({ children }) => <li className="mb-2 last:mb-0 text-(--text-light) leading-relaxed break-words">{children}</li>;
const MDUl     = ({ children }) => <ul className="list-disc pl-5 space-y-1.5 my-3 text-(--text-light)">{children}</ul>;
const MDOl     = ({ children }) => <ol className="list-decimal pl-5 space-y-1.5 my-3 text-(--text-light)">{children}</ol>;
const MDStrong = ({ children }) => <strong className="font-semibold text-(--text-light)">{children}</strong>;
const MDP      = ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed text-(--text-light) whitespace-pre-wrap break-words overflow-wrap-anywhere">{children}</p>;
const MDH1     = ({ children }) => <h1 className="mb-3 last:mb-0 font-semibold text-2xl text-(--text-light) break-words">{children}</h1>;
const MDH2     = ({ children }) => <h2 className="mb-3 last:mb-0 font-semibold text-(--text-light) break-words">{children}</h2>;
const MDH3     = ({ children }) => <h3 className="mb-3 last:mb-0 font-semibold text-lg text-(--text-light) break-words">{children}</h3>;
const MDA      = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-(--sucess) hover:underline transition-all break-all">{children}</a>
);
const MDTable  = ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-(--border-light) max-w-full">
        <table className="w-full border-collapse text-sm text-left">{children}</table>
    </div>
);
const MDThead  = ({ children }) => <thead className="bg-(--pixel) text-(--text-gray-dark)">{children}</thead>;
const MDTh     = ({ children }) => <th className="px-4 py-2.5 font-semibold border-b border-(--border-light) break-words">{children}</th>;
const MDTd     = ({ children }) => <td className="px-4 py-2 border-b border-(--border-light) text-(--text-light) last:border-0 break-words">{children}</td>;
const MDTr     = ({ children }) => <tr className="transition-colors last:border-0">{children}</tr>;

// ─── MessageContent ───────────────────────────────────────────────────────────
// memo() = only re-renders when `content` prop actually changes.
// Without this, every 20ms typing tick re-renders ALL past messages.
const MessageContent = memo(({ content }) => {
    const { isDark } = useTheme();

    const processedContent = typeof content === 'string'
        ? content.replace(/•/g, '\n•')
        : content;

    // `components` object recreates only when isDark changes (theme toggle),
    // not on every render — keeping ReactMarkdown's internal vdom stable.
    const components = useMemo(() => ({
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            if (inline || !match) {
                return (
                    <code className="text-(--sucess) font-mono text-sm font-medium break-all whitespace-pre-wrap" {...props}>
                        {children}
                    </code>
                );
            }
            return <CodeBlock language={match[1]} isDark={isDark} code={String(children).replace(/\n$/, '')} />;
        },
        li: MDLi, ul: MDUl, ol: MDOl, strong: MDStrong,
        p: MDP, h1: MDH1, h2: MDH2, h3: MDH3, a: MDA,
        table: MDTable, thead: MDThead, th: MDTh, td: MDTd, tr: MDTr,
    }), [isDark]);

    return (
        <div className="overflow-x-hidden w-full min-w-0">
            <ReactMarkdown remarkPlugins={[remarkGithubSafe]} rehypePlugins={[rehypeRaw]} components={components}>
                {processedContent}
            </ReactMarkdown>
        </div>
    );
});
MessageContent.displayName = 'MessageContent';

// ─── CodeBlock ────────────────────────────────────────────────────────────────
// memo() so syntax highlighting only re-runs when code/language/theme changes.
const CodeBlock = memo(function CodeBlock({ language, code, isDark }) {
    const [copyState, setCopyState] = useState('idle');

    const handleCopy = () => {
        if (copyState !== 'idle') return;
        copyToClipboard(code)
            .then(() => { setCopyState('copied'); setTimeout(() => setCopyState('idle'), 2000); })
            .catch(() => { setCopyState('error');  setTimeout(() => setCopyState('idle'), 2000); });
    };

    return (
        <div className="relative my-4 rounded-lg overflow-hidden border border-(--border-light) bg-(--pixel) group max-w-full">
            <div className="flex items-center justify-between bg-(--pixel-hover) px-4 py-2 text-xs text-(--text-gray-dark)">
                <span className="font-bold tracking-widest">{language.toUpperCase()}</span>
                <button onClick={handleCopy} className="flex items-center gap-1.5 hover:text-(--text-light) transition-colors cursor-pointer select-none">
                    {copyState === 'copied' && <><svg className="w-3.5 h-3.5 text-(--sucess)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg><span className="text-(--sucess) font-medium">Copied!</span></>}
                    {copyState === 'error'  && <><svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg><span className="text-red-400 font-medium">Failed</span></>}
                    {copyState === 'idle'   && <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg><span>Copy</span></>}
                </button>
            </div>
            <div className="overflow-x-auto">
                <SyntaxHighlighter
                    language={language}
                    style={isDark ? oneDark : prism}
                    customStyle={{ margin: 0, borderRadius: 0, background: 'transparent', padding: '1.25rem', fontSize: '0.875rem' }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
});
CodeBlock.displayName = 'CodeBlock';

function copyToClipboard(text) {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
    return new Promise((resolve, reject) => {
        const el = document.createElement('textarea');
        el.value = text;
        el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
        document.body.appendChild(el);
        el.focus(); el.select();
        document.execCommand('copy') ? resolve() : reject();
        document.body.removeChild(el);
    });
}

export default MessageContent;
