function normalizeContactSubmission(contact = {}) {
    const normalize = (value) => (typeof value === 'string' ? value.trim() : '');

    return {
        name: normalize(contact.name),
        email: normalize(contact.email),
        tel: normalize(contact.tel),
        message: normalize(contact.message),
    };
}

function buildPhoneLine(tel) {
    const phone = typeof tel === 'string' ? tel.trim() : '';
    return phone ? phone : null;
}

module.exports = {
    normalizeContactSubmission,
    buildPhoneLine,
};