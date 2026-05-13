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
  <BaseCard
    subtle-border
  >
    <div class="mb-6 space-y-3">
      <div class="flex items-center gap-4">
        <div class="rounded-lg flex shrink-0 items-center justify-center bg-primary/10 p-3">
          <UIcon
            name="i-lucide-smartphone"
            class="size-6 text-primary"
          />
        </div>
        <h3 class="text-xl font-bold text-highlighted md:text-2xl">
          Schreiben Sie uns über die Praxis App
        </h3>
      </div>
      <p class="text-base text-default">
        Für Fragen an das Praxisteam nutzen Sie bitte die App <strong>„Meine pädiatrische Praxis“</strong> — sicher,
        datenschutzkonform und direkt aus Ihrem Alltag heraus. Der Chat wird während der Öffnungszeiten zeitnah gelesen;
        wir antworten je nach Dringlichkeit, spätestens nach 2–3 Werktagen.
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
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
      <div class="space-y-4">
        <p class="text-sm font-medium text-highlighted">
          App herunterladen
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
          <Icon
            name="i-lucide-bell"
            class="shrink-0"
          />
          Tipp: Eltern sollten ein gemeinsames Login nutzen, damit der Chat richtig funktioniert.
        </p>
      </div>
    </div>
  </BaseCard>
</template>
