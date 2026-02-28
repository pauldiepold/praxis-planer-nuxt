<script setup lang="ts">
definePageMeta({
  title: 'Startseite',
})

useHead({
  title: 'Kinder- und Jugendarztpraxis Northeim – Thomas Holstein-Diepold & Dr. Katharina Diepold',
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

const phoneDisplay = '05551 90 99 307'
const phoneTel = 'tel:+4955519099307'

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
    <!-- Geteilte Hero Section: Text links, Bild rechts -->
    <section class="grid grid-cols-1 lg:grid-cols-2 min-h-[55vh] lg:min-h-[60vh]">
      <!-- Linke Hälfte: Begrüßung, Namen als Unterschrift, CTAs -->
      <div class="flex flex-col justify-center bg-primary-50 dark:bg-primary-950/30 px-6 py-12 lg:py-16 lg:pl-12 xl:pl-20">
        <div class="max-w-lg">
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-highlighted mb-4 leading-tight">
            Herzlich willkommen!
          </h1>
          <p class="text-base md:text-lg text-muted-foreground mb-2">
            Wir freuen uns darauf, Sie und Ihre Kinder beim Heranwachsen zu begleiten.
          </p>
          <p class="text-sm md:text-base text-muted-foreground/90 mb-8 font-medium">
            Th. Holstein-Diepold & Dr. K. Diepold
          </p>

          <div class="flex flex-col sm:flex-row gap-3">
            <UButton
              to="/termine"
              size="md"
              class="font-semibold !bg-[var(--praxis-accent)] hover:!opacity-90 text-gray-900"
            >
              <UIcon
                name="i-lucide-calendar"
                class="size-4"
              />
              Termine & Kontakt
            </UButton>
            <UButton
              :to="phoneTel"
              size="md"
              variant="outline"
              color="neutral"
              class="font-semibold"
            >
              <UIcon
                name="i-lucide-phone"
                class="size-4"
              />
              {{ phoneDisplay }}
            </UButton>
          </div>
        </div>
      </div>

      <!-- Rechte Hälfte: Bild -->
      <div class="relative min-h-[40vh] lg:min-h-0 bg-gray-200 dark:bg-gray-800">
        <img
          src="/hero-empfang.webp"
          alt="Praxis Empfang"
          class="absolute inset-0 w-full h-full object-cover"
          width="800"
          height="600"
        >
      </div>
    </section>

    <!-- Aktuelle Informationen -->
    <section class="py-16">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center gap-3 mb-6">
            <div class="h-1 w-12 rounded-full bg-[var(--praxis-accent)]" />
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
          <p class="mt-6">
            <NuxtLink
              to="/aktuelles"
              class="text-primary font-medium text-sm inline-flex items-center gap-1 hover:underline"
            >
              Alle Neuigkeiten anzeigen
              <UIcon
                name="i-lucide-chevron-right"
                class="size-4 shrink-0"
              />
            </NuxtLink>
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Quick Links -->
    <section class="py-16 bg-primary-50">
      <UContainer>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink
            to="/termine"
            class="group block"
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
                Sprechzeiten, Anfahrt, Terminbuchung und Erreichbarkeit.
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
            to="/notdienst"
            class="group block"
          >
            <BaseCard class="h-full transition-all hover:shadow-lg hover:-translate-y-1 border-transparent hover:border-primary">
              <BaseHeadingWithIcon
                icon="i-lucide-hospital"
                layout="responsive"
              >
                <h3 class="font-semibold text-lg text-highlighted mb-2 group-hover:text-primary transition-colors md:mb-2">
                  Notdienst
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

          <NuxtLink
            to="/leistungen"
            class="group block"
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
            to="/ueber-uns"
            class="group block"
          >
            <BaseCard class="h-full transition-all hover:shadow-lg hover:-translate-y-1 border-transparent hover:border-primary">
              <div class="flex flex-row items-start gap-3 md:flex-col md:gap-2 mb-2">
                <div class="size-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                  <span class="text-primary font-bold text-sm">HD</span>
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
