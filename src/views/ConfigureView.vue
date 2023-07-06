<script lang="ts">
import { defineComponent } from 'vue'
import type { Configuration } from '@/components/SharedConfiguration'
import { SharedConfiguration, DefaultConfiguration } from '@/components/SharedConfiguration'

export default defineComponent({
  data() {
    return {
      configuration: SharedConfiguration as Configuration
    }
  },
  methods: {
    reset(): void {
      if (
        confirm(
          'Etes-vous certains de vouloir supprimer les salaires enregistrés et la configuration ?'
        )
      ) {
        localStorage.clear()
        this.configuration.currency = DefaultConfiguration.currency
        this.configuration.imposition = DefaultConfiguration.imposition
        this.configuration.incomeMode = DefaultConfiguration.incomeMode
        alert('Reinitialisation effectuée !')
      }
    }
  }
})
</script>

<template>
  <main class="mx-auto max-w-screen-lg p-5">
    <h2 class="mb-5 text-slate-800">Configurer l'application</h2>
    <div class="divide-y-2 divide-dashed">
      <form class="mb-5" v-on:submit.prevent="">
        <label for="newDate" class="block"> Devise </label>
        <input
          type="text"
          required
          v-model="configuration.currency"
          id="configCurrency"
          class="ml-3 block md:inline"
        />
        <small class="ml-3 block text-xs md:inline-block"> Ne sert que pour l'affichage </small>

        <fieldset class="mt-3">
          <legend>Fonctionnement du salaire</legend>
          <input
            type="radio"
            value="gross-annual"
            required
            v-model="configuration.incomeMode"
            id="configIncomeGrossAnnual"
            name="configIncomeMode"
            class="peer/gross-annual ml-3"
          />
          <label
            for="configIncomeGrossAnnual"
            class="mb-3 ml-3 block peer-checked/gross-annual:font-semibold md:ml-0 md:inline"
          >
            Salaire annuel brut
          </label>
          <input
            type="radio"
            value="net-monthly"
            required
            v-model="configuration.incomeMode"
            id="configIncomeNetMonthly"
            name="configIncomeMode"
            class="peer/net-monthly ml-3"
          />
          <label
            for="configIncomeNetMonthly"
            class="mb-3 ml-3 block peer-checked/net-monthly:font-semibold md:ml-0 md:inline"
          >
            Salaire mensuel net
          </label>
          <div class="ml-3 hidden peer-checked/gross-annual:block md:mt-3">
            <label for="con"> Imposition (%) </label>
            <input
              type="number"
              size="3"
              min="0"
              max="100"
              step="1"
              required
              v-model="configuration.imposition"
              id="configImposition"
              name="configImposition"
            />
            <p class="text-xs md:ml-3 md:inline">
              Pourcentage à retirer du salaire brut pour obtenir le salaire net
            </p>
          </div>
        </fieldset>
      </form>
      <form class="mb-5 pt-5" v-on:submit.prevent="reset()">
        <button
          type="submit"
          class="mt-3 rounded border border-orange-500 p-2 hover:bg-orange-500 hover:text-white"
        >
          ⚠️ Reinitialiser les données et la configuration
        </button>
      </form>
    </div>
  </main>
</template>
