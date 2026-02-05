<script setup lang="ts">
definePageMeta({
  title: 'Leistungsspektrum',
  layout: 'home',
})

useHead({
  title: 'Leistungsspektrum',
})

const visionScreenUrl = 'https://spot-vision-screener.de/wichtige-informationen-fuer-die-eltern/'
const wagnerstibbeUrl = 'http://www.wagnerstibbe.de/'

// Einheitliche Farben für alle Karten (runder Look)
const iconBoxClass = 'bg-primary/10'
const iconColorClass = 'text-primary'
const dotClass = 'bg-primary'

// Reihenfolge: für Eltern relevante Themen zuerst (Vorsorge, Impfung), dann Schwerpunkte, dann übrige Leistungen
const categories = [
  // Zuerst: das Wichtigste für Eltern
  {
    title: 'Vorsorgeuntersuchungen',
    icon: 'i-lucide-baby',
    services: [
      'Sämtliche Vorsorgeuntersuchungen von U2 bis U9 und J1.',
      'Je nach Kassenverträgen können wir die Zusatzvorsorgen U10, U11 und J2 durchführen.',
      'Für Privatversicherte gilt grundsätzlich die Möglichkeit einer jährlichen Vorsorgeuntersuchung. Fragen Sie ggf. Ihre Krankenversicherung.',
    ],
  },
  {
    title: 'Schutzimpfungen',
    icon: 'i-lucide-syringe',
    services: [
      'Schutzimpfungen nach STIKO-Empfehlungen',
      'Reiseimpfungen nach individuell ermitteltem Bedarf',
      'Eltern und Großeltern können auch geimpft werden!',
    ],
  },
  // Schwerpunkt: eigenständig, Platz für später mehr Inhalt
  {
    title: 'Neuropädiatrie',
    icon: 'i-lucide-brain',
    services: [
      'Betreuung, sowie Diagnostik und Therapie neuropädiatrischer Krankheitsbilder (Fr. Dr. Diepold)',
    ],
  },
  // Weitere Spezialleistungen
  {
    title: 'Spezialleistungen',
    icon: 'i-lucide-sparkles',
    services: [
      'Manuelle sowie Osteopathische Säuglings- und Kinderbehandlung (Hr. Th. Holstein-Diepold)',
      'Amblyopiescreening: umfassender Sehtest für Kinder ab dem 6. Lebensmonat. Schnelle und zuverlässige Methode, auch bei kleinen und unkooperativen Kindern, um die Notwendigkeit einer weitergehenden Augenarztuntersuchung zu prüfen.',
    ],
    useNoteSlot: 'amblyopie',
  },
  {
    title: 'Ultraschalluntersuchungen',
    icon: 'i-lucide-activity',
    services: [
      'Säuglingshüften',
      'Schädel bei Säuglingen (durch die offene Fontanelle)',
      'Nieren und ableitende Harnwege bzw. gesamtes Abdomen (Bauchultraschall)',
      'Schilddrüse, Muskulatur und Gelenke',
    ],
  },
  {
    title: 'Betreuung',
    icon: 'i-lucide-heart-pulse',
    services: [
      'Betreuung chronisch kranker Patienten (z.B. Entwicklungsstörungen, Frühgeborene mit kompliziertem Krankheitsverlauf, Asthma- und Allergiepatienten, Teilnahme am DMP)',
      'Betreuung der Wochenstation und des Kreißsaals im Helios-Albert-Schweitzer-Krankenhaus Northeim',
    ],
  },
  {
    title: 'Allergie & Desensibilisierung',
    icon: 'i-lucide-flask-conical',
    services: [
      'Allergietestungen mit Pricktest, Provokationen und Blutdiagnostik',
      'Desensibilisierungsbehandlungen subcutan und sublingual (z.B. Hausstaub-, Gräser- und Pollenallergie, Fortführung bei Insektengiftbehandlungen)',
    ],
  },
  {
    title: 'Labor',
    icon: 'i-lucide-microscope',
    services: [
      'Allgemeine Laboruntersuchungen, z.B. Zöliakie, Anämie, usw.; wir versenden in das Labor „wagnerstibbe“ in Göttingen',
      'Urinstreifentest und Urinmikroskopie',
      'CRP Schnelltests',
      'Streptokokken A Schnelltest (Scharlach)',
      'Blutsenkungsgeschwindigkeit und Blutzuckerbestimmungen',
    ],
    useNoteSlot: 'labor',
  },
  {
    title: 'Lungenfunktion & Sauerstoffsättigung',
    icon: 'i-lucide-wind',
    services: [
      'Lungenfunktion (mit Fluss-Volumenkurve, in Einzelfällen Belastungslungenfunktion)',
      'Bestimmung der Sauerstoffsättigung im Blut',
    ],
  },
  {
    title: 'Weitere Untersuchungen',
    icon: 'i-lucide-stethoscope',
    services: [
      'Hörtest- und Trommelfelltests (Audio- und Tympanometrie)',
      'Sporteignungsuntersuchungen',
    ],
  },
]
</script>

<template>
  <div>
    <section class="bg-primary-50 py-12">
      <UContainer>
        <h1 class="mb-2 text-3xl font-bold text-highlighted md:text-4xl">
          Leistungsspektrum
        </h1>
        <p class="text-muted">
          Wir erbringen die allgemein üblichen Leistungen einer Kinder- und Jugendarztpraxis
          sowie einige Sonderleistungen. Seit der Verstärkung durch Frau Dr. Diepold erweitert
          sich das Leistungsspektrum ab Dezember 2020 um den neuropädiatrischen Formenkreis.
        </p>
      </UContainer>
    </section>

    <UContainer class="py-10">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PraxisLeistungenCard
          v-for="cat in categories"
          :key="cat.title"
          :title="cat.title"
          :icon="cat.icon"
          :icon-box-class="iconBoxClass"
          :icon-color-class="iconColorClass"
          :dot-class="dotClass"
          :services="cat.services"
        >
          <template
            v-if="cat.useNoteSlot === 'amblyopie'"
            #note
          >
            <span class="inline">
              Diese Untersuchung wird nur von wenigen gesetzlichen Krankenkassen übernommen
              und kann in diesem Fall nur als sog. „Igel-Leistung“ (Selbstzahler) angeboten werden.
              Oft ist eine nachträgliche Kostenerstattung durch die gesetzliche Krankenkasse möglich.
              <a
                :href="visionScreenUrl"
                target="_blank"
                rel="noopener noreferrer"
              >Info VisionScreen</a>
            </span>
          </template>
          <template
            v-else-if="cat.useNoteSlot === 'labor'"
            #note
          >
            <a
              :href="wagnerstibbeUrl"
              target="_blank"
              rel="noopener noreferrer"
            >Labor wagnerstibbe</a> in Göttingen
          </template>
        </PraxisLeistungenCard>
      </div>

      <div class="mt-12 text-center">
        <PraxisCard class="inline-block">
          <p class="mb-2 text-lg font-medium text-highlighted">
            Noch Wünsche? – Fragen Sie nach!
          </p>
          <p class="text-muted">
            Sprechen Sie uns gerne an, wenn Sie weitere Fragen zu unserem Leistungsspektrum haben.
          </p>
        </PraxisCard>
      </div>
    </UContainer>
  </div>
</template>
