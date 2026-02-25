<template>
  <v-app>
    <SiteHeader />
    <v-main>
      <slot />
    </v-main>

    <v-btn
      class="whatsapp-float"
      color="secondary"
      icon="mdi-whatsapp"
      size="large"
      :href="business.whatsappLink"
      target="_blank"
      aria-label="Chat with us on WhatsApp"
    />

    <SiteFooter />
  </v-app>
</template>
<script setup lang="ts">
const business = useBusinessDetails()

useSeo({
  title: 'Professional Handyman Services in Witbank & Emalahleni | Beasy-Link Projects',
  description:
    'Beasy-Link Projects offers welding, boilermaking, plumbing, electrical, gates, windows, doors, and construction services in Witbank and Emalahleni. Callout fee: R200.',
  path: '/'
})

const schema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: business.businessName,
  image: 'https://beasylink-projects.co.za/images/custom-gate-fabrication-team.jpg',
  telephone: business.phone,
  email: business.email,
  areaServed: business.serviceAreas,
  priceRange: '$$',
  foundingDate: String(business.yearEstablished),
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.streetAddress,
    addressLocality: business.city,
    addressRegion: business.province,
    postalCode: business.postalCode,
    addressCountry: 'ZA'
  },
  openingHours: 'Mo-Sa 07:00-18:00',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Professional handyman services',
    itemListElement: business.primaryServices.map((item) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: item } }))
  },
  makesOffer: {
    '@type': 'Offer',
    name: 'Site callout',
    price: '200',
    priceCurrency: 'ZAR',
    description: 'Standard callout fee for on-site assessment.'
  }
}))

useHead({
  script: [{ type: 'application/ld+json', children: JSON.stringify(schema.value) }]
})
</script>

<style scoped>
.whatsapp-float {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 1005;
  box-shadow: 0 10px 24px rgba(31, 58, 95, 0.28);
}

@media (max-width: 600px) {
  .whatsapp-float {
    right: 0.75rem;
    bottom: 0.75rem;
  }
}
</style>
