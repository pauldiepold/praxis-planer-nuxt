<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Startseite',
    to: '/',
    active: route.path === '/',
  },
  {
    label: 'Über uns',
    to: '/ueber-uns',
    active: route.path === '/ueber-uns',
  },
  {
    label: 'Leistungen',
    to: '/leistungen',
    active: route.path === '/leistungen',
  },
  {
    label: 'Patienteninfos',
    to: '/patienteninfos',
    active: route.path === '/patienteninfos',
  },
  {
    label: 'Termine & Kontakt',
    to: '/termine',
    active: route.path === '/termine',
  },
  {
    label: 'Notdienst',
    to: '/notdienst',
    active: route.path === '/notdienst',
  },
])
</script>

<template>
  <UHeader>
    <template #title>
      <div class="flex items-center gap-4">
        <UIcon
          name="i-praxis-logo"
          alt="Logo"
          class="size-12 text-black"
        />
        <div class="text-sm font-semibold leading-tight text-foreground">
          <p>Praxis für Kinder- und</p>
          <p>Jugendmedizin</p>
        </div>
      </div>
    </template>
    <!-- Desktop: Navigation rechtbündig (nur ab lg sichtbar) -->
    <template #right>
      <div class="hidden lg:flex items-center">
        <UNavigationMenu
          :items="items"
          :ui="{ list: 'gap-1', item: '!rounded-xl', link: 'px-3 !rounded-xl' }"
        />
      </div>
    </template>
    <!-- Mobile: Aufklappbares Menü mit vertikaler Navigation -->
    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        :ui="{ list: 'gap-0', item: '', link: 'px-3 py-2.5 rounded-lg' }"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
