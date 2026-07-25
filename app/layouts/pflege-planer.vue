<script setup lang="ts">
// Dark Mode wird pro Planer-Seite via definePageMeta({ colorMode: 'dark' }) erzwungen,
// damit er nicht über den Storage auf die öffentliche Website durchschlägt.
onMounted(() => {
  useEntitiesStore().fetchAll()
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <PflegeNavbar />

    <main class="flex-grow py-4 md:py-8">
      <slot />
    </main>

    <PflegeFooter />
  </div>
</template>
