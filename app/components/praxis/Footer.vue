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
            to="/"
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
            <li class="flex items-center gap-2">
              <UIcon
                name="i-lucide-printer"
                class="h-4 w-4 shrink-0"
              />
              <span>05551 90 99 308</span>
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
            Außerhalb der Telefonzeiten nutzen Sie bitte die
            <NuxtLink
              to="/termine#app"
              class="font-medium text-primary-50/80 hover:text-primary-50 transition-colors underline underline-offset-2"
            >
              Praxis App</NuxtLink>.
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
                to="/termine"
                class="text-primary-50/80 hover:text-primary-50 transition-colors"
              >
                Termine & Kontakt
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/notdienst"
                class="text-primary-50/80 hover:text-primary-50 transition-colors"
              >
                Notdienst
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/ueber-uns"
                class="text-primary-50/80 hover:text-primary-50 transition-colors"
              >
                Über uns
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/leistungen"
                class="text-primary-50/80 hover:text-primary-50 transition-colors"
              >
                Leistungen
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/patienteninfos"
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
          <p>
            © Paul Diepold {{ currentYear }}
            <span
              class="mx-1"
              aria-hidden="true"
            >•</span>
            <NuxtLink
              to="/pflege-planer"
              class="hover:text-primary-50 transition-colors"
            >
              Anmelden
            </NuxtLink>
          </p>
          <p>
            <NuxtLink
              to="/impressum"
              class="hover:text-primary-50 transition-colors"
            >
              Impressum
            </NuxtLink>
            <span
              class="mx-1"
              aria-hidden="true"
            >•</span>
            <NuxtLink
              to="/datenschutz"
              class="hover:text-primary-50 transition-colors"
            >
              Datenschutz
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </UFooter>
</template>
