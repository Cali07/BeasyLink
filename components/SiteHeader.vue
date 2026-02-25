<script setup lang="ts">
const drawer = ref(false)
const business = useBusinessDetails()

const links = [
  { to: '/', text: 'Home' },
  { to: '/services', text: 'Services' },
  { to: '/gallery', text: 'Gallery' },
  { to: '/about', text: 'About' },
  { to: '/contact', text: 'Contact' }
]
</script>

<template>
  <v-app-bar elevation="1" color="white">
    <v-container class="d-flex align-center justify-space-between">
      <NuxtLink to="/" class="text-h6 font-weight-bold">{{ business.businessName }}</NuxtLink>
      <div class="d-none d-md-flex ga-4 align-center">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="text-body-1">{{ link.text }}</NuxtLink>
        <v-btn :href="business.telLink" color="primary" size="small" prepend-icon="mdi-phone">Call</v-btn>
      </div>
      <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer" />
    </v-container>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="right" temporary>
    <v-list>
      <v-list-item v-for="link in links" :key="link.to" :to="link.to" @click="drawer = false">
        <v-list-item-title>{{ link.text }}</v-list-item-title>
      </v-list-item>
      <v-list-item :href="business.telLink">
        <v-list-item-title>Call Now</v-list-item-title>
      </v-list-item>
      <v-list-item :href="business.whatsappLink" target="_blank">
        <v-list-item-title>WhatsApp</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
