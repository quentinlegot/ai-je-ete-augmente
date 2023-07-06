<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line as ChartLine } from 'vue-chartjs'
import type { AdjustedSalary } from '@/components/AdjustedSalary'
import type { Configuration } from '@/components/SharedConfiguration'
import { SharedConfiguration } from '@/components/SharedConfiguration'

ChartJS.register(
  CategoryScale,
  Filler,
  LinearScale,
  LineElement,
  Legend,
  PointElement,
  Title,
  Tooltip
)

export default defineComponent({
  components: { ChartLine },
  props: {
    adjustedSalaries: {
      type: Array as PropType<AdjustedSalary[]>,
      required: true
    }
  },
  data() {
    return {
      configuration: SharedConfiguration as Configuration,
      today: (new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1 + '').padStart(2, '0')) as string
    }
  },
  computed: {
    chartData() {
      const labels = [] as string[]
      const incomes = [] as number[]
      const incomesAdjusted = [] as number[]
      this.adjustedSalaries.forEach((salary: AdjustedSalary): void => {
        labels.push(salary.date)
        incomes.push(salary.income)
        incomesAdjusted.push(salary.incomeAdjusted)
      })
      return {
        labels: labels,
        datasets: [
          {
            label: 'Salaires',
            data: incomes,
            backgroundColor: 'rgba(68,68,239,0.2)',
            borderColor: 'rgb(68,68,239)',
            pointStyle: false
          },
          {
            label: 'Salaires ajustés',
            data: incomesAdjusted,
            cubicInterpolationMode: 'monotone',
            fill: '-1',
            backgroundColor: 'rgb(239, 68, 68, 0.2)',
            borderColor: 'rgb(239, 68, 68)',
            pointStyle: false
          }
        ]
      } as any
    },
    chartOptions() {
      const ticks = [] as (string | null)[]
      this.adjustedSalaries.forEach((salary: AdjustedSalary): void => {
        ticks.push(salary.originalSalary !== null ? salary.originalSalary.date : '')
      })

      return {
        responsive: true,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Mois'
            },
            ticks: {
              callback: function (val: number, index: number) {
                return ticks[index]
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Salaire en ' + this.configuration.currency
            },
            position: 'right'
          }
        },
        plugins: {
          filler: {
            propagate: false
          }
        }
      } as any
    }
  }
})
</script>

<template>
  <ChartLine
    v-if="adjustedSalaries.length > 0"
    :data="chartData"
    :options="chartOptions"
    class="sticky top-0"
  />
</template>
