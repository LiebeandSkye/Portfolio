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

async function sendTelegramNotification(contact) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        throw new Error('Telegram bot token or chat ID is missing from environment variables');
    }

    const phoneLine = buildPhoneLine(contact.tel);

    const text = [
        `📬 *New Contact Form Message*`,
        '',
        `👤 *Name:*    ${contact.name}`,
        `📧 *Email:*   ${contact.email}`,
        phoneLine ? `📞 *Phone:*   ${phoneLine}` : null,
        '',
        `💬 *Message:*`,
        `${contact.message}`,
    ].filter(Boolean).join('\n');

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'Markdown',
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Telegram API error: ${err}`);
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const { name, email, tel, message } = normalizeContactSubmission(req.body);

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            error: 'Name, email, and message are required.',
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid email address.',
        });
    }

    const contact = { name, email, tel, message };

    try {
        await sendTelegramNotification(contact);

        return res.status(200).json({
            success: true,
            primaryChannel: 'telegram',
            delivery: {
                telegram: 'sent',
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to send your message. Please try again later.',
        });
    }
}