<script setup lang="ts">
/**
 * Einzelne Leistungs-Kategorie: Icon-Box, Titel, Service-Liste mit Bullets, optionaler Hinweis.
 * Icon und Bullets einheitlich gestaltet für runden Gesamteindruck.
 */
const props = withDefaults(
  defineProps<{
    title: string
    icon: string
    /** Hintergrund der Icon-Box. */
    iconBoxClass?: string
    /** Farbe des Icons. */
    iconColorClass?: string
    /** @deprecated Nutze iconBoxClass. */
    bgColorClass?: string
    /** @deprecated Nutze iconColorClass. */
    colorClass?: string
    dotClass: string
    services: readonly string[]
    note?: string
  }>(),
  {},
)

const iconBox = computed(() => props.iconBoxClass ?? props.bgColorClass ?? 'bg-primary/10')
const iconColor = computed(() => props.iconColorClass ?? props.colorClass ?? 'text-primary')
</script>

<template>
  <BaseCard class="flex h-full flex-col transition-shadow hover:shadow-lg">
    <template #header>
      <div class="mb-4">
        <BaseHeadingWithIcon
          :icon="icon"
          layout="inline"
          :icon-box-class="iconBox"
          :icon-color-class="iconColor"
        >
          <h3 class="text-xl font-semibold leading-tight text-highlighted">
            {{ title }}
          </h3>
        </BaseHeadingWithIcon>
      </div>
    </template>
    <ul class="list-none space-y-2 pl-0">
      <li
        v-for="(service, i) in services"
        :key="i"
        class="flex items-start gap-2 text-sm text-muted"
      >
        <span
          :class="[dotClass, 'mt-1.5 size-1.5 shrink-0 rounded-full']"
          aria-hidden
        />
        <span>{{ service }}</span>
      </li>
    </ul>
    <div
      v-if="$slots.note"
      class="mt-4 rounded-lg bg-muted p-3 text-xs text-muted [&_a]:underline [&_a]:text-primary"
    >
      <slot name="note" />
    </div>
    <p
      v-else-if="note"
      class="mt-4 rounded-lg bg-muted p-3 text-xs text-muted"
    >
      ℹ️ {{ note }}
    </p>
  </BaseCard>
</template>
