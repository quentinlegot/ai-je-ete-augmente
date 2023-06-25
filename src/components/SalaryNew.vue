<script lang="ts">
const defaultDate = '2023-06-25'
const defaultIncome = 0

export default {
  emits: ['addSalary'],
  data() {
    return {
      newDate: defaultDate as string,
      newIncome: defaultIncome as number,
      newKey: 0
    }
  },
  methods: {
    addSalary() {
      this.$emit('addSalary', {
        date: this.newDate,
        income: this.newIncome,
        key: this.newKey
      })
      this.newDate = defaultDate
      this.newIncome = defaultIncome
      this.newKey++
    }
  }
}
</script>

<template>
  <form v-on:submit.prevent="addSalary()">
    <input type="date" v-model="newDate" />
    <input type="number" min="0" v-model="newIncome" />
    <button type="submit">Ajouter le changement de salaire</button>
  </form>
</template>
