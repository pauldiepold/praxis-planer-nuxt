<script setup lang="ts">
const { loggedIn } = useUserSession()
// ...
</script>

<template>
  <div
    v-if="loggedIn"
  >
    <h1>Willkommen</h1>
    <p>Du bist eingeloggt</p>
  </div>

  <UButton
    v-else
    to="/auth/github"
    label="Sign-in with GitHub"
    external
  />
</template>
