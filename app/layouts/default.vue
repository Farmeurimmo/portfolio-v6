<script setup lang="ts">

</script>

<template>
  <div class="relative min-h-screen">
    <ParticleBackground />

    <Header />

    <main class="relative z-10">
      <slot />
    </main>
  </div>
</template>

<style scoped>

</style>