<script setup lang="ts">
definePageMeta({
  title: 'Startseite',
})

useSeoMeta({
  title: 'Kinder- und Jugendarztpraxis Holstein-Diepold & Dr. Diepold',
  titleTemplate: '%s',
  description: 'Vorsorgen, Impfungen, Akutsprechstunde, Allergologie, Neuropädiatrie und Osteopathie für Kinder und Jugendliche.',
})

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

const { data: neuigkeiten } = await useAsyncData('aktuelles-latest', () =>
  queryCollection('aktuelles')
    .where('hidden', '=', false)
    .order('date', 'DESC')
    .limit(3)
    .all(),
)
</script>

<template>
  <div>
    <!-- Hero: Foto mit Overlay, zentrierter Text -->
    <section class="relative flex items-center min-h-[420px] md:min-h-[520px] overflow-hidden">
      <!-- Hintergrundbild -->
      <img
        src="/hero-empfang.webp"
        alt="Empfangsbereich unserer Kinder- und Jugendarztpraxis"
        width="2000"
        height="724"
        fetchpriority="high"
        class="absolute inset-0 size-full object-cover object-[25%_70%]"
      >
      <!-- Overlay-Verlauf für Lesbarkeit (warmer Ton) -->
      <div class="absolute inset-0 bg-stone-950/50 pointer-events-none" />
      <div class="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-amber-900/10 to-stone-950/35 pointer-events-none" />
      <UContainer class="text-center relative z-10 py-12 md:py-16">
        <div class="max-w-xl mx-auto">
          <h1 class="text-xl md:text-2xl font-semibold text-white leading-tight mb-4">
            Guten Tag liebe Eltern, Kinder und Jugendliche!
          </h1>
          <p class="text-sm md:text-base text-white/90 max-w-lg mx-auto leading-relaxed mt-1 mb-0">
            Herzlich willkommen auf unserer Praxis-Webseite. Diese Seite soll Ihnen helfen, uns kennenzulernen, Kontakt mit uns aufzunehmen und weitere Informationen zu erhalten. Wir freuen uns darauf, Sie und Ihre Kinder beim Heranwachsen zu begleiten.
          </p>
          <p class="text-base md:text-lg font-medium text-white/95 mt-5 mb-5 leading-tight">
            Th. Holstein-Diepold, Dr. K. Diepold und das Praxisteam
          </p>
          <div class="mt-5 flex justify-center">
            <UButton
              to="/termine"
              size="lg"
              color="neutral"
              variant="outline"
              class="font-semibold"
            >
              <UIcon
                name="i-lucide-calendar"
                class="size-4"
              />
              Termine & Kontakt
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Aktuelle Informationen -->
    <section class="py-16">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center gap-3 mb-6">
            <div class="h-1 w-12 rounded-full bg-gray-800" />
            <h2 class="text-2xl md:text-3xl font-bold text-highlighted">
              Aktuelle Informationen
            </h2>
          </div>

          <div class="space-y-6">
            <NeuigkeitCard
              v-for="item in neuigkeiten"
              :key="item.path"
              :item="item"
            />
          </div>
          <div class="mt-8">
            <UButton
              to="/aktuelles"
              color="primary"
              variant="subtle"
              trailing-icon="i-lucide-chevron-right"
              class="font-medium"
            >
              Alle Neuigkeiten anzeigen
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Quick Links -->
    <section class="py-16 bg-primary-50">
      <UContainer>
        <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <NuxtLink
            to="/ueber-uns"
            class="group block md:col-span-2 md:col-start-2 lg:col-start-auto"
          >
            <BaseCard class="h-full transition-all hover:shadow-lg hover:-translate-y-1 border-transparent hover:border-primary">
              <div class="flex flex-row items-start gap-3 md:flex-col md:gap-2 mb-2">
                <div class="flex shrink-0 -space-x-3">
                  <img
                    src="/team/doctors/diepold-small.webp"
                    alt="Dr. Katharina Diepold"
                    class="size-10 rounded-full object-cover ring-2 ring-default"
                  >
                  <img
                    src="/team/doctors/holstein-small.webp"
                    alt="Thomas Holstein-Diepold"
                    class="size-10 rounded-full object-cover ring-2 ring-default"
                  >
                </div>
                <h3 class="font-semibold text-lg text-highlighted group-hover:text-primary transition-colors min-w-0 md:mb-0">
                  Über uns
                </h3>
              </div>
              <p class="text-sm text-muted mb-3">
                Lernen Sie Frau Dr. Diepold, Herrn Holstein-Diepold und unser Praxisteam kennen.
              </p>
              <span class="text-primary font-medium text-sm flex items-center gap-1">
                Mehr erfahren
                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-4 shrink-0"
                />
              </span>
            </BaseCard>
          </NuxtLink>

          <NuxtLink
            to="/termine"
            class="group block md:col-span-2"
          >
            <BaseCard class="h-full transition-all hover:shadow-lg hover:-translate-y-1 border-transparent hover:border-primary">
              <BaseHeadingWithIcon
                icon="i-lucide-calendar"
                layout="responsive"
              >
                <h3 class="font-semibold text-lg text-highlighted mb-2 group-hover:text-primary transition-colors md:mb-2">
                  Termine & Kontakt
                </h3>
              </BaseHeadingWithIcon>
              <p class="text-sm text-muted mb-3">
                Terminbuchung, Erreichbarkeit, Sprechzeiten und Anfahrt.
              </p>
              <span class="text-primary font-medium text-sm flex items-center gap-1">
                Mehr erfahren
                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-4 shrink-0"
                />
              </span>
            </BaseCard>
          </NuxtLink>

          <NuxtLink
            to="/leistungen"
            class="group block md:col-span-2"
          >
            <BaseCard class="h-full transition-all hover:shadow-lg hover:-translate-y-1 border-transparent hover:border-primary">
              <BaseHeadingWithIcon
                icon="i-lucide-stethoscope"
                layout="responsive"
              >
                <h3 class="font-semibold text-lg text-highlighted mb-2 group-hover:text-primary transition-colors md:mb-2">
                  Leistungen
                </h3>
              </BaseHeadingWithIcon>
              <p class="text-sm text-muted mb-3">
                Von Vorsorgen über Allergietests bis zur Neuropädiatrie – unser umfassendes Angebot.
              </p>
              <span class="text-primary font-medium text-sm flex items-center gap-1">
                Mehr erfahren
                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-4 shrink-0"
                />
              </span>
            </BaseCard>
          </NuxtLink>

          <NuxtLink
            to="/patienteninfos"
            class="group block md:col-span-2 lg:col-start-2"
          >
            <BaseCard class="h-full transition-all hover:shadow-lg hover:-translate-y-1 border-transparent hover:border-primary">
              <BaseHeadingWithIcon
                icon="i-lucide-info"
                layout="responsive"
              >
                <h3 class="font-semibold text-lg text-highlighted mb-2 group-hover:text-primary transition-colors md:mb-2">
                  Patienteninfos
                </h3>
              </BaseHeadingWithIcon>
              <p class="text-sm text-muted mb-3">
                Verlässliche Anlaufstellen zu Gesundheit, Medien und chronischen Erkrankungen.
              </p>
              <span class="text-primary font-medium text-sm flex items-center gap-1">
                Mehr erfahren
                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-4 shrink-0"
                />
              </span>
            </BaseCard>
          </NuxtLink>

          <NuxtLink
            to="/notfaelle"
            class="group block md:col-span-2"
          >
            <BaseCard class="h-full transition-all hover:shadow-lg hover:-translate-y-1 border-transparent hover:border-primary">
              <BaseHeadingWithIcon
                icon="i-lucide-hospital"
                layout="responsive"
              >
                <h3 class="font-semibold text-lg text-highlighted mb-2 group-hover:text-primary transition-colors md:mb-2">
                  Notfälle
                </h3>
              </BaseHeadingWithIcon>
              <p class="text-sm text-muted mb-3">
                Außerhalb der Sprechzeiten: Bereitschaftsdienst und Kinderkliniken.
              </p>
              <span class="text-primary font-medium text-sm flex items-center gap-1">
                Mehr erfahren
                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-4 shrink-0"
                />
              </span>
            </BaseCard>
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <!-- Praxis App (gleiche Karte wie auf Termine & Kontakt) -->
    <section class="py-16 bg-primary-50">
      <UContainer>
        <h2 class="sr-only">
          Praxis App
        </h2>
        <PraxisAppCommunication
          :app-links="appLinks"
          :use-cases="appUseCases"
        />
      </UContainer>
    </section>
  </div>
</template>
