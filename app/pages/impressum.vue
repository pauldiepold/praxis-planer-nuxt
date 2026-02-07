<script setup lang="ts">
definePageMeta({
  title: 'Impressum',
})

useHead({
  title: 'Impressum',
})
</script>

<template>
  <div>
    <!-- Hero Header (wie Kontakt) -->
    <section class="bg-primary-50 py-12">
      <UContainer>
        <h1 class="mb-2 text-3xl font-bold text-highlighted md:text-4xl">
          Impressum
        </h1>
        <p class="text-muted">
          Angaben gemäß § 5 TMG und verantwortliche Stellen
        </p>
      </UContainer>
    </section>

    <UContainer class="py-10">
      <p class="text-muted">
        Inhalt folgt.
      </p>
    </UContainer>
  </div>
</template>
