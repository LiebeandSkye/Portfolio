import React, { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGithubSafe from '../../Utils/githubMarkdown';
import CodePlayground from './CodePlayground';
import { DynamicIcon } from './InteractiveWidget';

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

const MessageContent = memo(({ content, onOpenCanvas, onSendPrompt }) => {
    const processedContent = useMemo(() => {
        if (typeof content !== 'string') return content;
        return content
            .replace(/â€¢/g, '\n•')
            // Remove standalone "undefined" or "null" lines accidentally emitted between blocks
            .replace(/(^|\n)\s*(?:undefined|null)\s*(?=\n|$)/gi, '$1')
            // Convert inline [ICON:name] tokens to inline code markers that we render as icons
            .replace(/\[ICON:\s*([a-z0-9_-]+)\s*\]/gi, '`$icon:$1`')
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
            const contentStr = String(children || '');
            const trimmed = contentStr.trim();

            if (!trimmed || trimmed === 'undefined' || trimmed === 'null') {
                return null;
            }

            // Inline semantic icon token (`$icon:name`)
            if (trimmed.startsWith('$icon:')) {
                const iconName = trimmed.slice(6);
                return (
                    <span className="inline-flex items-center justify-center align-middle mx-1 p-1 rounded-md bg-(--pixel2) border border-(--border-light) text-(--sucess)">
                        <DynamicIcon name={iconName} className="w-3.5 h-3.5" />
                    </span>
                );
            }

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
            return (
                <CodePlayground
                    language={match ? match[1] : 'text'}
                    code={contentStr.replace(/\n$/, '')}
                    onOpenCanvas={onOpenCanvas}
                    onSendPrompt={onSendPrompt}
                />
            );
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
    }), [onOpenCanvas, onSendPrompt]);

    return (
        <div className="overflow-x-auto w-full min-w-0 max-w-full">
            <ReactMarkdown remarkPlugins={[remarkGithubSafe]} rehypePlugins={[rehypeRaw]} components={components}>
                {processedContent}
            </ReactMarkdown>
        </div>
    );
});
MessageContent.displayName = 'MessageContent';

export default MessageContent;
