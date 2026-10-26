import React, { memo, useMemo, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiCode,
    FiPlay,
    FiEdit3,
    FiRotateCcw,
    FiMaximize2,
    FiRefreshCw,
    FiTerminal,
    FiCheck,
    FiCopy,
    FiX,
    FiSmartphone,
    FiMonitor,
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';

import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-yaml';

const LANGUAGE_MAP = {
    js: 'javascript',
    javascript: 'javascript',
    jsx: 'jsx',
    ts: 'typescript',
    typescript: 'typescript',
    tsx: 'tsx',
    py: 'python',
    python: 'python',
    sh: 'bash',
    bash: 'bash',
    shell: 'bash',
    zsh: 'bash',
    json: 'json',
    css: 'css',
    html: 'markup',
    xml: 'markup',
    svg: 'markup',
    sandbox: 'markup',
    preview: 'markup',
    ui: 'markup',
    markup: 'markup',
    sql: 'sql',
    md: 'markdown',
    markdown: 'markdown',
    yml: 'yaml',
    yaml: 'yaml',
};

/**
 * Determines if a code block can be rendered as a visual interactive preview
 */
export function isVisualPreviewable(language, code) {
    const lang = (language || '').toLowerCase();
    if (['html', 'svg', 'sandbox', 'preview', 'ui'].includes(lang)) {
        return true;
    }
    if (lang === 'xml' && /<svg[\s>]/i.test(code)) {
        return true;
    }
    // Check if JS/JSX code is actually an HTML document or contains HTML markup block
    if ((lang === 'javascript' || lang === 'js' || lang === 'markup') && /^\s*<!DOCTYPE html>|^\s*<(?:div|section|main|button|canvas|svg|style|form)\b/i.test(code)) {
        return true;
    }
    return false;
}

/**
 * Determines if a code block can be executed in the JS console runner
 */
export function isJsConsoleRunnable(language, code) {
    const lang = (language || '').toLowerCase();
    if (!['javascript', 'js'].includes(lang)) return false;
    // Skip if it uses ES module imports from external node packages
    if (/^\s*import\s+.*from\s+['"][^'"]+['"]/m.test(code)) return false;
    return true;
}

/**
 * Constructs a complete, self-contained HTML document for the sandboxed iframe
 */
export function buildSandboxSrcDoc(rawCode, language) {
    const lang = (language || 'html').toLowerCase();
    const trimmed = (rawCode || '').trim();

    if (/<!DOCTYPE html>|<html[\s>]/i.test(trimmed)) {
        return trimmed;
    }

    const isSvg = lang === 'svg' || (/^<svg[\s>]/i.test(trimmed) && !/<script/i.test(trimmed));

    return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="https://cdn.tailwindcss.com"></script>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif;
    background-color: #0d1117;
    color: #e6edf3;
    min-height: 100vh;
    ${isSvg ? 'display: flex; align-items: center; justify-content: center;' : ''}
  }
</style>
</head>
<body>
${trimmed}
<script>
  window.addEventListener('error', function(e) {
    var errEl = document.getElementById('__saku_err');
    if (!errEl) {
      errEl = document.createElement('div');
      errEl.id = '__saku_err';
      errEl.style.cssText = 'position:fixed;bottom:8px;left:8px;right:8px;background:rgba(220,38,38,0.15);border:1px solid rgba(239,68,68,0.5);color:#fca5a5;padding:8px 12px;border-radius:8px;font-family:monospace;font-size:12px;z-index:9999;';
      document.body.appendChild(errEl);
    }
    errEl.textContent = 'Runtime Error: ' + e.message;
  });
</script>
</body>
</html>`;
}

function copyToClipboard(text) {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
    return new Promise((resolve, reject) => {
        const el = document.createElement('textarea');
        el.value = text;
        el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
        document.body.appendChild(el);
        el.focus();
        el.select();
        document.execCommand('copy') ? resolve() : reject();
        document.body.removeChild(el);
    });
}

const CodePlayground = memo(function CodePlayground({
    language,
    code,
    onOpenCanvas,
    onSendPrompt,
}) {
    const normalizedLang = (language || 'text').toLowerCase();
    const canVisualPreview = useMemo(() => isVisualPreviewable(normalizedLang, code), [normalizedLang, code]);
    const canRunJs = useMemo(() => !canVisualPreview && isJsConsoleRunnable(normalizedLang, code), [canVisualPreview, normalizedLang, code]);

    // Default to 'preview' for explicit `sandbox` or `preview` fenced blocks, otherwise 'code'
    const defaultTab = ['sandbox', 'preview', 'ui'].includes(normalizedLang) ? 'preview' : 'code';

    const [activeTab, setActiveTab] = useState(defaultTab);
    const [editableCode, setEditableCode] = useState(code);
    const [iframeKey, setIframeKey] = useState(0);
    const [copyState, setCopyState] = useState('idle');
    const [jsLogs, setJsLogs] = useState(null);
    const [isRunningJs, setIsRunningJs] = useState(false);
    const [isModalCanvasOpen, setIsModalCanvasOpen] = useState(false);
    const [viewportMode, setViewportMode] = useState('desktop');

    // Sync editableCode if the incoming AI code grows during streaming
    useEffect(() => {
        setEditableCode(code);
    }, [code]);

    const prismLang = LANGUAGE_MAP[normalizedLang] || (Prism.languages[normalizedLang] ? normalizedLang : null);

    const highlightedHtml = useMemo(() => {
        if (prismLang && Prism.languages[prismLang]) {
            try {
                return Prism.highlight(editableCode, Prism.languages[prismLang], prismLang);
            } catch {
                return null;
            }
        }
        return null;
    }, [editableCode, prismLang]);

    const srcDoc = useMemo(() => {
        if (!canVisualPreview) return '';
        return buildSandboxSrcDoc(editableCode, normalizedLang);
    }, [canVisualPreview, editableCode, normalizedLang]);

    const handleCopy = useCallback(() => {
        if (copyState !== 'idle') return;
        copyToClipboard(editableCode)
            .then(() => {
                setCopyState('copied');
                setTimeout(() => setCopyState('idle'), 2000);
            })
            .catch(() => {
                setCopyState('error');
                setTimeout(() => setCopyState('idle'), 2000);
            });
    }, [copyState, editableCode]);

    const handleResetCode = useCallback(() => {
        setEditableCode(code);
        setIframeKey(k => k + 1);
        setJsLogs(null);
    }, [code]);

    const handleRunJsConsole = useCallback(() => {
        setIsRunningJs(true);
        setJsLogs([]);

        const logs = [];
        const formatVal = (v) => {
            if (typeof v === 'object' && v !== null) {
                try {
                    return JSON.stringify(v, null, 2);
                } catch {
                    return String(v);
                }
            }
            return String(v);
        };

        try {
            const customConsole = {
                log: (...args) => logs.push({ level: 'log', text: args.map(formatVal).join(' ') }),
                warn: (...args) => logs.push({ level: 'warn', text: args.map(formatVal).join(' ') }),
                error: (...args) => logs.push({ level: 'error', text: args.map(formatVal).join(' ') }),
                info: (...args) => logs.push({ level: 'log', text: args.map(formatVal).join(' ') }),
            };

            const fn = new Function('console', `"use strict";\n${editableCode}`);
            const returnVal = fn(customConsole);
            if (returnVal !== undefined) {
                logs.push({ level: 'return', text: `→ ${formatVal(returnVal)}` });
            }
            if (logs.length === 0) {
                logs.push({ level: 'info', text: '✓ Executed successfully (no console output).' });
            }
        } catch (err) {
            logs.push({ level: 'error', text: `${err.name}: ${err.message}` });
        } finally {
            setJsLogs(logs);
            setIsRunningJs(false);
        }
    }, [editableCode]);

    const handleExpandCanvas = useCallback(() => {
        if (onOpenCanvas) {
            onOpenCanvas({
                code: editableCode,
                language: normalizedLang,
                title: `Interactive ${normalizedLang.toUpperCase()} Sandbox`,
            });
        } else {
            setIsModalCanvasOpen(true);
        }
    }, [onOpenCanvas, editableCode, normalizedLang]);

    const hasModified = editableCode !== code;

    return (
        <>
            <div className="relative my-4 rounded-xl overflow-hidden border border-(--border-light) bg-[#0d1117] text-[#e6edf3] shadow-sm max-w-full code-theme-dark">
                {/* Top Intelligent Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-[#161b22] px-3 py-2 text-xs text-[#8b949e] border-b border-[#30363d]">
                    <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold uppercase tracking-wider text-[11px] text-[#c9d1d9] px-1.5 py-0.5 rounded bg-[#21262d] border border-[#30363d]">
                            {normalizedLang === 'sandbox' ? 'Interactive UI' : normalizedLang}
                        </span>

                        {/* Mode Switcher Tabs for Visual Previewable Code */}
                        {canVisualPreview && (
                            <div className="flex items-center rounded-lg bg-[#0d1117] p-0.5 border border-[#30363d]">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('code')}
                                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                                        activeTab === 'code'
                                            ? 'bg-[#21262d] text-[#f0f6fc]'
                                            : 'text-[#8b949e] hover:text-[#c9d1d9]'
                                    }`}
                                >
                                    <FiCode size={12} />
                                    <span>Code</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('preview')}
                                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                                        activeTab === 'preview'
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                            : 'text-[#8b949e] hover:text-[#c9d1d9]'
                                    }`}
                                >
                                    <FiPlay size={11} />
                                    <span>Live Preview</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('experiment')}
                                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                                        activeTab === 'experiment'
                                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                            : 'text-[#8b949e] hover:text-[#c9d1d9]'
                                    }`}
                                >
                                    <FiEdit3 size={11} />
                                    <span>Experiment</span>
                                </button>
                            </div>
                        )}

                        {/* JS Console Runner Tabs */}
                        {canRunJs && (
                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={handleRunJsConsole}
                                    disabled={isRunningJs}
                                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-[11px] font-medium transition-colors cursor-pointer"
                                >
                                    <FiPlay size={11} />
                                    <span>Run JS</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab(activeTab === 'experiment' ? 'code' : 'experiment')}
                                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                                        activeTab === 'experiment'
                                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                            : 'hover:bg-[#30363d] text-[#8b949e] hover:text-[#f0f6fc]'
                                    }`}
                                >
                                    <FiEdit3 size={11} />
                                    <span>{activeTab === 'experiment' ? 'View Highlighted' : 'Edit & Test'}</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-1">
                        {hasModified && (
                            <button
                                type="button"
                                onClick={handleResetCode}
                                title="Reset to original AI code"
                                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#30363d] text-amber-400 transition-colors cursor-pointer text-[11px]"
                            >
                                <FiRotateCcw size={12} />
                                <span className="hidden sm:inline">Reset</span>
                            </button>
                        )}

                        {canVisualPreview && (
                            <button
                                type="button"
                                onClick={handleExpandCanvas}
                                title="Open in interactive Canvas workspace"
                                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#30363d] hover:text-[#f0f6fc] transition-colors cursor-pointer text-[11px] font-medium text-emerald-400"
                            >
                                <FiMaximize2 size={12} />
                                <span className="hidden sm:inline">Canvas</span>
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={handleCopy}
                            className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-[#30363d] hover:text-[#f0f6fc] transition-colors cursor-pointer select-none text-xs font-medium"
                            aria-label="Copy code to clipboard"
                        >
                            {copyState === 'copied' ? (
                                <>
                                    <FiCheck className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-400">Copied</span>
                                </>
                            ) : (
                                <>
                                    <FiCopy className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Body Content */}
                {activeTab === 'code' && (
                    <div className="overflow-x-auto max-h-[420px]">
                        <pre className="m-0 p-4 text-[13.5px] leading-relaxed font-mono overflow-x-auto bg-transparent">
                            {highlightedHtml ? (
                                <code
                                    className={`language-${normalizedLang}`}
                                    dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                                />
                            ) : (
                                <code className={`language-${normalizedLang}`}>{editableCode}</code>
                            )}
                        </pre>
                    </div>
                )}

                {activeTab === 'preview' && canVisualPreview && (
                    <div className="relative bg-[#0d1117]">
                        <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22]/60 border-b border-[#30363d] text-[11px] text-[#8b949e]">
                            <span className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                Live Interactive Sandbox — Feel free to click & interact
                            </span>
                            <button
                                type="button"
                                onClick={() => setIframeKey(k => k + 1)}
                                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                                title="Reload sandbox"
                            >
                                <FiRefreshCw size={11} />
                                <span>Reload</span>
                            </button>
                        </div>
                        <iframe
                            key={iframeKey}
                            title="SakuPilot Live Sandbox"
                            srcDoc={srcDoc}
                            sandbox="allow-scripts"
                            className="w-full h-[320px] sm:h-[360px] border-0 bg-[#0d1117]"
                        />
                    </div>
                )}

                {activeTab === 'experiment' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#30363d]">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22]/70 border-b border-[#30363d] text-[11px] text-[#8b949e]">
                                <span>Live Code Editor (Edit below to experiment)</span>
                                {canRunJs && (
                                    <button
                                        type="button"
                                        onClick={handleRunJsConsole}
                                        className="text-emerald-400 hover:underline font-medium cursor-pointer"
                                    >
                                        ▶ Run Changes
                                    </button>
                                )}
                            </div>
                            <textarea
                                value={editableCode}
                                onChange={(e) => setEditableCode(e.target.value)}
                                spellCheck={false}
                                className="w-full h-[280px] sm:h-[320px] p-3.5 bg-[#0d1117] text-[#e6edf3] font-mono text-[13px] leading-relaxed resize-y outline-none"
                            />
                        </div>
                        {canVisualPreview && (
                            <div className="flex flex-col bg-[#0d1117]">
                                <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22]/70 border-b border-[#30363d] text-[11px] text-[#8b949e]">
                                    <span className="text-emerald-400 font-medium">Real-Time Output</span>
                                    <button
                                        type="button"
                                        onClick={() => setIframeKey(k => k + 1)}
                                        className="hover:text-white cursor-pointer"
                                    >
                                        <FiRefreshCw size={11} />
                                    </button>
                                </div>
                                <iframe
                                    key={iframeKey}
                                    title="SakuPilot Live Experiment"
                                    srcDoc={srcDoc}
                                    sandbox="allow-scripts"
                                    className="w-full h-[280px] sm:h-[320px] border-0 bg-[#0d1117]"
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* JS Console Output Drawer */}
                <AnimatePresence>
                    {jsLogs && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-[#30363d] bg-[#090d11]"
                        >
                            <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#161b22] text-[11px] text-[#8b949e]">
                                <div className="flex items-center gap-1.5 font-mono">
                                    <FiTerminal className="text-emerald-400" size={12} />
                                    <span>Console Output</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setJsLogs(null)}
                                    className="hover:text-white transition-colors cursor-pointer"
                                >
                                    <FiX size={13} />
                                </button>
                            </div>
                            <div className="p-3 font-mono text-xs space-y-1 max-h-44 overflow-y-auto">
                                {jsLogs.map((entry, i) => (
                                    <div
                                        key={i}
                                        className={`whitespace-pre-wrap break-all ${
                                            entry.level === 'error'
                                                ? 'text-red-400'
                                                : entry.level === 'warn'
                                                ? 'text-amber-400'
                                                : entry.level === 'return'
                                                ? 'text-emerald-400 font-semibold'
                                                : 'text-[#e6edf3]'
                                        }`}
                                    >
                                        {entry.text}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Standalone Fullscreen Canvas Modal (used when in Floating Chat or when no split-pane callback is passed) */}
            {isModalCanvasOpen && typeof document !== 'undefined' && createPortal(
                <div
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-2 sm:p-6 backdrop-blur-xs"
                    onClick={() => setIsModalCanvasOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex flex-col w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden border border-[#30363d] bg-[#0d1117] text-[#e6edf3] shadow-2xl"
                    >
                        {/* Canvas Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                            <div className="flex items-center gap-2.5">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                                    <HiOutlineSparkles size={16} />
                                </span>
                                <div>
                                    <h3 className="text-sm font-bold text-white leading-tight">SakuPilot Interactive Canvas</h3>
                                    <p className="text-[11px] text-[#8b949e]">Edit code and test responsive viewports live</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="hidden sm:flex items-center rounded-lg bg-[#0d1117] p-0.5 border border-[#30363d] text-xs">
                                    <button
                                        type="button"
                                        onClick={() => setViewportMode('desktop')}
                                        className={`flex items-center gap-1 px-2.5 py-1 rounded-md cursor-pointer ${
                                            viewportMode === 'desktop' ? 'bg-[#21262d] text-white' : 'text-[#8b949e]'
                                        }`}
                                    >
                                        <FiMonitor size={12} />
                                        <span>Desktop</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setViewportMode('mobile')}
                                        className={`flex items-center gap-1 px-2.5 py-1 rounded-md cursor-pointer ${
                                            viewportMode === 'mobile' ? 'bg-[#21262d] text-white' : 'text-[#8b949e]'
                                        }`}
                                    >
                                        <FiSmartphone size={12} />
                                        <span>Mobile</span>
                                    </button>
                                </div>

                                {onSendPrompt && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsModalCanvasOpen(false);
                                            onSendPrompt('Enhance this interactive prototype with more features and animations');
                                        }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 text-xs font-medium cursor-pointer"
                                    >
                                        <HiOutlineSparkles size={13} />
                                        <span>Ask AI to Enhance</span>
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={() => setIsModalCanvasOpen(false)}
                                    className="rounded-lg p-1.5 text-[#8b949e] hover:bg-[#30363d] hover:text-white transition-colors cursor-pointer"
                                    aria-label="Close Canvas"
                                >
                                    <FiX size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Split Editor + Live Preview */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-0 divide-y md:divide-y-0 md:divide-x divide-[#30363d]">
                            <div className="md:col-span-5 flex flex-col min-h-0">
                                <div className="flex items-center justify-between px-3.5 py-2 bg-[#161b22]/60 border-b border-[#30363d] text-xs text-[#8b949e]">
                                    <span>Source Code</span>
                                    {hasModified && (
                                        <button
                                            type="button"
                                            onClick={handleResetCode}
                                            className="text-amber-400 hover:underline text-[11px] cursor-pointer"
                                        >
                                            Reset Code
                                        </button>
                                    )}
                                </div>
                                <textarea
                                    value={editableCode}
                                    onChange={(e) => setEditableCode(e.target.value)}
                                    spellCheck={false}
                                    className="flex-1 w-full p-4 bg-[#0d1117] text-[#e6edf3] font-mono text-[13px] leading-relaxed resize-none outline-none"
                                />
                            </div>
                            <div className="md:col-span-7 flex flex-col items-center justify-center bg-[#090d11] p-3 min-h-0 overflow-auto">
                                <div
                                    className={`h-full transition-all duration-300 rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117] shadow-xl ${
                                        viewportMode === 'mobile' ? 'w-[375px] max-w-full' : 'w-full'
                                    }`}
                                >
                                    <iframe
                                        key={iframeKey}
                                        title="SakuPilot Fullscreen Canvas"
                                        srcDoc={srcDoc}
                                        sandbox="allow-scripts"
                                        className="w-full h-full border-0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
});

export default CodePlayground;
