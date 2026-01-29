<script setup lang="ts">
export type PraxisPhoneHours = {
  summary: string
  days: ReadonlyArray<Readonly<{ day: string, time: string }>>
  note?: string
  phoneDisplay: string
  phoneTel: string
}

export type PraxisAppointmentLinks = {
  doctolibUrl: string
}

defineProps<{
  phoneHours: PraxisPhoneHours
  appointmentLinks: PraxisAppointmentLinks
}>()
</script>

<template>
  <div class="space-y-6">
    <PraxisCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-clock"
            class="size-5 text-primary"
          />
          <p class="text-base font-semibold text-highlighted">
            Telefonzeiten
          </p>
        </div>
      </template>

      <div class="grid gap-8 lg:grid-cols-2">
        <div class="space-y-2">
          <p class="text-sm text-muted">
            {{ phoneHours.summary }}
          </p>
          <ul class="space-y-1 text-sm">
            <li
              v-for="h in phoneHours.days"
              :key="h.day"
              class="flex items-center justify-between gap-3"
            >
              <span class="text-muted">{{ h.day }}</span>
              <span class="font-medium text-highlighted">{{ h.time }}</span>
            </li>
          </ul>
          <p
            v-if="phoneHours.note"
            class="pt-2 text-sm text-muted"
          >
            {{ phoneHours.note }}
          </p>
        </div>

        <div class="space-y-3">
          <UAlert
            color="neutral"
            variant="subtle"
            icon="i-lucide-phone"
            title="Telefon"
            :description="phoneHours.phoneDisplay"
          />
          <UButton
            :to="phoneHours.phoneTel"
            icon="i-lucide-phone-call"
            block
          >
            Jetzt anrufen
          </UButton>
        </div>
      </div>
    </PraxisCard>

    <div class="grid gap-4 lg:grid-cols-7">
      <PraxisCard
        left-border="primary"
        class="lg:col-span-2"
      >
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-stethoscope"
              class="size-5 text-primary"
            />
            <p class="font-semibold text-highlighted">
              Terminsprechstunde
            </p>
          </div>
        </template>
        <p class="text-sm text-muted">
          Wir arbeiten im Rahmen einer Terminsprechstunde. Um unnötige Wartezeiten zu vermeiden, bitten wir Sie,
          vor jedem Besuch einen Termin online zu vereinbaren oder anzurufen.
        </p>
      </PraxisCard>

      <PraxisCard
        left-border="accent"
        class="lg:col-span-3"
      >
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-triangle-alert"
              class="size-5 text-warning"
            />
            <p class="font-semibold text-highlighted">
              Akutsprechstunde
            </p>
          </div>
        </template>
        <div class="space-y-2 text-sm text-muted">
          <p>
            Von Montag bis Freitag bieten wir am Ende des Vormittags eine Akutsprechstunde an – für Fieber oder andere
            akute Krankheitsbilder bzw. dringende Fragestellungen.
          </p>
          <p class="font-medium text-highlighted">
            Für länger andauernde Beschwerden ist diese Sprechstunde nicht geeignet.
          </p>
          <p>
            Bitte melden Sie sich vorher an. Einen Akuttermin können Sie frühestens einen Tag im Voraus online buchen –
            bitte suchen Sie nach einem Termin bei Herrn Holstein-Diepold oder Frau Dr. Diepold (nicht immer bieten beide
            die Akutsprechstunde an).
          </p>
        </div>
      </PraxisCard>

      <PraxisCard
        left-border="sky-blue"
        class="lg:col-span-2"
      >
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-video"
              class="size-5 text-primary"
            />
            <p class="font-semibold text-highlighted">
              Videosprechstunde
            </p>
          </div>
        </template>
        <p class="text-sm text-muted">
          Wir bieten auch eine Videosprechstunde an, die über den Online-Terminkalender zu buchen ist.
        </p>
      </PraxisCard>
    </div>

    <PraxisCard subtle-border>
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <div class="space-y-0.5">
            <p class="text-base font-semibold text-highlighted">
              Termin online buchen
            </p>
            <p class="text-sm text-muted">
              Wir nutzen Doctolib für die Online-Terminvergabe.
            </p>
          </div>
          <UButton
            :to="appointmentLinks.doctolibUrl"
            target="_blank"
            icon="i-lucide-calendar"
          >
            Zu Doctolib
          </UButton>
        </div>
      </template>

      <div class="space-y-2 text-sm text-muted">
        <p>
          Einen Akuttermin können Sie ab einem Tag im Voraus buchen. Die Akutsprechstunde findet ohne feste Arztbindung
          statt – schauen Sie bitte bei beiden Ärzt:innen nach freien Terminen.
        </p>
        <ul class="list-disc space-y-1 pl-5">
          <li>
            Die Online-Terminvergabe ist nahezu ausschließlich für Patient:innen unserer Praxis möglich.
            Vertretungspatient:innen melden sich bitte telefonisch oder über die Praxis App.
          </li>
          <li>
            Neupatient:innen mit Überweisung in die neuropädiatrische oder Kopfschmerzsprechstunde von Frau Dr. Diepold
            können auch für den Erstkontakt online buchen.
          </li>
          <li>
            Für alle anderen Termine ist uns die Arztbindung wichtig. Bitte beachten Sie das insbesondere bei
            Vorsorgeuntersuchungen.
          </li>
        </ul>
        <p class="pt-2 font-medium text-highlighted">
          Herzlichen Dank für Ihre Unterstützung!
        </p>
      </div>
    </PraxisCard>
  </div>
</template>
