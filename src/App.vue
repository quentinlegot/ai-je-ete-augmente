<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import type { Configuration } from '@/components/SharedConfiguration'
import { SharedConfiguration } from '@/components/SharedConfiguration'

export default {
  components: { RouterLink, RouterView },
  data() {
    return {
      configuration: SharedConfiguration as Configuration
    }
  },
  mounted() {
    const retrievedConfiguration = localStorage.getItem('configuration')
    if (retrievedConfiguration) {
      const parsedConfiguration = JSON.parse(retrievedConfiguration)
      this.configuration.currency = parsedConfiguration.currency
      this.configuration.imposition = parsedConfiguration.imposition
      this.configuration.incomeMode = parsedConfiguration.incomeMode
    }
  },
  watch: {
    configuration: {
      handler(configuration: Configuration): void {
        localStorage.setItem('configuration', JSON.stringify(configuration))
      },
      deep: true
    }
  }
}
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
      <RouterLink to="/" class="block p-5 hover:bg-red-600"> 🧮 Calculer </RouterLink>
      <RouterLink to="/configure" class="block p-5 hover:bg-red-600"> ⚙️ Configurer </RouterLink>
      <RouterLink to="/how" class="block p-5 hover:bg-red-600"> 🔧 Comment ça marche ? </RouterLink>
      <RouterLink to="/about" class="block p-5 hover:bg-red-600"> ℹ️ A propos </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
