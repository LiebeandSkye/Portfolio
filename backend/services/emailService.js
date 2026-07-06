const nodemailer = require('nodemailer');
const { normalizeContactSubmission, buildPhoneLine } = require('./contactFormatting');

/**
 * Creates a reusable Nodemailer transporter using Gmail.
 *
 * Requires in .env:
 *   EMAIL_USER  — your Gmail address
 *   EMAIL_PASS  — a Gmail App Password (not your real password)
 *
 * How to generate a Gmail App Password:
 *   1. Go to https://myaccount.google.com/apppasswords
 *   2. Select "Mail" and your device
 *   3. Copy the 16-character password into EMAIL_PASS
 */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Sends a contact form submission to your email.
 *
 * @param {{ name: string, email: string, tel: string, message: string }} data
 * @returns {Promise<void>}
 */
async function sendContactEmail({ name, email, tel, message }) {
    const contact = normalizeContactSubmission({ name, email, tel, message });
    const phoneLine = buildPhoneLine(contact.tel);

    const phoneRow = phoneLine
        ? `
                    <tr>
                        <td style="padding: 10px 0; color: #8b949e; vertical-align: top;">Phone</td>
                        <td style="padding: 10px 0; color: #e6edf3;">${phoneLine}</td>
                    </tr>`
        : '';

    const mailOptions = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // sends to yourself
        replyTo: contact.email,     // reply goes directly to the sender
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
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendContactEmail };