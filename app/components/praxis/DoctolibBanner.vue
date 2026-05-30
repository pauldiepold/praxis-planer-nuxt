<script setup lang="ts">
import { DOCTOLIB_URL } from '~/utils/doctolib'
import doctolibLogo from '../../assets/images/doctolib-white-transparent.png'
</script>

<template>
  <!-- Styling exakt wie Doctolib-Vorgabe (position, Maße, Farben, opacity) -->
  <a
    :href="DOCTOLIB_URL"
    target="_blank"
    rel="noopener noreferrer"
    crossorigin="anonymous"
    class="doctolib-banner"
    aria-label="Termin online buchen bei Doctolib"
  >
    <span class="doctolib-banner__text">Termin<br>online buchen</span>
    <img
      :src="doctolibLogo"
      alt="Doctolib"
      class="doctolib-banner__logo"
      width="auto"
      height="15"
      loading="lazy"
      crossorigin="anonymous"
    >
  </a>
</template>

<style scoped>
/* Mobile: unten, damit er keine wichtigen Inhalte verdeckt */
.doctolib-banner {
  position: fixed;
  bottom: 1rem;
  right: 0;
  top: auto;
  z-index: 2147483647;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0.85;
  background-color: #0596de;
  color: #ffffff;
  font-size: 14px;
  overflow: hidden;
  width: 100px;
  border-radius: 4px 0 0 4px;
  text-decoration: none;
  padding: 10px;
  line-height: 1.4;
}

/* Desktop: oben wie bisher */
@media (min-width: 768px) {
  .doctolib-banner {
    bottom: auto;
    top: 180px;
  }
}

.doctolib-banner:hover {
  opacity: 1;
  color: #ffffff;
}

.doctolib-banner__text {
  font-size: 14px;
}

.doctolib-banner__logo {
  display: block;
  height: 15px;
  width: auto;
  margin-top: 10px;
}
</style>
