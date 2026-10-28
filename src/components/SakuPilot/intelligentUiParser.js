// ─────────────────────────────────────────────────────────────────────────────
// Intelligent UI Parser & Autonomous Decision Helpers
//
// Parses assistant messages into rich interactive segments:
//  - [NAV:/route]Label[/NAV] or [NAV:/route|Label]
//  - [VISUAL: query="..." | title="..." | caption="..."]
//  - [STATS: label="...", value="...", sub="...", icon="..." | ...]
//  - [QUIZ: question="..." | options="A;B;C;D" | answer="0" | explanation="..."]
//  - [OPTIONS: button="Build this calculator" | group="Choose type": "Opt 1 — desc"; "Opt 2 — desc" | ...]
//  - [SUGGEST: "Option 1" | "Option 2" | "Option 3"]
//  - Inline [ICON:name]
//
// Extra components (see widgetPayloads.js for each payload format):
//  - [STEPS] [CHECKLIST] [CALLOUT] [COMPARE] [PROSCONS] [TABS] [FAQ]
//  - [TIMELINE] [PROGRESS] [CHART] [CARDS] [LINKS] [PICK] [ASK] [PROJECT]
//
// Also strips incomplete trailing tags during live streaming so raw
// bracket syntax never flashes on screen.
// ─────────────────────────────────────────────────────────────────────────────

import {
    parseKeyValuePairs,
    splitLabelDesc,
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

/**
 * Registry of the newer widget tags.
 * `aliases` are extra tag names the model may use; `parse` returns the part data.
 * Adding a component = one entry here + a renderer in widgets/index.jsx.
 */
const WIDGET_TAGS = {
    steps: { aliases: ['STEPS'], parse: parseStepsPayload },
    checklist: { aliases: ['CHECKLIST'], parse: parseChecklistPayload },
    callout: { aliases: ['CALLOUT'], parse: parseCalloutPayload },
    compare: { aliases: ['COMPARE', 'COMPARISON'], parse: parseComparePayload },
    proscons: { aliases: ['PROSCONS', 'PROS_CONS'], parse: parseProsConsPayload },
    tabs: { aliases: ['TABS'], parse: parseTabsPayload },
    faq: { aliases: ['FAQ', 'ACCORDION'], parse: parseFaqPayload },
    timeline: { aliases: ['TIMELINE'], parse: parseTimelinePayload },
    progress: { aliases: ['PROGRESS'], parse: parseProgressPayload },
    chart: { aliases: ['CHART'], parse: parseChartPayload },
    cards: { aliases: ['CARDS'], parse: parseCardsPayload },
    links: { aliases: ['LINKS'], parse: parseLinksPayload },
    pick: { aliases: ['PICK'], parse: parsePickPayload },
    ask: { aliases: ['ASK'], parse: parseAskPayload },
    project: { aliases: ['PROJECT', 'PROJECTS'], parse: parseProjectPayload },
};

// Widgets that wait for the user to answer, so follow-up chips would be noise
const INTERACTIVE_WIDGETS = new Set(['pick', 'ask', 'cards']);

const WIDGET_ALIAS_TO_KEY = Object.fromEntries(
    Object.entries(WIDGET_TAGS).flatMap(([key, def]) => def.aliases.map(alias => [alias, key]))
);
const WIDGET_TAG_PATTERN = Object.keys(WIDGET_ALIAS_TO_KEY).join('|');

const ALLOWED_STATIC_ROUTES = new Set([
    '/',
    '/welcome',
    '/portfolio',
    '/contact',
    '/sakupilot',
    '/about-website',
    '/dev-quiz',
]);

export function normalizeAndValidateRoute(rawPath) {
    if (!rawPath || typeof rawPath !== 'string') return null;
    let path = rawPath.trim();
    if (!path.startsWith('/')) {
        path = `/${path}`;
    }

    if (path.length > 1 && path.endsWith('/')) {
        path = path.slice(0, -1);
    }

    if (path.includes('...') || /^\/\.+$/.test(path)) {
        return null;
    }

    if (ALLOWED_STATIC_ROUTES.has(path)) {
        return path;
    }

    if (/^\/portfolio\/[2-8]$/.test(path)) {
        return path;
    }

    return null;
}

export function isValidNavLabel(label) {
    if (!label || typeof label !== 'string') return false;
    const trimmed = label.trim();
    if (!trimmed || trimmed === '...' || trimmed === '…' || /^\.+$/.test(trimmed)) {
        return false;
    }
    return true;
}

/**
 * Strips trailing incomplete tags during real-time token streaming
 * so users never see partial `[OPTIONS: ...` or `[SUGGEST: "How...`
 */
export function stripTrailingIncompleteTags(rawText) {
    if (typeof rawText !== 'string') return '';
    const hasCursor = rawText.endsWith('▌');
    const text = hasCursor ? rawText.slice(0, -1) : rawText;

    const cleaned = text
        .replace(
            new RegExp(
                `\\[(?:NAV|SUGGEST|SUGGESTIONS|VISUAL|IMAGE|STATS|QUIZ|OPTIONS|CHOICES|WIDGET|ICON|${WIDGET_TAG_PATTERN}):[^\\]]*$`,
                'i'
            ),
            ''
        )
        .replace(/\[NAV:[^\]]*\][^[]*(?:\[\/(?:N(?:A(?:V)?)?)?)?$/i, '');

    return hasCursor ? `${cleaned}▌` : cleaned;
}

/**
 * Parse [OPTIONS: ...] ChatGPT-style multi-group interactive option builder card!
 * Supports:
 * 1) [OPTIONS: button="Build this calculator" | group="Choose your calculator type": "Command-line — improve above"; "GUI calculator — buttons and display" | group="Your experience level": "Beginner — step by step"; "Intermediate — clean architecture"]
 * 2) [OPTIONS: title="Choose your calculator type" | options="Command-line — improve above; GUI — buttons and display" | button="Build this calculator"]
 */
export function parseOptionsPayload(rawPayload) {
    if (!rawPayload || typeof rawPayload !== 'string') return null;
    const segments = rawPayload.split('|').map(s => s.trim()).filter(Boolean);
    if (segments.length === 0) return null;

    let buttonLabel = 'Continue with selection';
    const groups = [];

    for (const seg of segments) {
        // Check if segment defines button="...":
        const btnMatch = /^(?:button|cta|submit|action)\s*=\s*["']?([^"']+)["']?$/i.exec(seg);
        if (btnMatch) {
            buttonLabel = btnMatch[1].trim();
            continue;
        }

        // Check if segment defines group="Group Title": "Opt 1"; "Opt 2"
        const groupMatch = /^(?:group|section)\s*=\s*(?:"([^"]+)"|'([^']+)'|([^:]+))\s*:\s*(.+)$/i.exec(seg);
        if (groupMatch) {
            const groupTitle = (groupMatch[1] || groupMatch[2] || groupMatch[3] || 'Choose an option').trim();
            const optsRaw = groupMatch[4];
            const options = optsRaw
                .split(';')
                .map(splitLabelDesc)
                .filter(Boolean);

            if (options.length > 0) {
                groups.push({ title: groupTitle, options });
            }
            continue;
        }

        // Also support shorthand `Group Title: Opt 1; Opt 2` if it contains semicolons
        if (seg.includes(';') && seg.includes(':') && !/^(?:options|choices)\s*=/i.test(seg)) {
            const colonIdx = seg.indexOf(':');
            const rawTitle = seg.slice(0, colonIdx).trim().replace(/^["']|["']$/g, '');
            const rawOpts = seg.slice(colonIdx + 1).trim();
            const options = rawOpts.split(';').map(splitLabelDesc).filter(Boolean);
            if (rawTitle && options.length >= 2) {
                groups.push({ title: rawTitle, options });
                continue;
            }
        }
    }

    // Fallback: key-value format `title="..." | options="A;B;C" | button="..."`
    if (groups.length === 0) {
        const kv = parseKeyValuePairs(rawPayload);
        if (kv.button || kv.cta || kv.submit) {
            buttonLabel = kv.button || kv.cta || kv.submit;
        }
        const rawOptions = kv.options || kv.choices;
        if (rawOptions) {
            const options = rawOptions.split(';').map(splitLabelDesc).filter(Boolean);
            if (options.length >= 2) {
                groups.push({
                    title: kv.title || kv.group || 'Choose your preferred option',
                    options,
                });
            }
        }
    }

    if (groups.length === 0) return null;

    return {
        groups,
        buttonLabel,
    };
}

/**
 * Parse [VISUAL: ...] payload
 */
export function parseVisualPayload(rawPayload) {
    if (!rawPayload || typeof rawPayload !== 'string') return null;
    const trimmed = rawPayload.trim();
    if (!trimmed) return null;

    const kv = parseKeyValuePairs(trimmed);
    if (kv.query || kv.topic || kv.search) {
        const query = kv.query || kv.topic || kv.search;
        return {
            query,
            title: kv.title || query,
            caption: kv.caption || kv.description || '',
        };
    }

    const parts = trimmed
        .split('|')
        .map(s => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);

    if (parts.length === 0) return null;
    return {
        query: parts[0],
        title: parts[1] || parts[0],
        caption: parts[2] || '',
    };
}

/**
 * Parse [STATS: ...] payload
 */
export function parseStatsPayload(rawPayload) {
    if (!rawPayload || typeof rawPayload !== 'string') return [];
    const segments = rawPayload.split('|').map(s => s.trim()).filter(Boolean);
    const items = [];

    for (const seg of segments) {
        const kv = parseKeyValuePairs(seg);
        if (kv.label && kv.value) {
            items.push({
                label: kv.label,
                value: kv.value,
                sub: kv.sub || kv.note || kv.description || '',
                icon: kv.icon || 'zap',
            });
            continue;
        }
        const colonMatch = /^([^:]+):\s*([^()]+)(?:\(([^)]+)\))?$/.exec(seg.replace(/^["']|["']$/g, ''));
        if (colonMatch) {
            items.push({
                label: colonMatch[1].trim(),
                value: colonMatch[2].trim(),
                sub: (colonMatch[3] || '').trim(),
                icon: 'zap',
            });
        }
    }

    return items.slice(0, 6);
}

/**
 * Parse [QUIZ: ...] payload
 */
export function parseQuizPayload(rawPayload) {
    if (!rawPayload || typeof rawPayload !== 'string') return null;
    const kv = parseKeyValuePairs(rawPayload);
    const question = kv.question || kv.q;
    const rawOptions = kv.options || kv.choices;
    if (!question || !rawOptions) return null;

    const options = rawOptions
        .split(';')
        .map(o => o.trim())
        .filter(Boolean);

    if (options.length < 2) return null;

    const answerIdx = Number.parseInt(kv.answer ?? kv.correct ?? '0', 10);
    return {
        question,
        options,
        answer: Number.isNaN(answerIdx) ? 0 : Math.max(0, Math.min(options.length - 1, answerIdx)),
        explanation: kv.explanation || kv.reason || '',
    };
}

/**
 * Parse [SUGGEST: "Prompt 1" | "Prompt 2" | "Prompt 3"]
 */
export function parseSuggestPayload(rawPayload) {
    if (!rawPayload || typeof rawPayload !== 'string') return [];
    return rawPayload
        .split('|')
        .map(item => item.trim().replace(/^["'“”‘’]+|["'“”‘’]+$/g, '').trim())
        .filter(item => item.length > 2 && item.length <= 120 && item !== '...')
        .slice(0, 4);
}

/**
 * Context-aware fallback suggestion generator (0 extra LLM tokens)
 */
export function inferSmartSuggestions(content) {
    if (!content || typeof content !== 'string') return [];
    const trimmed = content.trim();
    if (trimmed.length < 180) return [];

    const lower = trimmed.toLowerCase();
    const suggestions = [];

    if (/```(?:html|svg|sandbox|preview|jsx|css)/i.test(trimmed)) {
        suggestions.push('Add dark/light theme toggle to this demo');
        suggestions.push('Explain how the interactive code works');
    } else if (/```(?:javascript|js|ts|python)/i.test(trimmed)) {
        suggestions.push('Build an interactive HTML demo of this');
        suggestions.push('How can we optimize this code further?');
    }

    if (lower.includes('saku') && (lower.includes('anki') || lower.includes('flashcard') || lower.includes('android'))) {
        suggestions.push('How does Saku sync with AnkiDroid offline?');
        suggestions.push('Show me visuals of the Saku App');
    } else if (lower.includes('orgi')) {
        suggestions.push('How does the Orgi Picks 3-step wizard work?');
        suggestions.push('Show me screenshots of Orgi');
    } else if (lower.includes('nebula')) {
        suggestions.push('How does Socket.IO sync the game loop in Nebula?');
        suggestions.push('Build a mini social deduction UI prototype');
    } else if (lower.includes('sakikaraoke') || lower.includes('karaoke')) {
        suggestions.push('How does SakiKaraoke correct playback drift?');
    } else if (lower.includes('charm store')) {
        suggestions.push('How was the custom admin page builder architected?');
    }

    if (suggestions.length === 0 && trimmed.length > 320) {
        if (lower.includes('react') || lower.includes('frontend') || lower.includes('ui') || lower.includes('component')) {
            suggestions.push('Create a live interactive prototype I can test');
            suggestions.push('Quiz me on this topic');
        } else if (lower.includes('project') || lower.includes('portfolio') || lower.includes('rithisak')) {
            suggestions.push('Compare the tech stacks across your top projects');
            suggestions.push('Which project was the most challenging to build?');
        }
    }

    return suggestions.slice(0, 3);
}

const COMBINED_TOKEN_REGEX = new RegExp(
    [
        '\\[NAV:([^\\]|]+)\\]([^[]*)\\[\\/NAV\\]',
        '\\[NAV:([^\\]|]+)\\|([^\\]]+)\\]',
        '\\[(?:VISUAL|IMAGE):([^\\]]+)\\]',
        '\\[STATS:([^\\]]+)\\]',
        '\\[QUIZ:([^\\]]+)\\]',
        '\\[(?:OPTIONS|CHOICES):([^\\]]+)\\]',
        '\\[(?:SUGGEST|SUGGESTIONS):([^\\]]+)\\]',
        `\\[(${WIDGET_TAG_PATTERN})\\s*:([^\\]]+)\\]`,
    ].join('|'),
    'gi'
);

/**
 * Parses full or partial bot message content into ordered renderable parts
 * and extracted follow-up suggestions.
 */
export function parseIntelligentMessage(rawContent, options = {}) {
    const { isTyping = false, allowAutoSuggestions = true } = options;

    if (typeof rawContent !== 'string') {
        return {
            parts: [{ type: 'text', value: String(rawContent ?? '') }],
            suggestions: [],
        };
    }

    const cleanContent = isTyping ? stripTrailingIncompleteTags(rawContent) : rawContent;
    const parts = [];
    const suggestions = [];
    let hasOptionsCard = false;

    let lastIndex = 0;
    let match;
    COMBINED_TOKEN_REGEX.lastIndex = 0;

    while ((match = COMBINED_TOKEN_REGEX.exec(cleanContent)) !== null) {
        if (match.index > lastIndex) {
            const textChunk = cleanContent.slice(lastIndex, match.index);
            if (textChunk.trim()) {
                parts.push({ type: 'text', value: textChunk });
            }
        }

        // 1. NAV token
        if (match[1] || match[3]) {
            const rawPath = match[1] || match[3];
            const rawLabel = (match[2] || match[4] || '').trim();
            const validatedPath = normalizeAndValidateRoute(rawPath);
            if (validatedPath && isValidNavLabel(rawLabel)) {
                parts.push({ type: 'nav', path: validatedPath, label: rawLabel });
            }
        }
        // 2. VISUAL / IMAGE token
        else if (match[5]) {
            const visualData = parseVisualPayload(match[5]);
            if (visualData) {
                parts.push({ type: 'visual', ...visualData });
            }
        }
        // 3. STATS token
        else if (match[6]) {
            const statsItems = parseStatsPayload(match[6]);
            if (statsItems.length > 0) {
                parts.push({ type: 'stats', items: statsItems });
            }
        }
        // 4. QUIZ token
        else if (match[7]) {
            const quizData = parseQuizPayload(match[7]);
            if (quizData) {
                parts.push({ type: 'quiz', ...quizData });
            }
        }
        // 5. OPTIONS / CHOICES card token (ChatGPT style radio selector card)
        else if (match[8]) {
            const optionsData = parseOptionsPayload(match[8]);
            if (optionsData) {
                hasOptionsCard = true;
                parts.push({ type: 'options', ...optionsData });
            }
        }
        // 7. Newer widget tags (steps, checklist, compare, chart, ...)
        else if (match[10]) {
            const widgetKey = WIDGET_ALIAS_TO_KEY[match[10].toUpperCase()];
            const widgetData = widgetKey ? WIDGET_TAGS[widgetKey].parse(match[11]) : null;
            if (widgetData) {
                if (INTERACTIVE_WIDGETS.has(widgetKey)) hasOptionsCard = true;
                parts.push({ type: widgetKey, ...widgetData });
            }
        }
        // 6. SUGGEST token
        else if (match[9]) {
            const parsedSuggestions = parseSuggestPayload(match[9]);
            for (const s of parsedSuggestions) {
                if (!suggestions.includes(s)) {
                    suggestions.push(s);
                }
            }
        }

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < cleanContent.length) {
        const remaining = cleanContent.slice(lastIndex);
        if (remaining.trim()) {
            parts.push({ type: 'text', value: remaining });
        }
    }

    if (parts.length === 0 && cleanContent.trim()) {
        parts.push({ type: 'text', value: cleanContent });
    }

    // If not typing and no explicit suggestions or options card were emitted, infer smart contextual ones
    if (!isTyping && allowAutoSuggestions && !hasOptionsCard && suggestions.length === 0) {
        const inferred = inferSmartSuggestions(cleanContent);
        suggestions.push(...inferred);
    }

    return {
        parts,
        suggestions: hasOptionsCard ? [] : suggestions.slice(0, 4),
    };
}
