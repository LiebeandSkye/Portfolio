import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTriangleExclamation, FaArrowRightFromBracket, FaXmark } from 'react-icons/fa6';

const ConfirmQuitModal = ({ isOpen, onCancel, onConfirm, currentQuestion, totalQuestions }) => {
  // Close on ESC key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onCancel();
    },
    [onCancel]
  );

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-full max-w-[400px] bg-(--pixel) border border-(--border-light) rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Top header bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-(--border-light)/60 bg-(--pixel-hover)/40">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="text-xs font-mono text-(--text-gray) font-medium">devquiz / exit</span>
              </div>
              <button
                onClick={onCancel}
                className="p-1 rounded-md text-(--text-gray) hover:text-(--text-light) hover:bg-(--pixel-hover) transition-colors cursor-pointer"
                aria-label="Close"
              >
                <FaXmark size={14} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 flex flex-col items-center text-center">
              {/* Warning Icon Badge */}
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 shadow-sm">
                <FaTriangleExclamation size={22} />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-(--text-light) mb-2">
                Quit Quiz Session?
              </h3>

              <p className="text-xs sm:text-sm text-(--text-gray) leading-relaxed mb-4">
                Are you sure you want to quit? Your current session progress and answered questions will be lost.
              </p>

              {currentQuestion !== undefined && totalQuestions !== undefined && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 mb-6">
                  <span>Progress: Question {currentQuestion} of {totalQuestions}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 w-full">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold border border-(--border-light) bg-(--pixel) hover:bg-(--pixel-hover) text-(--text-light) transition-colors cursor-pointer whitespace-nowrap"
                >
                  Keep Playing
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap"
                >
                  <FaArrowRightFromBracket size={13} className="shrink-0" />
                  <span>Quit Quiz</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmQuitModal;
