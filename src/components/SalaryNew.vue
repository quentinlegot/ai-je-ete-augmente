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
  <form v-on:submit.prevent="addSalary()">
    <input type="date" v-model="newDate" />
    <input type="number" min="0" v-model="newIncome" />
    <button type="submit">Ajouter le changement de salaire</button>
  </form>
</template>
