import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmNewChatModal = ({ isOpen, onCancel, onConfirm }) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/80 backdrop-blur-[2px]">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="w-[90%] max-w-[400px] bg-(--pixel2) border border-(--border-light) rounded-xl shadow-2xl p-6"
                >
                    <h3 className="text-xl font-bold text-(--text-light) mb-4">Are you sure?</h3>
                    <p className="text-(--text-light) text-sm mb-8 leading-relaxed">
                        Your current conversation with SakuPilot will be lost and cannot be recovered.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onCancel}
                            className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-(--border-light) text-(--text-light) hover:bg-(--pixel-hover) transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-(--text-light) text-(--text-dark) hover:bg-(--pixel-hover2) transition-colors cursor-pointer"
                        >
                            I'm sure
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

export default ConfirmNewChatModal;