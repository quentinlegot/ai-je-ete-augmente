<script lang="ts">
import { defineComponent } from 'vue'
import type { Configuration } from '@/components/SharedConfiguration'
import { SharedConfiguration } from '@/components/SharedConfiguration'

export default defineComponent({
  data() {
    return {
      configuration: SharedConfiguration as Configuration
    }
  }
})
</script>

<template>
  <main class="p-5">
    <h2 class="mb-5 text-slate-800">Configurer l'application</h2>
    <form class="grid grid-cols-1">
      <label for="newDate" class="md:flex md:flex-row md:justify-between">
        <span> Devise </span>
        <small class="text-xs"> Ne sert que pour l'affichage </small>
      </label>
      <input
        type="text"
        required
        v-model="configuration.currency"
        id="configCurrency"
        class="mb-5"
      />

      <fieldset>
        <legend class="mb-3 underline">Fonctionnement du salaire</legend>
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
  </main>
</template>

<style></style>
