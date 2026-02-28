<script setup lang="ts">
import type { NeuigkeitCardItem } from '~/components/NeuigkeitCard.vue'

const route = useRoute()

const { data: item } = await useAsyncData(
  () => `aktuelles-doc-${route.path}`,
  () => {
    const p = route.path
    if (!p || p === '/aktuelles' || p === '/aktuelles/') return Promise.resolve(null)
    return queryCollection('aktuelles').path(p).first()
  },
  { watch: [() => route.path] },
)

if (!item.value) {
  throw createError({ statusCode: 404, statusMessage: 'Eintrag nicht gefunden', fatal: true })
}

const { data: surround } = await useAsyncData(
  () => `${route.path}-surround`,
  () =>
    queryCollectionItemSurroundings('aktuelles', route.path, { fields: ['title', 'date'] })
      .where('hidden', '=', false)
      .order('date', 'DESC'),
  { watch: [() => route.path] },
)

const title = `${item.value.title} – Aktuelle Informationen`
useSeoMeta({
  title,
  ogTitle: title,
  description: 'Aktuelle Informationen und Neuigkeiten unserer Praxis.',
  ogDescription: 'Aktuelle Informationen und Neuigkeiten unserer Praxis.',
})

definePageMeta({
  title: 'Aktuelle Informationen',
})
</script>

<template>
  <div>
    <UContainer>
      <div class="max-w-4xl mx-auto py-12">
        <NuxtLink
          to="/aktuelles"
          class="text-primary font-medium text-sm inline-flex items-center gap-1 hover:underline mb-8"
        >
          <UIcon
            name="i-lucide-chevron-left"
            class="size-4 shrink-0"
          />
          Alle Neuigkeiten
        </NuxtLink>

        <NeuigkeitCard
          :item="item as NeuigkeitCardItem"
        />

        <UContentSurround
          v-if="surround?.length"
          :surround="surround"
          class="mt-10"
        />

        <p class="mt-10">
          <NuxtLink
            to="/aktuelles"
            class="text-primary font-medium text-sm inline-flex items-center gap-1 hover:underline"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="size-4 shrink-0"
            />
            Alle Neuigkeiten
          </NuxtLink>
        </p>
      </div>
    </UContainer>
  </div>
</template>
