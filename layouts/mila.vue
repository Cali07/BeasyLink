<template>
  <v-app>
    <v-navigation-drawer
      class="elevation-2"
      color="grey-darken-4"
      width="260"
      permanent
      app
    >
      <v-sheet color="grey-darken-4" class="pa-4">
        <div class="d-flex align-center">
          <v-avatar color="primary" size="44">
            <span class="text-subtitle-1 font-weight-bold text-white">MP</span>
          </v-avatar>
          <div class="ml-3">
            <div class="text-subtitle-1 font-weight-bold text-white">
              Mila Portal
            </div>
            <div class="text-caption text-white-70">
              Internal Studio
            </div>
          </div>
        </div>
      </v-sheet>

      <v-divider color="grey-darken-2" />

      <v-list density="comfortable" nav>
        <v-list-subheader class="text-white-70">Navigation</v-list-subheader>
        <v-list-item
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :title="item.title"
          :prepend-icon="item.icon"
          rounded="lg"
          class="mb-1 text-white"
          :active="isActive(item.to)"
          active-color="primary"
        >
          <template #title>
            <span class="text-body-2 font-weight-medium text-white">
              {{ item.title }}
            </span>
          </template>
          <template #prepend>
            <v-icon color="white" size="20">{{ item.icon }}</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="pa-6">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "MilaLayout",
  data() {
    return {
      navItems: [
        { title: "Dashboard", icon: "mdi-view-dashboard", to: "/dashboard" },
        { title: "Products", icon: "mdi-package-variant-closed", to: "/products" },
        { title: "Capacity", icon: "mdi-chart-line", to: "/capacity" },
        { title: "Quality", icon: "mdi-shield-check", to: "/quality" },
        { title: "Beadographer", icon: "mdi-draw", to: "/beadographer" },
      ],
    };
  },
  computed: {
    currentPath() {
      return this.$route?.path || "/";
    },
  },
  methods: {
    isActive(path) {
      return this.currentPath === path || this.currentPath.startsWith(`${path}/`);
    },
  },
};
</script>

<style scoped>
.text-white-70 {
  color: rgba(255, 255, 255, 0.7);
}
</style>
