import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { IoLockClosed } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { useLanguage } from '../context/LanguageContext';
import sorryImg from '../../assets/Tools/Sakupilot_sorry.png';

const PrivateRepoModal = ({ isOpen, onClose, projectTitle }) => {
    const { t } = useLanguage();

    // Close on Escape key
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop — flat dim, no blur */}
            <div
                className="pr-anim-backdrop absolute inset-0 bg-black/70"
                style={{ animation: 'prRepoBackdropIn 0.18s ease-out forwards' }}
            />

            {/* Everything lives in an overflow-visible wrapper so the mascot
                can break out of the window below with zero clipping. */}
            <div
                className="relative z-10 w-full max-w-[420px]"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="private-repo-title"
            >
                {/* Mascot stage — sits on top of the window like a sticker on a
                    laptop lid. Ground shadow + ambient glow sell the depth. */}
                <div
                    className="pr-anim-mascot absolute left-1/2 -top-[86px] -translate-x-1/2 z-20 w-[220px] flex flex-col items-center pointer-events-none"
                    style={{ animation: 'prRepoMascotIn 0.5s 0.05s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}
                    aria-hidden="true"
                >
                    {/* Ambient light source behind the mascot — implies volume, not just a flat cutout */}
                    <div
                        className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[150px] h-[150px] rounded-full opacity-70 dark:opacity-40"
                        style={{
                            background: 'radial-gradient(circle, rgba(84,174,255,0.35) 0%, rgba(84,174,255,0) 70%)',
                            filter: 'blur(6px)',
                        }}
                    />

                    <img
                        src={sorryImg}
                        alt=""
                        className="pr-anim-float w-[132px] h-[132px] object-contain relative"
                        style={{
                            transform: 'rotate(-4deg)',
                            filter: 'drop-shadow(0 22px 16px rgba(0,0,0,0.30)) drop-shadow(0 8px 8px rgba(0,0,0,0.20))',
                            animation: 'prRepoFloat 3.6s ease-in-out 0.6s infinite',
                        }}
                    />

                    {/* Ground shadow — pulses opposite the float so it reads as contact, not decoration */}
                    <div
                        className="pr-anim-shadow w-[86px] h-[14px] rounded-full bg-black/25 dark:bg-black/50 mt-1"
                        style={{ filter: 'blur(4px)', animation: 'prRepoShadowPulse 3.6s ease-in-out 0.6s infinite' }}
                    />
                </div>

                {/* The "window" — styled like a browser tab that just hit a private repo URL */}
                <div className="relative bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] rounded-2xl shadow-[0_16px_40px_rgba(140,149,159,0.28)] dark:shadow-[0_16px_40px_rgba(1,4,9,0.7)] overflow-hidden">
                    {/* Active-tab indicator */}
                    <div className="h-[3px] w-full bg-gradient-to-r from-[#54aeff] via-[#0969da] to-[#54aeff] dark:from-[#1f6feb] dark:via-[#58a6ff] dark:to-[#1f6feb]" />

                    {/* Chrome bar — the address pill carries the lock icon, so it means something (this URL is behind auth) instead of just decorating */}
                    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[#d0d7de] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#161b22]">
                        <div className="flex gap-1.5 flex-shrink-0" aria-hidden="true">
                            <span className="w-[9px] h-[9px] rounded-full bg-[#ff5f56]" />
                            <span className="w-[9px] h-[9px] rounded-full bg-[#ffbd2e]" />
                            <span className="w-[9px] h-[9px] rounded-full bg-[#27c93f]" />
                        </div>

                        <div className="flex-1 min-w-0 flex justify-center">
                            <div className="inline-flex items-center gap-1.5 max-w-full px-3 py-[5px] rounded-md bg-white dark:bg-[#0d1117] border border-[#d8dee4] dark:border-[#30363d]">
                                <IoLockClosed className="text-[#656d76] dark:text-[#7d8590] flex-shrink-0" size={11} />
                                <span className="text-[12px] font-mono text-[#59636e] dark:text-[#8b949e] truncate">
                                    github.com/{projectTitle || 'user/repository'}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="flex-shrink-0 p-1 rounded-md text-[#656d76] dark:text-[#7d8590] hover:text-[#1f2328] dark:hover:text-[#e6edf3] hover:bg-[#eaeef2] dark:hover:bg-[#21262d] transition-colors duration-100 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0969da]"
                            aria-label="Close"
                        >
                            <IoMdClose size={16} />
                        </button>
                    </div>

                    {/* Page content */}
                    <div className="relative px-6 pt-[52px] pb-6 flex flex-col items-center text-center overflow-hidden">
                        {/* Faint restricted-access hatching — a nod to GitHub's own "collapsed/blocked content" pattern, kept subtle */}
                        <div
                            className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] pointer-events-none"
                            style={{ backgroundImage: 'repeating-linear-gradient(135deg, #1f2328 0 1px, transparent 1px 14px)' }}
                            aria-hidden="true"
                        />

                        <span className="relative inline-flex items-center gap-1.5 mb-3 px-2.5 py-[3px] rounded-full bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] text-[10px] font-semibold uppercase tracking-wide text-[#656d76] dark:text-[#7d8590]">
                            Private repository
                        </span>

                        <h2 id="private-repo-title" className="relative text-[#1f2328] dark:text-[#e6edf3] font-semibold text-[18px] leading-tight mb-2">
                            {t('privateRepo.title')}
                        </h2>

                        <p className="relative text-[13px] text-[#59636e] dark:text-[#8b949e] leading-relaxed mb-4 text-left">
                            {t('privateRepo.body')}
                        </p>

                        {/* GitHub's markdown "NOTE" alert treatment */}
                        <div className="relative w-full rounded-md bg-[#ddf4ff]/60 dark:bg-[#388bfd1a] border-l-4 border-[#54aeff] dark:border-[#1f6feb] px-3 py-2.5 mb-5 text-left">
                            <p className="text-xs text-[#0969da] dark:text-[#58a6ff] leading-relaxed">
                                {t('privateRepo.note')}
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="relative w-full py-[7px] px-4 rounded-md bg-[#f6f8fa] dark:bg-[#21262d] border border-[rgba(31,35,40,0.15)] dark:border-[#30363d] text-[#24292f] dark:text-[#c9d1d9] text-sm font-medium hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] active:bg-[#ebecf0] dark:active:bg-[#282e33] transition-colors duration-100 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0969da]"
                        >
                            {t('privateRepo.close')}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes prRepoBackdropIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes prRepoMascotIn {
                    from { opacity: 0; transform: translateX(-50%) scale(0.7) translateY(14px); }
                    to   { opacity: 1; transform: translateX(-50%) scale(1)    translateY(0);    }
                }
                @keyframes prRepoFloat {
                    0%, 100% { transform: rotate(-4deg) translateY(0);   }
                    50%      { transform: rotate(-2deg) translateY(-6px); }
                }
                @keyframes prRepoShadowPulse {
                    0%, 100% { transform: scale(1);    opacity: 0.25; }
                    50%      { transform: scale(0.82); opacity: 0.15; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .pr-anim-backdrop,
                    .pr-anim-mascot,
                    .pr-anim-float,
                    .pr-anim-shadow {
                        animation: none !important;
                    }
                }
            `}</style>
        </div>,
        document.body
    );
};

export default PrivateRepoModal;