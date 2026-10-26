import test from 'node:test';
import assert from 'node:assert/strict';

import {
    parseIntelligentMessage,
    stripTrailingIncompleteTags,
    parseVisualPayload,
    parseStatsPayload,
    parseQuizPayload,
    parseOptionsPayload,
    parseSuggestPayload,
} from './intelligentUiParser.js';

test('stripTrailingIncompleteTags strips half-typed tags during streaming', () => {
    const partial = 'Here is the explanation.\n\n[SUGGEST: "Show me live code" | "How does▌';
    const result = stripTrailingIncompleteTags(partial);
    assert.equal(result, 'Here is the explanation.\n\n▌');
});

test('parseVisualPayload parses key-value and pipe formats', () => {
    const kv = parseVisualPayload('query="Angkor Wat Cambodia" | title="Angkor Wat" | caption="Historic temple complex"');
    assert.deepEqual(kv, {
        query: 'Angkor Wat Cambodia',
        title: 'Angkor Wat',
        caption: 'Historic temple complex',
    });

    const simple = parseVisualPayload('Saku App Flashcards | Saku Interface');
    assert.deepEqual(simple, {
        query: 'Saku App Flashcards',
        title: 'Saku Interface',
        caption: '',
    });
});

test('parseStatsPayload parses structured stats items', () => {
    const items = parseStatsPayload('label="RAM Usage", value="<25 MB", sub="Idle zero", icon="cpu" | label="Bundle", value="20 MB", icon="zap"');
    assert.equal(items.length, 2);
    assert.equal(items[0].label, 'RAM Usage');
    assert.equal(items[0].value, '<25 MB');
    assert.equal(items[0].icon, 'cpu');
});

test('parseQuizPayload parses interactive quiz widgets', () => {
    const quiz = parseQuizPayload('question="Which IPC is used?" | options="ContentProvider;AIDL;Socket" | answer="0" | explanation="Direct SQLite sync."');
    assert.equal(quiz.question, 'Which IPC is used?');
    assert.deepEqual(quiz.options, ['ContentProvider', 'AIDL', 'Socket']);
    assert.equal(quiz.answer, 0);
    assert.equal(quiz.explanation, 'Direct SQLite sync.');
});

test('parseSuggestPayload extracts clean suggestion strings', () => {
    const suggestions = parseSuggestPayload('"Build a live demo" | "Explain the architecture" | "Compare with Redux"');
    assert.deepEqual(suggestions, [
        'Build a live demo',
        'Explain the architecture',
        'Compare with Redux',
    ]);
});

test('parseIntelligentMessage extracts nav, visual, quiz, stats, and suggestions cleanly', () => {
    const raw = `Here is an overview of Saku App.

[STATS: label="Footprint", value="20 MB", sub="Lightweight APK", icon="zap"]

[VISUAL: query="Saku App" | title="Saku Android Widget" | caption="Home screen widget"]

[NAV:/portfolio/7]View Saku App[/NAV]

[QUIZ: question="Does Saku require login?" | options="No, 100% offline;Yes, OAuth" | answer="0" | explanation="Zero login required."]

[SUGGEST: "How does FSRS sync work?" | "Build a flashcard widget prototype"]`;

    const parsed = parseIntelligentMessage(raw, { isTyping: false });
    const types = parsed.parts.map(p => p.type);
    assert.deepEqual(types, ['text', 'stats', 'visual', 'nav', 'quiz']);
    assert.deepEqual(parsed.suggestions, [
        'How does FSRS sync work?',
        'Build a flashcard widget prototype',
    ]);
});

test('parseOptionsPayload parses ChatGPT-style multi-group option builder cards', () => {
    const raw =
        'button="Build this calculator" | group="Choose your calculator type": "Command-line calculator — improve the one above"; "GUI calculator — buttons and a display, like Windows Calculator"; "Web calculator — Rust backend with a browser interface" | group="Your experience level": "Beginner — explain the code step by step"; "Intermediate — cleaner Rust architecture"';
    const parsed = parseOptionsPayload(raw);
    assert.equal(parsed.buttonLabel, 'Build this calculator');
    assert.equal(parsed.groups.length, 2);
    assert.equal(parsed.groups[0].title, 'Choose your calculator type');
    assert.equal(parsed.groups[0].options.length, 3);
    assert.equal(parsed.groups[0].options[2].label, 'Web calculator');
    assert.equal(parsed.groups[0].options[2].description, 'Rust backend with a browser interface');
    assert.equal(parsed.groups[1].title, 'Your experience level');
    assert.equal(parsed.groups[1].options.length, 2);
});
