<script lang="ts">
import type { Salary } from '@/components/Salary'
import SalaryDisplay from '@/components/SalaryDisplay.vue'
import SalaryNew from '@/components/SalaryNew.vue'
import {defineComponent} from "vue";

export default defineComponent({
  components: { SalaryDisplay, SalaryNew },
  data() {
    return {
      salaries: [] as Salary[]
    }
  },
  computed: {
    nextKey(): number {
      if (this.salaries.length == 0) {
        return 1
      }
      return Math.max(...this.salaries.map((s: Salary): number => s.key.valueOf())) + 1
    }
  },
  methods: {
    addSalary(newSalary: Salary): void {
      this.salaries.push(newSalary)
      this.salaries.sort((s1: Salary, s2: Salary): number => (s1.date < s2.date ? -1 : 1))
    },
    removeSalary(oldSalaryKey: number): void {
      this.salaries = this.salaries.filter((s: Salary): boolean => s.key !== oldSalaryKey)
    }
  },
  mounted() {
    let retrievedSalaries = localStorage.getItem('salaries')
    if (retrievedSalaries) {
      this.salaries = JSON.parse(retrievedSalaries)
    }
  },
  watch: {
    salaries: {
      handler(newSalaries: Salary[]): void {
        localStorage.setItem('salaries', JSON.stringify(newSalaries))
      },
      deep: true
    }
  }
})
</script>

<template>
  <main>
    Liste des changements de salaires ({{ nextKey }})
    <ul>
      <li v-for="(salary, index) in salaries" v-bind:key="index">
        <salary-display v-bind:salary="salary" v-on:removeSalary="removeSalary" />
      </li>
      <li>
        <salary-new v-on:addSalary="addSalary" v-bind:new-key="nextKey"/>
      </li>
    </ul>
  </main>
</template>
