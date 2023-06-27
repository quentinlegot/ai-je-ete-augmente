<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Salary } from '@/components/Salary'

export default defineComponent({
  props: {
    salary: {
      type: Object as PropType<Salary>,
      required: true
    }
  },
  emits: ['removeSalary'],
  methods: {
    removeSalary(salary: Salary): void {
      this.$emit('removeSalary', salary.key)
    }
  }
})
</script>

<template>
  <li class="flex flex-start group/salary">
    <div class="-ml-[16px] h-[30px] w-[30px] text-center align-middle rounded-full border-2 border-red-500 bg-white group-hover/salary:bg-red-500">
      📅
    </div>
    <div class="grow p-2 mb-5">
      <p class="text-sm text-neutral-500">
        {{ salary.date }}
      </p>
      <h3 class="text-xl font-semibold m-1">
        {{ salary.income }}€
      </h3>
      <button v-on:click="removeSalary(salary)" class="p-1 text-sm border rounded border-yellow-300 hover:bg-yellow-300 hover:text-white invisible group-hover/salary:visible">
        Supprimer
      </button>
    </div>
  </li>
</template>
