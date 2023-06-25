<script lang="ts">
import type { Salary } from '@/components/Salary'
import SalaryDisplay from '@/components/SalaryDisplay.vue'
import SalaryNew from '@/components/SalaryNew.vue'

export default {
  components: { SalaryDisplay, SalaryNew },
  data() {
    return {
      salaries: [] as Salary[]
    }
  },
  methods: {
    addSalary(newSalary: Salary) {
      this.salaries.push(newSalary)
      this.salaries.sort((s1: Salary, s2: Salary): number => (s1.date < s2.date ? -1 : 1))
    },
    removeSalary(oldSalaryKey: number) {
      this.salaries = this.salaries.filter((s: Salary): boolean => s.key !== oldSalaryKey)
    }
  }
}
</script>

<template>
  <main>
    Liste des changements de salaires
    <ul>
      <li v-for="(salary, index) in salaries" v-bind:key="index">
        <salary-display v-bind:salary="salary" v-on:removeSalary="removeSalary" />
      </li>
      <li>
        <salary-new v-on:addSalary="addSalary" />
      </li>
    </ul>
  </main>
</template>
