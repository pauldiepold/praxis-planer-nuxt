<script setup lang="ts">
import type { PraxisPhoneHours } from '~/components/praxis/AppointmentAndHours.vue'
import type { EmergencyService } from '~/components/praxis/EmergencyAndClinics.vue'

definePageMeta({
  title: 'Kontakt & Notfälle',
  layout: 'home',
})

useHead({
  title: 'Kontakt & Notfälle',
})

const doctolibUrl
  = 'https://www.doctolib.de/praxis/northeim/praxis-fuer-kinder-und-jugendmedizin-thomas-holstein-diepold-und-dr-katharina-diepold?utm_campaign=website-button&utm_source=praxis-fuer-kinder-und-jugendmedizin-thomas-holstein-diepold-und-dr-katharina-diepold-website-button&utm_medium=referral&utm_content=option-8&utm_term=praxis-fuer-kinder-und-jugendmedizin-thomas-holstein-diepold-und-dr-katharina-diepold'

const pageLinks = [
  { label: 'Doctolib', to: doctolibUrl, target: '_blank', color: 'primary' as const, variant: 'solid' as const, icon: 'i-lucide-calendar' },
]

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
  { label: 'Beide Ärzt:innen gleichzeitig', email: 'aerzte@praxis-hd.de' },
  { label: 'Frau Dr. Katharina Diepold', email: 'dr.diepold@praxis-hd.de' },
  { label: 'Herr Thomas Holstein-Diepold', email: 'kinderarzt@praxis-hd.de' },
] as const

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
  <UPage>
    <div class="bg-primary-50">
      <UContainer>
        <UPageHeader
          title="Kontakt & Notfälle"
          description="Kontaktdaten, Telefonzeiten, Terminbuchung und Notfallnummern"
          :links="pageLinks"
        />
      </UContainer>
    </div>
    <UPageBody>
      <UContainer>
        <div class="space-y-10">
          <section aria-labelledby="kontakt">
            <div class="mb-4 flex items-center gap-2">
              <div class="h-1 w-10 rounded-full bg-primary" />
              <h2
                id="kontakt"
                class="text-xl font-semibold text-highlighted"
              >
                Praxis & Anfahrt
              </h2>
            </div>
            <PraxisContactCard
              :contact="contact"
              :accessibility="accessibility"
              :parking="parking"
            />
          </section>

          <section aria-labelledby="termine">
            <div class="mb-4 flex items-center gap-2">
              <div class="h-1 w-10 rounded-full bg-primary" />
              <h2
                id="termine"
                class="text-xl font-semibold text-highlighted"
              >
                Sprechzeiten & Termine
              </h2>
            </div>
            <PraxisAppointmentAndHours
              :phone-hours="phoneHours"
              :appointment-links="{ doctolibUrl }"
            />
          </section>

          <section aria-labelledby="app">
            <div class="mb-4 flex items-center gap-2">
              <div class="h-1 w-10 rounded-full bg-primary" />
              <h2
                id="app"
                class="text-xl font-semibold text-highlighted"
              >
                Praxis App
              </h2>
            </div>
            <PraxisAppCommunication
              :app-links="appLinks"
              :use-cases="appUseCases"
            />
          </section>

          <section aria-labelledby="email">
            <div class="mb-4 flex items-center gap-2">
              <div class="h-1 w-10 rounded-full bg-primary" />
              <h2
                id="email"
                class="text-xl font-semibold text-highlighted"
              >
                E-Mail
              </h2>
            </div>
            <PraxisEmailContacts :emails="emails" />
          </section>

          <section aria-labelledby="notfaelle">
            <div class="mb-4 flex items-center gap-2">
              <div class="h-1 w-10 rounded-full bg-primary" />
              <h2
                id="notfaelle"
                class="text-xl font-semibold text-highlighted"
              >
                Notfälle & Bereitschaftsdienst
              </h2>
            </div>
            <PraxisEmergencyAndClinics
              :emergency-numbers="emergencyNumbers"
              :poison-centers="poisonCenters"
              :giz-nord-url="gizNordUrl"
              :emergency-service="emergencyService"
              :clinics="clinics"
            />
          </section>
        </div>
      </UContainer>
    </UPageBody>
  </UPage>
</template>
