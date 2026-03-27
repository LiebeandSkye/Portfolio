const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../services/emailService');
const { sendTelegramNotification } = require('../services/telegramService');

/**
 * POST /api/contact
 *
 * Body: { name, email, tel, message }
 *
 * 1. Validates all required fields
 * 2. Sends email via Nodemailer (Gmail)
 * 3. Sends Telegram notification via Bot API
 * Both run in parallel with Promise.allSettled so one failing doesn't block the other.
 */
router.post('/', async (req, res) => {
    const { name, email, tel, message } = req.body;

    // ── Basic validation ──────────────────────────────────────────────────────
    if (!name?.trim() || !email?.trim() || !tel?.trim() || !message?.trim()) {
        return res.status(400).json({
            success: false,
            error: 'All fields are required.',
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid email address.',
        });
    }

    // ── Dispatch both notifications in parallel ───────────────────────────────
    const [emailResult, telegramResult] = await Promise.allSettled([
        sendContactEmail({ name, email, tel, message }),
        sendTelegramNotification({ name, email, tel, message }),
    ]);

    // Log failures server-side without exposing details to the client
    if (emailResult.status === 'rejected') {
        console.error('[Email] Failed to send:', emailResult.reason?.message);
    }
    if (telegramResult.status === 'rejected') {
        console.error('[Telegram] Failed to send:', telegramResult.reason?.message);
    }

    // If BOTH failed, return an error so the user knows something went wrong
    if (emailResult.status === 'rejected' && telegramResult.status === 'rejected') {
        return res.status(500).json({
            success: false,
            error: 'Failed to send your message. Please try again later.',
        });
    }

    return res.status(200).json({ success: true });
});

module.exports = router;