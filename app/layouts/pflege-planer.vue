<template>
  <div class="flex min-h-screen flex-col">
    <PflegeNavbar />

    <main class="flex-grow py-4 md:py-8">
      <UContainer>
        <slot />
      </UContainer>
    </main>

    <PflegeFooter />
  </div>
</template>
