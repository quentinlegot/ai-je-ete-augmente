<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { AdjustedSalary } from '@/components/AdjustedSalary'
import type { Configuration } from '@/components/SharedConfiguration'
import { SharedConfiguration } from '@/components/SharedConfiguration'

export default defineComponent({
  props: {
    adjustedSalaries: {
      type: Array as PropType<AdjustedSalary[]>,
      required: true
    }
  },
  data() {
    return {
      configuration: SharedConfiguration as Configuration
    }
  },
  computed: {
    incomeFinal(): number {
      if (this.adjustedSalaries.length < 2) {
        return 0
      }

      return this.adjustedSalaries[this.adjustedSalaries.length - 1].income
    },
    incomeFinalAdjusted(): number {
      if (this.adjustedSalaries.length < 2) {
        return 0
      }

      return this.adjustedSalaries[this.adjustedSalaries.length - 1].incomeAdjusted
    },
    incomeReference(): number {
      if (this.adjustedSalaries.length === 0) {
        return 0
      }

      return this.adjustedSalaries[0].income
    },
    numberOfSalaryChanges(): number {
      return this.adjustedSalaries.filter(
        (adjustedSalary: AdjustedSalary): boolean => adjustedSalary.originalSalary !== null
      ).length
    },
    overallChange(): number {
      if (this.adjustedSalaries.length < 2) {
        return 0
      }

      return (
        (this.adjustedSalaries[this.adjustedSalaries.length - 1].income /
          this.adjustedSalaries[0].income -
          1) *
        100
      )
    },
    overallChangeAdjusted(): number {
      if (this.adjustedSalaries.length < 2) {
        return 0
      }

      return (
        (this.adjustedSalaries[this.adjustedSalaries.length - 1].incomeAdjusted /
          this.adjustedSalaries[0].incomeAdjusted -
          1) *
        100
      )
    },
    timeElapsed(): string {
      if (this.adjustedSalaries.length <= 18) {
        return this.adjustedSalaries.length + this.$t('salary.summary.time.months')
      }

      const monthModulo = this.adjustedSalaries.length % 12
      const numberOfYears = this.adjustedSalaries.length / 12

      if (monthModulo === 0) {
        return this.$t('salary.summary.time.years', { number: numberOfYears })
      }

      return monthModulo > 5
        ? this.$t('salary.summary.time.nearly', { number: Math.round(numberOfYears) })
        : this.$t('salary.summary.time.more', { number: Math.round(numberOfYears) })
    }
  }
})
</script>

<template>
  <div class="flex flex-col items-center p-5">
    <template v-if="numberOfSalaryChanges > 1">
      <p
        class="p-3 text-lg"
        v-html="
          $t('salary.summary.change.multi.overall', {
            baseIncome: incomeReference.toPrecision(5),
            currency: configuration.currency,
            finalIncome: incomeFinal.toPrecision(5),
            finalIncomeAdjusted: incomeFinalAdjusted.toPrecision(5),
            period: adjustedSalaries.length
          })
        "
      ></p>
      <p class="p-3 text-lg">
        <span
          v-html="
            $t(
              'salary.summary.change.multi.announced',
              {
                change: (overallChange < 0 ? overallChange * -1 : overallChange).toPrecision(3),
                numberOfChanges: numberOfSalaryChanges - 1,
                period: timeElapsed
              },
              overallChange
            )
          "
        ></span>
        <span
          v-html="
            $t(
              'salary.summary.change.multi.adjusted',
              {
                changeAdjusted: (overallChangeAdjusted < 0
                  ? overallChangeAdjusted * -1
                  : overallChangeAdjusted
                ).toPrecision(3)
              },
              overallChangeAdjusted
            )
          "
        ></span>
      </p>
    </template>
    <template v-else-if="numberOfSalaryChanges === 1 && adjustedSalaries.length > 1">
      <p
        class="p-3 text-lg"
        v-html="
          $t(
            'salary.summary.change.one',
            {
              changeAdjusted: (overallChangeAdjusted > 0
                ? overallChangeAdjusted
                : overallChangeAdjusted * -1
              ).toPrecision(3),
              period: timeElapsed
            },
            overallChangeAdjusted
          )
        "
      ></p>
      <p class="p-3 text-sm" v-html="$t('salary.summary.change.helper')"></p>
    </template>
    <template v-else-if="numberOfSalaryChanges === 0">
      <p class="p-3 text-sm">
        {{ $t('salary.summary.change.none') }}
      </p>
    </template>
    <p class="flex self-end p-5 text-xs underline">
      <RouterLink to="/how">{{ $t('salary.summary.helper') }}</RouterLink>
    </p>
  </div>
</template>
