import React, { memo } from 'react';
import { AskWidget, OptionSelectorWidget, PickWidget, QuizWidget } from './ChoiceWidgets';
import {
    CalloutWidget,
    ChecklistWidget,
    FaqWidget,
    ProsConsWidget,
    StepsWidget,
    TabsWidget,
    TimelineWidget,
} from './ContentWidgets';
import { ChartWidget, CompareWidget, ProgressWidget, StatsWidget } from './DataWidgets';
import { CardsWidget, LinksWidget, ProjectWidget } from './LinkWidgets';

/**
 * Renders any parsed Intelligent UI part that isn't plain text, a nav button
 * or a visual card. Unknown types render nothing, so a new tag can never
 * break a chat message.
 */
const WidgetPart = memo(function WidgetPart({ part, onNavigate, onSendPrompt }) {
    switch (part.type) {
        case 'stats':
            return <StatsWidget items={part.items} />;
        case 'quiz':
            return (
                <QuizWidget
                    question={part.question}
                    options={part.options}
                    answer={part.answer}
                    explanation={part.explanation}
                />
            );
        case 'options':
            return (
                <OptionSelectorWidget
                    groups={part.groups}
                    buttonLabel={part.buttonLabel}
                    onSubmitSelection={onSendPrompt}
                />
            );
        case 'steps':
            return <StepsWidget title={part.title} steps={part.steps} />;
        case 'checklist':
            return <ChecklistWidget title={part.title} items={part.items} />;
        case 'callout':
            return <CalloutWidget variant={part.variant} title={part.title} text={part.text} />;
        case 'compare':
            return <CompareWidget title={part.title} columns={part.columns} rows={part.rows} />;
        case 'proscons':
            return <ProsConsWidget title={part.title} pros={part.pros} cons={part.cons} />;
        case 'tabs':
            return <TabsWidget title={part.title} tabs={part.tabs} />;
        case 'faq':
            return <FaqWidget title={part.title} items={part.items} />;
        case 'timeline':
            return <TimelineWidget title={part.title} events={part.events} />;
        case 'progress':
            return <ProgressWidget title={part.title} bars={part.bars} />;
        case 'chart':
            return <ChartWidget chartType={part.chartType} title={part.title} unit={part.unit} points={part.points} />;
        case 'cards':
            return <CardsWidget title={part.title} cards={part.cards} onSendPrompt={onSendPrompt} />;
        case 'links':
            return <LinksWidget title={part.title} links={part.links} />;
        case 'pick':
            return (
                <PickWidget
                    title={part.title}
                    options={part.options}
                    multi={part.multi}
                    buttonLabel={part.buttonLabel}
                    onSendPrompt={onSendPrompt}
                />
            );
        case 'ask':
            return (
                <AskWidget
                    title={part.title}
                    placeholder={part.placeholder}
                    buttonLabel={part.buttonLabel}
                    onSendPrompt={onSendPrompt}
                />
            );
        case 'project':
            return <ProjectWidget ids={part.ids} onNavigate={onNavigate} />;
        default:
            return null;
    }
});

export default WidgetPart;
