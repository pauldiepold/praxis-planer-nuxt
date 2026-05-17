<script setup lang="ts">
definePageMeta({
  title: 'Leistungsspektrum',
})

useSeoMeta({
  title: 'Leistungsspektrum',
  description: 'Unser Leistungsspektrum: U-Untersuchungen, Impfungen, Akut- und Vorsorgesprechstunde, Allergologie, Neuropädiatrie, Osteopathie.',
})

useBreadcrumbSchema([
  { name: 'Leistungen', item: '/leistungen' },
])

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
    ],
  },
  // Schwerpunkt: eigenständig, Platz für später mehr Inhalt
  {
    title: 'Neuropädiatrie',
    icon: 'i-lucide-brain',
    services: [
      'Betreuung, sowie Diagnostik und Therapie neuropädiatrischer Krankheitsbilder (Fr. Dr. Diepold)',
      'keine EEG-Untersuchungen möglich',
    ],
  },
  // Weitere Spezialleistungen
  {
    title: 'Osteopathie',
    icon: 'i-lucide-hand-heart',
    services: [
      'Manuelle sowie Osteopathische Säuglings- und Kinderbehandlung (Hr. Th. Holstein-Diepold)',
    ],
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
      'Allgemeine Laboruntersuchungen, z.B. Zöliakie, Anämie, usw.',
      'Urinstreifentest und Urinmikroskopie',
      'CRP Schnelltests',
      'Streptokokken A Schnelltest (Scharlach)',
      'Blutsenkungsgeschwindigkeit und Blutzuckerbestimmungen',
    ],
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
    title: 'Sonstiges',
    icon: 'i-lucide-stethoscope',
    services: [
      'Hörtest- und Trommelfelltests (Audio- und Tympanometrie)',
      'Sporteignungsuntersuchungen',
      'Betreuung chronisch kranker Patienten (z.B. Entwicklungsstörungen, Frühgeborene mit kompliziertem Krankheitsverlauf, Asthma- und Allergiepatienten, Teilnahme am DMP)',
      'Betreuung der Wochenstation und des Kreißsaals im Helios-Albert-Schweitzer-Krankenhaus Northeim',
      'Amblyopiescreening: umfassender Sehtest für Kinder ab dem 6. Lebensmonat. Schnelle und zuverlässige Methode, auch bei kleinen und unkooperativen Kindern, um die Notwendigkeit einer weitergehenden Augenarztuntersuchung zu prüfen.',
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
          sowie einige Sonderleistungen.
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
        />
      </div>

      <div class="mt-12 text-center">
        <BaseCard class="inline-block">
          <p class="mb-2 text-lg font-medium text-highlighted">
            Noch Wünsche oder Fragen?
          </p>
          <p class="text-muted">
            Sprechen Sie uns gerne an, wenn Sie weitere Fragen zu unserem Leistungsspektrum haben.
          </p>
        </BaseCard>
      </div>
    </UContainer>
  </div>
</template>
