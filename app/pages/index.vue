<script setup lang="ts">
const { loggedIn, user } = useUserSession()

definePageMeta({
  title: 'Startseite',
  colorMode: 'dark'
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <h1 class="font-bold text-2xl text-(--ui-primary)">
      Praxis Planer
    </h1>

    <div v-if="loggedIn" class="flex flex-col items-center gap-4">
      <p class="text-lg">
        Willkommen, {{ user?.name }}!
      </p>
      <div class="flex gap-4">
        <UButton to="/schools" color="primary">
          Pflegeschulen verwalten
        </UButton>
      </div>
    </div>

    <div v-else class="flex flex-col items-center gap-4">
      <p class="text-lg text-center">
        Bitte melden Sie sich an, um den Praxis Planer zu nutzen
      </p>
      <UButton 
        href="/auth/github" 
        color="primary" 
        size="lg"
        external
        icon="i-lucide-github"
      >
        Mit GitHub anmelden
      </UButton>
    </div>
  </div>
</template>
