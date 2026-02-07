<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    icon: string
    /** sm: 4, md: 5, lg: 6 */
    size?: 'sm' | 'md' | 'lg'
    iconClass?: string
  }>(),
  { size: 'md' },
)

const iconSizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'size-4'
    case 'lg': return 'size-6'
    default: return 'size-5'
  }
})
</script>

<template>
  <div class="flex items-start gap-2 min-w-0">
    <UIcon
      :name="icon"
      :class="[iconSizeClass, iconClass, 'shrink-0']"
    />
    <span class="min-w-0">
      <slot />
    </span>
  </div>
</template>
