<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header
    class="bg-red-500 text-white border-b border-b-white md:flex md:flex-row md:justify-between"
  >
    <h1 class="contents">
      <RouterLink
        to="/"
        class="block p-5 font-medium uppercase border-b border-b-white md:border-none md:flex-none"
      >
        💸 Ai-je été augmenté ?
      </RouterLink>
    </h1>
    <nav class="md:grow md:flex md:flex-row md:justify-end divide-y divide-dashed md:divide-none">
      <RouterLink to="/" class="block p-5 hover:bg-red-600"> Calculer </RouterLink>
      <RouterLink to="/about" class="block p-5 hover:bg-red-600"> A propos </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
