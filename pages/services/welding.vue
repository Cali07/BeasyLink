<script setup lang="ts">
const site = useSiteConfigStore()
const service = getServiceBySlug('welding')!

useSeo({
  title: 'Welding & Metal Fabrication in Witbank | Beasylink Projects',
  description:
    'Custom gates, burglar bars, steel doors, windows, and carports fabricated and installed in Witbank, Emalahleni, and nearby Mpumalanga areas.',
  path: '/services/welding',
  image: service.image
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        provider: { '@type': 'LocalBusiness', name: site.businessName },
        areaServed: ['Witbank', 'Emalahleni', 'Mpumalanga'],
        description: service.fullDescription
      })
    }
  ]
})
</script>

<template>
  <v-container class="py-12">
    <h1 class="text-h3 section-title mb-4">{{ service.title }}</h1>
    <v-row>
      <v-col cols="12" md="7">
        <p class="mb-4">{{ service.fullDescription }}</p>
        <v-list bg-color="transparent">
          <v-list-item v-for="bullet in service.bullets" :key="bullet" prepend-icon="mdi-check-circle">{{ bullet }}</v-list-item>
        </v-list>
        <v-btn color="primary" :to="'/contact'">Request a quote</v-btn>
      </v-col>
      <v-col cols="12" md="5">
        <NuxtImg :src="service.image" :alt="service.alt" width="600" height="420" sizes="(max-width: 960px) 100vw, 40vw" loading="lazy" class="rounded-lg" />
      </v-col>
    </v-row>
  </v-container>
</template>
