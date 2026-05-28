import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE_URL, getRouteMetadata, getStructuredData, PROJECT_ROUTES } from '../src/seo/siteMetadata.js';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');

const STATIC_ROUTES = [
  '/',
  '/welcome',
  '/portfolio',
  '/contact',
  '/sakupilot',
  '/about-website',
  ...PROJECT_ROUTES.map((route) => route.path),
];

const escapeAttr = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const setTag = (html, selector, replacement) => {
  const pattern = new RegExp(selector);
  return html.replace(pattern, replacement);
};

const renderRouteHtml = (template, route) => {
  const metadata = getRouteMetadata(route);
  const description = escapeAttr(metadata.description);
  const title = escapeAttr(metadata.title);
  const canonical = escapeAttr(metadata.canonical);
  const keywords = escapeAttr(metadata.keywords.join(', '));

  let html = template;
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  html = setTag(html, '<meta name="description" content="[^"]*"\\s*/>', `<meta name="description" content="${description}" />`);
  html = setTag(html, '<meta name="keywords" content="[^"]*"\\s*/>', `<meta name="keywords" content="${keywords}" />`);
  html = setTag(html, '<meta name="robots" content="[^"]*"\\s*/>', `<meta name="robots" content="${escapeAttr(metadata.robots)}" />`);
  html = setTag(html, '<link rel="canonical" href="[^"]*"\\s*/>', `<link rel="canonical" href="${canonical}" />`);
  html = setTag(html, '<meta property="og:url" content="[^"]*"\\s*/>', `<meta property="og:url" content="${canonical}" />`);
  html = setTag(html, '<meta property="og:title" content="[^"]*"\\s*/>', `<meta property="og:title" content="${title}" />`);
  html = setTag(html, '<meta property="og:description" content="[^"]*"\\s*/>', `<meta property="og:description" content="${description}" />`);
  html = setTag(html, '<meta name="twitter:title" content="[^"]*"\\s*/>', `<meta name="twitter:title" content="${title}" />`);
  html = setTag(html, '<meta name="twitter:description" content="[^"]*"\\s*/>', `<meta name="twitter:description" content="${description}" />`);
  html = html.replace(
    /<script type="application\/ld\+json" data-seo-jsonld="route">[\s\S]*?<\/script>/,
    `<script type="application/ld+json" data-seo-jsonld="route">${JSON.stringify(getStructuredData(route))}</script>`
  );
  return html;
};

const routeOutputPath = (route) => {
  if (route === '/') return join(dist, 'index.html');
  return join(dist, route.slice(1), 'index.html');
};

const template = await readFile(join(dist, 'index.html'), 'utf8');

for (const route of STATIC_ROUTES) {
  const output = routeOutputPath(route);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, renderRouteHtml(template, route));
}

await writeFile(
  join(dist, 'llms.txt'),
  `# Kry Rithisak

Kry Rithisak, also known as Saku, is a software developer in Phnom Penh, Cambodia.

Primary site: ${BASE_URL}/
Portfolio: ${BASE_URL}/portfolio
AI assistant: ${BASE_URL}/sakupilot
Contact: ${BASE_URL}/contact
GitHub: https://github.com/LiebeandSkye
LinkedIn: https://www.linkedin.com/in/kry-rithisak-b2b66824a

Core topics: React, JavaScript, Node.js, full-stack development, AI applications, Tailwind CSS, Socket.IO, Vite, web development.

Notable projects:
- Continental: car e-commerce project with Contentful CMS, simulated checkout, and AI assistant features.
- Discover Cambodia: tourism project with destination content and weather data.
- AI MemoryPorter: privacy-first utility for converting exported AI memory/context data into token-optimized Markdown.
- Project Nebula: real-time social deduction game with React, Express, and Socket.IO.
- SakuPilot: AI assistant embedded in the portfolio for answering questions about Kry Rithisak, projects, skills, and background.
`
);

console.log(`Prerendered metadata for ${STATIC_ROUTES.length} routes.`);
