<template>
  <v-card class="pa-4" elevation="2">
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h3 class="text-h6 font-weight-bold mb-1">Saved Patterns</h3>
        <div class="text-body-2 text-medium-emphasis">
          Load previous designs or remove old drafts.
        </div>
      </div>
      <v-chip color="primary" variant="tonal">
        {{ patterns.length }} saved
      </v-chip>
    </div>

    <v-row v-if="patterns.length">
      <v-col v-for="pattern in patterns" :key="pattern.id" cols="12" md="6">
        <PatternCard
          :pattern="pattern"
          @load="$emit('load', $event)"
          @delete="$emit('delete', $event)"
        />
      </v-col>
    </v-row>
    <v-alert v-else type="info" variant="tonal" border="start">
      No saved patterns yet. Save one to populate the gallery.
    </v-alert>
  </v-card>
</template>

<script>
import PatternCard from "./PatternCard.vue";

export default {
  name: "PatternGallery",
  components: { PatternCard },
  props: {
    patterns: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
