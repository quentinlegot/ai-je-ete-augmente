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

const app = createApp(App)
const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'fr',
  pluralizationRules: {
    en: increaseOrDecreaseRule,
    fr: increaseOrDecreaseRule
  },
  messages: {
    en: enTranslation,
    fr: frTranslation
  },
  warnHtmlInMessage: false
})

app.use(router)
app.use(i18n)

app.mount('#app')
