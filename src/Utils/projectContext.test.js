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
