import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        projects: defineCollection({
            type: 'page',
            source: 'projects/**/*.md'
        }),
        blog: defineCollection({
            type: 'page',
            source: 'blog/**/*.md'
        }),
    }
})