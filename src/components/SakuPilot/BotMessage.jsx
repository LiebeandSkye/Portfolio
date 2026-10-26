import React, { memo, useMemo } from 'react';
import MessageContent from './MessageContent';
import NavButton from './NavButton';
import VisualCard from './VisualCard';
import SuggestionChips from './SuggestionChips';
import { StatsWidget, QuizWidget, OptionSelectorWidget } from './InteractiveWidget';
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
                if (part.type === 'nav') {
                    return (
                        <NavButton
                            key={`nav-${i}`}
                            path={part.path}
                            label={part.label}
                            onClick={onNavigate}
                        />
                    );
                }

                if (part.type === 'visual') {
                    return (
                        <VisualCard
                            key={`vis-${i}-${part.query}`}
                            query={part.query}
                            title={part.title}
                            caption={part.caption}
                        />
                    );
                }

                if (part.type === 'stats') {
                    return <StatsWidget key={`stats-${i}`} items={part.items} />;
                }

                if (part.type === 'quiz') {
                    return (
                        <QuizWidget
                            key={`quiz-${i}`}
                            question={part.question}
                            options={part.options}
                            answer={part.answer}
                            explanation={part.explanation}
                        />
                    );
                }

                if (part.type === 'options') {
                    return (
                        <OptionSelectorWidget
                            key={`opts-${i}`}
                            groups={part.groups}
                            buttonLabel={part.buttonLabel}
                            onSubmitSelection={onSendPrompt}
                        />
                    );
                }

                return (
                    <MessageContent
                        key={`txt-${i}`}
                        content={part.value}
                        onOpenCanvas={onOpenCanvas}
                        onSendPrompt={onSendPrompt}
                    />
                );
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
