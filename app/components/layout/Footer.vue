<template>
  <footer class="bg-muted py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center justify-center space-y-6">
        <div class="text-center">
          <p class="mb-2">
            <ULink
              href="https://github.com/pauldiepold"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors"
            >
              © {{ new Date().getFullYear() }} - Paul Diepold
            </ULink>
          </p>

          <p class="text-muted text-sm">
            Entwickelt mit
            <ULink
              href="https://nuxt.com"
              target="_blank"
              class="hover:text-primary transition-colors"
            >Nuxt.js</ULink>
          </p>
        </div>

        <UButton
          href="https://github.com/pauldiepold/praxis-pflege-planer-nuxt"
          target="_blank"
          icon="i-lucide-github"
          variant="ghost"
          class="hover:text-primary transition-colors"
        >
          zum GitHub-Repo
        </UButton>
      </div>

      <p class="text-muted text-sm text-center mt-4">
        Johanna stinkt
      </p>
    </div>
  </footer>
</template>
