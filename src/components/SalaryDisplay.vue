<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Salary } from '@/components/Salary'

export default defineComponent({
  props: {
    salary: {
      type: Object as PropType<Salary>,
      required: true
    }
  },
  emits: ['removeSalary'],
  methods: {
    removeSalary(salary: Salary) {
      this.$emit('removeSalary', salary.key)
    }
  }
})
</script>

<template>
  📅 Le {{ salary.date }}, le salaire à changé pour {{ salary.income }}
  <button v-on:click="removeSalary(salary)">Supprimer</button>
</template>
