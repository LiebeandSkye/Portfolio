import test from 'node:test';
import assert from 'node:assert/strict';

import {
    createConversation,
    renameConversation,
    summarizeConversationTitle,
} from './immersiveChatStorage.js';

test('createConversation stores a recent conversation with a generated title', () => {
    const conversation = createConversation('Explain AI MemoryPorter in detail');

    assert.equal(conversation.title, 'Explain AI MemoryPorter in detail');
    assert.equal(conversation.messages.length, 0);
    assert.match(conversation.id, /^chat-/);
    assert.ok(conversation.updatedAt);
});

test('summarizeConversationTitle trims long prompts into readable sidebar titles', () => {
    const title = summarizeConversationTitle('   Please compare Continental and Discover Cambodia from a recruiter perspective with details   ');

    assert.equal(title, 'Please compare Continental and Discover Cambodia...');
});

test('renameConversation updates the title and timestamp without mutating the original', () => {
    const original = createConversation('First title');
    const renamed = renameConversation(original, 'Portfolio strategy');

    assert.equal(renamed.title, 'Portfolio strategy');
    assert.notEqual(renamed.updatedAt, original.updatedAt);
    assert.equal(original.title, 'First title');
});
