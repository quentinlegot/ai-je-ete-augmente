<template>
  <main class="mx-auto max-w-screen-lg p-5">
    <h2 class="my-5 text-lg text-slate-800">{{ $t('how.usage.title') }}</h2>
    <p class="mb-3 p-3">
      {{ $t('how.usage.p1.1')
      }}<RouterLink to="/" class="underline">{{ $t('how.usage.p1.2') }}</RouterLink
      >{{ $t('how.usage.p1.3') }}
    </p>
    <p class="mb-3 p-3">
      {{ $t('how.usage.p2') }}
    </p>
    <p class="mb-3 p-3">
      {{ $t('how.usage.p3.1')
      }}<RouterLink to="/configure" class="underline">{{ $t('how.usage.p3.2') }}</RouterLink
      >{{ $t('how.usage.p3.3') }}
    </p>
    <h2 class="my-5 text-lg text-slate-800">{{ $t('how.operating.title') }}</h2>
    <p class="mb-3 p-3" v-html="$t('how.operating.p1')"></p>
    <p class="mb-3 p-3" v-html="$t('how.operating.p2')"></p>
    <p class="mb-3 p-3" v-html="$t('how.operating.p3')"></p>
    <p class="mb-3 p-3" v-html="$t('how.operating.p4')"></p>
    <h2 class="my-5 text-lg text-slate-800">{{ $t('how.inflation.title') }}</h2>
    <p class="mb-3 p-3" v-html="$t('how.inflation.p1')"></p>
  </main>
</template>
