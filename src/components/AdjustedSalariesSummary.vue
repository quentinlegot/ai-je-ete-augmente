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
        return this.adjustedSalaries.length + ' mois'
      }

      const monthModulo = this.adjustedSalaries.length % 12
      const numberOfYears = this.adjustedSalaries.length / 12

      if (monthModulo === 0) {
        return numberOfYears + ' ans'
      }

      return (
        (monthModulo > 5 ? ' presque ' : ' un peu plus de ') + Math.round(numberOfYears) + ' ans'
      )
    }
  }
})
</script>

<template>
  <div class="flex flex-col items-center p-5">
    <p v-if="numberOfSalaryChanges > 1" class="inline-block p-5 text-lg">
      De
      <span class="font-semibold"
        >{{ incomeReference.toPrecision(5) }}{{ configuration.currency }}</span
      >
      à <span class="line-through">{{ incomeFinal.toPrecision(5) }}</span>
      <span class="font-semibold"
        >{{ incomeFinalAdjusted.toPrecision(5) }}{{ configuration.currency }}</span
      >
      net/mois sur {{ adjustedSalaries.length }} mois.
    </p>
    <p v-if="numberOfSalaryChanges > 1" class="inline-block p-5 text-lg">
      En {{ timeElapsed }}, le salaire à été modifié {{ numberOfSalaryChanges - 1 }} fois, pour une
      {{ overallChange > 0 ? 'augmentation' : 'diminution ' }} totale annoncée de
      <span class="text-red-500">
        {{ (overallChange > 0 ? overallChange : overallChange * -1).toPrecision(3) }}%</span
      >. Cela correspond en réalité à une
      {{ overallChangeAdjusted > 0 ? 'augmentation' : 'diminution' }} de
      <span class="font-bold text-red-500">
        {{
          (overallChangeAdjusted > 0
            ? overallChangeAdjusted
            : overallChangeAdjusted * -1
          ).toPrecision(3)
        }}%</span
      >.
    </p>
    <p
      v-else-if="numberOfSalaryChanges === 1 && adjustedSalaries.length > 1"
      class="inline-block p-5 text-lg"
    >
      En {{ timeElapsed }}, votre salaire à {{ overallChangeAdjusted > 0 ? 'gagné' : 'perdu' }}
      <span class="font-bold text-red-500">
        {{
          (overallChangeAdjusted > 0
            ? overallChangeAdjusted
            : overallChangeAdjusted * -1
          ).toPrecision(3)
        }}%</span
      >
      de sa valeur.
      <span class="text-sm">
        Ajoutez un second salaire pour voir la différence ajustée par l'inflation.
      </span>
    </p>
    <p v-else-if="numberOfSalaryChanges === 0" class="inline-block p-5 text-sm">
      Commencez par saisir un premier salaire pour voir son évolution au cours du temps.
    </p>
    <p class="flex self-end p-5 text-xs underline">
      <RouterLink to="/how">Comment ça marche ?</RouterLink>
    </p>
  </div>
</template>
