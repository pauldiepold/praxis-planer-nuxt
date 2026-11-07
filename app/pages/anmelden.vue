<script setup lang="ts">
definePageMeta({
  title: 'Anmelden',
})

useSeoMeta({
  title: 'Anmelden',
  robots: 'noindex, nofollow',
})

const route = useRoute()
const toast = useToast()

// Die Seite wird prerendert – das ausgelieferte HTML kennt weder Cookie noch Session.
// Beide Karten zeigen deshalb bis zur Hydration einen Platzhalter statt eines falschen
// Zustands (sonst sieht ein angemeldeter Nutzer kurz "Anmelden" und klickt daneben).
const hydriert = ref(false)
onMounted(() => {
  hydriert.value = true
})

// Studio setzt dieses Cookie beim Login bewusst mit `httpOnly: false` und löscht es beim
// Abmelden; das Modul selbst ermittelt den Anmeldestatus clientseitig genauso.
const studioCookie = useCookie<string | null>('studio-session-check')
const studioAngemeldet = computed(() => hydriert.value && String(studioCookie.value) === 'true')

const { loggedIn, user, ready, clear } = useUserSession()
// `ready` wird erst nach dem Session-Fetch true, der auf prerenderten Seiten in
// `app:mounted` läuft.
const planerBereit = computed(() => hydriert.value && ready.value)

// Die Seite ist öffentlich erreichbar. Nach außen steht deshalb nur, dass es die beiden
// Zugänge gibt – was dahinter liegt, erfährt erst, wer angemeldet ist.
const studioBeschreibung = computed(() => studioAngemeldet.value
  ? 'Neuigkeiten auf der Startseite und die Patienteninfos pflegst du hier selbst.'
  : undefined)

const planerBeschreibung = computed(() => (planerBereit.value && loggedIn.value)
  ? 'Interne Planung der Schülerinnen- und Wocheneinteilung.'
  : undefined)

const planerFehler = computed(() => {
  switch (route.query.fehler) {
    case 'nicht-berechtigt':
      return 'Dieser GitHub-Account ist nicht für den Pflege-Planer freigeschaltet.'
    case 'oauth':
      return 'Die Anmeldung ist fehlgeschlagen. Bitte versuche es noch einmal.'
    default:
      return null
  }
})

// Der Studio-Editor ist bereits gemountet, wenn die Session galt – er verschwindet erst
// mit einem echten Reload. Deshalb hier kein Toast, sondern neu laden.
const studioAbmelden = async () => {
  try {
    await $fetch('/__nuxt_studio/auth/session', { method: 'DELETE' })
    window.location.reload()
  }
  catch (error) {
    console.error('Studio-Logout fehlgeschlagen:', error)
    toast.add({
      title: 'Abmelden fehlgeschlagen',
      color: 'error',
      icon: 'i-lucide-alert-circle',
    })
  }
}

const planerAbmelden = async () => {
  try {
    await clear()
    toast.add({
      title: 'Vom Pflege-Planer abgemeldet',
      color: 'success',
      icon: 'i-lucide-check-circle',
    })
  }
  catch (error) {
    console.error('Planer-Logout fehlgeschlagen:', error)
    toast.add({
      title: 'Abmelden fehlgeschlagen',
      color: 'error',
      icon: 'i-lucide-alert-circle',
    })
  }
}
</script>

<template>
  <div class="py-12">
    <UContainer>
      <div class="mx-auto max-w-4xl">
        <div class="mb-10 flex items-center justify-center gap-4">
          <UIcon
            name="i-praxis-logo"
            aria-hidden="true"
            class="block size-14 shrink-0 rounded-lg bg-gray-200 p-1 text-black"
          />
          <h1 class="text-3xl font-bold text-highlighted md:text-4xl">
            Anmelden
          </h1>
        </div>

        <div class="grid items-start gap-6 md:grid-cols-2">
          <!-- Redaktion: Nuxt Studio -->
          <UPageCard
            title="Website-Inhalte bearbeiten"
            :description="studioBeschreibung"
            icon="i-lucide-pencil"
            variant="subtle"
          >
            <USkeleton
              v-if="!hydriert"
              class="h-9 w-full"
            />

            <div
              v-else-if="studioAngemeldet"
              class="space-y-4"
            >
              <p class="flex items-center gap-2 text-sm font-medium text-success">
                <UIcon
                  name="i-lucide-check-circle"
                  class="size-4 shrink-0"
                />
                Du bist angemeldet.
              </p>
              <p class="text-sm text-muted">
                Öffne den Editor über den Button unten links auf der Website. Bearbeitet wird in
                der Seitenleiste – die Änderung erscheint sofort auf der Seite dahinter.
              </p>
              <div class="flex flex-wrap gap-2">
                <UButton
                  to="/"
                  icon="i-lucide-newspaper"
                  color="primary"
                >
                  Neuigkeiten
                </UButton>
                <UButton
                  to="/patienteninfos"
                  icon="i-lucide-book-open"
                  color="primary"
                  variant="subtle"
                >
                  Patienteninfos
                </UButton>
              </div>
              <UButton
                variant="link"
                color="neutral"
                size="sm"
                class="px-0"
                icon="i-lucide-log-out"
                @click="studioAbmelden"
              >
                Abmelden
              </UButton>
            </div>

            <UButton
              v-else
              to="/_studio?redirect=/anmelden"
              external
              icon="i-lucide-github"
              color="primary"
              block
            >
              Mit GitHub anmelden
            </UButton>
          </UPageCard>

          <!-- Pflege-Planer -->
          <UPageCard
            title="Pflege-Planer"
            :description="planerBeschreibung"
            icon="i-lucide-calendar-days"
            variant="subtle"
          >
            <UAlert
              v-if="planerFehler"
              color="error"
              variant="subtle"
              icon="i-lucide-alert-circle"
              :description="planerFehler"
              class="mb-4"
            />

            <USkeleton
              v-if="!planerBereit"
              class="h-9 w-full"
            />

            <div
              v-else-if="loggedIn"
              class="space-y-4"
            >
              <p class="flex items-center gap-2 text-sm font-medium text-success">
                <UIcon
                  name="i-lucide-check-circle"
                  class="size-4 shrink-0"
                />
                Angemeldet als {{ user?.name }}
              </p>
              <div>
                <UButton
                  to="/pflege-planer"
                  icon="i-lucide-arrow-right"
                  color="primary"
                >
                  Zum Pflege-Planer
                </UButton>
              </div>
              <UButton
                variant="link"
                color="neutral"
                size="sm"
                class="px-0"
                icon="i-lucide-log-out"
                @click="planerAbmelden"
              >
                Abmelden
              </UButton>
            </div>

            <UButton
              v-else
              to="/auth/github"
              external
              icon="i-lucide-github"
              color="primary"
              block
            >
              Mit GitHub anmelden
            </UButton>
          </UPageCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>
