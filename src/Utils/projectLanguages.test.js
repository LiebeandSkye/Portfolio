import assert from 'node:assert/strict';
import test from 'node:test';

import { getDominantLanguage, LANGUAGE_STYLES } from './projectLanguages.js';

test('identifies Kotlin as dominant language for Saku', () => {
  const sakuProject = {
    id: 7,
    title: 'Saku',
    percent: { kotlin: 88.3, xml: 6.4, typescript: 3.8, css: 1.5 },
    languages: { kotlin: 'Kotlin', xml: 'XML', typescript: 'TypeScript', css: 'CSS' },
  };

  const dominant = getDominantLanguage(sakuProject);
  assert.equal(dominant.key, 'kotlin');
  assert.equal(dominant.label, 'Kotlin');
  assert.equal(dominant.color, '#A97BFF');
  assert.equal(dominant.percent, 88.3);
});

test('identifies TypeScript as dominant language for Charm Store KH', () => {
  const charmStoreProject = {
    id: 3,
    title: 'Charm Store KH',
    percent: { typescript: 88.4, plpgsql: 2.6, css: 12.0, html: 2.0 },
  };

  const dominant = getDominantLanguage(charmStoreProject);
  assert.equal(dominant.key, 'typescript');
  assert.equal(dominant.label, 'TypeScript');
  assert.equal(dominant.color, '#3178c6');
  assert.equal(dominant.percent, 88.4);
});

test('identifies JavaScript and returns consistent yellow color across different JS projects', () => {
  const jsProject1 = {
    id: 2,
    title: 'Discover Cambodia',
    percent: { javascript: 50, html: 25, css: 15, python: 10 },
  };

  const jsProject2 = {
    id: 8,
    title: 'Orgi',
    percent: { javascript: 78.5, css: 12.0, sql: 9.5 },
  };

  const dominant1 = getDominantLanguage(jsProject1);
  const dominant2 = getDominantLanguage(jsProject2);

  assert.equal(dominant1.key, 'javascript');
  assert.equal(dominant1.label, 'JavaScript');
  assert.equal(dominant1.color, '#f1e05a');

  assert.equal(dominant2.key, 'javascript');
  assert.equal(dominant2.label, 'JavaScript');
  assert.equal(dominant2.color, '#f1e05a');

  // Both should have the exact same color (#f1e05a)
  assert.equal(dominant1.color, dominant2.color);
});

test('falls back to tags when percent is not present', () => {
  const project = {
    title: 'Tagged Project',
    tags: ['React', 'TypeScript', 'Tailwind'],
  };

  const dominant = getDominantLanguage(project);
  assert.equal(dominant.key, 'typescript');
  assert.equal(dominant.label, 'TypeScript');
  assert.equal(dominant.color, '#3178c6');
});

test('returns default language when project is null or empty', () => {
  assert.equal(getDominantLanguage(null).label, 'JavaScript');
  assert.equal(getDominantLanguage(null).color, '#f1e05a');
  assert.equal(getDominantLanguage({}).label, 'JavaScript');
  assert.equal(getDominantLanguage({}).color, '#f1e05a');
});
