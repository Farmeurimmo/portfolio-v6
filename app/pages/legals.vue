<script setup lang="ts">
const {t} = useI18n()

const localePath = useLocalePath()

useSeoMeta({
  title: () => t('legals.seo.title'),
  description: () => t('legals.seo.description'),
  ogTitle: () => `${t('legals.seo.title')}`,
  ogDescription: () => t('legals.seo.description'),
  ogUrl: () => localePath('/legals'),
})
</script>

<template>
  <main class="legal-page">
    <section id="presentation" class="legal-page__section">
      <h1 class="legal-page__title">{{ t('Legals.title') }}</h1>

      <div class="legal-page__cards">
        <article class="legal-card">
          <h2>{{ t('legals.editor_title') }}</h2>
          <p>{{ t('legals.editor_name') }}</p>
          <p>{{ t('legals.editor_email') }}</p>
          <p>{{ t('legals.editor_address') }}</p>
          <p>{{ t('legals.editor_status') }}</p>
          <p>{{ t('legals.editor_siret') }}</p>
          <p>{{ t('legals.editor_ape') }}</p>
          <p>{{ t('legals.editor_tva') }}</p>
        </article>

        <article class="legal-card">
          <h2>{{ t('legals.host_title') }}</h2>
          <p>{{ t('legals.host_name') }}</p>
          <p>{{ t('legals.host_address') }}</p>
          <p>{{ t('legals.host_city') }}</p>
          <p>{{ t('legals.host_country') }}</p>
          <a :href="`mailto:${t('legals.host_email')}`">
            {{ t('legals.host_email') }}
          </a>
          <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">
            Cloudflare
          </a>
        </article>
      </div>

      <article class="legal-card legal-card--privacy">
        <h2>{{ t('legals.privacy.title') }}</h2>

        <h3>{{ t('legals.privacy.section_1_title') }}</h3>
        <p>{{ t('legals.privacy.section_1_text') }}</p>
        <ul>
          <li>{{ t('legals.privacy.section_1_item_1') }}</li>
          <li>{{ t('legals.privacy.section_1_item_2') }}</li>
          <li>{{ t('legals.privacy.section_1_item_3') }}</li>
          <li>{{ t('legals.privacy.section_1_item_4') }}</li>
        </ul>

        <h3>{{ t('legals.privacy.section_2_title') }}</h3>
        <p>{{ t('legals.privacy.section_2_text') }}</p>
        <ul>
          <li>{{ t('legals.privacy.section_2_item_1') }}</li>
          <li>{{ t('legals.privacy.section_2_item_2') }}</li>
        </ul>

        <h3>{{ t('legals.privacy.section_3_title') }}</h3>
        <p>{{ t('legals.privacy.section_3_text') }}</p>

        <h3>{{ t('legals.privacy.section_4_title') }}</h3>
        <p>{{ t('legals.privacy.section_4_text') }}</p>
        <ul>
          <li>{{ t('legals.privacy.email_label') }}</li>
          <li>{{ t('legals.privacy.contact_form_label') }}</li>
        </ul>

        <h3>{{ t('legals.privacy.third_party_services_title') }}</h3>
        <p>{{ t('legals.privacy.third_party_services_text') }}</p>
        <ul>
          <li>{{ t('legals.privacy.third_party_v1') }}</li>
          <li>{{ t('legals.privacy.third_party_v2') }}</li>
        </ul>
      </article>
    </section>
  </main>
</template>

<style scoped>
.legal-page {
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  margin-inline: auto;
  padding: 3rem 1.5rem;
}

.legal-page__section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.legal-page__title {
  font-size: clamp(2.25rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--foreground);
}

.legal-page__cards {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.legal-card {
  display: flex;
  flex: 1 1 20rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
  padding: 1.5rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--surface);
  box-shadow: 0 4px 12px rgb(0 0 0 / 5%);
  color: var(--foreground);
}

.legal-card h2 {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
}

.legal-card p,
.legal-card li {
  color: var(--muted-foreground);
  line-height: 1.7;
}

.legal-card a {
  color: var(--primary);
  text-decoration: none;
  overflow-wrap: anywhere;
}

.legal-card a:hover {
  text-decoration: underline;
}

.legal-card--privacy {
  max-width: none;
  padding: 2rem;
}

.legal-card--privacy h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.legal-card--privacy h3 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.legal-card--privacy ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 1.5rem;
  list-style: disc;
}

@media (max-width: 640px) {
  .legal-page {
    padding: 2rem 1rem;
  }

  .legal-card--privacy {
    padding: 1.5rem;
  }
}
</style>