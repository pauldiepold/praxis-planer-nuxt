<script setup lang="ts">
defineProps<{
  name: string
  role: string
  /** Pfad zum Porträt (z.B. /team/staff/regine-feil.jpg). Wenn nicht gesetzt, wird ein Platzhalter-Icon angezeigt. */
  image?: string
}>()
</script>

<template>
  <BaseCard class="text-center transition-shadow hover:shadow-md">
    <div class="mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
      <img
        v-if="image"
        :src="image"
        :alt="name"
        class="h-full w-full object-cover"
      >
      <UIcon
        v-else
        name="i-lucide-users"
        class="size-10 text-primary opacity-60"
      />
    </div>
    <h3 class="font-semibold text-highlighted">
      {{ name }}
    </h3>
    <p class="text-sm text-muted">
      {{ role }}
    </p>
  </BaseCard>
</template>
