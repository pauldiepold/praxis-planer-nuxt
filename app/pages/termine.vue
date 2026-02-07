<script setup lang="ts">
import type { PraxisPhoneHours } from '~/components/praxis/AppointmentAndHours.vue'
import { DOCTOLIB_URL } from '~/utils/doctolib'

definePageMeta({
  title: 'Termine & Kontakt',
})

useHead({
  title: 'Termine & Kontakt',
})

const contact = {
  name: 'Kinder- und Jugendarztpraxis',
  doctorsLine: 'Thomas Holstein-Diepold und Dr. med. Katharina Diepold',
  orgLine: 'Berufsausübungsgemeinschaft (Gemeinschaftspraxis)',
  street: 'Albert-Schweitzer-Weg 7',
  zipCity: 'D-37154 Northeim',
  phoneDisplay: '+49 5551 90 99 307',
  phoneTel: 'tel:+4955519099307',
  faxDisplay: '+49 5551 90 99 308',
  mapsUrl: 'https://maps.google.com/?q=Albert-Schweitzer-Weg+7,+37154+Northeim',
} as const

const accessibility = {
  summary: 'Barrierefreier Zugang zur Praxis.',
  details: 'Im Treppenhaus (Erdgeschoss) befindet sich eine barrierefreie Toilette. Alle Behandlungszimmer sind barrierefrei gestaltet.',
} as const

const parking = {
  summary: 'Großer Parkplatz an der Praxis.',
  details: 'Bis zu einer Stunde parken Sie gebührenfrei. Darüber hinaus kann die Apotheke nebenan bei Einlösung eines Rezeptes Ihr Parkticket freischalten.',
} as const

const phoneHours: PraxisPhoneHours = {
  summary: 'Zu diesen Zeiten sind wir in der Regel telefonisch erreichbar:',
  days: [
    { day: 'Montag', time: '08:30–12:00 Uhr' },
    { day: 'Dienstag', time: '08:30–12:00 Uhr' },
    { day: 'Mittwoch', time: '08:30–12:00 Uhr' },
    { day: 'Donnerstag', time: '08:30–12:00 Uhr' },
    { day: 'Freitag', time: '08:30–12:00 Uhr' },
  ],
  note: 'Die tatsächliche Sprechzeit geht über die genannten Telefonsprechzeiten hinaus.',
  phoneDisplay: contact.phoneDisplay,
  phoneTel: contact.phoneTel,
}

const appLinks = {
  playStoreUrl: 'https://cux.link/playstore',
  appStoreUrl: 'https://cux.link/appstore',
} as const

const appUseCases = [
  { label: 'Fragen an das Praxisteam' },
  { label: 'Rezepte (insbesondere bei bekannten Dauermedikationen)' },
  { label: 'Verordnungen für Heilmittel (Ergotherapie, Logopädie, Physiotherapie)' },
  { label: 'Ein- oder Überweisungen' },
  { label: 'Terminanfragen' },
] as const

const emails = [
  { label: 'Beide Ärzt:innen', email: 'aerzte@praxis-hd.de' },
  { label: 'Dr. Katharina Diepold', email: 'dr.diepold@praxis-hd.de' },
  { label: 'Thomas Holstein-Diepold', email: 'kinderarzt@praxis-hd.de' },
] as const
</script>

<template>
  <div>
    <section class="bg-primary-50 py-12">
      <UContainer>
        <h1 class="mb-2 text-3xl font-bold text-highlighted md:text-4xl">
          Termine & Kontakt
        </h1>
        <p class="text-muted">
          Sprechzeiten, Anfahrt, Terminbuchung und Erreichbarkeit
        </p>
      </UContainer>
    </section>

    <BasePageSection
      id="termine"
      heading="Termine & Erreichbarkeit"
    >
      <PraxisAppointmentAndHours
        :phone-hours="phoneHours"
        :appointment-links="{ doctolibUrl: DOCTOLIB_URL }"
      />
    </BasePageSection>

    <BasePageSection
      id="anfahrt"
      heading="Praxis & Anfahrt"
      bg-class="bg-primary-50"
    >
      <PraxisContactCard
        :contact="contact"
        :accessibility="accessibility"
        :parking="parking"
      />
    </BasePageSection>

    <BasePageSection
      id="app"
      heading="Praxis App"
    >
      <PraxisAppCommunication
        :app-links="appLinks"
        :use-cases="appUseCases"
      />
    </BasePageSection>

    <BasePageSection
      id="email"
      heading="E-Mail"
      bg-class="bg-primary-50"
    >
      <PraxisEmailContacts :emails="emails" />
    </BasePageSection>
  </div>
</template>
