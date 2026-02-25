<template>
  <div>
    <v-row class="mb-6" align="center">
      <v-col cols="12" md="8">
        <h1 class="text-h4 font-weight-bold mb-2">Beadographer Studio</h1>
        <p class="text-body-1 text-medium-emphasis">
          Spacious bead design workspace with palette control, grid settings, and export tools.
        </p>
      </v-col>
      <v-col cols="12" md="4">
        <div class="d-flex justify-end ga-3 flex-wrap">
          <PatternAssistantDialog />
          <PdfExportButton />
          <JsonExportButton />
          <JsonImportDialog />
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="7">
        <BeadGrid />
        <BackgroundOverlay class="mt-4" />
      </v-col>
      <v-col cols="12" md="5">
        <ToolPanel />
        <PaletteManager class="mt-4" />
        <GridSettings class="mt-4" />
        <PatternMetadataForm class="mt-4" />
        <v-card class="pa-4 mt-4" elevation="2">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-subtitle-1 font-weight-bold">Save & Load</div>
              <div class="text-body-2 text-medium-emphasis">
                Quickly snapshot your current pattern.
              </div>
            </div>
            <div class="d-flex ga-2">
              <v-btn color="primary" variant="elevated" @click="savePattern">
                <v-icon start>mdi-content-save</v-icon>
                Save
              </v-btn>
              <v-btn
                variant="outlined"
                color="primary"
                :disabled="!beadographerStore.lastLoadedId && !beadographerStore.savedPatterns.length"
                @click="loadLast"
              >
                <v-icon start>mdi-history</v-icon>
                Load last
              </v-btn>
            </div>
          </div>
          <v-btn
            class="mt-3"
            color="primary"
            variant="text"
            @click="$router.push('/beadographer/patterns')"
          >
            <v-icon start>mdi-view-grid</v-icon>
            Open gallery
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
definePageMeta({
  layout: "mila",
});

import { mapStores } from "pinia";
import { useBeadographerStore } from "~/stores/beadographerStore";
import BeadGrid from "~/components/beadographer/BeadGrid.vue";
import ToolPanel from "~/components/beadographer/ToolPanel.vue";
import PaletteManager from "~/components/beadographer/PaletteManager.vue";
import GridSettings from "~/components/beadographer/GridSettings.vue";
import BackgroundOverlay from "~/components/beadographer/BackgroundOverlay.vue";
import PatternMetadataForm from "~/components/beadographer/PatternMetadataForm.vue";
import PdfExportButton from "~/components/beadographer/PdfExportButton.vue";
import JsonImportDialog from "~/components/beadographer/JsonImportDialog.vue";
import JsonExportButton from "~/components/beadographer/JsonExportButton.vue";
import PatternAssistantDialog from "~/components/beadographer/PatternAssistantDialog.vue";

export default {
  name: "BeadographerPage",
  components: {
    BeadGrid,
    ToolPanel,
    PaletteManager,
    GridSettings,
    BackgroundOverlay,
    PatternMetadataForm,
    PdfExportButton,
    JsonImportDialog,
    JsonExportButton,
    PatternAssistantDialog,
  },
  computed: {
    ...mapStores(useBeadographerStore),
  },
  mounted() {
    this.beadographerStore.init();
    window.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    handleKeydown(event) {
      const key = event.key?.toLowerCase();
      if (event.ctrlKey && key === "z" && event.shiftKey) {
        event.preventDefault();
        this.beadographerStore.redo();
      } else if (event.ctrlKey && key === "z") {
        event.preventDefault();
        this.beadographerStore.undo();
      }
    },
    savePattern() {
      this.beadographerStore.savePattern();
    },
    loadLast() {
      const lastId =
        this.beadographerStore.lastLoadedId ||
        this.beadographerStore.savedPatterns.slice(-1)[0]?.id;
      if (lastId) {
        this.beadographerStore.loadPattern(lastId);
      }
    },
  },
};
</script>
