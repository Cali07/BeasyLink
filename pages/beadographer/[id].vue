<template>
  <div>
    <v-row class="mb-6" align="center">
      <v-col cols="12" md="8">
        <h1 class="text-h4 font-weight-bold mb-2">
          {{ beadographerStore.patternMetadata.name || "Pattern" }}
        </h1>
        <p class="text-body-1 text-medium-emphasis">
          Loaded pattern {{ routeId }}. Continue editing or export.
        </p>
      </v-col>
      <v-col cols="12" md="4" class="d-flex justify-end ga-2 flex-wrap">
        <PdfExportButton />
        <JsonExportButton />
        <JsonImportDialog />
      </v-col>
    </v-row>

    <v-alert type="info" variant="tonal" border="start" class="mb-4">
      Patterns auto-save locally. Use undo/redo for quick revisions.
    </v-alert>

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

export default {
  name: "BeadographerPatternPage",
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
  },
  computed: {
    ...mapStores(useBeadographerStore),
    routeId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.beadographerStore.init();
    if (this.routeId) {
      this.beadographerStore.loadPattern(this.routeId);
    }
  },
};
</script>
