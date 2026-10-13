<script setup lang="ts">

</script>

<template>
  <div class="relative min-h-screen">
    <ParticleBackground />

    <Header />

    <main class="relative z-10 min-h-screen flex flex-col items-center justify-center">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<style scoped>

</style>