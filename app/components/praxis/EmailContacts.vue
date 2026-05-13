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
  <BaseCard>
    <div class="space-y-6">
      <UAlert
        color="warning"
        variant="subtle"
        icon="i-lucide-triangle-alert"
        title="Keine Terminanfragen per E-Mail"
        description="Für Termine nutzen Sie bitte die Praxis App oder die Online-Terminvergabe."
        :ui="{
          title: 'text-highlighted',
          description: 'text-default',
        }"
      />

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

      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-info"
          class="size-4 shrink-0 text-muted"
        />
        <p class="text-sm text-muted">
          E-Mails werden zeitnah, jedoch nicht tagesaktuell bearbeitet.
        </p>
      </div>
    </div>
  </BaseCard>
</template>
