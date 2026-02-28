<script setup lang="ts">
/** Einfache Karte: optional farbiger Streifen links, Rahmen-Varianten. green/yellow/red für Neuigkeiten. */
type LeftBorder = 'primary' | 'accent' | 'sky-blue' | 'muted' | 'green' | 'yellow' | 'red' | ''

const props = withDefaults(
  defineProps<{
    leftBorder?: LeftBorder
    subtleBorder?: boolean
    noBorder?: boolean
    contentClass?: string
  }>(),
  { leftBorder: '', subtleBorder: false, noBorder: false, contentClass: '' },
)

const rootClasses = computed(() => {
  const base = 'rounded-lg bg-default text-default shadow-sm'
  const border = props.noBorder
    ? ''
    : props.subtleBorder
      ? 'border border-primary/20'
      : 'border border-default'
  const left = props.leftBorder ? 'praxis-card--left' : ''
  return [base, border, left].filter(Boolean).join(' ')
})
</script>

<template>
  <div
    class="praxis-card"
    :class="rootClasses"
    :data-left="leftBorder || undefined"
  >
    <div
      v-if="$slots.header"
      class="flex flex-col gap-1.5 p-6 pb-2"
    >
      <slot name="header" />
    </div>
    <div
      class="p-6"
      :class="[{ 'pt-0': $slots.header }, contentClass]"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.praxis-card--left[data-left="primary"] { border-left: 4px solid var(--ui-primary); }
.praxis-card--left[data-left="accent"] { border-left: 4px solid var(--praxis-accent); }
.praxis-card--left[data-left="sky-blue"] { border-left: 4px solid var(--praxis-sky-blue); }
.praxis-card--left[data-left="muted"] { border-left: 4px solid var(--ui-color-neutral-300); }
.praxis-card--left[data-left="green"] { border-left: 4px solid var(--ui-primary); }
.praxis-card--left[data-left="yellow"] { border-left: 4px solid var(--neuigkeit-yellow, #eab308); }
.praxis-card--left[data-left="red"] { border-left: 4px solid var(--neuigkeit-red, #ef4444); }
</style>
