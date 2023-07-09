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
import type { InflationRates } from '@/components/InflationRates'
import AdjustedSalariesSummary from '@/components/AdjustedSalariesSummary.vue'
import type { Configuration } from '@/components/SharedConfiguration'
import { SharedConfiguration } from '@/components/SharedConfiguration'

export default defineComponent({
  components: { AdjustedSalariesSummary, InflationChart, SalaryDisplay, SalaryNew },
  data() {
    return {
      configuration: SharedConfiguration as Configuration,
      inflationRates: {} as InflationRates,
      salaries: [] as Salary[],
      missingInflationRates: [] as Array<string>
    }
  },
  async created() {
    this.inflationRates = await import(`../assets/inflations/${this.configuration.country}.json`)
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
      let cumulatedInflationMultiplier = 1
      let lastSalary: AdjustedSalary

      const adjustedSalaries = [] as AdjustedSalary[]
      adjustedSalaries.push((lastSalary = AdjustedSalaryCreateFirst(clonedSalaries.shift()!)))
      month++
      if (month > 12) {
        month = 1
        year++
      }

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.missingInflationRates = []
      while (year < toYear || month <= toMonth || clonedSalaries.length > 0) {
        let sMonth = ('' + month).padStart(2, '0')
        let sYear = '' + year
        let date = sYear + '-' + sMonth
        if (
          !(this.configuration.country in this.inflationRates) ||
          !(date in this.inflationRates[this.configuration.country])
        ) {
          if (clonedSalaries.length === 0) {
            break
          }
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.missingInflationRates.push(date)
        }
        let inflationRate =
          this.configuration.country in this.inflationRates &&
          date in this.inflationRates[this.configuration.country]
            ? this.inflationRates[this.configuration.country][date]
            : 0
        cumulatedInflationMultiplier *= 1 + inflationRate / 100

        if (clonedSalaries.length > 0 && date == clonedSalaries[0].date) {
          adjustedSalaries.push(
            (lastSalary = AdjustedSalaryCreateFromPrevious(
              clonedSalaries.shift()!,
              lastSalary,
              cumulatedInflationMultiplier
            ))
          )
        } else {
          adjustedSalaries.push(
            AdjustedSalaryCreateFiller(date, lastSalary, cumulatedInflationMultiplier)
          )
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
      if (
        this.salaries.filter((salary: Salary): boolean => salary.date === newSalary.date).length > 0
      ) {
        return
      }

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
  <main
    class="p-5 md:flex md:flex-row"
    :class="salaries.length === 0 ? 'mx-auto max-w-screen-lg' : ''"
  >
    <section class="inline-block shrink-0">
      <div class="contents" :class="salaries.length == 0 ? 'hidden' : ''">
        <h2 class="my-5 text-lg text-slate-800">
          {{ $t('salary.history.title', { number: salaries.length }) }}
        </h2>
        <ol class="mb-5 border-l-2 border-red-500">
          <salary-display
            v-for="(adjustedSalary, index) in adjustedSalaries"
            v-bind:key="index"
            v-bind:salary="adjustedSalary"
            v-on:removeSalary="removeSalary"
          />
        </ol>
      </div>
      <salary-new v-on:addSalary="addSalary" v-bind:salaries="salaries" v-bind:new-key="nextKey" />
    </section>
    <section class="grow">
      <div class="sticky top-0">
        <inflation-chart :adjusted-salaries="adjustedSalaries" />
        <p v-if="missingInflationRates.length > 0" class="m-5 p-2 text-sm italic">
          {{
            $t(
              'salary.warning',
              {
                dates: missingInflationRates.join(', '),
                number: missingInflationRates.length
              },
              missingInflationRates.length
            )
          }}
        </p>
        <adjusted-salaries-summary :adjusted-salaries="adjustedSalaries" />
      </div>
    </section>
  </main>
</template>
