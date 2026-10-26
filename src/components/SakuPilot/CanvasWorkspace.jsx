import React, { memo, useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FiCode,
    FiPlay,
    FiColumns,
    FiMonitor,
    FiSmartphone,
    FiRefreshCw,
    FiRotateCcw,
    FiCopy,
    FiCheck,
    FiX,
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { buildSandboxSrcDoc } from './CodePlayground';

const CANVAS_AI_ACTIONS = [
    { label: 'Polish UI & Animations', prompt: 'Upgrade this interactive UI with smoother animations, better glassmorphism/styling, and micro-interactions.' },
    { label: 'Add Interactive Features', prompt: 'Add more interactive controls, state feedback, and useful features to this sandbox demo.' },
    { label: 'Make Fully Responsive', prompt: 'Optimize this layout so it adapts seamlessly across both mobile and desktop screens.' },
];

const CanvasWorkspace = memo(function CanvasWorkspace({
    canvasData,
    onClose,
    onSendPrompt,
}) {
    const [code, setCode] = useState(canvasData?.code || '');
    const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'code' | 'split'
    const [viewport, setViewport] = useState('desktop'); // 'desktop' | 'mobile'
    const [iframeKey, setIframeKey] = useState(0);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (canvasData?.code) {
            setCode(canvasData.code);
            setIframeKey(k => k + 1);
        }
    }, [canvasData?.code]);

    const srcDoc = useMemo(
        () => buildSandboxSrcDoc(code, canvasData?.language || 'html'),
        [code, canvasData?.language]
    );

    if (!canvasData) return null;

    const hasEdited = code !== canvasData.code;

    const handleCopy = () => {
        navigator.clipboard?.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[90] lg:static lg:z-auto flex flex-col w-full lg:w-[50%] xl:w-[54%] h-full border-l border-(--border-light) bg-[#0d1117] text-[#e6edf3] shadow-2xl"
        >
            {/* Top Canvas Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#161b22] border-b border-[#30363d] shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <HiOutlineSparkles size={15} />
                    </span>
                    <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                            {canvasData.title || 'SakuPilot Interactive Canvas'}
                        </h3>
                        <p className="text-[10px] text-[#8b949e] truncate">
                            Live Sandbox • Edit code or ask SakuPilot to iterate
                        </p>
                    </div>
                </div>

                {/* Mode Switcher */}
                <div className="flex items-center gap-1.5">
                    <div className="flex items-center rounded-lg bg-[#0d1117] p-0.5 border border-[#30363d] text-xs">
                        <button
                            type="button"
                            onClick={() => setViewMode('preview')}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
                                viewMode === 'preview'
                                    ? 'bg-emerald-500/20 text-emerald-400 font-medium'
                                    : 'text-[#8b949e] hover:text-white'
                            }`}
                        >
                            <FiPlay size={11} />
                            <span>Preview</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('split')}
                            className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
                                viewMode === 'split'
                                    ? 'bg-blue-500/20 text-blue-400 font-medium'
                                    : 'text-[#8b949e] hover:text-white'
                            }`}
                        >
                            <FiColumns size={11} />
                            <span>Split</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('code')}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
                                viewMode === 'code'
                                    ? 'bg-[#21262d] text-white font-medium'
                                    : 'text-[#8b949e] hover:text-white'
                            }`}
                        >
                            <FiCode size={11} />
                            <span>Code</span>
                        </button>
                    </div>

                    {/* Viewport Toggle */}
                    {viewMode !== 'code' && (
                        <div className="hidden sm:flex items-center rounded-lg bg-[#0d1117] p-0.5 border border-[#30363d]">
                            <button
                                type="button"
                                onClick={() => setViewport('desktop')}
                                title="Desktop viewport"
                                className={`p-1.5 rounded-md cursor-pointer ${
                                    viewport === 'desktop' ? 'bg-[#21262d] text-white' : 'text-[#8b949e]'
                                }`}
                            >
                                <FiMonitor size={13} />
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewport('mobile')}
                                title="Mobile viewport"
                                className={`p-1.5 rounded-md cursor-pointer ${
                                    viewport === 'mobile' ? 'bg-[#21262d] text-white' : 'text-[#8b949e]'
                                }`}
                            >
                                <FiSmartphone size={13} />
                            </button>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={() => setIframeKey(k => k + 1)}
                        title="Reload Preview"
                        className="p-1.5 rounded-lg text-[#8b949e] hover:bg-[#30363d] hover:text-white transition-colors cursor-pointer"
                    >
                        <FiRefreshCw size={14} />
                    </button>

                    {hasEdited && (
                        <button
                            type="button"
                            onClick={() => setCode(canvasData.code)}
                            title="Reset changes"
                            className="p-1.5 rounded-lg text-amber-400 hover:bg-[#30363d] transition-colors cursor-pointer"
                        >
                            <FiRotateCcw size={14} />
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={handleCopy}
                        title="Copy Code"
                        className="p-1.5 rounded-lg text-[#8b949e] hover:bg-[#30363d] hover:text-white transition-colors cursor-pointer"
                    >
                        {copied ? <FiCheck size={14} className="text-emerald-400" /> : <FiCopy size={14} />}
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        title="Close Canvas"
                        className="p-1.5 rounded-lg text-[#8b949e] hover:bg-[#30363d] hover:text-white transition-colors cursor-pointer"
                    >
                        <FiX size={16} />
                    </button>
                </div>
            </div>

            {/* Main Workspace Area */}
            <div className="flex-1 flex min-h-0 overflow-hidden bg-[#090d11]">
                {(viewMode === 'code' || viewMode === 'split') && (
                    <div
                        className={`flex flex-col min-h-0 border-r border-[#30363d] ${
                            viewMode === 'split' ? 'w-1/2' : 'w-full'
                        }`}
                    >
                        <div className="px-3.5 py-1.5 bg-[#161b22]/60 border-b border-[#30363d] text-[11px] text-[#8b949e] flex justify-between">
                            <span>Live Source Editor</span>
                            <span className="font-mono uppercase">{canvasData.language || 'html'}</span>
                        </div>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck={false}
                            className="flex-1 w-full p-4 bg-[#0d1117] text-[#e6edf3] font-mono text-[13px] leading-relaxed resize-none outline-none"
                        />
                    </div>
                )}

                {(viewMode === 'preview' || viewMode === 'split') && (
                    <div
                        className={`flex flex-col items-center justify-center p-2 sm:p-4 min-h-0 overflow-auto ${
                            viewMode === 'split' ? 'w-1/2' : 'w-full'
                        }`}
                    >
                        <div
                            className={`h-full transition-all duration-300 rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117] shadow-xl ${
                                viewport === 'mobile' ? 'w-[375px] max-w-full' : 'w-full'
                            }`}
                        >
                            <iframe
                                key={iframeKey}
                                title="SakuPilot Split Canvas"
                                srcDoc={srcDoc}
                                sandbox="allow-scripts"
                                className="w-full h-full border-0 bg-[#0d1117]"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom AI Iteration Bar */}
            {onSendPrompt && (
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#161b22] border-t border-[#30363d] shrink-0">
                    <span className="text-[11px] font-medium text-[#8b949e] flex items-center gap-1.5">
                        <HiOutlineSparkles className="text-emerald-400" />
                        Iterate with AI:
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                        {CANVAS_AI_ACTIONS.map((action) => (
                            <button
                                key={action.label}
                                type="button"
                                onClick={() => onSendPrompt(action.prompt)}
                                className="px-2.5 py-1 rounded-lg bg-[#21262d] hover:bg-emerald-500/20 text-[#c9d1d9] hover:text-emerald-400 border border-[#30363d] hover:border-emerald-500/30 text-[11px] font-medium transition-colors cursor-pointer"
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </motion.aside>
    );
});

export default CanvasWorkspace;
