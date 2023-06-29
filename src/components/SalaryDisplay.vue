<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { AdjustedSalary } from '@/components/AdjustedSalary'
import type { Configuration } from '@/components/SharedConfiguration'
import { SharedConfiguration } from '@/components/SharedConfiguration'

export default defineComponent({
  props: {
    salary: {
      type: Object as PropType<AdjustedSalary>,
      required: true
    }
  },
  emits: ['removeSalary'],
  data() {
    return {
      configuration: SharedConfiguration as Configuration
    }
  },
  computed: {
    salaryChange(): string {
      return (
        (this.salary.salaryChange > 0 ? '+' : '') + this.salary.salaryChange.toPrecision(3) + '%'
      )
    },
    salaryChangeAdjusted(): string {
      return (
        (this.salary.salaryChangeAdjusted > 0 ? '+' : '') +
        this.salary.salaryChangeAdjusted.toPrecision(3) +
        '%'
      )
    },
    salaryRecurrence(): string {
      switch (this.configuration.incomeMode) {
        case 'gross-annual':
          return 'brut/an'
        case 'net-monthly':
          return 'net/mois'
        default:
          return ''
      }
    },
    effectiveSalaryRecurrence(): string {
      switch (this.configuration.incomeMode) {
        case 'gross-annual':
          return 'net/mois'
        case 'net-monthly':
          return 'net/mois'
        default:
          return ''
      }
    }
  },
  methods: {
    removeSalary(salary: AdjustedSalary): void {
      if (salary.originalSalary !== null) {
        this.$emit('removeSalary', salary.originalSalary.key)
      }
    }
  }
})
</script>

<template>
  <li class="flex-start group/salary flex" v-if="salary.originalSalary !== null">
    <div
      class="-ml-[16px] h-[30px] w-[30px] shrink-0 rounded-full border-2 border-red-500 bg-white text-center align-middle group-hover/salary:bg-red-500"
    >
      <span v-if="salary.state === 'up'"> 📈 </span>
      <span v-else-if="salary.state === 'down'"> 📉 </span>
      <span v-else> 📅 </span>
    </div>
    <div class="relative mb-5 block max-w-md grow p-2">
      <p class="text-sm text-neutral-500">
        {{ salary.originalSalary.date }}
      </p>
      <h3 class="m-1 text-xl font-semibold">
        {{ salary.originalSalary.income }}{{ configuration.currency }}
        <small class="text-sm text-neutral-800"> {{ salaryRecurrence }} </small>
      </h3>
      <p v-if="salary.salaryChange !== 0" class="text-sm text-neutral-500">
        augmentation annoncé :
        <span class="text-red-500">{{ salaryChange }}</span>
      </p>
      <p v-if="salary.salaryChange !== 0" class="text-sm text-neutral-500">
        changement réel :
        <span class="font-bold text-red-500">{{ salaryChangeAdjusted }}</span>
      </p>
      <p v-else class="text-sm text-neutral-500">Salaire de référence</p>
      <button
        v-on:click="removeSalary(salary)"
        class="invisible rounded border border-yellow-300 p-1 text-sm hover:bg-yellow-300 hover:text-white group-hover/salary:visible"
      >
        Supprimer
      </button>
      <div
        v-if="configuration.incomeMode === 'gross-annual'"
        class="md:auto hidden whitespace-nowrap md:absolute md:left-full md:top-5 md:z-10 md:-ml-5 md:rounded-r-3xl md:border md:bg-white md:p-3 md:shadow-md md:shadow-red-500 md:group-hover/salary:block"
      >
        <h4 class="m-1 text-lg font-medium">
          Soit {{ salary.income.toPrecision(5) }}{{ configuration.currency }}
          <small class="text-sm text-neutral-800"> {{ effectiveSalaryRecurrence }} </small>
        </h4>
        <p class="text-xs text-slate-500">
          {{ salary.originalSalary.income }} * (1 - imposition / 100) / 12
        </p>
        <p class="text-xs text-slate-500">
          avec une imposition
          <RouterLink to="/configure" class="underline">configurée</RouterLink> à
          {{ configuration.imposition }}%
        </p>
      </div>
    </div>
  </li>
</template>
