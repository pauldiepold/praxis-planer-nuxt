<script setup lang="ts">
defineProps<{
  name: string
  title: string
  shortBio: string
  qualifications: string[]
  fullBio: string[]
  interests: { icon: string; text: string }[]
  personal: string
}>()
</script>

<template>
  <PraxisCard
    no-border
    content-class="p-0 overflow-hidden"
  >
    <div class="bg-gradient-to-r from-primary to-primary-800 p-6 text-primary-foreground">
      <div class="flex items-start gap-5">
        <div class="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary-foreground/20">
          <UIcon
            name="i-lucide-user"
            class="size-14 opacity-60"
          />
        </div>
        <div>
          <h3 class="text-xl font-bold">
            {{ name }}
          </h3>
          <p class="text-primary-foreground/80">
            {{ title }}
          </p>
          <p class="mt-2 text-sm text-primary-foreground/70">
            {{ shortBio }}
          </p>
        </div>
      </div>
    </div>

    <div class="space-y-6 p-6">
      <div>
        <h4 class="mb-2 font-semibold text-highlighted">
          Schwerpunkte
        </h4>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="qual in qualifications"
            :key="qual"
            class="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
          >
            {{ qual }}
          </span>
        </div>
      </div>

      <div>
        <h4 class="mb-3 flex items-center gap-2 font-semibold text-highlighted">
          <UIcon
            name="i-lucide-award"
            class="size-4 text-primary"
          />
          Werdegang
        </h4>
        <ul class="space-y-2 text-sm text-muted">
          <li
            v-for="(item, i) in fullBio"
            :key="i"
            class="flex items-start gap-2"
          >
            <span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            {{ item }}
          </li>
        </ul>
      </div>

      <div>
        <h4 class="mb-3 font-semibold text-highlighted">
          Engagement
        </h4>
        <ul class="space-y-2 text-sm text-muted">
          <li
            v-for="(item, i) in interests"
            :key="i"
            class="flex items-center gap-2"
          >
            <UIcon
              :name="item.icon"
              class="size-4 text-primary"
            />
            {{ item.text }}
          </li>
        </ul>
      </div>

      <p class="border-l-2 border-primary pl-4 text-sm italic text-muted">
        {{ personal }}
      </p>
    </div>
  </PraxisCard>
</template>
