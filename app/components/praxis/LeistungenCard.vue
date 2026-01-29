<script setup lang="ts">
/**
 * Einzelne Leistungs-Kategorie im Stil der Lovable-Version:
 * Icon-Box, Titel, Service-Liste mit Bullets, optionaler Hinweis.
 */
defineProps<{
  title: string
  icon: string
  colorClass: string
  bgColorClass: string
  /** Klasse für den Bullet-Punkt (z. B. bg-primary). */
  dotClass: string
  services: string[]
  note?: string
}>()
</script>

<template>
  <PraxisCard class="h-full transition-shadow hover:shadow-lg">
    <template #header>
      <div
        :class="[bgColorClass, 'flex h-12 w-12 items-center justify-center rounded-xl']"
      >
        <UIcon
          :name="icon"
          :class="[colorClass, 'size-6']"
        />
      </div>
      <h3 class="text-xl font-semibold text-highlighted">
        {{ title }}
      </h3>
    </template>
    <ul class="space-y-2">
      <li
        v-for="(service, i) in services"
        :key="i"
        class="flex items-start gap-2 text-sm text-muted"
      >
        <span
          :class="[dotClass, 'mt-2 size-1.5 shrink-0 rounded-full']"
        />
        {{ service }}
      </li>
    </ul>
    <p
      v-if="note"
      class="mt-4 rounded-lg bg-muted p-3 text-xs text-muted"
    >
      ℹ️ {{ note }}
    </p>
  </PraxisCard>
</template>
