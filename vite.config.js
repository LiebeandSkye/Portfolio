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
  if (!process.env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY;
  }
  
  return {
    plugins: [
      react(),
      tailwindcss(),
      localApiPlugin(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            const isPackage = (name) => id.includes(`node_modules/${name}/`) || id.includes(`node_modules\\${name}\\`);
            if (isPackage('react') || isPackage('react-dom') || isPackage('scheduler')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion') || id.includes('@floating-ui')) {
              return 'vendor-motion';
            }
            if (id.includes('react-icons')) {
              return 'vendor-icons';
            }
            if (
              [
                'react-markdown',
                'react-syntax-highlighter',
                'remark-gfm',
                'rehype-raw',
                'refractor',
                'prismjs',
                'lowlight',
                'hast-util-raw',
                'hast-util-to-jsx-runtime',
                'mdast-util-gfm',
                'micromark',
                'unified',
                'unist-util-visit',
                'vfile',
              ].some(isPackage)
            ) {
              return 'vendor-markdown';
            }
          },
        },
      },
    },
  };
})
