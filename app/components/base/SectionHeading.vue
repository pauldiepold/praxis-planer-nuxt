<script setup lang="ts">
defineProps<{
  id: string
  heading: string
}>()
</script>

<template>
  <div class="mb-6 flex items-center gap-3">
    <div class="h-1 w-12 rounded-full bg-primary" />
    <h2
      :id="id"
      class="text-2xl font-bold text-highlighted"
    >
      {{ heading }}
    </h2>
  </div>
</template>
