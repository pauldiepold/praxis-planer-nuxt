<!-- Default-Layout = öffentliche Praxis-Website (Header, Banner, Footer). -->
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
