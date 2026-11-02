<script setup lang="ts">
const {t} = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const {data: project} = await useAsyncData(
    () => `project--${route.params.stem}`,
    () => queryCollection('blog')
        .where('stem', '=', `blog/${route.params.stem}`)
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

const headingShift: Record<string, string> = {
  h1: 'h2',
  h2: 'h3',
  h3: 'h4',
  h4: 'h5',
  h5: 'h6',
}

const shiftHeadings = (node: any): any => {
  if (!Array.isArray(node)) return node
  if (typeof node[0] === 'string') {
    const [tag, props, ...children] = node
    return [headingShift[tag] ?? tag, props, ...children.map(shiftHeadings)]
  }
  return node.map(shiftHeadings)
}

const renderedProject = computed(() => {
  if (!project.value?.body) return project.value
  return {
    ...project.value,
    body: {
      ...project.value.body,
      value: shiftHeadings(project.value.body.value),
    },
  }
})
</script>

<template>
  <main v-if="project" class="portfolio">
    <article>
      <NuxtLink :to="localePath('/blog')">
        {{ t('blog.back') }}
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
        <ContentRenderer :value="renderedProject"/>
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