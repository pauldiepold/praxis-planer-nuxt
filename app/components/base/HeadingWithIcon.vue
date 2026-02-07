<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    icon: string
    /** inline = Icon links, Text rechts; stacked = Icon oben, Text unten; responsive = mobile inline, ab md stacked */
    layout?: 'inline' | 'stacked' | 'responsive'
    /** Wenn gesetzt: Icon in Box (z.B. bg-primary/10), sonst nur Icon */
    iconBoxClass?: string
    iconColorClass?: string
    /** Nur ohne iconBoxClass: sm=5, md=6, lg=10 */
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { size: 'lg' },
)

const layoutClass = computed(() => {
  const l = props.layout ?? 'inline'
  if (l === 'stacked') return 'flex flex-col gap-2'
  if (l === 'responsive') return 'flex flex-row items-start gap-3 md:flex-col md:gap-2'
  return 'flex items-start gap-3'
})

const iconWrapperClass = computed(() => {
  if (props.iconBoxClass) {
    return [props.iconBoxClass, 'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl']
  }
  return 'shrink-0'
})

const iconSizeClass = computed(() => {
  if (props.iconBoxClass) return 'size-6'
  switch (props.size) {
    case 'sm': return 'size-5'
    case 'md': return 'size-6'
    default: return 'size-10'
  }
})
</script>

<template>
  <div :class="layoutClass">
    <div :class="iconWrapperClass">
      <UIcon
        :name="icon"
        :class="[props.iconColorClass ?? 'text-primary', iconSizeClass]"
      />
    </div>
    <div class="min-w-0 flex-1">
      <slot />
    </div>
  </div>
</template>
