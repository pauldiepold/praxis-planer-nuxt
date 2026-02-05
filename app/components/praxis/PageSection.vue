<script setup lang="ts">
defineProps<{
  id: string
  heading: string
  bgClass: string
}>()
</script>

<template>
  <section
    aria-labelledby="kontakt"
    class="py-10"
    :class="bgClass"
  >
    <UContainer class="py-10 space-y-10">
      <PraxisSectionHeading
        :id="id"
        :heading="heading"
      />
    </UContainer>
  </section>
</template>
