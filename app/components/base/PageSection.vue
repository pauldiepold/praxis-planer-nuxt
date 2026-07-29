<script setup lang="ts">
defineProps<{
  id: string
  heading?: string
  bgClass?: string
}>()
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="heading ? `${id}-heading` : undefined"
    class="py-10"
    :class="bgClass"
  >
    <UContainer class="space-y-10">
      <BaseSectionHeading
        v-if="heading"
        :id="`${id}-heading`"
        :heading="heading"
      />
      <slot />
    </UContainer>
  </section>
</template>
