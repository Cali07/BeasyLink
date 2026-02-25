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
  <v-app-bar elevation="0" color="transparent" class="site-header">
    <v-container class="header-shell d-flex align-center justify-space-between">
      <NuxtLink to="/" class="brand-mark">
        <span class="brand-title">{{ business.businessName }}</span>
      </NuxtLink>

      <div class="d-none d-md-flex ga-4 align-center">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="nav-link">{{ link.text }}</NuxtLink>
        <v-btn :href="business.telLink" color="primary" rounded="pill" size="small" prepend-icon="mdi-phone">Call</v-btn>
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

<style scoped>
.site-header {
  backdrop-filter: blur(8px);
}

.header-shell {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(255, 138, 31, 0.2);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  padding: 0.35rem 0.85rem;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
}

.brand-title {
  font-weight: 800;
  font-size: 1rem;
  color: #1f3a5f;
}

.nav-link {
  color: #3e4a5b;
  font-weight: 600;
}

.nav-link:hover {
  color: #ff8a1f;
}

@media (max-width: 960px) {
  .header-shell {
    border-radius: 16px;
  }
}
</style>
