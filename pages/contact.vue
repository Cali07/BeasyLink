<script setup lang="ts">
const site = useSiteConfigStore()

useSeo({
  title: 'Contact Beasylink Projects | Call or WhatsApp',
  description:
    'Contact Beasylink Projects for welding, plumbing, and construction quotes in Witbank, Emalahleni, and surrounding Mpumalanga suburbs.',
  path: '/contact'
})
</script>

<template>
  <v-container class="py-12">
    <h1 class="text-h3 section-title mb-4">Contact Us</h1>
    <p class="mb-8">Ready to book a job or request a quote? Call or WhatsApp for a quick response.</p>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-6" elevation="2">
          <h2 class="text-h5 mb-4">Direct details</h2>
          <p class="mb-2"><strong>Phone:</strong> <a :href="site.telLink">{{ site.phone }}</a></p>
          <p class="mb-2"><strong>WhatsApp:</strong> <a :href="site.whatsappLink" target="_blank">{{ site.phone }}</a></p>
          <p class="mb-2"><strong>Email:</strong> <a :href="`mailto:${site.email}`">{{ site.email }}</a></p>
          <p class="mb-2"><strong>Hours:</strong> {{ site.openingHours }}</p>
          <p><strong>Service Area:</strong> {{ site.serviceAreas.join(', ') }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-6" elevation="2">
          <h2 class="text-h5 mb-4">Need help now?</h2>
          <v-btn block color="primary" size="large" :href="site.telLink" prepend-icon="mdi-phone">Call Now</v-btn>
          <v-btn block class="mt-3" color="secondary" size="large" :href="site.whatsappLink" target="_blank" prepend-icon="mdi-whatsapp">Send WhatsApp</v-btn>
          <p class="text-body-2 mt-4 mb-0">For fastest service, include your area and a short job description.</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
