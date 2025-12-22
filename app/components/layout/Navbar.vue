<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession()
const isMenuOpen = ref(false)
const toast = useToast()

const handleLogout = async () => {
  try {
    await clear()
    toast.add({
      title: 'Erfolgreich abgemeldet',
      color: 'success',
      icon: 'i-lucide-check-circle',
    })
    // Zur Startseite weiterleiten
    await navigateTo('/')
  }
  catch (error) {
    console.error('Logout error:', error)
    toast.add({
      title: 'Fehler beim Abmelden',
      color: 'error',
      icon: 'i-lucide-alert-circle',
    })
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="bg-muted">
    <div class="container mx-auto px-4 py-3">
      <div
        class="flex items-center justify-between"
      >
        <NuxtLink
          to="/"
          class="group flex items-center"
        >
          <div class="">
            <img
              src="~/assets/images/praxis-logo.png"
              alt="BTC Logo"
              class="bg-gray-200 p-1 rounded-lg h-12 w-auto transform transition-transform duration-300 group-hover:scale-110"
            >
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav
          v-if="loggedIn"
          class="hidden lg:block"
        >
          <ul class="flex space-x-6">
            <LayoutHeaderLink
              to="/"
              label="Startseite"
            />
            <LayoutHeaderLink
              to="/students"
              label="Schülerinnen"
            />
            <LayoutHeaderLink
              to="/schools"
              label="Pflegeschulen"
            />
            <LayoutHeaderLink
              to="/companies"
              label="Betriebe"
            />
          </ul>
        </nav>

        <!-- User Info und Logout (Desktop) -->
        <div class="hidden items-center space-x-6 lg:flex">
          <template v-if="loggedIn && user">
            <span class="text-sm">
              {{ user.name }}
            </span>
            <UButton
              variant="soft"
              class="cursor-pointer"
              icon="i-lucide-log-out"
              @click="handleLogout"
            >
              Ausloggen
            </UButton>
          </template>

          <UButton
            v-else
            href="/auth/github"
            variant="soft"
            external
            class="cursor-pointer"
            icon="i-lucide-github"
          >
            Mit GitHub anmelden
          </UButton>
        </div>

        <!-- Mobile Menu Button -->
        <button
          v-if="loggedIn"
          class="hover:text-primary text-white transition-colors lg:hidden"
          aria-label="Menü öffnen"
          @click="toggleMenu"
        >
          <Icon
            :name="isMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            size="26px"
          />
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-show="isMenuOpen && loggedIn"
        class="bg-muted absolute right-0 left-0 z-50 lg:hidden"
      >
        <ul class="space-y-4 px-4 py-4">
          <LayoutHeaderLinkMobile
            to="/"
            label="Startseite"
            :is-menu-open="isMenuOpen"
            @close-menu="isMenuOpen = false"
          />
          <LayoutHeaderLinkMobile
            to="/students"
            label="Schülerinnen"
            :is-menu-open="isMenuOpen"
            @close-menu="isMenuOpen = false"
          />
          <LayoutHeaderLinkMobile
            to="/schools"
            label="Pflegeschulen"
            :is-menu-open="isMenuOpen"
            @close-menu="isMenuOpen = false"
          />
          <LayoutHeaderLinkMobile
            to="/companies"
            label="Betriebe"
            :is-menu-open="isMenuOpen"
            @close-menu="isMenuOpen = false"
          />
          <li
            v-if="loggedIn && user"
            class="border-t border-gray-700 pt-4 text-center"
          >
            <div class="flex flex-col space-y-4">
              <span class="text-muted text-sm">
                Eingeloggt als: {{ user.name }}
              </span>
              <UButton
                variant="outline"
                class="w-full justify-center"
                icon="i-lucide-log-out"
                @click="handleLogout"
              >
                Ausloggen
              </UButton>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
