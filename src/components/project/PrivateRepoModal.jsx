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
            {/* Backdrop — flat dim, no blur; GitHub dialogs don't blur behind them */}
            <div
                className="absolute inset-0 bg-black/60"
                style={{ animation: 'ghModalBackdropIn 0.15s ease-out forwards' }}
            />

            {/* Wrapper carries the popped-out mascot as a sibling, so the card
                itself never needs overflow-hidden to clip it. */}
            <div
                className="relative z-10 w-full max-w-[400px]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Mascot — breaks the top edge of the card, real drop shadow for depth */}
                <div
                    className="absolute left-1/2 -top-[72px] -translate-x-1/2 z-20 pointer-events-none"
                    style={{ animation: 'ghModalMascotIn 0.4s 0.05s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}
                >
                    <img
                        src={sorryImg}
                        alt="SakuPilot is sorry"
                        className="w-[136px] h-[136px] object-contain"
                        style={{
                            transform: 'rotate(-3deg)',
                            filter: 'drop-shadow(0 18px 14px rgba(0,0,0,0.28)) drop-shadow(0 6px 6px rgba(0,0,0,0.22))',
                        }}
                    />
                </div>

                {/* Card */}
                <div
                    className="relative bg-white dark:bg-[#0d1117] border border-[#d0d7de] dark:border-[#30363d] rounded-xl shadow-[0_8px_24px_rgba(140,149,159,0.2)] dark:shadow-[0_8px_24px_rgba(1,4,9,0.6)] pt-[76px]"
                    style={{ animation: 'ghModalIn 0.2s 0.02s ease-out both' }}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 p-1 rounded-md text-[#656d76] dark:text-[#7d8590] hover:text-[#1f2328] dark:hover:text-[#e6edf3] hover:bg-[#f3f4f6] dark:hover:bg-[#21262d] transition-colors duration-100 z-10 cursor-pointer"
                        aria-label="Close modal"
                    >
                        <IoMdClose size={18} />
                    </button>

                    {/* Content */}
                    <div className="px-6 pb-6 flex flex-col items-center text-center">

                        {/* Status pill — GitHub's own "Private" badge treatment: neutral, not alarmist */}
                        <div className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d]">
                            <IoLockClosed className="text-[#656d76] dark:text-[#7d8590]" size={11} />
                            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#656d76] dark:text-[#7d8590]">
                                Private
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-[#1f2328] dark:text-[#e6edf3] font-semibold text-[17px] leading-tight mb-2">
                            {t('privateRepo.title')}
                        </h2>

                        {/* Repo path chip — monospace, breadcrumb-style like GitHub file paths */}
                        {projectTitle && (
                            <div className="mb-4">
                                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] text-[#1f2328] dark:text-[#e6edf3] font-mono">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#57ab5a] dark:bg-[#3fb950] flex-shrink-0" />
                                    {projectTitle}
                                </span>
                            </div>
                        )}

                        {/* Divider */}
                        <div className="w-full h-px bg-[#d8dee4] dark:bg-[#21262d] mb-4" />

                        {/* Body text */}
                        <p className="text-[13px] text-[#59636e] dark:text-[#8b949e] leading-relaxed mb-4 text-left">
                            {t('privateRepo.body')}
                        </p>

                        {/* Note — GitHub's markdown "NOTE" alert pattern: colored left rule, no fill gradient */}
                        <div className="w-full rounded-md bg-[#ddf4ff]/50 dark:bg-[#388bfd1a] border-l-4 border-[#54aeff] dark:border-[#1f6feb] px-3 py-2.5 mb-5 text-left">
                            <p className="text-xs text-[#0969da] dark:text-[#58a6ff] leading-relaxed">
                                {t('privateRepo.note')}
                            </p>
                        </div>

                        {/* Close button — GitHub's default (secondary) button style */}
                        <button
                            onClick={onClose}
                            className="w-full py-[7px] px-4 rounded-md bg-[#f6f8fa] dark:bg-[#21262d] border border-[rgba(31,35,40,0.15)] dark:border-[#30363d] text-[#24292f] dark:text-[#c9d1d9] text-sm font-medium hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] active:bg-[#ebecf0] dark:active:bg-[#282e33] transition-colors duration-100 cursor-pointer"
                        >
                            {t('privateRepo.close')}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes ghModalBackdropIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes ghModalIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0);   }
                }
                @keyframes ghModalMascotIn {
                    from { opacity: 0; transform: translateX(-50%) scale(0.75) translateY(10px); }
                    to   { opacity: 1; transform: translateX(-50%) scale(1)    translateY(0);    }
                }
            `}</style>
        </div>,
        document.body
    );
};

export default PrivateRepoModal;