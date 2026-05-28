function summarizeError(error) {
    return error?.message || String(error);
}

function createContactDelivery({ sendEmail, sendTelegram, logger = console }) {
    return async function deliverContactMessage(contact) {
        const emailPromise = Promise.resolve()
            .then(() => sendEmail(contact))
            .then(() => {
                logger.warn('[Email] Contact message delivered after HTTP response.');
                return { status: 'sent' };
            })
            .catch((error) => {
                logger.error('[Email] Failed to send:', summarizeError(error));
                return { status: 'failed', error };
            });

        let telegramResult;
        try {
            await sendTelegram(contact);
            telegramResult = { status: 'sent' };
        } catch (error) {
            logger.error('[Telegram] Failed to send:', summarizeError(error));
            telegramResult = { status: 'failed', error };
        }

        if (telegramResult.status === 'sent') {
            return {
                success: true,
                primaryChannel: 'telegram',
                delivery: {
                    telegram: 'sent',
                    email: 'pending',
                },
            };
        }

        const emailResult = await emailPromise;
        if (emailResult.status === 'sent') {
            return {
                success: true,
                primaryChannel: 'email',
                delivery: {
                    telegram: 'failed',
                    email: 'sent',
                },
            };
        }

        throw new Error('Failed to send your message. Please try again later.');
    };
}

module.exports = { createContactDelivery };
