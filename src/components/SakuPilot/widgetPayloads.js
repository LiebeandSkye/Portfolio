// ─────────────────────────────────────────────────────────────────────────────
// Payload parsers for Intelligent UI components.
//
// Every tag looks like  [TAG: segment | segment | segment]
//  - segments are split on "|" (pipes inside "double quotes" are kept)
//  - a segment is either  key="value"  or a bare item such as  "Label — note"
//
// Each parser returns plain data (or null / [] when the payload is unusable)
// so the UI never has to guard against half-formed model output.
// ─────────────────────────────────────────────────────────────────────────────

const QUOTE_EDGES = /^["'“”‘’]+|["'“”‘’]+$/g;

export function stripQuotes(value) {
    return String(value ?? '').trim().replace(QUOTE_EDGES, '').trim();
}

/**
 * Splits a payload on "|" but keeps pipes that sit inside "double quotes".
 * Falls back to a plain split when quotes are unbalanced.
 */
export function splitSegments(payload) {
    if (typeof payload !== 'string') return [];

    const segments = [];
    let current = '';
    let inQuote = false;

    for (const ch of payload) {
        if (ch === '"' || ch === '“' || ch === '”') inQuote = !inQuote;
        if (ch === '|' && !inQuote) {
            segments.push(current);
            current = '';
            continue;
        }
        current += ch;
    }
    segments.push(current);

    const cleaned = inQuote ? payload.split('|') : segments;
    return cleaned.map(s => s.trim()).filter(Boolean);
}

/**
 * Parses key="value" / key='value' / key=value pairs inside a payload.
 */
export function parseKeyValuePairs(payloadStr) {
    const result = {};
    if (!payloadStr || typeof payloadStr !== 'string') return result;

    const kvRegex = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^|,\]]+))/g;
    let match;
    while ((match = kvRegex.exec(payloadStr)) !== null) {
        const key = match[1].trim().toLowerCase();
        const val = (match[2] ?? match[3] ?? match[4] ?? '').trim();
        result[key] = val;
    }
    return result;
}

/**
 * "Label — short note"  ->  { label, description, raw }
 */
export function splitLabelDesc(rawOpt) {
    const cleaned = stripQuotes(rawOpt);
    if (!cleaned) return null;

    const dashMatch = /^(.+?)\s+(?:—|–|-)\s+(.+)$/.exec(cleaned);
    if (dashMatch) {
        return {
            label: dashMatch[1].trim(),
            description: dashMatch[2].trim(),
            raw: cleaned,
        };
    }
    return { label: cleaned, description: '', raw: cleaned };
}

function splitList(raw, limit) {
    return String(raw ?? '')
        .split(';')
        .map(stripQuotes)
        .filter(Boolean)
        .slice(0, limit);
}

/**
 * Separates "key=value" segments (only for known meta keys) from bare items.
 */
function readSegments(payload, metaKeys = ['title']) {
    const meta = {};
    const items = [];
    for (const seg of splitSegments(payload)) {
        const m = /^(\w+)\s*=\s*([\s\S]+)$/.exec(seg);
        if (m && metaKeys.includes(m[1].toLowerCase())) {
            meta[m[1].toLowerCase()] = stripQuotes(m[2]);
        } else {
            items.push(seg);
        }
    }
    return { meta, items };
}

function toNumber(raw) {
    const cleaned = String(raw ?? '').replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
    if (!cleaned) return null;
    const n = Number.parseFloat(cleaned[0]);
    return Number.isFinite(n) ? n : null;
}

/** "Label: 42" or "Label — 42%"  ->  { label, value } */
function parseLabelNumber(raw) {
    const text = stripQuotes(raw);
    const m = /^(.+?)\s*(?::|—|–)\s*(-?[\d.,]+\s*(?:\/\s*[\d.,]+)?)\s*[%a-zA-Z]*$/.exec(text);
    if (!m) return null;
    const value = toNumber(m[2]);
    if (value === null) return null;
    return { label: m[1].trim(), value, ratio: m[2].includes('/') ? m[2] : null };
}

// ── STEPS ────────────────────────────────────────────────────────────────────
// [STEPS: title="Get it running" | "Install — npm install" | "Start — npm run dev"]
export function parseStepsPayload(raw) {
    const { meta, items } = readSegments(raw);
    const steps = items.map(splitLabelDesc).filter(Boolean).slice(0, 8);
    if (steps.length < 2) return null;
    return { title: meta.title || '', steps };
}

// ── CHECKLIST ────────────────────────────────────────────────────────────────
// [CHECKLIST: title="Before deploy" | "Env vars set" | "✓ Build passes"]
export function parseChecklistPayload(raw) {
    const { meta, items } = readSegments(raw);
    const list = items
        .map(item => {
            const text = stripQuotes(item);
            const done = /^(?:✓|✔|\+)\s*/.test(text);
            return { label: text.replace(/^(?:✓|✔|\+)\s*/, '').trim(), done };
        })
        .filter(i => i.label)
        .slice(0, 10);
    if (list.length === 0) return null;
    return { title: meta.title || '', items: list };
}

// ── CALLOUT ──────────────────────────────────────────────────────────────────
// [CALLOUT: type="tip" | title="Quick tip" | text="Memoize only when needed."]
const CALLOUT_TYPES = {
    tip: 'tip',
    idea: 'tip',
    info: 'info',
    note: 'info',
    warning: 'warning',
    warn: 'warning',
    caution: 'warning',
    success: 'success',
    done: 'success',
    danger: 'danger',
    error: 'danger',
};

export function parseCalloutPayload(raw) {
    const kv = parseKeyValuePairs(raw);
    const text = kv.text || kv.body || kv.message || '';
    if (!text) return null;
    return {
        variant: CALLOUT_TYPES[(kv.type || kv.kind || 'info').toLowerCase()] || 'info',
        title: kv.title || '',
        text,
    };
}

// ── COMPARE ──────────────────────────────────────────────────────────────────
// [COMPARE: title="React vs Vue" | columns="React;Vue" | "Learning curve: Medium; Easy" | "Ecosystem: Huge; Large"]
export function parseComparePayload(raw) {
    const { meta, items } = readSegments(raw, ['title', 'columns', 'cols']);
    const columns = splitList(meta.columns || meta.cols, 4);

    const rows = items
        .map(item => {
            const text = stripQuotes(item.replace(/^row\s*=\s*/i, ''));
            const colon = text.indexOf(':');
            if (colon < 1) return null;
            const label = text.slice(0, colon).trim();
            const cells = splitList(text.slice(colon + 1), 4);
            return label && cells.length > 0 ? { label, cells } : null;
        })
        .filter(Boolean)
        .slice(0, 8);

    if (columns.length < 2 || rows.length === 0) return null;
    return {
        title: meta.title || '',
        columns,
        rows: rows.map(r => ({
            label: r.label,
            cells: columns.map((_, i) => r.cells[i] ?? '–'),
        })),
    };
}

// ── PROS & CONS ──────────────────────────────────────────────────────────────
// [PROSCONS: title="Next.js" | pros="Fast;Great SEO" | cons="Heavier;More setup"]
export function parseProsConsPayload(raw) {
    const kv = parseKeyValuePairs(raw);
    const pros = splitList(kv.pros || kv.pro, 6);
    const cons = splitList(kv.cons || kv.con, 6);
    if (pros.length + cons.length === 0) return null;
    return { title: kv.title || '', pros, cons };
}

// ── TABS ─────────────────────────────────────────────────────────────────────
// [TABS: "Overview": text here | "Setup": more text]
export function parseTabsPayload(raw) {
    const { meta, items } = readSegments(raw);
    const tabs = items
        .map(item => {
            const m = /^(?:tab\s*=\s*)?(?:"([^"]+)"|“([^”]+)”|'([^']+)'|([^:"]+?))\s*:\s*([\s\S]+)$/.exec(item);
            if (!m) return null;
            const label = (m[1] || m[2] || m[3] || m[4] || '').trim();
            const content = stripQuotes(m[5]);
            return label && content ? { label, content } : null;
        })
        .filter(Boolean)
        .slice(0, 5);
    if (tabs.length < 2) return null;
    return { title: meta.title || '', tabs };
}

// ── FAQ ──────────────────────────────────────────────────────────────────────
// [FAQ: "Is it free? — Yes, completely." | "Needs login? — No."]
export function parseFaqPayload(raw) {
    const { meta, items } = readSegments(raw);
    const faqs = items
        .map(splitLabelDesc)
        .filter(i => i && i.description)
        .map(i => ({ question: i.label, answer: i.description }))
        .slice(0, 6);
    if (faqs.length === 0) return null;
    return { title: meta.title || '', items: faqs };
}

// ── TIMELINE ─────────────────────────────────────────────────────────────────
// [TIMELINE: title="Journey" | "2023 — Learned React" | "2024 — Shipped Charm Store"]
export function parseTimelinePayload(raw) {
    const { meta, items } = readSegments(raw);
    const events = items
        .map(splitLabelDesc)
        .filter(i => i && i.description)
        .map(i => ({ when: i.label, text: i.description }))
        .slice(0, 8);
    if (events.length < 2) return null;
    return { title: meta.title || '', events };
}

// ── PROGRESS ─────────────────────────────────────────────────────────────────
// [PROGRESS: title="Skills" | "React: 90" | "Node.js: 80%" | "Docs: 3/4"]
export function parseProgressPayload(raw) {
    const { meta, items } = readSegments(raw);
    const bars = items
        .map(item => {
            const parsed = parseLabelNumber(item);
            if (!parsed) return null;
            let percent = parsed.value;
            if (parsed.ratio) {
                const [a, b] = parsed.ratio.split('/').map(toNumber);
                percent = b ? (a / b) * 100 : 0;
            }
            return {
                label: parsed.label,
                percent: Math.max(0, Math.min(100, Math.round(percent))),
            };
        })
        .filter(Boolean)
        .slice(0, 8);
    if (bars.length === 0) return null;
    return { title: meta.title || '', bars };
}

// ── CHART ────────────────────────────────────────────────────────────────────
// [CHART: type="bar" | title="Bundle size" | unit="KB" | "React: 42" | "Vue: 34"]
const CHART_TYPES = new Set(['bar', 'donut', 'line']);

export function parseChartPayload(raw) {
    const { meta, items } = readSegments(raw, ['title', 'type', 'unit']);
    const points = items
        .map(parseLabelNumber)
        .filter(Boolean)
        .map(p => ({ label: p.label, value: p.value }))
        .slice(0, 8);

    const type = CHART_TYPES.has((meta.type || '').toLowerCase()) ? meta.type.toLowerCase() : 'bar';
    const minPoints = type === 'line' ? 3 : 2;
    if (points.length < minPoints) return null;
    if (type === 'donut' && points.some(p => p.value < 0)) return null;

    return { chartType: type, title: meta.title || '', unit: meta.unit || '', points };
}

// ── CARDS ────────────────────────────────────────────────────────────────────
// [CARDS: title="I can help with" | label="Projects", text="See what I built", icon="code", prompt="Show me your projects"]
export function parseCardsPayload(raw) {
    const segments = splitSegments(raw);
    let title = '';
    const cards = [];

    for (const seg of segments) {
        const kv = parseKeyValuePairs(seg);
        if (kv.label) {
            cards.push({
                label: kv.label,
                text: kv.text || kv.description || '',
                icon: kv.icon || 'sparkles',
                prompt: kv.prompt || `Tell me about ${kv.label}`,
            });
        } else if (kv.title && !title) {
            title = kv.title;
        }
    }

    const limited = cards.slice(0, 6);
    if (limited.length === 0) return null;
    return { title, cards: limited };
}

// ── LINKS ────────────────────────────────────────────────────────────────────
// [LINKS: label="GitHub", url="https://github.com/LiebeandSkye" | label="Live demo", url="https://…"]
export function safeHttpUrl(rawUrl) {
    try {
        const url = new URL(String(rawUrl || '').trim());
        if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
        return url;
    } catch {
        return null;
    }
}

export function parseLinksPayload(raw) {
    const links = [];
    let title = '';
    for (const seg of splitSegments(raw)) {
        const kv = parseKeyValuePairs(seg);
        if (kv.url) {
            const url = safeHttpUrl(kv.url);
            if (!url) continue;
            links.push({
                label: kv.label || url.hostname.replace(/^www\./, ''),
                url: url.href,
                domain: url.hostname.replace(/^www\./, ''),
            });
        } else if (kv.title && !title) {
            title = kv.title;
        }
    }
    const limited = links.slice(0, 5);
    if (limited.length === 0) return null;
    return { title, links: limited };
}

// ── PICK (chip selector) ─────────────────────────────────────────────────────
// [PICK: title="What do you want to learn?" | options="React;Node;CSS" | multi="true" | button="Plan my path"]
export function parsePickPayload(raw) {
    const kv = parseKeyValuePairs(raw);
    const options = splitList(kv.options || kv.choices, 10);
    if (options.length < 2) return null;
    return {
        title: kv.title || 'Pick what fits',
        options,
        multi: /^(true|yes|1)$/i.test(kv.multi || kv.multiple || ''),
        buttonLabel: kv.button || kv.cta || 'Continue',
    };
}

// ── ASK (single input) ───────────────────────────────────────────────────────
// [ASK: title="What are you building?" | placeholder="e.g. a todo app" | button="Suggest a stack"]
export function parseAskPayload(raw) {
    const kv = parseKeyValuePairs(raw);
    if (!kv.title && !kv.placeholder) return null;
    return {
        title: kv.title || '',
        placeholder: kv.placeholder || 'Type your answer',
        buttonLabel: kv.button || kv.cta || 'Send',
    };
}

// ── PROJECT (portfolio project cards) ────────────────────────────────────────
// [PROJECT: id="7"]  or  [PROJECT: ids="7;8"]
export function parseProjectPayload(raw) {
    const kv = parseKeyValuePairs(raw);
    const source = kv.ids || kv.id || String(raw || '').replace(/["']/g, '');
    const ids = [...new Set(
        String(source)
            .split(/[;,\s]+/)
            .map(s => Number.parseInt(s, 10))
            .filter(n => Number.isInteger(n) && n > 0)
    )].slice(0, 3);
    if (ids.length === 0) return null;
    return { ids };
}
