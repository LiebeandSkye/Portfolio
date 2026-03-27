import React, { useState, useEffect } from "react";
import { IoCopySharp } from "react-icons/io5";
import { useLanguage } from "../context/LanguageContext";

const CopyButton = ({ text, onCopy, isNotificationActive, className = '' }) => {
    const { t } = useLanguage();
    const [tooltipText, setTooltipText] = useState("copyTooltip");

    useEffect(() => {
        if (isNotificationActive) {
            setTooltipText("copiedTooltip");
        } else {
            setTooltipText("copyTooltip");
        }
    }, [isNotificationActive]);

    const handleCopy = async () => {
        if (isNotificationActive) return;

        try {
            await navigator.clipboard.writeText(text);
            setTooltipText("copiedTooltip");
            onCopy();
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    return (
        <div className="relative group">
            <button
                onClick={handleCopy}
                disabled={isNotificationActive}
                className={`p-2 text-(--text-gray) hover:text-(--text-light) transition-all cursor-pointer
                ${isNotificationActive ? "opacity-50 cursor-not-allowed" : ""}
                ${className}`}
            ><IoCopySharp /></button>

            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 scale-0 group-hover:scale-100 transition-all duration-200 origin-top bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 text-xs py-1 px-2 rounded whitespace-nowrap shadow-lg">
                {t(tooltipText)}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-800 dark:bg-gray-100"></div>
            </div>
        </div>
    );
};

export default CopyButton;