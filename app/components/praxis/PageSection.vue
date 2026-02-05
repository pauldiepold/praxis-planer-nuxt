<script setup lang="ts">
defineProps<{
  id: string
  heading?: string
  bgClass?: string
}>()
</script>

<template>
  <section
    :aria-labelledby="id"
    class="py-10"
    :class="bgClass"
  >
    <UContainer class="space-y-10">
      <PraxisSectionHeading
        v-if="heading"
        :id="id"
        :heading="heading"
      />
      <slot />
    </UContainer>
  </section>
</template>
