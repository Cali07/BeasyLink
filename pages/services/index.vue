<script setup lang="ts">
import { services } from '~/composables/useServices'

useSeo({
  title: 'Services | Welding, Plumbing, Construction in Witbank & Emalahleni',
  description:
    'Explore Beasylink Projects services: welding and metal fabrication, plumbing repairs and installation, and construction maintenance in Mpumalanga.',
  path: '/services'
})
</script>

<template>
  <v-container class="py-12">
    <h1 class="text-h3 section-title mb-3">Our Services</h1>
    <p class="mb-8">Boilermaking, welding, plumbing, electrical, and construction services for residential and commercial projects.</p>

    <v-row>
      <v-col v-for="service in services" :key="service.slug" cols="12" md="4">
        <v-card height="100%" elevation="2">
          <NuxtImg :src="service.image" :alt="service.alt" width="420" height="260" sizes="(max-width: 960px) 100vw, 30vw" loading="lazy" class="w-100" />
          <v-card-title>{{ service.title }}</v-card-title>
          <v-card-text>{{ service.fullDescription }}</v-card-text>
          <v-list density="compact" bg-color="transparent">
            <v-list-item v-for="bullet in service.bullets" :key="bullet" prepend-icon="mdi-check">{{ bullet }}</v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn color="primary" :to="`/services/${service.slug}`">Learn more</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
