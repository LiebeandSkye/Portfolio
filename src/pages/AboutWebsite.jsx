import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { IoCode } from 'react-icons/io5';
import { RiVercelFill } from 'react-icons/ri';
import { SiVite, SiReact, SiTailwindcss, SiNodedotjs, SiExpress } from 'react-icons/si';

const navItems = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'design-ui', label: 'Design & UI' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'features', label: 'Features Breakdown' },
  { id: 'deployment', label: 'Deployment & Future Plans' },
];

const AboutWebsite = () => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="w-full flex flex-col lg:flex-row border border-(--border-light) rounded-xl overflow-hidden">
        <aside className="hidden lg:block w-[260px] border-r border-(--border-light) bg-(--pixel2) sticky top-[90px] self-start max-h-[calc(100vh-110px)] overflow-y-auto github-scrollbar">
          <div className="p-4 border-b border-(--border-light)">
            <Link to="/portfolio" className="text-sm text-(--sucess) hover:underline inline-flex items-center gap-2">
              <FaArrowLeft size={12} /> Go Back
            </Link>
          </div>
          <nav className="p-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block text-sm px-3 py-2 rounded-md text-(--text-light) hover:bg-(--pixel-hover)"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="flex-1 p-5 md:p-8">
          <section id="top" className="border-b border-(--border-light) pb-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-3xl md:text-4xl font-bold">About this website</h1>
              <a
                href="https://github.com/LiebeandSkye/Portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#238636] text-white px-4 py-2 rounded-md font-semibold hover:opacity-90"
              >
                <IoCode /> Source Code
              </a>
            </div>
            <p className="mt-4 text-(--text-gray)">
              This page documents how this portfolio was designed and built, closely inspired by the “About this website”
              documentation style from Emanuele Sgroi&apos;s portfolio.
            </p>
          </section>

          <section id="introduction" className="border-b border-(--border-light) pb-8 mb-8">
            <p className="text-sm text-(--text-gray) mb-4">1. Introduction</p>
            <h2 className="text-3xl font-bold">Why I built this</h2>
            <p className="mt-4">
              I wanted a portfolio that feels like a real developer product instead of a simple landing page. GitHub&apos;s UI is
              familiar to developers, so I used that as a foundation for layout, spacing, and interaction patterns.
            </p>
            <p className="mt-3">
              Like the reference website, this project focuses on making the portfolio interactive and easy to explore, with
              pages, filters, and custom components that feel consistent across the app.
            </p>
          </section>

          <section id="design-ui" className="border-b border-(--border-light) pb-8 mb-8">
            <p className="text-sm text-(--text-gray) mb-4">2. Design & UI</p>
            <h2 className="text-3xl font-bold">GitHub-style design direction</h2>
            <p className="mt-4">
              The visual direction is heavily inspired by GitHub: subtle borders, neutral surfaces, compact controls, and clean
              typography. The goal is familiarity without cloning every behavior exactly.
            </p>
            <p className="mt-3">
              I also reviewed spacing, colors, and states by inspecting GitHub UI elements and then adapting those values for this
              portfolio.
            </p>
            <img
              src="/about-website/extracting-ui.png"
              alt="Extracting GitHub UI inspiration"
              className="mt-6 border border-(--border-light) rounded-lg w-full max-w-[900px]"
              loading="lazy"
            />
          </section>

          <section id="tech-stack" className="border-b border-(--border-light) pb-8 mb-8">
            <p className="text-sm text-(--text-gray) mb-4">3. Tech Stack</p>
            <h2 className="text-3xl font-bold">Technologies used</h2>
            <p className="mt-4">
              This portfolio uses <b>Vite + React</b> for the frontend app (not Next.js), with Tailwind CSS for styling and
              Node.js + Express APIs for backend features.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="px-3 py-1 rounded-md text-white bg-[#646cff] inline-flex items-center gap-2"><SiVite />Vite</span>
              <span className="px-3 py-1 rounded-md text-white bg-[#61dafb] text-black inline-flex items-center gap-2"><SiReact />React</span>
              <span className="px-3 py-1 rounded-md text-white bg-[#06b6d4] inline-flex items-center gap-2"><SiTailwindcss />Tailwind CSS</span>
              <span className="px-3 py-1 rounded-md text-white bg-[#43853d] inline-flex items-center gap-2"><SiNodedotjs />Node.js</span>
              <span className="px-3 py-1 rounded-md text-white bg-[#222] inline-flex items-center gap-2"><SiExpress />Express</span>
              <span className="px-3 py-1 rounded-md text-white bg-black inline-flex items-center gap-2"><RiVercelFill />Vercel</span>
            </div>
          </section>

          <section id="features" className="border-b border-(--border-light) pb-8 mb-8">
            <p className="text-sm text-(--text-gray) mb-4">4. Features Breakdown</p>
            <h2 className="text-3xl font-bold">Portfolio and AI experiences</h2>
            <p className="mt-4">
              The portfolio section is inspired by repository browsing patterns and supports list/grid views, project detail routes,
              and quick actions.
            </p>
            <img
              src="/about-website/portfolio.png"
              alt="Portfolio page screenshot"
              className="mt-6 border border-(--border-light) rounded-lg w-full max-w-[900px]"
              loading="lazy"
            />
            <p className="mt-6">
              SakuPilot is the interactive assistant in this portfolio, inspired by Copilot-like UX patterns and integrated into
              both quick and immersive chat experiences.
            </p>
            <img
              src="/about-website/manupilot.png"
              alt="AI assistant screenshot"
              className="mt-4 border border-(--border-light) rounded-lg w-full max-w-[900px]"
              loading="lazy"
            />
          </section>

          <section id="deployment" className="pb-2">
            <p className="text-sm text-(--text-gray) mb-4">5. Deployment & Future Plans</p>
            <h2 className="text-3xl font-bold">Deployment and next steps</h2>
            <p className="mt-4">
              The app is deployed as a Vite React frontend with supporting backend APIs. Future improvements include additional
              performance optimization, more project details, and expanding AI-assisted features.
            </p>
            <div id="bottom" className="mt-8 pt-6 border-t border-(--border-light) text-sm text-(--text-gray)">
              Thanks for reading this documentation page.
            </div>
          </section>
        </div>

        <aside className="hidden xl:block w-[260px] border-l border-(--border-light) p-5 bg-(--pixel2) sticky top-[90px] self-start max-h-[calc(100vh-110px)]">
          <h3 className="font-bold text-lg">On this page</h3>
          <p className="text-sm text-(--text-gray) mt-2">Quick actions and section shortcuts.</p>
          <div className="flex flex-col gap-2 mt-4">
            <a href="#top" className="inline-flex items-center gap-2 text-sm text-(--sucess) hover:underline"><FaArrowUp size={12} /> Back to top</a>
            <a href="#bottom" className="inline-flex items-center gap-2 text-sm text-(--sucess) hover:underline"><FaArrowDown size={12} /> Jump to bottom</a>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AboutWebsite;
