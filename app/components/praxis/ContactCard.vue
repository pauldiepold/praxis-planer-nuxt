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

export type PraxisPhoneHours = {
  summary: string
  days: ReadonlyArray<Readonly<{ day: string, time: string }>>
  note?: string
  phoneDisplay: string
  phoneTel: string
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
  phoneHours: PraxisPhoneHours
  accessibility: PraxisAccessibility
  parking: PraxisParking
}>()
</script>

<template>
  <div class="space-y-6">
    <BaseCard>
      <div class="grid gap-8 md:grid-cols-2">
        <div class="space-y-4">
          <BaseHeadingWithIcon
            icon="i-lucide-clock"
            layout="inline"
            size="md"
          >
            <p class="font-semibold text-highlighted">
              Telefonzeiten
            </p>
          </BaseHeadingWithIcon>

          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-muted">Montag – Freitag:</span>
              <span class="font-semibold">8:30 – 12:00 Uhr</span>
            </div>
            <p
              v-if="phoneHours.note"
              class="text-sm text-muted"
            >
              {{ phoneHours.note }}
            </p>
          </div>

          <div class="flex items-center gap-3 pt-2">
            <UIcon
              name="i-lucide-phone"
              class="size-5 shrink-0 text-primary"
            />
            <div>
              <p class="text-xs text-muted">
                Telefon
              </p>
              <a
                :href="contact.phoneTel"
                class="font-medium text-primary hover:underline"
              >
                {{ contact.phoneDisplay }}
              </a>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <UIcon
              name="i-lucide-printer"
              class="size-5 shrink-0 text-muted"
            />
            <div>
              <p class="text-xs text-muted">
                Telefax
              </p>
              <span class="text-highlighted">{{ contact.faxDisplay }}</span>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="space-y-0.5">
            <h3 class="font-semibold text-highlighted">
              {{ contact.name }}
            </h3>
            <p class="text-toned">
              {{ contact.doctorsLine }}
            </p>
            <p class="text-sm text-toned">
              {{ contact.orgLine }}
            </p>
          </div>

          <div class="flex items-start gap-3">
            <UIcon
              name="i-lucide-map-pin"
              class="mt-0.5 size-5 shrink-0 text-primary"
            />
            <div>
              <p class="text-highlighted">
                {{ contact.street }}
              </p>
              <p class="text-highlighted">
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
      </div>
    </BaseCard>
    <div class="mt-6 grid gap-6 sm:grid-cols-2">
      <BaseCard>
        <template #header>
          <div class="mb-1 flex items-center gap-2">
            <UIcon
              name="i-lucide-accessibility"
              class="size-4 text-primary"
            />
            <p class="text-sm font-medium text-highlighted">
              Barrierefreiheit
            </p>
          </div>
        </template>
        <p class="text-xs text-muted">
          {{ accessibility.summary }}
        </p>
        <p class="mt-1 text-xs text-muted">
          {{ accessibility.details }}
        </p>
      </BaseCard>

      <BaseCard>
        <template #header>
          <div class="mb-1 flex items-center gap-2">
            <UIcon
              name="i-lucide-car"
              class="size-4 text-primary"
            />
            <p class="text-sm font-medium text-highlighted">
              Parken
            </p>
          </div>
        </template>
        <p class="text-xs text-muted">
          {{ parking.summary }}
        </p>
        <p class="mt-1 text-xs text-muted">
          {{ parking.details }}
        </p>
      </BaseCard>
    </div>
  </div>
</template>
