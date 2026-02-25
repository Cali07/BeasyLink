<script setup lang="ts">
const business = useBusinessDetails()
</script>

<template>
  <v-footer color="grey-lighten-4" class="py-8">
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <h2 class="text-h6 mb-2">{{ business.businessName }}</h2>
          <p class="mb-1">Service area: {{ business.serviceAreas.join(', ') }}, Mpumalanga</p>
          <p class="mb-1">Phone: <a :href="business.telLink">{{ business.phone }}</a></p>
          <p class="mb-1">Hours: {{ business.openingHours }}</p>
        </v-col>
        <v-col cols="12" md="4">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Quick links</h3>
          <div class="d-flex flex-column ga-1">
            <NuxtLink to="/services">Services</NuxtLink>
            <NuxtLink to="/gallery">Gallery</NuxtLink>
            <NuxtLink to="/about">About</NuxtLink>
            <NuxtLink to="/contact">Contact</NuxtLink>
          </div>
        </v-col>
        <v-col cols="12" md="3">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Direct contact</h3>
          <v-btn block color="primary" :href="business.telLink" prepend-icon="mdi-phone">Call now</v-btn>
          <v-btn block class="mt-2" color="secondary" :href="business.whatsappLink" target="_blank" prepend-icon="mdi-whatsapp">WhatsApp</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
