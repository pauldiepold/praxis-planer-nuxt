<script setup lang="ts">
onMounted(() => {
  useEntitiesStore().fetchAll()
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <PflegeNavbar />

    <main class="flex-grow py-4 md:py-8 max-w-[2000px] mx-auto w-full">
      <slot />
    </main>

    <PflegeFooter />
  </div>
</template>
