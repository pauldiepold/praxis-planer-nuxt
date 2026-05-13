<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'

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

const cardClass = computed(() => {
  if (border.value === 'red') {
    return 'rounded-lg border border-red-300 dark:border-red-900/60 border-l-[5px] border-l-red-600 dark:border-l-red-500 bg-red-100/70 dark:bg-red-950/25 shadow-sm'
  }
  if (border.value === 'yellow') {
    return 'rounded-lg border border-default border-l-4 border-l-[var(--neuigkeit-yellow,#eab308)] bg-default shadow-sm'
  }
  return 'rounded-lg border border-default border-l-4 border-l-primary bg-default shadow-sm'
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
  <div
    class="px-6 pb-3! pt-4"
    :class="cardClass"
  >
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5 sm:gap-3 mb-1.5">
      <time
        v-if="item.date"
        :datetime="item.date"
        class="text-sm text-muted shrink-0 whitespace-nowrap sm:order-2 sm:pt-1"
      >
        {{ formatDate(item.date) }}
      </time>
      <h3 class="font-semibold text-lg mb-2 leading-tight text-highlighted sm:order-1">
        {{ item.title }}
      </h3>
    </div>
    <div class="text-sm text-muted-foreground max-w-none [&_p]:my-1 [&_p]:leading-normal [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0 [&_li]:leading-normal [&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0">
      <ContentRenderer :value="item" />
    </div>
  </div>
</template>
