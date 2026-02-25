<script setup lang="ts">
useSeo({
  title: 'Project Gallery | Beasylink Projects Witbank',
  description:
    'Browse recent welding, plumbing, and construction project photos completed by Beasylink Projects in Witbank and Emalahleni.',
  path: '/gallery'
})

const galleryImages = [
  { src: '/images/welding-gate-installation-witbank.svg', alt: 'welding-gate-installation-witbank' },
  { src: '/images/metal-door-fabrication-emalahleni.svg', alt: 'metal-door-fabrication-emalahleni' },
  { src: '/images/plumbing-pipe-repair-emalahleni.svg', alt: 'plumbing-pipe-repair-emalahleni' },
  { src: '/images/bathroom-plumbing-installation-witbank.svg', alt: 'bathroom-plumbing-installation-witbank' },
  { src: '/images/construction-small-build-witbank.svg', alt: 'construction-small-build-witbank' },
  { src: '/images/brickwall-repair-mpumalanga.svg', alt: 'brickwall-repair-mpumalanga' }
]
</script>

<template>
  <v-container class="py-12">
    <h1 class="text-h3 section-title mb-3">Project Gallery</h1>
    <p class="mb-8">Before-and-after style examples of our recent jobs. Replace these placeholders with your real project photos anytime.</p>
    <v-row>
      <v-col v-for="image in galleryImages" :key="image.src" cols="12" sm="6" md="4">
        <v-card elevation="1">
          <NuxtImg :src="image.src" :alt="image.alt" width="600" height="420" sizes="(max-width: 960px) 100vw, 30vw" loading="lazy" class="w-100" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
