<script lang="ts">
import { defineComponent } from 'vue'
import type { Configuration } from '@/components/SharedConfiguration'
import { SharedConfiguration } from '@/components/SharedConfiguration'

export default defineComponent({
  emits: ['addSalary'],
  props: {
    newKey: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      configuration: SharedConfiguration as Configuration,
      newDate: null as string | null,
      newIncome: null as number | null
    }
  },
  computed: {
    placeholderSalary(): string {
      switch (this.configuration.incomeMode) {
        case 'gross-annual':
          return 'annuel brut en ' + this.configuration.currency
        case 'net-monthly':
          return 'mensuel net en ' + this.configuration.currency
        default:
          return ''
      }
    }
  },
  methods: {
    addSalary(): void {
      if (this.newDate === null || this.newIncome == null) {
        return
      }
      this.$emit('addSalary', {
        date: this.newDate,
        income: this.newIncome,
        key: this.newKey
      })
      this.newDate = null
      this.newIncome = null
    }
  }
})
</script>

<template>
  <h2 class="mt-5 text-slate-800">Ajouter un salaire</h2>
  <form v-on:submit.prevent="addSalary()" class="text-xs">
    <label for="newDate" class="mt-3 block"> Date du changement de salaire </label>
    <input
      type="month"
      min="2011-01"
      required
      v-model="newDate"
      id="newDate"
      class="block w-full"
    />
    <label for="newDate" class="mt-3 block"> Montant du nouveau salaire </label>
    <input
      type="number"
      min="0"
      required
      :placeholder="placeholderSalary"
      v-model="newIncome"
      id="newIncome"
      class="block w-full"
    />
    <button
      type="submit"
      class="mt-3 rounded border border-green-800 p-2 hover:bg-green-800 hover:text-white"
    >
      Ajouter
    </button>
  </form>
</template>
