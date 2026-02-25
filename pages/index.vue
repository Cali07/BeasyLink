<template>
  <div>
    <section class="hero-section py-16">
      <v-container>
        <v-row align="center" class="gy-8">
          <v-col cols="12" md="7">
            <p class="text-overline mb-2 text-secondary">Professional Handyman Services</p>
            <h1 class="text-h3 text-md-h2 section-title mb-4">Your One-Stop Shop for Professional Handyman Services</h1>
            <p class="text-body-1 mb-6 text-medium-emphasis">
              From concept to completion, Beasy-Link Projects delivers quality craftsmanship with a personal touch for residential and
              commercial clients in Witbank and Emalahleni.
            </p>
            <div class="d-flex ga-3 flex-wrap mb-4">
              <v-btn color="primary" rounded="pill" size="large" :href="business.telLink" prepend-icon="mdi-phone">Call {{ business.phone }}</v-btn>
              <v-btn color="secondary" rounded="pill" size="large" :href="business.whatsappLink" target="_blank" prepend-icon="mdi-whatsapp">WhatsApp</v-btn>
            </div>
            <v-chip color="primary" variant="flat" prepend-icon="mdi-cash">Site callout fee: {{ business.calloutFee }}</v-chip>
          </v-col>
          <v-col cols="12" md="5">
            <NuxtImg src="/images/custom-gate-fabrication-team.jpg" alt="Professional Beasy-Link Projects team discussing gate fabrication" width="600" height="420" sizes="(max-width: 960px) 100vw, 40vw" loading="eager" class="rounded-xl hero-image" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="py-14">
      <v-container>
        <h2 class="text-h4 section-title mb-6">Our specialties</h2>
        <v-row>
          <v-col v-for="service in services" :key="service.slug" cols="12" md="4">
            <v-card height="100%" elevation="1" rounded="xl" class="glass-card">
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

    <section class="py-14 soft-surface">
      <v-container>
        <h2 class="text-h4 section-title mb-4">Why choose Beasy-Link Projects</h2>
        <v-list bg-color="transparent">
          <v-list-item prepend-icon="mdi-check-circle">Versatile service: welding, plumbing, electrical, and construction</v-list-item>
          <v-list-item prepend-icon="mdi-check-circle">Competitive pricing with no compromise on quality workmanship</v-list-item>
          <v-list-item prepend-icon="mdi-check-circle">Reliable team trusted by homeowners and businesses since 2009</v-list-item>
        </v-list>
        <v-row class="mt-6">
          <v-col cols="12" md="4"><v-alert type="info" variant="tonal">Year established: <strong>{{ business.yearEstablished }}</strong></v-alert></v-col>
          <v-col cols="12" md="4"><v-alert type="success" variant="tonal">Clients served: <strong>{{ business.clientsServed }}+</strong></v-alert></v-col>
          <v-col cols="12" md="4"><v-alert type="warning" variant="tonal">Projects completed: <strong>Over {{ business.projectsCompleted }}</strong></v-alert></v-col>
        </v-row>
      </v-container>
    </section>

    <section class="py-14">
      <v-container>
        <h2 class="text-h4 section-title mb-4">Recent project gallery</h2>
        <v-row>
          <v-col cols="12" md="4">
            <NuxtImg src="/images/aluminium-security-gate-installation.jpg" alt="New aluminium security gate installation" width="420" height="280" sizes="(max-width: 960px) 100vw, 30vw" loading="lazy" class="rounded-xl" />
          </v-col>
          <v-col cols="12" md="4">
            <NuxtImg src="/images/home-wiring-repairs-emalahleni.jpg" alt="Home wiring and electrical repairs in Emalahleni" width="420" height="280" sizes="(max-width: 960px) 100vw, 30vw" loading="lazy" class="rounded-xl" />
          </v-col>
          <v-col cols="12" md="4">
            <NuxtImg src="/images/construction-township-project-emalahleni.png" alt="Township construction project in Emalahleni" width="420" height="280" sizes="(max-width: 960px) 100vw, 30vw" loading="lazy" class="rounded-xl" />
          </v-col>
        </v-row>
        <v-btn color="primary" rounded="pill" to="/gallery" class="mt-6">View full gallery</v-btn>
      </v-container>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  background: linear-gradient(132deg, #fff8ef 0%, #ffe9d2 52%, #ffffff 100%);
}

.hero-image {
  box-shadow: 0 18px 36px rgba(31, 58, 95, 0.2);
}

@media (max-width: 960px) {
  .hero-section {
    padding-top: 5rem !important;
  }
}
</style>

<script setup lang="ts">
import { services } from '~/composables/useServices'

const business = useBusinessDetails()

useSeo({
  title: 'Professional Handyman Services in Witbank & Emalahleni | Beasy-Link Projects',
  description:
    'Beasy-Link Projects offers welding, boilermaking, plumbing, electrical, gates, windows, doors, and construction services in Witbank and Emalahleni. Callout fee: R200.',
  path: '/'
})
</script>
