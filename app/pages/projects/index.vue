<script setup lang="ts">
const {locale, t} = useI18n()
const localePath = useLocalePath()

const {data: projects} = await useAsyncData(
    'projects',
    () => queryCollection('projects')
        .where('stem', 'LIKE', `projects/${locale.value}/%`)
        .all(),
    {watch: [locale]}
)

useSeoMeta({
  title: () => t('projects.title'),
  description: () => t('projects.description')
})
</script>

<template>
  <main class="portfolio">
    <section>
      <header class="section-header">
        <h1 class="section-header__title">
          {{ t('projects.title') }}
        </h1>
        <p class="section-header__description">
          {{ t('projects.description') }}
        </p>
      </header>

      <div class="projects__grid">
        <NuxtLink
            v-for="project in projects"
            :key="project.stem"
            :to="localePath(`/projects/${project.stem.split('/').pop()}`)"
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