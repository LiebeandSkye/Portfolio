const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../services/emailService');
const { sendTelegramNotification } = require('../services/telegramService');
const { createContactDelivery } = require('../services/contactDelivery');
const { normalizeContactSubmission } = require('../services/contactFormatting');

const deliverContactMessage = createContactDelivery({
    sendEmail: sendContactEmail,
    sendTelegram: sendTelegramNotification,
});

/**
 * POST /api/contact
 *
 * Body: { name, email, tel?, message }
 *
 * 1. Validates required fields and normalizes the optional phone field
 * 2. Starts email and Telegram delivery
 * 3. Returns as soon as Telegram succeeds; email continues in the background
 * 4. Falls back to email confirmation if Telegram fails
 */
router.post('/', async (req, res) => {
    const { name, email, tel, message } = normalizeContactSubmission(req.body);

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
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

    try {
        const result = await deliverContactMessage({ name, email, tel, message });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || 'Failed to send your message. Please try again later.',
        });
    }
});

module.exports = router;
