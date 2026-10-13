<script setup lang="ts">
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const localePath = useLocalePath()

const mainTechnologies = [
  'Java',
  'Spring Boot',
  'Vue 3',
  'TypeScript',
  'PostgreSQL',
  'Linux'
]

const services = [
  {
    id: 'java',
    titleKey: 'home.services.java.title',
    descriptionKey: 'home.services.java.description'
  },
  {
    id: 'web',
    titleKey: 'home.services.web.title',
    descriptionKey: 'home.services.web.description'
  },
  {
    id: 'system',
    titleKey: 'home.services.system.title',
    descriptionKey: 'home.services.system.description'
  },
  {
    id: 'architecture',
    titleKey: 'home.services.architecture.title',
    descriptionKey: 'home.services.architecture.description'
  }
]

const aboutParagraphKeys = [
  'home.about.paragraphs.0',
  'home.about.paragraphs.1',
  'home.about.paragraphs.2',
  'home.about.paragraphs.3',
  'home.about.paragraphs.4'
]

const approachKeys = [
  'home.about.approach.understand',
  'home.about.approach.design',
  'home.about.approach.evolve'
]

const technologyGroups = [
  {
    id: 'languages',
    labelKey: 'home.technologies.groups.languages',
    items: [
      'Java',
      'JavaScript',
      'TypeScript',
      'Python',
      'HTML',
      'CSS',
      'C++',
      'Markdown',
      'Bash'
    ]
  },
  {
    id: 'frameworks',
    labelKey: 'home.technologies.groups.frameworks',
    items: [
      'Spring',
      'Vue',
      'Nuxt',
      'Tailwind CSS',
      'SFML3'
    ]
  },
  {
    id: 'devops',
    labelKey: 'home.technologies.groups.devops',
    items: [
      'Arch Linux',
      'Ubuntu',
      'Docker',
      'Portainer',
      'Git',
      'GitHub',
      'GitHub Actions',
      'Cloudflare',
      'Vite',
      'pnpm',
      'Gradle',
      'Maven'
    ]
  },
  {
    id: 'databases',
    labelKey: 'home.technologies.groups.databases',
    items: [
      'MySQL',
      'PostgreSQL',
      'Redis',
      'InfluxDB'
    ]
  },
  {
    id: 'monitoring',
    labelKey: 'home.technologies.groups.monitoring',
    items: [
      'Grafana',
      'Zabbix',
      'Gatus'
    ]
  }
]

const {locale} = useI18n()

const {data: projects} = await useAsyncData(
    'home-projects',
    () => queryCollection('projects')
        .where('stem', 'LIKE', `projects/${locale.value}/%`)
        .all(),
    {watch: [locale]}
)

const featuredProjects = computed(() =>
    (projects.value ?? []).slice(0, 3)
)
</script>

<template>
  <main class="portfolio">
    <section id="accueil" class="hero" aria-labelledby="hero-title">
      <div class="hero__content">
        <p class="hero__eyebrow">
          {{ t('home.hero.eyebrow') }}
        </p>

        <h1 id="hero-title" class="hero__title">
          {{ t('home.hero.title') }}
        </h1>

        <p class="hero__description">
          {{ t('home.hero.intro') }}
        </p>

        <p class="hero__approach">
          {{ t('home.hero.approach') }}
        </p>

        <nav class="hero__actions" :aria-label="t('home.hero.navigationLabel')">
          <a href="#projets" class="hero__link hero__link--primary">
            {{ t('home.hero.projectsCta') }}
          </a>

          <a href="#contact" class="hero__link hero__link--secondary">
            {{ t('home.hero.contactCta') }}
          </a>
        </nav>
      </div>

      <aside class="hero__aside">
        <div class="hero__stack">
          <h2 class="hero__stack-title">
            {{ t('home.hero.stackTitle') }}
          </h2>

          <ul class="hero__stack-list">
            <li
                v-for="technology in mainTechnologies"
                :key="technology"
                class="hero__stack-item"
            >
              {{ technology }}
            </li>
          </ul>
        </div>

        <div class="hero__aside-footer">
          <p>{{ t('home.hero.asideTitle') }}</p>
          <p>{{ t('home.hero.asideDescription') }}</p>
        </div>
      </aside>
    </section>

    <section id="projets" class="projects" aria-labelledby="projects-title">
      <header class="section-header">
        <p class="section-header__eyebrow">
          {{ t('home.projects.eyebrow') }}
        </p>

        <h2 id="projects-title" class="section-header__title">
          {{ t('home.projects.title') }}
        </h2>

        <p class="section-header__description">
          {{ t('home.projects.description') }}
        </p>
      </header>

      <div class="projects__grid">
        <NuxtLink
            v-for="project in featuredProjects"
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
          </div>

          <div class="project-card__content">
            <h3 class="project-card__title">
              {{ project.title }}
            </h3>

            <p class="project-card__description">
              {{ project.description }}
            </p>

            <ul class="project-card__technologies">
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

    <section id="services" class="services" aria-labelledby="services-title">
      <header class="section-header">
        <p class="section-header__eyebrow">
          {{ t('home.services.eyebrow') }}
        </p>

        <h2 id="services-title" class="section-header__title">
          {{ t('home.services.title') }}
        </h2>
      </header>

      <div class="services__grid">
        <article
            v-for="service in services"
            :key="service.id"
            class="service-card"
        >
          <h3 class="service-card__title">
            {{ t(service.titleKey) }}
          </h3>

          <p class="service-card__description">
            {{ t(service.descriptionKey) }}
          </p>
        </article>
      </div>
    </section>

    <section id="apropos" class="about" aria-labelledby="about-title">
      <div class="about__content">
        <header class="section-header">
          <p class="section-header__eyebrow">
            {{ t('home.about.eyebrow') }}
          </p>

          <h2 id="about-title" class="section-header__title">
            {{ t('home.about.title') }}
          </h2>
        </header>

        <div class="about__text">
          <p
              v-for="paragraphKey in aboutParagraphKeys"
              :key="paragraphKey"
          >
            {{ t(paragraphKey) }}
          </p>
        </div>
      </div>

      <aside class="about__approach">
        <h3 class="about__approach-title">
          {{ t('home.about.approachTitle') }}
        </h3>

        <ol class="about__approach-list">
          <li
              v-for="(approachKey, index) in approachKeys"
              :key="approachKey"
              class="about__approach-item"
          >
            <span class="about__approach-number">
              {{ String(index + 1).padStart(2, '0') }}
            </span>

            <span>{{ t(approachKey) }}</span>
          </li>
        </ol>
      </aside>
    </section>

    <section
        id="technologies"
        class="technologies"
        aria-labelledby="technologies-title"
    >
      <header class="section-header">
        <p class="section-header__eyebrow">
          {{ t('home.technologies.eyebrow') }}
        </p>

        <h2 id="technologies-title" class="section-header__title">
          {{ t('home.technologies.title') }}
        </h2>

        <p class="section-header__description">
          {{ t('home.technologies.description') }}
        </p>
      </header>

      <div class="technologies__grid">
        <section
            v-for="group in technologyGroups"
            :key="group.id"
            class="technology-group"
        >
          <h3 class="technology-group__title">
            {{ t(group.labelKey) }}
          </h3>

          <ul class="technology-group__list">
            <li
                v-for="technology in group.items"
                :key="technology"
                class="technology-group__item"
            >
              {{ technology }}
            </li>
          </ul>
        </section>
      </div>
    </section>

    <section id="contact" class="contact" aria-labelledby="contact-title">
      <header class="section-header">
        <p class="section-header__eyebrow">
          {{ t('home.contact.eyebrow') }}
        </p>

        <h2 id="contact-title" class="section-header__title">
          {{ t('home.contact.title') }}
        </h2>

        <p class="section-header__description">
          {{ t('home.contact.description') }}
        </p>
      </header>

      <div class="contact__layout">
        <div class="contact__details">
          <h3 class="contact__subtitle">
            {{ t('home.contact.otherMethods') }}
          </h3>

          <address class="contact__address">
            <a href="mailto:pro@robin-massonnat.fr">
              pro@robin-massonnat.fr
            </a>

            <p>
              Discord : Farmeurimmo
            </p>
          </address>
        </div>

        <form
            class="contact-form"
            @submit.prevent
        >
          <div class="contact-form__field">
            <label for="contact-username">
              {{ t('home.contact.form.username') }}
            </label>

            <input
                id="contact-username"
                name="username"
                type="text"
                autocomplete="name"
                required
            />
          </div>

          <div class="contact-form__field">
            <label for="contact-email">
              {{ t('home.contact.form.email') }}
            </label>

            <input
                id="contact-email"
                name="email"
                type="email"
                autocomplete="email"
                required
            />
          </div>

          <div class="contact-form__field">
            <label for="contact-subject">
              {{ t('home.contact.form.subject') }}
            </label>

            <input
                id="contact-subject"
                name="subject"
                type="text"
                required
            />
          </div>

          <div class="contact-form__field">
            <label for="contact-message">
              {{ t('home.contact.form.message') }}
            </label>

            <textarea
                id="contact-message"
                name="message"
                rows="6"
                required
            />
          </div>

          <button
              class="contact-form__submit"
              type="submit"
          >
            {{ t('home.contact.form.submit') }}
          </button>
        </form>
      </div>
    </section>
  </main>
</template>

<style scoped>
</style>