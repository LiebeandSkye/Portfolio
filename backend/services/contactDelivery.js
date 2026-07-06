function createContactDelivery({ sendTelegram }) {
    return async function deliverContactMessage(contact) {
        await sendTelegram(contact);
        return {
            success: true,
            primaryChannel: 'telegram',
            delivery: {
                telegram: 'sent',
            },
        };
    };
}

module.exports = { createContactDelivery };
