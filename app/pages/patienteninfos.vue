<script setup lang="ts">
definePageMeta({
  title: 'Patienteninfos',
})

useSeoMeta({
  title: 'Patienteninfos',
  description: 'Verlässliche Anlaufstellen und Informationen zu Gesundheit, Bildschirmnutzung, Ernährung, Allergien und chronischen Erkrankungen.',
})

useBreadcrumbSchema([
  { name: 'Patienteninfos', item: '/patienteninfos' },
])

const { data: categories } = await useAsyncData('patienteninfos', () =>
  queryCollection('patienteninfos').order('stem', 'ASC').all(),
)

// Accordion-/Slot-ID aus dem Datei-stem ableiten
// (z.B. "patienteninfos/01.bildschirm" -> "bildschirm").
function idFromStem(stem: string) {
  return stem.split('/').pop()!.replace(/^\d+\./, '')
}

// DGKJ ist hartcodiert (eigene Komponente, siehe PraxisPatienteninfosDgkj) und
// wird zwischen "allergie" und "ernaehrung" ins Accordion eingeschoben.
const accordionItems = computed(() => {
  const items = (categories.value ?? []).map(c => ({
    label: c.title,
    icon: c.icon,
    value: idFromStem(c.stem),
    slot: idFromStem(c.stem),
  }))
  const ernaehrungIndex = items.findIndex(i => i.value === 'ernaehrung')
  const insertAt = ernaehrungIndex === -1 ? items.length : ernaehrungIndex
  items.splice(insertAt, 0, {
    label: 'DGKJ Elterninformationen',
    icon: 'i-lucide-book-open',
    value: 'dgkj',
    slot: 'dgkj',
  })
  return items
})
</script>

<template>
  <div>
    <!-- Hero + Einleitung -->
    <section class="bg-primary-50 py-12">
      <UContainer>
        <h1 class="mb-2 text-3xl font-bold text-highlighted md:text-4xl">
          Patienteninfos
        </h1>
        <p class="mb-4 text-muted">
          Hier finden Sie eine Sammlung hilfreicher Links und Informationen zu verschiedenen
          Gesundheitsthemen für Kinder und Familien.
        </p>
        <p class="max-w-2xl text-sm text-muted">
          Die Themen sind in Kategorien sortiert. Klicken Sie auf eine Karte, um passende Links zu
          Beratungsstellen, Infoportalen und Selbsthilfe zu sehen – von Medien über Ernährung bis
          zu lokalen Anlaufstellen.
        </p>
      </UContainer>
    </section>

    <section class="pb-16 pt-10">
      <UContainer>
        <div class="mx-auto max-w-4xl">
          <UAccordion
            type="single"
            collapsible
            :items="accordionItems"
            :ui="{
              item: 'rounded-xl border border-primary-100 bg-default shadow-sm transition-shadow mb-3 last:mb-0 hover:shadow-md px-6',
              trigger: 'py-5 hover:no-underline',
              content: '',
              leadingIcon: 'shrink-0 size-5',
            }"
          >
            <template
              v-for="cat in categories ?? []"
              :key="cat.stem"
              #[idFromStem(cat.stem)]
            >
              <PraxisPatienteninfosCategoryContent
                :description="cat.description"
                :links="[...cat.links]"
              />
            </template>
            <template #dgkj>
              <PraxisPatienteninfosDgkj />
            </template>
          </UAccordion>
        </div>
      </UContainer>
    </section>
  </div>
</template>
