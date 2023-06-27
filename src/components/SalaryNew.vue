<script lang="ts">
import {defineComponent} from "vue";

const defaultDate = '2023-06-25'
const defaultIncome = 0

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
      newDate: defaultDate as string,
      newIncome: defaultIncome as number,
    }
  },
  methods: {
    addSalary(): void {
      this.$emit('addSalary', {
        date: this.newDate,
        income: this.newIncome,
        key: this.newKey
      })
      this.newDate = defaultDate
      this.newIncome = defaultIncome
    }
  }
})
</script>

<template>
  <h2 class="text-slate-800 mt-5">
    Ajouter un salaire
  </h2>
  <form v-on:submit.prevent="addSalary()" class="text-xs">
    <label for="newDate" class="block mt-3">
      Date du changement de salaire
    </label>
    <input type="date" v-model="newDate" id="newDate" class="block w-full" />
    <label for="newDate" class="block mt-3">
      Montant du nouveau salaire
    </label>
    <input type="number" min="0" v-model="newIncome" id="newIncome" class="block w-full" />
    <button type="submit" class="mt-3 p-2 border rounded border-green-800 hover:bg-green-800 hover:text-white">
      Ajouter
    </button>
  </form>
</template>
