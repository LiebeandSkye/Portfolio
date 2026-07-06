import assert from 'node:assert/strict';
import {
  BASE_URL,
  getRouteMetadata,
  getStructuredData,
  PROJECT_ROUTES,
} from './siteMetadata.js';

const home = getRouteMetadata('/');
assert.equal(home.title, 'Kry Rithisak | Software Developer Portfolio');
assert.equal(home.canonical, `${BASE_URL}/`);
assert.match(home.description, /software developer/i);

const portfolio = getRouteMetadata('/portfolio');
assert.equal(portfolio.canonical, `${BASE_URL}/portfolio`);
assert.match(portfolio.title, /Projects/);
assert.notEqual(portfolio.description, home.description);

const project = getRouteMetadata('/portfolio/4');
assert.equal(project.canonical, `${BASE_URL}/portfolio/4`);
assert.match(project.title, /AI MemoryPorter/);
assert.match(project.description, /privacy-first/i);

const fallback = getRouteMetadata('/unknown-route');
assert.equal(fallback.canonical, `${BASE_URL}/`);
assert.equal(fallback.robots, 'noindex, follow');

assert.equal(PROJECT_ROUTES.length, 6);
assert.equal(new Set(PROJECT_ROUTES.map((route) => route.path)).size, 6);

const structuredData = getStructuredData('/portfolio/5');
assert.equal(structuredData['@graph'][0]['@type'], 'Person');
assert.equal(structuredData['@graph'].some((entry) => entry['@type'] === 'SoftwareSourceCode'), true);
assert.equal(structuredData['@graph'].some((entry) => entry['@type'] === 'WebSite'), true);

console.log('site metadata tests passed');
