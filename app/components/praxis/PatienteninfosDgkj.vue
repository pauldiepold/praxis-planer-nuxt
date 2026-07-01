<script setup lang="ts">
// DGKJ-Elterninformationen: hartcodiert, da sich Inhalt (v.a. die Themenliste)
// praktisch nie ändert und als einzige Kategorie ein topics-Feld benötigt.
const description = 'Hochwertige, unabhängige und wissenschaftlich fundierte Informationen der Deutschen Gesellschaft für Kinder- und Jugendmedizin'

const topics = [
  'Gesunde Zähne für mein Kind',
  'Gesunde Ernährung für mein Baby',
  'Gesundes Essen für mein Kind',
  'Mein Kind hat Fieber',
  'Mein Kind hat Halsschmerzen',
  'Mein Kind hat Husten',
  'Mein Kind hat Bauchschmerzen',
  'Mein Kind hat Verstopfung',
  'Mein Kind hat Durchfall',
  'Mein Kind hatte einen Fieberkrampf',
  'Mein Kind ist zu dick',
  'Mein Kind schläft nicht',
  'Ist mein Kind ein Schreibaby?',
  'Mein Kind hat ständig Infekte',
  'Sicherer Schlaf für mein Baby - SIDS-Vermeidung',
  'Mein Kind soll ins MRT',
]

const links = [
  { name: 'DGKJ Elterninformationen', url: 'https://www.dgkj.de/eltern/dgkj-elterninformationen/' },
]
</script>

<template>
  <PraxisPatienteninfosCategoryContent
    :description="description"
    :topics="topics"
    :links="links"
  />
</template>
