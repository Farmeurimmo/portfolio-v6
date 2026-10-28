<script setup lang="ts">
const {t} = useI18n()
const localePath = useLocalePath()

const {data: articles} = await useAsyncData(
    'blog',
    () => queryCollection('blog').all()
)

useSeoMeta({
  title: () => t('blog.seo.title'),
  description: () => t('blog.seo.description'),
  ogTitle: () => `${t('blog.seo.title')}`,
  ogDescription: () => t('blog.seo.description'),
})
</script>

<template>
  <main class="portfolio">
    <section>
      <header class="section-header">
        <h1 class="section-header__title">
          {{ t('blog.title') }}
        </h1>
        <p class="section-header__description">
          {{ t('blog.description') }}
        </p>
      </header>

      <div class="projects__grid">
        <NuxtLink
            v-for="project in articles"
            :key="project.stem"
            :to="localePath(`/blog/${project.stem.split('/').pop()}`)"
            class="project-card"
        >
          <div class="project-card__preview">
            <img
                v-if="project.meta.image"
                :src="project.meta.image"
                :alt="project.title"
                class="project-card__image"
            >
            <span
                v-if="project.meta.tags?.length"
                class="project-card__category"
            >
              {{ project.meta.tags[0] }}
            </span>
          </div>

          <div class="project-card__content">
            <h2 class="project-card__title">
              {{ project.title }}
            </h2>

            <p class="project-card__description">
              {{ project.description }}
            </p>

            <ul
                v-if="project.meta.tags?.length"
                class="project-card__technologies"
            >
              <li
                  v-for="technology in project.meta.tags"
                  :key="technology"
              >
                {{ technology }}
              </li>
            </ul>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>