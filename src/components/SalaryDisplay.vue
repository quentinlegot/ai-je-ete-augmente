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
  <li class="flex flex-start group/salary">
    <div
      class="shrink-0 -ml-[16px] h-[30px] w-[30px] text-center align-middle rounded-full border-2 border-red-500 bg-white group-hover/salary:bg-red-500"
    >
      <span v-if="salary.state === 'up'"> 📈 </span>
      <span v-else-if="salary.state === 'down'"> 📉 </span>
      <span v-else> 📅 </span>
    </div>
    <div class="grow block max-w-md p-2 mb-5">
      <p class="text-sm text-neutral-500">
        {{ salary.date }}
      </p>
      <h3 class="text-xl font-semibold m-1">{{ salary.income }}€</h3>
      <p v-if="salary.salaryChange !== 0" class="text-sm text-neutral-500">
        augmentation annoncé :
        <span class="text-red-500">{{ salaryChange }}</span>
      </p>
      <p v-if="salary.salaryChange !== 0" class="text-sm text-neutral-500">
        changement réel :
        <span class="text-red-500 font-bold">{{ salaryChangeAdjusted }}</span>
      </p>
      <p v-else class="text-sm text-neutral-500">Salaire de référence</p>
      <button
        v-on:click="removeSalary(salary)"
        class="p-1 text-sm border rounded border-yellow-300 hover:bg-yellow-300 hover:text-white invisible group-hover/salary:visible"
      >
        Supprimer
      </button>
    </div>
  </li>
</template>
