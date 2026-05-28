import test from 'node:test';
import assert from 'node:assert/strict';
import {unified} from 'unified';
import remarkParse from 'remark-parse';

import remarkGithubSafe from './githubMarkdown.js';

test('remarkGithubSafe renders GFM without constructing Safari-incompatible lookbehind regexes', () => {
    const OriginalRegExp = globalThis.RegExp;

    globalThis.RegExp = function SafariLikeRegExp(pattern, flags) {
        if (typeof pattern === 'string' && pattern.includes('(?<=')) {
            throw new SyntaxError('Invalid regular expression: invalid group specifier name');
        }

        return new OriginalRegExp(pattern, flags);
    };
    globalThis.RegExp.prototype = OriginalRegExp.prototype;

    try {
        assert.doesNotThrow(() => {
            const processor = unified()
                .use(remarkParse)
                .use(remarkGithubSafe);
            const tree = processor.parse('| A | B |\n| - | - |\n| one | two |\n\n- [x] shipped');

            processor.runSync(tree);
        });
    } finally {
        globalThis.RegExp = OriginalRegExp;
    }
});
