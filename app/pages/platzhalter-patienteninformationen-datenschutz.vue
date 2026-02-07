<script setup lang="ts">
definePageMeta({
  title: 'Patienteninformationen Datenschutz',
})

useHead({
  title: 'Patienteninformationen Datenschutz',
})
</script>

<template>
  <div>
    <section class="bg-primary-50 py-12">
      <UContainer>
        <h1 class="mb-2 text-3xl font-bold text-highlighted md:text-4xl">
          Patienteninformationen zum Datenschutz
        </h1>
        <p class="text-muted">
          Der Download wird hier bereitgestellt. Bitte später erneut prüfen.
        </p>
      </UContainer>
    </section>
    <UContainer class="py-10">
      <p class="text-muted">
        <NuxtLink
          to="/datenschutz"
          class="text-primary hover:underline"
        >
          Zurück zur Datenschutzerklärung
        </NuxtLink>
      </p>
    </UContainer>
  </div>
</template>
