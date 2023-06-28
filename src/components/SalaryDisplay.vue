<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { AdjustedSalary } from '@/components/AdjustedSalary'

export default defineComponent({
  props: {
    salary: {
      type: Object as PropType<AdjustedSalary>,
      required: true
    }
  },
  emits: ['removeSalary'],
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
    }
  },
  methods: {
    removeSalary(salary: AdjustedSalary): void {
      this.$emit('removeSalary', salary.key)
    }
  }
})
</script>

<template>
  <li class="flex-start group/salary flex">
    <div
      class="-ml-[16px] h-[30px] w-[30px] shrink-0 rounded-full border-2 border-red-500 bg-white text-center align-middle group-hover/salary:bg-red-500"
    >
      <span v-if="salary.state === 'up'"> 📈 </span>
      <span v-else-if="salary.state === 'down'"> 📉 </span>
      <span v-else> 📅 </span>
    </div>
    <div class="mb-5 block max-w-md grow p-2">
      <p class="text-sm text-neutral-500">
        {{ salary.date }}
      </p>
      <h3 class="m-1 text-xl font-semibold">{{ salary.income }}€</h3>
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
    </div>
  </li>
</template>
