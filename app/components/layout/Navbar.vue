<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession()
const isMenuOpen = ref(false)
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
        <nav class="hidden md:block">
          <ul class="flex space-x-6">
            <LayoutHeaderLink
              to="/"
              label="Startseite"
            />
          </ul>
        </nav>

        <!-- User Info und Logout (Desktop) -->
        <div class="hidden items-center space-x-6 md:flex">
          <template v-if="loggedIn">
            <span class="text-sm">
              {{ user.name }}
            </span>
            <UButton
              variant="soft"
              class="cursor-pointer"
              icon="i-lucide-log-out"
              @click="clear"
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
            icon="i-lucide-log-out"
          >
            Login
          </UButton>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="hover:text-primary text-white transition-colors md:hidden"
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
      <template>
        <div
          v-show="isMenuOpen"
          class="bg-muted absolute right-0 left-0 z-50 md:hidden"
        >
          <ul class="space-y-4 px-4 py-4">
            <LayoutHeaderLinkMobile
              to="/"
              label="Wettkämpfe"
              :is-menu-open="isMenuOpen"
              @close-menu="isMenuOpen = false"
            />
            <LayoutHeaderLinkMobile
              v-if="user"
              to="/admin"
              label="Admin-Dashboard"
              :is-menu-open="isMenuOpen"
              @close-menu="isMenuOpen = false"
            />
            <li
              v-if="user"
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
                  @click="clear"
                >
                  Ausloggen
                </UButton>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </header>
</template>
