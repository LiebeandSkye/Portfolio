import React, { memo } from 'react';
import { GoDependabot } from "react-icons/go";
import BotMessage from './BotMessage';

/**
 * TypingMessage — isolated component that updates every 30ms during typing.
 *
 * By keeping this separate from ChatView, the entire message history
 * (ChatView) is completely immune to re-renders during the animation.
 * Only this tiny component re-renders on each tick.
 */
const TypingMessage = memo(function TypingMessage({ content, onNavigate }) {
    return (
        <div className="flex gap-2 justify-start items-start px-4 pb-2">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-(--pixel) border border-(--border-light) flex items-center justify-center mt-0.5">
                <GoDependabot size={14} className="text-(--sucess)" />
            </div>
            <div className="max-w-[82%] rounded-xl text-sm overflow-hidden px-1 py-0.5">
                <BotMessage content={content} onNavigate={onNavigate} />
            </div>
        </div>
    );
});

export default TypingMessage;