<script setup lang="ts">

</script>

<template>
  <footer class="relative z-20 w-full border-b border-gray-300">
    <div
        class="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-4 md:flex-row md:justify-between"
    >
      <div class="flex flex-col items-center gap-2 md:flex-row">
        <span class="text-sm text-gray-500 dark:text-gray-400">
          &copy; {{ new Date().getFullYear() }} Farmeurimmo. {{ $t('footer.rights') }}
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>