<script setup lang="ts">
export type EmergencyNumber = {
  label: string
  numberDisplay: string
  numberTel: string
  description: string
}

export type PoisonCenter = {
  city: string
  numberDisplay: string
  numberTel: string
}

export type EmergencyService = {
  title: string
  addressLine1: string
  addressLine2: string
  mapsUrl: string
  phoneDisplay: string
  phoneTel: string
  hours: ReadonlyArray<Readonly<{ day: string, time: string }>>
  note: string
}

export type Clinic = {
  name: string
  address: string
  phoneDisplay: string
  phoneTel: string
  mapsUrl: string
  websiteUrl?: string
  extra?: string
}

defineProps<{
  emergencyNumbers: ReadonlyArray<EmergencyNumber>
  poisonCenters: ReadonlyArray<PoisonCenter>
  gizNordUrl: string
  emergencyService: EmergencyService
  clinics: ReadonlyArray<Clinic>
}>()
</script>

<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-siren"
            class="size-5 text-error"
          />
          <p class="text-base font-semibold text-highlighted">
            Notfälle
          </p>
        </div>
      </template>

      <div class="grid gap-4 lg:grid-cols-2">
        <div
          v-for="item in emergencyNumbers"
          :key="item.label"
          class="rounded-lg bg-elevated/50 p-4 ring-1 ring-default"
        >
          <p class="text-xs font-medium text-muted">
            {{ item.description }}
          </p>
          <p class="mt-1 text-sm font-semibold text-highlighted">
            {{ item.label }}
          </p>
          <a
            class="mt-2 inline-flex items-center gap-2 text-2xl font-bold text-error hover:underline"
            :href="item.numberTel"
          >
            <UIcon
              name="i-lucide-phone"
              class="size-5"
            />
            {{ item.numberDisplay }}
          </a>
        </div>
      </div>

      <div class="mt-6 space-y-3">
        <UAlert
          color="warning"
          variant="subtle"
          icon="i-lucide-list-checks"
          title="Achtung: Bitte bereithalten"
          description="Wer / Was / Wann / Wie / Wo / Wieviele?"
        />

        <div class="rounded-lg bg-elevated/50 p-4 ring-1 ring-default">
          <p class="text-sm font-semibold text-highlighted">
            Alternative Giftnotrufzentralen (unvollständig)
          </p>
          <div class="mt-2 flex flex-wrap gap-3 text-sm">
            <a
              v-for="c in poisonCenters"
              :key="c.city"
              class="text-primary hover:underline"
              :href="c.numberTel"
            >
              {{ c.city }}: {{ c.numberDisplay }}
            </a>
          </div>
          <div class="mt-3">
            <UButton
              :to="gizNordUrl"
              target="_blank"
              variant="outline"
              color="neutral"
              icon="i-lucide-external-link"
            >
              Weitere Infos zu Vergiftungen (GIZ-Nord)
            </UButton>
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-hospital"
            class="size-5 text-primary"
          />
          <p class="text-base font-semibold text-highlighted">
            Kinderärztlicher Bereitschaftsdienst
          </p>
        </div>
      </template>

      <div class="grid gap-6 lg:grid-cols-2">
        <div class="space-y-2">
          <p class="text-sm text-muted">
            {{ emergencyService.note }}
          </p>
          <p class="text-sm font-medium text-highlighted">
            Adresse
          </p>
          <a
            class="text-sm text-primary hover:underline"
            :href="emergencyService.mapsUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ emergencyService.addressLine1 }}<br>
            {{ emergencyService.addressLine2 }}
          </a>

          <div class="pt-2">
            <p class="text-sm font-medium text-highlighted">
              Telefon (nur während der Sprechzeiten)
            </p>
            <a
              class="text-sm font-semibold text-primary hover:underline"
              :href="emergencyService.phoneTel"
            >
              {{ emergencyService.phoneDisplay }}
            </a>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-sm font-medium text-highlighted">
            Sprechzeiten
          </p>
          <div class="overflow-hidden rounded-lg ring-1 ring-default">
            <table class="w-full text-sm">
              <thead class="bg-elevated/50">
                <tr>
                  <th class="px-4 py-2 text-left font-medium text-highlighted">
                    Tag
                  </th>
                  <th class="px-4 py-2 text-left font-medium text-highlighted">
                    Zeit
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-default">
                <tr
                  v-for="hour in emergencyService.hours"
                  :key="hour.day"
                  class="hover:bg-elevated/50"
                >
                  <td class="px-4 py-2 text-muted">
                    {{ hour.day }}
                  </td>
                  <td class="px-4 py-2 font-medium text-highlighted">
                    {{ hour.time }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="pt-2 text-sm text-muted">
            Außerhalb dieser Sprechzeiten führen die Kinderkliniken die Behandlung für Notfallpatient:innen fort.
          </p>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-map"
            class="size-5 text-primary"
          />
          <p class="text-base font-semibold text-highlighted">
            Nahegelegene Kinderkliniken
          </p>
        </div>
      </template>

      <div class="grid gap-4 lg:grid-cols-2">
        <div
          v-for="clinic in clinics"
          :key="clinic.name"
          class="rounded-lg bg-elevated/50 p-4 ring-1 ring-default"
        >
          <p class="text-sm font-semibold text-highlighted">
            {{ clinic.name }}
          </p>
          <p class="mt-1 text-sm text-muted">
            {{ clinic.address }}
          </p>
          <p
            v-if="clinic.extra"
            class="mt-1 text-xs text-muted"
          >
            {{ clinic.extra }}
          </p>

          <div class="mt-3 flex flex-wrap gap-2">
            <UButton
              :to="clinic.phoneTel"
              variant="outline"
              color="neutral"
              icon="i-lucide-phone"
              size="sm"
            >
              {{ clinic.phoneDisplay }}
            </UButton>
            <UButton
              :to="clinic.mapsUrl"
              target="_blank"
              variant="outline"
              color="neutral"
              icon="i-lucide-map-pin"
              size="sm"
            >
              Karte
            </UButton>
            <UButton
              v-if="clinic.websiteUrl"
              :to="clinic.websiteUrl"
              target="_blank"
              variant="link"
              color="primary"
              icon="i-lucide-external-link"
              size="sm"
            >
              Website
            </UButton>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
