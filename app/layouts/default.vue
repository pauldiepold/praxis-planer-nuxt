<template>
  <div class="flex min-h-screen flex-col">
    <LayoutNavbar />

    <main class="flex-grow py-4 md:py-8">
      <UContainer>
        <slot />
      </UContainer>
    </main>

    <LayoutFooter />
  </div>
</template>
