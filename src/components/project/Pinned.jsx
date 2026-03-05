import React from 'react'
import '../../index.css'
import Projects from '../../Data/Projects'
import { Link } from 'react-router-dom';
import { BsPinAngleFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa6";

const Pinned = () => {
    return (
        <div className='w-full max-w-4xl rounded-lg'>
            {/* Header Area */}
            <div className='flex items-center gap-2 mb-4'>
                <BsPinAngleFill className='text-(--text-gray) -rotate-45' />
                <h2 className='text-(--text-light) text-sm font-semibold'>Pinned</h2>
            </div>

            {/* Scrollable Wrapper */}
            {/* - Mobile: flex-nowrap + overflow-x-auto (Horizontal Swipe)
                - Desktop/Laptop: grid-cols-2 (Stable Grid)
            */}
            <div className='
                flex flex-nowrap overflow-x-auto gap-4 pb-2 
                snap-x snap-mandatory 
                scrollbar-hide
                md:grid md:grid-cols-2 md:overflow-visible
            '>
                {Projects.map((project, index) => (
                    <div 
                        key={index}
                        className='
                            /* Mobile: Takes up 85% of container width to show a "peek" of the next card */
                            min-w-[85%] md:min-w-0 
                            snap-start 
                            border border-(--border-light) 
                            rounded-md 
                            p-4 
                            flex flex-col 
                            justify-between 
                            h-[140px]
                            transition-colors
                        '
                    >
                        <div>
                            {/* Badge & Meta */}
                            <div className='flex items-center mb-1 gap-5'>
                                <div className='flex items-center gap-2 text-[#58a6ff]'>
                                    <FaBook size={14} className='text-(--text-gray)' />
                                    <h3 className='font-semibold text-sm hover:underline cursor-pointer truncate max-w-[160px]'>
                                        <Link to={`/portfolio/${project.id}`}>{project.title} </Link>
                                    </h3>
                                </div>
                                <span className='text-(--text-gray) text-[10px] px-2 py-0.5 border border-(--border-light) rounded-full'>
                                    Public
                                </span>
                            </div>

                            {/* Description */}
                            <p className='text-(--text-gray) text-xs mt-2 line-clamp-2'>
                                {project.description}
                            </p>
                        </div>

                        {/* Language/Folder Footer */}
                        <div className='flex items-center gap-2 mt-3'>
                            <div className={`rounded-full w-3 h-3 ${project.red ? 'bg-[#ff7b72]' : 'bg-[#58a6ff]'}`}></div>
                            <p className='text-[11px] text-(--text-gray)'>
                                {project.bread}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pinned