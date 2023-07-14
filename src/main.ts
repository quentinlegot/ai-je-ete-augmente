import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import frTranslation from '@/assets/translations/fr.json'
import enTranslation from '@/assets/translations/en.json'

const increaseOrDecreaseRule = function (choice: number, choicesLenght: number) {
  if (choicesLenght === 3 && choice < 0) {
    return 1
  }

  if (choicesLenght === 3 && choice > 0) {
    return 2
  }

  return choicesLenght === 2 && choice > 1 ? 1 : 0
}

const numberFormatting = {
  raise: {
    style: 'percent',
    useGrouping: false,
    signDisplay: 'exceptZero',
    maximumFractionDigits: 1
  },
  result: {
    style: 'percent',
    useGrouping: false,
    signDisplay: 'never',
    maximumFractionDigits: 1
  },
  salary: {
    style: 'decimal',
    useGrouping: true
  }
}

const app = createApp(App)
//@ts-ignore
const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'fr',
  messages: {
    en: enTranslation,
    fr: frTranslation
  },
  numberFormats: {
    en: numberFormatting,
    fr: numberFormatting
  },
  pluralRules: {
    en: increaseOrDecreaseRule,
    fr: increaseOrDecreaseRule
  }
})

app.use(router)
app.use(i18n)

app.mount('#app')
