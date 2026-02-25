<script setup lang="ts">
const business = useBusinessDetails()

useSeo({
  title: 'About Beasy-Link Projects | Residential & Commercial Handyman Services',
  description:
    'Beasy-Link Projects delivers trusted handyman services since 2009, including welding, plumbing, electrical, and construction for homes and businesses in Emalahleni.',
  path: '/about'
})
</script>

<template>
  <v-container class="py-12">
    <h1 class="text-h3 section-title mb-4">Professional Handyman Services with a Personal Touch</h1>
    <p class="mb-4">
      At Beasy-Link Projects, we understand that your home or business is more than just a building — it is a reflection of you.
      That is why we approach every project with quality craftsmanship, attention to detail, and excellent customer service.
    </p>
    <p class="mb-4">
      What sets us apart is our versatility. We cover boilermaking, welding, car ports, gates, aluminium windows and doors,
      plumbing, electrical work, and construction maintenance for both residential and commercial clients.
    </p>
    <p class="mb-4">
      Since {{ business.yearEstablished }}, we have focused on giving clients great value for money and dependable results on
      projects of all sizes.
    </p>
    <v-alert color="primary" variant="tonal">Service area: {{ business.serviceAreas.join(', ') }}, {{ business.province }}.</v-alert>
  </v-container>
</template>
