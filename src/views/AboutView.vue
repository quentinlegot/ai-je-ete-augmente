<template>
  <main class="mx-auto max-w-screen-lg p-5">
    <h2 class="my-5 text-lg text-slate-800">{{ $t('about.why.title') }}</h2>
    <p class="mb-3 p-3" v-html="$t('about.why.p1')"></p>
    <p class="mb-3 p-3" v-html="$t('about.why.p2')"></p>
    <h2 class="my-5 text-lg text-slate-800">{{ $t('about.goal.title') }}</h2>
    <p class="mb-3 p-3" v-html="$t('about.goal.p1')"></p>
    <p class="mb-3 p-3" v-html="$t('about.goal.p2')"></p>
    <ul class="mb-3 p-3" v-html="$t('about.goal.p3')"></ul>
    <h2 class="my-5 text-lg text-slate-800">{{ $t('about.contribute.title') }}</h2>
    <p class="mb-3 p-3">
      {{ $t('about.contribute.p1.1')
      }}<a
        href="https://bitbucket.org/Lars-VanCiental/ai-je-ete-augmente/src/master/"
        target="_blank"
        class="underline"
        >{{ $t('about.contribute.p1.2') }}</a
      >{{ $t('about.contribute.p1.3') }}
    </p>
    <h2 class="my-5 text-lg text-slate-800">{{ $t('about.discuss.title') }}</h2>
    <p class="mb-3 p-3">
      {{ $t('about.discuss.p1.1')
      }}<a href="https://social.vivaldi.net/@larsvanciental" target="_blank" class="underline">{{
        $t('about.discuss.p1.2')
      }}</a
      >{{ $t('about.discuss.p1.3')
      }}<a href="https://twitter.com/LarsVanCiental" target="_blank" class="underline">{{
        $t('about.discuss.p1.4')
      }}</a
      >{{ $t('about.discuss.p1.5') }}
    </p>
    <h2 class="my-5 text-lg text-slate-800">{{ $t('about.legal.title') }}</h2>
    <p class="mb-3 p-3" v-html="$t('about.legal.p1')"></p>
    <p class="mb-3 p-3" v-html="$t('about.legal.p2')"></p>
  </main>
</template>
