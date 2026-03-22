import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoAttachOutline, IoDocumentOutline } from "react-icons/io5";

const AttachFileModal = ({
    isOpen,
    onClose,
    stagedFiles,
    setStagedFiles,
    isUploading,
    confirmUpload,
    fileInputRef,
    handleFileUpload,
}) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 backdrop-blur-[2px]">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="w-[90%] max-w-md bg-(--pixel) border border-(--border-light) rounded-xl shadow-2xl overflow-hidden"
                >
                    <div className="p-4 border-b border-(--border-light) flex justify-between items-center">
                        <h3 className="text-md font-semibold text-(--text-light)">Attach a File</h3>
                        <IoClose
                            onClick={() => { onClose(); setStagedFiles([]); }}
                            className="cursor-pointer text-gray-400 hover:text-white"
                            size={20}
                        />
                    </div>

                    <div className="p-6">
                        <div className="min-h-[120px] mb-6 flex flex-col items-center justify-center border-2 border-dashed border-[#30363d] rounded-lg bg-(--pixel2) hover:border-[#444c56] transition-colors relative">
                            {isUploading ? (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                    <p className="text-xs text-gray-400">Uploading {stagedFiles.length} file(s)…</p>
                                </div>
                            ) : stagedFiles.length > 0 ? (
                                <div className="w-full p-2 space-y-2">
                                    {stagedFiles.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between bg-(--pixel) border border-(--border-light) rounded-md px-3 py-2">
                                            <div className="flex items-center gap-2">
                                                <IoDocumentOutline className="text-gray-400" />
                                                <span className="text-sm text-(--text-light) truncate max-w-[200px]">{file.name}</span>
                                            </div>
                                            <IoClose
                                                size={16}
                                                className="text-gray-500 hover:text-red-400 cursor-pointer"
                                                onClick={() => setStagedFiles(prev => prev.filter((_, i) => i !== idx))}
                                            />
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => fileInputRef.current.click()}
                                        className="w-full text-xs text-blue-500 hover:underline py-1 cursor-pointer"
                                    >
                                        + Add more files
                                    </button>
                                </div>
                            ) : (
                                <div
                                    className="text-center p-4 cursor-pointer w-full"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <IoAttachOutline size={30} className="mx-auto text-gray-500 mb-2" />
                                    <p className="text-sm text-gray-400">Click to select text or code files</p>
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                multiple
                                onChange={handleFileUpload}
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                disabled={isUploading}
                                onClick={() => { onClose(); setStagedFiles([]); }}
                                className="px-4 py-2 text-sm text-gray-400 hover:text-(--text-light) transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={stagedFiles.length === 0 || isUploading}
                                onClick={confirmUpload}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    stagedFiles.length > 0
                                        ? 'bg-[#238636] hover:bg-[#2ea043] text-(--text-light)'
                                        : 'bg-(--pixel-hover) text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                {isUploading ? 'Uploading…' : 'Upload'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

export default AttachFileModal;