<script setup lang="ts">
const site = useSiteConfigStore()

useSeo({
  title: 'About Beasylink Projects | Witbank Handyman Team',
  description:
    'Learn about Beasylink Projects, a local Witbank and Emalahleni team focused on dependable welding, plumbing, and construction workmanship.',
  path: '/about'
})
</script>

<template>
  <v-container class="py-12">
    <h1 class="text-h3 section-title mb-4">About Beasylink Projects</h1>
    <p class="mb-4">
      Beasylink Projects is a hands-on service business supporting homeowners, landlords, and small businesses in Witbank (Emalahleni).
      We focus on quality workmanship, reliability, and fair pricing for welding, plumbing, and construction jobs.
    </p>
    <p class="mb-4">
      We understand that clients want fast response times and durable results. Every project is scoped clearly, delivered cleanly, and backed by practical experience.
    </p>
    <v-alert color="primary" variant="tonal">
      Service area: {{ site.serviceAreas.join(', ') }}, Mpumalanga.
    </v-alert>
  </v-container>
</template>
