<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const { locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const colorMode = useColorMode()

const localeOpen = ref(false)

const navItems = [
  { label: 'nav.home', path: '/' },
  { label: 'nav.projects', path: '/projects' },
  { label: 'nav.blog', path: '/blog' },
  { label: 'nav.contact', path: '/#contact' }
]

const localeLabels: Record<string, string> = {
  fr: 'Français',
  en: 'English'
}

const localeFlags: Record<string, string> = {
  fr: '🇫🇷',
  en: '🇺🇸'
}

const changeLocale = async (code: string) => {
  localeOpen.value = false
  await setLocale(code)
}

const toggleLocale = () => {
  localeOpen.value = !localeOpen.value
}

const closeLocale = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  if (!target.closest('[data-locale-menu]')) {
    localeOpen.value = false
  }
}

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
  document.addEventListener('click', closeLocale)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeLocale)
})
</script>

<template>
  <nav class="relative z-20 w-full border-b border-gray-300 dark:border-gray-700">
    <div
        class="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-4 md:flex-row md:justify-between"
    >
      <NuxtLink
          :to="localePath('/')"
          class="flex items-center gap-3 text-gray-950 dark:text-white"
      >
        <img
            src="https://cdn.farmeurimmo.fr/img/logo.jpg"
            alt="Farmeurimmo"
            class="h-8 w-8 rounded-full"
            width="32"
            height="32"
        >

        <span class="text-2xl font-bold transition-colors hover:text-primary">
          Farmeurimmo
        </span>
      </NuxtLink>

      <div class="flex items-center gap-6">
        <NuxtLink
            v-for="item in navItems"
            :key="item.label"
            :to="localePath(item.path)"
            class="text-sm font-medium text-gray-950 transition-colors hover:text-primary dark:text-white"
        >
          {{ $t(item.label) }}
        </NuxtLink>
      </div>

      <div
          data-locale-menu
          class="relative flex items-center gap-2"
      >
        <div class="relative">
          <button
              type="button"
              class="flex h-10 items-center gap-2 rounded-lg bg-gray-100 px-3 text-sm font-medium text-gray-950 transition-colors hover:bg-gray-200 hover:text-primary dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              aria-label="Change language"
              :aria-expanded="localeOpen"
              @click.stop="toggleLocale"
          >
            <span>{{ localeFlags[locale] ?? '' }}</span>
            <span>{{ localeLabels[locale] ?? locale }}</span>
            <span
                class="text-xs transition-transform"
                :class="{ 'rotate-180': localeOpen }"
            >
              ▼
            </span>
          </button>

          <div
              v-if="localeOpen"
              class="absolute right-0 top-full z-50 mt-2 w-36 rounded-lg border border-gray-300 bg-white p-1.5 shadow-lg dark:border-gray-700 dark:bg-gray-900"
          >
            <button
                v-for="availableLocale in locales"
                :key="availableLocale.code"
                type="button"
                class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-950 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                :class="{
                'font-semibold text-primary': availableLocale.code === locale
              }"
                @click="changeLocale(availableLocale.code)"
            >
              <span>{{ localeFlags[availableLocale.code] ?? '' }}</span>
              <span>
                {{ localeLabels[availableLocale.code] ?? availableLocale.code }}
              </span>
            </button>
          </div>
        </div>

        <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-950 transition-colors hover:bg-gray-200 hover:text-primary dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            aria-label="Toggle theme between light and dark mode"
            @click="toggleTheme"
        >
          <svg
              v-if="colorMode.value === 'dark'"
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
          >
            <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm0 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm9-4a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM5 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm12.36-5.64a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1-1.41 0ZM6.64 17.36a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1-1.42 0ZM17.36 18.36a1 1 0 0 1 0-1.41l-.71-.71a1 1 0 1 1 1.41 1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0ZM6.64 6.64a1 1 0 0 1 0-1.41 1 1 0 0 1 1.41 0l.71.71a1 1 0 1 1-1.41 1.41l-.71-.71a1 1 0 0 1-.71-.29Z" />
          </svg>

          <svg
              v-else
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
          >
            <path d="M21.64 13.03A9 9 0 0 1 10.97 2.36 9 9 0 1 0 21.64 13.03Z" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>