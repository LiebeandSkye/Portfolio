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
    'http://localhost:5173',   // Vite dev (default)
    'http://localhost:5174',   // Vite dev (fallback port)
    'http://localhost:3000',   // CRA dev (just in case)
    process.env.FRONTEND_ORIGIN, // your deployed domain from .env
]
    .filter(Boolean)
    .map(origin => origin.replace(/\/$/, '')); // removes trailing slash for exact matching

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. curl, Postman, server-to-server)
        if (!origin) return callback(null, true);

        // Normalize the incoming origin (remove trailing slash if any)
        const cleanOrigin = origin.replace(/\/$/, '');

        // Check if origin matches allowed list
        if (allowedOrigins.includes(cleanOrigin)) return callback(null, true);

        // Dynamically allow Vercel domains for your portfolio deployment
        const isVercelDeployment = /^https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/.test(cleanOrigin);
        const containsUserIdentifier = cleanOrigin.toLowerCase().includes('kryrithisak');

        if (isVercelDeployment && containsUserIdentifier) {
            return callback(null, true);
        }

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
    if (!process.env.EMAIL_USER) console.warn('⚠️  EMAIL_USER not set in .env');
    if (!process.env.EMAIL_PASS) console.warn('⚠️  EMAIL_PASS not set in .env');
    if (!process.env.TELEGRAM_BOT_TOKEN) console.warn('⚠️  TELEGRAM_BOT_TOKEN not set in .env');
    if (!process.env.TELEGRAM_CHAT_ID) console.warn('⚠️  TELEGRAM_CHAT_ID not set in .env');
});