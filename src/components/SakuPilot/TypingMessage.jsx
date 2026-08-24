import React, { memo } from 'react';
import BotMessage from './BotMessage';
import SakuPilotIcon from '../../assets/Tools/SakuPilotIcon.poster.png';

/**
 * TypingMessage — isolated component that updates every 30ms during typing.
 *
 * By keeping this separate from ChatView, the entire message history
 * (ChatView) is completely immune to re-renders during the animation.
 * Only this tiny component re-renders on each tick.
 */
const TypingMessage = memo(function TypingMessage({ content, onNavigate }) {
    return (
        <div className="flex gap-3 justify-start items-start w-full min-w-0">
            <div className="relative mt-0.5 flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center select-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 via-(--pixel2) to-black/20 dark:from-white/10 dark:via-(--pixel2) dark:to-black/40 border border-black/10 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.15)]" />
                <img
                    src={SakuPilotIcon}
                    alt="SakuPilot"
                    className="relative z-10 w-full h-full object-contain p-1 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] select-none pointer-events-none"
                    draggable={false}
                />
            </div>
            <div className="min-w-0 max-w-[88%] rounded-xl text-sm overflow-visible py-1">
                <BotMessage content={content} onNavigate={onNavigate} />
            </div>
        </div>
    );
});

export default TypingMessage;