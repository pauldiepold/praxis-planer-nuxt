<template>
  <div class="flex min-h-screen flex-col">
    <LayoutNavbar />

    <main class="flex-grow py-4 md:py-8 max-w-[2000px] mx-auto w-full">
      <slot />
    </main>

    <LayoutFooter />
  </div>
</template> 