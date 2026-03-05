import React from 'react'
import { FaHtml5, FaCss3, FaJs, FaReact, FaBootstrap, FaPython, FaGithub, FaJava, FaFigma} from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaGitAlt } from "react-icons/fa6";
import { PiFileCppFill } from "react-icons/pi";
import { IoLogoVercel } from "react-icons/io5";
import { ImNpm } from "react-icons/im";
import { IoMdCut } from "react-icons/io";
import { VscVscode } from "react-icons/vsc";
const TechStacks = () => {
    return (
        <div>
            <div className='flex gap-3 flex-wrap py-4'>
                <div className='flex items-center gap-1 text-white bg-orange-600 py-1 px-2 rounded-sm'><span className="flex items-center mr-2"><FaHtml5 /></span>HTML</div>
                <div className='flex items-center gap-1 text-white bg-blue-600 py-1 px-2 rounded-sm'><span className="flex items-center mr-2"><FaCss3 /></span>CSS</div>
                <div className='flex items-center gap-1 text-black bg-yellow-500 py-1 px-2 rounded-sm'><span className="flex items-center mr-2"><FaJs /></span>JavaScript</div>
                <div className='flex items-center gap-1 text-black bg-blue-400 py-1 px-2 rounded-sm'><span className="flex items-center mr-2"><FaReact /></span>React</div>
                <div className='flex items-center gap-1 text-white bg-indigo-600 py-1 px-2 rounded-sm'><span className="flex items-center mr-2"><FaBootstrap /></span>Bootstrap</div>
                <div className='flex items-center gap-1 text-white bg-sky-600 py-1 px-2 rounded-sm'><span className="flex items-center mr-2"><RiTailwindCssFill /></span>Tailwind</div>
                <div className='flex items-center gap-1 text-white bg-orange-500 py-1 px-2 rounded-sm'><span className="flex items-center mr-2"><FaGitAlt /></span>Git</div>
                <div className='flex items-center gap-1 text-white bg-gray-900 py-1 px-2 rounded-sm'><span className="flex items-center mr-2"><FaGithub /></span>GitHub</div>
                <div className='flex items-center gap-1 text-white bg-blue-600 py-1 px-2 rounded-sm'><span className="flex items-center mr-2"><FaPython /></span>Python</div>
                <div className='flex items-center gap-1 text-white bg-blue-800 py-1 px-2 rounded-sm'><span className="flex items-center mr-2"><PiFileCppFill /></span>C++</div>
                <div className='flex items-center gap-1 text-white bg-orange-700 py-1 px-2 rounded-sm'><span className="flex items-center mr-2"><FaJava /></span>Java</div>
                <div className='flex items-center gap-1 text-white bg-black py-1 px-2 rounded-sm'><span className="flex items-center mr-2"><IoLogoVercel /></span>Vercel</div>
                <div className='flex items-center gap-1 text-white bg-red-500 py-1 px-2 rounded-sm'><span className="flex items-center mr-2"><ImNpm /></span>NPM</div>
                <div className='flex items-center gap-1 text-black bg-gray-300 py-1 px-2 rounded-sm'><span className="flex items-center mr-2"><IoMdCut /></span>Capcut</div>
                <div className='flex items-center gap-1 text-white bg-blue-500 py-1 px-2 rounded-sm'><span className="flex items-center mr-2"><VscVscode /></span>VSCode</div>
                <div className='flex items-center gap-1 text-white bg-orange-600 py-1 px-2 rounded-sm'><span className="flex items-center mr-2"><FaFigma /></span>Figma</div>
            </div>
        </div>
    )
}

export default TechStacks
