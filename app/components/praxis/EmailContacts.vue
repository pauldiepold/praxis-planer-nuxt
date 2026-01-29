<script setup lang="ts">
export type PraxisEmail = {
  label: string
  email: string
}

defineProps<{
  emails: ReadonlyArray<PraxisEmail>
}>()
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-mail"
          class="size-5 text-primary"
        />
        <p class="text-base font-semibold text-highlighted">
          E-Mail-Kontakt
        </p>
      </div>
    </template>

    <UAlert
      class="mb-4"
      color="neutral"
      variant="subtle"
      icon="i-lucide-info"
      title="Hinweis"
      description="Ihre Post wird zwar zeitnah, jedoch nicht verlässlich tagesaktuell beantwortet. Für schnellere Kommunikation empfehlen wir die Praxis App."
    />

    <div class="grid gap-3 sm:grid-cols-3">
      <div
        v-for="item in emails"
        :key="item.email"
        class="rounded-lg bg-elevated/50 p-4 ring-1 ring-default"
      >
        <p class="text-xs font-medium text-muted">
          {{ item.label }}
        </p>
        <a
          class="mt-1 block break-all text-sm font-semibold text-primary hover:underline"
          :href="`mailto:${item.email}`"
        >
          {{ item.email }}
        </a>
      </div>
    </div>
  </UCard>
</template>
