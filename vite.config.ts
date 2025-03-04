import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api/rss': {
        target: 'https://api.soundon.fm',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rss/, ''),
        secure: false, // Try this if you're having SSL issues
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err)
          })
          proxy.on('proxyReq', (_, req, _res) => {
            console.log('Sending Request:', req.method, req.url)
          })
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log(
              'Received Response from target:',
              proxyRes.statusCode,
              req.url
            )
          })
        },
      },
    },
  },
})
