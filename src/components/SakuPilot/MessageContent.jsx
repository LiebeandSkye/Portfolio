import React, { memo, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGithubSafe from '../../Utils/githubMarkdown';

// Syntax highlighting with Prism
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-yaml';

const LANGUAGE_MAP = {
    js: 'javascript',
    jsx: 'jsx',
    ts: 'typescript',
    tsx: 'tsx',
    py: 'python',
    python: 'python',
    sh: 'bash',
    bash: 'bash',
    shell: 'bash',
    zsh: 'bash',
    json: 'json',
    css: 'css',
    html: 'markup',
    xml: 'markup',
    markup: 'markup',
    sql: 'sql',
    md: 'markdown',
    markdown: 'markdown',
    yml: 'yaml',
    yaml: 'yaml',
};

const MDLi = ({ children }) => (
    <li className="leading-relaxed text-(--text-light) break-words mb-1.5 last:mb-0">
        <span className="min-w-0 flex-1">{children}</span>
    </li>
);

const MDUl = ({ children }) => (
    <ul className="list-disc pl-5 space-y-1.5 my-3 text-(--text-light) text-[14.5px]">
        {children}
    </ul>
);

const MDOl = ({ children }) => (
    <ol className="chat-ol space-y-2.5 my-3 text-(--text-light) text-[14.5px]">
        {children}
    </ol>
);

const MDStrong = ({ children }) => (
    <strong className="font-semibold text-(--text-light)">{children}</strong>
);

const MDEm = ({ children }) => (
    <em className="italic text-(--text-light)">{children}</em>
);

const MDP = ({ children }) => (
    <p className="mb-3 last:mb-0 leading-7 text-(--text-light) text-[14.5px] break-words">
        {children}
    </p>
);

const MDH1 = ({ children }) => (
    <h1 className="text-xl sm:text-2xl font-bold text-(--text-light) mt-5 mb-2.5 first:mt-0 tracking-tight break-words">
        {children}
    </h1>
);

const MDH2 = ({ children }) => (
    <h2 className="text-lg sm:text-xl font-semibold text-(--text-light) mt-4 mb-2 first:mt-0 tracking-tight break-words">
        {children}
    </h2>
);

const MDH3 = ({ children }) => (
    <h3 className="text-base sm:text-lg font-semibold text-(--text-light) mt-3 mb-1.5 first:mt-0 break-words">
        {children}
    </h3>
);

const MDH4 = ({ children }) => (
    <h4 className="text-sm sm:text-base font-semibold text-(--text-light) mt-2.5 mb-1 first:mt-0 break-words">
        {children}
    </h4>
);

const MDA = ({ href, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-(--sucess) hover:underline font-medium transition-all break-all"
    >
        {children}
    </a>
);

const MDBlockquote = ({ children }) => (
    <blockquote className="my-3.5 border-l-[3px] border-(--sucess) bg-(--pixel2) px-4 py-2.5 rounded-r-lg text-sm text-(--text-gray) italic break-words">
        {children}
    </blockquote>
);

const MDHr = () => <hr className="my-5 border-t border-(--border-light)" />;

const MDDel = ({ children }) => (
    <del className="line-through text-(--text-gray)">{children}</del>
);

const MDTable = ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-(--border-light) bg-(--pixel2) shadow-xs max-w-full">
        <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
);

const MDThead = ({ children }) => (
    <thead className="bg-(--pixel) text-(--text-gray) text-xs uppercase tracking-wider font-semibold border-b border-(--border-light)">
        {children}
    </thead>
);

const MDTh = ({ children }) => (
    <th className="px-4 py-2.5 font-semibold text-(--text-light) border-b border-(--border-light) break-words">
        {children}
    </th>
);

const MDTd = ({ children }) => (
    <td className="px-4 py-2 border-b border-(--border-light)/60 text-(--text-light) last:border-b-0 break-words">
        {children}
    </td>
);

const MDTr = ({ children }) => (
    <tr className="hover:bg-(--pixel-hover)/30 transition-colors last:border-0">{children}</tr>
);

const MessageContent = memo(({ content }) => {
    const processedContent = useMemo(() => {
        if (typeof content !== 'string') return content;
        return content
            .replace(/â€¢/g, '\n•')
            // Convert markdown arrow prefixes like "^-> " or "\n-> " to styled arrow bullets
            .replace(/(^|\n)->\s+/g, '$1- → ')
            .replace(/(^|\n)▸\s+/g, '$1- ▸ ')
            .replace(/(^|\n)➔\s+/g, '$1- ➔ ');
    }, [content]);

    const components = useMemo(() => ({
        pre({ children }) {
            return <>{children}</>;
        },
        code({ inline, className, children, node, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const contentStr = String(children);
            const isMultiline = contentStr.includes('\n');
            const isInline = inline || (!match && !isMultiline && (!node?.position || node.position.start.line === node.position.end.line));

            if (isInline) {
                return (
                    <code
                        className="font-mono text-[13px] px-1.5 py-0.5 mx-0.5 rounded-md bg-(--pixel2) text-(--text-light) border border-(--border-light) font-normal break-all"
                        {...props}
                    >
                        {children}
                    </code>
                );
            }
            return <CodeBlock language={match ? match[1] : 'text'} code={contentStr.replace(/\n$/, '')} />;
        },
        li: MDLi,
        ul: MDUl,
        ol: MDOl,
        strong: MDStrong,
        em: MDEm,
        p: MDP,
        h1: MDH1,
        h2: MDH2,
        h3: MDH3,
        h4: MDH4,
        a: MDA,
        blockquote: MDBlockquote,
        hr: MDHr,
        del: MDDel,
        table: MDTable,
        thead: MDThead,
        th: MDTh,
        td: MDTd,
        tr: MDTr,
    }), []);

    return (
        <div className="overflow-x-auto w-full min-w-0 max-w-full">
            <ReactMarkdown remarkPlugins={[remarkGithubSafe]} rehypePlugins={[rehypeRaw]} components={components}>
                {processedContent}
            </ReactMarkdown>
        </div>
    );
});
MessageContent.displayName = 'MessageContent';

const CodeBlock = memo(function CodeBlock({ language, code }) {
    const [copyState, setCopyState] = useState('idle');

    const normalizedLang = (language || 'text').toLowerCase();
    const prismLang = LANGUAGE_MAP[normalizedLang] || (Prism.languages[normalizedLang] ? normalizedLang : null);

    const highlightedHtml = useMemo(() => {
        if (prismLang && Prism.languages[prismLang]) {
            try {
                return Prism.highlight(code, Prism.languages[prismLang], prismLang);
            } catch (e) {
                console.warn('Prism highlight failed:', e);
            }
        }
        return null;
    }, [code, prismLang]);

    const handleCopy = () => {
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
        <div className="relative my-4 rounded-xl overflow-hidden border border-(--border-light) bg-[#0d1117] text-[#e6edf3] shadow-sm max-w-full code-theme-dark">
            <div className="flex items-center justify-between bg-[#161b22] px-4 py-2 text-xs text-[#8b949e] border-b border-[#30363d]">
                <span className="font-mono font-semibold uppercase tracking-wider text-[11px] text-[#c9d1d9]">
                    {normalizedLang}
                </span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-[#30363d] hover:text-[#f0f6fc] transition-colors cursor-pointer select-none text-xs font-medium"
                    aria-label="Copy code to clipboard"
                >
                    {copyState === 'copied' && (
                        <>
                            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-emerald-400">Copied!</span>
                        </>
                    )}
                    {copyState === 'error' && (
                        <>
                            <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-red-400">Failed</span>
                        </>
                    )}
                    {copyState === 'idle' && (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Copy code</span>
                        </>
                    )}
                </button>
            </div>
            <div className="overflow-x-auto">
                <pre className="m-0 p-4 text-[13.5px] leading-relaxed font-mono overflow-x-auto bg-transparent">
                    {highlightedHtml ? (
                        <code
                            className={`language-${normalizedLang}`}
                            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                        />
                    ) : (
                        <code className={`language-${normalizedLang}`}>{code}</code>
                    )}
                </pre>
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
        el.focus();
        el.select();
        document.execCommand('copy') ? resolve() : reject();
        document.body.removeChild(el);
    });
}

export default MessageContent;

