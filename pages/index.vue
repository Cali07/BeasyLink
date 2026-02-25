<script setup lang="ts">
import { services } from '~/composables/useServices'

const site = useSiteConfigStore()

useSeo({
  title: 'Professional Welding, Plumbing & Construction in Witbank (Emalahleni) | Beasylink Projects',
  description:
    'Beasylink Projects provides reliable welding, plumbing, and construction services in Witbank, Emalahleni, and surrounding Mpumalanga areas.',
  path: '/'
})

const schema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: site.businessName,
  telephone: site.phone,
  email: site.email,
  areaServed: site.serviceAreas,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Witbank',
    addressRegion: 'Mpumalanga',
    addressCountry: 'ZA'
  },
  openingHours: 'Mo-Sa 07:00-18:00',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Handyman and Construction Services',
    itemListElement: site.primaryServices.map((item) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: item } }))
  }
}))

useHead({
  script: [{ type: 'application/ld+json', children: JSON.stringify(schema.value) }]
})
</script>

<template>
  <div>
    <section class="py-16 bg-grey-lighten-5">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="7">
            <p class="text-overline mb-2">Beasylink Projects</p>
            <h1 class="text-h3 text-md-h2 section-title mb-4">
              Professional Welding, Plumbing & Construction in Witbank (Emalahleni)
            </h1>
            <p class="text-body-1 mb-6">
              We deliver practical, durable workmanship for homes and small businesses across Witbank, Emalahleni, and nearby suburbs.
            </p>
            <div class="d-flex ga-3 flex-wrap">
              <v-btn color="primary" size="large" :href="site.telLink" prepend-icon="mdi-phone">Call {{ site.phone }}</v-btn>
              <v-btn color="secondary" size="large" :href="site.whatsappLink" target="_blank" prepend-icon="mdi-whatsapp">WhatsApp</v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <NuxtImg src="/images/welding-gate-installation-witbank.svg" alt="welding-gate-installation-witbank" width="600" height="420" sizes="(max-width: 960px) 100vw, 40vw" loading="eager" class="rounded-lg" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="py-14">
      <v-container>
        <h2 class="text-h4 section-title mb-6">Core services</h2>
        <v-row>
          <v-col v-for="service in services" :key="service.slug" cols="12" md="4">
            <v-card height="100%" elevation="2">
              <NuxtImg :src="service.image" :alt="service.alt" width="420" height="260" sizes="(max-width: 960px) 100vw, 30vw" loading="lazy" class="w-100" />
              <v-card-title>{{ service.title }}</v-card-title>
              <v-card-text>{{ service.shortDescription }}</v-card-text>
              <v-card-actions>
                <v-btn variant="text" color="primary" :to="`/services/${service.slug}`">View details</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="py-14 bg-grey-lighten-5">
      <v-container>
        <h2 class="text-h4 section-title mb-4">Why choose us</h2>
        <v-list bg-color="transparent">
          <v-list-item prepend-icon="mdi-check-circle">Quality workmanship on every job</v-list-item>
          <v-list-item prepend-icon="mdi-check-circle">Reliable scheduling and clear communication</v-list-item>
          <v-list-item prepend-icon="mdi-check-circle">Value for money with durable materials</v-list-item>
        </v-list>
      </v-container>
    </section>

    <section class="py-14">
      <v-container>
        <h2 class="text-h4 section-title mb-4">Local service in Witbank and Emalahleni</h2>
        <p>
          We work throughout Witbank and Emalahleni, including Tasbet Park, Reyno Ridge, Ben Fleur, and surrounding Mpumalanga neighborhoods.
          Fast response, honest quotes, and clean workmanship are standard on every callout.
        </p>
      </v-container>
    </section>

    <section class="py-14 bg-grey-lighten-5">
      <v-container>
        <div class="d-flex justify-space-between align-center flex-wrap ga-3 mb-6">
          <h2 class="text-h4 section-title">Recent project gallery</h2>
          <v-btn color="primary" to="/gallery">View full gallery</v-btn>
        </div>
        <v-row>
          <v-col cols="12" md="4">
            <NuxtImg src="/images/metal-door-fabrication-emalahleni.svg" alt="metal-door-fabrication-emalahleni" width="420" height="280" sizes="(max-width: 960px) 100vw, 30vw" loading="lazy" class="rounded-lg" />
          </v-col>
          <v-col cols="12" md="4">
            <NuxtImg src="/images/bathroom-plumbing-installation-witbank.svg" alt="bathroom-plumbing-installation-witbank" width="420" height="280" sizes="(max-width: 960px) 100vw, 30vw" loading="lazy" class="rounded-lg" />
          </v-col>
          <v-col cols="12" md="4">
            <NuxtImg src="/images/brickwall-repair-mpumalanga.svg" alt="brickwall-repair-mpumalanga" width="420" height="280" sizes="(max-width: 960px) 100vw, 30vw" loading="lazy" class="rounded-lg" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="py-14">
      <v-container>
        <h2 class="text-h4 section-title mb-6">Client feedback</h2>
        <v-row>
          <v-col cols="12" md="4" v-for="item in 3" :key="item">
            <v-card variant="outlined" height="100%">
              <v-card-text>
                "Great service, good communication, and quality finish. Will use Beasylink Projects again."
              </v-card-text>
              <v-card-subtitle>Local customer, Emalahleni</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>
