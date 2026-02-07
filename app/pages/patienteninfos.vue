<script setup lang="ts">
definePageMeta({
  title: 'Patienteninfos',
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
      { name: 'bildschrimFREI bis DREI', url: 'https://bildschirmfrei-bis-3.de/' },
      { name: 'klicksafe - allgemein', url: 'https://www.klicksafe.de/themen' },
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
      { name: 'Informationen zu Immundefekten I', url: 'https://www.dsai.de/' },
      { name: 'Information zu Immundefekten II', url: 'https://www.immundefekt.com/' },
      { name: 'Informationen zu Blutschwämmchen (Hämangiomen) im Kindeshalter', url: 'https://www.kinderblutkrankheiten.de/content/erkrankungen/haemangiome/' },
      { name: 'Kinderblutkrankheiten', url: 'https://www.kinderblutkrankheiten.de/content/' },
    ],
  },
  {
    id: 'allergie',
    title: 'Allergie Informationen',
    icon: 'i-lucide-flower-2',
    description: 'Informationen für mit Allergien betroffene Familien',
    links: [
      { name: 'Pollenflugkalender des Deutschen Wetterdienstes', url: 'http://www.dwd.de/pollenflug' },
      { name: 'HAL-Allergie Informationsseite', url: 'http://www.hal-allergy.de/allergien' },
      { name: 'Allergiezentrum Südniedersachsen', url: 'https://allergiezentrum.umg.eu/' },
      { name: 'Informationen über Allergien (allergiezentrum.org)', url: 'http://www.allergiezentrum.org/de/' },
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
      'Sicherer Schlaf für mein Baby - SIDS-Vermeidung',
      'Mein Kind soll ins MRT',
    ],
    links: [
      { name: 'DGKJ Elterninformationen', url: 'https://www.dgkj.de/eltern/dgkj-elterninformationen/' },
    ],
  },
  {
    id: 'ernaehrung',
    title: 'Ernährung',
    icon: 'i-lucide-apple',
    description: 'Informationen zur gesunden Ernährung für Säuglinge, Kinder und Jugendliche',
    links: [
      { name: 'Podcast Säuglingsernährung (Spotify)', url: 'https://open.spotify.com/episode/0Yu7puitatps3PkKyWvTQg?si=HgiglDsfRpW6niP9sznV5g' },
      { name: 'Bundesinstitut für Öffentliche Gesundheit: Ernährungsempfehlungen', url: 'https://www.kindergesundheit-info.de/themen/ernaehrung/' },
      { name: 'Netzwerk Gesund ins Leben, u.a. Infos zur Ernährung', url: 'https://www.gesund-ins-leben.de/fuer-familien/' },
      { name: 'DGKJ Ernährungsinformationen', url: 'https://www.dgkj.de/eltern/dgkj-elterninformationen/elterninfo-gesunde-ernaehrung' },
    ],
  },
  {
    id: 'verschiedenes',
    title: 'Lokale & überregionale Ressourcen',
    icon: 'i-lucide-map-pin',
    description: 'Hilfreiche Anlaufstellen und Informationen für Familien',
    links: [
      { name: 'Kinder- und Jugendkulturzentrum Northeim', url: 'https://www.northeim.de/familie-bildung/kinder-und-jugendkulturzentrum.html' },
      { name: 'Kontakt zur Familienberatungsstelle Northeim', url: 'https://www.landkreis-northeim.de/portal/seiten/familienberatungsstelle-kontaktaufnahme-900000082-23900.html' },
      { name: 'Frauen & Wirtschaft', url: 'https://www.koordinierungsstelle-frauen-wirtschaft-northeim.de/' },
      { name: 'STARTKLAR - Ein Sport- und Bewegungsangebot in Göttingen für Kinder und Jugendlich mit Übergewicht', url: 'https://www.uni-goettingen.de/de/323369.html' },
      { name: 'Trauergruppe(n) Northeim für Kinder verschiedenen Alters, junge Erwachsene, Eltern krebskranker Kinder', url: 'http://www.trau-dich-netz.de/dabei-zu-sein.html' },
      { name: 'Hospizdienst Leine-Solling', url: 'https://www.zwanzig-minuten.de/' },
      { name: 'aktion LESESTART: Buch- und Medienempfehlungen', url: 'https://www.lesestart.de/eltern/buchtipps-und-medienempfehlungen/' },
      { name: 'Seelisch gesund Aufwachsen', url: 'https://seelisch-gesund-aufwachsen.de/' },
      { name: 'Gegen Gewalt an Mädchen und Frauen - Koordinierungsstelle Niedersachsen', url: 'https://lks-niedersachsen.de/' },
      { name: 'Hilfe-Portal Sexueller Missbrauch', url: 'https://www.hilfe-portal-missbrauch.de/startseite' },
      { name: 'KINDERSCHUTZHOTLINE', url: 'https://kinderschutzhotline.de/course/view.php?id=12' },
      { name: 'Kindergesundheit-info.de (BZgA)', url: 'http://www.kindergesundheit-info.de/themen/' },
      { name: 'SIDS - der plötzliche Kindstod: hier Informationen zur Vorbeugung!', url: 'http://www.kindergesundheit-info.de/themen/risiken-vorbeugen/ploetzlicher-kindstod-sids/vorbeugung-kindstod/' },
      { name: 'Infos für Schwangerschaft und junge Eltern (Happy Mom)', url: 'http://happymomundbaby.de/' },
      { name: 'REHA - Kliniksuche', url: 'https://meine-rehabilitation.de/pr-web/' },
      { name: 'REHA - Antragstellung', url: 'https://www.deutsche-rentenversicherung.de/SharedDocs/Formulare/DE/Formularpakete/01_versicherte/reha/_DRV_Paket_Rehabilitation_Kinderrehabilitation.html' },
    ],
  },
]

const accordionItems = computed(() =>
  categories.map(c => ({
    label: c.title,
    icon: c.icon,
    value: c.id,
    slot: c.id,
  })),
)
</script>

<template>
  <div>
    <!-- Hero + Einleitung -->
    <section class="bg-primary-50 py-12">
      <UContainer>
        <h1 class="mb-2 text-3xl font-bold text-highlighted md:text-4xl">
          Patienteninfos
        </h1>
        <p class="mb-4 text-muted">
          Hier finden Sie eine Sammlung hilfreicher Links und Informationen zu verschiedenen
          Gesundheitsthemen für Kinder und Familien.
        </p>
        <p class="max-w-2xl text-sm text-muted">
          Die Themen sind in Kategorien sortiert. Klicken Sie auf eine Karte, um passende Links zu
          Beratungsstellen, Infoportalen und Selbsthilfe zu sehen – von Medien über Ernährung bis
          zu lokalen Anlaufstellen.
        </p>
      </UContainer>
    </section>

    <section class="pb-16 pt-10">
      <UContainer>
        <div class="mx-auto max-w-4xl">
          <UAccordion
            type="single"
            collapsible
            :items="accordionItems"
            :ui="{
              item: 'rounded-xl border border-primary-100 bg-default shadow-sm transition-shadow mb-3 last:mb-0 hover:shadow-md px-6',
              trigger: 'py-5 hover:no-underline',
              content: '',
              leadingIcon: 'shrink-0 size-5',
            }"
          >
            <template
              v-for="cat in categories"
              :key="cat.id"
              #[cat.id]
            >
              <PraxisPatienteninfosCategoryContent
                :description="cat.description"
                :topics="'topics' in cat ? cat.topics : undefined"
                :links="[...cat.links]"
              />
            </template>
          </UAccordion>
        </div>
      </UContainer>
    </section>
  </div>
</template>
