import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Archivos estáticos de la carpeta public que deben incluirse
      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'contacts-banner.svg'
      ],

      // Declaración del Web App Manifest
      manifest: {
        name: 'Gestor de Contactos PWA',
        short_name: 'Contactos',
        description: 'Aplicación para gestionar tus contactos personales con soporte offline',
        theme_color: '#3b82f6',
        background_color: '#f1f5f9',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },

      // Configuración de la Estrategia Híbrida de Caché con Workbox
      workbox: {
        // 1. PRECACHÉ: Recursos locales esenciales para que la app abra offline al instante
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],

        // 2. RUNTIME CACHING: Estrategia en tiempo de ejecución para recursos dinámicos/externos
        runtimeCaching: [
          {
            // Estrategia CacheFirst para las fuentes de Google
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Estrategia StaleWhileRevalidate para imágenes adicionales
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 días
              }
            }
          }
        ]
      }
    })
  ]
});
