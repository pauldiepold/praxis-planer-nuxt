<script setup lang="ts">
/**
 * Eigenes Karten-Layout im Stil der Lovable-Version:
 * - Leichter Rahmen (border), minimaler Schatten (shadow-sm)
 * - Optional: farbiger linker Rand (primary, accent, sky-blue, muted)
 * - Optional: dezenter Rahmen (border-primary/20)
 */
type LeftBorderVariant = 'primary' | 'accent' | 'sky-blue' | 'muted' | ''

const props = withDefaults(
  defineProps<{
    /** Farbiger Streifen links (z. B. primary, accent). Leer = keiner. */
    leftBorder?: LeftBorderVariant
    /** Leichter farbiger Rahmen statt Standard-Rahmen (z. B. border-primary/20). */
    subtleBorder?: boolean
    /** Kein äußerer Rahmen (z. B. für Karten in einer Reihe). */
    noBorder?: boolean
    /** Zusätzliche Klassen für den Inhaltsbereich (z. B. p-0 für volle Breite). */
    contentClass?: string
  }>(),
  {
    leftBorder: '',
    subtleBorder: false,
    noBorder: false,
    contentClass: '',
  },
)

const cardClasses = computed(() => {
  const base = 'rounded-lg bg-default text-default shadow-sm'
  const border = props.noBorder
    ? ''
    : props.subtleBorder
      ? 'border border-primary/20'
      : 'border border-default'
  const left = props.leftBorder
    ? 'border-l-4 border-l-[var(--praxis-card-left)]'
    : ''
  return [base, border, left].filter(Boolean).join(' ')
})

const cardStyle = computed(() => {
  if (!props.leftBorder) return undefined
  const colors: Record<NonNullable<typeof props.leftBorder>, string> = {
    primary: 'var(--ui-primary)',
    accent: 'var(--praxis-accent, var(--ui-color-primary-400))',
    'sky-blue': 'var(--praxis-sky-blue, #1a8fd4)',
    muted: 'var(--ui-color-neutral-300)',
  }
  const color = colors[props.leftBorder as keyof typeof colors]
  return color ? { '--praxis-card-left': color } as Record<string, string> : undefined
})
</script>

<template>
  <div
    :class="cardClasses"
    :style="cardStyle"
  >
    <div
      v-if="$slots.header"
      class="flex flex-col gap-1.5 p-6 pb-0"
    >
      <slot name="header" />
    </div>
    <div
      class="p-6"
      :class="[
        { 'pt-0': $slots.header },
        props.contentClass,
      ]"
    >
      <slot />
    </div>
  </div>
</template>
