const test = require('node:test');
const assert = require('node:assert/strict');

const { createContactDelivery } = require('./contactDelivery');

const submission = {
    name: 'Kry',
    email: 'kry@example.com',
    tel: '123',
    message: 'Hello',
};

test('returns success as soon as Telegram sends while email continues in the background', async () => {
    let finishEmail;
    let emailCompleted = false;
    const emailPromise = new Promise((resolve) => {
        finishEmail = () => {
            emailCompleted = true;
            resolve();
        };
    });

    const deliverContactMessage = createContactDelivery({
        sendEmail: () => emailPromise,
        sendTelegram: async () => {},
        logger: { error() {}, warn() {} },
    });

    const result = await deliverContactMessage(submission);

    assert.equal(result.success, true);
    assert.equal(result.primaryChannel, 'telegram');
    assert.equal(result.delivery.telegram, 'sent');
    assert.equal(result.delivery.email, 'pending');
    assert.equal(emailCompleted, false);

    finishEmail();
    await emailPromise;
});

test('falls back to email when Telegram fails', async () => {
    const deliverContactMessage = createContactDelivery({
        sendEmail: async () => {},
        sendTelegram: async () => {
            throw new Error('Telegram unavailable');
        },
        logger: { error() {}, warn() {} },
    });

    const result = await deliverContactMessage(submission);

    assert.equal(result.success, true);
    assert.equal(result.primaryChannel, 'email');
    assert.equal(result.delivery.telegram, 'failed');
    assert.equal(result.delivery.email, 'sent');
});

test('throws when both delivery channels fail', async () => {
    const deliverContactMessage = createContactDelivery({
        sendEmail: async () => {
            throw new Error('Email unavailable');
        },
        sendTelegram: async () => {
            throw new Error('Telegram unavailable');
        },
        logger: { error() {}, warn() {} },
    });

    await assert.rejects(
        () => deliverContactMessage(submission),
        /Failed to send your message/
    );
});
