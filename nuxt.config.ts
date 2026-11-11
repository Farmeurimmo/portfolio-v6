// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {
        enabled: true
    },

    i18n: {
        baseUrl: 'https://farmeurimmo.fr',
        defaultLocale: 'en',
        strategy: 'prefix_except_default', locales: [
            {code: 'en', name: 'English', file: 'en.json'},
            {code: 'fr', name: 'Français', file: 'fr.json'}
        ]
    },

    turnstile: {
        siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
    },

    runtimeConfig: {
        public: {
            contactApiUrl: process.env.NUXT_PUBLIC_CONTACT_API_URL || 'https://contact-api.farmeurimmo.fr',
        },
    },

    modules: [
        '@nuxtjs/i18n',
        '@nuxtjs/color-mode',
        '@nuxt/content',
        '@nuxtjs/sitemap',
        '@nuxtjs/seo',
        '@nuxtjs/turnstile'
    ],

    site: {
        url: 'https://farmeurimmo.fr',
        name: 'Farmeurimmo',
        indexable: true,
    },

    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },

    nitro: {
        preset: 'static',

        prerender: {
            crawlLinks: true,
            failOnError: true
        }
    }
})