<script setup lang="ts">
const {locale, locales, setLocale} = useI18n()

const navItems = [
  {label: 'nav.home', path: '/'},
  {label: 'nav.projects', path: '/projects'},
  {label: 'nav.blog', path: '/blog'},
  {label: 'nav.contact', path: '/#contact'}
]

const localeLabels: Record<string, string> = {
  fr: '🇫🇷 Français',
  en: '🇺🇸 English'
}

const changeLocale = async (localeCode: string) => {
  await setLocale(localeCode)
}

const toggleTheme = () => {
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <nav class="w-full border-b border-gray-950 dark:border-gray-50">
    <div
        class="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-3 md:flex-row md:justify-between"
    >
      <NuxtLink to="/" class="flex items-center gap-3">
        <img
            src="https://cdn.farmeurimmo.fr/img/logo.jpg"
            alt="Farmeurimmo"
            class="h-8 w-8 rounded-full"
            width="32"
            height="32"
        >
        <span class="text-2xl font-bold hover:text-accent">
          Farmeurimmo
        </span>
      </NuxtLink>

      <div class="flex items-center gap-5">
        <NuxtLink
            v-for="item in navItems"
            :key="item.label"
            :to="item.path"
            class="text-base font-semibold transition-colors hover:text-accent"
        >
          {{ $t(item.label) }}
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2">
        <div class="dropdown dropdown-end">
          <button
              tabindex="0"
              class="btn btn-soft btn-neutral flex items-center gap-2 dark:text-white"
              aria-label="Locale Switcher"
          >
            {{ localeLabels[locale] ?? locale }}
            <span class="font-bold">⌄</span>
          </button>

          <ul
              tabindex="0"
              class="menu dropdown-content z-50 mt-2 w-36 rounded-box border border-gray-700 bg-white p-2 shadow dark:border-gray-300 dark:bg-gray-800"
          >
            <li v-for="availableLocale in locales" :key="availableLocale.code">
              <button
                  class="w-full text-left text-black dark:text-white"
                  :class="{ 'font-bold': availableLocale.code === locale }"
                  @click="changeLocale(availableLocale.code)"
              >
                {{ localeLabels[availableLocale.code] ?? availableLocale.code }}
              </button>
            </li>
          </ul>
        </div>

        <button
            class="btn btn-soft btn-neutral"
            aria-label="Toggle theme between light and dark mode"
            @click="toggleTheme"
        >
          <svg
              class="h-6 w-6 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
          >
            <path
                d="M5.64 17l-.71.71a1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0l.71-.71A1 1 0 0 0 5.64 17ZM5 12a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1Zm7-7a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1ZM5.64 7.05a1 1 0 0 0 .7.29 1 1 0 0 0 .71-.29 1 1 0 0 0 0-1.41l-.71-.71a1 1 0 0 0-1.41 1.41l.71.71Zm12 .29a1 1 0 0 0 .7-.29l.71-.71a1 1 0 1 0-1.41-1.41l-.71.71a1 1 0 0 0 0 1.41 1 1 0 0 0 .71.29ZM21 11h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2Zm-9 8a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1Zm6.36-2a1 1 0 0 0-1.36 1.36l.71.71a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41l-.71-.71ZM12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm0 9A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5Z"/>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>