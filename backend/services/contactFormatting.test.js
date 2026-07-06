const test = require('node:test');
const assert = require('node:assert/strict');

const { normalizeContactSubmission, buildPhoneLine } = require('./contactFormatting');

test('normalizes the optional phone field to an empty string when omitted', () => {
    const contact = normalizeContactSubmission({
        name: ' Kry ',
        email: ' kry@example.com ',
        message: ' Hello ',
    });

    assert.equal(contact.name, 'Kry');
    assert.equal(contact.email, 'kry@example.com');
    assert.equal(contact.tel, '');
    assert.equal(contact.message, 'Hello');
});

test('keeps a provided phone number after trimming', () => {
    const phoneLine = buildPhoneLine(' 123-456-789 ');

    assert.equal(phoneLine, '123-456-789');
});

test('returns null when no phone number is provided', () => {
    const phoneLine = buildPhoneLine('');

    assert.equal(phoneLine, null);
});