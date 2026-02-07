<script setup lang="ts">
export type PraxisAppLinks = {
  appStoreUrl: string
  playStoreUrl: string
}

export type PraxisAppUseCase = {
  label: string
}

defineProps<{
  appLinks: PraxisAppLinks
  useCases: ReadonlyArray<PraxisAppUseCase>
}>()
</script>

<template>
  <PraxisCard
    subtle-border
  >
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <div class="rounded-lg flex shrink-0 items-center justify-center bg-primary/10 p-2">
            <UIcon
              name="i-lucide-smartphone"
              class="size-5 text-primary"
            />
          </div>
          <div class="space-y-0.5">
            <p class=" font-semibold text-highlighted">
              Meine pädiatrische Praxis
            </p>
            <p class="text-sm text-muted">
              Sichere & datenschutzkonforme Kommunikation
            </p>
          </div>
        </div>

        <p class="text-sm text-muted">
          Für Fragen an das Praxisteam nutzen Sie bitte die Praxis App. Der Chat wird während der Öffnungszeiten zeitnah
          gelesen. Wir antworten je nach Dringlichkeit, spätestens nach 2–3 Werktagen. Sie erhalten eine Nachricht, wenn
          Ihr Anliegen bearbeitet wurde.
        </p>

        <div class="flex flex-wrap gap-2">
          <UButton
            :to="appLinks.appStoreUrl"
            target="_blank"
            variant="outline"
            color="neutral"
            icon="i-simple-icons-appstore"
          >
            App Store
          </UButton>
          <UButton
            :to="appLinks.playStoreUrl"
            target="_blank"
            variant="outline"
            color="neutral"
            icon="i-simple-icons-googleplay"
          >
            Google Play
          </UButton>
        </div>

        <p class="text-xs text-dimmed flex items-center gap-1">
          <Icon name="i-lucide-bell" class="shrink-0" />
          Tipp: Eltern sollten ein gemeinsames Login nutzen, damit der Chat richtig funktioniert.
        </p>
      </div>
      <div>
        <div class="rounded-lg bg-primary-50 p-4">
          <p class="mb-3 text-sm font-medium text-highlighted">
            Das können Sie über den Chat anfragen
          </p>
          <ul class="space-y-2 text-sm text-muted">
            <li
              v-for="item in useCases"
              :key="item.label"
              class="flex items-start gap-2"
            >
              <UIcon
                name="i-lucide-check"
                class="mt-0.5 size-4 shrink-0 text-primary"
              />
              <span>{{ item.label }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </PraxisCard>
</template>
