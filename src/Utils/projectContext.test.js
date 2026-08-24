import assert from 'node:assert/strict';
import test from 'node:test';

import { getProjectTechSummary } from './projectContext.js';

test('uses explicit project tech list before tags', () => {
  assert.equal(
    getProjectTechSummary({
      tech: ['React 19', 'Socket.IO 4'],
      tags: ['Fallback'],
    }),
    'React 19, Socket.IO 4',
  );
});

test('falls back to tags when a project has no tech list', () => {
  assert.equal(
    getProjectTechSummary({
      tags: ['React.js', 'Tailwind CSS'],
    }),
    'React.js, Tailwind CSS',
  );
});

test('returns empty string when project is null or undefined', () => {
  assert.equal(getProjectTechSummary(null), '');
  assert.equal(getProjectTechSummary(undefined), '');
  assert.equal(getProjectTechSummary({}), '');
});

test('returns non-empty tech summary for sample portfolio projects with tags', () => {
  const sampleProject = {
    id: 1,
    title: 'Continental',
    tags: ['React.js', 'Tailwind CSS', 'JavaScript', 'API', 'E-commerce', 'Virtual Assistant'],
  };
  assert.equal(
    getProjectTechSummary(sampleProject),
    'React.js, Tailwind CSS, JavaScript, API, E-commerce, Virtual Assistant',
  );
});

