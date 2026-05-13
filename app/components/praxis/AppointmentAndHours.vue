<script setup lang="ts">
export type PraxisAppointmentLinks = {
  doctolibUrl: string
}

defineProps<{
  appointmentLinks: PraxisAppointmentLinks
}>()
</script>

<template>
  <div class="space-y-6">
    <div class="grid gap-4 lg:grid-cols-7">
      <BaseCard
        left-border="primary"
        class="lg:col-span-2"
      >
        <template #header>
          <BaseHeadingWithIcon
            icon="i-lucide-stethoscope"
            layout="inline"
            size="md"
          >
            <p class="font-semibold text-highlighted">
              Terminsprechstunde
            </p>
          </BaseHeadingWithIcon>
        </template>
        <p class="text-sm text-muted">
          Wir arbeiten im Rahmen einer Terminsprechstunde. Um unnötige Wartezeiten zu vermeiden, bitten wir Sie,
          vor jedem Besuch einen Termin online zu vereinbaren oder anzurufen.
        </p>
      </BaseCard>

      <BaseCard
        left-border="accent"
        class="lg:col-span-3"
      >
        <template #header>
          <BaseHeadingWithIcon
            icon="i-lucide-triangle-alert"
            layout="inline"
            size="md"
            icon-color-class="text-warning"
          >
            <p class="font-semibold text-highlighted">
              Akutsprechstunde
            </p>
          </BaseHeadingWithIcon>
        </template>
        <div class="space-y-2 text-sm text-muted">
          <p>
            Von Montag bis Freitag bieten wir am Ende des Vormittags eine Akutsprechstunde an – für Fieber oder andere
            akute Krankheitsbilder bzw. dringende Fragestellungen.
          </p>

          <ul class="text-sm list-disc space-y-2 pl-5">
            <li>Bitte melden Sie sich immer vorher an.</li>
            <li>Für schon länger andauernde Beschwerden ist diese Sprechstunde nicht geeignet.</li>
          </ul>
          <p>
            Einen Akuttermin können Sie frühestens einen Tag im Voraus online buchen –
            bitte suchen Sie nach einem Termin bei Herrn Holstein-Diepold oder Frau Dr. Diepold (nicht immer bieten beide
            die Akutsprechstunde an).
          </p>
        </div>
      </BaseCard>

      <BaseCard
        left-border="sky-blue"
        class="lg:col-span-2"
      >
        <template #header>
          <BaseHeadingWithIcon
            icon="i-lucide-video"
            layout="inline"
            size="md"
          >
            <p class="font-semibold text-highlighted">
              Videosprechstunde
            </p>
          </BaseHeadingWithIcon>
        </template>
        <p class="text-sm text-muted">
          Wir bieten auch eine Videosprechstunde an, die über den Online-Terminkalender zu buchen ist.
        </p>
      </BaseCard>
    </div>

    <div class="flex justify-center">
      <UButton
        :to="appointmentLinks.doctolibUrl"
        target="_blank"
        size="lg"
        color="secondary"
        class="text-black"
        icon="i-lucide-calendar"
      >
        Termin online buchen (Doctolib)
      </UButton>
    </div>

    <BaseCard subtle-border>
      <div class="space-y-3">
        <p class="font-semibold text-highlighted">
          Wichtige Hinweise zur Online-Terminvergabe
        </p>

        <ul class="text-sm text-muted list-disc space-y-3 pl-5">
          <li>
            <span class="font-semibold">Arztbindung beachten:</span> Insbesondere bei Vorsorgeuntersuchungen bitten wir Sie, die Arztbindung zu beachten.
          </li>
          <li>
            <span class="font-semibold">Vertretung:</span>
            Vertretungspatient:innen melden sich bitte telefonisch oder über die Praxis App.
            Die Online-Terminvergabe ist nur für Patient:innen unserer Praxis möglich.
          </li>
          <li>
            <span class="font-semibold">Neupatient:innen Neuropädiatrie:</span>
            Mit Überweisung in die neuropädiatrische oder Kopfschmerzsprechstunde von Frau Dr. Diepold
            kann auch für den Erstkontakt online gebucht werden!
          </li>
        </ul>
      </div>
    </BaseCard>
  </div>
</template>
