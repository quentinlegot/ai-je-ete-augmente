<template>
  <main class="mx-auto max-w-screen-lg p-5">
    <h2 class="my-5 text-lg text-slate-800">Comment utiliser l'outil ?</h2>
    <p class="mb-3 p-3">
      Sur <RouterLink to="/" class="underline">la page principale</RouterLink>, ajoutez les
      changements de salaires successifs au mois auquels ils sont survenus.
    </p>
    <p class="mb-3 p-3">
      Vous pourrez voir le % d'augmentation annoncé, et en dessous, celui ajusté par rapport à
      l'inflation.
    </p>
    <p class="mb-3 p-3">
      Sur <RouterLink to="/configure" class="underline">la page de configuration</RouterLink>, vous
      pourrez changer le mode de saisie du salaire et la méthode de calcul en alternant entre
      salaire annuel brut prélevé d'une imposition, ou salaire mensuel net.
    </p>
    <h2 class="my-5 text-lg text-slate-800">Comment ça fonctionne ?</h2>
    <p class="mb-3 p-3">
      Le salaire le plus ancien sert de revenu de référence. Ce salaire vous permet d'acheter un
      <i>tas de X trucs</i>.
    </p>
    <p class="mb-3 p-3">
      Au fur et à mesure, du fait de l'inflation, ce <i>tas de X trucs</i> va couter de plus en plus
      cher. En conséquence, votre salaire vous permettra de ne vous payer qu'une une portion de plus
      en plus réduite de ce <i>tas de X trucs</i>.
    </p>
    <p class="mb-3 p-3">
      Les augmentations suivantes sont ainsi recalculées par rapport à la capacité qu'elles vous
      offrent de vous offrir ce <i>tas de X trucs</i>.
    </p>
    <p class="mb-3 p-3">
      Le changement dans la capacité à acheter le <i>tas de X trucs</i> est matérialisé sur le
      graphique par l'écart entre le salaire annoncé et celui ajusté.
    </p>
    <h2 class="my-5 text-lg text-slate-800">D'où viennent les taux d'inflation ?</h2>
    <p class="mb-3 p-3">
      Les taux d'inflations sont ceux publiés
      <a
        href="https://www.insee.fr/fr/statistiques?taille=100&debut=0&theme=30&conjoncture=43"
        target="_blank"
        class="underline"
        >pour chaque mois par l'insee.</a
      >
    </p>
  </main>
</template>
