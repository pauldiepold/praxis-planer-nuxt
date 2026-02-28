<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'

/** Item-Typ für NeuigkeitCard (border = green | yellow | red, wird bei anderen Werten auf green gemappt). */
export type NeuigkeitCardItem = {
  path: string
  title: string
  date?: string
  border?: string
  body?: unknown
}

const props = defineProps<{
  item: NeuigkeitCardItem
}>()

const border = computed(() => {
  const b = props.item.border
  return (b === 'green' || b === 'yellow' || b === 'red' ? b : 'green') as 'green' | 'yellow' | 'red'
})

function formatDate(date: string | undefined): string {
  if (!date) return ''
  try {
    return format(parseISO(date), 'd. MMMM yyyy', { locale: de })
  }
  catch {
    return date
  }
}
</script>

<template>
  <BaseCard
    :left-border="border"
    content-class="!pb-2 !px-6"
  >
    <div class="flex flex-wrap items-baseline gap-2 mb-2">
      <h3 class="font-semibold text-lg text-highlighted">
        {{ item.title }}
      </h3>
      <time
        v-if="item.date"
        :datetime="item.date"
        class="text-sm text-muted"
      >
        {{ formatDate(item.date) }}
      </time>
    </div>
    <div class="text-muted-foreground text-sm prose prose-sm max-w-none dark:prose-invert [&>*:last-child]:mb-0">
      <ContentRenderer :value="item" />
    </div>
  </BaseCard>
</template>
