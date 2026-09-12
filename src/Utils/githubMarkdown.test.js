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

test('remarkGithubSafe disables indented code blocks while preserving fenced code blocks', () => {
    const processor = unified()
        .use(remarkParse)
        .use(remarkGithubSafe);

    // Indented with 4 spaces should be parsed as paragraph text, NOT code
    const indentedMarkdown = 'Here is text:\n\n    <- Best - Android spaced-repetition\n\nDone.';
    const indentedTree = processor.parse(indentedMarkdown);
    const hasIndentedCodeNode = indentedTree.children.some(child => child.type === 'code');
    assert.equal(hasIndentedCodeNode, false, 'Indented text should not be parsed as a code block');

    // Fenced code block with triple backticks should still be parsed as code
    const fencedMarkdown = 'Here is code:\n\n```javascript\nconsole.log("hello");\n```\n';
    const fencedTree = processor.parse(fencedMarkdown);
    const fencedCodeNode = fencedTree.children.find(child => child.type === 'code');
    assert.ok(fencedCodeNode, 'Fenced code should still be parsed as a code block');
    assert.equal(fencedCodeNode.lang, 'javascript');
});

