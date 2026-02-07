<script setup lang="ts">
import type { EmergencyService } from '~/components/praxis/EmergencyAndClinics.vue'

definePageMeta({
  title: 'Notdienst',
})

useHead({
  title: 'Notdienst – Außerhalb der Sprechzeiten',
})

const emergencyNumbers = [
  {
    label: 'Notdienstnummer',
    numberDisplay: '112',
    numberTel: 'tel:112',
    description: 'Lebensgefährliche Erkrankungen',
  },
  {
    label: 'Giftnotzentrale Nord (Göttingen)',
    numberDisplay: '0551 19240',
    numberTel: 'tel:+4955119240',
    description: 'Bei Vergiftungen (alternativ auch 112)',
  },
] as const

const poisonCenters = [
  { city: 'Berlin', numberDisplay: '030 19 24 0', numberTel: 'tel:+493019240' },
  { city: 'Erfurt', numberDisplay: '0361 73 07 30', numberTel: 'tel:+49361730730' },
  { city: 'Freiburg', numberDisplay: '0761 19 24 0', numberTel: 'tel:+4976119240' },
] as const

const gizNordUrl = 'https://www.giz-nord.de/cms/index.php'

const emergencyService: EmergencyService = {
  title: 'Kinderärztlicher Bereitschaftsdienst',
  addressLine1: 'Robert-Koch-Str. 40, 37073 Göttingen',
  addressLine2: 'Osteingang 1. Stock',
  mapsUrl: 'https://goo.gl/maps/SPzNkJATekR2',
  phoneDisplay: '0551 70709 245',
  phoneTel: 'tel:+4955170709245',
  hours: [
    { day: 'Mittwoch', time: '16:00–21:00 Uhr' },
    { day: 'Freitag', time: '16:00–21:00 Uhr' },
    { day: 'Samstag, Sonntag und Feiertag', time: '10:00–20:00 Uhr' },
  ],
  note: 'Der kinderärztliche Bereitschaftsdienst findet in den Räumen der Kinderklinik Göttingen statt. Bitte kommen Sie ohne Voranmeldung – es ist immer jemand da.',
}

const clinics = [
  {
    name: 'Universitätsmedizin Göttingen (UMG)',
    address: 'Robert-Koch-Straße 40, 37073 Göttingen',
    phoneDisplay: '0551 39 – 66210 oder 66240',
    phoneTel: 'tel:+495513966210',
    mapsUrl: 'https://goo.gl/maps/SPzNkJATekR2',
    websiteUrl: 'http://www.med.uni-goettingen.de/',
    extra: 'Osteingang 1. Stock',
  },
  {
    name: 'St. Bernward Krankenhaus Hildesheim',
    address: 'Treibestraße 9, 31134 Hildesheim',
    phoneDisplay: '05121 90-1293',
    phoneTel: 'tel:+495121901293',
    mapsUrl: 'https://goo.gl/maps/rv1ygJuc7jM2',
    websiteUrl: 'https://bernward-khs.de/klinik-fuer-kinder-und-jugendmedizin/',
  },
  {
    name: 'Helios Klinikum Hildesheim',
    address: 'Senator-Braun-Allee 33, 31135 Hildesheim',
    phoneDisplay: '05121 894-3501',
    phoneTel: 'tel:+4951218943501',
    mapsUrl: 'https://goo.gl/maps/PJh4D3boiiv',
    websiteUrl:
      'https://www.helios-gesundheit.de/kliniken/hildesheim/unser-angebot/unsere-fachbereiche-und-zentren/kinderzentrum/',
  },
  {
    name: 'Kinderklinik Heiligenstadt',
    address: 'Windische G. 112, 37308 Heilbad Heiligenstadt',
    phoneDisplay: '03606 76-22-10',
    phoneTel: 'tel:+493606762210',
    mapsUrl: 'https://goo.gl/maps/ZuWvWvKxeDp',
    websiteUrl: 'https://www.eichsfeld-klinikum.de/klinik-kompetenz/kinder-und-jugendmedizin',
  },
] as const
</script>

<template>
  <div>
    <section class="bg-primary-50 py-12">
      <UContainer>
        <h1 class="mb-2 text-3xl font-bold text-highlighted md:text-4xl">
          Notdienst
        </h1>
        <p class="text-muted">
          Außerhalb unserer Sprechzeiten: Bereitschaftsdienst, Notfallnummern und Kinderkliniken
        </p>
      </UContainer>
    </section>

    <PraxisEmergencyAndClinics
      :emergency-numbers="emergencyNumbers"
      :poison-centers="poisonCenters"
      :giz-nord-url="gizNordUrl"
      :emergency-service="emergencyService"
      :clinics="clinics"
    />
  </div>
</template>
