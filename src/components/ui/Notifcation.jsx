import React, { useState, useEffect, useRef } from "react";

const Notification = ({ message, onClose, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(true);
    const timeoutRef = useRef(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, duration);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [onClose, duration]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-50 w-72 max-w-[90vw] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            
            <div className="p-3 flex justify-between items-center">
                <span className="text-sm">{message}</span>

                <button
                    onClick={() => {
                        setIsVisible(false);
                        onClose();
                    }}
                    className="ml-4 text-white/80 dark:text-gray-900/80 hover:text-white dark:hover:text-gray-900"
                >
                    ✕
                </button>
            </div>

            <div className="h-1 bg-gray-700 dark:bg-gray-300">
                <div
                    className="h-full bg-blue-500"
                    style={{
                        width: "100%",
                        animation: `shrink ${duration}ms linear forwards`,
                    }}
                />
            </div>

            <style>{`
                @keyframes shrink {
                    from { width:100% }
                    to { width:0% }
                }
            `}</style>
        </div>
    );
};

export default Notification;