<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession()
const isMenuOpen = ref(false)
</script>

<template>
  <header class="bg-muted">
    <div class="container mx-auto px-4 py-3">
      <div
        class="flex items-center"
        :class="{ 'justify-center': !loggedIn, 'justify-between': loggedIn }"
      >
        <NuxtLink
          to="/"
          class="group flex items-center"
        />

        <template v-if="loggedIn">
          <!-- Desktop Navigation -->
          <nav class="hidden md:block">
            <ul class="flex space-x-6">
              <LayoutHeaderLink
                to="/"
                label="Wettkämpfe"
              />
              <LayoutHeaderLink
                v-if="user"
                to="/admin"
                label="Admin"
              />
            </ul>
          </nav>

          <!-- User Info und Logout (Desktop) -->
          <div class="hidden items-center space-x-6 md:flex">
            <template v-if="user">
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
        </template>
      </div>

      <!-- Mobile Navigation -->
      <template v-if="user">
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
