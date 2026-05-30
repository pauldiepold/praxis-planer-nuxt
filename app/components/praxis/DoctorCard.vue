<script setup lang="ts">
defineProps<{
  name: string
  title: string
  shortBio: string
  qualifications: readonly string[]
  fullBio: readonly string[]
  interests: readonly { icon: string, text: string }[]
  personal: string
  /** Pfad zum Porträt (z.B. /team/doctors/diepold.jpg). Wenn nicht gesetzt, wird ein Platzhalter-Icon angezeigt. */
  image?: string
}>()
</script>

<template>
  <article>
    <!-- Layout B: Bild links (hochkant), Text rechts; mobil: Bild oben, nicht volle Breite -->
    <div class="flex flex-col lg:flex-row lg:items-start">
      <!-- Bild: Porträt 3:4, leicht abgerundet, dezenter Schatten; mobil zentriert und schmaler -->
      <div class="relative aspect-[3/4] w-full max-w-[220px] shrink-0 overflow-hidden rounded-xl bg-muted shadow-md mx-auto lg:mx-0 lg:max-w-[280px] lg:w-2/5">
        <img
          v-if="image"
          :src="image"
          :alt="name"
          class="h-full w-full object-cover object-top"
        >
        <div
          v-else
          class="flex h-full w-full items-center justify-center text-muted-foreground/50"
        >
          <UIcon
            name="i-lucide-user"
            class="size-24"
          />
        </div>
      </div>

      <!-- Text: Name, Titel, Kurz-Bio -->
      <div class="flex flex-1 flex-col justify-center px-4 py-5 sm:px-6 lg:py-6 lg:pt-0">
        <h3 class="text-xl font-bold text-highlighted md:text-2xl">
          {{ name }}
        </h3>
        <p class="mt-1 text-sm text-primary">
          {{ title }}
        </p>
        <p class="mt-4 text-sm text-muted">
          {{ shortBio }}
        </p>
      </div>
    </div>

    <div class="mt-4 space-y-6 pt-4 px-4 sm:px-6 lg:mt-6 lg:pt-6">
      <div>
        <h4 class="mb-3 flex items-center gap-2 font-semibold text-highlighted">
          <UIcon
            name="i-lucide-badge-check"
            class="size-4 shrink-0 text-primary"
          />
          Zusatzbezeichnungen
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
            class="size-4 shrink-0 text-primary"
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
          >
            <BaseIconWithText
              :icon="item.icon"
              size="sm"
              icon-class="text-primary"
            >
              {{ item.text }}
            </BaseIconWithText>
          </li>
        </ul>
      </div>

      <div v-if="personal">
        <h4 class="mb-2 font-semibold text-highlighted">
          Privates
        </h4>
        <p class="border-l-2 border-primary pl-4 text-sm italic text-muted">
          {{ personal }}
        </p>
      </div>
    </div>
  </article>
</template>
