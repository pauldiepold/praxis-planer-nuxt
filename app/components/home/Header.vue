<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Startseite',
    to: '/home',
    active: route.path === '/home',
  },
  {
    label: 'Über uns',
    to: '/home/ueber-uns',
    active: route.path === '/home/ueber-uns',
  },
  {
    label: 'Leistungen',
    to: '/home/leistungen',
    active: route.path === '/home/leistungen',
  },
  {
    label: 'Patienteninfos',
    to: '/home/patienteninfos',
    active: route.path === '/home/patienteninfos',
  },
  {
    label: 'Kontakt & Notfälle',
    to: '/home/kontakt',
    active: route.path === '/home/kontakt',
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
          class="size-12 text-black "
        />
        <div class="hidden sm:block text-sm font-semibold leading-tight text-foreground">
          <p>
            Praxis für Kinder- und
          </p>
          <p>
            Jugendmedizin
          </p>
        </div>
      </div>
    </template>
    <UNavigationMenu
      :items="items"
      :ui="{ list: 'gap-1', item: '!rounded-xl', link: 'px-3 !rounded-xl' }"
    />
    <template #right>
      <UButton
        icon="i-lucide-calendar"
        to="https://www.doctolib.de/praxis/northeim/praxis-fuer-kinder-und-jugendmedizin-thomas-holstein-diepold-und-dr-katharina-diepold?utm_campaign=website-button&utm_source=praxis-fuer-kinder-und-jugendmedizin-thomas-holstein-diepold-und-dr-katharina-diepold-website-button&utm_medium=referral&utm_content=option-8&utm_term=praxis-fuer-kinder-und-jugendmedizin-thomas-holstein-diepold-und-dr-katharina-diepold"
        target="_blank"
      >
        Termin buchen
      </UButton>
    </template>
  </UHeader>
</template>
