import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { Buffer } from 'node:buffer'

const localApiPlugin = () => ({
  name: 'local-api-chat',
  configureServer(server) {
    server.middlewares.use('/api/chat', async (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Method not allowed' }))
        return
      }

      try {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        req.body = JSON.parse(Buffer.concat(chunks).toString() || '{}')

        const { default: handler } = await import('./api/chat.js')
        await handler(req, {
          status(code) {
            res.statusCode = code
            return this
          },
          json(payload) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(payload))
          },
        })
      } catch (error) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: error.message || 'Local API error' }))
      }
    })
  },
})


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (!process.env.GROQ_API_KEY) {
    process.env.GROQ_API_KEY = env.GROQ_API_KEY || env.VITE_GROQ_API_KEY;
  }
  
  return {
    plugins: [
      react(),
      tailwindcss(),
      localApiPlugin(),
    ],
  };
})
