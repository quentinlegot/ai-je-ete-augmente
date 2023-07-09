import type { IncomeMode } from '@/components/IncomeMode'
import { reactive } from 'vue'

export interface Configuration {
  currency: string
  imposition: number
  incomeMode: IncomeMode
  locale: string
}

export const DefaultConfiguration: Configuration = {
  currency: '€' as string,
  imposition: 35 as number,
  incomeMode: 'net-monthly' as IncomeMode,
  locale: (navigator.language.substring(0, 2) === 'fr' ? 'fr' : 'en') as string
}

export const SharedConfiguration: Configuration = reactive({
  currency: DefaultConfiguration.currency,
  imposition: DefaultConfiguration.imposition,
  incomeMode: DefaultConfiguration.incomeMode,
  locale: DefaultConfiguration.locale
})
