import React, { memo, useMemo } from 'react';
import MessageContent from './MessageContent';
import NavButton from './NavButton';

const NAV_REGEX = /\[NAV:([^\]|]+)\]([^[]*)\[\/NAV]|\[NAV:([^\]|]+)\|([^\]]+)]/g;

function parseNavTokens(content) {
    if (typeof content !== 'string') return [{ type: 'text', value: String(content) }];

    const parts = [];
    let lastIndex = 0;
    let match;
    NAV_REGEX.lastIndex = 0; // reset since it's module-level with /g flag

    while ((match = NAV_REGEX.exec(content)) !== null) {
        if (match.index > lastIndex) {
            const chunk = content.slice(lastIndex, match.index).trim();
            if (chunk) parts.push({ type: 'text', value: chunk });
        }
        const path  = match[1] || match[3];
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
}

// memo — for committed messages this never re-renders after initial paint.
// For the typing message (in TypingMessage.jsx) it re-renders each tick,
// but only the single small bubble, not the whole list.
const BotMessage = memo(function BotMessage({ content, onNavigate }) {
    // Parse once per content value change
    const parts = useMemo(() => parseNavTokens(content), [content]);

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
});

export default BotMessage;
