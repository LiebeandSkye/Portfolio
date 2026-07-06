const fetch = require('node-fetch');
const { normalizeContactSubmission, buildPhoneLine } = require('./contactFormatting');

/**
 * Sends a contact form notification to your Telegram chat via your bot.
 *
 * Requires in .env:
 *   TELEGRAM_BOT_TOKEN  — token from @BotFather  e.g. 7123456789:AAF...
 *   TELEGRAM_CHAT_ID    — your personal chat ID  e.g. 123456789
 *
 * How to get your Chat ID:
 *   1. Start a conversation with your bot on Telegram (send /start)
 *   2. Open this URL in your browser (replace with your actual token):
 *      https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
 *   3. Find the "chat" object and copy the "id" value
 *
 * @param {{ name: string, email: string, tel: string, message: string }} data
 * @returns {Promise<void>}
 */
async function sendTelegramNotification({ name, email, tel, message }) {
    // ── SET YOUR TELEGRAM BOT TOKEN IN .env AS: TELEGRAM_BOT_TOKEN ───────────
    const token = process.env.TELEGRAM_BOT_TOKEN;

    // ── SET YOUR TELEGRAM CHAT ID IN .env AS: TELEGRAM_CHAT_ID ──────────────
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        throw new Error('Telegram bot token or chat ID is missing from environment variables');
    }

    const contact = normalizeContactSubmission({ name, email, tel, message });
    const phoneLine = buildPhoneLine(contact.tel);

    const text = [
        `📬 *New Contact Form Message*`,
        ``,
        `👤 *Name:*    ${contact.name}`,
        `📧 *Email:*   ${contact.email}`,
        phoneLine ? `📞 *Phone:*   ${phoneLine}` : null,
        ``,
        `💬 *Message:*`,
        `${contact.message}`,
    ].filter(Boolean).join('\n');

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(url, {
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

module.exports = { sendTelegramNotification };