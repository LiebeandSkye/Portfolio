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
import {
    splitSegments,
    parseStepsPayload,
    parseChecklistPayload,
    parseCalloutPayload,
    parseComparePayload,
    parseProsConsPayload,
    parseTabsPayload,
    parseFaqPayload,
    parseTimelinePayload,
    parseProgressPayload,
    parseChartPayload,
    parseCardsPayload,
    parseLinksPayload,
    parsePickPayload,
    parseAskPayload,
    parseProjectPayload,
} from './widgetPayloads.js';

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

// ── New components ───────────────────────────────────────────────────────────

test('splitSegments keeps pipes that live inside quotes', () => {
    assert.deepEqual(splitSegments('title="A | B" | "one" | "two"'), ['title="A | B"', '"one"', '"two"']);
    // Unbalanced quotes fall back to a plain split instead of swallowing everything
    assert.equal(splitSegments('a | "b | c').length, 3);
});

test('parseStepsPayload needs two steps and splits label from note', () => {
    const steps = parseStepsPayload('title="Get it running" | "Install — run npm install" | "Start — npm run dev"');
    assert.equal(steps.title, 'Get it running');
    assert.equal(steps.steps.length, 2);
    assert.equal(steps.steps[0].label, 'Install');
    assert.equal(steps.steps[0].description, 'run npm install');
    assert.equal(parseStepsPayload('"Only one"'), null);
});

test('parseChecklistPayload marks pre-checked items', () => {
    const list = parseChecklistPayload('title="Deploy" | "Env vars set" | "✓ Build passes" | "+ Tests green"');
    assert.deepEqual(list.items.map(i => i.done), [false, true, true]);
    assert.equal(list.items[1].label, 'Build passes');
});

test('parseCalloutPayload normalises the variant and requires text', () => {
    assert.deepEqual(parseCalloutPayload('type="warn" | title="Heads up" | text="Back up first."'), {
        variant: 'warning',
        title: 'Heads up',
        text: 'Back up first.',
    });
    assert.equal(parseCalloutPayload('type="tip" | title="No text"'), null);
    assert.equal(parseCalloutPayload('text="Plain"').variant, 'info');
});

test('parseComparePayload pads short rows and needs 2+ columns', () => {
    const cmp = parseComparePayload('title="React vs Vue" | columns="React;Vue" | "Learning curve: Medium; Easy" | "Ecosystem: Huge"');
    assert.deepEqual(cmp.columns, ['React', 'Vue']);
    assert.deepEqual(cmp.rows[0], { label: 'Learning curve', cells: ['Medium', 'Easy'] });
    assert.deepEqual(cmp.rows[1].cells, ['Huge', '–']);
    assert.equal(parseComparePayload('columns="Only" | "A: 1"'), null);
});

test('parseProsConsPayload accepts either side', () => {
    const pc = parseProsConsPayload('title="Next.js" | pros="Fast;Great SEO" | cons="Heavier"');
    assert.deepEqual(pc.pros, ['Fast', 'Great SEO']);
    assert.deepEqual(pc.cons, ['Heavier']);
    assert.equal(parseProsConsPayload('title="Empty"'), null);
});

test('parseTabsPayload supports quoted and bare labels', () => {
    const tabs = parseTabsPayload('"Overview": Short intro | tab="Setup": Run **npm install**');
    assert.equal(tabs.tabs.length, 2);
    assert.equal(tabs.tabs[1].label, 'Setup');
    assert.equal(tabs.tabs[1].content, 'Run **npm install**');
    assert.equal(parseTabsPayload('"Solo": text'), null);
});

test('parseFaqPayload and parseTimelinePayload split on the dash', () => {
    const faq = parseFaqPayload('"Is it free? — Yes, completely." | "Needs login? — No."');
    assert.equal(faq.items[0].question, 'Is it free?');
    assert.equal(faq.items[1].answer, 'No.');

    const tl = parseTimelinePayload('title="Journey" | "2023 — Learned React" | "2024 — Shipped Charm Store"');
    assert.deepEqual(tl.events[0], { when: '2023', text: 'Learned React' });
    assert.equal(parseTimelinePayload('"2023 — Only one"'), null);
});

test('parseProgressPayload understands percents and ratios and clamps', () => {
    const p = parseProgressPayload('title="Skills" | "React: 90" | "Node.js: 80%" | "Docs: 3/4" | "Over: 250"');
    assert.deepEqual(p.bars.map(b => b.percent), [90, 80, 75, 100]);
    assert.equal(p.bars[1].label, 'Node.js');
});

test('parseChartPayload picks a type and enforces minimum points', () => {
    const bar = parseChartPayload('type="bar" | title="Bundle" | unit="KB" | "React: 42" | "Vue: 34" | "Svelte: 2"');
    assert.equal(bar.chartType, 'bar');
    assert.equal(bar.unit, 'KB');
    assert.equal(bar.points.length, 3);

    assert.equal(parseChartPayload('type="line" | "A: 1" | "B: 2"'), null);
    assert.equal(parseChartPayload('type="nonsense" | "A: 1" | "B: 2"').chartType, 'bar');
    assert.equal(parseChartPayload('type="donut" | "A: -1" | "B: 2"'), null);
});

test('parseCardsPayload builds tap-to-ask prompts', () => {
    const cards = parseCardsPayload('title="I can help with" | label="Projects", text="See what I built", icon="code", prompt="Show me your projects" | label="Skills"');
    assert.equal(cards.title, 'I can help with');
    assert.equal(cards.cards[0].prompt, 'Show me your projects');
    assert.equal(cards.cards[1].prompt, 'Tell me about Skills');
});

test('parseLinksPayload only allows http(s) links', () => {
    const links = parseLinksPayload('label="GitHub", url="https://github.com/LiebeandSkye" | label="Bad", url="javascript:alert(1)" | label="Data", url="data:text/html,hi"');
    assert.equal(links.links.length, 1);
    assert.equal(links.links[0].domain, 'github.com');
    assert.equal(parseLinksPayload('label="x", url="not a url"'), null);
});

test('parsePickPayload, parseAskPayload and parseProjectPayload', () => {
    const pick = parsePickPayload('title="Learn what?" | options="React;Node;CSS" | multi="true" | button="Plan it"');
    assert.equal(pick.multi, true);
    assert.equal(pick.buttonLabel, 'Plan it');
    assert.equal(parsePickPayload('options="Solo"'), null);

    const ask = parseAskPayload('title="What are you building?" | placeholder="e.g. a todo app"');
    assert.equal(ask.buttonLabel, 'Send');
    assert.equal(parseAskPayload('button="Send"'), null);

    assert.deepEqual(parseProjectPayload('id="7"'), { ids: [7] });
    assert.deepEqual(parseProjectPayload('ids="7;8;7;x"'), { ids: [7, 8] });
    assert.equal(parseProjectPayload('id="abc"'), null);
});

test('parseIntelligentMessage renders every new tag in order', () => {
    const raw = `Here you go.

[STEPS: title="Setup" | "Install — npm i" | "Run — npm start"]

[CALLOUT: type="tip" | text="Use Node 20."]

[COMPARE: columns="A;B" | "Speed: Fast; Slow"]

[CHART: type="donut" | "A: 1" | "B: 3"]

[PROJECT: id="7"]

[ASK: title="What next?" | placeholder="Tell me"]

[SUGGEST: "Should not show because ASK is interactive"]`;

    const parsed = parseIntelligentMessage(raw, { isTyping: false });
    assert.deepEqual(parsed.parts.map(p => p.type), ['text', 'steps', 'callout', 'compare', 'chart', 'project', 'ask']);
    assert.deepEqual(parsed.suggestions, []);
});

test('invalid widget payloads are dropped instead of leaking raw tags', () => {
    const parsed = parseIntelligentMessage('Before\n\n[STEPS: "only one step"]\n\nAfter', { isTyping: false });
    assert.deepEqual(parsed.parts.map(p => p.type), ['text', 'text']);
    assert.ok(!parsed.parts.some(p => p.value.includes('[STEPS')));
});

test('plain bracketed prose is left alone', () => {
    const parsed = parseIntelligentMessage('[Note: this is just prose] and [TODO: not a tag]', { isTyping: false });
    assert.equal(parsed.parts.length, 1);
    assert.equal(parsed.parts[0].type, 'text');
});

test('stripTrailingIncompleteTags hides half-streamed new tags', () => {
    assert.equal(stripTrailingIncompleteTags('Intro\n\n[STEPS: title="Set'), 'Intro\n\n');
    assert.equal(stripTrailingIncompleteTags('Intro [CHART: type="bar" | "A: 1'), 'Intro ');
    assert.equal(stripTrailingIncompleteTags('Done [TABS: "A": x]'), 'Done [TABS: "A": x]');
});

test('tag names are case-insensitive', () => {
    const parsed = parseIntelligentMessage('[callout: type="info" | text="hi"]', { isTyping: false });
    assert.equal(parsed.parts[0].type, 'callout');
});
