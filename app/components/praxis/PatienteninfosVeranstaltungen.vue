<script setup lang="ts">
// Regionale Veranstaltungstipps (Flyer externer Anbieter).
// Vorerst statisch gepflegt: PDF + optionales Vorschaubild (1. Seite als webp)
// liegen unter public/veranstaltungen/. Fehlt die Vorschau, zeigt die Karte
// einen neutralen Platzhalter.
type Veranstaltung = {
  titel: string
  veranstalter: string
  zeitraum: string
  beschreibung: string
  pdf: string
  vorschau?: string
  anmeldung?: string
  anzeigenAb?: string
  anzeigenBis?: string
}

const veranstaltungen: Veranstaltung[] = [
  {
    titel: 'Gesund zu Hause',
    veranstalter: 'Landkreis Northeim – Frühe Hilfen',
    zeitraum: 'ab 16. November 2026 · 6 Online-Vorträge',
    beschreibung: 'Digitale Themenreihe für werdende Eltern und Eltern mit Kindern im ersten Lebensjahr. Auch Fachkräfte können an den Vorträgen teilnehmen.',
    pdf: '/veranstaltungen/gesund-zu-hause-2026.pdf',
    vorschau: '/veranstaltungen/gesund-zu-hause-2026.webp',
    anmeldung: 'https://www.landkreis-northeim.de/GzH',
  },
]

const sichtbar = computed(() => {
  const heute = heuteIso()
  return veranstaltungen.filter(v => istSichtbar(v.anzeigenAb, v.anzeigenBis, heute))
})

// Vorschaubilder, die nicht geladen werden konnten → Platzhalter statt kaputtem Bild
const fehlendeVorschau = ref(new Set<string>())
function hatVorschau(v: Veranstaltung) {
  return !!v.vorschau && !fehlendeVorschau.value.has(v.vorschau)
}
</script>

<template>
  <div
    v-if="sichtbar.length"
    class="rounded-xl border border-primary-100 bg-default px-6 py-5 shadow-sm"
  >
    <BaseHeadingWithIcon icon="i-lucide-calendar-heart">
      <h2 class="text-lg font-semibold text-highlighted">
        Aktuelle regionale Veranstaltungstipps
      </h2>
    </BaseHeadingWithIcon>
    <p class="mt-1 mb-5 text-sm text-muted">
      Angebote aus der Region, auf die wir Sie gerne aufmerksam machen.
    </p>

    <ul class="space-y-6">
      <li
        v-for="v in sichtbar"
        :key="v.pdf"
        class="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-center"
      >
        <a
          :href="v.pdf"
          target="_blank"
          rel="noopener"
          class="group relative block aspect-video overflow-hidden rounded-lg border border-default bg-primary-50 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:border-primary hover:shadow-lg"
          :aria-label="`${v.titel} – Flyer als PDF öffnen`"
        >
          <img
            v-if="hatVorschau(v)"
            :src="v.vorschau"
            :alt="`Flyer: ${v.titel}`"
            loading="lazy"
            class="size-full object-contain"
            @error="fehlendeVorschau.add(v.vorschau!)"
          >
          <div
            v-else
            class="flex size-full flex-col items-center justify-center gap-2 text-primary"
          >
            <UIcon
              name="i-lucide-file-text"
              class="size-12"
            />
            <span class="text-xs font-medium uppercase tracking-wide">PDF-Flyer</span>
          </div>
        </a>

        <div class="flex flex-col gap-1">
          <h3 class="text-lg font-semibold text-highlighted">
            {{ v.titel }}
          </h3>
          <p class="text-xs text-muted">
            {{ v.veranstalter }}
          </p>
          <p class="text-sm font-medium text-primary">
            {{ v.zeitraum }}
          </p>
          <p class="mt-1 text-sm text-muted">
            {{ v.beschreibung }}
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
            <UButton
              v-if="v.anmeldung"
              :to="v.anmeldung"
              target="_blank"
              icon="i-lucide-pencil-line"
            >
              Zur Anmeldung
            </UButton>
            <UButton
              :to="v.pdf"
              external
              target="_blank"
              color="neutral"
              variant="outline"
              icon="i-lucide-file-text"
            >
              Programmflyer (PDF)
            </UButton>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
