<script setup lang="ts">
const { loggedIn } = useUserSession()

if (loggedIn.value) {
  await navigateTo('/pflege-planer')
}

definePageMeta({
  title: 'Anmelden',
})

useHead({
  title: 'Anmelden',
})
</script>

<template>
  <div class="flex min-h-[60vh] items-center justify-center p-6">
    <div class="max-w-2xl mx-auto text-center">
      <div class="mb-8">
        <UIcon
          name="i-praxis-logo"
          alt="Praxis Logo"
          class="mx-auto size-24 text-black bg-gray-200 p-1 rounded-lg mb-6 block"
        />
        <h1 class="text-4xl font-bold mb-4">
          Praxis Pflege Planer
        </h1>
        <p class="text-lg text-muted mb-8">
          Bitte melde dich an, um auf die Anwendung zuzugreifen.
        </p>
      </div>

      <UButton
        href="/auth/github"
        external
        variant="solid"
        color="primary"
        size="lg"
        icon="i-lucide-github"
        class="text-lg px-4 py-2"
      >
        Mit GitHub anmelden
      </UButton>
    </div>
  </div>
</template>
