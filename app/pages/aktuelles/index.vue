<script setup lang="ts">
import type { NeuigkeitCardItem } from '~/components/NeuigkeitCard.vue'

definePageMeta({
  title: 'Aktuelle Informationen',
})

useHead({
  title: 'Aktuelle Informationen – Kinder- und Jugendarztpraxis Northeim',
})

const { data: neuigkeiten } = await useAsyncData('aktuelles-archiv', () =>
  queryCollection('aktuelles')
    .where('hidden', '=', false)
    .order('date', 'DESC')
    .all(),
)
</script>

<template>
  <div>
    <UContainer>
      <div class="max-w-4xl mx-auto py-12">
        <NuxtLink
          to="/"
          class="text-primary font-medium text-sm inline-flex items-center gap-1 hover:underline mb-8"
        >
          <UIcon
            name="i-lucide-chevron-left"
            class="size-4 shrink-0"
          />
          Zur Startseite
        </NuxtLink>

        <div class="flex items-center gap-3 mb-8">
          <div class="h-1 w-12 rounded-full bg-[var(--praxis-accent)]" />
          <h1 class="text-2xl md:text-3xl font-bold text-highlighted">
            Aktuelle Informationen
          </h1>
        </div>

        <p class="text-muted-foreground mb-8">
          Alle Neuigkeiten und Hinweise unserer Praxis.
        </p>

        <div class="space-y-6">
          <NeuigkeitCard
            v-for="item in neuigkeiten"
            :key="item.path"
            :item="item as NeuigkeitCardItem"
          />
        </div>

        <p class="mt-10">
          <NuxtLink
            to="/"
            class="text-primary font-medium text-sm inline-flex items-center gap-1 hover:underline"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="size-4 shrink-0"
            />
            Zur Startseite
          </NuxtLink>
        </p>
      </div>
    </UContainer>
  </div>
</template>
