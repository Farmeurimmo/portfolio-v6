<script setup lang="ts">
const {t} = useI18n()
const route = useRoute()
const {locale} = useI18n()
const localePath = useLocalePath()

const {data: project} = await useAsyncData(
    () => `project-${locale.value}-${route.params.stem}`,
    () => queryCollection('projects')
        .where('stem', '=', `projects/${locale.value}/${route.params.stem}`)
        .first()
)

if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found'
  })
}

useSeoMeta({
  title: () => project.value?.title,
  description: () => project.value?.description,
  ogTitle: () => project.value?.title,
  ogDescription: () => project.value?.description,
  ogImage: () => project.value?.meta.image,
  ogType: () => 'article',
  articlePublishedTime: () => project.value?.meta.date,
  articleAuthor: ['Farmeurimmo'],
})
</script>

<template>
  <main v-if="project" class="portfolio">
    <article>
      <NuxtLink :to="localePath('/projects')">
        {{ t('projects.back') }}
      </NuxtLink>

      <header class="section-header">
        <p class="section-header__eyebrow">
          {{ project.meta.category }}
        </p>

        <h1 class="section-header__title">
          {{ project.title }}
        </h1>

        <p class="section-header__description">
          {{ project.description }}
        </p>
      </header>

      <img
          v-if="project.meta.image"
          :src="project.meta.image"
          :alt="project.title"
          class="project-detail__image"
      >

      <ul class="project-card__technologies">
        <li
            v-for="technology in project.meta.tags"
            :key="technology"
        >
          {{ technology }}
        </li>
      </ul>

      <div class="project-detail__content">
        <ContentRenderer :value="project" />
      </div>
    </article>
  </main>
</template>

<style scoped>
.project-detail__image {
  display: block;
  width: 100%;
  max-height: 480px;
  margin: 2rem 0;
  border: 1px solid var(--portfolio-border);
  border-radius: 1rem;
  object-fit: cover;
}
</style>