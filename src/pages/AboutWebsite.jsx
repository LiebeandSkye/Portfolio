import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowDown, FaArrowLeft, FaArrowUp, FaServer } from 'react-icons/fa';
import { IoCode } from 'react-icons/io5';
import { RiRobot2Line, RiVercelFill } from 'react-icons/ri';
import {
  SiGithub,
  SiGooglegemini,
  SiNodedotjs,
  SiReact,
  SiRender,
  SiTailwindcss,
  SiVite,
} from 'react-icons/si';
import { useLanguage } from '../components/context/LanguageContext';

const iconMap = {
  react: SiReact,
  vite: SiVite,
  node: SiNodedotjs,
  tailwind: SiTailwindcss,
  github: SiGithub,
  vercel: RiVercelFill,
  render: SiRender,
  gemini: SiGooglegemini,
  groq: RiRobot2Line,
};

const badgeStyles = {
  react: 'bg-[#149eca] text-white',
  vite: 'bg-[#646cff] text-white',
  node: 'bg-[#417e38] text-white',
  tailwind: 'bg-[#06b6d4] text-white',
  github: 'bg-[#24292f] text-white',
  vercel: 'bg-black text-white',
  render: 'bg-[#46e3b7] text-[#061b22]',
  gemini: 'bg-[#1a73e8] text-white',
  groq: 'bg-[#f55036] text-white',
};

const AboutWebsite = () => {
  const { t } = useLanguage();
  const content = t('aboutWebsitePage');
  const articleRef = useRef(null);
  const navGroups = content.navGroups || [];
  const navItems = useMemo(() => navGroups.flatMap((group) => group.items), [navGroups]);
  const [activeSection, setActiveSection] = useState(navItems[0]?.id || 'intro-why');

  useEffect(() => {
    const root = articleRef.current;
    if (!root || !navItems.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        root,
        rootMargin: '-12% 0px -72% 0px',
        threshold: [0.08, 0.25, 0.5],
      },
    );

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [navItems]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  };

  const scrollToTop = () => {
    articleRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    const article = articleRef.current;
    article?.scrollTo({ top: article.scrollHeight, behavior: 'smooth' });
  };

  const navItemClass = (id) => (
    `w-full text-left px-3 py-2 rounded-md text-sm transition-colors font-medium ${
      activeSection === id
        ? 'bg-(--pixel-hover) text-(--text-light)'
        : 'text-(--text-light) hover:bg-(--pixel-hover) cursor-pointer'
    }`
  );

  const renderSection = (section, children) => (
    <section id={section.id} className="scroll-mt-10 mb-14 border-b border-(--border-light) pb-12 last:border-b-0">
      <div className="font-semibold text-(--text-gray) mb-5">{section.step}</div>
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-(--text-light)">{section.title}</h2>
      {children}
    </section>
  );

  const renderImageBlock = (image) => (
    <figure className="my-7 overflow-hidden rounded-lg border border-(--border-light) bg-(--pixel2)">
      <img src={image.src} alt={image.alt} className="w-full object-cover" loading="lazy" />
      <figcaption className="border-t border-(--border-light) p-4 text-sm text-(--text-gray)">
        <span className="font-semibold text-(--text-light)">{image.title}</span>
        <span className="block mt-1">{image.caption}</span>
      </figcaption>
    </figure>
  );

  return (
    <div className="w-full h-full min-h-0 text-(--text-main) overflow-hidden">
      <div className="mx-auto flex h-full w-full max-w-[1600px]">
        <aside className="hidden lg:flex w-[280px] shrink-0 flex-col border-r border-(--border-light) bg-(--light)">
          <div className="px-7 py-6 border-b border-(--border-light)">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-(--text-gray) hover:text-(--text-light) transition-colors mb-7">
              <FaArrowLeft /> {content.goBack}
            </Link>
            <h1 className="text-2xl font-bold">{content.title}</h1>
          </div>

          <nav className="github-scrollbar flex-1 overflow-y-auto px-6 py-7">
            {navGroups.map((group) => (
              <div className="mb-7" key={group.title}>
                <h3 className="text-base font-bold text-(--text-gray) mb-4">{group.title}</h3>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <button onClick={() => scrollTo(item.id)} className={navItemClass(item.id)}>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main ref={articleRef} className="github-scrollbar flex-1 overflow-y-auto px-6 py-10 md:px-10 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-(--border-light) pb-7 mb-10 gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{content.title}</h1>
                <p className="text-sm text-(--text-gray) mt-3 max-w-2xl">{content.subtitle}</p>
              </div>
              <a
                href="https://github.com/LiebeandSkye/Portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#238636] text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-[#2ea043] transition-colors"
              >
                <IoCode size={16} /> {content.sourceCode}
              </a>
            </div>

            <div className="text-[16px] leading-8 text-(--text-light)">
              {renderSection(content.sections.intro, (
                <>
                  {content.sections.intro.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mb-5">{paragraph}</p>
                  ))}
                  <div className="rounded-lg border border-(--border-light) bg-(--pixel2) p-5 text-sm leading-7 text-(--text-gray)">
                    {content.sections.intro.callout}
                  </div>
                </>
              ))}

              {renderSection(content.sections.keyTech, (
                <>
                  <p className="mb-6">{content.sections.keyTech.p1}</p>
                  <div className="flex flex-wrap gap-2">
                    {content.techBadges.map(({ key, label }) => {
                      const Icon = iconMap[key];
                      return (
                        <span key={key} className={`px-3 py-1.5 rounded-md font-semibold text-sm inline-flex items-center gap-2 ${badgeStyles[key]}`}>
                          {Icon && <Icon size={16} />} {label}
                        </span>
                      );
                    })}
                  </div>
                </>
              ))}

              {renderSection(content.sections.design, (
                <>
                  {content.sections.design.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mb-5">{paragraph}</p>
                  ))}
                  {renderImageBlock(content.sections.design.image)}
                </>
              ))}

              {renderSection(content.sections.extracting, (
                <>
                  {content.sections.extracting.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mb-5">{paragraph}</p>
                  ))}
                  {renderImageBlock(content.sections.extracting.image)}
                </>
              ))}

              {renderSection(content.sections.theme, (
                <>
                  <p className="mb-4">{content.sections.theme.p1}</p>
                  <ul className="list-disc pl-7 space-y-2">
                    {content.sections.theme.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </>
              ))}

              {renderSection(content.sections.responsive, (
                <>
                  {content.sections.responsive.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mb-5">{paragraph}</p>
                  ))}
                </>
              ))}

              {content.techSections.map((section) => {
                const Icon = iconMap[section.icon];
                return renderSection(section, (
                  <>
                    <div className="mb-5 flex items-center gap-3">
                      {Icon && (
                        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-md ${badgeStyles[section.icon]}`}>
                          <Icon size={20} />
                        </span>
                      )}
                      <p className="text-sm font-semibold text-(--text-gray)">{section.summary}</p>
                    </div>
                    <p className="mb-5">{section.body}</p>
                    {section.points && (
                      <ul className="list-disc pl-7 space-y-2">
                        {section.points.map((point) => <li key={point}>{point}</li>)}
                      </ul>
                    )}
                  </>
                ));
              })}

              {renderSection(content.sections.welcome, (
                <>
                  <p className="mb-5">{content.sections.welcome.p1}</p>
                  {renderImageBlock(content.sections.welcome.image)}
                </>
              ))}

              {renderSection(content.sections.portfolio, (
                <>
                  {content.sections.portfolio.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mb-5">{paragraph}</p>
                  ))}
                  {renderImageBlock(content.sections.portfolio.image)}
                </>
              ))}

              {renderSection(content.sections.contact, (
                <>
                  <p className="mb-5">{content.sections.contact.p1}</p>
                  {renderImageBlock(content.sections.contact.image)}
                </>
              ))}

              {renderSection(content.sections.sakupilot, (
                <>
                  {content.sections.sakupilot.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mb-5">{paragraph}</p>
                  ))}
                  {renderImageBlock(content.sections.sakupilot.image)}
                </>
              ))}

              {renderSection(content.sections.multilanguage, (
                <>
                  <p className="mb-5">{content.sections.multilanguage.p1}</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {content.sections.multilanguage.images.map((image) => renderImageBlock(image))}
                  </div>
                  <p className="mt-5">{content.sections.multilanguage.p2}</p>
                </>
              ))}

              {renderSection(content.sections.deployment, (
                <>
                  <p className="mb-6">{content.sections.deployment.p1}</p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {content.sections.deployment.platforms.map((platform) => {
                      const Icon = platform.icon === 'vercel' ? RiVercelFill : SiRender;
                      return (
                        <div key={platform.title} className="rounded-lg border border-(--border-light) bg-(--pixel2) p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon size={18} />
                            <h3 className="font-semibold text-(--text-light)">{platform.title}</h3>
                          </div>
                          <p className="text-sm leading-6 text-(--text-gray)">{platform.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="rounded-lg border border-(--border-light) bg-[#1f2937] p-5 text-sm leading-relaxed text-[#d1d5db]">
                    <FaServer className="inline mr-2" />
                    {content.sections.deployment.note}
                  </div>
                </>
              ))}

              {renderSection(content.sections.next, (
                <>
                  <p className="mb-5">{content.sections.next.p1}</p>
                  <ul className="list-disc pl-7 space-y-2">
                    {content.sections.next.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </>
              ))}
            </div>
          </div>
        </main>

        <aside className="hidden xl:flex w-[300px] shrink-0 flex-col border-l border-(--border-light) bg-(--light) px-7 py-10 overflow-hidden">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-(--text-light)">{content.whatsThis.title}</h3>
            <p className="text-[15px] text-(--text-gray) leading-7">
              {content.whatsThis.desc}
            </p>
          </div>

          <a
            href="https://github.com/LiebeandSkye/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#f6f8fa] text-[#24292f] border border-[rgba(31,35,40,0.15)] px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#f3f4f6] transition-colors mb-12"
          >
            <SiGithub size={16} /> {content.viewOnGithub}
          </a>

          <div className="flex flex-col gap-6">
            <button onClick={scrollToTop} className="inline-flex items-center gap-2 text-sm text-[#2f81f7] hover:underline w-fit cursor-pointer">
              <FaArrowUp /> {content.goToTop}
            </button>
            <button onClick={scrollToBottom} className="inline-flex items-center gap-2 text-sm text-[#2f81f7] hover:underline w-fit cursor-pointer">
              <FaArrowDown /> {content.goToBottom}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AboutWebsite;
