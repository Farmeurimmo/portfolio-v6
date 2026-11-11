<script setup lang="ts">
withDefaults(defineProps<{
  headingTag?: 'h2' | 'h3'
}>(), {
  headingTag: 'h2',
})

const {t} = useI18n()
</script>

<template>
  <div class="contact__details">
    <component :is="headingTag" class="contact__subtitle">
      {{ t('contact.otherMethods') }}
    </component>

    <address class="contact__address">
      <a href="mailto:pro@robin-massonnat.fr">
        pro@robin-massonnat.fr
      </a>

      <p>
        Discord : Farmeurimmo
      </p>
    </address>
  </div>
</template>