require('dotenv').config(); // must be first

const express = require('express');
const cors = require('cors');
const contactRoute = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// ── CORS ──────────────────────────────────────────────────────────────────────
// Allows requests from your frontend — both local dev AND your deployed domain.
// Add every origin you need in the array below.
const allowedOrigins = [
    'http://localhost:5173',   // Vite dev
    'http://localhost:3000',   // CRA dev (just in case)
    process.env.FRONTEND_ORIGIN, // your deployed domain from .env
].filter(Boolean); // removes undefined if FRONTEND_ORIGIN isn't set yet

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. curl, Postman, server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/contact', contactRoute);

// ── Health check — visit http://localhost:5000/health to confirm server is up ─
app.get('/health', (_req, res) => res.json({ status: 'ok', port: PORT }));

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ Backend running → http://localhost:${PORT}`);
    console.log(`   Health check  → http://localhost:${PORT}/health`);
    console.log(`   Contact API   → http://localhost:${PORT}/api/contact`);

    // Startup warnings so you know immediately if something's missing
    if (!process.env.EMAIL_USER)          console.warn('⚠️  EMAIL_USER not set in .env');
    if (!process.env.EMAIL_PASS)          console.warn('⚠️  EMAIL_PASS not set in .env');
    if (!process.env.TELEGRAM_BOT_TOKEN)  console.warn('⚠️  TELEGRAM_BOT_TOKEN not set in .env');
    if (!process.env.TELEGRAM_CHAT_ID)    console.warn('⚠️  TELEGRAM_CHAT_ID not set in .env');
});