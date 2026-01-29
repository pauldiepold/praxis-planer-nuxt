<script setup lang="ts">
definePageMeta({
  title: 'Leistungsspektrum',
  layout: 'home',
})

useHead({
  title: 'Leistungsspektrum',
})

const categories = [
  {
    title: 'Vorsorgeuntersuchungen',
    icon: 'i-lucide-baby',
    colorClass: 'text-primary',
    bgColorClass: 'bg-primary/10',
    dotClass: 'bg-primary',
    services: [
      'U2 bis U9 – Früherkennungsuntersuchungen für Säuglinge und Kleinkinder',
      'J1 – Jugendgesundheitsuntersuchung',
      'U10, U11 und J2 – je nach Kassenverträgen',
      'Jährliche Vorsorge für Privatversicherte',
    ],
  },
  {
    title: 'Spezialleistungen',
    icon: 'i-lucide-brain',
    colorClass: 'text-accent',
    bgColorClass: 'bg-accent/10',
    dotClass: 'bg-[var(--praxis-accent)]',
    services: [
      'Neuropädiatrie – Diagnostik und Therapie (Fr. Dr. Diepold)',
      'Manuelle und Osteopathische Säuglings- und Kinderbehandlung (Hr. Holstein-Diepold)',
      'Betreuung chronisch kranker Patienten (Entwicklungsstörungen, Frühgeborene, Asthma, Allergien)',
      'Teilnahme am DMP (Disease Management Programm)',
    ],
  },
  {
    title: 'Impfungen',
    icon: 'i-lucide-syringe',
    colorClass: 'text-[var(--praxis-sky-blue)]',
    bgColorClass: 'bg-[color:var(--praxis-sky-blue)_/_0.1]',
    dotClass: 'bg-[var(--praxis-sky-blue)]',
    services: [
      'Schutzimpfungen nach STIKO-Empfehlungen',
      'Reiseimpfungen nach individuell ermitteltem Bedarf',
      'Impfungen auch für Eltern und Großeltern möglich',
    ],
  },
  {
    title: 'Ultraschall-Diagnostik',
    icon: 'i-lucide-activity',
    colorClass: 'text-primary',
    bgColorClass: 'bg-primary/10',
    dotClass: 'bg-primary',
    services: [
      'Säuglingshüfte (Screening)',
      'Schädelsonographie bei Säuglingen (durch die offene Fontanelle)',
      'Nieren und ableitende Harnwege',
      'Abdomen (Bauchultraschall)',
      'Schilddrüse',
      'Muskulatur und Gelenke',
    ],
  },
  {
    title: 'Allergie-Diagnostik & Therapie',
    icon: 'i-lucide-flask-conical',
    colorClass: 'text-accent',
    bgColorClass: 'bg-accent/10',
    dotClass: 'bg-[var(--praxis-accent)]',
    services: [
      'Allergietestungen mit Pricktest',
      'Provokationstests',
      'Blutdiagnostik für Allergien',
      'Desensibilisierung subcutan und sublingual (Hausstaub, Gräser, Pollen)',
      'Fortführung bei Insektengiftbehandlungen',
    ],
  },
  {
    title: 'Atemwegsdiagnostik',
    icon: 'i-lucide-heart',
    colorClass: 'text-primary',
    bgColorClass: 'bg-primary/10',
    dotClass: 'bg-primary',
    services: [
      'Lungenfunktion mit Fluss-Volumenkurve',
      'Belastungslungenfunktion in Einzelfällen',
      'Bestimmung der Sauerstoffsättigung im Blut',
    ],
  },
  {
    title: 'Hör- und Sehtests',
    icon: 'i-lucide-ear',
    colorClass: 'text-accent',
    bgColorClass: 'bg-accent/10',
    dotClass: 'bg-[var(--praxis-accent)]',
    services: [
      'Amblyopiescreening (Sehtest ab 6. Lebensmonat) – eine schnelle und zuverlässige Methode auch bei kleinen Kindern',
      'Audiometrie (Hörtest)',
      'Tympanometrie (Trommelfelltest)',
    ],
    note: 'Das Amblyopiescreening wird von wenigen GKV übernommen und kann als IGeL-Leistung angeboten werden. Nachträgliche Kostenerstattung oft möglich.',
  },
  {
    title: 'Labor & Tests',
    icon: 'i-lucide-microscope',
    colorClass: 'text-primary',
    bgColorClass: 'bg-primary/10',
    dotClass: 'bg-primary',
    services: [
      'Allgemeine Laboruntersuchungen (Zöliakie, Anämie, u.a.) – Versand an Labor wagnerestibbe Göttingen',
      'Urinstreifentest und Urinmikroskopie',
      'CRP Schnelltest',
      'Streptokokken A Schnelltest (Scharlach)',
      'Blutsenkungsgeschwindigkeit',
      'Blutzuckerbestimmung',
    ],
  },
  {
    title: 'Weitere Leistungen',
    icon: 'i-lucide-bone',
    colorClass: 'text-muted',
    bgColorClass: 'bg-muted',
    dotClass: 'bg-muted-foreground',
    services: [
      'Sporteignungsuntersuchungen',
      'Betreuung der Wochenstation und des Kreißsaals im Helios-Albert-Schweitzer-Krankenhaus Northeim',
    ],
  },
] as const
</script>

<template>
  <div>
    <section class="bg-primary-50 py-12">
      <UContainer>
        <div class="mx-auto max-w-3xl text-center">
          <h1 class="mb-2 text-3xl font-bold text-highlighted md:text-4xl">
            Leistungsspektrum
          </h1>
          <p class="text-muted">
            Wir erbringen die allgemein üblichen Leistungen einer Kinder- und Jugendarztpraxis
            sowie einige Sonderleistungen. Seit Dezember 2020 erweitert sich das Spektrum um den
            neuropädiatrischen Formenkreis durch Frau Dr. Diepold.
          </p>
        </div>
      </UContainer>
    </section>

    <UContainer class="py-10">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PraxisLeistungenCard
          v-for="cat in categories"
          :key="cat.title"
          :title="cat.title"
          :icon="cat.icon"
          :color-class="cat.colorClass"
          :bg-color-class="cat.bgColorClass"
          :dot-class="cat.dotClass"
          :services="cat.services"
          :note="cat.note"
        />
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
