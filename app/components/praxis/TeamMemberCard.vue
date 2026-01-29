<script setup lang="ts">
defineProps<{
  name: string
  role: string
}>()
</script>

<template>
  <PraxisCard class="text-center transition-shadow hover:shadow-md">
    <div class="mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
      <UIcon
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
  </PraxisCard>
</template>
