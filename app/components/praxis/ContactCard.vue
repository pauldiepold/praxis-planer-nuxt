<script setup lang="ts">
export type PraxisContact = {
  name: string
  doctorsLine: string
  orgLine: string
  street: string
  zipCity: string
  phoneDisplay: string
  phoneTel: string
  faxDisplay: string
  mapsUrl: string
}

export type PraxisAccessibility = {
  summary: string
  details: string
}

export type PraxisParking = {
  summary: string
  details: string
}

defineProps<{
  contact: PraxisContact
  accessibility: PraxisAccessibility
  parking: PraxisParking
}>()
</script>

<template>
  <UCard>
    <template #header>
      <div class="space-y-1">
        <p class="text-base font-semibold text-highlighted">
          {{ contact.name }}
        </p>
        <p class="text-sm text-muted">
          {{ contact.doctorsLine }}
        </p>
        <p class="text-xs text-muted">
          {{ contact.orgLine }}
        </p>
      </div>
    </template>

    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <UIcon
            name="i-lucide-map-pin"
            class="mt-0.5 size-5 text-primary"
          />
          <div class="space-y-0.5">
            <p class="text-sm font-medium text-highlighted">
              Adresse
            </p>
            <p class="text-sm text-default">
              {{ contact.street }}
            </p>
            <p class="text-sm text-default">
              {{ contact.zipCity }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <UButton
            :to="contact.mapsUrl"
            target="_blank"
            variant="outline"
            color="neutral"
            icon="i-lucide-navigation"
          >
            In Google Maps öffnen
          </UButton>
        </div>
      </div>

      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <UIcon
            name="i-lucide-phone"
            class="mt-0.5 size-5 text-primary"
          />
          <div class="space-y-0.5">
            <p class="text-sm font-medium text-highlighted">
              Telefon
            </p>
            <a
              class="text-sm font-semibold text-primary hover:underline"
              :href="contact.phoneTel"
            >
              {{ contact.phoneDisplay }}
            </a>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <UIcon
            name="i-lucide-printer"
            class="mt-0.5 size-5 text-muted"
          />
          <div class="space-y-0.5">
            <p class="text-sm font-medium text-highlighted">
              Telefax
            </p>
            <p class="text-sm text-default">
              {{ contact.faxDisplay }}
            </p>
          </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <div class="rounded-lg bg-elevated/50 p-3 ring-1 ring-default">
            <div class="mb-1 flex items-center gap-2">
              <UIcon
                name="i-lucide-accessibility"
                class="size-4 text-primary"
              />
              <p class="text-sm font-medium text-highlighted">
                Barrierefreiheit
              </p>
            </div>
            <p class="text-xs text-muted">
              {{ accessibility.summary }}
            </p>
            <p class="mt-1 text-xs text-muted">
              {{ accessibility.details }}
            </p>
          </div>

          <div class="rounded-lg bg-elevated/50 p-3 ring-1 ring-default">
            <div class="mb-1 flex items-center gap-2">
              <UIcon
                name="i-lucide-car"
                class="size-4 text-primary"
              />
              <p class="text-sm font-medium text-highlighted">
                Parken
              </p>
            </div>
            <p class="text-xs text-muted">
              {{ parking.summary }}
            </p>
            <p class="mt-1 text-xs text-muted">
              {{ parking.details }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
