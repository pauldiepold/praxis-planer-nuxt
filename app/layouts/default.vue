<!-- Default-Layout = öffentliche Praxis-Website (Header, Banner, Footer). -->
<script setup lang="ts">
if (import.meta.client) {
  useColorMode().preference = 'light'
}
</script>

<template>
  <div>
    <PraxisHeader />
    <PraxisDoctolibBanner />
    <UMain>
      <slot />
    </UMain>
    <PraxisFooter />
  </div>
</template>
