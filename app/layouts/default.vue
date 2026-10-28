<script setup lang="ts">
useHead({
  titleTemplate: '%s | Farmeurimmo',
  meta: [
    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    {name: 'author', content: 'Farmeurimmo'},
  ],
  link: [
    {rel: 'icon', type: 'image/png', href: 'https://cdn.farmeurimmo.fr/img/logo.png'},
  ]
})
</script>

<template>
  <div class="relative min-h-screen">
    <ParticleBackground/>

    <Header/>

    <main class="relative z-10 min-h-screen flex flex-col items-center justify-center">
      <slot/>
    </main>

    <Footer/>
  </div>
</template>

<style scoped>

</style>