<script setup lang="ts">
definePageMeta({
  title: 'Startseite',
  layout: 'home',
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
</script>

<template>
  <div>
    <!-- Hero Section mit Hintergrundbild -->
    <section class="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: 'url(/hero-empfang.webp)' }"
      />
      <!-- Fade: oben dunkler, unten ins Weiße für ruhigen Übergang -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-white" />

      <div class="relative w-full py-12 md:py-16 text-center">
        <UContainer>
          <div class="max-w-3xl mx-auto">
            <p class="text-white/90 font-medium mb-2 text-base md:text-lg drop-shadow-sm">
              Praxis für Kinder- und Jugendmedizin
            </p>
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight drop-shadow-md">
              Thomas Holstein-Diepold & Dr. Katharina Diepold
            </h1>
            <p class="text-base md:text-lg text-white/85 mb-6 max-w-xl mx-auto drop-shadow-sm">
              Herzlich willkommen! Wir freuen uns darauf, Sie und Ihre Kinder beim Heranwachsen zu begleiten.
            </p>

            <div class="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <UButton
                to="/termine"
                size="md"
                class="font-semibold text-sm md:text-base px-5 py-3 shadow-lg !bg-[var(--praxis-accent)] hover:!bg-[var(--praxis-accent)] hover:!opacity-90 active:!bg-[var(--praxis-accent)] text-gray-900"
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
                class="font-semibold text-sm md:text-base px-5 py-3 bg-white/20 hover:bg-white/30 text-white !border-white/30 ring-0 focus:ring-0 backdrop-blur-sm"
              >
                <UIcon
                  name="i-lucide-phone"
                  class="size-4"
                />
                {{ phoneDisplay }}
              </UButton>
            </div>

            <div class="rounded-xl p-4 md:p-5 max-w-xl mx-auto border border-gray-200/90 dark:border-gray-600/90 shadow-lg bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-left">
              <div class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-stethoscope"
                  class="size-5 text-primary mt-0.5 shrink-0"
                />
                <div class="text-sm md:text-base text-foreground">
                  <p class="font-medium mb-1">
                    Wir sind eine Terminpraxis
                  </p>
                  <p class="text-muted-foreground text-sm">
                    Für kurze Wartezeiten vergeben wir alle Termine vorab. Täglich reservieren wir Zeit für die
                    <span class="font-medium text-foreground">Akutsprechstunde</span>
                    – auch kurzfristige Anliegen bekommen einen Termin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </UContainer>
      </div>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <UIcon
          name="i-lucide-chevron-down"
          class="size-6 text-gray-600/80"
        />
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
            <PraxisCard left-border="accent">
              <h3 class="font-semibold text-lg text-highlighted mb-2">
                Praxis App als E-Mail-Ersatz
              </h3>
              <p class="text-muted">
                Seit September 2025 nutzen wir als E-Mail-Ersatz den Chat der PraxisApp „Meine Pädiatrische Praxis".
                Hierüber können wir datenschutzkonform mit Ihnen kommunizieren, einschließlich Austausch von Dokumenten
                wie Fotos, Laborbefunde oder Protokollen. E-Mails werden nur noch unregelmäßig gelesen.
              </p>
            </PraxisCard>

            <PraxisCard left-border="primary">
              <h3 class="font-semibold text-lg text-highlighted mb-2">
                Neues Leistungsangebot: Osteopathie
              </h3>
              <p class="text-muted">
                Herr Holstein-Diepold hat sein Behandlungsspektrum mit einer Fortbildung in Manueller und
                Osteopathischer Säuglings- und Kinderbehandlung erweitert. Termine, auch für praxisfremde Kinder,
                vergeben wir auf Anfrage telefonisch oder über die Chat-Funktion der PraxisApp.
              </p>
            </PraxisCard>
          </div>
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
            <PraxisCard class="h-full transition-all hover:shadow-lg hover:-translate-y-1 border-transparent hover:border-primary">
              <UIcon
                name="i-lucide-calendar"
                class="size-10 text-primary mb-4"
              />
              <h3 class="font-semibold text-lg text-highlighted mb-2 group-hover:text-primary transition-colors">
                Termine & Kontakt
              </h3>
              <p class="text-sm text-muted mb-3">
                Sprechzeiten, Anfahrt, Terminbuchung und Erreichbarkeit.
              </p>
              <span class="text-primary font-medium text-sm flex items-center gap-1">
                Mehr erfahren
                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-4"
                />
              </span>
            </PraxisCard>
          </NuxtLink>

          <NuxtLink
            to="/notdienst"
            class="group block"
          >
            <PraxisCard class="h-full transition-all hover:shadow-lg hover:-translate-y-1 border-transparent hover:border-primary">
              <UIcon
                name="i-lucide-hospital"
                class="size-10 text-primary mb-4"
              />
              <h3 class="font-semibold text-lg text-highlighted mb-2 group-hover:text-primary transition-colors">
                Notdienst
              </h3>
              <p class="text-sm text-muted mb-3">
                Außerhalb der Sprechzeiten: Bereitschaftsdienst und Kinderkliniken.
              </p>
              <span class="text-primary font-medium text-sm flex items-center gap-1">
                Mehr erfahren
                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-4"
                />
              </span>
            </PraxisCard>
          </NuxtLink>

          <NuxtLink
            to="/leistungen"
            class="group block"
          >
            <PraxisCard class="h-full transition-all hover:shadow-lg hover:-translate-y-1 border-transparent hover:border-primary">
              <UIcon
                name="i-lucide-stethoscope"
                class="size-10 text-primary mb-4"
              />
              <h3 class="font-semibold text-lg text-highlighted mb-2 group-hover:text-primary transition-colors">
                Leistungen
              </h3>
              <p class="text-sm text-muted mb-3">
                Von Vorsorgen über Allergietests bis zur Neuropädiatrie – unser umfassendes Angebot.
              </p>
              <span class="text-primary font-medium text-sm flex items-center gap-1">
                Mehr erfahren
                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-4"
                />
              </span>
            </PraxisCard>
          </NuxtLink>

          <NuxtLink
            to="/ueber-uns"
            class="group block"
          >
            <PraxisCard class="h-full transition-all hover:shadow-lg hover:-translate-y-1 border-transparent hover:border-primary">
              <div class="size-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span class="text-primary font-bold text-sm">HD</span>
              </div>
              <h3 class="font-semibold text-lg text-highlighted mb-2 group-hover:text-primary transition-colors">
                Über uns
              </h3>
              <p class="text-sm text-muted mb-3">
                Lernen Sie Frau Dr. Diepold, Herrn Holstein-Diepold und unser Praxisteam kennen.
              </p>
              <span class="text-primary font-medium text-sm flex items-center gap-1">
                Mehr erfahren
                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-4"
                />
              </span>
            </PraxisCard>
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
