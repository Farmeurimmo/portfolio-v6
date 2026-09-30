// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {
        enabled: true
    },

    i18n: {
        locales: [
            {code: 'en', name: 'English', file: 'en.json'},
            {code: 'fr', name: 'Français', file: 'fr.json'}
        ]
    },

    modules: [
      '@nuxtjs/i18n',
      'nitro-cloudflare-dev',
      '@nuxtjs/color-mode'
    ],

    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },

    nitro: {
        preset: 'cloudflare-pages',

        cloudflare: {
            deployConfig: true,
            nodeCompat: true
        }
    }
})