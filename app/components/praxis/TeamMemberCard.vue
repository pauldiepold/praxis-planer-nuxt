<script setup lang="ts">
defineProps<{
  name: string
  role: string
  /** Pfad zum Porträt (z.B. /team/staff/regine-feil.jpg). Wenn nicht gesetzt, wird ein Platzhalter-Icon angezeigt. */
  image?: string
  objectFit?: 'cover' | 'contain'
}>()
</script>

<template>
  <BaseCard class="text-center transition-shadow hover:shadow-md" content-class="p-3 sm:p-4">
    <div class="mx-auto mb-3 flex aspect-[3/4] w-40 items-center justify-center overflow-hidden rounded-2xl bg-primary/10 sm:w-32">
      <img
        v-if="image"
        :src="image"
        :alt="name"
        :class="objectFit === 'contain' ? 'h-full w-full object-contain' : 'h-full w-full object-cover object-top'"
      >
      <UIcon
        v-else
        name="i-lucide-user-round"
        class="size-12 text-primary opacity-60"
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
