import React from 'react';

const Tooltip = ({ children, text, shortcut }) => {
    return (
        <div className="relative group flex items-center justify-center">
            {children}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 origin-bottom bg-gray-800 text-white text-[11px] py-1.5 px-2.5 rounded-md whitespace-nowrap shadow-2xl z-[1000] flex items-center gap-2 border border-[#30363d]">
                <span className="font-medium">{text}</span>
                {shortcut && (
                    <span className="text-[#8b949e] bg-[#161b22] px-1 rounded border border-[#30363d] text-[9px]">
                        {shortcut}
                    </span>
                )}
                {/* Arrow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-800 border-b border-r border-[#30363d]"></div>
            </div>
        </div>
    );
};

export default Tooltip;