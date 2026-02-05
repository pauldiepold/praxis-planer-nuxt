<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <UFooter class="bg-primary text-primary-50">
    <div class="container mx-auto px-4 py-6">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <!-- Logo & Praxis Info -->
        <div class="lg:col-span-1">
          <NuxtLink
            to="/home"
            class="inline-block mb-4"
          >
            <UIcon
              name="i-praxis-logo"
              class="size-12 text-white"
            />
          </NuxtLink>
          <p class="text-sm text-primary-50/80 mb-2">
            Praxis für Kinder- und Jugendmedizin
          </p>
          <p class="text-sm text-primary-50/80">
            Thomas Holstein-Diepold &<br>
            Dr. Katharina Diepold
          </p>
        </div>

        <!-- Kontakt -->
        <div>
          <h3 class="font-semibold text-lg mb-4">
            Kontakt
          </h3>
          <ul class="space-y-3 text-sm text-primary-50/80">
            <li class="flex items-start gap-2">
              <UIcon
                name="i-lucide-map-pin"
                class="h-4 w-4 mt-0.5 shrink-0"
              />
              <span>
                Albert-Schweitzer-Weg 7<br>
                37154 Northeim
              </span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon
                name="i-lucide-phone"
                class="h-4 w-4 shrink-0"
              />
              <a
                href="tel:+4955519099307"
                class="hover:text-primary-50 transition-colors"
              >
                05551 90 99 307
              </a>
            </li>
          </ul>
        </div>

        <!-- Telefonzeiten & Info -->
        <div>
          <h3 class="font-semibold text-lg mb-4">
            Telefonzeiten
          </h3>
          <ul class="space-y-2 text-sm text-primary-50/80">
            <li class="flex items-center gap-2">
              <UIcon
                name="i-lucide-clock"
                class="h-4 w-4 shrink-0"
              />
              <span>Mo – Fr: 8:30 – 12:00 Uhr</span>
            </li>
          </ul>
          <p class="text-xs text-primary-50/60 mt-3">
            Wir sind eine <span class="font-medium text-primary-50/80">Terminpraxis</span> mit täglicher Akutsprechstunde.
          </p>
          <p class="text-xs text-primary-50/60 mt-2">
            Außerhalb der Telefonzeiten nutzen Sie bitte die Praxis App.
          </p>
        </div>

        <!-- Schnelllinks: Termine und Notdienst zuerst (was Nutzer:innen am häufigsten suchen), dann Infoseiten -->
        <div>
          <h3 class="font-semibold text-lg mb-4">
            Schnelllinks
          </h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink
                to="/home/termine"
                class="text-primary-50/80 hover:text-primary-50 transition-colors"
              >
                Termine & Kontakt
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/home/notdienst"
                class="text-primary-50/80 hover:text-primary-50 transition-colors"
              >
                Notdienst
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/home/ueber-uns"
                class="text-primary-50/80 hover:text-primary-50 transition-colors"
              >
                Über uns
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/home/leistungen"
                class="text-primary-50/80 hover:text-primary-50 transition-colors"
              >
                Leistungen
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/home/patienteninfos"
                class="text-primary-50/80 hover:text-primary-50 transition-colors"
              >
                Patienteninfos
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-8 pt-4 border-t border-primary-50/20 text-primary-50/60">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-primary-50/60">
          <p>© Paul Diepold • {{ currentYear }}</p>
          <div class="flex gap-4 items-center">
            <NuxtLink
              to="/home/impressum"
              class="hover:text-primary-50 transition-colors"
            >
              Impressum
            </NuxtLink>
            <NuxtLink
              to="/home/datenschutz"
              class="hover:text-primary-50 transition-colors"
            >
              Datenschutz
            </NuxtLink>
            <UColorModeButton class="ml-2" />
          </div>
        </div>
      </div>
    </div>
  </UFooter>
</template>
