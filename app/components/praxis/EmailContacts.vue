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
  <PraxisCard>
    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-mail"
          class="size-5 shrink-0 text-muted"
        />
        <p class="text-sm text-muted">
          Ihre Post wird zwar zeitnah, jedoch nicht verlässlich tagesaktuell beantwortet. Für schnellere Kommunikation empfehlen wir die Praxis App.
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-3">
        <div
          v-for="item in emails"
          :key="item.email"
          class="rounded-lg bg-elevated/50 p-4"
        >
          <p class="text-sm font-medium text-muted">
            {{ item.label }}
          </p>
          <a
            class="mt-2 block break-all text-sm font-semibold hover:text-primary hover:underline"
            :href="`mailto:${item.email}`"
          >
            {{ item.email }}
          </a>
        </div>
      </div>
    </div>
  </PraxisCard>
</template>
