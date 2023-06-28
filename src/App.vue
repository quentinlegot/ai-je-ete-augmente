<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header
    class="border-b border-b-white bg-red-500 text-white md:flex md:flex-row md:justify-between"
  >
    <h1 class="contents">
      <RouterLink
        to="/"
        class="block border-b border-b-white p-5 font-medium uppercase md:flex-none md:border-none"
      >
        💸 Ai-je été augmenté ?
      </RouterLink>
    </h1>
    <nav class="divide-y divide-dashed md:flex md:grow md:flex-row md:justify-end md:divide-none">
      <RouterLink to="/" class="block p-5 hover:bg-red-600"> Calculer </RouterLink>
      <RouterLink to="/about" class="block p-5 hover:bg-red-600"> A propos </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
