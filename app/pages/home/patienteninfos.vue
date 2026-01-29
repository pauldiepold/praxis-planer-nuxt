<script setup lang="ts">

definePageMeta({
  title: 'Patienteninfos',
  layout: 'home',
})

useHead({
  title: 'Patienteninfos',
})

const categories = [
  {
    id: 'bildschirm',
    title: 'Rund um Bildschirm & Internet',
    icon: 'i-lucide-monitor',
    description: 'Themenvorschläge für Kinder, Jugendliche, Eltern, Pädagogen und Erzieher',
    links: [
      { name: 'bildschirmFREI bis DREI', url: '#' },
      { name: 'klicksafe – allgemein', url: 'https://www.klicksafe.de' },
      { name: 'klicksafe für Kinder', url: 'https://www.klicksafe.de/kinder' },
      { name: 'klicksafe für Jugendliche', url: 'https://www.klicksafe.de/jugendliche' },
    ],
  },
  {
    id: 'chronisch',
    title: 'Chronische Erkrankungen & Selbsthilfegruppen',
    icon: 'i-lucide-heart',
    description: 'Ist Ihr Kind chronisch krank? Manchmal hilft es erheblich, sich mit ähnlich betroffenen Familien auszutauschen.',
    links: [
      { name: 'Informationen zu Immundefekten I', url: '#' },
      { name: 'Informationen zu Immundefekten II', url: '#' },
      { name: 'Blutschwämmchen (Hämangiome) im Kindesalter', url: '#' },
      { name: 'Kinderblutkrankheiten', url: '#' },
    ],
  },
  {
    id: 'allergie',
    title: 'Allergie Informationen',
    icon: 'i-lucide-flower-2',
    description: 'Informationen für mit Allergien betroffene Familien',
    links: [
      { name: 'Pollenflugkalender des Deutschen Wetterdienstes', url: 'http://www.dwd.de/pollenflug' },
      { name: 'HAL-Allergie Informationsseite', url: 'http://www.hal-allergie.de/allergien/' },
      { name: 'Allergiezentrum Südniedersachsen', url: 'http://www.allergiezentrum.org/de/' },
      { name: 'AGATE – Anaphylaxie-Schulungen', url: 'http://www.anaphylaxieschulung.de/index.html' },
    ],
  },
  {
    id: 'dgkj',
    title: 'DGKJ Elterninformationen',
    icon: 'i-lucide-book-open',
    description: 'Hochwertige, unabhängige und wissenschaftlich fundierte Informationen der Deutschen Gesellschaft für Kinder- und Jugendmedizin',
    topics: [
      'Gesunde Zähne für mein Kind',
      'Gesunde Ernährung für mein Baby',
      'Gesundes Essen für mein Kind',
      'Mein Kind hat Fieber',
      'Mein Kind hat Halsschmerzen',
      'Mein Kind hat Husten',
      'Mein Kind hat Bauchschmerzen',
      'Mein Kind hat Verstopfung',
      'Mein Kind hat Durchfall',
      'Mein Kind hatte einen Fieberkrampf',
      'Mein Kind ist zu dick',
      'Mein Kind schläft nicht',
      'Ist mein Kind ein Schreibaby?',
      'Mein Kind hat ständig Infekte',
      'Sicherer Schlaf für mein Baby – SIDS-Vermeidung',
      'Mein Kind soll ins MRT',
    ],
    links: [
      { name: 'DGKJ Elterninformationen', url: 'https://www.dgkj.de/eltern/dgkj-elterninformationen' },
    ],
  },
  {
    id: 'ernaehrung',
    title: 'Ernährung',
    icon: 'i-lucide-apple',
    description: 'Informationen zur gesunden Ernährung für Säuglinge, Kinder und Jugendliche',
    links: [
      { name: 'Bundesinstitut für Öffentliche Gesundheit: Ernährungsempfehlungen', url: '#' },
      { name: 'Netzwerk Gesund ins Leben', url: '#' },
      { name: 'DGKJ Ernährungsinformationen', url: '#' },
    ],
  },
  {
    id: 'verschiedenes',
    title: 'Lokale & überregionale Ressourcen',
    icon: 'i-lucide-map-pin',
    description: 'Hilfreiche Anlaufstellen und Informationen für Familien',
    links: [
      { name: 'Kinder- und Jugendkulturzentrum Northeim', url: '#' },
      { name: 'Familienberatungsstelle Northeim', url: '#' },
      { name: 'Frauen & Wirtschaft', url: '#' },
      { name: 'STARTKLAR – Sport für übergewichtige Kinder (Göttingen)', url: '#' },
      { name: 'Trauergruppe(n) Northeim', url: '#' },
      { name: 'Hospizdienst Leine-Solling', url: '#' },
      { name: 'aktion LESESTART: Buch- und Medienempfehlungen', url: '#' },
      { name: 'Seelisch gesund Aufwachsen', url: '#' },
      { name: 'Gegen Gewalt an Mädchen und Frauen – Koordinierungsstelle Niedersachsen', url: '#' },
      { name: 'Hilfe-Portal Sexueller Missbrauch', url: '#' },
      { name: 'KINDERSCHUTZHOTLINE', url: '#' },
      { name: 'Kindergesundheit-info.de (BZgA)', url: 'https://www.kindergesundheit-info.de' },
      { name: 'SIDS – Plötzlicher Kindstod: Vorbeugung', url: '#' },
      { name: 'Happy Mom – Infos für Schwangerschaft und junge Eltern', url: '#' },
      { name: 'REHA – Kliniksuche', url: '#' },
      { name: 'REHA – Antragstellung (Formulare)', url: '#' },
    ],
  },
] as const

const accordionItems = computed(() =>
  categories.map((c) => ({
    label: c.title,
    icon: c.icon,
    value: c.id,
    slot: c.id,
  })),
)

</script>

<template>
  <div>
    <section class="bg-primary-50 py-12">
      <UContainer>
        <div class="mx-auto max-w-3xl text-center">
          <h1 class="mb-2 text-3xl font-bold text-highlighted md:text-4xl">
            Patienteninfos
          </h1>
          <p class="text-muted">
            Hier finden Sie eine Sammlung hilfreicher Links und Informationen zu verschiedenen
            Gesundheitsthemen für Kinder und Familien.
          </p>
        </div>
      </UContainer>
    </section>

    <section class="py-10">
      <UContainer>
        <div class="mx-auto max-w-4xl">
          <UAccordion
            type="single"
            collapsible
            :items="accordionItems"
            :ui="{
              item: 'border rounded-lg px-6 bg-default space-y-4',
              trigger: 'py-6 hover:no-underline',
            }"
          >
            <template
              v-for="cat in categories"
              :key="cat.id"
              #[cat.id]
            >
              <PraxisPatienteninfosCategoryContent
                :description="cat.description"
                :topics="cat.topics"
                :links="cat.links"
              />
            </template>
          </UAccordion>
        </div>
      </UContainer>
    </section>

    <section class="bg-primary-50 py-10">
      <UContainer>
        <PraxisCard
          class="mx-auto max-w-2xl"
          left-border="accent"
        >
          <template #header>
            <h3 class="text-center text-lg font-semibold text-highlighted">
              Tipp: kindergesundheit-info.de
            </h3>
          </template>
          <p class="mb-4 text-center text-muted">
            Vernünftig, unabhängig und werbefrei! Hier finden Sie sehr wertvolle Informationen zu vielen
            Fragen rund um Ihre Kinder – z.B. Medienerziehung, Schlaferziehung, Ernährung und vieles mehr.
          </p>
          <a
            href="https://www.kindergesundheit-info.de"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 font-medium text-primary hover:underline"
          >
            <UIcon
              name="i-lucide-external-link"
              class="size-4"
            />
            Zur Website der BZgA
          </a>
        </PraxisCard>
      </UContainer>
    </section>
  </div>
</template>
