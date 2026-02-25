<template>
  <v-card class="pa-4" elevation="2">
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h3 class="text-h6 font-weight-bold mb-1">Pattern Details</h3>
        <div class="text-body-2 text-medium-emphasis">
          Title, description, and tags are saved with the pattern.
        </div>
      </div>
      <v-chip color="primary" variant="tonal" label>
        Auto-save every second
      </v-chip>
    </div>

    <v-text-field
      v-model="beadographerStore.patternMetadata.name"
      label="Pattern name"
      variant="outlined"
      class="mb-3"
    />
    <v-textarea
      v-model="beadographerStore.patternMetadata.description"
      label="Description"
      variant="outlined"
      auto-grow
      class="mb-3"
    />
    <v-text-field
      v-model="beadographerStore.patternMetadata.tags"
      label="Tags"
      variant="outlined"
      hint="Comma-separated"
    />
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { useBeadographerStore } from "~/stores/beadographerStore";

export default {
  name: "PatternMetadataForm",
  computed: {
    ...mapStores(useBeadographerStore),
  },
};
</script>
