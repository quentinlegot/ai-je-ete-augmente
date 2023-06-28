import type { IncomeMode } from '@/components/IncomeMode'
import { reactive } from 'vue'

export interface Configuration {
  currency: string
  imposition: number
  incomeMode: IncomeMode
}

export const SharedConfiguration: Configuration = reactive({
  currency: '€' as string,
  imposition: 35 as number,
  incomeMode: 'net-monthly' as IncomeMode
})
