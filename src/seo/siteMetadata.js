export const BASE_URL = 'https://kryrithisak.vercel.app';
export const SITE_NAME = 'Kry Rithisak';
export const PROFILE_IMAGE = `${BASE_URL}/og-image.png`;

export const PROJECT_ROUTES = [
  {
    path: '/portfolio/1',
    name: 'Continental',
    description: 'Continental is a car e-commerce project by Kry Rithisak with a polished catalog, simulated checkout flow, Contentful CMS, and an AI assistant.',
    keywords: ['Continental', 'car e-commerce', 'Contentful', 'React', 'Groq AI'],
  },
  {
    path: '/portfolio/2',
    name: 'Discover Cambodia',
    description: 'Discover Cambodia is a tourism web project by Kry Rithisak using browser UI, weather data, and destination-focused travel content.',
    keywords: ['Discover Cambodia', 'tourism website', 'weather API', 'JavaScript'],
  },
  {
    path: '/portfolio/3',
    name: 'Electronics E-commerce',
    description: 'Electronics E-commerce is an in-development commerce project by Kry Rithisak focused on Firebase authentication, Firestore, and cart workflows.',
    keywords: ['electronics e-commerce', 'Firebase', 'Firestore', 'authentication'],
  },
  {
    path: '/portfolio/4',
    name: 'AI MemoryPorter',
    description: 'AI MemoryPorter is a privacy-first utility by Kry Rithisak that converts exported AI memories and chat context into token-optimized Markdown.',
    keywords: ['AI MemoryPorter', 'privacy-first AI utility', 'context packing', 'Markdown'],
  },
  {
    path: '/portfolio/5',
    name: 'Project Nebula',
    description: 'Project Nebula is a real-time social deduction game by Kry Rithisak using React, Express, and Socket.IO for multiplayer play.',
    keywords: ['Project Nebula', 'real-time game', 'Socket.IO', 'React', 'social deduction'],
  },
  {
    path: '/portfolio/6',
    name: 'SakiKaraoke',
    description: 'SakiKaraoke is a real-time collaborative karaoke web application by Kry Rithisak utilizing React, Express, and Socket.IO for synchronized playback and lyrics.',
    keywords: ['SakiKaraoke', 'real-time karaoke', 'Socket.IO', 'React', 'collaborative web app'],
  },
];

const ROUTES = [
  {
    path: '/',
    title: 'Kry Rithisak | Software Developer Portfolio',
    description: 'Kry Rithisak is a software developer in Phnom Penh building React, full-stack, AI, and real-time web projects including SakuPilot and AI MemoryPorter.',
    keywords: ['Kry Rithisak', 'Saku', 'software developer', 'React developer', 'AI projects', 'Phnom Penh', 'AUPP'],
  },
  {
    path: '/welcome',
    title: 'Kry Rithisak | Software Developer Portfolio',
    description: 'Learn about Kry Rithisak, a software developer focused on React, full-stack development, AI applications, and practical product engineering.',
    keywords: ['Kry Rithisak', 'software developer portfolio', 'web developer', 'full-stack developer'],
  },
  {
    path: '/portfolio',
    title: 'Projects by Kry Rithisak | React, AI, Full-Stack',
    description: 'Explore Kry Rithisak projects across React, AI assistants, e-commerce, tourism, privacy-first tools, and real-time multiplayer systems.',
    keywords: ['Kry Rithisak projects', 'React portfolio', 'AI MemoryPorter', 'SakuPilot', 'Project Nebula'],
  },
  {
    path: '/contact',
    title: 'Contact Kry Rithisak | Software Developer',
    description: 'Contact Kry Rithisak for software development, full-stack web projects, AI application ideas, collaboration, or recruiting conversations.',
    keywords: ['contact Kry Rithisak', 'hire software developer', 'web developer Cambodia'],
  },
  {
    path: '/sakupilot',
    title: 'SakuPilot AI | Ask About Kry Rithisak',
    description: 'Use SakuPilot, the AI assistant integrated into Kry Rithisak portfolio, to ask about projects, skills, technical choices, and background.',
    keywords: ['SakuPilot', 'Kry Rithisak AI assistant', 'Gemini portfolio assistant', 'portfolio chatbot'],
  },
  {
    path: '/about-website',
    title: 'About This Portfolio Website | Kry Rithisak',
    description: 'Read how Kry Rithisak built this portfolio with React, Tailwind CSS, Framer Motion, routing, multilingual UI, and SakuPilot AI.',
    keywords: ['portfolio website', 'React portfolio', 'Tailwind CSS', 'Framer Motion', 'SakuPilot'],
  },
  ...PROJECT_ROUTES.map((project) => ({
    path: project.path,
    title: `${project.name} | Kry Rithisak Project`,
    description: project.description,
    keywords: ['Kry Rithisak', ...project.keywords],
  })),
];

const normalizePath = (pathname) => {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
};

export const getRouteMetadata = (pathname) => {
  const path = normalizePath(pathname);
  const route = ROUTES.find((item) => item.path === path);

  if (!route) {
    return {
      ...ROUTES[0],
      path,
      canonical: `${BASE_URL}/`,
      robots: 'noindex, follow',
      ogType: 'website',
    };
  }

  return {
    ...route,
    canonical: `${BASE_URL}${route.path === '/' ? '/' : route.path}`,
    robots: 'index, follow, max-image-preview:large',
    ogType: 'website',
  };
};

const personSchema = {
  '@type': 'Person',
  '@id': `${BASE_URL}/#person`,
  name: 'Kry Rithisak',
  alternateName: 'Saku',
  url: `${BASE_URL}/`,
  image: PROFILE_IMAGE,
  jobTitle: 'Software Developer',
  email: 'mailto:kryrithisak@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Phnom Penh',
    addressCountry: 'Cambodia',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'American University of Phnom Penh',
  },
  sameAs: [
    'https://github.com/LiebeandSkye',
    'https://www.linkedin.com/in/kry-rithisak-b2b66824a',
    'https://www.instagram.com/skyeoridk',
    'https://www.facebook.com/share/1FiTy3pjKz/',
  ],
  knowsAbout: [
    'React',
    'JavaScript',
    'Node.js',
    'Full-stack development',
    'AI applications',
    'Web development',
    'Socket.IO',
    'Tailwind CSS',
  ],
};

const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'Kry Rithisak Portfolio',
  url: `${BASE_URL}/`,
  inLanguage: ['en', 'ja'],
  author: { '@id': `${BASE_URL}/#person` },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/portfolio?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const currentProjectSchema = (path) => {
  const project = PROJECT_ROUTES.find((item) => item.path === path);
  if (!project) return null;

  return {
    '@type': 'SoftwareSourceCode',
    '@id': `${BASE_URL}${project.path}#project`,
    name: project.name,
    description: project.description,
    url: `${BASE_URL}${project.path}`,
    author: { '@id': `${BASE_URL}/#person` },
    programmingLanguage: project.keywords.filter((keyword) => ['React', 'JavaScript', 'Socket.IO'].includes(keyword)),
  };
};

export const getStructuredData = (pathname) => {
  const metadata = getRouteMetadata(pathname);
  const project = currentProjectSchema(normalizePath(pathname));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema,
      websiteSchema,
      {
        '@type': 'ProfilePage',
        '@id': `${metadata.canonical}#profile`,
        url: metadata.canonical,
        name: metadata.title,
        description: metadata.description,
        about: { '@id': `${BASE_URL}/#person` },
        mainEntity: { '@id': `${BASE_URL}/#person` },
        isPartOf: { '@id': `${BASE_URL}/#website` },
      },
      ...(project ? [project] : []),
    ],
  };
};
