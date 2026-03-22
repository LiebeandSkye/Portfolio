import React from 'react';
import { GoArrowRight } from "react-icons/go";
import { RiArrowRightUpLine } from "react-icons/ri";

const NavButton = ({ path, label, onClick }) => (
    <button
        onClick={() => onClick(path)}
        className="group inline-flex items-center gap-2.5 my-1 px-4 py-2.5 rounded-md
            border-2 border-(--border-light)
            text-(--text-light)
            transition-all duration-200 cursor-pointer
            text-sm font-medium w-fit bg-(--pixel2)"
    >
        <span className="w-5 h-5 rounded-md border border-(--border-light) flex items-center justify-center flex-shrink-0 transition-colors">
            <RiArrowRightUpLine size={12} />
        </span>
        {label}
        <GoArrowRight size={12} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
    </button>
);

export default NavButton;