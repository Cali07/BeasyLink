<template>
  <v-card class="pa-8 text-center" elevation="2">
    <v-icon size="48" color="primary" class="mb-4">mdi-clock-outline</v-icon>
    <h2 class="text-h5 font-weight-bold mb-2">{{ title }}</h2>
    <p class="text-body-1 text-medium-emphasis mb-4">
      {{ subtitle }}
    </p>
    <v-chip color="primary" text-color="white" class="ma-1" variant="elevated">
      Under construction
    </v-chip>
  </v-card>
</template>

<script>
export default {
  name: "ComingSoon",
  props: {
    title: {
      type: String,
      default: "Coming soon",
    },
    subtitle: {
      type: String,
      default: "This section is being crafted for the next release.",
    },
  },
};
</script>
