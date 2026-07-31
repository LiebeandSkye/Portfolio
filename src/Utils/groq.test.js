import test from 'node:test';
import assert from 'node:assert/strict';

import { getChatEndpoint } from './groq.js';

test('getChatEndpoint uses local serverless path in production builds', () => {
    assert.equal(getChatEndpoint({ DEV: false }, {}), '/api/chat');
});

test('getChatEndpoint uses configured chat API url during local development', () => {
    assert.equal(
        getChatEndpoint({ DEV: true, VITE_CHAT_API_URL: 'https://portfolio.example.com/' }),
        'https://portfolio.example.com/api/chat'
    );
});

test('getChatEndpoint falls back to local path when no development API url exists', () => {
    assert.equal(getChatEndpoint({ DEV: true }, {}), '/api/chat');
});
