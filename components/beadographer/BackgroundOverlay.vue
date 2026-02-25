<template>
  <v-card class="pa-4" elevation="2">
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h3 class="text-h6 font-weight-bold mb-1">Background Overlay</h3>
        <div class="text-body-2 text-medium-emphasis">
          Import a reference image behind the grid.
        </div>
      </div>
      <v-switch
        v-model="visibility"
        hide-details
        inset
        color="primary"
        label="Show"
      />
    </div>

    <v-file-input
      label="Upload image"
      accept="image/png, image/jpeg"
      prepend-icon="mdi-image"
      variant="outlined"
      dense
      @change="onFileChange"
    />

    <v-slider
      v-model="opacity"
      class="mt-4"
      label="Transparency"
      :min="0"
      :max="100"
      :step="5"
      color="primary"
      @change="updateOverlay"
    >
      <template #append>
        <v-chip size="small" color="primary" variant="tonal">
          {{ opacity }}%
        </v-chip>
      </template>
    </v-slider>

    <v-row class="mt-2">
      <v-col cols="12" sm="6">
        <v-switch
          v-model="fitToGrid"
          inset
          color="primary"
          label="Fit to grid"
          @change="updateOverlay"
        />
      </v-col>
      <v-col cols="6" sm="3">
        <v-text-field
          v-model.number="position.x"
          label="Offset X"
          type="number"
          variant="outlined"
          @change="updateOverlay"
        />
      </v-col>
      <v-col cols="6" sm="3">
        <v-text-field
          v-model.number="position.y"
          label="Offset Y"
          type="number"
          variant="outlined"
          @change="updateOverlay"
        />
      </v-col>
    </v-row>

    <v-btn
      v-if="beadographerStore.overlayImage.src"
      class="mt-3"
      variant="text"
      color="error"
      @click="clearOverlay"
    >
      <v-icon start>mdi-delete</v-icon>
      Remove overlay
    </v-btn>
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { useBeadographerStore } from "~/stores/beadographerStore";

export default {
  name: "BackgroundOverlay",
  data() {
    return {
      opacity: 40,
      fitToGrid: true,
      position: { x: 0, y: 0 },
      visibility: true,
    };
  },
  computed: {
    ...mapStores(useBeadographerStore),
  },
  created() {
    this.opacity = Math.round((this.beadographerStore.overlayImage.opacity || 0) * 100);
    this.fitToGrid = this.beadographerStore.overlayImage.fitToGrid;
    this.position = { ...this.beadographerStore.overlayImage.position };
    this.visibility = this.beadographerStore.overlayImage.visible;
  },
  watch: {
    "beadographerStore.overlayImage"(value) {
      this.opacity = Math.round((value.opacity || 0) * 100);
      this.fitToGrid = value.fitToGrid;
      this.position = { ...value.position };
      this.visibility = value.visible;
    },
    visibility() {
      this.updateOverlay();
    },
  },
  methods: {
    onFileChange(fileList) {
      const file = Array.isArray(fileList) ? fileList[0] : fileList;
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.beadographerStore.setOverlayImage(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    updateOverlay() {
      this.beadographerStore.updateOverlay({
        opacity: this.opacity / 100,
        fitToGrid: this.fitToGrid,
        position: this.position,
        visible: this.visibility,
      });
    },
    clearOverlay() {
      this.beadographerStore.updateOverlay({
        src: "",
        position: { x: 0, y: 0 },
      });
    },
  },
};
</script>
