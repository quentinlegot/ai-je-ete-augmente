<script lang="ts">
import type { Salary } from '@/components/Salary'
import type { AdjustedSalary } from '@/components/AdjustedSalary'
import InflationChart from '@/components/InflationChart.vue'
import SalaryDisplay from '@/components/SalaryDisplay.vue'
import SalaryNew from '@/components/SalaryNew.vue'
import { defineComponent } from 'vue'
import {
  AdjustedSalaryCreateFiller,
  AdjustedSalaryCreateFirst,
  AdjustedSalaryCreateFromPrevious
} from '@/components/AdjustedSalary'

export default defineComponent({
  components: { InflationChart, SalaryDisplay, SalaryNew },
  data() {
    return {
      salaries: [] as Salary[]
    }
  },
  computed: {
    nextKey(): number {
      if (this.salaries.length === 0) {
        return 1
      }
      return Math.max(...this.salaries.map((s: Salary): number => s.key.valueOf())) + 1
    },
    adjustedSalaries(): AdjustedSalary[] {
      let clonedSalaries = [] as Salary[]
      this.salaries.forEach((salary: Salary) => clonedSalaries.push(salary))
      if (clonedSalaries.length == 0) {
        return []
      }

      const toMonth = new Date().getMonth() + 1
      const toYear = new Date().getFullYear()
      const [sYear, sMonth] = clonedSalaries[0].date.split('-')
      let month = parseInt(sMonth)
      let year = parseInt(sYear)
      let cumulatedInflation = 1
      let lastSalary: AdjustedSalary

      const adjustedSalaries = [] as AdjustedSalary[]
      adjustedSalaries.push((lastSalary = AdjustedSalaryCreateFirst(clonedSalaries.shift()!)))

      while (year < toYear || month <= toMonth || clonedSalaries.length > 0) {
        let date = year + '-' + ('' + month).padStart(2, '0')
        let inflation = 1.002
        cumulatedInflation *= inflation

        if (clonedSalaries.length > 0 && date == clonedSalaries[0].date) {
          adjustedSalaries.push(
            (lastSalary = AdjustedSalaryCreateFromPrevious(
              clonedSalaries.shift()!,
              lastSalary,
              cumulatedInflation
            ))
          )
        } else {
          adjustedSalaries.push(AdjustedSalaryCreateFiller(date, lastSalary, cumulatedInflation))
        }

        month++
        if (month > 12) {
          month = 1
          year++
        }
      }

      return adjustedSalaries
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
  <main class="p-5 md:flex md:flex-row">
    <section class="inline-block shrink-0">
      <div class="contents" :class="salaries.length == 0 ? 'invisible' : ''">
        <h2 class="mb-5 text-slate-800">Historique des salaires ({{ salaries.length }})</h2>
        <ol class="border-l-2 border-red-500">
          <salary-display
            v-for="(adjustedSalary, index) in adjustedSalaries"
            v-bind:key="index"
            v-bind:salary="adjustedSalary"
            v-on:removeSalary="removeSalary"
          />
        </ol>
      </div>
      <salary-new v-on:addSalary="addSalary" v-bind:new-key="nextKey" />
    </section>
    <section class="grow">
      <inflation-chart :adjusted-salaries="adjustedSalaries" />
    </section>
  </main>
</template>
