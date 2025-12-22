<script setup lang="ts">
import { de } from '@nuxt/ui/locale'

useHead({
  htmlAttrs: {
    lang: 'de',
  },
  title: 'Praxis Pflege Planer',
})
</script>

<template>
  <UApp
    :locale="de"
    :toaster="{
      position: 'top-right',
      duration: 3000,
    }"
  >
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator
      color="#ffb700"
      :height="2"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
