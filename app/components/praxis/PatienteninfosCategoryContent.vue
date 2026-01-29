<script setup lang="ts">
defineProps<{
  description: string
  topics?: string[]
  links: { name: string; url: string }[]
}>()
</script>

<template>
  <div class="pl-14">
    <p class="mb-4 text-sm text-muted">
      {{ description }}
    </p>

    <div
      v-if="topics?.length"
      class="mb-6"
    >
      <p class="mb-3 text-sm font-medium text-highlighted">
        Verfügbare Themen:
      </p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="topic in topics"
          :key="topic"
          class="rounded-full bg-secondary px-3 py-1.5 text-xs text-muted"
        >
          {{ topic }}
        </span>
      </div>
    </div>

    <ul class="space-y-2">
      <li
        v-for="link in links"
        :key="link.name"
      >
        <a
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <UIcon
            name="i-lucide-external-link"
            class="size-3"
          />
          {{ link.name }}
        </a>
      </li>
    </ul>
  </div>
</template>
