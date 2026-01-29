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
  <PraxisCard subtle-border>
    <template #header>
      <div class="flex items-center gap-3">
        <div class="rounded-lg bg-primary/10 p-2">
          <UIcon
            name="i-lucide-smartphone"
            class="size-5 text-primary"
          />
        </div>
        <div class="space-y-0.5">
          <p class="text-base font-semibold text-highlighted">
            Praxis App & Kommunikation
          </p>
          <p class="text-sm text-muted">
            „Meine pädiatrische Praxis“ – sicher & datenschutzkonform
          </p>
        </div>
      </div>
    </template>

    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
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
      </div>

      <div class="rounded-lg bg-elevated/50 p-4 ring-1 ring-default">
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
              class="mt-0.5 size-4 text-primary"
            />
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </PraxisCard>
</template>
