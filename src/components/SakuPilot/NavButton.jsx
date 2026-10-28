import React, { memo } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

const NavButton = memo(function NavButton({ path, label, onClick }) {
    return (
        <button
            type="button"
            onClick={() => onClick?.(path)}
            className="group my-1 inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-(--border-light) bg-(--pixel2) py-2 pl-4 pr-3.5 text-sm font-medium text-(--text-light) transition-colors hover:bg-(--pixel) cursor-pointer"
        >
            <span className="truncate">{label}</span>
            <FiArrowUpRight className="h-4 w-4 shrink-0 text-(--text-gray) transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
    );
});

export default NavButton;
