<script setup lang="ts">
const {t} = useI18n()

useSeoMeta({
  title: () => t('contact.seo.title'),
  description: () => t('contact.seo.description'),
  ogTitle: () => `${t('contact.seo.title')} | Farmeurimmo`,
  ogDescription: () => t('contact.seo.description'),
})
</script>

<template>
  <div class="portfolio">
    <section class="contact" aria-labelledby="contact-title">
      <header class="section-header">
        <p class="section-header__eyebrow">
          {{ t('contact.eyebrow') }}
        </p>

        <h1 id="contact-title" class="section-header__title">
          {{ t('contact.title') }}
        </h1>

        <p class="section-header__description">
          {{ t('contact.description') }}
        </p>
      </header>

      <div class="contact__layout">
        <ContactDetails/>
        <Contactform/>
      </div>
    </section>
  </div>
</template>