import React from 'react';
import MessageContent from './MessageContent';
import NavButton from './NavButton';

// Parses [NAV:/path]Label[/NAV] and [NAV:/path|Label] tokens out of bot response text
const parseNavTokens = (content) => {
    if (typeof content !== 'string') return [{ type: 'text', value: String(content) }];

    const parts = [];
    const navRegex = /\[NAV:([^\]|]+)\]([^\[]*)\[\/NAV\]|\[NAV:([^\]|]+)\|([^\]]+)\]/g;
    let lastIndex = 0;
    let match;

    while ((match = navRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
            const chunk = content.slice(lastIndex, match.index).trim();
            if (chunk) parts.push({ type: 'text', value: chunk });
        }
        const path = match[1] || match[3];
        const label = (match[2] || match[4] || '').trim();
        if (path && label) parts.push({ type: 'nav', path, label });
        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
        const remaining = content.slice(lastIndex).trim();
        if (remaining) parts.push({ type: 'text', value: remaining });
    }

    if (parts.length === 0) parts.push({ type: 'text', value: content });
    return parts;
};

const BotMessage = ({ content, onNavigate }) => {
    const parts = parseNavTokens(content);

    return (
        <div className="flex flex-col gap-1 overflow-x-hidden w-full min-w-0">
            {parts.map((part, i) =>
                part.type === 'nav' ? (
                    <NavButton key={i} path={part.path} label={part.label} onClick={onNavigate} />
                ) : (
                    part.value && (
                        <div key={i} className="overflow-x-hidden break-words w-full min-w-0">
                            <MessageContent content={part.value} />
                        </div>
                    )
                )
            )}
        </div>
    );
};

export default BotMessage;