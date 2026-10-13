<script setup lang="ts">
const {t} = useI18n()
const localePath = useLocalePath()

const commitHash = ref('')

const serviceLinks = [
  {label: 'web', anchor: 'web'},
  {label: 'java', anchor: 'java'},
  {label: 'infrastructure', anchor: 'infrastructure'},
  {label: 'consulting', anchor: 'contact'}
]

const externalLinks = [
  {label: 'status', url: 'https://status.farmeurimmo.fr'},
  {label: 'linkedin', url: 'https://www.linkedin.com/in/robin-massonnat'},
  {label: 'github', url: 'https://github.com/Farmeurimmo'}
]

onMounted(async () => {
  try {
    const response = await fetch(
        'https://api.github.com/repos/Farmeurimmo/portfolio-v6/commits'
    )

    if (!response.ok) return

    const commits = await response.json()
    if (commits[0]?.sha) {
      commitHash.value = commits[0].sha.slice(0, 7)
    }
  } catch {
    commitHash.value = ''
  }
})
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__main">
      <div class="site-footer__brand">
        <NuxtLink :to="localePath('/')" class="site-footer__logo">
          <img
              src="https://cdn.farmeurimmo.fr/img/logo.jpg"
              alt="Farmeurimmo"
              width="40"
              height="40"
              loading="lazy"
          >
          <span>Farmeurimmo</span>
        </NuxtLink>

        <p class="site-footer__muted">
          {{ t('footer.since') }}
        </p>
      </div>

      <nav class="site-footer__column">
        <h2>{{ t('footer.services') }}</h2>

        <NuxtLink
            v-for="service in serviceLinks"
            :key="service.label"
            :to="localePath(`/#${service.anchor}`)"
        >
          {{ t(`footer.servicesList.${service.label}`) }}
        </NuxtLink>
      </nav>

      <nav class="site-footer__column">
        <h2>{{ t('footer.others') }}</h2>

        <a
            v-for="link in externalLinks"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
        >
          {{ t(`footer.${link.label}`) }}
        </a>

        <NuxtLink :to="localePath('/legals')">
          {{ t('footer.legalMentions') }}
        </NuxtLink>
      </nav>
    </div>

    <div class="site-footer__bottom">
      <p class="site-footer__muted">
        © 2018–{{ new Date().getFullYear() }} Farmeurimmo.
        {{ t('footer.rights') }}
      </p>

      <div class="site-footer__source">
        <NuxtLink
            to="https://github.com/Farmeurimmo/portfolio-v6"
            target="_blank"
        >
          {{ t('footer.sourcecode') }}
        </NuxtLink>

        <a
            v-if="commitHash"
            :href="`https://github.com/Farmeurimmo/portfolio-v6/commit/${commitHash}`"
            target="_blank"
            rel="noopener noreferrer"
            class="site-footer__commit"
        >
          {{ commitHash }}
        </a>
      </div>
    </div>
  </footer>
</template>