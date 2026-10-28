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

    modules: [
        '@nuxtjs/i18n',
        '@nuxtjs/color-mode',
        '@nuxt/content',
        '@nuxtjs/sitemap',
        '@nuxtjs/seo'
    ],

    site: {
        url: 'https://farmeurimmo.fr',
        name: 'Farmeurimmo',
        indexable: false,
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