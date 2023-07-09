<script lang="ts">
import { defineComponent } from 'vue'
import type { Configuration } from '@/components/SharedConfiguration'
import { SharedConfiguration, DefaultConfiguration } from '@/components/SharedConfiguration'
import type { countryCode } from '@/components/CountryCodes'
import { countryCodes } from '@/components/CountryCodes'

export default defineComponent({
  data() {
    return {
      configuration: SharedConfiguration as Configuration,
      countryCodes: countryCodes as countryCode[],
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
        if (this.$i18n.locale !== this.configuration.locale) {
          this.$i18n.locale = this.configuration.locale
        }

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
    <h2 class="my-5 text-lg text-slate-800">{{ $t('configure.header') }}</h2>
    <blockquote
      v-if="saved > 0"
      class="mb-5 rounded border border-green-800 p-5 text-sm text-green-800"
    >
      {{ $t('configure.saved', { count: saved }, saved) }}
    </blockquote>
    <blockquote v-else class="mb-5 rounded border p-5 text-sm text-slate-500">
      {{ $t('configure.autosave') }}
    </blockquote>
    <div class="divide-y-2 divide-dashed">
      <form class="mb-5 grid grid-cols-1 pt-5" v-on:submit.prevent="">
        <label for="language" class="md:flex md:flex-row md:justify-between">
          <span> {{ $t('configure.language.label') }}</span>
        </label>
        <select id="language" v-model="configuration.locale">
          <option value="fr">{{ $t('configure.language.options.fr') }}</option>
          <option value="en">{{ $t('configure.language.options.en') }}</option>
        </select>
      </form>
      <form class="mb-5 grid grid-cols-1 pt-5" v-on:submit.prevent="">
        <label for="country" class="md:flex md:flex-row md:justify-between">
          <span> {{ $t('configure.country.label') }}</span>
        </label>
        <select id="country" v-model="configuration.country">
          <option
            v-for="(countryCode, index) in countryCodes"
            v-bind:key="index"
            :value="countryCode"
          >
            <!-- eslint-disable-next-line @intlify/vue-i18n/no-dynamic-keys -->
            {{ $t('configure.country.options.' + countryCode) }}
          </option>
        </select>
      </form>
      <form class="mb-5" v-on:submit.prevent="">
        <label for="configCurrency" class="block"> {{ $t('configure.currency.label') }} </label>
        <input
          type="text"
          required
          v-model="configuration.currency"
          id="configCurrency"
          class="ml-3 block md:inline"
        />
        <small class="ml-3 block text-xs md:inline-block">
          {{ $t('configure.currency.helper') }}
        </small>

        <fieldset class="mt-3">
          <legend>{{ $t('configure.incomeMode.label') }}</legend>
          <input
            type="radio"
            value="gross-annual"
            required
            v-model="configuration.incomeMode"
            id="configIncomeGrossAnnual"
            name="configIncomeMode"
            class="peer/gross-annual mx-3"
          />
          <label
            for="configIncomeGrossAnnual"
            class="mb-3 ml-3 block peer-checked/gross-annual:font-semibold md:ml-0 md:inline"
          >
            {{ $t('configure.incomeMode.grossAnnual.label') }}
          </label>
          <input
            type="radio"
            value="net-monthly"
            required
            v-model="configuration.incomeMode"
            id="configIncomeNetMonthly"
            name="configIncomeMode"
            class="peer/net-monthly mx-3"
          />
          <label
            for="configIncomeNetMonthly"
            class="mb-3 block peer-checked/net-monthly:font-semibold md:ml-0 md:inline"
          >
            {{ $t('configure.incomeMode.netMonthly.label') }}
          </label>
          <small
            class="m-3 hidden text-xs peer-checked/gross-annual:block peer-hover/gross-annual:block peer-hover/net-monthly:hidden"
          >
            {{ $t('configure.incomeMode.grossAnnual.helper') }}
          </small>
          <small
            class="m-3 hidden text-xs peer-checked/net-monthly:block peer-hover/net-monthly:block peer-hover/gross-annual:hidden"
          >
            {{ $t('configure.incomeMode.netMonthly.helper') }}
          </small>
          <div class="ml-3 hidden peer-checked/gross-annual:block md:mt-3">
            <label for="configImposition">{{
              $t('configure.incomeMode.grossAnnual.imposition.label')
            }}</label>
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
              {{ $t('configure.incomeMode.grossAnnual.imposition.helper') }}
            </p>
          </div>
        </fieldset>
      </form>
      <form class="mb-5 pt-5" v-on:submit.prevent="reset()">
        <button
          type="submit"
          class="mt-3 rounded border border-orange-500 p-2 hover:bg-orange-500 hover:text-white"
        >
          {{ $t('configure.data.reset') }}
        </button>
      </form>
    </div>
  </main>
</template>
