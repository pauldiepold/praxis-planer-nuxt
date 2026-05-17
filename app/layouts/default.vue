<!-- Default-Layout = öffentliche Praxis-Website (Header, Banner, Footer). -->
<script setup lang="ts">
if (import.meta.client) {
  useColorMode().preference = 'light'
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  '@id': 'https://praxis-hd.de/#clinic',
  'name': 'Kinder- und Jugendarztpraxis Holstein-Diepold & Dr. Diepold',
  'alternateName': 'Berufsausübungsgemeinschaft Holstein-Diepold & Dr. Diepold',
  'url': 'https://praxis-hd.de',
  'telephone': '+49 5551 9099307',
  'faxNumber': '+49 5551 9099308',
  'email': 'aerzte@praxis-hd.de',
  'medicalSpecialty': 'Pediatric',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Albert-Schweitzer-Weg 7',
    'postalCode': '37154',
    'addressLocality': 'Northeim',
    'addressCountry': 'DE',
  },
  'openingHoursSpecification': [
    { '@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Monday', 'Tuesday', 'Thursday'], 'opens': '08:00', 'closes': '18:00' },
    { '@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Wednesday', 'Friday'], 'opens': '08:00', 'closes': '13:00' },
  ],
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd),
    },
  ],
})
</script>

<template>
  <div>
    <PraxisHeader />
    <PraxisDoctolibBanner />
    <UMain>
      <slot />
    </UMain>
    <PraxisFooter />
  </div>
</template>
