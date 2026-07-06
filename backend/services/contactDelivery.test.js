const test = require('node:test');
const assert = require('node:assert/strict');

const { createContactDelivery } = require('./contactDelivery');

const submission = {
    name: 'Kry',
    email: 'kry@example.com',
    tel: '123',
    message: 'Hello',
};

test('returns success when Telegram sends successfully', async () => {
    const deliverContactMessage = createContactDelivery({
        sendTelegram: async () => {},
    });

    const result = await deliverContactMessage(submission);

    assert.equal(result.success, true);
    assert.equal(result.primaryChannel, 'telegram');
    assert.equal(result.delivery.telegram, 'sent');
    assert.equal(result.delivery.email, undefined);
});

test('throws error when Telegram fails to send', async () => {
    const deliverContactMessage = createContactDelivery({
        sendTelegram: async () => {
            throw new Error('Telegram API error: Network issue');
        },
    });

    await assert.rejects(
        () => deliverContactMessage(submission),
        /Telegram API error: Network issue/
    );
});
