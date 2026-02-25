<template>
  <v-card class="pa-4" elevation="2">
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h3 class="text-h6 font-weight-bold mb-1">Grid Settings</h3>
        <div class="text-body-2 text-medium-emphasis">
          Adjust rows, columns, and scale the canvas.
        </div>
      </div>
      <v-btn variant="tonal" color="primary" @click="resetGrid">
        <v-icon start>mdi-restore</v-icon>
        Reset
      </v-btn>
    </div>

    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model.number="rows"
          type="number"
          label="Rows"
          variant="outlined"
          min="5"
          max="300"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model.number="cols"
          type="number"
          label="Columns"
          variant="outlined"
          min="5"
          max="300"
        />
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col cols="12">
        <v-slider
          v-model="zoom"
          :min="0.5"
          :max="4"
          :step="0.1"
          label="Cell Scale"
        >
          <template #append>
            <v-chip color="primary" size="small" variant="tonal">
              {{ zoom.toFixed(1) }}x
            </v-chip>
          </template>
        </v-slider>
      </v-col>
    </v-row>

    <div class="d-flex justify-end ga-2 mt-4">
      <v-btn variant="text" @click="resetGrid">Reset</v-btn>
      <v-btn color="primary" @click="apply">Apply</v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { useBeadographerStore } from "~/stores/beadographerStore";

export default {
  name: "GridSettings",
  data() {
    return {
      rows: 20,
      cols: 20,
      zoom: 1,
    };
  },
  computed: {
    ...mapStores(useBeadographerStore),
  },
  created() {
    this.rows = this.beadographerStore.gridSettings.rows;
    this.cols = this.beadographerStore.gridSettings.cols;
    this.zoom = this.beadographerStore.gridSettings.zoom;
  },
  watch: {
    "beadographerStore.gridSettings.rows"(val) {
      this.rows = val;
    },
    "beadographerStore.gridSettings.cols"(val) {
      this.cols = val;
    },
    "beadographerStore.gridSettings.zoom"(val) {
      this.zoom = val;
    },
  },
  methods: {
    resetGrid() {
      this.beadographerStore.resetGrid();
    },
    apply() {
      this.beadographerStore.updateGridSize(this.rows, this.cols);
      this.beadographerStore.setZoom(this.zoom);
    },
  },
};
</script>
