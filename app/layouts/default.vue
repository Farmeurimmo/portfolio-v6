<script setup lang="ts">
const head = useLocaleHead({ seo: true })

useHead({
  htmlAttrs: { lang: () => head.value.htmlAttrs?.lang },
  titleTemplate: (title) =>
      title && title !== 'Farmeurimmo' ? `${title} | Farmeurimmo` : 'Farmeurimmo',
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    ...(head.value.link || []),
  ],
  meta: [...(head.value.meta || [])],
})

const route = useRoute()

useSeoMeta({
  ogUrl: () => `${route.fullPath}`,
  ogSiteName: 'Farmeurimmo',
  ogType: 'website',
  ogImage: 'https://farmeurimmo.fr/og-image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="relative min-h-screen">
    <ParticleBackground/>

    <Header/>

    <main class="relative z-10 min-h-screen flex flex-col items-center justify-center">
      <slot/>
    </main>

    <Footer/>
  </div>
</template>

<style scoped>

</style>