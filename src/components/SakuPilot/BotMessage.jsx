import React, { memo, useMemo } from 'react';
import MessageContent from './MessageContent';
import NavButton from './NavButton';
import VisualCard from './VisualCard';
import SuggestionChips from './SuggestionChips';
import WidgetPart from './widgets';
import { parseIntelligentMessage } from './intelligentUiParser';

const BotMessage = memo(function BotMessage({
    content,
    onNavigate,
    onSendPrompt,
    onPopulateInput,
    onOpenCanvas,
    isTyping = false,
    showSuggestions = true,
}) {
    const { parts, suggestions } = useMemo(
        () =>
            parseIntelligentMessage(content, {
                isTyping,
                allowAutoSuggestions: !isTyping && showSuggestions,
            }),
        [content, isTyping, showSuggestions]
    );

    return (
        <div className="flex flex-col gap-1.5 overflow-x-auto w-full min-w-0 max-w-full">
            {parts.map((part, i) => {
                switch (part.type) {
                    case 'text':
                        return (
                            <MessageContent
                                key={`txt-${i}`}
                                content={part.value}
                                onOpenCanvas={onOpenCanvas}
                                onSendPrompt={onSendPrompt}
                            />
                        );
                    case 'nav':
                        return (
                            <NavButton
                                key={`nav-${i}`}
                                path={part.path}
                                label={part.label}
                                onClick={onNavigate}
                            />
                        );
                    case 'visual':
                        return (
                            <VisualCard
                                key={`vis-${i}-${part.query}`}
                                query={part.query}
                                title={part.title}
                                caption={part.caption}
                            />
                        );
                    default:
                        return (
                            <WidgetPart
                                key={`${part.type}-${i}`}
                                part={part}
                                onNavigate={onNavigate}
                                onSendPrompt={onSendPrompt}
                            />
                        );
                }
            })}

            {!isTyping && showSuggestions && suggestions.length > 0 && onSendPrompt && (
                <SuggestionChips
                    suggestions={suggestions}
                    onSelectSuggestion={onSendPrompt}
                    onPopulateInput={onPopulateInput}
                />
            )}
        </div>
    );
});

export default BotMessage;
