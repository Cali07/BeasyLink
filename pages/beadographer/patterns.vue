<template>
  <div>
    <v-row class="mb-6" align="center">
      <v-col cols="12" md="8">
        <h1 class="text-h4 font-weight-bold mb-2">Pattern Gallery</h1>
        <p class="text-body-1 text-medium-emphasis">
          Browse saved bead patterns and open them in the studio.
        </p>
      </v-col>
      <v-col cols="12" md="4" class="text-right">
        <v-btn color="primary" variant="elevated" @click="$router.push('/beadographer')">
          <v-icon start>mdi-plus</v-icon>
          New pattern
        </v-btn>
      </v-col>
    </v-row>

    <PatternGallery
      :patterns="beadographerStore.savedPatterns"
      @load="loadPattern"
      @delete="deletePattern"
    />
  </div>
</template>

<script>
definePageMeta({
  layout: "mila",
});

import { mapStores } from "pinia";
import { useBeadographerStore } from "~/stores/beadographerStore";
import PatternGallery from "~/components/beadographer/PatternGallery.vue";

export default {
  name: "BeadographerGalleryPage",
  components: { PatternGallery },
  computed: {
    ...mapStores(useBeadographerStore),
  },
  mounted() {
    this.beadographerStore.init();
  },
  methods: {
    loadPattern(id) {
      this.beadographerStore.loadPattern(id);
      this.$router.push(`/beadographer/${id}`);
    },
    deletePattern(id) {
      this.beadographerStore.deletePattern(id);
    },
  },
};
</script>
