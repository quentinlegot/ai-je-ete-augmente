<script lang="ts">
import { defineComponent } from 'vue'
import type { Configuration } from '@/components/SharedConfiguration'
import { SharedConfiguration, DefaultConfiguration } from '@/components/SharedConfiguration'

export default defineComponent({
  data() {
    return {
      configuration: SharedConfiguration as Configuration,
      saved: 0 as number,
      savedTimeout: null as null | number
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
  },
  watch: {
    configuration: {
      handler(): void {
        if (this.savedTimeout !== null) {
          window.clearTimeout(this.savedTimeout)
          this.savedTimeout = null
        }
        this.saved++
        this.savedTimeout = window.setTimeout(() => (this.saved = 0), 2500)
      },
      deep: true
    }
  }
})
</script>

<template>
  <main class="mx-auto max-w-screen-lg p-5">
    <h2 class="my-5 text-lg text-slate-800">Configurer l'application</h2>
    <blockquote
      v-if="saved > 0"
      class="mb-5 rounded border border-green-800 p-5 text-sm text-green-800"
    >
      Les paramètres ont été sauvegardé
      <template v-if="saved > 1"> ({{ saved }}) </template>
    </blockquote>
    <blockquote v-else class="mb-5 rounded border p-5 text-sm text-slate-500">
      Les paramètres sont sauvegardé automatiquement
    </blockquote>
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
          <legend>Mode de calculs en fonction du type de salaire</legend>
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
          <small
            class="m-3 hidden text-xs peer-checked/gross-annual:block peer-hover/gross-annual:block peer-hover/net-monthly:hidden"
          >
            Une portion d'imposition est retirée des revenus annuels bruts qui sont ensuite évalués
            par mois en fonction de l'inflation
          </small>
          <small
            class="m-3 hidden text-xs peer-checked/net-monthly:block peer-hover/net-monthly:block peer-hover/gross-annual:hidden"
          >
            Les revenus mensuels sont directement évalués en fonction de l'inflation
          </small>
          <div class="ml-3 hidden peer-checked/gross-annual:block md:mt-3">
            <label for="configImposition"> Imposition (%) </label>
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
