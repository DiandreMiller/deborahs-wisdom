import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['og-image.png', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: "Deborah's Wisdom",
        short_name: 'Wisdom',
        description:
          'A Bible word game where you guess the hidden word and reveal inspiring verses.',
        theme_color: '#be8f48',
        background_color: '#fff7dc',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/og-image.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/og-image.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/og-image.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,mp3}'],
      },
    }),
  ],
})
