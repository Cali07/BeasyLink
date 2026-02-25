<template>
  <v-card class="pa-4" elevation="2">
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h3 class="text-h6 font-weight-bold mb-1">Tools</h3>
        <div class="text-body-2 text-medium-emphasis">
          Switch between painting utilities and canvas controls.
        </div>
      </div>
      <div class="d-flex ga-2">
        <v-btn
          color="primary"
          variant="tonal"
          :disabled="!beadographerStore.undoStack.length"
          @click="beadographerStore.undo"
        >
          <v-icon start>mdi-undo</v-icon>
          Undo
        </v-btn>
        <v-btn
          color="primary"
          variant="tonal"
          :disabled="!beadographerStore.redoStack.length"
          @click="beadographerStore.redo"
        >
          <v-icon start>mdi-redo</v-icon>
          Redo
        </v-btn>
      </div>
    </div>

    <v-row>
      <v-col v-for="tool in tools" :key="tool.id" cols="12" sm="6" md="4">
        <v-btn
          block
          :color="isActive(tool.id) ? 'primary' : 'grey-lighten-2'"
          :variant="isActive(tool.id) ? 'elevated' : 'flat'"
          class="py-4"
          @click="selectTool(tool)"
        >
          <v-icon start>{{ tool.icon }}</v-icon>
          {{ tool.label }}
        </v-btn>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <div class="d-flex ga-2">
      <v-btn color="primary" variant="outlined" block @click="zoomOut">
        <v-icon start>mdi-magnify-minus</v-icon>
        Zoom Out
      </v-btn>
      <v-btn color="primary" variant="outlined" block @click="zoomIn">
        <v-icon start>mdi-magnify-plus</v-icon>
        Zoom In
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { useBeadographerStore } from "~/stores/beadographerStore";

export default {
  name: "ToolPanel",
  data() {
    return {
      tools: [
        { id: "pencil", label: "Pencil", icon: "mdi-pencil" },
        { id: "eraser", label: "Eraser", icon: "mdi-eraser" },
        { id: "eyedropper", label: "Eyedropper", icon: "mdi-eyedropper" },
        { id: "fill-row", label: "Fill Row", icon: "mdi-table-row" },
        { id: "fill-col", label: "Fill Column", icon: "mdi-table-column" },
        { id: "pan", label: "Move Canvas", icon: "mdi-cursor-move" },
        { id: "zoom-in", label: "Zoom In", icon: "mdi-magnify-plus" },
        { id: "zoom-out", label: "Zoom Out", icon: "mdi-magnify-minus" },
        { id: "undo", label: "Undo", icon: "mdi-undo" },
        { id: "redo", label: "Redo", icon: "mdi-redo" },
      ],
    };
  },
  computed: {
    ...mapStores(useBeadographerStore),
  },
  methods: {
    isActive(tool) {
      return this.beadographerStore.selectedTool === tool;
    },
    selectTool(tool) {
      if (tool.id === "undo") return this.beadographerStore.undo();
      if (tool.id === "redo") return this.beadographerStore.redo();
      if (tool.id === "zoom-in") return this.zoomIn();
      if (tool.id === "zoom-out") return this.zoomOut();
      this.beadographerStore.setTool(tool.id);
    },
    zoomIn() {
      this.beadographerStore.setZoom(this.beadographerStore.gridSettings.zoom + 0.25);
    },
    zoomOut() {
      this.beadographerStore.setZoom(this.beadographerStore.gridSettings.zoom - 0.25);
    },
  },
};
</script>
