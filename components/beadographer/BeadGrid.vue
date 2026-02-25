<template>
  <v-card class="pa-4" elevation="2">
    <div class="d-flex align-center justify-space-between mb-3">
      <div>
        <h3 class="text-h6 font-weight-bold mb-1">Bead Grid</h3>
        <div class="text-body-2 text-medium-emphasis">
          Paint with the active tool and palette color.
        </div>
      </div>
      <div class="d-flex align-center ga-2">
        <v-chip color="primary" variant="tonal" size="small">
          {{ gridRows }} x {{ gridCols }}
        </v-chip>
        <v-chip color="primary" variant="tonal" size="small">
          Zoom: {{ beadographerStore.gridSettings.zoom.toFixed(1) }}x
        </v-chip>
      </div>
    </div>

    <v-sheet class="bg-grey-lighten-4 position-relative pa-4" rounded="lg">
      <div class="canvas-wrapper">
        <div
          v-if="overlayImage.visible && overlayImage.src"
          class="overlay-image"
          :style="overlayStyle"
        >
          <v-img
            :src="overlayImage.src"
            :width="overlayDimensions.width"
            :height="overlayDimensions.height"
            :cover="overlayImage.fitToGrid"
            :style="{ opacity: overlayImage.opacity }"
          />
        </div>
        <div class="bead-grid" :style="gridStyle">
          <div
            v-for="(cell, index) in flattenedGrid"
            :key="index"
            class="bead-cell"
            :style="cellStyle(cell)"
            @click="paintCell(index)"
          >
            <span class="cell-symbol">
              {{ paletteMap[cell]?.symbol || "" }}
            </span>
          </div>
        </div>
      </div>
    </v-sheet>
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { useBeadographerStore } from "~/stores/beadographerStore";

export default {
  name: "BeadGrid",
  computed: {
    ...mapStores(useBeadographerStore),
    gridRows() {
      return this.beadographerStore.gridRows;
    },
    gridCols() {
      return this.beadographerStore.gridCols;
    },
    paletteMap() {
      return this.beadographerStore.paletteMap;
    },
    overlayImage() {
      return this.beadographerStore.overlayImage;
    },
    cellSize() {
      return 28 * this.beadographerStore.gridSettings.zoom;
    },
    flattenedGrid() {
      return this.beadographerStore.grid.flat();
    },
    gridStyle() {
      return {
        display: "grid",
        gridTemplateColumns: `repeat(${this.gridCols}, ${this.cellSize}px)`,
        gridAutoRows: `${this.cellSize}px`,
        gap: "4px",
      };
    },
    overlayDimensions() {
      return {
        width: this.gridCols * this.cellSize,
        height: this.gridRows * this.cellSize,
      };
    },
    overlayStyle() {
      return {
        width: `${this.overlayDimensions.width}px`,
        height: `${this.overlayDimensions.height}px`,
        transform: `translate(${this.overlayImage.position.x}px, ${this.overlayImage.position.y}px)`,
      };
    },
  },
  methods: {
    cellStyle(cell) {
      const color = this.paletteMap[cell];
      return {
        backgroundColor: color ? color.hex : "#ffffff",
        border: "1px solid #d9d9d9",
        borderRadius: "6px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };
    },
    paintCell(index) {
      const row = Math.floor(index / this.gridCols);
      const col = index % this.gridCols;
      this.beadographerStore.applyTool({
        row,
        col,
        colorId: this.beadographerStore.selectedColorId,
      });
    },
  },
};
</script>

<style scoped>
.canvas-wrapper {
  position: relative;
  overflow: auto;
  max-height: 70vh;
}
.bead-grid {
  position: relative;
  z-index: 2;
}
.overlay-image {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
}
.bead-cell {
  position: relative;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.04);
}
.cell-symbol {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
}
</style>
