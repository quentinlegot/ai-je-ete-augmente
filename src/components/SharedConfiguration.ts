import type { IncomeMode } from '@/components/IncomeMode'
import { reactive } from 'vue'
import type { countryCode } from '@/components/CountryCodes'
import { countryCodes } from '@/components/CountryCodes'

const navigatorLang = navigator.language.substring(0, 2) as countryCode

export interface Configuration {
  country: countryCode
  currency: string
  imposition: number
  incomeMode: IncomeMode
  locale: string
}

export const DefaultConfiguration: Configuration = {
  country: (countryCodes.includes(navigatorLang) ? navigatorLang : 'fr') as countryCode,
  currency: '€' as string,
  imposition: 35 as number,
  incomeMode: 'net-monthly' as IncomeMode,
  locale: (navigatorLang === 'fr' ? 'fr' : 'en') as string
}

export const SharedConfiguration: Configuration = reactive({
  country: DefaultConfiguration.country,
  currency: DefaultConfiguration.currency,
  imposition: DefaultConfiguration.imposition,
  incomeMode: DefaultConfiguration.incomeMode,
  locale: DefaultConfiguration.locale
})
