import nodemailer from 'nodemailer';

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

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendContactEmail(contact) {
    const phoneLine = buildPhoneLine(contact.tel);

    const phoneRow = phoneLine
        ? `
                    <tr>
                        <td style="padding: 10px 0; color: #8b949e; vertical-align: top;">Phone</td>
                        <td style="padding: 10px 0; color: #e6edf3;">${phoneLine}</td>
                    </tr>`
        : '';

    await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: contact.email,
        subject: `📬 New message from ${contact.name}`,
        html: `
            <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0d1117; color: #e6edf3; border-radius: 12px; border: 1px solid #30363d;">
                <h2 style="margin: 0 0 24px; color: #3fb950; font-size: 20px;">
                    📬 New Contact Form Submission
                </h2>

                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; color: #8b949e; width: 90px; vertical-align: top;">Name</td>
                        <td style="padding: 10px 0; color: #e6edf3; font-weight: 600;">${contact.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #8b949e; vertical-align: top;">Email</td>
                        <td style="padding: 10px 0;">
                            <a href="mailto:${contact.email}" style="color: #58a6ff;">${contact.email}</a>
                        </td>
                    </tr>
                    ${phoneRow}
                    <tr>
                        <td style="padding: 10px 0; color: #8b949e; vertical-align: top; border-top: 1px solid #30363d;">Message</td>
                        <td style="padding: 10px 0; color: #e6edf3; white-space: pre-wrap; border-top: 1px solid #30363d;">${contact.message}</td>
                    </tr>
                </table>

                <p style="margin-top: 24px; color: #484f58; font-size: 12px;">
                    Sent from your portfolio contact form
                </p>
            </div>
        `,
    });
}

async function sendTelegramNotification(contact) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        return { status: 'skipped' };
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
        const [emailResult, telegramResult] = await Promise.allSettled([
            sendContactEmail(contact),
            sendTelegramNotification(contact),
        ]);

        if (telegramResult.status === 'fulfilled') {
            return res.status(200).json({
                success: true,
                primaryChannel: 'telegram',
                delivery: {
                    telegram: 'sent',
                    email: emailResult.status === 'fulfilled' ? 'sent' : 'failed',
                },
            });
        }

        if (emailResult.status === 'fulfilled') {
            return res.status(200).json({
                success: true,
                primaryChannel: 'email',
                delivery: {
                    telegram: 'failed',
                    email: 'sent',
                },
            });
        }

        throw new Error('Failed to send your message. Please try again later.');
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to send your message. Please try again later.',
        });
    }
}