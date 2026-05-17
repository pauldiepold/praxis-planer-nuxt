<script setup lang="ts">
if (import.meta.client) {
  useColorMode().preference = 'dark'
}

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
