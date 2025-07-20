<script setup lang="ts">
import { de } from '@nuxt/ui/locale'

useSeoMeta({
  description:
    'Pflege Planer für die Praxis.',
  ogTitle: 'Praxis-Pflege-Planer'
})

useHead({
  htmlAttrs: {
    lang: 'de'
  }
})
</script>

<template>
  <UApp
    :locale="de"
    :toaster="{
      position: 'top-center',
      duration: 3000
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