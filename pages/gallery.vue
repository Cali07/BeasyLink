<script setup lang="ts">
useSeo({
  title: 'Handyman Project Gallery in Emalahleni | Beasy-Link Projects',
  description:
    'View real project photos from Beasy-Link Projects including gates, doors, bathroom plumbing, garage repairs, home wiring, and construction work in Witbank and Emalahleni.',
  path: '/gallery'
})

const galleryImages = [
  { src: '/images/custom-gate-fabrication-team.jpg', alt: 'Custom gate fabrication team at work' },
  { src: '/images/aluminium-security-gate-installation.jpg', alt: 'Aluminium security gate installation project' },
  { src: '/images/steel-burglar-door-installation.jpg', alt: 'Steel burglar door installation for security' },
  { src: '/images/gate-motor-installation.jpg', alt: 'Gate motor setup and wiring' },
  { src: '/images/aluminium-door-installation.jpg', alt: 'Aluminium door replacement and fitting' },
  { src: '/images/aluminium-garage-door-installation.jpg', alt: 'Aluminium garage door installation project' },
  { src: '/images/home-wiring-repairs-emalahleni.jpg', alt: 'Home wiring and repairs in Emalahleni' },
  { src: '/images/bathroom-shower-toilet-installation.jpg', alt: 'Shower and toilet bathroom installation' },
  { src: '/images/bathroom-bathtub-installation.jpg', alt: 'Bathtub fitting and plumbing work' },
  { src: '/images/outdoor-trash-holder-fabrication.jpg', alt: 'Outdoor trash holder metal fabrication' },
  { src: '/images/mining-shelter-fabrication.jpg', alt: 'Mining project shelter fabrication' },
  { src: '/images/construction-township-project-emalahleni.png', alt: 'Construction work in township area Emalahleni' }
]
</script>

<template>
  <v-container class="py-12">
    <h1 class="text-h3 section-title mb-3">Our Work</h1>
    <p class="mb-8">
      Real work completed by Beasy-Link Projects across residential and commercial sites, including gates, plumbing, electrical,
      construction, and custom fabrication projects.
    </p>
    <v-row>
      <v-col v-for="image in galleryImages" :key="image.src" cols="12" sm="6" md="4">
        <v-card elevation="1" rounded="lg">
          <NuxtImg :src="image.src" :alt="image.alt" width="600" height="420" sizes="(max-width: 960px) 100vw, 30vw" loading="lazy" class="w-100" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
